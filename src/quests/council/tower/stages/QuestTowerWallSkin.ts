import {
  availableAmount,
  cliExecute,
  Effect,
  Familiar,
  getProperty,
  haveEffect,
  haveFamiliar,
  Item,
  Location,
  maximize,
  myFamiliar,
  myHp,
  myMaxhp,
  numericModifier,
  toInt,
  turnsPlayed,
  useFamiliar,
} from "kolmafia";
import { DelayBurners } from "../../../../iotms/delayburners/DelayBurners";
import { restoreHPTo } from "../../../../tasks/TaskMaintainStatus";
import { ResourceCategory } from "../../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../../typings/TaskInfo";
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

export class QuestTowerWallSkin extends TaskInfo implements QuestInfo {
  beehive: Item = Item.get("Beehive");
  killer: QuestTowerKillSkin = new QuestTowerKillSkin();
  blackForest: Location = Location.get("The Black Forest");
  paths: PossiblePath[];

  createPaths(assumeUnstarted: boolean) {
    this.paths = [
      new PossiblePath(0).addMeat(1000),
      new PossiblePath(0).add(ResourceCategory.HOT_TUB),
    ];
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  getId(): QuestType {
    return "Council / Tower / WallOfSkin";
  }

  level(): number {
    return 13;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL13Final");

    if (status < 6) {
      return QuestStatus.NOT_READY;
    }

    if (status > 6) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(path: PossiblePath): QuestAdventure {
    if (availableAmount(this.beehive) == 0) {
      if (this.killer.isPossible()) {
        return this.killer.run(path);
      } else {
        return this.runBees();
      }
    }

    return {
      location: null,
      run: () => {
        greyAdv(
          "place.php?whichplace=nstower&action=ns_05_monster1",
          null,
          new AdventureSettings().setStartOfFightMacro(
            Macro.tryItem(this.beehive)
          )
        );
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  runBees(): QuestAdventure {
    const outfit = new GreyOutfit().setNoCombat();

    return {
      outfit: outfit,
      location: this.blackForest,
      run: () => {
        const props = new PropertyManager();
        DelayBurners.tryReplaceCombats();

        if (DelayBurners.isTryingForDupeableGoblin()) {
          useFamiliar(Familiar.get("Grey Goose"));
        }

        try {
          props.setChoice(924, 3); // Beezzzz
          props.setChoice(1018, 1);
          props.setChoice(1019, 1);

          greyAdv(this.blackForest, outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}

export class QuestTowerKillSkin {
  familiar: Familiar = Familiar.get("Shorter-Order Cook");
  hotPlate: Item = Item.get("Hot Plate");
  maximizeString: string =
    "hot dmg 1 max +stench dmg 1 max +cold dmg 1 max +sleaze dmg 1 max +spooky dmg 1 max -tie";
  familiarEquips: Item[] = [
    "Muscle band",
    "Ant Hoe",
    "Ant Pick",
    "Ant Pitchfork",
    "Ant Rake",
    "Ant Sickle",
    "Tiny bowler",
  ].map((s) => Item.get(s));
  lastPossible: number = 0;
  possible: boolean;

  isPossible(): boolean {
    if (!haveFamiliar(this.familiar)) {
      return false;
    }

    if (getQuestStatus("questL13Final") < 6) {
      return true;
    }

    if (this.lastPossible == turnsPlayed()) {
      return this.possible;
    }

    this.lastPossible = turnsPlayed();

    // Short cook and physical damage
    let damagePerRound = 7;

    if (availableAmount(this.hotPlate) > 0) {
      damagePerRound += 1;
    }

    if (
      this.familiarEquips.find((equip) => availableAmount(equip) > 0) != null
    ) {
      damagePerRound++;
    }

    maximize(this.maximizeString + " -offhand -familiar", true);

    for (const ele of ["Cold", "Hot", "Sleaze", "Spooky", "Stench"]) {
      const mod = numericModifier("Generated:_spec", ele + " Damage");

      if (mod > 0) {
        damagePerRound += 1;
      }
    }

    return (this.possible = damagePerRound >= 13);
  }

  run(path: PossiblePath): QuestAdventure {
    let str = this.maximizeString;

    const fam = this.familiarEquips.find((i) => availableAmount(i) > 0);

    if (fam != null) {
      str += " +equip " + fam;
    }

    if (availableAmount(this.hotPlate) > 0) {
      str += " +equip " + this.hotPlate;
    }

    const outfit = new GreyOutfit(str);

    return {
      location: null,
      familiar: this.familiar,
      disableFamOverride: true,
      outfit: outfit,
      run: () => {
        if (myFamiliar() != this.familiar) {
          throw "Expected to be using cook!";
        }

        if (myHp() < myMaxhp()) {
          if (path.canUse(ResourceCategory.HOT_TUB)) {
            cliExecute("hottub");
            path.addUsed(ResourceCategory.HOT_TUB);
          } else {
            restoreHPTo(myMaxhp());
          }
        }

        if (myHp() < myMaxhp()) {
          throw "Not healthy enough!";
        }

        greyAdv(
          "place.php?whichplace=nstower&action=ns_05_monster1",
          outfit,
          new AdventureSettings().setStartOfFightMacro(
            Macro.skill("Grey Noise").repeat()
          )
        );
      },
    };
  }
}
