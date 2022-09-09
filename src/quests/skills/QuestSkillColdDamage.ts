import {
  Location,
  Familiar,
  Skill,
  Monster,
  haveSkill,
  getProperty,
  canAdventure,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../utils/GreyLocations";
import { GreySettings } from "../../utils/GreySettings";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestSkillColdDamage15 implements QuestInfo {
  skill: Skill = Skill.get("Snow-Cooling System");
  monster: Monster = Monster.get("Snow Queen");
  location: Location = Location.get("The Icy Peak");

  getId(): QuestType {
    return "Skills / ColdDamage15";
  }

  level(): number {
    return 10;
  }

  status(): QuestStatus {
    if (
      haveSkill(this.skill) ||
      getQuestStatus("questL09Topping") > 0 ||
      !GreySettings.isHardcoreMode()
    ) {
      return QuestStatus.COMPLETED;
    }

    if (
      getProperty("questL08Trapper") != "finished" ||
      !canAdventure(this.location)
    ) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: this.location,
      orbs: [this.monster],
      run: () => {
        const settings = new AdventureSettings().addNoBanish(this.monster);

        greyAdv(this.location, null, settings);
      },
    };
  }

  getLocations(): Location[] {
    return [this.location];
  }
}

export class QuestSkillColdDamage10 implements QuestInfo {
  skill: Skill = Skill.get("Cooling Tubules");
  monster: Monster = Monster.get("Ninja Snowman Weaponmaster");
  location: Location = Location.get("Lair of the Ninja Snowmen");

  getId(): QuestType {
    return "Skills / ColdDamage10";
  }

  level(): number {
    return 10;
  }

  status(): QuestStatus {
    if (haveSkill(this.skill) || getQuestStatus("questL09Topping") > 0) {
      return QuestStatus.COMPLETED;
    }

    if (
      getQuestStatus("questL08Trapper") < 3 ||
      !canAdventure(this.location) ||
      !GreySettings.isHardcoreMode()
    ) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: this.location,
      run: () => {
        const settings = new AdventureSettings().addNoBanish(this.monster);

        greyAdv(this.location, null, settings);
      },
    };
  }

  getLocations(): Location[] {
    return [this.location];
  }
}
