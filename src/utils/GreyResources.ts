import {
  availableAmount,
  buy,
  buyUsingStorage,
  cliExecute,
  Familiar,
  getLocketMonsters,
  getProperty,
  getRelated,
  haveFamiliar,
  Item,
  itemAmount,
  mallPrice,
  myMeat,
  myStorageMeat,
  outfitPieces,
  print,
  printHtml,
  pullsRemaining,
  setProperty,
  storageAmount,
  toBoolean,
  toInt,
  use,
} from "kolmafia";
import { GreySettings } from "./GreySettings";

export function getBanishers() {
  // Scrapbook
  // Bowl a curveball
  // Middle finger ring
  // Grey You banisher skill
}

export function getYellowRays() {
  // Yellow Rocket
  // 9 Volt battery
}

export function getSniffers() {
  // Nosy Nose fam
}

export function getCopiers() {
  // Backup Camera
  // Cloning Kit
  // Combat Locket
  // 4-D camera
}

export class GreyPulls {
  static pullFratWarOutfit() {
    for (const i of outfitPieces("Frat Warrior Fatigues")) {
      if (availableAmount(i) > 0) {
        continue;
      }

      GreyPulls.tryPull(i);
    }
  }

  static pullCrypts() {
    GreyPulls.tryPull(Item.get("Gravy Boat"));
  }

  static pullBoxOfMatches() {
    GreyPulls.tryPull(Item.get("book of matches"));
  }

  static pullScrip() {
    GreyPulls.tryPull(Item.get("Shore Inc. Ship Trip Scrip"));
  }

  static pullOre() {
    if (getProperty("questL08Trapper") != "step1") {
      return;
    }

    const ore = Item.get(getProperty("trapperOre"));

    if (ore == Item.get("none") || availableAmount(ore) >= 3) {
      return;
    }

    this.tryPull(ore);
  }

  static getPullableKeys(): Item[] {
    const items = getZappables(Item.get("Jarlsberg's key")).filter(
      (i) => !i.quest
    );

    items.sort((i1, i2) => {
      // If an item is in storage, and the other item isn't. Prioritize the item in storage.
      if (storageAmount(i1) > 0 != storageAmount(i2) > 0) {
        return storageAmount(i2) - storageAmount(i1);
      }

      return mallPrice(i1) - mallPrice(i2);
    });

    return items;
  }

  static tryRetrieve(item: Item, maxCost: number = 30_000) {
    if (pullsRemaining() >= 0) {
      return this.tryPull(item, maxCost);
    }

    if (itemAmount(item) > 0) {
      return;
    }

    if (availableAmount(item) > 0) {
      cliExecute("retrieve " + item);
    } else {
      if (myMeat() > myStorageMeat()) {
        buy(item, 1, maxCost);
      } else {
        buyUsingStorage(item, 1, maxCost);
      }
    }
  }

  static tryPull(item: Item, maxCost: number = 30_000) {
    if (storageAmount(item) == 0) {
      buyUsingStorage(item, 1, maxCost);
    }

    if (storageAmount(item) == 0) {
      throw "Unable to pull " + item.name;
    }

    const propPrior = getProperty("_roninStoragePulls");

    cliExecute("pull " + item.name);

    if (getProperty("_roninStoragePulls") != propPrior) {
      const pulled = getProperty("_roninStoragePulls").split(",");

      const greyPulls = getProperty("_greyPulls")
        .split(",")
        .filter((s) => s.length > 0);
      greyPulls.push(toInt(item).toString());
      const pullsSorted = [];

      for (const pull of pulled) {
        if (!greyPulls.includes(pull)) {
          continue;
        }

        pullsSorted.push(pull);
      }

      for (const remainder of greyPulls) {
        if (pullsSorted.includes(remainder)) {
          continue;
        }

        print("Somehow didn't detect " + remainder + " as a used pull", "red");
        pullsSorted.push(remainder);
      }

      setProperty("_greyPulls", pullsSorted.join(","));
    }
  }
}

export class GreyClovers {
  static clover: Item = Item.get("11-leaf Clover");

  static doOres() {
    // 2
    use(this.clover);
  }

  static doWand() {
    // 1
    use(this.clover);
  }
}

export class GreyVortex {
  static doBatCave() {
    // 20
  }

  static doHarem() {
    // 20
  }

  static doHiddenTemple() {
    // 20
  }

  static doSmutOrcs() {
    // 20
  }

  static doCrypt() {
    // 20
  }
}

export class GreyCombatLocket {
  static doSystemSweep() {}

  static doInfiniteLoop() {}

  static doFantasyBandit() {}

  static doMountainMan() {}
}

export function getZappables(item: Item): Item[] {
  const items: Item[] = [];

  Object.keys(getRelated(item, "zap")).forEach((s) => {
    const i = Item.get(s);

    if (items.includes(i)) {
      return;
    }

    items.push(i);
  });

  return items;
}

enum Required {
  MUST = "You really should have these",
  VERY_USEFUL = "Optional, but very very useful",
  USEFUL = "Useful, but not major",
  MINOR = "Minor, can skip",
}

export class GreyRequirements {
  hasRequired() {
    const required: [string, string, Required, boolean][] = [];
    const add = (
      name: string | Item,
      desc: string,
      e: Required,
      owns?: boolean
    ) => {
      if (name instanceof Item) {
        owns = availableAmount(name) + storageAmount(name) > 0;
        name = name.name;
      }

      required.push([name, desc, e, owns]);
    };

    add(
      "Grey Goose",
      "Without this, Grey You isn't really feasible",
      Required.MUST,
      haveFamiliar(Familiar.get("Grey Goose"))
    );

    add(
      "Gelatinous Cubeling",
      "Saves about 10 turns if you're not doing a tower break",
      Required.VERY_USEFUL,
      haveFamiliar(Familiar.get("Gelatinous Cubeling"))
    );

    add(
      Item.get("Combat Lover's Locket"),
      "Used as a fax source, with some helpful enchants",
      Required.VERY_USEFUL
    );

    const locket = Object.keys(getLocketMonsters()).map((s) =>
      s.toLowerCase().trim()
    );

    if (locket.length > 0) {
      const monstersLocket: string[] = [
        "pygmy witch lawyer",
        "mountain man",
        "cloud of disembodied whiskers",
        "one-eyed willie",
        "little man in the canoe",
        "fantasy bandit",
        "pygmy janitor",
      ];
      const monstersNeed = monstersLocket.filter((m) => !locket.includes(m));
      const monstersHave = monstersLocket.filter((m) => locket.includes(m));

      if (monstersNeed.length > 0) {
        add(
          "Combat Locket: " + monstersNeed.join(", "),
          "The script uses these in run, you are missing these from your combat locket",
          Required.MUST,
          false
        );
      }

      if (monstersHave.length > 0) {
        add(
          "Combat Locket: " + monstersHave.join(", "),
          "The script uses these in run, you have these",
          Required.MUST,
          true
        );
      }
    }

    add(
      Item.get("Industrial Fire Extinguisher"),
      "Can speed up by up 15 to 25 turns",
      Required.USEFUL
    );

    add(
      Item.get("Backup Camera"),
      "Great for +ML, Init and sometimes Fantasy Bandits & Lobsters",
      Required.VERY_USEFUL
    );

    add(
      Item.get("unwrapped knock-off retro superhero cape"),
      "Great for crypts & tower",
      Required.VERY_USEFUL
    );

    add(
      "Mayday Contract",
      "Gives a nice +combat cape and starting 5k meat boost",
      Required.USEFUL,
      toBoolean(getProperty("maydayContractOwned"))
    );

    add(
      Item.get("Unbreakable Umbrella"),
      "Awesome -Combat and +ML for Oil Peak",
      Required.VERY_USEFUL
    );

    add(
      "Cosmic Bowling Ball",
      "Banishes for all!",
      Required.USEFUL,
      toBoolean(getProperty("hasCosmicBowlingBall"))
    );

    add(
      Item.get("miniature crystal ball"),
      "Great for speeding up predictions",
      Required.VERY_USEFUL
    );

    add(
      "Short Order Cook",
      "Great for tower killing and provides an absorb at the start of your run",
      Required.USEFUL,
      haveFamiliar(Familiar.get("Short Order Cook"))
    );

    add(
      Item.get("Clan VIP Lounge key"),
      "Used to remove Beaten Up, grab yellow rockets, fax and get the +fam exp effect!",
      Required.MUST
    );

    add(
      Item.get("protonic accelerator pack"),
      "Used for some free delay, -5 combat, get a nice +2 fam exp offhand and as a MP restorer! With sweatpants as a stunner, this is great!",
      Required.VERY_USEFUL
    );

    add(
      Item.get("Familiar Scrapbook"),
      "Great for power leveling after GYou ends, and the offhand +1 fam exp!",
      Required.VERY_USEFUL
    );

    add(
      Item.get("Powerful Glove"),
      "If not tower breaking, great for white pixels. If you have cursed mag glass, saves 5 turns?",
      Required.USEFUL
    );

    add(
      Item.get("Cursed Magnifying Glass"),
      "Only really used for minor delay burning, and lobsters + powerful glove",
      Required.MINOR
    );

    add(
      Item.get("Cargo Cultist Shorts"),
      "Used to fight Smut Orc to save 6 turns, or for the frat outfit to save pulls or 12 turns",
      Required.USEFUL
    );

    add(
      Item.get("HOA regulation book"),
      "Prefered over Space Trip safety headphones for the +2 res, saves 20? turns, especially on smut orcs",
      Required.VERY_USEFUL
    );
    add(
      Item.get("Space Trip safety headphones"),
      "HOA regulation book is used instead when available, but this still saves 20? turns, especially on smut orcs",
      Required.VERY_USEFUL
    );

    add(
      Item.get("Mafia Thumb Ring"),
      "Gives roughly 30 extra adventures over the course of your run",
      Required.VERY_USEFUL
    );

    add(
      Item.get("Yule Hatchet"),
      "Gives +2 fam exp every fight, basically a must have",
      Required.MUST
    );

    add(
      Item.get("Deck of lewd playing cards"),
      "Speeds up Ron Protesters",
      Required.USEFUL
    );

    add(
      Item.get("SongBoom&trade; BoomBox"),
      "Awesome for startup meat & nuns, then passive Special Seasoning generation you can use/sell",
      Required.VERY_USEFUL
    );

    add(
      Item.get("latte lovers member's mug"),
      "Gives +3 familiar exp roughly 100 turns into the run",
      Required.USEFUL
    );

    add(
      Item.get("Designer Sweatpants"),
      "Great for Ron Protesters, and restoring MP!",
      Required.VERY_USEFUL
    );

    add(
      Item.get("June Cleaver"),
      "Great for 1.5k meat, occasional 5 advs, smut orcs and the teachers pen which is +2 fam exp!",
      Required.VERY_USEFUL
    );

    add(
      Item.get("mumming trunk"),
      "Absolutely great for early game MP regeneration. Especially when you're tough on meat.",
      Required.VERY_USEFUL
    );

    const poolSkill = Math.floor(
      2 * Math.sqrt(toInt(getProperty("poolSharkCount")))
    );

    if (poolSkill < 10) {
      add(
        "Pool Skill",
        `You can train this up using 11-Leaf Clovers to have a permanant +10 across ascensions. You currently have a pool skill of ${poolSkill}, we want 10. Try looking up "A Shark's Chum" in the kol wiki.`,
        Required.MUST,
        false
      );
    } else {
      add(
        "Pool Skill",
        "You have fully trained up your pool skill, which is great for the Billards pool test!",
        Required.MUST,
        true
      );
    }

    add(
      "Melodramedary",
      "Saves 3 adventures for desert!",
      Required.MINOR,
      haveFamiliar(Familiar.get("Melodramedary"))
    );

    add(
      "Cat Burglar",
      "Only used rarely, generally not worth picking up but does sometimes save 20k of resources in meat!",
      Required.MINOR,
      haveFamiliar(Familiar.get("Cat Burglar"))
    );

    add(
      Item.get("hewn moon-rune spoon"),
      "Great for starting as vole, then switching to Blender! Probably worth 20 turns! Don't forget to setup your Greyday settings!",
      Required.VERY_USEFUL
    );

    add(
      "Fantasyrealm",
      "This isn't worth buying as it devalues Lucky Gold Ring, but if you do have it; Then it's useful as another key source.",
      Required.MINOR,
      toBoolean(getProperty("frAlways"))
    );

    add(
      Item.get("Deck of Every Card"),
      "Used as a key source and as an initial meat source. Not worth buying as its very expensive",
      Required.VERY_USEFUL
    );

    add(
      "Gingerbread City",
      "Useful as another key source - CURRENTLY UNSUPPORTED",
      Required.MINOR,
      toBoolean(getProperty("gingerbreadCityAvailable"))
    );

    add(
      "Piraterealm",
      "Useful as another key source - CURRENTLY UNSUPPORTED",
      Required.MINOR,
      toBoolean(getProperty("prAlways"))
    );

    add(
      Item.get("Kramco Sausage-o-Matic&trade;"),
      "Useful as a delay burner, and for another 23 adventures a day",
      Required.MINOR
    );

    add(
      "Voting Booth",
      "Iotm for voting, +3 hot res, +25% moxie buff, has interaction with powerful glove for lobsterfrogman, and gives 3 free delay burns",
      Required.MINOR,
      toBoolean(getProperty("voteAlways"))
    );

    add(
      Item.get("Greatest American Pants"),
      "Free runs - CURRENTLY UNSUPPORTED",
      Required.USEFUL
    );

    add(
      Item.get("Pantsgiving"),
      "Gives +2 all res, 10 items which can help save turncount and stacks up stomach size increasers",
      Required.USEFUL
    );

    required.sort((r1, r2) => r1[0].localeCompare(r2[0]));

    printHtml(
      '<div style="text-align: center;">======= Grey Requirements =======</div>'
    );

    const tick = "<font color='green'>✔</font>";
    const cross = "<font color='red'>✘</font>";

    for (const e of Object.values(Required) as Required[]) {
      let color: string = "green";

      if (e == Required.MUST) {
        color = "red";
      } else if (e == Required.VERY_USEFUL) {
        color = "#BC3823";
      } else if (e == Required.USEFUL) {
        color = "blue";
      } else if (e == Required.MINOR) {
        color = "gray";
      } else {
        continue;
      }

      print("");
      printHtml(`<div style="text-align: center;"> ${e} </div>`);
      const values = required.filter((r) => r[2] == e);

      for (const [name, desc, , has] of values) {
        printHtml(
          `${has ? tick : cross} <font color='${
            has ? "" : "red"
          }'>${name}</font> <font color='gray'>=> ${desc}</font>`
        );
      }
    }

    if (required.find((r) => r[3] == false) == null) {
      printHtml(
        "<center color='green'>Wow! You have everything in here!</center>"
      );
    }

    printHtml('<div style="text-align: center;">===============</div>');
    // TODO Camelcalf?
  }
}
