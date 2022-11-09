import {
  Item,
  Location,
  visitUrl,
  availableAmount,
  handlingChoice,
  lastChoice,
  availableChoiceOptions,
  print,
  toInt,
  getProperty,
  toLocation,
} from "kolmafia";
import { getQuestStatus } from "../quests/Quests";
import { Task } from "./Tasks";

const leaf: Item = Item.get("Autumn Leaf");
const debrisShield = Item.get("Autumn Debris Shield");
const leafPendant = Item.get("Autumn Leaf Pendant");
const ale = Item.get("AutumnFest Ale");
const donut = Item.get("Autumn-Spice Donut");
const breeze = Item.get("Autumn Breeze");
const sweater = Item.get("Autumn Sweater-weather sweater");
const dollar = Item.get("Autumn Dollar");
const wisdom = Item.get("Autumn Years Wisdom");

interface AutumnSelection {
  location: Location;
  score: number;
  reason: string;
}

export class TaskAutumnaton implements Task {
  item: Item;
  skipFor: number = 0;
  toGrab: ValidItem[];

  constructor() {
    visitUrl("desc_item.php?whichitem=174185886");
    this.item = Item.all().find((i) => i.descid == "174185886");

    if (
      this.item == null ||
      this.item.name == null ||
      !this.item.name.includes("aton")
    ) {
      this.item = null;
    }

    this.createItems();
  }

  selectLocation(locs: AutumnOutcome[]): AutumnSelection {
    const weights: Map<AutumnStat, number> = new Map([
      ["time taken", 1000], // We always want it to return asap
      ["extra item", 900], // We want extra items
      ["extra seasonal item", 10], // This is more profit!
      ["item drop%", 3], // Eh, sure
      ["stats", 1],
    ]);

    const selections: AutumnSelection[] = [];

    for (const { location, item, upgrade } of locs) {
      let score = 0;

      if (item == sweater) {
        score += 1;
      } else if (item == dollar) {
        score += 2;
      }

      const toGrab = this.toGrab.filter(
        (t) =>
          t.loc == location &&
          (t.viable == null || t.viable()) &&
          availableAmount(t.item) < t.amount
      );

      if (toGrab.length > 0) {
        score +=
          1 +
          this.toGrab.length -
          toGrab
            .map((t) => this.toGrab.indexOf(t))
            .reduce((p1, p2) => Math.min(p1, p2), 999);
      }

      // Add scores for stuff we want
      if (!getAutumnUpgrades().includes(upgrade)) {
        const stat = getAutumnStat(upgrade);

        if (weights.has(stat)) {
          score += weights.get(stat);
        }
      }

      if (score <= 0) {
        continue;
      }

      let reason = toGrab.length > 0 ? "grab " + toGrab[0].item : "";

      if (getAutumnUpgraded(upgrade) == 0) {
        if (reason.length > 0) {
          reason += " and ";
        }

        reason +=
          "get upgrade " +
          this.getEnumByEnumValue(AutumnUpgrades, upgrade) +
          " (" +
          upgrade +
          ") which upgrades stat '" +
          getAutumnStat(upgrade) +
          "'";
      }

      selections.push({ location: location, score: score, reason: reason });
    }

    if (selections.length == 0) {
      return null;
    }

    selections.sort((s1, s2) => s2.score - s1.score);

    return selections[0];
  }

  getEnumByEnumValue(myEnum, enumValue: string) {
    const keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);

    return keys.length > 0 ? keys[0] : null;
  }

  run(): void {
    if (this.item == null || availableAmount(this.item) == 0) {
      return;
    }

    if (this.skipFor-- > 0) {
      return;
    }

    const outcomes = getAutumnatonLocations();

    if (availableChoiceOptions()[1] != null) {
      print("Beep Boop, now upgrading autumn-aton", "blue");
      print("Autumn-aton upgrade will: " + availableChoiceOptions()[1], "blue");
      visitUrl("choice.php?option=1&pwd&whichchoice=1483");
    }

    const bestChoice = this.selectLocation(outcomes);

    if (bestChoice == null) {
      this.skipFor = 2;
      visitUrl("main.php");
      return;
    }

    if (!handlingChoice()) {
      throw "Expected to be handling the aton choice";
    }

    if (lastChoice() != 1483) {
      throw "Expected to be in aton choice";
    }

    print(
      `Sending Autumn-aton on a glorious quest to ${bestChoice.reason} from ${bestChoice.location}`,
      "blue"
    );

    visitUrl(
      "choice.php?option=2&pwd&whichchoice=1483&heythereprogrammer=" +
        toInt(bestChoice.location)
    );

    if (handlingChoice()) {
      throw "Unexpectedly still handling a choice!";
    }
  }

  createItems() {
    this.toGrab = [];

    this.toGrab.push({
      loc: Location.get("Sonofa Beach"),
      item: Item.get("barrel of gunpowder"),
      amount: 5,
      viable: () =>
        getProperty("sidequestLighthouseCompleted") != "true" &&
        getItemsPerExpedition() >= 5,
    });

    this.toGrab.push({
      loc: Location.get("The Smut Orc Logging Camp"),
      item: Item.get("Raging hardwood plank"),
      amount: 10,
      viable: () =>
        getQuestStatus("questL09Topping") == 0 &&
        toInt(getProperty("chasmBridgeProgress")) < 30,
    });

    this.toGrab.push({
      loc: Location.get("The Copperhead Club"),
      item: Item.get("Crappy Waiter Disguise"),
      amount: 5,
      viable: () => getQuestStatus("questL11Shen") < 5,
    });

    this.toGrab.push({
      loc: Location.get("A Mob Of Zeppelin Protesters"),
      item: Item.get("cigarette lighter"),
      amount: 10,
      viable: () => getQuestStatus("questL11Ron") <= 1,
    });

    this.toGrab.push({
      loc: Location.get("The Penultimate Fantasy Airship"),
      item: Item.get("Mohawk Wig"),
      amount: 1,
      viable: () => getQuestStatus("questL10Garbage") < 9,
    });

    this.toGrab.push({
      loc: Location.get("The Penultimate Fantasy Airship"),
      item: Item.get("Amulet of Extreme Plot Significance"),
      amount: 1,
      viable: () => getQuestStatus("questL10Garbage") < 6,
    });

    this.toGrab.push({
      loc: Location.get("The Beanbat Chamber"),
      item: Item.get("Enchanted Bean"),
      amount: 1,
      viable: () => getQuestStatus("questL10Garbage") <= 0,
    });

    /* this.toGrab.push({
      loc: Location.get("The Goatlet"),
      item: Item.get("Goat Cheese"),
      amount: 3,
      viable: () => getQuestStatus("questL08Trapper") <= 1,
    });*/

    this.toGrab.push({
      loc: Location.get("The Hidden Bowling Alley"),
      item: Item.get("bowling ball"),
      amount: 5,
      viable: () =>
        getProperty("questL11Spare") != "finished" &&
        availableAmount(Item.get("bowling ball")) -
          toInt(getProperty("hiddenBowlingAlleyProgress")) >
          5,
    });

    // If we want a drum machine, have turned in stone rose, yet have not turned in drum machine..
    this.toGrab.push({
      loc: Location.get("The Oasis"),
      item: Item.get("Drum Machine"),
      amount: 1,
      viable: () =>
        (toInt(getProperty("gnasirProgress")) & 1) == 1 &&
        (toInt(getProperty("gnasirProgress")) & 16) != 16,
    });

    this.toGrab.push({
      loc: Location.get("Guano Junction"),
      item: Item.get("sonar-in-a-biscuit"),
      amount: 1,
      viable: () => getQuestStatus("questL04Bat") <= 2,
    });

    // Harem
    // Gauno Junction - Bat sonar
    // Infernal Rackets Backstage / laugh floor
    // Oil peak?
    // Sonofa Beach
    // Black Forest
    // Castle in clouds basement - WAND
    // Castle in clouds ground - Maybe +combat weapon
    // Dungeons of Doom - Ring of +combat
    // The greater than sign - Mehhh
    // Goatlet - Goat Cheese
    // Haunted Billiards - Hand of chalk, meh
    // Haunted library - Killing jar
    // Janitor - Book of matches
    // Bowling Balls
    // Surgeon outfit?
    // Misc locations for when we can't tower break, like key locs?
    // Middle chamber - tomb ratchets?
    // Red zeppelin - Glark cables
    // Crypt - Evil eyes
    // Twin Peak - Hedge trimmers
    // Whitey's grove - White page? lol
  }
}

interface ValidItem {
  loc: Location;
  item: Item;
  amount: number;
  viable?: () => boolean;
}

// autumnatonUpgrades=leftleg1,periscope,radardish,rightleg1
enum AutumnUpgrades {
  LEFT_ARM = "leftarm1", // Another item from zone
  LEFT_LEG = "leftleg1", // -11 expendition length
  RIGHT_ARM = "rightarm1", // Another item from zone
  RIGHT_LEG = "rightleg1", // -11 expedition length
  ENERGY_HAT = "base_blackhat", // More stats
  COLLECTION_PROW = "cowcatcher", // Extra seasonal item
  VISION_EXTENDER = "periscope", // Can pick up lower item% drop rates?
  RADAR = "radardish", // Can pick up lower item% drop rates?
  EXHAUST = "dualexhaust", // More stats
}

type AutumnStat =
  | "time taken"
  | "extra item"
  | "extra seasonal item"
  | "stats"
  | "item drop%";

function getAutumnStat(upgrade: AutumnUpgrades): AutumnStat {
  switch (upgrade) {
    case AutumnUpgrades.LEFT_ARM:
    case AutumnUpgrades.RIGHT_ARM:
      return "extra item";
    case AutumnUpgrades.LEFT_LEG:
    case AutumnUpgrades.RIGHT_LEG:
      return "time taken";
    case AutumnUpgrades.ENERGY_HAT:
    case AutumnUpgrades.EXHAUST:
      return "stats";
    case AutumnUpgrades.VISION_EXTENDER:
      return "item drop%";
    case AutumnUpgrades.COLLECTION_PROW:
      return "extra seasonal item";

      throw "Unknown Autumn upgrade '" + upgrade + "'";
  }
}

function getItemsPerExpedition(): number {
  return (
    3 + getAutumnUpgraded(AutumnUpgrades.LEFT_ARM, AutumnUpgrades.RIGHT_ARM)
  );
}

function getExpeditionTime(): number {
  // At 0 quests, it takes 11 turns
  let questsDone = 1 + toInt(getProperty("_autumnatonQuests"));

  // With 1 upgrade, it takes 0 turns. At 2, it takes -11 turns
  questsDone -= getAutumnUpgraded(
    AutumnUpgrades.LEFT_LEG,
    AutumnUpgrades.RIGHT_LEG
  );

  // We demand a min of 1 quests, for 11 turns
  return 11 * Math.max(1, questsDone);
}

function getAutumnUpgraded(...upgrades: AutumnUpgrades[]): number {
  return getAutumnUpgrades().filter((u) => upgrades.includes(u)).length;
}

type AutumnOutcome = {
  location: Location;
  item: Item;
  upgrade: AutumnUpgrades;
};

function getAutumnatonLocations(): AutumnOutcome[] {
  const validLocs: AutumnOutcome[] = [];

  let page = visitUrl("inv_use.php?pwd&whichitem=10954");
  let match: string[];

  while ((match = page.match(/<option {2}value="(\d+)">/)) != null) {
    page = page.replace(match[0], "");
    const loc = toLocation(toInt(match[1]));
    const outcome = getAutumnOutcome(loc);

    if (outcome == null) {
      continue;
    }

    validLocs.push({ location: loc, upgrade: outcome[0], item: outcome[1] });
  }

  return validLocs;
}

function getAutumnUpgrades(): AutumnUpgrades[] {
  return getProperty("autumnatonUpgrades")
    .split(",")
    .filter((s) => s.length > 0) as AutumnUpgrades[];
}

function getAutumnOutcome(location: Location): [AutumnUpgrades, Item] {
  if (location.environment == "outdoor") {
    if (location.difficultyLevel == "low") {
      return [AutumnUpgrades.ENERGY_HAT, leaf];
    } else if (location.difficultyLevel == "mid") {
      return [AutumnUpgrades.RIGHT_ARM, debrisShield];
    } else if (location.difficultyLevel == "high") {
      return [AutumnUpgrades.VISION_EXTENDER, leafPendant];
    }
  } else if (location.environment == "indoor") {
    if (location.difficultyLevel == "low") {
      return [AutumnUpgrades.LEFT_ARM, ale];
    } else if (location.difficultyLevel == "mid") {
      return [AutumnUpgrades.RIGHT_LEG, donut];
    } else if (location.difficultyLevel == "high") {
      return [AutumnUpgrades.RADAR, breeze];
    }
  } else if (location.environment == "underground") {
    if (location.difficultyLevel == "low") {
      return [AutumnUpgrades.LEFT_LEG, sweater];
    } else if (location.difficultyLevel == "mid") {
      return [AutumnUpgrades.COLLECTION_PROW, dollar];
    } else if (location.difficultyLevel == "high") {
      return [AutumnUpgrades.EXHAUST, wisdom];
    }
  }

  return null;
}
