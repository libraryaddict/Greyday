import {
  Location,
  Familiar,
  toInt,
  getProperty,
  myAscensions,
  Skill,
  haveSkill,
  Item,
  availableAmount,
} from "kolmafia";
import { greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestSkillSystemSweep implements QuestInfo {
  park: Location = Location.get("The Hidden Park");
  skill: Skill = Skill.get("System Sweep");
  sword: Item = Item.get("Antique Machete");

  getId(): QuestType {
    return "Skills / System Sweep";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    if (haveSkill(this.skill)) {
      return QuestStatus.COMPLETED;
    }

    if (!this.hasRelocated() || availableAmount(this.sword) == 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();
    outfit.setPlusCombat().setItemDrops();

    return {
      location: this.park,
      outfit: outfit,
      run: () => {
        greyAdv(this.park, outfit);
      },
    };
  }

  hasRelocated(): boolean {
    return toInt(getProperty("relocatePygmyJanitor")) == myAscensions();
  }

  getLocations(): Location[] {
    return [];
  }
}
