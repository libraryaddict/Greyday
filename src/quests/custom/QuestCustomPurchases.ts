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
  firePlusCombat: Item = Item.get("sombrero-mounted sparkler");

  getId(): QuestType {
    return "Misc / Purchases";
  }

  level(): number {
    return 8;
  }

  status(): QuestStatus {
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
        let toBuy = this.popper;

        if (
          availableAmount(this.stealth) > 0 ||
          availableAmount(this.silent) > 0
        ) {
          toBuy = this.firePlusCombat;
        }

        print("Now trying to buy " + toBuy);
        retrieveItem(toBuy);
        //          buy(item);
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
