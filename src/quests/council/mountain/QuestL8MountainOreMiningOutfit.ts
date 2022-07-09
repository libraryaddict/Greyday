import { haveOutfit, Location, min } from "kolmafia";
import { ResourceClaim } from "../../../utils/GreyResources";
import { QuestStatus, QuestAdventure } from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { MountainStatus } from "../QuestL8IcePeak";
import { QuestL8MountainOre } from "./QuestL8MountainOre";

export class QuestL8MountainOreMiningOutfit extends QuestL8MountainOre {
  mines: Location = Location.get("Itznotyerzitz Mine");

  getId(): QuestType {
    return "Council / Ice / OreOutfit";
  }

  getResourceClaims(): ResourceClaim[] {
    return [];
  }

  status(): QuestStatus {
    let status = this.getStatus();

    if (status < MountainStatus.TRAPPER_DEMANDS) {
      return QuestStatus.NOT_READY;
    }

    if (status > MountainStatus.TRAPPER_DEMANDS) {
      return QuestStatus.COMPLETED;
    }

    if (this.getOreRemaining() <= 0) {
      return QuestStatus.COMPLETED;
    }

    if (haveOutfit("Mining Gear")) {
      return QuestStatus.COMPLETED;
    }

    // TODO
    return QuestStatus.COMPLETED;
  }

  run(): QuestAdventure {
    // TODO
    throw new Error("Method not implemented.");
  }

  getLocations(): Location[] {
    return [this.mines];
  }
}
