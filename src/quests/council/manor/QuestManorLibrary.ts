import {
  availableAmount,
  getProperty,
  haveSkill,
  isBanished,
  Item,
  Location,
  Monster,
  Skill,
  toInt,
  visitUrl,
} from "kolmafia";
import { ResourceCategory } from "../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../typings/TaskInfo";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { currentPredictions } from "../../../utils/GreyUtils";
import { deleteJunkKmails } from "../../../utils/KmailUtils";
import { Macro } from "../../../utils/MacroBuilder";
import { PropertyManager } from "../../../utils/Properties";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestManorLibrary extends TaskInfo implements QuestInfo {
  library: Location = Location.get("The Haunted Library");
  killingJar: Item = Item.get("Killing Jar");
  key: Item = Item.get("[7302]Spookyraven library key");
  librarian: Monster = Monster.get("Banshee Librarian");
  sweep: Skill = Skill.get("System Sweep");
  nano: Skill = Skill.get("Double Nanovision");
  desk: Monster = Monster.get("Writing Desk");
  pathYR: PossiblePath;
  path: PossiblePath;
  paths: PossiblePath[] = [];

  createPaths(assumeUnstarted: boolean) {
    const wantJar =
      this.wantsGnomeKillingJar() &&
      availableAmount(this.killingJar) == 0 &&
      getQuestStatus("questL11Desert") <= 0;
    const desksLeft =
      5 - (assumeUnstarted ? 0 : toInt(getProperty("writingDesksDefeated")));

    this.paths = [];
    this.path = new PossiblePath(desksLeft * 3, desksLeft * 4);
    this.pathYR = new PossiblePath(desksLeft * 2, desksLeft * 3).add(
      ResourceCategory.YELLOW_RAY
    );

    if (wantJar || assumeUnstarted) {
      this.paths.push(this.pathYR);
    }

    this.paths.push(this.path);
  }

  getPossiblePaths() {
    return this.paths;
  }

  getId(): QuestType {
    return "Manor / Library";
  }

  level(): number {
    return 8;
  }

  getGnome(): number {
    return toInt(getProperty("gnasirProgress"));
  }

  wantsGnomeKillingJar(): boolean {
    return (this.getGnome() & 4) != 4;
  }

  status(path: PossiblePath): QuestStatus {
    const status = getQuestStatus("questM20Necklace");

    if (availableAmount(this.key) == 0) {
      return QuestStatus.NOT_READY;
    }

    if (status > 3) {
      return QuestStatus.COMPLETED;
    }

    if (getQuestStatus("questM21Dance") >= 0) {
      return QuestStatus.COMPLETED;
    }

    if (
      path != null &&
      path.canUse(ResourceCategory.YELLOW_RAY) > 0 &&
      !path.getResource(ResourceCategory.YELLOW_RAY).ready()
    ) {
      return QuestStatus.FASTER_LATER;
    }

    if (
      !haveSkill(this.sweep) ||
      (this.wantsKillingJar() && !haveSkill(this.nano))
    ) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  wantsKillingJar(): boolean {
    return (
      this.wantsGnomeKillingJar() &&
      availableAmount(this.killingJar) == 0 &&
      getQuestStatus("questL11Desert") <= 0
    );
  }

  run(path: PossiblePath): QuestAdventure {
    const outfit = new GreyOutfit();
    const wantJar = this.wantsKillingJar();
    const banishLibrarian = !wantJar && !isBanished(this.librarian);
    let resource = wantJar
      ? path.getResource(ResourceCategory.YELLOW_RAY)
      : null;

    if (resource != null && !resource.ready()) {
      resource = null;
    }

    if (wantJar) {
      if (resource != null) {
        resource.prepare(outfit);
      } else if (
        !path.canUse(ResourceCategory.YELLOW_RAY) &&
        (!currentPredictions().has(this.library) ||
          currentPredictions().get(this.library) == this.librarian)
      ) {
        outfit.setItemDrops().setChampagneBottle();
      }
    }

    return {
      location: this.library,
      outfit: outfit,
      orbs: wantJar ? [this.librarian] : [],
      olfaction: [this.desk],
      freeRun: (monster) =>
        monster != this.desk && (!wantJar || monster != this.librarian),
      run: () => {
        const settings = new AdventureSettings();
        const props = new PropertyManager();

        settings.addBanish(Monster.get("bookbat"));

        if (banishLibrarian) {
          settings.addBanish(this.librarian);
        } else if (resource != null) {
          resource.prepare(null, props);

          settings.setFinishingBlowMacro(
            Macro.if_(this.librarian, resource.macro()).skill(
              Skill.get("Infinite Loop")
            )
          );
        }

        props.setChoice(163, 3); // Rare adv that gives an item with 2k autosell, and worth 4-5k in mall
        props.setChoice(888, 4); // Skip
        props.setChoice(889, 5); // Skip

        try {
          greyAdv(this.library, outfit, settings);
        } finally {
          props.resetAll();
        }

        if (toInt(getProperty("writingDesksDefeated")) < 5) {
          return;
        }

        visitUrl("place.php?whichplace=manor1&action=manor1_ladys");
        visitUrl("place.php?whichplace=manor2&action=manor2_ladys");

        deleteJunkKmails();
      },
    };
  }

  getLocations(): Location[] {
    return [this.library];
  }
}
