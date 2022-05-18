import {
  Location,
  Familiar,
  Item,
  availableAmount,
  use,
  Skill,
} from "kolmafia";
import { greyAdv, AdventureSettings } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { GreySettings } from "../../../utils/GreySettings";
import { Macro } from "../../../utils/MacroBuilder";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL4BatsCenter implements QuestInfo {
  fire: Item = Item.get("industrial fire extinguisher");
  loc: Location = Location.get("Guano Junction");
  sonar: Item = Item.get("sonar-in-a-biscuit");

  getId(): QuestType {
    return "Council / Bats / UnlockLeft";
  }

  level(): number {
    return 4;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL04Bat");

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();

    if (!GreySettings.isHardcoreMode()) {
      outfit.addItem(this.fire);
    }

    return {
      outfit: outfit,
      location: this.loc,
      run: () => {
        greyAdv(
          this.loc,
          outfit,
          new AdventureSettings().setStartOfFightMacro(
            new Macro().trySkill(Skill.get("Fire Extinguisher: Zone Specific"))
          )
        );
        this.doSonars();
      },
    };
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  doSonars() {
    while (
      availableAmount(this.sonar) > 0 &&
      getQuestStatus("questL04Bat") < 3
    ) {
      use(this.sonar);
    }
  }
}
