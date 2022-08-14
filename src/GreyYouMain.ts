import {
  Effect,
  getProperty,
  getRevision,
  haveEffect,
  Item,
  myAdventures,
  myPath,
  print,
  printHtml,
  setProperty,
  svnAtHead,
  svnExists,
  toInt,
  toItem,
  turnsPlayed,
  userConfirm,
  visitUrl,
} from "kolmafia";
import { GreyAdventurer } from "./GreyAdventurer";
import { getQuestStatus } from "./quests/Quests";
import { FigureOutPath } from "./typings/TaskManager";
import { AbsorbsProvider } from "./utils/GreyAbsorber";
import { GreyRequirements } from "./utils/GreyResources";
import { getGreySettings, GreySettings } from "./utils/GreySettings";
import { GreyTimings } from "./utils/GreyTimings";
import { centerText } from "./utils/GreyUtils";
import { lastCommitHash } from "./_git_commit";

class GreyYouMain {
  adventures: GreyAdventurer;
  private reachedTower: string = "_greyReachedTower";
  svn_name = "Kasekopf-loop-casual-branches-release";

  isRevisionPass(): boolean {
    const required = 26545;

    if (getRevision() > 0 && getRevision() < required) {
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
    const settings = getGreySettings();

    printHtml(centerText("====== Grey Settings ======", "blue"));

    let html = "";

    for (const setting of settings) {
      if (setting.viable == false) {
        continue;
      }

      html += "<br>";

      const val = getProperty(setting.name);

      html += `<font color='blue'>${setting.name}</font> - <font color='gray'>${setting.description}</font>`;
      html += "<br>";

      if (setting.valid(val)) {
        html += `${this.getTick()} <font color='green'>Setting '${val}' is valid</font>`;
      } else if (val == "") {
        html += `${this.getTick()} <font color=>Using default${
          setting.default != null ? ` '${setting.default}'` : ""
        }</font>`;
      } else {
        html += `${this.getCross()} <font color='red'>Invalid setting '${val}'</font>`;
      }
      html += "<br>";
    }

    html += "<br>You can change these settings by using the following in CLI:";
    html += "<br>";
    html += "<font color='purple'>set settingName = value</font>";

    printHtml(centerText(html));

    print("");
    printHtml(
      "<div style=\"text-align: center;\" color='blue'>======================</div>"
    );
  }

  doHelp() {
    printHtml(centerText("======================================"));
    print("help - Shows this message", "blue");
    print("settings - Show the settings", "blue");
    print("required - Prints off a series of requirements.", "blue");
    print(
      "resources - A debug command that predicts what resources it would try to use in Grey You using your current settings",
      "blue"
    );

    const color = myPath() == "Grey You" ? "blue" : "red";

    if (color == "red") {
      print("You are not in Grey You, and cannot use these commands.", "gray");
    }

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
    printHtml(centerText("======================================"));
  }

  checkVersion() {
    // Copied from Kasekopf's loopgyou
    print(
      `Running Greyday version [${
        lastCommitHash ?? "custom-built"
      }] in KoLmafia r${getRevision()}`,
      `grey`
    );

    if (lastCommitHash !== undefined && svnExists(this.svn_name)) {
      if (!svnAtHead(this.svn_name)) {
        print(
          'A newer version of this script is available and can be obtained with "svn update".',
          "red"
        );
      } else {
        print("This script is up to date.", "blue");
      }
    }
  }

  handleCommand(command: string) {
    if (!this.isRevisionPass()) {
      return;
    }

    this.checkVersion();

    GreySettings.loadSettings();

    if (command == "resources") {
      const adv = new GreyAdventurer();
      const path = new FigureOutPath().getPaths(
        adv.adventureFinder.getAllRawQuests(),
        true
      );

      if (path == null) {
        print("Oh no! Path not found");
        return;
      }

      path.printInfo();
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

    if (
      command != "absorbs" &&
      command != "run" &&
      !command.startsWith("run ") &&
      command != "sim"
    ) {
      print("Unknown command.");
      return;
    }

    const settings = getGreySettings();
    const invalid: boolean = false;

    for (const setting of settings) {
      const val = getProperty(setting.name);

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

    if (getProperty("greyBreakAtTower") == "") {
      print(
        "The 'greyBreakAtTower' setting has not been set, the script will not break when it reaches the tower.",
        "red"
      );
    }

    this.adventures = new GreyAdventurer();
    const s = command.split(" ");

    if (command == "absorbs") {
      this.adventures.adventureFinder.absorbs.printRemainingAbsorbs();
      return;
    }

    if (getProperty("autoSatisfyWithNPCs") == "false") {
      const prompt = userConfirm(
        "Your 'Buy from NPC stores' is disabled. Enable?"
      );

      if (!prompt) {
        print("Unable to continue, not allowed to buy from NPC stores.", "red");
        return;
      }

      setProperty("autoSatisfyWithNPCs", "true");
    }

    const simmedPath = new FigureOutPath().getPaths(
      this.adventures.adventureFinder.getAllRawQuests()
    );

    if (simmedPath == null) {
      print("Failed to find a way to accomplish!", "red");
      return;
    }

    this.adventures.adventureFinder.path = simmedPath;

    print("Resources planning..");
    simmedPath.printInfo();

    if (command == "sim") {
      this.adventures.runTurn(false);
      return;
    } else if (s[0] == "go" || s[0] == "run") {
      const turns = toInt(s[1] || "1");

      const effect: Effect = Effect.get("Beaten Up");
      let lastBeaten: number = 0;

      const timings = new GreyTimings();
      let turnsRunAsFar: number = 0;

      if (turns > 0) {
        timings.doStart();
      }

      try {
        for (
          ;
          turnsRunAsFar < turns && haveEffect(effect) - lastBeaten != 3;
          turnsRunAsFar++
        ) {
          if (this.shouldReturn()) {
            return;
          }

          lastBeaten = haveEffect(effect);
          const run = this.adventures.runTurn(true);

          if (!run) {
            break;
          }
        }
      } finally {
        if (turns > 0) {
          timings.doEnd();
        }

        print(
          "Time to run this script as far today is: " +
            timings.getTimeAsString(timings.getTotalSeconds()),
          "blue"
        );
      }

      if (haveEffect(effect) - lastBeaten == 3) {
        print("Oh no! We were beaten up..", "red");
      }

      print("Done running", "blue");
      return;
    }
  }

  shouldReturn(): boolean {
    if (
      GreySettings.greyBreakAtTower &&
      getProperty(this.reachedTower) != "true" &&
      getQuestStatus("questL13Final") >= 0
    ) {
      setProperty(this.reachedTower, "true");
      visitUrl("place.php?whichplace=nstower");

      print(
        "We've reached the tower! Now aborting script as set by preference 'greyBreakAtTower'!",
        "blue"
      );
      print("The script will continue when you run the script again.");

      printEndOfRun();
      return true;
    }

    return false;
  }
}

export function printEndOfRun() {
  const pulls: Item[] = getProperty("_roninStoragePulls")
    .split(",")
    .map((s) => toItem(toInt(s)));

  if (!GreySettings.isHardcoreMode()) {
    print(
      "Used " +
        pulls.length +
        " / 20 pulls. Could've done another " +
        (20 - pulls.length) +
        " pulls..",
      "blue"
    );
  }

  print(
    "Took " +
      turnsPlayed() +
      " turns this run! " +
      myAdventures() +
      " turns left to play with!",
    "blue"
  );
  new AbsorbsProvider().printRemainingAbsorbs();
  print("Pulled: " + pulls.map((i) => i.name).join(", "), "gray");
}

export function main(parameter: string = "") {
  new GreyYouMain().handleCommand(parameter);
}
