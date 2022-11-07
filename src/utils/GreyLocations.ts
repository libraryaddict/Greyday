import {
  availableChoiceOptions,
  cliExecute,
  currentRound,
  equippedAmount,
  fightFollowsChoice,
  getLocationMonsters,
  getProperty,
  handlingChoice,
  Item,
  lastChoice,
  lastMonster,
  Location,
  Monster,
  print,
  toBoolean,
  toInt,
  toJson,
  visitUrl,
} from "kolmafia";
import {
  castCombatSkill,
  castNoCombatSkills,
  GreyAdventurer,
} from "../GreyAdventurer";
import { QuestInfo, QuestStatus } from "../quests/Quests";
import { SomeResource } from "../typings/ResourceTypes";
import { PossiblePath } from "../typings/TaskInfo";
import { GreyChoices } from "./GreyChoices";
import { greyDuringFightMacro, greyKillingBlow } from "./GreyCombat";
import { GreyOutfit } from "./GreyOutfitter";
import { Macro } from "./MacroBuilder";
import { handledChoices } from "./Properties";
import { getBackupChoices } from "./RandomChoiceHandler";

export type PrimedResource = {
  quest: QuestInfo;
  path: PossiblePath;
  resource: SomeResource;
};

let primedResource: PrimedResource;

export function runPrimedResource() {
  if (getPrimedResource() == null || getPrimedResource().resource.primed()) {
    return;
  }

  getPrimedResource().resource.attemptPrime();
}

export function getPrimedResource(): PrimedResource {
  return primedResource;
}

export function resetPrimedResource() {
  if (getPrimedResource() == null) {
    return;
  }

  if (getPrimedResource().resource.primed()) {
    throw "Can't reset a resource that's been primed";
  }

  primedResource = null;
}

export function setPrimedResource(
  quest: QuestInfo,
  path: PossiblePath,
  resource: SomeResource
) {
  if (getPrimedResource() != null) {
    throw (
      "A resource " +
      getPrimedResource().quest.getId() +
      " has already been set to be primed. Said resource primed? " +
      getPrimedResource().resource.primed()
    );
  }

  if (resource.primed == null) {
    throw "This resource isn't one that can be primed";
  }

  if (resource.primed()) {
    throw `This resource ${resource.name} is already primed. For now, either use the primed resource or run "greyday unprime" to ignore that`;
  }

  if (quest.status(path) == QuestStatus.COMPLETED) {
    throw "The quest " + quest.getId() + " claims to be completed";
  }

  primedResource = {
    quest: quest,
    path: path,
    resource: resource,
  };
}

export class AdventureSettings {
  startOfFightMacro: Macro;
  duringFightMacro: Macro;
  finishingBlowMacro: Macro;
  choices: GreyChoices;
  dontBanishThese: Monster[];
  banishThese: Monster[];
  nonquest: boolean = false;

  addBanishes(monsters: Monster[]): AdventureSettings {
    for (const monster of monsters) {
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
    for (const monster of monsters) {
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

const backupChoices = getBackupChoices();
const freeRunners: Item[] = [
  "navel ring of navel gazing",
  "Greatest American Pants",
].map((s) => Item.get(s));

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

  const createMacro = function () {
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
      if (
        freeRunners.find((i) => equippedAmount(i) > 0) != null &&
        GreyAdventurer.currentAdventure != null &&
        GreyAdventurer.currentAdventure.freeRun != null &&
        GreyAdventurer.currentAdventure.freeRun(lastMonster(), settings)
      ) {
        macro.runaway();
      }

      runPrimedResource();

      macro.step(greyKillingBlow(outfit));
    } else {
      macro.step(settings.finishingBlowMacro);
    }
  };

  const choicesRun: number[] = [];

  const runChoice = function () {
    let choiceToPick: number;

    if (Object.keys(availableChoiceOptions()).length == 0) {
      visitUrl("choice.php");
    }

    if (lastChoice() == 904) {
      cliExecute("choice-goal");
      return "";
    }

    const juneCleaver = lastChoice() >= 1467 && lastChoice() <= 1475;

    if (juneCleaver) {
      choiceToPick = toInt(getProperty("choiceAdventure" + lastChoice()));
    } else if (settings.choices != null) {
      if (settings.choices.calledOutOfScopeChoiceBehavior(lastChoice())) {
        return;
      }

      choiceToPick = settings.choices.handleChoice(lastChoice());
    }

    if (choiceToPick == null) {
      loop: for (const choices of [handledChoices, backupChoices]) {
        for (const [choiceNumber, choiceValue] of choices) {
          if (choiceNumber != lastChoice()) {
            continue;
          }

          if (availableChoiceOptions()[choiceValue] == null) {
            continue;
          }

          choiceToPick = choiceValue;
          break loop;
        }
      }
    }

    if (choiceToPick == null) {
      print("Oh god", "red");
      throw `No idea what to do! Handle the choice manually? Report this issue! Reported to be in choice ${lastChoice()} with choice options ${toJson(
        availableChoiceOptions()
      )}, handling choice: ${handlingChoice()}, fight follows: ${fightFollowsChoice()}`;
    }

    if (choicesRun.filter((c) => c == lastChoice()).length > 6) {
      throw "Detected we're looping in a choice, you will need to manually resolve the choice and should report this issue.";
    }

    choicesRun.push(lastChoice());

    const url =
      "choice.php?pwd=&whichchoice=" + lastChoice() + "&option=" + choiceToPick;

    print("Visited " + url);
    return visitUrl(url);
  };

  const runCombat = function () {
    if (macro == null) {
      createMacro();
    }

    print(macro.toString());
    return macro.submit();
  };

  if (currentRound() == 0 && !handlingChoice()) {
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

    if (
      toBoolean(getProperty("stopForUltraRare")) &&
      lastMonster()?.attributes?.includes("ULTRARARE")
    ) {
      throw "Ultrarare encounter?";
    }
  }

  while (currentRound() != 0 || handlingChoice() || fightFollowsChoice()) {
    let page: string = "";

    if (currentRound() != 0) {
      page = runCombat();

      if (currentRound() != 0) {
        throw "Didn't expect to still be in combat! Maybe health is too low that we aborted to be safe?";
      }
    } else if (handlingChoice() || fightFollowsChoice()) {
      page = runChoice();
    }

    if (page != null) {
      const match = page.match(/<!-- autumnback -->(\d+)/);

      match;

      if (match != null) {
        print(
          "Autumn-aton will be back from '" +
            getProperty("autumnatonQuestLocation") +
            "' in " +
            match[1] +
            " adventures..",
          "gray"
        );
      }

      if (page.includes("The phone in your doctor's bag rings")) {
        visitUrl("main.php");
      }
    }
  }
}

const cachedLocations: Map<Monster, Location[]> = new Map();

export function getLocations(monster: Monster): Location[] {
  if (cachedLocations.has(monster)) {
    return cachedLocations.get(monster);
  }

  const locations: Location[] = [];

  for (const l of Location.all()) {
    const monsters: Monster[] = Object.keys(getLocationMonsters(l)).map((k) =>
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
