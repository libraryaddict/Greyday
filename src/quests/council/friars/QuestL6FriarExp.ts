import {
  Location,
  Familiar,
  cliExecute,
  friarsAvailable,
  toBoolean,
  getProperty,
  myFamiliar,
  familiarWeight,
} from "kolmafia";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL6FriarExp implements QuestInfo {
  fam: Familiar = Familiar.get("Grey Goose");

  getId(): QuestType {
    return "Misc / FriarExp";
  }

  level(): number {
    return 6;
  }

  status(): QuestStatus {
    if (toBoolean(getProperty("friarsBlessingReceived"))) {
      return QuestStatus.COMPLETED;
    }

    if (!friarsAvailable()) {
      return QuestStatus.NOT_READY;
    }

    if (myFamiliar() != this.fam) {
      return QuestStatus.NOT_READY;
    }

    if (familiarWeight(this.fam) > 2) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        cliExecute("friars familiar");
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
