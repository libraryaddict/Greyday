import { Location } from "kolmafia";
import { hasNonCombatSkillsReady } from "../../../GreyAdventurer";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { CryptL7Template } from "./CryptTemplate";

export class CryptL7Sprinters extends CryptL7Template {
  loc: Location = Location.get("The Defiled Alcove");

  run(): QuestAdventure {
    let outfit = new GreyOutfit();
    outfit.initWeight = 2;
    this.addRetroSword(outfit);

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        this.adjustRetroCape();
        greyAdv(this.loc, outfit);
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
