import {
  availableAmount,
  Familiar,
  getProperty,
  isBanished,
  Item,
  Location,
  Monster,
  print,
  toMonster,
  use,
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
import {
  getAllCombinations,
  getEncounters,
} from "../../../../../utils/GreyUtils";
import { GreyOutfit } from "../../../../../utils/GreyOutfitter";

export class QuestL11Business extends TaskInfo implements QuestInfo {
  files: Item[] = [
    "McClusky file (page 1)",
    "McClusky file (page 2)",
    "McClusky file (page 3)",
    "McClusky file (page 4)",
    "McClusky file (page 5)",
  ].map((s) => Item.get(s));
  completeFile: Item = Item.get("McClusky file (complete)");
  binderClip: Item = Item.get("Boring Binder Clip");
  loc: Location = Location.get("the hidden office building");
  apartment: Location = Location.get("The Hidden Apartment Building");
  accountant: Monster = Monster.get("Pygmy witch accountant");
  spirit: Monster = toMonster(444);
  toAbsorb: Monster[];
  paths: PossiblePath[];
  savedEncounters: [string, number][] = [];
  encountersSaved: number = 0;

  getId(): QuestType {
    return "Council / MacGruffin / HiddenCity / Accountants";
  }

  createPaths(assumeUnstarted: boolean): void {
    const firstTurns = this.hasFirstNC()
      ? 0
      : assumeUnstarted
      ? 5
      : this.delayUntilNextNC();
    const secondTurns =
      !this.hasFirstNC() || assumeUnstarted ? 4 : this.delayUntilNextNC();

    this.paths = [new PossiblePath(firstTurns + secondTurns)];

    const combos: [ResourceCategory, number][] = [];

    if (firstTurns > 0) {
      combos.push([ResourceCategory.FORCE_NC, 0]);
      combos.push([null, firstTurns]);
    }

    if (secondTurns > 0) {
      combos.push([ResourceCategory.FORCE_NC, 0]);
      combos.push([null, secondTurns]);
    }

    if (combos.length == 0) {
      return;
    }

    for (const combo of getAllCombinations(combos)) {
      if (combo.length != combos.length / 2) {
        continue;
      }

      const path = new PossiblePath(
        combo.map(([, t]) => t).reduce((p, v) => p + v, 0)
      );

      for (const [res] of combo) {
        if (res == null) {
          continue;
        }

        path.add(res);
      }

      this.paths.push(path);
    }
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  getLocations(): Location[] {
    return [this.loc, this.apartment];
  }

  level(): number {
    return 11;
  }

  delayUntilNextNC(): number {
    if (this.encountersSaved != this.loc.turnsSpent) {
      this.encountersSaved = this.loc.turnsSpent;
      this.savedEncounters = getEncounters("The Hidden Office Building", [
        "Working Holiday",
      ]).reverse();
    }

    let turnsSpent = 0;
    let lastTurnSpent = -1;
    let ncAfter: number = 5;

    for (const [encounter, turn] of this.savedEncounters) {
      if (encounter == "Working Holiday") {
        ncAfter = 4;

        if (turn == lastTurnSpent) {
          turnsSpent--;
        }

        break;
      }

      turnsSpent++;
      lastTurnSpent = turn;
    }

    if (turnsSpent > ncAfter) {
      print(
        "Weird. Parsing is wrong. Expected to hit the apartment NC after " +
          ncAfter +
          " delay, but we have " +
          turnsSpent +
          " spent.. Encounters: " +
          this.savedEncounters.map(([e, turn]) => e + ": " + turn).join(", "),
        "red"
      );
    }

    const delay = Math.max(0, ncAfter - turnsSpent);

    return delay;
  }

  isDelayBurning(): boolean {
    return (
      this.delayUntilNextNC() > 0 &&
      (availableAmount(this.completeFile) > 0 || this.filesRemaining() == 0)
    );
  }

  hasFirstNC(): boolean {
    return (
      availableAmount(this.binderClip) + availableAmount(this.completeFile) > 0
    );
  }

  canRun(): boolean {
    return (
      getProperty("questL11Business") != "unstarted" &&
      getProperty("questL11Worship") == "step3"
    );
  }

  status(path: PossiblePath): QuestStatus {
    const status = getProperty("questL11Business");

    if (status == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (path == null || !this.canRun()) {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.binderClip) > 0 && this.filesRemaining() == 0) {
      return QuestStatus.READY;
    }

    if (getProperty("questL11Curses") != "finished" && this.goCurses(path)) {
      return QuestStatus.NOT_READY;
    }

    if (this.wantToForceNextNC(path)) {
      if (path.getResource(ResourceCategory.FORCE_NC).primed()) {
        return QuestStatus.READY;
      }

      // Only run the first NC when primed
      if (!this.hasFirstNC()) {
        return QuestStatus.NOT_READY;
      }

      // Only run the second NC when primed and no files remaining
      if (this.toAbsorb.length == 0 && availableAmount(this.completeFile) > 0) {
        return QuestStatus.NOT_READY;
      }
    }

    if (isBanished(this.accountant)) {
      return QuestStatus.NOT_READY;
    }

    if (this.isDelayBurning()) {
      if (DelayBurners.isDelayBurnerReady()) {
        return QuestStatus.READY;
      }

      if (DelayBurners.isDelayBurnerFeasible()) {
        return QuestStatus.FASTER_LATER;
      }
    }

    return QuestStatus.READY;
  }

  goCurses(path: PossiblePath) {
    return this.farmFiles() && this.delayUntilNextNC() == 0;
  }

  farmFiles(): boolean {
    return availableAmount(this.binderClip) > 0 && this.filesRemaining() > 0;
  }

  wantToForceNextNC(path: PossiblePath): boolean {
    if (path.canUse(ResourceCategory.FORCE_NC) == 0) {
      return false;
    }

    if (this.delayUntilNextNC() == 0) {
      return false;
    }

    // If we haven't had our first NC, force that
    if (!this.hasFirstNC()) {
      return true;
    }

    // If we've picked up our absorb
    return this.toAbsorb.length == 0;
  }

  readyToForceNC(): boolean {
    return !this.hasFirstNC()
      ? !this.farmFiles()
      : availableAmount(this.completeFile) > 0 && this.toAbsorb.length == 0;
  }

  attemptPrime(path: PossiblePath): boolean {
    if (!this.wantToForceNextNC(path) || !this.canRun()) {
      return false;
    }

    if (!this.readyToForceNC()) {
      return false;
    }

    setPrimedResource(this, path, path.getResource(ResourceCategory.FORCE_NC));

    return true;
  }

  canAcceptPrimes(): boolean {
    return false;
  }

  run(path: PossiblePath): QuestAdventure {
    if (availableAmount(this.binderClip) > 0 && this.filesRemaining() == 0) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          this.tryCreate();
        },
      };
    }

    if (path != null && this.goCurses(path)) {
      //
      return {
        location: this.apartment,
        orbs: [this.accountant],
        run: () => {
          const props = new PropertyManager();

          props.setChoice(780, 6); // Skip
          const settings = new AdventureSettings().addBanish(
            Monster.get("pygmy witch lawyer")
          );

          try {
            greyAdv(this.apartment, null, settings);

            this.tryCreate();
          } finally {
            props.resetAll();
          }
        },
      };
    }

    return {
      location:
        path.canUse(ResourceCategory.FORCE_NC) &&
        path.getResource(ResourceCategory.FORCE_NC).primed()
          ? null
          : this.loc,
      orbs: this.filesRemaining() > 0 ? [this.accountant] : null,
      forcedFight:
        availableAmount(this.completeFile) > 0
          ? [this.delayUntilNextNC(), this.spirit]
          : null,
      mayFreeRun: this.delayUntilNextNC() > 0,
      freeRun: (monster) =>
        this.filesRemaining() == 0 || monster != this.accountant,
      run: () => {
        const props = new PropertyManager();

        try {
          if (availableAmount(this.completeFile) > 0) {
            props.setChoice(786, 1); // Have complete file, fight
          } else if (availableAmount(this.binderClip) == 0) {
            props.setChoice(786, 2); // Get binder clip
          } else {
            props.setChoice(786, 3); // Fight accountant
          }

          if (
            availableAmount(this.completeFile) > 0 &&
            this.filesRemaining() == 0
          ) {
            const ready = DelayBurners.getReadyDelayBurner();

            if (ready != null) {
              ready.doFightSetup();
            } else {
              DelayBurners.tryReplaceCombats();
            }
          }

          if (DelayBurners.isTryingForDupeableGoblin()) {
            useFamiliar(Familiar.get("Grey Goose"));
          }

          const settings = new AdventureSettings().addBanish(
            Monster.get("pygmy headhunter")
          );

          greyAdv(this.loc, null, settings);

          this.tryCreate();
        } finally {
          props.resetAll();
        }
      },
    };
  }

  tryCreate() {
    if (this.filesRemaining() > 0 || availableAmount(this.binderClip) == 0) {
      return;
    }

    use(this.binderClip);
  }

  filesRemaining(): number {
    return availableAmount(this.completeFile) > 0
      ? 0
      : this.files.filter((f) => availableAmount(f) == 0).length;
  }
}
