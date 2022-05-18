import {
  adv1,
  availableAmount,
  council,
  Familiar,
  familiarWeight,
  getProperty,
  Item,
  itemAmount,
  Location,
  Monster,
  myHash,
  myLevel,
  print,
  toInt,
  visit,
  visitUrl,
} from "kolmafia";
import { hasNonCombatSkillsReady } from "../../../GreyAdventurer";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { Macro } from "../../../utils/MacroBuilder";
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

  needAdventures(): number {
    return 9;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL11Pyramid");

    if (status < 3 || getProperty("pyramidBombUsed") == "false") {
      return QuestStatus.NOT_READY;
    }

    if (status > 3) {
      return QuestStatus.COMPLETED;
    }

    let fam = Familiar.get("Grey Goose");

    if (familiarWeight(fam) < 6 && familiarWeight(fam) >= 3) {
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
}
