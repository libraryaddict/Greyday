import {
  availableAmount,
  currentRound,
  getProperty,
  handlingChoice,
  haveOutfit,
  isWearingOutfit,
  Item,
  Location,
  Monster,
  myAscensions,
  myLevel,
  outfitPieces,
  toInt,
} from "kolmafia";
import { AdventureFinder } from "../../../GreyChooser";
import { ResourceCategory } from "../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../typings/TaskInfo";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { GreyPulls } from "../../../utils/GreyResources";
import { getAllCombinations } from "../../../utils/GreyUtils";
import { Macro } from "../../../utils/MacroBuilder";
import { PropertyManager } from "../../../utils/Properties";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

enum WarTag {
  BEFORE_WAR = "Before War",
  DURING_WAR = "During War",
}
enum YROutfit {
  YR_HIPPY = "YR Hippy",
  YR_FRAT = "YR Frat",
}

export class QuestL12FratOutfit extends TaskInfo implements QuestInfo {
  fratBoySpy: Monster = Monster.get("Orcish Frat Boy Spy");
  hippyDisguise: string = "Filthy Hippy Disguise";
  fratDisguise: string = "Frat Warrior Fatigues";
  hippyCamp: Location = Location.get("Hippy Camp");
  fratCamp: Location = Location.get("Wartime Frat House (Hippy Disguise)");
  paths: PossiblePath[];
  recalculateTime: boolean;

  constructor() {
    super();
  }

  createPaths(assumeUnstarted: boolean): void {
    this.recalculateTime = false;

    const hippyNeeded: Item[] = outfitPieces(this.hippyDisguise).filter(
      (i) => assumeUnstarted || availableAmount(i) == 0
    );
    const fratNeeded: Item[] = outfitPieces(this.fratDisguise).filter(
      (i) => assumeUnstarted || availableAmount(i) == 0
    );

    this.paths = [];

    const pullTask = new PossiblePath(0);

    for (const item of fratNeeded) {
      pullTask.addPull(item);
    }

    this.paths.push(pullTask);

    if (fratNeeded.length == 0) {
      return;
    }

    this.paths.push(
      new PossiblePath(1)
        .addFax(this.fratBoySpy)
        .add(ResourceCategory.YELLOW_RAY)
    );
    this.paths.push(
      new PossiblePath(0)
        .add(ResourceCategory.CARGO_SHORTS)
        .add(ResourceCategory.YELLOW_RAY)
        .addIgnored("Cosplay Saber")
    );

    // During the war, lets say 60% chance to hit a combat

    // Tag, Resources, Turns
    const type: ["Hippy" | "Frat", WarTag, YROutfit, number][] = [];
    const needHippies = hippyNeeded.length > 0;

    if (needHippies) {
      if (assumeUnstarted || myLevel() < 12) {
        type.push(["Hippy", WarTag.BEFORE_WAR, YROutfit.YR_HIPPY, 1]);
      }

      type.push(["Hippy", WarTag.DURING_WAR, null, hippyNeeded.length * 6]);
      type.push(["Hippy", WarTag.DURING_WAR, YROutfit.YR_HIPPY, 3]);
    }

    type.push(["Frat", WarTag.DURING_WAR, YROutfit.YR_FRAT, 3]);
    type.push(["Frat", WarTag.DURING_WAR, null, fratNeeded.length * 6]);

    for (const combo of getAllCombinations(type, true)) {
      if (combo.length != (needHippies ? 2 : 1)) {
        continue;
      }

      if (needHippies && combo[0][0] == combo[1][0]) {
        continue;
      }

      const path = new PossiblePath(
        combo.map(([, , , turns]) => turns).reduce((t1, t2) => t1 + t2, 0)
      );

      for (const [, tag, resource] of combo) {
        path.addTag(tag);

        if (resource != null) {
          path.add(ResourceCategory.YELLOW_RAY);
          path.addTag(resource);
        }
      }

      this.paths.push(path);
    }
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  getId(): QuestType {
    return "Council / War / Frat Outfit";
  }

  level(): number {
    return 5;
  }

  mustBeDone(): boolean {
    return this.recalculateTime;
  }

  free(): boolean {
    return this.recalculateTime;
  }

  status(path: PossiblePath): QuestStatus {
    if (haveOutfit(this.fratDisguise)) {
      return QuestStatus.COMPLETED;
    }

    if (path == null) {
      return QuestStatus.READY;
    }

    if (path.canUse(ResourceCategory.PULL)) {
      if (myLevel() < 12) {
        return QuestStatus.NOT_READY;
      } else {
        return QuestStatus.READY;
      }
    }

    if (
      path.hasTag(WarTag.BEFORE_WAR) &&
      outfitPieces(this.hippyDisguise).find((i) => availableAmount(i) == 0) ==
        null
    ) {
      path.removeTag(WarTag.BEFORE_WAR);
    }

    if (
      path.canUse(ResourceCategory.YELLOW_RAY) &&
      !path.getResource(ResourceCategory.YELLOW_RAY).ready()
    ) {
      return QuestStatus.NOT_READY;
    }

    if (
      path.canUse(ResourceCategory.FAXER) ||
      path.canUse(ResourceCategory.CARGO_SHORTS)
    ) {
      return QuestStatus.READY;
    }

    if (myLevel() >= 12 && getProperty("questL12War") == "unstarted") {
      return QuestStatus.NOT_READY;
    }

    if (path.hasTag(WarTag.BEFORE_WAR) && myLevel() >= 12) {
      this.recalculateTime = true;

      return QuestStatus.READY;
    }

    if (
      !path.hasTag(WarTag.BEFORE_WAR) &&
      path.hasTag(WarTag.DURING_WAR) &&
      getProperty("questL12War") == "unstarted"
    ) {
      return QuestStatus.NOT_READY;
    }

    if (toInt(getProperty("lastIslandUnlock")) != myAscensions()) {
      return QuestStatus.NOT_READY;
    }

    if (!path.hasTag(WarTag.BEFORE_WAR) && myLevel() < 12) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(path: PossiblePath): QuestAdventure {
    if (this.recalculateTime) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          AdventureFinder.recalculatePath();
        },
      };
    }

    if (path.canUse(ResourceCategory.PULL)) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          GreyPulls.pullFratWarOutfit();
        },
      };
    }

    if (
      path.canUse(ResourceCategory.FAXER) ||
      path.canUse(ResourceCategory.CARGO_SHORTS)
    ) {
      return this.runFaxFight(path);
    }

    if (path.hasTag(WarTag.BEFORE_WAR)) {
      if (haveOutfit(this.hippyDisguise) || myLevel() >= 12) {
        throw "Unable to grab hippy disguise, war has already started";
      }

      return this.runPreWar(path);
    } else if (myLevel() < 12) {
      throw "Eh? War hasn't started yet";
    }

    return this.runDuringWar(path);
  }

  runDuringWar(path: PossiblePath): QuestAdventure {
    const outfit = new GreyOutfit();
    outfit.setPlusCombat();

    const grabbingHippyOutfit = !haveOutfit(this.hippyDisguise);
    const grabbingFratOutfit = !grabbingHippyOutfit;

    if (grabbingFratOutfit) {
      outfit.addBonus("+outfit " + this.hippyDisguise);
    }

    let yellowRay = path.getResource(ResourceCategory.YELLOW_RAY);

    if (yellowRay != null) {
      if (!path.hasTag(YROutfit.YR_HIPPY) && !path.hasTag(YROutfit.YR_FRAT)) {
        yellowRay.prepare(outfit);
      } else if (path.hasTag(YROutfit.YR_HIPPY) && grabbingHippyOutfit) {
        yellowRay.prepare(outfit);
      } else if (path.hasTag(YROutfit.YR_FRAT) && grabbingFratOutfit) {
        yellowRay.prepare(outfit);
      } else {
        yellowRay = null;
      }
    }

    if (yellowRay == null) {
      outfit.setItemDrops();
    }

    const loc = grabbingFratOutfit ? this.fratCamp : this.hippyCamp;

    return {
      location: loc,
      outfit: outfit,
      run: () => {
        if (grabbingFratOutfit && !isWearingOutfit(this.hippyDisguise)) {
          throw "Expected to be dressed like a grubby hippy";
        }

        const props = new PropertyManager();

        props.setChoice(139, 3);
        props.setChoice(140, 3);
        props.setChoice(141, 3);
        props.setChoice(142, 4);

        props.setChoice(143, 3); // Fight
        props.setChoice(144, 3); // Fight
        props.setChoice(145, 2); // Items
        props.setChoice(146, 2); // Items

        try {
          const settings = new AdventureSettings();

          if (yellowRay != null) {
            yellowRay.prepare(null, props);
            let macro = new Macro();

            macro = macro.if_("monstername Hippy", yellowRay.macro());
            macro = macro.if_("monstername War Pledge", yellowRay.macro());
            macro = macro.if_(
              "monstername Frat Warrior drill sergeant",
              yellowRay.macro()
            );
            settings.setStartOfFightMacro(macro);
          }

          greyAdv(loc, outfit, settings);
        } catch {
          props.resetAll();
        }
      },
    };
  }

  runPreWar(path: PossiblePath): QuestAdventure {
    const outfit = new GreyOutfit();

    const yr = path.hasTag(YROutfit.YR_HIPPY)
      ? path.getResource(ResourceCategory.YELLOW_RAY)
      : null;

    if (yr != null) {
      yr.prepare(outfit, null);
    } else {
      outfit.setItemDrops();

      if (myLevel() >= 9) {
        outfit.setNoCombat();
      }
    }

    return {
      location: this.hippyCamp,
      outfit: outfit,
      run: () => {
        const props = new PropertyManager();

        const settings = new AdventureSettings();
        const hasPants = availableAmount(Item.get("filthy corduroys")) > 0;

        props.setChoice(136, hasPants ? 2 : 1);
        props.setChoice(137, hasPants ? 1 : 2);

        if (yr != null) {
          yr.prepare(null, props);

          settings.setStartOfFightMacro(
            Macro.if_("monstername Hippy", yr.macro())
          );
        }

        try {
          greyAdv(this.hippyCamp, outfit, settings);
        } finally {
          props.resetAll();
        }

        if (haveOutfit(this.hippyDisguise)) {
          path.removeTag(WarTag.BEFORE_WAR);
        }
      },
    };
  }

  runFaxFight(path: PossiblePath): QuestAdventure {
    const outfit = new GreyOutfit();

    const yr = path.getResource(ResourceCategory.YELLOW_RAY);
    yr.prepare(outfit);

    const faxing = path.getResource(ResourceCategory.FAXER);

    if (faxing != null) {
      faxing.prepare(outfit);
    }

    return {
      location: null,
      outfit: outfit,
      run: () => {
        const props = new PropertyManager();

        try {
          yr.prepare(null, props);

          if (faxing != null) {
            faxing.fax(this.fratBoySpy);
          } else {
            path.getResource(ResourceCategory.CARGO_SHORTS).pocket(568);
          }

          if (currentRound() == 0) {
            throw "Expected to be in combat!";
          }

          path.getResource(ResourceCategory.YELLOW_RAY).macro().submit();

          greyAdv("main.php");

          if (currentRound() != 0 || handlingChoice()) {
            throw "Expected to have finished combat!";
          }

          if (!haveOutfit(this.fratDisguise)) {
            throw "Expected to have outfit!";
          }
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
