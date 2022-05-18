import {
  adv1,
  availableAmount,
  council,
  Familiar,
  getProperty,
  Item,
  Location,
  myLevel,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  OutfitImportance,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL11Black implements QuestInfo {
  boots: Item = Item.get("Blackberry Galoshes");
  beehive: Item = Item.get("Beehive");
  loc: Location = Location.get("The Black Forest");

  level(): number {
    return 11;
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  getId(): QuestType {
    return "Council / MacGruffin / Black";
  }

  status(): QuestStatus {
    let status = getProperty("questL11Black");

    if (status != "started" && status != "step1") {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setPlusCombat();

    if (availableAmount(this.boots) > 0) {
      outfit.addItem(this.boots);
    }

    let fam: Familiar;

    if (availableAmount(Item.get("reassembled blackbird")) == 0) {
      fam = Familiar.get("Reassembled Blackbird");
    }

    return {
      location: this.loc,
      outfit: outfit,
      familiar: fam,
      run: () => {
        let props = new PropertyManager();

        try {
          if (availableAmount(this.beehive) == 0) {
            props.setChoice(924, 3); // Beezzzz
            props.setChoice(1018, 1);
            props.setChoice(1019, 1);
          } else if (
            availableAmount(this.boots) == 0 &&
            availableAmount(Item.get("Blackberry")) >= 3
          ) {
            props.setChoice(924, 2); // Cobble
            props.setChoice(928, 4); // Make boots
          } else {
            props.setChoice(924, 1); // Fight bush
          }

          greyAdv(this.loc, outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  needAdventures(): number {
    return 4;
  }
}
