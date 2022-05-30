import {
  Location,
  Familiar,
  Item,
  Monster,
  availableAmount,
  getProperty,
  myAscensions,
  toInt,
  use,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { GreyPulls } from "../../../../utils/GreyResources";
import { GreySettings } from "../../../../utils/GreySettings";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11HiddenBookMatches implements QuestInfo {
  book: Item = Item.get("Book of matches");
  monster: Monster = Monster.get("pygmy janitor");
  location: Location = Location.get("The Hidden Park");

  getId(): QuestType {
    return "Council / MacGruffin / HiddenCity / BookOfMatches";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    if (getQuestStatus("questL11Worship") < 3) {
      return QuestStatus.NOT_READY;
    }

    if (this.barUnlocked()) {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.book) > 0) {
      return QuestStatus.READY;
    }

    // Might still hit the drop!
    if (
      toInt(getProperty("relocatePygmyJanitor")) < myAscensions() &&
      //getProperty("questL11Business") != "finished" ||
      // getProperty("questL11Doctor") != "finished" ||
      getProperty("questL11Curses") != "finished"
    ) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  barUnlocked(): boolean {
    return toInt(getProperty("hiddenTavernUnlock")) == myAscensions();
  }

  run(): QuestAdventure {
    let needToAdv =
      availableAmount(this.book) == 0 && GreySettings.isHardcoreMode();

    let outfit = new GreyOutfit();

    if (needToAdv) {
      outfit.setItemDrops();
      outfit.setPlusCombat();
    }

    return {
      location: this.location,
      outfit: outfit,
      run: () => {
        if (availableAmount(this.book) == 0) {
          if (GreySettings.isHardcoreMode()) {
            let settings = new AdventureSettings().addNoBanish(this.monster);

            greyAdv(this.location, outfit, settings);
          } else {
            GreyPulls.pullBoxOfMatches();
          }
        }

        if (availableAmount(this.book) > 0) {
          use(this.book);

          if (!this.barUnlocked()) {
            throw "Bar should be unlocked";
          }
        }
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
