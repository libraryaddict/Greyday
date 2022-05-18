import { canAdv } from "canadv.ash";
import {
  Location,
  Familiar,
  Item,
  availableAmount,
  getInventory,
  autosellPrice,
  Slot,
  toSlot,
  canEquip,
  getPower,
  equip,
  use,
  retrieveItem,
  maximize,
  equippedItem,
  cliExecute,
  isTradeable,
  isDiscardable,
  visitUrl,
  getProperty,
  Monster,
  print,
} from "kolmafia";
import { greyAdv } from "../../utils/GreyLocations";
import { GreyPulls } from "../../utils/GreyResources";
import { GreySettings } from "../../utils/GreySettings";
import { canCombatLocket } from "../../utils/GreyUtils";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { QuestType } from "../QuestTypes";
import { QuestKeyStuffAbstract } from "./QuestKeyStuffAbstract";

export class QuestMirrorDupe
  extends QuestKeyStuffAbstract
  implements QuestInfo
{
  clover: Item = Item.get("11-leaf Clover");
  location: Location = Location.get("The Haunted Storage Room");

  getId(): QuestType {
    return "Council / Tower / Keys / DupeMirror";
  }

  level(): number {
    return 7;
  }

  status(): QuestStatus {
    if (!GreySettings.isHardcoreMode()) {
      return QuestStatus.COMPLETED;
    }

    if (!canAdv(this.location)) {
      return QuestStatus.NOT_READY;
    }

    let status = getQuestStatus("questL13Final");

    if (status > 5) {
      return QuestStatus.COMPLETED;
    }

    // If we have enough key stuff to make it!
    if (this.getViableKeyCount() + this.getOwnedZappables().length >= 3) {
      return QuestStatus.COMPLETED;
    }

    // If it wants to drop
    if (this.shouldDrop()) {
      return QuestStatus.READY;
    }

    // If we don't have enough tokens, or zappables to do this
    if (availableAmount(this.token) + this.getOwnedZappables().length < 1) {
      return QuestStatus.NOT_READY;
    }

    // If we don't have enough clovers
    if (availableAmount(this.clover) == 0) {
      return QuestStatus.NOT_READY;
    }

    // If we can't create a viable outfit
    if (this.createOutfit() == null) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  dropHardcore(): QuestAdventure {
    return {
      location: null,
      run: () => {
        //  throw "It looks like the script wants you to drop hardcore!"; // TODO

        visitUrl(
          "account.php?tab=account&unhardcoreconfirm=1&pwd=&action=Drop Hardcore"
        );

        cliExecute("refresh all");

        GreyPulls.pullStartingGear();
      },
    };
  }

  shouldDrop(): boolean {
    return availableAmount(this.clover) == 0 && this.getViableKeyCount() < 3;
  }

  getPvPables(): Item[] {
    let items: Item[] = [];

    for (let i of Object.keys(getInventory()).map((s) => Item.get(s))) {
      if (!this.isPvPable(i) || !this.isWearable(i)) {
        continue;
      }

      items.push(i);
    }

    return items;
  }

  createOutfit(): [Slot, Item][] {
    let slots: [Slot, Item][] = [];

    for (let i of this.getPvPables()) {
      let slot = toSlot(i);

      slots.push([slot, i]);
    }

    slots.sort((i1, i2) => {
      return getPower(i2[1]) - getPower(i1[1]);
    });

    for (let i of this.getOwnedZappables()) {
      slots.unshift([Slot.get("Acc1"), i]);
    }

    slots.unshift([Slot.get("Familiar"), Item.get("Grey Down Vest")]);

    let slotsTaken: Slot[] = [];
    let toWear: [Slot, Item][] = [];

    for (let i of slots) {
      let slot = i[0];

      if (slot == Slot.get("Acc1")) {
        if (slotsTaken.includes(Slot.get("Acc2"))) {
          slot = Slot.get("Acc3");
        } else if (slotsTaken.includes(slot)) {
          slot = Slot.get("Acc2");
        }
      }

      if (slotsTaken.includes(slot)) {
        continue;
      }

      slotsTaken.push(slot);
      toWear.push([slot, i[1]]);

      if (toWear.length < 6) {
        continue;
      }

      break;
    }

    if (toWear.length < 6) {
      return null;
    }

    for (let s of Slot.all()) {
      if (slotsTaken.includes(s)) {
        continue;
      }

      toWear.push([s, Item.get("None")]);
    }

    return toWear;
  }

  isWearable(i: Item): boolean {
    return toSlot(i) != Slot.get("None") && canEquip(i);
  }

  isPvPable(i: Item): boolean {
    return isTradeable(i) && isDiscardable(i);
  }

  run(): QuestAdventure {
    if (this.shouldDrop()) {
      return this.dropHardcore();
    }

    return this.doMirror();
  }

  createZappableIfNeeded() {
    if (this.getOwnedZappables().length > 0) {
      return;
    }

    retrieveItem(this.getZappableItems()[0]);
  }

  doMirror(): QuestAdventure {
    return {
      location: null,
      run: () => {
        //throw "This is where we'd do the mirror!";
        this.createZappableIfNeeded();

        let outfit = this.createOutfit();

        let equips = outfit
          .filter((s) => s[1] != Item.get("None"))
          .map((s) => "+equip " + s[1].name);

        maximize("familiar experience " + equips.join(" "), false);

        for (let slot of Slot.all()) {
          let item = equippedItem(slot);

          if (item == Item.get("None") || !this.isPvPable(item)) {
            continue;
          }

          if (outfit.find((o) => o[1] == item) != null) {
            continue;
          }

          equip(slot, Item.get("None"));
        }

        /* for (let i of outfit) {
          if (i[1] != Item.get("None")) {
            continue;
          }
          equip(i[0], i[1]);
        }*/

        use(this.clover);
        greyAdv(this.location);
        cliExecute("refresh inventory");
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
