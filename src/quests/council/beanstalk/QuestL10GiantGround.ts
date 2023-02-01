import {
  Location,
  Familiar,
  availableAmount,
  Item,
  Monster,
  useFamiliar,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import {
  DelayBurners,
  DelayCriteria,
  DelayCriteriaInterface,
} from "../../../iotms/delayburners/DelayBurners";

export class QuestL10GiantGround implements QuestInfo {
  boning: Item = Item.get("electric boning knife");
  loc: Location = Location.get(
    "The Castle in the Clouds in the Sky (Ground Floor)"
  );
  toAbsorb: Monster[];
  drunkBell: Item = Item.get("Drunkula's bell");
  rocket: Item = Item.get("Great Wolf's rocket launcher");

  isDelayBurning() {
    return (
      this.isKnifeHunting() &&
      this.toAbsorb.length == 0 &&
      this.loc.turnsSpent < 11
    );
  }

  delayCriteria(): DelayCriteriaInterface {
    return DelayCriteria().withForcedFights(
      !this.isDelayBurning() ? false : null
    );
  }

  isKnifeHunting() {
    if (availableAmount(this.boning) > 0) {
      return false;
    }

    /*if (GreySettings.shouldAvoidTowerRequirements()) {
      return (
        availableAmount(this.drunkBell) +
          availableAmount(this.rocket) +
          storageAmount(this.drunkBell) +
          storageAmount(this.rocket) ==
        0
      );
    }*/

    return true;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit();

    if (this.loc.turnsSpent < 11) {
      if (this.isKnifeHunting()) {
        outfit.setNoCombat();
      } else {
        outfit.setPlusCombat();
      }

      if (this.toAbsorb.length == 0) {
        outfit.addDelayer(this.delayCriteria());
      }
    }

    return {
      location: this.loc,
      outfit: outfit,
      freeRun: () => true,
      run: () => {
        const props = new PropertyManager();
        const hasBone = availableAmount(this.boning) > 0;

        if (DelayBurners.isTryingForDupeableGoblin()) {
          useFamiliar(Familiar.get("Grey Goose"));
        }

        try {
          props.setChoice(672, 2);
          props.setChoice(673, 2);
          props.setChoice(674, 2);
          props.setChoice(1026, hasBone ? 3 : 2);

          greyAdv(this.loc, outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getId(): QuestType {
    return "Council / Beanstalk / Ground";
  }

  level(): number {
    return 8;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL10Garbage");

    if (status < 8) {
      return QuestStatus.NOT_READY;
    }

    if (status > 8) {
      return QuestStatus.COMPLETED;
    }

    if (this.isDelayBurning()) {
      if (DelayBurners.isDelayBurnerReady()) {
        return QuestStatus.READY;
      }

      if (DelayBurners.isDelayBurnerFeasible()) {
        return QuestStatus.FASTER_LATER;
      }
    }

    return QuestStatus.READY;
  }

  getLocations(): Location[] {
    return [this.loc];
  }
}
