import {
  Location,
  availableAmount,
  equippedAmount,
  Item,
  turnsPlayed,
  itemAmount,
  lastChoice,
  equip,
  print,
  Monster,
  Familiar,
  useFamiliar,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { DelayBurners } from "../../../iotms/delayburners/DelayBurners";

export class QuestL10GiantBasement implements QuestInfo {
  amulet: Item = Item.get("Amulet of Extreme Plot Significance");
  umbrella: Item = Item.get("Titanium Assault Umbrella");
  dumbell: Item = Item.get("Massive Dumbbell");
  loc: Location = Location.get(
    "The Castle in the Clouds in the Sky (Basement)"
  );
  alphaGiant: Monster = Monster.get("Alphabet Giant");
  letterD: Item = Item.get("Heavy D");
  toAbsorb: Monster[];
  // TODO Once we've got the absorbs, try replace combats if it doesn't interfere with our slots cos umbrella

  constructor() {
    const umbrella = Item.get("Unbreakable Umbrella");

    if (availableAmount(umbrella) > 0) {
      this.umbrella = umbrella; // They replace!
    }
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit().setNoCombat();

    if (this.toAbsorb.length == 0) {
      outfit.addDelayer();
    }

    return {
      location: this.loc,
      outfit: outfit,
      freeRun: (monster) =>
        monster == this.alphaGiant && itemAmount(this.letterD) == 0,
      run: () => {
        if (DelayBurners.isTryingForDupeableGoblin()) {
          useFamiliar(Familiar.get("Grey Goose"));
        }

        const turnsSpent = turnsPlayed();
        this.runAdv(outfit);

        // If we took a turn, or the last choice wasn't one asking for umbrella & amulet
        if (
          turnsSpent != turnsPlayed() ||
          (lastChoice() != 669 && lastChoice() != 670)
        ) {
          return;
        }

        print(
          "Detected that we've hit the giant NC and want to wear an umbrella/amulet.. So equipping that and trying it again.",
          "blue"
        );

        for (const i of [this.umbrella, this.amulet]) {
          if (equippedAmount(i) > 0 || itemAmount(i) == 0) {
            continue;
          }

          equip(i);
        }

        this.runAdv(outfit);
      },
    };
  }

  runAdv(outfit: GreyOutfit) {
    const props = new PropertyManager();

    try {
      // Do umbrella
      if (equippedAmount(this.umbrella) > 0 || itemAmount(this.umbrella) == 0) {
        // If we have umbrella equipped, or don't have one
        props.setChoice(669, 1);
      } else {
        props.setChoice(669, 4); // Skip so we can resume
      }

      // If have amulet otherwise grab dumbbell (or skips it)
      if (equippedAmount(this.amulet) > 0) {
        props.setChoice(670, 4);
      } else if (itemAmount(this.amulet) == 0) {
        // Grab dumbbell
        props.setChoice(670, 1);
      } else {
        // Skip
        props.setChoice(670, 5);
      }

      // Use dumbbell to open stuff
      if (availableAmount(this.dumbell) > 0) {
        props.setChoice(671, 1);
      } else {
        // Go to gym
        props.setChoice(671, 4);
      }

      greyAdv(this.loc, outfit);
    } finally {
      props.resetAll();
    }
  }

  getId(): QuestType {
    return "Council / Beanstalk / Basement";
  }

  level(): number {
    return 8;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL10Garbage");

    if (status < 7) {
      return QuestStatus.NOT_READY;
    }

    if (status > 7) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  getLocations(): Location[] {
    return [this.loc];
  }
}
