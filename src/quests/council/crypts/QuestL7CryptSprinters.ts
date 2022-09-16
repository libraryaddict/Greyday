import { Location, Monster } from "kolmafia";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { currentPredictions } from "../../../utils/GreyUtils";
import { PropertyManager } from "../../../utils/Properties";
import { QuestAdventure, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { CryptStatus } from "../QuestL7Crypt";
import { CryptL7Template } from "./CryptTemplate";

export class CryptL7Sprinters extends CryptL7Template {
  loc: Location = Location.get("The Defiled Alcove");
  sprinter: Monster = Monster.get("Modern zmobie");
  toAbsorb: Monster[];

  run(): QuestAdventure {
    const outfit = new GreyOutfit();
    this.addRetroSword(outfit);

    if (this.getStatus() == CryptStatus.BOSS) {
      outfit.meatDropWeight = 5;
    } else if (
      currentPredictions().get(this.loc) == null ||
      !this.toAbsorb.includes(currentPredictions().get(this.loc))
    ) {
      outfit.initWeight = 2;
    }

    return {
      location: this.loc,
      outfit: outfit,
      freeRun: (monster) => monster != this.sprinter,
      run: () => {
        this.adjustRetroCape();

        const props = new PropertyManager();
        props.setChoice(153, 4);

        try {
          greyAdv(this.loc, outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getProperty(): string {
    return "cyrptAlcoveEvilness";
  }

  cryptStatus(): QuestStatus {
    return QuestStatus.READY;
  }

  getId(): QuestType {
    return "Council / Crypt / Sprinters";
  }

  getLocations(): Location[] {
    return [this.loc];
  }
}
