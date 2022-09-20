import {
  availableAmount,
  Familiar,
  getProperty,
  Item,
  Location,
  Monster,
  print,
} from "kolmafia";
import { ResourceCategory } from "../../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../../typings/TaskInfo";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { getAllCombinations } from "../../../../utils/GreyUtils";
import { Macro } from "../../../../utils/MacroBuilder";
import { PropertyManager } from "../../../../utils/Properties";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11TempleGrabWool extends TaskInfo implements QuestInfo {
  wool: Item = Item.get("Stone Wool");
  loc: Location = Location.get("The Hidden Temple");
  woolMonster: Monster = Monster.get("Baa-relief sheep");
  luckyWoolMonster: Monster = Monster.get("Baa'baa'bu'ran");
  deck: PossiblePath = new PossiblePath(0).add(
    ResourceCategory.DECK_OF_EVERY_CARD
  );
  paths: PossiblePath[] = [];

  createPaths(assumeUnstarted: boolean) {
    this.paths = []; //[this.clover, this.fax, this.deck];

    const amountNeeded = 2 - (assumeUnstarted ? 0 : availableAmount(this.wool));

    if (amountNeeded <= 0) {
      this.paths.push(new PossiblePath(0));
      return;
    }

    const combos: [ResourceCategory, number][] = [];
    combos.push([ResourceCategory.POLAR_VORTEX, 0]);
    combos.push([ResourceCategory.POLAR_VORTEX, 0]);
    combos.push([ResourceCategory.HUGS_AND_KISSES, 0]);
    combos.push([ResourceCategory.HUGS_AND_KISSES, 1]);
    combos.push([null, 1]);
    combos.push([null, 1]);

    for (const combination of getAllCombinations(combos, true)) {
      if (combination.length != amountNeeded) {
        continue;
      }

      const fightsNeeded =
        1 +
        combination.map(([, turns]) => turns).reduce((t1, t2) => t1 + t2, 0);

      const path = new PossiblePath(fightsNeeded, fightsNeeded * 4);

      combination.filter(([r]) => r != null).forEach(([r]) => path.add(r));

      this.paths.push(path);
    }
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  getId(): QuestType {
    return "Council / MacGruffin / Temple / GrabWool";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL11Worship");

    if (status > 1 || availableAmount(this.wool) > 0) {
      return QuestStatus.COMPLETED;
    }

    if (status < 0 || !this.templeFound()) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  templeFound(): boolean {
    return getProperty("questM16Temple") == "finished";
  }

  run(path: PossiblePath): QuestAdventure {
    const outfit = new GreyOutfit().setItemDrops().setPlusCombat();
    const polarVortex = path.getResource(ResourceCategory.POLAR_VORTEX);

    if (polarVortex != null) {
      polarVortex.prepare(outfit);
    }

    const hugs = path.getResource(ResourceCategory.HUGS_AND_KISSES);

    return {
      location: this.loc,
      outfit: outfit,
      familiar: hugs?.familiar,
      disableFamOverride: hugs?.familiar != null,
      orbs: [this.woolMonster],
      olfaction: path.canUse(ResourceCategory.POLAR_VORTEX)
        ? null
        : [this.woolMonster],
      freeRun: (monster) => this.woolMonster != monster,
      run: () => {
        const settings = new AdventureSettings();
        settings.addNoBanish(this.woolMonster);

        if (polarVortex != null || hugs != null) {
          const macro = new Macro();

          if (hugs != null) {
            macro.step(hugs.macro());
          }

          if (polarVortex != null) {
            for (
              let i = 0;
              i < path.canUse(ResourceCategory.POLAR_VORTEX);
              i++
            ) {
              macro.step(polarVortex.macro());
            }
          }

          settings.setStartOfFightMacro(Macro.if_(this.woolMonster, macro));
        }

        const props = new PropertyManager();
        props.setChoice(580, 1); // Hidden heart of temple
        props.setChoice(583, 1); // Such confusing buttons
        props.setChoice(581, 3); // Fight cave bears
        props.setChoice(579, 2); // Such great heights, grab the nostril

        try {
          greyAdv(this.loc, outfit, settings);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  shouldGrabWool(): boolean {
    return availableAmount(this.wool) == 0;
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}
