import {
  availableAmount,
  equippedAmount,
  getProperty,
  haveOutfit,
  Item,
  Location,
  myAscensions,
  myBasestat,
  outfit,
  Stat,
  toInt,
  visitUrl,
} from "kolmafia";
import { hasNonCombatSkillsReady } from "../../../GreyAdventurer";
import { DelayBurners } from "../../../iotms/delayburners/DelayBurners";
import { ResourceCategory } from "../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../typings/TaskInfo";
import { greyAdv, setPrimedResource } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { PropertyManager } from "../../../utils/Properties";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL12StartWar extends TaskInfo implements QuestInfo {
  loc: Location = Location.get("Hippy Camp");
  umbrella: Item = Item.get("Unbreakable Umbrella");
  paths: PossiblePath[];

  createPaths(assumeUnstarted: boolean) {
    this.paths = [
      new PossiblePath(8),
      //   new PossiblePath(1).add(ResourceCategory.FORCE_NC),
    ];
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  attemptPrime(path: PossiblePath): boolean {
    if (!path.canUse(ResourceCategory.FORCE_NC) || !this.canStartWar()) {
      return false;
    }

    setPrimedResource(this, path, path.getResource(ResourceCategory.FORCE_NC));

    return true;
  }

  level(): number {
    return 12;
  }

  canStartWar(): boolean {
    if (!this.hasBoat() || !this.hasOutfit()) {
      return false;
    }

    if (Stat.all().find((s) => myBasestat(s) < 70) != null) {
      return false;
    }

    return true;
  }

  status(path: PossiblePath): QuestStatus {
    if (getProperty("warProgress") != "unstarted") {
      return QuestStatus.COMPLETED;
    }

    if (path == null || !this.canStartWar()) {
      return QuestStatus.NOT_READY;
    }

    if (path.canUse(ResourceCategory.FORCE_NC)) {
      return QuestStatus.NOT_READY;
    }

    if (!hasNonCombatSkillsReady(true)) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  hasBoat(): boolean {
    return toInt(getProperty("lastIslandUnlock")) == myAscensions();
  }

  hasOutfit(): boolean {
    return haveOutfit("Frat Warrior Fatigues");
  }

  run(path: PossiblePath): QuestAdventure {
    const outfit = new GreyOutfit();
    outfit.addItem(Item.get("Beer Helmet"));
    outfit.addItem(Item.get("distressed denim pants"));
    outfit.addItem(Item.get("bejeweled pledge pin"));

    const nc = path.getResource(ResourceCategory.FORCE_NC);

    if (nc == null) {
      outfit.setNoCombat();

      if (
        availableAmount(this.umbrella) > 0 &&
        !DelayBurners.isDelayBurnerReady()
      ) {
        outfit.addItem(this.umbrella);
      }
    }

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        // If we can cast both NC skills
        if (
          nc == null &&
          DelayBurners.isDelayBurnerReady() &&
          equippedAmount(this.umbrella) == 0
        ) {
          DelayBurners.tryReplaceCombats();
        }

        const props = new PropertyManager();
        props.setChoice(139, 3);
        props.setChoice(140, 3);
        props.setChoice(141, 3);
        props.setChoice(142, 3);

        try {
          greyAdv(this.loc, outfit);
        } finally {
          props.resetAll();
        }

        if (getProperty("warProgress") != "unstarted") {
          this.visitArena();
        }
      },
    };
  }

  getId(): QuestType {
    return "Council / War / Start";
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  visitArena() {
    outfit("Frat Warrior Fatigues");
    visitUrl("bigisland.php?place=concert&pwd");
  }
}
