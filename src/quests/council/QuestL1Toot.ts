import {
  autosell,
  availableAmount,
  council,
  getProperty,
  haveSkill,
  Item,
  itemAmount,
  Location,
  myMeat,
  Skill,
  storageAmount,
  toBoolean,
  use,
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
  purq: Item = Item.get("porquoise");
  bacon: Item = Item.get("baconstone");
  ham: Item = Item.get("hamethyst");
  loop: Skill = Skill.get("Infinite Loop");

  sellGems: PossiblePath;
  paths: PossiblePath[];
  boombox: Item = Item.get("SongBoom&trade; BoomBox");
  deck: Item = Item.get("Deck of Every Card");
  ring: Item = Item.get("Gold Wedding Ring");
  gold: Item = Item.get("1,970 Carat Gold");
  mickyCard: Item = Item.get("1952 Mickey Mantle card");
  autosells: Item[] = [this.ring, this.gold, this.mickyCard];
  letter = Item.get("Letter from King Ralph XI");
  sack = Item.get("pork elf goodies sack");

  level(): number {
    return 1;
  }

  status(): QuestStatus {
    if (
      getProperty("questM05Toot") == "finished" &&
      availableAmount(this.letter) + availableAmount(this.sack) == 0 &&
      (myMeat() >= 300 || haveSkill(this.loop))
    ) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  mustBeDone(): boolean {
    return true;
  }

  free(): boolean {
    return true;
  }

  createPaths(assumeUnstarted: boolean): void {
    this.paths = [];

    const hasEnoughMeat =
      this.autosells.find((i) => itemAmount(i) > 0) ||
      myMeat() >= 5000 ||
      (toBoolean(getProperty("hasMaydayContract")) &&
        availableAmount(this.boombox) > 0);

    if (hasEnoughMeat) {
      this.paths.push(new PossiblePath(0));
      return;
    }

    if (assumeUnstarted || !getProperty("_deckCardsSeen").includes("Mickey")) {
      this.paths.push(
        new PossiblePath(0).add(ResourceCategory.DECK_OF_EVERY_CARD_CHEAT)
      );
    }

    if (!assumeUnstarted && GreySettings.isHardcoreMode()) {
      this.paths.push((this.sellGems = new PossiblePath(20)));
    }

    if (
      (assumeUnstarted && availableAmount(this.ring) > 0) ||
      storageAmount(this.ring) > 0
    ) {
      this.paths.push(new PossiblePath(0).addPull(this.ring));
    }

    this.paths.push(new PossiblePath(0).addPull(this.gold).addMeat(10000));
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  run(path: PossiblePath): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        if (availableAmount(this.letter) == 0) {
          council();
          visitUrl("tutorial.php?action=toot");
        }

        if (availableAmount(this.letter) > 0) {
          use(this.letter);
        }

        if (availableAmount(this.sack) > 0) {
          use(this.sack);
        }

        if (path.canUse(ResourceCategory.PULL)) {
          GreyPulls.tryPull(path.pulls[0]);
        } else if (path === this.sellGems) {
          for (const i of [this.purq, this.bacon, this.ham]) {
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

        this.autosells
          .filter((i) => itemAmount(i) > 0)
          .forEach((i) => autosell(i, itemAmount(i)));

        // If we're poor, sell one of the gems for some starting meat
        if (myMeat() < 500) {
          // Sell one of the gems, with purq last
          for (const item of [this.bacon, this.ham, this.purq]) {
            if (itemAmount(item) == 0) {
              continue;
            }

            autosell(item, 1);
            break;
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
