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
      availableAmount(this.killingJar) > 0 && !isBanished(this.librarian);

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

        greyAdv(this.library, null, settings);
      },
    };
  }

  getLocations(): Location[] {
    return [this.library];
  }
}
