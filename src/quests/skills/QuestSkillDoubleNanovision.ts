import {
  Location,
  Familiar,
  toInt,
  getProperty,
  myAscensions,
  Skill,
  haveSkill,
  Item,
  availableAmount,
  itemAmount,
  putCloset,
} from "kolmafia";
import { greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestSkillDoubleNanovision implements QuestInfo {
  bowling: Location = Location.get("The Hidden Bowling Alley");
  skill: Skill = Skill.get("Double Nanovision");
  ball: Item = Item.get("Bowling Ball");

  getId(): QuestType {
    return "Skills / DoubleNanovision";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    if (haveSkill(this.skill)) {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("questL11Spare") != "finished") {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: this.bowling,
      run: () => {
        if (itemAmount(this.ball) > 0) {
          putCloset(this.ball, itemAmount(this.ball));
        }

        greyAdv(this.bowling);
      },
    };
  }

  getLocations(): Location[] {
    return [this.bowling];
  }
}
