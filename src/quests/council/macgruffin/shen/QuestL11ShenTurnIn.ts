import {
  Location,
  Familiar,
  Effect,
  haveEffect,
  Item,
  availableAmount,
  getProperty,
  toInt,
  use,
  Monster,
  Skill,
  haveSkill,
  haveFamiliar,
  isBanished,
  print,
  equip,
  equippedAmount,
  Slot,
  refreshStatus,
  useFamiliar,
} from "kolmafia";
import { PropertyManager } from "../../../../utils/Properties";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";
import { DelayBurners } from "../../../../iotms/delayburners/DelayBurners";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { currentPredictions } from "../../../../utils/GreyUtils";

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

  getId(): QuestType {
    return "Council / MacGruffin / Shen / TurnIn";
  }

  level(): number {
    return 11;
  }

  mustBeDone(): boolean {
    return this.haveEffect();
  }

  needAdventures(): number {
    return this.haveEffect() ? 0 : 1;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL11Shen");

    if (status > 6) {
      if (this.haveEffect()) {
        return QuestStatus.READY;
      }

      return QuestStatus.COMPLETED;
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
    let prop = getProperty("questL11Shen");

    return prop == "step2" || prop == "step4" || prop == "step6";
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();

    /*  if (
      getProperty("copperheadClubHazard") != "lantern" ||
      availableAmount(this.cocktail) < 2
    )*/ {
      outfit.setItemDrops();
    }

    let usingRobo =
      haveFamiliar(this.robor) &&
      !isBanished(this.penguin) &&
      this.toAbsorb.length == 0;

    return {
      location: this.shenClub,
      outfit: outfit,
      familiar: usingRobo ? this.robor : null,
      run: () => {
        if (!this.hittingNC()) {
          if (!this.haveEffect() && availableAmount(this.disguise) > 0) {
            use(this.disguise);
          }
        }

        if (usingRobo && availableAmount(this.ball) > 0) {
          if (
            !currentPredictions().has(this.shenClub) ||
            currentPredictions().get(this.shenClub) == this.penguin
          ) {
            equip(this.ball);
          } else if (equippedAmount(this.ball) > 0) {
            equip(Slot.get("Familiar"), Item.get("None"));
          }
        } else if (
          this.toAbsorb.length == 0 &&
          DelayBurners.isTryingForDupeableGoblin()
        ) {
          useFamiliar(Familiar.get("Grey Goose"));
        }

        let props = new PropertyManager();

        try {
          if (getProperty("copperheadClubHazard") != "lantern") {
            props.setChoice(855, 3); // Light lanterns on fire
          } else {
            props.setChoice(855, 4); // Get unnamed cocktails

            if (this.toAbsorb.length == 0) {
              let ready = DelayBurners.getReadyDelayBurner();

              if (ready != null) {
                ready.doFightSetup();
              } else {
                DelayBurners.tryReplaceCombats();
              }
            }
          }

          props.setChoice(1074, 1); // Approach table
          props.setChoice(851, 1); // Sip poison
          props.setChoice(852, 1); // Sip poison
          props.setChoice(853, 1); // Sip poison
          props.setChoice(854, 1); // Sip poison

          let settings = new AdventureSettings();

          for (let m of this.crappyDisguises) {
            settings.addNoBanish(m);
          }

          if (haveFamiliar(this.robor)) {
            settings.addNoBanish(this.penguin);
          }

          greyAdv(this.shenClub, outfit, settings);

          if (this.haveEffect()) {
            refreshStatus();
          }
        } finally {
          props.resetAll();
        }
      },
    };
  }

  hittingNC(): boolean {
    let turnsSpent = this.shenClub.turnsSpent;
    let nextMeeting = Math.floor(getQuestStatus("questL11Shen") / 2) * 5;

    return turnsSpent > nextMeeting - 1;
  }

  getLocations(): Location[] {
    return [this.shenClub];
  }

  haveEffect(): boolean {
    return haveEffect(this.crappy) > 0;
  }
}
