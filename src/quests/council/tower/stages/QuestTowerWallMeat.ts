import { Location, Familiar, myBasestat, Stat, Skill } from "kolmafia";
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

export class QuestTowerWallMeat implements QuestInfo {
  getId(): QuestType {
    return "Council / Tower / WallOfMeat";
  }

  level(): number {
    return 13;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL13Final");

    if (status < 7) {
      return QuestStatus.NOT_READY;
    }

    if (status > 7) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();
    outfit.meatDropWeight = 5;
    outfit.addBonus("+0.01 moxie");

    return {
      outfit: outfit,
      familiar: Familiar.get("Hobo Monkey"),
      disableFamOverride: true,
      location: null,
      run: () => {
        greyAdv(
          "place.php?whichplace=nstower&action=ns_06_monster2",
          outfit,
          new AdventureSettings().setFinishingBlowMacro(
            Macro.trySkillRepeat(Skill.get("Infinite Loop"))
          )
        );
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
