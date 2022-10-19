import {
  Location,
  Familiar,
  availableAmount,
  council,
  equippedAmount,
  Item,
  lastChoice,
  getProperty,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL10GiantTop implements QuestInfo {
  modelAirShip: Item = Item.get("Model airship");
  wig: Item = Item.get("Mohawk Wig");
  record: Item = Item.get("drum 'n' bass 'n' drum 'n' bass record");
  rocketToStars: Item = Item.get("steam-powered model rocketship");
  loc: Location = Location.get(
    "The Castle in the Clouds in the Sky (Top Floor)"
  );
  steamNC: number = 677;
  raverNC: number = 676;
  punkNC: number = 678;
  gothNC: number = 675;
  holeInSky: QuestInfo = new QuestTowerHoleInSkyUnlock();

  getChildren(): QuestInfo[] {
    return [this.holeInSky];
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit().setNoCombat();

    if (availableAmount(this.wig) > 0) {
      outfit.addWeight(this.wig);
    }

    return {
      location: this.loc,
      outfit: outfit,
      freeRun: (monster) => true,
      run: () => {
        const props = new PropertyManager();

        try {
          // Goth and steam love each other
          if (availableAmount(this.modelAirShip) > 0) {
            props.setChoice(this.steamNC, 1); // Use model ship
            props.setChoice(this.gothNC, 4); // Crawl to copper
          } else if (availableAmount(this.record) > 0) {
            // We have the record, lets end this.
            props.setChoice(this.steamNC, 4); // Crawl to goth
            props.setChoice(this.gothNC, 2); // Grab record
          } else if (availableAmount(this.rocketToStars) == 0) {
            // We don't have airship or record, to avoid fighting lets just grab the rocket if we can
            props.setChoice(this.steamNC, 2); // Grab rocket
            props.setChoice(this.gothNC, 4); // Crawl to steam
          } else {
            // This adv is a waste, just fight.
            props.setChoice(this.steamNC, 1); // Fight steam
            props.setChoice(this.gothNC, 1); // Fight goth
          }

          // Punk and raver love each other
          if (equippedAmount(this.wig) > 0) {
            // If we can end this with the wig
            props.setChoice(this.punkNC, 1); // Use wig
            props.setChoice(this.raverNC, 4); // Crawl to punk rock
          } else if (availableAmount(this.record) == 0) {
            // If we can grab a record
            props.setChoice(this.punkNC, 4); // Crawl to raver
            props.setChoice(this.raverNC, 3); // Grab record
          } else {
            // We're going to waste an adventure
            props.setChoice(this.punkNC, 4); // Crawl to raver
            props.setChoice(this.raverNC, 1); // Fight the raver for their advs
          }

          props.setChoice(679, 1); // Turn dat wheel

          greyAdv(this.loc, outfit);

          if (lastChoice() == 679) {
            council();
          }
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getId(): QuestType {
    return "Council / Beanstalk / Top";
  }

  level(): number {
    return 10;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL10Garbage");

    if (status < 9) {
      return QuestStatus.NOT_READY;
    }

    if (status > 9) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  getLocations(): Location[] {
    return [this.loc];
  }
}

export class QuestTowerHoleInSkyUnlock implements QuestInfo {
  topFloor: Location = Location.get(
    "The Castle in the Clouds in the Sky (Top Floor)"
  );
  rocket: Item = Item.get("steam-powered model rocketship");
  copperFeel: number = 677;
  flavorOfARaver: number = 676;
  yeahPunkRock: number = 678;
  gothNC: number = 675;

  getId(): QuestType {
    return "Council / Tower / Keys / HoleInSkyUnlock";
  }

  level(): number {
    return 8;
  }

  status(): QuestStatus {
    if (getProperty("questL10Garbage") != "finished") {
      return QuestStatus.NOT_READY;
    }

    if (
      getQuestStatus("questL13Final") > 5 ||
      availableAmount(this.rocket) > 0
    ) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit().setNoCombat();

    return {
      location: this.topFloor,
      outfit: outfit,
      freeRun: () => true,
      run: () => {
        const props = new PropertyManager();

        props.setChoice(this.copperFeel, 2); // Grab rocket
        props.setChoice(this.gothNC, 4); // Crawl to steam
        props.setChoice(this.yeahPunkRock, 3); // Crawl to steam
        props.setChoice(this.flavorOfARaver, 4); // Crawl to punk

        try {
          greyAdv(this.topFloor, outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
