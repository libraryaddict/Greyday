import {
  autosell,
  availableAmount,
  cliExecute,
  Familiar,
  getProperty,
  hippyStoneBroken,
  inHardcore,
  Item,
  Location,
  Monster,
  myFamiliar,
  print,
  setProperty,
  toBoolean,
  use,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import { ResourceCategory } from "../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../typings/TaskInfo";
import { GreySettings } from "../../utils/GreySettings";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestInitialStart extends TaskInfo implements QuestInfo {
  familiar: Familiar = Familiar.get("Grey Goose");
  equip: Item = Item.get("Grey Down Vest");
  desiredLevel: number;
  weightRequired: number;
  spaceBlanket: Item = Item.get("Space Blanket");
  mayday: Item = Item.get("MayDay supply package");
  saber: Item = Item.get("Fourth of May Cosplay Saber");
  flimsyScraps: Item = Item.get("Flimsy hardwood scraps");
  birchBattery: Item = Item.get("Birch battery");
  mummingTrunk: Item = Item.get("mumming trunk");
  mickyCard: Item = Item.get("1952 Mickey Mantle card");
  paths: PossiblePath[];

  createPaths(assumeUnstarted: boolean) {
    this.paths = [];
    this.paths.push(new PossiblePath(0));

    if (!assumeUnstarted) {
      if (getProperty("_deckCardsSeen").includes("Mickey")) {
        return;
      }
    }

    const cardPath = new PossiblePath(0);
    cardPath.addMeat(-30000); // Say the initial meat is worth 20k of boombox profit with special seasoning, then 10k for the card worth,

    this.paths.push(cardPath);
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  getLocations(): Location[] {
    return [];
  }

  level(): number {
    return 1;
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

  run(path: PossiblePath): QuestAdventure {
    return {
      location: null,
      run: () => {
        if (!hippyStoneBroken() && toBoolean(getProperty("greyEnablePvP"))) {
          print("Enabling pvp as defined by 'greyEnablePvP'", "blue");
          visitUrl("peevpee.php?action=smashstone&pwd&confirm=on", true);
          visitUrl("peevpee.php?place=fight");
        }

        if (
          getProperty("backupCameraReverserEnabled") != "true" &&
          availableAmount(Item.get("Backup Camera")) > 0
        ) {
          print("Now reversing the backup camera..", "blue");
          cliExecute("backupcamera reverser on");
        }

        if (
          availableAmount(this.saber) > 0 &&
          getProperty("_saberMod") == "0"
        ) {
          cliExecute("saber resistance");
        }

        if (
          GreySettings.greyUseMummery &&
          getProperty("_mummeryUses") == "" &&
          availableAmount(this.mummingTrunk) > 0
        ) {
          useFamiliar(this.familiar);

          if (myFamiliar() == this.familiar) {
            cliExecute("mummery mp");
          } else {
            print("Unable to apply mp regen on goose", "Red");
          }
        }

        if (
          availableAmount(Item.get("SongBoom&trade; BoomBox")) > 0 &&
          getProperty("_boomBoxSongsLeft") == "11"
        ) {
          cliExecute("boombox meat");
        }

        if (availableAmount(this.mayday) > 0) {
          use(this.mayday);

          if (availableAmount(this.spaceBlanket) > 0) {
            autosell(this.spaceBlanket, 1);
          }
        }

        if (getProperty("breakfastCompleted") == "false") {
          let breakfastScript = getProperty("breakfastScript");
          const cloverProp =
            "grabClovers" + (inHardcore() ? "Hardcore" : "Softcore");
          const propValue = getProperty(cloverProp);

          try {
            setProperty(cloverProp, "true");

            if (breakfastScript == "") {
              breakfastScript = "breakfast";
            }

            cliExecute(breakfastScript);
          } finally {
            setProperty(cloverProp, propValue);
          }
        }

        if (
          availableAmount(this.flimsyScraps) > 0 &&
          availableAmount(this.birchBattery) == 0
        ) {
          cliExecute("acquire " + this.birchBattery.name);
        }

        if (path.canUse(ResourceCategory.DECK_OF_EVERY_CARD_CHEAT)) {
          path
            .getResource(ResourceCategory.DECK_OF_EVERY_CARD_CHEAT)
            .pickCard("Mickey");

          if (availableAmount(this.mickyCard) > 0) {
            path.addUsed(ResourceCategory.DECK_OF_EVERY_CARD_CHEAT);
            autosell(this.mickyCard, 1);
          } else {
            throw "Expected to have sold a " + this.mickyCard;
          }
        }

        if (getProperty("breakfastCompleted") == "false") {
          throw "Failed to complete breakfast! Did you set something that doesn't call breakfast, to `breakfastScript`?";
        }
      },
    };
  }

  getId(): QuestType {
    return "Misc / InitialStart";
  }
}
