import { Location, Item, availableAmount, toInt, getProperty } from "kolmafia";
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

export class QuestL11ShrineVines implements QuestInfo {
  locs: [string, Location, Item, number][] = [
    [
      "hiddenBowlingAlleyProgress",
      Location.get("An Overgrown Shrine (Southeast)"),
      Item.get("scorched stone sphere"),
      787,
    ],
    [
      "hiddenApartmentProgress",
      Location.get("An Overgrown Shrine (Northwest)"),
      Item.get("moss-covered stone sphere"),
      781,
    ],
    [
      "hiddenOfficeProgress",
      Location.get("An Overgrown Shrine (Northeast)"),
      Item.get("crackling stone sphere"),
      785,
    ],
    [
      "hiddenHospitalProgress",
      Location.get("An Overgrown Shrine (Southwest)"),
      Item.get("dripping stone sphere"),
      783,
    ],
    [null, Location.get("A Massive Ziggurat"), null, null],
  ];
  machete: Item = Item.get("Antique Machete");

  level(): number {
    return 11;
  }

  getLocations(): Location[] {
    return this.locs.map((l) => l[1]);
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL11Worship");

    if (status > 4) {
      return QuestStatus.COMPLETED;
    }

    if (status < 3) {
      return QuestStatus.NOT_READY;
    }

    if (this.shrineNeedsDoing() == null) {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.machete) == 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  getId(): QuestType {
    return "Council / MacGruffin / HiddenCity / Vines";
  }

  lianaCleared(loc: Location) {
    //need to check the combat names due to wanderers
    //we are assuming victory. you could have potentially fought liana without machete and then ran away. but you we are assuming you didn't
    let dense_liana_defeated = 0;
    let area_combats_seen = loc.combatQueue.split("; ");

    for (let s of area_combats_seen) {
      if (s == "dense liana") {
        dense_liana_defeated += 1;
      }
    }

    return dense_liana_defeated > 2;
  }

  run(): QuestAdventure {
    let adv = this.shrineNeedsDoing();
    let outfit: GreyOutfit;

    if (adv[2]) {
      outfit = new GreyOutfit().addItem(this.machete);
    } else {
      outfit = GreyOutfit.IGNORE_OUTFIT;
    }

    return {
      location: adv[0],
      outfit: outfit,
      run: () => {
        let props = new PropertyManager();

        if (adv[1] != null) {
          props.setChoice(adv[1], adv[2] ? 1 : 2);
        }

        try {
          greyAdv(adv[0], outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  // Location, choice adv number, needs to clear vines
  shrineNeedsDoing(): [Location, number, boolean] {
    for (let l of this.locs) {
      if (
        l[0] != null ? toInt(getProperty(l[0])) <= 0 : !this.lianaCleared(l[1])
      ) {
        return [l[1], l[3], true];
      }

      if (l[2] != null && availableAmount(l[2]) > 0) {
        return [l[1], l[3], false];
      }
    }

    return null;
  }
}
