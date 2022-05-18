import {
  Location,
  Familiar,
  Monster,
  Skill,
  myMeat,
  myLevel,
  retrieveItem,
  Item,
  itemAmount,
  visitUrl,
  handlingChoice,
  currentRound,
  toInt,
  Effect,
  haveEffect,
  haveSkill,
  print,
  cliExecute,
} from "kolmafia";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { GreySettings } from "../../utils/GreySettings";
import { canCombatLocket } from "../../utils/GreyUtils";
import { Macro } from "../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestLocketSystemSweep implements QuestInfo {
  monster: Monster = Monster.get("pygmy janitor");
  skill: Skill = Skill.get("System Sweep");
  rocket: Item = Item.get("Yellow Rocket");
  effect: Effect = Effect.get("Everything Looks Yellow");

  level(): number {
    return 0;
  }

  status(): QuestStatus {
    if (
      GreySettings.isHardcoreMode() ||
      !canCombatLocket(this.monster) ||
      haveSkill(this.skill)
    ) {
      return QuestStatus.COMPLETED;
    }

    if (haveEffect(this.effect) > 0) {
      return QuestStatus.NOT_READY;
    }

    if (myMeat() < 350 || myLevel() < 5) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.COMPLETED;

    // return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();
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

        let page1 = visitUrl("inventory.php?reminisce=1", false);
        let url =
          "choice.php?pwd=&whichchoice=1463&option=1&mid=" +
          toInt(this.monster);
        visitUrl(url);

        Macro.item(this.rocket).submit();

        if (handlingChoice() || currentRound() != 0) {
          throw "We're supposed to be done with this locket fight!";
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
