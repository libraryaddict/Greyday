import {
  availableAmount,
  getProperty,
  Item,
  Location,
  print,
  retrieveItem,
  visitUrl,
} from "kolmafia";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";
import { QuestDigitalKey } from "../keys/QuestDigitalKey";
import { QuestDailyDungeon } from "../keys/QuestDailyDungeon";
import { QuestSkeletonKey } from "../keys/QuestSkeletonKey";
import { QuestStarKey } from "../keys/QuestStarKey";
import { QuestKeyStuffAbstract } from "../../../custom/QuestKeyStuffAbstract";

export class QuestTowerKeys extends QuestKeyStuffAbstract implements QuestInfo {
  keyItems: [string, Item][] = [
    ["ns_lock1", Item.get("Boris's Key")],
    ["ns_lock2", Item.get("Jarlsberg's Key")],
    ["ns_lock3", Item.get("Sneaky Pete's Key")],
    ["ns_lock4", Item.get("Richard's Star Key")],
    ["ns_lock5", Item.get("Digital Key")],
    ["ns_lock6", Item.get("Skeleton Key")],
  ];
  children: QuestInfo[] = [
    new QuestSkeletonKey(),
    new QuestStarKey(),
    new QuestDailyDungeon(),
    new QuestDigitalKey(),
  ];

  isReadyToRedeemTokens(): boolean {
    let keys = this.keys.filter((k) => availableAmount(k) > 0);

    if (keys.length >= 3) {
      return false;
    }

    if (availableAmount(this.token) + keys.length < 3) {
      return false;
    }

    return true;
  }

  redeemKeys(): QuestAdventure {
    let keys = this.keys.filter((k) => availableAmount(k) == 0);

    return {
      location: null,
      run: () => {
        for (let k of keys) {
          retrieveItem(k);
        }
      },
    };
  }

  getId(): QuestType {
    return "Council / Tower / KeyDoor";
  }

  getChildren(): QuestInfo[] {
    return this.children;
  }

  getLocations(): Location[] {
    return [];
  }

  level(): number {
    return 13;
  }

  getNotDone(): [string, Item][] {
    let used = this.getKeysUsed();

    return this.keyItems.filter((k) => !used.includes(k[1]));
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL13Final");

    if (status < 5) {
      return QuestStatus.NOT_READY;
    }

    if (status > 5) {
      return QuestStatus.COMPLETED;
    }

    if (this.isReadyToRedeemTokens()) {
      return QuestStatus.READY;
    }

    let notDone = this.getNotDone();

    if (
      notDone.length == 0 ||
      notDone.filter((s) => availableAmount(s[1]) > 0).length > 0
    ) {
      return QuestStatus.READY;
    }

    return QuestStatus.NOT_READY;
  }

  run(): QuestAdventure {
    if (this.isReadyToRedeemTokens()) {
      return this.redeemKeys();
    }

    return {
      location: null,
      run: () => {
        let notDone = this.getNotDone();

        for (let s of notDone) {
          if (availableAmount(s[1]) == 0) {
            continue;
          }

          visitUrl("place.php?whichplace=nstower_door&action=" + s[0]);
        }

        visitUrl("place.php?whichplace=nstower_door&action=ns_doorknob");
      },
    };
  }
}
