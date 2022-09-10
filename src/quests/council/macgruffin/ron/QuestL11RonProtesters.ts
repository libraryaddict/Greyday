import {
  availableAmount,
  Effect,
  equippedAmount,
  getProperty,
  gnomadsAvailable,
  haveEffect,
  haveSkill,
  Item,
  Location,
  Monster,
  numericModifier,
  print,
  Skill,
  storageAmount,
  toInt,
  use,
} from "kolmafia";
import { ResourceCategory } from "../../../../typings/ResourceTypes";
import {
  PossiblePath,
  TaskInfo,
  TaskRelation,
} from "../../../../typings/TaskInfo";
import { greyKillingBlow } from "../../../../utils/GreyCombat";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { GreyPulls } from "../../../../utils/GreyResources";
import { getMoonZone, GreySettings } from "../../../../utils/GreySettings";
import { getAllCombinations } from "../../../../utils/GreyUtils";
import { Macro } from "../../../../utils/MacroBuilder";
import { PropertyManager } from "../../../../utils/Properties";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

class PossiblePathExtra extends PossiblePath {
  equips: Item[] = [];
}

export class QuestL11RonProtesters extends TaskInfo implements QuestInfo {
  proLoc: Location = Location.get("A Mob Of Zeppelin Protesters");
  deck: Item = Item.get("deck of lewd playing cards");
  lyrndHat: Item = Item.get("lynyrdskin cap");
  lyrndPants: Item = Item.get("lynyrdskin breeches");
  lyrndShirt: Item = Item.get("lynyrdskin tunic");
  lyrndCostume: Item[] = [this.lyrndHat, this.lyrndPants, this.lyrndShirt];
  musk: Item = Item.get("lynyrd musk");
  cig: Item = Item.get("cigarette lighter");
  cultist: Monster = Monster.get("Blue Oyster Cultist");
  flaming: Item = Item.get("Flamin' Whatshisname");
  musky: Effect = Effect.get("Musky");
  toAbsorb: Monster[];
  torsoAwareness: Skill = Skill.get("Torso Awareness");
  smutSleazeSkill: Skill = Skill.get("Procgen Ribaldry");
  sleazeSkill2: Skill = Skill.get("Innuendo Circuitry");
  starChart: Item = Item.get("Star Chart");
  sweatpants: Item = Item.get("designer sweatpants");
  spoon: Item = Item.get("hewn moon-rune spoon");
  umbrella: Item = Item.get("Unbreakable Umbrella");
  // TODO Once we've got the absorbs, try replace combats if it won't hurt our NCs
  vipInvitation: Item = Item.get("Clan VIP Lounge key");
  transparentPants: Item = Item.get("Transparent pants");
  clover: Item = Item.get("11-Leaf Clover");
  lucky: Effect = Effect.get("Lucky!");
  paths: PossiblePath[] = [];

  // Possible paths.
  // We have sleaze, lynard, clovers
  sleazeEquips: Item[] = [
    this.deck,
    availableAmount(this.sweatpants) > 0
      ? this.sweatpants
      : Item.get("Transparent pants"),
  ];

  getRelation(id: QuestType): TaskRelation {
    if (id == "Council / Peaks / Orcs" && !haveSkill(this.smutSleazeSkill)) {
      return TaskRelation.WAIT_FOR;
    }

    if (
      id == "Council / Tower / Keys / Star" &&
      !GreySettings.shouldAvoidTowerRequirements() &&
      !haveSkill(this.sleazeSkill2) &&
      availableAmount(this.starChart) == 0
    ) {
      return TaskRelation.WAIT_FOR;
    }

    return TaskRelation.UNRELATED;
  }

  createPaths(assumeUnstarted: boolean) {
    const paths: PossiblePath[] = [];

    // Combinations of sleaze equips, clover, costume
    let allPossible: (Item | string)[] = [
      ...this.sleazeEquips.filter(
        (i) => storageAmount(i) > 0 || availableAmount(i) > 0
      ),
      ...this.lyrndCostume,
      "Clover",
      "Clover",
      "Clover",
    ];

    if (availableAmount(this.spoon) == 0 && !gnomadsAvailable()) {
      allPossible = allPossible.filter((i) => i != this.lyrndShirt);
    }

    for (const combination of getAllCombinations(allPossible)) {
      if (
        (combination.includes(this.sweatpants) ||
          combination.includes(this.transparentPants)) &&
        combination.includes(this.lyrndPants)
      ) {
        continue;
      }

      const items: Item[] = combination.filter(
        (i) => i instanceof Item
      ) as Item[];
      const clovers: number = combination.filter((i) => i == "Clover").length;
      const toPull: Item[] = items.filter(
        (i) =>
          this.lyrndCostume.includes(i) ||
          i == this.deck ||
          i == this.transparentPants
      );

      const turns = this.getEstimatedTurns(assumeUnstarted, clovers, items);

      const path = new PossiblePathExtra(turns);

      for (let clover = 0; clover < clovers; clover++) {
        path.add(ResourceCategory.CLOVER);
      }

      for (const item of toPull) {
        path.addPull(item);

        if (!assumeUnstarted && availableAmount(item) > 0) {
          path.addUsed(ResourceCategory.PULL);
        }
      }

      for (const item of items) {
        path.equips.push(item);
      }

      paths.push(path);
    }

    this.paths = paths;
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  getEstimatedTurns(
    assumeUnstarted: boolean,
    clovers: number,
    item: Item[]
  ): number {
    let estimatedFires = 2;
    const lynyrdScares =
      3 + this.lyrndCostume.filter((i) => item.includes(i)).length * 5; // Do calcs without musk
    let sleazeScares =
      (availableAmount(this.sweatpants) > 0 ? 120 : 0) +
      item
        .map(
          (i) =>
            i != this.sweatpants &&
            numericModifier(i, "Sleaze Damage") +
              numericModifier(i, "Sleaze Spell Damage")
        )
        .reduce((p, n) => p + n, 0);

    sleazeScares = Math.floor(Math.pow(sleazeScares, 0.5));
    // Assume we're running -20 so 65% chance of a combat
    let ncModifier = 0;
    // Minus 20 for skills
    ncModifier += 20;
    // Minus 5 if we're not wearing lynrd cap and can wear -5 hat
    if (
      !item.includes(this.lyrndHat) &&
      availableAmount(this.vipInvitation) > 0
    ) {
      ncModifier += 5;
    }
    // Minus 10 if we're not wearing sleaze deck and have umbrella
    if (!item.includes(this.deck) && availableAmount(this.umbrella) > 0) {
      ncModifier += 10;
    }
    // Cap it
    if (ncModifier > 25) {
      ncModifier = 25 + (ncModifier - 25) / 5;
    }

    let toScare = assumeUnstarted
      ? 80
      : Math.max(0, this.getProtestersRemaining());

    const ncs: (() => number)[] = [
      () => sleazeScares,
      () => {
        return estimatedFires-- > 0 ? 10 : 3;
      },
      () => lynyrdScares,
    ];
    // 1.5 instead of 1 for bad luck
    const ncEveryXTurns = Math.ceil(1.5 / (1 - (85 - ncModifier) / 100));
    let turnsTaken = 0;

    for (let c = 0; c < clovers; c++) {
      toScare -= Math.max(sleazeScares, lynyrdScares + 3); // 3 cos I assume we have musk
      turnsTaken++;
    }

    let turnsToNC = ncEveryXTurns;
    let nc = 0;
    while (toScare > 0) {
      turnsToNC--;
      turnsTaken++;

      if (turnsToNC <= 0) {
        toScare -= ncs[nc++ % 3]();
        turnsToNC = ncEveryXTurns;
      } else {
        toScare -= 1.1; // Assume cig lighter
      }
    }

    return turnsTaken;
  }

  isReady(): boolean {
    return (
      getProperty("questL11Ron") == "started" ||
      getProperty("questL11Ron") == "step1" ||
      toInt(getProperty("zeppelinProtestors")) <= 80
    );
  }

  waitingForShirt(): boolean {
    return (
      !haveSkill(this.torsoAwareness) &&
      (gnomadsAvailable() ||
        (availableAmount(this.spoon) > 0 &&
          getMoonZone(GreySettings.greyTuneMoonSpoon) == "Gnomad" &&
          getProperty("moonTuned") != "true"))
    );
  }

  getId(): QuestType {
    return "Council / MacGruffin / Ron / Crowd";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL11Ron");

    if (status > 1) {
      return QuestStatus.COMPLETED;
    }

    if (status < 0) {
      return QuestStatus.NOT_READY;
    }

    if (!GreySettings.isHardcoreMode() && this.waitingForShirt()) {
      return QuestStatus.NOT_READY;
    }

    if (
      availableAmount(this.sweatpants) + equippedAmount(this.sweatpants) > 0 &&
      toInt(getProperty("sweat")) < 95
    ) {
      return QuestStatus.NOT_READY;
    }

    if (gnomadsAvailable() && !haveSkill(this.torsoAwareness)) {
      return QuestStatus.NOT_READY;
    }

    // If we don't have max flaming boozes
    if (getQuestStatus("questL11Shen") <= 6) {
      return QuestStatus.NOT_READY;
    }

    if (
      !haveSkill(this.sleazeSkill2) &&
      availableAmount(this.starChart) == 0 &&
      !GreySettings.shouldAvoidTowerRequirements()
    ) {
      return QuestStatus.NOT_READY;
    }

    if (
      !haveSkill(this.smutSleazeSkill) &&
      getQuestStatus("questL09Topping") < 1
    ) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  getLynyrdScares(): number {
    return (
      3 +
      (availableAmount(this.musk) + haveEffect(this.musky) > 0 ? 3 : 0) +
      this.lyrndCostume.filter((i) => availableAmount(i) > 0).length * 5
    );
  }

  getSleazeScares(): number {
    return Math.floor(
      Math.pow(
        this.sleazeEquips
          .map((i) =>
            availableAmount(i) == 0 || equippedAmount(i) > 0
              ? 0
              : numericModifier(i, "Sleaze Damage") +
                numericModifier(i, "Sleaze Spell Damage")
          )
          .reduce(
            (p, n) => p + n,
            numericModifier("Sleaze Damage") +
              numericModifier("Sleaze Spell Damage")
          ),
        0.5
      )
    );
  }

  runClover(path: PossiblePathExtra): QuestAdventure {
    const runSleaze = this.getSleazeScares() >= this.getLynyrdScares();
    const str = runSleaze
      ? "Sleaze Spell Damage +Sleaze Damage"
      : this.lyrndCostume.map((i) => "+equip " + i).join(" ");
    const outfit = new GreyOutfit(str + " -tie");

    return {
      location: null,
      outfit: outfit,
      run: () => {
        while (
          path.canUse(ResourceCategory.CLOVER) &&
          this.getProtestersRemaining() > 1
        ) {
          const props = new PropertyManager();

          if (runSleaze) {
            props.setChoice(866, 2); // Clover
            props.setChoice(857, 1); // Sleaze
          } else {
            if (!haveEffect(this.musky) && availableAmount(this.musk) > 0) {
              use(this.musk);
            }

            props.setChoice(866, 1); // Clover
            props.setChoice(856, 1); // Scare
          }

          use(this.clover);

          if (!haveEffect(this.lucky)) {
            throw "Expected lucky effect";
          }

          try {
            greyAdv(this.proLoc, outfit);
          } finally {
            props.resetAll();
          }

          if (haveEffect(this.lucky)) {
            throw "Expected not to have lucky effect";
          }

          path.addUsed(ResourceCategory.CLOVER);
        }
      },
    };
  }

  run(path: PossiblePathExtra): QuestAdventure {
    if (path.canUse(ResourceCategory.PULL)) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          for (const item of path.pulls.filter(
            (i) => availableAmount(i) == 0
          )) {
            GreyPulls.tryPull(item);
            path.addUsed(ResourceCategory.PULL);
          }
        },
      };
    }

    if (path.canUse(ResourceCategory.CLOVER) && this.toAbsorb.length == 0) {
      return this.runClover(path);
    }

    // If we can get more than 6
    const lynyrdScares = this.getLynyrdScares();
    // Calculate sleaze scares using our current sleaze stuff, skip equipped items so we can do our baseline
    const sleazeScares = this.getSleazeScares();

    const outfit = new GreyOutfit().setNoCombat().setNoCombat().setItemDrops();

    path.equips.forEach((i) => outfit.addItem(i));

    if (sleazeScares * 2 >= lynyrdScares) {
      outfit.addBonus("+2 sleaze dmg +2 sleaze spell dmg");
    }

    if (
      availableAmount(this.umbrella) > 0 &&
      !path.equips.includes(this.deck)
    ) {
      outfit.addItem(this.umbrella);
    }

    // TODO Run left hand man?

    return {
      location: this.proLoc,
      outfit: outfit,
      olfaction: [this.cultist],
      run: () => {
        const props = new PropertyManager();

        try {
          if (
            lynyrdScares > 3 &&
            haveEffect(this.musky) <= 0 &&
            availableAmount(this.musk) > 0
          ) {
            use(this.musk);
          }

          const doLynrd = lynyrdScares > 3;
          const doSleaze = sleazeScares >= 5;
          const doFire =
            availableAmount(this.flaming) > 0 ||
            sleazeScares + lynyrdScares < 18;

          props.setChoice(856, doLynrd ? 1 : 2); // Lynrd
          props.setChoice(857, doSleaze ? 1 : 2); // Bench warrent
          props.setChoice(858, doFire ? 1 : 2);

          const settings = new AdventureSettings();
          settings.setFinishingBlowMacro(
            new Macro().tryItem(this.cig).step(greyKillingBlow(outfit))
          );
          settings.addNoBanish(this.cultist);
          settings.addNoBanish(Monster.get("Lynyrd Skinner"));

          greyAdv(this.proLoc, outfit, settings);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getProtestersRemaining(): number {
    return 80 - toInt(getProperty("zeppelinProtestors"));
  }

  getLocations(): Location[] {
    return [this.proLoc];
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}
