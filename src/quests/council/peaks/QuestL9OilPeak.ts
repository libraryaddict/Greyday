import {
  Item,
  toInt,
  getProperty,
  availableAmount,
  toFloat,
  Location,
  monsterLevelAdjustment,
  changeMcd,
  Monster,
  maximize,
  cliExecute,
  myHp,
  equip,
  myEffects,
  effectModifier,
  numericModifier,
  currentMcd,
  equippedAmount,
  familiarWeight,
  Familiar,
  Slot,
  Effect,
} from "kolmafia";
import { AbsorbsProvider } from "../../../utils/GreyAbsorber";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { setUmbrella, UmbrellaState } from "../../../utils/GreyUtils";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class OilHandler implements QuestInfo {
  loc: Location = Location.get("Oil Peak");
  crude: Item = Item.get("Bubblin' Crude");
  umbrella: Item = Item.get("Unbreakable Umbrella");

  getId(): QuestType {
    return "Council / Peaks / OilPeak";
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  needsJar() {
    return (
      (toInt(getProperty("twinPeakProgress")) & 4) == 0 &&
      availableAmount(this.crude) < 12 &&
      availableAmount(Item.get("Jar of Oil")) == 0
    );
  }

  level(): number {
    return 9;
  }

  status(): QuestStatus {
    if (
      !this.needsJar() &&
      this.getStatus() <= 0 &&
      getProperty("oilPeakLit") == "true"
    ) {
      return QuestStatus.COMPLETED;
    }

    if (getQuestStatus("questL09Topping") < 1) {
      return QuestStatus.NOT_READY;
    }

    if (myHp() < 140) {
      return QuestStatus.NOT_READY;
    }

    if (this.needsAbsorb()) {
      if (familiarWeight(Familiar.get("Grey Goose")) < 6) {
        let effects = Object.keys(myEffects())
          .map((e) => Effect.get(e))
          .reduce((p, e) => numericModifier(e, "Monster Level") + p, 0);

        if (effects != 0) {
          return QuestStatus.NOT_READY;
        }
      }
    }

    return QuestStatus.READY;
  }

  needsAbsorb(): boolean {
    return !AbsorbsProvider.getReabsorbedMonsters().includes(
      Monster.get("Oil Baron")
    );
  }

  isReady(): boolean {
    return this.needsJar() || this.getStatus() > 0;
  }

  getStatus(): number {
    return toFloat(getProperty("oilPeakProgress"));
  }

  doAbsorb(): QuestAdventure {
    return {
      location: this.loc,
      run: () => {
        this.doMonsterLevel();
        greyAdv(this.loc);
      },
    };
  }

  doMonsterLevel() {
    let level = numericModifier("Monster Level");

    if (level >= 100) {
      throw "Need to lower your monster level, TODO!";
    }

    if (level <= 50) {
      cliExecute("backupcamera ml");

      let item = Item.get("Backup Camera");

      if (equippedAmount(item) == 0) {
        equip(Slot.get("Acc3"), item);
      }

      if (numericModifier("Monster Level") < 50) {
        throw "Need to raise your monster level, TODO!";
      }
    }
  }

  run(): QuestAdventure {
    if (this.needsAbsorb()) {
      return this.doAbsorb();
    }

    let outfit = new GreyOutfit().setItemDrops();
    outfit.plusMonsterLevelWeight = 2;
    //    outfit.addItem(Item.get("Unbreakable Umbrella"));
    outfit.addBonus("-offhand");

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        changeMcd(10);

        if (availableAmount(this.umbrella) > 0) {
          setUmbrella(UmbrellaState.MONSTER_LEVEL);
          equip(Item.get("Unbreakable Umbrella"));
        }

        greyAdv(this.loc, outfit);
        changeMcd(0);
      },
    };
  }
}
