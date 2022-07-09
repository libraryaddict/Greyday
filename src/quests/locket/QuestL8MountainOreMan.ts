import {
  Location,
  Familiar,
  availableAmount,
  cliExecute,
  Item,
  Monster,
  retrieveItem,
  Skill,
  getProperty,
  familiarWeight,
  Effect,
  itemAmount,
  haveEffect,
  print,
  myLevel,
  useFamiliar,
  toInt,
  visitUrl,
  myAdventures,
  haveSkill,
  equippedAmount,
  myMeat,
} from "kolmafia";
import { greyAdv, AdventureSettings } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import {
  canCombatLocket,
  doPocketWishFight,
  getBackupsRemaining,
} from "../../utils/GreyUtils";
import { Macro } from "../../utils/MacroBuilder";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { QuestType } from "../QuestTypes";
import { MountainStatus } from "../council/QuestL8IcePeak";
import { QuestL8MountainOre } from "../council/mountain/QuestL8MountainOre";
import {
  GreyPulls,
  ResourceClaim,
  ResourcePullClaim,
  ResourceType,
} from "../../utils/GreyResources";
import { GreySettings } from "../../utils/GreySettings";

export class QuestL8MountainOreMan extends QuestL8MountainOre {
  mountainMan: Monster = Monster.get("Mountain Man");
  goose: Familiar = Familiar.get("Grey Goose");
  indus: Item = Item.get("industrial fire extinguisher");
  polar: Skill = Skill.get("Fire Extinguisher: Polar Vortex");
  rocket: Item = Item.get("Yellow Rocket");
  effect: Effect = Effect.get("Everything Looks Yellow");
  resourceClaim: ResourceClaim = new ResourceClaim(
    ResourceType.FIRE_EXTINGUSHER,
    40,
    "Polar Vortex Ores",
    6
  );
  nanovision: Skill = Skill.get("Double Nanovision");
  wish: Item = Item.get("Pocket Wish");

  getResourceClaims(): ResourceClaim[] {
    return [
      this.resourceClaim,
      new ResourceClaim(ResourceType.YELLOW_RAY, 1, "YR Mountain Man", 10),
      new ResourcePullClaim(Item.get("asbestos ore"), "Pull Ice Peak Ore", 10),
      new ResourceClaim(
        ResourceType.COMBAT_LOCKET,
        1,
        "Locket Mountain Man",
        10
      ),
    ];
  }

  getId(): QuestType {
    return "Council / Ice / MountainMan";
  }

  level(): number {
    return 11;
  }

  getStatus(): MountainStatus {
    return getQuestStatus("questL08Trapper");
  }

  status(): QuestStatus {
    let status = this.getStatus();

    if (status > MountainStatus.TRAPPER_DEMANDS) {
      return QuestStatus.COMPLETED;
    }

    if (status < MountainStatus.TRAPPER_DEMANDS) {
      return QuestStatus.NOT_READY;
    }

    if (this.getOreRemaining() <= 0) {
      return QuestStatus.COMPLETED;
    }

    if (this.getOreRemaining() > 1 && haveEffect(this.effect)) {
      return QuestStatus.NOT_READY;
    }

    if (
      !this.canBackup() &&
      GreySettings.isHardcoreMode() &&
      haveEffect(this.effect)
    ) {
      return QuestStatus.NOT_READY;
    }

    if (
      this.getOreRemaining() > 1 &&
      !canCombatLocket(this.mountainMan) &&
      availableAmount(this.wish) == 0
    ) {
      return QuestStatus.NOT_READY;
    }

    if (this.getOreRemaining() == 1) {
      return QuestStatus.READY;
    }

    // Delay this if we can't dupe, and don't have nanovision
    if (
      this.getOreRemaining() == 3 &&
      !this.doDuping() &&
      !this.canBackup() &&
      !haveSkill(this.nanovision)
    ) {
      return QuestStatus.NOT_READY;
    }

    if (this.getOreRemaining() == 3 && this.doDuping()) {
      if (familiarWeight(this.goose) < 6) {
        return QuestStatus.NOT_READY;
      }
    }

    if (myMeat() < 500) {
      return QuestStatus.NOT_READY;
    }

    // User can sell their clovers, which will profit more according to their MPA
    if (
      !GreySettings.isHardcoreMode() &&
      toInt(getProperty("valueOfAdventure")) < 4000
    ) {
      return QuestStatus.READY;
    }

    return QuestStatus.READY;
  }

  mustBeDone(): boolean {
    if (myLevel() < 12) {
      return false;
    }

    if (myAdventures() < 40) {
      return false;
    }

    if (familiarWeight(this.goose) >= 6) {
      return true;
    }

    return false;
  }

  lastBackup(): Monster {
    return Monster.get(getProperty("lastCopyableMonster"));
  }

  canBackup(): boolean {
    return this.hasBackups() && this.lastBackup() == this.mountainMan;
  }

  hasBackups(): boolean {
    return getBackupsRemaining() > 0;
  }

  doPull(): QuestAdventure {
    return {
      location: null,
      outfit: new GreyOutfit("-tie"),
      run: () => {
        GreyPulls.pullOre();
      },
    };
  }

  doBackups(): QuestAdventure {
    let outfit = new GreyOutfit().setItemDrops();
    let loc = Location.get("The Dire Warren");

    outfit.addItem(Item.get("Backup Camera"));

    return {
      location: loc,
      outfit: outfit,
      run: () => {
        greyAdv(
          loc,
          outfit,
          new AdventureSettings().setStartOfFightMacro(
            new Macro().externalIf(
              Monster.get("Fluffy Bunny"),
              Macro.skill(Skill.get("Back-Up to your Last Enemy"))
            )
          )
        );
      },
    };
  }

  run(): QuestAdventure {
    if (!GreySettings.isHardcoreMode() && this.getOreRemaining() == 1) {
      return this.doPull();
    }

    if (this.canBackup()) {
      return this.doBackups();
    }

    return this.doLocket();
  }

  doLocket(): QuestAdventure {
    let outfit = new GreyOutfit();
    outfit.addBonus("+DA +DR -ML");

    if (!this.doDuping() && availableAmount(this.indus) > 0) {
      outfit.addItem(this.indus);
    }

    return {
      location: null,
      outfit: outfit,
      familiar: this.goose,
      run: () => {
        retrieveItem(this.rocket);

        if (itemAmount(this.rocket) == 0) {
          throw "Supposed to have a yellow rocket on hand!";
        }

        useFamiliar(this.goose);

        if (canCombatLocket(this.mountainMan)) {
          let page1 = visitUrl("inventory.php?reminisce=1", false);
          let url =
            "choice.php?pwd=&whichchoice=1463&option=1&mid=" +
            toInt(this.mountainMan);

          visitUrl(url);
        } else {
          doPocketWishFight(this.mountainMan);
        }

        let macro: Macro = new Macro();

        if (this.doDuping()) {
          macro = macro.skill(Skill.get("Emit Matter Duplicating Drones"));
        } else if (equippedAmount(this.indus) > 0) {
          let tries = 2;

          while (tries > 0 && this.getOreRemaining() > 2) {
            tries--;
            print("Drop my ore dammit!", "red");
            Macro.skill(this.polar).submit();
          }

          if (this.getOreRemaining() > 2) {
            if (GreySettings.isHardcoreMode()) {
              print("Drat. We're going to have to do a backup.", "red");
            } else {
              print("Drat. We're going to have to pull the last ore.", "red");
            }
          }
        }

        macro.item(this.rocket);
        macro.submit();
      },
    };
  }

  doDuping(): boolean {
    return this.neededOre() == Item.get("asbestos ore");
  }

  getLocations(): Location[] {
    return [];
  }

  needAdventures(): number {
    return 3;
  }
}
