import {
  Location,
  Familiar,
  Item,
  availableAmount,
  Skill,
  haveSkill,
  haveFamiliar,
  maximize,
  Element,
  numericModifier,
  equip,
  myFamiliar,
  myMaxhp,
  myHp,
  toInt,
  getProperty,
  cliExecute,
  turnsPlayed,
  haveEffect,
  Effect,
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
import { restoreHPTo } from "../../../../tasks/TaskMaintainStatus";

export class QuestTowerWallSkin implements QuestInfo {
  beehive: Item = Item.get("Beehive");
  forest: QuestInfo = new QuestTowerBeeHive();
  killer: QuestTowerKillSkin = new QuestTowerKillSkin();

  getChildren(): QuestInfo[] {
    return [this.forest];
  }

  getId(): QuestType {
    return "Council / Tower / WallOfSkin";
  }

  level(): number {
    return 13;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL13Final");

    if (status < 6) {
      return QuestStatus.NOT_READY;
    }

    if (status > 6) {
      return QuestStatus.COMPLETED;
    }

    if (!this.killer.isPossible() && availableAmount(this.beehive) == 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    if (availableAmount(this.beehive) == 0 && this.killer.isPossible()) {
      return this.killer.run();
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
}

export class QuestTowerBeeHive implements QuestInfo {
  beehive: Item = Item.get("Beehive");
  blackForest: Location = Location.get("The Black Forest");
  killer: QuestTowerKillSkin = new QuestTowerKillSkin();

  getId(): QuestType {
    return "Council / Tower / WallOfSkin / Beehive";
  }

  level(): number {
    return 13;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL13Final");

    if (status < 6) {
      return QuestStatus.NOT_READY;
    }

    if (
      status > 6 ||
      this.killer.isPossible() ||
      availableAmount(this.beehive) > 0
    ) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setNoCombat();

    return {
      outfit: outfit,
      location: this.blackForest,
      run: () => {
        let props = new PropertyManager();
        DelayBurners.tryReplaceCombats();

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

  getLocations(): Location[] {
    return [];
  }

  needAdventures(): number {
    return 3;
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

    for (let ele of ["Cold", "Hot", "Sleaze", "Spooky", "Stench"]) {
      let mod = numericModifier("Generated:_spec", ele + " Damage");

      if (mod > 0) {
        damagePerRound += 1;
      }
    }

    return (this.possible = damagePerRound >= 13);
  }

  run(): QuestAdventure {
    let str = this.maximizeString;

    let fam = this.familiarEquips.find((i) => availableAmount(i) > 0);

    if (fam != null) {
      str += " +equip " + fam;
    }

    if (availableAmount(this.hotPlate) > 0) {
      str += " +equip " + this.hotPlate;
    }

    let outfit = new GreyOutfit(str);

    return {
      location: null,
      familiar: this.familiar,
      disableFamOverride: true,
      outfit: outfit,
      run: () => {
        if (myFamiliar() != this.familiar) {
          throw "Expected to be using cook!";
        }

        if (toInt(getProperty("_hotTubSoaks")) < 5 && myHp() < myMaxhp()) {
          if (myMaxhp() - myHp() > 100) {
            cliExecute("hottub");
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

        if (haveEffect(Effect.get("Beaten Up")) == 0) {
          cliExecute("hottub");
        }
      },
    };
  }
}
