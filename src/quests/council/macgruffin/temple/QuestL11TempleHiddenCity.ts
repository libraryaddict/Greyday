import {
  Location,
  Item,
  availableAmount,
  use,
  cliExecute,
  print,
  getProperty,
} from "kolmafia";
import { GreyChoices } from "../../../../utils/GreyChoices";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11TempleHiddenCity implements QuestInfo {
  wool: Item = Item.get("Stone Wool");
  loc: Location = Location.get("The Hidden Temple");
  nostril: Item = Item.get("The Nostril of the Serpent");
  choices: TempleChoices;

  getId(): QuestType {
    return "Council / MacGruffin / Temple / HiddenCity";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL11Worship");

    if (status > 1) {
      return QuestStatus.COMPLETED;
    }

    if (status < 0 || !this.templeFound()) {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.wool) == 0) {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.nostril) == 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  templeFound(): boolean {
    return getProperty("questM16Temple") == "finished";
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        use(this.wool);

        this.runTempleChoices();

        greyAdv(
          Location.get("The Hidden Temple"),
          null,
          new AdventureSettings().setChoices(this.choices)
        );
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  runTempleChoices() {
    this.choices = new TempleChoices();

    this.choices.runChoice(582, 2);
    this.choices.runChoice(580, 2);
    this.choices.runChoice(584, 4);
    this.choices.runChoice(580, 1);
    this.choices.runChoice(123, 2); // Go to puzzle
    // Script should run the banana solver
    this.choices.runChoice(125, 3); // Unlock city
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}

class TempleChoices implements GreyChoices {
  choices: [number, number][] = [];

  calledOutOfScopeChoiceBehavior(choiceNo: number): boolean {
    print("Temple now has choice: " + choiceNo);
    if (choiceNo != 0) {
      return false;
    }

    //   let url = "choice.php?pwd=&whichchoice=" + 123 + "&option=" + 2;
    // visitUrl(url);
    cliExecute("dvorak"); // Solve puzzle
  }

  runChoice(choiceNo: number, choicePick: number) {
    this.choices.push([choiceNo, choicePick]);
  }

  handleChoice(choiceNo: number): number {
    if (this.choices.length == 0) {
      throw "Expected to be handling a choice but uh, wasn't";
    }

    if (this.choices[0][0] != choiceNo) {
      return null;
      /*   throw (
        "Expected to be in choice " +
        this.choices[0][0] +
        " but instead was in choice " +
        choiceNo
      );*/
    }

    const toReturn = this.choices[0][1];
    this.choices.splice(0, 1);

    return toReturn;
  }
}
