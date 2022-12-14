import {
  Location,
  Familiar,
  toInt,
  getProperty,
  totalTurnsPlayed,
  Item,
  visitUrl,
  lastChoice,
  currentRound,
  setProperty,
  familiarWeight,
  Skill,
  print,
  equip,
  Slot,
  toBoolean,
  haveEffect,
  Effect,
  handlingChoice,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../utils/GreyLocations";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { canGreyAdventure } from "../../utils/GreyUtils";
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
    [Location.get("The Haunted Billiards Room"), [1, 2, 2]],
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
  teleportis: Effect = Effect.get("Teleportitis");
  finishLights: boolean = toBoolean(getProperty("greyFinishManorLights"));

  constructor() {
    for (const choice of this.choices) {
      const prop = "choiceAdventure" + choice;

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

  getSteveLeft(): number {
    const loc = Location.get(getProperty("nextSpookyravenStephenRoom"));

    const index = this.stephen.findIndex(([l]) => loc == l);

    return index;
  }

  getElizaLeft(): number {
    const loc = Location.get(getProperty("nextSpookyravenElizabethRoom"));

    const index = this.elizibeth.findIndex(([l]) => loc == l);

    return index;
  }

  hasFamiliarRecommendation(): Familiar {
    if (
      !this.isSteveFight() ||
      familiarWeight(this.goose) >= 7 ||
      !this.finishLights
    ) {
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
    const loc = Location.get(getProperty("nextSpookyravenStephenRoom"));

    return this.stephen.find((s) => s[0] == loc);
  }

  getEliza(): [Location, number] {
    const loc = Location.get(getProperty("nextSpookyravenElizabethRoom"));

    return this.elizibeth.find((s) => s[0] == loc);
  }

  isTime(): boolean {
    const last = this.getLastLightsOut();

    if (last >= totalTurnsPlayed()) {
      return false;
    }

    return totalTurnsPlayed() % 37 == 0;
  }

  getLastLightsOut(): number {
    return toInt(getProperty("lastLightsOutTurn"));
  }

  status(): QuestStatus {
    if (!this.isTime() || haveEffect(this.teleportis) > 0) {
      return QuestStatus.NOT_READY;
    }

    if (!this.isElizaReady() && !this.shouldDoSteve()) {
      return QuestStatus.COMPLETED;
    }

    if (this.isElizaFight() && this.isSteveFight() && !this.finishLights) {
      return QuestStatus.COMPLETED;
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
    const steve = this.getSteve();
    const fight = this.isSteveFight();
    const outfit: GreyOutfit = fight
      ? new GreyOutfit()
      : GreyOutfit.IGNORE_OUTFIT;

    if (this.isSteveFight()) {
      outfit.meatDropWeight = 2;
    }

    if (getProperty("_juneCleaverFightsLeft") == "0") {
      if (fight) {
        outfit.addIgnored(Item.get("June Cleaver"));
      } else {
        equip(Slot.get("weapon"), Item.none);
      }
    }

    return {
      location: null,
      familiar: fight ? this.goose : null,
      outfit: outfit,
      run: () => {
        const both = this.getBoth();

        visitUrl("adventure.php?snarfblat=" + toInt(steve[0]));

        if (!handlingChoice() && currentRound() == 0) {
          return;
        }

        if (!handlingChoice() || !this.choices.includes(lastChoice())) {
          greyAdv(null);
          return;
        }

        for (const i of steve[1]) {
          const url =
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

        this.printStatus();

        const both2 = this.getBoth();

        if (both == both2) {
          throw "No progress was made in steve..";
        }
      },
    };
  }

  printStatus() {
    if (this.isSteveReady()) {
      print(
        "Lights Out: Stephen rooms explored: " +
          this.getSteveLeft() +
          " / " +
          this.stephen.length,
        "blue"
      );
    }

    if (this.isElizaReady()) {
      print(
        "Lights Out: Elizabeth rooms explored: " +
          this.getElizaLeft() +
          " / " +
          this.elizibeth.length,
        "blue"
      );
    }
  }

  run(): QuestAdventure {
    if (this.shouldDoSteve() && (!this.isSteveFight() || this.finishLights)) {
      const steve = this.getSteve();

      if (canGreyAdventure(steve[0])) {
        return this.doSteve();
      }
    }

    if (this.isElizaReady() && (!this.isElizaFight() || this.finishLights)) {
      const eliza = this.getEliza();

      if (canGreyAdventure(eliza[0])) {
        return this.doEliza();
      }
    }

    return {
      location: null,
      run: () => {
        throw "Neither steve or eliza were ready!";
      },
    };
  }

  doEliza(): QuestAdventure {
    const eliza = this.getEliza();
    const fight = this.isElizaFight();
    const outfit = !fight ? GreyOutfit.IGNORE_OUTFIT : new GreyOutfit();

    if (getProperty("_juneCleaverFightsLeft") == "0") {
      if (fight) {
        outfit.addBonus("-equip june cleaver");
      } else {
        equip(Slot.get("weapon"), Item.none);
      }
    }

    return {
      location: null,
      outfit: outfit,
      run: () => {
        const both = this.getBoth();
        visitUrl("adventure.php?snarfblat=" + toInt(eliza[0]));

        if (!handlingChoice() && currentRound() == 0) {
          return;
        }

        if (!handlingChoice() || !this.choices.includes(lastChoice())) {
          greyAdv(null);
          return;
        }

        const url =
          "choice.php?pwd=&whichchoice=" + lastChoice() + "&option=" + eliza[1];

        visitUrl(url);

        if (currentRound() != 0) {
          greyAdv(null);
        }

        this.printStatus();

        const both2 = this.getBoth();

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
      const eliza = this.getEliza();

      if (canGreyAdventure(eliza[0])) {
        return true;
      }
    }

    if (this.shouldDoSteve()) {
      const steve = this.getSteve();

      if (canGreyAdventure(steve[0])) {
        return true;
      }
    }

    return false;
  }

  free(): boolean {
    return (
      (this.isSteveReady() && !this.isSteveFight()) ||
      (this.isElizaReady() && !this.isElizaFight())
    );
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}
