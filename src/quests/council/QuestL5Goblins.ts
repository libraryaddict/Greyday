import {
  autosell,
  council,
  Effect,
  getProperty,
  haveEffect,
  haveOutfit,
  Item,
  itemAmount,
  Location,
  use,
} from "kolmafia";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { greyAdv } from "../../utils/GreyLocations";
import { QuestType } from "../QuestTypes";
import { QuestL5GoblinOutskirts } from "./goblins/QuestL5GoblinOutskirts";
import { QuestL5GoblinHarem } from "./goblins/QuestL5GoblinHarem";

export class QuestL5Goblin implements QuestInfo {
  perfume: Item = Item.get("knob goblin perfume");
  effect: Effect = Effect.get("knob Goblin Perfume");
  harem: Location = Location.get("Cobb's Knob Harem");
  outskirts: QuestL5GoblinOutskirts = new QuestL5GoblinOutskirts();
  qHarem: QuestL5GoblinHarem = new QuestL5GoblinHarem();

  getId(): QuestType {
    return "Council / Goblins / King";
  }

  level(): number {
    return 5;
  }

  getChildren(): QuestInfo[] {
    return [this.outskirts, this.qHarem];
  }

  getLocations(): Location[] {
    return [Location.get("Throne Room")];
  }

  status(): QuestStatus {
    const status = getProperty("questL05Goblin");

    if (status == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (status != "step1" || !haveOutfit("knob Goblin Harem Girl Disguise")) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit()
      .addWeight(Item.get("Knob Goblin harem pants"))
      .addWeight(Item.get("Knob Goblin harem veil"));

    return {
      location: Location.get("Throne Room"),
      outfit: outfit,
      run: () => {
        if (haveEffect(this.effect) == 0) {
          if (itemAmount(this.perfume) > 0) {
            use(this.perfume);
          } else {
            greyAdv(this.harem, outfit);
          }
        }

        greyAdv("cobbsknob.php?action=throneroom", outfit);
        autosell(Item.get("Dense Meat Stack"), 2);
        council();
      },
    };
  }
}
