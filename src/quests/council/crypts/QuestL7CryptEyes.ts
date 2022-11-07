import {
  availableAmount,
  cliExecute,
  Item,
  Location,
  Monster,
  use,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { PropertyManager } from "../../../utils/Properties";
import { QuestAdventure, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { CryptL7Template } from "./CryptTemplate";

export class CryptL7Eyes extends CryptL7Template {
  loc: Location = Location.get("The Defiled Nook");

  run(): QuestAdventure {
    const outfit = new GreyOutfit().setItemDrops().setChampagneBottle();
    this.addRetroSword(outfit);

    return {
      location: this.loc,
      outfit: outfit,
      mayFreeRun: false,
      run: () => {
        this.adjustRetroCape();

        const props = new PropertyManager();
        props.setChoice(155, 5);

        try {
          greyAdv(
            this.loc,
            outfit,
            new AdventureSettings().addBanish(Monster.get("party skelteon"))
          );
        } finally {
          props.resetAll();
        }

        cliExecute("refresh inventory");

        const item = Item.get("Evil Eye");

        if (availableAmount(item) > 0) {
          use(item, availableAmount(item));
        }
      },
    };
  }

  getProperty(): string {
    return "cyrptNookEvilness";
  }

  cryptStatus(): QuestStatus {
    return QuestStatus.READY;
  }

  getId(): QuestType {
    return "Council / Crypt / Eyes";
  }

  getLocations(): Location[] {
    return [this.loc];
  }
}
