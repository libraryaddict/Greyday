import {
  Location,
  Familiar,
  myLevel,
  Item,
  outfitPieces,
  availableAmount,
  getProperty,
  myAscensions,
  toInt,
  haveOutfit,
  haveEffect,
  myMeat,
  Effect,
  itemAmount,
  retrieveItem,
  Skill,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { ResourceClaim, ResourceYRClaim } from "../../utils/GreyResources";
import { GreySettings } from "../../utils/GreySettings";
import { Macro } from "../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestGrabHippyOutfit implements QuestInfo {
  hippyCamp: Location = Location.get("Hippy Camp");
  rocket: Item = Item.get("Yellow Rocket");
  effect: Effect = Effect.get("Everything Looks Yellow");
  battery: Item = Item.get("Battery (9-Volt)");
  shorts: Item = Item.get("Cargo Cultist Shorts");

  hasShockingLick(): boolean {
    return toInt(getProperty("shockingLickCharges")) > 0;
  }

  getId(): QuestType {
    return "Council / War / HippyOutfit";
  }

  level(): number {
    return 5;
  }

  getResourceClaims(): ResourceClaim[] {
    return [new ResourceYRClaim("Hippy Outfit", 10)];
  }

  hasBoat(): boolean {
    return toInt(getProperty("lastIslandUnlock")) == myAscensions();
  }

  status(): QuestStatus {
    if (
      !GreySettings.isHardcoreMode() ||
      haveOutfit("Filthy Hippy Disguise") ||
      haveOutfit("Frat Warrior Fatigues")
    ) {
      return QuestStatus.COMPLETED;
    }

    if (
      availableAmount(this.shorts) > 0 &&
      getProperty("_cargoPocketEmptied") != "true"
    ) {
      return QuestStatus.NOT_READY;
    }

    if (!this.hasBoat() || myLevel() >= 12) {
      return QuestStatus.NOT_READY;
    }

    if (haveEffect(this.effect) > 0 && !this.hasShockingLick()) {
      return QuestStatus.NOT_READY;
    }

    if (myMeat() < 350 || myLevel() < 5) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();

    return {
      location: this.hippyCamp,
      outfit: outfit,
      run: () => {
        let macro: Macro;

        if (this.hasShockingLick()) {
          macro = Macro.skill(Skill.get("Shocking Lick"));
        } else {
          retrieveItem(this.rocket);

          if (itemAmount(this.rocket) == 0) {
            throw "Supposed to have a yellow rocket on hand!";
          }

          macro = Macro.item(this.rocket);
        }

        greyAdv(
          this.hippyCamp,
          outfit,
          new AdventureSettings().setStartOfFightMacro(macro)
        );
      },
    };
  }

  getLocations(): Location[] {
    return [this.hippyCamp];
  }

  mustBeDone(): boolean {
    if (!GreySettings.isHippyMode()) {
      return false;
    }

    if (myLevel() == 11) {
      return true;
    }

    return false;
  }
}
