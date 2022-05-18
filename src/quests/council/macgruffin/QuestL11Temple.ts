import {
  adv1,
  availableAmount,
  cliExecute,
  council,
  Effect,
  getProperty,
  handlingChoice,
  haveEffect,
  hiddenTempleUnlocked,
  Item,
  itemAmount,
  lastChoice,
  Location,
  myAscensions,
  myLevel,
  print,
  runChoice,
  toInt,
  use,
  visitUrl,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import {
  getQuestStatus,
  OutfitImportance,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { QuestL11Bowling } from "./hiddencity/shrines/QuestL11TempleBowling";
import { QuestL11Business } from "./hiddencity/shrines/QuestL11TempleBusiness";
import { QuestL11Curses } from "./hiddencity/shrines/QuestL11TempleCurses";
import { QuestL11Doctor } from "./hiddencity/shrines/QuestL11TempleDoctor";
import { hasNonCombatSkillsReady } from "../../../GreyAdventurer";
import { greyAdv } from "../../../utils/GreyLocations";
import { QuestL11ShrineVines } from "./hiddencity/QuestL11ShrineVines";
import { QuestL11HiddenPark } from "./hiddencity/QuestL11HiddenPark";
import { QuestL11HiddenBookMatches } from "./hiddencity/QuestL11HiddenBookMatches";
import { QuestL11TempleGrabWool } from "./temple/QuestL11TempleGrabWool";
import { QuestL11TempleNostril } from "./temple/QuestL11TempleNostril";
import { QuestL11TempleUnlock } from "./temple/QuestL11TempleUnlock";
import { QuestL11TempleHiddenCity } from "./temple/QuestL11TempleHiddenCity";
import { QuestType } from "../../QuestTypes";

export class QuestL11Temple implements QuestInfo {
  buildings: QuestInfo[] = [];

  constructor() {
    this.buildings.push(new QuestL11Bowling());
    this.buildings.push(new QuestL11Curses());
    this.buildings.push(new QuestL11Business());
    this.buildings.push(new QuestL11Doctor());
    this.buildings.push(new QuestL11HiddenBookMatches());
    this.buildings.push(new QuestL11ShrineVines());
    this.buildings.push(new QuestL11TempleGrabWool());
    this.buildings.push(new QuestL11TempleNostril());
    this.buildings.push(new QuestL11TempleUnlock());
    this.buildings.push(new QuestL11TempleHiddenCity());
    this.buildings.push(new QuestL11HiddenPark());
  }

  level(): number {
    return 11;
  }

  getId(): QuestType {
    return "Council / MacGruffin / HiddenCity / Boss";
  }

  needAdventures(): number {
    return 13;
  }

  getLocations(): Location[] {
    return [];
  }

  getChildren(): QuestInfo[] {
    return this.buildings;
  }

  status(): QuestStatus {
    let status = getProperty("questL11Worship");

    if (status == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("questL11MacGuffin") != "step2") {
      return QuestStatus.NOT_READY;
    }

    if (getProperty("questM16Temple") == "unstarted" || this.bossReady()) {
      return QuestStatus.READY;
    }

    return QuestStatus.NOT_READY;
  }

  run(): QuestAdventure {
    if (this.bossReady()) {
      return this.fightBoss();
    }

    return {
      location: null,
      run: () => {
        visitUrl("place.php?whichplace=woods&action=woods_dakota_anim");
      },
    };
  }

  bossReady(): boolean {
    return itemAmount(Item.get("stone triangle")) >= 4;
  }

  fightBoss(): QuestAdventure {
    return {
      location: Location.get("A Massive Ziggurat"),
      run: () => {
        let props = new PropertyManager();
        props.setChoice(791, 1);

        try {
          greyAdv(Location.get("A Massive Ziggurat"));
        } finally {
          props.resetAll();
        }
      },
    };
  }
}
