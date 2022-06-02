import { autosell, Item, itemAmount, myMeat, use } from "kolmafia";
import { Task } from "./Tasks";

export class TaskSellCrap implements Task {
  autosells: Item[] = ["dense meat stack", "meat stack"].map((s) =>
    Item.get(s)
  );
  junk: Item[] = [
    "adder bladder",
    "loose teeth",
    "skeleton bone",
    "bottle of whiskey",
    "cranberries",
    "spiked femur",
    "batgut",
    "bat wing",
    "bone flute",
    "bottle of rum",
    "bottle of tequila",
    "spooky stick",
    "tequila grenade",
    "ancient frozen dinner",
    "accidental cider",
    "bottle of gin",
  ].map((s) => Item.get(s));
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
    if (myMeat() > 15000) {
      return;
    }

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

    for (let i of this.junk) {
      if (itemAmount(i) <= 1) {
        continue;
      }

      autosell(itemAmount(i) - 1, i);
    }
  }
}
