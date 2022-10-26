import {
  availableAmount,
  chatPrivate,
  cliExecute,
  getClanId,
  getClanLounge,
  getClanName,
  getProperty,
  isOnline,
  Item,
  Monster,
  print,
  toInt,
  visitUrl,
  wait,
  waitq,
} from "kolmafia";
import { GreySettings } from "./GreySettings";

const vipInvitation = Item.get("Clan VIP Lounge key");
const fireworks = Item.get("Clan Underground fireworks shop");
const fortune = Item.get("Clan Carnival Game");
const faxMachine = Item.get("deluxe fax machine");
const bonusAdvFromHell: number = 90485;
const faxOnline = isOnline("CheeseFax");

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

export function getAvailableClans(): Map<number, string> {
  if (availableClans != null) {
    return availableClans;
  }

  let page = visitUrl("clan_signup.php?place=managewhitelists");

  availableClans = new Map();
  let match: string[];

  while (
    (match = page.match(
      /option +value=(\d+)>([^<>]*)<\/option>(?!.*name=whichclan>)/
    )) != null
  ) {
    page = page.replace(match[0], "");

    availableClans.set(toInt(match[1]), match[2]);
  }

  return availableClans;
}

export function getFax(monster: Monster) {
  if (isVIPDisabled()) {
    throw "VIP was disabled, but function fax was still called";
  }

  const faxbot = "CheeseFax";

  if (!canAccessClan(getDefaultClan()) || !isOnline(faxbot)) {
    throw (
      "Cannot access fax machine, clan accessible? " +
      canAccessClan(getDefaultClan()) +
      ". CheeseFax online? " +
      isOnline(faxbot)
    );
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
      for (let i = 0; i < 6; i++) {
        // We might have missed it or overrode it
        if (i % 3 == 0) {
          chatPrivate(faxbot, monster.name);
        }

        wait(10);

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

  const bot: string = "CheeseFax";
  const fortuneClan: number = bonusAdvFromHell;

  if (!canAccessClan(fortuneClan)) {
    print("Oh dear, can't access the clan for Fortune Telling", "red");
    return;
  }

  if (getClanId() != fortuneClan && !hasWhitelistToCurrentClan()) {
    print(
      "Oh dear, we don't have whitelist to current clan. Skipping fortune telling",
      "red"
    );
    return;
  }

  if (!isOnline(bot)) {
    print(`Oh dear, can't do fortune teller as ${bot} is offline`);
    return;
  }

  print("Now performing hocus pocus with the Fortune Teller", "blue");

  runInClan(fortuneClan, () => {
    if (getClanLounge()[fortune.name] == null) {
      throw "Expected to be find fortune teller in the clan " + getClanName();
    }

    while (consultsUsed() < 3) {
      // We want the first result to be compatible
      // The second result is incompatible, as its worth more
      // The last result is compatible, as it has nicer equips

      const consultString =
        consultsUsed() == 1 ? "a b c" : "pizza batman thick";

      cliExecute("fortune " + bot + " " + consultString);

      if (consultsUsed() < 3) {
        waitq(3);
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
