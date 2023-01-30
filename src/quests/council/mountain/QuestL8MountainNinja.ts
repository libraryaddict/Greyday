import {
  Location,
  availableAmount,
  maximize,
  numericModifier,
  visitUrl,
  Item,
  haveSkill,
  Skill,
  Monster,
  myEffects,
  toEffect,
} from "kolmafia";
import {
  hasCombatSkillReady,
  hasNonCombatSkillActive,
} from "../../../GreyAdventurer";
import { restoreHPTo } from "../../../tasks/TaskMaintainStatus";
import { ResourceCategory } from "../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../typings/TaskInfo";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  currentPredictions,
  getAllCombinations,
} from "../../../utils/GreyUtils";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { MountainStatus } from "../QuestL8IcePeak";
import { GreyPulls } from "../../../utils/GreyResources";
import { AdventureFinder } from "../../../GreyChooser";
import { DelayCriteria } from "../../../iotms/delayburners/DelayBurners";

export class QuestL8MountainNinja extends TaskInfo implements QuestInfo {
  ninja: Location = Location.get("Lair of the Ninja Snowmen");
  assassin: Monster = Monster.get("Ninja snowman assassin");
  canHitCombat: boolean;
  outfit: Item[] = ["Ninja rope", "Ninja Crampons", "Ninja Carabiner"].map(
    (s) => Item.get(s)
  );
  paths: PossiblePath[];
  willNeedRecalculate = false;

  createPaths(assumeUnstarted: boolean) {
    this.paths = [];
    this.willNeedRecalculate =
      assumeUnstarted || getQuestStatus("questL11Shen") < 4;

    const itemsNeeded = assumeUnstarted
      ? this.outfit
      : this.outfit.filter((i) => availableAmount(i) == 0);

    if (itemsNeeded.length == 0) {
      this.paths.push(new PossiblePath(0));
      return;
    }

    // Lets work on the assumpsion that the player will definitely hit +25 at some point
    // Encounter rate is [Combat] / 200
    // So +25 is 12.5%
    const combatRate = 25;

    const getTurnsToEncounter = (turns: number) => {
      return Math.min(11, Math.ceil(1 / (combatRate / 200 + turns * 0.015)));
    };

    const plan = [];

    for (let i = 0; i < itemsNeeded.length; i++) {
      let turns = getTurnsToEncounter(8 * (1 + i));

      // If we have spent less than 11 turns here, adjust the turns needed downwards
      // Shen will come here..
      if (i == 0 && (assumeUnstarted || this.ninja.turnsSpent < 11)) {
        turns = Math.min(
          11 - Math.max(assumeUnstarted ? 0 : this.ninja.turnsSpent, 6)
        );
      }

      plan.push(turns);
      plan.push(itemsNeeded[i]);
    }

    for (const combo of getAllCombinations(plan)) {
      if (combo.length != itemsNeeded.length) {
        continue;
      }

      const plan = new PossiblePath(
        combo.filter((c) => typeof c == "number").reduce((a, b) => a + b, 0)
      );

      for (const item of combo) {
        if (typeof item == "number") {
          continue;
        }

        plan.addPull(item);
      }

      this.paths.push(plan);
    }
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  getId(): QuestType {
    return "Council / Ice / Ninjas";
  }

  level(): number {
    return 8;
  }

  canAcceptPrimes(): boolean {
    return false;
  }

  status(path: PossiblePath): QuestStatus {
    const status = this.getStatus();

    if (status > MountainStatus.GET_OUTFIT) {
      return QuestStatus.COMPLETED;
    }

    if (status < MountainStatus.GET_OUTFIT || path == null) {
      return QuestStatus.NOT_READY;
    }

    if (
      this.canHitCombat == null &&
      [...Object.keys(myEffects())]
        .map((e) => toEffect(e))
        .find((e) => numericModifier(e, "Combat Rate") != 0) == null
    ) {
      maximize("+combat -acc3 -tie", true);

      this.canHitCombat =
        numericModifier("Generated:_spec", "Combat Rate") >= 25;
    } else if (this.canHitCombat === false) {
      // If we're running +25 combat with no effects, then yes
      this.canHitCombat =
        numericModifier("Combat Rate") >= 25 &&
        [...Object.keys(myEffects())]
          .map((e) => toEffect(e))
          .find((e) => numericModifier(e, "Combat Rate") > 0) == null;
    }

    if (hasNonCombatSkillActive()) {
      return QuestStatus.NOT_READY;
    }

    const outfitNeeded = this.outfit.filter((i) => availableAmount(i) == 0);

    if (outfitNeeded.length == 0) {
      return QuestStatus.READY;
    }

    const shenTime = getQuestStatus("questL11Shen") < 4;

    if (this.willNeedRecalculate != shenTime) {
      return QuestStatus.READY;
    }

    if (
      shenTime &&
      outfitNeeded.length <= path.canUse(ResourceCategory.PULL) &&
      !currentPredictions().has(this.ninja)
    ) {
      return QuestStatus.NOT_READY;
    }

    const qStatus = shenTime ? QuestStatus.FASTER_LATER : QuestStatus.READY;

    if (this.canHitCombat || numericModifier("Combat Rate") >= 25) {
      return qStatus;
    }

    // If we've reached snowman time but don't have the skill
    if (!hasCombatSkillReady()) {
      if (haveSkill(Skill.get("Piezoelectric Honk"))) {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.NOT_READY;
    }

    return qStatus;
  }

  getStatus(): MountainStatus {
    return getQuestStatus("questL08Trapper");
  }

  run(path: PossiblePath): QuestAdventure {
    if (
      this.willNeedRecalculate &&
      getQuestStatus("questL11Shen") >= 4 &&
      path != null &&
      path.canUse(ResourceCategory.PULL)
    ) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          this.willNeedRecalculate = false;
          AdventureFinder.recalculatePath();
        },
      };
    }

    const outfitNeeded = this.outfit.filter((i) => availableAmount(i) == 0);

    // See if we can unlock peak yet
    if (outfitNeeded.length == 0 || path == null) {
      return {
        location: null,
        run: () => {
          if (numericModifier("Cold Resistance") < 5) {
            maximize("cold res -tie", false);
          }

          visitUrl("place.php?whichplace=mclargehuge&action=cloudypeak");
        },
      };
    }

    const shenTime = getQuestStatus("questL11Shen") < 4;

    if (
      outfitNeeded.length <= path.canUse(ResourceCategory.PULL) &&
      !shenTime
    ) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          const pulls = path.canUse(ResourceCategory.PULL);

          for (let i = 0; i < pulls; i++) {
            GreyPulls.tryPull(outfitNeeded[i]);
            path.addUsed(ResourceCategory.PULL);
          }
        },
      };
    }

    const outfit = new GreyOutfit().setPlusCombat();
    outfit.initWeight = 0.5;

    outfit.addDelayer(DelayCriteria().withForcedFights(null));

    return {
      location: this.ninja,
      outfit: outfit,
      freeRun: (monster) => monster != this.assassin,
      run: () => {
        restoreHPTo(70);

        greyAdv(this.ninja, outfit);
      },
    };
  }

  getLocations(): Location[] {
    return [this.ninja];
  }
}
