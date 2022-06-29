import {
  availableAmount,
  Familiar,
  getProperty,
  Item,
  Location,
  toInt,
} from "kolmafia";
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

  level(): number {
    return 12;
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
        greyAdv(this.loc, outfit);
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
