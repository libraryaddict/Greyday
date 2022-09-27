import {
  pullsRemaining,
  Location,
  Item,
  availableAmount,
  getZapWand,
  toInt,
  visitUrl,
  zap,
  Familiar,
  Monster,
} from "kolmafia";
import { ResourceCategory } from "../../../../../typings/ResourceTypes";
import { PossiblePath } from "../../../../../typings/TaskInfo";
import { GreyOutfit } from "../../../../../utils/GreyOutfitter";
import { GreyPulls } from "../../../../../utils/GreyResources";
import { GreySettings } from "../../../../../utils/GreySettings";
import { getAllCombinations, hasPulled } from "../../../../../utils/GreyUtils";
import { QuestKeyStuffAbstract } from "../../../../custom/QuestKeyStuffAbstract";
import {
  QuestInfo,
  QuestStatus,
  getQuestStatus,
  QuestAdventure,
} from "../../../../Quests";
import { QuestType } from "../../../../QuestTypes";
import { PossibleKeyPath } from "./QuestHeroKeys";

export class QuestPullAndZapKeys
  extends QuestKeyStuffAbstract
  implements QuestInfo
{
  paths: PossiblePath[];

  getId(): QuestType {
    return "Council / Tower / Keys / Heroes / Pull and Zap Keys";
  }

  createPaths(assumeUnstarted: boolean): void {
    if (!assumeUnstarted && GreySettings.isHardcoreMode()) {
      this.paths = null;
      return;
    }

    let pullableKeys: Item[] = GreyPulls.getPullableKeys();

    if (!assumeUnstarted) {
      pullableKeys = pullableKeys.filter(
        (i) => !hasPulled(i) || availableAmount(i) > 0
      );
    }

    if (pullableKeys.length == 0) {
      this.paths = null;
      return;
    }

    this.paths = [];

    for (const combination of getAllCombinations(pullableKeys)) {
      const path = new PossibleKeyPath(0);
      path.keys = combination.length;

      combination.forEach((i) => {
        if (availableAmount(i) == 0) {
          path.addConsumablePull(i);
        }

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

  status(): QuestStatus {
    if (GreySettings.isHardcoreMode()) {
      return QuestStatus.COMPLETED;
    }

    const status = getQuestStatus("questL13Final");

    if (status < 5) {
      return QuestStatus.NOT_READY;
    }

    if (status > 5) {
      return QuestStatus.COMPLETED;
    }

    if (this.getViableKeyCount() >= 3) {
      return QuestStatus.COMPLETED;
    }

    if (this.getOwnedZappables().length > 0) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(path: PossibleKeyPath): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        const wand = getZapWand();

        if (wand == Item.get("None")) {
          throw "Expected a wand! What happened!";
        }

        if (this.getOwnedZappables().length == 0) {
          const toPull = path.pulls.find((i) => !hasPulled(i));

          if (toPull == null) {
            throw "Failed to find a zappable key to pull?";
          }

          GreyPulls.tryRetrieve(toPull, 80000);

          if (this.getOwnedZappables().length == 0) {
            throw "Expected to have a zappable key grabbed";
          }
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
