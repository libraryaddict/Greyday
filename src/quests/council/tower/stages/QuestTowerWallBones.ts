import {
  availableAmount,
  currentRound,
  Effect,
  equippedAmount,
  Familiar,
  getProperty,
  haveEffect,
  Item,
  itemAmount,
  Location,
  mallPrice,
  maximize,
  Monster,
  myPrimestat,
  numericModifier,
  print,
  pullsRemaining,
  retrieveItem,
  setProperty,
  Stat,
  storageAmount,
  use,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import {
  DelayBurners,
  DelayCriteria,
} from "../../../../iotms/delayburners/DelayBurners";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { Macro } from "../../../../utils/MacroBuilder";
import { PropertyManager } from "../../../../utils/Properties";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestTowerWallBones implements QuestInfo {
  knife: Item = Item.get("Electric Boning Knife");
  killer = new QuestTowerKillBones();
  toAbsorb: Monster[];
  groundFloor: Location = Location.get(
    "The Castle in the Clouds in the Sky (Ground Floor)"
  );

  getId(): QuestType {
    return "Council / Tower / WallOfBones";
  }

  level(): number {
    return 13;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL13Final");

    if (status < 8) {
      return QuestStatus.NOT_READY;
    }

    if (status > 8) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    if (availableAmount(this.knife) == 0) {
      if (this.killer.isPossible()) {
        return this.killer.run();
      } else {
        return this.runKnife();
      }
    }

    return {
      location: null,
      run: () => {
        const macro = new Macro().tryItem(this.knife);

        greyAdv(
          "place.php?whichplace=nstower&action=ns_07_monster3",
          null,
          new AdventureSettings().setStartOfFightMacro(macro)
        );
      },
    };
  }

  runKnife(): QuestAdventure {
    const outfit = new GreyOutfit().setNoCombat().setNoCombat();
    outfit.addDelayer(DelayCriteria().withFreeFights(null));

    return {
      location: this.groundFloor,
      outfit: outfit,
      run: () => {
        const props = new PropertyManager();

        if (DelayBurners.isTryingForDupeableGoblin()) {
          useFamiliar(Familiar.get("Grey Goose"));
        }

        try {
          props.setChoice(672, 1);
          props.setChoice(673, 1);
          props.setChoice(674, 1);
          props.setChoice(1026, 2);

          greyAdv(this.groundFloor, outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}

export class QuestTowerKillBones {
  damageMultiplier: number = 50.5;
  health: number = 20000;
  drunkBell: Item = Item.get("Drunkula's bell");
  rocket: Item = Item.get("Great Wolf's rocket launcher");
  property: string = "_triedBossKillingBones";
  possible: boolean;

  isRocketPossible(): boolean {
    if (availableAmount(this.rocket) == 0 && storageAmount(this.rocket) == 0) {
      return false;
    }

    if (
      myPrimestat() != Stat.get("Moxie") &&
      !haveEffect(Effect.get("Cock of the Walk")) &&
      mallPrice(Item.get("Connery's Elixir of Audacity")) < 5000
    ) {
      use(Item.get("Connery's Elixir of Audacity"));
    }

    maximize("moxie +equip " + this.rocket.name, true);

    const moxie = numericModifier("Generated:_spec", "Buffed Moxie");
    const damage = this.damageMultiplier * (moxie * 0.4);

    print(
      "Using rocket, we predict " +
        Math.round(damage) +
        " / " +
        this.health +
        " damage (Worst scenario)",
      "blue"
    );

    return damage > this.health;
  }

  isBellPossible(): boolean {
    if (
      availableAmount(this.drunkBell) == 0 &&
      storageAmount(this.drunkBell) == 0
    ) {
      return false;
    }

    if (
      myPrimestat() != Stat.get("Mysticality") &&
      !haveEffect(Effect.get("On the Shoulders of Giants")) &&
      mallPrice(Item.get("Hawking's Elixir of Brilliance")) < 5000
    ) {
      use(Item.get("Hawking's Elixir of Brilliance"));
    }

    maximize("mys", true);

    const mys = numericModifier("Generated:_spec", "Buffed Mysticality");
    const damage = this.damageMultiplier * (mys * 0.15);

    print(
      "Using " +
        this.drunkBell.name +
        ", we predict " +
        Math.round(damage) +
        " / " +
        this.health +
        " damage (Worst scenario)",
      "blue"
    );

    return damage > this.health;
  }

  isPossible(): boolean {
    if (pullsRemaining() != -1 || getProperty(this.property) == "true") {
      return false;
    }

    if (this.possible != null) {
      return this.possible;
    }

    return (this.possible = this.isRocketPossible() || this.isBellPossible());
  }

  run(): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        let macro: Macro;
        useFamiliar(Familiar.none);

        if (this.isRocketPossible()) {
          maximize("moxie +equip " + this.rocket.name, false);

          if (equippedAmount(this.rocket) == 0) {
            throw "We don't have the " + this.rocket.name + " on hand?";
          }

          macro = Macro.skill("Fire Rocket");
        } else {
          if (itemAmount(this.drunkBell) == 0) {
            retrieveItem(this.drunkBell);
          }

          if (itemAmount(this.drunkBell) == 0) {
            throw "We don't have the " + this.drunkBell.name + " on hand?";
          }

          maximize("mys", false);

          macro = Macro.item(this.drunkBell);
        }

        visitUrl("place.php?whichplace=nstower&action=ns_07_monster3");

        if (currentRound() == 0) {
          throw "Failed to start the bones attack";
        }

        setProperty(this.property, "true");

        macro.submit();

        if (currentRound() != 0) {
          throw "Failed to kill the wall of bones in a single hit.";
        }
      },
    };
  }
}
