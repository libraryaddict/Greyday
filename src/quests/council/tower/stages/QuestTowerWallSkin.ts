import { Location, Familiar, Item, availableAmount } from "kolmafia";
import { PropertyManager } from "../../../../utils/Properties";
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
import { DelayBurners } from "../../../../iotms/delayburners/DelayBurners";

export class QuestTowerWallSkin implements QuestInfo {
  beehive: Item = Item.get("Beehive");
  forest: QuestInfo = new QuestTowerBeeHive();

  getChildren(): QuestInfo[] {
    return [this.forest];
  }

  getId(): QuestType {
    return "Council / Tower / WallOfSkin";
  }

  level(): number {
    return 13;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL13Final");

    if (status < 6) {
      return QuestStatus.NOT_READY;
    }

    if (status > 6) {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.beehive) == 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        greyAdv(
          "place.php?whichplace=nstower&action=ns_05_monster1",
          null,
          new AdventureSettings().setStartOfFightMacro(
            Macro.tryItem(this.beehive)
          )
        );
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}

export class QuestTowerBeeHive implements QuestInfo {
  beehive: Item = Item.get("Beehive");
  blackForest: Location = Location.get("The Black Forest");

  getId(): QuestType {
    return "Council / Tower / WallOfSkin / Beehive";
  }

  level(): number {
    return 13;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL13Final");

    if (status < 6) {
      return QuestStatus.NOT_READY;
    }

    if (status > 6 || availableAmount(this.beehive) > 0) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setNoCombat();

    return {
      outfit: outfit,
      location: this.blackForest,
      run: () => {
        let props = new PropertyManager();
        DelayBurners.tryReplaceCombats();

        try {
          props.setChoice(924, 3); // Beezzzz
          props.setChoice(1018, 1);
          props.setChoice(1019, 1);

          greyAdv(this.blackForest, outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  needAdventures(): number {
    return 3;
  }
}
