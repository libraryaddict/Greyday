import {
  autosell,
  availableAmount,
  council,
  getProperty,
  Item,
  Location,
  use,
  visitUrl,
} from "kolmafia";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestL1Toot implements QuestInfo {
  toSell: Item[] = ["hamethyst", "baconstone", "porquoise"].map((s) =>
    Item.get(s)
  );

  level(): number {
    return 0;
  }

  status(): QuestStatus {
    if (getProperty("questM05Toot") == "finished") {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        council();
        visitUrl("tutorial.php?action=toot");
        use(Item.get("Letter from King Ralph XI"));
        use(Item.get("pork elf goodies sack"));

        for (let i of this.toSell) {
          if (availableAmount(i) > 0) {
            autosell(i, availableAmount(i));
          }
        }

        council();
      },
    };
  }

  getId(): QuestType {
    return "Council / Toot";
  }

  getLocations(): Location[] {
    return [];
  }
}
