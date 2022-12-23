import {
  availableAmount,
  getProperty,
  haveSkill,
  Item,
  myMeat,
  Skill,
  toInt,
} from "kolmafia";
import { getQuestStatus } from "../quests/Quests";
import {
  getTrainsetConfiguration,
  isTrainsetConfigurable,
  setTrainsetConfiguration,
  TrainsetPiece,
} from "../utils/GreyTrainset";
import { Task } from "./Tasks";

export class TaskTrainset implements Task {
  mpSkill: Skill = Skill.get("Hivemindedness");

  run(): void {
    if (
      !isTrainsetConfigurable() ||
      getProperty("questL13Final") != "unstarted"
    ) {
      return;
    }

    const desired = this.getDesiredPieces();
    const current = getTrainsetConfiguration();

    // If the current and desired trainset configurations are the same
    if (
      desired.length == current.length &&
      desired.find((d, ind) => d != current[ind]) == null
    ) {
      return;
    }

    setTrainsetConfiguration(desired);
  }

  getDesiredPieces(): TrainsetPiece[] {
    const pieces: TrainsetPiece[] = [];

    // 1
    pieces.push(TrainsetPiece.DOUBLE_NEXT_STATION);

    // 2
    if (!haveSkill(this.mpSkill)) {
      pieces.push(TrainsetPiece.EFFECT_MP);
    }

    // 3
    // Always double our meat if we have less than 5k
    if (myMeat() < 5000) {
      pieces.push(TrainsetPiece.GAIN_MEAT);
    }

    // 4
    if (toInt(getProperty("chasmBridgeProgress")) < 30) {
      pieces.push(TrainsetPiece.SMUT_BRIDGE_OR_STATS);
    }

    // Add the meat piece here if it wasn't added before
    if (!pieces.includes(TrainsetPiece.GAIN_MEAT)) {
      pieces.push(TrainsetPiece.GAIN_MEAT);
    }

    // 5
    pieces.push(TrainsetPiece.DROP_LAST_FOOD_OR_RANDOM);
    // 6
    pieces.push(TrainsetPiece.RANDOM_BOOZE);

    // 7
    if (
      getQuestStatus("questL08Trapper") == 1 &&
      availableAmount(Item.get(getProperty("trapperOre"))) < 3
    ) {
      pieces.push(TrainsetPiece.ORE);
    }

    // 8
    pieces.push(TrainsetPiece.CANDY);

    // And the extras

    // If kitchen isn't done.
    if (getQuestStatus("questM20Necklace") == 0) {
      pieces.push(TrainsetPiece.STENCH_RES_SPOOKY_DMG);
      pieces.push(TrainsetPiece.HOT_RES_COLD_DMG);
    }

    // If icy peak or aboo peak is up
    const booPeak =
      toInt(getProperty("booPeakProgress")) > 0 &&
      toInt(getProperty("booPeakProgress")) < 100;
    const icyPeak =
      getQuestStatus("questL08Trapper") >= 3 &&
      getQuestStatus("questL08Trapper") < 100;
    const protesters =
      toInt(getProperty("zeppelinProtestors")) > 0 &&
      toInt(getProperty("zeppelinProtestors")) < 80;

    if (booPeak || icyPeak) {
      pieces.push(TrainsetPiece.COLD_RES_STENCH_DMG);
    }

    if (booPeak || protesters) {
      pieces.push(TrainsetPiece.SPOOKY_RES_SLEAZE_DMG);
    }

    for (const leftover of [
      TrainsetPiece.BUFF_FOOD_DROP,
      TrainsetPiece.HOT_RES_COLD_DMG,
      TrainsetPiece.STENCH_RES_SPOOKY_DMG,
      TrainsetPiece.SPOOKY_RES_SLEAZE_DMG,
      TrainsetPiece.SLEAZE_RES_HOT_DMG,
      TrainsetPiece.COLD_RES_STENCH_DMG,
    ]) {
      if (pieces.length >= 8) {
        break;
      }

      if (pieces.includes(leftover)) {
        continue;
      }

      pieces.push(leftover);
    }

    while (pieces.length > 8) {
      pieces.pop();
    }

    return pieces;
  }
}
