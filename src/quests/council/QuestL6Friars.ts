import {
  absorbedMonsters,
  council,
  getProperty,
  Location,
  Monster,
  visitUrl,
} from "kolmafia";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";
import { QuestL6FriarElbow } from "./friars/QuestL6FriarElbow";
import { QuestL6FriarExp } from "./friars/QuestL6FriarExp";
import { QuestL6FriarHeart } from "./friars/QuestL6FriarHeart";
import { QuestL6FriarNeck } from "./friars/QuestL6FriarNeck";
import { QuestL6LatteFamExp } from "./friars/QuestL6FriarsLatteElbow";
import { QuestL6LattePlusCombat } from "./friars/QuestL6FriarsLatteHeart";

export class QuestL6Friar implements QuestInfo {
  woods: QuestInfo[] = [
    new QuestL6FriarElbow(),
    new QuestL6FriarHeart(),
    new QuestL6FriarNeck(),
    new QuestL6LatteFamExp(),
    new QuestL6LattePlusCombat(),
  ];
  exp: QuestInfo = new QuestL6FriarExp();
  absorbs: Monster[] = ["G", "L", "P", "W"].map((s) => Monster.get(s + " Imp"));

  canTurnIn(): boolean {
    return this.absorbs.find((m) => !absorbedMonsters()[m.name]) == null;
  }

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

    if (!this.canTurnIn()) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  mustBeDone(): boolean {
    return true;
  }

  free(): boolean {
    return true;
  }

  run(): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        visitUrl("friars.php?action=ritual&pwd");
        visitUrl("pandamonium.php");
        council();
      },
    };
  }
}
