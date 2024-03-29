import {
  autosell,
  availableAmount,
  Item,
  itemAmount,
  myMeat,
  print,
  pullsRemaining,
  use,
} from "kolmafia";
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
    "imp ale",
    "hot wing",
    "hellion cube",
    "hot katana blade",
    "ice-cold Willer",
    "lihc eye",
    "snifter of thoroughly aged brandy",
    "wussiness potion",
    "ancient pills",
    "Fat stacks of cash",
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
    "Briefcase",
  ].map((s) => Item.get(s));
  teachersPen: Item = Item.get("Teacher's Pen");

  run(): void {
    const count = availableAmount(this.teachersPen);

    if (count > 1) {
      if (
        count > 2 &&
        itemAmount(this.teachersPen) > 0 &&
        pullsRemaining() >= 0
      ) {
        print(
          "Selling a Teacher's Pen because Irrat is too lazy to handle too much accessories with +fam exp"
        );
        autosell(this.teachersPen, 1);
      }
    }

    if (myMeat() > 15000) {
      return;
    }

    for (const i of this.autosells) {
      if (itemAmount(i) == 0) {
        continue;
      }

      autosell(itemAmount(i), i);
    }

    for (const i of this.autouse) {
      if (itemAmount(i) == 0) {
        continue;
      }

      use(itemAmount(i), i);
    }

    for (const i of this.junk) {
      if (itemAmount(i) <= 1) {
        continue;
      }

      autosell(itemAmount(i) - 1, i);
    }
  }
}
