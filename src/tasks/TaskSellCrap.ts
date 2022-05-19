import { autosell, Item, itemAmount, use } from "kolmafia";
import { Task } from "./Tasks";

export class TaskSellCrap implements Task {
  autosells: Item[] = ["dense meat stack", "meat stack"].map((s) =>
    Item.get(s)
  );
  autouse: Item[] = [
    "Ancient Vinyl Coin Purse",
    "Black Pension Check",
    "CSA Discount Card",
    "Fat Wallet",
    "Gathered Meat-Clip",
    "Old Leather Wallet",
    "Penultimate Fantasy Chest",
    "Pixellated Moneybag",
    "Old Coin Purse",
    "Shiny Stones",
  ].map((s) => Item.get(s));

  run(): void {
    for (let i of this.autosells) {
      if (itemAmount(i) == 0) {
        continue;
      }

      autosell(itemAmount(i), i);
    }

    for (let i of this.autouse) {
      if (itemAmount(i) == 0) {
        continue;
      }

      use(itemAmount(i), i);
    }
  }
}
