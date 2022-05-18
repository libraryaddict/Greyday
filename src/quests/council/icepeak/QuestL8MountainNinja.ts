import {
  Location,
  Familiar,
  availableAmount,
  maximize,
  numericModifier,
  visitUrl,
  Item,
} from "kolmafia";
import { hasCombatSkillReady } from "../../../GreyAdventurer";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { MountainStatus } from "../QuestL8IcePeak";

export class QuestL8MountainNinja implements QuestInfo {
  ninja: Location = Location.get("Lair of the Ninja Snowmen");

  getId(): QuestType {
    return "Council / Ice / Ninjas";
  }

  level(): number {
    return 8;
  }

  status(): QuestStatus {
    let status = this.getStatus();

    if (status > MountainStatus.GET_OUTFIT) {
      return QuestStatus.COMPLETED;
    }

    if (status < MountainStatus.GET_OUTFIT) {
      return QuestStatus.NOT_READY;
    }

    // If we've reached snowman time but don't have the skill
    if (!hasCombatSkillReady()) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  getStatus(): MountainStatus {
    return getQuestStatus("questL08Trapper");
  }

  run(): QuestAdventure {
    // See if we can unlock peak yet
    if (this.getOutfit().find((i) => availableAmount(i) == 0) == null) {
      return {
        location: null,
        run: () => {
          if (numericModifier("Cold Resistance") < 5) {
            maximize("cold res", false);
          }

          visitUrl("place.php?whichplace=mclargehuge&action=cloudypeak");
        },
      };
    }

    let outfit = new GreyOutfit().setPlusCombat();

    return {
      location: this.ninja,
      outfit: outfit,
      run: () => {
        greyAdv(this.ninja, outfit);
      },
    };
  }

  getLocations(): Location[] {
    return [this.ninja];
  }

  getOutfit(): Item[] {
    return ["Ninja rope", "Ninja Crampons", "Ninja Carabiner"].map((i) =>
      Item.get(i)
    );
  }
}
