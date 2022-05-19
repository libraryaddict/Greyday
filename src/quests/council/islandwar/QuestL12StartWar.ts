import {
  availableAmount,
  cliExecute,
  Effect,
  getProperty,
  haveEffect,
  haveOutfit,
  Item,
  Location,
  myAscensions,
  myBasestat,
  outfit,
  outfitPieces,
  setProperty,
  Stat,
  toInt,
  visitUrl,
} from "kolmafia";
import { hasNonCombatSkillsReady } from "../../../GreyAdventurer";
import { DelayBurners } from "../../../iotms/delayburners/DelayBurners";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { GreyPulls } from "../../../utils/GreyResources";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL12StartWar implements QuestInfo {
  loc: Location = Location.get("Hippy Camp");

  level(): number {
    return 12;
  }

  status(): QuestStatus {
    if (getProperty("warProgress") != "unstarted") {
      return QuestStatus.COMPLETED;
    }

    if (!this.hasBoat() || !this.hasOutfit()) {
      return QuestStatus.NOT_READY;
    }

    if (Stat.all().find((s) => myBasestat(s) < 70) != null) {
      return QuestStatus.NOT_READY;
    }

    if (!this.hasOutfit()) {
      if (haveEffect(Effect.get("Everything Looks Yellow")) > 0) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    }

    if (!hasNonCombatSkillsReady()) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  hasBoat(): boolean {
    return toInt(getProperty("lastIslandUnlock")) == myAscensions();
  }

  hasOutfit(): boolean {
    return haveOutfit("Frat Warrior Fatigues");
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit().setNoCombat();
    outfit.addItem(Item.get("Beer Helmet"));
    outfit.addItem(Item.get("distressed denim pants"));
    outfit.addItem(Item.get("bejeweled pledge pin"));

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        DelayBurners.tryReplaceCombats();

        greyAdv(this.loc, outfit);

        if (getProperty("warProgress") != "unstarted") {
          this.visitArena();
        }
      },
    };
  }

  getId(): QuestType {
    return "Council / War / Start";
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  visitArena() {
    outfit("Frat Warrior Fatigues");
    visitUrl("bigisland.php?place=concert&pwd");
  }
}
