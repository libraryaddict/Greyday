import {
  Location,
  Familiar,
  availableAmount,
  cliExecute,
  Item,
  getProperty,
  myAdventures,
} from "kolmafia";
import { PropertyManager } from "../../../../utils/Properties";
import { greyAdv } from "../../../../utils/GreyLocations";
import {
  GreyPulls,
  ResourceClaim,
  ResourcePullClaim,
} from "../../../../utils/GreyResources";
import { GreySettings } from "../../../../utils/GreySettings";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11DesertCompass implements QuestInfo {
  compass: Item = Item.get("UV-resistant compass");
  script: Item = Item.get("Shore Inc. Ship Trip Scrip");

  getId(): QuestType {
    return "Council / MacGruffin / Desert / Compass";
  }

  level(): number {
    return 11;
  }

  getResourceClaims(): ResourceClaim[] {
    return [new ResourcePullClaim(this.script, "Script for Compass", 3)];
  }

  status(): QuestStatus {
    if (myAdventures() < 40) {
      return QuestStatus.NOT_READY;
    }

    if (
      availableAmount(this.compass) > 0 ||
      getProperty("questL11Desert") == "finished"
    ) {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("questL11Desert") == "unstarted") {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        if (GreySettings.isHardcoreMode()) {
          let props = new PropertyManager();

          try {
            props.setChoice(793, 1);

            greyAdv(Location.get("The Shore, Inc. Travel Agency"));
          } finally {
            props.resetAll();
          }
        } else {
          GreyPulls.pullScrip();
        }

        cliExecute("make " + this.compass.name);

        if (availableAmount(this.compass) == 0) {
          throw "Compass should've been available!";
        }
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  needAdventures(): number {
    return 3;
  }
}
