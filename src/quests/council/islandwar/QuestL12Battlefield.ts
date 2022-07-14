import {
  availableAmount,
  Familiar,
  familiarWeight,
  getProperty,
  Item,
  Location,
  print,
  toInt,
  useFamiliar,
} from "kolmafia";
import { DelayBurners } from "../../../iotms/delayburners/DelayBurners";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { GreySettings } from "../../../utils/GreySettings";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL12Battlefield implements QuestInfo {
  loc: Location = Location.get("The Battlefield (Frat Uniform)");
  pole: Item = Item.get("eleven-foot pole");
  ring: Item = Item.get("ring of Detect Boring Doors");
  picklocks: Item = Item.get("Pick-O-Matic lockpicks");
  fam: Familiar = Familiar.get("Gelatinous Cubeling");
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

    let defeated = this.getHippiesDefeated();

    if (defeated >= 64 && !this.isFilthyDone()) {
      return QuestStatus.NOT_READY;
    }

    if (defeated >= 192 && !this.isNunsDone()) {
      return QuestStatus.NOT_READY;
    }

    if (defeated >= 1000) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  getId(): QuestType {
    return "Council / War / Battlefield";
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();
    outfit.addItem(Item.get("Beer Helmet"));
    outfit.addItem(Item.get("distressed denim pants"));
    outfit.addItem(Item.get("bejeweled pledge pin"));

    let fam: Familiar = null;

    if (
      !GreySettings.shouldAvoidTowerRequirements() &&
      (availableAmount(this.pole) == 0 ||
        availableAmount(this.ring) == 0 ||
        availableAmount(this.picklocks) == 0)
    ) {
      fam = this.fam;
    }

    return {
      outfit: outfit,
      location: this.loc,
      familiar: fam,
      disableFamOverride: fam != null,
      run: () => {
        let fam = Familiar.get("Grey Goose");

        DelayBurners.tryReplaceCombats();

        if (DelayBurners.isTryingForDupeableGoblin()) {
          useFamiliar(fam);
        }

        greyAdv(this.loc, outfit);

        let turns = Math.ceil(
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
