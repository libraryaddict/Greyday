import {
  currentRound,
  Effect,
  handlingChoice,
  haveEffect,
  haveSkill,
  Item,
  itemAmount,
  Location,
  Monster,
  myLevel,
  myMeat,
  retrieveItem,
  Skill,
} from "kolmafia";
import { ResourceCategory, ResourceId } from "../../typings/ResourceTypes";
import { PossiblePath } from "../../typings/TaskInfo";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { Macro } from "../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestLocketSystemSweep implements QuestInfo {
  monster: Monster = Monster.get("pygmy janitor");
  skill: Skill = Skill.get("System Sweep");
  rocket: Item = Item.get("Yellow Rocket");
  effect: Effect = Effect.get("Everything Looks Yellow");
  fax: PossiblePath = new PossiblePath(1)
    .addFax(this.monster)
    .add(ResourceCategory.YELLOW_RAY)
    .addIgnored("Cosplay Saber");
  noPath: PossiblePath = new PossiblePath(10);
  completed: boolean = false;

  level(): number {
    return 1;
  }

  getPossiblePaths(): PossiblePath | PossiblePath[] {
    return null; // return [this.fax, this.noPath];
  }

  status(path: PossiblePath): QuestStatus {
    if (this.completed || haveSkill(this.skill)) {
      return QuestStatus.COMPLETED;
    }

    if (path == this.noPath) {
      this.completed = true;

      return QuestStatus.COMPLETED;
    }

    if (path == null || haveEffect(this.effect) > 0) {
      return QuestStatus.NOT_READY;
    }

    if (myMeat() < 350 || myLevel() < 5) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.COMPLETED;

    // return QuestStatus.READY;
  }

  run(path: PossiblePath): QuestAdventure {
    const outfit = new GreyOutfit();
    outfit.addBonus("+init");
    outfit.addBonus("-ml");

    return {
      location: null,
      outfit: outfit,
      run: () => {
        retrieveItem(this.rocket);

        if (itemAmount(this.rocket) == 0) {
          throw "Supposed to have a yellow rocket on hand!";
        }

        path.getResource(ResourceCategory.FAXER).fax(this.monster);

        Macro.item(this.rocket).submit();

        if (handlingChoice() || currentRound() != 0) {
          throw "We're supposed to be done with this locket fight!";
        }

        if (!haveSkill(this.skill)) {
          throw "Expected to have system sweep!";
        }
      },
    };
  }

  getId(): QuestType {
    return "CombatLocket / SystemSweep";
  }

  getLocations(): Location[] {
    return [];
  }
}
