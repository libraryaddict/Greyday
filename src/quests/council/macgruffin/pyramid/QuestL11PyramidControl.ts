import {
  Item,
  itemAmount,
  getProperty,
  visitUrl,
  myHash,
  availableAmount,
  Location,
} from "kolmafia";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11PyramidControl implements QuestInfo {
  wheel: Item = Item.get("Crumbling Wooden Wheel");
  ratchet: Item = Item.get("Tomb Ratchet");

  getLocations(): Location[] {
    return [];
  }

  level(): number {
    return 11;
  }

  getId(): QuestType {
    return "Council / MacGruffin / Pyramid / Wheel";
  }

  status(): QuestStatus {
    if (
      getProperty("lowerChamberUnlock") != "true" ||
      getProperty("controlRoomUnlock") != "true"
    ) {
      return QuestStatus.NOT_READY;
    }

    if (getProperty("pyramidBombUsed") == "true") {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.wheel) + availableAmount(this.ratchet) < 10) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    if (getProperty("pyramidPosition") != "1") {
      throw "Shouldn't have used any wheels or ratchets yet!";
    }

    return {
      location: null,
      run: () => {
        visitUrl("place.php?whichplace=pyramid&action=pyramid_control");

        for (let wheel = 1; wheel <= 10; wheel++) {
          if (itemAmount(this.wheel) > 0) {
            visitUrl(
              "choice.php?pwd=&whichchoice=929&option=1&choiceform1=Use+a+wheel+on+the+peg&pwd=" +
                myHash()
            );
          } else {
            visitUrl("choice.php?whichchoice=929&option=2&pwd");
          }

          if (wheel == 3 || wheel == 7 || wheel == 10) {
            visitUrl(
              "choice.php?pwd=&whichchoice=929&option=5&choiceform5=Head+down+to+the+Lower+Chambers+%281%29&pwd=" +
                myHash()
            );
          }

          if (wheel == 3 || wheel == 7) {
            visitUrl("place.php?whichplace=pyramid&action=pyramid_control");
          }
        }

        if (getProperty("pyramidBombUsed") != "true") {
          throw "Bomb should've been used in the pyramid!";
        }
      },
    };
  }
}
