import { Location, getProperty } from "kolmafia";
import { ResourceCategory } from "../../../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../../../typings/TaskInfo";
import { GreyOutfit } from "../../../../../utils/GreyOutfitter";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../../../Quests";
import { QuestType } from "../../../../QuestTypes";

export class QuestPackOfCardsKey extends TaskInfo implements QuestInfo {
  pickCard: PossiblePath;

  createPaths(assumeUnstarted: boolean) {
    this.pickCard = new PossiblePath(0).add(
      ResourceCategory.DECK_OF_EVERY_CARD_CHEAT
    );

    if (!assumeUnstarted) {
      if (getProperty("_deckCardsSeen").includes("XVI - The Tower")) {
        this.pickCard.addUsed(ResourceCategory.DECK_OF_EVERY_CARD_CHEAT);
      }
    }
  }

  getPossiblePaths(): PossiblePath[] {
    return [this.pickCard];
  }

  getId(): QuestType {
    return "Council / Tower / Keys / Heroes / DeckOfCards";
  }

  level(): number {
    return 13;
  }

  status(path: PossiblePath): QuestStatus {
    if (
      path != null &&
      !path.canUse(ResourceCategory.DECK_OF_EVERY_CARD_CHEAT)
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
        path
          .getResource(ResourceCategory.DECK_OF_EVERY_CARD_CHEAT)
          .pickCard("XVI - The Tower");
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  needAdventures?(): number {
    return 0;
  }
}
