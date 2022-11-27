const QuestToot = ["Council / Toot"] as const;
const QuestLarva = ["Council / Larva"] as const;
const QuestTavern = ["Council / Tavern"] as const;
const QuestBats = [
  "Council / Bats / Sonars",
  "Council / Bats / UnlockLeft",
  "Council / Bats / UnlockRight",
  "Council / Bats / UnlockBoss",
  "Council / Bats / Boss",
] as const;
const QuestGoblins = [
  "Council / Goblins / Outskirts",
  "Council / Goblins / HaremOutfit",
  "Council / Goblins / King",
] as const;
const QuestFriars = [
  "Council / Friars / Heart",
  "Council / Friars / Elbow",
  "Council / Friars / Neck",
  "Council / Friars / TurnIn",
] as const;
const QuestCrypt = [
  "Council / Crypt / Sprinters",
  "Council / Crypt / Gravy Boat Pull",
  "Council / Crypt / Eyes",
  "Council / Crypt / Rattling",
  "Council / Crypt / DirtyMan",
  "Council / Crypt / Boss",
] as const;
const QuestIcePeak = [
  "Council / Ice / Trapper",
  "Council / Ice / Goats",
  "Council / Ice / Ore",
  "Council / Ice / Ninjas",
  "Council / Ice / Boss",
] as const;
const QuestTriplePeaks = [
  "Council / Peaks / Orcs",
  "Council / Peaks / CargoShortsSmut",
  "Council / Peaks / AbooPeak",
  "Council / Peaks / TwinPeak",
  "Council / Peaks / OilPeak",
  "Council / Peaks / Lord",
] as const;
const QuestBeanStalk = [
  "Council / Beanstalk / EnchantedBean",
  "Council / Beanstalk / Ship",
  "Council / Beanstalk / Basement",
  "Council / Beanstalk / Ground",
  "Council / Beanstalk / Top",
] as const;

const QuestPalin = [
  "Council / MacGruffin / Palin / Book",
  "Council / MacGruffin / Palin / WetStew",
  "Council / MacGruffin / Palin / Boss",
] as const;
const QuestPyamid = [
  "Council / MacGruffin / Pyramid / Top",
  "Council / MacGruffin / Pyramid / Middle",
  "Council / MacGruffin / Pyramid / Wheel",
  "Council / MacGruffin / Pyramid / EdUndying",
] as const;
const QuestRon = [
  "Council / MacGruffin / Ron / Crowd",
  "Council / MacGruffin / Ron / Zepp",
  "Council / MacGruffin / Ron / Parent",
] as const;
const QuestShen = [
  "Council / MacGruffin / Shen / Meet",
  "Council / MacGruffin / Shen / Bats",
  "Council / MacGruffin / Shen / TurnIn",
  "Council / MacGruffin / Shen / Ninjas",
  "Council / MacGruffin / Shen / Giants",
] as const;
const QuestTemple = [
  "Council / MacGruffin / Temple / Unlock",
  "Council / MacGruffin / Temple / GrabWool",
  "Council / MacGruffin / Temple / Nostril",
  "Council / MacGruffin / Temple / HiddenCity",
] as const;
const QuestHiddenCity = [
  "Council / MacGruffin / HiddenCity / Vines",
  "Council / MacGruffin / HiddenCity / Accountants",
  "Council / MacGruffin / HiddenCity / Curses",
  "Council / MacGruffin / HiddenCity / Doctor",
  "Council / MacGruffin / HiddenCity / Bowling",
  "Council / MacGruffin / HiddenCity / BookOfMatches",
  "Council / MacGruffin / HiddenCity / HiddenPark",
  "Council / MacGruffin / HiddenCity / Boss",
] as const;
const QuestBlack = ["Council / MacGruffin / Black"] as const;
const QuestDesert = [
  "Council / MacGruffin / Desert / Parent",
  "Council / MacGruffin / Desert / Explore",
  "Council / MacGruffin / Desert / StoneRose",
  "Council / MacGruffin / Desert / Gnome",
  "Council / MacGruffin / Desert / Compass",
  "Council / MacGruffin / Desert / WormRide",
] as const;
const QuestManorMacGruffin = [
  "Council / MacGruffin / Manor / Ballroom",
  "Council / MacGruffin / Manor / Recipe",
  "Council / MacGruffin / Manor / Soda",
  "Council / MacGruffin / Manor / Wine",
  "Council / MacGruffin / Manor / Bomb",
  "Council / MacGruffin / Manor / Boss",
] as const;
const QuestMacGruffin = [
  "Council / MacGruffin / Vacation",
  "Council / MacGruffin / Shore",
  ...QuestPalin,
  ...QuestPyamid,
  ...QuestDesert,
  ...QuestRon,
  ...QuestShen,
  ...QuestTemple,
  ...QuestHiddenCity,
  ...QuestBlack,
  ...QuestManorMacGruffin,
] as const;
const QuestIslandWarGremlins = [
  "Council / War / Gremlins / Burning Barrel",
  "Council / War / Gremlins / Rusted Car",
  "Council / War / Gremlins / Old Tires",
  "Council / War / Gremlins / Abandoned Refrigerator",
] as const;
const QuestIslandWar = [
  "Council / War / Parent",
  "Council / War / Frat Outfit",
  "Council / War / Start",
  "Council / War / Gremlins",
  "Council / War / Lobsters",
  "Council / War / Flyers",
  "Council / War / Battlefield",
  "Council / War / Filthworms",
  "Council / War / Nuns",
  "Council / War / Boss",
  ...QuestIslandWarGremlins,
] as const;
const QuestKeys = [
  "Council / Tower / Keys / Heroes",
  "Council / Tower / Keys / Heroes / DailyDungeon",
  "Council / Tower / Keys / Heroes / DailyDungeon + Malware",
  "Council / Tower / Keys / Heroes / FantasyBandit",
  "Council / Tower / Keys / Heroes / Buy and Zap Keys",
  "Council / Tower / Keys / Heroes / DeckOfCards",
  "Council / Tower / Keys / Digital",
  "Council / Tower / Keys / HoleInSkyUnlock",
  "Council / Tower / Keys / Star",
  "Council / Tower / Keys / Skeleton",
] as const;
const QuestTower = [
  "Council / Tower / Contests",
  "Council / Tower / Maze",
  "Council / Tower / KeyDoor",
  "Council / Tower / WallOfSkin",
  "Council / Tower / WallOfMeat",
  "Council / Tower / WallOfBones",
  "Council / Tower / Shadow",
  "Council / Tower / Mirror",
  "Council / Tower / NaughtyBoss",
  "Council / Tower / Parent",
  ...QuestKeys,
] as const;
const QuestManor = [
  "Manor / Chat",
  "Manor / Kitchen",
  "Manor / Billards",
  "Manor / Library",
  "Manor / Bathroom",
  "Manor / Gallery",
  "Manor / Bedroom",
] as const;
const QuestSkills = [
  "Skills / Parent",
  "Skills / MPRegen",
  "Skills / HPRegen",
  "Skills / ScalingItem",
  "Skills / ScalingMeat",
  "Skills / ScalingDR",
  "Skills / Infinite Loop",
  "Skills / Photonic Shroud",
  "Skills / Piezoelectric Honk",
  "Skills / Phase Shift",
  "Skills / Conifer Polymers",
  "Skills / System Sweep",
  "Skills / ColdDamage15",
  "Skills / ColdDamage10",
  "Skills / DoubleNanovision",
] as const;
const QuestMisc = [
  "Misc / Custom",
  "Misc / Initial Pulls",
  "Misc / FamEquip",
  "Misc / MeatCar",
  "Misc / ManorLights",
  "Misc / UnlockDungeonsOfDoom",
  "Misc / GrabZapWand",
  "Misc / InitialStart",
  "Misc / PowerLeveling",
  "Misc / FortuneExp",
  "Misc / Purchases",
  "Misc / FriarExp",
  "Misc / BugbearBakery",
  "Misc / Moonsign",
  "Misc / JuneCleaver",
  "Misc / Ghost Buster",
  "Misc / Short Cook Goose",
  "Misc / Latte / Fam Exp",
  "Misc / Latte / Plus Combat",
  "Misc / Tot Pirate",
] as const;
const QuestCombatLocket = ["CombatLocket / InfiniteLoop"] as const;
const QuestIslandUnlock = ["Boat / Vacation"] as const;
const QuestCouncil = [
  "Quests / Council",
  ...QuestToot,
  ...QuestLarva,
  ...QuestTavern,
  ...QuestBats,
  ...QuestGoblins,
  ...QuestFriars,
  ...QuestCrypt,
  ...QuestIcePeak,
  ...QuestTriplePeaks,
  ...QuestBeanStalk,
  ...QuestMacGruffin,
  ...QuestIslandWar,
  ...QuestTower,
] as const;
const QuestNPCs = [
  "NPC / Parent",
  "NPC / Meatsmith",
  "NPC / GnomeSkills",
  "NPC / Untinkerer",
  "NPC / Baker",
  "NPC / Druggie",
  "NPC / Knoll Mayor",
  "NPC / Doctor",
  "NPC / Painter",
] as const;
const QuestGoblinsExperiments = [
  "GoblinLabs / LabUnlock",
  "GoblinLabs / MegUnlock",
] as const;
const QuestAbsorbs = [
  "Absorbs / Hole in Sky",
  "Absorbs / Canadia",
  "Absorbs / Knoll",
  "Absorbs / Gnomads",
  "Absorbs / Palin",
  "Absorbs / Irate Mariachi",
] as const;
const QuestLevels = [
  "Level / 1",
  "Level / 2",
  "Level / 3",
  "Level / 4",
  "Level / 5",
  "Level / 6",
  "Level / 7",
  "Level / 8",
  "Level / 9",
  "Level / 10",
  "Level / 11",
  "Level / 12",
  "Level / 13",
] as const;
export const QuestTypeArray = [
  ...QuestCouncil,
  ...QuestMisc,
  ...QuestGoblinsExperiments,
  ...QuestManor,
  ...QuestNPCs,
  ...QuestSkills,
  ...QuestCombatLocket,
  ...QuestIslandUnlock,
  ...QuestAbsorbs,
  ...QuestLevels,
] as const;

export type QuestType = typeof QuestTypeArray[number];
