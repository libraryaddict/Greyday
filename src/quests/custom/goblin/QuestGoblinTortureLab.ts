import { canAdventure, getProperty, Location } from "kolmafia";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { canGreyAdventure } from "../../../utils/GreyUtils";
import { QuestInfo, QuestStatus, QuestAdventure } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestGoblinTortureLab implements QuestInfo {
  lab: Location = Location.get("Cobb's Knob Laboratory");
  megL3: Location = Location.get("Menagerie Level 3");

  getLocations(): Location[] {
    return [this.lab];
  }

  getId(): QuestType {
    return "GoblinLabs / MegUnlock";
  }

  status(): QuestStatus {
    if (canGreyAdventure(this.megL3)) {
      return QuestStatus.COMPLETED;
    }

    if (
      !canGreyAdventure(this.lab) ||
      getProperty("questL05Goblin") != "finished"
    ) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit().setItemDrops();

    return {
      outfit: outfit,
      location: this.lab,
      run: () => {
        greyAdv(this.lab, outfit);
      },
    };
  }

  level(): number {
    return 5;
  }
}
