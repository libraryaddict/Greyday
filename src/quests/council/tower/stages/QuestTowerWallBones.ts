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

export class QuestTowerWallBones implements QuestInfo {
  knife: Item = Item.get("Electric Boning Knife");
  boning: QuestInfo = new QuestTowerBoningKnife();

  getChildren(): QuestInfo[] {
    return [this.boning];
  }

  getId(): QuestType {
    return "Council / Tower / WallOfBones";
  }

  level(): number {
    return 13;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL13Final");

    if (status < 8) {
      return QuestStatus.NOT_READY;
    }

    if (status > 8) {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.knife) == 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        let macro = new Macro().tryItem(this.knife);

        greyAdv(
          "place.php?whichplace=nstower&action=ns_07_monster3",
          null,
          new AdventureSettings().setStartOfFightMacro(macro)
        );
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}

export class QuestTowerBoningKnife implements QuestInfo {
  knife: Item = Item.get("Electric Boning Knife");
  loc: Location = Location.get(
    "The Castle in the Clouds in the Sky (Ground Floor)"
  );

  getId(): QuestType {
    return "Council / Tower / WallOfBones / BoningKnife";
  }

  level(): number {
    return 13;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL13Final");

    if (status < 8) {
      return QuestStatus.NOT_READY;
    }

    if (status > 8) {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.knife) > 0) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setNoCombat();

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        let props = new PropertyManager();

        try {
          props.setChoice(672, 1);
          props.setChoice(673, 1);
          props.setChoice(674, 1);
          props.setChoice(1026, 2);

          greyAdv(this.loc, outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
