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
    const status = this.getStatus();

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

  mustBeDone(): boolean {
    return (
      this.hasEverything() && this.getStatus() == MountainStatus.TRAPPER_DEMANDS
    );
  }

  free(): boolean {
    return this.mustBeDone();
  }

  getOreRemaining(): number {
    return 3 - availableAmount(this.neededOre());
  }

  neededOre(): Item {
    return Item.get(getProperty("trapperOre") || "asbestos ore");
  }

  talkTrapper() {
    visitUrl("place.php?whichplace=mclargehuge&action=trappercabin");
  }

  hasEverything(): boolean {
    return availableAmount(this.cheese) >= 3 && this.getOreRemaining() <= 0;
  }

  run(): QuestAdventure {
    if (this.hasEverything()) {
      return {
        location: null,
        run: () => {
          this.talkTrapper();
        },
      };
    }

    const outfit = new GreyOutfit().setItemDrops();

    return {
      location: this.goats,
      outfit: outfit,
      orbs: haveSkill(this.elementalSkill) ? null : [this.drunk],
      olfaction: availableAmount(this.cheese) >= 3 ? null : [this.dairy],
      run: () => {
        const settings = new AdventureSettings();

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

        if (this.hasEverything()) {
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
