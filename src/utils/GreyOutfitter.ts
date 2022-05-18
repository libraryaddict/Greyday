import {
  familiarWeight,
  haveSkill,
  Item,
  myAdventures,
  print,
  Skill,
} from "kolmafia";
import { hasNonCombatSkillsReady } from "../GreyAdventurer";
import { GreySettings } from "./GreySettings";
import { setUmbrella, UmbrellaState } from "./GreyUtils";

export class GreyOutfit {
  famExpWeight: number = 30;
  itemDropWeight: number = 0.3;
  meatDropWeight: number = 0.1;
  hpWeight: number = 0.001;
  hpRegenWeight: number = 0.01;
  mpWeight: number = 0.001;
  mpRegenWeight: number = 0.01;
  initWeight: number = 0.05;
  plusCombatWeight: number = 0;
  minusCombatWeight: number = 0;
  plusMonsterLevelWeight: number = 0;
  minusMonsterLevelWeight: number = 0;
  itemsWeight: [Item, number][] = [];
  bonusWeights: string[] = [];
  overrideMaximizer: string;
  umbrellaSetting: UmbrellaState;

  constructor(string: string = null) {
    this.overrideMaximizer = string;

    this.setWeights();
  }

  getUmbrella(): UmbrellaState {
    if (this.umbrellaSetting == null) {
      if (this.minusCombatWeight > 0) {
        return UmbrellaState.MINUS_COMBAT;
      } else if (this.plusMonsterLevelWeight > 0) {
        return UmbrellaState.MONSTER_LEVEL;
      } else {
        //if (outfit.itemDropWeight > 2) {
        return UmbrellaState.ITEM_DROPS;
      }
    }

    return this.umbrellaSetting;
  }

  setWeights() {
    this.addBonus("+10 bonus mafia thumb ring");
    this.addBonus("+2 bonus powerful glove");
    this.addBonus("-equip screwing pooch");

    if (!haveSkill(Skill.get("Hivemindedness"))) {
      this.mpRegenWeight += 2;
    }

    if (
      GreySettings.isHardcoreMode() &&
      myAdventures() < 40 &&
      familiarWeight(Familiar.get("Grey Goose")) < 6 &&
      haveSkill(Skill.get("Phase Shift")) &&
      haveSkill(Skill.get("Photonic Shroud"))
    ) {
      this.famExpWeight = 100;
    }
    // Setup weights according to w/e passives I have
  }

  addBonus(message: string): GreyOutfit {
    this.bonusWeights.push(message);

    return this;
  }

  addItem(item: Item, weight: number = 999999): GreyOutfit {
    this.itemsWeight.push([item, weight]);

    return this;
  }

  setNoCombat(): GreyOutfit {
    this.minusCombatWeight = 10;
    return this;
  }

  setPlusCombat(): GreyOutfit {
    this.plusCombatWeight = 10;
    return this;
  }

  setItemDrops(): GreyOutfit {
    this.itemDropWeight = 2;

    return this;
  }

  createString(): string {
    if (this.overrideMaximizer != null) {
      return this.overrideMaximizer;
    }

    let modifiers: string[] = [];

    if (this.famExpWeight > 0) {
      modifiers.push("+" + this.famExpWeight + " familiar experience");
    }

    if (this.itemDropWeight > 0) {
      modifiers.push("+" + this.itemDropWeight + " item drop");
    }

    if (this.meatDropWeight > 0) {
      modifiers.push("+" + this.meatDropWeight + " meat drop");
    }

    if (this.hpWeight > 0) {
      modifiers.push("+" + this.hpWeight + " hp");
    }

    if (this.hpRegenWeight > 0) {
      modifiers.push("+" + this.hpRegenWeight + " hp regen");
    }

    if (this.mpWeight > 0) {
      modifiers.push("+" + this.mpWeight + " mp");
    }

    if (this.mpRegenWeight > 0) {
      modifiers.push("+" + this.mpRegenWeight + " mp regen");
    }

    if (this.initWeight > 0) {
      modifiers.push("+" + this.initWeight + " init");
    }

    if (this.plusCombatWeight > 0) {
      modifiers.push("+" + this.plusCombatWeight + " combat");
    }

    if (this.minusCombatWeight > 0) {
      modifiers.push("-" + this.minusCombatWeight + " combat");
    }

    if (this.plusMonsterLevelWeight > 0) {
      modifiers.push("+" + this.plusMonsterLevelWeight + " ml");
    }

    if (this.minusMonsterLevelWeight > 0) {
      modifiers.push("-" + this.minusMonsterLevelWeight + " ml");
    }

    for (let pair of this.itemsWeight) {
      modifiers.push("+" + pair[1] + " bonus " + pair[0]);
    }

    for (let pair of this.bonusWeights) {
      modifiers.push(pair);
    }

    if (
      modifiers.filter((m) => m.includes("broken champagne bottle")).length ==
        0 &&
      this.itemDropWeight < 10
    ) {
      modifiers.push("-equip broken champagne bottle");
    }

    return modifiers.join(" ");
  }
}
