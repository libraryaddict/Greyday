import {
  cliExecute,
  Effect,
  effectModifier,
  Familiar,
  familiarWeight,
  getProperty,
  haveEffect,
  haveSkill,
  Item,
  Location,
  Skill,
  toBoolean,
  toInt,
  toItem,
  use,
  visitUrl,
} from "kolmafia";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { GreyPulls } from "../../../utils/GreyResources";
import { GreySettings } from "../../../utils/GreySettings";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class Quest12WarNuns implements QuestInfo {
  loc: Location = Location.get("The Themthar Hills");
  hobo: Familiar = Familiar.get("Hobo Monkey");
  hotness: Item = Item.get("Mick's IcyVapoHotness Inhaler");
  effect: Effect = effectModifier(this.hotness, "Effect");
  winkles: Effect = Effect.get("Winklered");

  hasAlreadyPulled(): boolean {
    return (
      GreySettings.isHardcoreMode() ||
      getProperty("_roninStoragePulls")
        .split(",")
        .map((s) => toItem(toInt(s)))
        .includes(this.hotness)
    );
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  hasFamiliarRecommendation(): Familiar {
    if (familiarWeight(this.hobo) < 20) {
      return this.hobo;
    }

    return null;
  }

  level(): number {
    return 12;
  }

  getId(): QuestType {
    return "Council / War / Nuns";
  }

  status(): QuestStatus {
    if (getProperty("sidequestNunsCompleted") != "none") {
      return QuestStatus.COMPLETED;
    }

    if (
      getProperty("warProgress") != "started" ||
      toInt(getProperty("hippiesDefeated")) < 192
    ) {
      return QuestStatus.NOT_READY;
    }

    if (!haveSkill(Skill.get("Financial Spreadsheets"))) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.FASTER_LATER;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();
    outfit.addItem(Item.get("Beer Helmet"));
    outfit.addItem(Item.get("distressed denim pants"));
    outfit.addItem(Item.get("bejeweled pledge pin"));
    outfit.meatDropWeight = 10;

    return {
      familiar: this.hobo,
      location: this.loc,
      outfit: outfit,
      disableFamOverride: true,
      run: () => {
        if (this.getMeat() == 0) {
          this.visitNuns();
        }

        let meat = this.getMeat();

        this.tryToBuff();

        greyAdv(this.loc, outfit);

        if (meat >= this.getMeat() || this.getMeat() >= 100_000) {
          this.visitNuns();
        }
      },
    };
  }

  visitNuns() {
    visitUrl("bigisland.php?place=nunnery");
  }

  getMeat(): number {
    return toInt(getProperty("currentNunneryMeat"));
  }

  mustBeDone(): boolean {
    return haveEffect(this.effect) + haveEffect(this.winkles) > 0;
  }

  tryToBuff() {
    if (!this.hasAlreadyPulled()) {
      GreyPulls.pullMeatBuffers();

      use(this.hotness);
    }

    if (!toBoolean(getProperty("concertVisited"))) {
      cliExecute("concert 2"); // Feeling wrinkled
    }
  }
}
