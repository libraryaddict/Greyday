import {
  Location,
  Familiar,
  Item,
  availableAmount,
  getProperty,
  itemAmount,
  outfit,
  setProperty,
  toInt,
  visitUrl,
} from "kolmafia";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL12WarFlyers implements QuestInfo {
  flyers: Item = Item.get("Rock band flyers");

  getId(): QuestType {
    return "Council / War / Flyers";
  }

  level(): number {
    return 12;
  }

  status(): QuestStatus {
    if (this.isArenaDone()) {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("warProgress") != "started") {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.flyers) == 0) {
      return QuestStatus.READY;
    }

    if (toInt(getProperty("flyeredML")) < 10000) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      outfit: new GreyOutfit("-tie"),
      run: () => {
        this.visitArena();
      },
    };
  }

  needAdventures(): number {
    return 0;
  }

  mustBeDone(): boolean {
    return true;
  }

  getLocations(): Location[] {
    return [];
  }

  isArenaDone() {
    return getProperty("sidequestArenaCompleted") != "none";
  }

  visitArena() {
    outfit("Frat Warrior Fatigues");
    visitUrl("bigisland.php?place=concert&pwd");

    // If something borked, lets just make us flyer another
    if (
      availableAmount(this.flyers) > 0 &&
      toInt(getProperty("flyeredML")) >= 10000
    ) {
      setProperty("flyeredML", "9900");
    }
  }
}
