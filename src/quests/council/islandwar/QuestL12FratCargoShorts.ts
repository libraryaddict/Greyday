import {
  Location,
  Familiar,
  Monster,
  Item,
  availableAmount,
  getProperty,
  haveOutfit,
  Effect,
  haveEffect,
  myMeat,
  print,
  Skill,
  visitUrl,
  retrieveItem,
  cliExecute,
} from "kolmafia";
import { ResourceClaim, ResourceType } from "../../../utils/GreyResources";
import { Macro } from "../../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL12FratCargoShorts implements QuestInfo {
  shorts: Item = Item.get("Cargo Cultist Shorts");
  rocket: Item = Item.get("Yellow Rocket");
  effect: Effect = Effect.get("Everything Looks Yellow");

  getId(): QuestType {
    return "Council / War / Frat Cargo Shorts";
  }

  level(): number {
    return 12;
  }

  status(): QuestStatus {
    if (haveOutfit("Frat Warrior Fatigues")) {
      return QuestStatus.COMPLETED;
    }

    if (
      getProperty("_cargoPocketEmptied") == "true" ||
      availableAmount(this.shorts) == 0
    ) {
      return QuestStatus.COMPLETED;
    }

    if (haveEffect(this.effect) > 0 || myMeat() < 300) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        cliExecute("acquire " + this.rocket.name);
        visitUrl("inventory.php?action=pocket");
        visitUrl("choice.php?whichchoice=1420&option=1&pocket=568&pwd=");

        Macro.item(this.rocket).submit();
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  getResourceClaims(): ResourceClaim[] {
    return [new ResourceClaim(ResourceType.CARGO_SHORTS, 1, "YR Frat Boy", 16)];
  }
}
