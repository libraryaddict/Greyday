import {
  Location,
  Familiar,
  availableAmount,
  equippedAmount,
  Item,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL10GiantBasement implements QuestInfo {
  amulet: Item = Item.get("Amulet of Extreme Plot Significance");
  umbrella: Item = Item.get("Titanium Assault Umbrella");
  dumbell: Item = Item.get("Massive Dumbbell");
  loc: Location = Location.get(
    "The Castle in the Clouds in the Sky (Basement)"
  );

  constructor() {
    let umbrella = Item.get("Unbreakable Umbrella");

    if (availableAmount(umbrella) > 0) {
      this.umbrella = umbrella; // They replace!
    }
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setNoCombat();

    if (availableAmount(this.umbrella) > 0) {
      outfit.addItem(this.umbrella);
    }

    if (availableAmount(this.amulet) > 0) {
      outfit.addBonus("+equip " + this.amulet.name);
      //      outfit.addItem(this.amulet);
    }

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        let props = new PropertyManager();

        try {
          // Do umbrella
          props.setChoice(669, 1);

          // If have amulet otherwise grab dumbbell (or skips it)
          if (equippedAmount(this.amulet) > 0) {
            props.setChoice(670, 4);
          } else {
            props.setChoice(670, 1);
          }

          if (availableAmount(this.dumbell) > 0) {
            props.setChoice(671, 1);
          } else {
            // Go to gym
            props.setChoice(671, 4);
          }

          greyAdv(this.loc, outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getId(): QuestType {
    return "Council / Beanstalk / Basement";
  }

  level(): number {
    return 8;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL10Garbage");

    if (status < 7) {
      return QuestStatus.NOT_READY;
    }

    if (status > 7) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  getLocations(): Location[] {
    return [this.loc];
  }
}
