import {
  Location,
  Familiar,
  Item,
  availableAmount,
  Monster,
  myMeat,
  cliExecute,
  itemAmount,
  use,
  visitUrl,
} from "kolmafia";
import { hasNonCombatSkillsReady } from "../../../../GreyAdventurer";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { Macro } from "../../../../utils/MacroBuilder";
import { PropertyManager } from "../../../../utils/Properties";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11PalinBook implements QuestInfo {
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

  getId(): QuestType {
    return "Council / MacGruffin / Palin / Book";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL11Palindome");

    if (status == 100 || status > 1) {
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

  run(): QuestAdventure {
    if (
      availableAmount(this.stuntNuts) == 0 ||
      this.needDogPhoto() ||
      this.ncPhotos.filter((i) => availableAmount(i) == 0).length > 0 ||
      availableAmount(this.loveBook1) == 0
    ) {
      return this.farmDudes();
    }

    return this.turnInStuff();
  }

  turnInStuff(): QuestAdventure {
    return {
      location: null,
      outfit: new GreyOutfit().addItem(this.talisman),
      run: () => {
        use(this.loveBook1);
        visitUrl("place.php?whichplace=palindome&action=pal_drlabel");
        visitUrl(
          "choice.php?pwd=&whichchoice=872&option=1&photo1=2259&photo2=7264&photo3=7263&photo4=7265"
        );
        cliExecute("hottub");

        use(this.loveBook2);
        visitUrl("place.php?whichplace=palindome&action=pal_mroffice");
      },
    };
  }

  farmDudes(): QuestAdventure {
    // Potential banisher
    let outfit = new GreyOutfit();

    if (availableAmount(this.stuntNuts) == 0) {
      outfit.setItemDrops();
    }

    if (this.ncPhotos.filter((i) => availableAmount(i) == 0).length > 0) {
      outfit.setNoCombat();
    }

    // No NCs to be hit other than quest so no need to +combat

    outfit.addItem(this.talisman);

    return {
      outfit: outfit,
      location: this.palindome,
      run: () => {
        let macro: Macro = null;

        if (this.needDogPhoto()) {
          macro = new Macro()
            .if_(this.bobRace, Macro.tryItem(this.camera))
            .if_(this.raceBob, Macro.tryItem(this.camera));
        }

        let settings = new AdventureSettings().setStartOfFightMacro(macro);
        settings.addBanish(Monster.get("Evil Olive"));
        settings.addBanish(Monster.get("Flock of Stab-bats"));
        settings.addBanish(Monster.get("Taco Cat"));
        settings.addBanish(Monster.get("Tan Gnat"));

        let props = new PropertyManager();
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
}
