import {
  adv1,
  availableChoiceOptions,
  choiceFollowsFight,
  cliExecute,
  currentRound,
  getLocationMonsters,
  getProperty,
  handlingChoice,
  lastChoice,
  Location,
  Monster,
  print,
  runChoice,
  setAutoAttack,
  toInt,
  visitUrl,
} from "kolmafia";
import {
  castCombatSkill,
  castNoCombatSkills,
  hasNonCombatSkillActive,
} from "../GreyAdventurer";
import { Absorb } from "./GreyAbsorber";
import { GreyChoices } from "./GreyChoices";
import { greyDuringFightMacro, greyKillingBlow } from "./GreyCombat";
import { GreyOutfit } from "./GreyOutfitter";
import { adventureMacro, Macro } from "./MacroBuilder";

export class AdventureSettings {
  startOfFightMacro: Macro;
  duringFightMacro: Macro;
  finishingBlowMacro: Macro;
  choices: GreyChoices;
  dontBanishThese: Monster[];
  banishThese: Monster[];
  nonquest: boolean = false;

  addBanishes(monsters: Monster[]): AdventureSettings {
    for (let monster of monsters) {
      this.addBanish(monster);
    }

    return this;
  }

  addBanish(monster: Monster): AdventureSettings {
    if (this.dontBanishThese != null) {
      throw "Already declared banish everything but";
    }

    if (this.banishThese == null) {
      this.banishThese = [];
    }

    this.banishThese.push(monster);

    return this;
  }

  addNoBanishes(monsters: Monster[]): AdventureSettings {
    for (let monster of monsters) {
      this.addNoBanish(monster);
    }

    return this;
  }

  addNoBanish(monster: Monster): AdventureSettings {
    if (this.banishThese != null) {
      throw "Already declared banish only X";
    }

    if (this.dontBanishThese == null) {
      this.dontBanishThese = [];
    }

    this.dontBanishThese.push(monster);

    return this;
  }

  setBanishAnything(): AdventureSettings {
    if (this.dontBanishThese != null || this.banishThese != null) {
      throw "Already declared some banishing";
    }

    if (this.dontBanishThese == null) {
      this.dontBanishThese = [];
    }

    return this;
  }

  setChoices(choices: GreyChoices): AdventureSettings {
    this.choices = choices;

    return this;
  }

  setStartOfFightMacro(startOfFightMacro: Macro): AdventureSettings {
    this.startOfFightMacro = startOfFightMacro;

    return this;
  }

  setDuringFightMacro(duringFightMacro: Macro): AdventureSettings {
    this.duringFightMacro = duringFightMacro;

    return this;
  }

  setFinishingBlowMacro(finishingBlowMacro: Macro): AdventureSettings {
    this.finishingBlowMacro = finishingBlowMacro;

    return this;
  }
}

export function greyAdv(
  location: Location | string,
  outfit?: GreyOutfit,
  settings?: AdventureSettings
) {
  if (outfit == null) {
    outfit = new GreyOutfit();
  }

  if (settings == null) {
    settings = new AdventureSettings();
  }

  let macro: Macro;

  let createMacro = function () {
    if (settings.startOfFightMacro == null) {
      macro = new Macro();
    } else {
      macro = settings.startOfFightMacro;
    }

    if (settings.duringFightMacro == null) {
      macro.step(greyDuringFightMacro(settings));
    } else {
      macro
        .step(settings.duringFightMacro)
        .step(greyDuringFightMacro(settings));
    }

    if (settings.finishingBlowMacro == null) {
      macro.step(greyKillingBlow(outfit));
    } else {
      macro.step(settings.finishingBlowMacro);
    }
  };

  let runChoice = function () {
    let choiceToPick: number;

    if (Object.keys(availableChoiceOptions()).length == 0) {
      visitUrl("choice.php");
    }

    if (lastChoice() == 904) {
      cliExecute("choice-goal");
      return;
    }

    if (settings.choices != null) {
      if (settings.choices.callOutOfScopeChoiceBehavior(lastChoice())) {
        return;
      }

      choiceToPick = settings.choices.handleChoice(lastChoice());
    }

    if (choiceToPick == null) {
      choiceToPick = toInt(getProperty("choiceAdventure" + lastChoice()));
    }

    if (choiceToPick == 0) {
      print("Oh god", "red");
      throw "No idea what to do!";
    }

    let url =
      "choice.php?pwd=&whichchoice=" + lastChoice() + "&option=" + choiceToPick;

    visitUrl(url);
    print("Visited " + url);
  };

  let runCombat = function () {
    if (macro == null) {
      createMacro();
    }

    print(macro.toString());
    macro.submit();
  };

  if (outfit.plusCombatWeight > 0) {
    castCombatSkill();
  } else if (outfit.minusCombatWeight > 0) {
    castNoCombatSkills();
  }

  if (typeof location == "string") {
    visitUrl(<string>location);
  } else if (location != null) {
    visitUrl("adventure.php?snarfblat=" + toInt(location));
  }

  while (currentRound() != 0 || choiceFollowsFight() || handlingChoice()) {
    if (currentRound() != 0) {
      runCombat();

      if (currentRound() != 0) {
        throw "Didn't expect to still be in combat! Maybe health is too low that we aborted to be safe?";
      }
    } else {
      runChoice();
    }
  }
}

const cachedLocations: Map<Monster, Location[]> = new Map();

export function getLocations(monster: Monster): Location[] {
  if (cachedLocations.has(monster)) {
    return cachedLocations.get(monster);
  }

  let locations: Location[] = [];

  for (let l of Location.all()) {
    let monsters: Monster[] = Object.keys(getLocationMonsters(l)).map((k) =>
      Monster.get(k)
    );

    if (!monsters.includes(monster)) {
      continue;
    }

    locations.push(l);
  }

  cachedLocations.set(monster, locations);

  return locations;
}
