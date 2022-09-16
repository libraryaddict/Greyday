import {
  availableAmount,
  Familiar,
  familiarWeight,
  Item,
  Location,
  myAdventures,
  print,
  Skill,
} from "kolmafia";
import { ResourceCategory } from "../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../typings/TaskInfo";
import { greyKillingBlow } from "../../../utils/GreyCombat";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { Macro } from "../../../utils/MacroBuilder";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL9SmutOrcsCargoShorts extends TaskInfo implements QuestInfo {
  shorts: Item = Item.get("Cargo Cultist Shorts");
  pathShorts: PossiblePath = new PossiblePath(-5).add(
    ResourceCategory.CARGO_SHORTS
  );
  pathNoShorts: PossiblePath = new PossiblePath(0);
  paths: PossiblePath[];

  createPaths(assumeUnstarted: boolean) {
    if (availableAmount(this.shorts) == 0) {
      this.paths = [this.pathNoShorts];
      return;
    }

    this.paths = [this.pathNoShorts, this.pathShorts];
  }

  getPossiblePaths(): PossiblePath[] {
    return [this.pathShorts, this.pathNoShorts];
  }

  getId(): QuestType {
    return "Council / Peaks / CargoShortsSmut";
  }

  level(): number {
    return 8;
  }

  status(path: PossiblePath): QuestStatus {
    if (path != null && !path.canUse(ResourceCategory.CARGO_SHORTS)) {
      return QuestStatus.COMPLETED;
    }

    const status = getQuestStatus("questL09Topping");

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    if (status < 0 || myAdventures() < 40) {
      return QuestStatus.NOT_READY;
    }

    if (familiarWeight(Familiar.get("Grey Goose")) < 6) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(path: PossiblePath): QuestAdventure {
    return {
      location: null,
      familiar: Familiar.get("Grey Goose"),
      disableFamOverride: true,
      mayFreeRun: false,
      run: () => {
        path.getResource(ResourceCategory.CARGO_SHORTS).pocket(666);

        const macro = Macro.skill(
          Skill.get("Emit Matter Duplicating Drones")
        ).step(greyKillingBlow(new GreyOutfit()));
        print("Macro: " + macro.toString());

        macro.submit();
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  mustBeDone(reallyMustBeDone: boolean): boolean {
    if (!reallyMustBeDone && familiarWeight(Familiar.get("Grey Goose")) >= 6) {
      return true;
    }

    return false;
  }

  free(): boolean {
    return true;
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}
