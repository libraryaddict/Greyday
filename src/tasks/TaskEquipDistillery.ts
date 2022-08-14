import {
  availableAmount,
  Familiar,
  getRevision,
  haveFamiliar,
  Item,
  itemAmount,
  myFamiliar,
  visitUrl,
} from "kolmafia";
import { TaskInfo } from "../typings/TaskInfo";
import { Task } from "./Tasks";

export class TaskEquipDistillery implements Task {
  gelcube: Familiar = Familiar.get("Gelatinous Cubeling");
  distill: Item;
  lastRun: number = 0;

  constructor() {
    if (getRevision() < 26657) {
      visitUrl("desc_item.php?whichitem=957101431");
    }

    this.distill = Item.get("tiny stillsuit");
  }

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

    this.lastRun = 5;

    visitUrl(
      "familiar.php?action=equip&pwd=&whichfam=171&whichitem=10932",
      true
    );
  }
}
