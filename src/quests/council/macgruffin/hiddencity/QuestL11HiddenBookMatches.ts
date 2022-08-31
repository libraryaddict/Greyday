import {
  availableAmount,
  getProperty,
  haveSkill,
  Item,
  Location,
  Monster,
  myAscensions,
  Skill,
  toInt,
  use,
} from "kolmafia";
import { ResourceCategory } from "../../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../../typings/TaskInfo";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { GreyPulls } from "../../../../utils/GreyResources";

import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11HiddenBookMatches extends TaskInfo implements QuestInfo {
  book: Item = Item.get("Book of matches");
  monster: Monster = Monster.get("pygmy janitor");
  location: Location = Location.get("The Hidden Park");
  nanovision: Skill = Skill.get("Double Nanovision");
  toAbsorb: Monster[];
  noPull: PossiblePath = new PossiblePath(5);
  doPull: PossiblePath = new PossiblePath(0).addConsumablePull(this.book);

  getId(): QuestType {
    return "Council / MacGruffin / HiddenCity / BookOfMatches";
  }

  level(): number {
    return 11;
  }

  getPossiblePaths(): PossiblePath[] {
    return [this.noPull, this.doPull];
  }

  status(): QuestStatus {
    if (this.barUnlocked() || getProperty("questL11Spare") == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (getQuestStatus("questL11Worship") < 3) {
      return QuestStatus.NOT_READY;
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

    if (!haveSkill(this.nanovision)) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  barUnlocked(): boolean {
    return toInt(getProperty("hiddenTavernUnlock")) == myAscensions();
  }

  run(path: PossiblePath): QuestAdventure {
    let outfit = new GreyOutfit();

    if (!path.canUse(ResourceCategory.PULL)) {
      outfit.setItemDrops();
      outfit.setPlusCombat();
      outfit.setChampagneBottle();
    } else {
      outfit = GreyOutfit.IGNORE_OUTFIT;
    }

    return {
      location: this.location,
      outfit: outfit,
      run: () => {
        if (availableAmount(this.book) == 0) {
          if (path.canUse(ResourceCategory.PULL)) {
            GreyPulls.pullBoxOfMatches();
          } else {
            const settings = new AdventureSettings().addNoBanish(this.monster);

            greyAdv(this.location, outfit, settings);
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
