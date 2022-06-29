import {
  Location,
  Familiar,
  Monster,
  knollAvailable,
  familiarWeight,
} from "kolmafia";
import { greyAdv } from "../../utils/GreyLocations";
import { ResourceClaim } from "../../utils/GreyResources";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestBugbearAbsorb implements QuestInfo {
  toAbsorb?: Monster[];
  location: Location = Location.get("The Bugbear Pen");
  goose: Familiar = Familiar.get("Grey Goose");

  getId(): QuestType {
    return "Absorbs / Bugbear";
  }

  level(): number {
    return 5;
  }

  status(): QuestStatus {
    if (this.toAbsorb.length == 0 || !knollAvailable()) {
      return QuestStatus.COMPLETED;
    }

    if (familiarWeight(this.goose) < 6) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: this.location,
      run: () => {
        greyAdv(this.location);
      },
    };
  }

  getLocations(): Location[] {
    return [this.location];
  }
}
