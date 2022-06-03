import {
  Location,
  Familiar,
  getProperty,
  familiarWeight,
  Skill,
  pickPocket,
  Monster,
  myAdventures,
  cliExecute,
  print,
  visitUrl,
  runChoice,
  Item,
  availableAmount,
} from "kolmafia";
import { greyKillingBlow } from "../../../utils/GreyCombat";
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

export class QuestCargoShorts implements QuestInfo {
  shorts: Item = Item.get("Cargo Cultist Shorts");

  getId(): QuestType {
    return "Council / Peaks / CargoShortsSmut";
  }

  level(): number {
    return 8;
  }

  status(): QuestStatus {
    if (
      getProperty("_cargoPocketEmptied") == "true" ||
      availableAmount(this.shorts) == 0
    ) {
      return QuestStatus.COMPLETED;
    }

    let status = getQuestStatus("questL09Topping");

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    if (status < 0 || myAdventures() < 40) {
      return QuestStatus.NOT_READY;
    }

    if (familiarWeight(Familiar.get("Grey Goose")) < 6) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      familiar: Familiar.get("Grey Goose"),
      disableFamOverride: true,
      run: () => {
        visitUrl("inventory.php?action=pocket");
        visitUrl("choice.php?whichchoice=1420&option=1&pocket=666&pwd=");

        let macro = Macro.skill(
          Skill.get("Emit Matter Duplicating Drones")
        ).step(greyKillingBlow(new GreyOutfit()));
        print("Macro: " + macro.toString());
        macro.submit();
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  mustBeDone(): boolean {
    if (familiarWeight(Familiar.get("Grey Goose")) >= 6) {
      return true;
    }

    return false;
  }

  getResourceClaims(): ResourceClaim[] {
    return [
      new ResourceClaim(ResourceType.CARGO_SHORTS, 1, "Smut Orc Pervert"),
    ];
  }
}
