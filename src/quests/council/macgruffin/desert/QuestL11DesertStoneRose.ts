import {
  absorbedMonsters,
  availableAmount,
  canAdventure,
  Effect,
  Familiar,
  familiarWeight,
  getProperty,
  haveEffect,
  Item,
  Location,
  Monster,
  toInt,
} from "kolmafia";
import { AbsorbsProvider } from "../../../../utils/GreyAbsorber";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
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
  blur: Monster = Monster.get("Blur");
  toAbsorb: Monster[];
  fam: Familiar = Familiar.get("Grey Goose");
  swarm: Monster = Monster.get("Swarm of fire ants");
  curse3: Effect = Effect.get("Thrice-Cursed");

  getId(): QuestType {
    return "Council / MacGruffin / Desert / StoneRose";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questL11Desert");

    if (status > 0) {
      return QuestStatus.COMPLETED;
    }

    if (!this.wantsGnomeRose() || availableAmount(this.rose) > 0) {
      return QuestStatus.COMPLETED;
    }

    if (haveEffect(this.hydrated) == 0 && haveEffect(this.curse3) > 0) {
      return QuestStatus.NOT_READY;
    }

    if (status < 0 || !canAdventure(this.oasis)) {
      return QuestStatus.NOT_READY;
    }

    if (getProperty("_gnasirAvailable") != "true") {
      return QuestStatus.NOT_READY;
    }

    if (!AbsorbsProvider.getReabsorbedMonsters().includes(this.swarm)) {
      return QuestStatus.NOT_READY;
    }

    if (this.toAbsorb.length > 0) {
      if (familiarWeight(this.fam) < 6) {
        return QuestStatus.NOT_READY;
      }
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: this.oasis,
      run: () => {
        const settings = new AdventureSettings();

        if (!absorbedMonsters()[this.blur.name]) {
          settings.addNoBanish(this.blur);
        }

        greyAdv(this.oasis, null, settings);
      },
    };
  }

  getGnome(): number {
    return toInt(getProperty("gnasirProgress"));
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

  canAcceptPrimes(): boolean {
    return false;
  }
}
