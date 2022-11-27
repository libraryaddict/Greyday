import {
  availableAmount,
  cliExecute,
  equippedAmount,
  Familiar,
  getProperty,
  haveFamiliar,
  Item,
  itemAmount,
  Location,
  pullsRemaining,
  toBoolean,
} from "kolmafia";
import { ResourceCategory } from "../../../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../../../typings/TaskInfo";
import { AdventureSettings, greyAdv } from "../../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../../utils/GreyOutfitter";
import { GreyPulls } from "../../../../../utils/GreyResources";
import { GreySettings } from "../../../../../utils/GreySettings";
import { Macro } from "../../../../../utils/MacroBuilder";
import { PropertyManager } from "../../../../../utils/Properties";
import {
  getQuestStatus,
  QuestAdventure,
  QuestStatus,
} from "../../../../Quests";
import { QuestType } from "../../../../QuestTypes";
import { HeroKeysTemplate } from "./HeroKeysTemplate";

export class QuestDailyDungeon extends TaskInfo implements HeroKeysTemplate {
  pole: Item = Item.get("eleven-foot pole");
  ring: Item = Item.get("ring of Detect Boring Doors");
  picklocks: Item = Item.get("Pick-O-Matic lockpicks");
  location: Location = Location.get("The Daily Dungeon");
  fam: Familiar = Familiar.get("Gelatinous Cubeling");
  malware: Item = Item.get("Daily dungeon malware");
  paths: PossiblePath[];
  usingMalware: boolean;

  constructor(useMalware: boolean) {
    super();

    this.usingMalware = useMalware;
  }

  getKeys(): number {
    return this.usingMalware && !this.isMalwareUsed() ? 2 : 1;
  }

  getLocations(): Location[] {
    return [this.location];
  }

  isDailyDoneToday() {
    return getProperty("dailyDungeonDone") == "true";
  }

  createPaths(assumeUnstarted: boolean): void {
    if (
      !assumeUnstarted &&
      GreySettings.shouldAvoidTowerRequirements() &&
      !GreySettings.greyReachedTower
    ) {
      this.paths = null;
      return;
    }

    const mustDoMalware = GreySettings.greyDailyMalware == "Always";
    const mustNeverDoMalware = GreySettings.greyDailyMalware == "Never";

    if (
      mustDoMalware &&
      (GreySettings.isHardcoreMode() || !this.usingMalware)
    ) {
      this.paths = null;
      return;
    } else if (mustNeverDoMalware && this.usingMalware) {
      this.paths = null;
      return;
    }

    this.paths = [];

    const usedMalware = toBoolean(getProperty("_dailyDungeonMalwareUsed"));

    const malwarePath = new PossiblePath(4);

    this.paths.push(malwarePath);

    if (!assumeUnstarted && usedMalware) {
      return;
    }

    malwarePath.addConsumablePull(this.malware);
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  hasFamiliarRecommendation(): Familiar {
    if (
      GreySettings.shouldAvoidTowerRequirements() ||
      !haveFamiliar(this.fam)
    ) {
      return null;
    }

    if (
      availableAmount(this.pole) > 0 &&
      availableAmount(this.ring) > 0 &&
      availableAmount(this.picklocks) > 0
    ) {
      return null;
    }

    return this.fam;
  }

  level(): number {
    return 7;
  }

  status(): QuestStatus {
    if (getQuestStatus("questL13Final") > 5 || this.isDailyDoneToday()) {
      return QuestStatus.COMPLETED;
    }

    if (this.usingMalware) {
      if (
        GreySettings.isHardcoreMode() ||
        GreySettings.greyDailyMalware == "Never"
      ) {
        return QuestStatus.COMPLETED;
      } else if (GreySettings.shouldAvoidTowerRequirements()) {
        if (GreySettings.greyReachedTower) {
          return QuestStatus.READY;
        }

        return QuestStatus.NOT_READY;
      }
    }

    if (this.hasFamiliarRecommendation() != null && pullsRemaining() >= 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  isMalwareUsed(): boolean {
    return getProperty("_dailyDungeonMalwareUsed") == "true";
  }

  grabMalware(path: PossiblePath) {
    if (
      itemAmount(this.malware) != 0 ||
      this.isMalwareUsed() ||
      !path.canUse(ResourceCategory.PULL)
    ) {
      return;
    }

    if (pullsRemaining() == -1) {
      cliExecute("acquire " + this.malware);
    } else {
      GreyPulls.tryPull(this.malware, 80000);
      path.addUsed(ResourceCategory.PULL);
    }

    if (itemAmount(this.malware) == 0) {
      throw (
        "Expected to have " +
        this.malware +
        " on hand, something went wrong obviously."
      );
    }
  }

  run(path: PossiblePath): QuestAdventure {
    const outfit = new GreyOutfit();
    outfit.addWeight(this.ring);

    return {
      outfit: outfit,
      location: this.location,
      freeRun: () => itemAmount(this.malware) == 0 || this.isMalwareUsed(),
      run: () => {
        const dontHave: Item[] = [this.ring, this.picklocks, this.pole].filter(
          (i) => itemAmount(i) + equippedAmount(i) == 0
        );

        if (pullsRemaining() == -1 && dontHave.length > 0) {
          dontHave.forEach((i) => {
            GreyPulls.tryPull(i, 5000);
            path.addUsed(ResourceCategory.PULL);

            if (itemAmount(i) == 0) {
              throw "Expected to have " + i;
            }
          });
          return;
        } /*else if (dontHave.length > 0) {
          print("Uh oh! Missing " + dontHave.join(", ") + "!", "red");
          throw "Expected to have dungeon items, didn't.";
        }*/

        const props = new PropertyManager();
        const settings = new AdventureSettings();

        if (this.usingMalware) {
          this.grabMalware(path);

          if (itemAmount(this.malware) > 0 && !this.isMalwareUsed()) {
            settings.setStartOfFightMacro(Macro.item(this.malware));
          }
        }

        props.setChoice(689, 1);
        props.setChoice(690, 2);
        props.setChoice(691, 2);
        props.setChoice(692, 3);
        props.setChoice(693, 2);

        try {
          greyAdv(this.location, outfit, settings);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getId(): QuestType {
    if (this.usingMalware) {
      return "Council / Tower / Keys / Heroes / DailyDungeon + Malware";
    }

    return "Council / Tower / Keys / Heroes / DailyDungeon";
  }
}
