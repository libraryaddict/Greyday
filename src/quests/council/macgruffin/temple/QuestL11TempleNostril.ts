import { availableAmount, getProperty, Item, Location, use } from "kolmafia";
import { GreyChoices } from "../../../../utils/GreyChoices";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11TempleNostril implements QuestInfo {
  wool: Item = Item.get("Stone Wool");
  loc: Location = Location.get("The Hidden Temple");
  nostril: Item = Item.get("The Nostril of the Serpent");
  choices: TempleChoices;

  getId(): QuestType {
    return "Council / MacGruffin / Temple / Nostril";
  }

  level(): number {
    return 11;
  }

  templeFound(): boolean {
    return getProperty("questM16Temple") == "finished";
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL11Worship");

    if (status > 1) {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.nostril) > 0) {
      return QuestStatus.COMPLETED;
    }

    if (status < 0 || !this.templeFound()) {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.wool) == 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
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

    this.choices.runChoice(582, 1); // Grab nostril
    this.choices.runChoice(579, 2); // Grab nostil
  }
}

class TempleChoices implements GreyChoices {
  choices: [number, number][] = [];

  calledOutOfScopeChoiceBehavior(choiceNo: number): boolean {
    return false;
  }

  runChoice(choiceNo: number, choicePick: number) {
    this.choices.push([choiceNo, choicePick]);
  }

  handleChoice(choiceNo: number): number {
    if (this.choices.length == 0) {
      throw "Expected to be handling a choice but uh, wasn't";
    }

    if (this.choices[0][0] != choiceNo) {
      throw (
        "Expected to be in choice " +
        this.choices[0][0] +
        " but instead was in choice " +
        choiceNo
      );
    }

    const toReturn = this.choices[0][1];
    this.choices.splice(0, 1);

    return toReturn;
  }
}
