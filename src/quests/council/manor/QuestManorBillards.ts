import {
  availableAmount,
  Effect,
  Familiar,
  getProperty,
  haveEffect,
  Item,
  Location,
  Monster,
  numericModifier,
  Skill,
  toInt,
  toItem,
  use,
  useSkill,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import { hasNonCombatSkillsReady } from "../../../GreyAdventurer";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { GreySettings } from "../../../utils/GreySettings";

export class QuestManorBillards implements QuestInfo {
  billards: Location = Location.get("The Haunted Billiards Room");
  chalk: Item = Item.get("Handful of hand chalk");
  chalkEffect: Effect = Effect.get("Chalky Hand");
  invis: Effect = Effect.get("Invisible Avatar");
  invisSkill: Skill = Skill.get("CHEAT CODE: Invisible Avatar");
  key: Item = Item.get("[7302]Spookyraven library key");
  cue: Item = Item.get("pool cue");
  poolgeist: Monster = Monster.get("pooltergeist");
  toAbsorb: Monster[];

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

    if (!hasNonCombatSkillsReady(false)) {
      return QuestStatus.NOT_READY;
    }

    if (!hasNonCombatSkillsReady()) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();

    if (
      availableAmount(this.cue) == 0 ||
      haveEffect(this.chalkEffect) > 0 ||
      availableAmount(this.chalk) > 0
    ) {
      outfit.setNoCombat();
    }

    outfit.addItem(this.cue);
    outfit.addBonus("+10 elemental dmg 1 min 1 max");

    return {
      outfit: outfit,
      location: this.billards,
      run: () => {
        if (
          availableAmount(this.cue) > 0 &&
          haveEffect(this.chalkEffect) == 0 &&
          availableAmount(this.chalk) > 0
        ) {
          use(this.chalk);
        }

        let settings = new AdventureSettings();

        if (
          !haveEffect(this.chalkEffect) &&
          !this.toAbsorb.includes(this.poolgeist)
        ) {
          settings.addBanish(this.poolgeist);
        }

        let props = new PropertyManager();
        let poolSkill =
          toInt(getProperty("poolSkill")) + numericModifier("pool skill") + 10;

        try {
          props.setChoice(
            875,
            poolSkill >= 14 || haveEffect(this.chalkEffect) == 0 ? 1 : 2
          ); //Fight or train
          greyAdv(this.billards, outfit, settings);
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
