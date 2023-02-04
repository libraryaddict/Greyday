import {
  Location,
  availableAmount,
  cliExecute,
  getProperty,
  Item,
  myAscensions,
  retrieveItem,
  toInt,
  use,
  myAdventures,
  myMeat,
  runChoice,
  visitUrl,
  myLevel,
  Skill,
  haveEffect,
  Effect,
  storageAmount,
} from "kolmafia";
import { PropertyManager } from "../../utils/Properties";
import { greyAdv } from "../../utils/GreyLocations";
import { GreySettings } from "../../utils/GreySettings";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";
import { PossiblePath, TaskInfo } from "../../typings/TaskInfo";
import { ResourceCategory } from "../../typings/ResourceTypes";
import { GreyPulls } from "../../utils/GreyResources";

export class QuestGrabBoatVacation extends TaskInfo implements QuestInfo {
  junkKey: Item = Item.get("funky junk key");
  boatParts: Item[] = [
    "old claw-foot bathtub",
    "old clothesline pole",
    "antique cigar sign",
  ].map((s) => Item.get(s));
  nanovision: Skill = Skill.get("Double Nanovision");
  paths: PossiblePath[];
  scrip = Item.get("Shore Inc. Ship Trip Scrip");

  createPaths(): void {
    this.paths = [new PossiblePath(9)];

    if (storageAmount(this.scrip) > 0) {
      this.paths.push(new PossiblePath(6).addPull(this.scrip));
    }
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  getId(): QuestType {
    return "Boat / Vacation";
  }

  level(): number {
    return 6;
  }

  hasDesertAccess(): boolean {
    return toInt(getProperty("lastDesertUnlock")) == myAscensions();
  }

  status(): QuestStatus {
    if (getProperty("questM19Hippy") == "unstarted") {
      return QuestStatus.READY;
    }

    if (this.hasBoat()) {
      return QuestStatus.COMPLETED;
    }

    if (!this.hasDesertAccess()) {
      return QuestStatus.NOT_READY;
    }

    if (myMeat() < 2000) {
      return QuestStatus.NOT_READY;
    }

    if (
      !GreySettings.isHippyMode() &&
      haveEffect(Effect.get("Brother Corsican's Blessing")) +
        haveEffect(Effect.get("A Girl Named Sue")) >
        0
    ) {
      return QuestStatus.NOT_READY;
    }

    if (myAdventures() < (myLevel() < 11 ? 35 : 20)) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  doHippyJunk(): QuestAdventure {
    return {
      location: null,
      run: () => {
        visitUrl("place.php?whichplace=woods&action=woods_smokesignals");
        runChoice(1);
        runChoice(2);
      },
    };
  }

  run(path: PossiblePath): QuestAdventure {
    if (getProperty("questM19Hippy") == "unstarted") {
      return this.doHippyJunk();
    }

    return {
      location: null,
      run: () => {
        if (path.canUse(ResourceCategory.PULL)) {
          GreyPulls.tryPull(this.scrip);
        }

        const scriptAvailable = availableAmount(this.scrip);

        const props = new PropertyManager();
        props.setChoice(793, 1);

        try {
          for (let i = 0; i < 3 - scriptAvailable; i++) {
            greyAdv(Location.get("The Shore, Inc. Travel Agency"));
          }
        } finally {
          props.resetAll();
        }

        const planks = Item.get("Dingy Planks");

        if (availableAmount(planks) == 0) {
          retrieveItem(planks);
        }

        cliExecute("make dinghy plans");
        use(Item.get("Dinghy plans"));

        if (!this.hasBoat()) {
          throw "We should've had a boat!";
        }
      },
    };
  }

  mustBeDone(reallyMustBeDone: boolean): boolean {
    if (!GreySettings.isHippyMode() || reallyMustBeDone) {
      return false;
    }

    if (myLevel() == 11) {
      return true;
    }

    return false;
  }

  getLocations(): Location[] {
    return [];
  }

  hasBoat(): boolean {
    return toInt(getProperty("lastIslandUnlock")) == myAscensions();
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}
