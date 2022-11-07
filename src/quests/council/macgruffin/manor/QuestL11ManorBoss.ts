import { Location, Skill } from "kolmafia";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { Macro } from "../../../../utils/MacroBuilder";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11ManorBoss implements QuestInfo {
  summoning: Location = Location.get("Summoning Chamber");

  getId(): QuestType {
    return "Council / MacGruffin / Manor / Boss";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL11Manor");

    if (status < 3) {
      return QuestStatus.NOT_READY;
    }

    if (status > 3) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: this.summoning,
      run: () => {
        greyAdv(
          "place.php?whichplace=manor4&action=manor4_chamberboss",
          null,
          new AdventureSettings().setStartOfFightMacro(
            Macro.skill(Skill.get("Infinite Loop"))
          )
        );
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
