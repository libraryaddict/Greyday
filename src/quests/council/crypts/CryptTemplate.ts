import {
  Item,
  availableAmount,
  retrieveItem,
  getProperty,
  cliExecute,
  myMeat,
  Location,
  toInt,
  equip,
} from "kolmafia";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  GreyPulls,
  ResourceClaim,
  ResourcePullClaim,
} from "../../../utils/GreyResources";
import { GreySettings } from "../../../utils/GreySettings";
import { QuestInfo, QuestStatus, QuestAdventure } from "../../Quests";
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
  boatResource: ResourceClaim = new ResourcePullClaim(
    this.gravyboat,
    "Crypt Evil Supression",
    10
  );

  getResourceClaims() {
    return [this.boatResource];
  }

  getSword(): Item {
    let items = this.swords.filter((i) => availableAmount(i) > 0);

    if (items.length == 0) {
      retrieveItem(Item.get("sweet ninja sword"));

      return this.getSword();
    }

    return items[0];
  }

  level(): number {
    return 7;
  }

  abstract getProperty(): string;

  addRetroSword(outfit: GreyOutfit = new GreyOutfit()): GreyOutfit {
    outfit.addItem(this.gravyboat, 99999);

    if (availableAmount(this.cape) > 0) {
      outfit.addItem(this.getSword(), 99999);
      outfit.addBonus("-back");
    }

    if (
      availableAmount(this.gravyboat) == 0 &&
      !GreySettings.isHardcoreMode()
    ) {
      GreyPulls.pullCrypts();
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

  abstract run(): QuestAdventure;

  abstract getId(): QuestType;

  abstract getLocations(): Location[];

  getStatus(): CryptStatus {
    let num = toInt(getProperty(this.getProperty()));

    if (num > 25) {
      return CryptStatus.FIGHT;
    }

    if (num <= 0) {
      return CryptStatus.FINISHED;
    }

    return CryptStatus.BOSS;
  }
}
