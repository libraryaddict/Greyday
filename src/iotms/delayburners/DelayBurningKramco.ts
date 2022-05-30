import {
  toInt,
  getProperty,
  totalTurnsPlayed,
  availableAmount,
  equip,
  Item,
  Slot,
  print,
} from "kolmafia";
import { DelayBurner } from "./DelayBurnerAbstract";

export class DelayBurningKramco implements DelayBurner {
  kramco: Item = Item.get("Kramco Sausage-o-Matic");

  doFightSetup(): Slot[] {
    equip(Slot.get("Off-Hand"), this.kramco);

    return [Slot.get("Off-Hand")];
  }

  isViableAsCombatReplacer(): boolean {
    return this.getChanceOfFight() > 0.1;
  }

  isViable(): boolean {
    return availableAmount(this.kramco) > 0;
  }

  isFree(): boolean {
    return true;
  }

  readyIn(): number {
    return this.getNextGuaranteedFight();
  }

  doSetup(): void {}

  getGoblinsFought(): number {
    return toInt(getProperty("_sausageFights"));
  }

  getLastGoblinTurn(): number {
    return totalTurnsPlayed() - toInt(getProperty("_lastSausageMonsterTurn"));
  }

  getNextGuaranteedGoblin(): number {
    let goblinsFought = this.getGoblinsFought();
    return (
      4 +
      goblinsFought * 3 +
      Math.max(0, goblinsFought - 5) *
        Math.max(0, goblinsFought - 5) *
        Math.max(0, goblinsFought - 5)
    );
  }

  getNextGuaranteedFight(): number {
    if (this.getGoblinsFought() == 0) {
      return 0;
    }

    return Math.max(
      0,
      this.getNextGuaranteedGoblin() - this.getLastGoblinTurn()
    );
  }

  getGoblinMultiplier() {
    return Math.max(0, this.getGoblinsFought() - 5);
  }

  getChanceOfFight(): number {
    let chance =
      (this.getLastGoblinTurn() + 1.0) /
      ((5.0 + this.getGoblinsFought()) * 3.0 +
        this.getGoblinMultiplier() *
          this.getGoblinMultiplier() *
          this.getGoblinMultiplier());

    if (chance > 1) {
      chance = 1;
    }
    if (chance < 0) {
      chance = 0;
    }

    return chance;
  }
}
