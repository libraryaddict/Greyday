import { Location, Familiar, visitUrl, runChoice } from "kolmafia";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestTowerMaze implements QuestInfo {
  getId(): QuestType {
    return "Council / Tower / Maze";
  }

  level(): number {
    return 13;
  }

  status(): QuestStatus {
    if (getQuestStatus("questL13Final") < 4) {
      return QuestStatus.NOT_READY;
    }

    if (getQuestStatus("questL13Final") > 4) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit("+hot res +spooky res +stench res -tie");

    return {
      location: null,
      outfit: outfit,
      run: () => {
        visitUrl("place.php?whichplace=nstower&action=ns_03_hedgemaze");
        runChoice(2);
        runChoice(2);
        runChoice(2);
        runChoice(1);
        visitUrl("place.php?whichplace=nstower_door");
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}
