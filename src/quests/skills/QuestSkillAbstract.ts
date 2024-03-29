import { Location, Monster, Skill, haveSkill } from "kolmafia";
import { AdventureSettings, greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { canGreyAdventure } from "../../utils/GreyUtils";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestSkillAbstract implements QuestInfo {
  requiredLevel: number;
  location: Location;
  monster: Monster;
  skill: Skill;
  questName: QuestType;
  valid: () => boolean;

  constructor(
    level: number,
    location: Location,
    monster: Monster,
    skill: Skill,
    questName: QuestType,
    valid: () => boolean
  ) {
    this.requiredLevel = level;
    this.location = location;
    this.monster = monster;
    this.skill = skill;
    this.questName = questName;
    this.valid = valid;
  }

  getId(): QuestType {
    return this.questName;
  }

  level(): number {
    return this.requiredLevel;
  }

  status(): QuestStatus {
    if (haveSkill(this.skill)) {
      return QuestStatus.COMPLETED;
    }

    if (!canGreyAdventure(this.location)) {
      return QuestStatus.NOT_READY;
    }

    if (this.valid != null && !this.valid()) {
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
