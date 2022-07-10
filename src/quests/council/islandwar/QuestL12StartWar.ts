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
import {
  hasNonCombatSkillActive,
  hasNonCombatSkillsReady,
} from "../../../GreyAdventurer";
import { DelayBurners } from "../../../iotms/delayburners/DelayBurners";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { GreyPulls } from "../../../utils/GreyResources";
import { PropertyManager } from "../../../utils/Properties";
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

    if (!hasNonCombatSkillsReady(true)) {
      return QuestStatus.NOT_READY;
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
        // If we can cast both NC skills
        if (hasNonCombatSkillsReady(true)) {
          DelayBurners.tryReplaceCombats();
        }

        let props = new PropertyManager();
        props.setChoice(139, 3);
        props.setChoice(140, 3);
        props.setChoice(141, 4);
        props.setChoice(142, 4);

        try {
          greyAdv(this.loc, outfit);
        } finally {
          props.resetAll();
        }

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
