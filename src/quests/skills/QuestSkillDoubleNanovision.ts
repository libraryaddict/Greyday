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
  Monster,
  isBanished,
} from "kolmafia";
import { greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestSkillDoubleNanovision implements QuestInfo {
  bowling: Location = Location.get("The Hidden Bowling Alley");
  skill: Skill = Skill.get("Double Nanovision");
  ball: Item = Item.get("Bowling Ball");
  drunk: Monster = Monster.get("Drunk pygmy");

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

    if (isBanished(this.drunk)) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: this.bowling,
      orbs: [this.drunk],
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
