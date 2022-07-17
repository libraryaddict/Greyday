import {
  Location,
  Familiar,
  Item,
  availableAmount,
  use,
  Skill,
  getProperty,
  familiarWeight,
} from "kolmafia";
import { greyAdv, AdventureSettings } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { ResourceClaim, ResourceType } from "../../../utils/GreyResources";
import { GreySettings } from "../../../utils/GreySettings";
import { Macro } from "../../../utils/MacroBuilder";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL4BatsCenter implements QuestInfo {
  fire: Item = Item.get("industrial fire extinguisher");
  loc: Location = Location.get("Guano Junction");
  sonar: Item = Item.get("sonar-in-a-biscuit");
  resourceClaim: ResourceClaim = new ResourceClaim(
    ResourceType.FIRE_EXTINGUSHER,
    20,
    "Spray down bat cave",
    5
  );
  goose: Familiar = Familiar.get("Grey Goose");

  getResourceClaims(): ResourceClaim[] {
    if (
      availableAmount(this.fire) == 0 ||
      getProperty("fireExtinguisherBatHoleUsed") == "true"
    ) {
      return [];
    }

    return [this.resourceClaim];
  }

  getId(): QuestType {
    return "Council / Bats / UnlockLeft";
  }

  level(): number {
    return 4;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL04Bat");

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    if (familiarWeight(this.goose) >= 6) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();

    if (!GreySettings.isHardcoreMode() && availableAmount(this.fire) > 0) {
      outfit.addItem(this.fire);
    }

    return {
      outfit: outfit,
      location: this.loc,
      run: () => {
        let settings = new AdventureSettings();

        if (availableAmount(this.fire) > 0 && !GreySettings.isHardcoreMode()) {
          settings.setStartOfFightMacro(
            new Macro()
              .trySkill(Skill.get("Fire Extinguisher: Zone Specific"))
              .trySkill(Skill.get("Infinite Loop"))
              .attack()
          );
        }

        greyAdv(this.loc, outfit, settings);
        this.doSonars();
      },
    };
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  doSonars() {
    while (
      availableAmount(this.sonar) > 0 &&
      getQuestStatus("questL04Bat") < 3
    ) {
      use(this.sonar);
    }
  }
}
