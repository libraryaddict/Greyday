import {
  availableAmount,
  Effect,
  effectModifier,
  getProperty,
  haveEffect,
  Item,
  itemAmount,
  Location,
  Monster,
  Skill,
  toInt,
  toMonster,
  use,
  visitUrl,
} from "kolmafia";
import { greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { Macro } from "../../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL12Worms implements QuestInfo {
  getId(): QuestType {
    return "Council / War / Filthworms";
  }

  effects: [Item, Location][] = [
    [
      Item.get("filthworm royal guard scent gland"),
      Location.get("The Queen's Chamber"),
    ],
    [
      Item.get("filthworm drone scent gland"),
      Location.get("The Royal Guard Chamber"),
    ],
    [
      Item.get("Filthworm hatchling scent gland"),
      Location.get("The Feeding Chamber"),
    ],
    [null, Location.get("The Hatching Chamber")],
  ];

  getLocations(): Location[] {
    return this.effects.map((e) => e[1]);
  }

  level(): number {
    return 12;
  }

  status(): QuestStatus {
    if (getProperty("sidequestOrchardCompleted") != "none") {
      return QuestStatus.COMPLETED;
    }

    if (
      getProperty("warProgress") != "started" ||
      toInt(getProperty("hippiesDefeated")) < 64
    ) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  outfitNeeded(): boolean {
    return itemAmount(Item.get("heart of the filthworm queen")) > 0;
  }

  run(): QuestAdventure {
    if (itemAmount(Item.get("heart of the filthworm queen")) > 0) {
      let outfit = new GreyOutfit();
      outfit.addItem(Item.get("Beer Helmet"));
      outfit.addItem(Item.get("distressed denim pants"));
      outfit.addItem(Item.get("bejeweled pledge pin"));

      return {
        outfit: outfit,
        location: null,
        run: () => {
          visitUrl("bigisland.php?place=orchard&action=stand&pwd=");
          visitUrl("bigisland.php?place=orchard&action=stand&pwd=");
          visitUrl("shop.php?whichshop=hippy");
        },
      };
    }

    let outfit = new GreyOutfit();

    if (
      itemAmount(Item.get("filthworm royal guard scent gland")) > 0 ||
      haveEffect(Effect.get("Filthworm Guard Stench"))
    ) {
      outfit.meatDropWeight = 4;
    } else {
      outfit.setItemDrops();
    }

    let chamber = this.effects.find(
      (e) =>
        e[0] == null ||
        availableAmount(e[0]) > 0 ||
        haveEffect(effectModifier(e[0], "Effect")) > 0
    )[1];

    return {
      location: chamber,
      outfit: outfit,
      run: () => {
        this.useGlands();

        greyAdv(chamber, outfit);
      },
    };
  }

  useGlands() {
    for (let i of this.effects) {
      if (i[0] == null) {
        continue;
      }

      let effect = effectModifier(i[0], "Effect");

      if (haveEffect(effect) > 0) {
        break;
      }

      let amount = itemAmount(i[0]);

      if (amount == 0) {
        continue;
      }

      use(i[0], 1);
      break;
    }
  }

  mustBeDone(): boolean {
    for (let [glandRequired, loc] of this.effects) {
      if (glandRequired == null) {
        continue;
      }

      let effect = effectModifier(glandRequired, "Effect");

      // If the gland is in operation
      if (haveEffect(effect) > 0) {
        return true;
      }

      // If the gland is available
      if (availableAmount(glandRequired) > 0) {
        return false;
      }
    }

    return false;
  }
}
