import { availableAmount, Item, Location, Monster } from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import {
  hasNonCombatSkillActive,
  hasNonCombatSkillsReady,
} from "../../../GreyAdventurer";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { AbsorbsProvider } from "../../../utils/GreyAbsorber";
import { DelayBurners } from "../../../iotms/delayburners/DelayBurners";

export class ManorBathroom implements QuestInfo {
  location: Location = Location.get("The Haunted Bathroom");
  item: Item = Item.get("Lady Spookyraven's powder puff");
  toAbsorb: Monster[];

  level(): number {
    return 5;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questM21Dance");

    if (status < 1) {
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
    let outfit = new GreyOutfit();

    if (!this.hasDelay()) {
      outfit.setNoCombat();
    }

    return {
      location: this.location,
      outfit: outfit,
      run: () => {
        let props = new PropertyManager();
        props.setChoice(882, 1);
        props.setChoice(881, 1);

        if (this.hasDelay()) {
          let delay = DelayBurners.getReadyDelayBurner();

          if (delay != null) {
            delay.doFightSetup();
          }
        } else if (this.toAbsorb.length == 0) {
          DelayBurners.tryReplaceCombats();
        }

        try {
          greyAdv(this.location, outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getId(): QuestType {
    return "Manor / Bathroom";
  }

  getLocations(): Location[] {
    return [this.location];
  }
}
