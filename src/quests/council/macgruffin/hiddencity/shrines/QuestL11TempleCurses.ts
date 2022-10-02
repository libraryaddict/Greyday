import {
  availableAmount,
  Effect,
  Familiar,
  getProperty,
  haveEffect,
  Item,
  Location,
  Monster,
  toInt,
  toMonster,
  useFamiliar,
} from "kolmafia";
import { PropertyManager } from "../../../../../utils/Properties";
import {
  AdventureSettings,
  greyAdv,
  setPrimedResource,
} from "../../../../../utils/GreyLocations";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../../../Quests";
import { QuestType } from "../../../../QuestTypes";
import { DelayBurners } from "../../../../../iotms/delayburners/DelayBurners";
import { PossiblePath, TaskInfo } from "../../../../../typings/TaskInfo";
import { ResourceCategory } from "../../../../../typings/ResourceTypes";
import { GreyOutfit } from "../../../../../utils/GreyOutfitter";
import { AdventureFinder } from "../../../../../GreyChooser";

export class QuestL11Curses extends TaskInfo implements QuestInfo {
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
  paths: PossiblePath[];
  needRecalculate: boolean;

  getPossiblePaths() {
    return this.paths;
  }

  createPaths(assumeUnstarted: boolean): void {
    this.paths = [];

    if (assumeUnstarted || !this.shouldLookAtForcingNC()) {
      this.paths.push(new PossiblePath(0));
      return;
    }

    this.paths.push(
      new PossiblePath(this.filesRemaining() == 0 ? this.delayForNextNC() : 7)
    );
    this.paths.push(new PossiblePath(0).add(ResourceCategory.FORCE_NC));
  }

  shouldLookAtForcingNC(): boolean {
    const turns = this.delayForNextNC();

    if (turns <= 1) {
      return false;
    }

    const effect = haveEffect(this.curse3);

    if (effect == 0) {
      return false;
    }

    if (effect < turns) {
      return true;
    }

    return this.filesRemaining() == 0;
  }

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

  canRun(): boolean {
    return (
      getProperty("questL11Curses") != "unstarted" &&
      getProperty("questL11Worship") == "step3"
    );
  }

  status(path: PossiblePath): QuestStatus {
    const status = getProperty("questL11Curses");

    if (status == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (path == null || !this.canRun()) {
      return QuestStatus.NOT_READY;
    }

    if (
      path.canUse(ResourceCategory.FORCE_NC) &&
      path.getResource(ResourceCategory.FORCE_NC).primed()
    ) {
      return QuestStatus.READY;
    }

    if (toInt(getProperty("hiddenBowlingAlleyProgress")) <= 1) {
      return QuestStatus.NOT_READY;
    }

    if (this.needRecalculate == null && this.shouldLookAtForcingNC()) {
      this.needRecalculate = true;
    }

    if (this.needRecalculate || path == null) {
      return QuestStatus.READY;
    }

    if (path.canUse(ResourceCategory.FORCE_NC)) {
      if (path.getResource(ResourceCategory.FORCE_NC).primed()) {
        return QuestStatus.READY;
      }

      if (!this.mustBeDone()) {
        return QuestStatus.NOT_READY;
      }
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
    return availableAmount(this.completeFile) > 0
      ? 0
      : this.files.filter((f) => availableAmount(f) == 0).length;
  }

  attemptPrime(path: PossiblePath): boolean {
    if (
      !path.canUse(ResourceCategory.FORCE_NC) ||
      !this.shouldLookAtForcingNC()
    ) {
      return false;
    }

    setPrimedResource(this, path, path.getResource(ResourceCategory.FORCE_NC));

    return true;
  }

  run(path: PossiblePath): QuestAdventure {
    if (this.needRecalculate) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          this.needRecalculate = false;

          AdventureFinder.recalculatePath();
        },
      };
    }

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
      freeRun: (monster) =>
        (monster != this.accountant || !needFiles) &&
        (monster != this.shaman || !needCurses),
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

  canAcceptPrimes(quest: QuestInfo): boolean {
    if (quest == this) {
      return true;
    }

    const turns =
      haveEffect(this.curse1) +
      haveEffect(this.curse2) +
      haveEffect(this.curse3);

    return turns == 0 || turns > 10;
  }
}
