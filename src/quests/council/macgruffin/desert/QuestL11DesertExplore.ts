import {
  availableAmount,
  cliExecute,
  Effect,
  equip,
  equippedAmount,
  Familiar,
  familiarWeight,
  getProperty,
  haveEffect,
  haveFamiliar,
  haveSkill,
  Item,
  itemAmount,
  Location,
  maximize,
  Monster,
  myAdventures,
  myFamiliar,
  print,
  Skill,
  Slot,
  toBoolean,
  toInt,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import { DelayCriteria } from "../../../../iotms/delayburners/DelayBurners";
import { ResourceCategory } from "../../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../../typings/TaskInfo";
import { AbsorbsProvider } from "../../../../utils/GreyAbsorber";
import { greyKillingBlow } from "../../../../utils/GreyCombat";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import {
  canGreyAdventure,
  currentPredictions,
} from "../../../../utils/GreyUtils";
import { Macro } from "../../../../utils/MacroBuilder";
import { PropertyManager } from "../../../../utils/Properties";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11DesertExplore extends TaskInfo implements QuestInfo {
  hydrated: Effect = Effect.get("Ultrahydrated");
  oasis: Location = Location.get("Oasis");
  desert: Location = Location.get("The Arid, Extra-Dry Desert");
  compass: Item = Item.get("UV-resistant compass");
  knife: Item = Item.get("survival knife");
  toAbsorb: Monster[];
  camel: Familiar = Familiar.get("Melodramedary");
  ball: Item = Item.get("miniature crystal ball");
  page: Item = Item.get("worm-riding manual page");
  goose: Familiar = Familiar.get("Grey Goose");
  rose: Item = Item.get("Stone Rose");
  nanovision: Skill = Skill.get("Double Nanovision");
  lefthand: Familiar = Familiar.get("Left-Hand Man");
  extingusherProp: string = "fireExtinguisherDesertUsed";
  kramco: Item = Item.get("Kramco Sausage-o-Matic&trade;");
  paths: PossiblePath[] = [];
  curse1: Effect = Effect.get("Once-Cursed");
  curse2: Effect = Effect.get("Twice-Cursed");
  curse3: Effect = Effect.get("Thrice-Cursed");
  blur: Monster = Monster.get("Blur");
  hooks: Item = Item.get("worm-riding hooks");
  stillsuit: Item = Item.get("tiny stillsuit");

  createPaths(assumeUnstarted: boolean) {
    this.paths = [];
    // Shitty math
    const turnsLeft = (assumeUnstarted ? 100 : this.getExploredRemaining()) / 5;

    const withoutExtingusher = new PossiblePath(turnsLeft);
    this.paths.push(withoutExtingusher);

    if (assumeUnstarted || getProperty(this.extingusherProp) != "true") {
      const withExtingusher = new PossiblePath(turnsLeft - 3).add(
        ResourceCategory.FIRE_EXTINGUSHER_ZONE
      );

      this.paths.push(withExtingusher);
    }
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  getId(): QuestType {
    return "Council / MacGruffin / Desert / Explore";
  }

  level(): number {
    return 11;
  }

  getGnome(): number {
    return toInt(getProperty("gnasirProgress"));
  }

  wantsGnomeRose(): boolean {
    return (this.getGnome() & 1) != 1;
  }

  mustBeDone(): boolean {
    if (haveEffect(this.hydrated) == 0 || this.getExploredRemaining() <= 0) {
      return false;
    }

    if (availableAmount(this.hooks) > 0) {
      return false;
    }

    if (
      this.toAbsorb.length == 0 &&
      canGreyAdventure(this.oasis) &&
      getProperty("_gnasirAvailable") == "true" &&
      this.wantsGnomeRose() &&
      availableAmount(this.rose) == 0 &&
      (familiarWeight(this.goose) >= 6 ||
        AbsorbsProvider.getAbsorbedMonsters().includes(this.blur))
    ) {
      return false;
    }

    return true;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL11Desert");

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    if (
      (!haveFamiliar(this.camel) && availableAmount(this.compass) == 0) ||
      !haveSkill(this.nanovision)
    ) {
      return QuestStatus.NOT_READY;
    }

    if (
      haveEffect(Effect.get("Tenuous Grip on Reality")) ||
      haveEffect(Effect.get("Barking Dogs"))
    ) {
      return QuestStatus.NOT_READY;
    }

    if (
      haveEffect(this.hydrated) == 0 &&
      haveEffect(this.curse1) +
        haveEffect(this.curse2) +
        haveEffect(this.curse3) >
        0
    ) {
      return QuestStatus.NOT_READY;
    }

    if (haveEffect(this.hydrated) == 0 && familiarWeight(this.goose) < 6) {
      return QuestStatus.FASTER_LATER;
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

    return QuestStatus.READY;
  }

  run(path: PossiblePath): QuestAdventure {
    const pred = currentPredictions().get(this.desert);
    const fireExtingusherResource =
      toBoolean(getProperty("_gnasirAvailable")) &&
      familiarWeight(this.goose) >= 6
        ? path.getResource(ResourceCategory.FIRE_EXTINGUSHER_ZONE)
        : null;

    if (
      fireExtingusherResource == null &&
      (pred == null || !this.toAbsorb.includes(pred))
    ) {
      if (
        canGreyAdventure(this.oasis) &&
        haveEffect(this.hydrated) == 0 &&
        this.getExploredRemaining() > 3
      ) {
        return {
          location: this.desert,
          outfit: GreyOutfit.IGNORE_OUTFIT,
          run: () => {
            greyAdv(this.oasis);
          },
        };
      }
    }

    const outfit = new GreyOutfit();
    outfit.addWeight(this.compass); // Compass
    outfit.addWeight(this.knife);

    if (fireExtingusherResource != null) {
      fireExtingusherResource.prepare(outfit);
    }

    if (this.toAbsorb.length > 0) {
      outfit.addIgnored(this.kramco);
    }

    const crystalBall: Map<Location, Monster> = currentPredictions();
    const fam = haveFamiliar(this.camel) ? this.camel : null;
    let forceFam: boolean = fam != null && this.toAbsorb.length == 0;
    const predictAbsorb = this.toAbsorb.includes(crystalBall.get(this.desert));

    if (fam != null) {
      if (!crystalBall.has(this.desert) || !predictAbsorb) {
        forceFam = true;
      }

      if (this.getExplored() < 10) {
        forceFam = true;
      }
    }

    if (fireExtingusherResource == null && this.toAbsorb.length == 0) {
      outfit.addDelayer(
        DelayCriteria()
          .withForcedFights(
            this.getExplored() >= 98 ||
              (this.getExplored() >= 8 &&
                !toBoolean(getProperty("_gnasirAvailable")))
              ? false
              : null
          )
          .withFreeFights(null)
          .withAtLeastCombatChance(0.3)
      );
    }

    return {
      outfit: outfit,
      location: this.desert,
      familiar: fam,
      disableFamOverride: forceFam,
      run: () => {
        let killing: Macro = Macro.if_(
          Effect.get("Tenuous Grip on Reality"),
          Macro.attack().repeat()
        ).step(greyKillingBlow(outfit));

        // If we're looking for an absorb, have the crystal ball and have the camel and explored is >= 10
        if (
          this.toAbsorb.length > 0 &&
          availableAmount(this.ball) > 0 &&
          fam != null
        ) {
          // If we have a prediction
          if (crystalBall.has(this.desert)) {
            // If we predict an absorb
            if (predictAbsorb) {
              // If we are still doing the first 10 explores
              if (this.getExplored() < 10) {
                // We don't want to wear the ball, we'll do that when we do the absorb
                if (availableAmount(this.stillsuit) > 0) {
                  cliExecute("equip " + this.stillsuit);
                } else {
                  equip(Slot.get("familiar"), Item.none);

                  maximize("familiar -equip " + this.ball, false);
                }
              } else if (
                equippedAmount(this.ball) == 0 &&
                familiarWeight(this.goose) >= 6
              ) {
                equip(this.ball);
              }
            } else {
              // Force them to wear the ball to change our prediction
              equip(this.ball);
            }
          } else {
            // Force the ball to be worn to make a prediction
            equip(this.ball);
          }
        }

        if (fireExtingusherResource != null) {
          let macro = fireExtingusherResource.macro();

          if (myFamiliar() == this.goose && this.toAbsorb.length > 0) {
            macro = Macro.ifNot_(this.toAbsorb[0], macro);
          }

          killing = macro.step(killing);
        } else if (this.toAbsorb.length == 0) {
          // If the compass is not equipped, and we don't own camel, but we do own left-hand man.
          // Then it's worth it.
          if (
            itemAmount(this.compass) > 0 &&
            equippedAmount(this.compass) == 0 &&
            haveFamiliar(this.lefthand) &&
            myFamiliar() != this.camel
          ) {
            useFamiliar(this.lefthand);
            equip(this.compass, Slot.get("familiar"));
          }
        }

        const explored = this.getExplored();
        const props = new PropertyManager();
        props.setChoice(805, 1);

        try {
          greyAdv(
            this.desert,
            outfit,
            new AdventureSettings().setFinishingBlowMacro(killing)
          );
        } finally {
          props.resetAll();
        }

        if (getProperty("lastEncounter") == "A Sietch in Time") {
          visitUrl("place.php?whichplace=desertbeach", false);
        } else if (explored == this.getExplored()) {
          print("Checking explored..", "blue");
          visitUrl("place.php?whichplace=desertbeach", false);
        } else if (
          explored >= 10 &&
          (toInt(getProperty("gnasirProgress")) & 8) != 8
        ) {
          print("Worm Pages: " + availableAmount(this.page) + " / 15", "blue");
        }
        print("Desert Explored: " + this.getExplored() + " / 100", "blue");
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

  canAcceptPrimes(): boolean {
    return false;
  }
}
