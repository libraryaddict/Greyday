import {
  myHp,
  myMaxhp,
  cliExecute,
  Location,
  Item,
  Monster,
  availableAmount,
  use,
  retrieveItem,
  maximize,
  pullsRemaining,
} from "kolmafia";
import { PropertyManager } from "../../../../utils/Properties";
import { greyAdv, AdventureSettings } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import { Macro } from "../../../../utils/MacroBuilder";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";
import { GreySettings } from "../../../../utils/GreySettings";

export class QuestTowerMirror implements QuestInfo {
  wand: Item = Item.get(" Wand of Nagamar");
  lW: Item = Item.get("ruby W");
  lA: Item = Item.get("metallic A");
  lN: Item = Item.get("lowercase N");
  lD: Item = Item.get("heavy D");
  wa: Item = Item.get("WA");
  nd: Item = Item.get("ND");
  locations: [Item, Monster, Location][] = [
    ["Ruby W", "W imp", "Pandamonium Slums"],
    ["Metallic A", "MagiMechTech MechaMech", "The Penultimate Fantasy Airship"],
    ["lowercase N", "XXX pr0n", "The Valley of Rof L'm Fao"],
    [
      "heavy D",
      "Alphabet Giant",
      "The Castle in the Clouds in the Sky (Basement)",
    ],
  ].map((s) => [Item.get(s[0]), Monster.get(s[1]), Location.get(s[2])]);
  clover: Item = Item.get("11-leaf Clover");

  getId(): QuestType {
    return "Council / Tower / Mirror";
  }

  level(): number {
    return 13;
  }

  status(): QuestStatus {
    let status = getQuestStatus("questL13Final");

    if (status < 9) {
      return QuestStatus.NOT_READY;
    }

    if (status > 9) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  tryClover(): QuestAdventure {
    return {
      location: null,
      run: () => {
        use(this.clover);
        greyAdv(Location.get("The Castle in the Clouds in the Sky (Basement)"));
      },
    };
  }

  run(): QuestAdventure {
    if (availableAmount(this.wand) == 0) {
      return this.createWand();
    }

    // Equip outfit early to try save some hp
    let outfit = GreyOutfit.IGNORE_OUTFIT;

    return {
      location: null,
      outfit: outfit,
      run: () => {
        let props = new PropertyManager();
        props.setChoice(1015, 2); // Break mirror

        try {
          greyAdv("place.php?whichplace=nstower&action=ns_08_monster4", outfit);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  createWand(): QuestAdventure {
    const toGrab = this.locations.filter(([i]) => availableAmount(i) == 0);

    if (
      toGrab.length > 0 &&
      (GreySettings.isHardcoreMode() || pullsRemaining() != -1)
    ) {
      for (let [, monster, loc] of toGrab) {
        if (availableAmount(this.clover) > 0) {
          return this.tryClover();
        }

        let outfit = new GreyOutfit().setItemDrops();

        return {
          location: loc,
          outfit: outfit,
          run: () => {
            let settings = new AdventureSettings();
            settings.addNoBanish(monster);

            greyAdv(loc, outfit, settings);
          },
        };
      }
    }

    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        retrieveItem(this.wand);
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }
}
