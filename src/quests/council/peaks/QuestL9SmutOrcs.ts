import {
  availableAmount,
  canadiaAvailable,
  cliExecute,
  Effect,
  effectModifier,
  equip,
  equippedAmount,
  getFuel,
  getProperty,
  getWorkshed,
  haveEffect,
  haveSkill,
  Item,
  itemAmount,
  Location,
  maximize,
  Monster,
  myMeat,
  myMp,
  numericModifier,
  print,
  Skill,
  Slot,
  toInt,
  turnsPlayed,
  use,
  visitUrl,
} from "kolmafia";
import { AbsorbsProvider } from "../../../utils/GreyAbsorber";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { Macro } from "../../../utils/MacroBuilder";
import { PropertyManager } from "../../../utils/Properties";
import {
  isGhostBustingTime,
  shouldAvoidGhosts,
} from "../../custom/QuestTrapGhost";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { QuestL9SmutOrcsCargoShorts } from "./QuestSmutOrcsCargoShorts";

export class SmutOrcs implements QuestInfo {
  loc: Location = Location.get("The Smut Orc Logging Camp");
  shorts: QuestL9SmutOrcsCargoShorts = new QuestL9SmutOrcsCargoShorts();
  hoaReg: Item = Item.get("HOA regulation book");
  spaceTrip: Item = Item.get("Space Trip safety headphones");
  canOfPaint: Item = Item.get("Can of black paint");
  paintRes: Effect = effectModifier(this.canOfPaint, "Effect");
  asdonMartin: Item = Item.get("Asdon Martin keyfob");
  driveSafe: Effect = Effect.get("Driving Safely");
  lastColdCheck: number = 0;
  hasEnoughCold: boolean = false;
  lastColdMaximize: string;
  smutSleazeSkill: Skill = Skill.get("Procgen Ribaldry");
  sleazeMonster: Monster = Monster.get("Smut orc screwer");
  damagingEquips: Item[] = [
    "Muscle band",
    "Ant Hoe",
    "Ant Pick",
    "Ant Pitchfork",
    "Ant Rake",
    "Ant Sickle",
    "Tiny bowler",
  ].map((s) => Item.get(s));
  plastered: Monster = Monster.get("plastered frat orc");
  noise: Skill = Skill.get("Grey Noise");

  level(): number {
    return 7;
  }

  getChildren(): QuestInfo[] {
    return [this.shorts];
  }

  canAcceptPrimes(): boolean {
    return false;
  }

  mustBeDone(reallyMustBeDone: boolean): boolean {
    if (reallyMustBeDone) {
      return false;
    }

    return isGhostBustingTime(this.loc);
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL09Topping");

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    if (isGhostBustingTime(this.loc) && !this.isNCTime()) {
      return QuestStatus.NOT_READY;
    }

    if (
      status < 0 ||
      myMp() < 15 ||
      !AbsorbsProvider.getAbsorbedMonsters().includes(this.plastered)
    ) {
      return QuestStatus.NOT_READY;
    }

    if (!this.isNCTime()) {
      if (this.lastColdCheck < turnsPlayed() - 5) {
        this.lastColdCheck = turnsPlayed();

        const compare: [string, number][] = [];

        maximize("cold dmg 10 min -ML 70 min -tie", true);
        const melee = numericModifier("Generated:_spec", "Cold Damage");
        compare.push(["cold dmg", melee]);

        if (haveSkill(this.noise)) {
          maximize("cold spell dmg 10 min -ML 70 min -tie", true);
          const spell = numericModifier("Generated:_spec", "Cold Spell Damage");

          compare.push(["cold spell dmg", spell]);
        }

        // Sort from highest to lowest
        compare.sort(([, c1], [, c2]) => c2 - c1);
        this.hasEnoughCold = compare[0][1] >= 5;
        this.lastColdMaximize = compare[0][0];
      }

      if (!this.hasEnoughCold) {
        return QuestStatus.NOT_READY;
      }
    }

    if (getProperty("questL11Shen") != "finished") {
      return QuestStatus.FASTER_LATER;
    }

    if (this.isNCTime() && myMeat() <= 1000) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  getId(): QuestType {
    return "Council / Peaks / Orcs";
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  getFastenersHave() {
    return ["Thick Caulk", "Long Hard Screw", "Messy Butt Joint"].reduce(
      (s, v) => s + itemAmount(Item.get(v)),
      0
    );
  }

  getLumberHave() {
    return [
      "Morningwood Plank",
      "Raging Hardwood Plank",
      "Weirdwood Plank",
    ].reduce((s, v) => s + itemAmount(Item.get(v)), 0);
  }

  getChasmBuilt() {
    return toInt(getProperty("chasmBridgeProgress"));
  }

  getChasmRemaining() {
    const remaining = 30 - this.getChasmBuilt();

    return remaining - Math.min(this.getFastenersHave(), this.getLumberHave());
  }

  run(): QuestAdventure {
    if (this.isNCTime()) {
      return this.tryNC();
    }

    return this.tryCombat();
  }

  tryCombat(): QuestAdventure {
    // max -ml, max cold dmg, raise item drop finally
    const outfit = new GreyOutfit();
    outfit.addBonus("-5 ML");
    outfit.setItemDrops();

    if (
      this.getLumberHave() <= this.getFastenersHave() &&
      this.getChasmRemaining() > this.getLumberHave()
    ) {
      const quest = this.tryHatchet();

      if (quest != null) {
        return quest;
      }

      if (availableAmount(Item.get("Logging Hatchet")) > 0) {
        outfit.addItem(Item.get("Logging Hatchet"));
      }
    }

    if (
      this.getLumberHave() >= this.getFastenersHave() &&
      this.getChasmRemaining() > this.getFastenersHave()
    ) {
      if (availableAmount(Item.get("Loadstone")) > 0) {
        outfit.addItem(Item.get("Loadstone"));
      }
    }

    outfit.addBonus("+100 " + this.lastColdMaximize + " 5 min 5 max");

    return {
      location: this.loc,
      outfit: outfit,
      mayFreeRun: false,
      orbs: haveSkill(this.smutSleazeSkill) ? null : [this.sleazeMonster],
      run: () => {
        let attack: Macro;

        const meleeDmg = numericModifier("Cold Damage");
        const spellDmg = numericModifier("Cold Spell Damage");

        if (meleeDmg <= 0 && spellDmg <= 0) {
          throw "Not enough cold damage to do smut orcs!";
        }

        if (meleeDmg > spellDmg) {
          attack = Macro.attack();
        } else {
          attack = Macro.skill("Grey Noise");
        }

        for (const i of this.damagingEquips) {
          if (equippedAmount(i) > 0) {
            equip(Slot.get("familiar"), Item.get("None"));
          }
        }

        greyAdv(
          this.loc,
          outfit,
          new AdventureSettings().setFinishingBlowMacro(attack.repeat())
        );
        this.tryBuild();
      },
    };
  }

  tryNC(): QuestAdventure {
    return {
      location: null,
      run: () => {
        const props = new PropertyManager();
        let outfits = this.getBestBlechOutfit();

        if (outfits[0][2] < 14) {
          const mox = outfits.find((o) => o[0] == 3);
          const extraRes =
            (haveEffect(this.paintRes) == 0 ? 1 : 0) +
            (getWorkshed() == this.asdonMartin &&
            haveEffect(this.driveSafe) == 0 &&
            getFuel() >= 37
              ? 1
              : 0);

          if (
            extraRes > 0 &&
            (mox == outfits[0] || mox[2] + extraRes > outfits[0][2])
          ) {
            if (myMeat() >= 1000 && haveEffect(this.paintRes) == 0) {
              cliExecute("retrieve " + this.canOfPaint);
              use(this.canOfPaint);
            }

            if (
              getWorkshed() == this.asdonMartin &&
              haveEffect(this.driveSafe) == 0 &&
              getFuel() >= 37
            ) {
              cliExecute("asdonmartin drive safely");
            }

            outfits = this.getBestBlechOutfit();
          }
        }

        const best = outfits[0];

        maximize(best[1], false);

        try {
          props.setChoice(1345, best[0]);
          greyAdv(this.loc);
          this.tryBuild();
        } finally {
          props.resetAll();
        }
      },
    };
  }

  tryExtraRes() {}

  isNCTime(): boolean {
    const progress = getProperty("smutOrcNoncombatProgress");

    if (progress == "") {
      return false;
    }

    return toInt(progress) >= 15;
  }

  tryBuild() {
    const box = Item.get("Smut Orc Keepsake Box");

    if (itemAmount(box) > 0) {
      use(box, itemAmount(box));
    }

    visitUrl(
      "place.php?whichplace=orc_chasm&action=bridge" +
        toInt(getProperty("chasmBridgeProgress"))
    );
  }

  tryHatchet(): QuestAdventure {
    if (!canadiaAvailable()) {
      return;
    }

    if (availableAmount(Item.get("Logging Hatchet")) > 0) {
      return;
    }

    const loc = Location.get("Camp Logging Camp");

    if (
      loc.turnsSpent > 0 ||
      loc.combatQueue != "" ||
      loc.noncombatQueue != ""
    ) {
      return;
    }

    return {
      location: null,
      run: () => {
        greyAdv(loc);
      },
    };
  }

  // getChildren(): QuestInfo[] {
  //   return [this.shorts];
  // }

  simMax(ma: string): number {
    const sim = maximize(ma, 0, 0, true, true);
    let score: number = 0;

    for (const e of sim) {
      score += e.score;
    }

    return score;
  }

  getBestBlechOutfit(): [number, string, number][] {
    // Stolen from autoscend
    // floor(sqrt((mus+flat_weapon_damage)/15*(1+percent_weapon_damage/100)))
    const musMaximizer =
      "100muscle,100weapon damage,1000weapon damage percent +switch left-hand man";
    const mysMaximizer =
      "100mysticality,100spell damage,1000 spell damage percent +switch left-hand man";
    const moxMaximizer = "100moxie,1000sleaze resistance +switch left-hand man";

    this.simMax(musMaximizer);
    const musmus = numericModifier("Generated:_spec", "Buffed Muscle");
    const musflat = numericModifier("Generated:_spec", "Weapon Damage");
    const musperc = numericModifier("Generated:_spec", "Weapon Damage Percent");
    const muscleScore = Math.floor(
      Math.sqrt(((musmus + musflat) / 15) * (1 + musperc / 100))
    );

    this.simMax(mysMaximizer);
    const mysmys = numericModifier("Generated:_spec", "Buffed Mysticality");
    const mysflat = numericModifier("Generated:_spec", "Spell Damage");
    const mysperc = numericModifier("Generated:_spec", "Spell Damage Percent");
    const mystScore = Math.floor(
      Math.sqrt(((mysmys + mysflat) / 15) * (1 + mysperc / 100))
    );

    this.simMax(moxMaximizer);
    const moxmox = numericModifier("Generated:_spec", "Buffed Moxie");
    const moxres = numericModifier("Generated:_spec", "Sleaze Resistance");
    const moxScore = Math.floor(Math.sqrt((moxmox / 30) * (1 + moxres * 0.69)));

    print("Mus Score: " + muscleScore, "blue");
    print("Myst Score: " + mystScore, "blue");
    print("Moxie Score: " + moxScore, "blue");

    const mus: [number, string, number] = [1, musMaximizer, muscleScore];
    const mys: [number, string, number] = [2, mysMaximizer, mystScore];
    const mox: [number, string, number] = [3, moxMaximizer, moxScore];

    return [mus, mys, mox].sort((m1, m2) => m2[2] - m1[2]);
  }
}
