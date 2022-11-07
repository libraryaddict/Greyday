import {
  Location,
  Familiar,
  Item,
  myLevel,
  getProperty,
  toInt,
  myAscensions,
  haveFamiliar,
  availableAmount,
  lastMonster,
  Phylum,
} from "kolmafia";
import { hasNonCombatSkillActive } from "../../GreyAdventurer";
import { greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestTotPirate implements QuestInfo {
  familiar: Familiar = Familiar.get("Trick-or-Treating Tot");
  item: Item = Item.get("li'l pirate costume");
  pirate: Location = Location.get("The Obligatory Pirate's Cove");

  getId(): QuestType {
    return "Misc / Tot Pirate";
  }

  level(): number {
    return 7;
  }

  status(): QuestStatus {
    if (!haveFamiliar(this.familiar) || availableAmount(this.item) > 0) {
      return QuestStatus.COMPLETED;
    }

    if (!this.isIslandUnlocked() || hasNonCombatSkillActive()) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit().setPlusCombat();

    return {
      outfit: outfit,
      location: this.pirate,
      run: () => {
        greyAdv(this.pirate);

        if (
          lastMonster().phylum == Phylum.get("pirate") &&
          availableAmount(this.item) == 0
        ) {
          throw (
            "Oh dear, we fought a pirate and expected to drop " +
            this.item +
            " but that didn't happen."
          );
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.pirate];
  }

  mustBeDone(): boolean {
    return myLevel() == 11 && this.isIslandUnlocked();
  }

  canAcceptPrimes?(): boolean {
    return true;
  }

  isIslandUnlocked(): boolean {
    return toInt(getProperty("lastIslandUnlock")) >= myAscensions();
  }
}
