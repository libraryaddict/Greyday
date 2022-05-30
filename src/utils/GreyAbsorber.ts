import { canAdv } from "canadv.ash";
import {
  appearanceRates,
  Familiar,
  familiarWeight,
  fileToBuffer,
  getLocationMonsters,
  getMonsters,
  getProperty,
  haveSkill,
  Location,
  Monster,
  numericModifier,
  print,
  printHtml,
  setProperty,
  Skill,
  toInt,
  toJson,
  toMonster,
  toSkill,
  toString,
  totalTurnsPlayed,
  visitUrl,
} from "kolmafia";
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
    let absorbs: Absorb[] = [];

    if (location == null) {
      return absorbs;
    }

    let monsters = getMonsters(location);

    for (let absorb of AbsorbsProvider.allAbsorbs) {
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

  getAdventuresInLocation(
    defeated: Map<Monster, Reabsorbed>,
    location: Location,
    includeSkills: boolean = true
  ): AdventureLocation {
    let skills = this.getMustHaveSkills();

    if (!GreySettings.speedRunMode) {
      for (let entry of this.getUsefulSkills()) {
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

    let advsSpent = 0;
    let entries = Object.entries(appearanceRates(location));
    let rates: [Monster, number][] = [];

    entries.forEach((v) => {
      let monster = Monster.get(v[0]);
      let rate = v[1];

      if (rate <= 0 || location.combatPercent <= 0) {
        return;
      }

      rates.push([monster, rate * (location.combatPercent / 100)]);
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

    let totalAdvs = absorbs.reduce(
      (p, a) =>
        Math.max(0, a.adventures) * this.getMultiplier(a.monster, defeated) + p,
      0
    );
    let newSkills: Map<Absorb, string> = new Map();

    for (let a of absorbs) {
      if (!skills.has(a.skill)) {
        continue;
      }

      newSkills.set(a, skills.get(a.skill));
    }

    return {
      location: location,
      turnsToGain: totalAdvs,
      expectedTurnsProfit:
        totalAdvs - (advsSpent + Math.max(2, Math.floor(advsSpent * 0.3))),
      monsters: absorbs.map((a) => a.monster),
      skills: newSkills,
      shouldWait:
        absorbs.filter((a) => a.adventures > 0 && !defeated.has(a.monster))
          .length > 0,
      shouldRunOrb: false,
    };
  }

  getOnlyUsefulAbsorbs(absorbs: Absorb[]) {
    let usefulSkills: Skill[] = [...this.getMustHaveSkills().keys()];

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
    for (let absorb of AbsorbsProvider.loadAbsorbs()) {
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

    for (let line of fileToBuffer("data/grey_you_data.txt").split("\n")) {
      let spl = line.split("\t");

      if (spl.length != 2 || spl[1] == null || spl[1].length == 0) {
        continue;
      }

      let mons = toMonster(spl[0]);

      if (mons == Monster.get("None")) {
        print("Unknown " + spl[0]);
        continue;
      }

      let absorb = new Absorb();
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

    return AbsorbsProvider.allAbsorbs;
  }

  getAbsorbedMonstersFromInstance(): Map<Monster, Reabsorbed> {
    let monsters: Map<Monster, Reabsorbed> = new Map();
    let reabsorbed: Monster[] = AbsorbsProvider.getReabsorbedMonsters();
    let absorbedProp = "_absorbedMonstersToday";

    if (getProperty(absorbedProp) == "") {
      this.getAbsorbedMonstersFromUrl().forEach((m) =>
        monsters.set(
          m,
          reabsorbed.includes(m)
            ? Reabsorbed.REABSORBED
            : Reabsorbed.NOT_REABSORBED
        )
      );
    } else {
      getProperty(absorbedProp)
        .split(",")
        .map((m) => toMonster(toInt(m)))
        .forEach((m) => {
          monsters.set(m, Reabsorbed.NOT_REABSORBED);
        });
    }

    for (let m of reabsorbed) {
      monsters.set(m, Reabsorbed.REABSORBED);
    }

    for (let loc of Location.all()) {
      for (let s of loc.combatQueue.split("; ")) {
        if (s.length == 0) {
          continue;
        }

        let monster = Monster.get(s);

        if (monsters.has(monster)) {
          continue;
        }

        monsters.set(
          monster,
          reabsorbed.includes(monster)
            ? Reabsorbed.REABSORBED
            : Reabsorbed.NOT_REABSORBED
        );
      }
    }

    if (getProperty(absorbedProp).split(",").length != monsters.size) {
      let prop = getProperty("logPreferenceChange");
      setProperty("logPreferenceChange", "false");
      setProperty(
        absorbedProp,
        Array.from(monsters.keys())
          .map((m) => m.id)
          .join(",")
      );

      setProperty("logPreferenceChange", prop);
    }

    return monsters;
  }

  getAbsorbedMonstersFromUrl(): Monster[] {
    let page = visitUrl("charsheet.php");
    let regex = /Absorbed .+? from .+?<!-- (\d+) --><br \/>/s;

    let match: string[];
    let monsters: Monster[] = [];

    while ((match = page.match(regex)) != null) {
      page = page.replace(match[0], "");
      monsters.push(toMonster(toInt(match[1])));
    }

    return monsters;
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
    let map: Map<Location, AdventureLocation> = new Map();

    for (let absorb of AbsorbsProvider.loadAbsorbs().filter(
      (a) =>
        (includeSkills || a.adventures > 0) &&
        defeated.get(a.monster) != Reabsorbed.REABSORBED
    )) {
      for (let l of getLocations(absorb.monster)) {
        if (map.has(l)) {
          continue;
        }

        map.set(l, this.getAdventuresInLocation(defeated, l, includeSkills));
      }
    }

    return [...map.values()].filter((a) => a != null);
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
