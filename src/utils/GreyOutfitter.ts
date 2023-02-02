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
import {
  DelayBurners,
  DelayCriteria,
  DelayCriteriaInterface,
} from "../iotms/delayburners/DelayBurners";
import { GreySettings } from "./GreySettings";
import { UmbrellaState } from "./GreyUtils";

interface MaximizerWeight {
  item: Item | string;
  weight: number;
  min?: number;
  max?: number;
}

const goose = Familiar.get("Grey Goose");

export class GreyOutfit {
  static IGNORE_OUTFIT: any = "Ignore Outfit";
  private allowChampBottle: boolean = false;
  private static teachersPen: Item = Item.get("Teacher's Pen");
  private static leafPendant: Item = Item.get("Autumn leaf pendant");
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
  bonusWeights: MaximizerWeight[] = [];
  extra: string[] = [];
  overrideMaximizer: string;
  umbrellaSetting: UmbrellaState;
  /**
   * When we don't want to cap how much combat we run
   */
  combatCap: number = 25;

  constructor(string: string = null) {
    this.overrideMaximizer = string;

    this.setWeights();
  }

  /**
   * Checks if the user defined a bonus weight. If so, discards our own.
   */
  hasExtra(name: string): boolean {
    return (
      this.bonusWeights.find(
        (s) =>
          !(s.item instanceof Item) &&
          s.item
            .toLowerCase()
            .replace(/^[^a-z]+/, "")
            .startsWith(name)
      ) != null
    );
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
    if (GreySettings.greyLocketWeight > 0) {
      this.addWeight(
        Item.get("combat lover's locket"),
        GreySettings.greyLocketWeight
      );
    }

    this.addWeight(Item.get("lucky gold ring"), 20);
    this.addWeight(Item.get("mafia thumb ring"), 19);

    /*if (getQuestStatus("questL13Final") <= 5) {
      if (availableAmount(Item.get("powerful glove")) > 0) {
        this.addWeight(Item.get("hewn moon-rune spoon"), -4);
        this.addWeight(Item.get("Powerful Glove"), 4.5);
      }
    }*/

    if (availableAmount(Item.get("Camp Scout Backpack")) > 0) {
      this.addWeight(Item.get("camp scout backpack"), 6000);
    }

    if (
      availableAmount(GreyOutfit.teachersPen) > 1 &&
      availableAmount(GreyOutfit.leafPendant) > 0
    ) {
      this.addIgnored(GreyOutfit.leafPendant);
    }

    this.addExtra("-equip screwing pooch");

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

  addDelayer(
    delayCriteria: DelayCriteriaInterface = DelayCriteria(),
    weight: number = 21
  ) {
    const delayer = DelayBurners.getReadyDelayBurner(delayCriteria);

    if (delayer == null) {
      return;
    }

    for (const item of delayer.getFightSetup()) {
      this.addWeight(item, weight);
    }
  }

  addIgnored(item: Item): GreyOutfit {
    return this.addExtra("-equip " + item.name);
  }

  addExtra(extra: string): GreyOutfit {
    this.extra.push(extra);

    return this;
  }

  addWeight(
    item: Item | string,
    weight?: number,
    min?: number,
    max?: number
  ): GreyOutfit {
    weight = weight != null ? weight : item instanceof Item ? 999_999 : 1;

    if (!(item instanceof Item)) {
      item = item.toLowerCase();
      item = item
        .replace(" exp", " experience")
        .replace(" dmg", " damage")
        .replace(/ res$/, " resistance")
        .replace(/ mox$/, " moxie")
        .replace(/ mys$/, " mysticality")
        .replace(/ mus$/, " muscle");
    }

    if (
      weight < 999999 ||
      !(item instanceof Item) ||
      availableAmount(item) == 0
    ) {
      const existing = this.bonusWeights.find((m) => m.item === item);

      if (existing != null) {
        if (existing.weight >= 0 == weight >= 0) {
          existing.weight += weight;

          if (min != null) {
            existing.min = Math.max(existing.min ?? 0, min);
          }

          if (max != null) {
            existing.max = Math.max(existing.max ?? 0, max);
          }
        } else {
          existing.weight = weight;
          existing.min = min;
          existing.max = max;
        }
      } else {
        this.bonusWeights.push({
          item: item,
          weight: weight,
          min: min,
          max: max,
        });
      }
    } else {
      this.addExtra("+equip " + item.name);
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
    this.combatCap = 100;

    return this;
  }

  createString(): string {
    if (this.overrideMaximizer != null) {
      return this.overrideMaximizer;
    }

    const modifiers: string[] = [];

    if (this.famExpWeight > 0 && !this.hasExtra("familiar exp")) {
      let mod = "+" + this.famExpWeight + " familiar experience";

      if (familiarWeight(goose) < 6) {
        // Subtract 1 as we gain a minimum of 1 exp per fight
        const expToReabsorb = 36 - 1 - goose.experience;

        mod += " " + expToReabsorb + " MAX";
      }

      modifiers.push(mod);
    }

    if (this.itemDropWeight > 0 && !this.hasExtra("item drop")) {
      modifiers.push("+" + this.itemDropWeight + " item drop");
    }

    if (this.meatDropWeight > 0 && !this.hasExtra("meat drop")) {
      modifiers.push("+" + this.meatDropWeight + " meat drop");
    }

    if (this.hpWeight > 0 && !this.hasExtra("hp")) {
      modifiers.push("+" + this.hpWeight + " hp");
    }

    if (this.hpRegenWeight > 0 && !this.hasExtra("hp regen")) {
      modifiers.push("+" + this.hpRegenWeight + " hp regen");
    }

    if (this.mpWeight > 0 && !this.hasExtra("mp")) {
      modifiers.push("+" + this.mpWeight + " mp");
    }

    if (this.mpRegenWeight > 0 && !this.hasExtra("mp regen")) {
      modifiers.push("+" + this.mpRegenWeight + " mp regen");
    }

    if (this.initWeight > 0 && !this.hasExtra("init")) {
      modifiers.push("+" + this.initWeight + " init");
    }

    if (this.plusCombatWeight > 0 && !this.hasExtra("combat")) {
      modifiers.push(
        "+" + this.plusCombatWeight + " combat " + this.combatCap + " MAX"
      );
    }

    if (this.minusCombatWeight > 0 && !this.hasExtra("combat")) {
      modifiers.push(
        "-" + this.minusCombatWeight + " combat " + this.combatCap + " MAX"
      );
    }

    for (const weight of this.bonusWeights) {
      modifiers.push(
        (weight.weight >= 0 ? "+" + weight.weight : weight.weight) +
          " " +
          (weight.item instanceof Item ? "bonus " : "") +
          weight.item +
          (weight.min != null ? " " + weight.min + " MIN" : "") +
          (weight.max != null ? " " + weight.max + " MAX" : "")
      );
    }

    for (const extra of this.extra) {
      modifiers.push(extra);
    }

    if (!this.allowChampBottle && !this.hasExtra("equip broken champagne")) {
      modifiers.push("-equip broken champagne bottle");
    }

    return modifiers.join(" ");
  }
}
