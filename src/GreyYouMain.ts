import {
  Effect,
  haveEffect,
  myPath,
  myTurncount,
  pathIdToName,
  print,
  toInt,
} from "kolmafia";
import { BanishType, getBanished } from "../utils/Banishers";
import { GreyAdventurer } from "./GreyAdventurer";
import { QuestRegistry } from "./quests/QuestRegistry";

class GreyYouMain {
  adventures: GreyAdventurer = new GreyAdventurer();

  handleCommand(command: string) {
    if (command == "test") {
      new QuestRegistry();
      return;
    }

    if (myPath() != "Grey You") {
      throw "You're not in grey you";
    }

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
