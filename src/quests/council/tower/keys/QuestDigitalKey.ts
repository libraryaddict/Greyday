import {
  Location,
  Item,
  availableAmount,
  visitUrl,
  runChoice,
  handlingChoice,
  print,
  getProperty,
  toInt,
  Monster,
  turnsPlayed,
  maximize,
  numericModifier,
  printHtml,
  Familiar,
} from "kolmafia";
import { DelayBurner } from "../../../../iotms/delayburners/DelayBurnerAbstract";
import {
  DelayBurners,
  DelayCriteria,
} from "../../../../iotms/delayburners/DelayBurners";
import { DelayBurningVoter } from "../../../../iotms/delayburners/DelayBurningVoter";
import { DelayBurningCursedMagnifyingGlass } from "../../../../iotms/delayburners/DelayCursedMagnifyingGlass";
import { greyAdv } from "../../../../utils/GreyLocations";
import { GreyOutfit } from "../../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../../Quests";
import { QuestType } from "../../../QuestTypes";

type PixelZone = {
  loc: Location;
  color: string;
  maximize: "Meat Drop" | "Initiative" | "Damage Absorption" | "Item Drop";
  capped: number;
};

const PixelZones: PixelZone[] = [
  {
    loc: Location.get("Vanya's Castle"),
    color: "black",
    maximize: "Initiative",
    capped: 600,
  },
  {
    loc: Location.get("Megalo-City"),
    color: "blue",
    maximize: "Damage Absorption",
    capped: 600,
  },
  {
    loc: Location.get("Hero's Field"),
    color: "green",
    maximize: "Item Drop",
    capped: 400,
  },
  {
    loc: Location.get("The Fungus Plains"),
    color: "red",
    maximize: "Meat Drop",
    capped: 450,
  },
];

export class QuestDigitalKey implements QuestInfo {
  transfomer: Item = Item.get("continuum transfunctioner");
  key: Item = Item.get("Digital key");
  currentZone: PixelZone;
  favorZone: PixelZone;
  zoneCalcedAt: number = 0;
  totMeatItem = Item.get("li'l pirate costume");
  totItemItem = Item.get("li'l ninja costume");
  tot: Familiar = Familiar.get("Trick-or-Treating Tot");

  level(): number {
    return 4;
  }

  getEstimatedScore(zone: PixelZone): number {
    maximize(
      zone.maximize +
        (zone.maximize == "Meat Drop" || zone.maximize == "Item Drop"
          ? " +switch Trick-or-Treating Tot"
          : "") +
        " -tie",
      true
    );

    let score =
      Math.min(zone.capped, numericModifier("Generated:_spec", zone.maximize)) -
      (zone.capped - 300);

    if (this.currentZone != zone) {
      // Not sure its been spaded how it rounds
      score = Math.round(score / 2);
    }

    return Math.max(0, score);
  }

  getAdventureZone(): PixelZone {
    const currentBonusZone = this.currentBonusZone();

    if (
      currentBonusZone == this.currentZone &&
      this.zoneCalcedAt + 50 >= turnsPlayed()
    ) {
      return this.favorZone;
    }

    this.currentZone = currentBonusZone;
    this.zoneCalcedAt = turnsPlayed();

    const zones: Map<PixelZone, number> = new Map([
      [currentBonusZone, this.getEstimatedScore(currentBonusZone)],
    ]);

    const sortedZones: PixelZone[] = [];

    if (zones.get(currentBonusZone) < 300) {
      for (const zone of PixelZones) {
        sortedZones.push(zone);

        if (zones.has(zone)) {
          continue;
        }

        zones.set(zone, this.getEstimatedScore(zone));
      }
    } else {
      sortedZones.push(currentBonusZone);
    }

    sortedZones.sort((z1, z2) => {
      return zones.get(z2) - zones.get(z1);
    });

    this.favorZone = sortedZones[0];

    printHtml(
      `Pixel Realm Scores: ${sortedZones
        .map(
          (z) =>
            `<font color=${z == this.currentZone ? "purple" : "gray"}>${
              z.loc + ": " + (100 + zones.get(z))
            }</font>`
        )
        .join(", ")}`
    );

    return this.favorZone;
  }

  currentBonusZone(): PixelZone {
    const color = getProperty("8BitColor") || "black";

    return PixelZones.find((z) => z.color == color);
  }

  status(): QuestStatus {
    if (
      getQuestStatus("questL13Final") > 5 ||
      availableAmount(this.key) > 0 ||
      getProperty("nsTowerDoorKeysUsed").includes(this.key.name)
    ) {
      return QuestStatus.COMPLETED;
    }

    if (availableAmount(this.transfomer) == 0) {
      return QuestStatus.READY;
    }

    const status = getQuestStatus("questL13Final");

    if (status < 0) {
      return QuestStatus.FASTER_LATER;
    }

    if (status == 0) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  redeemKey(): QuestAdventure {
    const outfit = new GreyOutfit().addWeight(this.transfomer);

    return {
      location: null,
      outfit: outfit,
      run: () => {
        visitUrl("place.php?whichplace=8bit&action=8treasure");
        visitUrl("choice.php?forceoption=0");
        visitUrl("choice.php?pwd&whichchoice=1493&option=1", true);
      },
    };
  }

  run(): QuestAdventure {
    if (availableAmount(this.transfomer) == 0) {
      return {
        location: null,
        outfit: GreyOutfit.IGNORE_OUTFIT,
        run: () => {
          visitUrl("place.php?whichplace=forestvillage&action=fv_mystic");

          while (handlingChoice()) {
            runChoice(1);
          }
          print("Grabbed " + this.transfomer, "gray");
        },
      };
    }

    if (toInt(getProperty("8BitScore")) >= 10000) {
      return this.redeemKey();
    }

    const zone = this.getAdventureZone();

    const outfit = new GreyOutfit();
    outfit.addWeight(this.transfomer);
    outfit.addWeight(zone.maximize, 5, null, zone.capped);

    const delayers = this.getViableDelayBurners();

    if (delayers.length > 0) {
      for (const item of delayers[0].getFightSetup()) {
        outfit.addWeight(item);
      }
    }

    let fam: Familiar = null;

    if (zone.maximize == "Item Drop" && availableAmount(this.totItemItem) > 0) {
      outfit.addWeight(this.totItemItem);
      fam = this.tot;
    } else if (
      zone.maximize == "Meat Drop" &&
      availableAmount(this.totMeatItem) > 0
    ) {
      outfit.addWeight(this.totMeatItem);
      fam = this.tot;
    }

    return {
      location: zone.loc,
      outfit: outfit,
      familiar: fam,
      disableFamOverride: fam != null,
      run: () => {
        greyAdv(zone.loc, outfit);
      },
    };
  }

  getViableDelayBurners(): DelayBurner[] {
    const burners = DelayBurners.getCombatReplacers(
      DelayCriteria().withFreeFights(null).withForcedFights(null)
    );

    if (this.getAdventureZone().maximize != "Meat Drop") {
      return burners;
    }

    // Remove monsters that don't drop meat
    return burners.filter((d) => {
      if (d instanceof DelayBurningCursedMagnifyingGlass) {
        return false;
      }

      if (d instanceof DelayBurningVoter) {
        if (getProperty("_voteMonster") == "") {
          return false;
        }

        return Monster.get(getProperty("_voteMonster")).minMeat > 0;
      }

      return true;
    });
  }

  getId(): QuestType {
    return "Council / Tower / Keys / Digital";
  }

  getLocations(): Location[] {
    return PixelZones.map((z) => z.loc);
  }
}
