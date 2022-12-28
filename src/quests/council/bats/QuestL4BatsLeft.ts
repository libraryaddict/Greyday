import { Location } from "kolmafia";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
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
    const status = getQuestStatus("questL04Bat");

    // If right has been unlocked
    if (status > 1) {
      return QuestStatus.COMPLETED;
    }

    if (status < 1) {
      return QuestStatus.NOT_READY;
    }

    const statusShen = getQuestStatus("questL11Shen");

    if (statusShen <= 1) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      outfit: new GreyOutfit().addWeight("Stench Res", 100, 1, 1),
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
