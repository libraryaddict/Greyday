import { Location, Item, availableAmount, Monster } from "kolmafia";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { currentPredictions } from "../../../../utils/GreyUtils";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11ManorSoda implements QuestInfo {
  soda: Item = Item.get("blasting soda");
  laundry: Location = Location.get("The Haunted Laundry Room");
  unstable: Item = Item.get("unstable fulminate");
  bomb: Item = Item.get("Wine Bomb");
  monster: Monster = Monster.get("cabinet of Dr. Limpieza");

  getId(): QuestType {
    return "Council / MacGruffin / Manor / Soda";
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
      availableAmount(this.soda) > 0 ||
      availableAmount(this.unstable) > 0 ||
      availableAmount(this.bomb) > 0
    ) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit().setItemDrops();

    if (currentPredictions().get(this.laundry) == this.monster) {
      outfit.setChampagneBottle();
    }

    return {
      location: this.laundry,
      outfit: outfit,
      olfaction: [this.monster],
      run: () => {
        const settings = new AdventureSettings();
        settings.addNoBanish(this.monster);

        greyAdv(this.laundry, outfit, settings);
      },
    };
  }

  getLocations(): Location[] {
    return [this.laundry];
  }
}
