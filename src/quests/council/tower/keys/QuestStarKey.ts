import {
  availableAmount,
  getProperty,
  Item,
  Location,
  Monster,
  pullsRemaining,
  retrieveItem,
} from "kolmafia";
import { greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { GreySettings } from "../../../../utils/GreySettings";
import { PropertyManager } from "../../../../utils/Properties";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestStarKey implements QuestInfo {
  location: Location = Location.get("The Hole in the sky");
  rocket: Item = Item.get("steam-powered model rocketship");
  star: Item = Item.get("Star");
  map: Item = Item.get("Star Chart");
  line: Item = Item.get("Line");
  key: Item = Item.get("Richard's star key");
  holeInSky: QuestInfo = new QuestTowerHoleInSkyUnlock();
  toAbsorb: Monster[];

  getChildren(): QuestInfo[] {
    return [this.holeInSky];
  }

  level(): number {
    return 8;
  }

  status(): QuestStatus {
    if (
      getQuestStatus("questL13Final") > 5 ||
      availableAmount(this.key) > 0 ||
      getProperty("nsTowerDoorKeysUsed").includes(this.key.name)
    ) {
      return QuestStatus.COMPLETED;
    }

    if (
      !this.hasEnoughMaterials() &&
      GreySettings.shouldAvoidTowerRequirements()
    ) {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.rocket) == 0) {
      return QuestStatus.NOT_READY;
    }

    /*if (getQuestStatus("questL13Final") < 5) {
      return QuestStatus.NOT_READY;
    }*/

    if (
      this.toAbsorb.length == 0 &&
      GreySettings.shouldAvoidTowerRequirements() &&
      getProperty("_greyReachedTower") != "true"
    ) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  hasEnoughMaterials() {
    return (
      pullsRemaining() == -1 ||
      (availableAmount(this.map) > 0 &&
        availableAmount(this.line) >= 7 &&
        availableAmount(this.star) >= 8)
    );
  }

  run(): QuestAdventure {
    if (this.hasEnoughMaterials()) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          retrieveItem(this.key);
        },
      };
    }

    const outfit = new GreyOutfit().setItemDrops();

    return {
      location: this.location,
      outfit: outfit,
      run: () => {
        greyAdv(this.location, outfit);
      },
    };
  }

  getId(): QuestType {
    return "Council / Tower / Keys / Star";
  }

  getLocations(): Location[] {
    return [this.location];
  }
}

export class QuestTowerHoleInSkyUnlock implements QuestInfo {
  topFloor: Location = Location.get(
    "The Castle in the Clouds in the Sky (Top Floor)"
  );
  rocket: Item = Item.get("steam-powered model rocketship");
  copperFeel: number = 677;
  flavorOfARaver: number = 676;
  yeahPunkRock: number = 678;
  gothNC: number = 675;

  getId(): QuestType {
    return "Council / Tower / Keys / HoleInSkyUnlock";
  }

  level(): number {
    return 8;
  }

  status(): QuestStatus {
    if (getProperty("questL10Garbage") != "finished") {
      return QuestStatus.NOT_READY;
    }

    if (
      getQuestStatus("questL13Final") > 5 ||
      availableAmount(this.rocket) > 0
    ) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit().setNoCombat();

    return {
      location: this.topFloor,
      outfit: outfit,
      freeRun: () => true,
      run: () => {
        const props = new PropertyManager();

        props.setChoice(this.copperFeel, 2); // Grab rocket
        props.setChoice(this.gothNC, 4); // Crawl to steam
        props.setChoice(this.yeahPunkRock, 3); // Crawl to steam
        props.setChoice(this.flavorOfARaver, 4); // Crawl to punk

        try {
          greyAdv(this.topFloor, outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
