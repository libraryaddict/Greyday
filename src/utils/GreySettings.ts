import { getProperty, inHardcore, toBoolean } from "kolmafia";

export type GreySetting = {
  name: string;
  description: string;
  valid: (value: string) => boolean;
};

export function getGreySettings(): GreySetting[] {
  let towerBreak: GreySetting = {
    name: "greyBreakAtTower",
    description:
      "Should the script halt when it reaches the tower? False by default. Useful as continuing after breaking ronin takes less turns. This will change the behavior of the script to skip some zones.",
    valid: (value) => value == "true" || value == "false",
  };

  let moonTune: GreySetting = {
    name: "greyTuneMoonSpoon",
    description:
      "If set, will use the rune moon spoon (if owned) to change moon signs to the requested moon sign when done with tasks in the current moon sign.",
    valid: (value) =>
      moonSigns.find((s) => s.toLowerCase() == value.toLowerCase()) != null,
  };

  let manorLights: GreySetting = {
    name: "greyFinishManorLights",
    description:
      "The script will do the hidden manor lights quest, but should it fight Elizabeth & Stephen if the chance comes up? (Garbo does fight Stephen)",
    valid: (value) => value == "true" || value == "false",
  };

  let pvpEnable: GreySetting = {
    name: "greyEnablePvP",
    description:
      "Should the script enable PvP at the start of the run? This doesn't actually make much difference vs enabling it later as there's no pvp generation, unless you have robortender.",
    valid: (value) => value == "true" || value == "false",
  };

  let dailyMalware: GreySetting = {
    name: "greyDailyMalware",
    description:
      "Intended for use with breaking at tower, this is run when the script resumes and you presummably have broken ronin. It will buy or create a daily malware, and do the daily dungeon. This doesn't take effect in hardcore, or if tower break is not enabled.",
    valid: (value) => value == "true" || value == "false",
  };

  let fantasyBandits: GreySetting = {
    name: "greyFantasyBandits",
    description:
      "If this is set to true, script will do fantasy bandits regardless of tower break setting. Will use fantasyrealm if available, otherwise a fax source & Backup Camera",
    valid: (value) => value == "true" || value == "false",
  };

  let levelingResources: GreySetting = {
    name: "greyPrepareLevelingResources",
    description:
      "If this is set to true, script will attempt to prepare resources that are useful for power leveling. Namely familiar scrapbook and raise goose weight.",
    valid: (value) => value == "true" || value == "false",
  };

  let skipPalindome: GreySetting = {
    name: "greySkipPalindome",
    description:
      "If set to true, will not complete palindome. This is only useful if you intend to burn turns on UR farming, and you're recommended to save at least 80 turns minumum to resume the script. To resume, this will need to be set to false.",
    valid: (value) => value == "true" || value == "false",
  };

  return [
    towerBreak,
    moonTune,
    manorLights,
    pvpEnable,
    dailyMalware,
    fantasyBandits,
    levelingResources,
    skipPalindome,
  ];
}

export const moonSigns: string[] = [
  "Mongoose",
  "Wallaby",
  "Vole",
  "Platypus",
  "Opossum",
  "Marmot",
  "Wombat",
  "Blender",
  "Packrat",
];

export type MoonSign =
  | "Mongoose"
  | "Wallaby"
  | "Vole"
  | "Platypus"
  | "Opossum"
  | "Marmot"
  | "Wombat"
  | "Blender"
  | "Packrat";

export type MoonZone = "Knoll" | "Canadia" | "Gnomad";

export function getMoonZone(sign: MoonSign): MoonZone {
  let index = moonSigns.indexOf(sign);

  if (index < 0) {
    return null;
  } else if (index <= 2) {
    return "Knoll";
  } else if (index <= 5) {
    return "Canadia";
  }

  return "Gnomad";
}

export class GreySettings {
  static hardcoreMode: boolean = false;
  static speedRunMode: boolean = false;
  static adventuresBeforeAbort: number = 8;
  static adventuresGenerateIfPossibleOrAbort = 12;
  static usefulSkillsWeight: number = 6;
  static handySkillsWeight: number = 0.5;
  static greyBreakAtTower: boolean = toBoolean(
    getProperty("greyBreakAtTower") || "false"
  );
  static greyDailyMalware: boolean = toBoolean(
    getProperty("greyDailyMalware") || "false"
  );
  static greyPrepareLevelingResources: boolean = toBoolean(
    getProperty("greyPrepareLevelingResources") || "false"
  );
  static greyFantasyBandits: boolean = toBoolean(
    getProperty("greyFantasyBandits") || "false"
  );
  static greyTuneMoonSpoon: MoonSign = getProperty(
    "greyTuneMoonSpoon"
  ) as MoonSign;
  static greyDebug: boolean = toBoolean(getProperty("greyDebug") || "false");
  static greySkipPalindome: boolean = toBoolean(
    getProperty("greySkipPalindome") || "false"
  );

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
    return !GreySettings.isHardcoreMode() && this.greyBreakAtTower;
  }
}
