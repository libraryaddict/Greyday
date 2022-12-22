import {
  Effect,
  extractItems,
  getProperty,
  getWorkshed,
  haveEffect,
  Item,
  propertyExists,
  setProperty,
  toInt,
  visitUrl,
} from "kolmafia";

export enum TrainsetPiece {
  UNKNOWN = "",
  EMPTY = "empty",
  GAIN_MEAT = "meat_mine",
  EFFECT_MP = "tower_fizzy",
  GAIN_STATS = "viewing_platform",
  HOT_RES_COLD_DMG = "tower_frozen",
  STENCH_RES_SPOOKY_DMG = "spooky_graveyard",
  SMUT_BRIDGE_OR_STATS = "logging_mill",
  CANDY = "candy_factory",
  DOUBLE_NEXT_STATION = "coal_hopper",
  COLD_RES_STENCH_DMG = "tower_sewage",
  SPOOKY_RES_SLEAZE_DMG = "oil_refinery",
  SLEAZE_RES_HOT_DMG = "oil_bridge",
  MORE_ML = "water_bridge",
  MOXIE_STATS = "groin_silo",
  RANDOM_BOOZE = "grain_silo",
  MYS_STATS = "brain_silo",
  MUS_STATS = "brawn_silo",
  BUFF_FOOD_DROP = "prawn_silo",
  DROP_LAST_FOOD_OR_RANDOM = "trackside_diner",
  ORE = "ore_hopper",
}

const pieces: TrainsetPiece[] = [
  TrainsetPiece.EMPTY,
  TrainsetPiece.GAIN_MEAT,
  TrainsetPiece.EFFECT_MP,
  TrainsetPiece.GAIN_STATS,
  TrainsetPiece.HOT_RES_COLD_DMG,
  TrainsetPiece.STENCH_RES_SPOOKY_DMG,
  TrainsetPiece.SMUT_BRIDGE_OR_STATS,
  TrainsetPiece.CANDY,
  TrainsetPiece.DOUBLE_NEXT_STATION,
  TrainsetPiece.COLD_RES_STENCH_DMG,
  TrainsetPiece.UNKNOWN,
  TrainsetPiece.SPOOKY_RES_SLEAZE_DMG,
  TrainsetPiece.SLEAZE_RES_HOT_DMG,
  TrainsetPiece.MORE_ML,
  TrainsetPiece.MOXIE_STATS,
  TrainsetPiece.RANDOM_BOOZE,
  TrainsetPiece.MYS_STATS,
  TrainsetPiece.MUS_STATS,
  TrainsetPiece.BUFF_FOOD_DROP,
  TrainsetPiece.DROP_LAST_FOOD_OR_RANDOM,
  TrainsetPiece.ORE,
];

const trainsetEffects: Map<TrainsetPiece, Effect> = new Map([
  [TrainsetPiece.EFFECT_MP, Effect.get("Carbonated")],
  [TrainsetPiece.HOT_RES_COLD_DMG, Effect.get("Frozen")],
  [TrainsetPiece.STENCH_RES_SPOOKY_DMG, Effect.get("Shivering Spine")],
  [TrainsetPiece.COLD_RES_STENCH_DMG, Effect.get("Hot Soupy Garbage")],
  [TrainsetPiece.SLEAZE_RES_HOT_DMG, Effect.get("Burningly Oiled")],
  [TrainsetPiece.SPOOKY_RES_SLEAZE_DMG, Effect.get("Spookily Greasy")],
  [TrainsetPiece.MORE_ML, Effect.get("Troubled Waters")],
  [TrainsetPiece.BUFF_FOOD_DROP, Effect.get("Craving Prawns")],
]);
const trainsetEffectsDoubled: Map<TrainsetPiece, Effect> = new Map([
  [TrainsetPiece.EFFECT_MP, Effect.get("Double Carbonated")],
  [TrainsetPiece.HOT_RES_COLD_DMG, Effect.get("Double Frozen")],
  [TrainsetPiece.STENCH_RES_SPOOKY_DMG, Effect.get("Doubly Shivering Spine")],
  [TrainsetPiece.COLD_RES_STENCH_DMG, Effect.get("Double Hot Soupy Garbage")],
  [TrainsetPiece.SLEAZE_RES_HOT_DMG, Effect.get("Doubly Burningly Oiled")],
  [TrainsetPiece.SPOOKY_RES_SLEAZE_DMG, Effect.get("Doubly Spookily Greasy")],
  [TrainsetPiece.MORE_ML, Effect.get("Doubly Troubled Waters")],
  [TrainsetPiece.BUFF_FOOD_DROP, Effect.get("Doubly Craving Prawns")],
]);

const trainset: Item = Item.get("model train set");

export function getTrainsetEffect(piece: TrainsetPiece): Effect {
  return trainsetEffects.get(piece);
}

export function getDoubledTrainsetEffect(piece: TrainsetPiece): Effect {
  return trainsetEffectsDoubled.get(piece);
}

export function isTrainsetPieceEffectActive(piece: TrainsetPiece): boolean {
  return (
    (trainsetEffects.has(piece) &&
      haveEffect(trainsetEffects.get(piece)) > 0) ||
    (trainsetEffectsDoubled.has(piece) &&
      haveEffect(trainsetEffectsDoubled.get(piece)) > 0)
  );
}

function getPieceId(piece: TrainsetPiece): number {
  return Math.max(0, pieces.indexOf(piece));
}

export function getTrainsetConfiguration(): TrainsetPiece[] {
  return getProperty("trainsetConfiguration").split(",") as TrainsetPiece[];
}

function getTrainsetPositionsUntilConfigurable(): number {
  const pos = toInt(getProperty("trainsetPosition"));
  const configured = toInt(getProperty("lastTrainsetConfiguration"));
  const turnsSinceConfigured = pos - configured;

  return Math.max(0, 40 - turnsSinceConfigured);
}

export function isTrainsetConfigurable(): boolean {
  return (
    getWorkshed() == trainset && getTrainsetPositionsUntilConfigurable() <= 0
  );
}

function getTrainsetEncounters(): TrainsetPiece[] {
  const pieces = getTrainsetConfiguration();
  const newPieces: TrainsetPiece[] = [];
  const offset = toInt(getProperty("trainsetPosition")) % 8;

  for (let i = 0; i < 8; i++) {
    const newPos = (i + offset) % 8;

    newPieces[newPos] = pieces[i];
  }

  return newPieces;
}

const foodProperty: string = "lastFoodDropped";

function trackLastFood(page: string) {
  if (getWorkshed() != trainset) {
    if (getProperty(foodProperty) != "") {
      setProperty(foodProperty, "");
    }

    return;
  }

  if (page.includes("<b>Trackside Diner.</b>")) {
    if (getProperty(foodProperty) != "") {
      setProperty(foodProperty, "");
    }

    // Remove the part of the page that lists what food dropped
    page = page.substring(
      page.indexOf("</table>", page.indexOf("<b>Trackside Diner.</b>"))
    );
  }

  if (!page.includes("<!--WINWINWIN-->")) {
    return;
  }

  const items = extractItems(page);
  let food: Item = null;

  for (const key of Object.keys(items)) {
    const item = Item.get(key);

    if (item.fullness <= 0) {
      continue;
    }

    food = item;
  }

  if (food == null) {
    return;
  }

  setProperty(foodProperty, toInt(food).toString());
}

function getTrainsetFoodQueued(): Item {
  // TODO Returns the food that will drop when we hit diner
  if (!propertyExists(foodProperty)) {
    return null;
  }

  const prop = getProperty(foodProperty);

  if (prop == "") {
    return null;
  }

  return Item.get(toInt(prop));
}

export function setTrainsetConfiguration(pieces: TrainsetPiece[]) {
  visitUrl("campground.php?action=workshed");

  const pieceIds = pieces
    .map((p) => getPieceId(p))
    .map((pieceId, index) => `slot[${index}]=${pieceId}`);

  // whichchoice=1485&option=1&pwd=86af819be25f6ee16d9b3736e362ef2b&slot%5B0%5D=12&slot%5B1%5D=0&slot%5B2%5D=0&slot%5B3%5D=0&slot%5B4%5D=0&slot%5B5%5D=0&slot%5B6%5D=0&slot%5B7%5D=0
  // choice.php?forceoption=0&whichchoice=1485&option=1&pwd&slot[0]=0&slot[1]=0&slot[2]=0&slot[3]=0&slot[4]=0&slot[5]=0&slot[6]=0&slot[7]=0

  const url = `choice.php?forceoption=0&whichchoice=1485&option=1&pwd&${pieceIds.join(
    "&"
  )}`;

  visitUrl(url, true);
  visitUrl("main.php");

  const expected = pieces.join(",");

  if (expected != getProperty("trainsetConfiguration")) {
    throw `Expected trainset configuration to have changed, expected "${expected}" but instead got ${getProperty(
      "trainsetConfiguration"
    )}`;
  }
}
