import {
  availableAmount,
  Effect,
  getProperty,
  getRevision,
  haveEffect,
  Item,
  lastChoice,
  myHp,
  myLocation,
  myMaxhp,
  myPath,
  myTurncount,
  pathIdToName,
  print,
  printHtml,
  setProperty,
  toInt,
  waitq,
} from "kolmafia";
import { GreyAdventurer } from "./GreyAdventurer";
import { QuestRegistry } from "./quests/QuestRegistry";
import { getQuestStatus } from "./quests/Quests";
import { hasBanished, BanishType } from "./utils/Banishers";
import { GreyRequirements } from "./utils/GreyResources";
import { getGreySettings, GreySettings } from "./utils/GreySettings";

class GreyYouMain {
  adventures: GreyAdventurer;
  private reachedTower: string = "_greyReachedTower";

  isRevisionPass(): boolean {
    let required = 26535;

    if (getRevision() < required) {
      print(
        `Please update your mafia. You are using ${getRevision()} but we need at least ${required}`,
        "red"
      );
      return false;
    }

    return true;
  }

  getTick(): string {
    return "<font color='green'>✔</font>";
  }

  getCross(): string {
    return "<font color='red'>✘</font>";
  }

  doSettings() {
    let settings = getGreySettings();

    printHtml("<center color='blue'>====== Grey Settings ======");

    for (let setting of settings) {
      print("");

      let val = getProperty(setting.name);
      printHtml(
        `<font color='blue'>${setting.name}</font> - <font color='gray'>${setting.description}</font>`
      );

      if (setting.valid(val)) {
        printHtml(
          `${this.getTick()} <font color='green'>Setting '${val}' is valid</font>`
        );
      } else if (val == "") {
        printHtml(
          `${this.getCross()} <font color='red'>Using default behavior</font>`
        );
      } else {
        printHtml(
          `${this.getCross()} <font color='red'>Invalid setting '${val}'</font>`
        );
      }
    }

    print("");
    printHtml(
      "<center>You can change these settings by using the following in CLI:</center>"
    );
    printHtml("<center color='purple'>set settingName = value</center>");

    print("");
    printHtml("<center color='blue'>======================</center>");
  }

  doHelp() {
    printHtml("======================================");
    print("help - Shows this message", "blue");
    print("settings - Show the settings", "blue");
    print(
      "required - Prints off a series of requirements, which is both outdated and more severe than you need.",
      "blue"
    );

    let color = myPath() == "Grey You" ? "blue" : "red";

    if (color == "red") {
      print("You are not in Grey You, and cannot use these commands.", "gray");
    }

    print("resources - A debug command for resource usage information", color);
    print(
      "run <Turns> - Run X amount of turns, or 1 if turns are not provided",
      color
    );
    print(
      "sim - Equips and gets ready to adventure, showing where it would go. But will not take the action.",
      color
    );
    print(
      "absorbs - Prints off what adventure absorbs have not yet been grabbed",
      color
    );
    printHtml("======================================");
  }

  handleCommand(command: string) {
    if (!this.isRevisionPass()) {
      return;
    }

    if (command == "" || command == "help") {
      this.doHelp();
      return;
    }

    if (command == "required") {
      new GreyRequirements().hasRequired();
      return;
    }

    if (command == "settings") {
      this.doSettings();
      return;
    }

    if (command == "resources") {
      let finder = new GreyAdventurer().adventureFinder;

      finder.doResourceClaims();
      finder.noteResourceClaims();
      return;
    }

    if (
      command != "absorbs" &&
      command != "run" &&
      !command.startsWith("run ") &&
      command != "sim"
    ) {
      print("Unknown command.");
      return;
    }

    let settings = getGreySettings();
    let invalid: boolean = false;

    for (let setting of settings) {
      let val = getProperty(setting.name);

      if (val == "" || setting.valid(val)) {
        continue;
      }

      printHtml(
        "<font color='red'>The setting '" +
          setting.name +
          "' is invalid, please correct this or set it to empty. To reset it, use the CLI command <font color='blue'>set " +
          setting.name +
          " =</font></font>"
      );
    }

    if (invalid) {
      return;
    }

    if (myPath() != "Grey You") {
      print(
        "You're not in grey you. Use 'help' to see what you can use.",
        "red"
      );
      return;
    }

    this.adventures = new GreyAdventurer();
    let s = command.split(" ");

    if (command == "absorbs") {
      this.adventures.adventureFinder.absorbs.printRemainingAbsorbs();
      return;
    }

    if (command == "sim") {
      this.adventures.runTurn(false);
      return;
    } else if (s[0] == "go" || s[0] == "run") {
      let turns = 1;

      if (s[1] != null) {
        turns = toInt(s[1]);
      }

      let effect: Effect = Effect.get("Beaten Up");
      let lastBeaten: number = 0;

      for (let i = 0; i < turns && haveEffect(effect) - lastBeaten != 3; i++) {
        if (
          GreySettings.greyBreakAtTower &&
          getProperty(this.reachedTower) != "true" &&
          getQuestStatus("questL13Final") >= 0
        ) {
          setProperty(this.reachedTower, "true");
          print(
            "We've reached the tower! Now aborting script as set by preference 'greyBreakAtTower'!",
            "blue"
          );
          print("The script will continue when you run the script again.");
          return;
        }

        lastBeaten = haveEffect(effect);
        let run = this.adventures.runTurn(true);

        if (!run) {
          break;
        }
      }

      print("Done running", "blue");
      return;
    }
  }
}

export function main(parameter: string = "") {
  new GreyYouMain().handleCommand(parameter);
}
