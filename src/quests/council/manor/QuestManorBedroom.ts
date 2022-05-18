import {
  availableAmount,
  handlingChoice,
  Item,
  Location,
  Monster,
  visitUrl,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import {
  hasNonCombatSkillActive,
  hasNonCombatSkillsReady,
} from "../../../GreyAdventurer";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class ManorBedroom implements QuestInfo {
  location: Location = Location.get("The Haunted Bedroom");
  item: Item = Item.get("Lady Spookyraven's finest gown");
  spectacles: Item = Item.get("Lord Spookyraven's spectacles");
  disposableCamera: Item = Item.get("disposable instant camera");
  dontLike: Monster[] = [
    "Animated Mahogany Nightstand",
    "Animated Rustic Nightstand",
    "Wardröb nightstand",
  ].map((m) => Monster.get(m));

  needCamera(): boolean {
    return (
      availableAmount(this.disposableCamera) == 0 &&
      availableAmount(Item.get("photograph of a dog")) == 0 &&
      getQuestStatus("questL11Palindome") <= 1
    );
  }

  level(): number {
    return 5;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questM21Dance");

    if (status < 1) {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.spectacles) > 0 && !this.needCamera()) {
      if (status > 1 || availableAmount(this.item) > 0) {
        return QuestStatus.COMPLETED;
      }
    }

    if (this.hasDelay()) {
      return QuestStatus.READY;
    }

    return QuestStatus.READY;
  }

  hasDelay(): boolean {
    return this.location.turnsSpent < 5;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();

    return {
      location: this.location,
      outfit: outfit,
      run: () => {
        let props = new PropertyManager();

        try {
          props.setChoice(876, 1);
          props.setChoice(877, 1);
          props.setChoice(879, 5);
          props.setChoice(876, 1);
          props.setChoice(879, 2);

          if (
            getQuestStatus("questM21Dance") <= 2 &&
            availableAmount(this.item) == 0
          ) {
            props.setChoice(880, 1);
          } else {
            props.setChoice(880, 2);
          }

          if (availableAmount(this.spectacles) == 0) {
            props.setChoice(878, 3);
          } else if (this.needCamera()) {
            props.setChoice(878, 4);
          } else {
            props.setChoice(878, 1);
          }

          let settings = new AdventureSettings();

          this.dontLike.forEach((m) => settings.addBanish(m));

          try {
            greyAdv(this.location, outfit, settings);
          } catch {}

          visitUrl("choice.php");

          if (handlingChoice()) {
            greyAdv(this.location, outfit, settings);
          }
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getId(): QuestType {
    return "Manor / Bedroom";
  }

  getLocations(): Location[] {
    return [this.location];
  }
}
