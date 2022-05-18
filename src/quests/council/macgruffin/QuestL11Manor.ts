import { canAdv } from "canadv.ash";
import {
  adv1,
  availableAmount,
  cliExecute,
  council,
  create,
  equip,
  equippedAmount,
  getProperty,
  Item,
  itemAmount,
  Location,
  Monster,
  myLevel,
  use,
  visitUrl,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import { hasNonCombatSkillsReady } from "../../../GreyAdventurer";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  OutfitImportance,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { QuestL11ManorBomb } from "./manor/QuestL11ManorBomb";
import { QuestL11ManorBoss } from "./manor/QuestL11ManorBoss";
import { QuestL11ManorRecipe } from "./manor/QuestL11ManorRecipe";
import { QuestL11ManorSoda } from "./manor/QuestL11ManorSoda";
import { QuestL11ManorWine } from "./manor/QuestL11ManorWine";

export class QuestL11Manor implements QuestInfo {
  ballroom: Location = Location.get("The Haunted Ballroom");
  children: QuestInfo[] = [];

  constructor() {
    this.children.push(new QuestL11ManorBomb());
    this.children.push(new QuestL11ManorBoss());
    this.children.push(new QuestL11ManorRecipe());
    this.children.push(new QuestL11ManorSoda());
    this.children.push(new QuestL11ManorWine());
  }

  getChildren(): QuestInfo[] {
    return this.children;
  }

  level(): number {
    return 11;
  }

  getId(): QuestType {
    return "Council / MacGruffin / Manor / Ballroom";
  }

  getLocations(): Location[] {
    return [this.ballroom];
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL11Manor");

    if (status < 0 || !canAdv(this.ballroom)) {
      return QuestStatus.NOT_READY;
    }

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    if (!hasNonCombatSkillsReady()) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setNoCombat();

    return {
      location: this.ballroom,
      outfit: outfit,
      run: () => {
        let props = new PropertyManager();

        try {
          props.setChoice(106, 3);
          props.setChoice(90, 3);
          greyAdv(this.ballroom, outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getStatus(): ManorStatus {
    return ManorStatus[getProperty("questL11Manor")];
  }
}

enum ManorStatus {
  unstarted = "unstarted",
  started = "started",
  step1 = "CELLER_OPENED",
  step2 = "RECIPE_ACQUIRED",
  step3 = "WALL_BROKEN",
  finished = "finished",
}
