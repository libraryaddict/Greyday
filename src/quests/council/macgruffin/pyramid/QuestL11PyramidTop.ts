import {
  Location,
  Familiar,
  visitUrl,
  getProperty,
  toInt,
  Item,
} from "kolmafia";
import { greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11PyramidTop implements QuestInfo {
  topLoc: Location = Location.get("The Upper Chamber");
  eye: Item = Item.get("Eye of Ed");
  amulet: Item = Item.get("ancient amulet");
  headpiece: Item = Item.get("headpiece of the Staff of Ed");
  staff: Item = Item.get("Staff of Fats");
  staff2: Item = Item.get("[2325]Staff Of Ed");

  // TODO Once we've got the absorbs, try replace combats

  getId(): QuestType {
    return "Council / MacGruffin / Pyramid / Top";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL11Pyramid");

    if (status <= 0 && !this.isUnlockable()) {
      return QuestStatus.NOT_READY;
    }

    if (this.isMiddleUnlocked() || status > 1) {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("questL11Desert") != "finished") {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  isMiddleUnlocked(): boolean {
    return getProperty("middleChamberUnlock") == "true";
  }

  mustBeDone(): boolean {
    return (
      this.isUnlockable() &&
      getProperty("questL11Desert") == "finished" &&
      getProperty("questL11Pyramid") == "unstarted"
    );
  }

  run(): QuestAdventure {
    if (this.mustBeDone()) {
      return {
        location: null,
        run: () => {
          // Unlock
          visitUrl("place.php?whichplace=desertbeach&action=db_pyramid1");
        },
      };
    }

    let outfit = new GreyOutfit().setNoCombat();

    return {
      location: this.topLoc,
      outfit: outfit,
      run: () => {
        greyAdv(this.topLoc, outfit);
      },
    };
  }

  getLocations(): Location[] {
    return [this.topLoc];
  }

  isUnlockable() {
    if (toInt(getProperty("desertExploration")) < 100) {
      return false;
    }

    if (getProperty("questL11Palindome") != "finished") {
      return false;
    }

    if (getProperty("questL11Manor") != "finished") {
      return false;
    }

    if (getProperty("questL11Worship") != "finished") {
      return false;
    }

    return true;
  }
}
