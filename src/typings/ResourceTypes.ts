import {
  availableAmount,
  canFaxbot,
  cliExecute,
  currentRound,
  Effect,
  Familiar,
  faxbot,
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
  outfit,
  print,
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
import { GreyOutfit } from "../utils/GreyOutfitter";
import { GreySettings } from "../utils/GreySettings";
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
  INSTANT_KILL,
  FORCE_NC,
  FORCE_FIGHT,
  PILL_KEEPER,
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
  "Parka: Clara's Bell",
  "Pillkeeper",
  "Portscan",
  "Hugs and Kisses",
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
  id: ResourceId;
  available?: () => boolean; // Some iotms might not be available, like parka and torso
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

const glove = Item.get("Powerful Glove");

const gloveReplace: SomeResource = {
  type: ResourceCategory.GLOVE_REPLACE,
  id: "Powerful Glove",
  worthInAftercore: 22000,
  resourcesUsed: 10,
  prepare: (outfit: GreyOutfit) =>
    outfit != null ? outfit.addItem(glove) : null,
  macro: () => Macro.skill(Skill.get("CHEAT CODE: Replace Enemy")),
};

const clover: SomeResource = {
  type: ResourceCategory.CLOVER,
  id: "Clover",
  worthInAftercore: 22000, // How much we could sell a clover for
  prepare: () => {},
};

const xoFam = Familiar.get("XO Skeleton");

const hugsAndKisses: SomeResource = {
  type: ResourceCategory.HUGS_AND_KISSES,
  id: "Hugs and Kisses",
  worthInAftercore: 1500,
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
  id: "Fire Extingusher",
  resourcesUsed: 10,
  worthInAftercore: 1500, // Tattered paper cost and assume free run
  prepare: (outfit: GreyOutfit) =>
    outfit != null ? outfit.addItem(extingusher) : null,
  macro: () => Macro.skill(Skill.get("Fire Extinguisher: Polar Vortex")),
};

const extingusherZoneSpecific: SomeResource = {
  type: ResourceCategory.FIRE_EXTINGUSHER_ZONE,
  id: "Fire Extingusher",
  resourcesUsed: 20,
  worthInAftercore: 3000, // Tattered paper cost x 2
  prepare: (outfit: GreyOutfit) =>
    outfit != null
      ? outfit.addItem(extingusher).addBonus("-equip smoke ball")
      : null,
  macro: () => Macro.skill(Skill.get("Fire Extinguisher: Zone Specific")),
};

const pull: SomeResource = {
  type: ResourceCategory.PULL,
  id: "Pull",
  worthInAftercore: toInt(getProperty("greyValueOfPull") || "0"), // This doesn't cost us anything to use
  prepare: () => {},
};

const pillkeeper: Item = Item.get("Eight Days a Week Pill Keeper");

const pillkeeperNC: SomeResource = {
  type: ResourceCategory.FORCE_NC,
  id: "Pillkeeper",
  worthInAftercore: 50000, // Lets just value it at a frost flower?
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
  id: "Portscan",
  worthInAftercore: 0,
  prepare: (outfit: GreyOutfit, props: PropertyManager) => {
    if (props == null) {
      return;
    }

    cliExecute("terminal educate portscan.edu");
  },
  primed: () => toBoolean(getProperty(portscanProp) || "false"),
  unprime: () => setProperty(portscanProp, "false"),
  attemptPrime: () => {
    if (currentRound() != 0) {
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
  id: "Parka: Clara's Bell",
  worthInAftercore: 0,
  prepare: (outfit: GreyOutfit, props: PropertyManager) => {
    if (outfit != null) {
      outfit.addItem(parka);
    }

    if (props != null) {
      cliExecute("parka spikolodon");
    }
  },
  primed: () => toBoolean(getProperty(parkaProp) || "false"),
  unprime: () => setProperty(parkaProp, "false"),
  attemptPrime: () => {
    if (currentRound() != 0) {
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

const yellowParka: SomeResource = {
  type: ResourceCategory.YELLOW_RAY,
  id: "Yellow Ray",
  available: () => availableAmount(parka) > 0 && haveSkill(torso),
  resourcesUsed: 99,
  worthInAftercore: -GreySettings.greyValueOfAdventure,
  prepare: (outfit: GreyOutfit, props: PropertyManager) => {
    if (outfit != null) {
      outfit.addItem(parka);
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
const vipInvitation: Item = Item.get("Clan VIP Lounge key");

const yellowRocket: SomeResource = {
  type: ResourceCategory.YELLOW_RAY,
  id: "Yellow Ray",
  worthInAftercore: 250, // Cost of a yellow rocket
  resourcesUsed: 75,
  available: () => availableAmount(vipInvitation) > 0,
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
  id: "Yellow Ray",
  worthInAftercore: 0,
  available: () => availableAmount(retrocape) > 0,
  resourcesUsed: 100,
  prepare: (outfit: GreyOutfit, props: PropertyManager) => {
    if (outfit != null) {
      outfit.addItem(retrocape);
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
  id: "Cosplay Saber",
  // If we have more than 60 pills, the saber is free. Otherwise it's worth 3k meat when its alien free day
  worthInAftercore:
    storageAmount(Item.get("distention pill")) > 60
      ? -100
      : modifierEval("G") >= 4
      ? 3000
      : 0, // Garbo has some use of it, but if you have an oflaction like its basically worth grimace pill/2 free fights
  prepare: (outfit: GreyOutfit, props: PropertyManager) => {
    if (outfit != null) {
      outfit.addItem(cosplaySaber);
    }
    if (props != null) {
      props.setChoice(1387, 3);
    }
  },
  macro: () => Macro.skill(Skill.get("Use The Force")),
  ready: () => true,
};

const backupCamera: Item = Item.get("Backup Camera");

const backupCopier: SomeResource = {
  type: ResourceCategory.COPIER,
  id: "Backup Camera",
  worthInAftercore: 20000, // Embezzler
  prepare: (outfit: GreyOutfit) =>
    outfit != null ? outfit.addItem(backupCamera) : null,
  macro: () => Macro.skill(Skill.get("Back-Up to your Last Enemy")),
};

const cosplayCopier: SomeResource = {
  type: ResourceCategory.OLFACT_COPIER,
  id: "Cosplay Saber",
  worthInAftercore: 3000, // Garbo has some use of it, but if you have an oflaction like its basically worth grimace pill/2 free fights
  prepare: (outfit: GreyOutfit, props: PropertyManager) => {
    if (outfit != null) {
      outfit.addItem(cosplaySaber);
    }
    if (props != null) {
      props.setChoice(1387, 2);
    }
  },
  macro: () => Macro.skill(Skill.get("Use The Force")),
};

const cargoShorts: SomeResource = {
  type: ResourceCategory.CARGO_SHORTS,
  id: "Cargo Shorts",
  worthInAftercore: 30000, // Some sellable item
  prepare: () => {},
  pocket: (pocket: number) => {
    visitUrl("inventory.php?action=pocket");
    visitUrl("choice.php?whichchoice=1420&option=1&pocket=" + pocket + "&pwd=");
  },
};

const faxMachine: SomeResource = {
  type: ResourceCategory.FAXER,
  id: "Fax Machine",
  worthInAftercore: 20000, // Embezzler
  prepare: () => {},
  fax: (monster: Monster) => {
    if (!canFaxbot(monster)) {
      throw (
        "Can't fax in " +
        monster.name +
        ". Try fax it in manually, and yellow rocket it?"
      );
    }

    faxbot(monster);

    if (getProperty("photocopyMonster") != monster.name) {
      throw (
        "Expected " +
        monster.name +
        " but mafia reports we have a faxed " +
        getProperty("photocopyMonster") +
        ". Try fax it in manually and yellow rocket it?"
      );
    }

    visitUrl("inv_use.php?which=3&whichitem=4873&pwd");
  },
};

const combatLocket: SomeResource = {
  type: ResourceCategory.FAXER,
  id: "Combat Locket",
  worthInAftercore: 20000, // Embezzler
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
  id: "Wish",
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
  id: "Cosplay Saber",
  worthInAftercore: 3000, // Garbo has some use of it, but if you have an oflaction like its basically worth grimace pill/2 free fights
  prepare: (outfit: GreyOutfit, props: PropertyManager) => {
    if (outfit != null) {
      outfit.addItem(cosplaySaber);
    }
    if (outfit != null) {
      props.setChoice(1387, 3);
    }
  },
  macro: () => Macro.skill(Skill.get("Use The Force")),
};

const bowlingBall: SomeResource = {
  type: ResourceCategory.BANISHER,
  id: "Bowling Ball",
  worthInAftercore: 0, // This doesn't cost us anything to use
  prepare: () => {},
  macro: () => Macro.skill(Skill.get("Bowl a Curveball")),
};

const asdon: SomeResource = {
  type: ResourceCategory.BANISHER,
  id: "Asdon",
  worthInAftercore: 900, // The rough price to fuel up the asdon
  prepare: () => {},
};

const deckOfEveryCard: SomeResource = {
  type: ResourceCategory.DECK_OF_EVERY_CARD,
  id: "Deck of Every Card",
  worthInAftercore: 2000,
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
  id: "Deck of Every Card",
  worthInAftercore: 20000, // Worth 20k, 20k and 10k (Blue mana x2, then misc)
  resourcesUsed: 5,
  prepare: () => {},
  pickCard: (card: string) => cliExecute(`cheat ${card}`),
};

const zappable: SomeResource = {
  type: ResourceCategory.ZAP,
  id: "Zap Wand",
  worthInAftercore: 15000,
  prepare: () => {},
};

const catHeist: SomeResource = {
  type: ResourceCategory.CAT_HEIST,
  id: "Cat Burglar Heist",
  worthInAftercore: 0,
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
  id: "Chateau Painting",
  worthInAftercore: 5000,
  prepare: () => {},
  fax: (monster: Monster) => {
    if (toMonster(getProperty("chateauMonster")) != monster) {
      throw "Unexpected monster attempted to fax!";
    }
  },
};

const hottub: SomeResource = {
  type: ResourceCategory.HOT_TUB,
  id: "Hot Tub",
  worthInAftercore: 0,
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
  pillkeeperNC,
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
].sort((r1, r2) => r1.worthInAftercore - r2.worthInAftercore);

export function getResources(
  includingUnavailable: boolean = false
): SomeResource[] {
  if (includingUnavailable) {
    return allResources;
  }

  return allResources.filter((r) => r.available == null || r.available());
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
      return assumeUnused || !toBoolean(getProperty("breakfastCompleted"))
        ? 3
        : availableAmount(Item.get("11-leaf clover"));
    case "Deck of Every Card":
      return availableAmount(Item.get("Deck of Every Card")) > 0
        ? 15 - (assumeUnused ? 0 : toInt(getProperty("_deckCardsDrawn")))
        : 0;
    case "Zap Wand":
      return Math.max(
        0,
        2 - (assumeUnused ? 0 : toInt(getProperty("_zapCount")))
      );
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
        availableAmount(wish),
        3 - toInt(getProperty("_genieWishesUsed"))
      );

      return Math.min(fightsRemaining, wishesAvailable);
    case "Fax Machine":
      return availableAmount(vipInvitation) > 0 &&
        (assumeUnused || getProperty("_photocopyUsed") == "false")
        ? 1
        : 0;
    case "Cat Burglar Heist":
      return haveFamiliar(Familiar.get("Cat Burglar"))
        ? assumeUnused
          ? 1
          : 1 - toInt(getProperty("_catBurglarHeistsComplete"))
        : 0;
    case "Hot Tub":
      if (availableAmount(vipInvitation) == 0) {
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
    case "Parka: Clara's Bell":
      if (!haveSkill(torso) || availableAmount(parka) == 0) {
        return 0;
      }

      return (
        5 - (assumeUnused ? 0 : toInt(getProperty("_spikolodonSpikeUses")))
      );
    case "Pillkeeper":
      if (availableAmount(pillkeeper) == 0) {
        return 0;
      }

      return assumeUnused || toBoolean(getProperty("_freePillKeeperUsed"))
        ? 1
        : 0;
    case "Portscan":
      if (
        !sourceTerminal ||
        !getProperty("sourceTerminalEducateKnown").includes("portscan.edu")
      ) {
        return 0;
      }

      return (
        3 -
        (assumeUnused ? 0 : toInt(getProperty("_sourceTerminalPortscanUses")))
      );
    default:
      throw "No idea what the resource " + resourceType + " is.";
  }
}
