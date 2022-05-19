import {
  Location,
  Familiar,
  availableAmount,
  familiarWeight,
  cliExecute,
  equip,
  equippedAmount,
  maximize,
  myAdventures,
  myMeat,
  useFamiliar,
  autosell,
  use,
  Item,
} from "kolmafia";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestFamiliarEquip implements QuestInfo {
  familiar: Familiar = Familiar.get("Grey Goose");
  equip: Item = Item.get("Grey Down Vest");

  getId(): QuestType {
    return "Misc / FamEquip";
  }

  level(): number {
    return 1;
  }

  status(): QuestStatus {
    if (availableAmount(this.equip) > 0) {
      return QuestStatus.COMPLETED;
    }

    if (familiarWeight(this.familiar) >= 6 || myMeat() < 100) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        useFamiliar(this.familiar);
        maximize("familiar experience", false);

        while (
          availableAmount(this.equip) == 0 &&
          familiarWeight(this.familiar) < 6 &&
          myMeat() >= 100
        ) {
          cliExecute("train turns 1");
        }
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
