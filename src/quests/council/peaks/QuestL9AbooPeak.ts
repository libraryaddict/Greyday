import {
  availableAmount,
  cliExecute,
  Effect,
  effectModifier,
  Element,
  elementalResistance,
  getFuel,
  getProperty,
  getWorkshed,
  haveEffect,
  Item,
  Location,
  myHp,
  myLevel,
  print,
  toInt,
  use,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { PropertyManager } from "../../../utils/Properties";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class ABooHandler implements QuestInfo {
  clue: Item = Item.get("A-Boo Clue");
  loc: Location = Location.get("A-Boo Peak");
  damageLevels: number[] = [13, 25, 50, 125, 250];
  canOfPaint: Item = Item.get("Can of black paint");
  asdonMartin: Item = Item.get("Asdon Martin keyfob");
  driveSafe: Effect = Effect.get("Driving Safely");

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
    const outfit = this.createOutfit();

    return {
      location: null,
      outfit: outfit,
      run: () => {
        const props = new PropertyManager();

        if (haveEffect(effectModifier(this.canOfPaint, "Effect")) == 0) {
          cliExecute("acquire 1 " + this.canOfPaint.name);
          use(this.canOfPaint);
        }

        if (
          getWorkshed() == this.asdonMartin &&
          haveEffect(this.driveSafe) == 0 &&
          getFuel() >= 37
        ) {
          cliExecute("asdonmartin drive safely");
        }

        try {
          props.setChoice(611, 1);
          use(this.clue);

          const settings = new AdventureSettings();
          let turn = 0;

          settings.setChoices({
            calledOutOfScopeChoiceBehavior: (choice: number) => {
              return false;
            },

            handleChoice: (choice: number) => {
              const dmgTaken = this.damageTaken(turn++);

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
    const dmg = this.damageLevels[turn];

    const sDmg = this.damageTakenByElement(dmg, Element.get("spooky"));
    const cDmg = this.damageTakenByElement(dmg, Element.get("cold"));

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
    const damageLevels: number[] = [13, 25, 50, 125, 250];
    let totalDamage: number = 2;
    let reducedBy: number = 0;

    for (let i = 0; i < damageLevels.length; i++) {
      if (this.getProgress() <= reducedBy) {
        return true;
      }

      const dmg = damageLevels[i];

      const sDmg = this.damageTakenByElement(dmg, Element.get("spooky"));
      const cDmg = this.damageTakenByElement(dmg, Element.get("cold"));

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

    const resist = elementalResistance(element) / 100.0;

    const effective_base_damage = Math.max(30, base_damage);

    const damage = Math.max(
      1,
      Math.ceil(base_damage - effective_base_damage * resist)
    );

    return damage;
  }

  createOutfit(): GreyOutfit {
    const outfit = new GreyOutfit().addBonus(
      "+40 cold res +40 spooky res -10 ML"
    );
    outfit.hpWeight = 2;

    return outfit;
  }

  runCombat(): QuestAdventure {
    const outfit = this.createOutfit();

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

  canAcceptPrimes(): boolean {
    return false;
  }

  status(): QuestStatus {
    if (
      getQuestStatus("questL09Topping") < 1 ||
      getQuestStatus("questL11Black") < 2
    ) {
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

    if (myLevel() >= 20) {
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
