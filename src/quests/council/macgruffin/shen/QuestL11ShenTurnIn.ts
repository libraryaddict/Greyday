import {
  Location,
  Familiar,
  Effect,
  haveEffect,
  Item,
  availableAmount,
  getProperty,
  toInt,
  use,
} from "kolmafia";
import { PropertyManager } from "../../../../utils/Properties";
import { greyAdv } from "../../../../utils/GreyLocations";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11ShenTurnIn implements QuestInfo {
  disguise: Item = Item.get("Crappy Waiter Disguise");
  shenClub: Location = Location.get("The Copperhead Club");
  crappy: Effect = Effect.get("Crappily Disguised as a Waiter");

  getId(): QuestType {
    return "Council / MacGruffin / Shen / TurnIn";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL11Shen");

    if (status < 2) {
      return QuestStatus.NOT_READY;
    }

    if (status > 6) {
      return QuestStatus.COMPLETED;
    }

    if (status % 2 == 1) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  needToDeliver(): boolean {
    let prop = getProperty("questL11Shen");

    return prop == "step2" || prop == "step4" || prop == "step6";
  }

  run(): QuestAdventure {
    return {
      location: this.shenClub,
      run: () => {
        if (!this.hittingNC()) {
          if (!this.haveEffect() && availableAmount(this.disguise) > 0) {
            use(this.disguise);
          }
        }

        let props = new PropertyManager();

        try {
          if (getProperty("copperheadClubHazard") != "lantern") {
            props.setChoice(855, 3); // Light lanterns on fire
          } else {
            props.setChoice(855, 4); // Get unnamed cocktails
          }

          greyAdv(this.shenClub);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  hittingNC(): boolean {
    let turnsSpent = this.shenClub.turnsSpent;
    let nextMeeting = Math.floor(getQuestStatus("questL11Shen") / 2) * 5;

    return turnsSpent >= nextMeeting - 1;
  }

  getLocations(): Location[] {
    return [this.shenClub];
  }

  haveEffect(): boolean {
    return haveEffect(this.crappy) > 0;
  }
}
