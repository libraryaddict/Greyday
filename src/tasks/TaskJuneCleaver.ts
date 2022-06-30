import { getProperty, myMeat, setProperty, toInt } from "kolmafia";
import { Task } from "./Tasks";

export class TaskJuneCleaver implements Task {
  hasSet: boolean = false;
  hasSet2: boolean = false;
  wasPoor: boolean;

  run(): void {
    if (!this.hasSet) {
      this.hasSet = true;

      // Alligator
      setProperty("choiceAdventure1469", "3"); // 1.5k meat

      // Peotic
      setProperty("choiceAdventure1467", "3"); // Get adventures
      // Teachers
      setProperty("choiceAdventure1470", "2"); // Teachers pen
      // Sprouts
      setProperty("choiceAdventure1474", "4"); // Get food. No. Skip instead.
      // Hypnotic
      setProperty("choiceAdventure1475", "4"); // Moms necklace. No. Skip instead.

      // Lost and found
      setProperty("choiceAdventure1471", "1"); // Meat potion
      // Summer days
      setProperty("choiceAdventure1472", "4"); // Food fish. No. Skip instead.

      // Aunts
      setProperty("choiceAdventure1468", "4"); // Skip

      // Bath time
      setProperty("choiceAdventure1473", "4"); // Skip
    }

    if (!this.hasSet2 && toInt(getProperty("_juneCleaverSkips")) >= 5) {
      this.hasSet2 = true;

      // Aunts
      setProperty("choiceAdventure1468", "1"); // Mus substats

      // Bath time
      setProperty("choiceAdventure1473", "2"); // 2 res to spooky, stench, sleaze, DR 15
    }
  }
}
