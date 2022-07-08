import {
  Location,
  Familiar,
  availableAmount,
  Effect,
  getProperty,
  haveEffect,
  Item,
  Monster,
  toInt,
  use,
  storageAmount,
  Skill,
  gnomadsAvailable,
  haveSkill,
  equippedAmount,
} from "kolmafia";
import { PropertyManager } from "../../../../utils/Properties";
import { greyKillingBlow } from "../../../../utils/GreyCombat";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import {
  GreyPulls,
  ResourceClaim,
  ResourcePullClaim,
} from "../../../../utils/GreyResources";
import { getMoonZone, GreySettings } from "../../../../utils/GreySettings";
import { Macro } from "../../../../utils/MacroBuilder";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";
import { DelayBurners } from "../../../../iotms/delayburners/DelayBurners";

export class QuestL11RonProtesters implements QuestInfo {
  proLoc: Location = Location.get("A Mob Of Zeppelin Protesters");
  deck: Item = Item.get("deck of lewd playing cards");
  lyrndHat: Item = Item.get("lynyrdskin cap");
  lyrndPants: Item = Item.get("lynyrdskin breeches");
  lyrndShirt: Item = Item.get("lynyrdskin tunic");
  lyrndCostume: Item[] = [this.lyrndHat, this.lyrndPants, this.lyrndShirt];
  musk: Item = Item.get("lynyrd musk");
  cig: Item = Item.get("cigarette lighter");
  flaming: Item = Item.get("Flamin' Whatshisname");
  musky: Effect = Effect.get("Musky");
  toAbsorb: Monster[];
  torsoAwareness: Skill = Skill.get("Torso Awareness");
  sleazeSkill: Skill = Skill.get("Procgen Ribaldry");
  sleazeSkill2: Skill = Skill.get("Innuendo Circuitry");
  starChart: Item = Item.get("Star Chart");
  sweatpants: Item = Item.get("designer sweatpants");
  spoon: Item = Item.get("hewn moon-rune spoon");
  // TODO Once we've got the absorbs, try replace combats if it won't hurt our NCs

  isReady(): boolean {
    return (
      getProperty("questL11Ron") == "started" ||
      getProperty("questL11Ron") == "step1" ||
      toInt(getProperty("zeppelinProtestors")) <= 80
    );
  }

  getPulls(): Item[] {
    const pulls: Item[] = [];

    if (availableAmount(this.sweatpants) == 0) {
      pulls.push(this.lyrndPants);
    }

    if (haveSkill(this.torsoAwareness) || this.waitingForShirt()) {
      pulls.push(this.lyrndShirt);
    }

    pulls.push(this.lyrndHat);

    return pulls;
  }

  waitingForShirt(): boolean {
    return (
      !haveSkill(this.torsoAwareness) &&
      (gnomadsAvailable() ||
        (availableAmount(this.spoon) > 0 &&
          getMoonZone(GreySettings.greyTuneMoonSpoon) == "Gnomad" &&
          getProperty("moonTuned") != "true"))
    );
  }

  getResourceClaims(): ResourceClaim[] {
    let claims: ResourceClaim[] = [];

    for (let i of this.getPulls()) {
      if (availableAmount(i) > 0) {
        continue;
      }

      claims.push(new ResourcePullClaim(i, "Lynyrdskin Outfit", 6));
    }

    if (availableAmount(this.deck) == 0) {
      claims.push(
        new ResourcePullClaim(this.deck, "Sleaze for Ron Protestors", 20)
      );
    }

    return claims;
  }

  getId(): QuestType {
    return "Council / MacGruffin / Ron / Crowd";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL11Ron");

    if (status > 1) {
      return QuestStatus.COMPLETED;
    }

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    if (!GreySettings.isHardcoreMode() && this.waitingForShirt()) {
      return QuestStatus.NOT_READY;
    }

    if (
      availableAmount(this.sweatpants) + equippedAmount(this.sweatpants) > 0 &&
      toInt(getProperty("sweat")) < 100
    ) {
      return QuestStatus.NOT_READY;
    }

    if (gnomadsAvailable() && !haveSkill(this.torsoAwareness)) {
      return QuestStatus.NOT_READY;
    }

    // If we don't have max flaming boozes
    if (getQuestStatus("questL11Shen") <= 6) {
      return QuestStatus.NOT_READY;
    }

    if (
      !haveSkill(this.sleazeSkill2) &&
      availableAmount(this.starChart) == 0 &&
      !GreySettings.shouldAvoidTowerRequirements()
    ) {
      return QuestStatus.NOT_READY;
    }

    if (!haveSkill(this.sleazeSkill) && getQuestStatus("questL09Topping") < 1) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    // If we can get more than 6
    let lynyrdScares =
      3 +
      (availableAmount(this.musk) + haveEffect(this.musky) > 0 ? 3 : 0) +
      (GreySettings.isHardcoreMode() ? 0 : this.getPulls().length * 5);
    const shouldLynrd = lynyrdScares > 8;

    if (!GreySettings.isHardcoreMode()) {
      if (availableAmount(this.deck) == 0 && storageAmount(this.deck) > 0) {
        GreyPulls.pullDeckOfLewdCards();
      }

      if (availableAmount(this.lyrndHat) == 0 && shouldLynrd) {
        GreyPulls.pullLynrdProtesters(this.getPulls());
      }
    }

    let outfit = new GreyOutfit().setNoCombat().setNoCombat().setItemDrops();
    outfit.addBonus("+2 sleaze dmg +2 sleaze spell dmg");

    if (shouldLynrd) {
      for (let i of this.lyrndCostume) {
        outfit.addItem(i, 600);
      }
    }

    return {
      location: this.proLoc,
      outfit: outfit,
      run: () => {
        let props = new PropertyManager();

        try {
          if (
            shouldLynrd &&
            haveEffect(this.musky) <= 0 &&
            availableAmount(this.musk) > 0
          ) {
            use(this.musk);
          }

          props.setChoice(856, shouldLynrd ? 1 : 2); // Lynrd
          props.setChoice(857, 1);
          // If we don't have any flaming, just skip cos 3 isn't that fast
          props.setChoice(858, availableAmount(this.flaming) > 0 ? 1 : 2);

          let settings = new AdventureSettings();
          settings.setFinishingBlowMacro(
            new Macro().tryItem(this.cig).step(greyKillingBlow(outfit))
          );
          settings.addNoBanish(Monster.get("Blue Oyster Cultist"));
          settings.addNoBanish(Monster.get("Lynyrd Skinner"));

          greyAdv(
            Location.get("A Mob Of Zeppelin Protesters"),
            outfit,
            settings
          );
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.proLoc];
  }
}
