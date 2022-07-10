import {
  availableAmount,
  council,
  getProperty,
  Item,
  Location,
  Monster,
  myLevel,
} from "kolmafia";
import { PropertyManager } from "../../utils/Properties";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { hasNonCombatSkillsReady } from "../../GreyAdventurer";
import { greyAdv } from "../../utils/GreyLocations";
import { QuestType } from "../QuestTypes";
import { DelayBurners } from "../../iotms/delayburners/DelayBurners";
import { AbsorbsProvider } from "../../utils/GreyAbsorber";
import { hasUnlockedLatteFlavor, LatteFlavor } from "../../utils/LatteUtils";

export class QuestL2SpookyLarva implements QuestInfo {
  location: Location = Location.get("The Spooky Forest");
  latte: Item = Item.get("Latte lovers member's mug");
  toAbsorb: Monster[];

  shouldWearLatte(): boolean {
    return (
      availableAmount(this.latte) > 0 &&
      !hasUnlockedLatteFlavor(LatteFlavor.FAMILIAR_WEIGHT)
    );
  }

  level(): number {
    return 2;
  }

  getId(): QuestType {
    return "Council / Larva";
  }

  status(): QuestStatus {
    let status = getProperty("questL02Larva");

    if (status == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (this.isDelayBurning()) {
      if (DelayBurners.isDelayBurnerReady()) {
        return QuestStatus.READY;
      }

      if (DelayBurners.isDelayBurnerFeasible()) {
        return QuestStatus.FASTER_LATER;
      }
    } else if (
      this.location.turnsSpent >= 5 &&
      !hasNonCombatSkillsReady(false) &&
      myLevel() >= 5
    ) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  isDelayBurning(): boolean {
    return this.location.turnsSpent < 5 && this.toAbsorb.length == 0;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();

    if (this.shouldWearLatte()) {
      outfit.addItem(this.latte);
    }

    if (this.location.turnsSpent >= 5) {
      outfit.setNoCombat();
    }

    return {
      location: this.location,
      outfit: outfit,
      run: () => {
        let props = new PropertyManager();

        props.setChoice(502, 2);
        props.setChoice(505, 1);

        if (!this.shouldWearLatte() && this.toAbsorb.length == 0) {
          let delay = DelayBurners.getReadyDelayBurner();

          if (delay != null) {
            delay.doFightSetup();
          } else if (hasNonCombatSkillsReady()) {
            DelayBurners.tryReplaceCombats();
          }
        }

        try {
          greyAdv(this.location, outfit);
        } finally {
          props.resetAll();
        }

        if (availableAmount(Item.get("mosquito larva")) > 0) {
          council();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.location];
  }
}
