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

  isViable(): boolean {
    if (availableAmount(this.item) == 0) {
      return false;
    }

    // Force it to be available for lobster
    if (
      getProperty("sidequestLighthouseCompleted") == "none" &&
      availableAmount(this.lobsterBarrels) < 5
    ) {
      return false;
    }

    return true;
  }

  isViableAsCombatReplacer(): boolean {
    return false;
  }

  isFree(): boolean {
    return toInt(getProperty("_voidFreeFights")) < 5;
  }

  readyIn(): number {
    return 13 - toInt(getProperty("cursedMagnifyingGlassCount"));
  }

  doSetup(): void {}

  doFightSetup(): Slot[] {
    equip(Slot.get("Off-Hand"), this.item);

    return [Slot.get("Off-Hand")];
  }
}
