import {
  availableAmount,
  Familiar,
  getProperty,
  haveSkill,
  hippyStoneBroken,
  Item,
  Location,
  Monster,
  myLevel,
  Skill,
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
  skill1: Skill = Skill.get("Phase Shift");
  skill2: Skill = Skill.get("Photonic Shroud");

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
    const absorbed = AbsorbsProvider.getReabsorbedMonsters();

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

    if (!haveSkill(this.skill1) || !haveSkill(this.skill2)) {
      return QuestStatus.NOT_READY;
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
    const outfit = new GreyOutfit().setNoCombat().setNoCombat();

    if (this.shouldWearLatte()) {
      outfit.addWeight(this.latte);
    } else if (!this.isAllAbsorbed()) {
      outfit.addDelayer();
    }

    return {
      location: this.location,
      outfit: outfit,
      freeRun: () => true,
      run: () => {
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
