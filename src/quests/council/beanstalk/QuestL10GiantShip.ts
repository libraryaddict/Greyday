import { Location, Familiar, availableAmount, Item } from "kolmafia";
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

export class QuestL10GiantShip implements QuestInfo {
  modelShip: Item = Item.get("Model airship");
  amulet: Item = Item.get("Amulet of Extreme Plot Significance");
  umbrella: Item = Item.get("Titanium Assault Umbrella");
  wig: Item = Item.get("Mohawk Wig");
  loc: Location = Location.get("The Penultimate Fantasy Airship");

  // TODO Once we've got the items and absorbs, try replace combats

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setNoCombat();
    let wantDrops =
      availableAmount(this.amulet) == 0 ||
      availableAmount(this.umbrella) == 0 ||
      availableAmount(this.wig) == 0;

    if (wantDrops) {
      outfit.setItemDrops();
    }

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        let props = new PropertyManager();

        try {
          if (availableAmount(this.modelShip) == 0) {
            props.setChoice(182, 4);
          } else {
            props.setChoice(182, 1);
          }

          greyAdv(this.loc, outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getId(): QuestType {
    return "Council / Beanstalk / Ship";
  }

  level(): number {
    return 8;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL10Garbage");

    if (status < 1) {
      return QuestStatus.NOT_READY;
    }

    if (status > 6) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  getLocations(): Location[] {
    return [this.loc];
  }
}
