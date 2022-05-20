import {
  adv1,
  availableAmount,
  canadiaAvailable,
  cliExecute,
  council,
  create,
  damageReduction,
  Element,
  elementalResistance,
  getProperty,
  haveSkill,
  Item,
  itemAmount,
  Location,
  maximize,
  myHp,
  myLevel,
  myMaxhp,
  outfit,
  restoreHp,
  Skill,
  toFloat,
  toInt,
  use,
  visitUrl,
} from "kolmafia";
import { PropertyManager } from "../../utils/Properties";
import {
  getQuestStatus,
  OutfitImportance,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { MurderHandler } from "./peaks/QuestL9MurderPeak";
import { SmutOrcs } from "./peaks/QuestL9SmutOrcs";
import { ABooHandler } from "./peaks/QuestL9AbooPeak";
import { OilHandler } from "./peaks/QuestL9OilPeak";
import { QuestType } from "../QuestTypes";

export class QuestL9Smut implements QuestInfo {
  peaks: QuestInfo[] = [
    new SmutOrcs(),
    new ABooHandler(),
    new MurderHandler(),
    new OilHandler(),
  ];

  level(): number {
    return 9;
  }

  getChildren(): QuestInfo[] {
    return this.peaks;
  }

  getLocations(): Location[] {
    return [];
  }

  status(): QuestStatus {
    let status = this.getStatus();

    if (status == PeakStatus.finished) {
      return QuestStatus.COMPLETED;
    }

    if (
      status == PeakStatus.step1 ||
      status == PeakStatus.step3 ||
      (getProperty("booPeakLit") == "true" &&
        getProperty("oilPeakLit") == "true" &&
        getProperty("twinPeakProgress") == "15")
    ) {
      return QuestStatus.READY;
    }

    return QuestStatus.NOT_READY;
  }

  mustBeDone(): boolean {
    return true;
  }

  getStatus(): PeakStatus {
    return PeakStatus[getProperty("questL09Topping")];
  }

  getId(): QuestType {
    return "Council / Peaks / Lord";
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        this.visitMiLord();
        council();
      },
    };
  }

  visitMiLord() {
    visitUrl("place.php?whichplace=highlands&action=highlands_dude");
  }
}

enum PeakStatus {
  unstarted = "unstarted",
  started = "CHASM",
  step1 = "INTRODUCE_PEAKS",
  step2 = "BURN_MY_PEAKS",
  step3 = "BURNED_PEAKS_DOWN",
  finished = "finished",
}
