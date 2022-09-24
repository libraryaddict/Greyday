import {
  availableAmount,
  Effect,
  Element,
  Familiar,
  getProperty,
  haveEffect,
  haveFamiliar,
  haveSkill,
  Item,
  Location,
  Monster,
  numericModifier,
  Skill,
  toInt,
  totalTurnsPlayed,
  use,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import { hasNonCombatSkillsReady } from "../../../GreyAdventurer";
import {
  AdventureSettings,
  greyAdv,
  setPrimedResource,
} from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { AbsorbsProvider } from "../../../utils/GreyAbsorber";
import {
  currentPredictions,
  getAllCombinations,
} from "../../../utils/GreyUtils";
import { PossiblePath, TaskInfo } from "../../../typings/TaskInfo";
import { ResourceCategory } from "../../../typings/ResourceTypes";

export class QuestManorBillards extends TaskInfo implements QuestInfo {
  billards: Location = Location.get("The Haunted Billiards Room");
  chalk: Item = Item.get("Handful of hand chalk");
  chalkEffect: Effect = Effect.get("Chalky Hand");
  key: Item = Item.get("[7302]Spookyraven library key");
  cue: Item = Item.get("pool cue");
  poolgeist: Monster = Monster.get("pooltergeist");
  ghost: Monster = Monster.get("Chalkdust wraith");
  hardening: Skill = Skill.get("Subatomic Hardening");
  lefthandMan: Familiar = Familiar.get("Left-Hand Man");
  umbrella: Item = Item.get("Unbreakable Umbrella");
  toAbsorb: Monster[];
  elementalSkills: Skill[];
  paths: PossiblePath[];

  constructor() {
    super();

    this.elementalSkills = AbsorbsProvider.loadAbsorbs()
      .map((a) =>
        a.skill == null
          ? null
          : [
              a.skill,
              Element.all()
                .map((e) => numericModifier(a.skill, e + " Damage"))
                .reduce((p, n) => p + n, 0),
            ]
      )
      .filter((pair) => pair != null)
      .map(([p]) => p) as Skill[];
  }

  createPaths(assumeUnstarted: boolean): void {
    this.paths = [];

    const combos: [ResourceCategory, number][] = [];
    const ncsNeeded = assumeUnstarted || availableAmount(this.cue) == 0 ? 2 : 1;

    for (let t = 0; t < ncsNeeded; t++) {
      combos.push([null, 5]);
      combos.push([ResourceCategory.FORCE_NC, 1]);
    }

    for (const combination of getAllCombinations(combos)) {
      if (combination.length != ncsNeeded) {
        continue;
      }

      const path = new PossiblePath(
        combination.map(([, t]) => t).reduce((p, v) => p + v, 0)
      );

      for (const [res] of combination) {
        if (res == null) {
          continue;
        }

        path.add(res);
      }

      this.paths.push(path);
    }
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  getId(): QuestType {
    return "Manor / Billards";
  }

  level(): number {
    return 8;
  }

  attemptPrime(path: PossiblePath): boolean {
    if (!path.canUse(ResourceCategory.FORCE_NC)) {
      return false;
    }

    if (availableAmount(this.chalk) == 0 && haveEffect(this.chalkEffect) <= 1) {
      return false;
    }

    if (!haveSkill(this.hardening) || this.toAbsorb.length > 0) {
      return false;
    }

    const lightsOut = totalTurnsPlayed() % 37;

    if (lightsOut == 0 || lightsOut >= 34) {
      return false;
    }

    setPrimedResource(this, path, path.getResource(ResourceCategory.FORCE_NC));

    return true;
  }

  status(path: PossiblePath): QuestStatus {
    const status = getQuestStatus("questM20Necklace");

    if (status < 1) {
      return QuestStatus.NOT_READY;
    }

    if (status > 2 || availableAmount(this.key) > 0) {
      return QuestStatus.COMPLETED;
    }

    if (path != null && path.canUse(ResourceCategory.FORCE_NC)) {
      if (path.getResource(ResourceCategory.FORCE_NC).primed()) {
        return QuestStatus.READY;
      }

      if (this.toAbsorb.length == 0 && haveSkill(this.hardening)) {
        return QuestStatus.NOT_READY;
      }
    }

    if (!hasNonCombatSkillsReady(false)) {
      return QuestStatus.NOT_READY;
    }

    if (!hasNonCombatSkillsReady()) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(path: PossiblePath): QuestAdventure {
    const outfit = new GreyOutfit();
    let primed = path.getResource(ResourceCategory.FORCE_NC);

    if (primed != null && !primed.primed()) {
      primed = null;
    }

    const orbs: Monster[] = [];

    if (primed == null) {
      if (
        availableAmount(this.cue) == 0 ||
        haveEffect(this.chalkEffect) > 0 ||
        availableAmount(this.chalk) > 0 ||
        toInt(getProperty("poolSkill")) < 2
      ) {
        outfit.setNoCombat().setNoCombat();
      }

      if (this.elementalSkills.find((s) => haveSkill(s)) == null) {
        outfit.addBonus("+10 elemental dmg 1 min 1 max");
      }

      if (
        this.toAbsorb.includes(this.ghost) ||
        (availableAmount(this.chalk) == 0 && haveEffect(this.chalkEffect) <= 1)
      ) {
        orbs.push(this.ghost);
      }

      if (!haveSkill(this.hardening)) {
        orbs.push(this.poolgeist);
      }
    }

    outfit.addItem(this.cue);

    const mustHitGhost =
      this.toAbsorb.includes(this.ghost) ||
      haveEffect(this.chalkEffect) + availableAmount(this.chalk) == 0;

    const fam =
      primed == null &&
      !orbs.includes(currentPredictions().get(this.billards)) &&
      !mustHitGhost &&
      haveFamiliar(this.lefthandMan) &&
      availableAmount(this.cue) > 0 &&
      availableAmount(this.umbrella) > 0
        ? this.lefthandMan
        : null;

    if (fam != null) {
      outfit.addBonus("+switch " + this.lefthandMan);
      outfit.addBonus("+equip " + this.umbrella);
    }

    return {
      outfit: outfit,
      location: this.billards,
      orbs: orbs,
      familiar: fam,
      disableFamOverride: fam != null,
      mayFreeRun: true,
      freeRun: (monster) => !orbs.includes(monster),
      run: () => {
        if (
          availableAmount(this.cue) > 0 &&
          haveEffect(this.chalkEffect) == 0 &&
          availableAmount(this.chalk) > 0
        ) {
          use(this.chalk);
        }

        const settings = new AdventureSettings();

        if (
          availableAmount(this.chalk) == 0 &&
          haveEffect(this.chalkEffect) <= 1 &&
          !this.toAbsorb.includes(this.poolgeist)
        ) {
          settings.addBanish(this.poolgeist);
        }

        const props = new PropertyManager();
        const poolSkill =
          toInt(getProperty("poolSkill")) + numericModifier("pool skill") + 10;

        try {
          props.setChoice(
            875,
            poolSkill >= 14 || haveEffect(this.chalkEffect) == 0 ? 1 : 2
          ); //Fight or train
          greyAdv(this.billards, outfit, settings);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.billards];
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}
