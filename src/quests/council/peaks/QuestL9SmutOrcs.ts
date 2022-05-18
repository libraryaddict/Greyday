import {
  getProperty,
  itemAmount,
  Item,
  toInt,
  availableAmount,
  Location,
  maximize,
  use,
  visitUrl,
  canadiaAvailable,
  numericModifier,
  print,
  haveSkill,
  myMp,
  Skill,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { Macro } from "../../../utils/MacroBuilder";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { QuestCargoShorts } from "./QuestCargoShorts";

export class SmutOrcs implements QuestInfo {
  loc: Location = Location.get("The Smut Orc Logging Camp");
  shorts: QuestCargoShorts = new QuestCargoShorts();

  level(): number {
    return 7;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL09Topping");

    if (status < 0 || !haveSkill(Skill.get("Grey Noise")) || myMp() < 15) {
      return QuestStatus.NOT_READY;
    }

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("questL11Shen") != "finished") {
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
    let remaining = 30 - this.getChasmBuilt();

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
    let outfit = new GreyOutfit();
    outfit.minusMonsterLevelWeight = 3;
    outfit.setItemDrops();
    outfit.addBonus("+5 cold dmg");

    if (
      this.getLumberHave() <= this.getFastenersHave() &&
      this.getChasmRemaining() > this.getLumberHave()
    ) {
      let quest = this.tryHatchet();

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

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        let attack: Macro;

        if (
          numericModifier("Cold Damage") > numericModifier("Cold Spell Damage")
        ) {
          attack = Macro.attack();
        } else {
          attack = Macro.skill("Grey Noise");
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
        let props = new PropertyManager();
        let best = this.doBestBlechOutfit();
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

  isNCTime(): boolean {
    let progress = getProperty("smutOrcNoncombatProgress");

    if (progress == "") {
      return false;
    }

    return toInt(progress) >= 15;
  }

  tryBuild() {
    let box = Item.get("Smut Orc Keepsake Box");

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

    let loc = Location.get("Camp Logging Camp");

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

  getChildren(): QuestInfo[] {
    return [this.shorts];
  }

  simMax(ma: string): number {
    let sim = maximize(ma, 0, 0, true, true);
    let score: number = 0;

    for (let e of sim) {
      score += e.score;
    }

    return score;
  }

  doBestBlechOutfit(): [number, string] {
    // Stolen from autoscend
    // floor(sqrt((mus+flat_weapon_damage)/15*(1+percent_weapon_damage/100)))
    let mustry = "100muscle,100weapon damage,1000weapon damage percent";
    let mystry = "100mysticality,100spell damage,1000 spell damage percent";
    let moxtry = "100moxie,1000sleaze resistance";

    this.simMax(mustry);
    let musmus = numericModifier("Generated:_spec", "Buffed Muscle");
    let musflat = numericModifier("Generated:_spec", "Weapon Damage");
    let musperc = numericModifier("Generated:_spec", "Weapon Damage Percent");
    let muscleScore = Math.floor(
      Math.sqrt(((musmus + musflat) / 15) * (1 + musperc / 100))
    );

    this.simMax(mystry);
    let mysmys = numericModifier("Generated:_spec", "Buffed Mysticality");
    let mysflat = numericModifier("Generated:_spec", "Spell Damage");
    let mysperc = numericModifier("Generated:_spec", "Spell Damage Percent");
    let mystScore = Math.floor(
      Math.sqrt(((mysmys + mysflat) / 15) * (1 + mysperc / 100))
    );

    this.simMax(moxtry);
    let moxmox = numericModifier("Generated:_spec", "Buffed Moxie");
    let moxres = numericModifier("Generated:_spec", "Sleaze Resistance");
    let moxScore = Math.floor(Math.sqrt((moxmox / 30) * (1 + moxres * 0.69)));

    print("Mus Score: " + muscleScore, "blue");
    print("Myst Score: " + mystScore, "blue");
    print("Moxie Score: " + moxScore, "blue");

    if (muscleScore >= moxScore && muscleScore >= mystScore) {
      return [1, mustry];
    }

    if (mystScore >= muscleScore && mystScore >= moxScore) {
      return [2, mystry];
    }

    return [3, moxtry];
  }
}
