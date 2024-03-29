import { availableAmount, Location, Monster, outfitPieces } from "kolmafia";
import { ResourceCategory } from "../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../typings/TaskInfo";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { canGreyAdventure, currentPredictions } from "../../../utils/GreyUtils";
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

  haremGirl: Monster = Monster.get("Knob Goblin Harem Girl");
  paths: PossiblePath[];

  createPaths() {
    this.paths = [
      new PossiblePath(0).add(ResourceCategory.FIRE_EXTINGUSHER_ZONE),
      new PossiblePath(8, 12),
      new PossiblePath(2, 5).add(ResourceCategory.YELLOW_RAY),
    ];
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  getId(): QuestType {
    return "Council / Goblins / HaremOutfit";
  }

  level(): number {
    return 5;
  }

  status(path: PossiblePath): QuestStatus {
    if (
      outfitPieces("knob Goblin Harem Girl Disguise").find(
        (i) => availableAmount(i) == 0
      ) == null
    ) {
      return QuestStatus.COMPLETED;
    }

    const status = getQuestStatus("questL05Goblin");

    if (status < 1) {
      return QuestStatus.NOT_READY;
    }

    if (status > 1) {
      return QuestStatus.COMPLETED;
    }

    if (!canGreyAdventure(this.harem)) {
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

    const pred = currentPredictions().get(this.harem);

    return {
      location: this.harem,
      outfit: outfit,
      orbs:
        (pred == null || !this.toAbsorb.includes(pred)) &&
        path.canUse(ResourceCategory.FIRE_EXTINGUSHER_ZONE)
          ? null
          : [this.haremGirl, ...this.toAbsorb],
      mayFreeRun: true,
      freeRun: (monster) => monster != this.haremGirl,
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
            new AdventureSettings()
              .setStartOfFightMacro(macro)
              .addNoBanish(this.haremGirl)
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
