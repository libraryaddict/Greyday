import {
  print,
  availableAmount,
  mallPrice,
  retrieveItem,
  visitUrl,
  getProperty,
  waitq,
  toInt,
  totalTurnsPlayed,
  myPrimestat,
  equip,
  Slot,
  Item,
  Monster,
} from "kolmafia";
import { DelayBurner } from "./DelayBurnerAbstract";

export class DelayBurningVoter implements DelayBurner {
  absentee: Item = Item.get("Absentee Voter Ballot");
  sticker: Item = Item.get('"I Voted!" sticker');

  doFightSetup(): Slot[] {
    equip(Slot.get("Acc3"), this.sticker);

    return [Slot.get("Acc3")];
  }

  isViableAsCombatReplacer(): boolean {
    return false;
  }

  readyIn(): number {
    let turnsTillNextFight = (totalTurnsPlayed() - 1) % 11;

    if (turnsTillNextFight > 0) {
      turnsTillNextFight = 10 - turnsTillNextFight;
    }

    if (toInt(getProperty("lastVoteMonsterTurn")) >= totalTurnsPlayed()) {
      turnsTillNextFight += 10;
    }

    return turnsTillNextFight;
  }

  doSetup(): void {
    if (availableAmount(this.sticker) > 0) {
      return;
    }
  }

  isViable(): boolean {
    return (
      availableAmount(this.sticker) > 0 ||
      getProperty("voteAlways") == "true" ||
      getProperty("_voteToday") == "true" ||
      availableAmount(this.absentee) > 0
    );
  }

  isFree(): boolean {
    return toInt(getProperty("_voteFreeFights")) < 3;
  }

  voterSetup(): void {
    const voterValueTable = [
      {
        monster: Monster.get("terrible mutant"),
        value: mallPrice(Item.get("glob of undifferentiated tissue")) + 10,
      },
      {
        monster: Monster.get("angry ghost"),
        value: mallPrice(Item.get("ghostly ectoplasm")) * 1.11,
      },
      {
        monster: Monster.get("government bureaucrat"),
        value:
          mallPrice(Item.get("absentee voter ballot")) * 0.05 + 75 * 0.25 + 50,
      },
      {
        monster: Monster.get("annoyed snake"),
        value: 25 * 0.5 + 25,
      },
      {
        monster: Monster.get("slime blob"),
        value: 20 * 0.4 + 50 * 0.2 + 250 * 0.01,
      },
    ];

    if (
      availableAmount(this.absentee) > 0 &&
      getProperty("_voteToday") == "false" &&
      getProperty("voteAlways") == "false"
    ) {
      try {
        visitUrl("inv_use.php?pwd&which=3&whichitem=9991");
        //use(Item.get("Absentee Voter Ballot"));
      } catch (e) {}
    }

    try {
      visitUrl("place.php?whichplace=town_right&action=townright_vote");
    } catch (e) {}

    const votingMonsterPriority = voterValueTable
      .sort((a, b) => b.value - a.value)
      .map((element) => element.monster.name);

    const initPriority = new Map<string, number>([
      ["Meat Drop: +30", 10],
      ["Familiar Experience: +2", 9],
      ["Item Drop: +15", 8],
      ["Adventures: +1", 7],
      ["Monster Level: +10", 5],
      [`${myPrimestat()} Percent: +25`, 3],
      [`Experience (${myPrimestat()}): +4`, 2],
      ["Meat Drop: -30", -2],
      ["Item Drop: -15", -2],
      ["Familiar Experience: -2", -2],
    ]);

    const monsterVote =
      votingMonsterPriority.indexOf(getProperty("_voteMonster1")) <
      votingMonsterPriority.indexOf(getProperty("_voteMonster2"))
        ? 1
        : 2;

    const voteLocalPriorityArr = [
      [
        0,
        initPriority.get(getProperty("_voteLocal1")) ||
          (getProperty("_voteLocal1").indexOf("-") === -1 ? 1 : -1),
      ],
      [
        1,
        initPriority.get(getProperty("_voteLocal2")) ||
          (getProperty("_voteLocal2").indexOf("-") === -1 ? 1 : -1),
      ],
      [
        2,
        initPriority.get(getProperty("_voteLocal3")) ||
          (getProperty("_voteLocal3").indexOf("-") === -1 ? 1 : -1),
      ],
      [
        3,
        initPriority.get(getProperty("_voteLocal4")) ||
          (getProperty("_voteLocal4").indexOf("-") === -1 ? 1 : -1),
      ],
    ];

    const bestVotes = voteLocalPriorityArr.sort((a, b) => b[1] - a[1]);
    const firstInit = bestVotes[0][0];
    const secondInit = bestVotes[1][0];

    print(
      "We're voting for " +
        getProperty("_voteLocal" + (firstInit + 1)) +
        " (" +
        firstInit +
        ")" +
        " and " +
        getProperty("_voteLocal" + (secondInit + 1)) +
        " (" +
        secondInit +
        ")",
      "gray"
    );

    visitUrl(
      `choice.php?option=1&whichchoice=1331&g=${monsterVote}&local[]=${firstInit}&local[]=${firstInit}`
    );
    waitq(1);
  }
}
