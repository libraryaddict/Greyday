import { Familiar, familiarWeight, Item, Location, Monster } from "kolmafia";
import { greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { GreySettings } from "../../utils/GreySettings";
import { PropertyManager } from "../../utils/Properties";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestL11PalinAbsorbs implements QuestInfo {
  talisman: Item = Item.get("Talisman o' Namsilat");
  palindome: Location = Location.get("Inside the Palindome");
  toAbsorb: Monster[];
  goose: Familiar = Familiar.get("Grey Goose");

  getId(): QuestType {
    return "Absorbs / Palin";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    if (GreySettings.greySkipPalindome) {
      return QuestStatus.COMPLETED;
    }

    const status = getQuestStatus("questL11Palindome");

    if (status < 100 || familiarWeight(this.goose) < 6) {
      return QuestStatus.NOT_READY;
    }

    if (this.toAbsorb.length == 0) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit();
    outfit.addItem(this.talisman);

    return {
      location: this.palindome,
      outfit: outfit,
      run: () => {
        const props = new PropertyManager();
        props.setChoice(127, 1);
        props.setChoice(126, 1);
        props.setChoice(180, 2);
        props.setChoice(2, 2);

        try {
          greyAdv(this.palindome, outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.palindome];
  }
}
