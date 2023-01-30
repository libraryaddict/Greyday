import {
  availableAmount,
  Familiar,
  getProperty,
  Item,
  Location,
  Monster,
  useFamiliar,
} from "kolmafia";
import { DelayBurners } from "../../../../iotms/delayburners/DelayBurners";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { Macro } from "../../../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11PyramidMiddle implements QuestInfo {
  ratTangle: Item = Item.get("Tangle of rat tails");
  tombRat: Monster = Monster.get("Tomb Rat");
  middleLoc: Location = Location.get("The Middle Chamber");
  wheel: Item = Item.get("Crumbling Wooden Wheel");
  ratchet: Item = Item.get("Tomb Ratchet");
  servant: Monster = Monster.get("Tomb Servant");
  toAbsorb: Monster[];

  getId(): QuestType {
    return "Council / MacGruffin / Pyramid / Middle";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    if (getProperty("pyramidBombUsed") == "true") {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("middleChamberUnlock") == "false") {
      return QuestStatus.NOT_READY;
    }

    if (
      getProperty("lowerChamberUnlock") == "true" &&
      getProperty("controlRoomUnlock") == "true" &&
      this.haveEnough()
    ) {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("questL03Rat") != "finished") {
      return QuestStatus.NOT_READY;
    }

    if (this.toAbsorb.length == 0 && this.haveEnough()) {
      if (DelayBurners.isDelayBurnerReady()) {
        return QuestStatus.READY;
      }

      if (DelayBurners.isDelayBurnerFeasible()) {
        return QuestStatus.FASTER_LATER;
      }
    }

    return QuestStatus.READY;
  }

  haveEnough(): boolean {
    return availableAmount(this.wheel) + availableAmount(this.ratchet) >= 10;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit();

    if (!this.haveEnough()) {
      outfit.setItemDrops();
    } else if (
      availableAmount(this.ratTangle) > 0 &&
      this.toAbsorb.length == 0
    ) {
      outfit.addDelayer();
    }

    return {
      location: this.middleLoc,
      outfit: outfit,
      orbs: this.haveEnough() ? null : [this.tombRat],
      mayFreeRun: true,
      freeRun: (monster) => this.haveEnough() || this.tombRat != monster,
      run: () => {
        const settings = new AdventureSettings();

        const startMacro: Macro = new Macro();

        if (availableAmount(this.ratTangle) > 0) {
          startMacro.if_(this.tombRat, Macro.item(this.ratTangle));
        }

        if (DelayBurners.isTryingForDupeableGoblin()) {
          useFamiliar(Familiar.get("Grey Goose"));
        }

        settings.addNoBanish(this.tombRat);

        settings.setStartOfFightMacro(startMacro);
        greyAdv(this.middleLoc, outfit, settings);
      },
    };
  }

  getLocations(): Location[] {
    return [this.middleLoc];
  }
}
