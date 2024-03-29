import {
  availableAmount,
  council,
  Familiar,
  getProperty,
  Item,
  Location,
  Monster,
  myLevel,
  useFamiliar,
} from "kolmafia";
import { PropertyManager } from "../../utils/Properties";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { hasNonCombatSkillsReady } from "../../GreyAdventurer";
import { AdventureSettings, greyAdv } from "../../utils/GreyLocations";
import { QuestType } from "../QuestTypes";
import {
  DelayBurners,
  DelayCriteria,
  DelayCriteriaInterface,
} from "../../iotms/delayburners/DelayBurners";
import { hasUnlockedLatteFlavor, LatteFlavor } from "../../utils/LatteUtils";
import {
  getGhostBustingMacro,
  getGhostBustingOutfit,
  isGhostBustingTime,
  shouldAvoidGhosts,
} from "../custom/QuestTrapGhost";

export class QuestL2SpookyLarva implements QuestInfo {
  location: Location = Location.get("The Spooky Forest");
  latte: Item = Item.get("Latte lovers member's mug");
  headless: Monster = Monster.get("The Headless Horseman");
  toAbsorb: Monster[];

  shouldWearLatte(): boolean {
    return (
      availableAmount(this.latte) > 0 &&
      !hasUnlockedLatteFlavor(LatteFlavor.FAMILIAR_WEIGHT)
    );
  }

  level(): number {
    return 2;
  }

  getId(): QuestType {
    return "Council / Larva";
  }

  delayCriteria(): DelayCriteriaInterface {
    return DelayCriteria().withForcedFights(
      !this.isDelayBurning() ? false : null
    );
  }

  status(): QuestStatus {
    const status = getProperty("questL02Larva");

    if (status == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (isGhostBustingTime(this.location)) {
      if (shouldAvoidGhosts()) {
        return QuestStatus.NOT_READY;
      }
    } else if (this.isDelayBurning()) {
      if (DelayBurners.isDelayBurnerReady(this.delayCriteria())) {
        return QuestStatus.READY;
      }

      if (DelayBurners.isDelayBurnerFeasible(this.delayCriteria())) {
        return QuestStatus.FASTER_LATER;
      }
    } else if (
      this.location.turnsSpent >= 5 &&
      !hasNonCombatSkillsReady(false) &&
      myLevel() >= 5
    ) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  isDelayBurning(): boolean {
    return this.location.turnsSpent < 5 && this.toAbsorb.length == 0;
  }

  run(): QuestAdventure {
    const ghostTime = isGhostBustingTime(this.location);

    const outfit = ghostTime ? getGhostBustingOutfit() : new GreyOutfit();

    if (this.shouldWearLatte()) {
      outfit.addWeight(this.latte);
    }

    if (this.location.turnsSpent >= 5) {
      outfit.setNoCombat();
    }

    if (!ghostTime && !this.shouldWearLatte() && this.toAbsorb.length == 0) {
      outfit.addDelayer(this.delayCriteria());
    }

    return {
      location: isGhostBustingTime(this.location) ? null : this.location,
      outfit: outfit,
      forcedFight: isGhostBustingTime(this.location)
        ? [0, this.headless]
        : null,
      freeRun: () => true,
      run: () => {
        const props = new PropertyManager();
        const settings = new AdventureSettings();

        props.setChoice(502, 2);
        props.setChoice(505, 1);

        if (isGhostBustingTime(this.location)) {
          settings.setStartOfFightMacro(getGhostBustingMacro());
        }

        if (
          this.toAbsorb.length == 0 &&
          DelayBurners.isTryingForDupeableGoblin()
        ) {
          useFamiliar(Familiar.get("Grey Goose"));
        }

        try {
          greyAdv(this.location, outfit, settings);
        } finally {
          props.resetAll();
        }

        if (availableAmount(Item.get("mosquito larva")) > 0) {
          council();
        }
      },
    };
  }

  canAcceptPrimes(): boolean {
    return !this.mustBeDone();
  }

  mustBeDone(): boolean {
    return isGhostBustingTime(this.location);
  }

  getLocations(): Location[] {
    return [this.location];
  }
}
