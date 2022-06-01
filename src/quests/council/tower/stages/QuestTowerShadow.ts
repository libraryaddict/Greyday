import {
  Location,
  Familiar,
  Item,
  myHp,
  cliExecute,
  myMaxhp,
  availableAmount,
  max,
  equippedAmount,
  toInt,
  getProperty,
  Slot,
  toSlot,
  canEquip,
  numericModifier,
  weaponHands,
  haveSkill,
  Skill,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { Macro } from "../../../../utils/MacroBuilder";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestTowerShadow implements QuestInfo {
  badge: Item = Item.get("Attorney's badge");
  potato: Familiar = Familiar.get("Levitating Potato");
  guaze: Item = Item.get("Gauze garter");
  cape: Item = Item.get("Unwrapped knock-off retro superhero cape");
  overclocking: Skill = Skill.get("Overclocking");

  getId(): QuestType {
    return "Council / Tower / Shadow";
  }

  level(): number {
    return 13;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL13Final");

    if (status < 10) {
      return QuestStatus.NOT_READY;
    }

    if (status > 10) {
      //  return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  getBestEquips(modifier: string): [Slot, Item][] {
    let equips: [Slot, Item, number][] = [];
    let none = Slot.get("None");
    let weapon = Slot.get("Weapon");

    for (let i of Item.all()) {
      if (availableAmount(i) == 0) {
        continue;
      }

      let slot = toSlot(i);

      if (slot == none || !canEquip(i)) {
        continue;
      }

      if (slot == weapon && weaponHands(i) > 1) {
        continue;
      }

      let mod = numericModifier(i, modifier);

      if (mod <= 0) {
        continue;
      }

      equips.push([slot, i, mod]);
    }

    equips.sort((e1, e2) => e2[2] - e1[2]);
    let items: Item[] = [];
    let toReturn: [Slot, Item][] = [];

    for (let slot of [
      "Hat",
      "Weapon",
      "Offhand",
      "Back",
      "Pants",
      "Acc1",
      "Acc2",
      "Acc3",
    ].map((s) => Slot.get(s))) {
      let lookFor = slot;

      if (slot == Slot.get("Acc2") || slot == Slot.get("Acc3")) {
        lookFor = Slot.get("Acc1");
      }

      let item = equips.reduce((p, i) => {
        if (i[0] != lookFor || items.includes(i[1])) {
          return p;
        }

        if (p != null && p[2] > i[2]) {
          return p;
        }

        return i;
      }, null);

      if (item != null) {
        items.push(item[1]);
        toReturn.push([slot, item[1]]);
      }
    }

    return toReturn;
  }

  run(): QuestAdventure {
    let map: Map<Slot, Item> = new Map();

    if (availableAmount(this.badge) > 0) {
      map.set(Slot.get("Acc3"), this.badge);
    }

    if (availableAmount(this.cape) > 0) {
      map.set(Slot.get("Back"), this.cape);
    }

    if (!haveSkill(this.overclocking)) {
      let init = this.getBestEquips("Initiative");
      let total = 0;

      for (let [slot, item] of init) {
        if (map.has(slot)) {
          continue;
        }

        let count = numericModifier(item, "Initiative");

        total += count;
        map.set(slot, item);

        if (total > 150) {
          break;
        }
      }
    }

    let hp = this.getBestEquips("Maximum HP");

    for (let [slot, item] of hp) {
      if (map.has(slot)) {
        continue;
      }

      map.set(slot, item);
    }

    let maximize = "-tie";

    for (let i of map.values()) {
      maximize += " +equip " + i.name;
    }

    let outfit = new GreyOutfit(maximize);

    return {
      familiar: this.potato,
      outfit: outfit,
      location: null,
      run: () => {
        if (equippedAmount(this.cape) > 0) {
          cliExecute("retrocape heck hold"); // Make sure we stun the shadow
        }

        if (myHp() < myMaxhp() && toInt(getProperty("_hotTubSoaks")) < 5) {
          cliExecute("hottub");
        }

        let macro = Macro.item(this.guaze).repeat();

        greyAdv(
          "place.php?whichplace=nstower&action=ns_09_monster5",
          outfit,
          new AdventureSettings().setStartOfFightMacro(macro)
        );
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
