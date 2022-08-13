import { Location } from "kolmafia";
import { QuestAbsorbCanadia } from "./absorbs/QuestAbsorbCanadia";
import { QuestAbsorbStarMonster } from "./absorbs/QuestAbsorbStarMonster";
import { QuestAbsorbKnoll } from "./absorbs/QuestAbsorbKnoll";
import { QuestGoblinTortureHarem } from "./custom/goblin/QuestGoblinTortureHarem";
import { QuestGoblinTortureLab } from "./custom/goblin/QuestGoblinTortureLab";
import { QuestBugbearBakery } from "./custom/QuestBugbearBakery";
import { QuestCustomPurchases } from "./custom/QuestCustomPurchases";
import { QuestDungeonsOfDoom } from "./custom/QuestDungeonsOfDoom";
import { QuestFamiliarEquip } from "./custom/QuestFamiliarEquip";
import { QuestFortuneExp } from "./custom/QuestFortuneExp";
import { QuestGetZapWand } from "./custom/QuestGetZapWand";
import { QuestGrabBoatJunkyard } from "./custom/QuestGrabBoatJunkyard";
import { QuestGrabBoatVacation } from "./custom/QuestGrabBoatVacation";
import { QuestInitialPulls } from "./custom/QuestInitialPulls";
import { QuestInitialStart } from "./custom/QuestInitialStart";
import { QuestJuneCleaver } from "./custom/QuestJuneCleaver";
import { QuestMoonSign } from "./custom/QuestMoonSign";
import { QuestNPCStuff } from "./custom/QuestNpcStuff";
import { QuestPowerLeveling } from "./custom/QuestPowerLeveling";
import { QuestAdventure, QuestInfo, QuestStatus } from "./Quests";
import { QuestType } from "./QuestTypes";
import { QuestLocketInfiniteLoop } from "./skills/QuestLocketInfiniteLoop";
import { QuestSkillRegistry } from "./skills/QuestSkillRegistry";
import { QuestAbsorbGnomads } from "./absorbs/QuestAbsorbGnomads";

export class QuestsCustom implements QuestInfo {
  // This is a wrapper class around some of our custom routing goals. Like combat locket or so.

  quests: QuestInfo[] = [];

  constructor() {
    this.quests.push(new QuestInitialStart());
    this.quests.push(new QuestInitialPulls());
    this.quests.push(new QuestLocketInfiniteLoop());
    //this.quests.push(new QuestLocketSystemSweep());
    this.quests.push(new QuestGoblinTortureHarem());
    this.quests.push(new QuestGoblinTortureLab());
    this.quests.push(new QuestDungeonsOfDoom());
    this.quests.push(new QuestGetZapWand());
    this.quests.push(new QuestNPCStuff());
    this.quests.push(new QuestCustomPurchases());
    this.quests.push(new QuestGrabBoatVacation());
    this.quests.push(new QuestGrabBoatJunkyard());
    this.quests.push(new QuestSkillRegistry());
    this.quests.push(new QuestFamiliarEquip());
    this.quests.push(new QuestFortuneExp());
    this.quests.push(new QuestPowerLeveling(4));
    this.quests.push(new QuestBugbearBakery());
    this.quests.push(new QuestAbsorbStarMonster());
    this.quests.push(new QuestMoonSign());
    this.quests.push(new QuestAbsorbCanadia());
    this.quests.push(new QuestAbsorbKnoll());
    this.quests.push(new QuestAbsorbGnomads());
    this.quests.push(new QuestJuneCleaver());
  }

  level(): number {
    return -1;
  }

  status(): QuestStatus {
    return QuestStatus.COMPLETED;
  }

  run(): QuestAdventure {
    throw new Error("Method not implemented.");
  }

  getId(): QuestType {
    return "Misc / Custom";
  }

  getLocations(): Location[] {
    return [];
  }

  getChildren(): QuestInfo[] {
    return this.quests;
  }
}
