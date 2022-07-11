import {
  Location,
  Familiar,
  Monster,
  knollAvailable,
  familiarWeight,
} from "kolmafia";
import { TaskEstimatedTurns, TaskInfo } from "../../typings/TaskInfo";
import { AbsorbsProvider } from "../../utils/GreyAbsorber";
import { greyAdv } from "../../utils/GreyLocations";
import { ResourceClaim, ResourceType } from "../../utils/GreyResources";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestBugbearAbsorb extends TaskInfo implements QuestInfo {
  toAbsorb?: Monster[];
  location: Location = Location.get("The Bugbear Pen");
  goose: Familiar = Familiar.get("Grey Goose");
  monster: Monster = Monster.get("Revolving Bugbear");
  wishResource: ResourceClaim = new ResourceClaim(
    ResourceType.GENIE_WISH,
    1,
    "Wish " + this.monster.name,
    AbsorbsProvider.getAbsorb(this.monster).adventures
  );
  locketResource: ResourceClaim = new ResourceClaim(
    ResourceType.COMBAT_LOCKET,
    1,
    "Locket " + this.monster.name,
    AbsorbsProvider.getAbsorb(this.monster).adventures
  );

  getId(): QuestType {
    return "Absorbs / Bugbear";
  }

  level(): number {
    return 10;
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

  getEstimatedTurns(): TaskEstimatedTurns[] {
    let turns = [this.wishResource, this.locketResource];

    if (knollAvailable()) {
    }

    return [];
  }
}
