import {
  availableAmount,
  Familiar,
  getProperty,
  gnomadsAvailable,
  haveSkill,
  Item,
  knollAvailable,
  lastChoice,
  Location,
  Monster,
  myAscensions,
  myMeat,
  print,
  runChoice,
  setProperty,
  Skill,
  toInt,
  use,
  visitUrl,
} from "kolmafia";
import { GreyAdventurer } from "../../GreyAdventurer";
import { AdventureFinder } from "../../GreyChooser";
import { ResourceCategory } from "../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../typings/TaskInfo";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { GreyPulls } from "../../utils/GreyResources";
import { getMoonZone, GreySettings } from "../../utils/GreySettings";
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
    new QuestKnollMayor(),
    new QuestDoctor(),
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

class QuestDoctor implements QuestInfo {
  getId(): QuestType {
    return "NPC / Doctor";
  }

  level(): number {
    return 5;
  }

  free(): boolean {
    return true;
  }

  mustBeDone(): boolean {
    return true;
  }

  status(): QuestStatus {
    if (getProperty("questM24Doc") != "unstarted") {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        visitUrl("shop.php?whichshop=doc&action=talk");
        runChoice(1);
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}

class QuestKnollMayor implements QuestInfo {
  spoon: Item = Item.get("hewn moon-rune spoon");

  getLocations(): Location[] {
    return [];
  }

  getId(): QuestType {
    return "NPC / Knoll Mayor";
  }

  level(): number {
    return 2;
  }

  free(): boolean {
    return true;
  }

  mustBeDone(): boolean {
    return true;
  }

  status(): QuestStatus {
    if (getProperty("questM03Bugbear") != "unstarted") {
      return QuestStatus.COMPLETED;
    }

    if (!knollAvailable()) {
      if (
        availableAmount(this.spoon) > 0 &&
        getProperty("moonTuned") == "false" &&
        getMoonZone(GreySettings.greyTuneMoonSpoon) == "Knoll"
      ) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.COMPLETED;
    }

    if (getProperty("questL02Larva") == "unstarted") {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      outfit: GreyOutfit.IGNORE_OUTFIT,
      location: null,
      run: () => {
        visitUrl("place.php?whichplace=knoll_friendly&action=dk_mayor");
      },
    };
  }
}

class QuestDruggie implements QuestInfo {
  getId(): QuestType {
    return "NPC / Druggie";
  }

  level(): number {
    return 5;
  }

  free(): boolean {
    return true;
  }

  mustBeDone(): boolean {
    return true;
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
      outfit: GreyOutfit.IGNORE_OUTFIT,
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

class QuestGnomeTrainer extends TaskInfo implements QuestInfo {
  skills: Skill[] = [
    "Torso Awareness",
    "Powers of Observatiogn",
    "Gnefarious Pickpocketing",
  ].map((s) => Skill.get(s));
  letter: Item = Item.get("Letter for Melvign the Gnome");
  shirt: Item = Item.get('"Remember the Trees" Shirt');
  torso: Skill = Skill.get("Torso Awareness");
  spoon: Item = Item.get("hewn moon-rune spoon");
  paths: PossiblePath[];

  createPaths(assumeUnstarted: boolean) {
    this.paths = [];

    if (!assumeUnstarted && availableAmount(this.shirt) > 0) {
      this.paths.push(new PossiblePath(0));
      return;
    }

    // If we're not in gnomes
    if (
      getMoonZone() != "Gnomad" &&
      !GreySettings.willBeAccessible("Gnomad", assumeUnstarted)
    ) {
      // If we won't be in gnomes
      this.paths.push(new PossiblePath(0));
      return;
    }

    this.paths.push(
      new PossiblePath(0).addPull(this.shirt),
      new PossiblePath(10)
    );
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  getId(): QuestType {
    return "NPC / GnomeSkills";
  }

  level(): number {
    return 1;
  }

  free(): boolean {
    return true;
  }

  mustBeDone(): boolean {
    return true;
  }

  getLocations(): Location[] {
    return [];
  }

  status(path: PossiblePath): QuestStatus {
    if (availableAmount(this.letter) > 0 && !haveSkill(this.torso)) {
      return QuestStatus.READY;
    }

    if (
      path == null ||
      (haveSkill(this.torso) && path.canUse(ResourceCategory.PULL))
    ) {
      return QuestStatus.READY;
    }

    if (
      getQuestStatus("questL13Final") >= 0 ||
      this.getSkillLacking() == null
    ) {
      return QuestStatus.COMPLETED;
    }

    if (!gnomadsAvailable()) {
      return QuestStatus.NOT_READY;
    }

    const meat = 7500 + (haveSkill(this.torso) ? 5000 : 0);

    if (myMeat() < meat) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  getSkillLacking(): Skill {
    return this.skills.find((s) => !haveSkill(s));
  }

  run(path: PossiblePath): QuestAdventure {
    if (availableAmount(this.letter) > 0 && !haveSkill(this.torso)) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          use(this.letter);
        },
      };
    }

    if (haveSkill(this.torso) && path.canUse(ResourceCategory.PULL)) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          GreyPulls.tryPull(this.shirt);
        },
      };
    }

    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        const skill = this.getSkillLacking();

        visitUrl("gnomes.php?action=trainskill&whichskill=" + toInt(skill));

        if (haveSkill(this.torso) && path.canUse(ResourceCategory.PULL)) {
          GreyPulls.tryPull(this.shirt);
          AdventureFinder.recalculatePath();
        }
      },
    };
  }
}

class QuestArtist implements QuestInfo {
  paintbrush: Item = Item.get("Pretentious Paintbrush");
  palette: Item = Item.get("Pretentious Palette");
  pail: Item = Item.get("Pail of Pretentious Paint");

  level(): number {
    return 1;
  }

  getId(): QuestType {
    return "NPC / Painter";
  }

  getLocations(): Location[] {
    return [];
  }

  free(): boolean {
    return true;
  }

  mustBeDone(): boolean {
    return true;
  }

  status(): QuestStatus {
    if (getProperty("questM02Artist") == "finished") {
      return QuestStatus.COMPLETED;
    }

    // Don't start it since it's not a free turn
    // User has to start it.
    if (getProperty("questM02Artist") == "unstarted") {
      return QuestStatus.COMPLETED;
    }

    if (this.hasAllItems()) {
      return QuestStatus.READY;
    }

    return QuestStatus.NOT_READY;
  }

  startQuest(): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
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
      outfit: GreyOutfit.IGNORE_OUTFIT,
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
    return 1;
  }

  getId(): QuestType {
    return "NPC / Baker";
  }

  getLocations(): Location[] {
    return [];
  }

  free(): boolean {
    return true;
  }

  mustBeDone(): boolean {
    return true;
  }

  status(): QuestStatus {
    if (getProperty("questM25Armorer") != "unstarted") {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  turnInPie(): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        visitUrl("shop.php?whichshop=armory");
        visitUrl("choice.php?whichchoice=" + lastChoice() + "&option=2&pwd=");
      },
    };
  }

  startQuest(): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        visitUrl("shop.php?whichshop=armory");
        visitUrl("shop.php?whichshop=armory&action=talk");
        visitUrl("choice.php?pwd=&whichchoice=1065&option=1");

        if (getProperty("choiceAdventure1061") == "0") {
          setProperty("choiceAdventure1061", "1");
        }
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

  free(): boolean {
    return true;
  }

  mustBeDone(): boolean {
    return true;
  }

  status(): QuestStatus {
    if (getProperty("questM01Untinker") == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("questM01Untinker") == "unstarted") {
      return QuestStatus.READY;
    }

    if (availableAmount(this.item) == 0 && !knollAvailable()) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    if (getProperty("questM01Untinker") == "unstarted") {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          visitUrl(
            "place.php?whichplace=forestvillage&preaction=screwquest&action=fv_untinker_quest"
          );
          setProperty("questM01Untinker", "started");
        },
      };
    }

    if (knollAvailable() && availableAmount(this.item) == 0) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          visitUrl("place.php?whichplace=knoll_friendly&action=dk_innabox");
        },
      };
    }

    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
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
    return 1;
  }

  free(): boolean {
    return true;
  }

  mustBeDone(): boolean {
    return true;
  }

  run(): QuestAdventure {
    if (getProperty("questM23Meatsmith") == "unstarted") {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          visitUrl("shop.php?whichshop=meatsmith");
          visitUrl("shop.php?whichshop=meatsmith&action=talk");
          visitUrl("choice.php?whichchoice=1059&option=1&pwd=");
        },
      };
    }

    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
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
    if (getProperty("questM23Meatsmith") != "unstarted") {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }
}
