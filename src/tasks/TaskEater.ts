import {
  chew,
  drink,
  drinksilent,
  eat,
  eatsilent,
  getInventory,
  getProperty,
  historicalPrice,
  Item,
  myLevel,
  print,
  pullsRemaining,
  setProperty,
  toInt,
} from "kolmafia";
import { Task } from "./Tasks";

export class TaskEater implements Task {
  prop: string = "_greyEatenToday";

  constructor() {
    if (getProperty(this.prop) == "") {
      let dontEat: Item[] = [];
      // Goat cheese quest
      dontEat.push(Item.get("Goat Cheese"));

      // Are you sure you want to eat this bla bla
      // Suppress that annoying "pvp stone no brokey??"
      dontEat.push(Item.get("Can of Red Minotaur"));

      // Palin quest items
      dontEat.push(Item.get("Stunt Nuts"));
      dontEat.push(Item.get("Wet Stew"));

      // Azeal booze quest items
      dontEat.push(Item.get("Giant marshmallow"));
      dontEat.push(Item.get("Booze-soaked cherry"));
      dontEat.push(Item.get("Sponge cake"));
      dontEat.push(Item.get("Gin-soaked blotter paper"));

      setProperty(this.prop, dontEat.map((s) => toInt(s)).join(","));
    }
  }

  run() {
    if (pullsRemaining() == -1) {
      return;
    }

    let eaten: string[] = getProperty(this.prop).split(",");

    for (let i of Object.keys(getInventory())) {
      let item = Item.get(i);

      if (item.fullness == 0 && item.inebriety == 0 && item.spleen == 0) {
        continue;
      }

      if (item.levelreq > myLevel() || !item.tradeable || item.quest) {
        continue;
      }

      if (eaten.includes(toInt(item) + "") || historicalPrice(item) > 4000) {
        continue;
      }

      if (item.fullness > 0) {
        eatsilent(item);
      } else if (item.inebriety > 0) {
        drinksilent(item);
      } else if (item.spleen > 0) {
        chew(item);
      }

      eaten.push(toInt(item).toString());
    }

    setProperty(this.prop, eaten.join(","));
  }

  tryMakeCraftables() {}
}
