import { availableAmount, getProperty, Item, Location } from "kolmafia";
import { hasNonCombatSkillsReady } from "../../../GreyAdventurer";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL6FriarNeck implements QuestInfo {
  item: Item = Item.get("dodecagram");
  location: Location = Location.get("Dark Neck of the Woods");

  level(): number {
    return 6;
  }

  getLocations(): Location[] {
    return [this.location];
  }

  status(): QuestStatus {
    if (getProperty("questL06Friar") == "unstarted") {
      return QuestStatus.NOT_READY;
    }

    if (
      getProperty("questL06Friar") == "finished" ||
      availableAmount(this.item) > 0
    ) {
      return QuestStatus.COMPLETED;
    }

    if (!hasNonCombatSkillsReady()) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setNoCombat();

    return {
      location: this.location,
      outfit: outfit,
      run: () => {
        greyAdv(this.location, outfit);
      },
    };
  }

  getId(): QuestType {
    return "Council / Friars / Neck";
  }
}
