import { availableAmount, getProperty, Item, Location, toInt } from "kolmafia";
import { ResourceCategory } from "../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../typings/TaskInfo";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { GreyPulls } from "../../../utils/GreyResources";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL7CryptPull extends TaskInfo implements QuestInfo {
  cape: Item = Item.get("Unwrapped knock-off retro superhero cape");
  gravyboat: Item = Item.get("Gravy Boat");
  completed: boolean = false;
  backupCamera: Item = Item.get("Backup Camera");
  hasRun: boolean = false;
  paths: PossiblePath[] = [];

  getId(): QuestType {
    return "Council / Crypt / Gravy Boat Pull";
  }

  run(path: PossiblePath): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        this.hasRun = true;

        if (!path.canUse(ResourceCategory.PULL)) {
          return;
        }

        GreyPulls.pullCrypts();
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  createPaths(assumeUnstarted: boolean): void {
    const [without, withBoat] = this.getEstimatedFights(
      assumeUnstarted || getProperty("questL07Cyrptic") == "unstarted"
    );

    this.paths = [
      new PossiblePath(without[0], without[1]),
      new PossiblePath(withBoat[0], withBoat[1]).addPull(this.gravyboat),
    ];
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  /**
   * Returns estimated fights, without boat. And with boat.
   */
  getEstimatedFights(
    assumeFresh?: boolean
  ): [[number, number], [number, number]] {
    // TODO Estimate using retrocape, fire extingusher, init, ML, rough item drop

    const swarmKills = Math.max(
      Math.floor(Math.sqrt((availableAmount(this.backupCamera) ? 50 : 0) + 30)),
      3
    );
    const modernEncounterRate =
      0.15 + ((availableAmount(this.backupCamera) > 0 ? 100 : 0) + 150) / 1000;
    const eyeDropRate = 0.45; // Lets assume you have +300 drop rate and do party skeleton for -50 item
    const rattlingNC = 0.6; // Lets assume you have -25%, and base is 85%. So its 60%;

    let dirty = toInt(getProperty("cyrptNicheEvilness"));
    let eyes = toInt(getProperty("cyrptNookEvilness"));
    let rattling = toInt(getProperty("cyrptCrannyEvilness"));
    let sprinters = toInt(getProperty("cyrptAlcoveEvilness"));

    if (assumeFresh) {
      dirty = eyes = rattling = sprinters = 25;
    } else {
      dirty = Math.max(0, dirty - 25);
      eyes = Math.max(0, eyes - 25);
      rattling = Math.max(0, rattling - 25);
      sprinters = Math.max(0, sprinters - 25);
    }

    const evilPerNormFight = 1 + (availableAmount(this.cape) > 0 ? 1 : 0);
    const evilPerBoatFight = evilPerNormFight + 1;

    let boatlessMinKills = 0;
    let boatlessMaxKills = 0;
    let boatMinKills = 0;
    let boatMaxKills = 0;

    // Eyes
    boatlessMaxKills += Math.ceil(eyes / evilPerNormFight);
    boatlessMinKills += Math.ceil(eyes / (evilPerNormFight + eyeDropRate * 3));

    boatMaxKills += Math.ceil(eyes / evilPerBoatFight);
    boatMinKills += Math.ceil(eyes / (evilPerBoatFight + eyeDropRate * 3));

    // Dirty
    boatlessMaxKills += Math.ceil(dirty / evilPerNormFight);
    // Adjust for encounter rate
    boatlessMinKills += Math.ceil(dirty / (evilPerNormFight + 3 * 0.3));

    boatMaxKills += Math.ceil(dirty / evilPerBoatFight);
    boatMinKills += Math.ceil(dirty / (evilPerBoatFight + 3 * 0.3));

    // Sprinters
    boatlessMaxKills += Math.ceil(sprinters / evilPerNormFight);
    // Adjust for encounter rate
    boatlessMinKills += Math.ceil(
      sprinters / (evilPerNormFight + 5 * modernEncounterRate)
    );

    boatMaxKills += Math.ceil(sprinters / evilPerBoatFight);
    // Adjust for encounter rate
    boatMinKills += Math.ceil(
      sprinters / (evilPerBoatFight + 5 * modernEncounterRate)
    );

    // Rattling
    boatlessMaxKills += Math.ceil(rattling / evilPerNormFight);
    boatlessMinKills += Math.ceil(
      rattling / (evilPerNormFight + rattlingNC * swarmKills)
    );

    boatMaxKills += Math.ceil(rattling / evilPerBoatFight);
    boatMinKills += Math.ceil(
      rattling / (evilPerBoatFight + rattlingNC * swarmKills)
    );

    return [
      [boatlessMinKills, boatlessMaxKills],
      [boatMinKills, boatMaxKills],
    ];
  }

  level(): number {
    return 4;
  }

  status(path: PossiblePath): QuestStatus {
    if (this.hasRun || availableAmount(this.gravyboat) > 0) {
      return QuestStatus.COMPLETED;
    }

    if (path != null && !path.canUse(ResourceCategory.PULL)) {
      this.hasRun = true;
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  mustBeDone(): boolean {
    return true;
  }

  free(): boolean {
    return true;
  }
}
