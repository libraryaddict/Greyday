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
} from "kolmafia";
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
  maximize: string;
  capped: number;
};

const PixelZones: PixelZone[] = [
  {
    loc: Location.get("Vanya's Castle"),
    color: "black",
    maximize: "init",
    capped: 600,
  },
  {
    loc: Location.get("Megalo-City"),
    color: "blue",
    maximize: "damage absorption",
    capped: 600,
  },
  {
    loc: Location.get("Hero's Field"),
    color: "green",
    maximize: "item drop",
    capped: 400,
  },
  {
    loc: Location.get("The Fungus Plains"),
    color: "red",
    maximize: "meat drop",
    capped: 450,
  },
];

export class QuestDigitalKey implements QuestInfo {
  transfomer: Item = Item.get("continuum transfunctioner");
  key: Item = Item.get("Digital key");

  level(): number {
    return 4;
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

    const zone = this.currentBonusZone();

    const outfit = new GreyOutfit();
    outfit.addWeight(this.transfomer);
    outfit.addWeight(zone.maximize, 5, null, zone.capped);

    return {
      location: zone.loc,
      outfit: outfit,
      run: () => {
        greyAdv(zone.loc, outfit);
      },
    };
  }

  getId(): QuestType {
    return "Council / Tower / Keys / Digital";
  }

  getLocations(): Location[] {
    return PixelZones.map((z) => z.loc);
  }
}
