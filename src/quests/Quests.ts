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
  needAdventures?(): number; // If this is set, then require at least this many adventures to be available because we don't want to resume
  getChildren?(): QuestInfo[]; // For helpfully grouping quests together
  mustBeDone?(): boolean; // If there's some state that requires this to be done asap, like effects that'll run out
  hasFamiliarRecommendation?(): Familiar; // This quest would like this familiar leveled up as it'd be useful
  getAdventuresToComplete?(): number; // The amount of adventures remaining and needed to finish this location. Used when seeking absorbs
  getAbsorbs?(): Monster[]; // Unexposed by Locations[], this is a backup for getting available absorbs
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

export interface QuestAdventure {
  outfit?: GreyOutfit;
  familiar?: Familiar;
  disableFamOverride?: boolean; // If set to true, familiar is forced
  location: Location; // The place we are going to adventure, set to null if this is effectively zoneless
  delay?: DelayType;
  run: () => void;
}

export enum OutfitImportance {
  REQUIRED,
  VERY_HELPFUL,
  HELPS,
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
