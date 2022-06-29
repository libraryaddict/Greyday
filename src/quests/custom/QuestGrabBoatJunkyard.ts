import {
  Location,
  Familiar,
  availableAmount,
  cliExecute,
  getProperty,
  Item,
  myAscensions,
  retrieveItem,
  toInt,
  use,
  gnomadsAvailable,
  myAdventures,
  myMeat,
  runChoice,
  visitUrl,
  myLevel,
  closetAmount,
  takeCloset,
  haveSkill,
  Skill,
  familiarWeight,
  Monster,
  itemAmount,
} from "kolmafia";
import { PropertyManager } from "../../utils/Properties";
import { AbsorbsProvider } from "../../utils/GreyAbsorber";
import { greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { GreySettings } from "../../utils/GreySettings";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";
import { DelayBurners } from "../../iotms/delayburners/DelayBurners";

export class QuestGrabBoatJunkyard implements QuestInfo {
  location: Location = Location.get("The Old Landfill");
  junkKey: Item = Item.get("funky junk key");
  boatParts: Item[] = [
    "old claw-foot bathtub",
    "old clothesline pole",
    "antique cigar sign",
  ].map((s) => Item.get(s));
  magazine: Item = Item.get("Worse Homes and Gardens");
  toAbsorb: Monster[];
  nanovision: Skill = Skill.get("Double Nanovision");

  getId(): QuestType {
    return "Boat / Junkyard";
  }

  level(): number {
    return 6;
  }

  status(): QuestStatus {
    if (getProperty("questM19Hippy") == "unstarted") {
      return QuestStatus.READY;
    }

    if (this.hasBoat()) {
      return QuestStatus.COMPLETED;
    }

    if (!isJunkYardBoatApproach()) {
      return QuestStatus.NOT_READY;
    }

    if (
      myLevel() < 11 ||
      (!GreySettings.isHardcoreMode() && !haveSkill(this.nanovision))
    ) {
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

  run(): QuestAdventure {
    if (getProperty("questM19Hippy") == "unstarted") {
      return this.doHippyJunk();
    }

    let outfit = new GreyOutfit();
    outfit.setItemDrops();

    return {
      location: this.location,
      outfit: outfit,
      run: () => {
        let props = new PropertyManager();

        if (this.needParts()) {
          if (closetAmount(this.junkKey) > 0 && this.toAbsorb.length == 0) {
            takeCloset(this.junkKey);
          } else {
            // We immediately try to replace combats because the key drops the longer we spend
            DelayBurners.tryReplaceCombats();
          }

          props.setChoice(795, 1);
          props.setChoice(796, 2);
          props.setChoice(797, 3);

          for (let i = 0; i < 3; i++) {
            if (availableAmount(this.boatParts[i]) > 0) {
              continue;
            }

            props.setChoice(794, i + 1);
            break;
          }
        }

        try {
          greyAdv(this.location, outfit);
        } finally {
          props.resetAll();
        }

        this.createBoat();
      },
    };
  }

  mustBeDone(): boolean {
    if (!GreySettings.isHippyMode()) {
      return false;
    }

    if (myLevel() == 11 && isJunkYardBoatApproach()) {
      return true;
    }

    return false;
  }

  getLocations(): Location[] {
    return [this.location];
  }

  hasBoat(): boolean {
    return toInt(getProperty("lastIslandUnlock")) == myAscensions();
  }

  needParts() {
    return this.boatParts.filter((s) => availableAmount(s)).length < 3;
  }

  createBoat() {
    if (this.needParts()) {
      return;
    }

    if (availableAmount(this.magazine) == 0) {
      return;
    }

    cliExecute("acquire junk junk");

    if (availableAmount(Item.get("Junk Junk")) == 0) {
      throw "Expected boat, didn't have boat!";
    }

    visitUrl("place.php?whichplace=woods&action=woods_hippy");

    if (!this.hasBoat()) {
      throw "We should've had a boat!";
    }
  }
}

export function isJunkYardBoatApproach() {
  let junkKey: Item = Item.get("funky junk key");
  let boatParts: Item[] = [
    "old claw-foot bathtub",
    "old clothesline pole",
    "antique cigar sign",
  ].map((s) => Item.get(s));

  // If we haven't absorbed sharpener yet
  if (
    !AbsorbsProvider.getReabsorbedMonsters().includes(
      Monster.get("junksprite sharpener")
    )
  ) {
    return true;
  }

  // Else if we have made some decentish progress
  return (
    itemAmount(junkKey) +
      closetAmount(junkKey) +
      boatParts.reduce((i, p) => availableAmount(p) + i, 0) >
    1
  );
}
