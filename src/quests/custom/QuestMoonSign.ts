import {
  Location,
  Familiar,
  Monster,
  getProperty,
  Item,
  availableAmount,
  getWorkshed,
  haveOutfit,
  myAscensions,
  toInt,
  Skill,
  haveSkill,
  knollAvailable,
  gnomadsAvailable,
  canadiaAvailable,
  cliExecute,
  userConfirm,
} from "kolmafia";
import { AbsorbsProvider } from "../../utils/GreyAbsorber";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { GreySettings, moonSigns } from "../../utils/GreySettings";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestMoonSign implements QuestInfo {
  spoon: Item = Item.get("hewn moon-rune spoon");
  asdon: Item = Item.get("Asdon Martin keyfob");
  knollAbsorb: Monster = Monster.get("revolving bugbear");
  gnomeAbsorb: Monster = Monster.get("vicious gnauga");
  canadiaAbsorb: Monster = Monster.get("Cloud of disembodied whiskers");
  gnomeSkills: Skill[] = [
    "Powers of Observatiogn",
    "Torso Awareness",
    "Gnefarious Pickpocketing ",
  ].map((s) => Skill.get(s));

  getId(): QuestType {
    return "Misc / Moonsign";
  }

  level(): number {
    return 11;
  }

  status(): QuestStatus {
    if (
      getProperty("moonTuned") != "false" ||
      availableAmount(this.spoon) == 0
    ) {
      return QuestStatus.COMPLETED;
    }

    if (
      moonSigns.find(
        (s) => s.toLowerCase() == GreySettings.greyTuneMoonSpoon?.toLowerCase()
      ) == null
    ) {
      return QuestStatus.COMPLETED;
    }

    if (knollAvailable() && this.isKnollDone()) {
      return QuestStatus.READY;
    }

    if (gnomadsAvailable() && this.isGnomesDone()) {
      return QuestStatus.READY;
    }

    if (canadiaAvailable() && this.isCanadaDone()) {
      return QuestStatus.READY;
    }

    return QuestStatus.NOT_READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        /*let confirm = userConfirm("Ready to change moon signs?");

        if (!confirm) {
          throw "User wasn't ready";
        }*/

        cliExecute("spoon " + GreySettings.greyTuneMoonSpoon);

        if (getProperty("moonTuned") != "true") {
          throw "Something went wrong when trying to moon spoon tune!";
        }

        cliExecute("refresh all");
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  isKnollDone(): boolean {
    // We can get costume from here
    if (getWorkshed() == this.asdon && !haveOutfit("Bugbear Costume")) {
      return false;
    }

    if (getProperty("questM01Untinker") != "finished") {
      return false;
    }

    // We can make car from here
    if (toInt(getProperty("lastDesertUnlock")) != myAscensions()) {
      return false;
    }

    if (!AbsorbsProvider.getReabsorbedMonsters().includes(this.knollAbsorb)) {
      return false;
    }

    return true;
  }

  isGnomesDone(): boolean {
    if (this.gnomeSkills.find((s) => !haveSkill(s)) != null) {
      return false;
    }

    if (!AbsorbsProvider.getReabsorbedMonsters().includes(this.gnomeAbsorb)) {
      return false;
    }

    return true;
  }

  isCanadaDone(): boolean {
    if (!AbsorbsProvider.getReabsorbedMonsters().includes(this.canadiaAbsorb)) {
      return false;
    }

    return true;
  }
}
