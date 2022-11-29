import {
  autosell,
  availableAmount,
  cliExecute,
  Familiar,
  familiarEquipment,
  getProperty,
  haveFamiliar,
  haveSkill,
  hippyStoneBroken,
  Item,
  Location,
  myFamiliar,
  myMeat,
  print,
  runChoice,
  Skill,
  toBoolean,
  use,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import { PossiblePath, TaskInfo } from "../../typings/TaskInfo";
import { doFortuneTeller } from "../../utils/GreyClan";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { GreySettings } from "../../utils/GreySettings";
import { deleteJunkKmails } from "../../utils/KmailUtils";
import { PropertyManager } from "../../utils/Properties";
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
  paths: PossiblePath[];

  createPaths(assumeUnstarted: boolean) {
    this.paths = [];
    this.paths.push(new PossiblePath(0));
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

  mustBeDone(): boolean {
    return true;
  }

  free(): boolean {
    return true;
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

    if (availableAmount(this.saber) > 0 && getProperty("_saberMod") == "0") {
      return QuestStatus.READY;
    }

    if (getProperty("breakfastCompleted") == "false") {
      if (myMeat() >= 400) {
        return QuestStatus.READY;
      }

      return QuestStatus.NOT_READY;
    }

    return QuestStatus.COMPLETED;
  }

  run(path: PossiblePath): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
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
          getProperty("telegraphOfficeAvailable") == "true" &&
          availableAmount(Item.get("Your cowboy boots")) == 0
        ) {
          visitUrl("place.php?whichplace=town_right&action=townright_ltt");
          runChoice(8);
        }

        const clipFams: [Familiar, Item][] = GreySettings.greyClipArt
          .split(",")
          .filter((s) => s.length != 0)
          .map((s) => Familiar.get(s))
          .map((f) => [f, familiarEquipment(f)] as [Familiar, Item])
          .filter(([f, e]) => availableAmount(e) == 0 && haveFamiliar(f));

        const clipArt = Skill.get("Summon Clip Art");
        const jacks = Item.get("box of familiar jacks");

        for (const [fam, item] of clipFams) {
          if (!haveSkill(clipArt) || clipArt.dailylimit <= 0) {
            break;
          }

          if (availableAmount(item) > 0) {
            continue;
          }

          print(
            `Using the familiar ${fam.toString()} to acquire fam equip ${item} from Summon Clip Art`,
            "blue"
          );

          if (availableAmount(jacks) == 0) {
            cliExecute("acquire box of familiar jacks");
          }

          useFamiliar(fam);
          use(jacks);
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

        if (getProperty("breakfastCompleted") == "false" && myMeat() >= 400) {
          let breakfastScript = getProperty("breakfastScript");
          const props = new PropertyManager();
          props.setProperty("grabCloversSoftcore", "true");
          props.setProperty("grabCloversHardcore", "true");

          doFortuneTeller();

          try {
            if (breakfastScript == "") {
              breakfastScript = "breakfast";
            }

            cliExecute(breakfastScript);

            if (availableAmount(Item.get("11-leaf Clover")) == 0) {
              print(
                "Don't see any clovers available, maybe mafia hiccuped? Trying breakfast again..",
                "gray"
              );
              cliExecute(breakfastScript);
            }
          } finally {
            props.resetAll();
          }

          deleteJunkKmails();
        }

        if (
          availableAmount(this.flimsyScraps) > 0 &&
          availableAmount(this.birchBattery) == 0
        ) {
          cliExecute("acquire " + this.birchBattery.name);
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
