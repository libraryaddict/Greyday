import {
  Location,
  Familiar,
  getProperty,
  familiarWeight,
  cliExecute,
} from "kolmafia";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestFortuneExp implements QuestInfo {
  fam: Familiar = Familiar.get("Grey Goose");

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

    if (familiarWeight(this.fam) > 2) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      outfit: new GreyOutfit("-tie"),
      run: () => {
        cliExecute("fortune familiar");
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  needAdventures(): number {
    return 0;
  }
}
