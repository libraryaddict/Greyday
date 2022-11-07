import {
  availableAmount,
  Familiar,
  getProperty,
  Item,
  Location,
  Monster,
  myAdventures,
  myFamiliar,
  print,
  runChoice,
  setProperty,
  toInt,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../../Quests";
import { QuestType } from "../../../../QuestTypes";
import { ResourceCategory } from "../../../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../../../typings/TaskInfo";
import { AdventureSettings, greyAdv } from "../../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../../utils/GreyOutfitter";
import { Macro } from "../../../../../utils/MacroBuilder";
import { PropertyManager } from "../../../../../utils/Properties";

export class QuestFantasyBandit extends TaskInfo implements QuestInfo {
  fought: string = "_foughtFantasyRealm";
  monster: Monster = Monster.get("Fantasy Bandit");
  camera: Item = Item.get("Backup Camera");
  location: Location = Location.get("The Bandit Crossroads");
  equip: Item = Item.get("FantasyRealm G. E. M.");
  token: Item = Item.get("fat loot token");
  path: PossiblePath;

  createPaths(assumeUnstarted: boolean) {
    // We copy 4 times, fax 1 time
    // How many copies we want to perform
    let fightsRemaining = 5 - (assumeUnstarted ? 0 : this.getFoughtToday());

    this.path = new PossiblePath(fightsRemaining);

    // If we have realm access, no need for further resources.
    if (this.hasRealmAccess()) {
      return;
    }

    // If the last monster was is a bandit, no need to fax
    // But we still need to fight X more bandits.
    if (this.lastBackup() != this.monster || assumeUnstarted) {
      this.path.addFax(this.monster);
    } else {
      // We need to fax, so one of those copies is a fax and can be removed
      fightsRemaining--;
    }

    this.path.add(ResourceCategory.COPIER, fightsRemaining - 1);

    // If we're assuming we've unstarted, no need to add this stuff
    if (assumeUnstarted) {
      return;
    }

    // Assuming we're at fought = 1, so 4 bandits remaining.
    // If last monster is sheep, then we'd need to do a fax and 3 copies = 4
    // If last monster is bandit, then we'd need to do 4 copies
    for (let i = fightsRemaining; i < 4; i++) {
      //  this.path.addUsed(ResourceCategory.COPIER);
    }
  }

  grabFantasyGem(): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        visitUrl("place.php?whichplace=realm_fantasy&action=fr_initcenter");
        runChoice(3);

        if (availableAmount(this.equip) == 0) {
          throw "I unexpectedly didn't acquire the fantasyrealm gem!";
        }
      },
    };
  }

  runFantasyRealm(): QuestAdventure {
    if (availableAmount(this.equip) == 0) {
      return this.grabFantasyGem();
    }

    const outfit = new GreyOutfit();
    // Try avoid exp stuff being added cos we're not running a fam
    outfit.addWeight("familiar exp", -100);
    outfit.addWeight(this.equip);

    return {
      location: this.location,
      familiar: Familiar.get("None"),
      disableFamOverride: true,
      outfit: outfit,
      run: () => {
        const props = new PropertyManager();
        props.setChoice(1281, 0); // Don't handle

        if (myFamiliar() != Familiar.get("None")) {
          useFamiliar(Familiar.get("None"));
        }

        const tokens = availableAmount(this.token);

        try {
          greyAdv(this.location, outfit);
          this.addFought();
        } catch (e) {
          print(
            "We errored, did we hit crossroads choice? We deliberately should not hit that if we still haven't finished fantasy bandits. You may need to set '_foughtFantasyRealm' to 5",
            "red"
          );
          throw e;
        } finally {
          props.resetAll();
        }

        if (this.hasFoughtEnough() && availableAmount(this.token) == tokens) {
          throw "Expected to have a fat loot token from fantasyland, didn't!";
        }
      },
    };
  }

  hasRealmAccess(): boolean {
    return (
      getProperty("frAlways") == "true" || getProperty("_frToday") == "true"
    );
  }

  getPossiblePaths(): PossiblePath[] {
    return [this.path];
  }

  getFoughtToday(): number {
    const setting = getProperty(this.fought);

    if (setting == "") {
      return 0;
    }

    return toInt(setting);
  }

  addFought() {
    setProperty(this.fought, (this.getFoughtToday() + 1).toString());
  }

  getId(): QuestType {
    return "Council / Tower / Keys / Heroes / FantasyBandit";
  }

  level(): number {
    return 11;
  }

  hasFoughtEnough(): boolean {
    return this.getFoughtToday() >= 5;
  }

  status(): QuestStatus {
    if (this.hasFoughtEnough()) {
      return QuestStatus.COMPLETED;
    }

    /*if (!GreySettings.greyFantasyBandits)
     {
      if (
        GreySettings.shouldAvoidTowerRequirements() ||
        GreySettings.isHardcoreMode()
      ) {
        return QuestStatus.NOT_READY;
      }
    }*/

    if (getQuestStatus("questL08Trapper") <= 1) {
      return QuestStatus.NOT_READY;
    }

    if (!this.hasRealmAccess() && this.lastBackup() == this.monster) {
      return QuestStatus.READY;
    }

    if (myAdventures() < 30) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  lastBackup(): Monster {
    return getProperty("lastCopyableMonster") == ""
      ? null
      : Monster.get(getProperty("lastCopyableMonster"));
  }

  run(path: PossiblePath): QuestAdventure {
    if (this.hasRealmAccess()) {
      return this.runFantasyRealm();
    }

    return this.doFaxingBandits(path);
  }

  doFaxingBandits(path: PossiblePath): QuestAdventure {
    if (
      !path.canUse(ResourceCategory.FAXER) &&
      this.lastBackup() != this.monster
    ) {
      throw "Unable to do fantasy bandits";
    }

    if (
      path.canUse(ResourceCategory.FAXER) &&
      this.lastBackup() != this.monster
    ) {
      const resource = path.getResource(ResourceCategory.FAXER);

      return {
        location: null,
        run: () => {
          resource.fax(this.monster);

          greyAdv("main.php");

          this.addFought();
          path.addUsed(ResourceCategory.FAXER);
        },
      };
    }

    const outfit = new GreyOutfit();
    const loc = Location.get("The Dire Warren");
    const resource = path.getResource(ResourceCategory.COPIER);
    resource.prepare(outfit);

    // TODO Backup and ruin other zones delay
    return {
      outfit: outfit,
      location: null,
      mayFreeRun: false,
      run: () => {
        greyAdv(
          loc,
          outfit,
          new AdventureSettings().setStartOfFightMacro(
            new Macro().if_(Monster.get("Fluffy Bunny"), resource.macro())
          )
        );
        this.addFought();
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  mustBeDone(): boolean {
    return (
      this.getFoughtToday() > 0 &&
      !this.hasFoughtEnough() &&
      !this.hasRealmAccess()
    );
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}
