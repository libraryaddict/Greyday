import {
  availableAmount,
  cliExecute,
  getProperty,
  Item,
  print,
  toInt,
  visitUrl,
} from "kolmafia";
import {
  getCurrentLatteFlavors,
  hasUnlockedLatteFlavor,
  LatteFlavor,
} from "../utils/LatteUtils";
import { Task } from "./Tasks";

export class TaskLatteFiller implements Task {
  skipLatte: boolean = toInt(getProperty("_latteRefillsUsed")) > 0;
  latte: Item = Item.get("Latte lovers member's mug");
  ghostBuster: Item = Item.get("Protonic accelerator pack");

  run(): void {
    if (this.skipLatte) {
      return;
    }

    if (availableAmount(this.latte) == 0) {
      this.skipLatte = true;
      return;
    }

    const firstFlavor =
      availableAmount(this.ghostBuster) > 0
        ? LatteFlavor.PLUS_COMBAT
        : LatteFlavor.FAMILIAR_WEIGHT;

    const flavors: LatteFlavor[] = [
      firstFlavor,
      LatteFlavor.MEAT_DROP,
      LatteFlavor.FAM_EXP,
    ];

    const currentFlavors = getCurrentLatteFlavors();

    if (flavors.filter((f) => !currentFlavors.includes(f)).length == 0) {
      this.skipLatte = true;
      return;
    }

    const notUnlocked = flavors.filter((f) => !hasUnlockedLatteFlavor(f));

    if (notUnlocked.length > 0) {
      return;
    }

    if (toInt(getProperty("_latteRefillsUsed")) > 0) {
      throw "latte was refilled but we don't remember that!";
    }

    cliExecute("latte refill " + flavors.join(" "));
    visitUrl("main.php");
  }
}
