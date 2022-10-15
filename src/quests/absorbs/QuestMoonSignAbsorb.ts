import {
  availableAmount,
  canadiaAvailable,
  currentRound,
  Familiar,
  familiarWeight,
  getProperty,
  gnomadsAvailable,
  handlingChoice,
  Item,
  knollAvailable,
  Location,
  Monster,
  mySign,
  Skill,
} from "kolmafia";
import { ResourceCategory } from "../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../typings/TaskInfo";
import { AbsorbsProvider } from "../../utils/GreyAbsorber";
import { greyAdv } from "../../utils/GreyLocations";
import {
  MoonZone,
  GreySettings,
  getMoonZone,
  MoonSign,
} from "../../utils/GreySettings";
import { Macro } from "../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export abstract class QuestMoonSignAbsorb
  extends TaskInfo
  implements QuestInfo
{
  spoon: Item = Item.get("hewn moon-rune spoon");
  goose: Familiar = Familiar.get("Grey Goose");
  paths: PossiblePath[];
  abstract monster: Monster;
  abstract location: Location;
  abstract moonZone: MoonZone;

  abstract getId(): QuestType;

  level(): number {
    if (
      this.isInSign() &&
      GreySettings.canMoonSpoon() &&
      getMoonZone() != "Gnomad" &&
      getMoonZone(GreySettings.greyTuneMoonSpoon) == "Gnomad"
    ) {
      return 6;
    }

    return this.isInSign() ? 12 : 16;
  }

  getAbsorbs(): Monster[] {
    return [this.monster];
  }

  status(path: PossiblePath): QuestStatus {
    if (path == null) {
      return QuestStatus.NOT_READY;
    }

    if (AbsorbsProvider.getReabsorbedMonsters().includes(this.monster)) {
      return QuestStatus.COMPLETED;
    }

    // If we're not in the moon sign
    if (!this.isInSign()) {
      // If we will be in the sign eventually
      if (this.willMoonTune(false)) {
        return QuestStatus.NOT_READY;
      }

      // If we will not be in the sign eventually and can't hit this monster
      if (!path.canUse(ResourceCategory.FAXER)) {
        return QuestStatus.COMPLETED;
      }
    } else if (getProperty("moonTuned") == "true") {
      // If we've tuned to this sign, don't bother handling this like a quest
      return QuestStatus.COMPLETED;
    }

    if (familiarWeight(this.goose) < 6) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.FASTER_LATER;
  }

  run(path?: PossiblePath): QuestAdventure {
    if (path != null && path.canUse(ResourceCategory.FAXER)) {
      const resource = path.getResource(ResourceCategory.FAXER);

      return {
        location: null,
        outfit: null,
        familiar: this.goose,
        disableFamOverride: true,
        run: () => {
          resource.fax(this.monster);

          Macro.trySkill(Skill.get("Re-Process Matter"))
            .trySkillRepeat(Skill.get("Infinite Loop"))
            .submit();

          if (handlingChoice() || currentRound() != 0) {
            throw "We're supposed to be done with this fax fight!";
          }
        },
      };
    }

    return {
      location: this.location,
      orbs: [this.monster],
      freeRun: (monster) => monster != this.monster,
      run: () => {
        greyAdv(this.location);
      },
    };
  }

  getLocations(): Location[] {
    return [this.location];
  }

  createPaths(assumeUnstarted: boolean): void {
    if (this.isInSign() || this.willMoonTune(assumeUnstarted)) {
      this.paths = [new PossiblePath(3)];
      return;
    }

    this.paths = [];
    const faxing = new PossiblePath(1);

    if (
      assumeUnstarted ||
      !AbsorbsProvider.getReabsorbedMonsters().includes(this.monster)
    ) {
      faxing.addFax(this.monster);
    }

    this.paths.push(faxing, new PossiblePath(14));
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  isInSign(): boolean {
    if (knollAvailable()) {
      return this.moonZone == "Knoll";
    }

    if (gnomadsAvailable()) {
      return this.moonZone == "Gnomad";
    }

    if (canadiaAvailable()) {
      return this.moonZone == "Canadia";
    }

    return false;
  }

  willMoonTune(assumeUnstarted: boolean): boolean {
    if (availableAmount(this.spoon) == 0) {
      return false;
    }

    if (getProperty("moonTuned") == "true" && !assumeUnstarted) {
      return false;
    }

    return getMoonZone(GreySettings.greyTuneMoonSpoon) == this.moonZone;
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}
