import {
  currentRound,
  Effect,
  getAutoAttack,
  getProperty,
  getRevision,
  gitAtHead,
  gitExists,
  handlingChoice,
  haveEffect,
  Item,
  myAdventures,
  myPath,
  Path,
  print,
  printHtml,
  pullsRemaining,
  setAutoAttack,
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
import { PropertyManager } from "./utils/Properties";
import { lastCommitHash } from "./_git_commit";

class GreyYouMain {
  adventures: GreyAdventurer;
  private reachedTower: string = "_greyReachedTower";
  svn_name = "libraryaddict-Greyday-branches-release";
  git_name = "libraryaddict-Greyday-release";

  isRevisionPass(): boolean {
    const required = 26829;

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

    const color = myPath() == Path.get("Grey You") ? "blue" : "red";

    if (color == "red") {
      print("You are not in Grey You, and cannot use these commands.", "gray");
    }

    print(
      "run <Turns> - Run X amount of turns, or 999 if turns are not provided",
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

    if (
      lastCommitHash !== undefined &&
      (svnExists(this.svn_name) || gitExists(this.git_name))
    ) {
      if (
        gitExists(this.git_name)
          ? !gitAtHead(this.git_name)
          : !svnAtHead(this.svn_name)
      ) {
        print(
          'A newer version of this script is available and can be obtained with "git update".',
          "red"
        );
      } else {
        print("This script is up to date.", "blue");
      }
    }
  }

  handleCommand(command: string) {
    command = command.toLowerCase();

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

    if (command.includes("require")) {
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
      command != "sim" &&
      command != "status"
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

    if (myPath() != Path.get("Grey You")) {
      print(
        "You're not in grey you. Use 'help' to see what you can use.",
        "red"
      );
      return;
    }

    if (currentRound() != 0 || handlingChoice()) {
      visitUrl("main.php");

      if (currentRound() != 0 || handlingChoice()) {
        print(
          "In a fight or in a choice, please resolve before continuing..",
          "red"
        );
        return;
      }
    }

    if (getProperty("greyBreakAtTower") == "") {
      print(
        "The 'greyBreakAtTower' setting has not been set, the script will break when it reaches the tower.",
        "red"
      );
    }

    this.adventures = new GreyAdventurer();
    const s = command.split(" ");

    if (command == "absorbs") {
      this.adventures.adventureFinder.absorbs.printRemainingAbsorbs();
      return;
    }

    this.adventures.adventureFinder.calculatePath();

    if (this.adventures.adventureFinder.path == null) {
      print("Failed to find a way to accomplish Greyday!", "red");
      return;
    }

    if (command == "status") {
      this.adventures.adventureFinder.start(true);
      this.adventures.adventureFinder.possibleAdventures.sort((a1, a2) => {
        if ((a1.quest == null) != (a2.quest == null)) {
          return a1.quest == null ? 1 : -1;
        }

        if (a1.quest != null) {
          return a1.quest.getId().localeCompare(a2.quest.getId());
        }

        if (a1.status != a2.status) {
          return a1.status - a2.status;
        }

        if (a1.considerPriority != a2.considerPriority) {
          return a1.considerPriority - a2.considerPriority;
        }

        return 0;
      });

      this.adventures.adventureFinder.printStatus(
        this.adventures.adventureFinder.possibleAdventures
      );
      return;
    } else if (command == "sim") {
      this.adventures.runTurn(false);
      return;
    } else if (s[0] == "go" || s[0] == "run") {
      const turns = toInt(s[1] || "999");

      const effect: Effect = Effect.get("Beaten Up");
      let lastBeaten: number = haveEffect(effect);

      const timings = new GreyTimings();
      let turnsRunAsFar: number = 0;

      if (turns > 0) {
        timings.doStart();
      }

      const pullsBeforeStart = getProperty("_roninStoragePulls");

      const props = new PropertyManager();
      props.setProperty("autoSatisfyWithNPCs", "true");
      props.setProperty("autoSatisfyWithCoinmasters", "true");

      const autoAttack = getAutoAttack();

      if (autoAttack != 0) {
        setAutoAttack(0);
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

          if (handlingChoice() || currentRound() != 0) {
            visitUrl("main.php");
            if (handlingChoice() || currentRound() != 0) {
              print(
                "I'm currently in a choice or combat, this is unexpected!",
                "red"
              );
              break;
            }
          }
        }
      } finally {
        if (turns > 0) {
          timings.doEnd();
        }

        props.resetAll();

        const extraPulls = getProperty(
          getProperty("_roninStoragePulls").replace(pullsBeforeStart, "")
        )
          .split(",")
          .filter((s) => s.length > 0);

        const greyPulls = getProperty("_greyPulls")
          .split(",")
          .filter((s) => s.length > 0);

        for (const p of extraPulls) {
          if (greyPulls.includes(p)) {
            continue;
          }

          greyPulls.push(p);
        }

        if (greyPulls.length > 0) {
          setProperty("_greyPulls", greyPulls.join(","));
        }

        print(
          "Time to run this script as far today is: " +
            timings.getTimeAsString(timings.getTotalSeconds()),
          "blue"
        );

        if (autoAttack != 0) {
          setAutoAttack(autoAttack);
        }
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
  const pulls: Item[] = getProperty("_greyPulls")
    .split(",")
    .map((s) => toItem(toInt(s)));
  const playerPulls: Item[] = getProperty("_roninStoragePulls")
    .split(",")
    .map((s) => toItem(toInt(s)))
    .filter((i) => !pulls.includes(i));

  if (!GreySettings.isHardcoreMode()) {
    print(
      `Greyday pulled ${pulls.length} of allowed ${
        GreySettings.greyPullsLimit
      } pulls. ${pullsRemaining()} total pull${
        pullsRemaining() == 1 ? "" : "s"
      } remain..`,
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

  if (playerPulls.length > 0) {
    print(
      `Player pulled: ${playerPulls.length} items, ${playerPulls.join(", ")}`
    );
  }

  print("Greyday Pulls: " + pulls.map((i) => i.name).join(", "), "gray");
}

export function main(parameter: string = "") {
  new GreyYouMain().handleCommand(parameter);
}
