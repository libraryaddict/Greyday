import {
  adv1,
  availableAmount,
  buy,
  cliExecute,
  council,
  getProperty,
  Item,
  Location,
  myLevel,
  myMeat,
  retrieveItem,
  toInt,
  use,
} from "kolmafia";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { greyAdv } from "../../utils/GreyLocations";
import { CryptL7DirtyMan } from "./crypts/QuestL7CryptDirtyMan";
import { CryptL7Eyes } from "./crypts/QuestL7CryptEyes";
import { CryptL7Rattling } from "./crypts/QuestL7CryptRattling";
import { CryptL7Sprinters } from "./crypts/QuestL7CryptSprinters";
import { QuestType } from "../QuestTypes";
import { PropertyManager } from "../../utils/Properties";
import { GreySettings } from "../../utils/GreySettings";

export class QuestL7Crypt implements QuestInfo {
  children: QuestInfo[] = [
    new CryptL7DirtyMan(),
    new CryptL7Eyes(),
    new CryptL7Rattling(),
    new CryptL7Sprinters(),
  ];
  chest: Item = Item.get("Chest of the Bonerdagon");

  getLocations(): Location[] {
    return [Location.get("Haert of the Cyrpt")];
  }

  getChildren(): QuestInfo[] {
    return this.children;
  }

  level(): number {
    return 7;
  }

  status(): QuestStatus {
    let status = getProperty("questL07Cyrptic");

    if (status == "finished") {
      return QuestStatus.COMPLETED;
    }

    // If we're too poor to buy a sword, too lazy to do more checks
    if (myMeat() < 300) {
      return QuestStatus.NOT_READY;
    }

    // If we're ready for boss
    if (
      this.children.filter((c) => c.status() != QuestStatus.COMPLETED).length ==
      0
    ) {
      return QuestStatus.READY;
    }
    // Equip sword and retrocape
    // Then we gotta handle each zone specially. Item drop, ML, init and eh

    return QuestStatus.NOT_READY;
  }

  getId(): QuestType {
    return "Council / Crypt / Boss";
  }

  run(): QuestAdventure {
    return {
      location: Location.get("Haert of the Cyrpt"),
      run: () => {
        let props = new PropertyManager();
        props.setChoice(527, 1);

        try {
          greyAdv("crypt.php?action=heart");
        } finally {
          props.resetAll();
        }

        council();

        if (
          !GreySettings.greyPrepareLevelingResources &&
          availableAmount(this.chest) > 0 &&
          myMeat() < 6000
        ) {
          use(this.chest);
        }
      },
    };
  }
}

export enum CryptStatus {
  FIGHT,
  BOSS,
  FINISHED,
}
