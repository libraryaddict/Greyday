import {
  availableAmount,
  currentRound,
  Effect,
  equippedAmount,
  handlingChoice,
  haveEffect,
  haveSkill,
  Item,
  itemAmount,
  Location,
  Monster,
  myLevel,
  myMeat,
  numericModifier,
  Skill,
} from "kolmafia";
import { getResources, ResourceCategory } from "../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../typings/TaskInfo";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { GreyPulls } from "../../utils/GreyResources";
import { Macro } from "../../utils/MacroBuilder";
import { PropertyManager } from "../../utils/Properties";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestLocketInfiniteLoop extends TaskInfo implements QuestInfo {
  monster: Monster = Monster.get("Pygmy witch lawyer");
  skill: Skill = Skill.get("Infinite Loop");
  effect: Effect = Effect.get("Everything Looks Yellow");
  instantKill: Item = Item.get("Flame orb");
  wish: Item = Item.get("Pocket Wish");
  fax: PossiblePath = new PossiblePath(1)
    .addFax(this.monster)
    .add(ResourceCategory.YELLOW_RAY)
    .addIgnored("Cosplay Saber")
    .addIgnored("Parka: Yellow Ray");
  pullWish: PossiblePath = new PossiblePath(1)
    .addConsumablePull(this.wish)
    .addConsumablePull(this.instantKill);
  pantsgiving: Item = Item.get("Pantsgiving");
  doctorsBag: Item = Item.get("Lil' Doctor&trade; bag");

  level(): number {
    return 1;
  }

  getPossiblePaths(): PossiblePath[] {
    return [this.fax, this.pullWish];
  }

  status(): QuestStatus {
    if (haveSkill(this.skill)) {
      return QuestStatus.COMPLETED;
    }

    if (haveEffect(this.effect) > 0) {
      return QuestStatus.NOT_READY;
    }

    if (myMeat() < 350 || myLevel() < 4) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(path: PossiblePath): QuestAdventure {
    const outfit = new GreyOutfit();
    outfit.addBonus("+10 init");
    outfit.addBonus("-ml");
    outfit.hpRegenWeight = 1;
    outfit.mpRegenWeight = 1;

    if (path.canUse(ResourceCategory.YELLOW_RAY)) {
      path.getResource(ResourceCategory.YELLOW_RAY).prepare(outfit);
    }

    if (availableAmount(this.doctorsBag) > 0) {
      outfit.addItem(this.doctorsBag);
    } else if (availableAmount(this.pantsgiving) > 0) {
      outfit.addItem(this.pantsgiving);
    }

    return {
      location: null,
      outfit: outfit,
      run: () => {
        if (numericModifier("Initiative") <= 40) {
          throw "Initiative is 40 or less, aborting to be safe as we can't be sure you'd get the jump.";
        }

        const props = new PropertyManager();
        let macro: Macro;
        let faxResource = path.getResource(ResourceCategory.FAXER);

        if (equippedAmount(this.doctorsBag) > 0) {
          macro = Macro.skill(Skill.get("Chest X-Ray"));
        } else if (equippedAmount(this.pantsgiving) > 0) {
          macro = Macro.skill(Skill.get("Talk about politics"));
        } else {
          const yrResource = path.getResource(ResourceCategory.YELLOW_RAY);

          if (faxResource != null) {
            yrResource.prepare(null, props);
            macro = yrResource.macro();
          } else {
            macro = Macro.item(this.instantKill);
          }
        }

        if (path.canUse(ResourceCategory.PULL)) {
          GreyPulls.tryPull(this.wish, 51000);

          if (itemAmount(this.wish) == 0) {
            throw "Expected to have pulled a wish!";
          }

          GreyPulls.tryPull(this.instantKill, 10000);

          if (itemAmount(this.instantKill) == 0) {
            throw "Expected to have pulled an instant kill source!";
          }

          path.addUsed(ResourceCategory.PULL);
          path.addUsed(ResourceCategory.PULL);
          faxResource = getResources().find((r) => r.id == "Wish");
        }

        faxResource.fax(this.monster);

        macro.submit();

        if (handlingChoice() || currentRound() != 0) {
          throw "We're supposed to be done with this infinite loop fight!";
        }

        if (!haveSkill(this.skill)) {
          throw "Expected to have Infinite Loop skill!";
        }
      },
    };
  }

  getId(): QuestType {
    return "CombatLocket / InfiniteLoop";
  }

  getLocations(): Location[] {
    return [];
  }
}
