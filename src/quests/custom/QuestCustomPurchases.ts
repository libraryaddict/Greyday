import {
  Location,
  Familiar,
  Item,
  availableAmount,
  myMeat,
  buy,
  print,
  retrieveItem,
} from "kolmafia";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestCustomPurchases implements QuestInfo {
  toPurchase: Item[] = ["sombrero-mounted sparkler"].map((s) => Item.get(s));

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

    if (myMeat() <= missing.length * 3000) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
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
