import {
  availableAmount,
  Familiar,
  Item,
  Location,
  Monster,
  useFamiliar,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import { hasNonCombatSkillsReady } from "../../../GreyAdventurer";
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
} from "../../../iotms/delayburners/DelayBurners";

export class ManorBathroom implements QuestInfo {
  location: Location = Location.get("The Haunted Bathroom");
  item: Item = Item.get("Lady Spookyraven's powder puff");
  toAbsorb: Monster[];

  level(): number {
    return 5;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questM21Dance");

    if (status < 1) {
      return QuestStatus.NOT_READY;
    }

    if (status > 1 || availableAmount(this.item) > 0) {
      return QuestStatus.COMPLETED;
    }

    if (!hasNonCombatSkillsReady()) {
      return QuestStatus.FASTER_LATER;
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
    return this.location.turnsSpent < 5 && this.toAbsorb.length == 0;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit();

    if (!this.hasDelay()) {
      outfit.setNoCombat();
    }

    if (this.toAbsorb.length == 0) {
      outfit.addDelayer(
        DelayCriteria().withForcedFights(this.hasDelay() ? null : false)
      );
    }

    return {
      location: this.location,
      outfit: outfit,
      freeRun: () => true,
      run: () => {
        const props = new PropertyManager();
        props.setChoice(882, 1);
        props.setChoice(881, 1);

        if (DelayBurners.isTryingForDupeableGoblin()) {
          useFamiliar(Familiar.get("Grey Goose"));
        }

        try {
          greyAdv(this.location, outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getId(): QuestType {
    return "Manor / Bathroom";
  }

  getLocations(): Location[] {
    return [this.location];
  }
}
