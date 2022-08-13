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
  toBoolean,
  toInt,
  toMonster,
  totalTurnsPlayed,
  visitUrl,
} from "kolmafia";
import { hasCombatSkillReady } from "../../../GreyAdventurer";
import { ResourceCategory } from "../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../typings/TaskInfo";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { GreySettings } from "../../../utils/GreySettings";
import { getBackupsRemaining } from "../../../utils/GreyUtils";
import { Macro } from "../../../utils/MacroBuilder";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL12Lobster extends TaskInfo implements QuestInfo {
  loc: Location = Location.get("Sonofa Beach");
  item: Item = Item.get("barrel of gunpowder");
  monster: Monster = Monster.get("Lobsterfrogman");
  cursedMagnifyingGlass: Item = Item.get("Cursed Magnifying Glass");
  powerfulGlove: Item = Item.get("Powerful Glove");
  backupCamera: Item = Item.get("Backup Camera");
  votedSticker: Item = Item.get("&quot;I Voted!&quot; sticker");
  gloveAndBackups: PossiblePath;
  backups: PossiblePath;
  manual: PossiblePath;

  constructor() {
    super();
  }

  level(): number {
    return 15;
  }

  createPaths(assumeUnstarted: boolean): void {
    const barrelsNeeded =
      5 - (assumeUnstarted ? 0 : availableAmount(this.item));
    const turnsManual = 6;
    const copyReady = this.lastMonster() == this.monster;
    this.manual = new PossiblePath(turnsManual * barrelsNeeded);

    const copiesNeeded = barrelsNeeded - (copyReady ? 0 : 1);

    // 4 for the copies, 8 for the source
    this.backups = new PossiblePath(
      copiesNeeded + (copyReady ? 0 : turnsManual)
    )
      .add(ResourceCategory.COPIER, copiesNeeded)
      .addIgnored("Cosplay Saber");

    this.gloveAndBackups = new PossiblePath(barrelsNeeded)
      .add(
        ResourceCategory.GLOVE_REPLACE,
        this.lastMonster() == this.monster ? 0 : 1
      )
      .add(ResourceCategory.COPIER, copiesNeeded)
      .addIgnored("Cosplay Saber");
  }

  getPossiblePaths(): PossiblePath[] {
    const paths = [this.manual, this.backups];

    if (
      availableAmount(this.cursedMagnifyingGlass) > 0 ||
      (toBoolean(getProperty("voteAlways")) && GreySettings.greyVotingBooth)
    ) {
      paths.push(this.gloveAndBackups);
    }

    return paths;
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

    if (
      availableAmount(this.backupCamera) > 0 &&
      getBackupsRemaining() > 0 &&
      this.shouldDelayForBats()
    ) {
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

    if (this.hasForcedMonsterAndGlove()) {
      if (this.getMonsterReplacer() == null) {
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

  isVoterReady(): boolean {
    return (
      totalTurnsPlayed() % 11 == 1 &&
      toInt(getProperty("lastVoteMonsterTurn")) < totalTurnsPlayed()
    );
  }

  getId(): QuestType {
    return "Council / War / Lobsters";
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  turnInQuest(): QuestAdventure {
    const outfit = new GreyOutfit();
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

  getMonsterReplacer(): Item {
    if (availableAmount(this.votedSticker) > 0 && this.isVoterReady()) {
      return this.votedSticker;
    }

    if (availableAmount(this.cursedMagnifyingGlass) && this.isVoidReady()) {
      return this.cursedMagnifyingGlass;
    }

    return null;
  }

  hasForcedMonsterAndGlove(): boolean {
    return (
      availableAmount(this.cursedMagnifyingGlass) +
        availableAmount(this.votedSticker) >
        0 && availableAmount(this.powerfulGlove) > 0
    );
  }

  hasBackups(): number {
    return 11 - toInt(getProperty("_backUpUses"));
  }

  lastMonster(): Monster {
    return getProperty("lastCopyableMonster") == ""
      ? null
      : toMonster(getProperty("lastCopyableMonster"));
  }

  isBackupReady(): boolean {
    return this.hasBackups() > 0 && this.lastMonster() == this.monster;
  }

  shouldDelayForBats() {
    return getQuestStatus("questL04Bat") < 3;
  }

  isBatsAvailable() {
    const status = getQuestStatus("questL04Bat");

    return status >= 3 && status < 100;
  }

  run(path: PossiblePath): QuestAdventure {
    // Try to turn in quest
    if (itemAmount(this.item) >= 5) {
      return this.turnInQuest();
    }

    if (this.isBackupReady() && path.canUse(ResourceCategory.COPIER)) {
      const outfit = new GreyOutfit();
      outfit.addBonus("-ML");

      const copierResource = path.getResource(ResourceCategory.COPIER);
      copierResource.prepare(outfit);

      let loc: Location;

      if (this.isBatsAvailable()) {
        loc = Location.get("The Boss Bat's Lair");
      } else {
        loc = Location.get("The Dire Warren");
      }

      return {
        outfit: outfit,
        location: loc,
        run: () => {
          greyAdv(
            loc,
            outfit,
            new AdventureSettings().setStartOfFightMacro(
              new Macro().ifNot_(this.monster, copierResource.macro())
            )
          );
        },
      };
    }

    const outfit = new GreyOutfit();

    const gloveMacro = path.getResource(ResourceCategory.GLOVE_REPLACE);

    if (
      gloveMacro != null &&
      this.hasForcedMonsterAndGlove() &&
      this.getMonsterReplacer() != null
    ) {
      outfit.addItem(this.getMonsterReplacer());

      gloveMacro.prepare(outfit);
    } else {
      outfit.setPlusCombat();
    }

    outfit.addBonus("-ML");

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        let macro: Macro;

        if (
          gloveMacro != null &&
          this.hasForcedMonsterAndGlove() &&
          this.getMonsterReplacer() != null
        ) {
          macro = Macro.ifNot_(this.monster, gloveMacro.macro());
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
    if (itemAmount(this.item) >= 5) {
      if (
        getProperty("sidequestLighthouseCompleted") == "none" &&
        getProperty("warProgress") == "started"
      ) {
        return true;
      }

      return false;
    }

    if (this.lastMonster() != this.monster) {
      return false;
    }

    if (this.hasBackups() <= 0) {
      return false;
    }

    return true;
  }
}
