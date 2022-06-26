import {
  Location,
  Familiar,
  Monster,
  Item,
  availableAmount,
  getProperty,
  haveOutfit,
  Effect,
  haveEffect,
  myMeat,
  print,
  Skill,
  visitUrl,
  retrieveItem,
  cliExecute,
  canFaxbot,
  faxbot,
} from "kolmafia";
import { ResourceClaim, ResourceType } from "../../../utils/GreyResources";
import { Macro } from "../../../utils/MacroBuilder";
import { QuestAdventure, QuestInfo, QuestStatus } from "../../Quests";
import { QuestType } from "../../QuestTypes";

export class QuestL12FratFax implements QuestInfo {
  shorts: Item = Item.get("Cargo Cultist Shorts");
  rocket: Item = Item.get("Yellow Rocket");
  effect: Effect = Effect.get("Everything Looks Yellow");
  monster: Monster = Monster.get("Orcish Frat Boy Spy");

  getId(): QuestType {
    return "Council / War / Frat Fax";
  }

  level(): number {
    return 12;
  }

  status(): QuestStatus {
    if (haveOutfit("Frat Warrior Fatigues")) {
      return QuestStatus.COMPLETED;
    }

    if (getProperty("_photocopyUsed") == "true") {
      return QuestStatus.COMPLETED;
    }

    // Don't try to fax if we haven't cargo shorts yet
    if (
      availableAmount(this.shorts) > 0 &&
      getProperty("_cargoPocketEmptied") != "true"
    ) {
      return QuestStatus.NOT_READY;
    }

    if (haveEffect(this.effect) > 0 || myMeat() < 300) {
      return QuestStatus.NOT_READY;
    }

    return QuestStatus.READY;
  }

  run(): QuestAdventure {
    return {
      location: null,
      run: () => {
        cliExecute("acquire " + this.rocket.name);

        if (availableAmount(this.rocket) == 0) {
          throw "Expected a yellow rocket!";
        }

        if (!canFaxbot(this.monster)) {
          throw (
            "Can't fax in " +
            this.monster.name +
            ". Try fax it in manually, and yellow rocket it?"
          );
        }

        faxbot(this.monster);

        if (getProperty("photocopyMonster") != this.monster.name) {
          throw (
            "Expected " +
            this.monster.name +
            " but mafia reports we have a faxed " +
            getProperty("photocopyMonster") +
            ". Try fax it in manually and yellow rocket it?"
          );
        }

        visitUrl("inv_use.php?which=3&whichitem=4873&pwd");

        Macro.item(this.rocket).submit();

        if (!haveOutfit("Frat Warrior Fatigues")) {
          throw "Something went wrong when trying to fax in a frat boy spy. We should've fought it, but we don't have the outfit";
        }
      },
    };
  }

  getLocations(): Location[] {
    return [];
  }

  getResourceClaims(): ResourceClaim[] {
    return [
      new ResourceClaim(ResourceType.CARGO_SHORTS, 1, "YR Frat Boy", 16),
      new ResourceClaim(ResourceType.YELLOW_RAY, 1, "YR Frat Boy", 16),
    ];
  }
}
