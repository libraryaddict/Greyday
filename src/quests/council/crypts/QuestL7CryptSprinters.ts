import { Location, toInt } from "kolmafia";
import { hasNonCombatSkillsReady } from "../../../GreyAdventurer";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { PropertyManager } from "../../../utils/Properties";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { CryptStatus } from "../QuestL7Crypt";
import { CryptL7Template } from "./CryptTemplate";

export class CryptL7Sprinters extends CryptL7Template {
  loc: Location = Location.get("The Defiled Alcove");

  run(): QuestAdventure {
    let outfit = new GreyOutfit();
    this.addRetroSword(outfit);

    if (this.getStatus() == CryptStatus.BOSS) {
      outfit.meatDropWeight = 5;
    } else {
      outfit.initWeight = 2;
    }

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        this.adjustRetroCape();

        let props = new PropertyManager();
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
