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
  Monster,
} from "kolmafia";
import { PropertyManager } from "../../../../utils/Properties";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";
import { DelayBurners } from "../../../../iotms/delayburners/DelayBurners";

export class QuestL11ShenTurnIn implements QuestInfo {
  disguise: Item = Item.get("Crappy Waiter Disguise");
  shenClub: Location = Location.get("The Copperhead Club");
  crappy: Effect = Effect.get("Crappily Disguised as a Waiter");
  crappyDisguises: Monster[] = [
    "Waiter dressed as a ninja",
    "Ninja dressed as a waiter",
  ].map((s) => Monster.get(s));
  toAbsorb: Monster[];

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

            if (this.toAbsorb.length == 0) {
              let ready = DelayBurners.getReadyDelayBurner();

              if (ready != null) {
                ready.doFightSetup();
              } else {
                DelayBurners.tryReplaceCombats();
              }
            }
          }

          let settings = new AdventureSettings();

          for (let m of this.crappyDisguises) {
            settings.addNoBanish(m);
          }

          greyAdv(this.shenClub, null, settings);
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
