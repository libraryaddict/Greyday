import {
  availableAmount,
  buyUsingStorage,
  cliExecute,
  Familiar,
  getProperty,
  getRelated,
  haveFamiliar,
  Item,
  mallPrice,
  outfitPieces,
  storageAmount,
  use,
} from "kolmafia";

export function getBanishers() {
  // Scrapbook
  // Bowl a curveball
  // Middle finger ring
  // Grey You banisher skill
}

export function getYellowRays() {
  // Yellow Rocket
  // 9 Volt battery
}

export function getSniffers() {
  // Nosy Nose fam
}

export function getCopiers() {
  // Backup Camera
  // Cloning Kit
  // Combat Locket
  // 4-D camera
}

export class GreyPulls {
  static pullFratWarOutfit() {
    for (let i of outfitPieces("Frat Warrior Fatigues")) {
      if (availableAmount(i) > 0) {
        continue;
      }

      GreyPulls.tryPull(i);
    }
  }

  static pullDeckOfLewdCards() {
    GreyPulls.tryPull(Item.get("deck of lewd playing cards"));
  }

  static pullLynrdProtesters() {
    for (let i of [
      "lynyrdskin breeches",
      "lynyrdskin cap",
      "lynyrdskin tunic",
    ].map((s) => Item.get(s))) {
      GreyPulls.tryPull(i);
    }
  }

  static pullBoxOfMatches() {
    GreyPulls.tryPull(Item.get("book of matches"));
  }

  static pullStartingGear() {
    GreyPulls.tryPull(Item.get("yule hatchet"));
    GreyPulls.tryPull(Item.get("mafia thumb ring"));
    GreyPulls.tryPull(Item.get("HOA regulation book"));
    GreyPulls.tryPull(Item.get("Hemlock Helm"));
    GreyPulls.tryPull(Item.get('"Remember the Trees" Shirt'));
  }

  static pullNinjaGear() {
    GreyPulls.tryPull(Item.get("ninja rope"));
    GreyPulls.tryPull(Item.get("ninja crampons"));
    GreyPulls.tryPull(Item.get("ninja carabiner"));
  }

  static pullScrip() {
    GreyPulls.tryPull(Item.get("Shore Inc. Ship Trip Scrip"));
  }

  static pullSmut() {
    GreyPulls.tryPull(Item.get("smut orc keepsake box"));
  }

  static pullEnchantedBean() {
    GreyPulls.tryPull(Item.get("enchanted bean"));
  }

  static pullMeatBuffers() {
    GreyPulls.tryPull(Item.get("Mick's IcyVapoHotness Inhaler"));
  }

  static pullOre() {
    if (getProperty("questL08Trapper") != "step1") {
      return;
    }

    let ore = Item.get(getProperty("trapperOre"));

    if (ore == Item.get("none") || availableAmount(ore) >= 3) {
      return;
    }

    this.tryPull(ore);
  }

  static pullZappableKey() {
    let items = getZappables(Item.get("Jarlsberg's key")).filter(
      (i) => !i.quest
    );

    for (let i of items) {
      if (storageAmount(i) <= 0) {
        continue;
      }

      this.tryPull(i);
      return;
    }

    items.sort((i1, i2) => mallPrice(i1) - mallPrice(i2));

    this.tryPull(items[0]);
  }

  static pullRatTangles() {
    GreyPulls.tryPull(Item.get("tangle of rats tails"));
  }

  static pullGiantsCastle() {
    for (let s of ["Mohawk Wig", "Amulet of Extreme Plot Significance"].map(
      (s) => Item.get(s)
    )) {
      if (availableAmount(s) > 0) {
        continue;
      }

      GreyPulls.tryPull(s);
    }
  }

  static pullRusty() {
    GreyPulls.tryPull(Item.get("rusty hedge trimmers"));
  }

  static pullStarChart() {
    GreyPulls.tryPull(Item.get("Star Chart"));
  }

  static tryPull(item: Item, maxCost: number = 30_000) {
    if (storageAmount(item) == 0) {
      buyUsingStorage(item, 1, maxCost);
    }

    if (storageAmount(item) == 0) {
      throw "Unable to pull " + item.name;
    }

    cliExecute("pull " + item.name);
  }
}

export class GreyClovers {
  static clover: Item = Item.get("11-leaf Clover");

  static doOres() {
    // 2
    use(this.clover);
  }

  static doWand() {
    // 1
    use(this.clover);
  }
}

export class GreyVortex {
  static doBatCave() {
    // 20
  }

  static doHarem() {
    // 20
  }

  static doHiddenTemple() {
    // 20
  }

  static doSmutOrcs() {
    // 20
  }

  static doCrypt() {
    // 20
  }
}

export class GreyCombatLocket {
  static doSystemSweep() {}

  static doInfiniteLoop() {}

  static doFantasyBandit() {}

  static doMountainMan() {}
}

export function getZappables(item: Item): Item[] {
  let items: Item[] = [];

  Object.keys(getRelated(item, "zap")).forEach((s) => {
    let i = Item.get(s);

    if (items.includes(i)) {
      return;
    }

    items.push(i);
  });

  return items;
}

class GreyRequirements {
  hasRequired() {
    let dontHave: string[] = [];

    if (!haveFamiliar(Familiar.get("Grey Goose"))) {
      dontHave.push("Grey Goose");
    }

    if (availableAmount(Item.get("Combat Lover's Locket")) == 0) {
      dontHave.push("Combat Lovers Locket");
    }

    if (availableAmount(Item.get("industrial fire extinguisher")) == 0) {
      dontHave.push("industrial fire extinguisher");
    }

    if (availableAmount(Item.get("backup camera")) == 0) {
      dontHave.push("Backup Camera");
    }

    if (
      availableAmount(Item.get("unwrapped knock-off retro superhero cape")) == 0
    ) {
      dontHave.push("unwrapped knock-off retro superhero cape");
    }

    // TODO  MayDay™ supply package
    // TODO Unbreakable Umbrella
    // TODO Bowling ball
    // TODO Crystal ball
    // TODO Short order cook
    // TODO Familiar scrapbook
    // TODO Cold medicine
    // TODO Powerful glove
    // TODO Camelcalf?
    // TODO Cargo cultist
    // HOA regulation book
    // Mafia thumb ring
    // Yule hatchet
    // Deck of sleaze cards
  }
}
