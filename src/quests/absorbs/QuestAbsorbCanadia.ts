import {
  availableAmount,
  canadiaAvailable,
  currentRound,
  Familiar,
  familiarWeight,
  getProperty,
  handlingChoice,
  Item,
  Location,
  Monster,
  Skill,
} from "kolmafia";
import { ResourceCategory } from "../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../typings/TaskInfo";
import { AbsorbsProvider } from "../../utils/GreyAbsorber";
import { getMoonZone, GreySettings, MoonZone } from "../../utils/GreySettings";
import { Macro } from "../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";
import { QuestMoonSignAbsorb } from "./QuestMoonSignAbsorb";

export class QuestAbsorbCanadia extends QuestMoonSignAbsorb {
  monster: Monster = Monster.get("cloud of disembodied whiskers");
  location: Location = Location.get("Outskirts of Camp Logging Camp");
  moonZone: MoonZone = "Canadia";

  getId(): QuestType {
    return "Absorbs / Canadia";
  }
}
