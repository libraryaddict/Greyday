import {
  Location,
  Familiar,
  Item,
  itemAmount,
  Monster,
  visitUrl,
  availableAmount,
  cliExecute,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11ManorBomb implements QuestInfo {
  soda: Item = Item.get("blasting soda");
  wine: Item = Item.get("bottle of Chateau de Vinegar");
  unstable: Item = Item.get("unstable fulminate");
  bomb: Item = Item.get("Wine Bomb");
  boiler: Location = Location.get("The Haunted Boiler Room");

  getId(): QuestType {
    return "Council / MacGruffin / Manor / Bomb";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL11Manor");

    if (status < 2) {
      return QuestStatus.NOT_READY;
    }

    if (status > 3) {
      return QuestStatus.COMPLETED;
    }

    if (
      availableAmount(this.unstable) == 0 &&
      (availableAmount(this.soda) == 0 || availableAmount(this.wine) == 0)
    ) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    if (availableAmount(this.unstable) == 0) {
      return {
        location: null,
        run: () => {
          cliExecute("create Unstable Fulminate");
        },
      };
    }

    let outfit = new GreyOutfit().addItem(this.unstable);
    outfit.plusMonsterLevelWeight = 5;

    return {
      location: this.boiler,
      outfit: outfit,
      run: () => {
        let settings = new AdventureSettings();
        settings.addNoBanish(Monster.get("monstrous boiler"));

        greyAdv(this.boiler, outfit, settings);

        if (itemAmount(this.unstable) == 0) {
          visitUrl("place.php?whichplace=manor4&action=manor4_chamberwall");
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.boiler];
  }
}
