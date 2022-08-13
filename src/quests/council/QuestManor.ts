import { availableAmount, Item, Location, print, visitUrl } from "kolmafia";
import { greyAdv } from "../../utils/GreyLocations";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { QuestType } from "../QuestTypes";
import { ManorBathroom } from "./manor/QuestManorBathroom";
import { ManorBedroom } from "./manor/QuestManorBedroom";
import { QuestManorBillards } from "./manor/QuestManorBillards";
import { ManorGallery } from "./manor/QuestManorGallery";
import { QuestManorKitchen } from "./manor/QuestManorKitchen";
import { QuestManorLibrary } from "./manor/QuestManorLibrary";

export class QuestManor implements QuestInfo {
  quests: QuestInfo[] = [
    new ManorBathroom(),
    new ManorBedroom(),
    new ManorGallery(),
    new QuestManorLibrary(),
    new QuestManorKitchen(),
    new QuestManorBillards(),
  ];

  puff: Item = Item.get("Lady Spookyraven's powder puff");
  gown: Item = Item.get("Lady Spookyraven's finest gown");
  shoes: Item = Item.get("Lady Spookyraven's dancing shoes");
  ballroom: Location = Location.get("The Haunted Ballroom");

  level(): number {
    return 8;
  }

  getId(): QuestType {
    return "Manor / Chat";
  }

  getManorStatus(): ManorStatus {
    return getQuestStatus("questM20Necklace");
  }

  getDanceStatus(): DanceStatus {
    return getQuestStatus("questM21Dance");
  }

  status(): QuestStatus {
    let danceStatus = this.getDanceStatus();

    if (danceStatus == DanceStatus.finished) {
      return QuestStatus.COMPLETED;
    }

    if (getQuestStatus("questM20Necklace") < 4) {
      return QuestStatus.NOT_READY;
    }

    if (getQuestStatus("questM20Necklace") != 100) {
      return QuestStatus.READY;
    }

    if (danceStatus == DanceStatus.readyToDance) {
      return QuestStatus.READY;
    }

    if (
      availableAmount(this.puff) +
        availableAmount(this.gown) +
        availableAmount(this.shoes) !=
      3
    ) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  mustBeDone(): boolean {
    return true;
  }

  run(): QuestAdventure {
    if (getQuestStatus("questM20Necklace") < 100) {
      return this.doUpstairs();
    }

    return {
      location: null,
      run: () => {
        visitUrl("place.php?whichplace=manor2&action=manor2_ladys");
        greyAdv(this.ballroom);
        visitUrl("place.php?whichplace=manor3&action=manor3_ladys");
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  getChildren(): QuestInfo[] {
    return this.quests;
  }

  doUpstairs(): QuestAdventure {
    return {
      location: null,
      run: () => {
        print("Lets chat up the old lady");
        visitUrl("place.php?whichplace=manor1&action=manor1_ladys");
        visitUrl("place.php?whichplace=manor2&action=manor2_ladys");
      },
    };
  }

  needAdventures(): number {
    return 0;
  }
}

enum ManorStatus {
  unstarted = -1,
  DOING_KITCHEN = 0,
  HAVE_POOL_KEY = 1,
  HAVE_POOL_CUE = 2,
  HAVE_LIBRARY_KEY = 3,
  HAVE_UPSTAIRS_KEY = 4,
  GOING_UPSTAIRS = 5,
  finished = 100,
}

enum DanceStatus {
  unstarted = -1,
  started = 0,
  wantsToDance = 1,
  hasAllThreeItems = 2,
  readyToDance = 3,
  finished = 100,
}
