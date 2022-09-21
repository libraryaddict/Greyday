import {
  availableAmount,
  cliExecute,
  equip,
  getProperty,
  Item,
  Location,
  myMeat,
  retrieveItem,
  toInt,
} from "kolmafia";
import { PossiblePath } from "../../../typings/TaskInfo";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { GreyPulls } from "../../../utils/GreyResources";
import { GreySettings } from "../../../utils/GreySettings";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { CryptStatus } from "../QuestL7Crypt";

export abstract class CryptL7Template implements QuestInfo {
  swords: Item[] = [
    "ebony epee",
    "antique machete",
    "black sword",
    "broken sword",
    "cardboard katana",
    "cardboard wakizashi",
    "knob goblin deluxe scimitar",
    "knob goblin scimitar",
    "lupine sword",
    "muculent machete",
    "serpentine sword",
    "vorpal blade",
    "white sword",
    "sweet ninja sword",
  ].map((s) => Item.get(s));
  cape: Item = Item.get("Unwrapped knock-off retro superhero cape");
  gravyboat: Item = Item.get("Gravy Boat");

  getSword(): Item {
    const items = this.swords.filter((i) => availableAmount(i) > 0);

    if (items.length == 0 && myMeat() >= 100) {
      retrieveItem(Item.get("sweet ninja sword"));

      return this.getSword();
    }

    return items[0];
  }

  level(): number {
    return availableAmount(this.cape) > 0 ? 7 : 9;
  }

  abstract getProperty(): string;

  addRetroSword(outfit: GreyOutfit = new GreyOutfit()): GreyOutfit {
    outfit.addItem(this.gravyboat, 99999);

    if (availableAmount(this.cape) > 0) {
      outfit.addItem(this.getSword(), 99999);
      outfit.addBonus("-back");
    }

    return outfit;
  }

  adjustRetroCape() {
    if (availableAmount(this.cape) == 0) {
      return;
    }

    equip(this.cape);

    if (
      getProperty("retroCapeSuperhero") == "vampire" &&
      getProperty("retroCapeWashingInstructions") == "kill"
    ) {
      return;
    }

    cliExecute("retrocape vampire kill");
  }

  status(): QuestStatus {
    if (getProperty("questL07Cyrptic") == "unstarted") {
      return QuestStatus.NOT_READY;
    }

    if (this.getStatus() == CryptStatus.FINISHED) {
      return QuestStatus.COMPLETED;
    }

    if (this.getSword() == null && myMeat() < 300) {
      return QuestStatus.NOT_READY;
    }

    return this.cryptStatus();
  }

  abstract cryptStatus(): QuestStatus;

  abstract run(path?: PossiblePath): QuestAdventure;

  abstract getId(): QuestType;

  abstract getLocations(): Location[];

  getStatus(): CryptStatus {
    const num = toInt(getProperty(this.getProperty()));

    if (num > 25) {
      return CryptStatus.FIGHT;
    }

    if (num <= 0) {
      return CryptStatus.FINISHED;
    }

    return CryptStatus.BOSS;
  }
}
