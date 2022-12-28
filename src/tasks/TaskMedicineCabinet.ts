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
  turnsPlayed,
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

  getConsults(): number {
    return toInt(getProperty("_coldMedicineConsults"));
  }

  hasConsults(): boolean {
    return this.getConsults() < 5;
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

  isUnderground(): boolean {
    return (
      getProperty("lastCombatEnvironments")
        .split("")
        .filter((s) => s == "u").length > 10
    );
  }

  getLastChecked(): number {
    return toInt(getProperty(this.lastChecked));
  }

  shouldCheck(): boolean {
    return this.getLastChecked() + 2 <= totalTurnsPlayed();
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
    } else if (
      page.includes("Extrovermectin&trade;") ||
      page.includes("Breathitin&trade;")
    ) {
      runChoice(5);
    } else {
      visitUrl("main.php");
    }
  }

  run() {
    if (
      getWorkshed() == Item.none &&
      GreySettings.greyDefaultWorkshed != "" &&
      availableAmount(Item.get(GreySettings.greyDefaultWorkshed)) > 0
    ) {
      use(Item.get(GreySettings.greyDefaultWorkshed));
    }

    if (getWorkshed() != this.cabinet) {
      return;
    }

    this.trySwitch();

    if (!this.isConsultReady()) {
      return;
    }

    if (!this.shouldCheck()) {
      return;
    }

    // If we would not get extro
    if (!this.isIndoors()) {
      // If we don't care about breathitin
      if (GreySettings.greySwitchWorkshed == "") {
        return;
      }

      // If we wouldn't get breathitin
      if (!this.isUnderground()) {
        return;
      }

      // If we haven't spent enough turns to get desperate to grab breathitin
      if (turnsPlayed() < this.getConsults() * 75) {
        return;
      }
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
          throw (
            "Failed to switch workshed to " +
            item +
            ", are you sure it's a workshed item?"
          );
        }

        print("Now using " + getWorkshed() + " as the workshed!", "blue");
      }
      return;
    }
  }
}
