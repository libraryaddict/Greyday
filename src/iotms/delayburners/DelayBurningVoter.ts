import {
  print,
  availableAmount,
  mallPrice,
  visitUrl,
  getProperty,
  toInt,
  totalTurnsPlayed,
  equip,
  Slot,
  Item,
  Monster,
  turnsPlayed,
  pullsRemaining,
} from "kolmafia";
import { GreySettings } from "../../utils/GreySettings";
import { DelayBurner } from "./DelayBurnerAbstract";

export class DelayBurningVoter implements DelayBurner {
  absentee: Item = Item.get("Absentee Voter Ballot");
  sticker: Item = Item.get('"I Voted!" sticker');

  getFightSetup(): Item[] {
    return [this.sticker];
  }

  doFightSetup(): Slot[] {
    equip(this.sticker, Slot.get("acc3"));

    return [Slot.get("acc3")];
  }

  forcesFight(): boolean {
    return true;
  }

  readyIn(): number {
    const turnsPlayed = totalTurnsPlayed();

    let turnsTillNextFight = (turnsPlayed - 1) % 11;

    if (turnsTillNextFight > 0) {
      turnsTillNextFight = 11 - turnsTillNextFight;
    }

    if (toInt(getProperty("lastVoteMonsterTurn")) >= turnsPlayed) {
      turnsTillNextFight += 11;
    }

    return turnsTillNextFight;
  }

  doSetup(): void {
    if (
      availableAmount(this.sticker) > 0 ||
      turnsPlayed() > 200 ||
      this.getVoting() == null
    ) {
      return;
    }

    this.voterSetup();
  }

  getVoting(): number[] {
    const match = GreySettings.greyVotingBooth.match(/^\d+(,\d+)*$/);

    if (match == null) {
      return null;
    }

    return GreySettings.greyVotingBooth.split(",").map((s) => toInt(s));
  }

  isViable(): boolean {
    if (availableAmount(this.sticker) > 0) {
      return true;
    }

    if (this.getVoting() == null) {
      return false;
    }

    if (getProperty("voteAlways") == "true") {
      return true;
    }

    if (pullsRemaining() < 0) {
      return false;
    }

    return availableAmount(this.absentee) > 0;
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

    const canVoteFor: string[] = [
      "Muscle Percent: +25",
      "Maximum HP Percent: -50",
      "Moxie Percent: +25",
      "Hot Resistance: +3",
    ];

    canVoteFor.forEach((name, index) => {
      const prop = getProperty("_voteLocal" + (index + 1));

      if (prop == name) {
        return;
      }

      throw `Expected '${name}' as voting option ${
        index + 1
      } but instead got '${prop}'`;
    });

    const votingOptions: number[] = this.getVoting();

    if (votingOptions.length < 1 || votingOptions.length > 2) {
      throw "Expected 1-2 voting options, received " + votingOptions.length;
    }

    votingOptions.forEach((option) => {
      if (option < 0 || option > 4) {
        throw "Invalid voting option " + option + " provided";
      }
    });

    if (votingOptions.length == 1) {
      votingOptions.push(votingOptions[0]);
    }

    const firstProp = getProperty("_voteLocal" + votingOptions[0]);
    const secondProp = getProperty("_voteLocal" + votingOptions[1]);

    print(
      "We're voting for " +
        firstProp +
        " (" +
        votingOptions[0] +
        ")" +
        " and " +
        secondProp +
        " (" +
        votingOptions[1] +
        ")",
      "gray"
    );

    visitUrl(
      `choice.php?option=1&whichchoice=1331&g=${monsterVote}&local[]=${
        votingOptions[0] - 1
      }&local[]=${votingOptions[1] - 1}`
    );
  }
}
