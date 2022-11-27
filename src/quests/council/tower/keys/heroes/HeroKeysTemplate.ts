import { QuestInfo } from "../../../../Quests";

export interface HeroKeysTemplate extends QuestInfo {
  getKeys(): number;
}
