import {
  Location,
  Familiar,
  haveOutfit,
  Effect,
  getProperty,
  haveEffect,
  Item,
  myAscensions,
  myLevel,
  myMeat,
  toInt,
  itemAmount,
  retrieveItem,
  outfitPieces,
  availableAmount,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import { greyAdv, AdventureSettings } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  GreyPulls,
  ResourceClaim,
  ResourcePullClaim,
  ResourceType,
} from "../../../utils/GreyResources";
import { GreySettings } from "../../../utils/GreySettings";
import { Macro } from "../../../utils/MacroBuilder";
import { QuestInfo, QuestStatus, QuestAdventure } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL12GrabWarOutfit implements QuestInfo {
  location: Location = Location.get("Frat House");
  rocket: Item = Item.get("Yellow Rocket");
  effect: Effect = Effect.get("Everything Looks Yellow");
  shorts: Item = Item.get("Cargo Cultist Shorts");

  getId(): QuestType {
    return "Council / War / FratOutfit";
  }

  hasBoat(): boolean {
    return toInt(getProperty("lastIslandUnlock")) == myAscensions();
  }

  level(): number {
    return 12;
  }

  status(): QuestStatus {
    if (haveOutfit("Frat Warrior Fatigues")) {
      return QuestStatus.COMPLETED;
    }

    if (
      availableAmount(this.shorts) > 0 &&
      getProperty("_cargoPocketEmptied") != "true"
    ) {
      return QuestStatus.NOT_READY;
    }

    if (getProperty("_photocopyUsed") == "false") {
      return QuestStatus.NOT_READY;
    }

    if (GreySettings.isHardcoreMode() && !haveOutfit("Filthy Hippy Disguise")) {
      return QuestStatus.NOT_READY;
    }

    if (!this.hasBoat() || myLevel() < 12) {
      return QuestStatus.NOT_READY;
    }

    if (haveEffect(this.effect) > 0) {
      return QuestStatus.NOT_READY;
    }

    if (myMeat() < 350 || myLevel() < 5) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  getResourceClaims(): ResourceClaim[] {
    if (GreySettings.isHardcoreMode()) {
      return [
        new ResourceClaim(ResourceType.CARGO_SHORTS, 1, "YR Frat Boy", 16),
      ];
    }

    let claim: ResourceClaim[] = [];

    for (let i of outfitPieces("Frat Warrior Fatigues")) {
      if (availableAmount(i) > 0) {
        continue;
      }

      claim.push(new ResourcePullClaim(i, "Frat Outfit", 5));
    }

    return claim;
  }

  run(): QuestAdventure {
    if (!GreySettings.isHardcoreMode()) {
      return {
        location: null,
        run: () => {
          GreyPulls.pullFratWarOutfit();
        },
      };
    }

    let outfit = new GreyOutfit().setPlusCombat();

    for (let item of outfitPieces("Filthy Hippy Disguise")) {
      outfit.addItem(item);
    }

    return {
      location: this.location,
      outfit: outfit,
      run: () => {
        retrieveItem(this.rocket);

        if (itemAmount(this.rocket) == 0) {
          throw "Supposed to have a yellow rocket on hand!";
        }

        let props = new PropertyManager();
        props.setChoice(143, 3);
        props.setChoice(144, 3);
        props.setChoice(145, 2);
        props.setChoice(146, 2);

        try {
          greyAdv(
            this.location,
            outfit,
            new AdventureSettings().setStartOfFightMacro(
              Macro.item(this.rocket)
            )
          );
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getLocations(): Location[] {
    if (GreySettings.isHardcoreMode()) {
      return [this.location];
    }

    return [];
  }
}
