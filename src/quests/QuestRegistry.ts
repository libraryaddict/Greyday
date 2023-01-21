import {
  canadiaAvailable,
  gnomadsAvailable,
  knollAvailable,
  print,
} from "kolmafia";
import { GreySettings } from "../utils/GreySettings";
import { QuestCouncil } from "./council/QuestCouncil";
import { QuestManor } from "./council/QuestManor";
import { QuestCar } from "./custom/QuestCar";
import { QuestManorLights } from "./custom/QuestManorLights";
import { QuestInfo } from "./Quests";
import { QuestsCustom } from "./QuestsCustom";
import { QuestType, QuestTypeArray } from "./QuestTypes";

interface QuestOrder {
  id: QuestType;
  /**
   * This should be used only to determine if the current placing in the queue is correct.
   *
   * If you're trying to check if this quest needs doing or not, that should be handled in quest.status(), and shouldn't effect the order of the queue.
   * The queue order should remain static, with only this method eliminating would-be duplicates
   */
  testValid?: () => boolean;
  towerDelayed?: boolean;
}
// We get one non-combat at goblin basement from jellyfish
// Another non-combat at Black panther
// Goblin only has one -combat to speak of, and its not really worth much?
// Black is Car > Desert > Forest
const order: QuestOrder[] = [
  { id: "Quests / Council" },

  { id: "Council / Toot" },
  { id: "Misc / Initial Pulls" },
  { id: "Misc / InitialStart" },
  { id: "Misc / PowerLeveling" },
  { id: "Misc / FortuneExp" },
  { id: "Misc / Ghost Buster" },

  { id: "CombatLocket / InfiniteLoop" },
  { id: "Misc / FamEquip" },
  { id: "Misc / JuneCleaver" },

  { id: "NPC / Meatsmith" },
  { id: "NPC / GnomeSkills" },
  { id: "NPC / Painter" }, // Takes up to 3 advs so meh, not quest relevant either. Only supported if user starts it
  { id: "NPC / Untinkerer" },
  { id: "NPC / Baker" },
  { id: "NPC / Druggie" },
  { id: "NPC / Knoll Mayor" },
  { id: "NPC / Doctor" },
  { id: "Misc / Purchases" },
  { id: "Misc / FriarExp" },
  { id: "Misc / Moonsign" },
  // These just make the absorbs prioritized higher
  {
    id: "Absorbs / Knoll",
    testValid: () => knollAvailable() && GreySettings.greyTuneMoonSpoon != null,
  },
  {
    id: "Absorbs / Canadia",
    testValid: () =>
      canadiaAvailable() && GreySettings.greyTuneMoonSpoon != null,
  },
  {
    id: "Absorbs / Gnomads",
    testValid: () =>
      gnomadsAvailable() && GreySettings.greyTuneMoonSpoon != null,
  },

  // We might want system sweep after all! This needs to be cleaned
  { id: "Council / MacGruffin / HiddenCity / HiddenPark" },

  { id: "Skills / Infinite Loop" },
  { id: "Skills / System Sweep" },
  { id: "Skills / Phase Shift" },
  { id: "Skills / HPRegen" },
  { id: "Skills / ScalingItem" },
  { id: "Skills / ScalingMeat" },
  { id: "Skills / DoubleNanovision" },
  { id: "Misc / Short Cook Goose" },

  { id: "Skills / ScalingDR" },
  { id: "Skills / Conifer Polymers" },

  // Vines are free kills, why not prioritize them to unlock zones
  { id: "Council / MacGruffin / HiddenCity / Vines" },

  { id: "Misc / ManorLights" },
  { id: "Misc / UnlockDungeonsOfDoom" },
  { id: "Skills / MPRegen" },

  // We do this early so we can grab our hippy outfit asap
  { id: "Boat / Vacation" },

  // Always try to buy access to the shore, 8-9 adventures spent trying to farm stuff up?
  { id: "Council / MacGruffin / Shore" },
  { id: "Misc / MeatCar" },
  { id: "Misc / BugbearBakery" },

  // Get goblin done early so we can grab our first -combat skill
  { id: "Council / Goblins / Outskirts" },
  { id: "Council / Goblins / HaremOutfit" },

  { id: "GoblinLabs / LabUnlock" },
  { id: "GoblinLabs / MegUnlock" },

  { id: "Council / MacGruffin / Vacation" },

  { id: "Council / Larva" },

  { id: "Council / Ice / Ore" },

  // Get this done early so we can start flyering
  { id: "Council / War / Frat Outfit" },
  { id: "Council / War / Start" },
  { id: "Council / War / Flyers" },

  // OMG who cares about your stupid war
  {
    id: "Council / War / Filthworms",
  },

  // We get +3 hot resist from raging bull
  // +3 stench resist from pine bat
  // And the other two skills are manor located
  { id: "Manor / Chat" },
  { id: "Manor / Kitchen" },
  { id: "Manor / Billards" },
  { id: "Manor / Bathroom" },
  { id: "Manor / Gallery" },
  { id: "Manor / Bedroom" },

  // Do the king cos he's lonely, also has 2k meat
  { id: "Council / Goblins / King" },

  // Register these here, because we want to burn their backups in delay zones
  {
    id: "Council / Tower / Keys / Heroes / FantasyBandit",
    towerDelayed: true,
  },
  { id: "Council / War / Lobsters" },

  // Get friars done early so we can grab stuff from hell
  { id: "Council / Friars / Heart" },
  { id: "Council / Friars / Elbow" },
  { id: "Council / Friars / Neck" },
  { id: "Council / Friars / TurnIn" },

  { id: "Misc / Latte / Fam Exp" },
  { id: "Misc / Latte / Plus Combat" },

  // If we have the skill, then this doesn't need prioritizing as such
  {
    id: "Council / MacGruffin / Black",
  },

  { id: "Skills / Photonic Shroud" },
  { id: "Misc / GrabZapWand" },
  { id: "Misc / Tot Pirate" },

  // Meh
  { id: "Council / MacGruffin / HiddenCity / Boss" },
  { id: "Council / MacGruffin / Temple / Unlock" },
  { id: "Council / MacGruffin / Temple / GrabWool" },
  { id: "Council / MacGruffin / Temple / Nostril" },
  { id: "Council / MacGruffin / Temple / HiddenCity" },

  // Now we do our bowling, we prioritize this because of special code that has the bowling ball with combat turns = 0
  // We also prioritize it for double nanovision
  { id: "Council / MacGruffin / HiddenCity / BookOfMatches" },
  { id: "Council / MacGruffin / HiddenCity / Bowling" },

  // Do library after we should have system sweep stuff
  { id: "Manor / Library" },

  // Crypt does give us meat hmm
  { id: "Council / Crypt / Gravy Boat Pull" },
  { id: "Council / Crypt / Sprinters" },
  { id: "Council / Crypt / Eyes" },

  { id: "Council / Bats / Sonars" },
  { id: "Council / Bats / UnlockLeft" },
  { id: "Council / Bats / Boss" },

  // We've unlocked the left way, just do shen and hopefully we unlock right without actually burning extra turns
  { id: "Council / MacGruffin / Shen / Meet" },
  { id: "Council / MacGruffin / Shen / Bats" },
  { id: "Council / MacGruffin / Shen / TurnIn" },

  // Unlock ninja tower
  { id: "Council / Ice / Trapper" },
  { id: "Council / Ice / Goats" },

  // Ninja power!
  { id: "Council / MacGruffin / Shen / Ninjas" },

  // Try unlock right bats if not unlocked
  { id: "Council / Bats / UnlockRight" },

  // Hunt for enchanted beans
  { id: "Council / Beanstalk / EnchantedBean" },
  { id: "Council / Beanstalk / Ship" },
  { id: "Council / Beanstalk / Basement" },
  { id: "Council / Beanstalk / Ground" },
  // We're now trying to do the top stuff yay
  { id: "Council / Beanstalk / Top" },

  // If we still haven't unlocked from doing our top castle, lets try unlock our hole in sky
  { id: "Council / Tower / Keys / HoleInSkyUnlock" },
  // Oh wow, hole in sky unlocked but still no boss. Lets just do it manually.
  { id: "Council / MacGruffin / Shen / Giants" },
  { id: "Council / Tower / Keys / Star", towerDelayed: true },

  { id: "Council / MacGruffin / Ron / Crowd" },
  { id: "Council / MacGruffin / Ron / Zepp" },

  // Palin needs Ron and Shen done
  { id: "Council / MacGruffin / Palin / Book" },
  { id: "Council / MacGruffin / Palin / WetStew" },
  { id: "Council / MacGruffin / Palin / Boss" },
  { id: "Skills / Piezoelectric Honk" },

  // Ninja needs +combat, so delay it until we've finished Shen and grabbed our +combat skill from Palin
  { id: "Council / Ice / Ninjas" },
  // We earn a cold damage skill, so may as well. We also get meats
  { id: "Council / Ice / Boss" },

  // Given we earn nothing but meat, delays for days
  { id: "Council / Bats / UnlockBoss" },

  // We do shaman first to potentially grab extra accountant stuff
  { id: "Council / MacGruffin / HiddenCity / Curses" },

  { id: "Council / MacGruffin / HiddenCity / Accountants" },

  // Meh
  { id: "Council / MacGruffin / HiddenCity / Doctor" },

  // Nothing interesting from desert and pyramid yawn
  { id: "Council / MacGruffin / Desert / Compass" },

  { id: "Council / MacGruffin / Desert / WormRide" },
  { id: "Council / MacGruffin / Desert / Gnome" },
  {
    id: "Council / MacGruffin / Desert / StoneRose",
  },
  {
    id: "Council / MacGruffin / Desert / Explore",
  },

  // Unlock cellar
  { id: "Council / MacGruffin / Manor / Ballroom" },
  { id: "Council / MacGruffin / Manor / Recipe" },
  { id: "Council / MacGruffin / Manor / Soda" },
  { id: "Council / MacGruffin / Manor / Wine" },
  { id: "Council / MacGruffin / Manor / Bomb" },
  { id: "Council / MacGruffin / Manor / Boss" },

  // Nothing special from the top of the pyramid, but burn some turns here anyways
  { id: "Council / MacGruffin / Pyramid / Top" },

  // Alright, unlock the control room and the undying man. And keep going until you have enough rats
  { id: "Council / MacGruffin / Pyramid / Middle" },
  { id: "Council / MacGruffin / Pyramid / Wheel" },

  // Given we earn nothing from crypt..
  { id: "Council / Crypt / Rattling" },
  { id: "Council / Crypt / DirtyMan" },
  { id: "Council / Crypt / Boss" },

  { id: "Skills / ColdDamage15" },
  { id: "Skills / ColdDamage10" },

  // Given that we earn nothing from peaks, just delay it until we should've hit our max +cold damage
  { id: "Council / Peaks / CargoShortsSmut" },
  { id: "Council / Peaks / Orcs" },
  { id: "Council / Peaks / OilPeak" },
  { id: "Council / Peaks / TwinPeak" },
  { id: "Council / Peaks / AbooPeak" },
  { id: "Council / Peaks / Lord" },

  { id: "Council / War / Gremlins" },
  { id: "Council / War / Gremlins / Burning Barrel" },
  { id: "Council / War / Gremlins / Abandoned Refrigerator" },
  { id: "Council / War / Gremlins / Old Tires" },
  { id: "Council / War / Gremlins / Rusted Car" },

  { id: "Council / War / Boss" },

  // Tavern needs Larva done
  { id: "Council / Tavern" },

  { id: "Council / War / Battlefield" },

  { id: "Council / MacGruffin / Pyramid / EdUndying" },

  // Alright, this run is just about over kids. Lets finish it.
  { id: "Council / Tower / Contests", towerDelayed: true },
  { id: "Council / Tower / Maze", towerDelayed: true },

  {
    id: "Council / Tower / Keys / Heroes / Buy and Zap Keys",
    towerDelayed: true,
  },
  {
    id: "Council / Tower / Keys / Heroes / DailyDungeon",
    towerDelayed: true,
  },
  {
    id: "Council / Tower / Keys / Heroes / DailyDungeon + Malware",
    towerDelayed: true,
  },
  {
    id: "Council / Tower / Keys / Heroes / DeckOfCards",
    towerDelayed: true,
  },
  { id: "Council / Tower / Keys / Skeleton", towerDelayed: true },

  { id: "Council / War / Nuns" },

  // By the time we hit this, we should 100% have our keys
  { id: "Council / Tower / KeyDoor", towerDelayed: true },

  { id: "Council / Tower / WallOfSkin", towerDelayed: true },

  { id: "Council / Tower / WallOfMeat", towerDelayed: true },

  { id: "Council / Tower / WallOfBones", towerDelayed: true },

  { id: "Council / Tower / Shadow", towerDelayed: true },
  { id: "Council / Tower / Mirror", towerDelayed: true },
  { id: "Council / Tower / NaughtyBoss", towerDelayed: true },

  { id: "Absorbs / Hole in Sky" },
  { id: "Absorbs / Canadia" },
  { id: "Absorbs / Knoll" },
  { id: "Absorbs / Gnomads" },
  { id: "Absorbs / Palin" },
  { id: "Absorbs / Irate Mariachi" },
  { id: "Council / Tower / Keys / Heroes", towerDelayed: true },
  { id: "Council / Tower / Keys / Digital" },
];

export class QuestRegistry {
  map: Map<QuestType, QuestInfo> = new Map();

  constructor() {
    this.addInfo(new QuestCouncil());
    this.addInfo(new QuestCar());
    this.addInfo(new QuestManorLights());
    this.addInfo(new QuestsCustom());
    this.addInfo(new QuestManor());

    const ordered = this.getQuestOrder();

    for (const type of this.map.keys()) {
      if (ordered.includes(type)) {
        continue;
      }

      if (this.map.get(type).level() == -1) {
        continue;
      }

      print(
        "DEBUG: Quests registry priority order does not contain: " + type,
        "gray"
      );
    }

    for (const type of QuestTypeArray) {
      if (this.map.has(type) || !GreySettings.greyDebug) {
        continue;
      }

      if (type.includes("Council / Tower / Keys / Heroes /")) {
        continue;
      }

      if (
        GreySettings.shouldAvoidTowerRequirements() &&
        !GreySettings.greyReachedTower &&
        QuestRegistry.isTowerDelayed(type)
      ) {
        continue;
      }

      print(
        "ERROR! No quest registered for the quest id '" + type + "'",
        "red"
      );
    }
  }

  addInfo(questInfo: QuestInfo) {
    const id = questInfo.getId();

    if (id == null) {
      throw "Null quest id found!";
    }

    if (this.map.has(id)) {
      throw "Map already contains the quest '" + id + "'";
    }

    if (
      GreySettings.shouldAvoidTowerRequirements() &&
      !GreySettings.greyReachedTower &&
      QuestRegistry.isTowerDelayed(questInfo.getId())
    ) {
      return;
    }

    this.map.set(id, questInfo);
    // TODO Add to map

    if (questInfo.getChildren != null) {
      for (const child of questInfo.getChildren()) {
        this.addInfo(child);
      }
    }
  }

  getQuestOrder(): QuestType[] {
    const ordered = [...order]
      .filter((order) => order.testValid == null || order.testValid())
      .map((order) => order.id);

    return ordered.filter((q, index) => ordered.indexOf(q) == index);
  }

  getQuestsInOrder(): QuestInfo[] {
    const quests: QuestInfo[] = [];

    for (const questType of this.getQuestOrder()) {
      const info = this.map.get(questType);

      if (info == null) {
        continue;
      }

      quests.push(info);
    }

    return quests;
  }

  static isTowerDelayed(questType: QuestType): boolean {
    return (
      order.find((q) => q.id == questType && q.towerDelayed == true) != null
    );
  }
}
