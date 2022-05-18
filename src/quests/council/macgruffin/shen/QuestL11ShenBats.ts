import { canAdv } from "canadv.ash";
import { Location, Familiar } from "kolmafia";
import { greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11ShenBats implements QuestInfo {
  location: Location = Location.get("The Batrat and Ratbat Burrow");

  getId(): QuestType {
    return "Council / MacGruffin / Shen / Bats";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL11Shen");

    if (status > 1) {
      return QuestStatus.COMPLETED;
    }

    if (status < 1) {
      return QuestStatus.NOT_READY;
    }

    if (getQuestStatus("questL04Bat") < 1) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();

    if (getQuestStatus("questL04Bat") <= 3) {
      outfit.setItemDrops();
    }

    return {
      location: this.location,
      outfit: outfit,
      run: () => {
        greyAdv(this.location);
      },
    };
  }

  getLocations(): Location[] {
    return [this.location];
  }
}
