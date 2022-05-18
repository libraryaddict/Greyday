import {
  availableAmount,
  Familiar,
  getProperty,
  getRelated,
  Item,
  Location,
  retrieveItem,
} from "kolmafia";
import { PropertyManager } from "../../../../utils/Properties";
import { greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestDailyDungeon implements QuestInfo {
  pole: Item = Item.get("eleven-foot pole");
  ring: Item = Item.get("ring of Detect Boring Doors");
  picklocks: Item = Item.get("Pick-O-Matic lockpicks");
  keys: Item[] = ["Boris's key", "Sneaky Pete's key", "Jarlsberg's key"].map(
    (s) => Item.get(s)
  );
  zappables: Item[] = [];
  location: Location = Location.get("The Daily Dungeon");
  fam: Familiar = Familiar.get("Gelatinous Cubeling");

  getLocations(): Location[] {
    return [this.location];
  }

  constructor() {
    for (let i of this.keys) {
      Object.keys(getRelated(i, "zap")).forEach((s) => {
        let i = Item.get(s);

        if (this.zappables.includes(i)) {
          return;
        }

        this.zappables.push(i);
      });
    }
  }

  isDailyDoneToday() {
    return getProperty("dailyDungeonDone") == "true";
  }

  hasFamiliarRecommendation(): Familiar {
    if (
      availableAmount(this.pole) > 0 &&
      availableAmount(this.ring) > 0 &&
      availableAmount(this.picklocks) > 0
    ) {
      return null;
    }

    return this.fam;
  }

  level(): number {
    return 7;
  }

  status(): QuestStatus {
    if (getQuestStatus("questL13Final") > 5 || this.isDailyDoneToday()) {
      return QuestStatus.COMPLETED;
    }

    if (this.hasFamiliarRecommendation() != null) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();
    outfit.addItem(this.ring);

    return {
      outfit: outfit,
      location: this.location,
      run: () => {
        let props = new PropertyManager();
        props.setChoice(692, 3);

        try {
          greyAdv(this.location, outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  needAdventures(): number {
    return 9;
  }

  getId(): QuestType {
    return "Council / Tower / Keys / DailyDungeon";
  }
}
