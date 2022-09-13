import {
  availableAmount,
  getProperty,
  haveSkill,
  Item,
  itemAmount,
  Location,
  Monster,
  myHp,
  print,
  retrieveItem,
  Skill,
  visitUrl,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { UmbrellaState } from "../../../utils/GreyUtils";
import { Macro } from "../../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class WarGremlins implements QuestInfo {
  magnet: Item = Item.get("molybdenum magnet");
  flyers: Item = Item.get("Rock band flyers");
  sealTooth: Item = Item.get("Seal Tooth");
  locations: [Location, Monster, Item, string][] = [
    [
      Location.get("Next to that barrel with something burning in it"),
      Monster.get("batwinged gremlin (tool)"),
      Item.get("molybdenum hammer"),
      "It whips out a hammer",
    ],
    [
      Location.get("Out by that rusted-out car"),
      Monster.get("vegetable gremlin (tool)"),
      Item.get("molybdenum screwdriver"),
      "It whips out a screwdriver",
    ],
    [
      Location.get("over where the old tires are"),
      Monster.get("erudite gremlin (tool)"),
      Item.get("molybdenum crescent wrench"),
      "He whips out a crescent wrench",
    ],
    [
      Location.get("near an abandoned refrigerator"),
      Monster.get("spider gremlin (tool)"),
      Item.get("Molybdenum Pliers"),
      "It whips out a pair of pliers",
    ],
  ];

  mustBeDone(): boolean {
    return (
      itemAmount(this.magnet) == 0 ||
      this.locations.filter((l) => itemAmount(l[2]) == 0)[0] == null
    );
  }

  free(): boolean {
    return this.mustBeDone();
  }

  run(): QuestAdventure {
    if (itemAmount(this.magnet) == 0) {
      return this.visitJunkman();
    }

    const toVisit = this.locations.filter((l) => itemAmount(l[2]) == 0)[0];

    if (toVisit == null) {
      return this.visitJunkman();
    }

    if (availableAmount(this.sealTooth) == 0) {
      return this.getSealTooth();
    }

    const loc: Location = toVisit[0];
    const monster: Monster = toVisit[1];
    const magnetString: string = toVisit[3];

    const outfit = new GreyOutfit("-ML +DA +DR +familiar experience");
    outfit.hpWeight = 1;
    outfit.umbrellaSetting = UmbrellaState.DAMAGE_REDUCTION_SHIELD;

    const macro2 = Macro.if_(
      "match " + magnetString,
      Macro.item(this.magnet).step("abort")
    ).item(this.sealTooth);

    const macro = new Macro().if_(
      monster,
      Macro.while_("!pastround 25 && !hpbelow 50", macro2)
    );

    return {
      location: loc,
      outfit: outfit,
      orbs: [monster],
      freeRun: (mons) => mons != monster,
      run: () => {
        const settings = new AdventureSettings();
        settings.setDuringFightMacro(macro);

        settings.addBanish(Monster.get("A.M.C Gremlin"));
        // settings.addBanish(Monster.get("vegetable gremlin"));
        // settings.addBanish(Monster.get("batwinged gremlin"));
        // settings.addBanish(Monster.get("spider gremlin"));
        // settings.addBanish(Monster.get("batwinged gremlin"));

        greyAdv(loc, outfit, settings);
      },
    };
  }

  getSealTooth(): QuestAdventure {
    return {
      location: null,
      run: () => {
        retrieveItem(Item.get("Seal tooth"));
      },
    };
  }

  visitJunkman(): QuestAdventure {
    const outfit = new GreyOutfit();
    outfit.addItem(Item.get("Beer Helmet"));
    outfit.addItem(Item.get("distressed denim pants"));
    outfit.addItem(Item.get("bejeweled pledge pin"));
    outfit.addBonus("-tie");

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

    if (!haveSkill(Skill.get("Subatomic Hardening"))) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  getId(): QuestType {
    return "Council / War / Gremlins";
  }

  getLocations(): Location[] {
    return this.locations
      .filter((g) => availableAmount(g[2]) == 0)
      .map((g) => g[0]);
  }
}
