import {
  availableAmount,
  cliExecute,
  Effect,
  effectModifier,
  getProperty,
  haveEffect,
  haveSkill,
  Item,
  itemAmount,
  Location,
  Monster,
  myMeat,
  Skill,
  toInt,
  toMonster,
  use,
  visitUrl,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { ResourceClaim, ResourceType } from "../../../utils/GreyResources";
import { Macro } from "../../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL12Worms implements QuestInfo {
  nanovision: Skill = Skill.get("Double Nanovision");
  worms: WormProgress[] = [];
  heart: Item = Item.get("heart of the filthworm queen");
  effect: Effect = Effect.get("Everything Looks Yellow");
  rocket: Item = Item.get("Yellow Rocket");

  constructor() {
    this.worms.push(
      new WormProgress(
        Item.get("filthworm royal guard scent gland"),
        Location.get("The Queen's Chamber")
      )
    );
    this.worms.push(
      new WormProgress(
        Item.get("filthworm drone scent gland"),
        Location.get("The Royal Guard Chamber")
      )
    );
    this.worms.push(
      new WormProgress(
        Item.get("Filthworm hatchling scent gland"),
        Location.get("The Feeding Chamber")
      )
    );
    this.worms.push(
      new WormProgress(null, Location.get("The Hatching Chamber"))
    );
  }

  getId(): QuestType {
    return "Council / War / Filthworms";
  }

  getLocations(): Location[] {
    return this.worms.map((e) => e.location);
  }

  level(): number {
    return 12;
  }

  getResourceClaims(): ResourceClaim[] {
    let yrs: number = 0;

    for (let worm of this.worms) {
      if (worm.isDoable()) {
        break;
      }

      yrs++;
    }

    if (yrs == 0) {
      return [];
    }

    return [
      new ResourceClaim(ResourceType.YELLOW_RAY, yrs, "Filthworms YR", yrs * 5),
    ];
  }

  status(): QuestStatus {
    if (getProperty("sidequestOrchardCompleted") != "none") {
      return QuestStatus.COMPLETED;
    }

    // If we can't access this place yet
    if (getProperty("warProgress") != "started") {
      return QuestStatus.NOT_READY;
    }

    // If we can't turn this in
    if (
      toInt(getProperty("hippiesDefeated")) < 64 &&
      availableAmount(this.heart) > 0
    ) {
      return QuestStatus.NOT_READY;
    }

    if (this.isKillingQueen()) {
      return QuestStatus.READY;
    }

    // If we're going to YR
    if (haveEffect(this.effect) == 0) {
      // If we can't afford to YR
      if (myMeat() < 500) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    }

    if (!haveSkill(this.nanovision)) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.FASTER_LATER;
  }

  isKillingQueen(): boolean {
    return (
      itemAmount(Item.get("filthworm royal guard scent gland")) > 0 ||
      haveEffect(Effect.get("Filthworm Guard Stench")) > 0
    );
  }

  run(): QuestAdventure {
    if (itemAmount(this.heart) > 0) {
      let outfit = new GreyOutfit();
      outfit.addItem(Item.get("Beer Helmet"));
      outfit.addItem(Item.get("distressed denim pants"));
      outfit.addItem(Item.get("bejeweled pledge pin"));

      return {
        outfit: outfit,
        location: null,
        run: () => {
          visitUrl("bigisland.php?place=orchard&action=stand&pwd=");
          visitUrl("bigisland.php?place=orchard&action=stand&pwd=");
          visitUrl("shop.php?whichshop=hippy");
        },
      };
    }

    let outfit = new GreyOutfit();

    if (this.isKillingQueen()) {
      outfit.meatDropWeight = 4;
    } else if (haveEffect(this.effect) > 0) {
      outfit.setItemDrops();
    }

    let chamber = this.worms.find((worm) => worm.isDoable());

    return {
      location: chamber.location,
      outfit: outfit,
      run: () => {
        if (chamber.effect != null && haveEffect(chamber.effect) == 0) {
          use(chamber.glands);
        }

        let killingBlow: Macro;

        if (haveEffect(this.effect) == 0 && !this.isKillingQueen()) {
          cliExecute("acquire yellow rocket");
          killingBlow = Macro.item(this.rocket);
        } else {
          killingBlow = Macro.skill(this.nanovision).repeat();
        }

        greyAdv(
          chamber.location,
          outfit,
          new AdventureSettings().setFinishingBlowMacro(killingBlow)
        );
      },
    };
  }

  mustBeDone(): boolean {
    for (let worm of this.worms) {
      if (worm.effect == null) {
        continue;
      }

      // If the gland is in operation
      if (haveEffect(worm.effect) > 0) {
        return true;
      }

      // If the gland is available
      if (availableAmount(worm.glands) > 0) {
        return false;
      }
    }

    return false;
  }
}

class WormProgress {
  glands: Item;
  effect: Effect;
  location: Location;

  constructor(item: Item, location: Location) {
    this.location = location;
    this.glands = item;

    if (item == null) {
      return;
    }

    this.effect = effectModifier(item, "Effect");
  }

  isDoable() {
    return (
      this.glands == null ||
      haveEffect(this.effect) > 0 ||
      availableAmount(this.glands) > 0
    );
  }
}
