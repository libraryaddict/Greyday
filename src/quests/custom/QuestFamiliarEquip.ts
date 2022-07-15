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
        maximize("familiar experience +familiar weight -tie", false);

        while (
          availableAmount(this.equip) == 0 &&
          familiarWeight(this.familiar) < 6 &&
          myMeat() >= 100
        ) {
          let exp = this.familiar.experience;
          cliExecute("train turns 1");

          if (exp <= this.familiar.experience) {
            throw "We attempted to train your familiar in the cake arena, but they gained no experience. Something is likely wrong. You may need to acquire a grey goose vest yourself.";
          }
        }
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
