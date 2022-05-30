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
  toBoolean,
  toInt,
  turnsPlayed,
  use,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { GreyPulls } from "../../utils/GreyResources";
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

  getLocations(): Location[] {
    return [];
  }

  level(): number {
    return 0;
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
        if (!hippyStoneBroken() && toBoolean(getProperty("auto_pvpEnable"))) {
          print("Enabling pvp as it was set to true in autoscend", "blue");
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
          cliExecute("boombox food");
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
      },
    };
  }

  getId(): QuestType {
    return "Misc / InitialStart";
  }
}
