import {
  availableAmount,
  canFaxbot,
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
  Skill,
} from "kolmafia";
import { ResourceCategory } from "../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../typings/TaskInfo";
import { AbsorbsProvider } from "../../utils/GreyAbsorber";
import { greyAdv } from "../../utils/GreyLocations";
import { MoonZone, GreySettings, getMoonZone } from "../../utils/GreySettings";
import { Macro } from "../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export abstract class QuestMoonSignAbsorb
  extends TaskInfo
  implements QuestInfo
{
  spoon: Item = Item.get("hewn moon-rune spoon");
  toAbsorb?: Monster[];
  goose: Familiar = Familiar.get("Grey Goose");
  faxing: PossiblePath;
  ignore: PossiblePath = new PossiblePath(14);
  paths: PossiblePath[];
  abstract monster: Monster;
  abstract location: Location;
  abstract moonZone: MoonZone;

  abstract getId(): QuestType;

  level(): number {
    return 10;
  }

  getAbsorbs(): Monster[] {
    return [this.monster];
  }

  status(path: PossiblePath): QuestStatus {
    if (path == null) {
      return QuestStatus.NOT_READY;
    }

    if (this.toAbsorb.length == 0 || !path.canUse(ResourceCategory.FAXER)) {
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
      this.paths = null;
      return;
    }

    this.paths = [];
    this.faxing = new PossiblePath(1).add(ResourceCategory.FAXER);

    if (!canFaxbot(this.monster)) {
      this.faxing.addIgnored("Fax Machine");
    }

    if (
      !assumeUnstarted &&
      AbsorbsProvider.getReabsorbedMonsters().includes(this.monster)
    ) {
      this.faxing.addUsed(ResourceCategory.FAXER);
    }

    this.paths.push(this.faxing, this.ignore);
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

    return this.moonZone == "Canadia";
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
}
