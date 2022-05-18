import {
  adv1,
  availableAmount,
  council,
  getProperty,
  Item,
  Location,
  Monster,
  myLevel,
  outfit,
  use,
} from "kolmafia";
import { PropertyManager } from "../../../../../utils/Properties";
import { AdventureSettings, greyAdv } from "../../../../../utils/GreyLocations";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../../../Quests";
import { QuestType } from "../../../../QuestTypes";

export class QuestL11Business implements QuestInfo {
  files: Item[] = [
    "McClusky file (page 1)",
    "McClusky file (page 2)",
    "McClusky file (page 3)",
    "McClusky file (page 4)",
    "McClusky file (page 5)",
  ].map((s) => Item.get(s));
  completeFile: Item = Item.get("McClusky file (complete)");
  binderClip: Item = Item.get("Boring Binder Clip");
  loc: Location = Location.get("the hidden office building");
  apartment: Location = Location.get("The Hidden Apartment Building");

  getId(): QuestType {
    return "Council / MacGruffin / HiddenCity / Accountants";
  }

  getLocations(): Location[] {
    return [this.loc, this.apartment];
  }

  level(): number {
    return 11;
  }

  delayUntilNextNC(): number {
    let totalTurns = this.loc.turnsSpent;

    return 4 - ((totalTurns - 1) % 5);
  }

  status(): QuestStatus {
    if (getProperty("questL11Worship") != "step3") {
      return QuestStatus.NOT_READY;
    }

    let status = getProperty("questL11Business");

    if (status == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (status == "unstarted") {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.completeFile) > 0 && this.delayUntilNextNC() > 0) {
      return QuestStatus.READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    // Banish non-accountant?
    if (
      availableAmount(this.binderClip) > 0 &&
      this.filesRemaining() > 0 &&
      this.delayUntilNextNC() == 0
    ) {
      //
      return {
        location: this.apartment,
        run: () => {
          let props = new PropertyManager();

          props.setChoice(780, 4); // Skip
          let settings = new AdventureSettings().addBanish(
            Monster.get("pygmy witch lawyer")
          );

          try {
            greyAdv(this.apartment, null, settings);

            this.tryCreate();
          } finally {
            props.resetAll();
          }
        },
      };
    }

    return {
      location: this.loc,
      run: () => {
        let props = new PropertyManager();

        try {
          if (availableAmount(this.completeFile) > 0) {
            props.setChoice(786, 1); // Have complete file, fight
          } else if (availableAmount(this.binderClip) == 0) {
            props.setChoice(786, 2); // Get binder clip
          } else {
            props.setChoice(786, 3); // Fight accountant
          }

          let settings = new AdventureSettings().addBanish(
            Monster.get("pygmy headhunter")
          );

          greyAdv(this.loc, null, settings);

          this.tryCreate();
        } finally {
          props.resetAll();
        }
      },
    };
  }

  tryCreate() {
    if (this.filesRemaining() > 0 || availableAmount(this.binderClip) == 0) {
      return;
    }

    use(this.binderClip);
  }

  filesRemaining(): number {
    return this.files.reduce((p, v) => (availableAmount(v) > 0 ? 1 : 0) + p, 0);
  }

  shouldExploreApartments(): boolean {
    return;
  }
}
