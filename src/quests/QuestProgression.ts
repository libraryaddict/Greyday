import { QuestType } from "./QuestTypes";

startWith("Level / 2").unlocks("Council / Larva");

startWith("Level / 3", "Council / Larva")
  .unlocks("Council / Tavern")
  .unlocks("Misc / UnlockDungeonsOfDoom");

startWith("Level / 4")
  .unlocks("Council / Bats / UnlockLeft")
  .unlocks("Council / Bats / UnlockRight")
  .unlocks("Council / Bats / UnlockBoss");

startWith("Level / 5")
  .unlocks("Council / Goblins / Outskirts")
  .unlocks("Council / Goblins / HaremOutfit")
  .unlocks("Council / Goblins / King")
  .unlocks("GoblinLabs / LabUnlock")
  .unlocks("GoblinLabs / MegUnlock")
  .unlocks("Skills / Phase Shift");

startWith("Manor / Kitchen")
  .unlocks("Manor / Billards")
  .unlocks("Manor / Library")
  .unlocks("Manor / Gallery", "Manor / Bedroom", "Manor / Bathroom")
  .unlocks("Council / MacGruffin / Manor / Ballroom");

startWith("Level / 6")
  .unlocks(
    "Council / Friars / Elbow",
    "Council / Friars / Heart",
    "Council / Friars / Neck"
  )
  .unlocks("Council / Friars / TurnIn")
  .unlocks("Misc / FriarExp")
  .unlocks("Skills / ScalingItem");

startWith("Level / 7")
  .unlocks(
    "Council / Crypt / DirtyMan",
    "Council / Crypt / Eyes",
    "Council / Crypt / Sprinters",
    "Council / Crypt / Rattling"
  )
  .unlocks("Council / Crypt / Boss");

startWith("Level / 8")
  .unlocks("Misc / UnlockDungeonsOfDoom")
  .unlocks("Misc / GrabZapWand")
  .unlocks("Council / Tower / Keys / Heroes / Buy and Zap Keys");

startWith("Level / 8")
  .unlocks("Council / Ice / Trapper")
  .unlocks("Council / Ice / Goats", "Council / Ice / Ore")
  .unlocks("Council / Ice / Ninjas")
  .unlocks("Council / Ice / Boss");

startWith("Level / 9")
  .unlocks("Council / Peaks / Orcs")
  .unlocks(
    "Council / Peaks / AbooPeak",
    "Council / Peaks / OilPeak",
    "Council / Peaks / TwinPeak"
  )
  .unlocks("Council / Peaks / Lord");

startWith("Level / 10")
  .unlocks("Council / Beanstalk / EnchantedBean")
  .unlocks("Council / Beanstalk / Ship")
  .unlocks("Council / Beanstalk / Basement")
  .unlocks("Council / Beanstalk / Ground")
  .unlocks("Council / Beanstalk / Top")
  .unlocks("Council / Tower / Keys / HoleInSkyUnlock");

startWith("Council / MacGruffin / Vacation")
  .unlocks("Council / MacGruffin / Desert / Explore")
  .unlocks(
    "Council / MacGruffin / Desert / Gnome",
    "Council / MacGruffin / Desert / StoneRose",
    "Council / MacGruffin / Desert / WormRide"
  )
  .unlocks("Council / MacGruffin / Pyramid / Top")
  .unlocks("Council / MacGruffin / Pyramid / Middle")
  .unlocks("Council / MacGruffin / Pyramid / Wheel")
  .unlocks("Council / MacGruffin / Pyramid / EdUndying");

startWith("Council / MacGruffin / Vacation")
  .unlocks("Council / MacGruffin / Ron / Crowd")
  .unlocks("Council / MacGruffin / Ron / Zepp");

startWith("Council / MacGruffin / Vacation")
  .unlocks("Council / MacGruffin / Shen / Meet")
  .unlocks("Council / Bats / UnlockLeft")
  .unlocks("Council / MacGruffin / Shen / TurnIn")
  .unlocks("Council / Beanstalk / Ground")
  .unlocks("Council / Ice / Ore", "Council / Ice / Goats");

startWith("Council / MacGruffin / Vacation")
  .unlocks("Council / MacGruffin / Manor / Ballroom")
  .unlocks("Council / MacGruffin / Manor / Recipe")
  .unlocks(
    "Council / MacGruffin / Manor / Soda",
    "Council / MacGruffin / Manor / Wine"
  )
  .unlocks("Council / MacGruffin / Manor / Bomb")
  .unlocks("Council / MacGruffin / Manor / Boss");

startWith("Council / MacGruffin / Vacation")
  .unlocks("Council / MacGruffin / Temple / Unlock")
  .unlocks("Council / MacGruffin / Temple / GrabWool")
  .unlocks("Council / MacGruffin / Temple / Nostril")
  .unlocks("Council / MacGruffin / HiddenCity / HiddenPark")
  .unlocks("Council / MacGruffin / HiddenCity / Vines")
  .unlocks("Council / MacGruffin / HiddenCity / BookOfMatches")
  .unlocks(
    "Council / MacGruffin / HiddenCity / Bowling",
    "Council / MacGruffin / HiddenCity / Curses",
    "Council / MacGruffin / HiddenCity / Doctor",
    "Council / MacGruffin / HiddenCity / Accountants"
  )
  .unlocks("Council / MacGruffin / HiddenCity / Boss");

startWith("Council / MacGruffin / Vacation")
  .unlocks("Council / MacGruffin / Palin / Book")
  .unlocks("Council / MacGruffin / Palin / WetStew")
  .unlocks("Council / MacGruffin / Palin / Boss");

startWith("Level / 12")
  .unlocks("Boat / Vacation")
  .unlocks("Council / War / Start")
  .unlocks(
    "Council / War / Lobsters",
    "Council / War / Flyers",
    "Council / War / Gremlins"
  )
  .unlocks("Council / War / Battlefield")
  .unlocks("Council / War / Filthworms")
  .unlocks("Council / War / Nuns")
  .unlocks("Council / War / Boss");

startWith("Level / 13")
  .unlocks("Council / Tower / Contests")
  .unlocks("Council / Tower / Maze")
  .unlocks("Council / Tower / WallOfSkin")
  .unlocks("Council / Tower / WallOfMeat")
  .unlocks("Council / Tower / WallOfBones")
  .unlocks("Council / Tower / KeyDoor")
  .unlocks("Council / Tower / Shadow")
  .unlocks("Council / Tower / NaughtyBoss");

const requires: Map<QuestType, QuestType[]> = new Map();

function startWith(...quest: QuestType[]): TaskThen {
  return new TaskThen(quest);
}

class TaskThen {
  private current: QuestType[];

  constructor(current: QuestType[]) {
    this.current = current;
  }

  unlocks(...quest: QuestType[]): TaskThen {
    const q: QuestType[] = this.current;
    this.current = quest;

    return this.needs(...q);
  }

  needs(...quest: QuestType[]): TaskThen {
    for (const q of this.current) {
      if (!requires.has(q)) {
        requires.set(q, []);
      }

      for (const q1 of quest) {
        if (requires.get(q).includes(q1)) {
          continue;
        }

        requires.get(q).push(q1);
      }
    }

    this.current = quest;

    return this;
  }
}
