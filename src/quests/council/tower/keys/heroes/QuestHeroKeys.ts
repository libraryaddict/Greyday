import {
  Location,
  Item,
  availableAmount,
  print,
  getProperty,
  itemAmount,
  pullsRemaining,
  storageAmount,
} from "kolmafia";
import {
  getResourcesLeft,
  ResourceCategory,
} from "../../../../../typings/ResourceTypes";
import {
  PossibleMultiPath,
  PossiblePath,
  TaskInfo,
} from "../../../../../typings/TaskInfo";
import { GreySettings } from "../../../../../utils/GreySettings";
import { getAllCombinations } from "../../../../../utils/GreyUtils";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../../Quests";
import { QuestType } from "../../../../QuestTypes";
import { HeroKeysTemplate } from "./HeroKeysTemplate";
import { QuestDailyDungeon } from "./QuestDailyDungeon";
import { QuestFantasyBandit } from "./QuestFantasyBandits";
import { QuestPackOfCardsKey } from "./QuestPackOfCardsKey";
import { QuestPullAndZapKeys } from "./QuestPullAndZapKeys";

export class QuestHeroKeys extends TaskInfo implements QuestInfo {
  keys: Item[] = ["Boris's key", "Sneaky Pete's key", "Jarlsberg's key"].map(
    (s) => Item.get(s)
  );
  token: Item = Item.get("Fat loot token");
  quests: HeroKeysTemplate[] = [];
  paths: PossibleMultiPath[];
  conflicts: QuestType[][] = [
    [
      "Council / Tower / Keys / Heroes / DailyDungeon",
      "Council / Tower / Keys / Heroes / DailyDungeon + Malware",
    ],
    ["Council / Tower / Keys / Heroes / Buy and Zap Keys"],
  ];

  constructor() {
    super();

    this.quests.push(new QuestDailyDungeon(true));
    this.quests.push(new QuestDailyDungeon(false));
    this.quests.push(new QuestFantasyBandit());
    this.quests.push(new QuestPackOfCardsKey());

    for (let i = 1; i <= 2; i++) {
      this.quests.push(new QuestPullAndZapKeys(i));
    }
  }

  getTokensAvailable(): number {
    return (
      itemAmount(this.token) +
      (pullsRemaining() == -1 ? storageAmount(this.token) : 0)
    );
  }

  getMissingKeys(): number {
    return Math.max(
      0,
      3 -
        (this.getTokensAvailable() +
          this.keys.filter((i) => availableAmount(i) > 0).length)
    );
  }

  createPaths(assumeUnstarted: boolean) {
    // If we're avoiding the tower requirements, and haven't reached tower yet.
    // Don't use our resources on key stuff
    if (
      !assumeUnstarted &&
      ((GreySettings.shouldAvoidTowerRequirements() &&
        !GreySettings.greyReachedTower) ||
        getQuestStatus("questL13Final") > 5)
    ) {
      this.paths = null;
      return;
    }

    let allPaths: [HeroKeysTemplate, PossiblePath][] = [];

    for (const quest of this.quests) {
      if (!(quest instanceof TaskInfo)) {
        print("Unknown key path " + quest.getId(), "red");
        continue;
      }

      (quest as TaskInfo).createPaths(assumeUnstarted);

      let paths = (quest as TaskInfo).getPossiblePaths();

      // This shouldn't be done at this point
      if (paths == null) {
        //   print("Can't do " + quest.getId());
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
        allPaths.push([quest, path]);
      });
    }

    if (getResourcesLeft("Pull", assumeUnstarted) <= 0) {
      allPaths = allPaths.filter(
        ([, p]) => p.canUse(ResourceCategory.PULL) == 0
      );
    }

    const keysNeeded: number = assumeUnstarted ? 3 : this.getMissingKeys();
    const shouldDoDaily =
      GreySettings.greyDailyDungeon &&
      (assumeUnstarted || getProperty("dailyDungeonDone") != "true");

    if (keysNeeded <= 0 && !shouldDoDaily) {
      return;
    }

    this.paths = [];

    loop: for (const combination of getAllCombinations(allPaths)) {
      // Detect conflicts
      for (const conflicts of this.conflicts) {
        const hits = conflicts.filter((c) =>
          combination.find(([c1]) => c1.getId() == c)
        ).length;

        if (hits > 1) {
          continue loop;
        }
      }

      const hittingMalware =
        combination.find(
          ([q]) =>
            q.getId() ==
            "Council / Tower / Keys / Heroes / DailyDungeon + Malware"
        ) != null;

      const keysGiven = combination
        .map(([c]) => c.getKeys())
        .reduce((r1, r2) => r1 + r2);

      // If we won't get enough keys
      if (keysGiven < keysNeeded) {
        continue;
      }

      let maxKeys = keysNeeded;

      if (hittingMalware) {
        maxKeys++;
      }

      // If we're getting too many keys
      if (keysGiven > maxKeys) {
        continue;
      }

      // If we need to do daily dungeon as per settings, and this combination doesn't let us do that..
      if (
        shouldDoDaily &&
        combination.find(([q]) => q instanceof QuestDailyDungeon) == null
      ) {
        continue;
      }

      const path = new PossibleMultiPath(0);
      path.printUsing = true;

      combination.forEach((c) => {
        path.addPath(c[0], c[1]);
      });

      this.paths.push(path);
    }

    if (this.paths.length == 0) {
      print(
        "Failed to find a way to do the hero keys! Looking for " + keysNeeded,
        "red"
      );

      print("Hero Key Sources..", "red");

      for (const quest of this.quests) {
        print(
          quest.getId() +
            " - Gives " +
            quest.getKeys() +
            " keys. Doable? " +
            (quest.status() != QuestStatus.COMPLETED) +
            ". Possible path count: " +
            (quest as TaskInfo).getPossiblePaths().length,
          "red"
        );
      }
    }
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
