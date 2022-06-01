import {
  availableAmount,
  blackMarketAvailable,
  cliExecute,
  dispensaryAvailable,
  Item,
  myHp,
  myMaxhp,
  myMaxmp,
  myMeat,
  myMp,
} from "kolmafia";
import { Task } from "./Tasks";

interface MPRestorer {
  item: Item;
  mpRestored: number;
  available: () => boolean;
  price: number;
}

export class TaskMaintainStatus implements Task {
  restorers: MPRestorer[] = [];

  fillRestorers() {
    this.restorers.push({
      item: Item.get("Knob Goblin seltzer"),
      mpRestored: 11,
      available: () =>
        dispensaryAvailable() ||
        availableAmount(Item.get("Knob Goblin seltzer")) > 0,
      price: 80,
    });
    this.restorers.push({
      item: Item.get("Black cherry soda"),
      mpRestored: 11,
      available: () =>
        blackMarketAvailable() ||
        availableAmount(Item.get("Black cherry soda")) > 0,
      price: 80,
    });
    this.restorers.push({
      item: Item.get("Doc Galaktik's Invigorating Tonic"),
      mpRestored: 11,
      available: () => true,
      price: 90,
    });
  }

  restoreMPTo(mp: number): boolean {
    let desiredMp = Math.min(mp, myMaxmp());

    while (myMeat() > 100 && myMp() < desiredMp) {
      let restorer = this.restorers.find((r) => availableAmount(r.item) > 0);

      if (restorer == null) {
        restorer = this.restorers.find((r) => r.available());
      }

      if (restorer == null) {
        return false;
      }

      let toUse = Math.ceil(desiredMp / restorer.mpRestored);

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
    let desiredMp = myMaxmp() < 40 ? 20 : 40;

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
  if (mp >= myMp()) {
    return true;
  }

  // If we don't have 100 meat per 10 mp
  if (Math.ceil((myMp() - mp) / 10) * 100 > myMeat()) {
    return false;
  }

  return maintainStatus.restoreMPTo(mp);
}
