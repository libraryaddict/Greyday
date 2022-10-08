import {
  Location,
  Familiar,
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
import { PossiblePath } from "../../../typings/TaskInfo";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { MountainStatus } from "../QuestL8IcePeak";

export class QuestL8MountainNinja implements QuestInfo {
  ninja: Location = Location.get("Lair of the Ninja Snowmen");
  assassin: Monster = Monster.get("Ninja snowman assassin");
  canHitCombat: boolean;

  getId(): QuestType {
    return "Council / Ice / Ninjas";
  }

  level(): number {
    return 8;
  }

  canAcceptPrimes(): boolean {
    return false;
  }

  status(): QuestStatus {
    const status = this.getStatus();

    if (status > MountainStatus.GET_OUTFIT) {
      return QuestStatus.COMPLETED;
    }

    if (status < MountainStatus.GET_OUTFIT) {
      return QuestStatus.NOT_READY;
    }

    if (
      this.canHitCombat == null &&
      [...Object.keys(myEffects())]
        .map((e) => toEffect(e))
        .find((e) => numericModifier(e, "Combat Rate") != 0) == null
    ) {
      maximize("+combat -tie", true);

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

    if (this.canHitCombat || numericModifier("Combat Rate") >= 25) {
      return QuestStatus.READY;
    }

    // If we've reached snowman time but don't have the skill
    if (!hasCombatSkillReady()) {
      if (haveSkill(Skill.get("Piezoelectric Honk"))) {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  getStatus(): MountainStatus {
    return getQuestStatus("questL08Trapper");
  }

  run(): QuestAdventure {
    // See if we can unlock peak yet
    if (this.getOutfit().find((i) => availableAmount(i) == 0) == null) {
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

    const outfit = new GreyOutfit().setPlusCombat();

    return {
      location: this.ninja,
      outfit: outfit,
      freeRun: (monster) => monster != this.assassin,
      run: () => {
        greyAdv(this.ninja, outfit);
      },
    };
  }

  getLocations(): Location[] {
    return [this.ninja];
  }

  getOutfit(): Item[] {
    return ["Ninja rope", "Ninja Crampons", "Ninja Carabiner"].map((i) =>
      Item.get(i)
    );
  }
}
