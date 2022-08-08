import {
  autosell,
  availableAmount,
  cliExecute,
  equip,
  equippedAmount,
  Familiar,
  familiarWeight,
  getProperty,
  haveSkill,
  hippyStoneBroken,
  Item,
  Location,
  maximize,
  myAdventures,
  myAscensions,
  myLevel,
  myMeat,
  print,
  setProperty,
  Skill,
  squareRoot,
  toBoolean,
  toInt,
  use,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import { greyKillingBlow } from "../../utils/GreyCombat";
import { greyAdv, AdventureSettings } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { GreyPulls } from "../../utils/GreyResources";
import { GreySettings } from "../../utils/GreySettings";
import { Macro } from "../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestPowerLeveling implements QuestInfo {
  property: string = "greyYouLastPowerLeveled";
  familiar: Familiar = Familiar.get("Grey Goose");
  equip: Item = Item.get("Grey Down Vest");
  skill: Skill = Skill.get("Infinite Loop");
  desiredLevel: number;
  weightRequired: number;

  constructor(desiredLevel: number) {
    this.desiredLevel = desiredLevel;

    this.weightRequired = this.getWeightNeededToReachLevel(desiredLevel);

    if (this.weightRequired > 20) {
      throw (
        "You want to reach level " +
        desiredLevel +
        " but to do that, the goose would have to weigh " +
        this.weightRequired +
        "..."
      );
    }

    let expNeeded = this.weightRequired ^ 2;

    if (familiarWeight(this.familiar) <= 1) {
      expNeeded -= 81; // Short order cook
    } else {
      expNeeded -= this.familiar.experience;
    }

    let turns = expNeeded / 5; // Expect to gain 5 exp per arena fight

    if (turns > 20) {
      throw (
        "Sorry, I can't let you do this. That'd burn more than 20 turns to a total of est " +
        turns
      );
    }
  }

  mustBeDone(): boolean {
    return myLevel() < 5 && myMeat() >= 100;
  }

  getWeightNeededToReachLevel(level: number): number {
    let statsNeeded = this.getStatsRequired(level);

    return 5 + Math.ceil(squareRoot(statsNeeded));
  }

  getStatsRequired(level: number): number {
    return (((level - 1) ^ 2) + 4) ^ 2;
  }

  getLocations(): Location[] {
    return [];
  }

  level(): number {
    return 1;
  }

  status(): QuestStatus {
    if (
      myLevel() >= this.desiredLevel ||
      toInt(getProperty(this.property)) == myAscensions()
    ) {
      return QuestStatus.COMPLETED;
    }

    if (!haveSkill(this.skill)) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      outfit: new GreyOutfit("familiar experience -tie"),
      location: null,
      run: () => {
        useFamiliar(this.familiar);
        maximize("familiar experience", false);

        let weightNeeded = this.getWeightNeededToReachLevel(this.desiredLevel);

        while (
          familiarWeight(this.familiar) < weightNeeded &&
          myAdventures() > 20 &&
          myMeat() >= 100
        ) {
          if (
            equippedAmount(this.equip) == 0 &&
            availableAmount(this.equip) > 0
          ) {
            equip(this.equip);
          }

          cliExecute("train turns 1");
        }

        setProperty(this.property, myAscensions() + "");

        if (familiarWeight(this.familiar) < weightNeeded) {
          throw (
            "Oh god! You are a disappointment Mr Goose! You only weigh " +
            familiarWeight(this.familiar) +
            " of the " +
            weightNeeded +
            " we wanted!"
          );
          return;
        }

        if (myLevel() < 4) {
          print("Now we just need to travel somewhere to burn this exp");

          maximize(new GreyOutfit().createString(), false);
          greyAdv(
            Location.get("The Dire Warren"),
            null,
            new AdventureSettings().setFinishingBlowMacro(
              Macro.trySkill(Skill.get("Convert Matter to Pomade")).step(
                greyKillingBlow(new GreyOutfit())
              )
            )
          );
        }
        // Eh, just burn it in knob as delay.
        // TODO
      },
    };
  }

  getId(): QuestType {
    return "Misc / PowerLeveling";
  }
}
