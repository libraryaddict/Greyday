import {
  Location,
  Monster,
} from "kolmafia";
import { MoonZone } from "../../utils/GreySettings";
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
