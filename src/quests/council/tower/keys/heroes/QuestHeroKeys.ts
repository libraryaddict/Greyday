import { Location, Item, availableAmount, print, getProperty } from "kolmafia";
import {
  PossibleMultiPath,
  PossiblePath,
  TaskInfo,
} from "../../../../../typings/TaskInfo";
import { GreySettings } from "../../../../../utils/GreySettings";
import { getAllCombinations } from "../../../../../utils/GreyUtils";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../../../Quests";
import { QuestType } from "../../../../QuestTypes";
import { QuestDailyDungeon } from "./QuestDailyDungeon";
import { QuestFantasyBandit } from "./QuestFantasyBandits";
import { QuestPackOfCardsKey } from "./QuestPackOfCardsKey";
import { QuestPullAndZapKeys } from "./QuestPullAndZapKeys";
import { QuestZapKeys } from "./QuestZapKeys";

export class PossibleKeyPath extends PossiblePath {
  keys?: number;
}

export class QuestHeroKeys extends TaskInfo implements QuestInfo {
  keys: Item[] = ["Boris's key", "Sneaky Pete's key", "Jarlsberg's key"].map(
    (s) => Item.get(s)
  );
  token: Item = Item.get("Fat loot token");
  quests: QuestInfo[] = [];
  paths: PossibleMultiPath[];

  constructor() {
    super();

    this.quests.push(new QuestDailyDungeon());
    this.quests.push(new QuestFantasyBandit());
    this.quests.push(new QuestPackOfCardsKey());
    this.quests.push(new QuestPullAndZapKeys());
  }

  getMissingKeys(): number {
    return (
      3 -
      (availableAmount(this.token) +
        this.keys.filter((i) => availableAmount(i) > 0).length)
    );
  }

  createPaths(assumeUnstarted: boolean) {
    // If we're avoiding the tower requirements, and haven't reached tower yet.
    // Don't use our resources on key stuff
    if (
      !assumeUnstarted &&
      GreySettings.shouldAvoidTowerRequirements() &&
      !GreySettings.greyReachedTower
    ) {
      this.paths = null;
      return;
    }

    const allPaths: [QuestInfo, PossibleKeyPath][] = [];

    for (const quest of this.quests) {
      if (!(quest instanceof TaskInfo)) {
        print("Unknown key path " + quest.getId(), "red");
        continue;
      }

      (quest as TaskInfo).createPaths(assumeUnstarted);

      let paths = (quest as TaskInfo).getPossiblePaths();

      // This shouldn't be done at this point
      if (paths == null) {
        print("Can't do " + quest.getId());
        continue;
      }

      if (paths.length == 0) {
        print("Empty paths found for key path, " + quest.getId(), "red");
        continue;
      }

      paths = paths.filter(
        (p) =>
          assumeUnstarted ||
          (quest as QuestInfo).status(p) != QuestStatus.COMPLETED
      );

      if (paths.length == 0) {
        continue;
      }

      (quest as TaskInfo).getPossiblePaths().forEach((path) => {
        allPaths.push([quest, path as PossibleKeyPath]);
      });
    }

    const keysNeeded: number = assumeUnstarted ? 3 : this.getMissingKeys();
    const shouldDoDaily =
      GreySettings.greyDailyDungeon &&
      (assumeUnstarted || getProperty("dailyDungeonDone") != "true") &&
      (GreySettings.greyDailyMalware != "true" ||
        assumeUnstarted ||
        !GreySettings.isHardcoreMode());

    if (keysNeeded <= 0 && !shouldDoDaily) {
      return;
    }

    this.paths = [];

    for (const combination of getAllCombinations(allPaths)) {
      // If we're asking for too many key sources
      if (combination.length > keysNeeded) {
        continue;
      }

      // If we're asking to run a quest multiple times
      if (
        combination.find(
          ([c]) =>
            combination.filter(([cc]) => cc.getId() === c.getId()).length > 1
        )
      ) {
        continue;
      }

      const hittingMalware =
        combination.find(
          ([q, path]) =>
            q.getId() == "Council / Tower / Keys / Heroes / DailyDungeon" &&
            (path.keys ?? 1) > 1
        ) != null;

      const keysGiven =
        combination.length +
        combination
          .map(([, path]) => path.keys ?? 1)
          .reduce((p, n) => p + n, 0);

      // If we're not going to get enough keys
      if (keysGiven < keysNeeded) {
        continue;
      }

      // Here we know we're definitely going to get enough keys. But what about malware?

      // True means the user always wants to use malware
      // False means the user never wants to use malware
      // Null means we don't care. Which means do an equal check

      // If we're going to hit malware, and it'd give us too many keys, and the user doesn't care..
      if (
        hittingMalware &&
        keysGiven - 1 == keysNeeded &&
        GreySettings.greyDailyMalware == null
      ) {
        continue;
      }

      // If we need to do daily dungeon as per settings, and this combination doesn't let us do that..
      if (
        shouldDoDaily &&
        combination.find(
          ([q]) => q.getId() == "Council / Tower / Keys / Heroes / DailyDungeon"
        ) == null
      ) {
        continue;
      }

      const path = new PossibleMultiPath(0);

      combination.forEach((c) => {
        path.addPath(c[0], c[1]);
      });

      this.paths.push(path);
    }
  }

  getChildren(): QuestInfo[] {
    return [new QuestZapKeys()];
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  level(): number {
    return -1;
  }

  status(path?: PossiblePath): QuestStatus {
    throw new Error("Method not implemented.");
  }

  run(path?: PossiblePath): QuestAdventure {
    throw new Error("Method not implemented.");
  }

  getLocations(): Location[] {
    return [];
  }

  getId(): QuestType {
    return "Council / Tower / Keys / Heroes";
  }
}
