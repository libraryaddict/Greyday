import { canAdv } from "canadv.ash";
import {
  Location,
  Familiar,
  toInt,
  getProperty,
  totalTurnsPlayed,
  Item,
  visitUrl,
  handlingChoice,
  lastChoice,
  currentRound,
  setProperty,
  familiarWeight,
  Skill,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { Macro } from "../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestManorLights implements QuestInfo {
  choices: number[] = [
    890, 891, 892, 893, 894, 895, 896, 897, 898, 899, 900, 901, 902, 903,
  ];

  elizibeth: [Location, number][] = [
    [Location.get("The Haunted Storage Room"), 3],
    [Location.get("The Haunted Laundry Room"), 3],
    [Location.get("The Haunted Bathroom"), 3],
    [Location.get("The Haunted Kitchen"), 4],
    [Location.get("The Haunted Library"), 2],
    [Location.get("The Haunted Ballroom"), 2],
    [Location.get("The Haunted Gallery"), 4],
  ];
  stephen: [Location, number[]][] = [
    [Location.get("The Haunted Bedroom"), [1, 3, 1]],
    [Location.get("The Haunted Nursery"), [1, 2, 2, 1, 1]],
    [Location.get("The Haunted Conservatory"), [1, 2, 2]],
    [Location.get("The Haunted Billiards"), [1, 2, 2]],
    [Location.get("The Haunted Wine Cellar"), [1, 2, 2, 3]],
    [Location.get("The Haunted Boiler Room"), [1, 2, 2]],
    [Location.get("The Haunted Laboratory"), [1, 1, 3, 1, 1]],
  ];
  elizabethRewards: Item[] = [
    Item.get("Elizabeth's Dollie"),
    Item.get("Elizabeth's paintbrush"),
  ];
  stephsRewards: Item[] = [
    Item.get("Stephen's lab coat"),
    Item.get("Stephen's secret formula"),
  ];
  goose: Familiar = Familiar.get("Grey Goose");

  constructor() {
    for (let choice of this.choices) {
      let prop = "choiceAdventure" + choice;

      if (getProperty(prop) != "") {
        continue;
      }

      // Make sure we don't halt on any of the NC
      setProperty(prop, "1");
    }
  }

  level(): number {
    return 5;
  }

  isElizaReady(): boolean {
    return getProperty("nextSpookyravenElizabethRoom") != "none";
  }

  isSteveReady(): boolean {
    return getProperty("nextSpookyravenStephenRoom") != "none";
  }

  isElizaFight(): boolean {
    return getProperty("nextSpookyravenElizabethRoom") == "The Haunted Gallery";
  }

  isSteveFight(): boolean {
    return (
      getProperty("nextSpookyravenStephenRoom") == "The Haunted Laboratory"
    );
  }

  hasFamiliarRecommendation(): Familiar {
    if (!this.isSteveFight() || familiarWeight(this.goose) >= 7) {
      return null;
    }

    return this.goose;
  }

  shouldDoSteve(): boolean {
    return (
      this.isSteveReady() &&
      (!this.isSteveFight() || familiarWeight(this.goose) >= 7)
    );
  }

  getSteve(): [Location, number[]] {
    let loc = Location.get(getProperty("nextSpookyravenStephenRoom"));

    return this.stephen.find((s) => s[0] == loc);
  }

  getEliza(): [Location, number] {
    let loc = Location.get(getProperty("nextSpookyravenElizabethRoom"));

    return this.elizibeth.find((s) => s[0] == loc);
  }

  isTime(): boolean {
    let last = this.getLastLightsOut();

    if (last >= totalTurnsPlayed()) {
      return false;
    }

    return totalTurnsPlayed() % 37 == 0;
  }

  getLastLightsOut(): number {
    return toInt(getProperty("lastLightsOutTurn"));
  }

  status(): QuestStatus {
    if (!this.isElizaReady() && !this.shouldDoSteve()) {
      return QuestStatus.COMPLETED;
    }

    if (!this.isTime()) {
      return QuestStatus.NOT_READY;
    }

    if (!this.mustBeDone()) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  getBoth(): string {
    return (
      getProperty("nextSpookyravenStephenRoom") +
      getProperty("nextSpookyravenElizabethRoom")
    );
  }

  doSteve(): QuestAdventure {
    let steve = this.getSteve();
    let fight = this.isSteveFight();
    let outfit: GreyOutfit = fight ? new GreyOutfit() : new GreyOutfit("-tie");

    if (this.isSteveFight()) {
      outfit.meatDropWeight = 2;
    }

    return {
      location: null,
      familiar: fight ? this.goose : null,
      outfit: outfit,
      run: () => {
        if (false) {
          throw (
            "Well, do this manually! It wants to go to " +
            steve[0] +
            ", prop says " +
            getProperty("nextSpookyravenStephenRoom")
          );
        }

        let both = this.getBoth();

        visitUrl("adventure.php?snarfblat=" + toInt(steve[0]));

        for (let i of steve[1]) {
          let url =
            "choice.php?pwd=&whichchoice=" + lastChoice() + "&option=" + i;

          visitUrl(url);
        }

        if (currentRound() != 0) {
          greyAdv(
            null,
            outfit,
            new AdventureSettings().setStartOfFightMacro(
              Macro.skill(Skill.get("Emit Matter Duplicating Drones"))
            )
          );
        }

        let both2 = this.getBoth();

        if (both == both2) {
          throw "No progress was made in steve..";
        }
      },
    };
  }

  run(): QuestAdventure {
    if (this.shouldDoSteve()) {
      let steve = this.getSteve();

      if (canAdv(steve[0])) {
        return this.doSteve();
      }
    }

    if (this.isElizaReady()) {
      let eliza = this.getEliza();

      if (canAdv(eliza[0])) {
        return this.doEliza();
      }
    }

    throw "Neither steve or eliza were ready!";
  }

  doEliza(): QuestAdventure {
    let eliza = this.getEliza();
    let fight = this.isElizaFight();

    return {
      location: null,
      outfit: !fight ? new GreyOutfit("-tie") : null,
      run: () => {
        let both = this.getBoth();
        visitUrl("adventure.php?snarfblat=" + toInt(eliza[0]));

        let url =
          "choice.php?pwd=&whichchoice=" + lastChoice() + "&option=" + eliza[1];

        visitUrl(url);

        if (currentRound() != 0) {
          greyAdv(null);
        }

        let both2 = this.getBoth();

        if (both == both2) {
          throw "No progress was made in eliza..";
        }
      },
    };
  }

  getId(): QuestType {
    return "Misc / ManorLights";
  }

  getLocations(): Location[] {
    return [];
  }

  mustBeDone(): boolean {
    if (!this.isTime()) {
      return false;
    }

    if (this.isElizaReady()) {
      let eliza = this.getEliza();

      if (canAdv(eliza[0])) {
        return true;
      }
    }

    if (this.shouldDoSteve()) {
      let steve = this.getSteve();

      if (canAdv(steve[0])) {
        return true;
      }
    }

    return false;
  }

  needAdventures(): number {
    return 0;
  }
}
