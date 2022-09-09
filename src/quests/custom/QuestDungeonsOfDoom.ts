import {
  Location,
  Familiar,
  Item,
  Effect,
  haveEffect,
  myMeat,
  getProperty,
  toInt,
  myAscensions,
  availableAmount,
  use,
  myLevel,
  cliExecute,
} from "kolmafia";
import { PropertyManager } from "../../utils/Properties";
import { hasNonCombatSkillsReady } from "../../GreyAdventurer";
import { AdventureSettings, greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";
import { DelayBurners } from "../../iotms/delayburners/DelayBurners";

export class QuestDungeonsOfDoom implements QuestInfo {
  bend: Location = Location.get("The Enormous Greater-Than Sign");
  plusSign: Item = Item.get("plus sign");
  teleportis: Effect = Effect.get("Teleportitis");
  beatenUp: Effect = Effect.get("Beaten Up");

  // TODO Once we have the absorb, do replace combats

  getId(): QuestType {
    return "Misc / UnlockDungeonsOfDoom";
  }

  level(): number {
    return 8;
  }

  isDoomUnlocked(): boolean {
    return (
      toInt(getProperty("lastPlusSignUnlock")) == myAscensions() &&
      availableAmount(this.plusSign) == 0
    );
  }

  status(): QuestStatus {
    if (this.isDoomUnlocked()) {
      return QuestStatus.COMPLETED;
    }

    // Due to poison, we don't want to get into the rare state where we are double nerfed
    if (myMeat() < 1300 || haveEffect(this.beatenUp) > 0) {
      return QuestStatus.NOT_READY;
    }

    // If we have not purchased the 5k forged documents yet, or the tavern is not available yet
    if (
      ((myMeat() < 7000 && getProperty("questL11Black") != "finished") ||
        getProperty("questL02Larva") != "finished") &&
      availableAmount(this.plusSign) > 0
    ) {
      return QuestStatus.NOT_READY;
    }

    if (myLevel() < 12 && availableAmount(this.plusSign) == 0) {
      return QuestStatus.NOT_READY;
    }

    if (!hasNonCombatSkillsReady(false)) {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.plusSign) > 0 && myLevel() < 16) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit().setNoCombat();

    return {
      outfit: outfit,
      location: this.bend,
      run: () => {
        if (
          availableAmount(this.plusSign) > 0 &&
          toInt(getProperty("lastPlusSignUnlock")) == myAscensions()
        ) {
          use(this.plusSign);
          return;
        }

        const settings = new AdventureSettings();
        settings.setChoices({
          handleChoice: (choiceNo: number): number => {
            if (choiceNo == 3) {
              return 3;
            } else if (choiceNo == 451) {
              return availableAmount(this.plusSign) > 0 ? 5 : 3;
            }

            return null;
          },

          calledOutOfScopeChoiceBehavior: (choiceNo: number): boolean => {
            return false;
          },
        });

        greyAdv(this.bend, outfit, settings);

        if (toInt(getProperty("lastPlusSignUnlock")) == myAscensions()) {
          if (availableAmount(this.plusSign) == 0) {
            cliExecute("refresh inventory");
          }

          use(this.plusSign);
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.bend];
  }

  mustBeDone(): boolean {
    return (
      haveEffect(this.teleportis) > 0 && availableAmount(this.plusSign) > 0
    );
  }

  canAcceptPrimes(): boolean {
    return (
      availableAmount(this.plusSign) == 0 && haveEffect(this.teleportis) == 0
    );
  }
}
