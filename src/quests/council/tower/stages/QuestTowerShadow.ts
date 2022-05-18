import {
  Location,
  Familiar,
  Item,
  myHp,
  cliExecute,
  myMaxhp,
  availableAmount,
  max,
} from "kolmafia";
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

export class QuestTowerShadow implements QuestInfo {
  badge: Item = Item.get("Attorney's badge");
  potato: Familiar = Familiar.get("Levitating Potato");
  guaze: Item = Item.get("Gauze garter");

  getId(): QuestType {
    return "Council / Tower / Shadow";
  }

  level(): number {
    return 13;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL13Final");

    if (status < 10) {
      return QuestStatus.NOT_READY;
    }

    if (status > 10) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let maximize = "hp +init";

    if (availableAmount(this.badge) > 0) {
      maximize += " +equip " + this.badge.name;
    }

    let outfit = new GreyOutfit(maximize);

    return {
      familiar: this.potato,
      outfit: outfit,
      location: null,
      run: () => {
        if (myHp() < myMaxhp()) {
          cliExecute("hottub");
        }

        let macro = Macro.item(this.guaze).repeat();

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
}
