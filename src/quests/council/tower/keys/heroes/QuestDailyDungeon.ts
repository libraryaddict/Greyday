import {
  availableAmount,
  cliExecute,
  equippedAmount,
  Familiar,
  getProperty,
  haveFamiliar,
  historicalAge,
  historicalPrice,
  Item,
  itemAmount,
  Location,
  mallPrice,
  pullsRemaining,
  toBoolean,
} from "kolmafia";
import {
  ResourceCategory,
} from "../../../../../typings/ResourceTypes";
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
  QuestInfo,
  QuestStatus,
} from "../../../../Quests";
import { QuestType } from "../../../../QuestTypes";

export class QuestDailyDungeon extends TaskInfo implements QuestInfo {
  pole: Item = Item.get("eleven-foot pole");
  ring: Item = Item.get("ring of Detect Boring Doors");
  picklocks: Item = Item.get("Pick-O-Matic lockpicks");
  location: Location = Location.get("The Daily Dungeon");
  fam: Familiar = Familiar.get("Gelatinous Cubeling");
  malware: Item = Item.get("Daily dungeon malware");
  paths: PossiblePath[];

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

    if (mustDoMalware && GreySettings.isHardcoreMode()) {
      this.paths = null;
      return;
    }

    this.paths = [];

    // We don't need to do malware
    if (!mustDoMalware) {
      this.paths.push(
        new PossiblePath(4).addMeat(historicalPrice(this.malware) * 1.2)
      );
    }

    if (mustNeverDoMalware) {
      return;
    }

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

  doMalware(): boolean {
    if (GreySettings.isHardcoreMode()) {
      return false;
    }

    if (
      GreySettings.greyDailyMalware != null &&
      GreySettings.greyDailyMalware != "Best Judgement"
    ) {
      return GreySettings.greyDailyMalware == "Always";
    }

    const key = GreyPulls.getPullableKeys()[0];
    const itemPrice =
      historicalAge(key) > 2 ? mallPrice(key) : historicalPrice(key);
    const malwarePrice =
      historicalAge(this.malware) > 2
        ? mallPrice(this.malware)
        : historicalPrice(this.malware);

    return itemPrice * 1.5 > malwarePrice && malwarePrice < 60000;
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

    if (
      GreySettings.shouldAvoidTowerRequirements() &&
      !GreySettings.greyReachedTower
    ) {
      if (GreySettings.greyDailyMalware != "Never") {
        if (GreySettings.greyReachedTower) {
          return QuestStatus.READY;
        }

        return QuestStatus.NOT_READY;
      }

      return QuestStatus.COMPLETED;
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

        if (pullsRemaining() == -1) {
          dontHave.forEach((i) => {
            GreyPulls.tryPull(i, 5000);
            path.addUsed(ResourceCategory.PULL);
          });
        } /*else if (dontHave.length > 0) {
          print("Uh oh! Missing " + dontHave.join(", ") + "!", "red");
          throw "Expected to have dungeon items, didn't.";
        }*/

        this.grabMalware(path);

        const props = new PropertyManager();
        const settings = new AdventureSettings();

        if (itemAmount(this.malware) > 0 && !this.isMalwareUsed()) {
          settings.setStartOfFightMacro(Macro.item(this.malware));
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
    return "Council / Tower / Keys / Heroes / DailyDungeon";
  }
}
