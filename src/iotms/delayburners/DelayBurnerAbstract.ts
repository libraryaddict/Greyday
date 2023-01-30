import { Item, Slot } from "kolmafia";

export interface DelayBurner {
  isViable(): boolean; // If this fight be can used
  isFree(): boolean; // If the next fight will be a free fight
  readyIn(): number; // Estimated turns until its ready
  doSetup(): void; // Initial setup that happens only once at the start of the script
  doFightSetup(): Slot[]; // Set up this delay burner to work, and return a list of slots used
  forcesFight(): boolean; // If this will override NCs to force a fight
  getFightSetup(): Item[];
}
