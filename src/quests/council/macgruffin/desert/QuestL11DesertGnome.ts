import {
  availableAmount,
  getProperty,
  Item,
  itemAmount,
  Location,
  myMeat,
  print,
  retrieveItem,
  setProperty,
  toInt,
  use,
  visitUrl,
} from "kolmafia";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11DesertGnome implements QuestInfo {
  availableProp = "_gnasirAvailable";
  hooks: Item = Item.get("worm-riding hooks");
  drum: Item = Item.get("Drum Machine");
  killingJar: Item = Item.get("Killing Jar");
  rose: Item = Item.get("Stone Rose");

  getId(): QuestType {
    return "Council / MacGruffin / Desert / Gnome";
  }

  level(): number {
    return 11;
  }

  getLocations(): Location[] {
    return [];
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL11Desert");

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    // Can gnome be turned in
    if (!this.isAvailable()) {
      return QuestStatus.NOT_READY;
    }

    if (this.wantsGnomeKillingJar() && availableAmount(this.killingJar) > 0) {
      return QuestStatus.READY;
    }

    if (this.wantsGnomePaint() && myMeat() > 1000) {
      return QuestStatus.READY;
    }

    if (this.wantsGnomeRose() && availableAmount(this.rose) > 0) {
      return QuestStatus.READY;
    }

    if (this.wantsWormPages() && !this.needsMorePages()) {
      return QuestStatus.READY;
    }

    return QuestStatus.NOT_READY;
  }

  mustBeDone(): boolean {
    return true;
  }

  free(): boolean {
    return true;
  }

  run(): QuestAdventure {
    if (this.wantsGnomePaint() && myMeat() >= 1000) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          if (itemAmount(Item.get("Can of black paint")) == 0) {
            retrieveItem(Item.get("Can of black paint"));
          }

          print("Giving gnome their black paint");
          this.turnInItem();
        },
      };
    }

    if (this.wantsGnomeKillingJar() && availableAmount(this.killingJar) > 0) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          print("Giving gnome their killing jar");

          this.turnInItem();
        },
      };
    }

    if (this.wantsWormPages() && !this.needsMorePages()) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          print("Giving gnome their pages");
          this.turnInItem();
        },
      };
    }

    if (this.wantsGnomeRose() && availableAmount(this.rose) > 0) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          print("Giving gnome their rose");
          this.turnInItem();
        },
      };
    }

    throw "Not sure why we got to this state";
  }

  turnInItem() {
    visitUrl("place.php?whichplace=desertbeach&action=db_gnasir");
    visitUrl("choice.php?whichchoice=805&option=1&pwd=");
    visitUrl("choice.php?whichchoice=805&option=2&pwd=");
    visitUrl("choice.php?whichchoice=805&option=1&pwd=");

    const item = Item.get("desert sightseeing pamphlet");

    if (availableAmount(item) <= 0) {
      return;
    }

    use(item, availableAmount(item));
  }

  needsMorePages(): boolean {
    return itemAmount(Item.get("Worm-Riding Manual Page")) < 15;
  }

  isAvailable(): boolean {
    if (getProperty("gnasirProgress") != "0") {
      return true;
    }

    if (getProperty("lastEncounter") == "A Sietch in Time") {
      setProperty(this.availableProp, "true");
    }

    if (getProperty(this.availableProp) == "true") {
      return true;
    }

    if (toInt(getProperty("desertExploration")) <= 10) {
      return false;
    }

    const page = visitUrl("place.php?whichplace=desertbeach");

    if (!page.includes("place.php?whichplace=desertbeach&action=db_gnasir")) {
      return false;
    }

    setProperty(this.availableProp, "true");
    return true;
  }

  getGnome(): number {
    return toInt(getProperty("gnasirProgress"));
  }

  wantsGnomeRose(): boolean {
    return (this.getGnome() & 1) != 1;
  }

  wantsGnomePaint(): boolean {
    return (this.getGnome() & 2) != 2;
  }

  wantsGnomeKillingJar(): boolean {
    return (this.getGnome() & 4) != 4;
  }

  wantsWormPages(): boolean {
    return (this.getGnome() & 8) != 8;
  }

  wantsToWormRide(): boolean {
    return (this.getGnome() & 16) != 16;
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}
