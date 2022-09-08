import {
  Location,
  Familiar,
  getProperty,
  familiarWeight,
  cliExecute,
  familiarEquipment,
  Item,
  availableAmount,
  myAscensions,
  toInt,
} from "kolmafia";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestFortuneExp implements QuestInfo {
  fam: Familiar = Familiar.get("Grey Goose");
  equip: Item = familiarEquipment(this.fam);

  getId(): QuestType {
    return "Misc / FortuneExp";
  }

  level(): number {
    return 5;
  }

  status(): QuestStatus {
    if (getProperty("_clanFortuneBuffUsed") == "true") {
      return QuestStatus.COMPLETED;
    }

    if (
      familiarWeight(this.fam) > 2 ||
      availableAmount(this.equip) == 0 ||
      toInt(getProperty("lastDesertUnlock")) != myAscensions()
    ) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        cliExecute("fortune buff familiar");
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  free(): boolean {
    return true;
  }
}
