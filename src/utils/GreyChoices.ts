export interface GreyChoices {
  handleChoice(choiceNo: number): number;
  callOutOfScopeChoiceBehavior(choiceNo: number): boolean;
}
