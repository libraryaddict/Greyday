import {
  Location,
  Familiar,
  availableAmount,
  itemAmount,
  retrieveItem,
  Item,
} from "kolmafia";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";
import { QuestKeyStuffAbstract } from "./QuestKeyStuffAbstract";

export class QuestMonsterBait
  extends QuestKeyStuffAbstract
  implements QuestInfo
{
  wPixel: Item = Item.get("White Pixel");
  rPixel: Item = Item.get("Red Pixel");
  gPixel: Item = Item.get("Green Pixel");
  bPixel: Item = Item.get("Blue Pixel");
  key: Item = Item.get("Digital key");
  monsterBait: Item = Item.get("Monster Bait");

  getId(): QuestType {
    return "Misc / MonsterBait";
  }

  level(): number {
    return 12;
  }

  status(): QuestStatus {
    if (availableAmount(this.monsterBait) > 0) {
      return QuestStatus.COMPLETED;
    }

    if (
      availableAmount(this.key) == 0 &&
      !this.getKeysUsed().includes(this.key)
    ) {
      return QuestStatus.NOT_READY;
    }

    let wPix = itemAmount(this.wPixel) + this.canMakePixelCount();

    if (wPix < 15) {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.rPixel) < 20) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        retrieveItem(this.monsterBait);
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  canMakePixelCount(): number {
    return Math.min(
      Math.max(0, itemAmount(this.rPixel) - 20),
      itemAmount(this.bPixel),
      itemAmount(this.gPixel)
    );
  }
}
