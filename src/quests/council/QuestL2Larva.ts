import {
  availableAmount,
  council,
  getProperty,
  Item,
  Location,
  Monster,
} from "kolmafia";
import { PropertyManager } from "../../utils/Properties";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { hasNonCombatSkillsReady } from "../../GreyAdventurer";
import { greyAdv } from "../../utils/GreyLocations";
import { QuestType } from "../QuestTypes";
import { DelayBurners } from "../../iotms/delayburners/DelayBurners";
import { AbsorbsProvider } from "../../utils/GreyAbsorber";

export class QuestL2SpookyLarva implements QuestInfo {
  location: Location = Location.get("The Spooky Forest");
  monster: Monster = Monster.get("warwelf");

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
    }

    if (!hasNonCombatSkillsReady(false)) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  isDelayBurning(): boolean {
    return (
      this.location.turnsSpent < 5 &&
      AbsorbsProvider.getReabsorbedMonsters().includes(this.monster)
    );
  }

  run(): QuestAdventure {
    if (this.location.turnsSpent < 5) {
      return {
        location: this.location,
        run() {
          greyAdv(this.location);
        },
      };
    }

    let outfit = new GreyOutfit().setNoCombat();

    return {
      location: this.location,
      outfit: outfit,
      run: () => {
        let props = new PropertyManager();

        props.setChoice(502, 2);
        props.setChoice(505, 1);

        if (this.isDelayBurning()) {
          let delay = DelayBurners.getReadyDelayBurner();

          if (delay != null) {
            delay.doFightSetup();
          }
        }

        try {
          greyAdv(this.location);
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
