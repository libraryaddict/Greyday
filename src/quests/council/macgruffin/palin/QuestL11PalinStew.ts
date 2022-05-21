import {
  Location,
  Familiar,
  Item,
  availableAmount,
  cliExecute,
  visitUrl,
  Monster,
  equip,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11PalinStew implements QuestInfo {
  wetStew: Item = Item.get("Wet Stew");
  stuntNuts: Item = Item.get("Stunt Nuts");
  talisman: Item = Item.get("Talisman o' Namsilat");
  stuntNutStew: Item = Item.get("Wet stunt nut stew");
  rib: Item = Item.get("Bird Rib");
  lionOil: Item = Item.get("lion oil");
  grove: Location = Location.get("Whitey's Grove");

  getId(): QuestType {
    return "Council / MacGruffin / Palin / WetStew";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL11Palindome");

    if (status < 3) {
      return QuestStatus.NOT_READY;
    }

    if (status > 4) {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.stuntNuts) == 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setItemDrops().setPlusCombat();

    return {
      location: this.grove,
      outfit: outfit,
      run: () => {
        let settings = new AdventureSettings();
        settings.addNoBanish(Monster.get("white lion"));
        settings.addNoBanish(Monster.get("whitesnake"));

        greyAdv(this.grove, outfit, settings);

        if (
          availableAmount(this.rib) > 0 &&
          availableAmount(this.lionOil) > 0
        ) {
          cliExecute("create " + this.stuntNutStew.name);
          equip(this.talisman);

          visitUrl("place.php?whichplace=palindome&action=pal_mrlabel");
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.grove];
  }
}
