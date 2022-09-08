import {
  adv1,
  council,
  Effect,
  Familiar,
  getProperty,
  haveEffect,
  Location,
  Monster,
  myLevel,
  toInt,
  useFamiliar,
} from "kolmafia";
import { PropertyManager } from "../../../../../utils/Properties";
import { AdventureSettings, greyAdv } from "../../../../../utils/GreyLocations";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../../../Quests";
import { QuestType } from "../../../../QuestTypes";
import { DelayBurners } from "../../../../../iotms/delayburners/DelayBurners";

export class QuestL11Curses implements QuestInfo {
  curse1: Effect = Effect.get("Once-Cursed");
  curse2: Effect = Effect.get("Twice-Cursed");
  curse3: Effect = Effect.get("Thrice-Cursed");
  apartment: Location = Location.get("The Hidden Apartment Building");
  shaman: Monster = Monster.get("pygmy shaman");
  toAbsorb: Monster[];

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
    if (haveEffect(this.curse3) > 9) {
      return false;
    }

    return (
      haveEffect(this.curse1) +
        haveEffect(this.curse2) +
        haveEffect(this.curse3) >
      0
    );
  }

  status(): QuestStatus {
    const status = getProperty("questL11Curses");

    if (status == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (status == "unstarted") {
      return QuestStatus.NOT_READY;
    }

    if (getProperty("questL11Worship") != "step3") {
      return QuestStatus.NOT_READY;
    }

    if (toInt(getProperty("hiddenBowlingAlleyProgress")) <= 1) {
      return QuestStatus.NOT_READY;
    }

    if (haveEffect(this.curse3) && this.delayForNextNC() == 0) {
      return QuestStatus.READY;
    }

    return QuestStatus.READY;
  }

  delayForNextNC(): number {
    const totalTurns = this.apartment.turnsSpent;

    if (totalTurns < 9) {
      return 8 - totalTurns;
    }

    return 7 - ((totalTurns - 9) % 8);
  }

  run(): QuestAdventure {
    return {
      location: this.apartment,
      orbs: haveEffect(this.curse3) <= 2 ? [this.shaman] : null,
      olfaction:
        haveEffect(this.curse3) + haveEffect(this.curse2) == 0
          ? [this.shaman]
          : null,
      run: () => {
        const props = new PropertyManager();

        if (haveEffect(this.curse3)) {
          props.setChoice(780, 1);

          if (this.delayForNextNC() > 0) {
            const ready = DelayBurners.getReadyDelayBurner();

            if (ready != null) {
              ready.doFightSetup();
            } else {
              DelayBurners.tryReplaceCombats();
            }
          }
        } else {
          props.setChoice(780, 2);
        }

        if (DelayBurners.isTryingForDupeableGoblin()) {
          useFamiliar(Familiar.get("Grey Goose"));
        }

        const settings = new AdventureSettings().addBanish(
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
