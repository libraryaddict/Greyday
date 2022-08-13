import {
  availableAmount,
  changeMcd,
  council,
  Effect,
  equip,
  getProperty,
  haveEffect,
  Item,
  Location,
  myAscensions,
  myLevel,
  numericModifier,
  print,
  setProperty,
  toInt,
  turnsPlayed,
  visitUrl,
} from "kolmafia";
import { PropertyManager } from "../../utils/Properties";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { greyAdv } from "../../utils/GreyLocations";
import { QuestType } from "../QuestTypes";
import { setUmbrella, UmbrellaState } from "../../utils/GreyUtils";

export class QuestL3Tavern implements QuestInfo {
  layout: TavernLayout = new TavernLayout();
  location: Location = Location.get("The Typical Tavern Cellar");
  tangle: Item = Item.get("tangle of rat tails");
  teleportis: Effect = Effect.get("Teleportitis");
  umbrella: Item = Item.get("Unbreakable Umbrella");

  level(): number {
    return 3;
  }

  getId(): QuestType {
    return "Council / Tavern";
  }

  getLocations(): Location[] {
    return [this.location];
  }

  status(): QuestStatus {
    const status = getProperty("questL03Rat");

    if (status == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (
      getProperty("questL02Larva") != "finished" ||
      (myLevel() < 13 && haveEffect(this.teleportis) == 0)
    ) {
      return QuestStatus.NOT_READY;
    }

    if (myLevel() < 20) {
      return QuestStatus.FASTER_LATER;
    }

    if (getProperty("middleChamberUnlock") == "true") {
      return QuestStatus.READY;
    }

    // Always put this off as long as possible, aka until every quest wants to delay
    return QuestStatus.FASTER_LATER;
  }

  needAdventures(): number {
    return getQuestStatus("questL03Rat") > 1 ? 0 : 1;
  }

  mustBeDone(): boolean {
    if (getQuestStatus("questL03Rat") > 1) {
      return true;
    }

    if (
      haveEffect(this.teleportis) == 0 ||
      toInt(getProperty("lastPlusSignUnlock")) != myAscensions()
    ) {
      return false;
    }

    return true;
  }

  run(): QuestAdventure {
    const advTime = getQuestStatus("questL03Rat") == 1;

    let outfit: GreyOutfit;

    if (!advTime) {
      outfit = GreyOutfit.IGNORE_OUTFIT;
    } else {
      outfit = new GreyOutfit();

      if (getProperty("pyramidBombUsed") != "true") {
        outfit.setPlusCombat();
        outfit.plusMonsterLevelWeight = 10;
        outfit.addBonus("-offhand");

        // Boost our damage
        if (myLevel() < 16) {
          outfit.addBonus("+mox");
        }
      } else {
        outfit.setNoCombat();
        outfit.addBonus(
          "+hot dmg +hot spell dmg +cold dmg +cold spell dmg +spooky dmg +spooky spell dmg +stench dmg +stench spell dmg"
        );
      }
    }

    return {
      location: this.location,
      outfit: outfit,
      run: () => {
        if (!advTime) {
          visitUrl("tavern.php?place=barkeep");
          visitUrl("cellar.php");
          council();
          return;
        }

        const props = new PropertyManager();
        const eles: [string, number][] = [
          ["Cold", 513],
          ["Hot", 496],
          ["Spooky", 515],
          ["Stench", 514],
        ];

        for (const e of eles) {
          const choice = numericModifier(e[0] + " Damage") >= 20 ? 2 : 1;

          props.setChoice(e[1], choice);
        }

        props.setChoice(509, 1);
        props.setChoice(510, 1);

        try {
          if (
            outfit.plusMonsterLevelWeight >= 10 &&
            availableAmount(this.umbrella) > 0
          ) {
            setUmbrella(UmbrellaState.MONSTER_LEVEL);
            equip(this.umbrella);
          }

          const layout = getProperty("tavernLayout");
          const turns = turnsPlayed();

          changeMcd(10);
          greyAdv(this.layout.getLocation(), outfit);
          changeMcd(0);

          if (getQuestStatus("questL03Rat") != 1 && turnsPlayed() == turns) {
            visitUrl("cellar.php");

            if (layout == getProperty("tavernLayout")) {
              print(
                "Something went wrong with Tavern, resetting the layout. You may see a bunch of attempts to adventure that do nothing.",
                "blue"
              );
              setProperty("tavernLayout", "0000000000000000000000000");
            }
          }
        } finally {
          props.resetAll();
        }
      },
    };
  }
}

class TavernLayout {
  locations: number[] = [3, 2, 1, 0, 5, 10, 15, 20, 16, 21];

  getLocation(): string {
    const prop = getProperty("tavernLayout");

    if (prop == "0000000000000000000000000") {
      visitUrl("cellar.php");
    }

    for (const i of this.locations) {
      if (prop.charAt(i) != "0") {
        continue;
      }

      return "cellar.php?action=explore&whichspot=" + (i + 1);
    }
  }
}
