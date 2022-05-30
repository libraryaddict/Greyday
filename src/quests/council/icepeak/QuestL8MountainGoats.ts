import {
  Location,
  Item,
  Familiar,
  availableAmount,
  getProperty,
  visitUrl,
  Monster,
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

    if (status > MountainStatus.TRAPPER_DEMANDS) {
      return QuestStatus.COMPLETED;
    }

    // If we have our cheese but not the ores
    if (availableAmount(this.cheese) >= 3 && this.getOreRemaining() > 0) {
      return QuestStatus.NOT_READY;
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
    if (availableAmount(this.cheese) >= 3) {
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
        greyAdv(
          this.goats,
          outfit,
          new AdventureSettings().addNoBanish(this.dairy)
        );

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
