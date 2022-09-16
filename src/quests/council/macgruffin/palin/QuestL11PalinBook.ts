import {
  availableAmount,
  cliExecute,
  getProperty,
  Item,
  Location,
  Monster,
  myMaxhp,
  myMeat,
  print,
  toInt,
  use,
  visitUrl,
} from "kolmafia";
import { hasNonCombatSkillsReady } from "../../../../GreyAdventurer";
import { restoreHPTo } from "../../../../tasks/TaskMaintainStatus";
import { ResourceCategory } from "../../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../../typings/TaskInfo";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { GreySettings } from "../../../../utils/GreySettings";
import { Macro } from "../../../../utils/MacroBuilder";
import { PropertyManager } from "../../../../utils/Properties";
import {
  getGhostBustingMacro,
  getGhostBustingOutfit,
  isGhostBustingTime,
  shouldAvoidGhosts,
} from "../../../custom/QuestTrapGhost";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11PalinBook extends TaskInfo implements QuestInfo {
  camera: Item = Item.get("Disposable Instant Camera");
  stuntNuts: Item = Item.get("Stunt Nuts");
  talisman: Item = Item.get("Talisman o' Namsilat");
  loveBook1: Item = Item.get('"I Love Me, Vol. I"');
  loveBook2: Item = Item.get('"2 Love Me, Vol. 2"');
  palindome: Location = Location.get("Inside the Palindome");
  ncPhotos: Item[] = [
    "photograph of an ostrich egg",
    "photograph of a red nugget",
    "photograph of God",
  ].map((s) => Item.get(s));
  dogPhoto: Item = Item.get("photograph of a dog");
  bobRace = Monster.get("Bob Racecar");
  raceBob = Monster.get("Racecar Bob");
  drab: Monster = Monster.get("Drab Bard");
  paths: PossiblePath[];

  createPaths(assumeUnused: boolean) {
    this.paths = [new PossiblePath(0).addMeat(1000)];

    if (!assumeUnused && getQuestStatus("questL11Palindome") > 1) {
      return;
    }

    this.paths.push(new PossiblePath(0).add(ResourceCategory.HOT_TUB));
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  getId(): QuestType {
    return "Council / MacGruffin / Palin / Book";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL11Palindome");

    if (status > 1) {
      return QuestStatus.COMPLETED;
    }

    if (
      isGhostBustingTime(this.palindome) &&
      availableAmount(this.talisman) > 0 &&
      !shouldAvoidGhosts()
    ) {
      return QuestStatus.READY;
    }

    if (GreySettings.greySkipPalindome && !this.isFarmDudes()) {
      return QuestStatus.COMPLETED;
    }

    if (
      myMeat() < 1000 ||
      availableAmount(this.talisman) == 0 ||
      status < 0 ||
      (this.needDogPhoto() && availableAmount(this.camera) == 0)
    ) {
      return QuestStatus.NOT_READY;
    }

    if (!hasNonCombatSkillsReady()) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  needDogPhoto(): boolean {
    return availableAmount(this.dogPhoto) == 0;
  }

  isFarmDudes(): boolean {
    return (
      availableAmount(this.stuntNuts) == 0 ||
      this.needDogPhoto() ||
      this.ncPhotos.filter((i) => availableAmount(i) == 0).length > 0 ||
      availableAmount(this.loveBook1) == 0
    );
  }

  run(path: PossiblePath): QuestAdventure {
    // Workaround for some weird bug I had
    if (
      availableAmount(this.loveBook1) == 0 &&
      toInt(getProperty("palindomeDudesDefeated")) >= 5
    ) {
      cliExecute("refresh inventory");
    }

    if (this.isFarmDudes()) {
      return this.farmDudes();
    }

    return this.turnInStuff(path);
  }

  turnInStuff(path: PossiblePath): QuestAdventure {
    return {
      location: null,
      outfit: new GreyOutfit().addItem(this.talisman),
      run: () => {
        use(this.loveBook1);
        visitUrl("place.php?whichplace=palindome&action=pal_drlabel");
        visitUrl(
          "choice.php?pwd=&whichchoice=872&option=1&photo1=2259&photo2=7264&photo3=7263&photo4=7265"
        );

        if (path.canUse(ResourceCategory.HOT_TUB)) {
          cliExecute("hottub");
          path.addUsed(ResourceCategory.HOT_TUB);
        } else {
          restoreHPTo(Math.min(myMaxhp(), 120));
        }

        use(this.loveBook2);
        visitUrl("place.php?whichplace=palindome&action=pal_mroffice");
      },
    };
  }

  farmDudes(): QuestAdventure {
    const outfit = isGhostBustingTime(this.palindome)
      ? getGhostBustingOutfit()
      : new GreyOutfit();

    if (availableAmount(this.stuntNuts) == 0) {
      outfit.setItemDrops();
    }

    if (this.ncPhotos.filter((i) => availableAmount(i) == 0).length > 0) {
      outfit.setNoCombat();
    }

    const orbs: Monster[] = [];

    if (toInt(getProperty("palindomeDudesDefeated")) < 5) {
      orbs.push(this.drab);
      orbs.push(this.bobRace);
      orbs.push(this.raceBob);
    } else if (this.needDogPhoto()) {
      orbs.push(this.bobRace);
      orbs.push(this.raceBob);
    }

    // No NCs to be hit other than quest so no need to +combat

    outfit.addItem(this.talisman);

    return {
      outfit: outfit,
      location: this.palindome,
      orbs: orbs,
      freeRun: (monster) => !orbs.includes(monster),
      run: () => {
        let macro: Macro = null;

        if (isGhostBustingTime(this.palindome)) {
          macro = getGhostBustingMacro();
        } else if (this.needDogPhoto()) {
          macro = new Macro()
            .if_(this.bobRace, Macro.tryItem(this.camera))
            .if_(this.raceBob, Macro.tryItem(this.camera));
        }

        const settings = new AdventureSettings().setStartOfFightMacro(macro);
        settings.addBanish(Monster.get("Evil Olive"));
        settings.addBanish(Monster.get("Flock of Stab-bats"));
        settings.addBanish(Monster.get("Taco Cat"));
        settings.addBanish(Monster.get("Tan Gnat"));

        const props = new PropertyManager();
        props.setChoice(129, 1);
        props.setChoice(873, 1);

        try {
          greyAdv(this.palindome, outfit, settings);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.palindome];
  }

  free(): boolean {
    return !this.isFarmDudes();
  }

  mustBeDone(reallyMustBeDone: boolean): boolean {
    if (!this.isFarmDudes()) {
      return true;
    }

    if (reallyMustBeDone) {
      return false;
    }

    return isGhostBustingTime(this.palindome);
  }

  canAcceptPrimes(): boolean {
    return this.isFarmDudes();
  }
}
