import {
  availableAmount,
  getProperty,
  Item,
  myLevel,
  setProperty,
  toInt,
} from "kolmafia";
import { getQuestStatus } from "../quests/Quests";
import { Task } from "./Tasks";

enum CleaverChoices {
  AUNTS_NOT_ANTS = 1468,
  BATH_TIME = 1473,
  BEWARE_OF_ALIGATOR = 1469,
  DELICIOUS_SPROUTS = 1474,
  HYPNOTIC_MASTER = 1475,
  LOST_AND_FOUND = 1471,
  POETIC_JUSTICE = 1467,
  SUMMER_DAYS = 1472,
  TEACHERS_PET = 1470,
}

export class TaskJuneCleaver implements Task {
  teachersPen: Item = Item.get("Teacher's Pen");
  eatenProp: string = "_greyEatenToday";
  fireTrout: Item = Item.get("fire-roasted lake trout");
  cosplay: boolean =
    availableAmount(Item.get("Fourth of May Cosplay Saber")) > 0;

  run(): void {
    const wantsKitchen =
      !this.cosplay &&
      getQuestStatus("questM20Necklace") == 0 &&
      myLevel() >= 4;
    const peakProgress = toInt(getProperty("booPeakProgress"));
    const wantsBooPeak =
      !this.cosplay && peakProgress > 0 && peakProgress < 100;

    const choices: Map<CleaverChoices, number> = new Map();

    choices.set(CleaverChoices.AUNTS_NOT_ANTS, 1); // moxie stats

    choices.set(CleaverChoices.BATH_TIME, 3); // +3 hot res, 50 init

    if (wantsBooPeak) {
      choices.set(CleaverChoices.BATH_TIME, 2); // +2 spooky, stench, sleaze res. +15 DR
    }

    choices.set(CleaverChoices.BEWARE_OF_ALIGATOR, 3); // 1500 meat
    choices.set(CleaverChoices.DELICIOUS_SPROUTS, 2); // Guilty Sprouts
    choices.set(CleaverChoices.HYPNOTIC_MASTER, 1); // Mother's Necklace
    choices.set(CleaverChoices.LOST_AND_FOUND, 1); // Savings bond +50 meat
    choices.set(CleaverChoices.POETIC_JUSTICE, 3); // +5 advs, +5 beaten up
    choices.set(CleaverChoices.SUMMER_DAYS, 2); // Fire roasted trout
    choices.set(CleaverChoices.TEACHERS_PET, 2); // Teacher's Pen

    if (
      availableAmount(this.fireTrout) > 0 ||
      getProperty(this.eatenProp)
        .split(",")
        .includes(toInt(this.fireTrout).toString())
    ) {
      choices.set(CleaverChoices.SUMMER_DAYS, 1); // -5 combat potion
    }

    const hasSkips = toInt(getProperty("_juneCleaverSkips")) < 5;

    if (hasSkips) {
      choices.set(CleaverChoices.AUNTS_NOT_ANTS, 4);

      // If we don't want to do the kitchen..
      // This generally works pretty well for the +init boost tbh
      if (!wantsKitchen) {
        choices.set(CleaverChoices.BATH_TIME, 4);
      }

      choices.set(CleaverChoices.DELICIOUS_SPROUTS, 4);
      choices.set(CleaverChoices.HYPNOTIC_MASTER, 4);
      choices.set(CleaverChoices.SUMMER_DAYS, 4);

      if (availableAmount(this.teachersPen) > 1) {
        choices.set(CleaverChoices.TEACHERS_PET, 4);
      }
    }

    for (const [choice, value] of choices) {
      setProperty("choiceAdventure" + choice, value.toString());
    }
  }
}
