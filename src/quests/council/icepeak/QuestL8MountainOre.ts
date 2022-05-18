import {
  Location,
  Familiar,
  availableAmount,
  getProperty,
  Item,
  visitUrl,
} from "kolmafia";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { MountainStatus } from "../QuestL8IcePeak";

export abstract class QuestL8MountainOre implements QuestInfo {
  mines: Location = Location.get("Itznotyerzitz Mine");

  abstract getId(): QuestType;

  level(): number {
    return 8;
  }

  abstract status(): QuestStatus;

  abstract run(): QuestAdventure;

  abstract getLocations(): Location[];

  getOreRemaining(): number {
    return 3 - availableAmount(this.neededOre());
  }

  neededOre(): Item {
    return Item.get(getProperty("trapperOre"));
  }

  talkTrapper() {
    visitUrl("place.php?whichplace=mclargehuge&action=trappercabin");
  }

  getStatus(): MountainStatus {
    return getQuestStatus("questL08Trapper");
  }
}
