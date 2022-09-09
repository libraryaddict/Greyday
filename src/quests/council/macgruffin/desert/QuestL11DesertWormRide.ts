import {
  Location,
  Familiar,
  availableAmount,
  Item,
  equip,
  getProperty,
  toInt,
  use,
  Monster,
  familiarWeight,
  Effect,
  haveEffect,
} from "kolmafia";
import { greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11DesertWormRide implements QuestInfo {
  hooks: Item = Item.get("worm-riding hooks");
  drum: Item = Item.get("Drum Machine");
  oasis: Location = Location.get("Oasis");
  toAbsorb: Monster[];
  fam: Familiar = Familiar.get("Grey Goose");
  curse3: Effect = Effect.get("Thrice-Cursed");
  hydrated: Effect = Effect.get("Ultrahydrated");

  getId(): QuestType {
    return "Council / MacGruffin / Desert / WormRide";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL11Desert");

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    if (status > 0 || !this.wantsToWormRide()) {
      return QuestStatus.COMPLETED;
    }

    if (this.toAbsorb.length > 0 && availableAmount(this.hooks) == 0) {
      if (familiarWeight(this.fam) < 6) {
        return QuestStatus.NOT_READY;
      }

      if (status > 0) {
        return QuestStatus.READY;
      }
    }

    if (availableAmount(this.hooks) == 0) {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.drum) == 0) {
      if (haveEffect(this.hydrated) == 0 && haveEffect(this.curse3) > 0) {
        return QuestStatus.NOT_READY;
      }

      if (this.getExploredRemaining() < 6) {
        return QuestStatus.NOT_READY;
      }
    }

    return QuestStatus.READY;
  }

  getGnome(): number {
    return toInt(getProperty("gnasirProgress"));
  }

  mustBeDone(): boolean {
    return true;
  }

  free(): boolean {
    return availableAmount(this.drum) > 0 && availableAmount(this.hooks) > 0;
  }

  wantsToWormRide(): boolean {
    return (this.getGnome() & 16) != 16;
  }

  run(): QuestAdventure {
    if (availableAmount(this.drum) == 0) {
      const outfit = new GreyOutfit();
      outfit.setItemDrops();

      return {
        outfit: outfit,
        location: this.oasis,
        orbs: [Monster.get("Blur")],
        run: () => {
          greyAdv(this.oasis, outfit);
        },
      };
    }

    return {
      location: null,
      run: () => {
        equip(this.hooks);
        use(this.drum);
      },
    };
  }

  getLocations(): Location[] {
    return [this.oasis];
  }

  getExplored(): number {
    return toInt(getProperty("desertExploration"));
  }

  getExploredRemaining(): number {
    return 100 - this.getExplored();
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}
