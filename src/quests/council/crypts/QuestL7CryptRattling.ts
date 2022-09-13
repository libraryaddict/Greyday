import {
  availableAmount,
  changeMcd,
  Effect,
  haveEffect,
  Item,
  Location,
  Monster,
  toInt,
} from "kolmafia";
import { hasNonCombatSkillsReady } from "../../../GreyAdventurer";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { PropertyManager } from "../../../utils/Properties";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { CryptStatus } from "../QuestL7Crypt";
import { CryptL7Template } from "./CryptTemplate";

export class CryptL7Rattling extends CryptL7Template {
  loc: Location = Location.get("The Defiled Cranny");
  beatenUp: Effect = Effect.get("Beaten Up");
  kramco = Item.get("Kramco Sausage-o-Matic&trade;");
  runs: Monster[] = ["Gaunt ghuol", "gluttonous ghuol"].map((s) =>
    Monster.get(s)
  );

  level(): number {
    return availableAmount(this.cape) > 0 ? 7 : 16;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit();

    this.addRetroSword(outfit);

    if (this.getStatus() == CryptStatus.BOSS) {
      outfit.meatDropWeight = 5;
    } else {
      outfit.setNoCombat();
      outfit.plusMonsterLevelWeight = 4;
      outfit.addBonus("-equip " + this.kramco.name);
    }

    return {
      location: this.loc,
      outfit: outfit,
      freeRun: (monster) => this.runs.includes(monster),
      run: () => {
        this.adjustRetroCape();
        changeMcd(10);

        const props = new PropertyManager();
        props.setChoice(523, 4);

        try {
          greyAdv(this.loc, outfit);
        } finally {
          props.resetAll();
        }

        changeMcd(0);
      },
    };
  }

  getProperty(): string {
    return "cyrptCrannyEvilness";
  }

  cryptStatus(): QuestStatus {
    if (!hasNonCombatSkillsReady(false)) {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.cape) == 0 && haveEffect(this.beatenUp) > 0) {
      return QuestStatus.NOT_READY;
    }

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
