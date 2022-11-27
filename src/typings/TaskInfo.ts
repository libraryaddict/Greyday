import {
  canFaxbot,
  Effect,
  getLocketMonsters,
  getProperty,
  haveEffect,
  historicalPrice,
  Item,
  Monster,
  print,
  toInt,
  toMonster,
} from "kolmafia";
import { QuestInfo } from "../quests/Quests";
import { QuestType } from "../quests/QuestTypes";
import { GreySettings } from "../utils/GreySettings";
import {
  getResourcesLeft,
  ResourceCategory,
  ResourceId,
  ResourceIds,
  SomeResource,
} from "./ResourceTypes";

export abstract class TaskInfo {
  /**
   * This should be set for every quest that requires another task to be complete. Just so we can later calculate the tasks to complete
   */
  getRelation?(quest: QuestType): TaskRelation;

  /**
   * Returns a list of possible paths, the paths will all end at the same goal; But will use different resources.
   * The paths should differ in how effective they are.
   *
   * This is not used for determining the path order as such, but how to distribute resources.
   *
   * If you want to determine path order, you're looking at QuestStatus and PriorityRelation
   */
  abstract getPossiblePaths?(): PossiblePath[];

  /**
   * This should in theory only be called once, but if called multiple times should always recreate the same paths.
   */
  createPaths?(assumeUnstarted: boolean): void;
}

export class ResourcesSnapshot {
  resources: SomeResource[] = [];
  resourceMap: Map<ResourceId, number> = new Map();
  unused: ResourceId[] = []; // For those special resources that have limits that change on the fly, aka yellow rocket

  toString(): string {
    const output: string[] = [];

    output.push("Resource Snapshot");

    const resourceStrings = this.resources
      .map(
        (s) =>
          s.name +
            " x " +
            ResourceCategory[s.type] +
            " - Uses " +
            s.resourcesUsed ?? 1
      )
      .join(", ");
    const resMap = [...this.resourceMap].map(
      ([id, amount]) => id + " x " + amount
    );
    const unused = this.unused.join(", ");

    output.push("Resources: " + resourceStrings);
    output.push("Resources Count: " + resMap.join(", "));
    output.push("Unused: " + unused);

    return output.join(" || ");
  }
}

export class PossiblePath {
  resourcesNeeded: [ResourceCategory, number][] = [];
  resourceUsed: ResourceCategory[] = [];
  resourcesAvailable: SomeResource[] = [];
  ignoreResources: ResourceId[] = [];
  pulls: Item[] = [];
  tags: string[] = [];
  advsSavedMin: number;
  advsSavedMax: number;
  miscMeat: number = 0;
  pathCost: number = 0;

  constructor(advsMin: number, advsMax: number = advsMin) {
    this.advsSavedMax = advsMax;
    this.advsSavedMin = advsMin;
  }

  addTag(tag: string): PossiblePath {
    this.tags.push(tag);

    return this;
  }

  removeTag(tag: string): PossiblePath {
    this.tags = this.tags.filter((t) => t != tag);

    return this;
  }

  hasTag(tag: string): boolean {
    return this.tags.includes(tag);
  }

  setRoughPathCost(resourcesUsed: [QuestInfo, SomeResource, number][]) {
    this.pathCost = this.miscMeat;
    let hitFree = false;

    for (const [, res] of resourcesUsed) {
      this.pathCost += res.worthInAftercore;

      if (!hitFree && res.freeTurn == true) {
        hitFree = true;

        this.pathCost -= GreySettings.greyValueOfAdventure;
      }
    }
  }

  getAverageTurns(): number {
    return Math.ceil((this.advsSavedMin + this.advsSavedMax) / 2);
  }

  getCostOfPath(): number {
    return (
      this.pathCost + this.getAverageTurns() * GreySettings.greyValueOfAdventure
    );
  }

  getCostPerAdv(): number {
    if (this.getAverageTurns() == 0) {
      return this.pathCost;
    }

    return this.pathCost / this.getAverageTurns();
  }

  clone(): PossiblePath {
    const path = new PossiblePath(this.advsSavedMin, this.advsSavedMax);
    path.resourcesNeeded = [
      ...this.resourcesNeeded.map(
        ([v1, v2]) => [v1, v2] as [ResourceCategory, number]
      ),
    ];
    path.resourceUsed = [...this.resourceUsed];
    path.resourcesAvailable = [...this.resourcesAvailable];
    path.ignoreResources = [...this.ignoreResources];
    path.miscMeat = this.miscMeat;

    return path;
  }

  detectResourceUsage(snapshot: ResourcesSnapshot): ResourcesSnapshot {
    const changed: ResourcesSnapshot = getResourcesChanged(snapshot, this);
    const diff: Map<ResourceId, number> = changed.resourceMap;
    // Get all resources that were among the changed, and uses enough of the resource to fit in
    const viableResources = this.resourcesAvailable.filter(
      (r) =>
        diff.has(r.resource) && diff.get(r.resource) >= (r.resourcesUsed ?? 1)
    );
    const doDebug = () => {
      print("Snapshot " + snapshot.toString());
      print("Now " + createResourcesSnapshot(this).toString());
      print("Changed " + changed.toString());
    };

    for (const resourceId of diff.keys()) {
      const resources = viableResources.filter((r) => r.resource == resourceId);

      if (resources.length == 0) {
        continue;
      }

      // If all the resources using this key, are not of the same type
      if (resources.filter((r) => r.type != resources[0].type).length > 1) {
        doDebug();
        throw `Multiple resources of the same source were used, need to manually register the resources of ${resourceId} and types ${resources.map(
          (r) => ResourceCategory[r.type]
        )} as used.`;
      }

      let amountUsed = diff.get(resourceId) / (resources[0].resourcesUsed ?? 1);

      // If its a yellow ray, round it if its a turn off
      if (
        resourceId == "Yellow Ray" &&
        Math.abs(diff.get(resourceId) - (resources[0].resourcesUsed ?? 0)) <= 1
      ) {
        diff.set(
          resourceId,
          Math.round(amountUsed) * resources[0].resourcesUsed ?? 1
        );

        amountUsed = Math.round(amountUsed);
      }

      if (amountUsed % 1 != 0) {
        doDebug();
        throw `Unexpected amount of a resource used! Expected a multiple of ${
          resources[0].resourcesUsed ?? 1
        } from ${resources[0].name} of type ${
          ResourceCategory[resources[0].type]
        } but got a total of ${diff.get(
          resourceId
        )} used! Original value: ${snapshot.resourceMap.get(
          resources[0].resource
        )}, Current Value: ${getResourcesLeft(resources[0].resource)}`;
      }

      if (amountUsed > resources.length) {
        doDebug();
        throw `Unexpected amount of a resource used! Expected ${
          resources.length
        } or less of ${resources[0].name} of type ${
          ResourceCategory[resources[0].type]
        } but got a total of ${diff.get(
          resourceId
        )} used! Original value: ${snapshot.resourceMap.get(
          resources[0].resource
        )}, Current Value: ${getResourcesLeft(resources[0].resource)}`;
      }

      this.addUsedResource(resources[0], amountUsed);

      changed.resources.push(...resources.slice(0, amountUsed));
      print(
        "Detected resource change, " +
          resources[0].name +
          " of " +
          ResourceCategory[resources[0].type] +
          " x " +
          amountUsed
      );
    }

    return changed;
  }

  addMeat(meat: number): PossiblePath {
    this.miscMeat += meat;

    return this;
  }

  addIgnored(resource: ResourceId): PossiblePath {
    this.ignoreResources.push(resource);

    return this;
  }

  getResource(resource: ResourceCategory): SomeResource {
    return this.resourcesAvailable.find((r) => r.type == resource);
  }

  addUsedResource(resource: SomeResource, amount: number = 1): PossiblePath {
    for (let i = 0; i < amount; i++) {
      const index = this.resourcesAvailable.findIndex((r) => r === resource);

      if (index >= 0) {
        this.resourcesAvailable.splice(index, 1);
      } else {
        throw `Expected to find a ${resource.name} of type ${
          ResourceCategory[resource.type]
        } but none were remaining!`;
      }

      this.resourceUsed.push(resource.type);
    }

    return this;
  }

  addUsed(resource: ResourceCategory, amount = 1): PossiblePath {
    for (let i = 0; i < amount; i++) {
      const index = this.resourcesAvailable.findIndex(
        (r) => r.type == resource
      );

      if (index >= 0) {
        this.resourcesAvailable.splice(index, 1);
      }

      this.resourceUsed.push(resource);
    }

    return this;
  }

  canUse(resource: ResourceCategory): number {
    return Math.max(
      0,
      this.resourcesNeeded.filter((r) => r[0] == resource).length -
        this.getUsed(resource)
    );
  }

  addMaybe(
    resource: ResourceCategory,
    chance: number,
    amount: number = 1
  ): PossiblePath {
    if (resource == null) {
      throw "Tried to add a null resource";
    }

    for (let i = 0; i < amount; i++) {
      this.resourcesNeeded.push([resource, chance]);
    }

    return this;
  }

  addConsumablePull(item: Item, chance: number = 1): PossiblePath {
    this.addMeat(historicalPrice(item) * 1.1);

    return this.addPull(item, chance);
  }

  addPull(item: Item, chance: number = 1): PossiblePath {
    this.pulls.push(item);

    this.pulls.sort((i1, i2) => i1.name.localeCompare(i2.name));

    return this.addMaybe(ResourceCategory.PULL, chance);
  }

  addFax(monster: Monster, chance: number = 1): PossiblePath {
    if (!canFaxbot(monster)) {
      this.addIgnored("Fax Machine");
    }

    if (
      getProperty("chateauMonster") != "" &&
      toMonster(getProperty("chateauMonster")) != monster
    ) {
      this.addIgnored("Chateau Painting");
    }

    const foughtLocket = getProperty("_locketMonstersFought")
      .split(",")
      .map((s) => toInt(s));

    if (
      foughtLocket.length < 3 &&
      (foughtLocket.includes(toInt(monster)) ||
        !getLocketMonsters()[monster.name])
    ) {
      this.addIgnored("Combat Locket");
    }

    return this.addMaybe(ResourceCategory.FAXER, chance);
  }

  add(resource: ResourceCategory, resources = 1): PossiblePath {
    if (resource == ResourceCategory.PULL) {
      throw "Please use addPull instead";
    }

    if (resource == ResourceCategory.FAXER) {
      throw "Please use addFax instead";
    }

    this.addMaybe(resource, 1, resources);

    return this;
  }

  getUsed(resource: ResourceCategory): number {
    return this.resourceUsed.filter((r) => r == resource).length;
  }
}

export class PossibleMultiPath extends PossiblePath {
  printUsing: boolean = false;
  subpaths: [QuestInfo, PossiblePath][] = [];

  addPath(quest: QuestInfo, path: PossiblePath) {
    this.subpaths.push([quest, path]);

    this.resourcesNeeded.push(...path.resourcesNeeded);
    this.resourceUsed.push(...path.resourceUsed);
    this.resourcesAvailable.push(...path.resourcesAvailable);
    this.ignoreResources.push(...path.ignoreResources);
    this.pulls.push(...path.pulls);
    this.advsSavedMin += path.advsSavedMin;
    this.advsSavedMax += path.advsSavedMax;
    this.miscMeat += path.miscMeat;
  }
}

export enum TaskRelation {
  WAIT_FOR,
  DO_BEFORE,
  DO_AFTER,
  UNRELATED,
}

export function createResourcesSnapshot(
  path?: PossiblePath
): ResourcesSnapshot {
  const snapshot = new ResourcesSnapshot();

  for (const resource of ResourceIds) {
    if (resource == "Yellow Ray") {
      if (haveEffect(Effect.get("Everything Looks Yellow")) == 0) {
        snapshot.unused.push(resource);
      }
    }

    snapshot.resourceMap.set(resource, getResourcesLeft(resource));
  }

  if (path != null) {
    snapshot.resources.push(...path.resourcesAvailable);
  }

  return snapshot;
}

export function getResourcesChanged(
  snapshot: ResourcesSnapshot,
  path?: PossiblePath
): ResourcesSnapshot {
  const newSnapshot = new ResourcesSnapshot();

  for (const resource of ResourceIds) {
    let resourcesLeft = getResourcesLeft(resource);

    // If this resource is a yellow rocket
    if (resource == "Yellow Ray") {
      const prev = snapshot.resourceMap.get(resource);
      const diff = prev - resourcesLeft;

      // On YR effect, previously if we had 100 left
      // We'd now have 25 left
      // If a turn elapsed, then it'll go from 100 to 99

      // If we have a diff of less than 10, then it probably wasn't a YR
      if (diff < 10) {
        resourcesLeft = prev;
      }
    }

    // 20 - 19 = 1 resource used.
    const res = snapshot.resourceMap.get(resource) - resourcesLeft;

    if (res === 0) {
      continue;
    }

    newSnapshot.resourceMap.set(resource, res);
  }

  newSnapshot.resources = [];

  if (path == null) {
    return newSnapshot;
  }

  // Now we're looking for the difference between available resources, and previously available

  let lastIndex = 0;

  snapshot.resources.forEach((resource) => {
    if (lastIndex < path.resourcesAvailable.length) {
      if (path.resourcesAvailable[lastIndex] === resource) {
        lastIndex++;
        return;
      }
    }

    newSnapshot.resources.push(resource);
  });

  if (newSnapshot.resources.length > 0) {
    print(
      "We manually used: " +
        newSnapshot.resources
          .map((r) => r.name + " x " + ResourceCategory[r.type])
          .join(", ")
    );
  }

  return newSnapshot;
}
