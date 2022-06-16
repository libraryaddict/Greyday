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
  getProperty,
  canadiaAvailable,
} from "kolmafia";
import { AbsorbsProvider } from "../../utils/GreyAbsorber";
import { ResourceClaim, ResourceType } from "../../utils/GreyResources";
import { canCombatLocket } from "../../utils/GreyUtils";
import { Macro } from "../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestAbsorbCanadiaMonster implements QuestInfo {
  monster: Monster = Monster.get("cloud of disembodied whiskers");
  familiar: Familiar = Familiar.get("Grey Goose");
  spoon: Item = Item.get("hewn moon-rune spoon");

  getId(): QuestType {
    return "Absorbs / Canadia";
  }

  level(): number {
    return 18;
  }

  getLocations(): Location[] {
    return [];
  }

  status(): QuestStatus {
    if (AbsorbsProvider.getReabsorbedMonsters().includes(this.monster)) {
      return QuestStatus.COMPLETED;
    }

    if (!canCombatLocket(this.monster)) {
      return QuestStatus.COMPLETED;
    }

    if (familiarWeight(this.familiar) < 6) {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.spoon) > 0 && getProperty("moonTuned") != "true") {
      return QuestStatus.NOT_READY;
    }

    if (canadiaAvailable()) {
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
        let page1 = visitUrl("inventory.php?reminisce=1", false);
        let url =
          "choice.php?pwd=&whichchoice=1463&option=1&mid=" +
          toInt(this.monster);

        visitUrl(url);
        Macro.trySkill(Skill.get("Re-Process Matter"))
          .trySkillRepeat(Skill.get("Infinite Loop"))
          .submit();

        if (handlingChoice() || currentRound() != 0) {
          throw "We're supposed to be done with this locket fight!";
        }
      },
    };
  }

  getResourceClaims?(): ResourceClaim[] {
    return [
      new ResourceClaim(
        ResourceType.COMBAT_LOCKET,
        1,
        "Locket Canadia Monster",
        19
      ),
    ];
  }

  getAbsorbs(): Monster[] {
    return [this.monster];
  }
}
