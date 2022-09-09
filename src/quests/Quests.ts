import { Familiar, getProperty, Location, Monster, toInt } from "kolmafia";
import { PossiblePath } from "../typings/TaskInfo";
import { GreyOutfit } from "../utils/GreyOutfitter";
import { QuestType } from "./QuestTypes";

export interface QuestInfo {
  toAbsorb?: Monster[]; // Monster[] is calculated by use of run() and set to null before calling status()
  getId(): QuestType; // For debug purposes
  level(): number; // Level required to run this
  status(path?: PossiblePath): QuestStatus; // Ready / Faster later / Delay Burning / Not ready / Complete
  run(path?: PossiblePath): QuestAdventure; // Returns an outfit + location + runnable object
  getLocations(): Location[]; // What should we avoid looking for absorbs in
  free?(): boolean; // If this is set, then require at least this many adventures to be available because we don't want to resume
  getChildren?(): QuestInfo[]; // For helpfully grouping quests together
  mustBeDone?(): boolean; // If there's some state that requires this to be done asap, like effects that'll run out
  hasFamiliarRecommendation?(): Familiar; // This quest would like this familiar leveled up as it'd be useful
  getAbsorbs?(): Monster[]; // Unexposed by Locations[], this is a backup for getting available absorbs
  attemptPrime?(path: PossiblePath): boolean; // Should only ever be called if the outfit is basically vanilla, no items wanted
  canAcceptPrimes?(): boolean; // If this task is a bad idea to prime resources on
}

export enum QuestStatus {
  READY,
  FASTER_LATER,
  NOT_READY,
  COMPLETED,
}

export enum DelayType {
  TURN_BURNING,
  NONCOMBAT_HITTING,
}

export interface GenericAdventure {
  outfit?: GreyOutfit;
  location: Location; // The place we are going to adventure, set to null if this is effectively zoneless
  orbs?: Monster[]; // All monsters in olfaction are added to orbs
  run: () => void;
}

export type NonQuestAdventure = GenericAdventure;

export interface QuestAdventure extends GenericAdventure {
  familiar?: Familiar;
  disableFamOverride?: boolean; // If set to true, familiar is forced
  delay?: DelayType;
  olfaction?: Monster[];
  forcedFight?: [number, Monster]; // How many turns until a fight is forced
}

export function getQuestStatus(property: string): number {
  const status = getProperty(property);

  if (status == "unstarted") {
    return -1;
  } else if (status == "started") {
    return 0;
  } else if (status == "finished") {
    return 100;
  } else if (status.match(/^step\d+$/)) {
    return toInt(status.replace("step", ""));
  } else {
    throw (
      "Cannot parse property '" +
      property +
      "' value '" +
      status +
      "' to an int"
    );
  }
}
