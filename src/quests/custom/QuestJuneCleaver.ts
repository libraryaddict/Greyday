import {
  Location,
  Item,
  availableAmount,
  toInt,
  getProperty,
  equippedAmount,
  maximize,
  turnsPlayed,
  haveEffect,
  Effect,
  familiarWeight,
  Familiar,
  myFamiliar,
  useFamiliar,
  numericModifier,
  equip,
  Slot,
} from "kolmafia";
import { greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { canGreyAdventure } from "../../utils/GreyUtils";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestJuneCleaver implements QuestInfo {
  warren: Location = Location.get("The Dire Warren");
  cleaver: Item = Item.get("June Cleaver");
  teleportis: Effect = Effect.get("Teleportitis");
  icyPeak: Location = Location.get("The Icy Peak");
  palindom: Location = Location.get("Inside the Palindome");
  ultraRares: Location[] = [
    "Battlefield (No Uniform)",
    "Inside the Palindome",
    "The Dungeons of Doom",
    "Menagerie Level 1",
    "Cobb's Knob Treasury",
    "Pandamonium Slums",
    "A Mob of Zeppelin Protesters",
    "The Icy Peak",
    "The Sleazy Back Alley",
    "The Haunted Billiards Room",
    "The VERY Unquiet Garves",
    "The Spooky Forest",
  ].map((s) => Location.get(s));
  goose: Familiar = Familiar.get("Grey Goose");
  talisman: Item = Item.get("Talisman o' Namsilat");

  getId(): QuestType {
    return "Misc / JuneCleaver";
  }

  level(): number {
    return 3;
  }

  mustBeDone(): boolean {
    return true;
  }

  free(): boolean {
    return true;
  }

  status(): QuestStatus {
    if (availableAmount(this.cleaver) == 0) {
      return QuestStatus.COMPLETED;
    }

    if (haveEffect(this.teleportis) > 0) {
      return QuestStatus.NOT_READY;
    }

    const fightsLeft = toInt(getProperty("_juneCleaverFightsLeft"));

    if (fightsLeft > 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    // We fish for zones with URs in them, on the chance it lets us. Unlikely hey.
    let loc = this.ultraRares.find(
      (l) =>
        canGreyAdventure(l) &&
        (l != this.icyPeak || numericModifier("Cold Resistance") >= 5)
    );

    if (loc == null) {
      loc = this.warren;
    }

    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        maximize("+equip " + this.cleaver.name + " -tie", false);

        if (equippedAmount(this.cleaver) == 0) {
          throw "Something went wrong. Expected to be holding the june cleaver";
        }

        if (loc == this.palindom) {
          equip(Slot.get("acc3"), this.talisman);
        }

        // We're using the grey goose if it has enough fam weight to dupe, incase we hit an UR
        if (
          myFamiliar() != this.goose &&
          familiarWeight(this.goose) >= 6 &&
          this.ultraRares.includes(loc)
        ) {
          useFamiliar(this.goose);
        }

        const turn = turnsPlayed();

        greyAdv(loc);

        if (turn != turnsPlayed()) {
          throw "Something went wrong, expected to hit a june cleaver NC but instead spent a turn.";
        }
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
