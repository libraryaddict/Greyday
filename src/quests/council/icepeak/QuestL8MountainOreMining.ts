import { Location, Item, haveOutfit } from "kolmafia";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { MountainStatus } from "../QuestL8IcePeak";
import { QuestL8MountainOre } from "./QuestL8MountainOre";

export class QuestL8MountainOreMining extends QuestL8MountainOre {
  mines: Location;

  getId(): QuestType {
    return "Council / Ice / OreMining";
  }

  status(): QuestStatus {
    let status = this.getStatus();

    if (status < MountainStatus.TRAPPER_DEMANDS) {
      return QuestStatus.NOT_READY;
    }

    if (status > MountainStatus.TRAPPER_DEMANDS) {
      return QuestStatus.COMPLETED;
    }

    if (this.getOreRemaining() <= 0) {
      return QuestStatus.COMPLETED;
    }

    if (!haveOutfit("Mining Gear")) {
      return QuestStatus.NOT_READY;
    }

    //TODO
    return QuestStatus.COMPLETED;
  }

  run(): QuestAdventure {
    //TODO
    throw new Error("Method not implemented.");
  }

  getLocations(): Location[] {
    return [];
  }
}
