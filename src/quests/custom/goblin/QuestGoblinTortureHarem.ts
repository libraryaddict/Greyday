import { Location, getProperty } from "kolmafia";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { canGreyAdventure } from "../../../utils/GreyUtils";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestGoblinTortureHarem implements QuestInfo {
  harem: Location = Location.get("Cobb's Knob Harem");
  lab: Location = Location.get("Cobb's Knob Laboratory");

  getId(): QuestType {
    return "GoblinLabs / LabUnlock";
  }

  level(): number {
    return 5;
  }

  status(): QuestStatus {
    if (canGreyAdventure(this.lab)) {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("questL05Goblin") != "finished") {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit().setNoCombat();

    return {
      outfit: outfit,
      location: this.harem,
      run: () => {
        greyAdv(this.harem, outfit);
      },
    };
  }

  getLocations(): Location[] {
    return [this.harem];
  }
}
