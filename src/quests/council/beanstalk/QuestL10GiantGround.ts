import { Location, Familiar, availableAmount, Item, Monster } from "kolmafia";
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

export class QuestL10GiantGround implements QuestInfo {
  boning: Item = Item.get("electric boning knife");
  loc: Location = Location.get(
    "The Castle in the Clouds in the Sky (Ground Floor)"
  );
  toAbsorb: Monster[];

  isDelayBurning() {
    return (
      availableAmount(this.boning) > 0 &&
      this.toAbsorb.length == 0 &&
      this.loc.turnsSpent < 11
    );
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();

    if (availableAmount(this.boning) == 0) {
      outfit.setNoCombat();
    } else {
      outfit.setPlusCombat();
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
