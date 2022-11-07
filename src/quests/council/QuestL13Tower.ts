import {
  Location,
} from "kolmafia";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestTowerKeys } from "./tower/stages/QuestTowerKeys";
import { QuestTowerContestants } from "./tower/stages/QuestTowerContestants";
import { QuestTowerMaze } from "./tower/stages/QuestTowerMaze";
import { QuestTowerWallSkin } from "./tower/stages/QuestTowerWallSkin";
import { QuestTowerWallMeat } from "./tower/stages/QuestTowerWallMeat";
import { QuestTowerWallBones } from "./tower/stages/QuestTowerWallBones";
import { QuestTowerShadow } from "./tower/stages/QuestTowerShadow";
import { QuestTowerMirror } from "./tower/stages/QuestTowerMirror";
import { QuestTowerKillWitch } from "./tower/stages/QuestTowerKillWitch";
import { QuestType } from "../QuestTypes";

export class QuestL13 implements QuestInfo {
  getLocations(): Location[] {
    return [];
  }

  sideQuests: QuestInfo[] = [
    new QuestTowerKeys(),
    new QuestTowerContestants(),
    new QuestTowerMaze(),
    new QuestTowerWallSkin(),
    new QuestTowerWallMeat(),
    new QuestTowerWallBones(),
    new QuestTowerMirror(),
    new QuestTowerShadow(),
    new QuestTowerKillWitch(),
  ];

  getChildren(): QuestInfo[] {
    return this.sideQuests;
  }

  getId(): QuestType {
    return "Council / Tower / Parent";
  }

  level(): number {
    return -1;
  }

  status(): QuestStatus {
    return QuestStatus.COMPLETED;

    // Unstarted = Obvious
    // started= We've visited the booth? Not sure whats up there.
    // Step1 = We're fighting the contestants
    // Step2 = We've defeated the contestants
    // Step3 = Just got sash
    // Step4 = We're going into the maze
    // Step4 = We're in the maze
    // Step5 = We left the maze
    // Step6 = We've used all our keys
    // Step7 = Just killed wall of skin
    // Step8 = Just killed wall of meat
    // Step9 = Just killed wall of bones
    // Step10 = Just killed the shadow
    // Step11 = Just shattered the mirror, or didn't
    // Step12 = We've advanced to the 3rd stage of the witch and if you see this, you lost and can now find the wand NC
    // Step13 = Just killed the witch
  }

  run(): QuestAdventure {
    throw "Not supported";
  }
}
