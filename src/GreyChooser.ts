import {
  appearanceRates,
  availableAmount,
  canAdventure,
  cliExecute,
  Effect,
  Familiar,
  familiarWeight,
  getLocationMonsters,
  getProperty,
  haveEffect,
  haveSkill,
  historicalPrice,
  isBanished,
  Item,
  itemAmount,
  Location,
  maximize,
  Monster,
  myAdventures,
  myBasestat,
  myLevel,
  myMeat,
  myMp,
  print,
  printHtml,
  Skill,
  Stat,
  toInt,
  use,
  useFamiliar,
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
import { QuestType } from "./quests/QuestTypes";
import { ResourceCategory } from "./typings/ResourceTypes";
import { PossiblePath } from "./typings/TaskInfo";
import { FigureOutPath, SimmedPath } from "./typings/TaskManager";
import {
  AbsorbsProvider,
  AbsorbDetails,
  Reabsorbed,
  Absorb,
} from "./utils/GreyAbsorber";
import {
  AdventureSettings,
  getPrimedResource,
  greyAdv,
  resetPrimedResource,
} from "./utils/GreyLocations";
import { GreyOutfit } from "./utils/GreyOutfitter";
import { GreySettings } from "./utils/GreySettings";
import {
  canGreyAdventure,
  currentPredictions,
  doColor,
} from "./utils/GreyUtils";

export enum OrbStatus {
  READY,
  NOT_SET,
  IGNORED,
  NEEDS_RESET,
}

export enum ConsiderPriority {
  INSISTS_ON_BEING_DONE,
  MUST_BE_DONE,
  ORB_ABSORB, // When we have an orb ready to absorb
  ORB_ABSORB_OTHER, // When we have an orb ready to absorb
  ORB_OTHER, // When we have an orb that's not an absorb
  RANDOM_ABSORB, // When we're going here for the absorb
  RANDOM_COMBAT_ABSORB, // When we're going here for the absorb but want +combat
  NOTHING_SPECIAL,
  BAD_COMBAT_RATE, // When we're running -/+ combat which isn't what we want
  BAD_PREDICTION, // When the orb predicts something we don't want
  BAD_ABSORB, // When we'd have a chance to hit something we're not ready to absorb
  BAD_ABSORB_PREDICTION, // When we'd hit an absorb that's useless to us
}

export interface FoundAdventure {
  locationInfo: AbsorbDetails;
  adventure: QuestAdventure;
  path?: PossiblePath;
  quest?: QuestInfo;
  status: QuestStatus;
  orbStatus: OrbStatus;
  considerPriority: ConsiderPriority; // At what pass of "Looking for adventures" will this be considered
  mayFreeRun: boolean;
  freeRun: (monster: Monster, settings: AdventureSettings | null) => boolean;
}

const crystalBall: Item = Item.get("miniature crystal ball");

export class AdventureFinder {
  static instance: AdventureFinder;
  registry: QuestRegistry = new QuestRegistry();
  defeated: Map<Monster, Reabsorbed>;
  allQuests: [QuestInfo, PossiblePath][];
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

    for (const [quest, path] of this.viableQuests) {
      const adventure = quest.run(path);
      let details: AbsorbDetails;

      if (quest.getAbsorbs != null) {
        const absorbs = quest.getAbsorbs();

        if (absorbs.length > 0) {
          details = this.absorbs.getAdventuresByAbsorbs(
            this.defeated,
            absorbs,
            true
          );
        }
      }

      if (details == null && adventure.location != null) {
        details = this.absorbs.getAdventuresInLocation(
          this.defeated,
          adventure.location,
          true
        );
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

      const noDisruptiveResources: boolean =
        path == null ||
        [
          ResourceCategory.FAXER,
          ResourceCategory.COPIER,
          ResourceCategory.OLFACT_COPIER,
          ResourceCategory.CARGO_SHORTS,
        ].find((r) => path.resourceUsed.includes(r) || path.canUse(r)) == null;
      const canFreeRun =
        noDisruptiveResources &&
        adventure.mayFreeRun !== false &&
        adventure.forcedFight == null;

      const adv: FoundAdventure = {
        quest: quest,
        path: path,
        locationInfo: details,
        adventure: adventure,
        orbStatus: OrbStatus.IGNORED,
        status: quest.status(path),
        considerPriority:
          quest.mustBeDone != null && quest.mustBeDone()
            ? quest.mustBeDone(true)
              ? ConsiderPriority.INSISTS_ON_BEING_DONE
              : ConsiderPriority.MUST_BE_DONE
            : null,
        mayFreeRun: canFreeRun,
        freeRun: (monster: Monster, settings: AdventureSettings | null) => {
          // Never run from a boss, or a free fight
          if (
            !canFreeRun ||
            monster.boss ||
            !monster.copyable ||
            monster.attributes.includes("FREE")
          ) {
            return false;
          }

          // Never run from something we're trying to hit with orb, or oflact
          if (
            (adventure.orbs != null && adventure.orbs.includes(monster)) ||
            (adventure.olfaction != null &&
              adventure.olfaction.includes(monster))
          ) {
            return false;
          }

          // Never run from something we're deliberately not banishing
          if (
            settings != null &&
            settings.dontBanishThese != null &&
            settings.dontBanishThese.includes(monster)
          ) {
            return false;
          }

          // Always run from something we're deliberately banishing
          if (
            settings != null &&
            settings.banishThese != null &&
            settings.banishThese.includes(monster)
          ) {
            return true;
          }

          // If the adventure hasn't decided to free run or not, never free run
          if (adventure.freeRun == null) {
            return false;
          }

          // If the adventure says not to free run, don't
          if (!adventure.freeRun(monster, settings)) {
            return false;
          }

          return this.shouldFreeRun(monster);
        },
      };

      this.possibleAdventures.push(adv);
    }

    const nonQuests = this.absorbs.getExtraAdventures(this.defeated, true);

    nonQuests.sort(([, a1], [, a2]) => a2.weight - a1.weight);

    for (const [loc, details] of nonQuests) {
      if (
        this.questLocations.includes(loc) ||
        !canGreyAdventure(loc) ||
        ([...details.skills.keys()].find((s) =>
          this.absorbs.getMustHaveSkills().has(s.skill)
        ) == null &&
          details.expectedTurnsProfit < 0)
      ) {
        continue;
      }

      if (loc == Location.get("Oil Peak")) {
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
        mayFreeRun: true,
        freeRun: (monster: Monster) => {
          return this.shouldFreeRun(monster);
        },
      };

      this.possibleAdventures.push(adv);
    }

    this.adjustAdventures();
  }

  shouldFreeRun(monster: Monster): boolean {
    // Never run from a boss, or a free fight
    if (
      monster.boss ||
      !monster.copyable ||
      monster.attributes.includes("FREE")
    ) {
      return false;
    }

    const absorb = AbsorbsProvider.getAbsorb(monster);

    // If we absorb nothing from this, free run
    if (absorb == null) {
      return true;
    }

    // If we get adventures from this
    if (absorb.adventures > 0) {
      // Only free run if we can't absorb
      return this.defeated.get(monster) == Reabsorbed.REABSORBED;
    }

    if (this.defeated.has(monster)) {
      return true;
    }

    if (
      absorb.skill != null &&
      this.absorbs.getMustHaveSkills().has(absorb.skill)
    ) {
      return false;
    }

    // Free run if we've taken the absorb
    return absorb.hp + absorb.mp + (myLevel() < 10 ? absorb.mox : 0) == 0;
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
          adv.mayFreeRun = false;

          const absorb: Absorb = this.absorbs.getAbsorb(prediction);
          const advAbsorb: boolean = absorb != null && absorb.adventures > 0;
          const defeat: Reabsorbed = this.defeated.get(prediction);

          if (
            advAbsorb &&
            (defeat == null ||
              (defeat == Reabsorbed.NOT_REABSORBED && absorbTime))
          ) {
            if (defeat == Reabsorbed.NOT_REABSORBED || absorbTime) {
              adv.considerPriority = ConsiderPriority.ORB_ABSORB;
            } else {
              adv.considerPriority = ConsiderPriority.BAD_ABSORB_PREDICTION;
            }
          } else if (
            absorb != null &&
            absorb.skill != null &&
            this.absorbs.getMustHaveSkills().has(absorb.skill) &&
            defeat == null
          ) {
            adv.considerPriority = ConsiderPriority.ORB_ABSORB_OTHER;
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
        adv.locationInfo != null &&
        (adv.locationInfo.turnsToGain > 0 ||
          [...adv.locationInfo.skills].find(
            ([a]) =>
              !haveSkill(a.skill) &&
              this.absorbs.getMustHaveSkills().has(a.skill)
          ) != null);

      // If we might hit an absorb we can't reabsorb
      if (
        adv.locationInfo != null &&
        adv.locationInfo.reabsorb &&
        !absorbTime
      ) {
        adv.considerPriority = ConsiderPriority.BAD_ABSORB;
        continue;
      }

      if (adv.orbStatus == OrbStatus.NEEDS_RESET) {
        adv.considerPriority = ConsiderPriority.BAD_PREDICTION;
        continue;
      }

      const outfit = adv.adventure.outfit;

      // If we want to run -/+ combat but we're running the opposite
      if (
        outfit != null &&
        outfit != GreyOutfit.IGNORE_OUTFIT &&
        ((outfit.minusCombatWeight > 0 && hasCombatSkillActive()) ||
          (outfit.plusCombatWeight > 0 &&
            adv.quest != null &&
            hasNonCombatSkillActive()))
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
            adv.adventure.outfit.plusCombatWeight > 0);

        if (shouldRunCombat && hasNonCombatSkillActive()) {
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

  doAllQuests() {
    this.allQuests = [];

    const tryAdd = (q: QuestInfo, path: PossiblePath) => {
      if (q.level() < 0) {
        return;
      }
      this.allQuests.push([q, path]);
    };

    this.path.thisPath.forEach(([quest, path]) => {
      tryAdd(quest, path);
    });
  }

  getDoableQuests(allQuests: boolean = false): [QuestInfo, PossiblePath][] {
    const quests: [QuestInfo, PossiblePath][] = [];

    const tryAdd = (q: QuestInfo, path: PossiblePath) => {
      if ((!allQuests && q.level() > myLevel()) || q.level() < 0) {
        return;
      }

      if (
        !allQuests &&
        q.level() != 1 &&
        q.level() * (haveSkill(Skill.get("Infinite Loop")) ? 1 : 6) >
          myBasestat(Stat.get("Moxie"))
      ) {
        return;
      }

      const status = q.status(path);

      if (
        !allQuests &&
        (status == QuestStatus.COMPLETED || status == QuestStatus.NOT_READY)
      ) {
        return;
      }

      quests.push([q, path]);
    };

    this.allQuests.forEach(([quest, path]) => {
      tryAdd(quest, path);
    });

    return quests;
  }

  start(allQuests: boolean = false) {
    this.setPreAbsorbs();

    if (this.path.isRecalculateNeeded()) {
      this.calculatePath();
      this.setPreAbsorbs();
    }

    this.doAllQuests();
    this.viableQuests = this.getDoableQuests(allQuests);
    this.setAbsorbs();
    this.defeated = this.absorbs.getAbsorbedMonstersFromInstance();
    this.setQuestLocations(allQuests);
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
      try {
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
      } catch (e) {
        print("Errored while trying to set absorbs on " + quest.getId());
        throw e;
      }
    }
  }

  setQuestLocations(allQuests: boolean) {
    this.questLocations = [];

    for (const [quest, path] of this.path.thisPath) {
      if (!allQuests && quest.status(path) == QuestStatus.COMPLETED) {
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

  printStatus(quests: FoundAdventure[]) {
    for (const adv of quests) {
      const status = adv.status;
      const id =
        adv.quest == null
          ? "Non-Quest / " + adv.adventure.location
          : adv.quest.getId();

      const line =
        "<u>" +
        id +
        "</u>: " +
        doColor(QuestStatus[status], this.getQuestColor(status)) +
        " - " +
        ConsiderPriority[adv.considerPriority];

      printHtml(line, true);
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
        primed.resource.name
      );
    }

    const adv = primed.quest.run(primed.path);
    const run = adv.run;

    adv.run = () => {
      run();
      primed.resource.unprime();
      resetPrimedResource();
    };

    const toReturn = {
      quest: primed.quest,
      path: primed.path,
      locationInfo: null,
      adventure: adv,
      status: status,
      orbStatus: OrbStatus.IGNORED,
      considerPriority: ConsiderPriority.INSISTS_ON_BEING_DONE,
      mayFreeRun: false,
      freeRun: () => false,
    };

    return toReturn;
  }

  // Try setup something so we can prime this visit
  tryPrime(adventure: FoundAdventure) {
    if (adventure.quest == null) {
      return;
    }

    // If this quest has an opinion on being primed
    if (adventure.quest.canAcceptPrimes != null) {
      // If this quest doesn't want to be primed
      if (!adventure.quest.canAcceptPrimes(adventure.quest)) {
        return;
      }
    } else {
      // Quest has no opinion on being primed, so decide it for ourselves
      // If this quest is one that is an absorb potential, or will be using a crystal ball
      if (
        adventure.orbStatus == OrbStatus.READY ||
        adventure.orbStatus == OrbStatus.NOT_SET
      ) {
        return;
      }

      // We don't want to prime on something that might demand to be done later
      if (adventure.quest.mustBeDone != null) {
        return;
      }

      // If this quest is something that wants a prime itself
      if (adventure.quest.attemptPrime != null) {
        return;
      }
    }

    // We don't want to prime on something that would be potentially messy with outfit
    const outfit = adventure.adventure.outfit;

    if (
      (outfit != null && outfit == GreyOutfit.IGNORE_OUTFIT) ||
      //outfit.plusCombatWeight > 0 ||
      //  outfit.minusCombatWeight > 0 ||
      outfit.extra.find((e) => e.startsWith("+equip")) != null
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
        if (getPrimedResource() != null) {
          throw (
            quest.getId() +
            " claimed it didn't want to prime, but primed anyways"
          );
        }
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
        "This quest will attempt to prime " +
          ResourceCategory[primed.resource.type] +
          " (" +
          primed.resource.name +
          ") on this adventure as requested by " +
          primed.quest.getId(),
        "blue"
      );
      return;
    }
  }

  findGoodVisit(): FoundAdventure {
    const adv = this.findPrimedVisit();

    if (adv != null) {
      return adv;
    }

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

    const toNum = (status: OrbStatus) =>
      status == OrbStatus.IGNORED ? OrbStatus.NOT_SET : status;
    const compareFreeRuns = toInt(getProperty("_navelRunaways")) > 0;
    const levelingGoose = familiarWeight(this.goose) >= 6;
    const prioritize: QuestType[] = [
      "Council / MacGruffin / Black",
      "Skills / MPRegen",
      "Skills / ScalingItem",
      "Council / War / Filthworms",
    ];
    const prioritize2: QuestType[] = ["Manor / Kitchen"];

    this.possibleAdventures.sort((a1, a2) => {
      if (a1.considerPriority != a2.considerPriority) {
        return a1.considerPriority - a2.considerPriority;
      }

      if (toNum(a1.orbStatus) != toNum(a2.orbStatus)) {
        return a1.orbStatus - a2.orbStatus;
      }

      let p1 = prioritize.includes(a1.quest?.getId()) ? -1 : 1;
      let p2 = prioritize.includes(a2.quest?.getId()) ? -1 : 1;

      if (p1 != p2) {
        return p1 - p2;
      }

      const banished1: number =
        a1.adventure.location != null
          ? Object.keys(getLocationMonsters(a1.adventure.location)).filter(
              (m) => isBanished(Monster.get(m))
            ).length
          : 0;
      const banished2: number =
        a2.adventure.location != null
          ? Object.keys(getLocationMonsters(a2.adventure.location)).filter(
              (m) => isBanished(Monster.get(m))
            ).length
          : 0;

      // If we've done banishes in one location..
      if (banished1 != banished2) {
        // We want the location with the most banishes to be prioritized
        return banished2 - banished1;
      }

      if ((a1.quest == null) != (a2.quest == null)) {
        return a1.quest != null ? 1 : -1;
      }

      if (a1.status != a2.status) {
        return a1.status - a2.status;
      }

      p1 = prioritize2.includes(a1.quest?.getId()) ? -1 : 1;
      p2 = prioritize2.includes(a2.quest?.getId()) ? -1 : 1;

      if (p1 != p2) {
        return p1 - p2;
      }

      if (compareFreeRuns && a1.mayFreeRun != a2.mayFreeRun) {
        // If we're trying to level our goose, we want to prioritize places we're not allowed to free run in

        if (levelingGoose) {
          return a1.mayFreeRun ? 1 : -1;
        }

        return a1.mayFreeRun ? -1 : 1;
      }

      return 0;
    });

    let mustBeDone: [FoundAdventure, number][] = this.possibleAdventures
      .filter(
        (adv) =>
          adv.quest != null &&
          adv.quest.mustBeDone != null &&
          adv.quest.mustBeDone(false)
      )
      .map((a) => [a, a.quest.free != null && a.quest.free() ? 0 : 1]);

    if (mustBeDone.length > 0) {
      mustBeDone.sort(([, m1], [, m2]) => {
        return m1 - m2;
      });

      if (
        mustBeDone.length > 1 &&
        mustBeDone[0][1] > 0 &&
        mustBeDone.find(([a]) => a.quest.mustBeDone(true)) != null
      ) {
        mustBeDone = mustBeDone.filter(([a]) => a.quest.mustBeDone(true));
      }

      if (
        mustBeDone[0][1] > 0 &&
        mustBeDone.filter(([, m]) => m > 0).length > 1
      ) {
        print(
          "Multiple quests demand to be done! " +
            mustBeDone
              .filter(([, m]) => m > 0)
              .map((a) => a[0].quest.getId())
              .join(", "),
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

    if (this.possibleAdventures.length > 0) {
      const adv = this.possibleAdventures[0];

      // If we don't want to go here.. Then consider our user friendly fam trainer!
      if (
        adv.considerPriority >= ConsiderPriority.BAD_ABSORB &&
        myMeat() >= 1000 &&
        myAdventures() >= 20
      ) {
        return new EmergencyTrainer();
      }

      return this.possibleAdventures[0];
    }

    print(
      "Failed to find any quests that are willing to run, and failed to find any non-quest locations willing to run.",
      "red"
    );
    return null;
  }
}

class EmergencyTrainer implements FoundAdventure {
  locationInfo: AbsorbDetails = null;
  adventure: QuestAdventure = {
    location: null,
    run: () => {
      print(
        "Oh gosh! Grey Goose underperforming? No worries! Emergency trainer is on the case! We're going to slam them into the cake arena, and they'll come out looking for a fight!",
        "blue"
      );
      const fam = Familiar.get("Grey Goose");
      useFamiliar(fam);

      const chow = Item.get("Ghost Dog Chow");

      if (
        itemAmount(chow) > 0 &&
        historicalPrice(chow) * 2 < GreySettings.greyValueOfAdventure
      ) {
        print("Oh gosh! Ghost Dog Chow is on the menu!", "blue");

        while (familiarWeight(fam) < 6 && itemAmount(chow) > 0) {
          use(chow);
        }

        if (familiarWeight(fam) >= 6) {
          return;
        }

        print("Unfortunately Ghost Dog Chow wasn't enough!", "blue");
      }

      maximize("familiar experience -tie", false);

      let turnsSpent = 0;

      while (familiarWeight(fam) < 6) {
        if (turnsSpent >= 10) {
          throw "Spent 10 turns training grey goose, but no progress was made.";
        }

        const exp = fam.experience;

        turnsSpent++;
        cliExecute("train turns 1");

        if (exp == fam.experience) {
          throw "Expected goose to have gained exp, it didn't.";
        }
      }
    },
  };
  path?: PossiblePath = null;
  quest?: QuestInfo = null;
  status: QuestStatus = QuestStatus.READY;
  orbStatus: OrbStatus = OrbStatus.IGNORED;
  considerPriority: ConsiderPriority = ConsiderPriority.MUST_BE_DONE;
  mayFreeRun: boolean = false;
  freeRun = () => false;
}
