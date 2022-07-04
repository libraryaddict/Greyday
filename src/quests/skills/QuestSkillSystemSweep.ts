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
  nanovision: Skill = Skill.get("Double Nanovision");
  book: Item = Item.get("Book of matches");

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

    if (!haveSkill(this.nanovision) && this.wantBook()) {
      return QuestStatus.FASTER_LATER;
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

  wantBook(): boolean {
    if (
      availableAmount(this.book) > 0 ||
      toInt(getProperty("hiddenTavernUnlock")) == myAscensions() ||
      getProperty("questL11Spare") == "finished"
    ) {
      return false;
    }

    return true;
  }
}
