import {
  Location,
  Item,
  retrieveItem,
  availableAmount,
  getProperty,
  myMeat,
  pullsRemaining,
  canAdventure,
  cliExecute,
} from "kolmafia";
import { greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { canGreyAdventure } from "../../../../utils/GreyUtils";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestSkeletonKey implements QuestInfo {
  key: Item = Item.get("Skeleton Key");
  bone: Item = Item.get("skeleton bone");
  teeth: Item = Item.get("loose teeth");
  location: Location = Location.get(" The Skeleton Store");
  priceTag: Item = Item.get("bone with a price tag on it");

  getId(): QuestType {
    return "Council / Tower / Keys / Skeleton";
  }

  level(): number {
    return 7;
  }

  status(): QuestStatus {
    if (
      getQuestStatus("questL13Final") > 5 ||
      availableAmount(this.key) > 0 ||
      getProperty("nsTowerDoorKeysUsed").includes(this.key.name)
    ) {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.bone) > 0 && availableAmount(this.teeth) > 0) {
      if (myMeat() > 100) {
        return QuestStatus.READY;
      } else {
        return QuestStatus.NOT_READY;
      }
    }

    if (pullsRemaining() == -1) {
      return QuestStatus.READY;
    }

    if (!canGreyAdventure(this.location)) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.FASTER_LATER;
  }

  mustBeDone(): boolean {
    return (
      pullsRemaining() == -1 ||
      (availableAmount(this.bone) > 0 && availableAmount(this.teeth) > 0)
    );
  }

  free(): boolean {
    return this.mustBeDone();
  }

  run(): QuestAdventure {
    if (
      pullsRemaining() == -1 ||
      (availableAmount(this.bone) > 0 && availableAmount(this.teeth) > 0)
    ) {
      return this.craft();
    }

    return this.adventure();
  }

  craft(): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        cliExecute("acquire " + this.key);

        if (availableAmount(this.key) == 0) {
          throw "Failed to acquire " + this.key;
        }
      },
    };
  }

  adventure(): QuestAdventure {
    const outfit = new GreyOutfit().setItemDrops();

    return {
      location: this.location,
      outfit: outfit,
      run: () => {
        greyAdv(this.location, outfit);
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
