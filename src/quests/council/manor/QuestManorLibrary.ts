import {
  availableAmount,
  Familiar,
  getProperty,
  haveSkill,
  isBanished,
  Item,
  Location,
  Monster,
  print,
  Skill,
  toInt,
  toItem,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { Macro } from "../../../utils/MacroBuilder";
import { PropertyManager } from "../../../utils/Properties";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestManorLibrary implements QuestInfo {
  library: Location = Location.get("The Haunted Library");
  killingJar: Item = Item.get("Killing Jar");
  key: Item = Item.get("[7302]Spookyraven library key");
  librarian: Monster = Monster.get("Banshee Librarian");
  sweep: Skill = Skill.get("System Sweep");
  nano: Skill = Skill.get("Double Nanovision");

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

  status(): QuestStatus {
    let status = getQuestStatus("questM20Necklace");

    if (availableAmount(this.key) == 0) {
      return QuestStatus.NOT_READY;
    }

    if (status > 3) {
      return QuestStatus.COMPLETED;
    }

    if (getQuestStatus("questM21Dance") >= 0) {
      return QuestStatus.COMPLETED;
    }

    if (!haveSkill(this.sweep) || !haveSkill(this.nano)) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();
    let banishLibrarian =
      (!this.wantsGnomeKillingJar() || availableAmount(this.killingJar) > 0) &&
      !isBanished(this.librarian);

    if (!banishLibrarian) {
      outfit.setItemDrops();
    }

    return {
      location: this.library,
      outfit,
      run: () => {
        let settings = new AdventureSettings();

        settings.addBanish(Monster.get("bookbat"));

        if (banishLibrarian) {
          settings.addBanish(this.librarian);
        } else if (haveSkill(this.nano)) {
          settings.setFinishingBlowMacro(Macro.skill(this.nano));
        }

        let props = new PropertyManager();
        props.setChoice(163, 3); // Rare adv that gives an item with 2k autosell, and worth 4-5k in mall
        props.setChoice(888, 4); // Skip
        props.setChoice(889, 5); // Skip

        try {
          greyAdv(this.library, null, settings);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.library];
  }
}
