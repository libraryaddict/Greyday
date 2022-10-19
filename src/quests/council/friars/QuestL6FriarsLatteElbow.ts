import {
  Location,
  Item,
  availableAmount,
  getProperty,
  Familiar,
  Monster,
} from "kolmafia";
import { PossiblePath, TaskInfo } from "../../../typings/TaskInfo";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { hasUnlockedLatteFlavor, LatteFlavor } from "../../../utils/LatteUtils";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL6LatteFamExp implements QuestInfo {
  location: Location = Location.get("Dark Elbow of the Woods");
  latte: Item = Item.get("Latte lovers member's mug");
  flavor: LatteFlavor = LatteFlavor.FAM_EXP;
  item: Item = Item.get("Eldritch butterknife");

  level(): number {
    return 6;
  }

  status(): QuestStatus {
    if (
      availableAmount(this.latte) == 0 ||
      hasUnlockedLatteFlavor(this.flavor) ||
      getProperty("questL06Friar") == "finished"
    ) {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.item) == 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  getId(): QuestType {
    return "Misc / Latte / Fam Exp";
  }

  getLocations(): Location[] {
    return [this.location];
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit();
    outfit.addWeight(this.latte);

    return {
      outfit: outfit,
      location: this.location,
      run: () => {
        greyAdv(this.location, outfit);
      },
    };
  }
}
