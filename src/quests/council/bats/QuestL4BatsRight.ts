import { Location, Familiar, availableAmount, Item, use } from "kolmafia";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL4BatsRight implements QuestInfo {
  loc: Location = Location.get("The Beanbat Chamber");
  bean: Item = Item.get("Enchanted Bean");

  getId(): QuestType {
    return "Council / Bats / UnlockBoss";
  }

  level(): number {
    return 4;
  }

  status(): QuestStatus {
    let giantStatus = getQuestStatus("questL10Garbage");

    if (
      getQuestStatus("questL04Bat") > 2 &&
      (giantStatus > 0 || availableAmount(this.bean) > 0)
    ) {
      return QuestStatus.COMPLETED;
    }

    if (getQuestStatus("questL04Bat") < 2) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setItemDrops();

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        greyAdv(this.loc, outfit);
      },
    };
  }

  getLocations(): Location[] {
    return [this.loc];
  }
}
