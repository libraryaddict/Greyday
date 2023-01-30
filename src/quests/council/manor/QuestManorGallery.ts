import {
  availableAmount,
  getProperty,
  Item,
  Location,
  Monster,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import { hasNonCombatSkillsReady } from "../../../GreyAdventurer";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import {
  DelayBurners,
  DelayCriteria,
} from "../../../iotms/delayburners/DelayBurners";
import {
  getGhostBustingMacro,
  getGhostBustingOutfit,
  isGhostBustingTime,
  shouldAvoidGhosts,
} from "../../custom/QuestTrapGhost";

export class ManorGallery implements QuestInfo {
  location: Location = Location.get("The Haunted Gallery");
  item: Item = Item.get("Lady Spookyraven's dancing shoes");
  sword: Item = Item.get("serpentine sword");
  toAbsorb: Monster[];

  level(): number {
    return 5;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questM21Dance");

    if (
      status < 1 ||
      (isGhostBustingTime(this.location) && shouldAvoidGhosts())
    ) {
      return QuestStatus.NOT_READY;
    }

    if (status > 1 || availableAmount(this.item) > 0) {
      return QuestStatus.COMPLETED;
    }

    if (!hasNonCombatSkillsReady()) {
      return QuestStatus.FASTER_LATER;
    }

    if (this.hasDelay()) {
      if (DelayBurners.isDelayBurnerReady()) {
        return QuestStatus.READY;
      }

      if (DelayBurners.isDelayBurnerFeasible()) {
        return QuestStatus.FASTER_LATER;
      }
    }

    return QuestStatus.READY;
  }

  hasDelay(): boolean {
    return this.location.turnsSpent < 5 && this.toAbsorb.length == 0;
  }

  run(): QuestAdventure {
    const outfit = isGhostBustingTime(this.location)
      ? getGhostBustingOutfit()
      : new GreyOutfit();

    outfit.setNoCombat();

    if (this.toAbsorb.length == 0) {
      outfit.addDelayer(
        DelayCriteria().withForcedFights(this.hasDelay() ? null : false)
      );
    }

    return {
      location: isGhostBustingTime(this.location) ? null : this.location,
      outfit: outfit,
      freeRun: () => true,
      run: () => {
        const props = new PropertyManager();
        const settings = new AdventureSettings();

        if (isGhostBustingTime(this.location)) {
          settings.setStartOfFightMacro(getGhostBustingMacro());
        }

        /* if (availableAmount(this.sword) == 0) {
          props.setChoice(89, 2);
        } else*/ {
          props.setChoice(89, 4);
        }

        props.setChoice(914, 1);

        if (getProperty("louvreDesiredGoal") != "7") {
          props.setProperty("louvreDesiredGoal", "7");
        }

        try {
          greyAdv(this.location, outfit, settings);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getId(): QuestType {
    return "Manor / Gallery";
  }

  getLocations(): Location[] {
    return [this.location];
  }

  mustBeDone(reallyMustBeDone: boolean): boolean {
    if (reallyMustBeDone) {
      return false;
    }

    return isGhostBustingTime(this.location);
  }
}
