import {
  adv1,
  availableAmount,
  council,
  Familiar,
  getProperty,
  Item,
  Location,
  Monster,
  myLevel,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  OutfitImportance,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { hasUnlockedLatteFlavor, LatteFlavor } from "../../../utils/LatteUtils";
import { DelayBurners } from "../../../iotms/delayburners/DelayBurners";

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
    let status = getProperty("questL11Black");

    if (status != "started" && status != "step1") {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setPlusCombat();

    if (availableAmount(this.boots) > 0) {
      outfit.addItem(this.boots);
    }

    if (this.shouldWearLatte()) {
      outfit.addItem(this.latte);
    }

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

        if (fam != null && !this.shouldWearLatte()) {
          DelayBurners.tryReplaceCombats();
        }

        try {
          if (availableAmount(this.beehive) == 0) {
            props.setChoice(924, 3); // Beezzzz
            props.setChoice(1018, 1);
            props.setChoice(1019, 1);
          } else if (
            availableAmount(this.boots) == 0 &&
            availableAmount(Item.get("Blackberry")) >= 3
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
