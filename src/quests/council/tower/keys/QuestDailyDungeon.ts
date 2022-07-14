import {
  availableAmount,
  cliExecute,
  Familiar,
  getProperty,
  getRelated,
  Item,
  itemAmount,
  Location,
  mallPrice,
  pullsRemaining,
  retrieveItem,
  wellStocked,
} from "kolmafia";
import { PropertyManager } from "../../../../utils/Properties";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";
import { Macro } from "../../../../utils/MacroBuilder";
import {
  ResourceClaim,
  ResourcePullClaim,
} from "../../../../utils/GreyResources";
import { GreySettings } from "../../../../utils/GreySettings";

export class QuestDailyDungeon implements QuestInfo {
  pole: Item = Item.get("eleven-foot pole");
  ring: Item = Item.get("ring of Detect Boring Doors");
  picklocks: Item = Item.get("Pick-O-Matic lockpicks");
  keys: Item[] = ["Boris's key", "Sneaky Pete's key", "Jarlsberg's key"].map(
    (s) => Item.get(s)
  );
  zappables: Item[] = [];
  location: Location = Location.get("The Daily Dungeon");
  fam: Familiar = Familiar.get("Gelatinous Cubeling");
  malware: Item = Item.get("Daily dungeon malware");
  private reachedTower: string = "_greyReachedTower";

  getLocations(): Location[] {
    return [this.location];
  }

  constructor() {
    for (let i of this.keys) {
      Object.keys(getRelated(i, "zap")).forEach((s) => {
        let i = Item.get(s);

        if (this.zappables.includes(i)) {
          return;
        }

        this.zappables.push(i);
      });
    }
  }

  getResourceClaims(): ResourceClaim[] {
    return [
      new ResourcePullClaim(this.malware, "Malware for Fat Loot Token", -1),
    ];
  }

  isDailyDoneToday() {
    return getProperty("dailyDungeonDone") == "true";
  }

  hasFamiliarRecommendation(): Familiar {
    if (GreySettings.shouldAvoidTowerRequirements()) {
      return null;
    }

    if (
      availableAmount(this.pole) > 0 &&
      availableAmount(this.ring) > 0 &&
      availableAmount(this.picklocks) > 0
    ) {
      return null;
    }

    return this.fam;
  }

  level(): number {
    return 7;
  }

  status(): QuestStatus {
    if (getQuestStatus("questL13Final") > 5 || this.isDailyDoneToday()) {
      return QuestStatus.COMPLETED;
    }

    if (GreySettings.shouldAvoidTowerRequirements()) {
      if (GreySettings.greyDailyMalware) {
        if (getProperty(this.reachedTower) == "true") {
          return QuestStatus.READY;
        }

        return QuestStatus.NOT_READY;
      }

      return QuestStatus.COMPLETED;
    }

    if (this.hasFamiliarRecommendation() != null) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  isMalwareUsed(): boolean {
    return getProperty("_dailyDungeonMalwareUsed") == "true";
  }

  run(): QuestAdventure {
    if (
      itemAmount(this.malware) == 0 &&
      !this.isMalwareUsed() &&
      GreySettings.shouldAvoidTowerRequirements() &&
      GreySettings.greyDailyMalware
    ) {
      if (pullsRemaining() != -1) {
        throw "You need to escape ronin first! Won't attempt to do daily dungeon without easy access to malware.";
      }

      // TODO Check if this makes malware if its cheaper
      cliExecute("acquire " + this.malware);

      if (itemAmount(this.malware) == 0) {
        throw (
          "Expected to have " +
          this.malware +
          " on hand, something went wrong obviously."
        );
      }

      for (let i of [this.ring, this.picklocks, this.pole]) {
        cliExecute("acquire " + i);
      }
    }

    let outfit = new GreyOutfit();
    outfit.addItem(this.ring);

    return {
      outfit: outfit,
      location: this.location,
      run: () => {
        let props = new PropertyManager();
        props.setChoice(692, 3);
        let settings = new AdventureSettings();

        if (itemAmount(this.malware) > 0 && this.isMalwareUsed()) {
          settings.setStartOfFightMacro(Macro.item(this.malware));
        }

        try {
          greyAdv(this.location, outfit, settings);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  needAdventures(): number {
    return 9;
  }

  getId(): QuestType {
    return "Council / Tower / Keys / DailyDungeon";
  }
}
