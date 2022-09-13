import {
  availableAmount,
  cliExecute,
  Familiar,
  getProperty,
  Item,
  itemAmount,
  Location,
  Monster,
  myLevel,
  print,
  toJson,
  use,
  useFamiliar,
} from "kolmafia";
import { hasNonCombatSkillsReady } from "../../../../GreyAdventurer";
import { DelayBurners } from "../../../../iotms/delayburners/DelayBurners";
import { AbsorbsProvider } from "../../../../utils/GreyAbsorber";
import { GreyChoices } from "../../../../utils/GreyChoices";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import {
  hasUnlockedLatteFlavor,
  LatteFlavor,
} from "../../../../utils/LatteUtils";
import {
  isGhostBustingTime,
  getGhostBustingMacro,
  shouldAvoidGhosts,
  getGhostBustingOutfit,
} from "../../../custom/QuestTrapGhost";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11TempleUnlock implements QuestInfo {
  coin: Item = Item.get("Tree-holed coin");
  map: Item = Item.get("Spooky Temple Map");
  fertilizer: Item = Item.get("Spooky-Gro Fertilizer");
  sapling: Item = Item.get("Spooky Sapling");
  spookyLoc: Location = Location.get("The Spooky Forest");
  choices: TempleChoices;
  latte: Item = Item.get("Latte lovers member's mug");
  toAbsorb: Monster[];

  shouldWearLatte(): boolean {
    return (
      availableAmount(this.latte) > 0 &&
      !hasUnlockedLatteFlavor(LatteFlavor.FAMILIAR_WEIGHT)
    );
  }

  getId(): QuestType {
    return "Council / MacGruffin / Temple / Unlock";
  }

  level(): number {
    return 6;
  }

  status(): QuestStatus {
    if (this.templeFound()) {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("questL02Larva") != "finished") {
      return QuestStatus.NOT_READY;
    }

    if (isGhostBustingTime(this.spookyLoc)) {
      if (shouldAvoidGhosts()) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    }

    if (!hasNonCombatSkillsReady(false) && myLevel() >= 5) {
      return QuestStatus.NOT_READY;
    }

    if (!hasNonCombatSkillsReady(true)) {
      return QuestStatus.FASTER_LATER;
    }

    if (getProperty("questM16Temple") == "unstarted") {
      //   return QuestStatus.NOT_READY;
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

  templeFound(): boolean {
    return getProperty("questM16Temple") == "finished";
  }

  tryUnlockTemple() {
    if (
      itemAmount(this.sapling) == 0 ||
      itemAmount(this.fertilizer) == 0 ||
      itemAmount(this.map) == 0
    ) {
      return;
    }

    use(this.map);
  }

  runSpookyChoices() {
    this.choices = new TempleChoices();

    if (itemAmount(this.coin) == 0 && itemAmount(this.map) == 0) {
      this.choices.runChoice(502, 2);
      this.choices.runChoice(505, 2);
    } else if (itemAmount(this.map) == 0) {
      this.choices.runChoice(502, 3);
      this.choices.runChoice(506, 3);
      this.choices.runChoice(507, 1);
    } else if (itemAmount(this.fertilizer) == 0) {
      this.choices.runChoice(502, 3);
      this.choices.runChoice(506, 3);
      this.choices.runChoice(506, 2);
    } else if (itemAmount(this.sapling) == 0) {
      this.choices.runChoice(502, 1);
      this.choices.runChoice(503, 3);

      // Sell skins
      if (itemAmount(Item.get("bar skin")) > 1) {
        this.choices.runChoice(504, 2);
      } else if (itemAmount(Item.get("bar skin")) > 0) {
        this.choices.runChoice(504, 1);
      }

      this.choices.runChoice(504, 3);
      this.choices.runChoice(504, 4);
    }
  }

  isDelayBurning(): boolean {
    return this.spookyLoc.turnsSpent < 5 && this.toAbsorb.length == 0;
  }

  mustBeDone(): boolean {
    return isGhostBustingTime(this.spookyLoc);
  }

  run(): QuestAdventure {
    const outfit = isGhostBustingTime(this.spookyLoc)
      ? getGhostBustingOutfit()
      : new GreyOutfit();

    if (this.spookyLoc.turnsSpent >= 5) {
      outfit.setNoCombat();
    }

    return {
      location: this.spookyLoc,
      outfit: outfit,
      freeRun: () => true,
      run: () => {
        this.tryUnlockTemple();

        if (this.templeFound()) {
          return;
        }

        const settings = new AdventureSettings();

        if (isGhostBustingTime(this.spookyLoc)) {
          settings.setStartOfFightMacro(getGhostBustingMacro());
        } else if (!this.shouldWearLatte() && this.toAbsorb.length == 0) {
          const delay = DelayBurners.getReadyDelayBurner();

          if (delay != null) {
            delay.doFightSetup();
          } else if (hasNonCombatSkillsReady()) {
            DelayBurners.tryReplaceCombats();
          }
        }

        if (DelayBurners.isTryingForDupeableGoblin()) {
          useFamiliar(Familiar.get("Grey Goose"));
        }

        this.runSpookyChoices();

        settings.setChoices(this.choices);

        greyAdv(this.spookyLoc, outfit, settings);

        this.tryUnlockTemple();
      },
    };
  }

  getLocations(): Location[] {
    return [this.spookyLoc];
  }
}

class TempleChoices implements GreyChoices {
  choices: [number, number][] = [];

  calledOutOfScopeChoiceBehavior(choiceNo: number): boolean {
    return false;
  }

  runChoice(choiceNo: number, choicePick: number) {
    this.choices.push([choiceNo, choicePick]);
  }

  handleChoice(choiceNo: number): number {
    if (this.choices.length == 0) {
      throw "Expected to be handling a choice but uh, wasn't";
    }

    if (this.choices[0][0] != choiceNo) {
      throw (
        "Expected to be in choice " +
        this.choices[0][0] +
        " but instead was in choice " +
        choiceNo
      );
    }

    const toReturn = this.choices[0][1];
    this.choices.splice(0, 1);

    return toReturn;
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}
