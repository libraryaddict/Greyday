import { Location, Familiar, council, visitUrl } from "kolmafia";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { MountainStatus } from "../QuestL8IcePeak";

export class QuestL8MountainBoss implements QuestInfo {
  peak: Location = Location.get("Mist-shrouded Peak");

  getId(): QuestType {
    return "Council / Ice / Boss";
  }

  level(): number {
    return 8;
  }

  status(): QuestStatus {
    let status = this.getStatus();

    if (status == MountainStatus.finished) {
      return QuestStatus.COMPLETED;
    }

    if (status < MountainStatus.UNLOCKED_PEAK) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().addBonus("+cold res 5 min 5 max");

    return {
      location: this.peak,
      outfit: outfit,
      run: () => {
        greyAdv("place.php?whichplace=mclargehuge&action=cloudypeak2", outfit);

        if (this.getStatus() == MountainStatus.DEFEATED_BOAR) {
          this.talkTrapper();
          council();
        }
      },
    };
  }

  talkTrapper() {
    visitUrl("place.php?whichplace=mclargehuge&action=trappercabin");
  }

  getLocations(): Location[] {
    return [this.peak];
  }

  getStatus(): MountainStatus {
    return getQuestStatus("questL08Trapper");
  }
}
