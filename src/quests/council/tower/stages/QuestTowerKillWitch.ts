import {
  Location,
  visitUrl,
  print,
  Item,
  closetAmount,
  takeCloset,
} from "kolmafia";
import { printEndOfRun } from "../../../../GreyYouMain";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { Macro } from "../../../../utils/MacroBuilder";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestTowerKillWitch implements QuestInfo {
  seasoning: Item = Item.get("Special Seasoning");

  getId(): QuestType {
    return "Council / Tower / NaughtyBoss";
  }

  level(): number {
    return 13;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL13Final");

    if (status < 11) {
      return QuestStatus.NOT_READY;
    }

    if (status > 11) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return this.doBoss();
  }

  getLocations(): Location[] {
    return [];
  }

  doBoss(): QuestAdventure {
    return {
      location: null,
      run: () => {
        for (let i = 0; i < 2; i++) {
          try {
            greyAdv(
              "place.php?whichplace=nstower&action=ns_10_sorcfight",
              null,
              new AdventureSettings().setFinishingBlowMacro(
                Macro.attack().repeat()
              )
            );
            visitUrl("choice.php");
          } catch (e) {}
        }

        greyAdv("choice.php"); // Final fight
        visitUrl("place.php?whichplace=nstower");

        if (closetAmount(this.seasoning) > 0) {
          takeCloset(this.seasoning, closetAmount(this.seasoning));
        }

        print("Should be all done", "blue");

        printEndOfRun();
      },
    };
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}
