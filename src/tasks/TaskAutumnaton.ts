import {
  availableAmount,
  availableChoiceOptions,
  cliExecute,
  getProperty,
  handlingChoice,
  Item,
  lastChoice,
  Location,
  myLocation,
  print,
  toInt,
  visitUrl,
} from "kolmafia";
import { getQuestStatus } from "../quests/Quests";
import { Task } from "./Tasks";

export class TaskAutumnaton implements Task {
  item: Item;
  skipFor: number = 0;
  toGrab: ValidItem[];

  constructor() {
    visitUrl("desc_item.php?whichitem=174185886");
    this.item = Item.get("Autumn-aton");

    this.createItems();
  }

  run(): void {
    if (availableAmount(this.item) == 0) {
      return;
    }

    if (this.skipFor-- > 0) {
      return;
    }

    let validLocs: number[];

    const getValid = () => {
      if (validLocs == null) {
        validLocs = [];
        let page = visitUrl("inv_use.php?pwd&whichitem=10954");
        let match: string[];

        while ((match = page.match(/<option {2}value="(\d+)">/)) != null) {
          page = page.replace(match[0], "");

          validLocs.push(toInt(match[1]));
        }
      }

      return validLocs;
    };

    for (const valid of this.toGrab) {
      if (valid.loc.turnsSpent <= 0 || myLocation() == valid.loc) {
        continue;
      }

      if (availableAmount(valid.item) >= valid.amount) {
        continue;
      }

      if (valid.viable != null && !valid.viable()) {
        continue;
      }

      if (!getValid().includes(toInt(valid.loc))) {
        continue;
      }

      if (!handlingChoice()) {
        throw "Expected to be handling the aton choice";
      }

      if (lastChoice() != 1483) {
        throw "Expected to be in aton choice";
      }

      if (availableChoiceOptions()[1] != null) {
        print("Beep Boop, now upgrading autumn-aton", "blue");
        print(
          "Autumn-aton upgrade will: " + availableChoiceOptions()[1],
          "blue"
        );
        visitUrl("choice.php?option=1&pwd&whichchoice=1483");
      }

      visitUrl(
        "choice.php?option=2&pwd&whichchoice=1483&heythereprogrammer=" +
          toInt(valid.loc)
      );

      print(
        `Sending Autumn-aton on a glorious quest to acquire ${valid.item} from ${valid.loc}`,
        "blue"
      );

      if (handlingChoice()) {
        throw "Unexpectedly still handling a choice!";
      }

      cliExecute("refresh inventory");

      return;
    }

    // Failed to find a place to go
    this.skipFor = 3;

    // If we are in the choice, just quit
    if (handlingChoice()) {
      visitUrl("main.php");
    }
  }

  createItems() {
    this.toGrab = [];

    this.toGrab.push({
      loc: Location.get("The Copperhead Club"),
      item: Item.get("Crappy Waiter Disguise"),
      amount: 5,
      viable: () => getQuestStatus("questL11Shen") < 5,
    });

    this.toGrab.push({
      loc: Location.get("A Mob Of Zeppelin Protesters"),
      item: Item.get("cigarette lighter"),
      amount: 10,
      viable: () => getQuestStatus("questL11Ron") <= 1,
    });

    this.toGrab.push({
      loc: Location.get("The Penultimate Fantasy Airship"),
      item: Item.get("Mohawk Wig"),
      amount: 1,
      viable: () => getQuestStatus("questL10Garbage") <= 9,
    });

    this.toGrab.push({
      loc: Location.get("The Penultimate Fantasy Airship"),
      item: Item.get("Amulet of Extreme Plot Significance"),
      amount: 1,
      viable: () => getQuestStatus("questL10Garbage") <= 6,
    });

    this.toGrab.push({
      loc: Location.get("The Beanbat Chamber"),
      item: Item.get("Enchanted Bean"),
      amount: 1,
      viable: () => getQuestStatus("questL10Garbage") <= 0,
    });

    /* this.toGrab.push({
      loc: Location.get("The Goatlet"),
      item: Item.get("Goat Cheese"),
      amount: 3,
      viable: () => getQuestStatus("questL08Trapper") <= 1,
    });*/

    this.toGrab.push({
      loc: Location.get("The Hidden Bowling Alley"),
      item: Item.get("bowling ball"),
      amount: 5,
      viable: () =>
        getProperty("questL11Spare") != "finished" &&
        availableAmount(Item.get("bowling ball")) -
          toInt(getProperty("hiddenBowlingAlleyProgress")) >
          5,
    });

    this.toGrab.push({
      loc: Location.get("The Haunted Library"),
      item: Item.get("tattered scrap of paper"),
      amount: 300,
    });

    this.toGrab.push({
      loc: Location.get("Guano Junction"),
      item: Item.get("sonar-in-a-biscuit"),
      amount: 1,
      viable: () => getQuestStatus("questL04Bat") <= 2,
    });
  }
}

interface ValidItem {
  loc: Location;
  item: Item;
  amount: number;
  viable?: () => boolean;
}
