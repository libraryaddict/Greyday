import { Location, getProperty } from "kolmafia";
import { ResourceCategory } from "../../../../../typings/ResourceTypes";
import { PossiblePath, TaskInfo } from "../../../../../typings/TaskInfo";
import { GreyOutfit } from "../../../../../utils/GreyOutfitter";
import { QuestAdventure, QuestStatus } from "../../../../Quests";
import { QuestType } from "../../../../QuestTypes";
import { HeroKeysTemplate } from "./HeroKeysTemplate";

export class QuestPackOfCardsKey extends TaskInfo implements HeroKeysTemplate {
  pickCard: PossiblePath;

  getKeys() {
    return 1;
  }

  createPaths(assumeUnstarted: boolean) {
    this.pickCard = new PossiblePath(0).add(
      ResourceCategory.DECK_OF_EVERY_CARD_CHEAT
    );
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
    if (getProperty("_deckCardsSeen").includes("XVI - The Tower")) {
      return QuestStatus.COMPLETED;
    }

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
