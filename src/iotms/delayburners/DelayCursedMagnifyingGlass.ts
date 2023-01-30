import {
  toInt,
  getProperty,
  availableAmount,
  equip,
  Monster,
  Item,
  Slot,
} from "kolmafia";
import { DelayBurner } from "./DelayBurnerAbstract";

export class DelayBurningCursedMagnifyingGlass implements DelayBurner {
  item: Item = Item.get("Cursed Magnifying Glass");
  lobsterBarrels: Item = Item.get("barrel of gunpowder");
  monster: Monster = Monster.get("Lobsterfrogman");

  getFightSetup(): Item[] {
    return [this.item];
  }

  isViable(): boolean {
    return availableAmount(this.item) > 0;
  }

  isFree(): boolean {
    return toInt(getProperty("_voidFreeFights")) < 5;
  }

  readyIn(): number {
    return 13 - toInt(getProperty("cursedMagnifyingGlassCount"));
  }

  doSetup(): void {}

  doFightSetup(): Slot[] {
    equip(this.item, Slot.get("off-hand"));

    return [Slot.get("off-hand")];
  }

  forcesFight(): boolean {
    return true;
  }
}
