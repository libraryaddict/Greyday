import {
  availableAmount,
  Familiar,
  familiarWeight,
  getProperty,
  Item,
  Location,
  maximize,
  Monster,
  numericModifier,
  Skill,
  turnsPlayed,
  use,
} from "kolmafia";
import { ResourceCategory } from "../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../typings/TaskInfo";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL4BatsCenter extends TaskInfo implements QuestInfo {
  loc: Location = Location.get("Guano Junction");
  sonar: Item = Item.get("sonar-in-a-biscuit");
  goose: Familiar = Familiar.get("Grey Goose");
  paths: PossiblePath[] = [];
  vampBat: Monster = Monster.get("vampire bat");
  hasStenchRes: boolean = false;
  lastStenchCheck: number;

  createPaths(assumeUnstarted: boolean) {
    this.paths = [];

    this.paths.push(new PossiblePath(3, Math.max(3, 8 - this.loc.turnsSpent)));

    if (
      assumeUnstarted ||
      getProperty("fireExtinguisherBatHoleUsed") != "true"
    ) {
      this.paths.push(
        new PossiblePath(1).add(ResourceCategory.FIRE_EXTINGUSHER_ZONE)
      );
    }
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  getId(): QuestType {
    return "Council / Bats / UnlockLeft";
  }

  level(): number {
    return 4;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL04Bat");

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    if (!this.hasStenchRes) {
      if (
        this.lastStenchCheck == null ||
        this.lastStenchCheck + 10 < turnsPlayed()
      ) {
        maximize("Stench Res -tie", true);
        this.hasStenchRes =
          numericModifier("Generated:_spec", "Stench Resistance") > 0;
      }

      if (!this.hasStenchRes) {
        return QuestStatus.NOT_READY;
      }
    }

    if (familiarWeight(this.goose) >= 6) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(path: PossiblePath): QuestAdventure {
    const outfit = new GreyOutfit();

    const resource = path.getResource(ResourceCategory.FIRE_EXTINGUSHER_ZONE);

    if (resource != null) {
      resource.prepare(outfit);
    } else {
      outfit.setItemDrops();
    }

    outfit.addWeight("Stench Res", 100, null, 1);

    return {
      outfit: outfit,
      location: this.loc,
      run: () => {
        const settings = new AdventureSettings();

        if (resource != null) {
          settings.setStartOfFightMacro(
            resource.macro().trySkill(Skill.get("Infinite Loop")).attack()
          );
        }

        greyAdv(this.loc, outfit, settings);

        this.doSonars();
      },
    };
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  doSonars() {
    while (
      availableAmount(this.sonar) > 0 &&
      getQuestStatus("questL04Bat") < 3
    ) {
      use(this.sonar);
    }
  }
}
