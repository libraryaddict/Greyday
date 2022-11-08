import {
  availableAmount,
  chatPrivate,
  choiceFollowsFight,
  cliExecute,
  currentRound,
  fightFollowsChoice,
  getClanId,
  getClanLounge,
  getClanName,
  getProperty,
  handlingChoice,
  isOnline,
  Item,
  Monster,
  print,
  propertyExists,
  setProperty,
  toInt,
  toJson,
  visitUrl,
  wait,
  waitq,
} from "kolmafia";
import { GreySettings } from "./GreySettings";

const vipInvitation = Item.get("Clan VIP Lounge key");
const fireworks = Item.get("Clan Underground fireworks shop");
const fortune = Item.get("Clan Carnival Game");
const faxMachine = Item.get("deluxe fax machine");
const faxOnline = isOnline("CheeseFax");
const fortuneTellers: Map<number, string> = new Map([
  [82072, "AverageChat"],
  [90485, "CheeseFax"],
]);

let availableClans: Map<number, string>;

class ClanSwitcher {
  origClan: number = getClanId();

  joinClan(id: number): boolean {
    if (getClanId() == id) {
      return true;
    }

    const page = visitUrl(
      "showclan.php?recruiter=1&whichclan=" +
        id +
        "&pwd&whichclan=" +
        id +
        "&action=joinclan&apply=Apply+to+this+Clan&confirm=on"
    );

    const success = page.includes("clanhalltop.gif");

    if (success) {
      print("Switched to clan " + getClanName(), "gray");
    } else {
      print("Failed to switch clans! Unable to switch to clan ID " + id, "red");
    }

    return success;
  }

  restoreClan() {
    if (this.origClan == getClanId()) {
      return;
    }

    this.joinClan(this.origClan);
  }
}

function getDefaultClan(): number {
  if (GreySettings.greyVIPClan.trim().length == 0) {
    return null;
  }

  if (GreySettings.greyVIPClan.trim().toLowerCase() == getClanName()) {
    return getClanId();
  }

  const clanInfo = [...getAvailableClans()].find(
    ([, v]) => v.toLowerCase() == GreySettings.greyVIPClan.toLowerCase()
  );

  if (clanInfo == null) {
    return null;
  }

  return clanInfo[0];
}

function runInClan(clanId: number, func: () => void) {
  if (!hasWhitelistToCurrentClan() && getClanId() != clanId) {
    throw "Attempted to switch clans, but we don't have WL to our current clan!";
  }

  const switcher = new ClanSwitcher();

  try {
    const result = switcher.joinClan(clanId);

    if (!result) {
      return;
    }

    func();
  } finally {
    switcher.restoreClan();
  }
}

function loadWhitelists(): Map<number, string> {
  const prop = "_clansWhitelisted";

  availableClans = new Map();

  if (!propertyExists(prop)) {
    // Wait until we can fetch the page without errors
    while (
      currentRound() != 0 ||
      handlingChoice() ||
      choiceFollowsFight() ||
      fightFollowsChoice()
    ) {}

    let page = visitUrl("clan_signup.php?place=managewhitelists");

    let match: string[];

    while (
      (match = page.match(
        /option +value=(\d+)>([^<>]*)<\/option>(?!.*name=whichclan>)/
      )) != null
    ) {
      page = page.replace(match[0], "");

      availableClans.set(toInt(match[1]), match[2]);
    }

    setProperty(
      prop,
      toJson([...availableClans].map(([k, v]) => [k.toString(), v]))
    );
  } else {
    const data = getProperty(prop);

    availableClans = new Map(
      (JSON.parse(data) as [string, string][]).map(([k, v]) => [toInt(k), v])
    );
  }

  return availableClans;
}

export function getAvailableClans(): Map<number, string> {
  if (availableClans != null) {
    return availableClans;
  }

  return loadWhitelists();
}

export function getFax(monster: Monster) {
  if (isVIPDisabled()) {
    throw "VIP was disabled, but function fax was still called";
  }

  const faxbot = "CheeseFax";

  if (!canAccessClan(getDefaultClan()) || !isOnline(faxbot)) {
    throw `Cannot access fax machine, clan accessible? ${canAccessClan(
      getDefaultClan()
    )}. ${faxbot} online? ${isOnline(faxbot)}`;
  }

  runInClan(getDefaultClan(), () => {
    if (!canUseFaxMachine()) {
      throw "Expected to be find fax machine in the clan " + getClanName();
    }

    print("Now trying to fax " + monster.name, "blue");

    const hasReceivedFax = () => {
      if (availableAmount(Item.get(`photocopied monster`)) == 0) {
        cliExecute("fax receive");
      }

      if (
        getProperty("photocopyMonster").toLowerCase() ==
        monster.name.toLowerCase()
      ) {
        return true;
      }

      cliExecute("fax send");
      return false;
    };

    if (!hasReceivedFax()) {
      for (let i = 0; i <= 6; i++) {
        // We might have missed it or overrode it
        if (i % 3 == 0) {
          chatPrivate(faxbot, monster.name);
        }

        wait(10 + i);

        if (hasReceivedFax()) {
          return;
        }
      }
    }

    if (!hasReceivedFax()) {
      throw new Error(
        "Failed to acquire photocopied " +
          monster +
          ", assuming " +
          faxbot +
          " is online you probably just missed the fax. Try running the script again."
      );
    }
  });
}

export function runFireworks(request: () => void) {
  runInClan(getClanToUse(fireworks), () => {
    if (!canUseFireworks()) {
      throw "Expected to be find fireworks shop in the clan " + getClanName();
    }

    request();
  });
}

export function doFortuneTeller() {
  if (isVIPDisabled() || !GreySettings.greyFortuneTeller) {
    return;
  }

  const consultsUsed = () => toInt(getProperty("_clanFortuneConsultUses"));

  if (consultsUsed() >= 3) {
    return;
  }

  let bot: string = null;
  let fortuneClan: number = null;

  if (fortuneTellers.has(getClanId())) {
    bot = fortuneTellers.get(getClanId());
    fortuneClan = getClanId();

    if (!isOnline(bot)) {
      bot = null;
    }
  }

  if (bot == null) {
    if (!hasWhitelistToCurrentClan()) {
      print(
        "Oh dear, we don't have whitelist to current clan. Skipping fortune telling",
        "red"
      );
      return;
    }

    for (const [clanId, botName] of fortuneTellers) {
      if (!canAccessClan(clanId) || !isOnline(bot)) {
        continue;
      }

      bot = botName;
      fortuneClan = clanId;
      break;
    }
  }

  if (bot == null) {
    print(
      "Unfortunately we do not have access to any Fortune Telling as the bots are either offline or you do not have a whitelist to the clans",
      "red"
    );
    return;
  }

  print("Now performing hocus pocus with the Fortune Teller", "blue");

  runInClan(fortuneClan, () => {
    if (getClanLounge()[fortune.name] == null) {
      throw "Expected to be find fortune teller in the clan " + getClanName();
    }

    let failed = 0;

    while (consultsUsed() < 3) {
      // We want the first result to be compatible
      // The second result is incompatible, as its worth more
      // The last result is compatible, as it has nicer equips

      const consultString =
        consultsUsed() == 1 ? "a b c" : "pizza batman thick";

      const consults = consultsUsed();
      cliExecute("fortune " + bot + " " + consultString);

      if (consults == consultsUsed() && failed++ > 3) {
        print(
          "Going to ask " +
            bot +
            " for a fax so they join " +
            getClanName() +
            "...",
          "gray"
        );

        chatPrivate(bot, "fax mountain man");
        waitq(10);
        failed = -2;
      }

      if (consultsUsed() < 3) {
        waitq(4);
      }
    }
  });

  print("Done with fortune telling.", "blue");
}

export function hasVIPInvitation(): boolean {
  return availableAmount(vipInvitation) > 0;
}

function canAccessClan(clanId: number): boolean {
  if (clanId == null) {
    return false;
  }

  return (
    clanId == getClanId() ||
    (hasWhitelistToCurrentClan() && getAvailableClans().has(clanId))
  );
}

export function hasWhitelistToCurrentClan(): boolean {
  return getClanId() < 0 || getAvailableClans().has(getClanId());
}

export function canUseFireworks(): boolean {
  return hasVIPInvitation() && canUse(fireworks);
}

export function canUseFortuneBuff(): boolean {
  return hasVIPInvitation() && canUse(fortune);
}

export function useFortuneBuff(func: () => void) {
  runInClan(getClanToUse(fortune), func);
}

export function canUseFaxMachine(): boolean {
  return (
    hasVIPInvitation() &&
    !isVIPDisabled() &&
    canUse(faxMachine) &&
    canAccessClan(getDefaultClan()) &&
    faxOnline
  );
}

function canUse(vipItem: Item): boolean {
  return getClanToUse(vipItem) != null;
}

function getClanToUse(vipItem: Item): number {
  if (getClanLounge()[vipItem.name] != null) {
    return getClanId();
  }

  if (canAccessClan(getDefaultClan()) && getDefaultClan() != getClanId()) {
    return getDefaultClan();
  }

  return null;
}

export function isVIPDisabled(): boolean {
  return !hasVIPInvitation() || GreySettings.greyVIPClan.length == 0;
}
