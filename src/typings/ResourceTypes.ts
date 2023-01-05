import {
  availableAmount,
  cliExecute,
  closetAmount,
  currentRound,
  Effect,
  Familiar,
  getCampground,
  getProperty,
  haveEffect,
  haveFamiliar,
  haveSkill,
  heist,
  Item,
  itemAmount,
  modifierEval,
  Monster,
  mpCost,
  myMeat,
  myMp,
  print,
  propertyExists,
  pullsRemaining,
  setProperty,
  Skill,
  storageAmount,
  toBoolean,
  toInt,
  toMonster,
  turnsPlayed,
  urlEncode,
  visitUrl,
} from "kolmafia";
import {
  canUseFaxMachine,
  canUseFireworks,
  getFax,
  isVIPDisabled,
} from "../utils/GreyClan";
import { GreyOutfit } from "../utils/GreyOutfitter";
import { GreySetting, GreySettings } from "../utils/GreySettings";
import { Macro } from "../utils/MacroBuilder";
import { PropertyManager } from "../utils/Properties";

// We should use the category only to determine if a quest is asking for a resource type, but doesn't tell us if it supports a certain resource or not. Aka not implemented.
export enum ResourceCategory {
  COPIER,
  OLFACT_COPIER,
  FAXER,
  CARGO_SHORTS,
  BANISHER,
  YELLOW_RAY,
  PULL,
  ZAP,
  CLOVER,
  POLAR_VORTEX,
  HUGS_AND_KISSES,
  FIRE_EXTINGUSHER_ZONE,
  GLOVE_REPLACE,
  DECK_OF_EVERY_CARD,
  DECK_OF_EVERY_CARD_CHEAT,
  CAT_HEIST,
  HOT_TUB,
  FORCE_NC,
  FORCE_FIGHT,
  PILL_KEEPER,
  WANDERERS,
}

export const ResourceIds = [
  "Backup Camera",
  "Cosplay Saber",
  "Bowling Ball",
  "Asdon",
  "Combat Locket",
  "Fax Machine",
  "Wish",
  "Cargo Shorts",
  "Powerful Glove",
  "Fire Extingusher",
  "Yellow Ray",
  "Pull",
  "Clover",
  "Deck of Every Card",
  "Zap Wand",
  "Cat Burglar Heist",
  "Hot Tub",
  "Chateau Painting",
  "Parka: Force NC",
  "Pillkeeper",
  "Portscan",
  "Hugs and Kisses",
  "Autumn-aton",
  "Digitize",
  "Romantic Arrow",
] as const;

export enum PillkeeperPill {
  YELLOW_RAY = "explode",
  DOUBLE_POTION = "extend",
  FORCE_NC = "noncombat",
  ALL_RES = "element",
  DOUBLE_STATS = "stat",
  FAM_WEIGHT = "familiar",
  LUCKY = "lucky",
  RANDOM_ADVENTURE = "random",
}

export type ResourceId = typeof ResourceIds[number];

export interface SomeResource {
  type: ResourceCategory;
  resource: ResourceId;
  name?: string;
  available?: () => boolean; // Some iotms might not be available, like parka and torso
  freeTurn?: boolean; // If this saves a turn compared to the alternatives
  resourcesUsed?: number;
  worthInAftercore: number; // If used by garbo, how much profit would we miss out
  prepare: (outfit: GreyOutfit, props?: PropertyManager) => void;
  familiar?: Familiar;
  fax?: (monster: Monster) => void;
  pocket?: (pocket: number) => void;
  macro?: () => Macro;
  doHeist?: (item: Item) => void;
  pickCard?: (card: string) => void;
  ready?: () => boolean;
  pillkeeper?: (pill: PillkeeperPill) => void;
  attemptPrime?: () => boolean; // This should be executed inside a fight
  primed?: () => boolean; // If this resource has been primed and is ready to go
  unprime?: () => void; // Must be called after a resource has been used
}

type ResourceValue = {
  name: string;
  description: string;
  dynamic?: boolean;
};

export function getResourceSettings(): GreySetting[] {
  return getResourceValues().map((res) => {
    const def = ResourceValues[res.name];

    const setting: GreySetting = {
      setting: "values",
      name: "greyValue_" + res.name,
      description: res.description + " (Default " + def + ")",
      valid: (s) => /^-?\d+$/.test(s),
      default: def,
    };

    return setting;
  });
}

export function getResourceValues(): ResourceValue[] {
  const embezzler: ResourceValue = {
    name: "Embezzler",
    description:
      "How much meat you expect to gain from embezzlers in garbo (This is basically how much a copier is worth using garbo)",
  };

  const cloverValue: ResourceValue = {
    name: "Clover",
    description: "How much meat you could sell an 11-leaf clover for",
  };

  const parkaNC: ResourceValue = {
    name: "ParkaNC",
    description: "How much meat each forced non-combat using Parka is worth",
  };

  const forcedDrop: ResourceValue = {
    name: "ForcedDrop",
    description: "How much meat you could earn from each forced drop",
  };

  const pillkeeper: ResourceValue = {
    name: "Pillkeeper",
    description: "How much meat you'd earn from the free pillkeeper use",
  };

  const pull: ResourceValue = {
    name: "Pull",
    description: "How much each pull is worth to the player in meat",
  };

  const cosplay: ResourceValue = {
    name: "CosplaySaber",
    description:
      "How much meat each cosplay saber use is worth, normally calculated by pills remaining. Set to 0 to let Greyday calculate this.",
    dynamic: true,
  };

  const shorts: ResourceValue = {
    name: "CargoShorts",
    description: "How much meat an item from Cargo Shorts is worth",
  };

  const deckOfCards: ResourceValue = {
    name: "DeckOfCards",
    description:
      "With 15 uses, a cheat using 5, how much each use is worth in meat",
  };

  const zap: ResourceValue = {
    name: "ZapWand",
    description: "How much each zap is worth in meat",
  };

  const burglar: ResourceValue = {
    name: "CatBurglarHeist",
    description: "How much a cat burglar heist is worth in meat",
  };

  const chateauPainting: ResourceValue = {
    name: "ChateauPainting",
    description:
      "How much Chateau Painting is worth in meat, not sure why this is an option given it'll only consider the painting if it's a fax it wants",
  };

  const hotTub: ResourceValue = {
    name: "HotTub",
    description: "How much each hot tub usage is worth to you",
  };

  return [
    embezzler,
    cloverValue,
    parkaNC,
    pillkeeper,
    forcedDrop,
    pull,
    cosplay,
    shorts,
    deckOfCards,
    zap,
    burglar,
    chateauPainting,
    hotTub,
  ];
}

class ResourceValues {
  static EmbezzlerValue = 19000;
  static CloverValue = 22000;
  static ForcedDropValue = 4000;
  static PillkeeperValue = 70000;
  static ParkaNCValue = 0;
  static PullValue = 0;
  // If we have more than 60 pills, the saber is free. Otherwise it's worth 3k meat when its alien free day
  // Garbo has some use of it, but if you have an oflaction like its basically worth grimace pill/2 free fights
  static CosplaySaberValue = 0;
  static CargoShortsValue = 30000;
  static DeckOfCardsValue = 2000;
  static ZapWandValue = 15000;
  static CatBurglarHeistValue = -500;
  static ChateauPaintingValue = 5000;
  static HotTubValue = 0;

  static {
    if (
      ["Distention Pill", "Dog Hair Pill"]
        .map((s) => Item.get(s))
        .map((i) => itemAmount(i) + closetAmount(i) + storageAmount(i))
        .reduce((p1, p2) => Math.min(p1, p2)) > 60
    ) {
      this.CosplaySaberValue = -100;
    } else if (modifierEval("G") >= 4) {
      this.CosplaySaberValue = 3000;
    } else {
      this.CosplaySaberValue = 0;
    }

    for (const setting of getResourceValues()) {
      if (ResourceValues[setting.name + "Value"] == null) {
        print("Can't find resource value " + setting.name, "red");
        continue;
      }

      ResourceValues[setting.name] = ResourceValues[setting.name + "Value"];

      const prop = "greyValue_" + setting.name;

      if (!propertyExists(prop)) {
        continue;
      }

      const val = getProperty(prop);

      if (!/^\d+$/.test(val)) {
        continue;
      }

      if (val == "0" && setting.name == "CosplaySaber") {
        continue;
      }

      ResourceValues[setting.name + "Value"] = toInt(val);
    }
  }
}

const glove = Item.get("Powerful Glove");

const gloveReplace: SomeResource = {
  type: ResourceCategory.GLOVE_REPLACE,
  resource: "Powerful Glove",
  name: "Powerful Glove: Replace",
  worthInAftercore: ResourceValues.EmbezzlerValue,
  resourcesUsed: 10,
  prepare: (outfit: GreyOutfit) =>
    outfit != null ? outfit.addWeight(glove) : null,
  macro: () => Macro.skill(Skill.get("CHEAT CODE: Replace Enemy")),
};

const clover: SomeResource = {
  type: ResourceCategory.CLOVER,
  resource: "Clover",
  worthInAftercore: ResourceValues.CloverValue, // How much we could sell a clover for
  prepare: () => {},
};

const xoFam = Familiar.get("XO Skeleton");

const hugsAndKisses: SomeResource = {
  type: ResourceCategory.HUGS_AND_KISSES,
  resource: "Hugs and Kisses",
  worthInAftercore: ResourceValues.ForcedDropValue,
  familiar: xoFam,
  prepare: () => null,
  macro: () => {
    const skill = Skill.get("Hugs and Kisses!");
    return Macro.while_(
      `!pastround 15 && hasskill ${toInt(
        skill
      )} && !match While your foe shudders from having a bunch of their life drained away`,
      Macro.skill(skill)
    );
  },
};

const extingusher: Item = Item.get("industrial fire extinguisher");

const extingusherPolar: SomeResource = {
  type: ResourceCategory.POLAR_VORTEX,
  resource: "Fire Extingusher",
  name: "Fire Extingusher: Polar Vortex",
  resourcesUsed: 10,
  worthInAftercore: ResourceValues.ForcedDropValue, // Tattered paper cost and assume free run
  prepare: (outfit: GreyOutfit) =>
    outfit != null ? outfit.addWeight(extingusher) : null,
  macro: () => Macro.skill(Skill.get("Fire Extinguisher: Polar Vortex")),
};

const extingusherZoneSpecific: SomeResource = {
  type: ResourceCategory.FIRE_EXTINGUSHER_ZONE,
  resource: "Fire Extingusher",
  name: "Fire Extingusher: Spray Down Zone",
  resourcesUsed: 20,
  worthInAftercore: ResourceValues.ForcedDropValue * 2, // Tattered paper cost x 2
  prepare: (outfit: GreyOutfit) =>
    outfit != null
      ? outfit.addWeight(extingusher).addExtra("-equip smoke ball")
      : null,
  macro: () => Macro.skill(Skill.get("Fire Extinguisher: Zone Specific")),
};

const pull: SomeResource = {
  type: ResourceCategory.PULL,
  resource: "Pull",
  worthInAftercore: ResourceValues.PullValue, // This doesn't cost us anything to use
  prepare: () => {},
};

const pillkeeper: Item = Item.get("Eight Days a Week Pill Keeper");

const pillkeeperNC: SomeResource = {
  type: ResourceCategory.FORCE_NC,
  resource: "Pillkeeper",
  worthInAftercore: ResourceValues.PillkeeperValue, // Lets just value it at a frost flower?
  prepare: (outfit: GreyOutfit, props: PropertyManager) => {
    if (props != null) {
      cliExecute("pillkeeper " + PillkeeperPill.FORCE_NC);
    }
  },
  ready: () => true,
};

const sourceTerminal = getCampground()["Source terminal"] > 0;
const portscanProp = "_portscanPrimed";

const portscan: SomeResource = {
  type: ResourceCategory.FORCE_FIGHT,
  resource: "Portscan",
  worthInAftercore: 0,
  prepare: (outfit: GreyOutfit) => {
    if (
      outfit != null ||
      (
        getProperty("sourceTerminalEducate1") +
        getProperty("sourceTerminalEducate2")
      ).includes("portscan.edu")
    ) {
      return;
    }

    cliExecute("terminal educate portscan.edu");
    visitUrl("main.php");
  },
  primed: () => toBoolean(getProperty(portscanProp) || "false"),
  unprime: () => setProperty(portscanProp, "false"),
  attemptPrime: () => {
    if (currentRound() == 0) {
      return false;
    }

    const skill = Skill.get("Portscan");

    if (!haveSkill(skill) || myMp() < mpCost(skill)) {
      return false;
    }

    const prop = "_sourceTerminalPortscanUses";
    const scans = toInt(getProperty(prop));

    Macro.skill(skill).submit();

    if (scans != toInt(getProperty(prop))) {
      setProperty(portscanProp, "true");
      return true;
    }

    print("Failed to portscan for some reason..");
    return false;
  },
};

const parka: Item = Item.get("Jurassic Parka");
const torso: Skill = Skill.get("Torso Awareness");
const parkaProp: string = "_parkaPrimed";

const ncParka: SomeResource = {
  type: ResourceCategory.FORCE_NC,
  resource: "Parka: Force NC",
  worthInAftercore: ResourceValues.ParkaNCValue,
  //available: () => haveSkill(torso) && availableAmount(parka) > 0,
  prepare: (outfit: GreyOutfit) => {
    if (outfit != null) {
      outfit.addWeight(parka);
    } else {
      cliExecute("parka spikolodon");
    }
  },
  primed: () => toBoolean(getProperty(parkaProp) || "false"),
  unprime: () => setProperty(parkaProp, "false"),
  attemptPrime: () => {
    if (currentRound() == 0) {
      return false;
    }

    const skill = Skill.get("Launch spikolodon spikes");

    if (!haveSkill(skill) || myMp() < mpCost(skill)) {
      return false;
    }

    const prop = "_spikolodonSpikeUses";
    const spikes = toInt(getProperty(prop));

    Macro.skill(skill).submit();

    if (spikes != toInt(getProperty(prop))) {
      setProperty(parkaProp, "true");
      return true;
    }

    print("Failed to launch spikolodon spikes for some reason..", "red");
    return false;
  },
};

const digitizer: SomeResource = {
  type: ResourceCategory.WANDERERS,
  resource: "Digitize",
  name: "Source Terminal: Digitize",
  worthInAftercore: ResourceValues.EmbezzlerValue * 3,
  prepare: (outfit) => {
    if (outfit == null) {
      return;
    }

    if (
      (
        getProperty("sourceTerminalEducate1") +
        getProperty("sourceTerminalEducate2")
      ).includes("digitize.edu")
    ) {
      return;
    }

    cliExecute("terminal educate digitize.edu");
    visitUrl("main.php");
  },
  macro: () => Macro.skill("Digitize"),
};

const renimatedReanimator = Familiar.get("Reanimated Reanimator");
const obtuseAngel = Familiar.get("Obtuse Angel");

const reanimatedWanderer: SomeResource = {
  type: ResourceCategory.WANDERERS,
  resource: "Romantic Arrow",
  name: "Reanimated Reanimator: Wanderer Copier",
  worthInAftercore: ResourceValues.EmbezzlerValue * 3,
  familiar: renimatedReanimator,
  prepare: () => null,
  macro: () => Macro.skill(Skill.get("Wink At")),
  available: () => haveFamiliar(renimatedReanimator),
};

const obtuseAngelWanderer: SomeResource = {
  type: ResourceCategory.WANDERERS,
  resource: "Romantic Arrow",
  name: "Obtuse Angel: Wanderer Copier",
  worthInAftercore: ResourceValues.EmbezzlerValue * 3,
  familiar: obtuseAngel,
  prepare: () => null,
  macro: () => Macro.skill(Skill.get("Fire a badly romantic arrow")),
  available: () =>
    !haveFamiliar(renimatedReanimator) && haveFamiliar(obtuseAngel),
};

const yellowParka: SomeResource = {
  type: ResourceCategory.YELLOW_RAY,
  resource: "Yellow Ray",
  name: "Parka: Yellow Ray",
  available: () => availableAmount(parka) > 0 && haveSkill(torso),
  freeTurn: true,
  resourcesUsed: 100,
  worthInAftercore: 0,
  prepare: (outfit: GreyOutfit, props: PropertyManager) => {
    if (outfit != null) {
      outfit.addWeight(parka);
    }

    if (props != null) {
      cliExecute("parka dilophosaur");
    }
  },
  macro: () => {
    return Macro.skill(Skill.get("Spit jurassic acid"));
  },
  ready: () => haveEffect(Effect.get("Everything Looks Yellow")) == 0,
};

const rocket: Item = Item.get("Yellow Rocket");

const yellowRocket: SomeResource = {
  type: ResourceCategory.YELLOW_RAY,
  resource: "Yellow Ray",
  name: "Yellow Rocket",
  worthInAftercore: 250, // Cost of a yellow rocket
  resourcesUsed: 75,
  available: () => canUseFireworks(),
  prepare: () => {
    if (itemAmount(rocket) == 0) {
      cliExecute("acquire yellow rocket");
    }

    if (itemAmount(rocket) == 0) {
      throw "Unable to acquire a yellow rocket";
    }
  },
  macro: () => Macro.item(Item.get("Yellow Rocket")),
  ready: () =>
    myMeat() > 300 && haveEffect(Effect.get("Everything Looks Yellow")) == 0,
};

const retrocape: Item = Item.get("unwrapped knock-off retro superhero cape");

const retroRay: SomeResource = {
  type: ResourceCategory.YELLOW_RAY,
  resource: "Yellow Ray",
  name: "Retrocape: Yellow Ray",
  worthInAftercore: 0,
  available: () => availableAmount(retrocape) > 0,
  resourcesUsed: 100,
  prepare: (outfit: GreyOutfit, props: PropertyManager) => {
    if (outfit != null) {
      outfit.addWeight(retrocape);
    }

    if (props != null) {
      cliExecute("retrocape heck kiss");
    }
  },
  macro: () => Macro.skill(Skill.get("Unleash the Devil's Kiss")),
  ready: () => haveEffect(Effect.get("Everything Looks Yellow")) == 0,
};

const cosplaySaber: Item = Item.get("Fourth of May Cosplay Saber");

const cosplayYellowRay: SomeResource = {
  type: ResourceCategory.YELLOW_RAY,
  resource: "Cosplay Saber",
  name: "Cosplay Saber: YR",
  freeTurn: true,
  worthInAftercore: ResourceValues.CosplaySaberValue,
  prepare: (outfit: GreyOutfit, props: PropertyManager) => {
    if (outfit != null) {
      outfit.addWeight(cosplaySaber);
    }
    if (props != null) {
      props.setChoiceProperty(1387, 3);
    }
  },
  macro: () => Macro.skill(Skill.get("Use The Force")),
  ready: () => true,
};

const backupCamera: Item = Item.get("Backup Camera");

const backupCopier: SomeResource = {
  type: ResourceCategory.COPIER,
  resource: "Backup Camera",
  worthInAftercore: ResourceValues.EmbezzlerValue, // Embezzler
  prepare: (outfit: GreyOutfit) =>
    outfit != null ? outfit.addWeight(backupCamera) : null,
  macro: () => Macro.skill(Skill.get("Back-Up to your Last Enemy")),
};

const cosplayCopier: SomeResource = {
  type: ResourceCategory.OLFACT_COPIER,
  resource: "Cosplay Saber",
  name: "Cosplay Saber: Friends",
  worthInAftercore: ResourceValues.CosplaySaberValue,
  prepare: (outfit: GreyOutfit, props: PropertyManager) => {
    if (outfit != null) {
      outfit.addWeight(cosplaySaber);
    }
    if (props != null) {
      props.setChoiceProperty(1387, 2);
    }
  },
  macro: () => Macro.skill(Skill.get("Use The Force")),
};

const cargoShorts: SomeResource = {
  type: ResourceCategory.CARGO_SHORTS,
  resource: "Cargo Shorts",
  freeTurn: true,
  worthInAftercore: ResourceValues.CargoShortsValue, // Some sellable item
  prepare: () => {},
  pocket: (pocket: number) => {
    visitUrl("inventory.php?action=pocket");
    visitUrl("choice.php?whichchoice=1420&option=1&pocket=" + pocket + "&pwd=");
  },
};

const faxMachine: SomeResource = {
  type: ResourceCategory.FAXER,
  resource: "Fax Machine",
  worthInAftercore: ResourceValues.EmbezzlerValue, // Embezzler
  prepare: () => {},
  available: () => canUseFaxMachine(),
  fax: (monster: Monster) => {
    if (getProperty("_photocopyUsed") != "false") {
      throw "The fax was already used!";
    }

    getFax(monster);

    visitUrl("inv_use.php?which=3&whichitem=4873&pwd");
  },
};

const combatLocket: SomeResource = {
  type: ResourceCategory.FAXER,
  resource: "Combat Locket",
  worthInAftercore: ResourceValues.EmbezzlerValue, // Embezzler
  prepare: () => {},
  fax: (monster: Monster) => {
    visitUrl("inventory.php?reminisce=1", false);
    visitUrl("choice.php?pwd=&whichchoice=1463&option=1&mid=" + toInt(monster));
  },
};

const wish = Item.get("Pocket Wish");
const genieBottle = Item.get("Genie Bottle");

const wishFaxer: SomeResource = {
  type: ResourceCategory.FAXER,
  resource: "Wish",
  worthInAftercore: 50000, // Sell
  prepare: () => {},
  fax: (monster: Monster) => {
    if (
      availableAmount(genieBottle) > 0 &&
      toInt(getProperty("_genieWishesUsed")) < 3
    ) {
      visitUrl("inv_use.php?pwd=&which=99&whichitem=9529");
    } else if (availableAmount(wish) == 0) {
      throw "Not enough pocket wishes!";
    } else {
      visitUrl("inv_use.php?pwd=&which=99&whichitem=9537");
    }

    visitUrl("choice.php?forceoption=0");

    try {
      visitUrl(
        "choice.php?pwd=&option=1&whichchoice=1267&wish=" +
          urlEncode("to fight " + monster.name),
        true,
        true
      );
    } catch (e) {
      print(e);
    }

    visitUrl("choice.php");

    if (currentRound() == 0) {
      throw "Failed to wish in a monster";
    }
  },
};

const cosplayBanisher: SomeResource = {
  type: ResourceCategory.BANISHER,
  resource: "Cosplay Saber",
  name: "Cosplay Saber: Banish",
  worthInAftercore: ResourceValues.CosplaySaberValue, // Garbo has some use of it, but if you have an oflaction like its basically worth grimace pill/2 free fights
  prepare: (outfit: GreyOutfit, props: PropertyManager) => {
    if (outfit != null) {
      outfit.addWeight(cosplaySaber);
    }
    if (outfit != null) {
      props.setChoiceProperty(1387, 1);
    }
  },
  macro: () => Macro.skill(Skill.get("Use The Force")),
};

const bowlingBall: SomeResource = {
  type: ResourceCategory.BANISHER,
  resource: "Bowling Ball",
  worthInAftercore: 0, // This doesn't cost us anything to use
  prepare: () => {},
  macro: () => Macro.skill(Skill.get("Bowl a Curveball")),
};

const asdon: SomeResource = {
  type: ResourceCategory.BANISHER,
  resource: "Asdon",
  worthInAftercore: 900, // The rough price to fuel up the asdon
  prepare: () => {},
};

const deckOfEveryCard: SomeResource = {
  type: ResourceCategory.DECK_OF_EVERY_CARD,
  resource: "Deck of Every Card",
  worthInAftercore: ResourceValues.DeckOfCardsValue,
  prepare: () => {},
  pickCard: (card: string) => {
    if (card != null) {
      throw "You're not running a Pack of Cards Cheat, why provide a card name?";
    }

    cliExecute("play random");
  },
};

const deckOfEveryCardCheat: SomeResource = {
  type: ResourceCategory.DECK_OF_EVERY_CARD_CHEAT,
  resource: "Deck of Every Card",
  name: "Deck of Every Card: Cheat",
  worthInAftercore: ResourceValues.DeckOfCardsValue * 10, // Worth 20k, 20k and 10k (Blue mana x2, then misc)
  resourcesUsed: 5,
  prepare: () => {},
  pickCard: (card: string) => cliExecute(`cheat ${card}`),
};

const zappable: SomeResource = {
  type: ResourceCategory.ZAP,
  resource: "Zap Wand",
  worthInAftercore: ResourceValues.ZapWandValue,
  prepare: () => {},
};

const catHeist: SomeResource = {
  type: ResourceCategory.CAT_HEIST,
  resource: "Cat Burglar Heist",
  worthInAftercore: ResourceValues.CatBurglarHeistValue,
  prepare: () => {},
  doHeist: (item) => {
    if (
      toInt(getProperty("catBurglarBankHeists")) == 0 &&
      toInt(getProperty("_catBurglarCharge")) <
        10 * (toInt(getProperty("_catBurglarHeistsComplete")) + 1)
    ) {
      throw "Unable to heist, no heists available!";
    }

    const heistResult = heist(item);

    if (!heistResult) {
      throw "Failed to perform a cat burglar heist";
    }
  },
};

const chateauPainting: SomeResource = {
  type: ResourceCategory.FAXER,
  resource: "Chateau Painting",
  worthInAftercore: ResourceValues.ChateauPaintingValue,
  prepare: () => {},
  fax: (monster: Monster) => {
    if (toMonster(getProperty("chateauMonster")) != monster) {
      throw "Unexpected monster attempted to fax!";
    }
  },
};

const hottub: SomeResource = {
  type: ResourceCategory.HOT_TUB,
  resource: "Hot Tub",
  worthInAftercore: ResourceValues.HotTubValue,
  prepare: () => {},
};

const allResources = [
  gloveReplace,
  clover,
  extingusherPolar,
  extingusherZoneSpecific,
  pull,
  yellowRocket,
  yellowParka,
  portscan,
  ncParka,
  cosplayYellowRay,
  // pillkeeperNC,
  backupCopier,
  cosplayCopier,
  cargoShorts,
  faxMachine,
  combatLocket,
  wishFaxer,
  cosplayBanisher,
  bowlingBall,
  asdon,
  deckOfEveryCard,
  deckOfEveryCardCheat,
  zappable,
  catHeist,
  hottub,
  retroRay,
  chateauPainting,
  hugsAndKisses,
  digitizer,
  reanimatedWanderer,
  obtuseAngelWanderer,
]
  .map((r) => {
    r.name = r.name ?? r.resource;

    return r;
  })
  .sort((r1, r2) => r1.worthInAftercore - r2.worthInAftercore);

export function getResources(
  includingUnavailable: boolean = false
): SomeResource[] {
  if (includingUnavailable) {
    return allResources;
  }

  return allResources.filter((r) => r.available == null || r.available());
}

/**
 * If this resource is something that changes with turns used
 */
export function isTurnCounter(resource: ResourceId): boolean {
  return (
    resource == "Bowling Ball" ||
    resource == "Yellow Ray" ||
    resource == "Autumn-aton"
  );
}

export function getResourcesLeft(
  resourceType: ResourceId,
  assumeUnused: boolean = false
): number {
  switch (resourceType) {
    case "Asdon":
      return 0;
    case "Hugs and Kisses":
      if (!haveFamiliar(xoFam)) {
        return 0;
      }

      return 11 - (assumeUnused ? 0 : toInt(getProperty("_xoHugsUsed")));
    case "Yellow Ray":
      const played =
        turnsPlayed() + haveEffect(Effect.get("Everything Looks Yellow"));

      return 650 - (assumeUnused ? 0 : played);
    case "Pull":
      if (GreySettings.isHardcoreMode()) {
        return 0;
      }

      if (!assumeUnused && pullsRemaining() == -1) {
        return 1000;
      }

      // Clamp
      let pullsSetting = Math.max(0, Math.min(GreySettings.greyPullsLimit, 20));

      if (assumeUnused) {
        return pullsSetting;
      }

      const pullsUsed = getProperty("_greyPulls")
        .split(",")
        .filter((s) => s.length > 0).length;

      pullsSetting -= pullsUsed;

      return Math.max(0, Math.min(pullsSetting, pullsRemaining()));
    case "Backup Camera":
      return availableAmount(backupCamera) > 0
        ? 11 - (assumeUnused ? 0 : toInt(getProperty("_backUpUses")))
        : 0;
    case "Combat Locket":
      return availableAmount(Item.get("Combat Lover's Locket")) > 0
        ? 3 -
            (assumeUnused
              ? 0
              : getProperty("_locketMonstersFought")
                  .split(",")
                  .filter((s) => s.length > 0).length)
        : 0;
    case "Cargo Shorts":
      if (availableAmount(Item.get("Cargo Cultist Shorts")) == 0) {
        return 0;
      }

      if (!assumeUnused && toBoolean(getProperty("_cargoPocketEmptied"))) {
        return 0;
      }

      return 1;
    case "Powerful Glove":
      return availableAmount(glove) > 0
        ? 100 -
            (assumeUnused
              ? 0
              : toInt(getProperty("_powerfulGloveBatteryPowerUsed")))
        : 0;
    case "Fire Extingusher":
      return availableAmount(extingusher) > 0
        ? assumeUnused
          ? 100
          : toInt(getProperty("_fireExtinguisherCharge"))
        : 0;
    case "Clover":
      if (assumeUnused) {
        return 3;
      }

      const purchased = toInt(getProperty("_cloversPurchased"));

      // If we've purchased 2, then we have 1 left to purchase along with item amount
      return itemAmount(Item.get("11-leaf clover")) + (3 - purchased);
    case "Deck of Every Card":
      return availableAmount(Item.get("Deck of Every Card")) > 0
        ? 15 - (assumeUnused ? 0 : toInt(getProperty("_deckCardsDrawn")))
        : 0;
    case "Zap Wand":
      if (!GreySettings.greyGrabZapWand) {
        return 0;
      }

      const zaps = toInt(getProperty("_zapCount"));

      // Blew up
      if (!assumeUnused && zaps < 0) {
        return 0;
      }

      return Math.max(0, 2 - (assumeUnused ? 0 : zaps));
    case "Cosplay Saber":
      return availableAmount(cosplaySaber) > 0
        ? 5 - (assumeUnused ? 0 : toInt(getProperty("_saberForceUses")))
        : 0;
    case "Bowling Ball":
      return 0;
    case "Wish":
      const haveBottle: boolean = availableAmount(Item.get("Genie Bottle")) > 0;

      if (!haveBottle) {
        return 0;
      }

      if (assumeUnused) {
        return 3;
      }

      const fightsRemaining = 3 - toInt(getProperty("_genieFightsUsed"));
      const wishesAvailable = Math.max(
        itemAmount(wish),
        3 - toInt(getProperty("_genieWishesUsed"))
      );

      return Math.min(fightsRemaining, wishesAvailable);
    case "Fax Machine":
      if (!canUseFaxMachine()) {
        return 0;
      }

      return assumeUnused || getProperty("_photocopyUsed") == "false" ? 1 : 0;
    case "Cat Burglar Heist":
      return haveFamiliar(Familiar.get("Cat Burglar"))
        ? assumeUnused
          ? 1
          : 1 - toInt(getProperty("_catBurglarHeistsComplete"))
        : 0;
    case "Hot Tub":
      if (isVIPDisabled()) {
        return 0;
      }

      return 5 - (assumeUnused ? 0 : toInt(getProperty("_hotTubSoaks")));
    case "Chateau Painting":
      if (!toBoolean(getProperty("chateauAvailable"))) {
        return 0;
      }

      return assumeUnused || !toBoolean(getProperty("_chateauMonsterFought"))
        ? 1
        : 0;
    case "Parka: Force NC":
      if (!haveSkill(torso) || availableAmount(parka) == 0) {
        return 0;
      }

      if (assumeUnused) {
        return 5;
      }

      let spikesRemaining = 5 - toInt(getProperty("_spikolodonSpikeUses"));

      // Don't count a primed resource as used yet!
      if (toBoolean(getProperty(parkaProp))) {
        spikesRemaining++;
      }

      return spikesRemaining;
    case "Pillkeeper":
      if (availableAmount(pillkeeper) == 0) {
        return 0;
      }

      return assumeUnused || !toBoolean(getProperty("_freePillKeeperUsed"))
        ? 1
        : 0;
    case "Portscan":
      if (
        !sourceTerminal ||
        !getProperty("sourceTerminalEducateKnown").includes("portscan.edu")
      ) {
        return 0;
      }

      if (assumeUnused) {
        return 3;
      }

      let scansRemaining =
        3 - toInt(getProperty("_sourceTerminalPortscanUses"));

      // If resource is primed, don't count this resource as done yet!
      if (toBoolean(getProperty(portscanProp))) {
        scansRemaining++;
      }

      return scansRemaining;
    case "Autumn-aton":
      return 0;
    case "Digitize":
      if (
        !sourceTerminal ||
        !getProperty("sourceTerminalEducateKnown").includes("digitize.edu")
      ) {
        return 0;
      }

      if (assumeUnused) {
        return 3;
      }

      return 3 - toInt(getProperty("_sourceTerminalDigitizeMonsterCount"));
    case "Romantic Arrow":
      if (!haveFamiliar(renimatedReanimator) || !haveFamiliar(obtuseAngel)) {
        return 0;
      }

      if (assumeUnused) {
        return 1;
      }

      return toInt(getProperty("_badlyRomanticArrows"));
    default:
      throw "No idea what the resource " + resourceType + " is.";
  }
}
