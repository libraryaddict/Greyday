import {
  Location,
  Familiar,
  availableAmount,
  Item,
  use,
  Monster,
} from "kolmafia";
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
  monster: Monster = Monster.get("beanbat");

  getId(): QuestType {
    return "Council / Bats / UnlockBoss";
  }

  level(): number {
    return 4;
  }

  needsBean(): boolean {
    return (
      availableAmount(this.bean) == 0 && getQuestStatus("questL10Garbage") <= 0
    );
  }

  status(): QuestStatus {
    if (getQuestStatus("questL04Bat") > 2 && !this.needsBean()) {
      return QuestStatus.COMPLETED;
    }

    if (getQuestStatus("questL04Bat") < 2) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit().setItemDrops();

    return {
      location: this.loc,
      outfit: outfit,
      orbs: this.needsBean() ? [this.monster] : null,
      run: () => {
        greyAdv(this.loc, outfit);
      },
    };
  }

  getLocations(): Location[] {
    return [this.loc];
  }
}
