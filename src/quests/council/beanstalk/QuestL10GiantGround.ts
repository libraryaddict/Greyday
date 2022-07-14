import {
  Location,
  Familiar,
  availableAmount,
  Item,
  Monster,
  storageAmount,
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
import { DelayBurners } from "../../../iotms/delayburners/DelayBurners";
import { AbsorbsProvider } from "../../../utils/GreyAbsorber";
import { GreySettings } from "../../../utils/GreySettings";

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

  isKnifeHunting() {
    if (availableAmount(this.boning) > 0) {
      return false;
    }

    if (GreySettings.shouldAvoidTowerRequirements()) {
      return (
        availableAmount(this.drunkBell) +
          availableAmount(this.rocket) +
          storageAmount(this.drunkBell) +
          storageAmount(this.rocket) ==
        0
      );
    }

    return true;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();

    if (this.loc.turnsSpent < 11) {
      if (this.isKnifeHunting()) {
        outfit.setNoCombat();
      } else {
        outfit.setPlusCombat();
      }
    }

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        let props = new PropertyManager();
        let hasBone = availableAmount(this.boning) > 0;

        if (this.isDelayBurning()) {
          let ready = DelayBurners.getReadyDelayBurner();

          if (ready != null) {
            ready.doFightSetup();
          } else {
            DelayBurners.tryReplaceCombats();
          }
        } else if (this.toAbsorb.length == 0) {
          DelayBurners.tryReplaceCombats();
        }

        if (DelayBurners.isTryingForDupeableGoblin()) {
          useFamiliar(Familiar.get("Grey Goose"));
        }

        try {
          // props.setChoice(672, hasBone ? 2 : 1);
          // props.setChoice(673, hasBone ? 2 : 1);
          // props.setChoice(674, hasBone ? 2 : 1);
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
    let status = getQuestStatus("questL10Garbage");

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
