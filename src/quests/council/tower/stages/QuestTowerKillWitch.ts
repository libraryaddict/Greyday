import {
  Location,
  Familiar,
  visitUrl,
  print,
  getProperty,
  turnsPlayed,
} from "kolmafia";
import { greyAdv } from "../../../../utils/GreyLocations";
import { GreySettings } from "../../../../utils/GreySettings";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestTowerKillWitch implements QuestInfo {
  getId(): QuestType {
    return "Council / Tower / NaughtyBoss";
  }

  level(): number {
    return 13;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL13Final");

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
            greyAdv("place.php?whichplace=nstower&action=ns_10_sorcfight");
            visitUrl("choice.php");
          } catch (e) {}
        }

        greyAdv("choice.php"); // Final fight
        print("Should be all done", "blue");

        if (!GreySettings.isHardcoreMode()) {
          let pulls: number =
            getProperty("_roninStoragePulls").split(",").length;

          print(
            "Used " +
              pulls +
              " / 20 pulls. Could've done another " +
              (20 - pulls) +
              " pulls..",
            "blue"
          );
        }

        print("Took " + turnsPlayed() + " turns this run!", "blue");
      },
    };
  }
}
