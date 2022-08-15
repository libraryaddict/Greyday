import {
  Location,
  Familiar,
  availableAmount,
  Item,
  equip,
  use,
  visitUrl,
} from "kolmafia";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11ManorRecipe implements QuestInfo {
  glasses = Item.get("Lord Spookyraven's Spectacles");

  getId(): QuestType {
    return "Council / MacGruffin / Manor / Recipe";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL11Manor");

    if (status < 1) {
      return QuestStatus.NOT_READY;
    }

    if (status > 1) {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.glasses) == 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        equip(this.glasses);
        visitUrl("place.php?whichplace=manor4&action=manor4_chamberwall");
        use(Item.get("recipe: mortar-dissolving solution"));
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
