import { getProperty, print, setProperty, toString } from "kolmafia";

export class PropertyManager {
  private properties = new Map<string, string>();

  setProperty(property: string, value: string, quiet: boolean = true) {
    if (!this.properties.has(property)) {
      this.properties.set(property, getProperty(property));
    }

    setProperty(property, value);

    if (!quiet) {
      print("Set property " + property + " to " + value);
    }
  }

  setChoice(choice: number, value: number) {
    this.setProperty("choiceAdventure" + choice, value.toString());
  }

  resetChoice(choice: number) {
    this.reset("choiceAdventure" + choice);
  }

  reset(property: string, quiet: boolean = true) {
    if (this.properties.has(property)) return;

    setProperty(property, this.properties.get(property));

    if (!quiet) {
      print(
        "Reset property " +
          property +
          " back to " +
          this.properties.get(property)
      );
    }

    this.properties.delete(property);
  }

  resetAll(quiet: boolean = true) {
    this.properties.forEach((value, key) => {
      setProperty(key, value);

      if (!quiet) {
        print("Reset property " + key + " back to " + value);
      }
    });

    this.properties.clear();
  }
}
