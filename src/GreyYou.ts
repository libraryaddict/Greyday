import { canAdv } from "canadv.ash";
import {
  appearanceRates,
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
  Skill,
  toInt,
  toMonster,
  toSkill,
  toString,
  visitUrl,
} from "kolmafia";
import { GreySettings } from "./utils/GreySettings";

class Absorb {
  monster: Monster;
  skill: Skill;
  adventures: number = 0;
  mus: number = 0;
  mys: number = 0;
  mox: number = 0;
  hp: number = 0;
  mp: number = 0;
}

class GreyUtils {
  absorbs: Absorb[];
  withGoose: boolean = false;

  getRolloverAdvs(): Map<Skill, string> {
    return new Map(
      [
        "Subatomic Tango",
        "Solid Fuel",
        "Autochrony",
        "Temporal Hyperextension",
        "Spooky Veins",
        "Extra Innings",
        "Reloading",
        "Harried",
        "Temporal Bent",
        "Provably Efficient",
        "Basic Improvements",
        "Shifted About",
        "Seven Foot Feelings",
        "Self-Actualized",
      ]
        .map((s) => toSkill(s))
        .map((s) => [
          s,
          "+" + numericModifier(s, "Adventures") + " Rollover Adventures",
        ])
    );
  }

  getMustHaveSkills(): Map<Skill, string> {
    let values: [Skill, string][] = [
      ["Infinite Loop", "Fast Leveling"],
      ["Gravitational Compression", "Scaling Item Drop"],
      ["Hivemindedness", "Scaling MP Regen"],
      ["Ire Proof", "+3 Hot Resist"],
      ["Conifer Polymers", "+3 Stench Resist"],
      ["Photonic Shroud", "-10 Combat"],
      ["Piezoelectric Honk", "+10 Combat"],
      ["Phase Shift", "-10 Combat"],
    ].map((s) => [toSkill(s[0]), s[1]]);

    if (GreySettings.isHardcoreMode()) {
      values.push(
        ...([
          ["Snow-Cooling System", "+15 Cold Dmg"],
          ["Cooling Tubules", "+10 Cold Dmg"],
        ].map((s) => [toSkill(s[0]), s[1]]) as [Skill, string][])
      );
    }

    return new Map(values);
  }

  getAbsorbsInLocation(location: Location): Absorb[] {
    let absorbs = [];

    if (location == null) {
      return absorbs;
    }

    let monsters = getMonsters(location);

    for (let absorb of this.absorbs) {
      if (!monsters.includes(absorb.monster)) {
        continue;
      }

      absorbs.push(absorb);
    }

    return absorbs;
  }

  getExtraAdventures(
    defeated: Monster[],
    location: Location,
    includeSkills: boolean
  ): AdventureLocation {
    let skills = this.getMustHaveSkills();

    if (location == null) {
      return null;
    }

    let absorbs = this.getAbsorbsInLocation(location).filter(
      (a) =>
        (a.adventures > 0 ||
          (includeSkills && this.getMustHaveSkills().has(a.skill))) &&
        !defeated.includes(a.monster)
    );

    if (absorbs.length == 0) {
      return null;
    }

    let advsSpent = 0;
    let entries = Object.entries(appearanceRates(location));
    let rates: [Monster, number][] = [];

    entries.forEach((v) => {
      let monster = Monster.get(v[0]);
      let rate = v[1];

      if (rate <= 0) {
        return;
      }

      rates.push([monster, rate]);
    });

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

    let totalAdvs = absorbs.reduce((p, a) => a.adventures + p, 0);
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
      expectedTurnsInZone: totalAdvs - advsSpent,
      monsters: absorbs.map((a) => a.monster),
      skills: newSkills,
    };
  }

  getOnlyUsefulAbsorbs(absorbs: Absorb[]) {
    let usefulSkills: Skill[] = [
      ...this.getMustHaveSkills().keys(),
      ...this.getRolloverAdvs().keys(),
    ];

    return absorbs.filter((a) => {
      return (
        a.adventures > 0 ||
        a.mp > 0 ||
        (a.skill != null && usefulSkills.includes(a.skill))
      );
    });
  }

  getUnabsorbed(): Absorb[] {
    let absorbed: Monster[] = this.getAbsorbedMonsters();

    return this.getAbsorbs().filter((a) => !absorbed.includes(a.monster));
  }

  getAbsorbedMonsters(): Monster[] {
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

  getReabsorbedMonsters(): Monster[] {
    return getProperty("gooseReprocessed")
      .split(",")
      .map((m) => toMonster(toInt(m)));
  }

  getAbsorbs(): Absorb[] {
    if (this.absorbs != null) {
      return this.absorbs;
    }

    this.absorbs = [];

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

        if (this.withGoose) {
          absorb.adventures *= 2;
        }
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

      this.absorbs.push(absorb);
    }

    return this.absorbs;
  }
}

interface Goal {
  isValid(): boolean;

  getMessage(): string;
}

interface AdventureLocation {
  location: Location;
  turnsToGain: number;
  expectedTurnsInZone: number;
  monsters: Monster[];
  skills: Map<Absorb, string>;
}

class GreyGoals {
  getGoals(): Goal[] {
    return [
      {
        isValid: () => haveSkill(Skill.get("Infinite Loop")),
        getMessage: () => "You should get Infinite Loop skill, locket it!",
      },
    ];
  }
}
