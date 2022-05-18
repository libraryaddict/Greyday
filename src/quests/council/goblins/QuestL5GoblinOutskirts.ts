import { availableAmount, Familiar, Item, Location, use } from "kolmafia";
import { greyAdv } from "../../../utils/GreyLocations";
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
    return 5;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL05Goblin");

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: this.location,
      run: () => {
        if (availableAmount(this.map) > 0 && availableAmount(this.key)) {
          use(this.map);
        } else {
          greyAdv(this.location);
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.location];
  }
}
