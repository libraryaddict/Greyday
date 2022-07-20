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
  getZapWand,
  Monster,
} from "kolmafia";
import { PropertyManager } from "../../utils/Properties";
import { hasNonCombatSkillsReady } from "../../GreyAdventurer";
import { AdventureSettings, greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { GreyPulls } from "../../utils/GreyResources";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { QuestType } from "../QuestTypes";
import { canAdv } from "canadv.ash";

export class QuestSkillConiferPolymers implements QuestInfo {
  location: Location = Location.get("The Bat Hole Entrance");
  monster: Monster = Monster.get("Pine Bat");
  skill: Skill = Skill.get("Conifer Polymers");

  getId(): QuestType {
    return "Skills / Conifer Polymers";
  }

  level(): number {
    return 4;
  }

  status(): QuestStatus {
    if (haveSkill(this.skill)) {
      return QuestStatus.COMPLETED;
    }

    if (getQuestStatus("questM20Necklace") > 0) {
      return QuestStatus.COMPLETED;
    }

    if (!canAdv(this.location)) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();

    if (this.location.combatPercent < 100) {
      outfit.setPlusCombat();
    }

    return {
      location: this.location,
      outfit: outfit,
      run: () => {
        let settings = new AdventureSettings();
        settings.addNoBanish(this.monster);

        greyAdv(this.location, outfit, settings);
      },
    };
  }

  getLocations(): Location[] {
    return [this.location];
  }
}
