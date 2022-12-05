import {
  appearanceRates,
  availableAmount,
  Effect,
  Element,
  equippedAmount,
  expectedDamage,
  Familiar,
  familiarWeight,
  getFuel,
  getMonsters,
  getProperty,
  haveEffect,
  haveOutfit,
  haveSkill,
  Item,
  itemAmount,
  lastMonster,
  Monster,
  monsterElement,
  myAdventures,
  myBasestat,
  myFamiliar,
  myHp,
  myLevel,
  myLocation,
  myMaxhp,
  myMeat,
  myMp,
  myTurncount,
  Skill,
  Stat,
  use,
} from "kolmafia";
import { BanishType, getBanished, hasBanished } from "./Banishers";
import { AbsorbsProvider } from "./GreyAbsorber";
import { AdventureSettings } from "./GreyLocations";
import { GreyOutfit } from "./GreyOutfitter";
import { GreySettings } from "./GreySettings";
import { currentPredictions } from "./GreyUtils";
import { Macro } from "./MacroBuilder";

const poisonousMonsters: Monster[] = [
  "Black Adder",
  "Black Widow",
  "tomb asp",
  "big creepy spider",
  "completely different spider",
  "Stone temple pirate",
  "spectral jellyfish",
  "Stephen Spookyraven",
  "Swarm of killer bees",
  "whitesnake",
  "Mayonnaise wasp",
  "Dodecapede",
  "Quantum Mechanic",
  "Protagonist",
  "ninja snowman assassin",
].map((s) => Monster.get(s));

const flyers = Item.get("Rockband Flyers");
const pantsgiving = Item.get("Pantsgiving");
const cosmicBall = Item.get("Cosmic Bowling Ball");

export function greyDuringFightMacro(settings: AdventureSettings): Macro {
  let macro = new Macro();

  const monster = lastMonster();
  const absorb = AbsorbsProvider.getAbsorb(monster);
  const hasAbsorbed = AbsorbsProvider.getReabsorbedMonsters().includes(monster);

  if (
    myFamiliar() == Familiar.get("Space Jellyfish") &&
    monsterElement(monster) == Element.get("stench")
  ) {
    macro.trySkill(Skill.get("Extract Jelly"));
  }

  // If low weight fam, but not too high. Let them try to dupe.
  if (
    myLevel() >= 6 &&
    monster == Monster.get("Sausage Goblin") &&
    !GreySettings.isHardcoreMode() &&
    familiarWeight(Familiar.get("Grey Goose")) < 9
  ) {
    macro = macro.trySkill(Skill.get("Emit Matter Duplicating Drones"));
  } else if (
    absorb != null &&
    ((myAdventures() > 20 && absorb.mp > 0) || absorb.adventures > 0) &&
    !hasAbsorbed
  ) {
    if (absorb.adventures > 0) {
      macro = macro.trySkill(Skill.get("Re-Process Matter"));
    }
  } else if (isBanishable(settings, monster)) {
    // If they have no good absorbs, or we've already absorbed them
    if (
      absorb == null ||
      hasAbsorbed != null ||
      (absorb.hp == 0 &&
        absorb.mp == 0 &&
        (absorb.skill == null || haveSkill(absorb.skill)))
    ) {
      // If the script explicitly wanted to banish these and this isn't a non-quest
      if (
        !settings.nonquest &&
        (settings.banishThese != null || settings.dontBanishThese != null)
      ) {
        if (
          !hasBanished(myLocation(), BanishType.SPRING_LOADED_FRONT_BUMPER) &&
          getFuel() >= 50
        ) {
          macro.trySkill("Asdon Martin: Spring-Loaded Front Bumper");
        }

        if (
          !hasBanished(myLocation(), BanishType.BOWL_A_CURVEBALL) &&
          availableAmount(Item.get("Cosmic bowling ball")) > 0
        ) {
          macro.trySkill("Bowl a Curveball");
        }
      }

      if (
        !hasBanished(myLocation(), BanishType.SYSTEM_SWEEP) &&
        haveSkill(Skill.get("System Sweep")) &&
        getMonsters(myLocation()).includes(monster)
      ) {
        // We want to banish always on quests, but not on non-quests which we're likely to be wasting a banish in
        let wastedBanish =
          settings.nonquest &&
          getBanished().filter(
            (b) =>
              b.banisher.type == BanishType.SYSTEM_SWEEP &&
              b.turnBanished + 1 >= myTurncount()
          ).length > 0;

        // If we're using crystal ball on a non-quest and we're only aiming to hit one banish
        if (
          !wastedBanish &&
          settings.nonquest &&
          equippedAmount(Item.get("miniature crystal ball")) > 0 &&
          settings.dontBanishThese != null &&
          settings.dontBanishThese.length == 1
        ) {
          // If our next monster is a monster we're aiming to hit.
          const nextMonster = currentPredictions().get(myLocation());

          // If our next predicted combat is against a monster we specifically don't want to banish.
          wastedBanish =
            nextMonster != null && !isBanishable(settings, nextMonster);
        }

        if (!wastedBanish) {
          // If we do want to banish something..
          macro.trySkill(Skill.get("System Sweep"));
        }
      }
    }
  }

  if (
    /*toInt(getProperty("flyeredML")) <= 10000 && */ monster.baseHp < 300 &&
    expectedDamage(monster) < Math.min(200, myHp() * 0.9) &&
    !monster.attributes.includes("FREE") &&
    !poisonousMonsters.includes(monster) &&
    itemAmount(flyers) > 0
  ) {
    macro.tryItem(flyers);
  }

  if (equippedAmount(pantsgiving) > 0) {
    macro.trySkill(Skill.get("Pocket Crumbs"));
  }

  if (
    myHp() > monster.baseAttack * 2 &&
    Math.max(monster.baseAttack, monster.baseHp) * 1.1 <
      myBasestat(Stat.get("Moxie")) &&
    getProperty("boomBoxSong") == "Total Eclipse of Your Meat"
  ) {
    // Always try to sing along if the mob is weak enough
    macro.trySkill(Skill.get("Sing Along"));
  }

  return macro;
}

export function isBanishable(
  settings: AdventureSettings,
  monster: Monster
): boolean {
  if (settings.banishThese == null && settings.dontBanishThese == null) {
    return false;
  }

  if (settings.banishThese != null) {
    return settings.banishThese.includes(monster);
  } else if (!settings.dontBanishThese.includes(monster) && !monster.boss) {
    const loc = myLocation();
    const rates = appearanceRates(loc);

    if (rates[monster.name] > 5) {
      return true;
    }
  }

  return false;
}
const toRemove: Effect[] = [
  "Really Quite Poisoned",
  "Majorly Poisoned",
  "Somewhat Poisoned",
  "A Little Bit Poisoned",
  "Hardly Poisoned at All",
].map((s) => Effect.get(s));
const antidote: Item = Item.get("anti-anti-antidote");

export function greyKillingBlow(outfit: GreyOutfit): Macro {
  let macro = new Macro();
  const healthPerc = Math.min(Math.floor((myHp() / myMaxhp()) * 100) - 5, 30);

  if (toRemove.find((e) => haveEffect(e) > 0) && itemAmount(antidote) > 0) {
    use(antidote);
  }

  if (
    myMeat() < 500 &&
    getProperty("hasMaydayContract") == "true" &&
    getProperty("_maydayDropped") == "false"
  ) {
    macro = macro.attack().repeat();
  }

  if (haveEffect(Effect.get("Temporary Amnesia")) == 0) {
    if (
      getProperty("retroCapeSuperhero") == "vampire" &&
      getProperty("retroCapeWashingInstructions") == "kill"
    ) {
      macro = macro.trySkillRepeat("Slay the dead");
    }

    if (
      (lastMonster().baseHp < 2 || lastMonster().physicalResistance < 70) &&
      myMp() >= 20
    ) {
      if (outfit.itemDropWeight >= 2 || myLevel() > 18) {
        macro.while_(
          `!pastround 15 && !hppercentbelow ${healthPerc} && hasskill Double Nanovision`,
          Macro.trySkill(Skill.get("Double Nanovision"))
        );
      }

      // Only infinite loop if we're underleveled or have the outfit
      if (
        !haveSkill(Skill.get("Double Nanovision")) ||
        myLevel() <= 10 ||
        (myLevel() < 18 &&
          (!GreySettings.isHippyMode() ||
            haveOutfit("Filthy Hippy Disguise") ||
            haveOutfit("Frat Warrior Fatigues")))
      ) {
        macro.trySkill(Skill.get("Infinite Loop"));
        macro.while_(
          `!pastround 15 && !hppercentbelow ${healthPerc} && hasskill Infinite Loop`,
          Macro.trySkill(Skill.get("Infinite Loop"))
        );
      } else {
        macro.trySkill(Skill.get("Double Nanovision"));
        macro.while_(
          `!pastround 15 && !hppercentbelow ${healthPerc} && hasskill Double Nanovision`,
          Macro.trySkill(Skill.get("Double Nanovision"))
        );
      }
    }
  }

  macro.if_(
    `!pastround 15 && !hppercentbelow ${healthPerc}`,
    Macro.tryItem(Item.get("Beehive"))
  );

  macro.tryItem(cosmicBall);

  macro.while_("!pastround 15 && !hppercentbelow 30", Macro.attack());
  macro.abort();

  return macro;
}
