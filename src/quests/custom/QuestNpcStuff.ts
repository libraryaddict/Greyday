import {
  Location,
  Familiar,
  getProperty,
  visitUrl,
  visit,
  lastChoice,
  availableAmount,
  Item,
  Skill,
  toInt,
  haveSkill,
  myMeat,
  gnomadsAvailable,
  setProperty,
  use,
  myAscensions,
} from "kolmafia";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestNPCStuff implements QuestInfo {
  children: QuestInfo[] = [
    new QuestMeatSmith(),
    new QuestArtist(),
    new QuestGnomeTrainer(),
    new QuestMadBaker(),
    new QuestUntinker(),
    new QuestDruggie(),
  ];

  getId(): QuestType {
    return "NPC / Parent";
  }

  level(): number {
    return -1;
  }

  status(): QuestStatus {
    return QuestStatus.COMPLETED;
  }

  run(): QuestAdventure {
    throw new Error("Method not implemented.");
  }

  getLocations(): Location[] {
    return [];
  }

  getChildren(): QuestInfo[] {
    return this.children;
  }
}

class QuestDruggie implements QuestInfo {
  getId(): QuestType {
    return "NPC / Druggie";
  }

  level(): number {
    return 5;
  }

  status(): QuestStatus {
    if (toInt(getProperty("lastGoofballBuy")) == myAscensions()) {
      return QuestStatus.COMPLETED;
    }

    if (getQuestStatus("questL03Rat") < 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        visitUrl("place.php?whichplace=woods");
        visitUrl("tavern.php?place=susguy&action=buygoofballs", true);
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}

class QuestGnomeTrainer implements QuestInfo {
  skills: Skill[] = [
    "Torso Awareness",
    //"Cosmic Ugnderstanding",
    "Powers of Observatiogn",
    "Gnefarious Pickpocketing",
    "Gnomish Hardigness",
  ].map((s) => Skill.get(s));
  letter: Item = Item.get("Letter for Melvign the Gnome");

  getId(): QuestType {
    return "NPC / GnomeSkills";
  }

  level(): number {
    return 0;
  }

  getLocations(): Location[] {
    return [];
  }

  status(): QuestStatus {
    if (availableAmount(this.letter) > 0) {
      return QuestStatus.READY;
    }

    if (this.getSkillLacking() == null || !gnomadsAvailable()) {
      return QuestStatus.COMPLETED;
    }

    let meat = 10000;

    if (myMeat() < meat) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  getSkillLacking(): Skill {
    return this.skills.find((s) => !haveSkill(s));
  }

  run(): QuestAdventure {
    if (availableAmount(this.letter) > 0) {
      return {
        location: null,
        run: () => {
          use(this.letter);
        },
      };
    }

    return {
      location: null,
      run: () => {
        visitUrl(
          "gnomes.php?action=trainskill&whichskill=" +
            toInt(this.getSkillLacking())
        );
      },
    };
  }
}

class QuestArtist implements QuestInfo {
  paintbrush: Item = Item.get("Pretentious Paintbrush");
  palette: Item = Item.get("Pretentious Palette");
  pail: Item = Item.get("Pail of Pretentious Paint");

  level(): number {
    return 0;
  }

  getId(): QuestType {
    return "NPC / Painter";
  }

  getLocations(): Location[] {
    return [];
  }

  status(): QuestStatus {
    if (getProperty("questM02Artist") == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("questM02Artist") == "unstarted") {
      return QuestStatus.READY;
    }

    if (this.hasAllItems()) {
      return QuestStatus.READY;
    }

    return QuestStatus.NOT_READY;
  }

  startQuest(): QuestAdventure {
    return {
      location: null,
      run: () => {
        visitUrl(
          "place.php?whichplace=town_wrong&action=townwrong_artist_noquest"
        );
        visitUrl(
          "place.php?whichplace=town_wrong&action=townwrong_artist_noquest&getquest=1"
        );
        visitUrl(
          "place.php?whichplace=town_wrong&action=townwrong_artist_quest"
        );
      },
    };
  }

  turnInQuest(): QuestAdventure {
    return {
      location: null,
      run: () => {
        visitUrl(
          "place.php?whichplace=town_wrong&action=townwrong_artist_quest"
        );
      },
    };
  }

  run(): QuestAdventure {
    if (this.hasAllItems()) {
      return this.turnInQuest();
    }

    return this.startQuest();
  }

  hasAllItems(): boolean {
    return (
      availableAmount(this.paintbrush) > 0 &&
      availableAmount(this.pail) > 0 &&
      availableAmount(this.palette) > 0
    );
  }
}

class QuestMadBaker implements QuestInfo {
  level(): number {
    return 0;
  }

  getId(): QuestType {
    return "NPC / Baker";
  }

  getLocations(): Location[] {
    return [];
  }

  status(): QuestStatus {
    if (getProperty("questM25Armorer") == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("questM25Armorer") == "step4") {
      return QuestStatus.READY;
    }

    if (getProperty("questM25Armorer") != "unstarted") {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  turnInPie(): QuestAdventure {
    return {
      location: null,
      run: () => {
        visitUrl("shop.php?whichshop=armory");
        visitUrl("choice.php?whichchoice=" + lastChoice() + "&option=2&pwd=");
      },
    };
  }

  startQuest(): QuestAdventure {
    return {
      location: null,
      run: () => {
        visitUrl("shop.php?whichshop=armory");
        visitUrl("shop.php?whichshop=armory&action=talk");
        visitUrl("choice.php?pwd=&whichchoice=1065&option=1");
      },
    };
  }

  run(): QuestAdventure {
    if (getProperty("questM25Armorer") == "unstarted") {
      return this.startQuest();
    }

    return this.turnInPie();
  }
}

class QuestUntinker implements QuestInfo {
  item: Item = Item.get("Rusty screwdriver");

  getLocations(): Location[] {
    return [];
  }

  getId(): QuestType {
    return "NPC / Untinkerer";
  }

  level(): number {
    return 1;
  }

  status(): QuestStatus {
    if (getProperty("questM01Untinker") == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("questM01Untinker") == "unstarted") {
      return QuestStatus.READY;
    }

    if (availableAmount(this.item) == 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    if (getProperty("questM01Untinker") == "unstarted") {
      return {
        location: null,
        run: () => {
          visitUrl(
            "place.php?whichplace=forestvillage&preaction=screwquest&action=fv_untinker_quest"
          );
          setProperty("questM01Untinker", "started");
        },
      };
    }

    return {
      location: null,
      run: () => {
        visitUrl("place.php?whichplace=forestvillage&action=fv_untinker");
      },
    };
  }
}

class QuestMeatSmith implements QuestInfo {
  getId(): QuestType {
    return "NPC / Meatsmith";
  }

  level(): number {
    return 0;
  }

  run(): QuestAdventure {
    if (getProperty("questM23Meatsmith") == "unstarted") {
      return {
        location: null,
        run: () => {
          visitUrl("shop.php?whichshop=meatsmith");
          visitUrl("shop.php?whichshop=meatsmith&action=talk");
          visitUrl("choice.php?whichchoice=1059&option=1&pwd=");
        },
      };
    }

    return {
      location: null,
      run: () => {
        visitUrl("shop.php?whichshop=meatsmith");
        visitUrl("choice.php?whichchoice=" + lastChoice() + "&option=2&pwd=");
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  status(): QuestStatus {
    if (getProperty("questM23Meatsmith") == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("questM23Meatsmith") == "started") {
      return QuestStatus.NOT_READY; // Manual complete or not at all
    }

    return QuestStatus.READY;
  }
}
