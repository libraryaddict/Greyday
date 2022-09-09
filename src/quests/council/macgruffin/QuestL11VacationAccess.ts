import {
  buy,
  getProperty,
  Item,
  knollAvailable,
  Location,
  myAscensions,
  myMeat,
  toInt,
} from "kolmafia";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
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

    if (myMeat() < 6000 || knollAvailable()) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        buy(Item.get("Desert Bus pass"));

        if (toInt(getProperty("lastDesertUnlock")) != myAscensions()) {
          throw "Expected desert access";
        }
      },
    };
  }

  canAcceptPrimes(): boolean {
    return false;
  }

  getLocations(): Location[] {
    return [];
  }
}
