import { Familiar, getProperty, haveFamiliar, toInt } from "kolmafia";

// Class for exposing which familiars are worth running, this is not part of the grey you script as such and is more of an opportunity thing.
export class FamiliarPicker {
  getFamiliars(): Familiar[] {
    const fams: Familiar[] = [];

    const lessThan = (
      familiar: string,
      property: string,
      amount: number = 1
    ) => {
      if (toInt(getProperty(property)) >= amount) {
        return;
      }

      const fam = Familiar.get(familiar);

      if (!haveFamiliar(fam)) {
        return;
      }

      fams.push(fam);
    };

    const notEquals = (
      familiar: string,
      property: string,
      value: string = "true"
    ) => {
      if (getProperty(property) == value) {
        return;
      }

      const fam = Familiar.get(familiar);

      if (!haveFamiliar(fam)) {
        return;
      }

      fams.push(fam);
    };

    lessThan("Grimstone Golem", "");
    lessThan("Angry Jung Man", "");
    lessThan("Grim Brother", "");
    lessThan("Adventurous Spelunker", "_spelunkingTalesDrops");
    lessThan("Unconscious Collective", "");
    lessThan("Astral badger", "");
    lessThan("Baby Sandworm", "");
    lessThan("Blavious Kloop", "");
    lessThan("Bloovian Groose", "");
    lessThan("Fist Turkey", "");
    lessThan("Galloping Grill", "");
    lessThan("Golden Monkey", "");
    lessThan("Green Pixie", "");
    lessThan("Li'l Xenomorph", "");
    lessThan("Llama Lama", "");
    lessThan("Ms. Puck Man", "");
    lessThan("Obtuse Angel", "");
    lessThan("Pocket Professor", "");
    lessThan("Puck Man", "");
    lessThan("Rogue Program", "");
    lessThan("Stomping Boots", "");
    lessThan("XO Skeleton", "");
    lessThan("Frumious Bandersnatch", "");
    lessThan("Machine Elf", "");
    return [];
  }
}
