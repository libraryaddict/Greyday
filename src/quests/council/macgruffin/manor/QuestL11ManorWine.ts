import { Location, Item, availableAmount, Monster } from "kolmafia";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11ManorWine implements QuestInfo {
  wine: Item = Item.get("bottle of Chateau de Vinegar");
  celler: Location = Location.get("The Haunted Wine Cellar");
  unstable: Item = Item.get("unstable fulminate");
  bomb: Item = Item.get("Wine Bomb");

  getId(): QuestType {
    return "Council / MacGruffin / Manor / Wine";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL11Manor");

    if (status < 2) {
      return QuestStatus.NOT_READY;
    }

    if (
      status > 2 ||
      availableAmount(this.wine) > 0 ||
      availableAmount(this.unstable) > 0 ||
      availableAmount(this.bomb) > 0
    ) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit().setItemDrops();

    return {
      location: this.celler,
      outfit: outfit,
      run: () => {
        const settings = new AdventureSettings();
        settings.addNoBanish(Monster.get("possessed wine rack"));

        greyAdv(this.celler, outfit, settings);
      },
    };
  }

  getLocations(): Location[] {
    return [this.celler];
  }
}
