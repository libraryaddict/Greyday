import {
  Location,
  visitUrl,
  getProperty,
  toInt,
  Item,
  Monster,
  Familiar,
  useFamiliar,
} from "kolmafia";
import {
  DelayBurners,
  DelayCriteria,
} from "../../../../iotms/delayburners/DelayBurners";
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
  toAbsorb: Monster[];

  getId(): QuestType {
    return "Council / MacGruffin / Pyramid / Top";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL11Pyramid");

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

  free(): boolean {
    return this.mustBeDone();
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

    const outfit = new GreyOutfit().setNoCombat();

    if (this.toAbsorb.length == 0 && this.topLoc.turnsSpent < 5) {
      outfit.addDelayer(DelayCriteria().withForcedFights(null));
    }

    return {
      location: this.topLoc,
      outfit: outfit,
      freeRun: () => true,
      run: () => {
        if (DelayBurners.isTryingForDupeableGoblin()) {
          useFamiliar(Familiar.get("Grey Goose"));
        }

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
