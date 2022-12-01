import { availableAmount, Item, Location, Monster } from "kolmafia";
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
import { DelayBurners } from "../../../iotms/delayburners/DelayBurners";

export class ManorBedroom implements QuestInfo {
  location: Location = Location.get("The Haunted Bedroom");
  item: Item = Item.get("Lady Spookyraven's finest gown");
  spectacles: Item = Item.get("Lord Spookyraven's spectacles");
  disposableCamera: Item = Item.get("disposable instant camera");
  dontLike: Monster[] = [
    "Animated Mahogany Nightstand",
    "Animated Rustic Nightstand",
    "Wardrob nightstand",
  ].map((m) => Monster.get(m));
  toAbsorb: Monster[];
  cameraMonster: Monster = Monster.get("Animated ornate nightstand");
  dressMonster: Monster = Monster.get("Elegant animated nightstand");

  needCamera(): boolean {
    return (
      availableAmount(this.disposableCamera) == 0 &&
      availableAmount(Item.get("photograph of a dog")) == 0 &&
      getQuestStatus("questL11Palindome") <= 1
    );
  }

  needGlasses(): boolean {
    return availableAmount(this.spectacles) == 0;
  }

  level(): number {
    return 5;
  }

  needDress(): boolean {
    return (
      getQuestStatus("questM21Dance") <= 2 && availableAmount(this.item) == 0
    );
  }

  status(): QuestStatus {
    const status = getQuestStatus("questM21Dance");

    if (status < 1) {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.spectacles) > 0 && !this.needCamera()) {
      if (status > 1 || availableAmount(this.item) > 0) {
        return QuestStatus.COMPLETED;
      }
    }

    if (this.hasDelay()) {
      if (DelayBurners.isDelayBurnerReady()) {
        return QuestStatus.READY;
      }

      if (DelayBurners.isDelayBurnerFeasible()) {
        return QuestStatus.FASTER_LATER;
      }
    }

    return QuestStatus.READY;
  }

  hasDelay(): boolean {
    return (
      this.toAbsorb.length == 0 &&
      this.location.turnsSpent < 5 &&
      !this.needCamera() &&
      !this.needGlasses() &&
      this.needDress()
    );
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit();

    const orbs: Monster[] = [];

    if (this.location.turnsSpent >= 5 && this.needDress()) {
      orbs.push(this.dressMonster);
    }

    if (this.needCamera() || this.needGlasses()) {
      orbs.push(this.cameraMonster);
    }

    return {
      location: this.location,
      outfit: outfit,
      orbs: orbs,
      mayFreeRun: true,
      freeRun: (monster) => !orbs.includes(monster),
      run: () => {
        const props = new PropertyManager();

        try {
          props.setChoice(876, 1);
          props.setChoice(877, 1);
          props.setChoice(879, 4); // Grab engorged sausages if we can
          props.setChoice(879, 2); // Otherwise just grab an item which is 50/50 but better than others
          props.setChoice(876, 1);

          if (this.needDress()) {
            props.setChoice(880, 1);
          } else {
            props.setChoice(880, 2);
          }

          if (availableAmount(this.spectacles) == 0) {
            props.setChoice(878, 3);
          } else if (this.needCamera()) {
            props.setChoice(878, 4);
          } else {
            props.setChoice(878, 1);
          }

          const settings = new AdventureSettings();

          this.dontLike.forEach((m) => settings.addBanish(m));

          if (this.hasDelay()) {
            const delay = DelayBurners.getReadyDelayBurner();

            if (delay != null) {
              delay.doFightSetup();
            }
          }

          greyAdv(this.location, outfit, settings);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getId(): QuestType {
    return "Manor / Bedroom";
  }

  getLocations(): Location[] {
    return [this.location];
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}
