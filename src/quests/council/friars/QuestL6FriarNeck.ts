import {
  availableAmount,
  Familiar,
  getProperty,
  hippyStoneBroken,
  Item,
  Location,
  Monster,
  myLevel,
  useFamiliar,
} from "kolmafia";
import {
  hasNonCombatSkillActive,
  hasNonCombatSkillsReady,
} from "../../../GreyAdventurer";
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
  umbrella: Item = Item.get("Unbreakable Umbrella");
  toAbsorb: Monster[];

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

    if (
      !hasNonCombatSkillsReady(myLevel() >= 11 && !hasNonCombatSkillActive())
    ) {
      return QuestStatus.NOT_READY;
    }

    if (!hasNonCombatSkillsReady()) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setNoCombat().setNoCombat();

    if (this.shouldWearLatte()) {
      outfit.addItem(this.latte);
    }

    return {
      location: this.location,
      outfit: outfit,
      run: () => {
        if (
          this.isAllAbsorbed() &&
          !this.shouldWearLatte() &&
          availableAmount(this.umbrella) == 0
        ) {
          DelayBurners.tryReplaceCombats();
        }

        if (DelayBurners.isTryingForDupeableGoblin()) {
          useFamiliar(Familiar.get("Grey Goose"));
        }

        greyAdv(this.location, outfit);
      },
    };
  }

  getId(): QuestType {
    return "Council / Friars / Neck";
  }
}
