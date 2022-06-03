import {
  Location,
  Familiar,
  toInt,
  getProperty,
  setProperty,
  Monster,
  Item,
  Skill,
  toMonster,
  visitUrl,
  Stat,
  bufferToFile,
  myAdventures,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { ResourceClaim, ResourceType } from "../../utils/GreyResources";
import { canCombatLocket } from "../../utils/GreyUtils";
import { Macro } from "../../utils/MacroBuilder";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestLocketFantasyRealm implements QuestInfo {
  fought: string = "_foughtFantasyRealm";
  monster: Monster = Monster.get("Fantasy Bandit");
  camera: Item = Item.get("Backup Camera");

  getResourceClaims(): ResourceClaim[] {
    return [
      new ResourceClaim(ResourceType.BACKUP_CAMERA, 4, "Backup Fantasy Realm"),
      new ResourceClaim(
        ResourceType.COMBAT_LOCKET,
        1,
        "Locket Fantasyrealm Bandit"
      ),
    ];
  }

  getFoughtToday(): number {
    let setting = getProperty(this.fought);

    if (setting == "") {
      return 0;
    }

    return toInt(setting);
  }

  addFought() {
    setProperty(this.fought, (this.getFoughtToday() + 1).toString());
  }

  getId(): QuestType {
    return "Council / Tower / Keys / FantasyBandit";
  }

  level(): number {
    return 11;
  }

  hasFoughtEnough(): boolean {
    return this.getFoughtToday() >= 5;
  }

  getBackupUsesRemaining() {
    return 11 - toInt(getProperty("_backUpUses"));
  }

  status(): QuestStatus {
    if (this.hasFoughtEnough()) {
      return QuestStatus.COMPLETED;
    }

    if (getQuestStatus("questL08Trapper") <= 1) {
      return QuestStatus.NOT_READY;
    }

    if (this.getBackupUsesRemaining() < 4) {
      return QuestStatus.NOT_READY;
    }

    if (myAdventures() < 30) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    if (canCombatLocket(this.monster)) {
      return {
        location: null,
        run: () => {
          let page1 = visitUrl("inventory.php?reminisce=1", false);
          let url =
            "choice.php?pwd=&whichchoice=1463&option=1&mid=" +
            toInt(this.monster);

          let page2 = visitUrl(url);

          greyAdv(url);

          this.addFought();
        },
      };
    }

    let outfit = new GreyOutfit().addItem(Item.get("Backup Camera"));
    let loc = Location.get("The Dire Warren");

    // TODO Backup and ruin other zones delay
    return {
      outfit: outfit,
      location: null,
      run: () => {
        greyAdv(
          loc,
          outfit,
          new AdventureSettings().setStartOfFightMacro(
            new Macro().if_(
              Monster.get("Fluffy Bunny"),
              Macro.skill(Skill.get("Back-Up to your Last Enemy"))
            )
          )
        );
        this.addFought();
      },
    };
  }
  lastMonster(): Monster {
    return toMonster(getProperty("lastCopyableMonster"));
  }

  getLocations(): Location[] {
    return [];
  }

  needAdventures?(): number {
    return 5;
  }

  mustBeDone(): boolean {
    // TODO Throw error if more than one quest reports this
    return this.getFoughtToday() > 0 && !this.hasFoughtEnough();
  }
}
