import {
  Location,
  Item,
  myMeat,
  getProperty,
  toInt,
  myAscensions,
  availableAmount,
  use,
  myDaycount,
  print,
  Monster,
  getZapWand,
} from "kolmafia";
import { PropertyManager } from "../../utils/Properties";
import { hasNonCombatSkillsReady } from "../../GreyAdventurer";
import { greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestGetZapWand implements QuestInfo {
  realDung: Location = Location.get("The Dungeons of Doom");
  deadMimic: Item = Item.get("dead mimic");
  plusSign: Item = Item.get("plus sign");
  toAbsorb: Monster[];

  getId(): QuestType {
    return "Misc / GrabZapWand";
  }

  level(): number {
    return 8;
  }

  shouldHaveWand(): boolean {
    return toInt(getProperty("lastZapperWand")) == myAscensions();
  }

  isDoomUnlocked(): boolean {
    return (
      toInt(getProperty("lastPlusSignUnlock")) == myAscensions() &&
      availableAmount(this.plusSign) == 0
    );
  }

  getTimesZapped(): number {
    return toInt(getProperty("_zapCount"));
  }

  status(): QuestStatus {
    if (this.shouldHaveWand() || this.getWand() != null) {
      return QuestStatus.COMPLETED;
    }

    let meatOnHand = 6000;

    if (getQuestStatus("questL11Black") < 3) {
      meatOnHand += 3000;
    }

    if (myMeat() < meatOnHand || !this.isDoomUnlocked()) {
      return QuestStatus.NOT_READY;
    }

    // Only be very requirement if we have the MP regen skill
    if (!hasNonCombatSkillsReady(this.toAbsorb.length == 0 ? true : false)) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  getWand(): Item {
    const wand = getZapWand();

    return wand == Item.get("None") ? null : wand;
  }

  hasWandExploded() {
    return toInt(getProperty("lastZapperWandExplosionDay")) == myDaycount();
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit().setNoCombat();

    return {
      outfit: outfit,
      location: this.realDung,
      run: () => {
        const props = new PropertyManager();

        props.setChoice(25, 2);

        try {
          greyAdv(this.realDung, outfit);
        } finally {
          props.resetAll();
        }

        if (availableAmount(this.deadMimic) > 0) {
          use(this.deadMimic);

          if (this.getWand() == null) {
            print(
              "Something has gone wrong. We used a dead mimic but didn't get a wand."
            );
          }
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.realDung];
  }
}
