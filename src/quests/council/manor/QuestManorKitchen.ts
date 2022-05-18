import { Familiar, haveSkill, Location, Skill } from "kolmafia";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestManorKitchen implements QuestInfo {
  kitchen: Location = Location.get("The Haunted Kitchen");
  stenchResist: Skill = Skill.get("Conifer Polymers");

  getId(): QuestType {
    return "Manor / Kitchen";
  }

  level(): number {
    return 8;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questM20Necklace");

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    if (!haveSkill(this.stenchResist)) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit()
      .addBonus("+4 hot res")
      .addBonus("+4 stench res");

    return {
      outfit: outfit,
      location: this.kitchen,
      run: () => {
        greyAdv(this.kitchen, outfit);
      },
    };
  }

  getLocations(): Location[] {
    return [this.kitchen];
  }
}
