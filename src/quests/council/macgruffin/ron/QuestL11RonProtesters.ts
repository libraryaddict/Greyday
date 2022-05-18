import {
  Location,
  Familiar,
  availableAmount,
  Effect,
  getProperty,
  haveEffect,
  Item,
  Monster,
  toInt,
  use,
} from "kolmafia";
import { PropertyManager } from "../../../../utils/Properties";
import { greyKillingBlow } from "../../../../utils/GreyCombat";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { GreyPulls } from "../../../../utils/GreyResources";
import { GreySettings } from "../../../../utils/GreySettings";
import { Macro } from "../../../../utils/MacroBuilder";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11RonProtesters implements QuestInfo {
  proLoc: Location = Location.get("A Mob Of Zeppelin Protesters");
  deck: Item = Item.get("deck of lewd playing cards");
  lyrndCostume: Item[] = [
    "lynyrdskin breeches",
    "lynyrdskin cap",
    "lynyrdskin tunic",
  ].map((s) => Item.get(s));
  musk: Item = Item.get("lynyrd musk");
  cig: Item = Item.get("cigarette lighter");
  flaming: Item = Item.get("Flamin' Whatshisname");
  musky: Effect = Effect.get("Musky");

  isReady(): boolean {
    return (
      getProperty("questL11Ron") == "started" ||
      getProperty("questL11Ron") == "step1" ||
      toInt(getProperty("zeppelinProtestors")) <= 80
    );
  }

  getId(): QuestType {
    return "Council / MacGruffin / Ron / Crowd";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL11Ron");

    if (status > 1) {
      return QuestStatus.COMPLETED;
    }

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    if (
      getQuestStatus("questL11Shen") <= 6 ||
      getQuestStatus("questL09Topping") < 1
    ) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    if (availableAmount(this.deck) == 0 && !GreySettings.isHardcoreMode()) {
      GreyPulls.pullDeckOfLewdCards();
      GreyPulls.pullLynrdProtesters();
    }

    let outfit = new GreyOutfit().setNoCombat();
    outfit.addBonus("+sleaze dmg +sleaze spell dmg");

    for (let i of this.lyrndCostume) {
      outfit.addItem(i, 60);
    }

    return {
      location: this.proLoc,
      outfit: outfit,
      run: () => {
        let props = new PropertyManager();

        try {
          if (haveEffect(this.musky) <= 0 && availableAmount(this.musk) > 0) {
            use(this.musk);
          }

          props.setChoice(856, 1);
          props.setChoice(857, 1);
          props.setChoice(858, 1);

          let settings = new AdventureSettings();
          settings.setFinishingBlowMacro(
            new Macro().tryItem(this.cig).step(greyKillingBlow(outfit))
          );
          settings.addNoBanish(Monster.get("Blue Oyster Cultist"));
          settings.addNoBanish(Monster.get("Lynyrd Skinner"));

          greyAdv(
            Location.get("A Mob Of Zeppelin Protesters"),
            outfit,
            settings
          );
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.proLoc];
  }
}
