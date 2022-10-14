import {
  availableAmount,
  Familiar,
  getProperty,
  inHardcore,
  Item,
  mySign,
  toBoolean,
  toInt,
  toItem,
  toString,
} from "kolmafia";
import { doFortuneTeller, getAvailableClans } from "./GreyClan";

export type GreySetting = {
  name: string;
  description: string;
  valid: (value: string) => boolean;
  default: unknown;
  viable?: boolean;
};

export function getGreySettings(): GreySetting[] {
  const towerBreak: GreySetting = {
    name: "greyBreakAtTower",
    description:
      "Should the script halt when it reaches the tower? False by default. Useful as continuing after breaking ronin takes less turns. This will change the behavior of the script to skip some zones.",
    valid: (value) => value == "true" || value == "false",
    default: true,
  };

  const moonTune: GreySetting = {
    name: "greyTuneMoonSpoon",
    description:
      "If set, will use the rune moon spoon (if owned) to change moon signs to the requested moon sign when done with tasks in the current moon sign.",
    valid: (value) =>
      moonSigns.find((s) => s.toLowerCase() == value.toLowerCase()) != null,
    default: null,
  };

  const manorLights: GreySetting = {
    name: "greyFinishManorLights",
    description:
      "The script will do the hidden manor lights quest, but should it fight Elizabeth & Stephen at the end? (Garbo does fight Stephen for meat)",
    valid: (value) => value == "true" || value == "false",
    default: false,
  };

  const pvpEnable: GreySetting = {
    name: "greyEnablePvP",
    description:
      "Should the script enable PvP at the start of the run? This doesn't actually make much difference vs enabling it later as there's no pvp generation, unless you have robortender.",
    valid: (value) => value == "true" || value == "false",
    default: false,
  };

  const dailyMalware: GreySetting = {
    name: "greyDailyMalware",
    description:
      "If we do daily dungeon, how should we treat daily malware? If not set, will use best judgement. If true, will always use malware or avoid if malware is unavailable. If false will never use malware.",
    valid: (value) => value == "true" || value == "false",
    default: null,
  };

  const dailyDungeon: GreySetting = {
    name: "greyDailyDungeon",
    description:
      "Should the script always do daily dungeon, even when there is no need to? Eg, tower break. Useful in conjunction with greyDailyMalware",
    valid: (value) => value == "true" || value == "false",
    default: false,
  };

  const levelingResources: GreySetting = {
    name: "greyPrepareLevelingResources",
    description:
      "If this is set to true, script will attempt to prepare resources that are useful for power leveling. Namely familiar scrapbook and raise goose weight.",
    valid: (value) => value == "true" || value == "false",
    default: true,
  };

  const skipPalindome: GreySetting = {
    name: "greySkipPalindome",
    description:
      "If set to true, will not complete palindome. This is only useful if you intend to burn turns on UR farming, and you're recommended to save at least 80 turns minumum to resume the script. To resume, this will need to be set to false.",
    valid: (value) => value == "true" || value == "false",
    default: false,
  };

  const doHellQuest: GreySetting = {
    name: "greyAzazelSteelMargarita",
    description:
      "If set to true, will complete the requirements for the Steel Margarita +5 Liver drink. There is different scenarios for this, but this is best used with towerbreaking and ronin escaping. It will attempt to use the no-trades previously acquired.",
    valid: (value) => value == "true" || value == "false",
    default: false,
  };

  const deleteKmails: GreySetting = {
    name: "greyDeleteKmails",
    description:
      "When true, will delete kmails from spooky lady and fortune teller",
    valid: (value) => value == "true" || value == "false",
    default: true,
  };

  const useMummery: GreySetting = {
    name: "greyUseMummery",
    description:
      "If set to true, will set grey goose to use MP restoring. This is enabled by default as there isn't really a reason not to.",
    valid: (value) => value == "true" || value == "false",
    default: true,
    viable: availableAmount(Item.get("mumming trunk")) > 0,
  };

  const defaultAdvValue =
    Math.round((toInt(getProperty("valueOfAdventure")) * 0.7) / 100) * 100;

  const grayAdventureValue: GreySetting = {
    name: "greyValueOfAdventure",
    description:
      "Used to determine how to prioritize resources, a fax for example is worth 20k. If it saves 3 turns and each turn is worth 10k, then it's obviously worth using the fax to save those 3 turns. Default value is based off roughly 70% of pref valueOfAdventure.",
    valid: (value) => /\d+/.test(value),
    default: defaultAdvValue,
  };

  const greyPullValue: GreySetting = {
    name: "greyValueOfPull",
    description:
      "Used to determine the value of a pull from storage, generally can be ignored.",
    valid: (value) => /\d+/.test(value),
    default: 0,
  };

  const greySavePulls: GreySetting = {
    name: "greyPullsLimit",
    description:
      "How many pulls the script can use, if this is too low then you're going to have a bad time. 20 means the script can use up to 20 pulls, leaving 0 remaining.",
    valid: (value) => /\d+/.test(value),
    default: 20,
  };

  const greyVoteMonster: GreySetting = {
    name: "greyVotingBooth",
    description:
      "If you own the voting booth, by default will not vote as aftercore voting can be better",
    valid: (value) => value == "true" || value == "false",
    default: false,
  };

  const greySwitchWorkshed: GreySetting = {
    name: "greySwitchWorkshed",
    description:
      "Applicable only for CMC, if set to the name of a workshed item, will switch to that workshed after all 5 CMC uses are expended. Requires the item to be in inventory",
    valid: (value) => {
      return value == "" || toItem(value).usable;
    },
    default: "",
  };

  const greyValueOfNC: GreySetting = {
    name: "greyValueOfNonCombat",
    description:
      "Really only applicable for people that do garbo's Yachtzee, set this to an absurd value to never use it",
    valid: (value) => /\d+/.test(value),
    default: 0,
  };

  const greyClipArt: GreySetting = {
    name: "greyClipArt",
    description:
      "A comma seperated list of familiar names you'd like us to use Tome of Clip Art on if we have the iotm",
    valid: (value) => {
      return (
        value
          .split(",")
          .find(
            (s) =>
              s.length != 0 &&
              Familiar.all().find(
                (f) => f.toString().toLowerCase() == s.toLowerCase()
              ) == null
          ) == null
      );
    },
    default: "Grey Goose",
  };

  const greyVIPClan: GreySetting = {
    name: "greyVIPClan",
    description:
      "The name of the clan we will use to execute Fax Requests, and switch to for other VIP functions if they are not available in our current clan. Set to empty to disable all VIP usage, even the yellow rockets..",
    valid: (value) =>
      [...getAvailableClans().values()].find(
        (s) => s.toLowerCase() == value.toLowerCase()
      ) != null,
    default: "Bonus Adventures From Hell",
  };

  const greyFortuneTeller: GreySetting = {
    name: "greyFortuneTeller",
    description:
      "If the script should use fortune teller if possible. Will grab: Prank Item, then Potion, then Psychic Equipment",
    valid: (value) => value == "true" || value == "false",
    default: true,
  };

  const greyGrabZapWand: GreySetting = {
    name: "greyGrabZapWand",
    description:
      "Should the script grab the zap wand? This generally adds another 5-6 turns to the run",
    valid: (value) => value == "true" || value == "false",
    default: false,
  };

  return [
    //greyBountyHunter,
    towerBreak,
    moonTune,
    manorLights,
    pvpEnable,
    dailyDungeon,
    dailyMalware,
    levelingResources,
    skipPalindome,
    greySavePulls,
    grayAdventureValue,
    useMummery,
    greyPullValue,
    greyVoteMonster,
    greySwitchWorkshed,
    greyClipArt,
    greyValueOfNC,
    greyVIPClan,
    deleteKmails,
    greyFortuneTeller,
    greyGrabZapWand,
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

export function getMoonZone(sign: MoonSign = mySign() as MoonSign): MoonZone {
  const index = moonSigns.findIndex(
    (s) => s.toLowerCase() == sign?.toLowerCase()
  );

  if (index < 0) {
    return null;
  } else if (index <= 2) {
    return "Knoll";
  } else if (index <= 5) {
    return "Canadia";
  }

  return "Gnomad";
}

const spoon: Item = Item.get("hewn moon-rune spoon");

export class GreySettings {
  static hardcoreMode: boolean = false;
  static speedRunMode: boolean = false;
  static adventuresBeforeAbort: number = 8;
  static adventuresGenerateIfPossibleOrAbort = 12;
  static usefulSkillsWeight: number = 6;
  static handySkillsWeight: number = 0.5;
  static greyBreakAtTower: boolean;
  static greyReachedTower: boolean = toBoolean(
    getProperty("_greyReachedTower")
  );
  static greyDailyDungeon: boolean;
  static greyDailyMalware: "true" | "false" | null;
  static greyPrepareLevelingResources: boolean;
  static greyFantasyBandits: boolean;
  static greyTuneMoonSpoon?: MoonSign;
  static greyDebug: boolean = toBoolean(getProperty("greyDebug") || "false");
  static greySkipPalindome: boolean;
  static greyPullsLimit: number = 20;
  static greyValueOfAdventure: number;
  static greyUseMummery: boolean;
  static greyVotingBooth: boolean;
  static greyBountyHunting: boolean;
  static greySwitchWorkshed: string;
  static greyClipArt: string;
  static greyVIPClan: string;
  static greyFortuneTeller: boolean;
  static greyDeleteKmails: boolean;
  static greyHippyMode: boolean = false;
  static greyGrabZapWand: boolean;

  static isHardcoreMode(): boolean {
    return this.hardcoreMode || inHardcore();
  }

  static willBeAccessible(
    moonzone: MoonZone,
    assumeUnstarted: boolean = false
  ): boolean {
    return (
      (assumeUnstarted || getProperty("moonTuned") != "true") &&
      availableAmount(spoon) > 0 &&
      this.greyTuneMoonSpoon != null &&
      getMoonZone(this.greyTuneMoonSpoon) == moonzone
    );
  }

  static canMoonSpoon() {
    return (
      getProperty("moonTuned") == "false" &&
      availableAmount(spoon) > 0 &&
      this.greyTuneMoonSpoon != null &&
      this.greyTuneMoonSpoon.toLowerCase() != mySign().toLowerCase()
    );
  }

  /**
   * If we aim to collect a hippy outfit
   */
  static isHippyMode(): boolean {
    return this.greyHippyMode || this.isHardcoreMode();
  }

  static shouldAvoidTowerRequirements(): boolean {
    return !GreySettings.isHardcoreMode() && this.greyBreakAtTower;
  }

  static loadSettings() {
    for (const setting of getGreySettings()) {
      let prop: unknown = getProperty(setting.name);

      if (prop == "") {
        prop = setting.default;
      } else if (typeof setting.default == "boolean") {
        prop = toBoolean(prop as string);
      } else if (typeof setting.default == "number") {
        prop = toInt(prop as string);
      }

      GreySettings[setting.name] = prop;
    }
  }
}
