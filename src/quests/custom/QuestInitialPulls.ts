import {
  availableAmount,
  Familiar,
  historicalPrice,
  Item,
  itemAmount,
  Location,
  pullsRemaining,
  storageAmount,
  useFamiliar,
} from "kolmafia";
import { ResourceCategory } from "../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../typings/TaskInfo";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { GreyPulls } from "../../utils/GreyResources";
import { GreySettings } from "../../utils/GreySettings";
import { getAllCombinations, hasPulled } from "../../utils/GreyUtils";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestInitialPulls extends TaskInfo implements QuestInfo {
  requiredPulls: [Item, number][] = [
    [Item.get("Yule Hatchet"), -150],
    [Item.get("Teacher's Pen"), -70],
  ];
  possiblePulls: [Item, number][] = [
    [Item.get("Giant Yellow Hat"), -35],
    [Item.get("Mafia Thumb Ring"), -30],
    [Item.get("Portable cassette player"), -15],
    [Item.get("Pantsgiving"), -10],
  ];
  paths: PossiblePath[];
  freeRunners: Item[] = [
    "Greatest American Pants",
    "navel ring of navel gazing",
  ].map((s) => Item.get(s));
  donePulls: boolean;

  createPaths(assumeUnstarted: boolean) {
    const mlItem = ["HOA regulation book", "Space Trip safety headphones"]
      .map((s) => Item.get(s))
      .filter((i) => availableAmount(i) + storageAmount(i) > 0);

    if (
      mlItem.length > 0 &&
      (assumeUnstarted || mlItem.find((i) => availableAmount(i) > 0) == null)
    ) {
      this.requiredPulls.push([mlItem[0], -30]);
    }

    const freeRunner = this.freeRunners.find(
      (i) => availableAmount(i) + storageAmount(i) > 0
    );

    this.paths = [];
    this.paths.push(new PossiblePath(0));

    // If we're not assuming we're unstarted, then filter all the pulls we already have
    if (!assumeUnstarted) {
      this.requiredPulls = this.requiredPulls.filter(
        ([i]) => availableAmount(i) == 0
      );
      this.possiblePulls = this.possiblePulls.filter(
        ([i]) =>
          availableAmount(i) == 0 &&
          (historicalPrice(i) < 50_000 || storageAmount(i) > 0)
      );
    }

    if (freeRunner != null && availableAmount(freeRunner) == 0) {
      this.possiblePulls.push([freeRunner, -20]);
    }

    this.paths.push(this.getTotals(this.requiredPulls));

    // Need to make this better.. Its a real laugh.
    for (const combination of getAllCombinations(this.possiblePulls)) {
      this.paths.push(this.getTotals([...this.requiredPulls, ...combination]));
    }
  }

  getId(): QuestType {
    return "Misc / Initial Pulls";
  }

  getLocations(): Location[] {
    return [];
  }

  getTotals(items: [Item, number][]): PossiblePath {
    /*items = items.filter(
      ([i]) => storageAmount(i) > 0 || historicalPrice(i) < 50000
    );*/

    let advs = items.map(([, amount]) => amount).reduce((p, n) => p + n, 0);

    if (
      items.find(([item]) => item == Item.get("Mafia Thumb Ring")) != null &&
      items.find(([item]) => this.freeRunners.includes(item))
    ) {
      // If we're using mafia ring and we plan to do free runs, mafia won't trigger as much..
      advs -= 20;
    }

    const path = new PossiblePath(advs);

    items.forEach(([i]) => path.addPull(i));

    return path;
  }

  getPossiblePaths(): PossiblePath[] {
    return this.paths;
  }

  level(): number {
    return 1;
  }

  status(path: PossiblePath): QuestStatus {
    if (
      pullsRemaining() <= 0 ||
      GreySettings.isHardcoreMode() ||
      (path != null && !path.canUse(ResourceCategory.PULL))
    ) {
      return QuestStatus.COMPLETED;
    }

    return QuestStatus.READY;
  }

  run(path: PossiblePath): QuestAdventure {
    return {
      location: null,
      outfit: GreyOutfit.IGNORE_OUTFIT,
      run: () => {
        useFamiliar(Familiar.get("Grey Goose")); // Force it to be leveled up if we happen to have short order cook

        for (const item of path.pulls) {
          if (hasPulled(item)) {
            continue;
          }

          GreyPulls.tryPull(item, 25000);
        }

        const failedPulls = path.pulls.filter((i) => itemAmount(i) == 0);

        if (failedPulls.length > 0) {
          throw "Failed to pull the items " + failedPulls.join(", ");
        }

        if (path.canUse(ResourceCategory.PULL)) {
          throw (
            "Expected to have no pulls remaining, but it wants to pull " +
            path.canUse(ResourceCategory.PULL) +
            " more"
          );
        }
      },
    };
  }

  mustBeDone(): boolean {
    return true;
  }

  free(): boolean {
    return true;
  }
}
