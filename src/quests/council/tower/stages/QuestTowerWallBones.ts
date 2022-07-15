import {
  Location,
  Familiar,
  Item,
  availableAmount,
  pullsRemaining,
  storageAmount,
  myBuffedstat,
  Stat,
  maximize,
  numericModifier,
  useFamiliar,
  retrieveItem,
  visit,
  visitUrl,
  currentRound,
  myHp,
  myMaxhp,
  cliExecute,
  setProperty,
  getProperty,
  print,
  itemAmount,
  haveEffect,
  Effect,
  use,
  mallPrice,
  equippedAmount,
  Monster,
  myPrimestat,
} from "kolmafia";
import { PropertyManager } from "../../../../utils/Properties";
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
import { DelayBurners } from "../../../../iotms/delayburners/DelayBurners";

export class QuestTowerWallBones implements QuestInfo {
  knife: Item = Item.get("Electric Boning Knife");
  boning: QuestInfo = new QuestTowerBoningKnife();
  killer = new QuestTowerKillBones();
  toAbsorb: Monster[];

  getChildren(): QuestInfo[] {
    return [this.boning];
  }

  getId(): QuestType {
    return "Council / Tower / WallOfBones";
  }

  level(): number {
    return 13;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL13Final");

    if (status < 8) {
      return QuestStatus.NOT_READY;
    }

    if (status > 8) {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.knife) == 0 && !this.killer.isPossible()) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    if (availableAmount(this.knife) == 0 && this.killer.isPossible()) {
      return this.killer.run();
    }

    return {
      location: null,
      run: () => {
        let macro = new Macro().tryItem(this.knife);

        greyAdv(
          "place.php?whichplace=nstower&action=ns_07_monster3",
          null,
          new AdventureSettings().setStartOfFightMacro(macro)
        );
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}

export class QuestTowerBoningKnife implements QuestInfo {
  knife: Item = Item.get("Electric Boning Knife");
  loc: Location = Location.get(
    "The Castle in the Clouds in the Sky (Ground Floor)"
  );
  bossKiller = new QuestTowerKillBones();

  getId(): QuestType {
    return "Council / Tower / WallOfBones / BoningKnife";
  }

  level(): number {
    return 13;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL13Final");

    if (status < 8) {
      return QuestStatus.NOT_READY;
    }

    if (status > 8) {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.knife) > 0) {
      return QuestStatus.COMPLETED;
    }

    if (this.bossKiller.isPossible()) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setNoCombat();

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        let props = new PropertyManager();
        DelayBurners.tryReplaceCombats();

        if (DelayBurners.isTryingForDupeableGoblin()) {
          useFamiliar(Familiar.get("Grey Goose"));
        }

        try {
          props.setChoice(672, 1);
          props.setChoice(673, 1);
          props.setChoice(674, 1);
          props.setChoice(1026, 2);

          greyAdv(this.loc, outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [];
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
      !haveEffect(Effect.get("Phairly Balanced")) &&
      mallPrice(Item.get("PH Balancer")) < 1000
    ) {
      use(Item.get("PH Balancer"));
    }

    maximize("moxie +equip " + this.rocket.name, true);

    let moxie = numericModifier("Generated:_spec", "Buffed Moxie");
    let damage = this.damageMultiplier * (moxie * 0.4);

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
      !haveEffect(Effect.get("Phairly Balanced")) &&
      mallPrice(Item.get("PH Balancer")) < 1000
    ) {
      use(Item.get("PH Balancer"));
    }

    maximize("mys", true);

    let mys = numericModifier("Generated:_spec", "Buffed Mysticality");
    let damage = this.damageMultiplier * (mys * 0.15);

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
      outfit: new GreyOutfit("-tie"),
      run: () => {
        let macro: Macro;
        useFamiliar(Familiar.get("None"));

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
