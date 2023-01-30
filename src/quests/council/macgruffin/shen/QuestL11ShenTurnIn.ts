import {
  availableAmount,
  cliExecute,
  Effect,
  Familiar,
  getProperty,
  haveEffect,
  haveFamiliar,
  haveSkill,
  isBanished,
  Item,
  Location,
  Monster,
  myFamiliar,
  refreshStatus,
  Skill,
  use,
  useFamiliar,
} from "kolmafia";
import { DelayBurners } from "../../../../iotms/delayburners/DelayBurners";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { currentPredictions } from "../../../../utils/GreyUtils";
import { PropertyManager } from "../../../../utils/Properties";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11ShenTurnIn implements QuestInfo {
  disguise: Item = Item.get("Crappy Waiter Disguise");
  shenClub: Location = Location.get("The Copperhead Club");
  crappy: Effect = Effect.get("Crappily Disguised as a Waiter");
  crappyDisguises: Monster[] = [
    "Waiter dressed as a ninja",
    "Ninja dressed as a waiter",
  ].map((s) => Monster.get(s));
  toAbsorb: Monster[];
  nanovision: Skill = Skill.get("Double Nanovision");
  cocktail: Item = Item.get("Unnamed cocktail");
  penguin: Monster = Monster.get("Mob Penguin Capo");
  robor: Familiar = Familiar.get("Robortender");
  ball: Item = Item.get("miniature crystal ball");
  snapper: Familiar = Familiar.get("Red-Nosed Snapper");

  getId(): QuestType {
    return "Council / MacGruffin / Shen / TurnIn";
  }

  level(): number {
    return 11;
  }

  mustBeDone(): boolean {
    return this.haveEffect();
  }

  free(): boolean {
    return this.haveEffect();
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL11Shen");

    if (status > 6) {
      return QuestStatus.COMPLETED;
    }

    if (
      currentPredictions().get(this.shenClub) == this.penguin &&
      (this.toAbsorb.includes(this.penguin) || haveFamiliar(this.robor))
    ) {
      return QuestStatus.READY;
    }

    if (status < 2) {
      return QuestStatus.NOT_READY;
    }

    if (status % 2 == 1) {
      return QuestStatus.NOT_READY;
    }

    if (!haveSkill(this.nanovision)) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  needToDeliver(): boolean {
    const prop = getProperty("questL11Shen");

    return prop == "step2" || prop == "step4" || prop == "step6";
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit();

    /*  if (
      getProperty("copperheadClubHazard") != "lantern" ||
      availableAmount(this.cocktail) < 2
    )*/ {
      outfit.setItemDrops();
    }

    const fishHuntTime =
      haveFamiliar(this.robor) &&
      !isBanished(this.penguin) &&
      this.toAbsorb.length == 0;
    const roboTime =
      fishHuntTime && currentPredictions().get(this.shenClub) == this.penguin;
    const snapperTime =
      ((fishHuntTime && !roboTime) ||
        (currentPredictions().get(this.shenClub) != this.penguin &&
          this.toAbsorb.includes(this.penguin))) &&
      haveFamiliar(this.snapper) &&
      availableAmount(this.ball) > 0;

    if (
      this.toAbsorb.length == 0 &&
      currentPredictions().get(this.shenClub) != this.penguin
    ) {
      outfit.addDelayer();
    }

    return {
      location: this.shenClub,
      outfit: outfit,
      familiar: snapperTime ? this.snapper : roboTime ? this.robor : null,
      olfaction: haveFamiliar(this.robor) ? [this.penguin] : null,
      mayFreeRun: false,
      run: () => {
        if (!this.hittingNC()) {
          if (!this.haveEffect() && availableAmount(this.disguise) > 0) {
            use(this.disguise);
          }
        }

        if (
          !roboTime &&
          this.toAbsorb.length == 0 &&
          DelayBurners.isTryingForDupeableGoblin()
        ) {
          useFamiliar(Familiar.get("Grey Goose"));
        }

        if (myFamiliar() == this.snapper) {
          cliExecute("snapper penguin");
        }

        const props = new PropertyManager();

        try {
          if (getProperty("copperheadClubHazard") != "lantern") {
            props.setChoice(855, 3); // Light lanterns on fire
          } else {
            props.setChoice(855, 4); // Get unnamed cocktails
          }

          props.setChoice(1074, 1); // Approach table
          props.setChoice(851, 1); // Sip poison
          props.setChoice(852, 1); // Sip poison
          props.setChoice(853, 1); // Sip poison
          props.setChoice(854, 1); // Sip poison

          const settings = new AdventureSettings();

          for (const m of this.crappyDisguises) {
            settings.addNoBanish(m);
          }

          if (haveFamiliar(this.robor)) {
            settings.addNoBanish(this.penguin);
          }

          greyAdv(this.shenClub, outfit, settings);

          if (this.haveEffect()) {
            refreshStatus();

            if (this.haveEffect()) {
              greyAdv(this.shenClub, outfit, settings);
            }
          }
        } finally {
          props.resetAll();
        }
      },
    };
  }

  hittingNC(): boolean {
    const turnsSpent = this.shenClub.turnsSpent;
    const nextMeeting = Math.floor(getQuestStatus("questL11Shen") / 2) * 5;

    return turnsSpent > nextMeeting - 1;
  }

  getLocations(): Location[] {
    return [this.shenClub];
  }

  haveEffect(): boolean {
    return haveEffect(this.crappy) > 0;
  }
}
