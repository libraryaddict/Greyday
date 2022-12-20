import {
  Item,
  toInt,
  getProperty,
  availableAmount,
  toFloat,
  Location,
  changeMcd,
  Monster,
  myHp,
  equip,
  myEffects,
  numericModifier,
  familiarWeight,
  Familiar,
  Effect,
  print,
  toBoolean,
  haveEffect,
  myMaxhp,
  currentMcd,
  equippedAmount,
  maximize,
  toSlot,
  Slot,
  equippedItem,
  cliExecute,
} from "kolmafia";
import { restoreHPTo } from "../../../tasks/TaskMaintainStatus";
import { AbsorbsProvider } from "../../../utils/GreyAbsorber";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getAllCombinations,
  getUmbrella,
  setUmbrella,
  UmbrellaState,
} from "../../../utils/GreyUtils";
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
  beatenUp = Effect.get("Beaten Up");

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

    if (myHp() < 90 || haveEffect(this.beatenUp) > 0) {
      return QuestStatus.FASTER_LATER;
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

    const outfit = new GreyOutfit();

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        if (doneFirst) {
          print("Now doing a special adventure for Oil Baron absorb!", "blue");

          const needed = 50 - (10 - currentMcd());

          let maxResult = maximize(
            `ml ${needed} min ${needed} max -tie`,
            0,
            0,
            true,
            true
          );

          maxResult = maxResult.filter(
            (res) => toSlot(res.item) != Slot.none && res.score != 0
          );

          const workingCombos: [number, string[]][] = [];

          for (const combo of getAllCombinations(maxResult)) {
            const baseML =
              Slot.all()
                .map((s) => [s, equippedItem(s)] as [Slot, Item])
                .filter(
                  ([s, i]) =>
                    i != Item.none &&
                    combo.find(
                      (r) => r.command.startsWith("equip " + s) == null
                    )
                )
                .map(([, i]) => numericModifier(i, "Monster Level"))
                .reduce((l, r) => l + r, 0) + currentMcd();

            const addedML = combo
              .map((r) => r.score)
              .reduce((l, r) => r + l, 0);

            if (baseML + addedML < needed) {
              continue;
            }

            workingCombos.push([addedML + baseML, combo.map((r) => r.command)]);
          }

          workingCombos.sort((c1, c2) => c1[0] - c2[0]);

          if (workingCombos.length > 0 && needed > 0) {
            workingCombos[0][1].forEach((s) => cliExecute(s));
          }

          const ml = () => {
            let level = numericModifier("Monster Level");

            const state = getUmbrella();

            if (
              state == UmbrellaState.MONSTER_LEVEL &&
              equippedAmount(this.umbrella) > 0
            ) {
              level *= 0.25;
            }

            return level;
          };

          if (ml() < 50) {
            changeMcd(10);
          }

          if (ml() < 50) {
            throw "Unable to raise enough ML to get the oil baron, handle manually?";
          } else if (ml() >= 100) {
            throw "Too much ML on the oil baron, we want less than 100!";
          }
        }

        greyAdv(this.loc);

        if (currentMcd() > 0) {
          changeMcd(0);
        }

        if (this.needsAbsorb() && doneFirst) {
          throw "We spent a turn trying to grab the absorb for oil baron! This didn't work..";
        }
      },
    };
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

    if (myMaxhp() < 150) {
      outfit.addWeight("hp", 1);
    }

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

        if (myHp() < Math.min(150, myMaxhp() * 0.9)) {
          restoreHPTo(Math.min(150, myMaxhp() * 0.9));
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
