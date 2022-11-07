import {
  Location,
  Skill,
  haveSkill,
  Monster,
  turnsPlayed,
  maximize,
  numericModifier,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { canGreyAdventure } from "../../utils/GreyUtils";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestSkillConiferPolymers implements QuestInfo {
  location: Location = Location.get("The Bat Hole Entrance");
  monster: Monster = Monster.get("Pine Bat");
  skill: Skill = Skill.get("Conifer Polymers");
  hasRes: boolean = false;
  nextCheck: number = 0;

  getId(): QuestType {
    return "Skills / Conifer Polymers";
  }

  level(): number {
    return 7;
  }

  status(): QuestStatus {
    if (this.hasRes || haveSkill(this.skill)) {
      return QuestStatus.COMPLETED;
    }

    if (getQuestStatus("questM20Necklace") > 0) {
      return QuestStatus.COMPLETED;
    }

    if (turnsPlayed() >= this.nextCheck) {
      this.nextCheck = turnsPlayed() + 5;
      maximize("stench res -tie", true);
      this.hasRes =
        numericModifier("Generated:_spec", "Stench Resistance") >= 4;
    }

    if (getQuestStatus("questL09Topping") < 1) {
      return QuestStatus.NOT_READY;
    }

    if (!canGreyAdventure(this.location)) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit();

    if (this.location.combatPercent < 100) {
      outfit.setPlusCombat();
    }

    return {
      location: this.location,
      outfit: outfit,
      orbs: [this.monster],
      run: () => {
        const settings = new AdventureSettings();
        settings.addNoBanish(this.monster);

        greyAdv(this.location, outfit, settings);
      },
    };
  }

  getLocations(): Location[] {
    return [this.location];
  }
}
