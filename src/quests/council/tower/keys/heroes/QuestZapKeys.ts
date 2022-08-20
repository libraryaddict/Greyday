import {
  Location,
  Item,
  availableAmount,
  getProperty,
  toInt,
  visitUrl,
  pullsRemaining,
  getZapWand,
  zap,
} from "kolmafia";
import { PossiblePath } from "../../../../../typings/TaskInfo";
import { QuestKeyStuffAbstract } from "../../../../custom/QuestKeyStuffAbstract";
import {
  QuestInfo,
  QuestStatus,
  getQuestStatus,
  QuestAdventure,
} from "../../../../Quests";
import { QuestType } from "../../../../QuestTypes";

export class QuestZapKeys extends QuestKeyStuffAbstract implements QuestInfo {
  getPossiblePaths?(): PossiblePath[];

  getTimesZapped(): number {
    return toInt(getProperty("_zapCount"));
  }

  getId(): QuestType {
    return "Council / Tower / Keys / Heroes / ZapKeys";
  }

  level(): number {
    return 5;
  }

  status(): QuestStatus {
    if (pullsRemaining() == -1) {
      return QuestStatus.COMPLETED;
    }

    const status = getQuestStatus("questL13Final");

    if (status < 5) {
      return QuestStatus.NOT_READY;
    }

    if (status > 5) {
      return QuestStatus.COMPLETED;
    }

    if (this.getKeysUnavailable().length == 0) {
      return QuestStatus.COMPLETED;
    }

    const zappables = this.getOwnedZappables();

    if (zappables.length == 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        const wand = getZapWand();

        if (wand == Item.get("None")) {
          throw "Expected a wand! What happened!";
        }

        const toZap = this.getOwnedZappables();

        if (toZap.length == 0) {
          throw "Expected something to zap! What happened!";
        }

        const zapped = zap(toZap[0]);

        if (!this.keys.includes(zapped)) {
          throw (
            "Ugh, we failed to zap it properly. We zapped " +
            toZap[0].name +
            " and got " +
            zapped.name
          );
        }
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
