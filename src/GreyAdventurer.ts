import {
  availableAmount,
  bufferToFile,
  Effect,
  Familiar,
  familiarWeight,
  fileToBuffer,
  getProperty,
  haveEffect,
  haveFamiliar,
  haveSkill,
  Item,
  itemAmount,
  Location,
  maximize,
  myAdventures,
  myAscensions,
  myFamiliar,
  myMeat,
  myMp,
  print,
  printHtml,
  putCloset,
  setLocation,
  Skill,
  toInt,
  turnsPlayed,
  useFamiliar,
  useSkill,
} from "kolmafia";
import {
  AdventureFinder,
  ConsiderPriority,
  FoundAdventure,
  OrbStatus,
} from "./GreyChooser";
import { getQuestStatus, QuestAdventure, QuestStatus } from "./quests/Quests";
import { TaskBoomboxSwitch } from "./tasks/TaskBoomboxSwitch";
import { TaskCouncil } from "./tasks/TaskCouncil";
import { TaskEater } from "./tasks/TaskEater";
import { TaskEquipDistillery } from "./tasks/TaskEquipDistillery";
import { TaskFuelAsdon } from "./tasks/TaskFuelAsdon";
import { TaskJuneCleaver } from "./tasks/TaskJuneCleaver";
import { TaskLatteFiller } from "./tasks/TaskLatteFiller";
import { restoreMPTo, TaskMaintainStatus } from "./tasks/TaskMaintainStatus";
import { Task } from "./tasks/Tasks";
import { TaskSellCrap } from "./tasks/TaskSellCrap";
import { TaskColdMedicineCabinet } from "./tasks/TaskMedicineCabinet";
import {
  getResourcesLeft,
  ResourceCategory,
  ResourceId,
  ResourceIds,
} from "./typings/ResourceTypes";
import {
  createResourcesSnapshot,
  getResourcesChanged,
  ResourcesSnapshot,
} from "./typings/TaskInfo";
import {
  AbsorbsProvider,
  getAbsorbedAdventuresRemaining as getAbsorbAdventuresRemaining,
  Reabsorbed,
} from "./utils/GreyAbsorber";
import { GreyOutfit } from "./utils/GreyOutfitter";
import { GreySettings } from "./utils/GreySettings";
import { doColor, setUmbrella } from "./utils/GreyUtils";
import { getPrimedResource } from "./utils/GreyLocations";
import { TaskAutumnaton } from "./tasks/TaskAutumnaton";
import { handledChoices } from "./utils/Properties";
import { shouldGreydayStop } from "./GreyYouMain";
import { TaskTrainset } from "./tasks/TaskTrainset";
import { getFamiliarsToUse, shouldLevelFamiliar } from "./utils/GreyFamiliars";

export class GreyAdventurer {
  goose: Familiar = Familiar.get("Grey Goose");
  adventureFinder: AdventureFinder = new AdventureFinder();
  goTime: boolean;
  tasks: Task[] = [
    new TaskEater(),
    new TaskSellCrap(),
    new TaskColdMedicineCabinet(),
    new TaskCouncil(),
    new TaskLatteFiller(),
    new TaskMaintainStatus(),
    new TaskFuelAsdon(),
    new TaskJuneCleaver(),
    new TaskBoomboxSwitch(),
    new TaskEquipDistillery(),
    new TaskAutumnaton(),
    new TaskTrainset(),
    //new TaskBountyHunter(),
  ];
  static currentAdventure: FoundAdventure;
  freeRunners: Item[] = [
    "Greatest American Pants",
    "navel ring of navel gazing",
  ].map((s) => Item.get(s));
  lastTasksComplete: number = -1;
  gnome = Familiar.get("Reagnimated Gnome");
  gnomeKnee: Item = Item.get("gnomish housemaid's kgnee");

  runTurn(goTime: boolean): boolean {
    this.goTime = goTime;

    if (goTime) {
      for (const task of this.tasks) {
        task.run();
      }
    }

    this.adventureFinder.start();

    const goodAdventure: FoundAdventure = this.adventureFinder.findGoodVisit();

    this.adventureFinder.printStatus(this.adventureFinder.possibleAdventures);

    if (goodAdventure == null) {
      if (getQuestStatus("questL13Final") > 11) {
        print("You've defeated the NS and saved the day!", "blue");

        if (myAdventures() > 40) {
          print(
            "Caution! Burn your adventures! You have more than 40 adventures! Breaking the prism will reset them to 40!",
            "red"
          );
        } else {
          print(
            "Break the prism and become that class you were always meant to be!",
            "blue"
          );
        }
      } else {
        print("Failed, should have printed an error..", "gray");
      }

      return false;
    }

    const snapshot = createResourcesSnapshot(goodAdventure.path);

    if (getPrimedResource() == null) {
      this.adventureFinder.tryPrime(goodAdventure);
    }

    this.printMessage(goodAdventure);

    if (shouldGreydayStop()) {
      return false;
    }

    this.runAdventure(goodAdventure);

    const changed =
      goodAdventure.path == null
        ? getResourcesChanged(snapshot)
        : goodAdventure.path.detectResourceUsage(snapshot);

    if (this.isMismatch(snapshot, changed)) {
      return false;
    }

    if (getPrimedResource() != null && getPrimedResource().resource.primed()) {
      print(
        "Successfully primed for quest " + getPrimedResource().quest.getId(),
        "blue"
      );
    }

    return true;
  }

  isMismatch(
    snapshotBeforeRun: ResourcesSnapshot,
    changedBy: ResourcesSnapshot
  ): boolean {
    const expected: Map<ResourceId, number> = new Map();

    for (const resourceId of ResourceIds) {
      expected.set(resourceId, snapshotBeforeRun.resourceMap.get(resourceId));
    }

    for (const resource of changedBy.resources) {
      expected.set(
        resource.resource,
        expected.get(resource.resource) - (resource.resourcesUsed ?? 1)
      );
    }

    // Resource ID
    // What it was before we used resources
    // How much the snapshot said changed
    // What it should be after we used resources
    // What it currently is
    const mismatch: Map<ResourceId, [number, number, number, number]> =
      new Map();

    for (const id of ResourceIds) {
      if (expected.get(id) == getResourcesLeft(id)) {
        continue;
      }

      // If we actually gained resources, probs clovers..
      if (snapshotBeforeRun.resourceMap.get(id) < getResourcesLeft(id)) {
        continue;
      }

      if (id == "Yellow Ray") {
        continue;
      } else if (id == "Pull" && getResourcesLeft(id) > 50) {
        continue;
      }

      mismatch.set(id, [
        snapshotBeforeRun.resourceMap.get(id),
        changedBy.resourceMap.get(id),
        expected.get(id),
        getResourcesLeft(id),
      ]);
    }

    if (mismatch.size == 0) {
      return false;
    }

    print(`Mismatch in resources used, aborting to be safe.`, "red");

    print(
      `These resources were allowed to be used: ${snapshotBeforeRun.resources.map(
        (r) =>
          r.name +
          " (" +
          ResourceCategory[r.type] +
          ", uses " +
          (r.resourcesUsed ?? 1) +
          ")"
      )}`,
      "red"
    );
    print(
      `These resources were marked as used: ${changedBy.resources.map(
        (r) =>
          r.name +
          " (" +
          ResourceCategory[r.type] +
          ", uses " +
          (r.resourcesUsed ?? 1) +
          ")"
      )}`,
      "red"
    );

    mismatch.forEach(
      ([beforeUsage, changedBy, shouldBe, actualResource], resourceId) => {
        print(
          `${resourceId} was ${beforeUsage} and calculated to be ${shouldBe}, expected to have changed by ${changedBy}. Is now ${actualResource}`,
          "red"
        );
      }
    );

    return true;
  }

  printMessage(goodAdventure: FoundAdventure) {
    const plan: string[] = [];

    if (goodAdventure.quest != null) {
      plan.push("Quest");
    }

    if (goodAdventure.locationInfo != null) {
      if (goodAdventure.locationInfo.turnsToGain > 0) {
        plan.push(
          "Absorb Adventures (Expect " +
            goodAdventure.locationInfo.expectedTurnsProfit +
            " profit of total " +
            goodAdventure.locationInfo.turnsToGain +
            " possible)"
        );
      }

      if (goodAdventure.locationInfo.skills.size > 0) {
        const skills: string[] = [];

        goodAdventure.locationInfo.skills.forEach((v, k) => {
          skills.push(k.skill.name + " (" + v + ")");
        });

        plan.push("Grab Skills: " + skills.join(", "));
      }

      if (goodAdventure.locationInfo.monsters != null) {
        const monsters: string[] = [];

        const absorbed = this.adventureFinder.defeated;
        const advsLeft = getAbsorbAdventuresRemaining();

        goodAdventure.locationInfo.monsters
          .map((m) => {
            const absorb = AbsorbsProvider.getAbsorb(m);

            if (absorb == null) {
              return m.name;
            }

            if (absorb.skill != null) {
              return m.name + " (Skill)";
            }

            if (advsLeft <= 0 || (absorb.adventures || 0) <= 0) {
              return m.name;
            }

            if (absorbed.get(m) == Reabsorbed.REABSORBED) {
              return m.name;
            }

            return (
              m.name + " (Absorbs x " + (!absorbed.has(m) ? "2" : "1") + ")"
            );
          })
          .forEach((m) => monsters.push(m));

        plan.push("Fight: " + monsters.join(", "));
      }
    }

    let prefix: string;

    if (goodAdventure.quest != null) {
      prefix =
        goodAdventure.quest.getId() + " @ " + goodAdventure.adventure.location;
    } else {
      prefix = "Non-Quest @ " + goodAdventure.adventure.location;
    }

    let completed = 0;
    let notReady = 0;
    let inProgress = 0;

    for (const [quest, path] of this.adventureFinder.allQuests) {
      const status = quest.status(path);

      if (status == QuestStatus.COMPLETED) {
        completed++;
      } else if (status == QuestStatus.NOT_READY) {
        notReady++;
      } else {
        inProgress++;
      }
    }

    const changed =
      this.lastTasksComplete >= 0 ? completed - this.lastTasksComplete : 0;
    this.lastTasksComplete = completed;

    print(
      "Adventures Left to Absorb: " + getAbsorbAdventuresRemaining(),
      "gray"
    );
    printHtml(
      "<font color='blue'>Tasks Complete: " +
        completed +
        (changed > 0 ? "<font color='green'> (+" + changed + ")</font>" : "") +
        " / " +
        this.adventureFinder.allQuests.length +
        "</font>"
    );

    printHtml(
      "<u>" +
        doColor(prefix, "blue") +
        ", Goals:</u> " +
        doColor(plan.map((s) => "<u>" + s + "</u>").join(", "), "gray") +
        " Consideration: " +
        ConsiderPriority[goodAdventure.considerPriority],
      true
    );
  }

  doOutfitPrep(adventure: FoundAdventure) {
    const toRun: QuestAdventure = adventure.adventure;
    const outfit = toRun.outfit;

    if (toRun.location == Location.get("Inside the Palindome")) {
      outfit.addWeight(Item.get("Talisman o' Namsilat"));
    } else if (toRun.location == Location.get("The Icy Peak")) {
      outfit.addWeight("cold res", 5, 5);
    }

    let doOrb: boolean = false;

    if (
      adventure.orbStatus != OrbStatus.IGNORED &&
      adventure.orbStatus != OrbStatus.NEEDS_RESET &&
      adventure.considerPriority != ConsiderPriority.BAD_ABSORB
    ) {
      doOrb = true;

      if (
        adventure.orbStatus == OrbStatus.NOT_SET &&
        adventure.quest == null &&
        (toRun.location == null || toRun.location.combatQueue.length > 3)
      ) {
        outfit.addWeight(Item.get("Kramco Sausage-o-Matic&trade;"), 20);
      }
    }

    const wantToAbsorb: boolean =
      adventure.locationInfo != null &&
      adventure.locationInfo.turnsToGain > 0 &&
      (!doOrb ||
        (adventure.considerPriority != ConsiderPriority.ORB_OTHER &&
          adventure.considerPriority != ConsiderPriority.ORB_ABSORB_OTHER));
    const gooseReplaceable =
      !wantToAbsorb && this.adventureFinder.hasEnoughGooseWeight();
    const canDoMagGlass: boolean =
      this.adventureFinder.hasEnoughGooseWeight() &&
      outfit.minusCombatWeight == 0 &&
      outfit.itemDropWeight < 1 &&
      toInt(getProperty("cursedMagnifyingGlassCount")) < 13 &&
      toInt(getProperty("_voidFreeFights")) < 5;
    const reallyLovesMagGlass =
      getProperty("autumnatonQuestLocation") == "" &&
      getProperty("sidequestLighthouseCompleted") == "none" &&
      availableAmount(Item.get("barrel of gunpowder")) < 5;

    if (canDoMagGlass) {
      const bonus = 10;

      if (reallyLovesMagGlass) {
        //  bonus = 100;
      }

      outfit.addWeight(Item.get("cursed magnifying glass"), bonus);
    } else if (
      toInt(getProperty("cursedMagnifyingGlassCount")) == 13 &&
      outfit.minusCombatWeight < 0
    ) {
      outfit.addWeight(Item.get("cursed magnifying glass"), -50);
    } else if (toInt(getProperty("_voidFreeFights")) >= 5) {
      outfit.addWeight(Item.get("cursed magnifying glass"), -30);
    }

    if (adventure.considerPriority == ConsiderPriority.ORB_ABSORB) {
      outfit.addIgnored(Item.get("Carnivorous potted plant"));
    }

    if (toInt(getProperty("scrapbookCharges")) < 100) {
      let bonus = 2;

      if (GreySettings.greyPrepareLevelingResources) {
        bonus = 6;

        if (canDoMagGlass) {
          //bonus = 11;
        }
      }

      outfit.addWeight(Item.get("familiar scrapbook"), bonus);
    }

    const sweat = toInt(getProperty("sweat"));

    if (sweat < 100 && outfit.itemDropWeight < 1) {
      outfit.addWeight(Item.get("designer sweatpants"), sweat < 5 ? 16 : 8);
    }

    outfit.addWeight(Item.get("june cleaver"), 1);

    let powerLevelGoose: boolean = false;
    // We want cat burglar to always be charged first
    const prioritize: Familiar[] = [
      Familiar.get("Cat Burglar"),
      Familiar.get("Gelatinous Cubeling"),
    ];

    let familiar: Familiar = this.goose;

    if (
      toRun.familiar != null &&
      (toRun.disableFamOverride == true || !wantToAbsorb)
    ) {
      familiar = toRun.familiar;
    } else if (gooseReplaceable) {
      const replaceWith: Familiar[] = [];

      // If we don't expect to be doing absorbs in the future..
      if (
        GreySettings.greyPrepareLevelingResources &&
        familiarWeight(this.goose) < 20 &&
        getAbsorbAdventuresRemaining() < 0
      ) {
        replaceWith.push(this.goose);
        powerLevelGoose = true;
      }

      const recced = this.adventureFinder.getRecommendedFamiliars();

      // If fam wants to be charged, add it to the list
      for (const fam of prioritize) {
        if (!recced.includes(fam)) {
          continue;
        }

        replaceWith.push(fam);
      }

      // Add every other fam, exclude burglar.
      replaceWith.push(...recced.filter((f) => !replaceWith.includes(f)));
      replaceWith.push(...getFamiliarsToUse());

      replaceWith.push(this.goose);

      familiar = replaceWith.filter(
        (f) => haveFamiliar(f) && (!doOrb || f != this.gnome)
      )[0];
    }

    if (
      doOrb ||
      (toRun.familiar == null && gooseReplaceable) ||
      familiar == Familiar.get("Melodramedary")
    ) {
      outfit.addWeight(Item.get("june cleaver"), 10);
    }

    if (familiar == this.gnome) {
      outfit.addWeight(this.gnomeKnee);
    }

    if (
      adventure.mayFreeRun &&
      (familiar != this.goose || familiarWeight(this.goose) >= 6)
    ) {
      const item = this.freeRunners.find((i) => availableAmount(i) > 0);

      if (item != null) {
        outfit.addWeight(item, 12);
      }
    }

    let locationToSet = toRun.location;

    if (locationToSet == null) {
      locationToSet = Location.get("Noob Cave");
    }

    setLocation(locationToSet);

    if (availableAmount(Item.get("Unbreakable Umbrella")) > 0) {
      setUmbrella(outfit.getUmbrella());
    }

    useFamiliar(familiar);

    if (!shouldLevelFamiliar(familiar)) {
      outfit.famExpWeight = 0;
    } else if (
      familiar != this.goose ||
      (familiarWeight(this.goose) >= 6 &&
        !powerLevelGoose &&
        adventure.considerPriority != ConsiderPriority.ORB_ABSORB)
    ) {
      outfit.famExpWeight =
        adventure.considerPriority == ConsiderPriority.RANDOM_ABSORB ? 3 : 1;
    }

    if (shouldGreydayStop()) {
      return;
    }

    const primed = getPrimedResource();

    if (primed != null) {
      primed.resource.prepare(outfit);
    }

    const maximizeResult = maximize(
      outfit.createString() +
        " " +
        (doOrb ? "+99999 bonus" : "-equip") +
        " miniature crystal ball",
      false
    );

    if (!maximizeResult) {
      throw "Failed to maximize. Either fix, or report to the script author";
    }

    if (shouldGreydayStop()) {
      return;
    }

    if (primed != null) {
      primed.resource.prepare(null);
    }

    const closet = Item.get("Funky junk key");

    if (itemAmount(closet) > 0) {
      putCloset(closet, itemAmount(closet));
    }
  }

  runAdventure(adventure: FoundAdventure) {
    const toRun: QuestAdventure = adventure.adventure;

    if (toRun.outfit != GreyOutfit.IGNORE_OUTFIT) {
      if (toRun.outfit == null) {
        toRun.outfit = new GreyOutfit();
      }

      this.doOutfitPrep(adventure);

      if (shouldGreydayStop()) {
        return;
      }
    } else if (toRun.outfit == null) {
      toRun.outfit = new GreyOutfit();
    }

    if (this.goTime) {
      const turn = turnsPlayed();

      try {
        const choices = handledChoices.join(",");

        GreyAdventurer.currentAdventure = adventure;
        toRun.run();

        const afterChoices = handledChoices.join(",");

        if (
          choices != afterChoices &&
          getProperty("greyIgnoreErrors") != "true"
        ) {
          throw (
            "Expected handled choices to be the same after the adenture was run! Previously: " +
            choices +
            ", now: " +
            afterChoices +
            ". To ignore this, set 'greyIgnoreErrors' to 'true'"
          );
        }
      } finally {
        GreyAdventurer.currentAdventure = null;

        if (GreySettings.greyDebug) {
          const name = `grey_turns_played_${myAscensions()}.txt`;

          let buffer = fileToBuffer(name);

          if (buffer == "") {
            buffer =
              "# Turns Played\tQuest ID\tLocation\tTurns Taken\tFamiliar";
          }

          const id = adventure.quest ? adventure.quest.getId() : "Non-Quest";

          toRun.location;

          buffer += `\n${turnsPlayed()}\t${id}\t${toRun.location}\t${
            turnsPlayed() - turn
          }\t${myFamiliar()}`;

          bufferToFile(buffer.toString(), name);
        }
      }
    } else {
      print("Sim run()!");
    }
  }
}

export function castNoCombatSkills() {
  if (
    haveSkill(Skill.get("Phase Shift")) &&
    haveEffect(Effect.get("Shifted Phase")) == 0 &&
    restoreMPTo(50)
  ) {
    useSkill(Skill.get("Phase Shift"));
  }

  if (
    haveSkill(Skill.get("Photonic Shroud")) &&
    haveEffect(Effect.get("Darkened Photons")) == 0 &&
    restoreMPTo(50)
  ) {
    useSkill(Skill.get("Photonic Shroud"));
  }

  restoreMPTo(20);

  if (myMp() < 20) {
    throw "Expected at least 20 mp";
  }
}

export function castCombatSkill() {
  if (
    haveSkill(Skill.get("Piezoelectric Honk")) &&
    haveEffect(Effect.get("Hooooooooonk!")) == 0 &&
    restoreMPTo(50)
  ) {
    useSkill(Skill.get("Piezoelectric Honk"));
  }

  restoreMPTo(20);

  if (myMp() < 20) {
    throw "Expected at least 20 mp";
  }
}

export const skillPhaseShift = Skill.get("Phase Shift");
export const skillPhotonicShroud = Skill.get("Photonic Shroud");
export const skillHonk = Skill.get("Piezoelectric Honk");

export function hasNonCombatSkillsReady(wantBoth: boolean = true): boolean {
  const s1 = haveSkill(skillPhaseShift);
  const s2 = haveSkill(skillPhotonicShroud);

  const s1e = haveEffect(Effect.get("Shifted Phase")) > 0;
  const s2e = haveEffect(Effect.get("Darkened Photons")) > 0;

  if (wantBoth) {
    return (
      s1 &&
      s2 &&
      (s1e ? 0 : 50) + (s2e ? 0 : 40) + 20 <= myMp() + myMeat() / 200
    );
  }

  return s1e || s2e || ((s1 || s2) && myMp() + myMeat() / 200 >= 60);
}

export function hasCombatSkillReady(): boolean {
  return (
    hasCombatSkillActive() ||
    (haveSkill(skillHonk) && myMp() + myMeat() / 200 >= 50)
  );
}

export function hasBanisherSkill(): boolean {
  return haveSkill(Skill.get("System Sweep"));
}

export function hasCombatSkillActive(): boolean {
  return haveEffect(Effect.get("Hooooooooonk!")) > 0;
}

export function hasNonCombatSkillActive(): boolean {
  return (
    haveEffect(Effect.get("Shifted Phase")) > 0 ||
    haveEffect(Effect.get("Darkened Photons")) > 0
  );
}
