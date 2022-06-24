import {
  Location,
  Familiar,
  myBasestat,
  Stat,
  Skill,
  myHp,
  maximize,
  myMaxhp,
  print,
} from "kolmafia";
import { restoreHPTo } from "../../../../tasks/TaskMaintainStatus";
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
    return {
      outfit: new GreyOutfit("-tie"),
      location: null,
      run: () => {
        let result = maximize(
          "+5 meat +0.03 moxie +0.01 hp 300 min +switch hobo monkey +switch robortender",
          false
        );

        if (!result) {
          print("Failed maximizer? Weird.", "red");
          throw "Failed maximizer..";
        }

        restoreHPTo(Math.min(myMaxhp(), 600));

        if (myHp() < 200) {
          throw "HP too low";
        }

        greyAdv(
          "place.php?whichplace=nstower&action=ns_06_monster2",
          null,
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
