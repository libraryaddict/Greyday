import { Location, Familiar, Item, availableAmount, use } from "kolmafia";
import { greyAdv } from "../../../utils/GreyLocations";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL4BatsLeft implements QuestInfo {
  location: Location = Location.get("The Batrat and Ratbat Burrow");

  getId(): QuestType {
    return "Council / Bats / UnlockRight";
  }

  level(): number {
    return 4;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL04Bat");

    // If right has been unlocked
    if (status > 1) {
      return QuestStatus.COMPLETED;
    }

    let statusShen = getQuestStatus("questL11Shen");

    if (statusShen <= 1) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: this.location,
      run: () => {
        greyAdv(this.location);
      },
    };
  }

  getLocations(): Location[] {
    return [this.location];
  }
}
