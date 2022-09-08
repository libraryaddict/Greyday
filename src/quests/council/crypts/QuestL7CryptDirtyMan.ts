import {
  Familiar,
  getProperty,
  haveSkill,
  Location,
  Monster,
  myFamiliar,
  Skill,
  toInt,
} from "kolmafia";
import { ResourceCategory } from "../../../typings/ResourceTypes";
import { PossiblePath } from "../../../typings/TaskInfo";
import { AbsorbsProvider } from "../../../utils/GreyAbsorber";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { Macro } from "../../../utils/MacroBuilder";
import { PropertyManager } from "../../../utils/Properties";
import { QuestAdventure, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { CryptL7Template } from "./CryptTemplate";

export class CryptL7DirtyMan extends CryptL7Template {
  loc: Location = Location.get("The Defiled Niche");
  sniffer: Familiar = Familiar.get("Nosy Nose");
  dirty: Monster = Monster.get("dirty old lihc");
  sniff: Skill = Skill.get("Get a Good Whiff of This Guy");
  banisher: Skill = Skill.get("System Sweep");
  spray: PossiblePath = new PossiblePath(8).add(
    ResourceCategory.FIRE_EXTINGUSHER_ZONE
  );
  nonSpray: PossiblePath = new PossiblePath(16);
  paths: PossiblePath[] = [];
  advsAbsorb: Monster = Monster.get("basic lihc");

  createPaths(assumeUnused: boolean) {
    this.paths = [];

    const evilRemaining =
      (assumeUnused || getProperty("questL07Cyrptic") == "unstarted"
        ? 50
        : toInt(getProperty(this.getProperty()))) - 25;

    // Need to do this better, with actual math for retro/gravy
    this.nonSpray = new PossiblePath(Math.ceil(evilRemaining / 2));

    if (assumeUnused || getProperty("fireExtinguisherCyrptUsed") != "true") {
      this.spray = new PossiblePath(Math.ceil((evilRemaining - 10) / 2)).add(
        ResourceCategory.FIRE_EXTINGUSHER_ZONE
      );

      this.paths.push(this.spray);
    }

    this.paths.push(this.nonSpray);
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  run(path: PossiblePath): QuestAdventure {
    const outfit = this.addRetroSword();

    if (path.canUse(ResourceCategory.FIRE_EXTINGUSHER_ZONE)) {
      path.getResource(ResourceCategory.FIRE_EXTINGUSHER_ZONE).prepare(outfit);
    }

    const fam = null;
    /*  toInt(getProperty(this.getProperty())) >
      (getProperty("nosyNoseMonster") != "dirty old lihc" ? 31 : 27)
        ? this.sniffer
        : null;*/

    return {
      familiar: fam,
      location: this.loc,
      outfit: outfit,
      olfaction: [this.dirty],
      run: () => {
        this.adjustRetroCape();

        let avoid: Macro;

        if (path.canUse(ResourceCategory.FIRE_EXTINGUSHER_ZONE)) {
          // If its a dirty lich, don't spray down
          avoid = Macro.ifNot_(
            this.dirty,
            path.getResource(ResourceCategory.FIRE_EXTINGUSHER_ZONE).macro()
          );

          if (
            !AbsorbsProvider.getReabsorbedMonsters().includes(this.advsAbsorb)
          ) {
            avoid = Macro.ifNot_(this.advsAbsorb, avoid);
          }
        }

        let start: Macro;

        if (
          myFamiliar() == fam &&
          getProperty("nosyNoseMonster") != "dirty old lihc"
        ) {
          start = Macro.step("if monsterid 1071;skill 7166;endif");

          if (avoid != null) {
            start = start.step(avoid);
          }
        } else if (avoid != null) {
          start = avoid;
        }

        const props = new PropertyManager();
        props.setChoice(157, 4);

        try {
          greyAdv(
            this.loc,
            outfit,
            new AdventureSettings()
              .addNoBanish(this.dirty)
              .setStartOfFightMacro(start)
          );
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getProperty(): string {
    return "cyrptNicheEvilness";
  }

  cryptStatus(): QuestStatus {
    if (!haveSkill(this.banisher)) {
      // return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  getId(): QuestType {
    return "Council / Crypt / DirtyMan";
  }

  getLocations(): Location[] {
    return [this.loc];
  }
}
