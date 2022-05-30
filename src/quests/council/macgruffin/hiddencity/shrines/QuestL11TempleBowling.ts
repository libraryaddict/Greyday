import {
  adv1,
  availableAmount,
  cliExecute,
  closetAmount,
  council,
  Effect,
  getProperty,
  haveEffect,
  Item,
  itemAmount,
  Location,
  Monster,
  myAscensions,
  myLevel,
  myMeat,
  putCloset,
  retrieveItem,
  takeCloset,
  toInt,
  use,
} from "kolmafia";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../../../Quests";
import { GreyOutfit } from "../../../../../utils/GreyOutfitter";
import { AdventureSettings, greyAdv } from "../../../../../utils/GreyLocations";
import { Macro } from "../../../../../utils/MacroBuilder";
import { PropertyManager } from "../../../../../utils/Properties";
import { GreyPulls } from "../../../../../utils/GreyResources";
import { QuestType } from "../../../../QuestTypes";

export class QuestL11Bowling implements QuestInfo {
  bowl: Item = Item.get("Bowl of Scorpions");
  loc: Location = Location.get("The Hidden Bowling Alley");
  ball: Item = Item.get("Bowling Ball");
  cosmicBall: Item = Item.get("Cosmic Bowling Ball");

  level(): number {
    return 11;
  }

  ownBall(): boolean {
    return getProperty("hasCosmicBowlingBall") == "true";
  }

  getId(): QuestType {
    return "Council / MacGruffin / HiddenCity / Bowling";
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  getProgress(): number {
    return toInt(getProperty("hiddenBowlingAlleyProgress"));
  }

  isBowlingBallNextCombat(): boolean {
    return (
      toInt(getProperty("cosmicBowlingBallReturnCombats")) <= 0 ||
      availableAmount(this.cosmicBall) > 0
    );
  }

  mustBeDone(): boolean {
    if (!this.ownBall()) {
      return false;
    }

    if (haveEffect(Effect.get("Ultrahydrated"))) {
      return false;
    }

    if (this.status() != QuestStatus.READY) {
      return false;
    }

    if (this.getProgress() != 1 || !this.isBowlingBallNextCombat()) {
      return false;
    }

    return true;
  }

  status(): QuestStatus {
    if (getProperty("questL11Worship") != "step3") {
      return QuestStatus.NOT_READY;
    }

    let status = getProperty("questL11Spare");

    if (status == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (status == "unstarted") {
      return QuestStatus.NOT_READY;
    }

    if (!this.barUnlocked()) {
      return QuestStatus.NOT_READY;
    }

    if (
      this.ownBall() &&
      this.getProgress() == 1 &&
      !this.isBowlingBallNextCombat()
    ) {
      return QuestStatus.NOT_READY;
    }

    if (myMeat() < 1000 && availableAmount(this.bowl) == 0) {
      return QuestStatus.FASTER_LATER;
    }

    if (this.getProgress() > 6) {
      throw "Shouldn't be at this point";
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setItemDrops();
    // Banishers
    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        retrieveItem(this.bowl);

        let macro: Macro = null;

        if (this.getProgress() == 1 && this.ownBall()) {
          macro = new Macro().item(this.cosmicBall);

          if (itemAmount(this.ball) > 0) {
            putCloset(this.ball, availableAmount(this.ball));
          }
        } else if (closetAmount(this.ball) > 0) {
          takeCloset(this.ball, closetAmount(this.ball));
        }

        let props = new PropertyManager();
        props.setChoice(788, 1);

        try {
          greyAdv(
            this.loc,
            outfit,
            new AdventureSettings()
              .setStartOfFightMacro(macro)
              .addNoBanish(Monster.get("pygmy bowler"))
          );
        } finally {
          props.resetAll();
        }
      },
    };
  }

  barUnlocked(): boolean {
    return toInt(getProperty("hiddenTavernUnlock")) == myAscensions();
  }
}
