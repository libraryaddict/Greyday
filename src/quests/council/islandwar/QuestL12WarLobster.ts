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
  print,
  setProperty,
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
import {
  getAllCombinations,
  getBackupsRemaining,
} from "../../../utils/GreyUtils";
import { Macro } from "../../../utils/MacroBuilder";
import { PropertyManager } from "../../../utils/Properties";
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
  bossBat: Monster = Monster.get("Boss Bat");
  cursedMagnifyingGlass: Item = Item.get("Cursed Magnifying Glass");
  powerfulGlove: Item = Item.get("Powerful Glove");
  backupCamera: Item = Item.get("Backup Camera");
  votedSticker: Item = Item.get("&quot;I Voted!&quot; sticker");
  paths: PossiblePath[] = [];

  constructor() {
    super();
  }

  level(): number {
    return 15;
  }

  getFriendsRemaining(): number {
    if (toMonster(getProperty("_saberForceMonster")) != this.monster) {
      return 0;
    }

    return toInt(getProperty("_saberForceMonsterCount"));
  }

  createPaths(assumeUnstarted: boolean): void {
    const barrelsNeeded =
      5 - (assumeUnstarted ? 0 : availableAmount(this.item));
    const turnsManual = 8;
    const possibleCombo: (ResourceCategory | "Manual")[] = [];

    for (
      let i = 0;
      i < barrelsNeeded - (assumeUnstarted ? 0 : this.getFriendsRemaining());
      i++
    ) {
      possibleCombo.push("Manual");
      possibleCombo.push(ResourceCategory.COPIER);
      possibleCombo.push(ResourceCategory.OLFACT_COPIER);
    }

    // If we're doing voted, or mag class. Then we can do a replace
    if (
      availableAmount(this.votedSticker) +
        availableAmount(this.cursedMagnifyingGlass) >
        0 &&
      (!this.isBackupReady() || this.getFriendsRemaining() == 0)
    ) {
      possibleCombo.push(ResourceCategory.GLOVE_REPLACE);
    }

    this.paths = [];

    for (const combo of getAllCombinations(possibleCombo)) {
      // If a combo would do something silly, like request a glove replace when its not needed
      if (!assumeUnstarted && combo.includes(ResourceCategory.GLOVE_REPLACE)) {
        // If we'd ask for a replace when we're doing friends.. Or have a void copier
        if (this.getFriendsRemaining() > 0) {
          continue;
        }

        // If we'd ask for a replace when we can do backups
        if (
          this.lastMonster() == this.monster &&
          combo.includes(ResourceCategory.COPIER)
        ) {
          continue;
        }
      }

      // If a combo would do something silly, like expect lobster without a source
      if (
        !combo.includes("Manual") &&
        !combo.includes(ResourceCategory.GLOVE_REPLACE) &&
        (assumeUnstarted ||
          (this.getFriendsRemaining() == 0 &&
            !(
              combo.includes(ResourceCategory.COPIER) &&
              this.lastMonster() == this.monster
            )))
      ) {
        continue;
      }

      let turnsTaken = 0;
      let barrelsGained = 0;

      for (const type of combo) {
        if (type == "Manual") {
          turnsTaken += turnsManual;
          barrelsGained++;
        } else if (type == ResourceCategory.COPIER) {
          // Skip turns taken as we're burning delay as a rule
          // turnsTaken++;
          barrelsGained++;
        } else if (type == ResourceCategory.OLFACT_COPIER) {
          // Each one of these gives us another 2 effectively
          // Since the first fight we'd saber on won't give us a barrel and is pretty much moved to the last fight
          turnsTaken += 2;
          barrelsGained += 2;
        } else if (type == ResourceCategory.GLOVE_REPLACE) {
          turnsTaken++;
          barrelsGained++;
        } else {
          throw "Lobster calcs didn't account for " + type;
        }
      }

      if (barrelsGained < barrelsNeeded) {
        continue;
      }

      // If we're doing olfact, then doing an extra copy when our saber would do it anyways is a waste
      const extraTurns = combo.filter(
        (c) => c == "Manual" || c == ResourceCategory.COPIER
      ).length;
      const extraBarrels = barrelsGained - barrelsNeeded;

      if (extraBarrels > 0 && extraTurns > 1) {
        continue;
      }

      const path = new PossiblePath(turnsTaken);

      for (const type of combo) {
        if (typeof type != "number") {
          continue;
        }

        path.add(type);
      }

      this.paths.push(path);
    }

    if (barrelsNeeded <= 0) {
      this.paths.push(new PossiblePath(0));
    }
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  status(path: PossiblePath): QuestStatus {
    if (getProperty("sidequestLighthouseCompleted") != "none") {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("warProgress") != "started") {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.item) >= 5) {
      return QuestStatus.READY;
    }

    if (myAdventures() < 22 || path == null) {
      return QuestStatus.NOT_READY;
    }

    if (this.getFriendsRemaining() > 0) {
      return QuestStatus.READY;
    }

    if (path.canUse(ResourceCategory.COPIER) && this.shouldDelayForBats()) {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.backupCamera) > 0 && this.isBackupReady()) {
      return QuestStatus.READY;
    }

    if (
      familiarWeight(Familiar.get("Grey Goose")) > 2 &&
      familiarWeight(Familiar.get("Grey Goose")) < 6
    ) {
      return QuestStatus.FASTER_LATER;
    }

    if (
      path.canUse(ResourceCategory.GLOVE_REPLACE) &&
      this.hasForcedMonsterAndGlove()
    ) {
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

  runBackup(path: PossiblePath): QuestAdventure {
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

  runFriends(path: PossiblePath): QuestAdventure {
    const copier = path.getResource(ResourceCategory.OLFACT_COPIER);
    const makeMoreFriends =
      this.getFriendsRemaining() == 1 &&
      availableAmount(this.item) < 4 &&
      copier != null;

    const outfit = new GreyOutfit();
    outfit.addBonus("-ML");

    if (makeMoreFriends) {
      copier.prepare(outfit);
    }

    return {
      outfit: outfit,
      location: this.loc,
      run: () => {
        const props = new PropertyManager();
        let macro: Macro;

        if (makeMoreFriends) {
          copier.prepare(null, props);
          macro = Macro.if_(this.monster, copier.macro());
        }

        try {
          greyAdv(
            this.loc,
            outfit,
            new AdventureSettings().setStartOfFightMacro(macro)
          );
        } finally {
          props.resetAll();
        }
      },
    };
  }

  run(path: PossiblePath): QuestAdventure {
    // Try to turn in quest
    if (itemAmount(this.item) >= 5) {
      return this.turnInQuest();
    }

    if (this.getFriendsRemaining() > 0) {
      return this.runFriends(path);
    }

    if (this.isBackupReady() && path.canUse(ResourceCategory.COPIER)) {
      return this.runBackup(path);
    }

    const outfit = new GreyOutfit();

    const gloveMacro = path.getResource(ResourceCategory.GLOVE_REPLACE);
    const monsterReplacerItem = this.getMonsterReplacer();

    if (
      gloveMacro != null &&
      this.hasForcedMonsterAndGlove() &&
      monsterReplacerItem != null
    ) {
      outfit.addItem(monsterReplacerItem);

      gloveMacro.prepare(outfit);
    } else {
      outfit.setPlusCombat();
    }

    outfit.addBonus("-ML");

    const copier = path.getResource(ResourceCategory.OLFACT_COPIER);

    if (copier != null) {
      copier.prepare(outfit);
    }

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        let macro: Macro;
        const props = new PropertyManager();

        if (copier != null) {
          copier.prepare(null, props);

          if (macro == null) {
            macro = new Macro();
          }

          macro.if_(this.monster, copier.macro());
        }

        try {
          if (
            gloveMacro != null &&
            this.hasForcedMonsterAndGlove() &&
            monsterReplacerItem != null
          ) {
            visitUrl("adventure.php?snarfblat=" + toInt(this.loc));

            Macro.ifNot_(
              this.monster,
              Macro.ifNot_(this.bossBat, gloveMacro.macro())
            ).submit();
          }

          greyAdv(
            this.loc,
            outfit,
            new AdventureSettings().setStartOfFightMacro(macro)
          );
        } finally {
          props.resetAll();
        }
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

  canAcceptPrimes(): boolean {
    return false;
  }
}
