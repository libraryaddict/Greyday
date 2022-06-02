import {
  availableAmount,
  create,
  getProperty,
  Item,
  knollAvailable,
  Location,
  Monster,
  myAscensions,
  myLevel,
  myMeat,
  outfit,
  retrieveItem,
  toInt,
  use,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { GreySettings } from "../../utils/GreySettings";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestCar implements QuestInfo {
  tinkersThingy: Location = Location.get("The Degrassi Knoll Garage");
  bitchCar: Item = Item.get("Bitchin' meatcar");
  toolbox: Item = Item.get("Gnollish toolbox");
  sweetRims: Item = Item.get("Sweet Rims");
  dopeWheels: Item = Item.get("Dope Wheels");
  bugbear: Monster = Monster.get("Guard Bugbear");

  level(): number {
    return 11;
  }

  tryMakeBitchCar() {
    if (availableAmount(this.toolbox) > 0) {
      use(this.toolbox, availableAmount(this.toolbox));
    }

    if (
      availableAmount(this.dopeWheels) + availableAmount(this.sweetRims) ==
      0
    ) {
      retrieveItem(this.sweetRims);
    }

    create(this.bitchCar);
  }

  hasBoat(): boolean {
    return toInt(getProperty("lastIslandUnlock")) == myAscensions();
  }

  status(): QuestStatus {
    if (
      toInt(getProperty("lastDesertUnlock")) == myAscensions() ||
      !knollAvailable()
    ) {
      return QuestStatus.COMPLETED;
    }

    if (myMeat() < 700) {
      return QuestStatus.NOT_READY;
    }

    if (knollAvailable()) {
      return QuestStatus.READY;
    }

    /*if (
      myLevel() < 11 ||
      !GreySettings.isHippyMode() ||
      (this.hasBoat() && getQuestStatus("questL11Black") <= 1)
    ) {
      return QuestStatus.FASTER_LATER;
    }*/

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    //if (knollAvailable()) {
    return {
      location: null,
      outfit: new GreyOutfit("-tie"),
      run: () => {
        this.tryMakeBitchCar();
      },
    };
    /*}

    let outfit = new GreyOutfit().setItemDrops();

    return {
      outfit: outfit,
      location: this.tinkersThingy,
      run: () => {
        greyAdv(
          this.tinkersThingy,
          outfit,
          new AdventureSettings().addBanish(this.bugbear)
        );

        this.tryMakeBitchCar();
      },
    };*/
  }

  getId(): QuestType {
    return "Misc / MeatCar";
  }

  getLocations(): Location[] {
    return [this.tinkersThingy];
  }
}
