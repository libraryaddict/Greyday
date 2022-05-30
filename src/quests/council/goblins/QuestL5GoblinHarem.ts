import { canAdv } from "canadv.ash";
import {
  Location,
  Familiar,
  haveOutfit,
  getProperty,
  Item,
  Skill,
  toInt,
  Monster,
  print,
} from "kolmafia";
import { greyAdv, AdventureSettings } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { ResourceClaim, ResourceType } from "../../../utils/GreyResources";
import { Macro } from "../../../utils/MacroBuilder";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL5GoblinHarem implements QuestInfo {
  harem: Location = Location.get("Cobb's Knob Harem");
  extingisher: Item = Item.get("industrial fire extinguisher");
  toAbsorb: Monster[];
  resourceClaim: ResourceClaim = new ResourceClaim(
    ResourceType.FIRE_EXTINGUSHER,
    20,
    "Spray down thirsty goblin harem",
    5
  );

  getResourceClaims(): ResourceClaim[] {
    if (getProperty("fireExtinguisherHaremUsed") == "true") {
      return [];
    }

    return [this.resourceClaim];
  }

  getId(): QuestType {
    return "Council / Goblins / HaremOutfit";
  }

  level(): number {
    return 5;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL05Goblin");

    if (status < 1) {
      return QuestStatus.NOT_READY;
    }

    if (status > 1) {
      return QuestStatus.COMPLETED;
    }

    if (!canAdv(this.harem)) {
      return QuestStatus.NOT_READY;
    }

    if (haveOutfit("knob Goblin Harem Girl Disguise")) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();

    if (
      toInt(getProperty("_fireExtinguisherCharge")) >= 20 &&
      getProperty("fireExtinguisherHaremUsed") != "true"
    ) {
      outfit.addItem(this.extingisher);
    } else {
      outfit.setItemDrops();
    }

    return {
      location: Location.get("Cobb's Knob Harem"),
      outfit: outfit,
      run: () => {
        // When we have access to the harem, blast it down
        let macro: Macro = Macro.trySkill(
          Skill.get("Fire Extinguisher: Zone Specific")
        );

        // If its a monster we want to absorb, don't blast it down
        for (let absorb of this.toAbsorb) {
          macro = Macro.if_(absorb as Monster, macro, true);
        }

        greyAdv(
          Location.get("Cobb's Knob Harem"),
          outfit,
          new AdventureSettings().setStartOfFightMacro(macro)
        );
      },
    };
  }

  getLocations(): Location[] {
    return [this.harem];
  }
}
