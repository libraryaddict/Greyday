import {
  availableAmount,
  Familiar,
  familiarWeight,
  getProperty,
  Item,
  itemAmount,
  Location,
  Monster,
  myAdventures,
  myLevel,
  Skill,
  toInt,
  toMonster,
  visitUrl,
} from "kolmafia";
import { hasCombatSkillReady } from "../../../GreyAdventurer";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { ResourceClaim, ResourceType } from "../../../utils/GreyResources";
import { Macro } from "../../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL12Lobster implements QuestInfo {
  loc: Location = Location.get("Sonofa Beach");
  item: Item = Item.get("barrel of gunpowder");
  monster: Monster = Monster.get("Lobsterfrogman");
  cursed: Item = Item.get("Cursed Magnifying Glass");
  glove: Item = Item.get("Powerful Glove");
  backupCamera: Item = Item.get("Backup Camera");

  level(): number {
    return 12;
  }

  getResourceClaims(): ResourceClaim[] {
    return [
      new ResourceClaim(
        ResourceType.BACKUP_CAMERA,
        4,
        "Backup Lobsterfrogman",
        5 * 4
      ),
    ];
  }

  status(): QuestStatus {
    if (getProperty("sidequestLighthouseCompleted") != "none") {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("warProgress") != "started") {
      return QuestStatus.NOT_READY;
    }

    if (myAdventures() < 22) {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.backupCamera) > 0 && this.isBackupReady()) {
      return QuestStatus.READY;
    }

    if (availableAmount(this.item) >= 5) {
      return QuestStatus.READY;
    }

    if (
      familiarWeight(Familiar.get("Grey Goose")) > 2 &&
      familiarWeight(Familiar.get("Grey Goose")) < 6
    ) {
      return QuestStatus.NOT_READY;
    }

    if (this.hasVoidAndGlove()) {
      if (!this.isVoidReady()) {
        return QuestStatus.NOT_READY;
      }
    } else if (!hasCombatSkillReady()) {
      return QuestStatus.FASTER_LATER;
    }

    if (myLevel() < 16 && getProperty("sidequestArenaCompleted") == "none") {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  isVoidReady(): boolean {
    return toInt(getProperty("cursedMagnifyingGlassCount")) == 13;
  }

  getId(): QuestType {
    return "Council / War / Lobsters";
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  turnInQuest(): QuestAdventure {
    let outfit = new GreyOutfit();
    outfit.addItem(Item.get("Beer Helmet"));
    outfit.addItem(Item.get("distressed denim pants"));
    outfit.addItem(Item.get("bejeweled pledge pin"));

    return {
      location: null,
      outfit: outfit,
      run: () => {
        visitUrl("bigisland.php?place=lighthouse&action=pyro&pwd");
        visitUrl("bigisland.php?place=lighthouse&action=pyro&pwd");
        visitUrl("bigisland.php?place=lighthouse&action=pyro&pwd");
      },
    };
  }

  hasVoidAndGlove(): boolean {
    return availableAmount(this.cursed) > 0 && availableAmount(this.glove) > 0;
  }

  hasBackups(): number {
    return 11 - toInt(getProperty("_backUpUses"));
  }

  lastMonster(): Monster {
    return toMonster(getProperty("lastCopyableMonster"));
  }

  isBackupReady(): boolean {
    return this.hasBackups() > 0 && this.lastMonster() == this.monster;
  }

  run(): QuestAdventure {
    // Try to turn in quest
    if (itemAmount(this.item) >= 5) {
      return this.turnInQuest();
    }

    if (this.isBackupReady()) {
      let outfit = new GreyOutfit().addItem(Item.get("Backup Camera"));
      let loc = Location.get("The Dire Warren");

      // TODO Backup and ruin other zones delay
      return {
        outfit: outfit,
        location: loc,
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

    let outfit = new GreyOutfit();

    if (this.hasVoidAndGlove() && this.isVoidReady()) {
      outfit.addBonus("+equip cursed magnifying glass");
      outfit.addBonus("+equip Powerful Glove");
    } else {
      outfit.setPlusCombat();
    }

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        let macro: Macro;

        if (this.hasVoidAndGlove() && this.isVoidReady()) {
          macro = Macro.if_(
            this.monster,
            Macro.skill("CHEAT CODE: Replace Enemy"),
            true
          );
        }

        greyAdv(
          this.loc,
          outfit,
          new AdventureSettings().setStartOfFightMacro(macro)
        );
      },
    };
  }

  mustBeDone(): boolean {
    if (this.lastMonster() != this.monster) {
      return false;
    }

    if (this.hasBackups() <= 0) {
      return false;
    }

    if (itemAmount(this.item) >= 5) {
      return false;
    }

    return true;
  }
}
