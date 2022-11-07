import {
  Location,
  Monster,
} from "kolmafia";
import { MoonZone } from "../../utils/GreySettings";
import { QuestType } from "../QuestTypes";
import { QuestMoonSignAbsorb } from "./QuestMoonSignAbsorb";

export class QuestAbsorbKnoll extends QuestMoonSignAbsorb {
  location: Location = Location.get("The Bugbear Pen");
  monster: Monster = Monster.get("Revolving Bugbear");
  moonZone: MoonZone = "Knoll";

  getId(): QuestType {
    return "Absorbs / Knoll";
  }
}
