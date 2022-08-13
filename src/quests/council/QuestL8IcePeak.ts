import { Location, visitUrl } from "kolmafia";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { QuestType } from "../QuestTypes";
import { QuestL8MountainBoss } from "./mountain/QuestL8MountainBoss";
import { QuestL8MountainGoats } from "./mountain/QuestL8MountainGoats";
import { QuestL8MountainNinja } from "./mountain/QuestL8MountainNinja";
import { QuestL8MountainOre } from "./mountain/QuestL8MountainOre";

export class QuestL8IcePeak implements QuestInfo {
  children: QuestInfo[] = [];

  constructor() {
    this.children.push(new QuestL8MountainGoats());
    this.children.push(new QuestL8MountainOre());
    this.children.push(new QuestL8MountainNinja());
    this.children.push(new QuestL8MountainBoss());
  }

  getChildren(): QuestInfo[] {
    return this.children;
  }

  level(): number {
    return 8;
  }

  getLocations(): Location[] {
    return [];
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL08Trapper");

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  getId(): QuestType {
    return "Council / Ice / Trapper";
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        this.talkTrapper();
      },
    };
  }

  getStatus(): MountainStatus {
    return getQuestStatus("questL08Trapper");
  }

  talkTrapper() {
    visitUrl("place.php?whichplace=mclargehuge&action=trappercabin");
  }
}

export enum MountainStatus {
  started,
  TRAPPER_DEMANDS,
  GET_OUTFIT,
  UNLOCKED_PEAK,
  FIGHTING_YETI,
  DEFEATED_BOAR,
  finished = 100,
}
