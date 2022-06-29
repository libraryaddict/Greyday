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
  toPurchase: Item[] = ["Porkpie-mounted popper"].map((s) => Item.get(s));

  getId(): QuestType {
    return "Misc / Purchases";
  }

  level(): number {
    return 8;
  }

  getMissing(): Item[] {
    return this.toPurchase.filter((i) => availableAmount(i) == 0);
  }

  status(): QuestStatus {
    let missing = this.getMissing();

    if (missing.length == 0) {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("_fireworksShopHatBought") == "true") {
      return QuestStatus.COMPLETED;
    }

    if (myMeat() <= missing.length * 3000) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      outfit: new GreyOutfit("-tie"),
      run: () => {
        for (let item of this.getMissing()) {
          print("Now trying to buy " + item);
          retrieveItem(item);
          //          buy(item);
        }
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
