import {
  Location,
  Familiar,
  Monster,
  knollAvailable,
  familiarWeight,
} from "kolmafia";
import { ResourceCategory, ResourceId } from "../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../typings/TaskInfo";
import { AbsorbsProvider } from "../../utils/GreyAbsorber";
import { greyAdv } from "../../utils/GreyLocations";
import { MoonZone } from "../../utils/GreySettings";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";
import { QuestMoonSignAbsorb } from "./QuestMoonSignAbsorb";

export class QuestAbsorbGnomads extends QuestMoonSignAbsorb {
  location: Location = Location.get("Thugnderdome");
  monster: Monster = Monster.get("Vicious gnauga");
  moonZone: MoonZone = "Gnomad";

  getId(): QuestType {
    return "Absorbs / Gnomads";
  }
}
