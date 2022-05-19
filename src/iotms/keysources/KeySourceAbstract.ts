export interface KeySource {
  available(): boolean; // Is this a viable key source?
  turnsExpected(): number; // How many turns do we expect to burn?
  estimatedMeatCost(): number; // How much meat would doing this key source cost us?
}
