import {
  availableAmount,
  getProperty,
  Item,
  Location,
  myMeat,
  print,
  retrieveItem,
  visitUrl,
} from "kolmafia";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestCustomPurchases implements QuestInfo {
  popper: Item = Item.get("Porkpie-mounted popper");
  silent: Item = Item.get("Silent Beret");
  stealth: Item = Item.get("Xiblaxian stealth cowl");
  firePlusCombat: Item = Item.get("sombrero-mounted sparkler");
  pack: Item = Item.get("protonic accelerator pack");
  fireworksClan: boolean;

  getId(): QuestType {
    return "Misc / Purchases";
  }

  level(): number {
    return 6;
  }

  status(): QuestStatus {
    if (getProperty("_fireworksShopHatBought") == "true") {
      return QuestStatus.COMPLETED;
    }

    if (myMeat() <= 3000) {
      return QuestStatus.NOT_READY;
    }

    if (this.fireworksClan == null) {
      visitUrl("clan_viplounge.php");
      const page = visitUrl("clan_viplounge.php?action=fwshop&whichfloor=2");

      this.fireworksClan = page.includes("<b>A Furtive Fireworks Fellow</b>");
    }

    if (!this.fireworksClan) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        let toBuy = this.popper;

        if (
          availableAmount(this.stealth) > 0 ||
          availableAmount(this.silent) > 0 ||
          availableAmount(this.pack) > 0
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
