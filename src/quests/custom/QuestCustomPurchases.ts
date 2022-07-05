import {
  Location,
  Familiar,
  Item,
  availableAmount,
  myMeat,
  buy,
  print,
  retrieveItem,
  getProperty,
} from "kolmafia";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestCustomPurchases implements QuestInfo {
  popper: Item = Item.get("Porkpie-mounted popper");
  silent: Item = Item.get("Silent Beret");
  stealth: Item = Item.get("Xiblaxian stealth cowl");

  getId(): QuestType {
    return "Misc / Purchases";
  }

  level(): number {
    return 8;
  }

  status(): QuestStatus {
    if (
      availableAmount(this.silent) > 0 ||
      availableAmount(this.stealth) > 0 ||
      availableAmount(this.popper) > 0
    ) {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("_fireworksShopHatBought") == "true") {
      return QuestStatus.COMPLETED;
    }

    if (myMeat() <= 3000) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      outfit: new GreyOutfit("-tie"),
      run: () => {
        print("Now trying to buy " + this.popper);
        retrieveItem(this.popper);
        //          buy(item);
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
