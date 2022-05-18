import {
  Location,
  Familiar,
  availableAmount,
  council,
  equippedAmount,
  Item,
  lastChoice,
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

export class QuestL11ShenGiants implements QuestInfo {
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

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setNoCombat();

    if (availableAmount(this.wig) > 0) {
      outfit.addItem(this.wig);
    }

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        let props = new PropertyManager();

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
    return "Council / MacGruffin / Shen / Giants";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL11Shen");

    if (status > 5) {
      return QuestStatus.COMPLETED;
    }

    if (status < 5) {
      return QuestStatus.NOT_READY;
    }

    if (getQuestStatus("questL10Garbage") < 9) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  getLocations(): Location[] {
    return [this.loc];
  }
}
