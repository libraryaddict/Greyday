import { availableAmount, Item, Location } from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { greyAdv } from "../../../utils/GreyLocations";
import { QuestType } from "../../QuestTypes";
import { QuestL11PalinStew } from "./palin/QuestL11PalinStew";
import { QuestL11PalinBook } from "./palin/QuestL11PalinBook";

export class QuestL11Palin implements QuestInfo {
  megagem: Item = Item.get("Mega Gem");
  talisman: Item = Item.get("Talisman o' Namsilat");
  children: QuestInfo[] = [];

  constructor() {
    this.children.push(new QuestL11PalinStew());
    this.children.push(new QuestL11PalinBook());
  }

  getChildren(): QuestInfo[] {
    return this.children;
  }

  level(): number {
    return 11;
  }

  getId(): QuestType {
    return "Council / MacGruffin / Palin / Boss";
  }

  getLocations(): Location[] {
    return [];
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL11Palindome");

    if (status == 100) {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.megagem) == 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit()
      .addItem(this.talisman)
      .addItem(this.megagem);

    return {
      outfit: outfit,
      location: null,
      run: () => {
        const props = new PropertyManager();
        props.setChoice(131, 1);

        try {
          greyAdv("place.php?whichplace=palindome&action=pal_drlabel", outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }
}
