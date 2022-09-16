import {
  availableAmount,
  Effect,
  Element,
  Familiar,
  getProperty,
  haveEffect,
  haveSkill,
  Item,
  Location,
  Monster,
  numericModifier,
  Skill,
  toInt,
  toItem,
  use,
  useSkill,
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
import { GreySettings } from "../../../utils/GreySettings";
import { AbsorbsProvider } from "../../../utils/GreyAbsorber";

export class QuestManorBillards implements QuestInfo {
  billards: Location = Location.get("The Haunted Billiards Room");
  chalk: Item = Item.get("Handful of hand chalk");
  chalkEffect: Effect = Effect.get("Chalky Hand");
  key: Item = Item.get("[7302]Spookyraven library key");
  cue: Item = Item.get("pool cue");
  poolgeist: Monster = Monster.get("pooltergeist");
  ghost: Monster = Monster.get("Chalkdust wraith");
  hardening: Skill = Skill.get("Subatomic Hardening");
  toAbsorb: Monster[];
  elementalSkills: Skill[];

  constructor() {
    this.elementalSkills = AbsorbsProvider.loadAbsorbs()
      .map((a) =>
        a.skill == null
          ? null
          : [
              a.skill,
              Element.all()
                .map((e) => numericModifier(a.skill, e + " Damage"))
                .reduce((p, n) => p + n, 0),
            ]
      )
      .filter((pair) => pair != null)
      .map(([p]) => p) as Skill[];
  }

  getId(): QuestType {
    return "Manor / Billards";
  }

  level(): number {
    return 8;
  }

  status(): QuestStatus {
    const status = getQuestStatus("questM20Necklace");

    if (status < 1) {
      return QuestStatus.NOT_READY;
    }

    if (status > 2 || availableAmount(this.key) > 0) {
      return QuestStatus.COMPLETED;
    }

    if (!hasNonCombatSkillsReady(false)) {
      return QuestStatus.NOT_READY;
    }

    if (!hasNonCombatSkillsReady()) {
      return QuestStatus.FASTER_LATER;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    const outfit = new GreyOutfit();

    if (
      availableAmount(this.cue) == 0 ||
      haveEffect(this.chalkEffect) > 0 ||
      availableAmount(this.chalk) > 0 ||
      toInt(getProperty("poolSkill")) < 2
    ) {
      outfit.setNoCombat().setNoCombat();
    }

    outfit.addItem(this.cue);

    if (this.elementalSkills.find((s) => haveSkill(s)) == null) {
      outfit.addBonus("+10 elemental dmg 1 min 1 max");
    }

    const orbs: Monster[] = [];

    if (
      this.toAbsorb.includes(this.ghost) ||
      (availableAmount(this.chalk) == 0 && haveEffect(this.chalkEffect) <= 1)
    ) {
      orbs.push(this.ghost);
    }

    if (!haveSkill(this.hardening)) {
      orbs.push(this.poolgeist);
    }

    return {
      outfit: outfit,
      location: this.billards,
      orbs: orbs,
      mayFreeRun: true,
      freeRun: (monster) => !orbs.includes(monster),
      run: () => {
        if (
          availableAmount(this.cue) > 0 &&
          haveEffect(this.chalkEffect) == 0 &&
          availableAmount(this.chalk) > 0
        ) {
          use(this.chalk);
        }

        const settings = new AdventureSettings();

        if (
          availableAmount(this.chalk) == 0 &&
          haveEffect(this.chalkEffect) <= 1 &&
          !this.toAbsorb.includes(this.poolgeist)
        ) {
          settings.addBanish(this.poolgeist);
        }

        const props = new PropertyManager();
        const poolSkill =
          toInt(getProperty("poolSkill")) + numericModifier("pool skill") + 10;

        try {
          props.setChoice(
            875,
            poolSkill >= 14 || haveEffect(this.chalkEffect) == 0 ? 1 : 2
          ); //Fight or train
          greyAdv(this.billards, outfit, settings);
        } finally {
          props.resetAll();
        }
      },
    };
  }

  getLocations(): Location[] {
    return [this.billards];
  }

  canAcceptPrimes(): boolean {
    return false;
  }
}
