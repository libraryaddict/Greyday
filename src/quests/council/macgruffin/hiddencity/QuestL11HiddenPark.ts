import {
  availableAmount,
  getProperty,
  Item,
  Location,
  Monster,
  myAscensions,
  toInt,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { currentPredictions } from "../../../../utils/GreyUtils";
import { PropertyManager } from "../../../../utils/Properties";
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
  book: Item = Item.get("Book of matches");
  janitor: Monster = Monster.get("Pygmy Janitor");

  level(): number {
    return 11;
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL11Worship");

    if (status < 3) {
      return QuestStatus.NOT_READY;
    }

    if (status > 3) {
      return QuestStatus.COMPLETED;
    }

    if (!this.needsSword() && this.hasRelocatedJanitors()) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  getId(): QuestType {
    return "Council / MacGruffin / HiddenCity / HiddenPark";
  }

  hasRelocatedJanitors(): boolean {
    return toInt(getProperty("relocatePygmyJanitor")) == myAscensions();
  }

  barUnlocked(): boolean {
    return toInt(getProperty("hiddenTavernUnlock")) == myAscensions();
  }

  needsSword(): boolean {
    return availableAmount(this.sword) <= 0;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit().setNoCombat().setItemDrops();
    const bottle =
      !this.barUnlocked() &&
      availableAmount(this.book) == 0 &&
      this.hasRelocatedJanitors();

    const pred = currentPredictions().get(this.loc);

    if (bottle && (pred == null || pred == this.janitor)) {
      outfit.setChampagneBottle();
    }

    return {
      location: this.loc,
      outfit: outfit,
      mayFreeRun: true,
      freeRun: (monster) => bottle || monster != this.janitor,
      orbs: bottle ? [this.janitor] : null,
      run: () => {
        const props = new PropertyManager();

        if (!this.hasRelocatedJanitors()) {
          props.setChoice(789, 2);
        } else {
          props.setChoice(789, 1);
        }

        const settings = new AdventureSettings();

        if (bottle) {
          settings.addNoBanish(this.janitor);
        }

        try {
          greyAdv(this.loc, outfit, settings);
        } finally {
          props.resetAll();
        }
      },
    };
  }
}
