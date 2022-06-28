import { getProperty, inHardcore, toBoolean } from "kolmafia";

export class GreySettings {
  static hardcoreMode: boolean = false;
  static speedRunMode: boolean = false;
  static adventuresBeforeAbort: number = 8;
  static adventuresGenerateIfPossibleOrAbort = 12;
  static usefulSkillsWeight: number = 6;
  static handySkillsWeight: number = 0.5;

  static isHardcoreMode(): boolean {
    return this.hardcoreMode || inHardcore();
  }

  /**
   * If we aim to collect a hippy outfit
   */
  static isHippyMode(): boolean {
    return this.isHardcoreMode();
  }

  static shouldAvoidTowerRequirements(): boolean {
    return (
      !GreySettings.isHardcoreMode() &&
      toBoolean(getProperty("greyBreakAtTower"))
    );
  }
}
