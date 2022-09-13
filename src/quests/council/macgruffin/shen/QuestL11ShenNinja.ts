import { Location, Familiar, Monster } from "kolmafia";
import { greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11ShenNinja implements QuestInfo {
  location: Location = Location.get("Lair of the Ninja Snowmen");
  // TODO Once we've got the absorbs, try replace combats if assassins isnt done cos we're really just stacking +combat
  assassin: Monster = Monster.get("Ninja Snowman Assassin");

  getId(): QuestType {
    return "Council / MacGruffin / Shen / Ninjas";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL11Shen");

    if (status > 3) {
      return QuestStatus.COMPLETED;
    }

    if (status < 3) {
      return QuestStatus.NOT_READY;
    }

    if (getQuestStatus("questL08Trapper") < 2) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit();

    if (getQuestStatus("questL08Trapper") <= 2) {
      outfit.setPlusCombat();
    }

    return {
      location: this.location,
      outfit: outfit,
      freeRun: (monster) => monster != this.assassin,
      run: () => {
        greyAdv(this.location, outfit);
      },
    };
  }

  getLocations(): Location[] {
    return [this.location];
  }

  canAcceptPrimes(): boolean {
    return getQuestStatus("questL08Trapper") > 2;
  }
}
