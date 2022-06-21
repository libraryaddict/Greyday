import {
  Location,
  Familiar,
  Monster,
  myAscensions,
  familiarWeight,
  visitUrl,
  toInt,
  Skill,
  currentRound,
  handlingChoice,
  Item,
  availableAmount,
  haveSkill,
} from "kolmafia";
import { AbsorbsProvider } from "../../utils/GreyAbsorber";
import { ResourceClaim, ResourceType } from "../../utils/GreyResources";
import { canCombatLocket, doPocketWishFight } from "../../utils/GreyUtils";
import { Macro } from "../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestAbsorbStarMonster implements QuestInfo {
  evenMonster: Monster = Monster.get("One-Eyed Willie");
  oddMonster: Monster = Monster.get("Little Man in the Canoe");
  familiar: Familiar = Familiar.get("Grey Goose");
  pocketWish: Item = Item.get("Pocket Wish");
  nanovision: Skill = Skill.get("Double Nanovision");

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

  status(): QuestStatus {
    if (AbsorbsProvider.getReabsorbedMonsters().includes(this.getMonster())) {
      return QuestStatus.COMPLETED;
    }

    if (
      !canCombatLocket(this.getMonster()) &&
      availableAmount(this.pocketWish) == 0
    ) {
      return QuestStatus.COMPLETED;
    }

    if (familiarWeight(this.familiar) < 6) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.FASTER_LATER;
  }

  run(): QuestAdventure {
    return {
      location: null,
      outfit: null,
      familiar: this.familiar,
      disableFamOverride: true,
      run: () => {
        if (canCombatLocket(this.getMonster())) {
          let page1 = visitUrl("inventory.php?reminisce=1", false);
          let url =
            "choice.php?pwd=&whichchoice=1463&option=1&mid=" +
            toInt(this.getMonster());

          visitUrl(url);
        } else {
          doPocketWishFight(this.getMonster());
        }

        let macro = Macro.trySkill(Skill.get("Re-Process Matter"));

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

  getResourceClaims?(): ResourceClaim[] {
    return [
      new ResourceClaim(
        ResourceType.COMBAT_LOCKET,
        1,
        "Locket Star Monster",
        19
      ),
    ];
  }

  getAbsorbs(): Monster[] {
    return [this.getMonster()];
  }
}
