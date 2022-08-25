import {
  availableAmount,
  canadiaAvailable,
  chew,
  cliExecute,
  drinksilent,
  eatsilent,
  getInventory,
  getProperty,
  gnomadsAvailable,
  historicalPrice,
  Item,
  itemAmount,
  myLevel,
  myMeat,
  pullsRemaining,
  putCloset,
  setProperty,
  toInt,
  visitUrl,
} from "kolmafia";
import { getQuestStatus } from "../quests/Quests";
import { Task } from "./Tasks";

export class TaskEater implements Task {
  prop: string = "_greyEatenToday";
  npcFoods: Item[] = [
    "Hot buttered roll",
    "Ketchup",
    "Catsup",
    "cup of lukewarm tea",
    "Fortune Cookie",
    "Pickled Egg",
  ].map((s) => Item.get(s));
  keepOnHand: Item[] = ["Bunch of square grapes", "Boxed Wine"].map((s) =>
    Item.get(s)
  );
  blackberry: Item = Item.get("Blackberry");
  seasoning: Item = Item.get("Special Seasoning");

  constructor() {
    if (getProperty(this.prop) == "") {
      const dontEat: Item[] = [];
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

      // Protesters quest item
      dontEat.push(Item.get("Unnamed cocktail"));
      dontEat.push(Item.get("Flamin' Whatshisname"));

      // Insufficient level
      dontEat.push(Item.get("Pie man was not meant to eat"));

      setProperty(this.prop, dontEat.map((s) => toInt(s)).join(","));
    }
  }

  doAlwaysAvailable(eaten: string[]) {
    if (myMeat() < 2000) {
      return;
    }

    for (const item of this.npcFoods) {
      const id = toInt(item).toString();

      if (eaten.includes(id)) {
        continue;
      }

      cliExecute("acquire 1 " + item.name);
    }
  }

  doTavern() {
    if (getProperty("questL03Rat") != "finished" || myMeat() < 2000) {
      return;
    }
  }

  doChez(eaten: string[]) {
    if (!canadiaAvailable() || myMeat() < 2000) {
      return;
    }

    const daily = toInt(Item.get(getProperty("_dailySpecial"))).toString();

    if (eaten.includes(daily)) {
      return;
    }

    eaten.push(daily);

    for (const itemId of ["-1", "-2", "-3", daily]) {
      visitUrl("cafe.php?cafeid=1&pwd=&action=CONSUME!&whichitem=" + itemId);
    }
  }

  doGnomes(eaten: string[]) {
    if (!gnomadsAvailable() || myMeat() < 2000) {
      return;
    }

    const daily = toInt(Item.get(getProperty("_dailySpecial"))).toString();

    if (eaten.includes(daily)) {
      return;
    }

    eaten.push(daily);

    for (const itemId of ["-1", "-2", "-3", daily]) {
      visitUrl("cafe.php?cafeid=2&pwd=&action=CONSUME!&whichitem=" + itemId);
    }
  }

  run() {
    if (pullsRemaining() == -1) {
      return;
    }

    const eaten: string[] = getProperty(this.prop).split(",");

    this.doAlwaysAvailable(eaten);
    this.doChez(eaten);
    this.doGnomes(eaten);

    for (const i of Object.keys(getInventory())) {
      const item = Item.get(i);

      if (item.fullness == 0 && item.inebriety == 0 && item.spleen == 0) {
        continue;
      }

      if (availableAmount(item) <= 1 && this.keepOnHand.includes(item)) {
        continue;
      }

      if (item.levelreq > myLevel() || !item.tradeable || item.quest) {
        continue;
      }

      if (eaten.includes(toInt(item) + "") || historicalPrice(item) > 4000) {
        continue;
      }

      if (item == this.blackberry && getQuestStatus("questL11Black") <= 1) {
        continue;
      }

      if (item.fullness > 0) {
        if (itemAmount(this.seasoning) > 0) {
          putCloset(itemAmount(this.seasoning), this.seasoning);
        }

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
