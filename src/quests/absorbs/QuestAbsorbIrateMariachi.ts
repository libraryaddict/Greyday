import {
  Monster,
  Location,
  Familiar,
  canFaxbot,
  familiarWeight,
  currentRound,
  handlingChoice,
} from "kolmafia";
import { ResourceCategory } from "../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../typings/TaskInfo";
import { AbsorbsProvider } from "../../utils/GreyAbsorber";
import { greyAdv } from "../../utils/GreyLocations";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestAbsorbIrateMariachi extends TaskInfo implements QuestInfo {
  irateMariachi: Monster = Monster.get("Irate Mariachi");
  familiar: Familiar = Familiar.get("Grey Goose");
  fax: PossiblePath = new PossiblePath(1).add(ResourceCategory.FAXER);
  avoid: PossiblePath = new PossiblePath(10);

  createPaths() {
    if (!canFaxbot(this.irateMariachi)) {
      this.fax.addIgnored("Fax Machine");
    }
  }

  getPossiblePaths(): PossiblePath[] {
    return [this.fax, this.avoid];
  }

  getId(): QuestType {
    return "Absorbs / Irate Mariachi";
  }

  level(): number {
    return 10;
  }

  getLocations(): Location[] {
    return [];
  }

  status(path: PossiblePath): QuestStatus {
    if (AbsorbsProvider.getReabsorbedMonsters().includes(this.irateMariachi)) {
      return QuestStatus.COMPLETED;
    }

    if (path == null) {
      return QuestStatus.NOT_READY;
    }

    if (!path.canUse(ResourceCategory.FAXER)) {
      return QuestStatus.COMPLETED;
    }

    if (familiarWeight(this.familiar) < 6) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.FASTER_LATER;
  }

  run(path: PossiblePath): QuestAdventure {
    const resource = path.getResource(ResourceCategory.FAXER);

    return {
      location: null,
      outfit: null,
      familiar: this.familiar,
      disableFamOverride: true,
      run: () => {
        resource.fax(this.irateMariachi);

        greyAdv(null);

        if (handlingChoice() || currentRound() != 0) {
          throw "We're supposed to be done with this fight!";
        }
      },
    };
  }

  getAbsorbs(): Monster[] {
    return [this.irateMariachi];
  }
}
