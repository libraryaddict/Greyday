import { availableAmount, Item, itemAmount, Location, use } from "kolmafia";
import {
  DelayBurners,
  DelayCriteria,
  DelayCriteriaInterface,
} from "../../../iotms/delayburners/DelayBurners";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { PropertyManager } from "../../../utils/Properties";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL5GoblinOutskirts implements QuestInfo {
  map: Item = Item.get("Cobb's Knob map");
  key: Item = Item.get("knob goblin encryption key");
  location: Location = Location.get("the outskirts of cobb's knob");

  getId(): QuestType {
    return "Council / Goblins / Outskirts";
  }

  level(): number {
    return this.location.turnsSpent < 10 ? 4 : 5;
  }

  mustBeDone(reallyMustBeDone?: boolean): boolean {
    return (
      getQuestStatus("questL05Goblin") == 0 &&
      itemAmount(this.map) > 0 &&
      itemAmount(this.key) > 0
    );
  }

  free(): boolean {
    return this.mustBeDone();
  }

  canAcceptPrimes(): boolean {
    return true;
  }

  delayCriteria(): DelayCriteriaInterface {
    return DelayCriteria().withForcedFights(
      this.location.turnsSpent >= 10 ? false : null
    );
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL05Goblin");

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    if (this.location.turnsSpent < 10) {
      if (DelayBurners.isDelayBurnerReady(this.delayCriteria())) {
        return QuestStatus.READY;
      }

      if (DelayBurners.isDelayBurnerFeasible(this.delayCriteria())) {
        return QuestStatus.FASTER_LATER;
      }
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit();

    if (this.location.turnsSpent < 10) {
      outfit.addDelayer(this.delayCriteria());
    }

    return {
      location: this.location,
      freeRun: () => true,
      outfit: outfit,
      run: () => {
        if (availableAmount(this.map) > 0 && availableAmount(this.key)) {
          use(this.map);
        } else {
          const props = new PropertyManager();
          props.setChoice(113, 2);
          props.setChoice(111, 3);
          props.setChoice(118, 2);

          try {
            greyAdv(this.location);
          } finally {
            props.resetAll();
          }
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.location];
  }
}
