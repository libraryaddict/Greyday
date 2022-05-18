import { canAdv } from "canadv.ash";
import {
  adv1,
  availableAmount,
  cliExecute,
  council,
  Effect,
  equip,
  Familiar,
  getProperty,
  haveEffect,
  Item,
  itemAmount,
  Location,
  myLevel,
  print,
  retrieveItem,
  setProperty,
  toInt,
  use,
  visitUrl,
} from "kolmafia";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { QuestL11DesertCompass } from "./desert/QuestL11DesertCompass";
import { QuestL11DesertExplore } from "./desert/QuestL11DesertExplore";
import { QuestL11DesertGnome } from "./desert/QuestL11DesertGnome";
import { QuestL11DesertStoneRose } from "./desert/QuestL11DesertStoneRose";
import { QuestL11DesertWormRide } from "./desert/QuestL11DesertWormRide";

export class QuestL11Desert implements QuestInfo {
  children: QuestInfo[] = [];

  constructor() {
    this.children.push(new QuestL11DesertCompass());
    this.children.push(new QuestL11DesertExplore());
    this.children.push(new QuestL11DesertGnome());
    this.children.push(new QuestL11DesertStoneRose());
    this.children.push(new QuestL11DesertWormRide());
  }

  getChildren(): QuestInfo[] {
    return this.children;
  }

  getId(): QuestType {
    return "Council / MacGruffin / Desert / Parent";
  }

  level(): number {
    return -1;
  }

  status(): QuestStatus {
    return QuestStatus.COMPLETED;
  }

  run(): QuestAdventure {
    throw new Error("Method not implemented.");
  }

  getLocations(): Location[] {
    return [];
  }
}
