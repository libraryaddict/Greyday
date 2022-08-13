import { Location } from "kolmafia";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";
import { QuestL12Battlefield } from "./islandwar/QuestL12Battlefield";
import { QuestL12FratOutfit } from "./islandwar/QuestL12FratOutfit";
import { Quest12WarNuns } from "./islandwar/QuestL12Nuns";
import { QuestL12StartWar } from "./islandwar/QuestL12StartWar";
import { QuestL12WarBoss } from "./islandwar/QuestL12WarBoss";
import { QuestL12WarFlyers } from "./islandwar/QuestL12WarFlyers";
import { WarGremlins } from "./islandwar/QuestL12WarGremlins";
import { QuestL12Lobster } from "./islandwar/QuestL12WarLobster";
import { QuestL12Worms } from "./islandwar/QuestL12Worms";

export class QuestL12War implements QuestInfo {
  children: QuestInfo[] = [
    new QuestL12Battlefield(),
    new WarGremlins(),
    new Quest12WarNuns(),
    new QuestL12Worms(),
    new QuestL12StartWar(),
    new QuestL12WarBoss(),
    new QuestL12Lobster(),
    new QuestL12WarFlyers(),
    new QuestL12FratOutfit(),
  ];

  getLocations(): Location[] {
    return [];
  }

  getChildren(): QuestInfo[] {
    return this.children;
  }

  getId(): QuestType {
    return "Council / War / Parent";
  }

  level(): number {
    return -1;
  }

  status(): QuestStatus {
    return QuestStatus.COMPLETED;
  }

  run(): QuestAdventure {
    throw new Error("Method not implemented.");
  }
}
