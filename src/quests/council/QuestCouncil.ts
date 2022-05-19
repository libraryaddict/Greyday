import {
  Location,
  Familiar,
  council,
  getProperty,
  myLevel,
  toInt,
  cliExecute,
} from "kolmafia";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { QuestGrabHippyOutfit } from "../custom/QuestGrabNormalHippyOutfit";
import { QuestCar } from "../misc/QuestCar";
import { QuestManorLights } from "../misc/QuestManorLights";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestsCustom } from "../QuestsCustom";
import { QuestType } from "../QuestTypes";
import { QuestL10Beanstalk } from "./QuestL10Giants";
import { QuestL11MacGruffin } from "./QuestL11MacGruffin";
import { QuestL12War } from "./QuestL12War";
import { QuestL13 } from "./QuestL13Tower";
import { QuestL1Toot } from "./QuestL1Toot";
import { QuestL2SpookyLarva } from "./QuestL2Larva";
import { QuestL3Tavern } from "./QuestL3Tavern";
import { QuestL4Bats } from "./QuestL4Bats";
import { QuestL5Goblin } from "./QuestL5Goblins";
import { QuestL6Friar } from "./QuestL6Friars";
import { QuestL7Crypt } from "./QuestL7Crypt";
import { QuestL8IcePeak } from "./QuestL8IcePeak";
import { QuestL9Smut } from "./QuestL9OrcsAndPeaks";
import { QuestManor } from "./QuestManor";

export class QuestCouncil implements QuestInfo {
  quests: QuestInfo[] = [];

  constructor() {
    this.quests.push(new QuestL1Toot());
    this.quests.push(new QuestL2SpookyLarva());
    this.quests.push(new QuestL3Tavern());
    this.quests.push(new QuestL4Bats());
    this.quests.push(new QuestL5Goblin());
    this.quests.push(new QuestL6Friar());
    this.quests.push(new QuestL7Crypt());
    this.quests.push(new QuestL8IcePeak());
    this.quests.push(new QuestL9Smut());
    this.quests.push(new QuestL10Beanstalk());
    this.quests.push(new QuestL11MacGruffin());
    this.quests.push(new QuestL12War());
    this.quests.push(new QuestL13());
  }

  getId(): QuestType {
    return "Quests / Council";
  }

  level(): number {
    return -1;
  }

  status(): QuestStatus {
    return QuestStatus.COMPLETED;
  }

  run(): QuestAdventure {
    throw "Not implemented";
  }

  getLocations(): Location[] {
    return [];
  }

  getChildren(): QuestInfo[] {
    return this.quests;
  }
}
