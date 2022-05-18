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
  book: Item = Item.get("Familiar scrapbook");
  banisher: Skill = Skill.get("Show Your Boring Familiar Pictures");
  sweep: Skill = Skill.get("System Sweep");

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

    if (!haveSkill(this.sweep)) {
      return QuestStatus.FASTER_LATER;
    }

    if (
      toInt(getProperty("scrapbookCharges")) < 100 &&
      !isBanished(this.librarian)
    ) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();
    let banishLibrarian =
      availableAmount(this.killingJar) > 0 &&
      !isBanished(this.librarian) &&
      toInt(getProperty("scrapbookCharges")) >= 100;

    if (banishLibrarian) {
      outfit.addItem(this.book);
    }

    return {
      location: this.library,
      run: () => {
        let settings = new AdventureSettings();

        if (banishLibrarian) {
          settings.setStartOfFightMacro(
            Macro.if_(this.librarian, Macro.skill(this.banisher))
          );
        } else if (availableAmount(this.killingJar) > 0) {
          settings.addBanish(this.librarian);
        }

        settings.addBanish(Monster.get("bookbat"));

        greyAdv(this.library, null, settings);
      },
    };
  }

  getLocations(): Location[] {
    return [this.library];
  }
}
