import { availableAmount, Item, Location, use } from "kolmafia";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { QuestType } from "../QuestTypes";
import { QuestL4BatsBoss } from "./bats/QuestL4BatsBoss";
import { QuestL4BatsCenter } from "./bats/QuestL4BatsCenter";
import { QuestL4BatsLeft } from "./bats/QuestL4BatsLeft";
import { QuestL4BatsRight } from "./bats/QuestL4BatsRight";

export class QuestL4Bats implements QuestInfo {
  sonar: Item = Item.get("sonar-in-a-biscuit");
  children: QuestInfo[] = [];

  constructor() {
    this.children.push(new QuestL4BatsCenter());
    this.children.push(new QuestL4BatsLeft());
    this.children.push(new QuestL4BatsRight());
    this.children.push(new QuestL4BatsBoss());
  }

  getChildren(): QuestInfo[] {
    return this.children;
  }

  getLocations(): Location[] {
    return [];
  }

  level(): number {
    return 4;
  }

  mustBeDone(): boolean {
    return true;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL04Bat");

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    if (status >= 3) {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.sonar) == 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        while (
          availableAmount(this.sonar) > 0 &&
          getQuestStatus("questL04Bat") < 3
        ) {
          use(this.sonar);
        }
      },
    };
  }

  getId(): QuestType {
    return "Council / Bats / Sonars";
  }

  free(): boolean {
    return true;
  }
}

enum BatStatus {
  unstarted = -1,
  started = 0,
  LEFT_SMASHED = 1,
  RIGHT_SMASHED = 2,
  BOTTOM_SMASHED = 3,
  BOSS_MURDERED = 4,
  finished = 100,
}
