import {
  adv1,
  council,
  getProperty,
  Item,
  itemAmount,
  Location,
  myLevel,
  visitUrl,
} from "kolmafia";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";
import { QuestL6FriarElbow } from "./friars/QuestL6FriarElbow";
import { QuestL6FriarExp } from "./friars/QuestL6FriarExp";
import { QuestL6FriarHeart } from "./friars/QuestL6FriarHeart";
import { QuestL6FriarNeck } from "./friars/QuestL6FriarNeck";

export class QuestL6Friar implements QuestInfo {
  woods: QuestInfo[] = [
    new QuestL6FriarElbow(),
    new QuestL6FriarHeart(),
    new QuestL6FriarNeck(),
  ];
  exp: QuestInfo = new QuestL6FriarExp();

  getLocations(): Location[] {
    return [];
  }

  level(): number {
    return 6;
  }

  getId(): QuestType {
    return "Council / Friars / TurnIn";
  }

  getChildren(): QuestInfo[] {
    return [this.exp, ...this.woods];
  }

  status(): QuestStatus {
    const status = getProperty("questL06Friar");

    if (status == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (
      this.woods.filter((c) => c.status() != QuestStatus.COMPLETED).length > 0
    ) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        visitUrl("friars.php?action=ritual&pwd");
        visitUrl("pandamonium.php");
        council();
      },
    };
  }
}
