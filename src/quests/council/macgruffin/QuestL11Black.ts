import {
  adv1,
  availableAmount,
  council,
  Familiar,
  getProperty,
  Item,
  Location,
  Monster,
  myHp,
  myLevel,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  OutfitImportance,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { hasUnlockedLatteFlavor, LatteFlavor } from "../../../utils/LatteUtils";
import { DelayBurners } from "../../../iotms/delayburners/DelayBurners";
import { QuestTowerKillSkin } from "../tower/stages/QuestTowerWallSkin";
import { GreySettings } from "../../../utils/GreySettings";

export class QuestL11Black implements QuestInfo {
  boots: Item = Item.get("Blackberry Galoshes");
  beehive: Item = Item.get("Beehive");
  loc: Location = Location.get("The Black Forest");
  latte: Item = Item.get("Latte lovers member's mug");
  blackbird: Item = Item.get("reassembled blackbird");
  dontBanish: Monster[] = ["Black Adder", "Black Panther"].map((s) =>
    Monster.get(s)
  );
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
    let status = getQuestStatus("questL11Black");

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
    let outfit = new GreyOutfit().setPlusCombat();

    if (availableAmount(this.boots) > 0) {
      outfit.addItem(this.boots);
    } else if (availableAmount(this.blackberry) <= 1) {
      outfit.setItemDrops();
      outfit.addBonus("+0.1 booze drop +0.1 food drop");
    }

    if (this.shouldWearLatte()) {
      outfit.addItem(this.latte);
    }

    outfit.addBonus("+moxie");

    let fam: Familiar;

    if (availableAmount(this.blackbird) == 0) {
      fam = Familiar.get("Reassembled Blackbird");
    }

    return {
      location: this.loc,
      outfit: outfit,
      familiar: fam,
      run: () => {
        let props = new PropertyManager();

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

          let settings = new AdventureSettings();

          if (availableAmount(this.blackbird) == 0) {
            for (let mon of this.dontBanish) {
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

  needAdventures(): number {
    return 4;
  }
}
