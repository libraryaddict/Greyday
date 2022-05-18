import {
  adv1,
  availableAmount,
  cliExecute,
  council,
  Effect,
  Element,
  elementalResistance,
  getProperty,
  haveEffect,
  haveSkill,
  Item,
  Location,
  maximize,
  Monster,
  myLevel,
  myMeat,
  numericModifier,
  print,
  retrieveItem,
  Skill,
  use,
  useSkill,
  visitUrl,
} from "kolmafia";
import {
  getQuestStatus,
  OutfitImportance,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { AdventureSettings, greyAdv } from "../../utils/GreyLocations";
import { hasCombatSkillReady } from "../../GreyAdventurer";
import { canCombatLocket, getBackupsRemaining } from "../../utils/GreyUtils";
import { Macro } from "../../utils/MacroBuilder";
import { GreyClovers, GreyPulls } from "../../utils/GreyResources";
import { QuestType } from "../QuestTypes";
import { QuestL8MountainBoss } from "./icepeak/QuestL8MountainBoss";
import { QuestL8MountainGoats } from "./icepeak/QuestL8MountainGoats";
import { QuestL8MountainNinja } from "./icepeak/QuestL8MountainNinja";
import { QuestL8MountainOreClover } from "./icepeak/QuestL8MountainOreClover";
import { QuestL8MountainOreMan } from "../locket/QuestL8MountainOreMan";
import { QuestL8MountainOreMiningOutfit } from "./icepeak/QuestL8MountainOreMiningOutfit";
import { QuestL8MountainOreMining } from "./icepeak/QuestL8MountainOreMining";

export class QuestL8IcePeak implements QuestInfo {
  children: QuestInfo[] = [];

  constructor() {
    this.children.push(new QuestL8MountainGoats());
    this.children.push(new QuestL8MountainOreClover());
    this.children.push(new QuestL8MountainOreMan());
    this.children.push(new QuestL8MountainOreMiningOutfit());
    this.children.push(new QuestL8MountainOreMining());
    this.children.push(new QuestL8MountainNinja());
    this.children.push(new QuestL8MountainBoss());
  }

  getChildren(): QuestInfo[] {
    return this.children;
  }

  level(): number {
    return 8;
  }

  getLocations(): Location[] {
    return [];
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL08Trapper");

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  getId(): QuestType {
    return "Council / Ice / Trapper";
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        this.talkTrapper();
      },
    };
  }

  getStatus(): MountainStatus {
    return getQuestStatus("questL08Trapper");
  }

  talkTrapper() {
    visitUrl("place.php?whichplace=mclargehuge&action=trappercabin");
  }
}

export enum MountainStatus {
  started,
  TRAPPER_DEMANDS,
  GET_OUTFIT,
  UNLOCKED_PEAK,
  FIGHTING_YETI,
  DEFEATED_BOAR,
  finished = 100,
}
