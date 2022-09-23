import {
  Familiar,
  haveFamiliar,
  Item,
  itemAmount,
  myFamiliar,
  totalTurnsPlayed,
  visitUrl,
} from "kolmafia";
import { Task } from "./Tasks";

export class TaskEquipDistillery implements Task {
  gelcube: Familiar = Familiar.get("Gelatinous Cubeling");
  distill: Item = Item.get("Tiny stillsuit");
  lastChecked: number = 0;

  run(): void {
    if (itemAmount(this.distill) == 0) {
      return;
    }

    if (!haveFamiliar(this.gelcube) || myFamiliar() == this.gelcube) {
      return;
    }

    if (this.lastChecked == totalTurnsPlayed()) {
      return;
    }

    this.lastChecked = totalTurnsPlayed();

    visitUrl("familiar.php?action=equip&pwd=&whichfam=171&whichitem=10932");
  }
}
