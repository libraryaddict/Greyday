import {
  availableAmount,
  cliExecute,
  Effect,
  effectModifier,
  Familiar,
  familiarWeight,
  getFuel,
  getProperty,
  getWorkshed,
  haveEffect,
  haveFamiliar,
  haveSkill,
  historicalPrice,
  Item,
  itemAmount,
  Location,
  numericModifier,
  print,
  Skill,
  toBoolean,
  toInt,
  use,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { GreySettings } from "../../../utils/GreySettings";
import { Macro } from "../../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class Quest12WarNuns implements QuestInfo {
  loc: Location = Location.get("The Themthar Hills");
  lep: Familiar = Familiar.get("Leprechaun");
  hobo: Familiar = Familiar.get("Hobo Monkey");
  robor: Familiar = Familiar.get("Robortender");
  tot: Familiar = Familiar.get("Trick-or-Treating Tot");
  item: Item = Item.get("li'l pirate costume");

  hotness: Item = Item.get("Mick's IcyVapoHotness Inhaler");
  effect: Effect = effectModifier(this.hotness, "Effect");
  winkles: Effect = Effect.get("Winklered");
  bowlStraightUp: Effect = Effect.get("Cosmic Ball in the Air");
  cosmicBall: Item = Item.get("Cosmic Bowling Ball");
  asdonMartin: Item = Item.get("Asdon Martin keyfob");
  driving: Effect = Effect.get("Driving Observantly");
  meatPotions: Item[] = [
    "Savings Bond",
    "Autumn Dollar",
    "Polka Pop",
    "Pink candy heart",
  ].map((s) => Item.get(s));

  fishHead: Item = Item.get("Fish Head");
  boxedWine: Item = Item.get("Boxed Wine");
  piscatini: Item = Item.get("Piscatini");
  grapefruit: Item = Item.get("Grapefruit");
  driveby: Item = Item.get("Drive-by shooting");
  grapes: Item = Item.get("Bunch of square grapes");

  roborDrinks: Item[] = [this.fishHead, this.piscatini, this.driveby];

  getLocations(): Location[] {
    return [this.loc];
  }

  hasMeatBooze(): boolean {
    return this.roborDrinks.find((i) => availableAmount(i) > 0) != null;
  }

  hasDrunkMeat(): boolean {
    return getProperty("_roboDrinks").includes("drive-by shooting");
  }

  getFamiliarToUse(allownNull: boolean): Familiar {
    if (haveFamiliar(this.tot) && availableAmount(this.item) > 0) {
      return this.tot;
    }

    if (
      haveFamiliar(this.robor) &&
      (this.hasMeatBooze() || this.hasDrunkMeat())
    ) {
      return this.robor;
    }

    if (allownNull) {
      return null;
    }

    return haveFamiliar(this.hobo)
      ? this.hobo
      : haveFamiliar(this.lep)
      ? this.lep
      : null;
  }

  hasFamiliarRecommendation(): Familiar {
    const toLevel: Familiar = this.getFamiliarToUse(true);

    if (toLevel == this.tot) {
      return;
    }

    if (toLevel != null && familiarWeight(toLevel) < 20) {
      return toLevel;
    }

    return null;
  }

  doRoboDrinks() {
    if (
      !haveFamiliar(this.robor) ||
      this.hasDrunkMeat() ||
      !this.hasMeatBooze()
    ) {
      return;
    }

    // If no driveby on hand
    if (availableAmount(this.driveby) == 0) {
      // If no way to get grapefruit
      if (
        availableAmount(this.grapefruit) == 0 &&
        getProperty("sidequestOrchardCompleted") == "none"
      ) {
        return;
      }

      // If we need pisc
      if (availableAmount(this.piscatini) == 0) {
        // If we can't make pisc
        if (
          availableAmount(this.fishHead) == 0 ||
          availableAmount(this.boxedWine) == 0
        ) {
          return;
        }
      }
    }

    // Now check if we can make this

    if (availableAmount(this.driveby) == 0) {
      cliExecute("create " + this.driveby.name);
    }

    useFamiliar(this.robor);
    cliExecute("robo drive-by shooting");
  }

  level(): number {
    return 12;
  }

  getId(): QuestType {
    return "Council / War / Nuns";
  }

  isBowlingBallNextCombat(): boolean {
    return (
      toInt(getProperty("cosmicBowlingBallReturnCombats")) <= 0 ||
      availableAmount(this.cosmicBall) > 0
    );
  }

  status(): QuestStatus {
    if (getProperty("sidequestNunsCompleted") != "none") {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.item) == 0) {
      this.doRoboDrinks();
    }

    if (
      getProperty("warProgress") != "started" ||
      toInt(getProperty("hippiesDefeated")) < 192
    ) {
      return QuestStatus.NOT_READY;
    }

    if (
      !haveSkill(Skill.get("Financial Spreadsheets")) &&
      GreySettings.greyMeatSkill != "No"
    ) {
      return QuestStatus.FASTER_LATER;
    }

    if (
      !this.mustBeDone() &&
      getProperty("hasCosmicBowlingBall") == "true" &&
      !haveEffect(this.bowlStraightUp) &&
      !this.isBowlingBallNextCombat()
    ) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.FASTER_LATER;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit();
    outfit.addWeight(Item.get("Beer Helmet"));
    outfit.addWeight(Item.get("distressed denim pants"));
    outfit.addWeight(Item.get("bejeweled pledge pin"));
    outfit.meatDropWeight = 10;

    const fam = this.getFamiliarToUse(false);

    if (fam == this.tot) {
      outfit.addWeight(this.item);
    }

    return {
      familiar: fam,
      location: this.loc,
      outfit: outfit,
      disableFamOverride: fam != null,
      run: () => {
        if (this.getMeat() == 0) {
          this.visitNuns();
          cliExecute("boombox meat");
        }

        this.tryToBuff();

        const meat = this.getMeat();

        greyAdv(
          this.loc,
          outfit,
          new AdventureSettings().setStartOfFightMacro(
            Macro.trySkill("sing along").trySkill(Skill.get("Bowl Straight Up"))
          )
        );

        if (meat >= this.getMeat() || this.getMeat() >= 100_000) {
          this.visitNuns();

          if (this.status() == QuestStatus.COMPLETED) {
            cliExecute("boombox food");
          }
        }

        print(
          `Turns Taken: ${this.loc.turnsSpent}, that's approx ${Math.round(
            this.getMeat() / this.loc.turnsSpent
          )} meat per adventure! ${this.getMeat()} / 100,000 collected.`,
          "blue"
        );
      },
    };
  }

  visitNuns() {
    visitUrl("bigisland.php?place=nunnery");
  }

  getMeat(): number {
    return toInt(getProperty("currentNunneryMeat"));
  }

  mustBeDone(): boolean {
    return haveEffect(this.effect) + haveEffect(this.winkles) > 0;
  }

  tryToBuff() {
    if (
      getWorkshed() == this.asdonMartin &&
      getFuel() > 37 &&
      haveEffect(this.driving) == 0
    ) {
      cliExecute("asdonmartin drive Observantly");
    }

    /* if (!this.hasAlreadyPulled()) {
      GreyPulls.pullMeatBuffers();

      use(this.hotness);
    }*/

    if (!toBoolean(getProperty("concertVisited"))) {
      cliExecute("concert 2"); // Feeling wrinkled
    }

    for (const i of this.meatPotions) {
      if (itemAmount(i) == 0) {
        continue;
      }

      const effect = effectModifier(i, "Effect");

      if (haveEffect(effect) > 0) {
        continue;
      }

      // How much meat will drop from this effect
      // Multiply by 10 to get 1k meat from 100% meat, then multiply by duration which is assumed to be 10
      const meatWorth = numericModifier(effect, "Meat Drop") * 10 * 10;

      if (
        historicalPrice(i) >
        GreySettings.greyValueOfAdventure * (meatWorth / 1000.0)
      ) {
        continue;
      }

      use(i);
    }
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}
