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

  getId(): QuestType {
    return "Council / MacGruffin / Desert / WormRide";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL11Desert");

    if (status < 0 || !this.wantsToWormRide()) {
      return QuestStatus.NOT_READY;
    }

    if (status > 0) {
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

    if (availableAmount(this.drum) == 0 && this.getExploredRemaining() < 6) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  getGnome(): number {
    return toInt(getProperty("gnasirProgress"));
  }

  mustBeDone(): boolean {
    return true;
  }

  wantsToWormRide(): boolean {
    return (this.getGnome() & 16) != 16;
  }

  run(): QuestAdventure {
    if (availableAmount(this.drum) == 0) {
      let outfit = new GreyOutfit();
      outfit.setItemDrops();

      return {
        outfit: outfit,
        location: this.oasis,
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
}
