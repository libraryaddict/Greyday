import {
  currentRound,
  Familiar,
  familiarWeight,
  handlingChoice,
  haveSkill,
  Location,
  Monster,
  myAscensions,
  Skill,
} from "kolmafia";
import { ResourceCategory } from "../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../typings/TaskInfo";
import { AbsorbsProvider } from "../../utils/GreyAbsorber";
import { Macro } from "../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestAbsorbStarMonster extends TaskInfo implements QuestInfo {
  evenMonster: Monster = Monster.get("One-Eyed Willie");
  oddMonster: Monster = Monster.get("Little Man in the Canoe");
  familiar: Familiar = Familiar.get("Grey Goose");
  nanovision: Skill = Skill.get("Double Nanovision");
  fax: PossiblePath;
  avoid: PossiblePath = new PossiblePath(20);

  createPaths() {
    this.fax = new PossiblePath(1);
    this.fax.addFax(this.getMonster());
  }

  getPossiblePaths(): PossiblePath[] {
    return [this.fax, this.avoid];
  }

  getMonster(): Monster {
    return myAscensions() % 2 != 0 ? this.evenMonster : this.oddMonster;
  }

  getId(): QuestType {
    return "Absorbs / Hole in Sky";
  }

  level(): number {
    return 18;
  }

  getLocations(): Location[] {
    return [];
  }

  status(path: PossiblePath): QuestStatus {
    if (AbsorbsProvider.getReabsorbedMonsters().includes(this.getMonster())) {
      return QuestStatus.COMPLETED;
    }

    if (path == null) {
      return QuestStatus.NOT_READY;
    }

    if (!path.canUse(ResourceCategory.FAXER)) {
      return QuestStatus.COMPLETED;
    }

    if (!haveSkill(this.nanovision)) {
      return QuestStatus.NOT_READY;
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
        resource.fax(this.getMonster());

        const macro = Macro.trySkill(Skill.get("Re-Process Matter"));

        if (haveSkill(this.nanovision)) {
          macro.trySkillRepeat(this.nanovision);
        } else {
          macro.trySkillRepeat(Skill.get("Infinite Loop"));
        }

        macro.submit();

        if (handlingChoice() || currentRound() != 0) {
          throw "We're supposed to be done with this fight!";
        }
      },
    };
  }

  getAbsorbs(): Monster[] {
    return [this.getMonster()];
  }
}
