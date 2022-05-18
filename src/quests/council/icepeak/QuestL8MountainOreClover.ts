import { availableAmount, Item, Location } from "kolmafia";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyClovers, GreyPulls } from "../../../utils/GreyResources";
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
      return QuestStatus.COMPLETED;
    }

    if (this.getStatus() < MountainStatus.TRAPPER_DEMANDS) {
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
}
