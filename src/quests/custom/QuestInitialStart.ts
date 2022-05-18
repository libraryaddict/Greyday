import {
  autosell,
  availableAmount,
  cliExecute,
  equip,
  equippedAmount,
  Familiar,
  familiarWeight,
  getProperty,
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
  squareRoot,
  toBoolean,
  toInt,
  use,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { GreyPulls } from "../../utils/GreyResources";
import { GreySettings } from "../../utils/GreySettings";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestInitialStart implements QuestInfo {
  property: string = "greyYouLastPowerLeveled";
  familiar: Familiar = Familiar.get("Grey Goose");
  equip: Item = Item.get("Grey Down Vest");
  desiredLevel: number;
  weightRequired: number;
  spaceBlanket: Item = Item.get("Space Blanket");
  mayday: Item = Item.get("MayDay™ supply package");

  constructor(desiredLevel: number) {
    desiredLevel = 1;

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
    return 0;
  }

  status(): QuestStatus {
    if (availableAmount(this.mayday) > 0) {
      return QuestStatus.READY;
    }

    if (
      myLevel() >= this.desiredLevel ||
      toInt(getProperty(this.property)) == myAscensions()
    ) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    if (availableAmount(this.mayday) > 0) {
      return {
        location: null,
        run: () => {
          if (!hippyStoneBroken() && toBoolean(getProperty("auto_pvpEnable"))) {
            visitUrl("peevpee.php?action=smashstone&pwd&confirm=on", true);
            visitUrl("peevpee.php?place=fight");
          }

          if (!GreySettings.isHardcoreMode()) {
            GreyPulls.pullStartingGear();
          }

          use(this.mayday);

          if (availableAmount(this.spaceBlanket) > 0) {
            autosell(this.spaceBlanket, 1);
          }

          cliExecute("breakfaster");
        },
      };
    }

    return {
      outfit: new GreyOutfit("familiar experience -tie"),
      location: null,
      run: () => {
        if (!hippyStoneBroken() && toBoolean(getProperty("auto_pvpEnable"))) {
          visitUrl("peevpee.php?action=smashstone&pwd&confirm=on", true);
          visitUrl("peevpee.php?place=fight");
        }

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
          print(
            "Oh god! You are a disappointment Mr Goose! You only weigh " +
              familiarWeight(this.familiar) +
              " of the " +
              weightNeeded +
              " we wanted!",
            "red"
          );
          return;
        }

        /* print("Now we just need to travel somewhere to burn this exp");

        maximize(new GreyOutfit().createString(), false);
        greyAdv(
          Location.get("The Dire Warren"),
          null,
          new AdventureSettings().setFinishingBlowMacro(
            Macro.trySkill(Skill.get("Convert Matter to Pomade")).step(
              greyKillingBlow(new GreyOutfit())
            )
          )
        );*/
        // Eh, just burn it in knob as delay.
        // TODO
      },
    };
  }

  getId(): QuestType {
    return "Misc / InitialStart";
  }
}
