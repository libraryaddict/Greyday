import { getProperty, print, setProperty } from "kolmafia";

export const handledChoices: [number, number][] = [];

export class PropertyManager {
  private properties = new Map<string, string>();
  private cleanups: (() => void)[] = [];
  private choicesSet: [number, number][] = [];

  setProperty(property: string, value: string, quiet: boolean = true) {
    if (!this.properties.has(property)) {
      this.properties.set(property, getProperty(property));
    }

    setProperty(property, value);

    if (!quiet) {
      print("Set property " + property + " to " + value);
    }
  }

  addCleanup(cleanup: () => void) {
    this.cleanups.push(cleanup);
  }

  setChoiceProperty(choice: number, value: number) {
    this.setChoice(choice, value);

    setProperty("choiceAdventure" + choice, value.toString());
  }

  setChoice(choice: number, value: number) {
    const combo: [number, number] = [choice, value];

    this.choicesSet.push(combo);
    handledChoices.push(combo);
  }

  resetAll(quiet: boolean = true) {
    this.properties.forEach((value, key) => {
      setProperty(key, value);

      if (!quiet) {
        print("Reset property " + key + " back to " + value);
      }
    });

    this.properties.clear();

    for (const combo of this.choicesSet) {
      const index = handledChoices.lastIndexOf(combo);

      if (index < 0) {
        throw "Failed to reset a choice! Was missing!";
      }

      handledChoices.splice(index, 1);
    }

    this.choicesSet.splice(0, this.choicesSet.length);

    this.cleanups.forEach((c) => c());
    this.cleanups.splice(0, this.cleanups.length);
  }
}
