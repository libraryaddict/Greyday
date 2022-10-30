import {
  availableAmount,
  canAdventure,
  cliExecute,
  Effect,
  Familiar,
  familiarEquippedEquipment,
  getLocketMonsters,
  getProperty,
  haveEffect,
  Item,
  Location,
  Monster,
  myAscensions,
  myFamiliar,
  print,
  retrieveItem,
  sessionLogs,
  toInt,
  toLocation,
  toMonster,
  turnsPlayed,
  visitUrl,
} from "kolmafia";
import { getPrimedResource, greyAdv } from "./GreyLocations";
import { GreySettings } from "./GreySettings";

export enum UmbrellaState {
  MONSTER_LEVEL = "broken",
  DAMAGE_REDUCTION_SHIELD = "forward",
  ITEM_DROPS = "bucket",
  WEAPON_DAMAGE = "pitchfork",
  SPELL_DAMAGE = "twirling",
  MINUS_COMBAT = "cocoon",
}

export function centerText(text: string, color?: string): string {
  return `<div style="text-align: center;"${
    color ? " color='" + color + "'" : ""
  }><p style="margin: 0; padding: 0;">${text}</p></div>`;
}

const umbrella: Item = Item.get("Unbreakable Umbrella");
const lefthand: Familiar = Familiar.get("Left-Hand Man");

export function setUmbrella(setting: UmbrellaState) {
  if (
    availableAmount(umbrella) == 0 ||
    getProperty("umbrellaState").includes(setting)
  ) {
    return;
  }

  if (
    familiarEquippedEquipment(lefthand) == umbrella &&
    myFamiliar() != lefthand
  ) {
    retrieveItem(umbrella);
  }

  cliExecute("umbrella " + setting);
}

export function canCombatLocket(monster: Monster): boolean {
  const foughtToday: Monster[] = getProperty("_locketMonstersFought")
    .split(",")
    .map((s) => toMonster(toInt(s)));

  if (foughtToday.length >= 3 || foughtToday.includes(monster)) {
    return false;
  }

  const monsters: Monster[] = Object.keys(getLocketMonsters()).map((s) =>
    toMonster(s)
  );

  if (!monsters.includes(monster)) {
    return false;
  }

  return true;
}

export function getBackupsRemaining() {
  return 11 - toInt(getProperty("_backUpUses"));
}

export function doColor(text: string, color: string): string {
  return `<font color='${color}'>${text}</font>`;
}

export function getEncounters(
  location: string,
  encounters: string[] = null
): [string, number][] {
  const spl = sessionLogs(1)[0].split("\n");
  const reg = /^\[(\d+)\] (.*?)\r?$/;
  const matches: [string, number][] = [];
  let turn: number;
  let doing = false;

  for (const s of spl) {
    if (s.startsWith("[")) {
      const match = s.match(reg);

      if (match == null) {
        continue;
      }

      turn = toInt(match[1]);

      if (location != null) {
        doing = match[2] == location;
      }
    } else if (s.startsWith("Encounter: ")) {
      if (turn == null) {
        continue;
      }

      const name = s.substring(s.indexOf(": ") + 2).replace("\r", "");

      if (!doing && (encounters == null || !encounters.includes(name))) {
        continue;
      }

      // TODO Really need to parse encounters without hardcoding this
      if (
        name == "Adjust your Parka" ||
        name == "Configure Your Unbreakable Umbrella" ||
        name == "Direct Autumn-Aton"
      ) {
        continue;
      }

      matches.push([name, turn]);
    }
  }

  return matches;
}

const ballProp = () =>
  getProperty("crystalBallPredictions")
    .split("|")
    .map((element) => element.split(":") as [string, string, string])
    .map(
      ([turncount, location, monster]) =>
        [parseInt(turncount), toLocation(location), toMonster(monster)] as [
          number,
          Location,
          Monster
        ]
    );

let lastToasterGaze: number = 0;
let lastEncounter: number = 0;
const crystalBall: Item = Item.get("miniature crystal ball");
const teleportis = Effect.get("Teleportitis");

export function doToasterGaze() {
  if (
    availableAmount(crystalBall) == 0 ||
    turnsPlayed() == lastToasterGaze ||
    toInt(getProperty("lastDesertUnlock")) < myAscensions() ||
    haveEffect(teleportis) > 0 ||
    (getPrimedResource() != null && getPrimedResource().resource.primed())
  ) {
    return;
  }

  if (ballProp().find(([turn]) => turn + 1 < turnsPlayed()) == null) {
    return;
  }

  print(
    "As if infected, your legs bring you to the beach where you feel compelled to toastergaze. A light slap brings you out of it, Gausie lectures you on the dangers of toast. But that's not right, you can see a mountain of toast in their displaycase..",
    "blue"
  );
  greyAdv("adventure.php?snarfblat=355");
  lastToasterGaze = turnsPlayed();
  visitUrl("inventory.php?ponder=1", false);
}

/**
 * Returns a map of locations, and the monsters predicted.
 *
 * The boolean is a "Should we show fights that will still be valid if we waste a turn elsewhere"
 */
export function currentPredictions(): Map<Location, Monster> {
  if (availableAmount(crystalBall) == 0) {
    return new Map();
  }

  let predictions = ballProp();

  if (lastEncounter != turnsPlayed()) {
    lastEncounter = turnsPlayed();

    visitUrl("inventory.php?ponder=1", false);

    predictions = ballProp();
  }

  return new Map(
    predictions.map(([, location, monster]) => [location, monster])
  );
}
export function getAllCombinations<Type>(
  valuesArray: Type[],
  uniquesOnly: boolean = true
): Type[][] {
  const combi: Type[][] = [];
  let temp: Type[] = [];
  const slent: number = Math.pow(2, valuesArray.length);
  const uniques: Type[] = [];
  const added: string[] = [];

  valuesArray.forEach((v, index) => {
    if (valuesArray.indexOf(v) != index) {
      return;
    }

    uniques.push(v);
  });

  for (let i = 0; i < slent; i++) {
    temp = [];

    for (let j = 0; j < valuesArray.length; j++) {
      if (!(i & Math.pow(2, j))) {
        continue;
      }

      temp.push(valuesArray[j]);
    }

    if (temp.length == 0) {
      continue;
    }

    // If we don't want the same arrays but in different orders
    if (uniquesOnly) {
      const id = temp
        .map((t) => uniques.findIndex((v) => v === t))
        .sort()
        .join(",");

      if (added.includes(id)) {
        continue;
      } else {
        added.push(id);
      }
    }

    combi.push(temp);
  }

  combi.sort((a, b) => a.length - b.length);

  return combi;
}

export function hasPulled(item: Item): boolean {
  return getProperty("_roninStoragePulls")
    .split(",")
    .includes(toInt(item).toString());
}

export function canGreyAdventure(location: Location): boolean {
  if (
    location.zone == "Pandamonium" &&
    getProperty("questL06Friar") != "finished"
  ) {
    return false;
  }

  return canAdventure(location);
}
