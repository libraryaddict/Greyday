import { canAdv } from "canadv.ash";
import {
  Effect,
  Familiar,
  familiarWeight,
  haveEffect,
  haveSkill,
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
import { QuestAdventure, QuestInfo, QuestStatus } from "./quests/Quests";
import { PossiblePath } from "./typings/TaskInfo";
import { SimmedPath } from "./typings/TaskManager";
import {
  Absorb,
  AbsorbsProvider,
  AdventureLocation,
  Reabsorbed,
} from "./utils/GreyAbsorber";
import { GreySettings } from "./utils/GreySettings";
import { currentPredictions, doColor } from "./utils/GreyUtils";

export interface FoundAdventure {
  path: PossiblePath;
  quest: QuestInfo;
  locationInfo?: AdventureLocation;
  adventure?: QuestAdventure;
}

export class AdventureFinder {
  registry: QuestRegistry = new QuestRegistry();
  defeated: Map<Monster, Reabsorbed>;
  viableQuests: [QuestInfo, PossiblePath][];
  absorbs: AbsorbsProvider = new AbsorbsProvider();
  goose: Familiar = Familiar.get("Grey Goose");
  goodAbsorbs: AdventureLocation[];
  questLocations: Location[];
  path: SimmedPath;

  getAllRawQuests(): QuestInfo[] {
    return this.registry.getQuestsInOrder();
  }

  getDoableQuests(): [QuestInfo, PossiblePath][] {
    const quests: [QuestInfo, PossiblePath][] = [];

    const tryAdd = (q: QuestInfo, path: PossiblePath) => {
      if (q.level() > myLevel() || q.level() < 0) {
        return;
      }

      if (
        q.level() * (haveSkill(Skill.get("Infinite Loop")) ? 1 : 6) >
        myBasestat(Stat.get("Muscle"))
      ) {
        return;
      }

      const status = q.status(path);

      if (status == QuestStatus.NOT_READY || status == QuestStatus.COMPLETED) {
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
    this.viableQuests = this.getDoableQuests();
    this.setAbsorbs();
    this.defeated = this.absorbs.getAbsorbedMonstersFromInstance();
    this.goodAbsorbs = this.absorbs.getExtraAdventures(this.defeated, true);
    this.setQuestLocations();
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

  getNumberOfQuestsWithAdventures(): number {
    let count = 0;

    loop: for (const [quest, path] of this.path.thisPath) {
      if (quest.level() < 1 || quest.status(path) == QuestStatus.COMPLETED) {
        continue;
      }

      for (const loc of quest.getLocations()) {
        const advs = this.absorbs.getAdventuresInLocation(this.defeated, loc);

        if (advs == null || advs.turnsToGain == 0) {
          continue;
        }

        count++;
        continue loop;
      }
    }

    return count;
  }

  getQuestsWithAdventures(): [QuestInfo, PossiblePath, AdventureLocation][] {
    // We want to generate our adventues

    const toReturn: [QuestInfo, PossiblePath, AdventureLocation][] = [];

    this.viableQuests.forEach(([q, path]) => {
      const run = q.run(path);

      if (run.location == null && q.getAbsorbs == null) {
        return;
      }

      const outfit = run.outfit;

      if (
        outfit != null &&
        ((outfit.minusCombatWeight > 0 && hasCombatSkillActive()) ||
          (outfit.plusCombatWeight > 0 && hasNonCombatSkillActive()))
      ) {
        return;
      }

      let advs: AdventureLocation;

      if (q.getAbsorbs != null) {
        advs = this.absorbs.getAdventuresByAbsorbs(
          this.defeated,
          q.getAbsorbs()
        );
      } else {
        advs = this.absorbs.getAdventuresInLocation(
          this.defeated,
          run.location
        );
      }

      if (advs == null || advs.turnsToGain == 0) {
        return;
      }

      toReturn.push([q, path, advs]);
    });

    toReturn.sort((q1, q2) => {
      if (q1[0].status(q1[1]) != q2[0].status(q2[1])) {
        return 0;
      }

      return q1[2].turnsToGain - q2[2].turnsToGain;
    });

    return toReturn;
  }

  getQuestsWithoutAdventures(): [QuestInfo, PossiblePath, AdventureLocation][] {
    // We want to level up our goose here

    const toReturn: [QuestInfo, PossiblePath, AdventureLocation][] = [];

    this.viableQuests.forEach(([q, path]) => {
      const run = q.run(path);

      const outfit = run.outfit;

      if (
        outfit != null &&
        ((outfit.minusCombatWeight > 0 && hasCombatSkillActive()) ||
          (outfit.plusCombatWeight > 0 && hasNonCombatSkillActive()))
      ) {
        return;
      }

      if (run.location == null) {
        toReturn.push([q, path, null]);
        return;
      }

      const advs = this.absorbs.getAdventuresInLocation(
        this.defeated,
        run.location,
        true
      );

      if (advs != null && advs.turnsToGain > 0) {
        return;
      }

      toReturn.push([q, path, advs]);
    });

    return toReturn;
  }

  getNonQuestsWithSkills(): [AdventureLocation, number][] {
    const toReturn: [AdventureLocation, number][] = this.goodAbsorbs
      .filter(
        (a) =>
          a.skills.size > 0 &&
          canAdv(a.location) &&
          !this.questLocations.includes(a.location)
      )
      .map((a) => {
        return [a, a.expectedTurnsProfit + this.generateWeights(a.skills) / 10];
      });

    return toReturn.filter((a) => a[1] > 0);
  }

  getNonQuestsWithAdventures(): [AdventureLocation, number][] {
    // We want to generate our adventues
    // Returns a location and the adventures generated, with helpful skills given a weight / 10

    const toReturn: [AdventureLocation, number][] = this.goodAbsorbs
      .filter(
        (a) =>
          a.turnsToGain > 0 &&
          canAdv(a.location) &&
          !this.questLocations.includes(a.location)
      )
      .map((a) => {
        return [a, a.expectedTurnsProfit + this.generateWeights(a.skills) / 10];
      });

    return toReturn.filter((a) => a[1] > 0);
  }

  getNonQuestsWithoutAdventures(): [AdventureLocation, number][] {
    // We want to level up our goose here, and grab w/e required skills
    // Returns locations and the weight, where helpful skills are weight of 1, required are weight of 2

    const toReturn: [AdventureLocation, number][] = this.goodAbsorbs
      .filter(
        (a) =>
          a.turnsToGain == 0 &&
          canAdv(a.location) &&
          !this.questLocations.includes(a.location)
      )
      .map((a) => {
        return [a, this.generateWeights(a.skills)];
      });

    return toReturn.filter((a) => a[1] > 0);
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

  generateWeights(skills: Map<Absorb, string>): number {
    let weight = 0;
    const handy = this.absorbs.getUsefulSkills();
    const mustHave = this.absorbs.getMustHaveSkills();

    for (const k of skills.keys()) {
      let w = 0;

      if (!GreySettings.speedRunMode && handy.has(k.skill)) {
        //   w = GreySettings.handySkillsWeight;
      } else if (mustHave.has(k.skill)) {
        w = GreySettings.usefulSkillsWeight;
      } else {
        continue;
      }

      weight += w;
    }

    return weight;
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

  printStatus() {
    const hasBlessing =
      haveEffect(Effect.get("Brother Corsican's Blessing")) +
        haveEffect(Effect.get("A Girl Named Sue")) >
      0;

    for (const [quest, path] of this.viableQuests) {
      let status = quest.status(path);
      status = this.getModifiedStatus(status, quest.run(path), hasBlessing);

      const line =
        "<u>" +
        quest.getId() +
        "</u>: " +
        doColor(QuestStatus[status], this.getQuestColor(status));

      printHtml(line);
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

    let mustBeDone = this.viableQuests.filter(
      ([q]) => q.mustBeDone != null && q.mustBeDone()
    );

    if (
      mustBeDone.length > 1 &&
      mustBeDone.filter(
        ([m]) => m.needAdventures == null || m.needAdventures() > 0
      ).length <= 1
    ) {
      mustBeDone = mustBeDone.filter(
        ([m]) => m.needAdventures != null && m.needAdventures() <= 0
      );

      if (mustBeDone.length > 1) {
        mustBeDone = mustBeDone.splice(1);
      }
    }

    if (mustBeDone.length > 1) {
      print(
        "Multiple quests demand to be done! " +
          mustBeDone.map(([q]) => q.getId()).join(", "),
        "red"
      );
      print("This is not a real error, but not that great either.", "red");
    }

    if (mustBeDone.length > 0) {
      return {
        quest: mustBeDone[0][0],
        path: mustBeDone[0][1],
        locationInfo: this.absorbs.getAdventuresInLocation(
          this.defeated,
          mustBeDone[0][0].run(mustBeDone[0][1]).location,
          true
        ),
      };
    }

    if (generateAdventuresOrAbort && !this.hasEnoughGooseWeight()) {
      print(
        "We need more adventures but we're not ready for a reabsorb..",
        "red"
      );
      return;
    }

    const getPredicts = () => {
      if (predicts == null) {
        predicts = currentPredictions();
      }

      return predicts;
    };
    const hasBlessing =
      haveEffect(Effect.get("Brother Corsican's Blessing")) +
        haveEffect(Effect.get("A Girl Named Sue")) >
      0;

    let quests: [QuestInfo, PossiblePath, AdventureLocation][] = [];
    let nonQuests: [AdventureLocation, number][] = [];

    if (this.hasEnoughGooseWeight() && myLevel() >= 5) {
      quests = this.getQuestsWithAdventures();
      nonQuests = this.getNonQuestsWithAdventures();

      nonQuests = nonQuests.filter(([loc]) => {
        const mon = getPredicts().get(loc.location);

        loc.shouldRunOrb = mon == null || loc.monsters.includes(mon);
        loc.ensuredOrb = mon != null && loc.monsters.includes(mon);

        return loc.shouldRunOrb;
      });
    } else {
      // It doesn't have enough goose weight to absorb adventures, so lets try do non-quests without adventures
      // This is mostly skills
      nonQuests = this.getNonQuestsWithoutAdventures();
    }

    if (quests.length + nonQuests.length == 0) {
      quests = this.getQuestsWithoutAdventures();

      if (quests.length == 0 && nonQuests.length == 0) {
        quests = this.getQuestsWithAdventures();
      }
    }

    // Now we see if we can find quests that are ready to run.
    // If we can't, then we see if we can find non-quests that are ready to run
    // If we can't, then we see if we can find quests that don't want to run
    // If we can't, then we abort.

    let bestQuest: [QuestInfo, PossiblePath, AdventureLocation];
    let bestStatus: QuestStatus;
    let bestWantsResetOrb: boolean;
    let bestWantsToRunOrb: boolean;
    let predicts: Map<Location, Monster>;

    for (const holder of quests) {
      const [quest, path, adv] = holder;

      let status = quest.status(path);
      let runned: QuestAdventure;
      let wantToResetOrb: boolean = false;
      let wantsToRunOrb: boolean = false;

      if (
        this.hasEnoughGooseWeight() &&
        adv != null &&
        adv.monsters.length > 0
      ) {
        const a = adv;
        runned = quest.run(path);

        const current = getPredicts().get(a.location);

        if (current == null || a.monsters.includes(current)) {
          wantsToRunOrb = true;
          a.shouldRunOrb = true;
          a.ensuredOrb = current != null && a.monsters.includes(current);

          if (
            current != null &&
            this.hasEnoughGooseWeight() &&
            a.turnsToGain > 0
          ) {
            a.expectedTurnsProfit = a.turnsToGain - 1;
          }
        } else {
          wantToResetOrb = true;
        }
      }

      if (status == QuestStatus.READY) {
        if (runned == null) {
          runned = quest.run(path);
        }

        status = this.getModifiedStatus(status, runned, hasBlessing);
      }

      if (bestQuest != null) {
        if (bestWantsToRunOrb) {
          if (status >= bestStatus) {
            continue;
          }
        } else if (!bestWantsResetOrb && wantToResetOrb) {
          continue;
        } else if (!wantsToRunOrb) {
          if (status >= bestStatus) {
            continue;
          }
        }
      }

      bestQuest = holder;
      bestStatus = quest.status(path);
      bestWantsResetOrb = wantToResetOrb;
      bestWantsToRunOrb = wantsToRunOrb;
    }

    if (bestQuest != null && bestWantsToRunOrb) {
      return {
        quest: bestQuest[0],
        path: bestQuest[1],
        locationInfo: bestQuest[2],
      };
    }

    nonQuests.sort((v1, v2) => v2[1] - v1[1]);

    if (nonQuests.length > 0) {
      let best: AdventureLocation;

      for (const [adv] of nonQuests) {
        const mon = getPredicts().get(adv.location);

        adv.shouldRunOrb =
          this.hasEnoughGooseWeight() &&
          (mon == null || adv.monsters.includes(mon));

        // If we already have a best, and the would-be doesn't want to run orb
        if (best != null && !adv.shouldRunOrb) {
          continue;
        }

        best = adv;

        if (best.shouldRunOrb) {
          break;
        }
      }

      if (best != null && (bestQuest == null || best.shouldRunOrb)) {
        return {
          quest: null,
          path: null,
          locationInfo: best,
        };
      }
    }

    if (bestQuest != null) {
      return {
        quest: bestQuest[0],
        path: bestQuest[1],
        locationInfo: bestQuest[2],
      };
    }

    print(
      "Failed to find any quests that are willing to run, and failed to find any non-quest locations willing to run.",
      "red"
    );
    return null;
  }
}
