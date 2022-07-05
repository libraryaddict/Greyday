import { fileToBuffer, Location, Monster } from "kolmafia";
import { QuestType } from "../quests/QuestTypes";
import { ResourceClaim } from "../utils/GreyResources";

export abstract class TaskInfo {
  getPriorityRelation(quest: QuestType): Priority {
    return Priority.UNRELATED;
  }

  abstract getEstimatedTurns(): TaskEstimatedTurns[];
}

export class TaskEstimatedTurns {
  resources: ResourceClaim[];
  advsMin: number;
  advsMax: number;

  constructor(advsMin: number, advsMax: number, resources: ResourceClaim[]) {
    this.advsMax = advsMax;
    this.advsMin = advsMin;
    this.resources = resources;
  }
}

export enum Priority {
  BEFORE,
  UNRELATED,
  AFTER,
}

// TODO Read combats.txt to find out the combat rate of the area. Then figure out how much +combat and -combat we can stack.
// May need to do something for predicting future -combat and +combat
const combatPercents: Map<Location, number> = new Map();

function getCombatRate(location: Location): number {
  if (combatPercents.size == 0) {
    let buffer = fileToBuffer("combats.txt");
    for (let [loc, combats] of buffer.split("\n").map((s) => s.split("\t"))) {
      if (combats == null || !combats.match(/-?\d+/)) {
        continue;
      }

      let l = Location.get(loc);

      if (l == Location.get("None")) {
        continue;
      }

      combatPercents.set(l, parseInt(combats));
    }
  }

  return combatPercents.get(location);
}

export type MinMax = [number, number];

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
