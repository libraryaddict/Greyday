import {
  availableAmount,
  choiceFollowsFight,
  currentRound,
  Effect,
  fightFollowsChoice,
  gamedayToInt,
  getAutoAttack,
  getIgnoreZoneWarnings,
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
  visitUrl,
  waitq,
} from "kolmafia";
import { GreyAdventurer } from "./GreyAdventurer";
import { getQuestStatus } from "./quests/Quests";
import { getResources } from "./typings/ResourceTypes";
import { FigureOutPath } from "./typings/TaskManager";
import { BanishType, getBanished } from "./utils/Banishers";
import { AbsorbsProvider } from "./utils/GreyAbsorber";
import { hasVIPInvitation, hasWhitelistToCurrentClan } from "./utils/GreyClan";
import { GreyRequirements } from "./utils/GreyResources";
import { getGreySettings, GreySettings } from "./utils/GreySettings";
import { GreyTimings } from "./utils/GreyTimings";
import { centerText } from "./utils/GreyUtils";
import { PropertyManager } from "./utils/Properties";
import { lastCommitHash } from "./_git_commit";

class GreyYouMain {
  adventures: GreyAdventurer;
  svn_name = "libraryaddict-Greyday-branches-release";
  git_name = "libraryaddict-Greyday-release";

  isRevisionPass(): boolean {
    const required = 27132;

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

      const val = getProperty(setting.property);

      html += `<font color='blue'>${setting.property}</font> - <font color='gray'>${setting.description}</font>`;
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

    this.clickThis();
  }

  clickThis() {
    printHtml(
      "It's easiest to use the <a href='relay_Greyday.js?relay=true'><u>relay page</u></a>"
    );
  }

  doHelp() {
    printHtml(centerText("======================================"));
    print("help - Shows this message", "blue");
    printHtml(
      "<font color='blue'>settings - Manage settings (Try the <a color='purple' href='relay_Greyday.js?relay=true'><u>relay page</u></a> instead!)</font>"
    );
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

    if (
      currentRound() != 0 ||
      handlingChoice() ||
      choiceFollowsFight() ||
      fightFollowsChoice()
    ) {
      visitUrl("main.php");

      if (currentRound() != 0 || handlingChoice()) {
        print(
          "In a fight or in a choice, please resolve before continuing..",
          "red"
        );
        return;
      }

      if (
        currentRound() == 0 &&
        !handlingChoice() &&
        !fightFollowsChoice() &&
        !fightFollowsChoice()
      ) {
        if (getProperty("lastIcehouseCheck") != gamedayToInt().toString()) {
          visitUrl("museum.php?action=icehouse");
          setProperty("lastIcehouseCheck", gamedayToInt().toString());
        }
      }
    }

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

    const banishedAbsorbs = AbsorbsProvider.loadAbsorbs(true).filter(
      (absorb) =>
        getBanished().find(
          (b) =>
            b.banisher.type == BanishType.ICE_HOUSE &&
            b.monster == absorb.monster
        ) != null
    );

    if (banishedAbsorbs.length > 0) {
      print(
        "Your Ice House contains a monster we'd like to absorb! Please release them.. " +
          banishedAbsorbs.map((a) => a.monster).join(", "),
        "red"
      );
      waitq(1);
    }

    if (command.includes("require")) {
      new GreyRequirements().hasRequired();
      return;
    }

    if (command == "settings") {
      this.doSettings();
      return;
    }

    if (command == "unprime") {
      for (const resource of getResources()) {
        if (resource.primed == null || !resource.primed()) {
          continue;
        }

        resource.unprime();
        print("Unprimed " + resource.name);
      }

      print("Unprimed resources.", "blue");
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
      const val = getProperty(setting.property);

      if (val == "" || setting.valid(val)) {
        continue;
      }

      printHtml(
        "<font color='red'>The setting '" +
          setting.property +
          "' is invalid, please correct this or set it to empty. To reset it, use the CLI command <font color='blue'>set " +
          setting.property +
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

    if (
      getProperty("greyBreakAtTower") == "" &&
      !GreySettings.isHardcoreMode()
    ) {
      print(
        "The 'greyBreakAtTower' setting has not been set, the script will break when it reaches the tower.",
        "red"
      );
    }

    if (hasVIPInvitation() && !hasWhitelistToCurrentClan()) {
      print(
        "Do you not have a whitelist to your current clan, some VIP Invitation stuff will not work. You should ask for a whitelist so this script can switch clans as required.",
        "red"
      );
    }

    if (
      GreySettings.greyValueOfAdventure < 1000 &&
      getProperty("greyValueOfAdventure") == ""
    ) {
      print(
        "Your value of a grey adventure is low.. It claims you value each adventure at " +
          GreySettings.greyValueOfAdventure +
          ", which means you'd be happier if you could trade each adventure for " +
          GreySettings.greyValueOfAdventure +
          " meat than run that adventure yourself. You can set `greyValueOfAdventure` if your valueOfAdventure is correct.",
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

      try {
        props.setProperty("autoSatisfyWithNPCs", "true");
        props.setProperty("autoSatisfyWithMall", "true");
        props.setProperty("autoSatisfyWithStorage", "true");
        props.setProperty("autoSatisfyWithCoinmasters", "true");
        props.setProperty("requireBoxServants", "false");

        const autoAttack = getAutoAttack();

        if (autoAttack != 0) {
          props.addCleanup(() => setAutoAttack(autoAttack));
          setAutoAttack(0);
        }

        if (!getIgnoreZoneWarnings()) {
          props.addCleanup(() =>
            visitUrl(
              "account.php?am=1&pwd&action=flag_ignorezonewarnings&value=0&ajax=1",
              true
            )
          );

          visitUrl(
            "account.php?am=1&pwd&action=flag_ignorezonewarnings&value=1&ajax=1",
            true
          );
        }

        for (
          ;
          turnsRunAsFar < turns && haveEffect(effect) - lastBeaten != 3;
          turnsRunAsFar++
        ) {
          if (shouldGreydayStop()) {
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
      }

      if (haveEffect(effect) - lastBeaten == 3) {
        print("Oh no! We were beaten up..", "red");
      }

      print("Done running", "blue");
      return;
    }
  }
}

let stopped = false;
const reachedTower: string = "_greyReachedTower";

export function shouldGreydayStop(): boolean {
  if (stopped) {
    return stopped;
  }

  if (
    GreySettings.greyBreakAtTower &&
    getProperty(reachedTower) != "true" &&
    getQuestStatus("questL13Final") >= 0
  ) {
    setProperty(reachedTower, "true");
    visitUrl("place.php?whichplace=nstower");

    print(
      "We've reached the tower! Now aborting script as set by preference 'greyBreakAtTower'!",
      "blue"
    );
    print("The script will continue when you run the script again.");

    const turnsToFarmScore =
      availableAmount(Item.get("digital key")) > 0 ||
      getProperty("nsTowerDoorKeysUsed").includes("digital key")
        ? 0
        : Math.max(
            0,
            Math.ceil((10_000 - toInt(getProperty("8BitScore"))) / 375)
          );

    if (turnsToFarmScore > 0) {
      setProperty("_greyPixelRealmAdventures", turnsToFarmScore.toString());

      print(
        `Please note that Greyday expects to take an extra ${turnsToFarmScore} adventures to finish farming a digital key up in 8 bit realm, which is generally faster with full equipment access.`,
        "red"
      );
    }

    printEndOfRun();
    stopped = true;
    return true;
  }

  if (getProperty("greyday_interrupt") == "true") {
    setProperty("greyday_interrupt", "false");
    print("Interrupt requested as per relay page", "red");
    stopped = true;
    return true;
  }

  return false;
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
