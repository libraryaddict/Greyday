import {
  availableAmount,
  getProperty,
  haveSkill,
  Item,
  Location,
  Monster,
  Skill,
  visitUrl,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { MountainStatus } from "../QuestL8IcePeak";

export class QuestL8MountainGoats implements QuestInfo {
  goats: Location = Location.get("The Goatlet");
  cheese: Item = Item.get("Goat Cheese");
  dairy: Monster = Monster.get("Dairy Goat");
  elementalSkill: Skill = Skill.get("Secondary Fermentation");
  drunk: Monster = Monster.get("Drunk Goat");
  sysSweep: Skill = Skill.get("System Sweep");

  getId(): QuestType {
    return "Council / Ice / Goats";
  }

  level(): number {
    return 8;
  }

  status(): QuestStatus {
    let status = this.getStatus();

    if (status < MountainStatus.TRAPPER_DEMANDS) {
      return QuestStatus.NOT_READY;
    }

    if (haveSkill(this.elementalSkill)) {
      if (status > MountainStatus.TRAPPER_DEMANDS) {
        return QuestStatus.COMPLETED;
      }

      // If we have our cheese but not the ores
      if (availableAmount(this.cheese) >= 3 && this.getOreRemaining() > 0) {
        return QuestStatus.COMPLETED;
      }
    }

    if (!haveSkill(this.sysSweep)) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  getOreRemaining(): number {
    return 3 - availableAmount(this.neededOre());
  }

  neededOre(): Item {
    return Item.get(getProperty("trapperOre"));
  }

  talkTrapper() {
    visitUrl("place.php?whichplace=mclargehuge&action=trappercabin");
  }

  run(): QuestAdventure {
    if (availableAmount(this.cheese) >= 3 && haveSkill(this.elementalSkill)) {
      return {
        location: null,
        run: () => {
          this.talkTrapper();
        },
      };
    }

    let outfit = new GreyOutfit().setItemDrops();

    return {
      location: this.goats,
      outfit: outfit,
      run: () => {
        let settings = new AdventureSettings();

        if (!haveSkill(this.elementalSkill)) {
          settings.addNoBanish(this.drunk);
        }

        if (
          availableAmount(this.cheese) < 3 &&
          this.getStatus() <= MountainStatus.TRAPPER_DEMANDS
        ) {
          settings.addNoBanish(this.dairy);
        }

        greyAdv(this.goats, outfit, settings);

        if (availableAmount(this.cheese) >= 3 && this.getOreRemaining() <= 0) {
          this.talkTrapper();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.goats];
  }

  getStatus(): MountainStatus {
    return getQuestStatus("questL08Trapper");
  }
}
