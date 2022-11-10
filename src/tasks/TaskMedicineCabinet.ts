import {
  availableAmount,
  getProperty,
  getWorkshed,
  handlingChoice,
  Item,
  lastChoice,
  print,
  runChoice,
  setProperty,
  toInt,
  toItem,
  totalTurnsPlayed,
  use,
  visitUrl,
} from "kolmafia";
import { GreySettings } from "../utils/GreySettings";
import { Task } from "./Tasks";

export class TaskColdMedicineCabinet implements Task {
  lastChecked: string = "_lastCheckedCabinet";
  hat: Item = Item.get("Ice Crown");
  pants: Item = Item.get("frozen jeans");
  cabinet: Item = Item.get("Cold medicine cabinet");
  triedSwitch: boolean = false;

  hasConsults(): boolean {
    return toInt(getProperty("_coldMedicineConsults")) < 5;
  }

  getNextConsult(): number {
    return toInt(getProperty("_nextColdMedicineConsult")) - totalTurnsPlayed();
  }

  isConsultReady(): boolean {
    return this.hasConsults() && this.getNextConsult() <= 0;
  }

  isIndoors(): boolean {
    return (
      getProperty("lastCombatEnvironments")
        .split("")
        .filter((s) => s == "i").length > 10
    );
  }

  getLastChecked(): number {
    return toInt(getProperty(this.lastChecked));
  }

  shouldCheck(): boolean {
    return this.getLastChecked() + 10 <= totalTurnsPlayed();
  }

  check() {
    const page = visitUrl("campground.php?action=workshed");

    setProperty(this.lastChecked, totalTurnsPlayed().toString());

    if (!handlingChoice()) {
      return;
    }

    if (lastChoice() != 1455) {
      throw "Unexpected situation";
    }

    if (GreySettings.isHardcoreMode() && availableAmount(this.pants) == 0) {
      runChoice(1);
    } else if (page.includes("Extrovermectin&trade;")) {
      runChoice(5);
    } else {
      visitUrl("main.php");
    }
  }

  run() {
    if (getWorkshed() != this.cabinet) {
      return;
    }

    this.trySwitch();

    if (!this.isConsultReady() || !this.isIndoors() || !this.shouldCheck()) {
      return;
    }

    this.check();

    this.trySwitch();
  }

  trySwitch() {
    if (!this.hasConsults()) {
      if (!this.triedSwitch && GreySettings.greySwitchWorkshed != "") {
        this.triedSwitch = true;

        const item = toItem(GreySettings.greySwitchWorkshed);

        if (!item.usable) {
          print(
            "An item was set in greySwitchWorkshed but is not usable",
            "red"
          );
          return;
        }

        if (availableAmount(item) == 0) {
          print(
            "An item was set in greySwitchWorkshed but is not available, will skip",
            "red"
          );
          return;
        }

        use(item);

        if (getWorkshed() == this.cabinet) {
          print(
            "Failed to switch workshed to " +
              item +
              ", are you sure it's a workshed item?",
            "red"
          );
          return;
        }

        print("Now using " + getWorkshed() + " as the workshed!", "blue");
      }
      return;
    }
  }
}
