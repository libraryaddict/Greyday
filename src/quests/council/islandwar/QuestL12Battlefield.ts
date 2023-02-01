import {
  availableAmount,
  Familiar,
  familiarWeight,
  getProperty,
  haveFamiliar,
  Item,
  Location,
  print,
  toInt,
  useFamiliar,
} from "kolmafia";
import { DelayBurners } from "../../../iotms/delayburners/DelayBurners";
import { DelayBurningKramco } from "../../../iotms/delayburners/DelayBurningKramco";
import { AbsorbsProvider } from "../../../utils/GreyAbsorber";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { GreySettings } from "../../../utils/GreySettings";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL12Battlefield implements QuestInfo {
  loc: Location = Location.get("The Battlefield (Frat Uniform)");
  pole: Item = Item.get("eleven-foot pole");
  ring: Item = Item.get("ring of Detect Boring Doors");
  picklocks: Item = Item.get("Pick-O-Matic lockpicks");
  gelCube: Familiar = Familiar.get("Gelatinous Cubeling");
  jellyfish: Familiar = Familiar.get("Space Jellyfish");
  goose: Familiar = Familiar.get("Grey Goose");
  orchadAt: number = 64;
  nunsAt: number = 192;

  level(): number {
    return 12;
  }

  getDefeatedEachTurn(): number {
    let defeated = 1;

    if (getProperty("sidequestArenaCompleted") == "fratboy") {
      defeated *= 2;
    }

    if (getProperty("sidequestJunkyardCompleted") == "fratboy") {
      defeated *= 2;
    }

    if (getProperty("sidequestJunkyardCompleted") == "fratboy") {
      defeated *= 2;
    }

    if (getProperty("sidequestNunsCompleted") == "fratboy") {
      defeated *= 2;
    }

    if (getProperty("sidequestOrchardCompleted") == "fratboy") {
      defeated *= 2;
    }

    if (getProperty("sidequestFarmCompleted") == "fratboy") {
      defeated *= 2;
    }

    return defeated;
  }

  status(): QuestStatus {
    if (
      !this.isArenaDone() ||
      !this.isLobsterDone() ||
      !this.isGremlinsDone()
    ) {
      return QuestStatus.NOT_READY;
    }

    if (getProperty("warProgress") == "finished") {
      return QuestStatus.COMPLETED;
    }

    const defeated = this.getHippiesDefeated();

    if (defeated >= 64 && !this.isFilthyDone()) {
      return QuestStatus.NOT_READY;
    }

    if (defeated >= 192 && !this.isNunsDone()) {
      return QuestStatus.NOT_READY;
    }

    if (defeated >= 1000) {
      return QuestStatus.COMPLETED;
    }

    if (
      getQuestStatus("questL11Pyramid") == 3 &&
      getProperty("pyramidBombUsed") == "true"
    ) {
      return QuestStatus.READY;
    }

    return QuestStatus.FASTER_LATER;
  }

  getId(): QuestType {
    return "Council / War / Battlefield";
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit();
    outfit.addWeight(Item.get("Beer Helmet"));
    outfit.addWeight(Item.get("distressed denim pants"));
    outfit.addWeight(Item.get("bejeweled pledge pin"));

    let fam: Familiar = null;

    if (
      haveFamiliar(this.gelCube) &&
      (availableAmount(this.pole) == 0 ||
        availableAmount(this.ring) == 0 ||
        availableAmount(this.picklocks) == 0)
    ) {
      fam = this.gelCube;
    } else if (
      haveFamiliar(this.jellyfish) &&
      (!GreySettings.greyPrepareLevelingResources ||
        familiarWeight(this.goose) >= 20 ||
        AbsorbsProvider.remainingAdvAbsorbs == null ||
        AbsorbsProvider.remainingAdvAbsorbs.length > 3)
    ) {
      fam = this.jellyfish;
    }

    return {
      outfit: outfit,
      location: this.loc,
      familiar: fam,
      disableFamOverride: fam == this.gelCube,
      mayFreeRun: false,
      run: () => {
        if (fam == null && familiarWeight(this.goose) >= 6) {
          const burner = DelayBurners.getReadyDelayBurner();

          if (burner != null && burner instanceof DelayBurningKramco) {
            burner.doFightSetup();
          }

          if (DelayBurners.isTryingForDupeableGoblin()) {
            useFamiliar(this.goose);
          }
        }

        greyAdv(this.loc, outfit);

        const turns = Math.ceil(
          (1000 - this.getHippiesDefeated()) / this.getDefeatedEachTurn()
        );

        if (turns > 0) {
          print(
            `${turns} turn${
              turns == 1 ? "" : "s"
            } until the battlefield is cleared at current sidequest completion.`,
            "blue"
          );
        } else {
          print(
            "Battlefield has been cleared! Hipster boss spotted eating BBQ'd sushi before it's cool! This enrages you!",
            "blue"
          );
        }
      },
    };
  }

  getHippiesDefeated(): number {
    return toInt(getProperty("hippiesDefeated"));
  }

  isGremlinsDone() {
    return getProperty("sidequestJunkyardCompleted") != "none";
  }

  isArenaDone() {
    return getProperty("sidequestArenaCompleted") != "none";
  }

  isLobsterDone() {
    return getProperty("sidequestLighthouseCompleted") != "none";
  }

  isFilthyDone() {
    return getProperty("sidequestOrchardCompleted") != "none";
  }

  isNunsDone() {
    return getProperty("sidequestNunsCompleted") != "none";
  }
}
