import {
  Item,
  myHp,
  myMaxhp,
  restoreHp,
  use,
  Location,
  elementalResistance,
  Element,
  availableAmount,
  toInt,
  getProperty,
  print,
  numericModifier,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { AdventureSettings } from "../../../utils/GreyLocations";
import { GreyChoices } from "../../../utils/GreyChoices";
import { QuestType } from "../../QuestTypes";

export class ABooHandler implements QuestInfo {
  clue: Item = Item.get("A-Boo Clue");
  loc: Location = Location.get("A-Boo Peak");
  damageLevels: number[] = [13, 25, 50, 125, 250];

  level(): number {
    return 9;
  }

  getId(): QuestType {
    return "Council / Peaks / AbooPeak";
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  run(): QuestAdventure {
    if (availableAmount(this.clue) > 0) {
      return this.runClue();
    }

    return this.runCombat();
  }

  runClue(): QuestAdventure {
    let outfit = this.createOutfit();

    return {
      location: null,
      outfit: outfit,
      run: () => {
        let props = new PropertyManager();

        try {
          props.setChoice(611, 1);
          use(this.clue);

          let settings = new AdventureSettings();
          let turn = 0;

          settings.setChoices({
            callOutOfScopeChoiceBehavior: (choice: number) => {
              return false;
            },

            handleChoice: (choice: number) => {
              let dmgTaken = this.damageTaken(turn++);

              if (dmgTaken >= myHp() || this.getProgress() <= 0) {
                return 2;
              }

              print("Prediction a-boo damage of " + dmgTaken);

              return 1;
            },
          });

          greyAdv(this.loc, null, settings);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  damageTaken(turn: number): number {
    let dmg = this.damageLevels[turn];

    let sDmg = this.damageTakenByElement(dmg, Element.get("Spooky"));
    let cDmg = this.damageTakenByElement(dmg, Element.get("Cold"));

    return sDmg + cDmg;
  }

  turnsSurvived(): number {
    let totalDamage: number = 2;
    let reducedBy: number = 0;

    for (let i = 0; i < this.damageLevels.length; i++) {
      if (this.getProgress() <= reducedBy) {
        return i;
      }

      totalDamage += this.damageTaken(i);

      if (totalDamage >= myHp()) {
        return i;
      }

      reducedBy += (i + 1) * 2;
    }

    return 5;
  }

  wouldSurviveClue(): boolean {
    let damageLevels: number[] = [13, 25, 50, 125, 250];
    let totalDamage: number = 2;
    let reducedBy: number = 0;

    for (let i = 0; i < damageLevels.length; i++) {
      if (this.getProgress() <= reducedBy) {
        return true;
      }

      let dmg = damageLevels[i];

      let sDmg = this.damageTakenByElement(dmg, Element.get("Spooky"));
      let cDmg = this.damageTakenByElement(dmg, Element.get("Cold"));

      totalDamage += cDmg + sDmg;

      if (totalDamage >= myHp()) {
        return false;
      }

      reducedBy += (i + 1) * 2;
    }

    return true;
  }

  damageTakenByElement(base_damage: number, element: Element) {
    if (base_damage < 0) {
      return 1;
    }

    let resist = elementalResistance(element) / 100.0;

    let effective_base_damage = Math.max(30, base_damage);

    let damage = Math.max(
      1,
      Math.ceil(base_damage - effective_base_damage * resist)
    );

    return damage;
  }

  createOutfit(): GreyOutfit {
    let outfit = new GreyOutfit().addBonus("+40 cold res +40 spooky res");
    outfit.hpWeight = 2;

    return outfit;
  }

  runCombat(): QuestAdventure {
    let outfit = this.createOutfit();

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        greyAdv(this.loc, outfit);
      },
    };
  }

  mustBeDone(): boolean {
    return this.canUseClue();
  }

  status(): QuestStatus {
    if (getQuestStatus("questL09Topping") < 1) {
      return QuestStatus.NOT_READY;
    }

    if (getProperty("booPeakLit") == "true") {
      return QuestStatus.COMPLETED;
    }

    if (this.getProgress() <= 0) {
      return QuestStatus.READY;
    }

    if (this.canUseClue()) {
      return QuestStatus.READY;
    }

    // We always want to do this as late as we can
    return QuestStatus.FASTER_LATER;
  }

  canUseClue(): boolean {
    return this.getProgress() > 0 && availableAmount(this.clue) > 0;
  }

  getProgress(): number {
    return toInt(getProperty("booPeakProgress"));
  }
}
