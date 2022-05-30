export type QuestToot = "Council / Toot";
export type QuestLarva = "Council / Larva";
export type QuestTavern = "Council / Tavern";
export type QuestBats =
  | "Council / Bats / Sonars"
  | "Council / Bats / UnlockLeft"
  | "Council / Bats / UnlockRight"
  | "Council / Bats / UnlockBoss"
  | "Council / Bats / Boss";
export type QuestGoblins =
  | "Council / Goblins / Outskirts"
  | "Council / Goblins / HaremOutfit"
  | "Council / Goblins / King";
export type QuestFriars =
  | "Council / Friars / Heart"
  | "Council / Friars / Elbow"
  | "Council / Friars / Neck"
  | "Council / Friars / TurnIn";
export type QuestCrypt =
  | "Council / Crypt / Sprinters"
  | "Council / Crypt / Eyes"
  | "Council / Crypt / Rattling"
  | "Council / Crypt / DirtyMan"
  | "Council / Crypt / Boss";
export type QuestIcePeak =
  | "Council / Ice / Trapper"
  | "Council / Ice / Goats"
  | "Council / Ice / OreOutfit"
  | "Council / Ice / OreMining"
  | "Council / Ice / OreClover"
  | "Council / Ice / MountainMan"
  | "Council / Ice / Ninjas"
  | "Council / Ice / Boss";
export type QuestTriplePeaks =
  | "Council / Peaks / Orcs"
  | "Council / Peaks / CargoShortsSmut"
  | "Council / Peaks / AbooPeak"
  | "Council / Peaks / TwinPeak"
  | "Council / Peaks / OilPeak"
  | "Council / Peaks / Lord";
export type QuestBeanStalk =
  | "Council / Beanstalk / EnchantedBean"
  | "Council / Beanstalk / Ship"
  | "Council / Beanstalk / Basement"
  | "Council / Beanstalk / Ground"
  | "Council / Beanstalk / Top";
export type QuestMacGruffin =
  | "Council / MacGruffin / Vacation"
  | "Council / MacGruffin / Shore"
  | QuestPalin
  | QuestPyamid
  | QuestDesert
  | QuestRon
  | QuestShen
  | QuestTemple
  | QuestHiddenCity
  | QuestBlack
  | QuestManorMacGruffin;
export type QuestPalin =
  | "Council / MacGruffin / Palin / Book"
  | "Council / MacGruffin / Palin / WetStew"
  | "Council / MacGruffin / Palin / Boss";
export type QuestPyamid =
  | "Council / MacGruffin / Pyramid / Top"
  | "Council / MacGruffin / Pyramid / Middle"
  | "Council / MacGruffin / Pyramid / Wheel"
  | "Council / MacGruffin / Pyramid / EdUndying";
export type QuestRon =
  | "Council / MacGruffin / Ron / Crowd"
  | "Council / MacGruffin / Ron / Zepp"
  | "Council / MacGruffin / Ron / Parent";
export type QuestShen =
  | "Council / MacGruffin / Shen / Meet"
  | "Council / MacGruffin / Shen / Bats"
  | "Council / MacGruffin / Shen / TurnIn"
  | "Council / MacGruffin / Shen / Ninjas"
  | "Council / MacGruffin / Shen / Giants";
export type QuestTemple =
  | "Council / MacGruffin / Temple / Unlock"
  | "Council / MacGruffin / Temple / GrabWool"
  | "Council / MacGruffin / Temple / Nostril"
  | "Council / MacGruffin / Temple / HiddenCity";
export type QuestHiddenCity =
  | "Council / MacGruffin / HiddenCity / Vines"
  | "Council / MacGruffin / HiddenCity / Accountants"
  | "Council / MacGruffin / HiddenCity / Curses"
  | "Council / MacGruffin / HiddenCity / Doctor"
  | "Council / MacGruffin / HiddenCity / Bowling"
  | "Council / MacGruffin / HiddenCity / BookOfMatches"
  | "Council / MacGruffin / HiddenCity / HiddenPark"
  | "Council / MacGruffin / HiddenCity / Boss";
export type QuestBlack = "Council / MacGruffin / Black";
export type QuestDesert =
  | "Council / MacGruffin / Desert / Parent"
  | "Council / MacGruffin / Desert / Explore"
  | "Council / MacGruffin / Desert / StoneRose"
  | "Council / MacGruffin / Desert / Gnome"
  | "Council / MacGruffin / Desert / Compass"
  | "Council / MacGruffin / Desert / WormRide";
export type QuestManorMacGruffin =
  | "Council / MacGruffin / Manor / Ballroom"
  | "Council / MacGruffin / Manor / Recipe"
  | "Council / MacGruffin / Manor / Soda"
  | "Council / MacGruffin / Manor / Wine"
  | "Council / MacGruffin / Manor / Bomb"
  | "Council / MacGruffin / Manor / Boss";
export type QuestIslandWar =
  | "Council / War / Parent"
  | "Council / War / HippyOutfit"
  | "Council / War / FratOutfit"
  | "Council / War / Start"
  | "Council / War / Gremlins"
  | "Council / War / Lobsters"
  | "Council / War / Flyers"
  | "Council / War / Battlefield"
  | "Council / War / Filthworms"
  | "Council / War / Nuns"
  | "Council / War / Boss";
export type QuestTower =
  | "Council / Tower / Contests"
  | "Council / Tower / Maze"
  | "Council / Tower / KeyDoor"
  | "Council / Tower / WallOfSkin"
  | "Council / Tower / WallOfSkin / Beehive"
  | "Council / Tower / WallOfMeat"
  | "Council / Tower / WallOfBones"
  | "Council / Tower / WallOfBones / BoningKnife"
  | "Council / Tower / Shadow"
  | "Council / Tower / Mirror"
  | "Council / Tower / NaughtyBoss"
  | "Council / Tower / Parent"
  | QuestKeys;
export type QuestKeys =
  | "Council / Tower / Keys / DailyDungeon"
  | "Council / Tower / Keys / FantasyBandit"
  | "Council / Tower / Keys / ZapKeys"
  | "Council / Tower / Keys / DupeMirror"
  | "Council / Tower / Keys / Digital"
  | "Council / Tower / Keys / HoleInSkyUnlock"
  | "Council / Tower / Keys / Star"
  | "Council / Tower / Keys / PullZappableKey"
  | "Council / Tower / Keys / Skeleton";
export type QuestManor =
  | "Manor / Chat"
  | "Manor / Kitchen"
  | "Manor / Billards"
  | "Manor / Library"
  | "Manor / Bathroom"
  | "Manor / Gallery"
  | "Manor / Bedroom";
export type QuestSkills =
  | "Skills / Parent"
  | "Skills / MPRegen"
  | "Skills / HPRegen"
  | "Skills / ScalingItem"
  | "Skills / ScalingMeat"
  | "Skills / ScalingDR"
  | "Skills / Infinite Loop"
  | "Skills / Photonic Shroud"
  | "Skills / Piezoelectric Honk"
  | "Skills / Phase Shift"
  | "Skills / Conifer Polymers"
  | "Skills / System Sweep"
  | "Skills / ColdDamage15"
  | "Skills / ColdDamage10";
export type QuestMisc =
  | "Misc / Custom"
  | "Misc / FamEquip"
  | "Misc / MeatCar"
  | "Misc / ManorLights"
  | "Misc / UnlockDungeonsOfDoom"
  | "Misc / GrabZapWand"
  | "Misc / InitialStart"
  | "Misc / PowerLeveling"
  | "Misc / FortuneExp"
  | "Misc / Purchases"
  | "Misc / FriarExp"
  | "Misc / MonsterBait"
  | "Misc / BugbearBakery";
export type QuestCombatLocket =
  | "CombatLocket / SystemSweep"
  | "CombatLocket / InfiniteLoop";
export type QuestIslandUnlock = "Boat / Junkyard" | "Boat / Vacation";
export type QuestCouncil =
  | "Quests / Council"
  | QuestToot
  | QuestLarva
  | QuestTavern
  | QuestBats
  | QuestGoblins
  | QuestFriars
  | QuestCrypt
  | QuestIcePeak
  | QuestTriplePeaks
  | QuestBeanStalk
  | QuestMacGruffin
  | QuestIslandWar
  | QuestTower;
export type QuestNPCs =
  | "NPC / Parent"
  | "NPC / Meatsmith"
  | "NPC / GnomeSkills"
  | "NPC / Painter"
  | "NPC / Untinkerer"
  | "NPC / Baker"
  | "NPC / Druggie";
export type QuestGoblinsExperiments =
  | "GoblinLabs / LabUnlock"
  | "GoblinLabs / MegUnlock";

export type QuestType =
  | QuestCouncil
  | QuestMisc
  | QuestGoblinsExperiments
  | QuestManor
  | QuestNPCs
  | QuestSkills
  | QuestCombatLocket
  | QuestIslandUnlock;
