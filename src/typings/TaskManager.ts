// The biggest failures are
// 1. Key sources, we want to get 3 key sources. Some key sources might return more than 1
// 2. Possible paths. Sometimes there's two questlines we can pick
// 3. Crypts, the boat technically means the boat should be in all four crypts or something
// 4. Giving negative adventures, if we provide -50 then we expect to save 50 advs.
// 5. Paths that have so many variables on what could be provided, but basically just initial pulls
// 6. Paths that are a one and done, but the quest can still be done
// 7. Quests that are optional, but entirely depend on the path being picked. We can either provide a dummy path, or something else

import { print, printHtml, toJson } from "kolmafia";
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

// Key sources, daily dungeon is really the best example here. We don't have issues with the path, but with informing the selection that it counts as two.

// Possible paths, an example would be frat outfit. We only need to pick one of them really. But we need to stick with it.

// Resuming a path, really need to have each possible path implemention calculate how many it currently needs. We can skip over completed quests though.

// So have questinfos with the same id as another, mean they are different ways to complete said quest.

class ResourceHolder {
  resourcesRemaining: Map<ResourceId, number> = new Map();

  constructor(assumeUnused: boolean) {
    for (const resource of getResources()) {
      this.resourcesRemaining.set(
        resource.id,
        getResourcesLeft(resource.id, assumeUnused)
      );
    }
  }

  wouldUse(path: PossiblePath): SomeResource[] {
    const resources: SomeResource[] = [];

    for (const [res, amount] of path.resourcesNeeded) {
      loop: while (amount > 0) {
        for (const resource of getResources()) {
          if (
            resource.type != res ||
            path.ignoreResources.includes(resource.id)
          ) {
            continue;
          }

          const uses = resource.resourcesUsed || 1;

          if (this.resourcesRemaining.get(resource.id) - uses < 0) {
            continue;
          }

          resources.push(resource);
          continue loop;
        }

        return null;
      }
    }

    return resources;
  }
}

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
        resource.id,
        getResourcesLeft(resource.id, assumeUnused)
      );
    }
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
    const used: Map<string, [string, number][]> = new Map();

    for (const [quest, resource] of this.resourcesUsed) {
      const key = resource.id;

      if (!used.has(key)) {
        used.set(key, []);
      }

      const id = quest.getId();

      let pair: [string, number] = used.get(key).find(([p]) => p == id);

      if (pair == null) {
        used.get(key).push((pair = [id, 0]));
      }

      pair[1] = pair[1] + 1;
    }

    let index1 = 0;

    used.forEach((details, k) => {
      index1++;
      printHtml(
        `<font color='blue'>${k} x ${details
          .map(([, amount]) => amount)
          .reduce((d1, d2) => d1 + d2, 0)}</font> => ${details
          .map(
            ([quest, amount], index) =>
              `<font color='${
                (index + index1) % 2 == 0 ? "gray" : ""
              }'>${quest} x ${amount}</font>`
          )
          .join(", ")}`
      );
    });

    print(
      "Using estimated value " +
        this.getTotalCost() +
        " of resources, save adventures " +
        JSON.stringify(this.getAdvs())
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
      resource.id,
      this.resourcesRemaining.get(resource.id) - (resource.resourcesUsed || 1)
    );
  }

  canUse(resource: SomeResource): boolean {
    return (
      this.resourcesRemaining.get(resource.id) >= (resource.resourcesUsed || 1)
    );
  }

  getTotalCost() {
    this.totalCost = this.thisPath
      .map((p) => (p[1] != null ? p[1].miscMeat : 0))
      .reduce((p, n) => n + p, 0);

    for (const resource of this.resourcesUsed) {
      this.totalCost += resource[1].worthInAftercore * resource[2];
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
    const allPaths: [QuestInfo, PossiblePath[]][] = [];
    const miscPaths: QuestInfo[] = [];
    const uncompleteable: QuestInfo[] = [];

    let total = 0;
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
            (r) => r.id == res && path.canUse(r.type) > 0
          );

          if (possibles.length <= 1) {
            continue;
          }

          print("Better check " + (q as QuestInfo).getId() + " for " + res);
        }
      }

      paths = paths.filter((p) => {
        const resources: Map<ResourceId, number> = new Map();

        for (const resourceId of ResourceIds) {
          resources.set(resourceId, getResourcesLeft(resourceId));
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

      if (total == 0) {
        total = paths.length;
      } else {
        total += paths.length;
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

      paths.sort((p1, p2) => p1.getCostPerAdv() - p2.getCostPerAdv());

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

    allPaths.sort(([, [p1]], [, [p2]]) => {
      const c1 =
        p1.getCostPerAdv() > GreySettings.greyValueOfAdventure
          ? 0
          : p1.getCostPerAdv();
      const c2 =
        p2.getCostPerAdv() > GreySettings.greyValueOfAdventure
          ? 0
          : p2.getCostPerAdv();

      return c1 - c2;
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

    /* const subQuestPaths: [QuestInfo, PossibleMultiPath][] =
      simmedPath.thisPath.filter(
        ([, path]) => path instanceof PossibleMultiPath
      ) as [QuestInfo, PossibleMultiPath][];

    simmedPath.thisPath = simmedPath.thisPath.filter(
      ([, path]) => !(path instanceof PossibleMultiPath)
    );

    for (const [, path] of subQuestPaths) {
      path.subpaths.forEach((sub) => {
        simmedPath.thisPath.push(sub);
      });
    }*/

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
        .map((r) => r[1].worthInAftercore * r[2])
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

    let tried = 0;
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

      if (tried >= 1) {
        return best;
      }
    }

    return best;

    return null;
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
          r.id,
          resourcesAvailable.get(r.id) - (r.resourcesUsed ?? 1)
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
      if (resource.type != resourceType || unsupported.includes(resource.id)) {
        continue;
      }

      if (used.get(resource.id) >= (resource.resourcesUsed || 1)) {
        return resource;
      }
    }

    return null;
  }
}
