import {
  Item,
  Monster,
  availableAmount,
  myMeat,
  getProperty,
  Location,
  retrieveItem,
  Familiar,
} from "kolmafia";
import { greyKillingBlow } from "../../../../utils/GreyCombat";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { Macro } from "../../../../utils/MacroBuilder";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11RonAirship implements QuestInfo {
  ticket: Item = Item.get("Red Zeppelin Ticket");
  ron: Monster = Monster.get('Ron "The Weasel" Copperhead');
  airship: Location = Location.get("The Red Zeppelin");
  butler: Monster = Monster.get("Red Butler");
  skeleton: Monster = Monster.get("Red Skeleton");
  buttons: Monster = Monster.get("Man with the red buttons");

  getLocations(): Location[] {
    return [this.airship];
  }

  level(): number {
    return 11;
  }

  getId(): QuestType {
    return "Council / MacGruffin / Ron / Zepp";
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL11Ron");

    if (status < 2) {
      return QuestStatus.NOT_READY;
    }

    if (status > 4) {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.ticket) == 0 && myMeat() <= 5000) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit().setItemDrops();
    const orbs: Monster[] = [this.skeleton, this.butler, this.buttons];

    return {
      location: this.airship,
      outfit: outfit,
      orbs: orbs,
      olfaction: [this.butler],
      freeRun: (monster) => !orbs.includes(monster),
      run: () => {
        if (availableAmount(this.ticket) == 0) {
          retrieveItem(this.ticket);
        }

        let macro = greyKillingBlow(outfit);

        if (availableAmount(Item.get("Glark Cable")) > 0) {
          macro = Macro.if_(this.ron, macro)
            .step(Macro.tryItem(Item.get("Glark Cable")))
            .step(macro);
        }

        const settings = new AdventureSettings();
        settings.setFinishingBlowMacro(macro);
        settings.addNoBanish(Monster.get("Red Skeleton"));
        settings.addNoBanish(Monster.get("Red Butler"));

        greyAdv(this.airship, outfit, settings);
      },
    };
  }
}
