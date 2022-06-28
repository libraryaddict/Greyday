import {
  Location,
  Familiar,
  visitUrl,
  print,
  getProperty,
  turnsPlayed,
  myAdventures,
  Item,
  toItem,
  toInt,
} from "kolmafia";
import { AbsorbsProvider } from "../../../../utils/GreyAbsorber";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreySettings } from "../../../../utils/GreySettings";
import { Macro } from "../../../../utils/MacroBuilder";
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
        print("Should be all done", "blue");
        let pulls: Item[] = getProperty("_roninStoragePulls")
          .split(",")
          .map((s) => toItem(toInt(s)));

        if (!GreySettings.isHardcoreMode()) {
          print(
            "Used " +
              pulls.length +
              " / 20 pulls. Could've done another " +
              (20 - pulls.length) +
              " pulls..",
            "blue"
          );
        }

        print(
          "Took " +
            turnsPlayed() +
            " turns this run! " +
            myAdventures() +
            " turns left to play with!",
          "blue"
        );
        new AbsorbsProvider().printRemainingAbsorbs();
        print("Pulled: " + pulls.map((i) => i.name).join(", "), "gray");
      },
    };
  }
}