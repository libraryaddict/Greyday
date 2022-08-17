import {
  availableAmount,
  getProperty,
  Item,
  myMeat,
  setProperty,
  toInt,
} from "kolmafia";
import { Task } from "./Tasks";

export class TaskJuneCleaver implements Task {
  hasSet: boolean = false;
  hasSet2: boolean = false;
  hasSet3: boolean = false;
  teachersPen: Item = Item.get("Teacher's Pen");

  run(): void {
    if (!this.hasSet) {
      this.hasSet = true;

      // Alligator
      setProperty("choiceAdventure1469", "3"); // 1.5k meat

      // Peotic
      setProperty("choiceAdventure1467", "3"); // Get adventures
      // Teachers
      setProperty("choiceAdventure1470", "2"); // Teachers pen
      // Lost and found
      setProperty("choiceAdventure1471", "1"); // Meat potion

      if (toInt(getProperty("_juneCleaverSkips")) < 5) {
        // Sprouts
        setProperty("choiceAdventure1474", "4"); // Skip
        // Hypnotic
        setProperty("choiceAdventure1475", "4"); // Skip

        // Summer days
        setProperty("choiceAdventure1472", "4"); // Skip

        // Aunts
        setProperty("choiceAdventure1468", "4"); // Skip

        // Bath time
        setProperty("choiceAdventure1473", "4"); // Skip
      }
    }

    if (!this.hasSet2 && toInt(getProperty("_juneCleaverSkips")) >= 5) {
      this.hasSet2 = true;

      // Aunts
      setProperty("choiceAdventure1468", "1"); // Mus substats

      // Summer days
      setProperty("choiceAdventure1472", "2"); // Food fish.

      // Bath time
      setProperty("choiceAdventure1473", "2"); // 2 res to spooky, stench, sleaze, DR 15

      // Sprouts
      setProperty("choiceAdventure1474", "2"); // Get food.

      // Hypnotic
      setProperty("choiceAdventure1475", "1"); // Moms necklace.
    }

    if (!this.hasSet3 && availableAmount(this.teachersPen) > 1) {
      // Teachers
      setProperty("choiceAdventure1470", "1"); // Teachers Pet
    }
  }
}
