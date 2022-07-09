import {
  autosell,
  availableAmount,
  cliExecute,
  equip,
  equippedAmount,
  Familiar,
  familiarWeight,
  getProperty,
  hippyStoneBroken,
  Item,
  Location,
  maximize,
  myAdventures,
  myAscensions,
  myLevel,
  myLocation,
  myMeat,
  print,
  setProperty,
  squareRoot,
  storageAmount,
  toBoolean,
  toInt,
  turnsPlayed,
  use,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import {
  GreyPulls,
  ResourceClaim,
  ResourcePullClaim,
} from "../../utils/GreyResources";
import { GreySettings } from "../../utils/GreySettings";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestInitialStart implements QuestInfo {
  familiar: Familiar = Familiar.get("Grey Goose");
  equip: Item = Item.get("Grey Down Vest");
  desiredLevel: number;
  weightRequired: number;
  spaceBlanket: Item = Item.get("Space Blanket");
  mayday: Item = Item.get("MayDay supply package");
  saber: Item = Item.get("Fourth of May Cosplay Saber");
  flimsyScraps: Item = Item.get("Flimsy hardwood scraps");
  birchBattery: Item = Item.get("Birch battery");
  initialPulls: ResourcePullClaim[] = [
    new ResourcePullClaim(Item.get("Yule Hatchet"), "Faster familiar leveling"),
    new ResourcePullClaim(Item.get("Mafia Thumb Ring"), "Extra Adventures", 35),
    new ResourcePullClaim(
      Item.get(" Portable cassette player"),
      "Extra monster level & +combat accessory",
      5
    ),
  ];

  constructor() {
    if (storageAmount(Item.get("Pantsgiving")) > 0) {
      this.initialPulls.push(
        new ResourcePullClaim(
          Item.get("Pantsgiving"),
          "Resist and useful items",
          10
        )
      );
    }
  }

  getLocations(): Location[] {
    return [];
  }

  level(): number {
    return 1;
  }

  getResourceClaims(): ResourceClaim[] {
    return this.initialPulls;
  }

  status(): QuestStatus {
    if (availableAmount(this.mayday) > 0) {
      return QuestStatus.READY;
    }

    if (
      getProperty("hasMaydayContract") == "true" &&
      getProperty("_maydayDropped") == "false"
    ) {
      return QuestStatus.NOT_READY;
    }

    if (getProperty("breakfastCompleted") == "false") {
      return QuestStatus.READY;
    }

    if (availableAmount(this.saber) > 0 && getProperty("_saberMod") == "0") {
      return QuestStatus.READY;
    }

    return QuestStatus.COMPLETED;
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        if (!hippyStoneBroken() && toBoolean(getProperty("greyEnablePvP"))) {
          print("Enabling pvp as defined by 'greyEnablePvP'", "blue");
          visitUrl("peevpee.php?action=smashstone&pwd&confirm=on", true);
          visitUrl("peevpee.php?place=fight");
        }

        if (
          availableAmount(this.saber) > 0 &&
          getProperty("_saberMod") == "0"
        ) {
          cliExecute("saber resistance");
        }

        if (
          availableAmount(Item.get("SongBoom&trade; BoomBox")) > 0 &&
          getProperty("_boomBoxSongsLeft") == "11"
        ) {
          cliExecute("boombox meat");
        }

        if (
          !GreySettings.isHardcoreMode() &&
          availableAmount(Item.get("Mafia Thumb Ring")) == 0
        ) {
          GreyPulls.pullStartingGear();
        }

        if (availableAmount(this.mayday) > 0) {
          use(this.mayday);

          if (availableAmount(this.spaceBlanket) > 0) {
            autosell(this.spaceBlanket, 1);
          }
        }

        if (getProperty("breakfastCompleted") == "false") {
          let breakfastScript = getProperty("breakfastScript");

          if (breakfastScript == "") {
            breakfastScript = "breakfast";
          }

          cliExecute(breakfastScript);
        }

        if (
          availableAmount(this.flimsyScraps) > 0 &&
          availableAmount(this.birchBattery) == 0
        ) {
          cliExecute("acquire " + this.birchBattery.name);
        }
      },
    };
  }

  getId(): QuestType {
    return "Misc / InitialStart";
  }
}
