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
  toInt,
  toMonster,
  turnsPlayed,
  visitUrl,
} from "kolmafia";
import { hasCombatSkillReady } from "../../../GreyAdventurer";
import { DelayBurner } from "../../../iotms/delayburners/DelayBurnerAbstract";
import {
  DelayBurners,
  DelayCriteria,
} from "../../../iotms/delayburners/DelayBurners";
import { ResourceCategory } from "../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../typings/TaskInfo";
import {
  AdventureSettings,
  greyAdv,
  setPrimedResource,
} from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { getAllCombinations } from "../../../utils/GreyUtils";
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
  powerfulGlove: Item = Item.get("Powerful Glove");
  backupCamera: Item = Item.get("Backup Camera");
  paths: PossiblePath[] = [];
  hasAutumn: boolean = getProperty("hasAutumnaton") == "true";
  fallbotTag: string = "Fallbot";
  forcedFightTag: string = "ForcedFight";

  constructor() {
    super();
  }

  level(): number {
    return this.hasAutumn ? 13 : 15;
  }

  getFriendsRemaining(): number {
    if (toMonster(getProperty("_saberForceMonster")) != this.monster) {
      return 0;
    }

    return toInt(getProperty("_saberForceMonsterCount"));
  }

  createPaths(assumeUnstarted: boolean): void {
    this.paths = [];

    if (this.hasAutumn) {
      for (let i = 0; i <= 1; i++) {
        const path = new PossiblePath(
          assumeUnstarted ? 1 : this.loc.turnsSpent > 0 ? 0 : 1
        ).addTag(this.fallbotTag);

        if (i == 0) {
          if (this.loc.turnsSpent > 0) {
            continue;
          }

          path.add(ResourceCategory.FORCE_FIGHT);
          path.addMeat(-1000);
        }

        this.paths.push(path);
      }
      return;
    }

    const barrelsNeeded =
      5 - (assumeUnstarted ? 0 : availableAmount(this.item));
    const turnsManual = 8;
    const possibleCombo: (ResourceCategory | "Manual" | "Friend")[] = [];

    for (let i = 0; i < barrelsNeeded; i++) {
      if (i < this.getFriendsRemaining()) {
        possibleCombo.push("Friend");
      } else {
        possibleCombo.push("Manual");
      }

      possibleCombo.push(ResourceCategory.COPIER);

      if (i <= 1) {
        possibleCombo.push(ResourceCategory.OLFACT_COPIER);
      }
    }

    // If we're doing voted, or mag class. Then we can do a replace
    if (
      (this.hasPortScan() ||
        DelayBurners.getCombatReplacers(
          DelayCriteria().showAll().withForcedFights(true)
        ).length > 0) &&
      (!this.isBackupReady() || this.getFriendsRemaining() == 0)
    ) {
      possibleCombo.push(ResourceCategory.GLOVE_REPLACE);
    }

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
        if (type == "Friend") {
          turnsTaken += 1;
          barrelsGained += 1;
        } else if (type == "Manual") {
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

        if (type == ResourceCategory.GLOVE_REPLACE && this.hasPortScan()) {
          path.add(ResourceCategory.FORCE_FIGHT);
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

  status(path?: PossiblePath): QuestStatus {
    const status = this.getStatus(path);

    if (
      getProperty("sidequestLighthouseCompleted") != "none" &&
      status != null
    ) {
      return status;
    }

    if (
      path != null &&
      path.canUse(ResourceCategory.FORCE_FIGHT) &&
      path.getResource(ResourceCategory.FORCE_FIGHT).primed()
    ) {
      return QuestStatus.READY;
    }

    if (status == null) {
      if (!path.canUse(ResourceCategory.FORCE_FIGHT)) {
        return QuestStatus.READY;
      }

      return QuestStatus.NOT_READY;
    }

    return status;
  }

  getStatus(path: PossiblePath): QuestStatus | null {
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

    if (path.hasTag(this.fallbotTag)) {
      if (this.loc.turnsSpent >= 1) {
        return QuestStatus.NOT_READY;
      }

      if (path.canUse(ResourceCategory.FORCE_FIGHT)) {
        return path.getResource(ResourceCategory.FORCE_FIGHT).primed()
          ? QuestStatus.READY
          : null;
      }

      const canForceFight = DelayBurners.getCombatReplacers(
        DelayCriteria().withForcedFights(true).withFreeFights(null).showAll()
      );

      if (canForceFight.length > 0) {
        if (
          canForceFight.find(
            (delayer) => !delayer.isFree() && delayer.readyIn() == 0
          ) == null
        ) {
          return QuestStatus.NOT_READY;
        }
      }

      return QuestStatus.READY;
    }

    if (this.getFriendsRemaining() > 0) {
      return QuestStatus.READY;
    }

    if (path.canUse(ResourceCategory.COPIER) && this.shouldDelayForBats()) {
      return QuestStatus.NOT_READY;
    }

    if (
      availableAmount(this.backupCamera) > 0 &&
      this.isBackupReady() &&
      path.canUse(ResourceCategory.COPIER)
    ) {
      return QuestStatus.READY;
    }

    if (
      path.canUse(ResourceCategory.GLOVE_REPLACE) &&
      path.canUse(ResourceCategory.FORCE_FIGHT)
    ) {
      if (
        familiarWeight(Familiar.get("Grey Goose")) > 2 &&
        familiarWeight(Familiar.get("Grey Goose")) < 6
      ) {
        return QuestStatus.NOT_READY;
      }

      return null;
    }

    if (path.canUse(ResourceCategory.GLOVE_REPLACE)) {
      const replacer = this.getMonsterReplacer();

      if (replacer == null || (replacer.isFree() && turnsPlayed() < 400)) {
        return QuestStatus.NOT_READY;
      }
    } else if (!hasCombatSkillReady()) {
      return QuestStatus.FASTER_LATER;
    }

    if (
      familiarWeight(Familiar.get("Grey Goose")) > 2 &&
      familiarWeight(Familiar.get("Grey Goose")) < 6
    ) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  getId(): QuestType {
    return "Council / War / Lobsters";
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  turnInQuest(): QuestAdventure {
    const outfit = new GreyOutfit();
    outfit.addWeight(Item.get("Beer Helmet"));
    outfit.addWeight(Item.get("distressed denim pants"));
    outfit.addWeight(Item.get("bejeweled pledge pin"));

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

  hasPortScan() {
    return getProperty("sourceTerminalEducateKnown").includes("portscan");
  }

  getMonsterReplacer(): DelayBurner {
    const delayer = DelayBurners.getCombatReplacers(
      DelayCriteria().withForcedFights(true).withFreeFights(false)
    ).filter((d) => d.readyIn() == 0);

    if (delayer.length == 0) {
      return null;
    }

    return delayer[0];
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
    outfit.addWeight("ML", -1);

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
    outfit.addWeight("ML", -1);

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

        const uses = getProperty("_saberForceUses");

        try {
          greyAdv(
            this.loc,
            outfit,
            new AdventureSettings().setStartOfFightMacro(macro)
          );

          if (uses != getProperty("_saberForceUses")) {
            if (this.getFriendsRemaining() <= 0) {
              throw "Used the force, but no friends? Something went wrong!";
            }
          }
        } finally {
          props.resetAll();
        }
      },
    };
  }

  attemptPrime(path: PossiblePath): boolean {
    if (!path.canUse(ResourceCategory.FORCE_FIGHT)) {
      return false;
    }

    const status = this.getStatus(path);

    if (status != null) {
      return false;
    }

    setPrimedResource(
      this,
      path,
      path.getResource(ResourceCategory.FORCE_FIGHT)
    );

    return true;
  }

  run(path: PossiblePath): QuestAdventure {
    // Try to turn in quest
    if (itemAmount(this.item) >= 5) {
      return this.turnInQuest();
    }

    // Going here just to unlock fallbot~!
    if (path.hasTag(this.fallbotTag)) {
      const outfit = new GreyOutfit();

      if (path.getResource(ResourceCategory.FORCE_FIGHT) == null) {
        const replacer = this.getMonsterReplacer();

        if (replacer != null) {
          for (const item of replacer.getFightSetup()) {
            outfit.addWeight(item);
          }
        }
      }

      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          greyAdv(this.loc);
        },
      };
    }

    if (this.getFriendsRemaining() > 0) {
      return this.runFriends(path);
    }

    if (this.isBackupReady() && path.canUse(ResourceCategory.COPIER)) {
      return this.runBackup(path);
    }

    const outfit = new GreyOutfit();

    const gloveReplace = path.getResource(ResourceCategory.GLOVE_REPLACE);

    const fightForcerResource = path.getResource(ResourceCategory.FORCE_FIGHT);

    if (fightForcerResource != null) {
      if (!fightForcerResource.primed()) {
        // Need to handle primed better, like resumes..
        //   throw "Unable to run lobster fights, we're supposed to prime it but it isn't primed!";
      }

      if (gloveReplace == null) {
        throw "Unable to run lobster fights, we're forcing a fight but don't have a replacer!";
      }
    }

    const replaceFight =
      fightForcerResource != null ||
      (this.getMonsterReplacer() != null && gloveReplace != null);

    if (gloveReplace != null) {
      gloveReplace.prepare(outfit);

      if (fightForcerResource == null) {
        for (const item of this.getMonsterReplacer().getFightSetup()) {
          outfit.addWeight(item);
        }
      }
    } else {
      outfit.setPlusCombat();
    }

    outfit.addWeight("ML", -1);

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
        const uses = getProperty("_saberForceUses");

        if (copier != null) {
          copier.prepare(null, props);

          if (macro == null) {
            macro = new Macro();
          }

          macro.if_(this.monster, copier.macro());
        }

        try {
          if (replaceFight) {
            visitUrl("adventure.php?snarfblat=" + toInt(this.loc));

            Macro.ifNot_(
              this.monster,
              Macro.ifNot_(this.bossBat, gloveReplace.macro())
            ).submit();
          }

          greyAdv(
            this.loc,
            outfit,
            new AdventureSettings().setStartOfFightMacro(macro)
          );

          if (uses != getProperty("_saberForceUses")) {
            if (this.getFriendsRemaining() <= 0) {
              throw "Used the force, but no friends? Something went wrong!";
            }
          }
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

    if (this.getFriendsRemaining() > 0) {
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
