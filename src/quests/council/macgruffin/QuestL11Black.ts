import {
  availableAmount,
  Familiar,
  Item,
  Location,
  Monster,
  myHp,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { hasUnlockedLatteFlavor, LatteFlavor } from "../../../utils/LatteUtils";
import { QuestTowerKillSkin } from "../tower/stages/QuestTowerWallSkin";
import { GreySettings } from "../../../utils/GreySettings";

export class QuestL11Black implements QuestInfo {
  boots: Item = Item.get("Blackberry Galoshes");
  beehive: Item = Item.get("Beehive");
  loc: Location = Location.get("The Black Forest");
  latte: Item = Item.get("Latte lovers member's mug");
  blackbird: Item = Item.get("reassembled blackbird");
  sunkenEyes: Item = Item.get("Sunken Eyes");
  brokenWings: Item = Item.get("Broken Wings");
  eyesMonster: Monster = Monster.get("black adder");
  wingsMonster: Monster = Monster.get("Black Panther");

  toAbsorb: Monster[];
  blackberry: Item = Item.get("Blackberry");
  skinKiller: QuestTowerKillSkin = new QuestTowerKillSkin();

  level(): number {
    return 11;
  }

  shouldWearLatte(): boolean {
    return (
      availableAmount(this.latte) > 0 &&
      !hasUnlockedLatteFlavor(LatteFlavor.MEAT_DROP)
    );
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  getId(): QuestType {
    return "Council / MacGruffin / Black";
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL11Black");

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    if (status > 1) {
      return QuestStatus.COMPLETED;
    }

    if (myHp() < 60) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit().setPlusCombat();

    if (availableAmount(this.boots) > 0) {
      outfit.addItem(this.boots);
    } else if (availableAmount(this.blackberry) <= 1) {
      outfit.setItemDrops();
      outfit.addBonus("+0.1 booze drop +0.1 food drop");
    }

    if (this.shouldWearLatte()) {
      outfit.addItem(this.latte);
    }

    outfit.addBonus("+moxie -ml");

    let fam: Familiar;

    if (availableAmount(this.blackbird) == 0) {
      fam = Familiar.get("Reassembled Blackbird");
    }

    return {
      location: this.loc,
      outfit: outfit,
      familiar: fam,
      orbs: this.getNeededMonsters(),
      run: () => {
        const props = new PropertyManager();

        try {
          props.setChoice(923, 1);

          if (
            !GreySettings.shouldAvoidTowerRequirements() &&
            availableAmount(this.beehive) == 0 &&
            !this.skinKiller.isPossible()
          ) {
            props.setChoice(924, 3); // Beezzzz
            props.setChoice(1018, 1);
            props.setChoice(1019, 1);
          } else if (
            availableAmount(this.boots) == 0 &&
            availableAmount(this.blackberry) >= 3
          ) {
            props.setChoice(924, 2); // Cobble
            props.setChoice(928, 4); // Make boots
          } else {
            props.setChoice(924, 1); // Fight bush
          }

          const settings = new AdventureSettings();

          if (availableAmount(this.blackbird) == 0) {
            for (const mon of this.getNeededMonsters()) {
              settings.addNoBanish(mon);
            }
          }

          greyAdv(this.loc, outfit, settings);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getNeededMonsters(): Monster[] {
    if (availableAmount(this.blackbird) > 0) {
      return [];
    }

    const monsters = [];

    if (availableAmount(this.sunkenEyes) == 0) {
      monsters.push(this.sunkenEyes);
    }

    if (availableAmount(this.brokenWings) == 0) {
      monsters.push(this.wingsMonster);
    }

    return monsters;
  }
}
