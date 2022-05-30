import {
  Location,
  Familiar,
  Item,
  availableAmount,
  Monster,
  Skill,
  getProperty,
} from "kolmafia";
import { PropertyManager } from "../../../../utils/Properties";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { Macro } from "../../../../utils/MacroBuilder";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";
import { ResourceClaim, ResourceType } from "../../../../utils/GreyResources";

export class QuestL11TempleGrabWool implements QuestInfo {
  wool: Item = Item.get("Stone Wool");
  loc: Location = Location.get("The Hidden Temple");
  indus: Item = Item.get("industrial fire extinguisher");
  polar: Skill = Skill.get("Fire Extinguisher: Polar Vortex");
  woolMonster: Monster = Monster.get("Baa-relief sheep");
  resourceClaim: ResourceClaim = new ResourceClaim(
    ResourceType.FIRE_EXTINGUSHER,
    20,
    "Polar Vortex Stone Wool",
    6
  );

  getResourceClaims(): ResourceClaim[] {
    return [this.resourceClaim];
  }

  getId(): QuestType {
    return "Council / MacGruffin / Temple / GrabWool";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL11Worship");

    if (status > 1 || availableAmount(this.wool) > 0) {
      return QuestStatus.COMPLETED;
    }

    if (status < 0 || !this.templeFound()) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  templeFound(): boolean {
    return getProperty("questM16Temple") == "finished";
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setItemDrops().setPlusCombat();
    outfit.addItem(this.indus);

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        let settings = new AdventureSettings();
        settings.addNoBanish(this.woolMonster);

        settings.setStartOfFightMacro(
          Macro.if_(this.woolMonster, Macro.skill(this.polar).skill(this.polar))
        );

        let props = new PropertyManager();
        props.setChoice(580, 1); // Hidden heart of temple
        props.setChoice(583, 1); // Such confusing buttons
        props.setChoice(581, 3); // Fight cave bears
        props.setChoice(579, 2); // Such great heights, grab the nostril

        try {
          greyAdv(this.loc, outfit, settings);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  shouldGrabWool(): boolean {
    return availableAmount(this.wool) == 0;
  }
}
