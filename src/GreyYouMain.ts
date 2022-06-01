import {
  Effect,
  getRevision,
  haveEffect,
  myLocation,
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
    if (getRevision() < 26419) {
      print(
        `Please update your mafia. You are using ${getRevision()} but we need at least r26419`,
        "red"
      );
      return;
    }

    if (command == "required") {
      new GreyRequirements().hasRequired();
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

    if (command == "sim") {
      this.adventures.runTurn(false);
    } else if (command != null) {
      let s = command.split(" ");

      if (s[0] == "go" || s[0] == "run") {
        let turns = 1;

        if (s[1] != null) {
          turns = toInt(s[1]);
        }

        for (
          let i = 0;
          i < turns && haveEffect(Effect.get("Beaten Up")) == 0;
          i++
        ) {
          let run = this.adventures.runTurn(true);

          if (!run) {
            break;
          }
        }

        print("Done running", "blue");
        return;
      }
    }

    print("Provide go or sim");
  }
}

export function main(parameter: string) {
  new GreyYouMain().handleCommand(parameter);
}
