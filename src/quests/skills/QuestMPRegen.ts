import { canAdv } from "canadv.ash";
import {
  Location,
  Familiar,
  Item,
  Effect,
  haveEffect,
  myMeat,
  getProperty,
  toInt,
  myAscensions,
  availableAmount,
  use,
  visitUrl,
  retrieveItem,
  extractItems,
  getRelated,
  myDaycount,
  setProperty,
  print,
  Skill,
  haveSkill,
} from "kolmafia";
import { PropertyManager } from "../../utils/Properties";
import { hasNonCombatSkillsReady } from "../../GreyAdventurer";
import { greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { GreyPulls } from "../../utils/GreyResources";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestMPRegen implements QuestInfo {
  realDung: Location = Location.get("The Dungeons of Doom");
  wand: Item[] = [
    "aluminum wand",
    "ebony wand",
    "hexagonal wand",
    "marble wand",
    "pine wand",
  ].map((s) => Item.get(s));
  deadMimic: Item = Item.get("dead mimic");
  skill: Skill = Skill.get("Hivemindedness");

  getId(): QuestType {
    return "Skills / MPRegen";
  }

  level(): number {
    return 8;
  }

  shouldHaveWand(): boolean {
    return toInt(getProperty("lastZapperWand")) == myAscensions();
  }

  getTimesZapped(): number {
    return toInt(getProperty("_zapCount"));
  }

  status(): QuestStatus {
    if (haveSkill(this.skill)) {
      return QuestStatus.COMPLETED;
    }

    if (this.getWand() == null) {
      if (myMeat() < 5000 || getQuestStatus("questL11Black") < 3) {
        return QuestStatus.NOT_READY;
      }

      if (!hasNonCombatSkillsReady()) {
        return QuestStatus.FASTER_LATER;
      }
    }

    return QuestStatus.READY;
  }

  getWand(): Item {
    return this.wand.find((w) => availableAmount(w) > 0);
  }

  hasWandExploded() {
    return toInt(getProperty("lastZapperWandExplosionDay")) == myDaycount();
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();
    let seekingWand = this.getWand() == null && myMeat() >= 5000;

    if (this.getWand() == null) {
      outfit.setNoCombat();
    } else {
      outfit.plusCombatWeight = 1;
    }

    return {
      outfit: outfit,
      location: this.realDung,
      run: () => {
        let props = new PropertyManager();

        props.setChoice(25, seekingWand ? 2 : 4);

        try {
          greyAdv(this.realDung, outfit);
        } finally {
          props.resetAll();
        }

        if (availableAmount(this.deadMimic) > 0) {
          use(this.deadMimic);

          if (this.getWand() == null) {
            print(
              "Something has gone wrong. We used a dead mimic but didn't get a wand."
            );
          }
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.realDung];
  }
}
