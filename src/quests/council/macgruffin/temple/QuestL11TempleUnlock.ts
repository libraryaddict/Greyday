import {
  cliExecute,
  Familiar,
  getProperty,
  Item,
  itemAmount,
  Location,
  Monster,
  print,
  use,
} from "kolmafia";
import { GreyChoices } from "../../../../utils/GreyChoices";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11TempleUnlock implements QuestInfo {
  coin: Item = Item.get("Tree-holed coin");
  map: Item = Item.get("Spooky Temple Map");
  fertilizer: Item = Item.get("Spooky-Gro Fertilizer");
  sapling: Item = Item.get("Spooky Sapling");
  spookyLoc: Location = Location.get("The Spooky Forest");
  choices: TempleChoices;

  getId(): QuestType {
    return "Council / MacGruffin / Temple / Unlock";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    if (this.templeFound()) {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("questM16Temple") == "unstarted") {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  templeFound(): boolean {
    return getProperty("questM16Temple") == "finished";
  }

  tryUnlockTemple() {
    if (
      itemAmount(this.sapling) == 0 ||
      itemAmount(this.fertilizer) == 0 ||
      itemAmount(this.map) == 0
    ) {
      return;
    }

    use(this.map);
  }

  runSpookyChoices() {
    this.choices = new TempleChoices();

    if (itemAmount(this.coin) == 0 && itemAmount(this.map) == 0) {
      this.choices.runChoice(502, 2);
      this.choices.runChoice(505, 2);
    } else if (itemAmount(this.map) == 0) {
      this.choices.runChoice(502, 3);
      this.choices.runChoice(506, 3);
      this.choices.runChoice(507, 1);
    } else if (itemAmount(this.fertilizer) == 0) {
      this.choices.runChoice(502, 3);
      this.choices.runChoice(506, 3);
      this.choices.runChoice(506, 2);
    } else if (itemAmount(this.sapling) == 0) {
      this.choices.runChoice(502, 1);
      this.choices.runChoice(503, 3);

      // Sell skins
      if (itemAmount(Item.get("bar skin")) > 1) {
        this.choices.runChoice(504, 2);
      } else if (itemAmount(Item.get("bar skin")) > 0) {
        this.choices.runChoice(504, 1);
      }

      this.choices.runChoice(504, 3);
      this.choices.runChoice(504, 4);
    }
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setNoCombat();

    return {
      location: this.spookyLoc,
      outfit: outfit,
      run: () => {
        this.tryUnlockTemple();

        if (this.templeFound()) {
          return;
        }

        this.runSpookyChoices();

        let settings = new AdventureSettings().setChoices(this.choices);

        greyAdv(this.spookyLoc, outfit, settings);

        this.tryUnlockTemple();
      },
    };
  }

  getLocations(): Location[] {
    return [this.spookyLoc];
  }
}

class TempleChoices implements GreyChoices {
  choices: [number, number][] = [];

  callOutOfScopeChoiceBehavior(choiceNo: number): boolean {
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

    let toReturn = this.choices[0][1];
    this.choices.splice(0, 1);

    return toReturn;
  }
}
