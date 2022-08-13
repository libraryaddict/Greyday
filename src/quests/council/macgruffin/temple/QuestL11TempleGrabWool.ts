import {
  availableAmount,
  Familiar,
  getProperty,
  Item,
  Location,
  Monster,
} from "kolmafia";
import { ResourceCategory } from "../../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../../typings/TaskInfo";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
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
  polarPath: PossiblePath = new PossiblePath(1, 3).add(
    ResourceCategory.POLAR_VORTEX,
    2
  );
  manual: PossiblePath = new PossiblePath(2, 8);
  clover: PossiblePath = new PossiblePath(1).add(ResourceCategory.CLOVER);
  fax: PossiblePath = new PossiblePath(1).add(ResourceCategory.FAXER);
  deck: PossiblePath = new PossiblePath(0).add(
    ResourceCategory.DECK_OF_EVERY_CARD
  );
  paths: PossiblePath[] = [];

  createPaths(assumeUnstarted: boolean) {
    this.paths = []; //[this.clover, this.fax, this.deck];

    const amountNeeded = 2 - (assumeUnstarted ? 0 : availableAmount(this.wool));

    this.paths.push(new PossiblePath(2, 4 * amountNeeded));
    this.paths.push(
      new PossiblePath(1, 3).add(ResourceCategory.POLAR_VORTEX, amountNeeded)
    );

    //if (!canFaxbot(this.monster)) {
    // this.fax.addIgnored("Fax Machine");
    // }
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
    const resource = path.getResource(ResourceCategory.POLAR_VORTEX);

    if (resource != null) {
      resource.prepare(outfit);
    }

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        const settings = new AdventureSettings();
        settings.addNoBanish(this.woolMonster);

        if (resource != null) {
          settings.setStartOfFightMacro(
            Macro.if_(this.woolMonster, resource.macro().step(resource.macro()))
          );
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
}
