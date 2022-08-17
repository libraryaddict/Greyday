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
  turnsPlayed,
} from "kolmafia";
import { GreySettings } from "../../utils/GreySettings";
import { DelayBurner } from "./DelayBurnerAbstract";

export class DelayBurningVoter implements DelayBurner {
  absentee: Item = Item.get("Absentee Voter Ballot");
  sticker: Item = Item.get('"I Voted!" sticker');

  doFightSetup(): Slot[] {
    equip(this.sticker, Slot.get("acc3"));

    return [Slot.get("acc3")];
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
    if (
      availableAmount(this.sticker) > 0 ||
      turnsPlayed() < 200 ||
      !GreySettings.greyVotingBooth
    ) {
      return;
    }

    this.voterSetup();
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

    const monsterVote =
      votingMonsterPriority.indexOf(getProperty("_voteMonster1")) <
      votingMonsterPriority.indexOf(getProperty("_voteMonster2"))
        ? 1
        : 2;

    const firstInit: [number, string] = [2, "Moxie Percent"];
    const secondInit: [number, string] = [3, "Hot Resistance: +3"];
    const firstProp = getProperty("_voteLocal" + (firstInit[0] + 1));
    const secondProp = getProperty("_voteLocal" + (secondInit[0] + 1));

    if (firstInit[1] != firstProp || secondInit[1] != secondProp) {
      throw `Expected voting booth to give us ${firstInit[1]} and ${secondInit[1]} but instead they give ${firstProp} and ${secondProp}`;
    }

    print(
      "We're voting for " +
        getProperty("_voteLocal" + (firstInit[0] + 1)) +
        " (" +
        firstInit +
        ")" +
        " and " +
        getProperty("_voteLocal" + (secondInit[0] + 1)) +
        " (" +
        secondInit +
        ")",
      "gray"
    );

    visitUrl(
      `choice.php?option=1&whichchoice=1331&g=${monsterVote}&local[]=${firstInit[0]}&local[]=${secondInit[0]}`
    );
    waitq(1);
  }
}
