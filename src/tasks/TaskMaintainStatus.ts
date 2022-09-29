import {
  availableAmount,
  blackMarketAvailable,
  buy,
  cliExecute,
  dispensaryAvailable,
  Effect,
  getProperty,
  haveEffect,
  Item,
  itemAmount,
  myHp,
  myMaxhp,
  myMaxmp,
  myMeat,
  myMp,
  print,
  Skill,
  toInt,
  useSkill,
} from "kolmafia";
import { getQuestStatus } from "../quests/Quests";
import { Task } from "./Tasks";

interface Restorer {
  item: Item;
  mpRestored: number;
  hpRestored: number;
  available: () => boolean;
  price: number;
}

export class TaskMaintainStatus implements Task {
  restorers: Restorer[] = [];
  toRemove: Effect[] = [
    "Really Quite Poisoned",
    "Majorly Poisoned",
    "Somewhat Poisoned",
    "A Little Bit Poisoned",
    "Hardly Poisoned at All",
    "Temporary Amnesia",
  ].map((s) => Effect.get(s));
  antidote: Item = Item.get("anti-anti-antidote");

  fillRestorers() {
    this.restorers.push({
      item: Item.get("Psychokinetic energy blob"),
      mpRestored: 25,
      hpRestored: 0,
      available: () =>
        availableAmount(Item.get("Psychokinetic energy blob")) > 0,
      price: 0,
    });
    this.restorers.push({
      item: Item.get("Knob Goblin seltzer"),
      mpRestored: 11,
      hpRestored: 0,
      available: () =>
        dispensaryAvailable() ||
        availableAmount(Item.get("Knob Goblin seltzer")) > 0,
      price: 80,
    });
    this.restorers.push({
      item: Item.get("Black cherry soda"),
      mpRestored: 11,
      hpRestored: 0,
      available: () =>
        blackMarketAvailable() ||
        availableAmount(Item.get("Black cherry soda")) > 0,
      price: 80,
    });
    this.restorers.push({
      item: Item.get("Doc Galaktik's Invigorating Tonic"),
      mpRestored: 11,
      hpRestored: 0,
      available: () => true,
      price: 90,
    });

    // HP
    this.restorers.push({
      item: Item.get("Cast"),
      mpRestored: 0,
      hpRestored: 30,
      available: () => availableAmount(Item.get("Cast")) > 0,
      price: 0,
    });

    this.restorers.push({
      item: Item.get("Doc Galaktik's Homeopathic Elixir"),
      mpRestored: 0,
      hpRestored: 19,
      available: () => true,
      price: 120,
    });

    this.restorers.push({
      item: Item.get("Doc Galaktik's Pungent Unguent"),
      mpRestored: 0,
      hpRestored: 4,
      available: () => true,
      price: 0,
    });
  }

  constructor() {
    this.fillRestorers();
  }

  restoreHPTo(hp: number): boolean {
    const desiredHp = Math.min(hp, myMaxhp());

    while (myMeat() > 100 && myHp() < desiredHp) {
      let restorer = this.restorers.find(
        (r) => availableAmount(r.item) > 0 && r.hpRestored > 0
      );

      if (restorer == null) {
        restorer = this.restorers.find(
          (r) => r.available() && r.hpRestored > 0
        );
      }

      if (restorer == null) {
        return false;
      }

      let toUse = Math.ceil((desiredHp - myHp()) / restorer.hpRestored);

      if (availableAmount(restorer.item) > 0) {
        toUse = Math.min(toUse, availableAmount(restorer.item));
      } else {
        toUse = Math.min(Math.floor(myMeat() / restorer.price), toUse + 4);

        cliExecute("acquire " + toUse + " " + restorer.item);
      }

      toUse = Math.min(
        itemAmount(restorer.item),
        Math.ceil((desiredHp - myHp()) / restorer.hpRestored)
      );

      cliExecute("use " + toUse + " " + restorer.item);
      return true;
    }

    return myHp() >= hp;
  }

  restoreMPTo(mp: number): boolean {
    if (myMp() >= mp) {
      return true;
    }

    const ronStatus = getQuestStatus("questL11Ron");

    const desiredMp = Math.min(mp, myMaxmp());

    if (
      (ronStatus < 0 || ronStatus > 1 || getQuestStatus("questL11Shen") <= 6) &&
      toInt(getProperty("sweat")) >=
        (myMp() + 10 >= desiredMp && myMaxmp() - myMp() < 50 ? 95 : 80)
    ) {
      useSkill(Skill.get("Sip Some Sweat"));
    }

    while (myMeat() > 100 && myMp() < desiredMp) {
      let restorer = this.restorers.find(
        (r) => availableAmount(r.item) > 0 && r.mpRestored > 0
      );

      if (restorer == null) {
        restorer = this.restorers.find(
          (r) => r.available() && r.mpRestored > 0
        );
      }

      if (restorer == null) {
        return false;
      }

      let toUse = Math.ceil((desiredMp - myMp()) / restorer.mpRestored);

      if (availableAmount(restorer.item) > 0) {
        toUse = Math.min(toUse, availableAmount(restorer.item));
      } else {
        toUse = Math.min(Math.floor(myMeat() / restorer.price), toUse);

        cliExecute("acquire " + toUse + " " + restorer.item);
      }

      cliExecute("use " + toUse + " " + restorer.item);
    }

    return myMp() >= mp;
  }

  run(): void {
    for (const effect of this.toRemove) {
      if (haveEffect(effect) == 0) {
        continue;
      }

      cliExecute("shrug " + effect.name);

      if (haveEffect(effect) > 0) {
        throw "Tried to remove " + effect.name + " but failed!";
      }
    }

    if (availableAmount(this.antidote) == 0 && myMeat() > 1_000) {
      buy(this.antidote);
    }

    if (myMaxmp() < 20) {
      return;
    }

    const desiredMp = 20; //myMaxmp() < 40 ? 20 : 40;

    this.restoreMPTo(desiredMp);
  }
}

const maintainStatus: TaskMaintainStatus = new TaskMaintainStatus();

export function restoreMPTo(mp: number): boolean {
  // If we can't hit that MP
  if (mp > myMaxmp()) {
    return false;
  }

  // If we already have that amount
  if (mp <= myMp()) {
    return true;
  }

  // If we don't have 100 meat per 10 mp
  if (Math.ceil((myMp() - mp) / 10) * 100 > myMeat()) {
    return false;
  }

  return maintainStatus.restoreMPTo(mp);
}

export function restoreHPTo(hp: number): boolean {
  // If we can't hit that MP
  if (hp > myMaxhp()) {
    return false;
  }

  // If we already have that amount
  if (hp <= myMp()) {
    return true;
  }

  // If we don't have 100 meat per 10 mp
  if (Math.ceil((myHp() - hp) / 10) * 100 > myMeat()) {
    return false;
  }

  return maintainStatus.restoreHPTo(hp);
}
