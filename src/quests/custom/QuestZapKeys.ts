import {
  Location,
  Familiar,
  Item,
  availableAmount,
  getProperty,
  getRelated,
  toInt,
  print,
  visitUrl,
  cliExecute,
} from "kolmafia";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { QuestType } from "../QuestTypes";
import { QuestKeyStuffAbstract } from "./QuestKeyStuffAbstract";

export class QuestZapKeys extends QuestKeyStuffAbstract implements QuestInfo {
  tryZap(wand: Item, target: Item): Item {
    let original: [Item, number][] = this.keys.map((z) => [
      z,
      availableAmount(z),
    ]);

    visitUrl(
      "wand.php?action=zap&whichwand=" +
        toInt(wand) +
        "&whichitem=" +
        toInt(target),
      true
    );

    let acquired: Item = original.find((z) => availableAmount(z[0]) > z[1])[0];

    return acquired;
  }

  getTimesZapped(): number {
    return toInt(getProperty("_zapCount"));
  }

  getWand(): Item {
    return this.wand.find((w) => availableAmount(w) > 0);
  }

  getId(): QuestType {
    return "Council / Tower / Keys / ZapKeys";
  }

  level(): number {
    return 5;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL13Final");

    if (status < 5) {
      return QuestStatus.NOT_READY;
    }

    if (status > 5) {
      return QuestStatus.COMPLETED;
    }

    if (this.getKeysUnavailable().length == 0) {
      return QuestStatus.COMPLETED;
    }

    let zappables = this.getOwnedZappables();

    if (zappables.length == 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        let wand = this.getWand();

        if (wand == null) {
          throw "Expected a wand! What happened!";
        }

        let toZap = this.getOwnedZappables();

        if (toZap.length == 0) {
          throw "Expected something to zap! What happened!";
        }

        let zapped = this.tryZap(wand, toZap[0]);

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
