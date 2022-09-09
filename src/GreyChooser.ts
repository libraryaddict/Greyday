import {
  appearanceRates,
  availableAmount,
  canAdventure,
  Effect,
  Familiar,
  familiarWeight,
  haveEffect,
  haveSkill,
  Item,
  Location,
  Monster,
  myAdventures,
  myBasestat,
  myLevel,
  myMp,
  print,
  printHtml,
  Skill,
  Stat,
} from "kolmafia";
import {
  hasCombatSkillActive,
  hasNonCombatSkillActive,
} from "./GreyAdventurer";
import { QuestRegistry } from "./quests/QuestRegistry";
import {
  GenericAdventure,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "./quests/Quests";
import { ResourceCategory } from "./typings/ResourceTypes";
import { PossiblePath } from "./typings/TaskInfo";
import { FigureOutPath, SimmedPath } from "./typings/TaskManager";
import {
  AbsorbsProvider,
  AbsorbDetails,
  Reabsorbed,
} from "./utils/GreyAbsorber";
import {
  AdventureSettings,
  getPrimedResource,
  greyAdv,
  resetPrimedResource,
  setPrimedResource,
} from "./utils/GreyLocations";
import { GreyOutfit } from "./utils/GreyOutfitter";
import { GreySettings } from "./utils/GreySettings";
import { currentPredictions, doColor } from "./utils/GreyUtils";

export enum OrbStatus {
  READY,
  NOT_SET,
  IGNORED,
  NEEDS_RESET,
}

export enum ConsiderPriority {
  ORB_ABSORB, // When we have an orb ready to absorb
  ORB_OTHER, // When we have an orb that's not an absorb
  RANDOM_ABSORB, // When we're going here for the absorb
  RANDOM_COMBAT_ABSORB, // When we're going here for the absorb but want +combat
  NOTHING_SPECIAL,
  BAD_COMBAT_RATE, // When we're running -/+ combat which isn't what we want
  BAD_ABSORB, // When we'd have a chance to hit something we're not ready to absorb
}

export interface FoundAdventure {
  locationInfo: AbsorbDetails;
  adventure: QuestAdventure;
  path?: PossiblePath;
  quest?: QuestInfo;
  status: QuestStatus;
  orbStatus: OrbStatus;
  considerPriority: ConsiderPriority; // At what pass of "Looking for adventures" will this be considered
}

const crystalBall: Item = Item.get("miniature crystal ball");

export class AdventureFinder {
  static instance: AdventureFinder;
  registry: QuestRegistry = new QuestRegistry();
  defeated: Map<Monster, Reabsorbed>;
  viableQuests: [QuestInfo, PossiblePath][];
  absorbs: AbsorbsProvider = new AbsorbsProvider();
  goose: Familiar = Familiar.get("Grey Goose");
  questLocations: Location[];
  possibleAdventures: FoundAdventure[];
  path: SimmedPath;

  constructor() {
    AdventureFinder.instance = this;
  }

  static recalculatePath() {
    AdventureFinder.instance.calculatePath();
  }

  calculatePath() {
    const simmedPath = new FigureOutPath().getPaths(this.getAllRawQuests());

    if (simmedPath == null) {
      if (this.path != null) {
        print("Failed to calculate a path.. Staying on current path..", "gray");
      }

      return;
    }

    this.path = simmedPath;
    this.path.printInfo();
  }

  getAllRawQuests(): QuestInfo[] {
    return this.registry.getQuestsInOrder();
  }

  setPossibleAdventures() {
    this.possibleAdventures = [];

    for (const [quest, path] of this.getDoableQuests()) {
      const adventure = quest.run(path);
      let details: AbsorbDetails;

      if (adventure.location != null) {
        details = this.absorbs.getAdventuresInLocation(
          this.defeated,
          adventure.location,
          true
        );
      } else if (quest.getAbsorbs != null) {
        const absorbs = quest.getAbsorbs();

        if (absorbs.length > 0) {
          details = this.absorbs.getAdventuresByAbsorbs(
            this.defeated,
            absorbs,
            true
          );
        }
      }

      if (
        (details != null || adventure.olfaction != null) &&
        adventure.orbs == null
      ) {
        adventure.orbs = [];
      }

      if (adventure.olfaction != null) {
        for (const m of adventure.olfaction) {
          if (adventure.orbs.includes(m)) {
            continue;
          }

          adventure.orbs.push(m);
        }
      }

      if (details != null) {
        for (const m of details.monsters) {
          if (adventure.orbs.includes(m)) {
            continue;
          }

          adventure.orbs.push(m);
        }
      }

      const adv: FoundAdventure = {
        quest: quest,
        path: path,
        locationInfo: details,
        adventure: adventure,
        orbStatus: OrbStatus.IGNORED,
        status: quest.status(path),
        considerPriority: null,
      };

      this.possibleAdventures.push(adv);
    }

    for (const [loc, details] of this.absorbs.getExtraAdventures(
      this.defeated,
      true
    )) {
      if (
        this.questLocations.includes(loc) ||
        !canAdventure(loc) ||
        details.expectedTurnsProfit < 0
      ) {
        continue;
      }

      const adv: FoundAdventure = {
        quest: null,
        path: null,
        locationInfo: details,
        adventure: this.getNonQuest(loc, details),
        orbStatus: OrbStatus.IGNORED,
        status: QuestStatus.READY,
        considerPriority: null,
      };

      this.possibleAdventures.push(adv);
    }

    this.adjustAdventures();
  }

  adjustAdventures() {
    const absorbTime = this.hasEnoughGooseWeight();

    if (availableAmount(crystalBall) > 0) {
      const preds = currentPredictions();

      for (const adv of this.possibleAdventures) {
        if (
          adv.adventure.location == null ||
          adv.adventure.orbs == null ||
          adv.adventure.orbs.length == 0
        ) {
          continue;
        }

        if (
          adv.adventure.forcedFight != null &&
          adv.adventure.forcedFight[0] == 0
        ) {
          continue;
        }

        const appear = appearanceRates(adv.adventure.location);
        const couldAppear = adv.adventure.orbs.filter(
          (m) => appear[m.name] > 0
        );

        if (couldAppear.length == 0) {
          continue;
        }

        const prediction = preds.get(adv.adventure.location);

        if (prediction == null) {
          adv.orbStatus = OrbStatus.NOT_SET;
        } else if (adv.adventure.orbs.includes(prediction)) {
          adv.orbStatus = OrbStatus.READY;

          const absorb = this.absorbs.getAbsorb(prediction);

          if (absorb != null && absorb.adventures > 0) {
            adv.considerPriority =
              absorbTime ||
              this.defeated.get(prediction) != Reabsorbed.REABSORBED
                ? ConsiderPriority.ORB_ABSORB
                : ConsiderPriority.BAD_ABSORB;
          } else {
            adv.considerPriority = ConsiderPriority.ORB_OTHER;
          }
        } else {
          adv.orbStatus = OrbStatus.NEEDS_RESET;
        }
      }
    }

    const hasBlessing =
      haveEffect(Effect.get("Brother Corsican's Blessing")) +
        haveEffect(Effect.get("A Girl Named Sue")) >
      0;

    for (const adv of this.possibleAdventures) {
      if (adv.considerPriority != null) {
        continue;
      }

      const wantsAbsorb =
        adv.locationInfo != null && adv.locationInfo.turnsToGain > 0;

      // If we might hit an absorb we can't reabsorb
      if (
        adv.locationInfo != null &&
        adv.locationInfo.reabsorb &&
        !absorbTime
      ) {
        adv.considerPriority = ConsiderPriority.BAD_ABSORB;
        continue;
      }

      const outfit = adv.adventure.outfit;

      // If we want to run -/+ combat but we're running the opposite
      if (
        outfit != null &&
        outfit != GreyOutfit.IGNORE_OUTFIT &&
        ((outfit.minusCombatWeight > 0 && hasCombatSkillActive()) ||
          (outfit.plusCombatWeight > 0 && hasNonCombatSkillActive()))
      ) {
        adv.considerPriority = ConsiderPriority.BAD_COMBAT_RATE;
        continue;
      }

      if (wantsAbsorb) {
        if (adv.adventure.location == null) {
          adv.considerPriority = ConsiderPriority.RANDOM_ABSORB;
          continue;
        }

        // We should run combat if combat percent is below 100
        // Or our outfit exists and wants to run combat
        // And the location isn't black forest, or if it is, we don't have the skill
        const shouldRunCombat =
          (adv.adventure.location.combatPercent < 100 &&
            adv.adventure.outfit == null) ||
          (adv.adventure.outfit != null &&
            adv.adventure.outfit != GreyOutfit.IGNORE_OUTFIT &&
            adv.adventure.outfit.plusCombatWeight > 0 &&
            (adv.adventure.location != Location.get("The Black Forest") ||
              haveSkill(Skill.get("Photonic Shroud"))));

        if (shouldRunCombat) {
          adv.considerPriority = ConsiderPriority.RANDOM_COMBAT_ABSORB;
        } else {
          adv.considerPriority = ConsiderPriority.RANDOM_ABSORB;
        }

        continue;
      }

      adv.considerPriority = ConsiderPriority.NOTHING_SPECIAL;
    }

    for (const adv of this.possibleAdventures) {
      adv.status = this.getModifiedStatus(
        adv.status,
        adv.adventure,
        hasBlessing
      );
    }
  }

  getNonQuest(loc: Location, adv: AbsorbDetails): GenericAdventure {
    const outfit = new GreyOutfit();

    if (loc.combatPercent < 100) {
      outfit.setPlusCombat();
    }

    const settings = new AdventureSettings();
    settings.nonquest = true;
    adv.monsters.forEach((m) => settings.addNoBanish(m));

    return {
      outfit: outfit,
      location: loc,
      orbs: adv.monsters,
      run: () => {
        // We don't want it casting +combat skills
        greyAdv(loc, null, settings);
      },
    };
  }

  getDoableQuests(): [QuestInfo, PossiblePath][] {
    const quests: [QuestInfo, PossiblePath][] = [];

    const tryAdd = (q: QuestInfo, path: PossiblePath) => {
      if (q.level() > myLevel() || q.level() < 0) {
        return;
      }

      if (
        q.level() * (haveSkill(Skill.get("Infinite Loop")) ? 1 : 6) >
        myBasestat(Stat.get("Moxie"))
      ) {
        return;
      }

      const status = q.status(path);

      if (status == QuestStatus.COMPLETED) {
        return;
      }

      if (status == QuestStatus.NOT_READY) {
        return;
      }

      quests.push([q, path]);
    };

    this.path.thisPath.forEach(([quest, path]) => {
      tryAdd(quest, path);
    });

    return quests;
  }

  start() {
    this.setPreAbsorbs();

    if (this.path.isRecalculateNeeded()) {
      this.calculatePath();
      this.setPreAbsorbs();
    }

    this.viableQuests = this.getDoableQuests();
    this.setAbsorbs();
    this.defeated = this.absorbs.getAbsorbedMonstersFromInstance();
    this.setQuestLocations();
    this.setPossibleAdventures();
  }

  setPreAbsorbs() {
    const defeated = this.absorbs.getAbsorbedMonstersFromInstance();

    for (const [quest] of this.path.thisPath) {
      quest.toAbsorb = [];

      for (const loc of quest.getLocations()) {
        const result = this.absorbs.getAdventuresInLocation(defeated, loc);

        if (result == null) {
          continue;
        }

        quest.toAbsorb.push(...result.monsters);
      }
    }
  }

  setAbsorbs() {
    const defeated = this.absorbs.getAbsorbedMonstersFromInstance();

    for (const [quest, path] of this.path.thisPath) {
      if (
        quest.status(path) == QuestStatus.NOT_READY ||
        quest.status(path) == QuestStatus.COMPLETED
      ) {
        continue;
      }

      const run = quest.run(path);

      if (run.location == null) {
        continue;
      }

      const result = this.absorbs.getAdventuresInLocation(
        defeated,
        run.location
      );

      quest.toAbsorb = result == null ? [] : result.monsters;
    }
  }

  setQuestLocations() {
    this.questLocations = [];

    for (const [quest, path] of this.path.thisPath) {
      if (quest.status(path) == QuestStatus.COMPLETED) {
        continue;
      }

      this.questLocations.push(...quest.getLocations());
    }
  }

  hasEnoughGooseWeight(): boolean {
    return familiarWeight(this.goose) >= 6;
  }

  getModifiedStatus(
    status: QuestStatus,
    runned: QuestAdventure,
    hasBlessing: boolean
  ) {
    if (status != QuestStatus.READY) {
      return status;
    }

    const outfit = runned.outfit;

    if (outfit != null) {
      if (outfit.minusCombatWeight > 0 && hasBlessing) {
        status = QuestStatus.FASTER_LATER;
      } else if (myMp() < 50) {
        if (outfit.minusCombatWeight > 0 && !hasNonCombatSkillActive()) {
          status = QuestStatus.FASTER_LATER;
        } else if (
          outfit.plusCombatWeight > 0 &&
          haveSkill(Skill.get("Piezoelectric Honk")) &&
          !hasCombatSkillActive()
        ) {
          status = QuestStatus.FASTER_LATER;
        }
      }
    }

    return status;
  }

  getRecommendedFamiliars(): Familiar[] {
    return this.path.thisPath
      .map(([q, path]) => {
        if (q.hasFamiliarRecommendation == null) {
          return null;
        }

        const fam = q.hasFamiliarRecommendation();

        if (fam == null) {
          return null;
        }

        const status = q.status(path);

        if (status == QuestStatus.COMPLETED) {
          return null;
        }

        return fam;
      })
      .filter((f) => f != null);
  }

  getQuestColor(status: QuestStatus): string {
    switch (status) {
      case QuestStatus.COMPLETED:
        return "green";
      case QuestStatus.FASTER_LATER:
        return "gray";
      case QuestStatus.NOT_READY:
        return "red";
      case QuestStatus.READY:
        return "green";
    }
  }

  printCurrentStatus(quests: FoundAdventure[]) {
    this.printStatus(
      quests
        .filter((q) => q.quest != null)
        .map((q) => [q.quest, q.path, q.considerPriority])
    );
  }

  printStatus(quests: [QuestInfo, PossiblePath, ConsiderPriority][]) {
    const hasBlessing =
      haveEffect(Effect.get("Brother Corsican's Blessing")) +
        haveEffect(Effect.get("A Girl Named Sue")) >
      0;

    for (const [quest, path, priority] of quests) {
      let status = quest.status(path);

      if (status != QuestStatus.NOT_READY && status != QuestStatus.COMPLETED) {
        status = this.getModifiedStatus(status, quest.run(path), hasBlessing);
      }

      const line =
        "<u>" +
        quest.getId() +
        "</u>: " +
        doColor(QuestStatus[status], this.getQuestColor(status)) +
        (priority != null ? " - " + ConsiderPriority[priority] : "");

      printHtml(line);
    }
  }

  findPrimedVisit(): FoundAdventure {
    const primed = getPrimedResource();

    if (primed == null) {
      return null;
    }

    if (!primed.resource.primed()) {
      resetPrimedResource();
      return null;
    }

    const status = primed.quest.status(primed.path);

    if (status != QuestStatus.READY && status != QuestStatus.FASTER_LATER) {
      throw (
        "Expected a quest status of ready or faster later on " +
        primed.quest.getId() +
        " which was primed for a resource " +
        primed.resource.id
      );
    }

    return {
      quest: primed.quest,
      path: primed.path,
      locationInfo: null,
      adventure: primed.quest.run(primed.path),
      status: status,
      orbStatus: OrbStatus.IGNORED,
      considerPriority: ConsiderPriority.NOTHING_SPECIAL,
    };

    // TODO Find the visit or error
  }

  // Try setup something so we can prime this visit
  tryPrime(adventure: FoundAdventure) {
    // If this quest is one that is an absorb potential, or will be using a crystal ball
    if (
      adventure.quest == null ||
      adventure.orbStatus == OrbStatus.READY ||
      adventure.orbStatus == OrbStatus.NOT_SET
    ) {
      return;
    }

    // We don't want to prime on something that might demand to be done later
    if (adventure.quest.mustBeDone != null) {
      return;
    }

    // If this quest is one that can't be primed on
    if (
      adventure.quest.canAcceptPrimes != null &&
      !adventure.quest.canAcceptPrimes()
    ) {
      return;
    }

    // We don't want to prime on something that isn't using an outfit, or is using items in that outfit
    if (
      adventure.adventure.outfit == GreyOutfit.IGNORE_OUTFIT ||
      (adventure.adventure.outfit != null &&
        adventure.adventure.outfit.itemsWeight.length > 0)
    ) {
      return;
    }

    // So! This adventure is one we can prime on!

    for (const [quest, path] of this.path.thisPath) {
      if (quest == null || path == null) {
        continue;
      }

      if (quest.attemptPrime == null) {
        continue;
      }

      const status = quest.status(path);

      if (status == QuestStatus.COMPLETED) {
        continue;
      }

      const hasPrimed = quest.attemptPrime(path);

      // If this did not want to prime a resource
      if (!hasPrimed) {
        continue;
      }

      const primed = getPrimedResource();

      if (primed == null) {
        throw (
          quest.getId() +
          " claimed to have prepared a primed resource, but nothing was set."
        );
      }

      print(
        quest.getId() +
          " has primed " +
          primed.resource.id +
          " of " +
          ResourceCategory[primed.resource.type],
        "blue"
      );
      return;
    }
  }

  findGoodVisit(): FoundAdventure {
    const abortNotEnoughAdventures =
      myAdventures() <= GreySettings.adventuresBeforeAbort;
    const generateAdventuresOrAbort: boolean =
      myAdventures() <= GreySettings.adventuresGenerateIfPossibleOrAbort;

    if (abortNotEnoughAdventures) {
      print(
        "We don't have enough adventures to feel comfortable, aborting..",
        "red"
      );
      return;
    }

    const mustBeDone: [FoundAdventure, number][] = this.possibleAdventures
      .filter(
        (adv) =>
          adv.quest != null &&
          adv.quest.mustBeDone != null &&
          adv.quest.mustBeDone()
      )
      .map((a) => [a, a.quest.free != null && a.quest.free() ? 0 : 1]);

    if (mustBeDone.length > 0) {
      mustBeDone.sort(([, m1], [, m2]) => {
        return m1 - m2;
      });

      if (mustBeDone.filter(([, m]) => m > 0).length > 1) {
        print(
          "Multiple quests demand to be done! " +
            mustBeDone.map((a) => a[0].quest.getId()).join(", "),
          "red"
        );
        print("This is not a real error, but not that great either.", "red");
      }

      if (mustBeDone.length > 0) {
        return mustBeDone[0][0];
      }
    }

    if (generateAdventuresOrAbort && !this.hasEnoughGooseWeight()) {
      print(
        "We need more adventures but we're not ready for a reabsorb..",
        "red"
      );
      return;
    }

    const toNum = (status: OrbStatus) =>
      status == OrbStatus.IGNORED ? OrbStatus.NOT_SET : status;

    this.possibleAdventures.sort((a1, a2) => {
      if (a1.considerPriority != a2.considerPriority) {
        return a1.considerPriority - a2.considerPriority;
      }

      if (toNum(a1.orbStatus) != toNum(a2.orbStatus)) {
        return a1.orbStatus - a2.orbStatus;
      }

      if ((a1.quest == null) != (a2.quest == null)) {
        return a1.quest == null ? 1 : -1;
      }

      if (a1.status != a2.status) {
        return a1.status - a2.status;
      }

      return 0;
    });

    if (this.possibleAdventures.length > 0) {
      return this.possibleAdventures[0];
    }

    print(
      "Failed to find any quests that are willing to run, and failed to find any non-quest locations willing to run.",
      "red"
    );
    return null;
  }
}
