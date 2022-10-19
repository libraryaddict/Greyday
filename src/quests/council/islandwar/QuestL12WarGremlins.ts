import {
  availableAmount,
  getProperty,
  haveSkill,
  Item,
  itemAmount,
  Location,
  Monster,
  retrieveItem,
  Skill,
  visitUrl,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { currentPredictions, UmbrellaState } from "../../../utils/GreyUtils";
import { Macro } from "../../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class WarGremlins implements QuestInfo {
  magnet: Item = Item.get("molybdenum magnet");
  sealTooth: Item = Item.get("Seal Tooth");
  children: GremlinQuest[] = [];

  constructor() {
    this.children.push(
      new GremlinQuest(
        "Council / War / Gremlins / Burning Barrel",
        Location.get("Next to that barrel with something burning in it"),
        Monster.get("batwinged gremlin (tool)"),
        Item.get("molybdenum hammer"),
        "It whips out a hammer"
      )
    );
    this.children.push(
      new GremlinQuest(
        "Council / War / Gremlins / Abandoned Refrigerator",
        Location.get("near an abandoned refrigerator"),
        Monster.get("spider gremlin (tool)"),
        Item.get("Molybdenum Pliers"),
        "It whips out a pair of pliers"
      )
    );
    this.children.push(
      new GremlinQuest(
        "Council / War / Gremlins / Old Tires",
        Location.get("over where the old tires are"),
        Monster.get("erudite gremlin (tool)"),
        Item.get("molybdenum crescent wrench"),
        "He whips out a crescent wrench"
      )
    );
    this.children.push(
      new GremlinQuest(
        "Council / War / Gremlins / Rusted Car",
        Location.get("Out by that rusted-out car"),
        Monster.get("vegetable gremlin (tool)"),
        Item.get("molybdenum screwdriver"),
        "It whips out a screwdriver"
      )
    );
  }

  getChildren(): QuestInfo[] {
    return this.children;
  }

  mustBeDone(): boolean {
    return itemAmount(this.magnet) == 0 || availableAmount(this.sealTooth) == 0;
  }

  free(): boolean {
    return this.mustBeDone();
  }

  run(): QuestAdventure {
    if (itemAmount(this.magnet) == 0) {
      return this.visitJunkman();
    }

    if (availableAmount(this.sealTooth) == 0) {
      return this.getSealTooth();
    }

    return this.visitJunkman();
  }

  getSealTooth(): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        retrieveItem(Item.get("Seal tooth"));
      },
    };
  }

  visitJunkman(): QuestAdventure {
    const outfit = new GreyOutfit();
    outfit.addWeight(Item.get("Beer Helmet"));
    outfit.addWeight(Item.get("distressed denim pants"));
    outfit.addWeight(Item.get("bejeweled pledge pin"));
    outfit.addExtra("-tie");

    return {
      outfit: outfit,
      location: null,
      run: () => {
        visitUrl("bigisland.php?action=junkman&pwd");
      },
    };
  }

  level(): number {
    return 12;
  }

  status(): QuestStatus {
    if (getProperty("sidequestJunkyardCompleted") != "none") {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("warProgress") != "started") {
      return QuestStatus.NOT_READY;
    }

    if (
      availableAmount(this.sealTooth) > 0 &&
      availableAmount(this.magnet) > 0 &&
      this.children.find((c) => c.status() != QuestStatus.COMPLETED) != null
    ) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  getId(): QuestType {
    return "Council / War / Gremlins";
  }

  getLocations(): Location[] {
    return [];
  }
}

class GremlinQuest implements QuestInfo {
  id: QuestType;
  loc: Location;
  monster: Monster;
  item: Item;
  toolString: string;
  magnet: Item = Item.get("molybdenum magnet");
  flyers: Item = Item.get("Rock band flyers");
  sealTooth: Item = Item.get("Seal Tooth");
  pants: Item = Item.get("Greatest American Pants");

  constructor(
    id: QuestType,
    loc: Location,
    monster: Monster,
    item: Item,
    toolString: string
  ) {
    this.id = id;
    this.loc = loc;
    this.monster = monster;
    this.item = item;
    this.toolString = toolString;
  }

  getId(): QuestType {
    return this.id;
  }

  level(): number {
    return 12;
  }

  status(): QuestStatus {
    if (getProperty("sidequestJunkyardCompleted") != "none") {
      return QuestStatus.COMPLETED;
    }

    if (
      availableAmount(this.sealTooth) == 0 ||
      availableAmount(this.magnet) == 0
    ) {
      return QuestStatus.NOT_READY;
    }

    if (availableAmount(this.item) > 0) {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("warProgress") != "started") {
      return QuestStatus.NOT_READY;
    }

    if (!haveSkill(Skill.get("Subatomic Hardening"))) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit()
      .addWeight("ML", -1, null, -70)
      .addWeight("DA")
      .addWeight("DR", 5);
    outfit.hpWeight = 1;

    if (
      availableAmount(this.pants) > 0 &&
      currentPredictions().get(this.loc) != this.monster
    ) {
      outfit.addWeight(this.pants);
    }

    const macro2 = Macro.if_(
      "match " + this.toolString,
      Macro.item(this.magnet).step("abort")
    ).item(this.sealTooth);

    const macro = new Macro().if_(
      this.monster,
      Macro.while_("!pastround 25 && !hpbelow 50", macro2)
    );

    const orbs = [
      this.monster,
      Monster.get(this.monster.name.replace(" (tool)", "")),
    ];

    return {
      location: this.loc,
      outfit: outfit,
      orbs: orbs,
      mayFreeRun: true,
      freeRun: (mons) => mons != this.monster,
      run: () => {
        const settings = new AdventureSettings();
        settings.setDuringFightMacro(macro);

        settings.addBanish(Monster.get("A.M.C Gremlin"));
        // settings.addBanish(Monster.get("vegetable gremlin"));
        // settings.addBanish(Monster.get("batwinged gremlin"));
        // settings.addBanish(Monster.get("spider gremlin"));
        // settings.addBanish(Monster.get("batwinged gremlin"));

        greyAdv(this.loc, outfit, settings);
      },
    };
  }

  getLocations(): Location[] {
    return [this.loc];
  }
}
