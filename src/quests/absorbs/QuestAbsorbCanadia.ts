import {
  Location,
  Monster,
} from "kolmafia";
import { MoonZone } from "../../utils/GreySettings";
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
