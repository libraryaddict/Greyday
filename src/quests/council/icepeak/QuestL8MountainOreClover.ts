import {
  availableAmount,
  Effect,
  getProperty,
  haveEffect,
  Item,
  Location,
  toInt,
} from "kolmafia";
import { greyAdv } from "../../../utils/GreyLocations";
import {
  GreyClovers,
  GreyPulls,
  ResourceClaim,
  ResourcePullClaim,
  ResourceType,
} from "../../../utils/GreyResources";
import { GreySettings } from "../../../utils/GreySettings";
import { QuestStatus, QuestAdventure } from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { MountainStatus } from "../QuestL8IcePeak";
import { QuestL8MountainOre } from "./QuestL8MountainOre";

export class QuestL8MountainOreClover extends QuestL8MountainOre {
  clover: Item = Item.get("11-leaf Clover");

  getId(): QuestType {
    return "Council / Ice / OreClover";
  }

  status(): QuestStatus {
    if (GreySettings.isHardcoreMode()) {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.clover) < 2) {
      return QuestStatus.NOT_READY;
    }

    if (this.getStatus() < MountainStatus.TRAPPER_DEMANDS) {
      return QuestStatus.NOT_READY;
    }

    if (haveEffect(Effect.get("A Girl Named Sue")) > 0) {
      return QuestStatus.NOT_READY;
    }

    // User can locket instead, which according to their MPA is more profitable
    if (toInt(getProperty("valueOfAdventure")) >= 4000) {
      return QuestStatus.NOT_READY;
    }

    if (
      this.getOreRemaining() <= 0 ||
      this.getStatus() > MountainStatus.TRAPPER_DEMANDS
    ) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        for (let i = 0; i < 2; i++) {
          GreyClovers.doOres();
          greyAdv(this.mines);
        }

        GreyPulls.pullOre();
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  getResourceClaims(): ResourceClaim[] {
    return [
      new ResourceClaim(ResourceType.CLOVER, 2, "Clover Ores", 20),
      new ResourcePullClaim(Item.get("asbestos ore"), "Pull Ice Peak Ore", 10),
    ];
  }
}
