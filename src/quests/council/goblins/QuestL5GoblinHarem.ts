import {
  canAdventure,
  getProperty,
  haveOutfit,
  Location,
  Monster,
  print,
} from "kolmafia";
import { ResourceCategory } from "../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../typings/TaskInfo";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { Macro } from "../../../utils/MacroBuilder";
import { PropertyManager } from "../../../utils/Properties";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL5GoblinHarem extends TaskInfo implements QuestInfo {
  harem: Location = Location.get("Cobb's Knob Harem");
  toAbsorb: Monster[];
  polarVortex: PossiblePath = new PossiblePath(0).add(
    ResourceCategory.FIRE_EXTINGUSHER_ZONE
  );
  taskYR: PossiblePath = new PossiblePath(2, 5).add(
    ResourceCategory.YELLOW_RAY
  );
  taskManual = new PossiblePath(8, 12);
  haremGirl: Monster = Monster.get("Knob Goblin Harem Girl");

  getPossiblePaths(): PossiblePath[] {
    return [this.taskManual, this.taskYR, this.polarVortex];
  }

  getId(): QuestType {
    return "Council / Goblins / HaremOutfit";
  }

  level(): number {
    return 5;
  }

  status(path: PossiblePath): QuestStatus {
    if (haveOutfit("knob Goblin Harem Girl Disguise")) {
      return QuestStatus.COMPLETED;
    }

    const status = getQuestStatus("questL05Goblin");

    if (status < 1) {
      return QuestStatus.NOT_READY;
    }

    if (status > 1) {
      return QuestStatus.COMPLETED;
    }

    if (!canAdventure(this.harem)) {
      return QuestStatus.NOT_READY;
    }

    if (
      path != null &&
      path.canUse(ResourceCategory.YELLOW_RAY) &&
      !path.getResource(ResourceCategory.YELLOW_RAY).ready()
    ) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(path: PossiblePath): QuestAdventure {
    const outfit = new GreyOutfit();
    let resource = path.getResource(ResourceCategory.FIRE_EXTINGUSHER_ZONE);

    if (resource == null) {
      resource = path.getResource(ResourceCategory.YELLOW_RAY);
    }

    if (resource != null) {
      resource.prepare(outfit);
    } else {
      outfit.setItemDrops();
    }

    return {
      location: this.harem,
      outfit: outfit,
      orbs: path.canUse(ResourceCategory.FIRE_EXTINGUSHER_ZONE)
        ? null
        : [this.haremGirl],
      run: () => {
        // When we have access to the harem, blast it down
        let macro: Macro = new Macro();
        const props = new PropertyManager();

        try {
          if (resource != null) {
            resource.prepare(null, props);

            if (resource.type == ResourceCategory.FIRE_EXTINGUSHER_ZONE) {
              macro = resource.macro();

              // If its a monster we want to absorb, don't blast it down
              for (const absorb of this.toAbsorb) {
                macro = Macro.ifNot_(absorb as Monster, macro);
              }

              macro = Macro.ifNot_(Monster.get("Sausage Goblin"), macro);
            } else if (resource.type == ResourceCategory.YELLOW_RAY) {
              macro = Macro.if_(this.haremGirl, resource.macro());
            }
          }

          greyAdv(
            this.harem,
            outfit,
            new AdventureSettings().setStartOfFightMacro(macro)
          );
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.harem];
  }
}
