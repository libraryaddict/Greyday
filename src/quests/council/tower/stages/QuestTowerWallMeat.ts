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
  cliExecute,
  haveFamiliar,
  getProperty,
  useFamiliar,
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

  hasDrunkMeat(): boolean {
    return getProperty("_roboDrinks").includes("drive-by shooting");
  }

  run(): QuestAdventure {
    return {
      outfit: GreyOutfit.IGNORE_OUTFIT,
      location: null,
      run: () => {
        let robo = Familiar.get("Grey Goose");

        if (haveFamiliar(robo) && this.hasDrunkMeat()) {
          useFamiliar(Familiar.get("Robortender"));
        } else if (haveFamiliar(Familiar.get("Hobo Monkey"))) {
          useFamiliar(Familiar.get("Hobo Monkey"));
        }

        cliExecute("maximize +5 meat +0.03 moxie +100 hp 200 min 500 max");

        if (myMaxhp() < 200) {
          throw "Max HP too low! Run +meat and kill the wall of meat yourself?";
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
