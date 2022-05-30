import {
  appearanceRates,
  availableAmount,
  Effect,
  equippedAmount,
  Familiar,
  getFuel,
  getMonsters,
  getProperty,
  haveEffect,
  haveOutfit,
  haveSkill,
  Item,
  lastMonster,
  Monster,
  myAdventures,
  myAscensions,
  myBasestat,
  myBuffedstat,
  myFamiliar,
  myHp,
  myLevel,
  myLocation,
  myMaxmp,
  myMp,
  myTurncount,
  Skill,
  Stat,
  toInt,
} from "kolmafia";
import { hasBanished, BanishType, getBanished } from "./Banishers";
import { AbsorbsProvider, Reabsorbed } from "./GreyAbsorber";
import { AdventureSettings } from "./GreyLocations";
import { GreyOutfit } from "./GreyOutfitter";
import { GreySettings } from "./GreySettings";
import { Macro } from "./MacroBuilder";

class MacroFiller {
  addBanish(monster: Monster) {}

  addGenericStuff() {
    // Sing!
    // Absorb
    // Whatever
  }

  addMountainMan() {}

  addGlarkCable() {}

  addCigerette() {}

  addKilling() {
    // Absorb
    // Infinite Loop
    // +Item Drop
    // Banish
  }

  addYellowRay(monster: Monster) {}

  useBackups() {}

  addGremlins() {}
}

export function greyDuringFightMacro(settings: AdventureSettings): Macro {
  let macro = new Macro();

  let monster = lastMonster();
  let absorb = AbsorbsProvider.getAbsorb(monster);
  let hasAbsorbed = AbsorbsProvider.getReabsorbedMonsters().includes(monster);

  if (
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
      // If the script explicitly wanted to banish these
      if (settings.banishThese != null || settings.dontBanishThese != null) {
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
        haveSkill(Skill.get("System Sweep"))
      ) {
        // If we are not using crystal ball and didn't just banish something..
        if (
          getMonsters(myLocation()).includes(monster) &&
          (equippedAmount(Item.get("miniature crystal ball")) == 0 ||
            getBanished().filter(
              (b) =>
                b.banisher.type == BanishType.SYSTEM_SWEEP &&
                b.turnBanished + 2 >= myTurncount()
            ).length == 0)
        )
          // If we do want to banish something..
          macro.trySkill(Skill.get("System Sweep"));
      }
    }
  }

  if (
    /*toInt(getProperty("flyeredML")) <= 10000 && */ monster.baseHp < 300 &&
    myHp() > 120
  ) {
    macro.tryItem(Item.get("rock band flyers"));
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
    let loc = myLocation();
    let rates = appearanceRates(loc);

    if (rates[monster.name] > 5) {
      return true;
    }
  }

  return false;
}

export function greyKillingBlow(outfit: GreyOutfit): Macro {
  let macro = new Macro();

  if (haveEffect(Effect.get("Temporary Amnesia")) == 0) {
    if (myLevel() < 5 && myFamiliar() == Familiar.get("Grey Goose")) {
      macro = macro.trySkill(" Convert Matter to Pomade");
    }

    if (
      getProperty("retroCapeSuperhero") == "vampire" &&
      getProperty("retroCapeWashingInstructions") == "kill"
    ) {
      macro = macro.trySkill("Slay the dead");
    }

    if (lastMonster().physicalResistance < 70 && myMp() >= 20) {
      if (outfit.itemDropWeight >= 2 || myLevel() > 20) {
        macro = macro.trySkillRepeat(Skill.get("Double Nanovision"));
      }

      // Only infinite loop if we're underleveled or have the outfit
      if (
        !GreySettings.isHippyMode() ||
        myLevel() <= 10 ||
        haveOutfit("Filthy Hippy Disguise") ||
        haveOutfit("Frat Warrior Fatigues")
      ) {
        macro = macro.trySkillRepeat(Skill.get("Infinite Loop"));
      }

      macro = macro.trySkillRepeat(Skill.get("Double Nanovision"));
    }
  }

  macro.while_("!pastround 15 && !hppercentbelow 30", Macro.attack());
  macro.abort();

  return macro;
}
