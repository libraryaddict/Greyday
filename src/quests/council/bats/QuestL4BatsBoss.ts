import {
  Location,
  Familiar,
  council,
  haveSkill,
  Skill,
  Item,
  getProperty,
  availableAmount,
} from "kolmafia";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { getBackupsRemaining } from "../../../utils/GreyUtils";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL4BatsBoss implements QuestInfo {
  loc: Location = Location.get("The Boss Bat's Lair");
  camera: Item = Item.get("Backup Camera");

  getId(): QuestType {
    return "Council / Bats / Boss";
  }

  level(): number {
    return 4;
  }

  shouldWaitForLobsters(): boolean {
    return (
      getProperty("sidequestLighthouseCompleted") == "none" &&
      availableAmount(this.camera) > 0 &&
      getBackupsRemaining() > 0
    );
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL04Bat");

    if (status < 3 || this.shouldWaitForLobsters()) {
      return QuestStatus.NOT_READY;
    }

    if (status == 100) {
      return QuestStatus.COMPLETED;
    }

    // TODO If lobster needs a backup

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit();
    outfit.meatDropWeight = 2;

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        greyAdv(this.loc, outfit);

        if (haveSkill(Skill.get("Grey Noise"))) {
          council();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.loc];
  }
}
