import { canAdv } from "canadv.ash";
import {
  Location,
  Familiar,
  Effect,
  haveEffect,
  Item,
  availableAmount,
  getProperty,
  toInt,
} from "kolmafia";
import { greyAdv } from "../../../../utils/GreyLocations";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11DesertStoneRose implements QuestInfo {
  hydrated: Effect = Effect.get("Ultrahydrated");
  oasis: Location = Location.get("Oasis");
  rose: Item = Item.get("Stone Rose");

  getId(): QuestType {
    return "Council / MacGruffin / Desert / StoneRose";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL11Desert");

    if (status < 0 || !canAdv(this.oasis)) {
      return QuestStatus.NOT_READY;
    }

    if (getProperty("_gnasirAvailable") != "true") {
      return QuestStatus.NOT_READY;
    }

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    if (!this.wantsGnomeRose() || availableAmount(this.rose) > 0) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: this.oasis,
      run: () => {
        greyAdv(this.oasis);
      },
    };
  }

  wantsGnomeRose(): boolean {
    return (this.getGnome() & 1) != 1;
  }

  getLocations(): Location[] {
    return [this.oasis];
  }

  mustBeDone(): boolean {
    return haveEffect(this.hydrated) > 0;
  }

  getGnome(): number {
    return toInt(getProperty("gnasirProgress"));
  }
}
