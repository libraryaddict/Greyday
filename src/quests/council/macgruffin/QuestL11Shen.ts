import {
  adv1,
  availableAmount,
  council,
  Effect,
  getProperty,
  haveEffect,
  Item,
  Location,
  myLevel,
  toInt,
  toItem,
  use,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import { greyAdv } from "../../../utils/GreyLocations";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { QuestL11ShenBats } from "./shen/QuestL11ShenBats";
import { QuestL11ShenGiants } from "./shen/QuestL11ShenGiants";
import { QuestL11ShenNinja } from "./shen/QuestL11ShenNinja";
import { QuestL11ShenTurnIn } from "./shen/QuestL11ShenTurnIn";

export class QuestL11Shen implements QuestInfo {
  shenClub: Location = Location.get("The Copperhead Club");
  shenItems: Map<Item, Location> = new Map();
  children: QuestInfo[] = [];

  getLocations(): Location[] {
    return [];
  }

  constructor() {
    this.children.push(new QuestL11ShenTurnIn());
    this.children.push(new QuestL11ShenGiants());
    this.children.push(new QuestL11ShenNinja());
    this.children.push(new QuestL11ShenBats());
  }

  getChildren(): QuestInfo[] {
    return this.children;
  }

  getId(): QuestType {
    return "Council / MacGruffin / Shen / Meet";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL11Shen");

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        let props = new PropertyManager();
        props.setChoice(851, 1);

        try {
          greyAdv(this.shenClub);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  mustBeDone(): boolean {
    return true;
  }

  needAdventures(): number {
    return 0;
  }
}
