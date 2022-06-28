import {
  Location,
  Familiar,
  Monster,
  getProperty,
  toInt,
  print,
  setProperty,
} from "kolmafia";
import { greyAdv } from "../../../../utils/GreyLocations";
import { ResourceClaim } from "../../../../utils/GreyResources";
import { GreySettings } from "../../../../utils/GreySettings";
import { PropertyManager } from "../../../../utils/Properties";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestFantasyRealm implements QuestInfo {
  fought: string = "_foughtFantasyRealm";
  location: Location = Location.get("The Bandit Crossroads");

  getId(): QuestType {
    return "Council / Tower / Keys / FantasyRealm";
  }

  level(): number {
    return 11;
  }

  hasFoughtEnough(): boolean {
    return this.getFoughtToday() >= 5;
  }

  addFought() {
    setProperty(this.fought, (this.getFoughtToday() + 1).toString());
  }

  status(): QuestStatus {
    if (this.hasFoughtEnough()) {
      return QuestStatus.COMPLETED;
    }

    // If we don't have the iotm, and haven't used a day pass
    if (
      getProperty("frAlways") != "true" &&
      getProperty("_frToday") != "true"
    ) {
      return QuestStatus.COMPLETED;
    }

    if (getQuestStatus("questL08Trapper") <= 1) {
      return QuestStatus.NOT_READY;
    }

    if (GreySettings.shouldAvoidTowerRequirements()) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: this.location,
      run: () => {
        let props = new PropertyManager();
        props.setChoice(1281, 0); // Don't handle

        try {
          greyAdv(this.location);
          this.addFought();
        } catch (e) {
          print(
            "We errored, did we hit crossroads choice? We deliberately should not hit that if we still haven't finished fantasy bandits. You may need to set '_foughtFantasyRealm' to 5",
            "red"
          );
          throw e;
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.location];
  }

  getFoughtToday(): number {
    let setting = getProperty(this.fought);

    if (setting == "") {
      return 0;
    }

    return toInt(setting);
  }
}
