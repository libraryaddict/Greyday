import {
  availableAmount,
  cliExecute,
  Familiar,
  getProperty,
  haveFamiliar,
  Item,
  Location,
  myAdventures,
  storageAmount,
} from "kolmafia";
import { ResourceCategory } from "../../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../../typings/TaskInfo";
import { greyAdv } from "../../../../utils/GreyLocations";
import { GreyPulls } from "../../../../utils/GreyResources";
import { PropertyManager } from "../../../../utils/Properties";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11DesertCompass extends TaskInfo implements QuestInfo {
  compass: Item = Item.get("UV-resistant compass");
  script: Item = Item.get("Shore Inc. Ship Trip Scrip");
  dontPullScriptAt: number = 6;
  pullScript: PossiblePath = new PossiblePath(0).addConsumablePull(this.script);
  noPull: PossiblePath = new PossiblePath(3);
  camel: Familiar = Familiar.get("Melodramedary");

  getId(): QuestType {
    return "Council / MacGruffin / Desert / Compass";
  }

  level(): number {
    return 11;
  }

  getPossiblePaths(): PossiblePath[] {
    if (storageAmount(this.script) <= this.dontPullScriptAt) {
      return [this.noPull];
    }

    return [this.noPull, this.pullScript];
  }

  status(path: PossiblePath): QuestStatus {
    if (
      haveFamiliar(this.camel) ||
      availableAmount(this.compass) > 0 ||
      getProperty("questL11Desert") == "finished"
    ) {
      return QuestStatus.COMPLETED;
    }

    if (myAdventures() < 40 && path == this.pullScript) {
      return QuestStatus.NOT_READY;
    }

    if (getProperty("questL11Desert") == "unstarted") {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(path: PossiblePath): QuestAdventure {
    return {
      location: null,
      run: () => {
        if (!path.canUse(ResourceCategory.PULL)) {
          const props = new PropertyManager();

          try {
            props.setChoice(793, 1);

            greyAdv(Location.get("The Shore, Inc. Travel Agency"));
          } finally {
            props.resetAll();
          }
        } else {
          GreyPulls.pullScrip();
          path.addUsed(ResourceCategory.PULL);
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
}
