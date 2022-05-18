import {
  Location,
  Familiar,
  availableAmount,
  Item,
  Monster,
  getProperty,
  isBanished,
  toInt,
} from "kolmafia";
import { AbsorbsProvider } from "../../../../utils/GreyAbsorber";
import { AdventureSettings, greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { Macro } from "../../../../utils/MacroBuilder";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

export class QuestL11PyramidMiddle implements QuestInfo {
  ratTangle: Item = Item.get("Tangle of rat tails");
  tombRat: Monster = Monster.get("Tomb Rat");
  middleLoc: Location = Location.get("The Middle Chamber");
  wheel: Item = Item.get("Crumbling Wooden Wheel");
  ratchet: Item = Item.get("Tomb Ratchet");
  book: Item = Item.get("Familiar scrapbook");
  banisher: Skill = Skill.get("Show Your Boring Familiar Pictures");
  servant: Monster = Monster.get("Tomb Servant");

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
      availableAmount(this.wheel) + availableAmount(this.ratchet) >= 10
    ) {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("questL03Rat") != "finished") {
      return QuestStatus.FASTER_LATER;
    }

    if (
      !isBanished(this.servant) &&
      toInt(getProperty("scrapbookCharges")) < 100
    ) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setItemDrops();

    if (
      !isBanished(this.servant) &&
      toInt(getProperty("scrapbookCharges")) >= 100
    ) {
      outfit.addItem(this.book);
    }

    return {
      location: this.middleLoc,
      outfit: outfit,
      run: () => {
        let settings = new AdventureSettings();

        let startMacro: Macro = new Macro();

        if (availableAmount(this.ratTangle) > 0) {
          startMacro.if_(this.tombRat, Macro.item(this.ratTangle));
        }

        settings.addBanish(Monster.get("Tomb Asp"));

        if (
          !isBanished(this.servant) &&
          toInt(getProperty("scrapbookCharges")) < 100 &&
          AbsorbsProvider.getReabsorbedMonsters().includes(this.servant)
        ) {
          startMacro.if_(this.servant, Macro.skill(this.banisher));
        } else {
          settings.addBanish(Monster.get("Tomb Servant"));
        }

        settings.setStartOfFightMacro(startMacro);
        greyAdv(this.middleLoc, outfit, settings);
      },
    };
  }

  getLocations(): Location[] {
    return [this.middleLoc];
  }
}
