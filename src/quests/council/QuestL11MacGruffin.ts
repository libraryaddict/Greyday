import {
  availableAmount,
  getProperty,
  Item,
  Location,
  myAscensions,
  myMeat,
  retrieveItem,
  toInt,
  use,
} from "kolmafia";
import { PropertyManager } from "../../utils/Properties";
import { greyAdv } from "../../utils/GreyLocations";
import { QuestL11Black } from "./macgruffin/QuestL11Black";
import { QuestL11Desert } from "./macgruffin/QuestL11Desert";
import { QuestL11Manor } from "./macgruffin/QuestL11Manor";
import { QuestL11Palin } from "./macgruffin/QuestL11Palindome";
import { QuestL11Pyramid } from "./macgruffin/QuestL11Pyramid";
import { QuestL11Ron } from "./macgruffin/QuestL11Ron";
import { QuestL11Shen } from "./macgruffin/QuestL11Shen";
import { QuestL11Temple } from "./macgruffin/QuestL11Temple";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";
import { QuestL11ShoreAccess } from "./macgruffin/QuestL11VacationAccess";
import { GreyOutfit } from "../../utils/GreyOutfitter";

export class QuestL11MacGruffin implements QuestInfo {
  questInfo: QuestInfo[] = [];
  forged: Item = Item.get("Forged Identification Documents");
  diary: Item = Item.get("Your Father's Macguffin Diary");
  holidaySale: Item = Item.get("post-holiday sale coupon");

  constructor() {
    // Register the subquests
    this.questInfo.push(new QuestL11ShoreAccess());
    this.questInfo.push(new QuestL11Black());
    this.questInfo.push(new QuestL11Palin());
    this.questInfo.push(new QuestL11Shen());
    this.questInfo.push(new QuestL11Desert());
    this.questInfo.push(new QuestL11Manor());
    this.questInfo.push(new QuestL11Pyramid());
    this.questInfo.push(new QuestL11Ron());
    this.questInfo.push(new QuestL11Temple());
  }

  getLocations(): Location[] {
    return [];
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    if (getProperty("questL11Black") == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (
      getProperty("questL11Black") != "step2" ||
      toInt(getProperty("lastDesertUnlock")) != myAscensions()
    ) {
      return QuestStatus.NOT_READY;
    }

    if (myMeat() <= 6000) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  getChildren(): QuestInfo[] {
    return this.questInfo;
  }

  getId(): QuestType {
    return "Council / MacGruffin / Vacation";
  }

  run(): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        if (availableAmount(this.diary) == 0) {
          if (availableAmount(this.forged) == 0) {
            // 10% off coupon from pantsgiving
            if (availableAmount(this.holidaySale) > 0) {
              use(this.holidaySale);
            }

            retrieveItem(this.forged);

            if (availableAmount(this.forged) == 0) {
              throw this.forged + " wasn't acquired!";
            }
          }

          const props = new PropertyManager();

          try {
            props.setChoice(793, 1);

            greyAdv(Location.get("The Shore, Inc. Travel Agency"));

            if (availableAmount(this.diary) == 0) {
              throw (
                "Unexpectably, " +
                this.diary +
                " was not available! Try refresh inventory? Maybe we don't have forged documents"
              );
            }
          } finally {
            props.resetAll();
          }
        }

        if (getProperty("questL11Desert") != "started") {
          use(this.diary);
        }
      },
    };
  }
}
