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
  itemAmount,
  pullsRemaining,
  storageAmount,
  SlotType,
} from "kolmafia";
import { restoreHPTo } from "../../../../tasks/TaskMaintainStatus";
import { ResourceCategory } from "../../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../../typings/TaskInfo";
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

export class QuestTowerShadow extends TaskInfo implements QuestInfo {
  badge: Item = Item.get("Attorney's badge");
  potato: Familiar = Familiar.get("Levitating Potato");
  guaze: Item = Item.get("Gauze garter");
  cape: Item = Item.get("Unwrapped knock-off retro superhero cape");
  overclocking: Skill = Skill.get("Overclocking");
  paths: PossiblePath[];

  createPaths(assumeUnstarted: boolean) {
    this.paths = [
      new PossiblePath(0).addMeat(1000),
      new PossiblePath(0).add(ResourceCategory.HOT_TUB),
    ];
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  getId(): QuestType {
    return "Council / Tower / Shadow";
  }

  level(): number {
    return 13;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL13Final");

    if (status < 10) {
      return QuestStatus.NOT_READY;
    }

    if (status > 10) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  getBestEquips(modifier: string): [Slot, Item][] {
    const equips: [Slot, Item, number][] = [];
    const none = toSlot("none");
    const weapon = Slot.get("weapon");

    for (const i of Item.all()) {
      if (availableAmount(i) == 0) {
        continue;
      }

      const slot = toSlot(i);

      if (slot == none || !canEquip(i)) {
        continue;
      }

      if (slot == weapon && weaponHands(i) > 1) {
        continue;
      }

      const mod = numericModifier(i, modifier);

      if (mod <= 0) {
        continue;
      }

      equips.push([slot, i, mod]);
    }

    equips.sort((e1, e2) => e2[2] - e1[2]);
    const items: Item[] = [];
    const toReturn: [Slot, Item][] = [];

    for (const slot of [
      "Hat",
      "Weapon",
      "Offhand",
      "Back",
      "Pants",
      "Acc1",
      "Acc2",
      "Acc3",
    ].map((s) => Slot.get(s as SlotType))) {
      let lookFor = slot;

      if (slot == Slot.get("acc2") || slot == Slot.get("acc3")) {
        lookFor = Slot.get("acc1");
      }

      const item = equips.reduce((p, i) => {
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

  run(path: PossiblePath): QuestAdventure {
    const map: Map<Slot, Item> = new Map();

    if (availableAmount(this.badge) > 0) {
      map.set(Slot.get("acc3"), this.badge);
    }

    if (availableAmount(this.cape) > 0) {
      map.set(Slot.get("back"), this.cape);
    }

    const outfit = new GreyOutfit();
    outfit.hpWeight = 0;
    outfit.addBonus("+500 init 151 max +100 hp 500 max");

    return {
      familiar: this.potato,
      outfit: outfit,
      location: null,
      run: () => {
        if (equippedAmount(this.cape) > 0) {
          cliExecute("retrocape heck hold"); // Make sure we stun the shadow
        }

        if (itemAmount(this.guaze) < 6) {
          if (pullsRemaining() == -1 && storageAmount(this.guaze) > 6) {
            cliExecute(
              "pull " + storageAmount(this.guaze) + " " + this.guaze.name
            );
          } else {
            throw (
              "We don't have enough " +
              this.guaze.name +
              " to take on the shadow!"
            );
          }
        }

        if (myHp() < myMaxhp()) {
          if (path.canUse(ResourceCategory.HOT_TUB)) {
            cliExecute("hottub");
            path.addUsed(ResourceCategory.HOT_TUB);
          } else {
            restoreHPTo(myMaxhp());
          }
        }

        if (myHp() < myMaxhp()) {
          throw "Expected full health";
        }

        const macro = Macro.item(this.guaze).repeat();

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

  canAcceptPrimes(): boolean {
    return false;
  }
}
