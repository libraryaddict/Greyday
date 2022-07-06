import { availableAmount, changeMcd, Location, toInt } from "kolmafia";
import { hasNonCombatSkillsReady } from "../../../GreyAdventurer";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { CryptStatus } from "../QuestL7Crypt";
import { CryptL7Template } from "./CryptTemplate";

export class CryptL7Rattling extends CryptL7Template {
  loc: Location = Location.get("The Defiled Cranny");

  level(): number {
    return availableAmount(this.cape) > 0 ? 7 : 16;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();

    this.addRetroSword(outfit);

    if (this.getStatus() == CryptStatus.BOSS) {
      outfit.meatDropWeight = 5;
    } else {
      outfit.setNoCombat();
      outfit.plusMonsterLevelWeight = 4;
    }

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        this.adjustRetroCape();
        changeMcd(10);
        greyAdv(this.loc, outfit);
        changeMcd(0);
      },
    };
  }

  getProperty(): string {
    return "cyrptCrannyEvilness";
  }

  cryptStatus(): QuestStatus {
    if (!hasNonCombatSkillsReady()) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  getId(): QuestType {
    return "Council / Crypt / Rattling";
  }

  getLocations(): Location[] {
    return [this.loc];
  }
}
