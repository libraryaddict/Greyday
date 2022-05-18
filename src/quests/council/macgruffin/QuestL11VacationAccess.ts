import {
  Location,
  Familiar,
  myMeat,
  gnomadsAvailable,
  buy,
  getProperty,
  myAscensions,
  toInt,
} from "kolmafia";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL11ShoreAccess implements QuestInfo {
  getId(): QuestType {
    return "Council / MacGruffin / Shore";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    if (toInt(getProperty("lastDesertUnlock")) == myAscensions()) {
      return QuestStatus.COMPLETED;
    }

    if (myMeat() < 6000) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        buy(Item.get("Desert Bus pass"));

        if (toInt(getProperty("lastDesertUnlock")) != myAscensions()) {
          throw "Expected desert access";
        }
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
