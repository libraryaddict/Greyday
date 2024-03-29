import { getProperty, setProperty, toInt, visitUrl } from "kolmafia";

export enum LatteFlavor {
  FAM_EXP = "vitamins",
  ITEM_DROP = "carrot",
  COLD_DAMAGE = "blue chalks",
  MEAT_DROP = "cajun",
  PVP_FIGHTS = "hellion",
  PLUS_COMBAT = "wing",
  MINUS_COMBAT = "ink",
  MP_5_REGEN = "carrrdamom",
  MP_10_REGEN = "lizard milk",
  HOT_RESIST = "chili seeds",
  COLD_RESIST = "cocoa powder",
  SLEAZE_RESIST = "white flour",
  SPOOKY_RESIST = "squamous salt",
  STENCH_RESIST = "clove",
  FAMILIAR_WEIGHT = "rawhide",
  UNKNOWN = "??",
}

// Map of kol latte names, to mafia latte names
const latteAliases: Map<string, string> = new Map([
  ["fortified", "vitamins"],
  ["hot wing", "wing"],
  ["hot wings", "wing"],
  ["hot wing and", "wing"],
]);

function getFlavors(): string[] {
  const page = visitUrl("main.php?latte=1", false);
  visitUrl("main.php");
  const flavors: string[] = [];

  for (const spl of page.split(
    '<td valign="top" style="border-bottom: 1px solid black"></td>'
  )) {
    let match = spl.match(
      /<input {2}type="radio" name="l([123])" checked value="[a-zA-Z0-9/+]+">[a-zA-z- ]+<\/td>/
    );

    if (match == null) {
      continue;
    }

    const level = toInt(match[1]);
    match = spl.match(
      /<input {2}type="radio" name="l1" (?:checked)? value="[a-zA-Z0-9/+]+"> *([a-zA-z- ]+?) *<\/td>/
    );

    flavors[level - 1] = match[1];
  }

  return flavors;
}

export function getCurrentLatteFlavors(): LatteFlavor[] {
  const knownFlavors = getProperty("_latteFlavors");

  if (knownFlavors.startsWith(getProperty("latteModifier") + "|")) {
    return knownFlavors
      .substring(knownFlavors.lastIndexOf("|") + 1)
      .split(",") as LatteFlavor[];
  }

  const getEnum: (flavor: string) => LatteFlavor = (flavor: string) => {
    flavor = flavor.toLowerCase();

    if (latteAliases.has(flavor)) {
      flavor = latteAliases.get(flavor);
    }

    for (const v of Object.values(LatteFlavor)) {
      if (flavor != v) {
        continue;
      }

      return v;
    }

    return LatteFlavor.UNKNOWN;
  };

  const flavors = getFlavors();

  for (let i = 0; i < flavors.length; i++) {
    const flav = getEnum(flavors[i]);

    if (flav == LatteFlavor.UNKNOWN) {
      /* print(
        "Unknown Latte Flavor " + flavors[i] + "! Cautiously continuing..",
        "gray"
      );*/
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
