import { Slot } from "kolmafia";

export interface DelayBurner {
  isViable(): boolean;
  isFree(): boolean;
  readyIn(): number;
  doSetup(): void;
  doFightSetup(): Slot[];
  isViableAsCombatReplacer(): boolean;
}
