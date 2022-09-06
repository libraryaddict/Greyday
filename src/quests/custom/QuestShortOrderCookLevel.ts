import {
  Monster,
  Location,
  Familiar,
  Skill,
  haveFamiliar,
  familiarWeight,
  haveSkill,
  useFamiliar,
} from "kolmafia";
import { PossiblePath } from "../../typings/TaskInfo";
import { greyKillingBlow } from "../../utils/GreyCombat";
import { AdventureSettings, greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { Macro } from "../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestShortOrderExpLevel implements QuestInfo {
  cook: Familiar = Familiar.get("Shorter-Order Cook");
  goose: Familiar = Familiar.get("Grey Goose");
  warren: Location = Location.get("The Dire Warren");

  getId(): QuestType {
    return "Misc / Short Cook Goose";
  }

  level(): number {
    return 1;
  }

  status(): QuestStatus {
    if (!haveFamiliar(this.cook)) {
      return QuestStatus.COMPLETED;
    }

    if (familiarWeight(this.goose) < 9) {
      return this.goose.experience <= 0
        ? QuestStatus.NOT_READY
        : QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  mustBeDone(): boolean {
    return true;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit();

    return {
      location: null,
      familiar: this.goose,
      disableFamOverride: true,
      outfit: outfit,
      run: () => {
        useFamiliar(this.goose);
        const macro = Macro.skill(Skill.get("Convert Matter to Pomade"));
        macro.attack().attack();

        greyAdv(
          this.warren,
          outfit,
          new AdventureSettings().setFinishingBlowMacro(macro)
        );
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
