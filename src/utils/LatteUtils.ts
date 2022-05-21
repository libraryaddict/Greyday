import { getProperty, print, setProperty, toInt, visitUrl } from "kolmafia";

export enum LatteFlavor {
  FAM_EXP = "vitamins",
  ITEM_DROP = "carrot",
  COLD_DAMAGE = "blue chalks",
  MEAT_DROP = "cajun",
  FAM_WEIGHT = "rawhide",
  PVP_FIGHTS = "hellion",
  PLUS_COMBAT = "hot wing",
  MINUS_COMBAT = "ink",
  MP_5_REGEN = "carrrdamom",
  MP_10_REGEN = "lizard milk",
  HOT_RESIST = "chili seeds",
  COLD_RESIST = "cocoa powder",
  SLEAZE_RESIST = "white flour",
  SPOOKY_RESIST = "squamous salt",
  STENCH_RESIST = "clove",
  FAMILIAR_WEIGHT = "rawhide",
  UNKNOWN = "",
}

// Map of kol latte names, to mafia latte names
const latteAliases: Map<string, string> = new Map([["fortified", "vitamins"]]);

function getFlavors(): string[] {
  let page = visitUrl("main.php?latte=1", false);
  let flavors: string[] = [];

  for (let spl of page.split(
    '<td valign="top" style="border-bottom: 1px solid black"></td>'
  )) {
    let match = spl.match(
      /<input  type="radio" name="l([123])" checked value="[a-zA-Z0-9\/+]+">[a-zA-z- ]+<\/td>/
    );

    if (match == null) {
      continue;
    }

    let level = toInt(match[1]);
    match = spl.match(
      /<input  type="radio" name="l1" (?:checked)? value="[a-zA-Z0-9\/+]+"> *([a-zA-z- ]+?) *<\/td>/
    );

    flavors[level - 1] = match[1];
  }

  return flavors;
}

export function getCurrentLatteFlavors(): LatteFlavor[] {
  let knownFlavors = getProperty("_latteFlavors");

  if (knownFlavors.startsWith(getProperty("latteModifier") + "|")) {
    return knownFlavors
      .substring(knownFlavors.lastIndexOf("|") + 1)
      .split(",") as LatteFlavor[];
  }

  let getEnum: (flavor: string) => LatteFlavor = (flavor: string) => {
    flavor = flavor.toLowerCase();

    if (latteAliases.has(flavor)) {
      flavor = latteAliases.get(flavor);
    }

    for (let v of Object.values(LatteFlavor)) {
      if (flavor != v) {
        continue;
      }

      return v;
    }

    return LatteFlavor.UNKNOWN;
  };

  let flavors = getFlavors();

  for (let i = 0; i < flavors.length; i++) {
    let flav = getEnum(flavors[i]);

    if (flav == LatteFlavor.UNKNOWN) {
      throw "Unknown Latte Flavor " + flavors[i] + "! Please add the alias.";
    }

    flavors[i] = flav;
  }

  setProperty(
    "_latteFlavors",
    getProperty("latteModifier") + "|" + flavors.join(",")
  );

  return flavors as LatteFlavor[];
}

export function hasUnlockedLatteFlavor(drink: LatteFlavor): boolean {
  return getProperty("latteUnlocks").split(",").includes(drink);
}

export function setupLatte(
  flavor1: LatteFlavor,
  flavor2: LatteFlavor,
  flavor3: LatteFlavor
) {}
