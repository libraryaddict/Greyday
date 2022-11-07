import {
  Item,
  toInt,
  getProperty,
  availableAmount,
  toFloat,
  Location,
  changeMcd,
  Monster,
  maximize,
  cliExecute,
  myHp,
  equip,
  myEffects,
  numericModifier,
  equippedAmount,
  familiarWeight,
  Familiar,
  Slot,
  Effect,
  print,
  toBoolean,
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
  baron: Monster = Monster.get("Oil Baron");

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
    return 17;
  }

  status(): QuestStatus {
    if (myHp() < 90) {
      return QuestStatus.NOT_READY;
    }

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
        const effects = Object.keys(myEffects())
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
    return !AbsorbsProvider.getReabsorbedMonsters().includes(this.baron);
  }

  isReady(): boolean {
    return this.needsJar() || this.getStatus() > 0;
  }

  getStatus(): number {
    return toFloat(getProperty("oilPeakProgress"));
  }

  doAbsorb(): QuestAdventure {
    const doneFirst =
      this.loc.turnsSpent > 0 ||
      this.loc.noncombatQueue.includes(
        "Pushin' Down on Me, Pushin' Down on You"
      );

    return {
      location: this.loc,
      run: () => {
        if (doneFirst) {
          print("Now doing a special adventure for Oil Baron absorb!", "blue");
        }

        this.doMonsterLevel();

        greyAdv(this.loc);
        changeMcd(0);

        if (this.needsAbsorb() && doneFirst) {
          throw "We spent a turn trying to grab the absorb for oil baron! This didn't work..";
        }
      },
    };
  }

  doMonsterLevel() {
    changeMcd(10);
    maximize(
      "ML 50 MIN 51 MAX -tie -equip unbreakable umbrella" +
        (getProperty("cursedMagnifyingGlassCount") == "13"
          ? " -equip Cursed magnifying glass"
          : ""),
      false
    );

    const level = numericModifier("Monster Level");

    if (level >= 99) {
      throw "Need to lower your monster level, TODO!";
    }

    if (level <= 50) {
      if (getProperty("backupCameraMode") != "ml") {
        cliExecute("backupcamera ml");
      }

      const item = Item.get("Backup Camera");

      if (equippedAmount(item) == 0) {
        equip(item, Slot.get("acc3"));
      }

      if (numericModifier("Monster Level") < 50) {
        throw "Need to raise your monster level, TODO!";
      }
    }
  }

  mustBeDone(): boolean {
    return this.free();
  }

  free(): boolean {
    return this.getPressureLeft() <= 0 && !toBoolean(getProperty("oilPeakLit"));
  }

  getPressureLeft(): number {
    return toFloat(getProperty("oilPeakProgress"));
  }

  run(): QuestAdventure {
    if (this.free()) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          greyAdv(this.loc);
        },
      };
    }

    if (this.needsAbsorb()) {
      return this.doAbsorb();
    }

    const outfit = new GreyOutfit().setItemDrops();
    outfit.addWeight("ML", 2, null, 100);
    outfit.umbrellaSetting = UmbrellaState.MONSTER_LEVEL;
    outfit.addExtra("-offhand");

    return {
      location: this.loc,
      outfit: outfit,
      mayFreeRun: false,
      run: () => {
        if (numericModifier("Monster Level") < 100) {
          changeMcd(10);
        }

        if (
          numericModifier("Monster Level") < 100 &&
          availableAmount(this.umbrella) > 0
        ) {
          setUmbrella(UmbrellaState.MONSTER_LEVEL);
          equip(Item.get("Unbreakable Umbrella"));
        }

        greyAdv(this.loc, outfit);
        changeMcd(0);
      },
    };
  }
}
