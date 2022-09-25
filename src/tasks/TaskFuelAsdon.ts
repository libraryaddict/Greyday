import {
  availableAmount,
  buy,
  cliExecute,
  getFuel,
  getInventory,
  getProperty,
  getWorkshed,
  haveOutfit,
  historicalPrice,
  Item,
  mallPrice,
  myAscensions,
  myMeat,
  toInt,
  use,
} from "kolmafia";
import { getQuestStatus } from "../quests/Quests";
import { Task } from "./Tasks";

export class TaskFuelAsdon implements Task {
  sodaBread = Item.get("Loaf of Soda Bread");
  eachFuelWorth: number = 24; // We pay 50 + 70 meat for a loaf of bread = 5-7 fuel. So at worst, 24 meat per fuel and best is 17.14. Lets go with 24.
  invalidFuels: Item[] = [];
  asdonMartin: Item = Item.get("Asdon Martin keyfob");
  flower: Item = Item.get("All-purpose flower");
  dough: Item = Item.get("Wad of Dough");

  run(): void {
    if (
      myMeat() < 8000 ||
      getWorkshed() != this.asdonMartin ||
      getQuestStatus("questL11Black") < 2
    ) {
      return;
    }

    if (getFuel() >= 150) {
      return;
    }

    if (!this.canMakeBread()) {
      return;
    }

    while (myMeat() > 4500 && getFuel() < 50) {
      // Each soda bread is worth 5-7 so lets always keep 50 / 6 = 9ish on hand
      const toUse = Math.ceil((50 - getFuel()) / 6);
      this.acquireBread(toUse);

      cliExecute("asdonmartin fuel " + toUse + " " + this.sodaBread);
    }
  }

  acquireBread(amount: number) {
    if (haveOutfit("bugbear costume")) {
      return;
    }

    while (myMeat() > 2000 && availableAmount(this.dough) < amount) {
      buy(this.flower);
      use(this.flower);
    }
  }

  canMakeBread(): boolean {
    return (
      haveOutfit("Bugbear Costume") ||
      (myAscensions() > 10 &&
        toInt(getProperty("lastDesertUnlock")) == myAscensions() &&
        myMeat() > 2000)
    );
  }

  getAvailableItems(): [Item, number, number][] {
    // Returns <Item, Amount, Each Fuel Worth in Mall>
    const items: [Item, number, number][] = [];

    for (const [itemName, amount] of Object.entries(getInventory())) {
      const item = Item.get(itemName);

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

      const advs = toInt(item.adventures.split("-")[0]);
      const costPerFuel = histPrice / advs;

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
