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

export class MurderHandler implements QuestInfo {
  crude: Item = Item.get("Bubblin' Crude");
  jar: Item = Item.get("Jar of Oil");
  rusty: Item = Item.get("Rusty Hedge Trimmers");
  loc: Location = Location.get("Twin Peak");

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

    if (!hasNonCombatSkillsReady()) {
      return QuestStatus.FASTER_LATER;
    }

    if (this.needsStench() && elementalResistance(Element.get("Stench")) >= 4) {
      return QuestStatus.READY;
    }

    if (this.needsFood() && haveSkill(Skill.get("Gravitational Compression"))) {
      return QuestStatus.READY;
    }

    if (this.needsJar()) {
      this.createJar();

      if (this.hasJar()) {
        return QuestStatus.READY;
      }
    }

    if (this.needsInit()) {
      return QuestStatus.READY;
    }

    return QuestStatus.NOT_READY;
  }

  run(): QuestAdventure {
    let outfit = new GreyOutfit();

    if (availableAmount(this.rusty) == 0) {
      outfit.setNoCombat();
      outfit.setItemDrops();
    }

    if (this.needsInit() && !haveSkill(Skill.get("Overclocking"))) {
      outfit.addItem(Item.get("Backup Camera")).addBonus("+init");
    }

    if (this.needsFood()) {
      outfit.itemDropWeight = 4;
    }

    this.createJar();

    if (this.needsStench()) {
      outfit.addItem(Item.get("Unwrapped knock-off retro superhero cape"));
      outfit.addBonus("+2 stench res");
    }

    return {
      location: this.loc,
      outfit: outfit,
      run: () => {
        let props = new PropertyManager();
        //cliExecute("retrocape vampire hold");
        cliExecute("backupcamera init");

        props.setChoice(1056, 1);
        props.setChoice(604, 1);
        props.setChoice(607, 1);
        props.setChoice(608, 1);
        props.setChoice(609, 1);
        props.setChoice(610, 1);
        props.setChoice(616, 1);

        try {
          if (this.needsInit() && numericModifier("initiative") >= 40) {
            props.setChoice(606, 4);
          } else if (this.needsFood() && itemDropModifier() >= 50) {
            props.setChoice(606, 2);
          } else if (
            this.needsStench() &&
            elementalResistance(Element.get("Stench")) >= 4
          ) {
            props.setChoice(606, 1);
          } else if (this.needsJar() && this.hasJar()) {
            props.setChoice(606, 3);
          } else {
            throw "Eh??";
          }

          if (availableAmount(this.rusty) > 0) {
            use(this.rusty);
          } else {
            let settings = new AdventureSettings();

            settings.addNoBanish(Monster.get("bearpig topiary animal"));
            settings.addNoBanish(
              Monster.get("elephant (meatcar?) topiary animal")
            );
            settings.addNoBanish(Monster.get("spider (duck?) topiary animal"));

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
    if (this.hasJar() || !this.needsJar() || availableAmount(this.crude) < 12) {
      return;
    }

    create(this.jar);
  }

  getMurderStatus(): number {
    return toInt(getProperty("twinPeakProgress"));
  }

  needsStench(): boolean {
    return (this.getMurderStatus() & 1) == 0;
  }

  needsFood(): boolean {
    return (this.getMurderStatus() & 2) == 0;
  }

  needsJar(): boolean {
    return (this.getMurderStatus() & 4) == 0;
  }

  needsInit(): boolean {
    return this.getMurderStatus() == 7;
  }
}
