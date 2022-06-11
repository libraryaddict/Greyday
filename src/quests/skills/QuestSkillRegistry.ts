import { Location, Familiar, Skill, Monster } from "kolmafia";
import { AbsorbsProvider } from "../../utils/GreyAbsorber";
import { getLocations } from "../../utils/GreyLocations";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";
import { QuestMPRegen } from "./QuestMPRegen";
import { QuestSkillAbstract } from "./QuestSkillAbstract";
import {
  QuestSkillColdDamage10,
  QuestSkillColdDamage15,
} from "./QuestSkillColdDamage";
import { QuestSkillDoubleNanovision } from "./QuestSkillDoubleNanovision";
import { QuestSkillSystemSweep } from "./QuestSkillSystemSweep";

export class QuestSkillRegistry implements QuestInfo {
  children: QuestInfo[] = [];

  constructor() {
    /*
  | "Skills / MPRegen"
  | "Skills / HPRegen"
  | "Skills / ScalingItem"
  | "Skills / ScalingDR"
  | "Skills / InfiniteLoop"
  | "Skills / Shroud"
  | "Skills / Hoonk"
  | "Skills / PhaseShift"
  | "Skills / ConiferPolymers";
  */

    this.addSkill("Skills / Phase Shift");
    this.addSkill("Skills / Conifer Polymers");
    this.addSkill("Skills / Photonic Shroud");
    this.addSkill("Skills / Piezoelectric Honk");
    this.addSkill(
      "Skills / ScalingItem",
      Skill.get("Gravitational Compression")
    );
    this.addSkill("Skills / HPRegen", Skill.get("Fluid Dynamics Simulation"));
    this.addSkill("Skills / ScalingDR", Skill.get("Subatomic Hardening"));
    this.addSkill("Skills / ScalingMeat", Skill.get("Ponzi Apparatus"));

    this.children.push(new QuestMPRegen());
    this.children.push(new QuestSkillSystemSweep());
    this.children.push(
      new QuestSkillAbstract(
        11,
        Location.get("The Hidden Park"),
        Monster.get("pygmy witch lawyer"),
        Skill.get("Infinite Loop"),
        "Skills / Infinite Loop"
      )
    );
    this.children.push(new QuestSkillColdDamage15());
    this.children.push(new QuestSkillColdDamage10());
    this.children.push(new QuestSkillDoubleNanovision());
  }

  addSkill(questType: QuestType, skill?: Skill) {
    if (skill == null) {
      skill = Skill.get(
        questType.substring(questType.lastIndexOf("/") + 1).trim()
      );
    }

    if (skill == Skill.get("None")) {
      throw "There's no skill found for " + questType;
    }

    let location: Location;
    let monster: Monster;

    for (let absorb of AbsorbsProvider.loadAbsorbs()) {
      if (absorb.skill != skill) {
        continue;
      }

      let locs = getLocations(absorb.monster);

      if (locs.length != 1) {
        throw (
          "Expected to find only one location, instead received multiple when trying to handle " +
          questType
        );
      }

      location = locs[0];
      monster = absorb.monster;
      break;
    }

    if (location == null) {
      throw (
        "No location / monster found for the skill " +
        skill.name +
        " and type " +
        questType
      );
    }

    let level = Math.max(5, Math.sqrt(location.recommendedStat) * 1.5);

    this.children.push(
      new QuestSkillAbstract(level, location, monster, skill, questType)
    );
  }

  getId(): QuestType {
    return "Skills / Parent";
  }

  level(): number {
    return -1;
  }

  status(): QuestStatus {
    return QuestStatus.COMPLETED;
  }

  run(): QuestAdventure {
    throw new Error("Method not implemented.");
  }

  getLocations(): Location[] {
    return [];
  }

  getChildren(): QuestInfo[] {
    return this.children;
  }
}
