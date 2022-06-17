import {
  availableAmount,
  buy,
  cliExecute,
  getFuel,
  getInventory,
  getWorkshed,
  haveOutfit,
  historicalPrice,
  Item,
  mallPrice,
  myMeat,
  toInt,
} from "kolmafia";
import { getQuestStatus } from "../quests/Quests";
import { Task } from "./Tasks";

export class TaskFuelAsdon implements Task {
  sodaBread = Item.get("Loaf of Soda Bread");
  eachFuelWorth: number = 24; // We pay 50 + 70 meat for a loaf of bread = 5-7 fuel. So at worst, 24 meat per fuel and best is 17.14. Lets go with 24.
  invalidFuels: Item[] = [];
  asdonMartin: Item = Item.get("Asdon Martin keyfob");

  run(): void {
    if (
      myMeat() < 8000 ||
      getWorkshed() != this.asdonMartin ||
      getQuestStatus("questL11Black") < 2
    ) {
      return;
    }

    if (getFuel() >= 150 || !haveOutfit("Bugbear Costume")) {
      return;
    }

    while (myMeat() > 1500 && getFuel() < 50) {
      // Each soda bread is worth 5-7 so lets always keep 50 / 6 = 9ish on hand
      let toUse = Math.ceil((50 - getFuel()) / 6);

      cliExecute("asdonmartin fuel " + toUse + " " + this.sodaBread);
    }
  }

  getAvailableItems(): [Item, number, number][] {
    // Returns <Item, Amount, Each Fuel Worth in Mall>
    let items: [Item, number, number][] = [];

    for (let [itemName, amount] of Object.entries(getInventory())) {
      let item = Item.get(itemName);

      if (this.invalidFuels.includes(item)) {
        continue;
      }

      if (item.fullness == 0 && item.inebriety == 0) {
        this.invalidFuels.push(item);
        continue;
      }

      if (item.quest || !item.tradeable || item.gift) {
        this.invalidFuels.push(item);
        continue;
      }

      let histPrice = historicalPrice(item);

      if (histPrice <= 10) {
        continue;
      }

      if (!item.adventures.match(/^[0-9]+(-[0-9]+)?$/)) {
        this.invalidFuels.push(item);
        continue;
      }

      // Make sure we don't consume something great
      if (
        item.quality != "crappy" &&
        item.quality != "decent" &&
        item.quality != "good"
      ) {
        histPrice = Math.max(histPrice, mallPrice(item));
      }

      let advs = toInt(item.adventures.split("-")[0]);
      let costPerFuel = histPrice / advs;

      // If the fuel would cost more than soda bread..
      if (costPerFuel > this.eachFuelWorth) {
        this.invalidFuels.push(item);
        continue;
      }

      items.push([item, amount, costPerFuel]);
    }

    return items;
  }
}
