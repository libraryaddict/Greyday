import {
  Location,
  Familiar,
  Monster,
  haveOutfit,
  Item,
  getWorkshed,
  isBanished,
  Effect,
  haveEffect,
  Skill,
  knollAvailable,
  outfitPieces,
  myMeat,
  cliExecute,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestBugbearBakery implements QuestInfo {
  asdon: Item = Item.get("Asdon Martin keyfob");
  garage: Location = Location.get("The Degrassi Knoll Garage");
  guard: Monster = Monster.get("Guard Bugbear");
  effect: Effect = Effect.get("Everything Looks Yellow");
  nanovision: Skill = Skill.get("Double Nanovision");

  getId(): QuestType {
    return "Misc / BugbearBakery";
  }

  level(): number {
    return 6;
  }

  status(): QuestStatus {
    if (
      haveOutfit("Bugbear Costume") ||
      (!knollAvailable() && getWorkshed() != this.asdon)
    ) {
      return QuestStatus.COMPLETED;
    }

    if (myMeat() < 200 || isBanished(this.guard)) {
      return QuestStatus.NOT_READY;
    }

    if (haveEffect(this.effect) > 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    if (knollAvailable()) {
      return {
        location: null,
        outfit: new GreyOutfit("-tie"),
        run: () => {
          for (let item of outfitPieces("Bugbear Costume")) {
            cliExecute("acquire " + item.name);
          }
        },
      };
    }

    let outfit = new GreyOutfit().setItemDrops();

    return {
      location: this.garage,
      outfit: outfit,
      run: () => {
        greyAdv(
          this.garage,
          outfit,
          new AdventureSettings().addNoBanish(this.guard)
        );
      },
    };
  }

  getLocations(): Location[] {
    return [this.garage];
  }
}
