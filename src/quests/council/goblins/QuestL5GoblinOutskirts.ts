import { availableAmount, Familiar, Item, Location, use } from "kolmafia";
import { DelayBurners } from "../../../iotms/delayburners/DelayBurners";
import { greyAdv } from "../../../utils/GreyLocations";
import { PropertyManager } from "../../../utils/Properties";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL5GoblinOutskirts implements QuestInfo {
  map: Item = Item.get("Cobb's Knob map");
  key: Item = Item.get("knob goblin encryption key");
  location: Location = Location.get("the outskirts of cobb's knob");

  getId(): QuestType {
    return "Council / Goblins / Outskirts";
  }

  level(): number {
    return this.location.turnsSpent < 10 ? 4 : 5;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL05Goblin");

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    if (this.location.turnsSpent < 10) {
      if (DelayBurners.isDelayBurnerReady()) {
        return QuestStatus.READY;
      }

      if (DelayBurners.isDelayBurnerFeasible()) {
        return QuestStatus.FASTER_LATER;
      }
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: this.location,
      freeRun: () => true,
      run: () => {
        if (availableAmount(this.map) > 0 && availableAmount(this.key)) {
          use(this.map);
        } else {
          const ready = DelayBurners.getReadyDelayBurner();

          if (ready != null) {
            ready.doFightSetup();
          } else {
            DelayBurners.tryReplaceCombats();
          }

          const props = new PropertyManager();
          props.setChoice(113, 2);
          props.setChoice(111, 3);
          props.setChoice(118, 2);

          try {
            greyAdv(this.location);
          } finally {
            props.resetAll();
          }
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.location];
  }
}
