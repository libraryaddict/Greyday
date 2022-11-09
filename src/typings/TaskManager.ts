// The biggest failures are
// 1. Key sources, we want to get 3 key sources. Some key sources might return more than 1
// 2. Possible paths. Sometimes there's two questlines we can pick
// 3. Crypts, the boat technically means the boat should be in all four crypts or something
// 4. Giving negative adventures, if we provide -50 then we expect to save 50 advs.
// 5. Paths that have so many variables on what could be provided, but basically just initial pulls
// 6. Paths that are a one and done, but the quest can still be done
// 7. Quests that are optional, but entirely depend on the path being picked. We can either provide a dummy path, or something else

import { print, printHtml } from "kolmafia";
import { QuestInfo, QuestStatus } from "../quests/Quests";
import { GreySettings } from "../utils/GreySettings";
import {
  getResources,
  getResourcesLeft,
  ResourceCategory,
  ResourceId,
  ResourceIds,
  SomeResource,
} from "./ResourceTypes";
import { PossibleMultiPath, PossiblePath, TaskInfo } from "./TaskInfo";

export class SimmedPath {
  resourcesRemaining: Map<ResourceId, number> = new Map();
  resourcesUsed: [QuestInfo, SomeResource, number][] = [];
  thisPath: [QuestInfo, PossiblePath][] = [];
  totalCost: number;
  advsSaved: [number, number];
  profitLost: [number, number];

  constructor(assumeUnused: boolean, skip: boolean = false) {
    if (skip) {
      return;
    }

    for (const resource of getResources()) {
      this.resourcesRemaining.set(
        resource.resource,
        getResourcesLeft(resource.resource, assumeUnused)
      );
    }
  }

  isRecalculateNeeded(): boolean {
    const unused = this.thisPath.find(
      ([quest, path]) =>
        path != null &&
        path.resourcesAvailable.length > 0 &&
        quest.status(path) == QuestStatus.COMPLETED
    );

    if (unused == null) {
      return false;
    }

    const resources: [string, string, number][] = [];

    unused[1].resourcesAvailable.forEach((r) => {
      let res = resources.find(
        ([r1, r2]) => r1 == r.name && r2 == ResourceCategory[r.type]
      );

      if (res == null) {
        res = [r.name, ResourceCategory[r.type], 0];
        resources.push(res);
      }

      res[2] += 1;
    });

    print(
      unused[0].getId() +
        " reports that it has resources left over despite being finished. This is not an error. Resources: " +
        resources.map(
          (name, type, uses) => name + " x " + type + " (Uses " + uses + ")"
        ),
      "red"
    );

    print(
      "Used resources: " +
        unused[1].resourceUsed.map((r) => ResourceCategory[r]).join(", ")
    );

    return true;
  }

  isThisBetterThan(compareAgainst: SimmedPath, eachTurnWorth: number): boolean {
    const oldProfit = compareAgainst.getProfitLost(eachTurnWorth);
    const newProfit = this.getProfitLost(eachTurnWorth);

    if (oldProfit[0] + oldProfit[1] < newProfit[0] + newProfit[1]) {
      return false;
    }

    return true;
  }

  printInfo() {
    interface UsedEntry {
      level: number;
      questName: string;
      resourcesUsed: number;
      turnsSaved: number;
      path: PossiblePath;
    }
    const used: Map<string, UsedEntry[]> = new Map();

    for (const [quest, resource] of this.resourcesUsed) {
      const key = resource.name;

      if (!used.has(key)) {
        used.set(key, []);
      }

      const id = quest.getId();

      let pair: UsedEntry = used.get(key).find((p) => p.questName == id);

      if (pair == null) {
        const path = this.thisPath.find(
          ([questInfo, possiblePath]) => questInfo.getId() === id
        )[1];

        used.get(key).push(
          (pair = {
            level: quest.level(),
            questName: id,
            resourcesUsed: 0,
            turnsSaved: path.getAverageTurns(),
            path: path,
          })
        );
      }

      pair.resourcesUsed++;
    }

    let index1 = 0;
    const lines: string[] = [];

    used.forEach((details, resourceName) => {
      index1++;

      const resourcesUsed = details
        .map((d) => d.resourcesUsed)
        .reduce((p, n) => p + n, 0);

      details.sort((d1, d2) => {
        if (d1.level != d2.level) {
          return d1.level - d2.level;
        }

        return d1.questName.localeCompare(d2.questName);
      });

      const paths = details
        .map(
          (d, index) =>
            `<font color='${(index + index1) % 2 == 0 ? "gray" : ""}'>${
              d.questName
            } x ${d.resourcesUsed} (${d.turnsSaved} advs)${
              resourceName == "Pull" && d.path.pulls.length > 0
                ? ` <font color='purple'>(${d.path.pulls.join(", ")})</font>`
                : ""
            }</font>`
        )
        .join(", ");

      lines.push(
        `<font color='blue'>${resourceName} x ${resourcesUsed}</font> => ${paths}`
      );
    });

    lines.sort((l1, l2) => l1.localeCompare(l2));

    lines.forEach((l) => printHtml(l, true));

    const advs = this.getAdvs();

    print(
      "With mpa of " +
        GreySettings.greyValueOfAdventure +
        " and using estimated " +
        Math.floor(this.getTotalCost()) +
        " meat of resources, save " +
        advs[0] +
        " to " +
        advs[1] +
        " adventures compared to the worst alternatives"
    );
  }

  setPath(paths: [QuestInfo, PossiblePath][]) {
    this.thisPath = paths;
  }

  assignResources() {
    for (const [quest, resource] of this.resourcesUsed) {
      const [, path] = this.thisPath.find(([q]) => q === quest);

      path.resourcesAvailable.push(resource);
    }
  }

  getAdvs(): [number, number] {
    if (this.advsSaved == null) {
      this.advsSaved = [0, 0];

      for (const [, path] of this.thisPath) {
        if (path == null) {
          continue;
        }

        this.advsSaved[0] += path.advsSavedMin;
        this.advsSaved[1] += path.advsSavedMax;
      }
    }

    return this.advsSaved;
  }

  clone(): SimmedPath {
    const newPath = new SimmedPath(false, true);
    newPath.resourcesRemaining = new Map(this.resourcesRemaining);
    newPath.resourcesUsed = [...this.resourcesUsed];
    newPath.thisPath = [...this.thisPath];

    return newPath;
  }

  addUse(quest: QuestInfo, resource: SomeResource, chance: number) {
    this.resourcesUsed.push([quest, resource, chance]);
    this.resourcesRemaining.set(
      resource.resource,
      this.resourcesRemaining.get(resource.resource) -
        (resource.resourcesUsed || 1)
    );
  }

  canUse(resource: SomeResource): boolean {
    return (
      this.resourcesRemaining.get(resource.resource) >=
      (resource.resourcesUsed || 1)
    );
  }

  getTotalCost() {
    this.totalCost = this.thisPath
      .map((p) => (p[1] != null ? p[1].miscMeat : 0))
      .reduce((p, n) => p + n, 0);

    for (const resource of this.resourcesUsed) {
      this.totalCost += resource[1].worthInAftercore * 1; //resource[2];

      if (resource[1].freeTurn == true) {
        this.totalCost -= GreySettings.greyValueOfAdventure;
      }
    }

    return this.totalCost;
  }

  /**
   * Returns how much profit was lost following this path
   */
  getProfitLost(advsWorth: number): [number, number] {
    if (this.profitLost == null) {
      // Costs are a negative
      const meatGain = this.getTotalCost();

      this.profitLost = [
        meatGain - this.getAdvs()[0] * advsWorth,
        meatGain - this.getAdvs()[1] * advsWorth,
      ];
    }

    return this.profitLost;
  }
}

export class FigureOutPath {
  resources: SomeResource[] = getResources();

  getPaths(quests: QuestInfo[], assumeUnstarted: boolean = false): SimmedPath {
    print(
      "Now calculating resources.. " +
        (GreySettings.greyBreakAtTower
          ? ""
          : "As you're not breaking at tower, this might take a while..")
    );
    const allPaths: [QuestInfo, PossiblePath[]][] = [];
    const miscPaths: QuestInfo[] = [];
    const uncompleteable: QuestInfo[] = [];

    // What we need to do is sort the paths by the most profitable. Ideally we want to eliminate the ones that are just not feasible asap.
    // If it wants 2 faxes but we only want 1, then we can immediately eliminate the least profitable.
    for (const quest of quests) {
      const q = quest as TaskInfo;

      if (q.getPossiblePaths == null) {
        miscPaths.push(quest);
        continue;
      }

      if (q.createPaths != null) {
        q.createPaths(assumeUnstarted);
      }

      let paths = q.getPossiblePaths();

      if (paths == null) {
        //miscPaths.push(quest);
        continue;
      }

      if (paths.length == 0) {
        print(
          "We should never have empty paths, assume this is a bug. If we want to avoid doing the quest, return null and status() instead.",
          "red"
        );
      }

      if (
        paths.find(
          (p) => p.resourcesAvailable.length + p.resourceUsed.length > 0
        ) != null
      ) {
        throw "Resources not cleared for " + quest.getId();
      }

      if (
        quest.level() >= 1 &&
        !assumeUnstarted &&
        quest.status() == QuestStatus.COMPLETED
      ) {
        continue;
      }

      for (const path of paths) {
        for (const res of ResourceIds) {
          if (path.ignoreResources.includes(res)) {
            continue;
          }

          const possibles = getResources().filter(
            (r) => r.resource == res && path.canUse(r.type) > 0
          );

          if (possibles.length <= 1) {
            continue;
          }

          //print("Better check " + quest.getId() + " for " + res);
        }
      }

      paths = paths.filter((p) => {
        const resources: Map<ResourceId, number> = new Map();

        for (const resourceId of ResourceIds) {
          resources.set(
            resourceId,
            getResourcesLeft(resourceId, assumeUnstarted)
          );
        }

        const resourcesToComplete = this.getResourcesToComplete(
          resources,
          quest,
          p
        );

        if (resourcesToComplete == null) {
          return false;
        }

        p.setRoughPathCost(resourcesToComplete);

        return true;
      });

      if (paths.length == 0) {
        uncompleteable.push(quest);
        continue;
      }

      // Now we figure out how many advs each path would save compared to the other
      const mostAdvsCouldveUsed = paths
        .map((p) => [p.advsSavedMin, p.advsSavedMax])
        .reduce((p, n) => [Math.max(p[0], n[0]), Math.max(p[1], n[1])]);

      paths.forEach((p) => {
        // If this path would take 2 to 5 adventures
        // And the most adventures are 1 to 30
        // That means we would profit -1 to 25
        p.advsSavedMin = mostAdvsCouldveUsed[0] - p.advsSavedMin;
        p.advsSavedMax = mostAdvsCouldveUsed[1] - p.advsSavedMax;
      });

      // We want the cheapest paths to go first
      paths.sort((p1, p2) => {
        const cost1 = p1.getCostOfPath();
        const cost2 = p2.getCostOfPath();

        if (cost1 == cost2) {
          return 0;
        }

        return cost1 - cost2;
      });

      const cheapestNoResource: PossiblePath = paths.find(
        (p) => p.resourcesNeeded.length == 0
      );

      if (cheapestNoResource != null) {
        const meatSavedOnPath =
          cheapestNoResource.pathCost -
          ((cheapestNoResource.advsSavedMin + cheapestNoResource.advsSavedMax) /
            2) *
            GreySettings.greyValueOfAdventure;
      }

      allPaths.push([quest, paths]);
    }

    if (uncompleteable.length > 0) {
      for (const q of uncompleteable) {
        print(
          "Unable to plot a path! Not enough resources to complete `" +
            q.getId() +
            "`",
          "red"
        );
        const combos = (q as TaskInfo)
          .getPossiblePaths()
          .map((p) =>
            p.resourcesNeeded.map(
              ([r, amount]) => ResourceCategory[r] + " x " + amount
            )
          );

        print(`Combinations of resources needed are: ${combos.join(" OR ")}`);
      }

      return null;
    }

    // We want the most expensive paths to go first, the cheapest paths are always the first in each path
    allPaths.sort(([, paths1], [, paths2]) => {
      if (
        paths1.length != paths2.length &&
        Math.min(paths1.length, paths2.length) == 1
      ) {
        return paths1.length - paths2.length;
      }

      const cost1 = paths1[0].getCostOfPath();
      const cost2 = paths2[0].getCostOfPath();

      if (cost1 == cost2) {
        return 0;
      }

      return cost1 - cost2;
    });

    const simmedPath = this.doAttempt(
      new SimmedPath(assumeUnstarted),
      0,
      allPaths
    );

    if (simmedPath == null) {
      return null;
    }

    simmedPath.assignResources();

    miscPaths.forEach((q) => {
      simmedPath.thisPath.push([q, null]);
    });

    return simmedPath;
  }

  doAttempt(
    currentPath: SimmedPath,
    index: number,
    allPaths: [QuestInfo, PossiblePath[]][]
  ): SimmedPath {
    const [quest, paths] = allPaths[index++];

    const possible: [
      PossiblePath,
      [QuestInfo, SomeResource, number][],
      number
    ][] = [];

    for (const path of paths) {
      const resources: [QuestInfo, SomeResource, number][] =
        this.getResourcesToComplete(
          currentPath.resourcesRemaining,
          quest,
          path
        );

      if (resources == null) {
        continue;
      }

      const resourceCost = resources
        .map(
          (r) =>
            r[1].worthInAftercore * r[2] -
            (r[1].freeTurn == true ? GreySettings.greyValueOfAdventure : 0)
        )
        .reduce((p, n) => p + n, 0);
      const extraAdvsWorth =
        GreySettings.greyValueOfAdventure *
        ((path.advsSavedMax - path.advsSavedMin) / 2 + path.advsSavedMin);

      possible.push([
        path,
        resources,
        path.miscMeat + resourceCost - extraAdvsWorth,
      ]);
    }

    possible.sort(([, , meat1], [, , meat2]) => meat1 - meat2);

    let best: SimmedPath;
    const addPath = (
      simmed: SimmedPath,
      quest: QuestInfo,
      path: PossiblePath
    ) => {
      if (path instanceof PossibleMultiPath) {
        for (const [quest, p] of (path as PossibleMultiPath).subpaths) {
          addPath(simmed, quest, p);
        }
      } else {
        simmed.thisPath.push([quest, path]);
      }
    };

    let tried = 0;

    for (const [path, resources] of possible) {
      let simmed = currentPath.clone();

      addPath(simmed, quest, path);

      resources.forEach(([quest, resource, amount]) => {
        simmed.addUse(quest, resource, amount);
      });

      tried++;

      if (index < allPaths.length) {
        simmed = this.doAttempt(simmed, index, allPaths);

        if (simmed == null) {
          continue;
        }
      }

      if (
        best == null ||
        simmed.isThisBetterThan(best, GreySettings.greyValueOfAdventure)
      ) {
        best = simmed;
      }

      if (tried >= (path.pathCost <= 5000 ? 1 : 2)) {
        return best;
      }
    }

    return best;
  }

  /**
   * @returns [QuestInfo, Resource, Chance of use][]
   */
  getResourcesToComplete(
    resourcesAvailable: Map<ResourceId, number>,
    quest: QuestInfo,
    path: PossiblePath
  ): [QuestInfo, SomeResource, number][] {
    return this.doResourcesToComplete(
      quest,
      path,
      new Map(resourcesAvailable),
      []
    );
  }

  doResourcesToComplete(
    quest: QuestInfo,
    path: PossiblePath,
    resourcesAvailable: Map<ResourceId, number>,
    resources: [QuestInfo, SomeResource, number][]
  ): [QuestInfo, SomeResource, number][] {
    if (path instanceof PossibleMultiPath) {
      for (const [q, p] of (path as PossibleMultiPath).subpaths) {
        const result = this.doResourcesToComplete(
          q,
          p,
          resourcesAvailable,
          resources
        );

        if (result == null) {
          return null;
        }
      }
    } else {
      const skip: Map<ResourceCategory, number> = new Map();
      for (const [res, chance] of path.resourcesNeeded) {
        if (!skip.has(res)) {
          skip.set(res, path.getUsed(res));
        }

        if (skip.get(res) > 0) {
          skip.set(res, skip.get(res) - 1);
          continue;
        }

        const r = this.getResource(
          resourcesAvailable,
          res,
          path.ignoreResources
        );

        if (r == null) {
          return null;
        }

        resources.push([quest, r, chance]);
        resourcesAvailable.set(
          r.resource,
          resourcesAvailable.get(r.resource) - (r.resourcesUsed ?? 1)
        );
      }
    }

    return resources;
  }

  getResource(
    used: Map<ResourceId, number>,
    resourceType: ResourceCategory,
    unsupported: ResourceId[]
  ): SomeResource {
    for (const resource of this.resources) {
      if (
        resource.type != resourceType ||
        unsupported.includes(resource.resource)
      ) {
        continue;
      }

      if (used.get(resource.resource) >= (resource.resourcesUsed || 1)) {
        return resource;
      }
    }

    return null;
  }
}
