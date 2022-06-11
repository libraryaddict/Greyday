import {
  cliExecute,
  getLocketMonsters,
  getProperty,
  Location,
  Monster,
  myTurncount,
  toInt,
  toLocation,
  toMonster,
  turnsPlayed,
  visitUrl,
} from "kolmafia";

export enum UmbrellaState {
  MONSTER_LEVEL = "broken",
  DAMAGE_REDUCTION_SHIELD = "forward",
  ITEM_DROPS = "bucket",
  WEAPON_DAMAGE = "pitchfork",
  SPELL_DAMAGE = "twirling",
  MINUS_COMBAT = "cocoon",
}

export function setUmbrella(setting: UmbrellaState) {
  if (getProperty("umbrellaState").includes(setting)) {
    return;
  }

  cliExecute("umbrella " + setting);
}

export function canCombatLocket(monster: Monster): boolean {
  let foughtToday: Monster[] = getProperty("_locketMonstersFought")
    .split(",")
    .map((s) => toMonster(toInt(s)));

  if (foughtToday.length >= 3 || foughtToday.includes(monster)) {
    return false;
  }

  let monsters: Monster[] = Object.keys(getLocketMonsters()).map((s) =>
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

let lastBallCheck: number = 0;
/**
 * Returns a map of locations, and the monsters predicted.
 *
 * The boolean is a "Should we show fights that will still be valid if we waste a turn elsewhere"
 */
export function currentPredictions(
  showPredictionsNotAboutToExpire = true
): Map<Location, Monster> {
  let predictions = ballProp();

  if (lastBallCheck != turnsPlayed()) {
    visitUrl("inventory.php?ponder=1", false);

    lastBallCheck = turnsPlayed();
    predictions = ballProp();
  }

  return new Map(
    predictions.map(([, location, monster]) => [location, monster])
  );

  /*// If a prediction should've been expired by mafia, ponder because something is wrong.
  if (predictions.find(([turn]) => turn + 2 <= myTurncount())) {
    visitUrl("inventory.php?ponder=1", false);

    predictions = ballProp();
  }

  // The alternative is to make the 'gottenLastTurn' always return true if the predicted turns is smaller than turns

  const gottenLastTurn = (predictedTurns: number, turns: number) =>
    predictedTurns < turns;
  const gottenThisTurn = (predictedTurns: number, turns: number) =>
    predictedTurns === turns;

  return new Map(
    predictions
      .filter(
        ([turncount]) =>
          gottenLastTurn(turncount, myTurncount()) ||
          (showPredictionsNotAboutToExpire &&
            gottenThisTurn(turncount, myTurncount()))
      )
      .map(([, location, monster]) => [location, monster])
  );*/
}
