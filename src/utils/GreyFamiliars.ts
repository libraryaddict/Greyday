import {
  availableAmount,
  Familiar,
  familiarWeight,
  getProperty,
  haveFamiliar,
  Item,
  runChoice,
  toFamiliar,
  toInt,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import { GreySettings } from "./GreySettings";

// Map<Familiar, If it still valid>
// So the value is if this familiar is still worth running
const familiarsToUse: [Familiar, () => boolean][] = [];
const familiarsNotToLevel: Familiar[] = [
  Familiar.get("Cat Burglar"),
  Familiar.get("Gelatinous Cubeling"),
];
const familiarsToLevel: Familiar[] = [Familiar.get("Reagnimated Gnome")];

export function shouldLevelFamiliar(fam: Familiar) {
  return (
    !familiarsNotToLevel.includes(fam) &&
    (familiarsToLevel.includes(fam) ||
      familiarsToUse.find(([f]) => f == fam) == null)
  );
}

function add(familiar: Familiar, func: () => boolean) {
  familiarsToUse.push([familiar, func]);
}

function lessThan(familiar: string, propertyName: string, value: number) {
  add(Familiar.get(familiar), () => toInt(getProperty(propertyName)) < value);
}

function alwaysValid(familiar: string) {
  add(Familiar.get(familiar), () => true);
}

function canLevel(familiar: string, fullLevel: boolean) {
  const fam = Familiar.get(familiar);

  if (!familiarsToLevel.includes(fam)) {
    familiarsToLevel.push(fam);
  }

  add(fam, () => familiarWeight(fam) < (fullLevel ? 20 : 15));
}

function addLevelers(fullLevel: boolean) {
  add(
    Familiar.get("Robortender"),
    () =>
      familiarWeight(Familiar.get("Robortender")) < (fullLevel ? 20 : 15) &&
      getProperty("_roboDrinks").includes("drive-by shooting")
  );
  canLevel("Pocket Professor", fullLevel);
  canLevel("Jumpsuited Hound Dog", fullLevel);
  add(
    Familiar.get("Hobo Monkey"),
    () =>
      familiarWeight(Familiar.get("Hobo Monkey")) < (fullLevel ? 20 : 15) &&
      !haveFamiliar(Familiar.get("Robortender"))
  );
  canLevel("Stomping Boots", fullLevel);
  canLevel("Frumious Bandersnatch", fullLevel);
}

lessThan("Grimstone Golem", "_grimstoneMaskDrops", 1);
lessThan("Angry Jung Man", "_jungDrops", 1);
lessThan("Grim Brother", "_grimFairyTaleDrops", 5);
lessThan("Adventurous Spelunker", "_spelunkingTalesDrops", 1);
lessThan("Unconscious Collective", "_dreamJarDrops", 5);
lessThan("Astral badger", "_astralDrops", 5);
lessThan("Baby Sandworm", "_aguaDrops", 5);
lessThan("Blavious Kloop", "_kloopDrops", 5);
lessThan("Bloovian Groose", "_grooseDrops", 5);
lessThan("Fist Turkey", "_turkeyBooze", 5);
lessThan("Golden Monkey", "_powderedGoldDrops", 5);
lessThan("Green Pixie", "_absintheDrops", 5);
lessThan("Li'l Xenomorph", "_transponderDrops", 5);
lessThan("Llama Lama", "_gongDrops", 5);
lessThan("Ms. Puck Man", "_powerPillDrops", 5);
lessThan("Puck Man", "_powerPillDrops", 5);
lessThan("Rogue Program", "_tokenDrops", 5);
lessThan("Machine Elf", "_snowglobeDrops", 1);

alwaysValid("Reagnimated Gnome");
alwaysValid("Temporal Riftlet");

addLevelers(false);

lessThan("Mini-Hipster", "_hipsterAdv", 7);
lessThan("Artistic Goth Kid", "_hipsterAdv", 7);

alwaysValid("Cookbookbat");
alwaysValid("Obtuse Angel");
alwaysValid("XO Skeleton");

addLevelers(true);

// Crappy
lessThan("Galloping Grill", "_hotAshesDrops", 5);
lessThan("Cotton Candy Carnie", "_carnieCandyDrops", 10);
lessThan("Miniature Sword & Martini Guy", "_miniMartiniDrops", 10);
lessThan("Melodramedary", "camelSpit", 100);

const gnome = Familiar.get("Reagnimated Gnome");
const gnomeKnee: Item = Item.get("gnomish housemaid's kgnee");

export function getFamiliarsToUse(): Familiar[] {
  const famsToUse: Familiar[] = [];

  if (GreySettings.greyUseFamiliars.length > 0) {
    GreySettings.greyUseFamiliars
      .split(",")
      .map((f) => toFamiliar(f))
      .forEach((fam) => {
        if (!haveFamiliar(fam)) {
          return;
        }

        const toUse = familiarsToUse.filter(([f]) => f == fam);

        if (toUse.length > 0 && toUse.find(([, canUse]) => canUse()) == null) {
          return;
        }

        famsToUse.push(fam);
      });
  } else {
    familiarsToUse
      .filter(([f, canUse]) => haveFamiliar(f) && canUse())
      .forEach(([f]) => {
        if (famsToUse.includes(f)) {
          return;
        }

        famsToUse.push(f);
      });
  }

  // TODO Make sure this only runs when we're actually running
  if (famsToUse.includes(gnome) && availableAmount(gnomeKnee) == 0) {
    useFamiliar(gnome);

    visitUrl("arena.php");
    runChoice(4);

    if (availableAmount(gnomeKnee) == 0) {
      throw "Expected to have " + gnomeKnee;
    }
  }

  return famsToUse;
}
