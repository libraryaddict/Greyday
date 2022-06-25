import {
  adv1,
  availableAmount,
  cliExecute,
  closetAmount,
  council,
  Effect,
  Familiar,
  familiarWeight,
  getProperty,
  haveEffect,
  haveSkill,
  isBanished,
  Item,
  itemAmount,
  Location,
  Monster,
  myAscensions,
  myLevel,
  myMeat,
  putCloset,
  retrieveItem,
  setProperty,
  Skill,
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
  bowlingBall: Item = Item.get("Bowling Ball");
  cosmicBall: Item = Item.get("Cosmic Bowling Ball");
  goose: Familiar = Familiar.get("Grey Goose");
  cosmicBowled: string = "_greyCosmicBowled";
  nanovision: Skill = Skill.get("Double Nanovision");
  drunk: Monster = Monster.get("Drunk pygmy");
  book: Item = Item.get("Book of matches");
  toAbsorb: Monster[];

  hasCosmicBowled(): boolean {
    return getProperty(this.cosmicBowled) == "true";
  }

  level(): number {
    return 11;
  }

  ownCosmicBall(): boolean {
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

  isCosmicBallNextCombat(): boolean {
    return (
      toInt(getProperty("cosmicBowlingBallReturnCombats")) <= 0 ||
      availableAmount(this.cosmicBall) > 0
    );
  }

  mustBeDone(): boolean {
    if (this.toAbsorb.length > 0 && familiarWeight(this.goose) < 6) {
      return false;
    }

    if (!this.ownCosmicBall()) {
      return false;
    }

    if (haveEffect(Effect.get("Ultrahydrated"))) {
      return false;
    }

    if (this.status() != QuestStatus.READY) {
      return false;
    }

    if (this.getProgress() != 1 || !this.isCosmicBallNextCombat()) {
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

    if (!this.barUnlocked() && haveSkill(this.nanovision)) {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.bowlingBall) > 0) {
      return QuestStatus.READY;
    }

    // If we don't have nanovision yet
    if (!haveSkill(this.nanovision) && !isBanished(this.drunk)) {
      return QuestStatus.READY;
    }

    // If we have the cosmic ball, but have not bowled yet. Lets delay this until we can definitely score some progress.
    if (
      this.ownCosmicBall() &&
      !this.hasCosmicBowled() &&
      this.getProgress() <= 3 &&
      !this.isCosmicBallNextCombat()
    ) {
      return QuestStatus.NOT_READY;
    }

    // If we can't skip a drunk, faster later
    if (myMeat() < 1000 && availableAmount(this.bowl) == 0) {
      return QuestStatus.FASTER_LATER;
    }

    if (this.getProgress() > 6) {
      throw "Shouldn't be at this point for bowling. Did we cosmic ball late?";
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();

    if (this.getProgress() >= 5 && availableAmount(this.bowlingBall) > 0) {
      outfit.addBonus("+max 0.1 elemental dmg");
    } else {
      outfit.setItemDrops();
    }

    // Banishers
    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        let macro: Macro = null;
        let couldBeBowling: boolean = false;

        if (
          !this.hasCosmicBowled() &&
          this.ownCosmicBall() &&
          this.isCosmicBallNextCombat()
        ) {
          macro = new Macro().item(this.cosmicBall);
          couldBeBowling = true;

          if (itemAmount(this.bowlingBall) > 0) {
            putCloset(this.bowlingBall, availableAmount(this.bowlingBall));
          }
        } else if (closetAmount(this.bowlingBall) > 0) {
          takeCloset(this.bowlingBall, closetAmount(this.bowlingBall));
        }

        if (availableAmount(this.book) > 0 && !this.barUnlocked()) {
          use(this.book);
        }

        if (itemAmount(this.bowlingBall) == 0 && this.barUnlocked()) {
          retrieveItem(this.bowl);
        }

        let progressPrior = this.getProgress();

        let props = new PropertyManager();
        props.setChoice(788, 1);

        try {
          let settings = new AdventureSettings();
          settings.setStartOfFightMacro(macro);
          settings.addNoBanish(Monster.get("Pygmy Bowler"));

          if (!haveSkill(this.nanovision)) {
            settings.addNoBanish(this.drunk);
          }

          greyAdv(this.loc, outfit, settings);
        } finally {
          props.resetAll();
        }

        if (couldBeBowling && this.getProgress() > progressPrior) {
          setProperty(this.cosmicBowled, "true");
        }
      },
    };
  }

  barUnlocked(): boolean {
    return toInt(getProperty("hiddenTavernUnlock")) == myAscensions();
  }
}
