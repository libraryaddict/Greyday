import { canAdv } from "canadv.ash";
import {
  Location,
  Familiar,
  Effect,
  availableAmount,
  getProperty,
  haveEffect,
  Item,
  toInt,
  toItem,
  myAdventures,
  print,
  visitUrl,
  Monster,
  haveFamiliar,
  myFamiliar,
  equippedAmount,
  maximize,
} from "kolmafia";
import { greyKillingBlow } from "../../../../utils/GreyCombat";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { Macro } from "../../../../utils/MacroBuilder";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11DesertExplore implements QuestInfo {
  hydrated: Effect = Effect.get("Ultrahydrated");
  oasis: Location = Location.get("Oasis");
  desert: Location = Location.get("The Arid, Extra-Dry Desert");
  compass: Item = Item.get("UV-resistant compass");
  knife: Item = Item.get("survival knife");
  toAbsorb: Monster[];
  camel: Familiar = Familiar.get("Melodramedary");
  ball: Item = Item.get("miniature crystal ball");
  page: Item = Item.get("worm-riding manual page");

  getId(): QuestType {
    return "Council / MacGruffin / Desert / Explore";
  }

  level(): number {
    return 11;
  }

  /*mustBeDone(): boolean {
    if (haveEffect(this.hydrated) == 0) {
      return false;
    }

    if (this.getExploredRemaining() <= 0) {
      return false;
    }

    return true;
  }*/

  status(): QuestStatus {
    let status = getQuestStatus("questL11Desert");

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.compass) == 0) {
      return QuestStatus.NOT_READY;
    }

    if (
      getQuestStatus("questM20Necklace") < 4 &&
      this.getExplored() > 40 &&
      haveEffect(this.hydrated) == 0
    ) {
      return QuestStatus.FASTER_LATER;
    }

    if (myAdventures() < 70) {
      //|| !haveEffect(this.hydrated)) {
      return QuestStatus.FASTER_LATER;
    }

    if (
      haveEffect(Effect.get("Tenuous Grip on Reality")) ||
      haveEffect(Effect.get("Barking Dogs"))
    ) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    if (
      canAdv(this.oasis) &&
      haveEffect(this.hydrated) == 0 &&
      this.getExploredRemaining() > 3
    ) {
      return {
        location: this.desert,
        run: () => {
          greyAdv(this.oasis);
        },
      };
    }

    let outfit = new GreyOutfit();
    outfit.addItem(Item.get("UV-resistant compass")); // Compass
    outfit.addItem(this.knife);

    return {
      outfit: outfit,
      location: this.desert,
      familiar: haveFamiliar(this.camel) ? this.camel : null,
      disableFamOverride: this.toAbsorb.length == 0 && haveFamiliar(this.camel),
      run: () => {
        let killing: Macro = Macro.if_(
          Effect.get("Tenuous Grip on Reality"),
          Macro.attack().repeat()
        ).step(greyKillingBlow(outfit));

        if (myFamiliar() != this.camel && equippedAmount(this.ball) > 0) {
          maximize("familiar -equip " + this.ball.name, false);
        }

        let explored = this.getExplored();

        greyAdv(
          this.desert,
          outfit,
          new AdventureSettings().setFinishingBlowMacro(killing)
        );

        if (explored == this.getExplored()) {
          print("Checking explored..", "blue");
          visitUrl("place.php?whichplace=desertbeach", false);
        }

        if ((toInt(getProperty("gnasirProgress")) & 8) != 8) {
          print("Worm Pages: " + availableAmount(this.page) + " / 15", "blue");
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.desert];
  }

  getExplored(): number {
    return toInt(getProperty("desertExploration"));
  }

  getExploredRemaining(): number {
    return 100 - this.getExplored();
  }
}
