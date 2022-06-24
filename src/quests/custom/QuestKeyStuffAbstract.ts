import {
  Item,
  getRelated,
  availableAmount,
  getProperty,
  use,
  print,
  Monster,
  toInt,
} from "kolmafia";
import { GreySettings } from "../../utils/GreySettings";
import { canCombatLocket } from "../../utils/GreyUtils";

export class QuestKeyStuffAbstract {
  keys: Item[] = ["Boris's key", "Sneaky Pete's key", "Jarlsberg's key"].map(
    (s) => Item.get(s)
  );
  zappables: Item[] = [];
  token: Item = Item.get("Fat loot token");
  wand: Item[] = [
    "aluminum wand",
    "ebony wand",
    "hexagonal wand",
    "marble wand",
    "pine wand",
  ].map((s) => Item.get(s));

  getKeysUsed(): Item[] {
    return getProperty("nsTowerDoorKeysUsed")
      .split(",")
      .filter((s) => s.length > 0)
      .map((s) => Item.get(s))
      .filter((k) => this.keys.includes(k));
  }

  getUnusedKeys(): Item[] {
    let used = this.getKeysUsed();

    return this.keys.filter((i) => !used.includes(i));
  }

  getKeysUnavailable(): Item[] {
    let used = this.getKeysUsed();

    return this.keys.filter(
      (k) => !used.includes(k) && availableAmount(k) == 0
    );
  }

  getOwnedZappables(): Item[] {
    let owned: Item[] = [];

    for (let i of this.getZappableItems()) {
      for (let a = 0; a < availableAmount(i); a++) {
        owned.push(i);
      }
    }

    return owned;
  }

  getOwnedKeys(): Item[] {
    return this.keys.filter((k) => availableAmount(k) > 0);
  }

  getViableKeyCount(): number {
    let keys =
      availableAmount(this.token) +
      this.getKeysUsed().length +
      this.getOwnedKeys().length;

    if (getProperty("dailyDungeonDone") == "false") {
      keys += 1;

      if (
        !GreySettings.isHardcoreMode() &&
        getProperty("dailyDungeonMalwareUsed") == "false"
      ) {
        keys += 1;
      }
    }

    // If we can fight bandit
    if (toInt("_foughtFantasyRealm") < 5) {
      // If we own fantasyrealm
      if (
        getProperty("frAlways") == "true" ||
        getProperty("_frToday") == "true"
      ) {
        keys++;
      } else if (
        canCombatLocket(Monster.get("Fantasy Bandit")) &&
        11 - toInt(getProperty("_backUpUses")) >= 4
      ) {
        keys += 1;
      }
    }

    return keys;
  }

  getZappableItems(): Item[] {
    if (this.zappables.length == 0) {
      for (let i of this.keys) {
        Object.keys(getRelated(i, "zap")).forEach((s) => {
          let i = Item.get(s);

          if (this.zappables.includes(i) || this.keys.includes(i)) {
            return;
          }

          this.zappables.push(i);
        });
      }
    }

    return this.zappables;
  }
}
