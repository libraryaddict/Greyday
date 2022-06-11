import {
  cliExecute,
  Effect,
  effectModifier,
  Familiar,
  getFuel,
  getProperty,
  getWorkshed,
  haveEffect,
  haveSkill,
  Item,
  Location,
  Monster,
  myMeat,
  Skill,
  toInt,
  use,
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
  canOfPaint: Item = Item.get("Can of black paint");
  asdonMartin: Item = Item.get("Asdon Martin keyfob");
  driveSafe: Effect = Effect.get("Driving Safely");

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

    if (status < 0 || getQuestStatus("questL11Black") < 2 || myMeat() < 1200) {
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
        if (toInt(getProperty("manorDrawerCount")) < 20) {
          if (haveEffect(effectModifier(this.canOfPaint, "Effect")) == 0) {
            cliExecute("acquire 1 " + this.canOfPaint.name);
            use(this.canOfPaint);
          }

          if (
            getWorkshed() == this.asdonMartin &&
            haveEffect(this.driveSafe) == 0 &&
            getFuel() >= 37
          ) {
            cliExecute("asdonmartin drive safely");
          }
        }

        greyAdv(this.kitchen, outfit);
      },
    };
  }

  getLocations(): Location[] {
    return [this.kitchen];
  }
}
