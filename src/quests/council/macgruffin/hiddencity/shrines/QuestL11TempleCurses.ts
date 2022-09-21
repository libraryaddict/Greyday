import {
  adv1,
  availableAmount,
  council,
  Effect,
  Familiar,
  getProperty,
  haveEffect,
  Item,
  Location,
  Monster,
  myLevel,
  toInt,
  toMonster,
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
  spirit: Monster = toMonster(442);
  toAbsorb: Monster[];
  files: Item[] = [
    "McClusky file (page 1)",
    "McClusky file (page 2)",
    "McClusky file (page 3)",
    "McClusky file (page 4)",
    "McClusky file (page 5)",
  ].map((s) => Item.get(s));
  completeFile: Item = Item.get("McClusky file (complete)");
  accountant: Monster = Monster.get("Pygmy witch accountant");

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
    const turns =
      haveEffect(this.curse1) +
      haveEffect(this.curse2) +
      haveEffect(this.curse3);

    if (turns == 0) {
      return false;
    }

    const delay = this.delayForNextNC() + 1;

    return turns <= delay;
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

  filesRemaining(): number {
    return this.files.reduce((p, v) => (availableAmount(v) > 0 ? 1 : 0) + p, 0);
  }

  run(): QuestAdventure {
    const needCurses = haveEffect(this.curse3) <= this.delayForNextNC();
    const needFiles =
      getProperty("questL11Business") != "finished" &&
      this.filesRemaining() > 0 &&
      availableAmount(this.completeFile) == 0;

    const orb: Monster[] = [];

    if (needCurses) {
      orb.push(this.shaman);
    }

    if (needFiles && haveEffect(this.curse3)) {
      orb.push(this.accountant);
    }

    return {
      location: this.apartment,
      orbs: orb,
      olfaction: needCurses ? [this.shaman] : null,
      forcedFight:
        haveEffect(this.curse3) > 0
          ? [this.delayForNextNC(), this.spirit]
          : null,
      mayFreeRun: true,
      freeRun: (monster) => monster != this.shaman || !needCurses,
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

  canAcceptPrimes(): boolean {
    const turns =
      haveEffect(this.curse1) +
      haveEffect(this.curse2) +
      haveEffect(this.curse3);

    return turns == 0 || turns > 10;
  }
}
