import {
  availableAmount,
  Familiar,
  getProperty,
  Item,
  Location,
  Monster,
  toInt,
  turnsPlayed,
} from "kolmafia";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import {
  GreyPulls,
  ResourceClaim,
  ResourcePullClaim,
} from "../../utils/GreyResources";
import { GreySettings } from "../../utils/GreySettings";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestTeachersPen implements QuestInfo {
  pen: Item = Item.get("Teacher's Pen");
  cleaver: Item = Item.get("June Cleaver");
  resource: ResourcePullClaim = new ResourcePullClaim(
    this.pen,
    "Familiar Exp",
    30
  );

  getResourceClaims(): ResourceClaim[] {
    if (availableAmount(this.pen) > 0) {
      return [];
    }

    return [this.resource];
  }

  getId(): QuestType {
    return "Misc / Teacher's Pen";
  }

  level(): number {
    return 5;
  }

  status(): QuestStatus {
    if (GreySettings.isHardcoreMode() || availableAmount(this.pen) > 0) {
      return QuestStatus.COMPLETED;
    }

    if (
      availableAmount(this.cleaver) > 0 &&
      turnsPlayed() < 50 &&
      toInt(getProperty("_juneCleaverFightsLeft")) < 3
    ) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      outfit: new GreyOutfit("-tie"),
      location: null,
      run: () => {
        GreyPulls.pullTeachersPen();
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
