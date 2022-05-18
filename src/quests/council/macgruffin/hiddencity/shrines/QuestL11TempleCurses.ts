import {
  adv1,
  council,
  Effect,
  getProperty,
  haveEffect,
  Location,
  Monster,
  myLevel,
} from "kolmafia";
import { PropertyManager } from "../../../../../utils/Properties";
import { AdventureSettings, greyAdv } from "../../../../../utils/GreyLocations";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../../../Quests";
import { QuestType } from "../../../../QuestTypes";

export class QuestL11Curses implements QuestInfo {
  curse1: Effect = Effect.get("Once-Cursed");
  curse2: Effect = Effect.get("Twice-Cursed");
  curse3: Effect = Effect.get("Thrice-Cursed");
  apartment: Location = Location.get("The Hidden Apartment Building");

  level(): number {
    return 11;
  }

  getLocations(): Location[] {
    return [this.apartment];
  }

  getId(): QuestType {
    return "Council / MacGruffin / HiddenCity / Curses";
  }

  mustBeDone(): boolean {
    return (
      haveEffect(this.curse1) +
        haveEffect(this.curse2) +
        haveEffect(this.curse3) >
      0
    );
  }

  status(): QuestStatus {
    if (getProperty("questL11Worship") != "step3") {
      return QuestStatus.NOT_READY;
    }

    let status = getProperty("questL11Curses");

    if (status == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (status == "unstarted") {
      return QuestStatus.NOT_READY;
    }

    if (haveEffect(this.curse3) && this.delayForNextNC() == 0) {
      return QuestStatus.READY;
    }

    return QuestStatus.READY;
  }

  delayForNextNC(): number {
    let totalTurns = this.apartment.turnsSpent;

    if (totalTurns < 9) {
      return 8 - totalTurns;
    }

    return 7 - ((totalTurns - 9) % 8);
  }

  run(): QuestAdventure {
    return {
      location: this.apartment,
      run: () => {
        let props = new PropertyManager();

        if (haveEffect(this.curse3)) {
          props.setChoice(780, 1);
        } else {
          props.setChoice(780, 2);
        }

        let settings = new AdventureSettings().addBanish(
          Monster.get("pygmy witch lawyer")
        );

        try {
          greyAdv(this.apartment, null, settings);
        } finally {
          props.resetAll();
        }
      },
    };
  }
}
