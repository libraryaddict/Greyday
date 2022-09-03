import {
  autosell,
  availableAmount,
  council,
  Familiar,
  getProperty,
  Item,
  Location,
  storageAmount,
  toBoolean,
  use,
  useFamiliar,
  visitUrl,
} from "kolmafia";
import { ResourceCategory } from "../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../typings/TaskInfo";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { GreyPulls } from "../../utils/GreyResources";
import { GreySettings } from "../../utils/GreySettings";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestL1Toot extends TaskInfo implements QuestInfo {
  toSell: Item[] = ["hamethyst", "baconstone", "porquoise"].map((s) =>
    Item.get(s)
  );
  paths: PossiblePath[];
  boombox: Item = Item.get("SongBoom&trade; BoomBox");
  deck: Item = Item.get("Deck of Every Card");
  ring: Item = Item.get("Gold Wedding Ring");
  gold: Item = Item.get("1,970 Carat Gold");
  mickyCard: Item = Item.get("1952 Mickey Mantle card");

  level(): number {
    return 1;
  }

  status(): QuestStatus {
    if (getProperty("questM05Toot") == "finished") {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  createPaths(assumeUnstarted: boolean): void {
    this.paths = [];

    const hasEnoughMeat =
      toBoolean(getProperty("hasMaydayContract")) &&
      availableAmount(this.boombox) > 0;

    if (hasEnoughMeat) {
      this.paths.push(new PossiblePath(0));
    } else {
      if (
        assumeUnstarted ||
        !getProperty("_deckCardsSeen").includes("Mickey")
      ) {
        this.paths.push(
          new PossiblePath(0).add(ResourceCategory.DECK_OF_EVERY_CARD_CHEAT)
        );
      }

      if (!assumeUnstarted && GreySettings.isHardcoreMode()) {
        this.paths.push(new PossiblePath(20).addIgnored("Wish"));
      }

      if (
        (assumeUnstarted && availableAmount(this.ring) > 0) ||
        storageAmount(this.ring) > 0
      ) {
        this.paths.push(new PossiblePath(0).addPull(this.ring));
      }

      this.paths.push(new PossiblePath(0).addPull(this.gold).addMeat(10000));
    }
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  run(path: PossiblePath): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        useFamiliar(Familiar.get("Grey Goose")); // Force it to be leveled up if we happen to have short order cook
        council();
        visitUrl("tutorial.php?action=toot");
        use(Item.get("Letter from King Ralph XI"));
        use(Item.get("pork elf goodies sack"));

        if (path.canUse(ResourceCategory.PULL)) {
          GreyPulls.tryPull(path.pulls[0]);
        } else if (path.ignoreResources.includes("Wish")) {
          for (const i of this.toSell) {
            if (availableAmount(i) > 0) {
              autosell(i, availableAmount(i));
            }
          }
        } else if (path.canUse(ResourceCategory.DECK_OF_EVERY_CARD_CHEAT)) {
          path
            .getResource(ResourceCategory.DECK_OF_EVERY_CARD_CHEAT)
            .pickCard("Mickey");

          if (availableAmount(this.mickyCard) > 0) {
            path.addUsed(ResourceCategory.DECK_OF_EVERY_CARD_CHEAT);
            autosell(this.mickyCard, 1);
          } else {
            throw "Expected to have sold a " + this.mickyCard;
          }
        }

        council();
      },
    };
  }

  getId(): QuestType {
    return "Council / Toot";
  }

  getLocations(): Location[] {
    return [];
  }
}
