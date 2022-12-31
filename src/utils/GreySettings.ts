import {
  availableAmount,
  Familiar,
  getClanName,
  getProperty,
  inHardcore,
  Item,
  mySign,
  propertyExists,
  setProperty,
  toBoolean,
  toInt,
} from "kolmafia";
import { getAvailableClans } from "./GreyClan";
import { Workshed, Worksheds } from "./GreyUtils";

export type GreySettingType = "main" | "values";

export type GreySetting = {
  setting?: GreySettingType;
  name: string;
  description: string;
  valid: (value: string) => boolean;
  viableSettings?: [string, string][] | string[];
  default: unknown;
  viable?: boolean;
};

export type SettingTriBoolean = "Best Judgement" | "Always" | "Never";

export function getGreySettings(): GreySetting[] {
  const isBoolean = (str: string) => str == "true" || str == "false";
  const triBoolean: SettingTriBoolean[] = ["Best Judgement", "Always", "Never"];
  const isTriBoolean = (str: string) =>
    triBoolean.includes(str as SettingTriBoolean);

  const towerBreak: GreySetting = {
    name: "greyBreakAtTower",
    description:
      "Should the script halt when it reaches the tower? False by default. Useful as continuing after breaking ronin takes less turns. This will change the behavior of the script to skip some zones.",
    valid: isBoolean,
    default: true,
  };

  const moonTune: GreySetting = {
    name: "greyTuneMoonSpoon",
    description:
      "If set, will use the rune moon spoon (if owned) to change moon signs to the requested moon sign when done with tasks in the current moon sign.",
    valid: (value) =>
      moonSigns.find((s) => s.toLowerCase() == value.toLowerCase()) != null,
    viableSettings: [
      ["Don't Tune", ""],
      ...(moonSigns.map((sign) => [getMoonZone(sign) + " - " + sign, sign]) as [
        string,
        string
      ][]),
    ],
    default: null,
  };

  const manorLights: GreySetting = {
    name: "greyFinishManorLights",
    description:
      "The script will do the hidden manor lights quest, but should it fight Elizabeth & Stephen at the end? (Garbo does fight Stephen for meat)",
    valid: isBoolean,
    default: false,
  };

  const pvpEnable: GreySetting = {
    name: "greyEnablePvP",
    description:
      "Should the script enable PvP at the start of the run? This doesn't actually make much difference vs enabling it later as there's no pvp generation, unless you have robortender.",
    valid: isBoolean,
    default: false,
  };

  for (const str of ["greyDailyMalware"]) {
    if (!propertyExists(str)) {
      continue;
    }

    const val = getProperty(str);

    if (triBoolean.includes(val as SettingTriBoolean)) {
      continue;
    }

    if (val == "true") {
      setProperty(str, "Always");
    } else if (val == "false") {
      setProperty(str, "Never");
    } else {
      setProperty(str, "Best Judgement");
    }
  }

  const dailyMalware: GreySetting = {
    name: "greyDailyMalware",
    description:
      "If we do daily dungeon, how should we treat daily malware? Set to 'Always' 'Never' or 'Best Judgement'",
    valid: isTriBoolean,
    viableSettings: triBoolean,
    default: "Best Judgement",
  };

  const dailyDungeon: GreySetting = {
    name: "greyDailyDungeon",
    description:
      "Should the script always do daily dungeon, even when there is no need to? Eg, tower break. Useful in conjunction with greyDailyMalware",
    valid: isBoolean,
    default: true,
  };

  const levelingResources: GreySetting = {
    name: "greyPrepareLevelingResources",
    description:
      "If this is set to true, script will attempt to prepare resources that are useful for power leveling. Namely familiar scrapbook and raise goose weight.",
    valid: isBoolean,
    default: true,
  };

  const skipPalindome: GreySetting = {
    name: "greySkipPalindome",
    description:
      "If set to true, will not complete palindome. This is only useful if you intend to burn turns on UR farming, and you're recommended to save at least 80 turns minumum to resume the script. To resume, this will need to be set to false.",
    valid: isBoolean,
    default: false,
  };

  const doHellQuest: GreySetting = {
    name: "greyAzazelSteelMargarita",
    description:
      "If set to true, will complete the requirements for the Steel Margarita +5 Liver drink. There is different scenarios for this, but this is best used with towerbreaking and ronin escaping. It will attempt to use the no-trades previously acquired.",
    valid: isBoolean,
    default: false,
  };

  const deleteKmails: GreySetting = {
    name: "greyDeleteKmails",
    description:
      "When true, will delete kmails from spooky lady and fortune teller",
    valid: isBoolean,
    default: true,
  };

  const useMummery: GreySetting = {
    name: "greyUseMummery",
    description:
      "If set to true, will set grey goose to use MP restoring. This is enabled by default as there isn't really a reason not to.",
    valid: isBoolean,
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
    valid: isBoolean,
    default: false,
  };

  const greyDefaultWorkshed: GreySetting = {
    name: "greyDefaultWorkshed",
    description:
      "What should Greyday set your empty workshed to at the start of the day?",
    valid: (value) =>
      value == "" ||
      Worksheds.find((s) => s.toLowerCase() == value.toLowerCase()) != null,
    viableSettings: [
      ...(Worksheds.map((w) => [w == "" ? "Don't Set" : w, w]) as [
        string,
        string
      ][]),
    ],
    default: "",
  };
  const greySwitchWorkshed: GreySetting = {
    name: "greySwitchWorkshed",
    description:
      "Applicable only if you're starting your run with Cold Medicine Cabinet, if set to the name of a workshed item, will switch to that workshed after all 5 CMC uses are expended. Requires the item to be in inventory",
    valid: (value) =>
      value == "" ||
      Worksheds.find((s) => s.toLowerCase() == value.toLowerCase()) != null,
    viableSettings: [
      ...(Worksheds.map((w) => [w == "" ? "Don't Switch" : w, w]) as [
        string,
        string
      ][]),
    ],
    default: "",
  };

  const greyClipArt: GreySetting = {
    name: "greyClipArt",
    description:
      "A comma seperated list of familiar names you'd like Greyday to summon and use Familiar Jacks on if you have Tome of Clip Art",
    valid: (value) => {
      for (const s of value.split(",").map((s) => s.trim())) {
        if (s.length == 0) {
          continue;
        }

        const fam = Familiar.all().find(
          (f) => f.toString().toLowerCase() == s.toLowerCase()
        );

        if (fam != null) {
          continue;
        }

        return false;
      }

      return true;
    },
    default: "Grey Goose",
  };

  const greyCosplaySaber: GreySetting = {
    name: "greyCosplaySaber",
    description:
      "What upgrade should GreyDay place on the Cosplay Saber if you own it?",
    valid: (value) => value.length == 0 || /^\d+$/.test(value),
    default: "resistance",
    viableSettings: [
      ["Don't Modify", ""],
      ["15-20 MP Regen", "mp"],
      ["+20 Monster Level", "ml"],
      ["+3 elemental resistance", "resistance"],
      ["+10 Familiar Weight", "familiar"],
    ],
  };

  const viableClans: [string, string][] = [
    ["Don't use VIP Invitation", ""],
    ...[...getAvailableClans().values()].map((s) => [s, s] as [string, string]),
  ];

  const greyVIPClan: GreySetting = {
    name: "greyVIPClan",
    description:
      "The name of the clan we will use to execute Fax Requests, and switch to for other VIP functions if they are not available in our current clan. Set to empty (Or in relay, 'Don't use VIP Invitation') to disable all VIP usage, even the yellow rockets.. Best support for 'Bonus Adventures From Hell' and 'The Average Clan'",
    valid: (value) =>
      value.length == 0 ||
      getClanName().toLowerCase() == value.toLowerCase() ||
      [...getAvailableClans().values()].find(
        (s) => s.toLowerCase() == value.toLowerCase()
      ) != null,
    default: "Bonus Adventures From Hell",
    viableSettings: viableClans,
  };

  const greyFortuneTeller: GreySetting = {
    name: "greyFortuneTeller",
    description:
      "If the script should use fortune teller if possible. Will grab: Prank Item, then Potion, then Psychic Equipment",
    valid: isBoolean,
    default: true,
  };

  const greyGrabZapWand: GreySetting = {
    name: "greyGrabZapWand",
    description:
      "Should the script grab the zap wand? This generally adds another 5-6 turns to the run. You'll need this if you don't have enough key sources",
    valid: isBoolean,
    default: false,
  };

  const greyCookbat: GreySetting = {
    name: "greyCookbatRecipe",
    description:
      "Should the script try to use the cookbat to drop a recipe when no familiar is needed? This detects a recipe in inventory to know if one dropped, removing it will make it think none dropped",
    valid: isBoolean,
    default: true,
  };

  const prioritizeLocket: GreySetting = {
    name: "greyLocketWeight",
    description:
      "Set this to a value higher than 0 to add weight to maximizer if you want Greyday to wear the locket more often, this is only useful if you're trying to locket everything",
    valid: (s) => /$\d+^/.test(s),
    default: 0,
  };

  const grabMeatSkill: GreySetting = {
    name: "greyMeatSkill",
    description:
      "Should GreyDay grab Financial Spreadsheets? +40% meat from monsters, doesn't effect the run itself. ",
    valid: (s) =>
      ["Yes", "No", "Convenient"].find(
        (a) => a.toLowerCase() == s.toLowerCase()
      ) != null,
    viableSettings: [
      ["Yes", "Yes"],
      ["No", "No"],
      ["Only if Convenient", "Convenient"],
    ],
    default: "Yes",
  };

  return [
    //greyBountyHunter,
    towerBreak,
    manorLights,
    pvpEnable,
    dailyDungeon,
    levelingResources,
    deleteKmails,
    greyFortuneTeller,
    greyGrabZapWand,
    skipPalindome,
    useMummery,
    greyCookbat,
    greyVIPClan,
    moonTune,
    dailyMalware,
    grabMeatSkill,
    greySavePulls,
    grayAdventureValue,
    greyDefaultWorkshed,
    greySwitchWorkshed,
    greyCosplaySaber,
    greyClipArt,
    prioritizeLocket,
  ].map((s) => {
    s.setting = "main";

    return s;
  });
}

export const moonSigns: MoonSign[] = [
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
  static greyDailyMalware: SettingTriBoolean;
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
  static greyDefaultWorkshed: Workshed;
  static greySwitchWorkshed: Workshed;
  static greyClipArt: string;
  static greyVIPClan: string;
  static greyFortuneTeller: boolean;
  static greyDeleteKmails: boolean;
  static greyHippyMode: boolean = false;
  static greyGrabZapWand: boolean;
  static greyCookbatRecipe: boolean;
  static greyLocketWeight: number;
  static greyCosplaySaber: string;
  static greyMeatSkill: "Yes" | "No" | "Convenient";

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

    if (this.isHardcoreMode()) {
      GreySettings.greyBreakAtTower = false;
    }
  }
}
