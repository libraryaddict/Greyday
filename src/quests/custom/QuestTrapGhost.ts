import {
  Location,
  Item,
  myHp,
  availableAmount,
  getProperty,
  canAdventure,
  myLevel,
  totalTurnsPlayed,
  maximize,
  numericModifier,
  toInt,
  Skill,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { canGreyAdventure } from "../../utils/GreyUtils";
import { Macro } from "../../utils/MacroBuilder";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestTrapGhost implements QuestInfo {
  pack: Item = Item.get("protonic accelerator pack");
  sweatpants: Item = Item.get("Designer Sweatpants");
  gallery: Location = Location.get("The Haunted Gallery");
  icyPeak: Location = Location.get("The Icy Peak");
  palindome: Location = Location.get("Inside the Palindome");
  smutOrcs: Location = Location.get("The Smut Orc Logging Camp");
  spookyForest: Location = Location.get("The Spooky Forest");
  hasColdRes: boolean;
  lastColdResCheck: number;

  getId(): QuestType {
    return "Misc / Ghost Buster";
  }

  level(): number {
    return 3;
  }

  isReady(): boolean {
    return getProperty("ghostLocation") != "";
  }

  getLocation(): Location {
    return Location.get(getProperty("ghostLocation"));
  }

  isBadLocation(): boolean {
    const loc = this.getLocation();

    switch (loc) {
      case this.gallery:
        return getQuestStatus("questM21Dance") <= 1;
      case this.palindome:
        return getQuestStatus("questL11Palindome") <= 1;
      case this.smutOrcs:
        if (getQuestStatus("questL09Topping") > 0) {
          return false;
        }

        const progress = getProperty("smutOrcNoncombatProgress");

        if (progress == "") {
          return false;
        }

        return toInt(progress) >= 15;
      case this.spookyForest:
        return (
          (myLevel() >= 6 && getProperty("questM16Temple") != "finished") ||
          getProperty("questL02Larva") != "finished"
        );
      case this.icyPeak:
        if (getQuestStatus("questL08Trapper") < 100) {
          return true;
        }

        if (this.lastColdResCheck + 5 >= totalTurnsPlayed()) {
          return !this.hasColdRes;
        }

        maximize(
          `cold res 5 min +equip ${this.pack.name}${
            availableAmount(this.sweatpants) > 0
              ? " +equip designer sweatpants"
              : ""
          } -tie`,
          true
        );

        const res = numericModifier("Generated:_spec", "Cold Resistance");
        this.lastColdResCheck = totalTurnsPlayed();
        this.hasColdRes = res >= 5;

        return !this.hasColdRes;
    }

    return false;
  }

  status(): QuestStatus {
    if (availableAmount(this.pack) == 0) {
      return QuestStatus.COMPLETED;
    }

    if (myHp() < 10) {
      return QuestStatus.NOT_READY;
    }

    if (!this.isReady()) {
      return QuestStatus.NOT_READY;
    }

    if (
      availableAmount(this.sweatpants) > 0 &&
      toInt(getProperty("sweat")) < 5
    ) {
      return QuestStatus.NOT_READY;
    }

    const loc = this.getLocation();

    if (!canGreyAdventure(loc)) {
      return QuestStatus.NOT_READY;
    }

    if (this.isBadLocation()) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = getGhostBustingOutfit();

    if (this.isReady() && this.getLocation() == this.icyPeak) {
      outfit.addWeight("cold res", 10, 5);
    }

    return {
      outfit: outfit,
      location: null,
      run: () => {
        greyAdv(
          this.getLocation(),
          outfit,
          new AdventureSettings().setStartOfFightMacro(getGhostBustingMacro())
        );
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  mustBeDone(reallyMustBeDone: boolean): boolean {
    return !reallyMustBeDone;
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}

const sweatpants = Item.get("Designer Sweatpants");
const pack: Item = Item.get("protonic accelerator pack");

export function getGhostBustingOutfit(): GreyOutfit {
  const outfit = new GreyOutfit();

  outfit.addWeight(pack);

  if (availableAmount(sweatpants) > 0) {
    outfit.addWeight(sweatpants);
  } else {
    outfit.addWeight("DA").addWeight("DR");
  }

  return outfit;
}

export function isGhostBustingTime(loc: Location): boolean {
  return (
    getProperty("ghostLocation") != "" &&
    loc == Location.get(getProperty("ghostLocation"))
  );
}

export function shouldAvoidGhosts(): boolean {
  return toInt(getProperty("sweat")) < 5 && availableAmount(sweatpants) > 0;
}

export function getGhostBustingMacro(): Macro {
  const macro = new Macro();

  if (availableAmount(sweatpants) > 0) {
    macro.skill(Skill.get("Sweat Flood"));
  }

  for (let i = 0; i < 3; i++) {
    macro.skill(Skill.get("Shoot Ghost"));
  }

  macro.skill(Skill.get("Trap Ghost"));

  return macro;
}
