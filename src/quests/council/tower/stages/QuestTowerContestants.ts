import { getProperty, Location, maximize, toInt, visitUrl } from "kolmafia";
import { greyAdv } from "../../../../utils/GreyLocations";
import { PropertyManager } from "../../../../utils/Properties";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

type ContestQuest = () => void;

export class QuestTowerContestants implements QuestInfo {
  getId(): QuestType {
    return "Council / Tower / Contests";
  }

  level(): number {
    return 13;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL13Final");

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    if (status > 3) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const status = getQuestStatus("questL13Final");

    if (status == 0) {
      return this.learnAndSetMyPlace();
    }

    if (status == 1) {
      return this.fightContests();
    }

    return this.claimPrize();
  }

  claimPrize(): QuestAdventure {
    return {
      location: null,
      run: () => {
        const props = new PropertyManager();

        try {
          props.setChoice(1020, 1);
          props.setChoice(1021, 1);
          props.setChoice(1022, 1);
          props.setChoice(1003, 4);

          visitUrl("place.php?whichplace=nstower&action=ns_01_contestbooth");
          visitUrl("choice.php?pwd=&whichchoice=1003&option=4", true);
          visitUrl("place.php?whichplace=nstower&action=ns_02_coronation");
          visitUrl("choice.php?pwd=&whichchoice=1020&option=1", true);
          visitUrl("choice.php?pwd=&whichchoice=1021&option=1", true);
          visitUrl("choice.php?pwd=&whichchoice=1022&option=1", true);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  fightContests(): QuestAdventure {
    // place.php?whichplace=nstower&action=ns_01_crowd1
    const match = visitUrl("place.php?whichplace=nstower").match(
      /(place.php\?whichplace=nstower&action=ns_01_crowd\d)/
    );

    return {
      location: null,
      run: () => {
        if (match == null) {
          throw "Unable to parse the contestants which we shall be fighting.";
        }

        greyAdv(match[1]);
      },
    };
  }

  learnAndSetMyPlace(): QuestAdventure {
    return {
      location: null,
      run: () => {
        for (const quest of this.getNeededQuests()) {
          quest.call(this);
        }

        visitUrl("place.php?whichplace=nstower");
      },
    };
  }

  getLocations(): Location[] {
    if (getProperty("questL13Final") != "step1") {
      return [];
    }

    const locs: Location[] = [];

    const page = visitUrl("place.php?whichplace=nstower");

    if (page.includes("ns_01_crowd1")) {
      locs.push(Location.get("Fastest Adventurer Contest"));
    }

    if (page.includes("ns_01_crowd2")) {
      switch (getProperty("nsChallenge1")) {
        case "Mysticality":
          locs.push(Location.get("Smartest Adventurer Contest"));
          break;
        case "Moxie":
          locs.push(Location.get("Smoothest Adventurer Contest"));
          break;
        case "Muscle":
          locs.push(Location.get("Strongest Adventurer Contest"));
          break;
      }
    }

    if (page.includes("ns_01_crowd3")) {
      switch (getProperty("nsChallenge2")) {
        case "cold":
          locs.push(Location.get("Coldest Adventurer Contest"));
          break;
        case "hot":
          locs.push(Location.get("Hottest Adventurer Contest"));
          break;
        case "sleaze":
          locs.push(Location.get("Sleaziest Adventurer Contest"));
          break;
        case "spooky":
          locs.push(Location.get("Spookiest Adventurer Contest"));
          break;
        case "stench":
          locs.push(Location.get("Stinkiest Adventurer Contest"));
          break;
      }
    }

    return locs;
  }

  turnInQuest(questNo: number) {
    visitUrl("place.php?whichplace=nstower&action=ns_01_contestbooth");
    visitUrl("choice.php?pwd=&whichchoice=1003&option=" + questNo, true);
    visitUrl("main.php");
  }

  getNeededQuests(): ContestQuest[] {
    if (
      getProperty("nsChallenge1") == "none" ||
      getProperty("nsChallenge2") == "none"
    ) {
      visitUrl("place.php?whichplace=nstower&action=ns_01_contestbooth");
    }

    const quests: ContestQuest[] = [];

    if (toInt(getProperty("nsContestants1")) == -1) {
      quests.push(this.doQuest1);
    }

    if (toInt(getProperty("nsContestants2")) == -1) {
      quests.push(this.doQuest2);
    }

    if (toInt(getProperty("nsContestants3")) == -1) {
      quests.push(this.doQuest3);
    }

    return quests;
  }

  doQuest1() {
    maximize(
      "init +switch left-hand man +switch Oily woim +switch Xiblaxian Holo-Companion -tie",
      false
    );
    this.turnInQuest(1);
  }

  doQuest2() {
    maximize(
      getProperty("nsChallenge1") + " +switch left-hand man -tie",
      false
    );
    this.turnInQuest(2);
  }

  doQuest3() {
    const element = getProperty("nsChallenge2");

    maximize(
      element + " dmg +" + element + " spell dmg +switch left-hand man -tie",
      false
    );
    this.turnInQuest(3);
  }
}
