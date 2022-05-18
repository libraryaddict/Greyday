import {
  availableAmount,
  Familiar,
  getProperty,
  handlingChoice,
  Item,
  lastChoice,
  Location,
  runChoice,
  setProperty,
  toInt,
  totalTurnsPlayed,
  visitUrl,
} from "kolmafia";
import { GreyOutfit } from "../../utils/GreyOutfitter";
import { GreySettings } from "../../utils/GreySettings";
import { QuestAdventure, QuestInfo, QuestStatus } from "../Quests";
import { QuestType } from "../QuestTypes";

export class QuestWorkshed implements QuestInfo {
  lastChecked: string = "_lastCheckedCabinet";
  hat: Item = Item.get("Ice Crown");
  pants: Item = Item.get("frozen jeans");

  hasConsults(): boolean {
    return toInt(getProperty("_coldMedicineConsults")) < 5;
  }

  getNextConsult(): number {
    return toInt(getProperty("_nextColdMedicineConsult")) - totalTurnsPlayed();
  }

  isConsultReady(): boolean {
    return this.hasConsults() && this.getNextConsult() <= 0;
  }

  getLastChecked(): number {
    return toInt(getProperty(this.lastChecked));
  }

  shouldCheck(): boolean {
    return this.getLastChecked() + 10 <= totalTurnsPlayed();
  }

  check(): QuestAdventure {
    return {
      location: null,
      outfit: new GreyOutfit("-tie"),
      run: () => {
        let page = visitUrl("campground.php?action=workshed");

        setProperty(this.lastChecked, totalTurnsPlayed().toString());

        if (!handlingChoice()) {
          return;
        }

        if (lastChoice() != 1455) {
          throw "Unexpected situation";
        }

        if (GreySettings.isHardcoreMode() && availableAmount(this.pants) == 0) {
          runChoice(1);
        } else if (page.includes("Extrovermectin&trade;")) {
          runChoice(5);
        } else {
          visitUrl("main.php");
        }
      },
    };
  }

  getId(): QuestType {
    return "Misc / ColdMedicineCabinet";
  }

  level(): number {
    return 5;
  }

  status(): QuestStatus {
    if (!this.hasConsults()) {
      return QuestStatus.COMPLETED;
    }

    if (!this.isConsultReady() || !this.shouldCheck()) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return this.check();
  }

  getLocations(): Location[] {
    return [];
  }

  needAdventures?(): number {
    return 0;
  }

  mustBeDone(): boolean {
    return this.isConsultReady() && this.shouldCheck();
  }
}
