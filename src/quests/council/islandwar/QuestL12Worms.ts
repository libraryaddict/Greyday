import {
  availableAmount,
  Effect,
  effectModifier,
  getProperty,
  haveEffect,
  haveSkill,
  Item,
  itemAmount,
  Location,
  myMeat,
  print,
  Skill,
  toInt,
  use,
  visitUrl,
} from "kolmafia";
import { ResourceCategory } from "../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../typings/TaskInfo";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { getAllCombinations } from "../../../utils/GreyUtils";
import { Macro } from "../../../utils/MacroBuilder";
import { PropertyManager } from "../../../utils/Properties";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL12Worms extends TaskInfo implements QuestInfo {
  nanovision: Skill = Skill.get("Double Nanovision");
  worms: WormProgress[] = [];
  heart: Item = Item.get("heart of the filthworm queen");
  paths: PossiblePath[] = [];

  constructor() {
    super();

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

  createPaths(assumeUnstarted: boolean): void {
    const wormsToKill = assumeUnstarted
      ? 4
      : this.worms.findIndex((w) => w.isDoable());

    const mixup: [ResourceCategory, number][] = [];

    // Skip first cos queen doesn't need special strats
    for (let i = 0; i < wormsToKill; i++) {
      // So we run 300% item drop lets assume
      // That's 30 chance a fight. That's eh, 4 fights? Lets call it 6 cos we're bad luck.
      mixup.push([null, 6]);
      mixup.push([ResourceCategory.POLAR_VORTEX, 1]);
      mixup.push([ResourceCategory.YELLOW_RAY, 1]);
    }

    this.paths = [];

    // At queen!
    if (wormsToKill == 0) {
      this.paths.push(new PossiblePath(1));
    }

    for (const combo of getAllCombinations(mixup)) {
      if (combo.length != wormsToKill) {
        continue;
      }

      const path = new PossiblePath(
        combo.map(([, turns]) => turns).reduce((p, n) => p + n, 1)
      );
      path.addIgnored("Cosplay Saber");

      combo.forEach(([resource]) => {
        if (resource == null) {
          return;
        }

        path.add(resource);
      });

      this.paths.push(path);
    }
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
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

  isHeistReady() {
    return (
      toInt(getProperty("catBurglarBankHeists")) > 0 ||
      toInt(getProperty("_catBurglarCharge")) >= 10
    );
  }

  status(path: PossiblePath): QuestStatus {
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
      return QuestStatus.FASTER_LATER;
    }

    if (path == null) {
      return QuestStatus.READY;
    }

    if (path.canUse(ResourceCategory.YELLOW_RAY)) {
      // If we're going to YR
      if (!path.getResource(ResourceCategory.YELLOW_RAY).ready()) {
        // If we can't afford to YR
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    }

    if (
      !path.canUse(ResourceCategory.POLAR_VORTEX) &&
      !haveSkill(this.nanovision)
    ) {
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

  run(path: PossiblePath): QuestAdventure {
    if (itemAmount(this.heart) > 0) {
      const outfit = new GreyOutfit();
      outfit.addItem(Item.get("Beer Helmet"));
      outfit.addItem(Item.get("distressed denim pants"));
      outfit.addItem(Item.get("bejeweled pledge pin"));
      outfit.addBonus("-tie");

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

    const outfit = new GreyOutfit();

    let resource = path.getResource(ResourceCategory.YELLOW_RAY);

    if (resource == null) {
      resource = path.getResource(ResourceCategory.POLAR_VORTEX);
    }

    if (this.isKillingQueen()) {
      outfit.meatDropWeight = 4;
    } else if (resource != null) {
      resource.prepare(outfit);
    } else {
      outfit.setItemDrops();
    }

    const chamber = this.worms.find((worm) => worm.isDoable());

    return {
      location: chamber.location,
      outfit: outfit,
      run: () => {
        if (chamber.effect != null && haveEffect(chamber.effect) == 0) {
          use(chamber.glands);
        }

        let killingBlow: Macro;
        const props = new PropertyManager();

        if (resource != null) {
          resource.prepare(null, props);
          killingBlow = resource.macro().skill(this.nanovision).repeat();
        } else {
          killingBlow = Macro.skill(this.nanovision).repeat();
        }

        try {
          greyAdv(
            chamber.location,
            outfit,
            new AdventureSettings().setFinishingBlowMacro(killingBlow)
          );
        } finally {
          props.resetAll();
        }
      },
    };
  }

  mustBeDone(): boolean {
    for (const worm of this.worms) {
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
