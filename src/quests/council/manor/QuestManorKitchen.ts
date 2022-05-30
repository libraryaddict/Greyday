import {
  Familiar,
  getProperty,
  haveSkill,
  Location,
  Monster,
  Skill,
  toInt,
} from "kolmafia";
import { AbsorbsProvider, Reabsorbed } from "../../../utils/GreyAbsorber";
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
  albinoBat: Monster = Monster.get("Albino Bat");
  lastResist: number = 0;
  lastResistTurnCheck: number = 0;

  getId(): QuestType {
    return "Manor / Kitchen";
  }

  level(): number {
    return 8;
  }

  status(): QuestStatus {
    // Each 3 resist in each element is another drawer searched.
    // 21 drawers searched.
    // Max of 9 total res
    let status = getQuestStatus("questM20Necklace");

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    if (
      !haveSkill(this.stenchResist) &&
      !AbsorbsProvider.getReabsorbedMonsters().includes(this.albinoBat)
    ) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();

    if (toInt(getProperty("manorDrawerCount")) < 20) {
      outfit.addBonus("+10 hot res").addBonus("+10 stench res");
    }

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
