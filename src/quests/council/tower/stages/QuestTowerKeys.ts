import {
  availableAmount,
  cliExecute,
  Item,
  itemAmount,
  Location,
  pullsRemaining,
  retrieveItem,
  storageAmount,
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
import { QuestSkeletonKey } from "../keys/QuestSkeletonKey";
import { QuestStarKey } from "../keys/QuestStarKey";
import { QuestKeyStuffAbstract } from "../../../custom/QuestKeyStuffAbstract";
import { QuestHeroKeys } from "../keys/heroes/QuestHeroKeys";
import { PossiblePath } from "../../../../typings/TaskInfo";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";

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
    new QuestDigitalKey(),
    new QuestHeroKeys(),
  ];

  refreshedStorage: boolean = false;

  getPossiblePaths?(): PossiblePath[];

  getTokensAvailable(): number {
    if (pullsRemaining() == -1 && !this.refreshedStorage) {
      cliExecute("refresh storage");
      this.refreshedStorage = true;
    }

    return (
      itemAmount(this.token) +
      (pullsRemaining() == -1 ? storageAmount(this.token) : 0)
    );
  }

  isReadyToRedeemTokens(): boolean {
    const keysAvailable = this.keys.filter(
      (k) => availableAmount(k) > 0
    ).length;

    if (keysAvailable >= 3) {
      return false;
    }

    return keysAvailable + this.getTokensAvailable() >= 3;
  }

  redeemKeys(): QuestAdventure {
    const keys = this.keys.filter((k) => availableAmount(k) == 0);

    return {
      location: null,
      run: () => {
        for (const k of keys) {
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
    const used = this.getKeysUsed();

    return this.keyItems.filter((k) => !used.includes(k[1]));
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL13Final");

    if (status < 5) {
      return QuestStatus.NOT_READY;
    }

    if (status > 5) {
      return QuestStatus.COMPLETED;
    }

    if (this.isReadyToRedeemTokens()) {
      return QuestStatus.READY;
    }

    if (this.getNotDone().find(([, item]) => itemAmount(item) == 0) != null) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    if (this.isReadyToRedeemTokens()) {
      return this.redeemKeys();
    }

    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        const notDone = this.getNotDone();

        for (const s of notDone) {
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
