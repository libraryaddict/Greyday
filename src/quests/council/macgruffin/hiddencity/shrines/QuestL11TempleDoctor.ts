import {
  availableAmount,
  getProperty,
  Item,
  Location,
  Monster,
} from "kolmafia";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../../../Quests";
import { GreyOutfit } from "../../../../../utils/GreyOutfitter";
import { AdventureSettings, greyAdv } from "../../../../../utils/GreyLocations";
import { PropertyManager } from "../../../../../utils/Properties";
import { QuestType } from "../../../../QuestTypes";

export class QuestL11Doctor implements QuestInfo {
  equips: Item[] = [
    "bloodied surgical dungarees",
    "half-size scalpel",
    "surgical apron",
    "head mirror",
    "surgical mask",
  ].map((s) => Item.get(s));
  loc: Location = Location.get("The Hidden Hospital");
  surgeon: Monster = Monster.get("pygmy witch surgeon");
  shirt: Item = Item.get("Surgical apron");

  getLocations(): Location[] {
    return [this.loc];
  }

  getId(): QuestType {
    return "Council / MacGruffin / HiddenCity / Doctor";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    const status = getProperty("questL11Doctor");

    if (status == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (status == "unstarted") {
      return QuestStatus.NOT_READY;
    }

    if (getProperty("questL11Worship") != "step3") {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit();
    let seekingOutfit: boolean = false;

    for (const i of this.equips) {
      if (availableAmount(i) == 0) {
        seekingOutfit = true;
        continue;
      }

      outfit.addItem(i);
    }

    return {
      location: this.loc,
      outfit: outfit,
      olfaction: seekingOutfit ? [this.surgeon] : null,
      run: () => {
        const props = new PropertyManager();
        props.setChoice(784, 1);

        try {
          greyAdv(
            this.loc,
            outfit,
            new AdventureSettings().addNoBanish(this.surgeon)
          );
        } finally {
          props.resetAll();
        }
      },
    };
  }
}
