import {
  availableAmount,
  Effect,
  Familiar,
  getProperty,
  haveEffect,
  Item,
  Location,
  numericModifier,
  Skill,
  toInt,
  toItem,
  use,
  useSkill,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import { hasNonCombatSkillsReady } from "../../../GreyAdventurer";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestManorBillards implements QuestInfo {
  billards: Location = Location.get("The Haunted Billiards Room");
  chalk: Item = Item.get("Handful of hand chalk");
  chalkEffect: Effect = Effect.get("Chalky Hand");
  invis: Effect = Effect.get("Invisible Avatar");
  invisSkill: Skill = Skill.get("CHEAT CODE: Invisible Avatar");
  key: Item = Item.get("[7302]Spookyraven library key");

  getId(): QuestType {
    return "Manor / Billards";
  }

  level(): number {
    return 8;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questM20Necklace");

    if (status < 1) {
      return QuestStatus.NOT_READY;
    }

    if (status > 2 || availableAmount(this.key) > 0) {
      return QuestStatus.COMPLETED;
    }

    if (!hasNonCombatSkillsReady()) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setNoCombat();

    outfit.addItem(Item.get("Staff of Fats"));
    outfit.addItem(Item.get("pool cue"));

    return {
      outfit: outfit,
      location: this.billards,
      run: () => {
        if (
          haveEffect(this.chalkEffect) == 0 &&
          availableAmount(this.chalk) > 0
        ) {
          use(this.chalk);
        }

        if (haveEffect(this.invis) == 0) {
          //  useSkill(this.invisSkill);
        }

        let props = new PropertyManager();
        let poolSkill =
          toInt(getProperty("poolSkill")) + numericModifier("pool skill") + 10;

        try {
          props.setChoice(875, poolSkill >= 14 ? 1 : 2); //Fight or train
          greyAdv(this.billards, outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.billards];
  }
}
