import {
  availableAmount,
  canFaxbot,
  cliExecute,
  currentRound,
  Effect,
  Familiar,
  faxbot,
  getProperty,
  haveEffect,
  haveFamiliar,
  haveSkill,
  heist,
  Item,
  itemAmount,
  modifierEval,
  Monster,
  myMeat,
  print,
  pullsRemaining,
  Skill,
  storageAmount,
  toBoolean,
  toInt,
  toMonster,
  turnsPlayed,
  urlEncode,
  visitUrl,
} from "kolmafia";
import { AdventureSettings } from "../utils/GreyLocations";
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
  FIRE_EXTINGUSHER_ZONE,
  GLOVE_REPLACE,
  DECK_OF_EVERY_CARD,
  DECK_OF_EVERY_CARD_CHEAT,
  CAT_HEIST,
  HOT_TUB,
  INSTANT_KILL,
  FORCE_NC,
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
  //  "Parka: Clara's Bell",
] as const;

export type ResourceId = typeof ResourceIds[number];

export interface SomeResource {
  type: ResourceCategory;
  id: ResourceId;
  resourcesUsed?: number;
  worthInAftercore: number; // If used by garbo, how much profit would we miss out
  prepare: (outfit: GreyOutfit, props?: PropertyManager) => void;
  fax?: (monster: Monster) => void;
  pocket?: (pocket: number) => void;
  macro?: () => Macro;
  doHeist?: (item: Item) => void;
  pickCard?: (card: string) => void;
  ready?: () => boolean;
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
    outfit != null ? outfit.addItem(extingusher) : null,
  macro: () => Macro.skill(Skill.get("Fire Extinguisher: Zone Specific")),
};

const pull: SomeResource = {
  type: ResourceCategory.PULL,
  id: "Pull",
  worthInAftercore: toInt(getProperty("greyValueOfPull") || "0"), // This doesn't cost us anything to use
  prepare: () => {},
};

const parka: Item = Item.get("Jurassic Parka");

const yellowParka: SomeResource = {
  type: ResourceCategory.YELLOW_RAY,
  id: "Yellow Ray",
  resourcesUsed:
    availableAmount(parka) > 0 && haveSkill(Skill.get("Torso Awareness"))
      ? 99
      : 10_000,
  worthInAftercore: 0,
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
  resourcesUsed: availableAmount(vipInvitation) > 0 ? 75 : 10_000,
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
  resourcesUsed: availableAmount(retrocape) > 0 ? 100 : 10_000,
  prepare: (outfit: GreyOutfit, props: PropertyManager) => {
    if (outfit != null) {
      outfit.addItem(retrocape);
    }

    if (props != null) {
      cliExecute("retrocape heck kiss");
    }
  },
  macro: () => Macro.skill(Skill.get("Unleash the Devil's Kiss")),
  ready: () =>
    myMeat() > 300 && haveEffect(Effect.get("Everything Looks Yellow")) == 0,
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
  cosplayYellowRay,
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
].sort((r1, r2) => r1.worthInAftercore - r2.worthInAftercore);

export function getResources(): SomeResource[] {
  return allResources;
}

export function getResourcesLeft(
  resourceType: ResourceId,
  assumeUnused: boolean = false
): number {
  switch (resourceType) {
    case "Asdon":
      return 0;
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
      const pullsLimit = Math.max(0, Math.min(GreySettings.greyPullsLimit, 20));

      if (assumeUnused) {
        return pullsLimit;
      }

      const greyPulled = getProperty("_greyPulls")
        .split(",")
        .filter((s) => s.length > 0);

      const pullsAllowed = Math.min(
        pullsRemaining(),
        pullsLimit - greyPulled.length
      );

      return Math.max(0, pullsAllowed);
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
      return availableAmount(Item.get("Cargo Cultist Shorts")) > 0 &&
        (assumeUnused || getProperty("_cargoPocketEmptied") != "true")
        ? 1
        : 0;
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

    default:
      throw "No idea what the resource " + resourceType + " is.";
  }
}
