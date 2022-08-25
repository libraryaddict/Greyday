import {
  Familiar,
  haveFamiliar,
  Item,
  itemAmount,
  myFamiliar,
  visitUrl,
} from "kolmafia";
import { Task } from "./Tasks";

export class TaskEquipDistillery implements Task {
  gelcube: Familiar = Familiar.get("Gelatinous Cubeling");
  distill: Item = Item.get("Tiny stillsuit");
  lastRun: number = 0;

  run(): void {
    if (itemAmount(this.distill) == 0) {
      return;
    }

    if (!haveFamiliar(this.gelcube) || myFamiliar() == this.gelcube) {
      return;
    }

    if (this.lastRun-- > 0) {
      return;
    }

    this.lastRun = 2;

    visitUrl("familiar.php?action=equip&pwd=&whichfam=171&whichitem=10932");
  }
}
