import {
  availableAmount,
  getProperty,
  hippyStoneBroken,
  Item,
  Location,
  Monster,
} from "kolmafia";
import { hasNonCombatSkillsReady } from "../../../GreyAdventurer";
import { DelayBurners } from "../../../iotms/delayburners/DelayBurners";
import { AbsorbsProvider } from "../../../utils/GreyAbsorber";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { hasUnlockedLatteFlavor, LatteFlavor } from "../../../utils/LatteUtils";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL6FriarNeck implements QuestInfo {
  item: Item = Item.get("dodecagram");
  location: Location = Location.get("Dark Neck of the Woods");
  absorbs: Monster[] = [Monster.get("P imp"), Monster.get("W imp")];
  latte: Item = Item.get("Latte lovers member's mug");

  level(): number {
    return 6;
  }

  shouldWearLatte(): boolean {
    return (
      hippyStoneBroken() &&
      availableAmount(this.latte) > 0 &&
      !hasUnlockedLatteFlavor(LatteFlavor.PVP_FIGHTS)
    );
  }

  isAllAbsorbed(): boolean {
    let absorbed = AbsorbsProvider.getReabsorbedMonsters();

    return this.absorbs.find((a) => !absorbed.includes(a)) == null;
  }

  getLocations(): Location[] {
    return [this.location];
  }

  status(): QuestStatus {
    if (getProperty("questL06Friar") == "unstarted") {
      return QuestStatus.NOT_READY;
    }

    if (
      getProperty("questL06Friar") == "finished" ||
      availableAmount(this.item) > 0
    ) {
      return QuestStatus.COMPLETED;
    }

    if (!hasNonCombatSkillsReady()) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setNoCombat();

    if (this.shouldWearLatte()) {
      outfit.addItem(this.latte);
    }

    return {
      location: this.location,
      outfit: outfit,
      run: () => {
        if (this.isAllAbsorbed() && !this.shouldWearLatte()) {
          DelayBurners.tryReplaceCombats();
        }

        greyAdv(this.location, outfit);
      },
    };
  }

  getId(): QuestType {
    return "Council / Friars / Neck";
  }
}
