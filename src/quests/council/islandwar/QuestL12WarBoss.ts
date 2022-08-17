import {
  cliExecute,
  council,
  getProperty,
  Item,
  itemAmount,
  Location,
  sell,
  Slot,
  storageAmount,
  toInt,
  toSlot,
  visitUrl,
} from "kolmafia";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import { GreySettings } from "../../../utils/GreySettings";
import { Macro } from "../../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL12WarBoss implements QuestInfo {
  getId(): QuestType {
    return "Council / War / Boss";
  }

  level(): number {
    return 12;
  }

  getLocations(): Location[] {
    return [];
  }

  status(): QuestStatus {
    if (getProperty("warProgress") == "finished") {
      return QuestStatus.COMPLETED;
    }

    if (toInt(getProperty("hippiesDefeated")) >= 1000) {
      return QuestStatus.READY;
    }

    return QuestStatus.NOT_READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit();
    outfit.addItem(Item.get("Beer Helmet"));
    outfit.addItem(Item.get("distressed denim pants"));
    outfit.addItem(Item.get("bejeweled pledge pin"));

    return {
      outfit: outfit,
      location: null,
      run: () => {
        this.sellBuyCrap();

        visitUrl("bigisland.php?place=camp&whichcamp=1");
        visitUrl("bigisland.php?place=camp&whichcamp=2");

        greyAdv(
          "bigisland.php?action=bossfight&pwd",
          null,
          new AdventureSettings().setFinishingBlowMacro(Macro.attack().repeat())
        );

        council();
      },
    };
  }

  sellBuyCrap() {
    const crap: Item[] = [
      "pink clay bead",
      "purple clay bead",
      "green clay bead",
      "communications windchimes",
      "bullet-proof corduroys",
      "round purple sunglasses",
      "reinforced beaded headband",
    ].map((s) => Item.get(s));

    for (const s of crap) {
      const keep = toSlot(s) == toSlot("none") ? 1 : 0;

      if (itemAmount(s) <= keep) {
        continue;
      }

      sell(s.buyer, itemAmount(s) - keep, s);
    }

    const master = crap[0].buyer;
    const garter = Item.get("gauze garter");
    let gartersHave = itemAmount(garter);

    if (GreySettings.shouldAvoidTowerRequirements()) {
      gartersHave += storageAmount(garter);
    }

    let needHealers = 10 - gartersHave;
    needHealers = Math.min(needHealers, Math.floor(master.availableTokens / 2));

    if (needHealers > 0) {
      cliExecute("make " + needHealers + " gauze garter");
    }

    while (master.availableTokens >= 5) {
      cliExecute(
        "make " +
          Math.floor(master.availableTokens / 5) +
          " commemorative war stein"
      );
    }

    while (master.availableTokens >= 2) {
      cliExecute(
        "make " + Math.floor(master.availableTokens / 2) + " gauze garter"
      );
    }

    while (master.availableTokens >= 1) {
      cliExecute("make " + master.availableTokens + " beer bomb");
    }
  }
}
