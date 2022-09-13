import {
  Monster,
  Location,
  Familiar,
  familiarWeight,
  currentRound,
  handlingChoice,
  Skill,
  toBoolean,
  getProperty,
  gnomadsAvailable,
  Item,
  availableAmount,
  haveSkill,
} from "kolmafia";
import { hasNonCombatSkillActive } from "../../GreyAdventurer";
import { ResourceCategory } from "../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../typings/TaskInfo";
import { AbsorbsProvider } from "../../utils/GreyAbsorber";
import { greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { GreySettings } from "../../utils/GreySettings";
import { currentPredictions } from "../../utils/GreyUtils";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestAbsorbIrateMariachi extends TaskInfo implements QuestInfo {
  irateMariachi: Monster = Monster.get("Irate Mariachi");
  familiar: Familiar = Familiar.get("Grey Goose");
  fax: PossiblePath = new PossiblePath(1).addFax(this.irateMariachi);
  avoid: PossiblePath = new PossiblePath(10);
  manual: PossiblePath = new PossiblePath(0);
  paths: PossiblePath[];
  combatSkill: Skill = Skill.get("Piezoelectric Honk");
  ncItems: Item[] = [
    "Silent beret",
    "Xiblaxian stealth cowl",
    "protonic accelerator pack",
  ].map((s) => Item.get(s));
  combatHat: Item = Item.get("sombrero-mounted sparkler");
  player: Item = Item.get("portable cassette player");
  thermal: Item = Item.get("thermal blanket");
  shirt: Item = Item.get("&quot;Remember the Trees&quot; Shirt");
  loc: Location = Location.get("South of The Border");
  ball: Item = Item.get("miniature crystal ball");
  toAbsorb: Monster[];

  createPaths(assumeUnstarted: boolean) {
    this.paths = [];
    this.paths.push(this.fax, this.avoid);

    if (
      this.getExpectedTurns(this.getPossibleCombats(false, assumeUnstarted)) <
      10
    ) {
      this.paths.push(this.manual);
    }
  }

  getExpectedTurns(combatRate: number): number {
    // Base combat rate is 50
    const monsters = 5;
    const hasOrb = availableAmount(this.ball) > 0;

    // We're starting off by assuming we have no banishes, cos I'm lazy
    let turns = monsters;

    if (hasOrb) {
      turns /= 2;
    }

    // Now we add the combat rate. Default is 50/50 chance
    // So 50 is 200% turns
    // 75 is 133% turns
    // 100 is 100% turns
    const turnsMult = 100 / (50 + combatRate);

    return Math.ceil(turns * turnsMult);
  }

  getPossibleCombats(current: boolean, assumeUnstarted: boolean): number {
    let combat = 10; // Start off with skill

    if (!current && !toBoolean(getProperty("_fireworksShopHatBought"))) {
      if (this.ncItems.find((i) => availableAmount(i) > 0) != null) {
        combat += 5; // We buy the hat
      }
    } else if (availableAmount(this.combatHat) > 0) {
      combat += 5;
    }

    if (
      availableAmount(this.thermal) > 0 ||
      (!current && toBoolean(getProperty("hasMaydayContract")))
    ) {
      combat += 5; // Cape
    }

    if (
      current
        ? availableAmount(this.shirt) > 0
        : !GreySettings.isHardcoreMode() &&
          (gnomadsAvailable() ||
            GreySettings.willBeAccessible("Gnomad", assumeUnstarted))
    ) {
      combat += 5; // Shirt
    }

    if (
      current
        ? availableAmount(this.player) > 0
        : !GreySettings.isHardcoreMode()
    ) {
      combat += 5; // Portable cassette player
    }

    if (combat > 25) {
      return 25 + Math.round((combat - 25) / 5);
    }

    return combat;
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  getId(): QuestType {
    return "Absorbs / Irate Mariachi";
  }

  level(): number {
    return 18;
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  status(path: PossiblePath): QuestStatus {
    if (AbsorbsProvider.getReabsorbedMonsters().includes(this.irateMariachi)) {
      return QuestStatus.COMPLETED;
    }

    if (path == null) {
      return QuestStatus.NOT_READY;
    }

    if (path != this.manual && !path.canUse(ResourceCategory.FAXER)) {
      return QuestStatus.COMPLETED;
    }

    if (
      familiarWeight(this.familiar) < 6 ||
      familiarWeight(this.familiar) > 8
    ) {
      return QuestStatus.NOT_READY;
    }

    if (path == this.manual) {
      if (!haveSkill(this.combatSkill)) {
        return QuestStatus.NOT_READY;
      }

      if (hasNonCombatSkillActive()) {
        return QuestStatus.NOT_READY;
      }

      if (availableAmount(this.ball) > 0) {
        const mon = currentPredictions().get(this.loc);

        if (mon != null && !this.toAbsorb.includes(mon)) {
          return QuestStatus.NOT_READY;
        }
      }

      const turns = this.getExpectedTurns(this.getPossibleCombats(true, false));

      if (turns > 8) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    }

    return QuestStatus.FASTER_LATER;
  }

  run(path: PossiblePath): QuestAdventure {
    if (path == this.manual) {
      const outfit = new GreyOutfit().setPlusCombat().setPlusCombat();

      return {
        location: this.loc,
        outfit: outfit,
        freeRun: (monster) => monster != this.irateMariachi,
        run: () => {
          greyAdv(this.loc, outfit);
        },
      };
    }

    return this.runFax(path);
  }

  runFax(path: PossiblePath): QuestAdventure {
    const resource = path.getResource(ResourceCategory.FAXER);

    return {
      location: null,
      outfit: null,
      familiar: this.familiar,
      disableFamOverride: true,
      run: () => {
        resource.fax(this.irateMariachi);

        greyAdv(null);

        if (handlingChoice() || currentRound() != 0) {
          throw "We're supposed to be done with this fight!";
        }
      },
    };
  }

  getAbsorbs(): Monster[] {
    return [this.irateMariachi];
  }
}
