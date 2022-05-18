import { Location, Familiar, council, haveSkill, Skill } from "kolmafia";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL4BatsBoss implements QuestInfo {
  loc: Location = Location.get("The Boss Bat's Lair");

  getId(): QuestType {
    return "Council / Bats / Boss";
  }

  level(): number {
    return 4;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL04Bat");

    if (status < 3) {
      return QuestStatus.NOT_READY;
    }

    if (status == 100) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();
    outfit.meatDropWeight = 2;

    return {
      location: this.loc,
      run: () => {
        greyAdv(this.loc);

        if (haveSkill(Skill.get("Grey Noise"))) {
          council();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.loc];
  }
}
