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
} from "kolmafia";
import { PropertyManager } from "../../utils/Properties";
import { hasNonCombatSkillsReady } from "../../GreyAdventurer";
import { greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";
import { DelayBurners } from "../../iotms/delayburners/DelayBurners";

export class QuestDungeonsOfDoom implements QuestInfo {
  bend: Location = Location.get("The Enormous Greater-Than Sign");
  plusSign: Item = Item.get("plus sign");
  teleportis: Effect = Effect.get("Teleportitis");

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

    if (myMeat() < 1300) {
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

    if (myLevel() < 12) {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.plusSign) > 0 && myLevel() < 16) {
      return QuestStatus.FASTER_LATER;
    }

    if (!hasNonCombatSkillsReady(false)) {
      return QuestStatus.NOT_READY;
    }

    if (!hasNonCombatSkillsReady()) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setNoCombat();

    return {
      outfit: outfit,
      location: this.bend,
      run: () => {
        let props = new PropertyManager();

        if (availableAmount(this.plusSign) > 0) {
          props.setChoice(451, 5);
          props.setChoice(3, 3);
        } else {
          props.setChoice(451, 3);
        }

        try {
          greyAdv(this.bend, outfit);
        } finally {
          props.resetAll();
        }

        if (toInt(getProperty("lastPlusSignUnlock")) == myAscensions()) {
          use(this.plusSign);
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.bend];
  }

  needAdventures(): number {
    return 5;
  }

  mustBeDone?(): boolean {
    return (
      haveEffect(this.teleportis) > 0 && availableAmount(this.plusSign) > 0
    );
  }
}
