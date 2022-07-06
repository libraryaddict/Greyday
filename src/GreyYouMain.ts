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
  toInt,
  waitq,
} from "kolmafia";
import { GreyAdventurer } from "./GreyAdventurer";
import { QuestRegistry } from "./quests/QuestRegistry";
import { hasBanished, BanishType } from "./utils/Banishers";
import { GreyRequirements } from "./utils/GreyResources";

class GreyYouMain {
  adventures: GreyAdventurer;

  handleCommand(command: string) {
    if (getRevision() < 26535) {
      print(
        `Please update your mafia. You are using ${getRevision()} but we need at least r26535`,
        "red"
      );
      return;
    }

    if (
      availableAmount(Item.get("hewn moon-rune spoon")) > 0 &&
      getProperty("greyTuneMoonSpoon") == ""
    ) {
      print(
        "Did you know you can set 'greyTuneMoonSpoon' to a moon sign, and it'll auto tune when it's finished? Currently only tested with Knoll > Gnomes, tell Irrat if you wanted canadia and he'll get around to it.",
        "red"
      );
    }

    if (getProperty("greyBreakAtTower") == "") {
      print(
        "'greyBreakAtTower' hasn't been set, setting it to true will mean when it hits the tower, the script will exit to be continued later.",
        "gray"
      );
    }

    if (command == "required") {
      new GreyRequirements().hasRequired();
      return;
    }

    if (command == "resources") {
      let finder = new GreyAdventurer().adventureFinder;

      finder.doResourceClaims();
      finder.noteResourceClaims();
      return;
    }

    if (myPath() != "Grey You") {
      print(
        "You're not in grey you. Use 'required' to get requirements.",
        "red"
      );
      return;
    }

    this.adventures = new GreyAdventurer();
    let s = command.split(" ");

    if (command == "absorbs") {
      this.adventures.adventureFinder.absorbs.printRemainingAbsorbs();
      return;
    } else if (command == "sim") {
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
        lastBeaten = haveEffect(effect);
        let run = this.adventures.runTurn(true);

        if (!run) {
          break;
        }
      }

      print("Done running", "blue");
      return;
    }

    print("Provide absorbs, go or sim");
  }
}

export function main(parameter: string = "") {
  new GreyYouMain().handleCommand(parameter);
}
