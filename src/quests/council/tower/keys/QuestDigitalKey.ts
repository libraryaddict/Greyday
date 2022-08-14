import {
  Location,
  Item,
  availableAmount,
  getProperty,
  visitUrl,
  runChoice,
  handlingChoice,
  itemAmount,
  create,
  Monster,
  pullsRemaining,
  cliExecute,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";
import { GreySettings } from "../../../../utils/GreySettings";

export class QuestDigitalKey implements QuestInfo {
  location: Location = Location.get("8-Bit Realm");
  wPixel: Item = Item.get("White Pixel");
  rPixel: Item = Item.get("Red Pixel");
  gPixel: Item = Item.get("Green Pixel");
  bPixel: Item = Item.get("Blue Pixel");
  transfomer: Item = Item.get("continuum transfunctioner");
  key: Item = Item.get("Digital key");

  level(): number {
    return 4;
  }

  atDoor(): boolean {
    return getQuestStatus("questL13Final") == 5;
  }

  status(): QuestStatus {
    if (
      getQuestStatus("questL13Final") > 5 ||
      availableAmount(this.key) > 0 ||
      getProperty("nsTowerDoorKeysUsed").includes(this.key.name)
    ) {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.transfomer) == 0) {
      return QuestStatus.READY;
    }

    const status = getQuestStatus("questL13Final");

    // If we're not at the keys, don't farm yet. We can still hit it from powerful glove
    if (status < 5) {
      return QuestStatus.NOT_READY;
    }

    // If we can make white pixels, or we have enough pixels
    if (this.needPixels() - this.canMakePixelCount() <= 0) {
      return QuestStatus.READY;
    }

    if (GreySettings.shouldAvoidTowerRequirements() && pullsRemaining() != -1) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  canMakePixels(): boolean {
    return this.canMakePixelCount() > 0;
  }

  canMakePixelCount(): number {
    return Math.min(
      itemAmount(this.rPixel),
      itemAmount(this.bPixel),
      itemAmount(this.gPixel)
    );
  }

  needPixels(): number {
    return Math.max(0, 30 - itemAmount(this.wPixel));
  }

  run(): QuestAdventure {
    if (availableAmount(this.transfomer) == 0) {
      return {
        location: null,
        run: () => {
          visitUrl("place.php?whichplace=forestvillage&action=fv_mystic");

          while (handlingChoice()) {
            runChoice(1);
          }
        },
      };
    }

    if (
      this.needPixels() - this.canMakePixelCount() <= 0 &&
      this.needPixels() > 0
    ) {
      return {
        location: null,
        run: () => {
          const toMake = Math.min(
            itemAmount(this.rPixel),
            itemAmount(this.gPixel),
            itemAmount(this.bPixel),
            this.needPixels()
          );

          create(this.wPixel, toMake);
        },
      };
    }

    if (this.needPixels() <= 0 || pullsRemaining() == -1) {
      return {
        location: null,
        run: () => {
          cliExecute("acquire " + this.key);
        },
      };
    }

    const outfit = new GreyOutfit().setItemDrops();
    outfit.addItem(this.transfomer);
    const settings = new AdventureSettings();
    settings.addNoBanish(Monster.get("Blooper"));
    settings.addNoBanish(Monster.get("Buzzy Beetle"));
    settings.addNoBanish(Monster.get("Goomba"));
    settings.addNoBanish(Monster.get("Koopa Troopa"));
    settings.addNoBanish(Monster.get("Tektite"));

    return {
      location: this.location,
      outfit: outfit,
      run: () => {
        greyAdv(this.location, outfit, settings);
      },
    };
  }

  getId(): QuestType {
    return "Council / Tower / Keys / Digital";
  }

  getLocations(): Location[] {
    // Don't hog this location when we're not sure we need to
    if (!this.atDoor()) {
      return [];
    }

    return [this.location];
  }
}
