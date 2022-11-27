import {
  pullsRemaining,
  Location,
  Item,
  availableAmount,
  getZapWand,
  zap,
  itemAmount,
} from "kolmafia";
import { ResourceCategory } from "../../../../../typings/ResourceTypes";
import { PossiblePath } from "../../../../../typings/TaskInfo";
import { GreyOutfit } from "../../../../../utils/GreyOutfitter";
import { GreyPulls } from "../../../../../utils/GreyResources";
import { GreySettings } from "../../../../../utils/GreySettings";
import { getAllCombinations, hasPulled } from "../../../../../utils/GreyUtils";
import { QuestKeyStuffAbstract } from "../../../../custom/QuestKeyStuffAbstract";
import {
  QuestStatus,
  getQuestStatus,
  QuestAdventure,
} from "../../../../Quests";
import { QuestType } from "../../../../QuestTypes";
import { HeroKeysTemplate } from "./HeroKeysTemplate";

export class QuestPullAndZapKeys
  extends QuestKeyStuffAbstract
  implements HeroKeysTemplate
{
  paths: PossiblePath[];
  keysToAcquire: number;

  constructor(keys: number) {
    super();

    if (keys > 2) {
      throw "We can't do more than 2 zaps!";
    }

    this.keysToAcquire = keys;
  }

  getKeys(): number {
    return this.keysToAcquire;
  }

  getId(): QuestType {
    return "Council / Tower / Keys / Heroes / Buy and Zap Keys";
  }

  createPaths(assumeUnstarted: boolean): void {
    if (
      this.keysToAcquire == 0 ||
      (!assumeUnstarted && GreySettings.isHardcoreMode())
    ) {
      this.paths = null;
      return;
    }

    let pullableKeys: Item[] = GreyPulls.getPullableKeys();

    if (!assumeUnstarted && pullsRemaining() >= 0) {
      pullableKeys = pullableKeys.filter(
        (i) => !hasPulled(i) || availableAmount(i) > 0
      );
    } else {
      // Since we have unlimited pulls..
      for (let i = 1; i < Math.min(2, this.keysToAcquire); i++) {
        pullableKeys.push(...GreyPulls.getPullableKeys());
      }
    }

    if (pullableKeys.length < this.keysToAcquire) {
      this.paths = null;
      return;
    }

    this.paths = [];

    for (const combination of getAllCombinations(pullableKeys)) {
      if (combination.length != this.keysToAcquire) {
        continue;
      }

      const path = new PossiblePath(0);

      combination.forEach((i) => {
        path.addConsumablePull(i);

        path.add(ResourceCategory.ZAP);
      });

      this.paths.push(path);
    }
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  level(): number {
    return 8;
  }

  status(path: PossiblePath): QuestStatus {
    if (this.keysToAcquire == 0) {
      return QuestStatus.COMPLETED;
    }

    const status = getQuestStatus("questL13Final");

    if (status < 5 || path == null) {
      return QuestStatus.NOT_READY;
    }

    if (status > 5) {
      return QuestStatus.COMPLETED;
    }

    if (!path.canUse(ResourceCategory.PULL)) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(path: PossiblePath): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        const wand = getZapWand();

        if (wand == Item.none) {
          throw "Expected a wand! What happened!";
        }

        const toPull = path.pulls.find((i) => !hasPulled(i));

        if (toPull == null) {
          throw "Failed to find a zappable key to pull?";
        }

        GreyPulls.tryRetrieve(toPull, 80000);

        if (itemAmount(toPull) == 0) {
          throw "Expected to have a zappable key grabbed";
        }

        const toZap = this.getOwnedZappables();
        const zapped = zap(toZap[0]);

        if (!this.keys.includes(zapped)) {
          throw (
            "Ugh, we failed to zap " +
            toZap[0] +
            " properly. We got " +
            zapped +
            " instead."
          );
        }
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
