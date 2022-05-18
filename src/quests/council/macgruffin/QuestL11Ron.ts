import { Location } from "kolmafia";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { QuestL11RonAirship } from "./ron/QuestL11RonAirship";
import { QuestL11RonProtesters } from "./ron/QuestL11RonProtesters";

export class QuestL11Ron implements QuestInfo {
  children: QuestInfo[] = [];

  constructor() {
    this.children.push(new QuestL11RonProtesters());
    this.children.push(new QuestL11RonAirship());
  }

  getChildren(): QuestInfo[] {
    return this.children;
  }

  getLocations(): Location[] {
    return [];
  }

  level(): number {
    return -1;
  }

  getId(): QuestType {
    return "Council / MacGruffin / Ron / Parent";
  }

  status(): QuestStatus {
    return QuestStatus.COMPLETED;
  }

  run(): QuestAdventure {
    throw new Error("Method not implemented.");
  }
}
