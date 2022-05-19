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
  myMeat,
  print,
  setProperty,
  squareRoot,
  toBoolean,
  toInt,
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
  property: string = "greyYouLastPowerLeveled";
  familiar: Familiar = Familiar.get("Grey Goose");
  equip: Item = Item.get("Grey Down Vest");
  desiredLevel: number;
  weightRequired: number;
  spaceBlanket: Item = Item.get("Space Blanket");
  mayday: Item = Item.get("MayDay™ supply package");

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

    return QuestStatus.COMPLETED;
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        if (!hippyStoneBroken() && toBoolean(getProperty("auto_pvpEnable"))) {
          visitUrl("peevpee.php?action=smashstone&pwd&confirm=on", true);
          visitUrl("peevpee.php?place=fight");
        }

        cliExecute("boombox food");

        if (!GreySettings.isHardcoreMode()) {
          GreyPulls.pullStartingGear();
        }

        use(this.mayday);

        if (availableAmount(this.spaceBlanket) > 0) {
          autosell(this.spaceBlanket, 1);
        }

        cliExecute("breakfaster");
      },
    };
  }

  getId(): QuestType {
    return "Misc / InitialStart";
  }
}
