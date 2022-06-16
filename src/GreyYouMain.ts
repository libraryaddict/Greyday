import {
  Effect,
  getRevision,
  haveEffect,
  lastChoice,
  myHp,
  myLocation,
  myMaxhp,
  myPath,
  myTurncount,
  pathIdToName,
  print,
  toInt,
} from "kolmafia";
import { GreyAdventurer } from "./GreyAdventurer";
import { QuestRegistry } from "./quests/QuestRegistry";
import { hasBanished, BanishType } from "./utils/Banishers";
import { GreyRequirements } from "./utils/GreyResources";

class GreyYouMain {
  adventures: GreyAdventurer;

  handleCommand(command: string) {
    if (getRevision() < 26499) {
      print(
        `Please update your mafia. You are using ${getRevision()} but we need at least r26499`,
        "red"
      );
      return;
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
