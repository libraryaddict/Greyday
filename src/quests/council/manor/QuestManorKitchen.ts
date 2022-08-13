import {
  availableAmount,
  cliExecute,
  Effect,
  effectModifier,
  Familiar,
  getFuel,
  getProperty,
  getWorkshed,
  gnomadsAvailable,
  haveEffect,
  haveSkill,
  Item,
  knollAvailable,
  Location,
  maximize,
  Monster,
  myMeat,
  myTurncount,
  numericModifier,
  Skill,
  toInt,
  totalTurnsPlayed,
  use,
} from "kolmafia";
import { AbsorbsProvider, Reabsorbed } from "../../../utils/GreyAbsorber";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { getMoonZone, GreySettings } from "../../../utils/GreySettings";
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
  enoughRes: boolean = false;
  lastResistTurnCheck: number = 0;
  canOfPaint: Item = Item.get("Can of black paint");
  asdonMartin: Item = Item.get("Asdon Martin keyfob");
  driveSafe: Effect = Effect.get("Driving Safely");
  torso: Skill = Skill.get("Torso Awareness");
  spoon: Item = Item.get("hewn moon-rune spoon");
  scaleShirt: Item = Item.get("blessed rustproof +2 gray dragon scale mail");

  getId(): QuestType {
    return "Manor / Kitchen";
  }

  level(): number {
    return 8;
  }

  hasEnoughRes(): boolean {
    if (
      this.lastResistTurnCheck + (this.enoughRes ? 3 : 10) >
      totalTurnsPlayed()
    ) {
      return this.enoughRes;
    }

    this.lastResistTurnCheck = totalTurnsPlayed();

    maximize("hot res 9 max, stench res 9 max -tie", true);
    const hotRes = numericModifier("Generated:_spec", "Hot Resistance");
    const stenchRes = numericModifier("Generated:_spec", "Stench Resistance");

    this.enoughRes = hotRes >= 9 && stenchRes >= 9;

    return this.enoughRes;
  }

  status(): QuestStatus {
    // Each 3 resist in each element is another drawer searched.
    // 21 drawers searched.
    // Max of 9 total res
    const status = getQuestStatus("questM20Necklace");

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    // If we haven't purchased our vacation pass yet, don't even think about it.
    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    if (
      !haveSkill(this.torso) &&
      availableAmount(this.scaleShirt) > 0 &&
      (gnomadsAvailable() ||
        (availableAmount(this.spoon) > 0 &&
          getMoonZone(GreySettings.greyTuneMoonSpoon) == "Gnomad" &&
          getProperty("moonTuned") != "true"))
    ) {
      return QuestStatus.NOT_READY;
    }

    if (
      (getQuestStatus("questL11Black") <= 2 || myMeat() < 1200) &&
      !this.hasEnoughRes()
    ) {
      return QuestStatus.FASTER_LATER;
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
    const outfit = new GreyOutfit();

    if (toInt(getProperty("manorDrawerCount")) < 20) {
      outfit.addBonus("+10 hot res 9 max").addBonus("+10 stench res 9 max");
    }

    return {
      outfit: outfit,
      location: this.kitchen,
      run: () => {
        if (
          toInt(getProperty("manorDrawerCount")) < 20 &&
          !this.hasEnoughRes()
        ) {
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
