import { cliExecute, getProperty, visitUrl } from "kolmafia";
import { GreySettings } from "../utils/GreySettings";
import { Task } from "./Tasks";

export class TaskBountyHunter implements Task {
  easyBounties: string[] = [
    "bean-shaped rock",
    "bloodstained briquette",
    "brightly-colored bottlecap",
    "broken petri dish",
    "bundle of receipts",
    "cherry stem",
    "crumpled pink slip",
    "handful of meatberries",
    "important bat file",
    "paper towel",
    "pink bat eye",
    "sugar button",
    "suspicious mole",
    "triffid bark",
  ];
  hardBounties: string[] = [
    "beard crumbs",
    "bit of wilted lettuce",
    "black eye",
    "burned-out arcanodiode",
    "dirty coal button",
    "discarded pacifier",
    "dusty wing",
    "filthy rag",
    "length of bent pipe",
    "non-Euclidean hoof",
    "rusty tap handle",
    "spare abacus bead",
    "worthless piece of yellow glass",
  ];

  shouldCheckBounties(): boolean {
    return (
      (getProperty("currentEasyBountyItem") == "" &&
        getProperty("_unknownEasyBountyItem") == "") ||
      (getProperty("currentHardBountyItem") == "" &&
        getProperty("_unknownHardBountyItem") == "")
    );
  }

  run(): void {
    if (!GreySettings.greyBountyHunting) {
      return;
    }

    if (this.shouldCheckBounties()) {
      visitUrl("bounty.php");
    }

    if (
      getProperty("currentEasyBountyItem") == "" &&
      this.easyBounties.includes(getProperty("_untakenEasyBountyItem"))
    ) {
      cliExecute("bounty easy");
    }

    if (
      getProperty("currentHardBountyItem") == "" &&
      this.hardBounties.includes(getProperty("_untakenHardBountyItem"))
    ) {
      cliExecute("bounty hard");
    }
  }
}
