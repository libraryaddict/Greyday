import {
  adv1,
  adventure,
  availableAmount,
  council,
  Effect,
  getProperty,
  handlingChoice,
  haveEffect,
  haveSkill,
  Item,
  itemAmount,
  Location,
  maximize,
  myLevel,
  myMp,
  numericModifier,
  Skill,
  useSkill,
} from "kolmafia";
import { PropertyManager } from "../../utils/Properties";
import {
  OutfitImportance,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { hasNonCombatSkillsReady } from "../../GreyAdventurer";
import { greyAdv } from "../../utils/GreyLocations";
import { QuestType } from "../QuestTypes";

export class QuestL2SpookyLarva implements QuestInfo {
  location: Location = Location.get("The Spooky Forest");

  level(): number {
    return 2;
  }

  getId(): QuestType {
    return "Council / Larva";
  }

  status(): QuestStatus {
    let status = getProperty("questL02Larva");

    if (status == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (this.location.turnsSpent < 5) {
      //   return QuestStatus.HAS_DELAY_BURNING;
    }

    if (!hasNonCombatSkillsReady(false)) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    if (this.location.turnsSpent < 5) {
      return {
        location: this.location,
        run() {
          greyAdv(this.location);
        },
      };
    }

    let outfit = new GreyOutfit().setNoCombat();

    return {
      location: this.location,
      outfit: outfit,
      run: () => {
        let props = new PropertyManager();

        props.setChoice(502, 2);
        props.setChoice(505, 1);

        try {
          greyAdv(this.location);
        } finally {
          props.resetAll();
        }

        if (availableAmount(Item.get("mosquito larva")) > 0) {
          council();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.location];
  }
}
