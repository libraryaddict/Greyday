import {
  Item,
  toInt,
  getProperty,
  myAscensions,
  availableAmount,
  Location,
  Monster,
} from "kolmafia";
import { PropertyManager } from "../../../../utils/Properties";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11HiddenPark implements QuestInfo {
  matches: Item = Item.get("Book of Matches");
  sword: Item = Item.get("Antique Machete");
  loc: Location = Location.get("The Hidden Park");

  level(): number {
    return 11;
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL11Worship");

    if (status < 3) {
      return QuestStatus.NOT_READY;
    }

    if (status > 3) {
      return QuestStatus.COMPLETED;
    }

    if (this.needsSword() || !this.hasRelocatedJanitors()) {
      return QuestStatus.READY;
    }

    return QuestStatus.COMPLETED;
  }

  getId(): QuestType {
    return "Council / MacGruffin / HiddenCity / HiddenPark";
  }

  hasRelocatedJanitors(): boolean {
    return toInt(getProperty("relocatePygmyJanitor")) == myAscensions();
  }

  needsSword(): boolean {
    return availableAmount(this.sword) <= 0;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setNoCombat().setItemDrops();

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        let props = new PropertyManager();

        if (!this.hasRelocatedJanitors()) {
          props.setChoice(789, 2);
        } else {
          props.setChoice(789, 1);
        }

        let settings = new AdventureSettings();
        settings.addBanish(Monster.get("pygmy blowgunner"));
        settings.addBanish(Monster.get("pygmy assault squad"));
        settings.addBanish(Monster.get("boaraffe"));

        try {
          greyAdv(this.loc, outfit, settings);
        } finally {
          props.resetAll();
        }
      },
    };
  }
}
