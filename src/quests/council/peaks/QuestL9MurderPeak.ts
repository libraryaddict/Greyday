import {
  Item,
  haveSkill,
  Skill,
  availableAmount,
  Location,
  cliExecute,
  use,
  create,
  toInt,
  getProperty,
  elementalResistance,
  Element,
  numericModifier,
  itemDropModifier,
  print,
  Monster,
  visitUrl,
  itemDrops,
} from "kolmafia";
import { PropertyManager } from "../../../utils/Properties";
import { hasNonCombatSkillsReady } from "../../../GreyAdventurer";
import { AdventureSettings, greyAdv } from "../../../utils/GreyLocations";
import { GreyOutfit } from "../../../utils/GreyOutfitter";
import {
  getQuestStatus,
  QuestAdventure,
  QuestInfo,
  QuestStatus,
} from "../../Quests";
import { QuestType } from "../../QuestTypes";
import { currentPredictions } from "../../../utils/GreyUtils";

export class MurderHandler implements QuestInfo {
  crude: Item = Item.get("Bubblin' Crude");
  jar: Item = Item.get("Jar of Oil");
  rusty: Item = Item.get("Rusty Hedge Trimmers");
  loc: Location = Location.get("Twin Peak");
  trimmerMonsters: Monster[] = [
    "bearpig topiary animal",
    "elephant (meatcar?) topiary animal",
    "spider (duck?) topiary animal",
  ].map((s) => Monster.get(s));

  getId(): QuestType {
    return "Council / Peaks / TwinPeak";
  }

  getLocations(): Location[] {
    return [this.loc];
  }

  level(): number {
    return 7;
  }

  status(): QuestStatus {
    if (getQuestStatus("questL09Topping") < 1) {
      return QuestStatus.NOT_READY;
    }

    if (this.isComplete()) {
      return QuestStatus.COMPLETED;
    }

    const status = hasNonCombatSkillsReady()
      ? QuestStatus.READY
      : QuestStatus.FASTER_LATER;

    if (this.questNeedsJar()) {
      this.createJar();

      if (this.hasJar()) {
        return status;
      }
    }

    if (
      this.questNeedsStenchRes() &&
      elementalResistance(Element.get("stench")) >= 4
    ) {
      return status;
    }

    if (
      this.questNeedsFood() &&
      haveSkill(Skill.get("Gravitational Compression"))
    ) {
      return status;
    }

    if (this.questNeedsInit()) {
      return status;
    }

    return QuestStatus.NOT_READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit();

    if (availableAmount(this.rusty) == 0) {
      outfit.setNoCombat();

      const preds = currentPredictions();

      if (
        !preds.has(this.loc) ||
        itemDrops(preds.get(this.loc))[this.rusty.name] != null
      ) {
        outfit.setItemDrops();
      }
    }

    this.createJar();

    if (this.questNeedsJar() && this.hasJar()) {
      // Empty
    } else if (this.questNeedsStenchRes()) {
      outfit.addBonus("+2 stench res 4 min 4 max");
    } else if (this.questNeedsFood()) {
      outfit.addBonus("+item drop 50 min");
    } else if (this.questNeedsInit()) {
      outfit.addBonus("+init 40 min");
    }

    return {
      location: this.loc,
      outfit: outfit,
      orbs: this.trimmerMonsters,
      run: () => {
        const props = new PropertyManager();
        //cliExecute("retrocape vampire hold");
        /* if (getProperty("backupCameraMode") != "init") {
          cliExecute("backupcamera init");
        }*/

        props.setChoice(1056, 1);
        props.setChoice(604, 1);
        props.setChoice(607, 1);
        props.setChoice(608, 1);
        props.setChoice(609, 1);
        props.setChoice(610, 1);
        props.setChoice(616, 1);

        try {
          if (this.questNeedsJar() && this.hasJar()) {
            props.setChoice(606, 3);
          } else if (
            this.questNeedsStenchRes() &&
            elementalResistance(Element.get("stench")) >= 4
          ) {
            props.setChoice(606, 1);
          } else if (this.questNeedsFood() && itemDropModifier() >= 50) {
            props.setChoice(606, 2);
          } else if (
            this.questNeedsInit() &&
            numericModifier("initiative") >= 40
          ) {
            props.setChoice(606, 4);
          } else {
            throw `Eh?? We're at murder peak, but we don't match the criteria for any of the choices. Jar? ${this.questNeedsJar()}, ${this.hasJar()}, Stench Res? ${this.questNeedsStenchRes()}, ${elementalResistance(
              Element.get("stench")
            )}, , food? ${this.questNeedsFood()} ${itemDropModifier()}, Init? ${this.questNeedsInit()} ${numericModifier(
              "initiative"
            )}. Maybe you need stench res, but the script can't find it for you?`;
          }

          if (availableAmount(this.rusty) > 0) {
            greyAdv(
              "inv_use.php?pwd=&which=3&whichitem=" +
                toInt(this.rusty) +
                "&ajax=1"
            );
          } else {
            const settings = new AdventureSettings();

            for (const monster of this.trimmerMonsters) {
              settings.addNoBanish(monster);
            }

            greyAdv(this.loc, outfit);
          }
        } finally {
          props.resetAll();
        }
      },
    };
  }

  isComplete() {
    return this.getMurderStatus() >= 15;
  }

  hasJar() {
    return availableAmount(this.jar) > 0;
  }

  createJar() {
    if (
      this.hasJar() ||
      !this.questNeedsJar() ||
      availableAmount(this.crude) < 12
    ) {
      return;
    }

    create(this.jar);
  }

  getMurderStatus(): number {
    return toInt(getProperty("twinPeakProgress"));
  }

  questNeedsStenchRes(): boolean {
    return (this.getMurderStatus() & 1) == 0;
  }

  questNeedsFood(): boolean {
    return (this.getMurderStatus() & 2) == 0;
  }

  questNeedsJar(): boolean {
    return (this.getMurderStatus() & 4) == 0;
  }

  questNeedsInit(): boolean {
    return this.getMurderStatus() == 7;
  }
}
