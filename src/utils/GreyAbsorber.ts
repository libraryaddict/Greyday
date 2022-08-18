import {
  absorbedMonsters,
  appearanceRates,
  Familiar,
  familiarWeight,
  fileToBuffer,
  getMonsters,
  getProperty,
  haveSkill,
  lastMonster,
  Location,
  Monster,
  print,
  printHtml,
  setProperty,
  Skill,
  toInt,
  toMonster,
  toSkill,
  turnsPlayed,
  visitUrl,
} from "kolmafia";
import { getQuestStatus } from "../quests/Quests";
import { getLocations } from "./GreyLocations";
import { GreySettings } from "./GreySettings";

export class Absorb {
  monster: Monster;
  skill: Skill;
  adventures: number = 0;
  mus: number = 0;
  mys: number = 0;
  mox: number = 0;
  hp: number = 0;
  mp: number = 0;
}

export class AbsorbsProvider {
  static allAbsorbs: Absorb[];
  static remainingAdvAbsorbs: Monster[];

  getRolloverAdvs(): Map<Skill, string> {
    return new Map(
      [
        ["Subatomic Tango", 15],
        ["Solid Fuel", 10],
        ["Autochrony", 10],
        ["Temporal Hyperextension", 10],
        ["Spooky Veins", 10],
        ["Extra Innings", 5],
        ["Reloading", 5],
        ["Harried", 5],
        ["Temporal Bent", 5],
        ["Provably Efficient", 5],
        ["Basic Improvements", 5],
        ["Shifted About", 5],
        ["Seven Foot Feelings", 5],
        ["Self-Actualized", 5],
      ].map((s) => [toSkill(<string>s[0]), s[1] + " Rollover Adventures"])
    );
  }

  getUsefulSkills(): Map<Skill, string> {
    return new Map(
      [
        ["Advanced Exo-Alloy", "100 DA"],
        ["Conifer Polymers", "3 Stench Resist"],
        //["Clammy Microcilia", "2 Stench Resist"],
        //["Cooling Tubules", "10 Cold Damage"],
        ["Cryocurrency", "5 Cold Damage"],
        // ["Ire Proof", "+3 Hot Resist"],
        // ["Snow-Cooling System", "+15 Cold Dmg"],
        ["Cooling Tubules", "+10 Cold Dmg"],
        //["Financial Spreadsheets", "+40% Meat from Monsters"],
        //["Innuendo Circuitry", "+15 Sleaze Damage"],
        ["Ponzi Apparatus", "Scaling meat%"],
        // ["Procgen Ribaldry", "10 Sleaze Damage"],
        ["Propagation Drive", "20% Item Drops"],
        ["Overclocking", "Scaling +init"],
      ].map((s) => [toSkill(s[0]), s[1]])
    );
  }

  getMustHaveSkills(): Map<Skill, string> {
    return new Map(
      [
        ["Subatomic Hardening", "Scaling DR"],
        ["Fluid Dynamics Simulation", "Scaling HP Regen"],
        ["Infinite Loop", "Fast Leveling"],
        ["Gravitational Compression", "Scaling Item Drop"],
        ["Hivemindedness", "Scaling MP Regen"],
        ["Photonic Shroud", "-10 Combat"],
        ["Piezoelectric Honk", "+10 Combat"],
        ["Phase Shift", "-10 Combat"],
        ["Ponzi Apparatus", "Scaling Meat Drop"],
      ].map((s) => [toSkill(s[0]), s[1]])
    );
  }

  getAbsorbsInLocation(location: Location): Absorb[] {
    const absorbs: Absorb[] = [];

    if (location == null) {
      return absorbs;
    }

    const monsters = getMonsters(location);

    for (const absorb of AbsorbsProvider.loadAbsorbs()) {
      if (!monsters.includes(absorb.monster)) {
        continue;
      }

      absorbs.push(absorb);
    }

    return absorbs;
  }

  getMultiplier(monster: Monster, defeated: Map<Monster, Reabsorbed>): number {
    if (
      defeated.has(monster) &&
      defeated.get(monster) === Reabsorbed.REABSORBED
    ) {
      return 0;
    }

    let mult: number = defeated.get(monster) == null ? 1 : 0;

    if (familiarWeight(Familiar.get("Grey Goose")) >= 6) {
      mult += 1;
    }

    return mult;
  }

  getAdventuresByAbsorbs(
    defeated: Map<Monster, Reabsorbed>,
    monsters: Monster[],
    includeSkills: boolean = true
  ): AdventureLocation {
    const skills = this.getMustHaveSkills();

    if (!GreySettings.speedRunMode) {
      for (const entry of this.getUsefulSkills()) {
        skills.set(entry[0], entry[1]);
      }
    }

    // for (let entry of this.getRolloverAdvs()) {
    //   skills.set(entry[0], entry[1]);
    // }

    const absorbs = monsters
      .map((m) => AbsorbsProvider.getAbsorb(m))
      .filter((a) => {
        if (
          a.adventures <= 0 &&
          (a.skill == null || !includeSkills || !skills.has(a.skill))
        ) {
          return false;
        }

        if (
          a.adventures > 0 &&
          defeated.get(a.monster) == Reabsorbed.REABSORBED
        ) {
          return false;
        }

        if (a.skill != null && haveSkill(a.skill)) {
          return false;
        }

        return true;
      });

    if (absorbs.length == 0) {
      return null;
    }

    const advsSpent = 1;

    const totalAdvs = absorbs.reduce(
      (p, a) =>
        Math.max(0, a.adventures) * this.getMultiplier(a.monster, defeated) + p,
      0
    );
    const newSkills: Map<Absorb, string> = new Map();

    for (const a of absorbs) {
      if (!skills.has(a.skill)) {
        continue;
      }

      newSkills.set(a, skills.get(a.skill));
    }

    return {
      location: null,
      turnsToGain: totalAdvs,
      expectedTurnsProfit:
        totalAdvs - (advsSpent + Math.max(2, Math.ceil(advsSpent * 0.2))),
      monsters: absorbs.map((a) => a.monster),
      skills: newSkills,
      shouldWait:
        absorbs.filter((a) => a.adventures > 0 && !defeated.has(a.monster))
          .length > 0,
      shouldRunOrb: false,
      ensuredOrb: null,
    };
  }

  getAdventuresInLocation(
    defeated: Map<Monster, Reabsorbed>,
    location: Location,
    includeSkills: boolean = true
  ): AdventureLocation {
    const skills = this.getMustHaveSkills();

    if (!GreySettings.speedRunMode) {
      for (const entry of this.getUsefulSkills()) {
        skills.set(entry[0], entry[1]);
      }
    }

    // for (let entry of this.getRolloverAdvs()) {
    //   skills.set(entry[0], entry[1]);
    // }

    let absorbs = this.getAbsorbsInLocation(location).filter((a) => {
      if (
        a.adventures <= 0 &&
        (a.skill == null || !includeSkills || !skills.has(a.skill))
      ) {
        return false;
      }

      if (
        a.adventures > 0 &&
        defeated.get(a.monster) == Reabsorbed.REABSORBED
      ) {
        return false;
      }

      if (a.skill != null && haveSkill(a.skill)) {
        return false;
      }

      return true;
    });

    if (absorbs.length == 0) {
      return null;
    }

    const appearRates = appearanceRates(location);

    // Special workaround for screambat making appearance rates of non-screambats zero
    if (appearRates["screambat"] == 100) {
      for (const key of Object.keys(appearRates)) {
        if (key == "none") {
          continue;
        }

        appearRates[key] = 20;
      }
    }

    let advsSpent = 0;
    const rates: [Monster, number][] = [];
    const combatPercent =
      location == Location.get("Twin Peak") ? 100 : location.combatPercent;

    Object.entries(appearRates).forEach((v) => {
      const monster = Monster.get(v[0]);
      const rate = v[1];

      if (rate <= 0 || combatPercent <= 0) {
        return;
      }

      rates.push([monster, rate * (combatPercent / 100)]);
    });

    if (location == Location.get("Oil Peak")) {
      rates.push([Monster.get("Oil Baron"), 100]);
    }

    absorbs = absorbs.filter(
      (a) => rates.find((r) => r[0] == a.monster) != null
    );

    if (absorbs.length == 0) {
      return null;
    }

    while (
      rates.filter(
        (r) =>
          r[1] * advsSpent < 100 &&
          absorbs.filter((a) => a.monster == r[0]).length > 0
      ).length > 0
    ) {
      advsSpent++;
    }

    const totalAdvs = absorbs.reduce(
      (p, a) =>
        Math.max(0, a.adventures) * this.getMultiplier(a.monster, defeated) + p,
      0
    );
    const newSkills: Map<Absorb, string> = new Map();

    for (const a of absorbs) {
      if (!skills.has(a.skill)) {
        continue;
      }

      newSkills.set(a, skills.get(a.skill));
    }

    return {
      location: location,
      turnsToGain: totalAdvs,
      expectedTurnsProfit:
        totalAdvs - (advsSpent + Math.max(2, Math.ceil(advsSpent * 0.2))),
      monsters: absorbs.map((a) => a.monster),
      skills: newSkills,
      shouldWait:
        absorbs.filter((a) => a.adventures > 0 && !defeated.has(a.monster))
          .length > 0,
      shouldRunOrb: false,
      ensuredOrb: false,
    };
  }

  getOnlyUsefulAbsorbs(absorbs: Absorb[]) {
    const usefulSkills: Skill[] = [...this.getMustHaveSkills().keys()];

    if (!GreySettings.speedRunMode) {
      usefulSkills.push(...this.getUsefulSkills().keys());
    }

    return absorbs.filter((a) => {
      return (
        a.adventures > 0 ||
        a.mp > 0 ||
        (a.skill != null && usefulSkills.includes(a.skill))
      );
    });
  }

  static getAbsorb(monster: Monster): Absorb {
    for (const absorb of AbsorbsProvider.loadAbsorbs()) {
      if (absorb.monster != monster) {
        continue;
      }

      return absorb;
    }

    return null;
  }

  static loadAbsorbs(): Absorb[] {
    if (AbsorbsProvider.allAbsorbs != null) {
      return AbsorbsProvider.allAbsorbs;
    }

    AbsorbsProvider.allAbsorbs = [];

    for (const line of fileToBuffer("data/grey_you_data.txt").split("\n")) {
      const spl = line.split("\t");

      if (spl.length != 2 || spl[1] == null || spl[1].length == 0) {
        continue;
      }

      const mons = toMonster(spl[0]);

      if (mons == Monster.get("None")) {
        print("Unknown " + spl[0]);
        continue;
      }

      const absorb = new Absorb();
      absorb.monster = mons;

      if (spl[1].endsWith("adventures")) {
        absorb.adventures = toInt(spl[1].substring(0, spl[1].lastIndexOf(" ")));
      } else if (spl[1].endsWith("muscle")) {
        absorb.mus = toInt(spl[1].substring(0, spl[1].lastIndexOf(" ")));
      } else if (spl[1].endsWith("mysticality")) {
        absorb.mys = toInt(spl[1].substring(0, spl[1].lastIndexOf(" ")));
      } else if (spl[1].endsWith("moxie")) {
        absorb.mox = toInt(spl[1].substring(0, spl[1].lastIndexOf(" ")));
      } else if (spl[1].endsWith("maximum hp")) {
        absorb.hp = toInt(spl[1].substring(0, spl[1].indexOf(" ")));
      } else if (spl[1].endsWith("maximum mp")) {
        absorb.mp = toInt(spl[1].substring(0, spl[1].indexOf(" ")));
      } else {
        absorb.skill = toSkill(spl[1]);

        if (absorb.skill == Skill.get("None")) {
          print("Unknown thingy " + spl[1]);
        }
      }

      AbsorbsProvider.allAbsorbs.push(absorb);
    }

    this.remainingAdvAbsorbs = AbsorbsProvider.allAbsorbs
      .filter((a) => a.adventures > 0)
      .map((a) => a.monster);

    return AbsorbsProvider.allAbsorbs;
  }

  getAbsorbedMonstersFromInstance(): Map<Monster, Reabsorbed> {
    const monsters: Map<Monster, Reabsorbed> = new Map();
    const absorbed: Monster[] = AbsorbsProvider.getAbsorbedMonsters();
    const reabsorbed: Monster[] = AbsorbsProvider.getReabsorbedMonsters();

    reabsorbed.forEach((m) => {
      monsters.set(m, Reabsorbed.REABSORBED);
    });

    absorbed.forEach((m) => {
      if (reabsorbed.includes(m)) {
        return;
      }

      monsters.set(m, Reabsorbed.NOT_REABSORBED);
    });

    return monsters;
  }

  static getAbsorbedMonsters(): Monster[] {
    return Object.keys(absorbedMonsters()).map((m) => Monster.get(m));
  }

  static getReabsorbedMonsters(): Monster[] {
    return getProperty("gooseReprocessed")
      .split(",")
      .filter((s) => s != "")
      .map((m) => toMonster(toInt(m)));
  }

  getExtraAdventures(
    defeated: Map<Monster, Reabsorbed>,
    includeSkills: boolean = false
  ): AdventureLocation[] {
    const map: Map<Location, AdventureLocation> = new Map();

    for (const absorb of AbsorbsProvider.loadAbsorbs().filter(
      (a) =>
        (includeSkills || a.adventures > 0) &&
        defeated.get(a.monster) != Reabsorbed.REABSORBED
    )) {
      for (const l of getLocations(absorb.monster)) {
        if (map.has(l)) {
          continue;
        }

        map.set(l, this.getAdventuresInLocation(defeated, l, includeSkills));
      }
    }

    return [...map.values()].filter((a) => a != null);
  }

  printRemainingAbsorbs() {
    const defeated = this.getAbsorbedMonstersFromInstance();
    const absorbs = AbsorbsProvider.loadAbsorbs().filter(
      (a) =>
        a.adventures > 0 && defeated.get(a.monster) != Reabsorbed.REABSORBED
    );

    absorbs.sort((a1, a2) => a2.adventures - a1.adventures);

    if (absorbs.length == 0) {
      print("No adventures to absorb!", "blue");
      return;
    }

    if (
      familiarWeight(Familiar.get("Grey Goose")) >= 6 &&
      getQuestStatus("questL13Final") > 11
    ) {
      print(
        "The remaining absorbs are likely either out of reach or judged to be wasteful to acquire",
        "red"
      );
    }

    printHtml(
      "<font color='blue'>Absorbs:</font> " +
        absorbs
          .map(
            (a) =>
              a.monster.name +
              " <font color='gray'>(" +
              a.adventures +
              " advs, Absorb x " +
              (defeated.has(a.monster) ? "1" : "2") +
              ")</font>"
          )
          .join(", ")
    );
  }
}

export interface AdventureLocation {
  location: Location;
  turnsToGain: number;
  expectedTurnsProfit: number;
  monsters: Monster[];
  skills: Map<Absorb, string>;
  shouldWait: boolean;
  shouldRunOrb: boolean;
  ensuredOrb: boolean;
}

export enum Reabsorbed {
  REABSORBED,
  NOT_REABSORBED,
}

class GreyYou {
  doCommand(command: string) {
    // this.getPlacesToAdv();
  }

  /*getPlacesToAdv(includeSkills: boolean = true) {
    let fought = this.utils.getAbsorbedMonsters();
    let map: Map<Location, AdventureLocation> = new Map();

    for (let absorb of this.utils.getOnlyUsefulAbsorbs(
      this.utils.getUnabsorbed()
    )) {
      for (let l of this.getLocations(absorb.monster)) {
        if (map.has(l)) continue;

        map.set(l, this.utils.getExtraAdventures(fought, l, includeSkills));
      }
    }

    let sort: AdventureLocation[] = [];

    for (let entry of map.values()) {
      if (entry == null) {
        continue;
      }

      sort.push(entry);
    }

    sort.sort((v1, v2) => v2.expectedTurnsInZone - v1.expectedTurnsInZone);
    let unnatural = this.getUnnaturalLocations();
    let impossible = this.getImpossibleLocations();
    let intentional = this.getManualUnlocks();
    let color = function (message: string, color: string) {
      return `<font color='${color}'>${message}</font>`;
    };

    let htmls: string[] = [];

    for (let r of sort) {
      // TODO Highlight zones based on if we'll encounter them naturally in our path

      // If we'll encounter this naturally, don't bother displaying yet
      if (
        !impossible.includes(r.location) &&
        !intentional.includes(r.location) &&
        !canAdv(r.location)
      ) {
        continue;
      }

      let html = `Try ${r.location}: ${r.expectedTurnsInZone} (${
        r.turnsToGain
      }) adventures, Monsters: ${color(
        r.monsters.map((m) => m.name).join(", "),
        "gray"
      )}`;

      if (r.skills.size > 0) {
        html += " " + color("Grab while you're here: ", "black");

        for (let absorb of r.skills.keys()) {
          html += absorb.monster.name + " (" + r.skills.get(absorb) + ") ";
        }
      }

      html = color(
        html,
        impossible.includes(r.location)
          ? "purple"
          : !canAdv(r.location)
          ? "red"
          : unnatural.includes(r.location)
          ? "blue"
          : "green"
      );

      htmls.push(html);
    }

    for (let html of htmls) {
      printHtml(html);
    }
  }*/
}

export function main(command: string) {
  new GreyYou().doCommand(command);
}
