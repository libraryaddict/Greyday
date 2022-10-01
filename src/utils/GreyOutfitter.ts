import {
  availableAmount,
  Familiar,
  familiarWeight,
  haveSkill,
  Item,
  myAdventures,
  myLevel,
  myMaxmp,
  myMeat,
  myMp,
  Skill,
} from "kolmafia";
import { getQuestStatus } from "../quests/Quests";
import { GreySettings } from "./GreySettings";
import { UmbrellaState } from "./GreyUtils";

export class GreyOutfit {
  static IGNORE_OUTFIT: any = "Ignore Outfit";
  private allowChampBottle: boolean = false;
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
  itemsWeight: [Item, number][] = [];
  bonusWeights: string[] = [];
  overrideMaximizer: string;
  umbrellaSetting: UmbrellaState;
  /**
   * When we don't want to cap how much combat we run
   */
  uncapped: boolean = false;

  constructor(string: string = null) {
    this.overrideMaximizer = string;

    this.setWeights();
  }

  getUmbrella(): UmbrellaState {
    if (this.umbrellaSetting == null) {
      if (this.minusCombatWeight > 0) {
        return UmbrellaState.MINUS_COMBAT;
      } else {
        //if (outfit.itemDropWeight > 2) {
        return UmbrellaState.ITEM_DROPS;
      }
    }

    return this.umbrellaSetting;
  }

  setWeights() {
    this.addBonus("+20 bonus lucky gold ring");
    this.addBonus("+19 bonus mafia thumb ring");

    if (getQuestStatus("questL13Final") <= 5) {
      if (availableAmount(Item.get("powerful glove")) > 0) {
        this.addBonus("-4 bonus hewn moon-rune spoon");
        this.addBonus("+4.5 bonus powerful glove");
      }
    }
    if (availableAmount(Item.get("Camp Scout Backpack")) > 0) {
      this.addBonus("+1 bonus camp scout backpack");
    }

    this.addBonus("-equip screwing pooch");

    if (myLevel() > 15) {
      this.initWeight = 0.001;
    }

    if (myMeat() > 12000) {
      this.meatDropWeight = 0.01;
    }

    if (
      !haveSkill(Skill.get("Hivemindedness")) &&
      myMp() < Math.min(125, Math.max(myMaxmp(), 70))
    ) {
      this.mpRegenWeight += 1;

      if (myMp() <= 30) {
        this.mpRegenWeight += 2;
      }

      /*if (myMp() < 42) {
        this.mpRegenWeight += 2;
      }*/
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
    if (weight < 999999 || availableAmount(item) == 0) {
      this.itemsWeight.push([item, weight]);
    } else {
      this.addBonus("+equip " + item.name);
    }

    return this;
  }

  setNoCombat(): GreyOutfit {
    if (this.minusCombatWeight > 0) {
      this.minusCombatWeight += 20;
      this.setUncapped();
    }

    this.minusCombatWeight += 10;
    return this;
  }

  setPlusCombat(): GreyOutfit {
    if (this.plusCombatWeight > 0) {
      this.plusCombatWeight += 20;
      this.setUncapped();
    }

    this.plusCombatWeight += 10;
    return this;
  }

  setItemDrops(): GreyOutfit {
    this.itemDropWeight = 2;

    return this;
  }

  setChampagneBottle(): GreyOutfit {
    this.allowChampBottle = true;

    return this;
  }

  setUncapped() {
    this.uncapped = true;

    return this;
  }

  createString(): string {
    if (this.overrideMaximizer != null) {
      return this.overrideMaximizer;
    }

    const modifiers: string[] = [];

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
      modifiers.push(
        "+" +
          this.plusCombatWeight +
          " combat" +
          (this.uncapped ? "" : " 25 MAX")
      );
    }

    if (this.minusCombatWeight > 0) {
      modifiers.push(
        "-" +
          this.minusCombatWeight +
          " combat" +
          (this.uncapped ? "" : " 25 MAX")
      );
    }

    for (const pair of this.itemsWeight) {
      modifiers.push("+" + pair[1] + " bonus " + pair[0]);
    }

    for (const pair of this.bonusWeights) {
      modifiers.push(pair);
    }

    if (!this.allowChampBottle) {
      modifiers.push("-equip broken champagne bottle");
    }

    return modifiers.join(" ");
  }
}
