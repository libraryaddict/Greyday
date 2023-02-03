import { equippedAmount, Familiar, familiarWeight, Item, Slot } from "kolmafia";
import { DelayBurner } from "./DelayBurnerAbstract";
import { DelayBurningKramco } from "./DelayBurningKramco";
import { DelayBurningVoter } from "./DelayBurningVoter";
import { DelayBurningCursedMagnifyingGlass } from "./DelayCursedMagnifyingGlass";

export interface DelayCriteriaInterface {
  freeFights?: boolean; // If not null, filter to free or non-free fights
  excludeSlots?: Slot[]; // What slots we shouldn't take up
  forcedFights?: boolean; // If not null, filter to forced or non-forced fights
  atLeastCombatChance?: number; // Only relevant for kramco at this point
  showNonReady: boolean;
}

class DelayCriteriaBuilder implements DelayCriteriaInterface {
  freeFights: boolean = true; // If not null, filter to free or non-free fights
  excludeSlots: Slot[] = null; // What slots we shouldn't take up
  forcedFights: boolean = false; // If not null, filter to forced or non-forced fights
  atLeastCombatChance: number = 0.1; // Only relevant for kramco at this point
  showNonReady: boolean = false;

  showAll(): DelayCriteriaBuilder {
    this.showNonReady = true;

    return this;
  }

  withFreeFights(freeFights: boolean): DelayCriteriaBuilder {
    this.freeFights = freeFights;

    return this;
  }

  withForcedFights(forcedFights: boolean): DelayCriteriaBuilder {
    this.forcedFights = forcedFights;

    return this;
  }

  withAtLeastCombatChance(chance: number): DelayCriteriaBuilder {
    this.atLeastCombatChance = chance;

    return this;
  }
}

export const DelayCriteria = () => {
  return new DelayCriteriaBuilder();
};

export class DelayBurners {
  static delays: DelayBurner[];

  private static getDelays(): DelayBurner[] {
    if (this.delays != null) {
      this.delays.sort((d1, d2) => {
        if (d1.isFree() == d2.isFree()) {
          return 0;
        }

        return d1.isFree() ? -1 : 1;
      });

      return this.delays;
    }

    this.delays = [
      new DelayBurningKramco(),
      new DelayBurningVoter(),
      new DelayBurningCursedMagnifyingGlass(),
    ].filter((d) => d.isViable());

    for (const delay of this.delays) {
      delay.doSetup();
    }

    return this.delays;
  }

  static isTryingForDupeableGoblin(): boolean {
    const fam = Familiar.get("Grey Goose");

    return (
      familiarWeight(fam) >= 6 &&
      familiarWeight(fam) < 9 &&
      equippedAmount(Item.get("Kramco Sausage-o-Matic")) > 0
    );
  }

  static getReadyDelayBurner(
    criteria: DelayCriteriaInterface = DelayCriteria()
  ): DelayBurner {
    const burner = this.getCombatReplacers(criteria)[0];

    if (burner == null || burner.readyIn() > 0) {
      return null;
    }

    return burner;
  }

  static isDelayBurnerReady(
    criteria: DelayCriteriaInterface = DelayCriteria()
  ): boolean {
    const burner = this.getCombatReplacers(criteria)[0];

    return burner != null && burner.readyIn() <= 0;
  }

  private static meetsCriteria(
    d: DelayBurner,
    criteria: DelayCriteriaInterface
  ) {
    if (
      criteria.forcedFights != null &&
      criteria.forcedFights != d.forcesFight()
    ) {
      return false;
    }

    if (criteria.freeFights != null && criteria.freeFights != d.isFree()) {
      return false;
    }

    if (criteria.showNonReady == true) {
      return true;
    }

    if (d instanceof DelayBurningKramco) {
      return (
        (d as DelayBurningKramco).getChanceOfFight() >=
        criteria.atLeastCombatChance
      );
    }

    return true;
  }

  static getCombatReplacers(
    criteria: DelayCriteriaInterface = DelayCriteria()
  ): DelayBurner[] {
    const delays = this.getDelays().filter((d) => {
      return this.meetsCriteria(d, criteria) && d.readyIn() == 0;
    });

    delays.sort((d1, d2) => {
      // If we have a choice between two free delayers, pick the one that's free
      if (d1.isFree() != d2.isFree()) {
        return d1.isFree() ? -1 : 1;
      }

      // If we have a choice between ones that is basically kramco vs something else, pick the one that's more ready
      if (d1.readyIn() != d2.readyIn()) {
        return d1.readyIn() - d2.readyIn();
      }

      // If this is a free fight, prioritize the one that forces a fight since that's rarer
      if (d1.isFree() && d1.forcesFight() != d2.forcesFight()) {
        return d1.forcesFight() ? -1 : 1;
      }

      return 0;
    });

    return delays;
  }

  static isDelayBurnerFeasible(
    criteria: DelayCriteriaInterface = DelayCriteria()
  ): boolean {
    return (
      this.getDelays().find(
        (d) => d.readyIn() < 7 && this.meetsCriteria(d, criteria)
      ) != null
    );
  }
}
