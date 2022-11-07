import {
  council,
  Familiar,
  familiarWeight,
  getProperty,
  Location,
} from "kolmafia";
import { greyAdv } from "../../../utils/GreyLocations";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { QuestL11PyramidControl } from "./pyramid/QuestL11PyramidControl";
import { QuestL11PyramidMiddle } from "./pyramid/QuestL11PyramidMiddle";
import { QuestL11PyramidTop } from "./pyramid/QuestL11PyramidTop";

export class QuestL11Pyramid implements QuestInfo {
  edUndying: Location = Location.get("The Lower Chambers");
  children: QuestInfo[] = [];

  constructor() {
    this.children.push(new QuestL11PyramidControl());
    this.children.push(new QuestL11PyramidTop());
    this.children.push(new QuestL11PyramidMiddle());
  }

  getChildren(): QuestInfo[] {
    return this.children;
  }

  level(): number {
    return 11;
  }

  getLocations(): Location[] {
    return [];
  }

  getId(): QuestType {
    return "Council / MacGruffin / Pyramid / EdUndying";
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL11Pyramid");

    if (status < 3 || getProperty("pyramidBombUsed") == "false") {
      return QuestStatus.NOT_READY;
    }

    if (status > 3) {
      return QuestStatus.COMPLETED;
    }

    const fam = Familiar.get("Grey Goose");

    if (familiarWeight(fam) >= 3) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: this.edUndying,
      run: () => {
        for (let i = 0; i < 7; i++) {
          greyAdv("place.php?whichplace=pyramid&action=pyramid_state1a");
        }

        council();
      },
    };
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}
