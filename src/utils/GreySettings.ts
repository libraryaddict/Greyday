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

  return [towerBreak, moonTune];
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
  static greyTuneMoonSpoon: MoonSign = getProperty(
    "greyTuneMoonSpoon"
  ) as MoonSign;

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
