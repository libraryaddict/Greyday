import {
  availableAmount,
  currentRound,
  handlingChoice,
  haveOutfit,
  isWearingOutfit,
  Location,
  Monster,
  outfitPieces,
} from "kolmafia";
import { ResourceCategory } from "../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../typings/TaskInfo";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { GreyPulls } from "../../../utils/GreyResources";
import { Macro } from "../../../utils/MacroBuilder";
import { PropertyManager } from "../../../utils/Properties";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL12FratOutfit extends TaskInfo implements QuestInfo {
  fratBoySpy: Monster = Monster.get("Orcish Frat Boy Spy");
  hippyDisguise: string = "Filthy Hippy Disguise";
  fratDisguise: string = "Frat Warrior Fatigues";
  taskFaxYR: PossiblePath = new PossiblePath(1)
    .addFax(this.fratBoySpy)
    .add(ResourceCategory.YELLOW_RAY);
  pullTask: PossiblePath = new PossiblePath(0);
  hippiesTask: PossiblePath = new PossiblePath(6, 14)
    .add(ResourceCategory.YELLOW_RAY)
    .add(ResourceCategory.YELLOW_RAY);
  hippiesFratTask: PossiblePath = new PossiblePath(12, 22).add(
    ResourceCategory.YELLOW_RAY
  );
  hippiesTaskManual: PossiblePath = new PossiblePath(20);
  hippyCamp: Location = Location.get("Hippy Camp");
  fratCamp: Location = Location.get("Wartime Frat House (Hippy Disguise)");

  constructor() {
    super();
  }

  createPaths(assumeUnstarted: boolean): void {
    this.pullTask = new PossiblePath(0);

    for (const item of outfitPieces(this.fratDisguise)) {
      if (availableAmount(item) > 0 && !assumeUnstarted) {
        continue;
      }

      this.pullTask.addPull(item);
    }
  }

  getPossiblePaths(): PossiblePath[] {
    return [
      this.taskFaxYR,
      this.pullTask,
      this.hippiesTask,
      this.hippiesTaskManual,
      this.hippiesFratTask,
    ];
  }

  getId(): QuestType {
    return "Council / War / Frat Outfit";
  }

  level(): number {
    return 12;
  }

  status(path: PossiblePath): QuestStatus {
    if (haveOutfit(this.fratDisguise)) {
      return QuestStatus.COMPLETED;
    }

    if (path == null || path.canUse(ResourceCategory.PULL)) {
      return QuestStatus.READY;
    }

    if (
      path.canUse(ResourceCategory.YELLOW_RAY) &&
      !path.getResource(ResourceCategory.YELLOW_RAY).ready()
    ) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(path: PossiblePath): QuestAdventure {
    if (path.canUse(ResourceCategory.PULL)) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          GreyPulls.pullFratWarOutfit();
          path.addUsed(ResourceCategory.PULL, 3);
        },
      };
    }

    const outfit = new GreyOutfit();

    const grabbingFratOutfit = haveOutfit(this.hippyDisguise);

    if (path.canUse(ResourceCategory.FAXER)) {
      path.getResource(ResourceCategory.FAXER).prepare(outfit);
    } else if (
      !path.canUse(ResourceCategory.CARGO_SHORTS) &&
      grabbingFratOutfit
    ) {
      outfit.addBonus("+outfit " + this.hippyDisguise);
      outfit.setPlusCombat(); // Adventuring for it
    }

    const yellowRay = path.getResource(ResourceCategory.YELLOW_RAY);

    if (yellowRay != null) {
      yellowRay.prepare(outfit);
    } else {
      outfit.setItemDrops();
    }

    return {
      location: null,
      outfit: outfit,
      run: () => {
        if (
          path.canUse(ResourceCategory.FAXER) ||
          path.canUse(ResourceCategory.CARGO_SHORTS)
        ) {
          this.runFaxFight(path);
          return;
        }

        if (grabbingFratOutfit && !isWearingOutfit(this.hippyDisguise)) {
          throw "Expected to be dressed like a grubby hippy";
        }

        if (!grabbingFratOutfit) {
          greyAdv(this.hippyCamp, outfit);
          return;
        }

        const props = new PropertyManager();
        props.setChoice(143, 3); // Fight
        props.setChoice(144, 3); // Fight
        props.setChoice(145, 2); // Items
        props.setChoice(146, 2); // Items

        try {
          const settings = new AdventureSettings();

          if (yellowRay != null) {
            yellowRay.prepare(null, props);
            settings.setStartOfFightMacro(
              Macro.if_("monstername Hippy", yellowRay.macro())
            );
            settings.setStartOfFightMacro(
              Macro.if_("monstername War Pledge", yellowRay.macro())
            );
            settings.setStartOfFightMacro(
              Macro.if_(
                "monstername Frat Warrior drill sergeant",
                yellowRay.macro()
              )
            );
          }

          greyAdv(this.fratCamp, outfit, settings);
        } catch {
          props.resetAll();
        }

        path.addUsed(ResourceCategory.FAXER);
        path.addUsed(ResourceCategory.YELLOW_RAY);
      },
    };
  }

  runFaxFight(path: PossiblePath) {
    const props = new PropertyManager();

    try {
      const yr = path.getResource(ResourceCategory.YELLOW_RAY);
      yr.prepare(null, props);

      const attackResource = path.getResource(ResourceCategory.FAXER);

      if (attackResource != null) {
        attackResource.fax(this.fratBoySpy);
      } else {
        path.getResource(ResourceCategory.CARGO_SHORTS).pocket(568);
      }

      if (currentRound() == 0) {
        throw "Expected to be in combat!";
      }

      path.getResource(ResourceCategory.YELLOW_RAY).macro().submit();

      if (currentRound() != 0 || handlingChoice()) {
        throw "Expected to have finished combat!";
      }

      if (!haveOutfit("Frat Warrior Fatigues")) {
        throw "Expected to have outfit!";
      }
    } finally {
      props.resetAll();
    }
  }

  getLocations(): Location[] {
    return [];
  }
}
