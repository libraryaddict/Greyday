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
  Skill,
  haveSkill,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import {
  GreyPulls,
  ResourceClaim,
  ResourcePullClaim,
} from "../../../../utils/GreyResources";
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
  nanovision: Skill = Skill.get("Double Nanovision");
  toAbsorb: Monster[];
  doPull: boolean = false;

  getId(): QuestType {
    return "Council / MacGruffin / HiddenCity / BookOfMatches";
  }

  level(): number {
    return 11;
  }

  getResourceClaims(): ResourceClaim[] {
    if (!this.doPull) {
      return [];
    }

    return [
      new ResourcePullClaim(
        this.book,
        "Book of Matches to unlock Bowling Bar",
        5
      ),
    ];
  }

  status(): QuestStatus {
    if (this.barUnlocked()) {
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

  run(): QuestAdventure {
    let outfit = new GreyOutfit();
    let wantToPull =
      this.doPull &&
      availableAmount(this.book) == 0 &&
      !GreySettings.isHardcoreMode() &&
      this.toAbsorb.length == 0;

    if (!wantToPull) {
      outfit.setItemDrops();
      outfit.setPlusCombat();
    }

    return {
      location: this.location,
      outfit: outfit,
      run: () => {
        if (availableAmount(this.book) == 0) {
          if (!wantToPull) {
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
