import { availableAmount, council, Item, Location, use } from "kolmafia";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { QuestType } from "../QuestTypes";
import { QuestL10GiantShip } from "./beanstalk/QuestL10GiantShip";
import { QuestL10GiantGround } from "./beanstalk/QuestL10GiantGround";
import { QuestL10GiantBasement } from "./beanstalk/QuestL10GiantBasement";
import { QuestL10GiantTop } from "./beanstalk/QuestL10GiantTop";
import { GreyOutfit } from "../../utils/GreyOutfitter";

export class QuestL10Beanstalk implements QuestInfo {
  bean: Item = Item.get("Enchanted Bean");
  children: QuestInfo[] = [];

  constructor() {
    this.children.push(new QuestL10GiantShip());
    this.children.push(new QuestL10GiantGround());
    this.children.push(new QuestL10GiantBasement());
    this.children.push(new QuestL10GiantTop());
  }

  getChildren(): QuestInfo[] {
    return this.children;
  }

  getLocations(): Location[] {
    return [];
  }

  level(): number {
    return 10;
  }

  getId(): QuestType {
    return "Council / Beanstalk / EnchantedBean";
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL10Garbage");

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.bean) == 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  mustBeDone(): boolean {
    return true;
  }

  run(): QuestAdventure {
    // Use bean if we need to
    const status = getQuestStatus("questL10Garbage");

    if (status == 0) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          use(Item.get("Enchanted Bean"));
        },
      };
    }

    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        council();
      },
    };
  }
}

enum GiantStatus {
  unstarted = "unstarted",
  started = "started",
  step1 = "PLANTED_BEAN",
  step2 = "LOOKING_SHIP_WADS",
  step3 = "TISSUE_WAD",
  step4 = "TIN_WAD",
  step5 = "GAUZE_WAD",
  step6 = "PLASTIC_WAD",
  step7 = "BASEMENT",
  step8 = "GROUND_FLOOR",
  step9 = "TOP_FLOOR",
  step10 = "TURNED_WHEEL",
  finished = "finished",
}
