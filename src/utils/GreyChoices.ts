export interface GreyChoices {
  handleChoice(choiceNo: number): number;
  calledOutOfScopeChoiceBehavior(choiceNo: number): boolean;
}
