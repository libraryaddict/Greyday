import {
  appearanceRates,
  canFaxbot,
  Effect,
  fileToBuffer,
  getLocketMonsters,
  getProperty,
  haveEffect,
  haveSkill,
  historicalPrice,
  isBanished,
  Item,
  itemDrops,
  Location,
  Monster,
  print,
  setProperty,
  Skill,
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
}

export class PossiblePath {
  resourcesNeeded: [ResourceCategory, number][] = [];
  resourceUsed: ResourceCategory[] = [];
  resourcesAvailable: SomeResource[] = [];
  ignoreResources: ResourceId[] = [];
  pulls: Item[] = [];
  advsSavedMin: number;
  advsSavedMax: number;
  miscMeat: number = 0;
  pathCost: number;

  constructor(advsMin: number, advsMax: number = advsMin) {
    this.advsSavedMax = advsMax;
    this.advsSavedMin = advsMin;
  }

  setRoughPathCost(resourcesUsed: [QuestInfo, SomeResource, number][]) {
    this.pathCost = this.miscMeat;

    for (const [, res] of resourcesUsed) {
      this.pathCost += res.worthInAftercore;
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
      (r) => diff.has(r.id) && diff.get(r.id) >= (r.resourcesUsed ?? 1)
    );

    for (const resourceId of diff.keys()) {
      const resources = viableResources.filter((r) => r.id == resourceId);

      if (resources.length == 0) {
        continue;
      }

      // If all the resources using this key, are not of the same type
      if (resources.filter((r) => r.type != resources[0].type).length > 1) {
        throw `Multiple resources of the same source were used, need to manually register the resources of ${resourceId} and types ${resources.map(
          (r) => ResourceCategory[r.type]
        )} as used.`;
      }

      const amountUsed =
        diff.get(resourceId) / (resources[0].resourcesUsed ?? 1);

      if (amountUsed % 1 != 0) {
        throw `Unexpected amount of a resource used! Expected a multiple of ${
          resources[0].resourcesUsed ?? 1
        } from ${resources[0].id} of type ${
          ResourceCategory[resources[0].type]
        } but got a total of ${diff.get(resourceId)} used!`;
      }

      if (amountUsed > resources.length) {
        throw `Unexpected amount of a resource used! Expected ${
          resources.length
        } or less of ${resources[0].id} of type ${
          ResourceCategory[resources[0].type]
        } but got a total of ${diff.get(resourceId)} used!`;
      }

      this.addUsedResource(resources[0], amountUsed);
      changed.resources.push(...resources.slice(0, amountUsed));
      print(
        "Detected resource change, " +
          resources[0].id +
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
        throw `Expected to find a ${resource.id} of type ${
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
      // We're not checking resources left, instead we're checking another state
      resourcesLeft = snapshot.resourceMap.get(resource);
      // If we have yellow vision, and previously it was unused
      if (
        haveEffect(Effect.get("Everything Looks Yellow")) > 60 &&
        snapshot.unused.includes(resource)
      ) {
        resourcesLeft--;
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
    print("Removing " + resource.id + " x " + ResourceCategory[resource.type]);
  });

  if (newSnapshot.resources.length > 0) {
    print(
      "We manually used: " +
        newSnapshot.resources
          .map((r) => r.id + " x " + ResourceCategory[r.type])
          .join(", ")
    );
  }

  return newSnapshot;
}

// TODO Read combats.txt to find out the combat rate of the area. Then figure out how much +combat and -combat we can stack.
// May need to do something for predicting future -combat and +combat
const combatPercents: Map<Location, number> = new Map();

function getCombatRate(location: Location): number {
  if (combatPercents.size == 0) {
    const buffer = fileToBuffer("combats.txt");
    for (const [loc, combats] of buffer.split("\n").map((s) => s.split("\t"))) {
      if (combats == null || !combats.match(/-?\d+/)) {
        continue;
      }

      const l = Location.get(loc);

      if (l == Location.get("None")) {
        continue;
      }

      combatPercents.set(l, parseInt(combats));
    }
  }

  return combatPercents.get(location);
}

export type MinMax = [number, number];
// What we going to do about resources like -combat, limited banishes, and the like?
// The obvious answer is to expose a generic interface, listing a benifit, listing a cost, listing how long the benifit lasts

const nanovision: Skill = Skill.get("Double Nanovision");
const compression: Skill = Skill.get("Gravitational Compression");

export function getEstimatedTurnsToDrop(
  location: Location,
  item: Item,
  amount: number
): number {
  const itemDrop = 1 + (haveSkill(nanovision) ? 2 : 0);

  const rates: [Monster, number][] = Object.entries(
    appearanceRates(location)
  ).map((val) => [Monster.get(val[0]), val[1]]);
  const dropChances: [number, number[]][] = [];

  for (const [monster, rate] of rates) {
    if (rate <= 0 || isBanished(monster)) {
      continue;
    }

    const drops: [Item, number][] = Object.entries(itemDrops(monster)).map(
      ([i, n]) => [Item.get(i), n]
    );

    const rates: number[] = [];

    for (const [i, perc] of drops) {
      if (i != item) {
        continue;
      }

      rates.push(perc);
    }

    dropChances.push([rate, rates]);
  }

  let dropChancePerFight = 0;

  for (const [rate, chances] of dropChances) {
    if (chances.length == 0) {
      continue;
    }

    dropChancePerFight += (rate / 100) * chances.reduce((c, p) => c + p, 0);
  }

  dropChancePerFight = dropChancePerFight / 100;

  return null;
}

export function getEstimatedTurnsToHitMonster(
  location: Location,
  monster: Monster
): MinMax {
  // TODO Calculate crystal ball, banishes, +combat.
  // Something to account for when we're not allowed to run +combat effect
  // Account for banishes
  return [0, 0];
}

export function getEstimatedTurnsToHitNC(location: Location): MinMax {
  return [0, 0];
}
