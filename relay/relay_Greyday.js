/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "main": () => (/* binding */ main)
});

;// CONCATENATED MODULE: external "kolmafia"
const external_kolmafia_namespaceObject = require("kolmafia");
;// CONCATENATED MODULE: ./src/utils/GreyClan.ts
function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];if (_i == null) return;var _arr = [];var _n = true;var _d = false;var _s, _e;try {for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


var vipInvitation = external_kolmafia_namespaceObject.Item.get("Clan VIP Lounge key");
var fireworks = external_kolmafia_namespaceObject.Item.get("Clan Underground fireworks shop");
var fortune = external_kolmafia_namespaceObject.Item.get("Clan Carnival Game");
var faxMachine = external_kolmafia_namespaceObject.Item.get("deluxe fax machine");
var bonusAdvFromHell = 90485;
var faxOnline = (0,external_kolmafia_namespaceObject.isOnline)("CheeseFax");

var availableClans;var

ClanSwitcher = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {function ClanSwitcher() {_classCallCheck(this, ClanSwitcher);_defineProperty(this, "origClan",
    getClanId());}_createClass(ClanSwitcher, [{ key: "joinClan", value:

    function joinClan(id) {
      if (getClanId() == id) {
        return true;
      }

      var page = visitUrl(
      "showclan.php?recruiter=1&whichclan=" +
      id +
      "&pwd&whichclan=" +
      id +
      "&action=joinclan&apply=Apply+to+this+Clan&confirm=on");


      var success = page.includes("clanhalltop.gif");

      if (success) {
        print("Switched to clan " + getClanName(), "gray");
      } else {
        print("Failed to switch clans! Unable to switch to clan ID " + id, "red");
      }

      return success;
    } }, { key: "restoreClan", value:

    function restoreClan() {
      if (this.origClan == getClanId()) {
        return;
      }

      this.joinClan(this.origClan);
    } }]);return ClanSwitcher;}()));


function getDefaultClan() {
  if (GreySettings.greyVIPClan.trim().length == 0) {
    return null;
  }

  var clanInfo = _toConsumableArray(getAvailableClans()).find(
  function (_ref) {var _ref2 = _slicedToArray(_ref, 2),v = _ref2[1];return v.toLowerCase() == GreySettings.greyVIPClan.toLowerCase();});


  if (clanInfo == null) {
    return null;
  }

  return clanInfo[0];
}

function runInClan(clanId, func) {
  if (!hasWhitelistToCurrentClan() && getClanId() != clanId) {
    throw "Attempted to switch clans, but we don't have WL to our current clan!";
  }

  var switcher = new ClanSwitcher();

  try {
    var result = switcher.joinClan(clanId);

    if (!result) {
      return;
    }

    func();
  } finally {
    switcher.restoreClan();
  }
}

function getAvailableClans() {
  if (availableClans != null) {
    return availableClans;
  }

  var page = (0,external_kolmafia_namespaceObject.visitUrl)("clan_signup.php?place=managewhitelists");

  availableClans = new Map();
  var match;

  while (
  (match = page.match(
  /option +value=(\d+)>([^<>]*)<\/option>(?!.*name=whichclan>)/)) !=
  null)
  {
    page = page.replace(match[0], "");

    availableClans.set((0,external_kolmafia_namespaceObject.toInt)(match[1]), match[2]);
  }

  return availableClans;
}

function getFax(monster) {
  if (isVIPDisabled()) {
    throw "VIP was disabled, but function fax was still called";
  }

  var faxbot = "CheeseFax";

  if (!canAccessClan(getDefaultClan()) || !isOnline(faxbot)) {
    throw (
      "Cannot access fax machine, clan accessible? " +
      canAccessClan(getDefaultClan()) +
      ". CheeseFax online? " +
      isOnline(faxbot));

  }

  runInClan(getDefaultClan(), function () {
    if (!canUseFaxMachine()) {
      throw "Expected to be find fax machine in the clan " + getClanName();
    }

    print("Now trying to fax " + monster.name, "blue");

    var hasReceivedFax = function hasReceivedFax() {
      if (availableAmount(Item.get("photocopied monster")) == 0) {
        cliExecute("fax receive");
      }

      if (
      getProperty("photocopyMonster").toLowerCase() ==
      monster.name.toLowerCase())
      {
        return true;
      }

      cliExecute("fax send");
      return false;
    };

    if (!hasReceivedFax()) {
      for (var i = 0; i < 6; i++) {
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
      " is online you probably just missed the fax. Try running the script again.");

    }
  });
}

function runFireworks(request) {
  runInClan(getClanToUse(fireworks), function () {
    if (!canUseFireworks()) {
      throw "Expected to be find fireworks shop in the clan " + getClanName();
    }

    request();
  });
}

function doFortuneTeller() {
  if (isVIPDisabled() || !GreySettings.greyFortuneTeller) {
    return;
  }

  var consultsUsed = function consultsUsed() {return toInt(getProperty("_clanFortuneConsultUses"));};

  if (consultsUsed() >= 3) {
    return;
  }

  var bot = "CheeseFax";
  var fortuneClan = bonusAdvFromHell;

  if (!canAccessClan(fortuneClan)) {
    print("Oh dear, can't access the clan for Fortune Telling", "red");
    return;
  }

  if (getClanId() != fortuneClan && !hasWhitelistToCurrentClan()) {
    print(
    "Oh dear, we don't have whitelist to current clan. Skipping fortune telling",
    "red");

    return;
  }

  if (!isOnline(bot)) {
    print("Oh dear, can't do fortune teller as ".concat(bot, " is offline"));
    return;
  }

  print("Now performing hocus pocus with the Fortune Teller", "blue");

  runInClan(fortuneClan, function () {
    if (getClanLounge()[fortune.name] == null) {
      throw "Expected to be find fortune teller in the clan " + getClanName();
    }

    while (consultsUsed() < 3) {
      // We want the first result to be compatible
      // The second result is incompatible, as its worth more
      // The last result is compatible, as it has nicer equips

      var consultString =
      consultsUsed() == 1 ? "a b c" : "pizza batman thick";

      cliExecute("fortune " + bot + " " + consultString);

      if (consultsUsed() < 3) {
        waitq(3);
      }
    }
  });

  print("Done with fortune telling.", "blue");
}

function hasVIPInvitation() {
  return availableAmount(vipInvitation) > 0;
}

function canAccessClan(clanId) {
  if (clanId == null) {
    return false;
  }

  return (
    clanId == getClanId() ||
    hasWhitelistToCurrentClan() && getAvailableClans().has(clanId));

}

function hasWhitelistToCurrentClan() {
  return getClanId() < 0 || getAvailableClans().has(getClanId());
}

function canUseFireworks() {
  return hasVIPInvitation() && canUse(fireworks);
}

function canUseFortuneBuff() {
  return hasVIPInvitation() && canUse(fortune);
}

function useFortuneBuff(func) {
  runInClan(getClanToUse(fortune), func);
}

function canUseFaxMachine() {
  return (
    hasVIPInvitation() &&
    !isVIPDisabled() &&
    canUse(faxMachine) &&
    canAccessClan(getDefaultClan()) &&
    faxOnline);

}

function canUse(vipItem) {
  return getClanToUse(vipItem) != null;
}

function getClanToUse(vipItem) {
  if (getClanLounge()[vipItem.name] != null) {
    return getClanId();
  }

  if (canAccessClan(getDefaultClan()) && getDefaultClan() != getClanId()) {
    return getDefaultClan();
  }

  return null;
}

function isVIPDisabled() {
  return !hasVIPInvitation() || GreySettings.greyVIPClan.length == 0;
}
;// CONCATENATED MODULE: ./src/utils/GreySettings.ts
function _createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = GreySettings_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it["return"] != null) it["return"]();} finally {if (didErr) throw err;}} };}function GreySettings_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function GreySettings_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function GreySettings_createClass(Constructor, protoProps, staticProps) {if (protoProps) GreySettings_defineProperties(Constructor.prototype, protoProps);if (staticProps) GreySettings_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function GreySettings_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function GreySettings_toConsumableArray(arr) {return GreySettings_arrayWithoutHoles(arr) || GreySettings_iterableToArray(arr) || GreySettings_unsupportedIterableToArray(arr) || GreySettings_nonIterableSpread();}function GreySettings_nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function GreySettings_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return GreySettings_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return GreySettings_arrayLikeToArray(o, minLen);}function GreySettings_iterableToArray(iter) {if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);}function GreySettings_arrayWithoutHoles(arr) {if (Array.isArray(arr)) return GreySettings_arrayLikeToArray(arr);}function GreySettings_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}













function getGreySettings() {
  var isBoolean = function isBoolean(str) {return str == "true" || str == "false";};
  var triBoolean = ["Best Judgement", "Always", "Never"];
  var isTriBoolean = function isTriBoolean(str) {return (
      triBoolean.includes(str));};

  var towerBreak = {
    name: "greyBreakAtTower",
    description:
    "Should the script halt when it reaches the tower? False by default. Useful as continuing after breaking ronin takes less turns. This will change the behavior of the script to skip some zones.",
    valid: isBoolean,
    "default": true
  };

  var moonTune = {
    name: "greyTuneMoonSpoon",
    description:
    "If set, will use the rune moon spoon (if owned) to change moon signs to the requested moon sign when done with tasks in the current moon sign.",
    valid: function valid(value) {return (
        moonSigns.find(function (s) {return s.toLowerCase() == value.toLowerCase();}) != null);},
    viableSettings: [
    ["Don't Tune", ""]].concat(GreySettings_toConsumableArray(
    moonSigns.map(function (sign) {return [getMoonZone(sign) + " - " + sign, sign];}))),




    "default": null
  };

  var manorLights = {
    name: "greyFinishManorLights",
    description:
    "The script will do the hidden manor lights quest, but should it fight Elizabeth & Stephen at the end? (Garbo does fight Stephen for meat)",
    valid: isBoolean,
    "default": false
  };

  var pvpEnable = {
    name: "greyEnablePvP",
    description:
    "Should the script enable PvP at the start of the run? This doesn't actually make much difference vs enabling it later as there's no pvp generation, unless you have robortender.",
    valid: isBoolean,
    "default": false
  };

  for (var _i = 0, _arr = ["greyDailyMalware"]; _i < _arr.length; _i++) {var str = _arr[_i];
    if (!(0,external_kolmafia_namespaceObject.propertyExists)(str)) {
      continue;
    }

    var val = (0,external_kolmafia_namespaceObject.getProperty)(str);

    if (triBoolean.includes(val)) {
      continue;
    }

    if (val == "true") {
      (0,external_kolmafia_namespaceObject.setProperty)(str, "Always");
    } else if (val == "false") {
      (0,external_kolmafia_namespaceObject.setProperty)(str, "Never");
    } else {
      (0,external_kolmafia_namespaceObject.setProperty)(str, "Best Judgement");
    }
  }

  var dailyMalware = {
    name: "greyDailyMalware",
    description:
    "If we do daily dungeon, how should we treat daily malware? Set to 'Always' 'Never' or 'Best Judgement'",
    valid: isTriBoolean,
    viableSettings: triBoolean,
    "default": "Best Judgement"
  };

  var dailyDungeon = {
    name: "greyDailyDungeon",
    description:
    "Should the script always do daily dungeon, even when there is no need to? Eg, tower break. Useful in conjunction with greyDailyMalware",
    valid: isBoolean,
    "default": true
  };

  var levelingResources = {
    name: "greyPrepareLevelingResources",
    description:
    "If this is set to true, script will attempt to prepare resources that are useful for power leveling. Namely familiar scrapbook and raise goose weight.",
    valid: isBoolean,
    "default": true
  };

  var skipPalindome = {
    name: "greySkipPalindome",
    description:
    "If set to true, will not complete palindome. This is only useful if you intend to burn turns on UR farming, and you're recommended to save at least 80 turns minumum to resume the script. To resume, this will need to be set to false.",
    valid: isBoolean,
    "default": false
  };

  var doHellQuest = {
    name: "greyAzazelSteelMargarita",
    description:
    "If set to true, will complete the requirements for the Steel Margarita +5 Liver drink. There is different scenarios for this, but this is best used with towerbreaking and ronin escaping. It will attempt to use the no-trades previously acquired.",
    valid: isBoolean,
    "default": false
  };

  var deleteKmails = {
    name: "greyDeleteKmails",
    description:
    "When true, will delete kmails from spooky lady and fortune teller",
    valid: isBoolean,
    "default": true
  };

  var useMummery = {
    name: "greyUseMummery",
    description:
    "If set to true, will set grey goose to use MP restoring. This is enabled by default as there isn't really a reason not to.",
    valid: isBoolean,
    "default": true,
    viable: (0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("mumming trunk")) > 0
  };

  var defaultAdvValue =
  Math.round((0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("valueOfAdventure")) * 0.7 / 100) * 100;

  var grayAdventureValue = {
    name: "greyValueOfAdventure",
    description:
    "Used to determine how to prioritize resources, a fax for example is worth 20k. If it saves 3 turns and each turn is worth 10k, then it's obviously worth using the fax to save those 3 turns. Default value is based off roughly 70% of pref valueOfAdventure.",
    valid: function valid(value) {return /\d+/.test(value);},
    "default": defaultAdvValue
  };

  var greyPullValue = {
    name: "greyValueOfPull",
    description:
    "Used to determine the value of a pull from storage, generally can be ignored.",
    valid: function valid(value) {return /\d+/.test(value);},
    "default": 0
  };

  var greySavePulls = {
    name: "greyPullsLimit",
    description:
    "How many pulls the script can use, if this is too low then you're going to have a bad time. 20 means the script can use up to 20 pulls, leaving 0 remaining.",
    valid: function valid(value) {return /\d+/.test(value);},
    "default": 20
  };

  var greyVoteMonster = {
    name: "greyVotingBooth",
    description:
    "If you own the voting booth, by default will not vote as aftercore voting can be better",
    valid: isBoolean,
    "default": false
  };

  var greySwitchWorkshed = {
    name: "greySwitchWorkshed",
    description:
    "Applicable only for CMC, if set to the name of a workshed item, will switch to that workshed after all 5 CMC uses are expended. Requires the item to be in inventory",
    valid: function valid(value) {
      return value == "" || (0,external_kolmafia_namespaceObject.toItem)(value).usable;
    },
    "default": ""
  };

  var greyValueOfNC = {
    name: "greyValueOfNonCombat",
    description:
    "Really only applicable for people that do garbo's Yachtzee, set this to an absurd value to never use it",
    valid: function valid(value) {return /\d+/.test(value);},
    "default": 0
  };

  var greyClipArt = {
    name: "greyClipArt",
    description:
    "A comma seperated list of familiar names you'd like Greyday to summon and use Familiar Jacks on if you have Tome of Clip Art",
    valid: function valid(value) {
      return (
        value.
        split(",").
        find(
        function (s) {return (
            s.length != 0 &&
            external_kolmafia_namespaceObject.Familiar.all().find(
            function (f) {return f.toString().toLowerCase() == s.toLowerCase();}) ==
            null);}) ==
        null);

    },
    "default": "Grey Goose"
  };

  var greyVIPClan = {
    name: "greyVIPClan",
    description:
    "The name of the clan we will use to execute Fax Requests, and switch to for other VIP functions if they are not available in our current clan. Set to empty to disable all VIP usage, even the yellow rockets..",
    valid: function valid(value) {return (
        value.length == 0 ||
        GreySettings_toConsumableArray(getAvailableClans().values()).find(
        function (s) {return s.toLowerCase() == value.toLowerCase();}) !=
        null);},
    "default": "Bonus Adventures From Hell"
  };

  var greyFortuneTeller = {
    name: "greyFortuneTeller",
    description:
    "If the script should use fortune teller if possible. Will grab: Prank Item, then Potion, then Psychic Equipment",
    valid: isBoolean,
    "default": true
  };

  var greyGrabZapWand = {
    name: "greyGrabZapWand",
    description:
    "Should the script grab the zap wand? This generally adds another 5-6 turns to the run",
    valid: isBoolean,
    "default": false
  };

  return [
  //greyBountyHunter,
  towerBreak,
  manorLights,
  pvpEnable,
  dailyDungeon,
  levelingResources,
  deleteKmails,
  greyFortuneTeller,
  greyGrabZapWand,
  skipPalindome,
  useMummery,
  moonTune,
  dailyMalware,
  greySavePulls,
  grayAdventureValue,
  greyValueOfNC,
  greyPullValue,
  greySwitchWorkshed,
  greyClipArt,
  greyVIPClan];

}

var moonSigns = [
"Mongoose",
"Wallaby",
"Vole",
"Platypus",
"Opossum",
"Marmot",
"Wombat",
"Blender",
"Packrat"];















function getMoonZone() {var sign = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,external_kolmafia_namespaceObject.mySign)();
  var index = moonSigns.findIndex(
  function (s) {return s.toLowerCase() == (sign === null || sign === void 0 ? void 0 : sign.toLowerCase());});


  if (index < 0) {
    return null;
  } else if (index <= 2) {
    return "Knoll";
  } else if (index <= 5) {
    return "Canadia";
  }

  return "Gnomad";
}

var spoon = external_kolmafia_namespaceObject.Item.get("hewn moon-rune spoon");

var GreySettings_GreySettings = /*#__PURE__*/function () {function GreySettings() {GreySettings_classCallCheck(this, GreySettings);}GreySettings_createClass(GreySettings, null, [{ key: "isHardcoreMode", value:






























    function isHardcoreMode() {
      return this.hardcoreMode || (0,external_kolmafia_namespaceObject.inHardcore)();
    } }, { key: "willBeAccessible", value:

    function willBeAccessible(
    moonzone)

    {var assumeUnstarted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return (
        (assumeUnstarted || (0,external_kolmafia_namespaceObject.getProperty)("moonTuned") != "true") &&
        (0,external_kolmafia_namespaceObject.availableAmount)(spoon) > 0 &&
        this.greyTuneMoonSpoon != null &&
        getMoonZone(this.greyTuneMoonSpoon) == moonzone);

    } }, { key: "canMoonSpoon", value:

    function canMoonSpoon() {
      return (
        (0,external_kolmafia_namespaceObject.getProperty)("moonTuned") == "false" &&
        (0,external_kolmafia_namespaceObject.availableAmount)(spoon) > 0 &&
        this.greyTuneMoonSpoon != null &&
        this.greyTuneMoonSpoon.toLowerCase() != (0,external_kolmafia_namespaceObject.mySign)().toLowerCase());

    }

    /**
     * If we aim to collect a hippy outfit
     */ }, { key: "isHippyMode", value:
    function isHippyMode() {
      return this.greyHippyMode || this.isHardcoreMode();
    } }, { key: "shouldAvoidTowerRequirements", value:

    function shouldAvoidTowerRequirements() {
      return !GreySettings.isHardcoreMode() && this.greyBreakAtTower;
    } }, { key: "loadSettings", value:

    function loadSettings() {var _iterator = _createForOfIteratorHelper(
        getGreySettings()),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var setting = _step.value;
          var prop = (0,external_kolmafia_namespaceObject.getProperty)(setting.name);

          if (prop == "") {
            prop = setting["default"];
          } else if (typeof setting["default"] == "boolean") {
            prop = (0,external_kolmafia_namespaceObject.toBoolean)(prop);
          } else if (typeof setting["default"] == "number") {
            prop = (0,external_kolmafia_namespaceObject.toInt)(prop);
          }
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
    } }]);return GreySettings;}();GreySettings_defineProperty(GreySettings_GreySettings, "hardcoreMode", false);GreySettings_defineProperty(GreySettings_GreySettings, "speedRunMode", false);GreySettings_defineProperty(GreySettings_GreySettings, "adventuresBeforeAbort", 8);GreySettings_defineProperty(GreySettings_GreySettings, "adventuresGenerateIfPossibleOrAbort", 12);GreySettings_defineProperty(GreySettings_GreySettings, "usefulSkillsWeight", 6);GreySettings_defineProperty(GreySettings_GreySettings, "handySkillsWeight", 0.5);GreySettings_defineProperty(GreySettings_GreySettings, "greyBreakAtTower", void 0);GreySettings_defineProperty(GreySettings_GreySettings, "greyReachedTower", (0,external_kolmafia_namespaceObject.toBoolean)((0,external_kolmafia_namespaceObject.getProperty)("_greyReachedTower")));GreySettings_defineProperty(GreySettings_GreySettings, "greyDailyDungeon", void 0);GreySettings_defineProperty(GreySettings_GreySettings, "greyDailyMalware", void 0);GreySettings_defineProperty(GreySettings_GreySettings, "greyPrepareLevelingResources", void 0);GreySettings_defineProperty(GreySettings_GreySettings, "greyFantasyBandits", void 0);GreySettings_defineProperty(GreySettings_GreySettings, "greyTuneMoonSpoon", void 0);GreySettings_defineProperty(GreySettings_GreySettings, "greyDebug", (0,external_kolmafia_namespaceObject.toBoolean)((0,external_kolmafia_namespaceObject.getProperty)("greyDebug") || "false"));GreySettings_defineProperty(GreySettings_GreySettings, "greySkipPalindome", void 0);GreySettings_defineProperty(GreySettings_GreySettings, "greyPullsLimit", 20);GreySettings_defineProperty(GreySettings_GreySettings, "greyValueOfAdventure", void 0);GreySettings_defineProperty(GreySettings_GreySettings, "greyUseMummery", void 0);GreySettings_defineProperty(GreySettings_GreySettings, "greyVotingBooth", void 0);GreySettings_defineProperty(GreySettings_GreySettings, "greyBountyHunting", void 0);GreySettings_defineProperty(GreySettings_GreySettings, "greySwitchWorkshed", void 0);GreySettings_defineProperty(GreySettings_GreySettings, "greyClipArt", void 0);GreySettings_defineProperty(GreySettings_GreySettings, "greyVIPClan", void 0);GreySettings_defineProperty(GreySettings_GreySettings, "greyFortuneTeller", void 0);GreySettings_defineProperty(GreySettings_GreySettings, "greyDeleteKmails", void 0);GreySettings_defineProperty(GreySettings_GreySettings, "greyHippyMode", false);GreySettings_defineProperty(GreySettings_GreySettings, "greyGrabZapWand", void 0);
;// CONCATENATED MODULE: ./src/relay/relay_greyday.ts
function _typeof(obj) {"@babel/helpers - typeof";return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {return typeof obj;} : function (obj) {return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}, _typeof(obj);}function relay_greyday_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = relay_greyday_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it["return"] != null) it["return"]();} finally {if (didErr) throw err;}} };}function relay_greyday_toConsumableArray(arr) {return relay_greyday_arrayWithoutHoles(arr) || relay_greyday_iterableToArray(arr) || relay_greyday_unsupportedIterableToArray(arr) || relay_greyday_nonIterableSpread();}function relay_greyday_nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function relay_greyday_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return relay_greyday_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return relay_greyday_arrayLikeToArray(o, minLen);}function relay_greyday_iterableToArray(iter) {if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);}function relay_greyday_arrayWithoutHoles(arr) {if (Array.isArray(arr)) return relay_greyday_arrayLikeToArray(arr);}function relay_greyday_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}












function main() {
  var notifications = [];
  // handle updating values
  var fields = (0,external_kolmafia_namespaceObject.formFields)();

  Object.keys(fields).forEach(function (field) {
    if (field === "relay") {
      return;
    }

    if (field === "notifications") {
      notifications.push.apply(notifications, relay_greyday_toConsumableArray(JSON.parse(fields[field])));
      return;
    }

    if ((0,external_kolmafia_namespaceObject.getProperty)(field).toString() !== fields[field]) {
      notifications.push("".concat(field, " changed to ").concat(fields[field]));

      (0,external_kolmafia_namespaceObject.setProperty)(field, fields[field]);
    }
  });

  var settings = [];

  // load user perferences into json object to pass to react
  var _iterator = relay_greyday_createForOfIteratorHelper(getGreySettings()),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var setting = _step.value;
      var dropdowns = void 0;

      if (setting.viableSettings != null) {
        if (typeof setting.viableSettings[0] == "string") {
          dropdowns = setting.viableSettings = setting.viableSettings.map(function (s) {return [
            s,
            s];});

        } else {
          dropdowns = setting.viableSettings;
        }
      }

      var prop = {
        name: setting.name,
        description: setting.description,
        "default": setting["default"] == null ? "" : setting["default"].toString(),
        value: (0,external_kolmafia_namespaceObject.getProperty)(setting.name),
        dropdown: dropdowns,
        viable: setting.viable != false,
        type: _typeof(setting["default"])
      };

      if (!(0,external_kolmafia_namespaceObject.propertyExists)(prop.name) || !setting.valid(prop.value)) {
        prop.value = setting["default"] + "";
      }

      settings.push(prop);
    }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

  (0,external_kolmafia_namespaceObject.writeln)('<head><link rel="stylesheet" href="/greyday/main.css"></head>');
  (0,external_kolmafia_namespaceObject.writeln)('<div id="root"></div>');

  (0,external_kolmafia_namespaceObject.writeln)("<script>");

  // add script that react calls when loaded to get kol data
  (0,external_kolmafia_namespaceObject.writeln)("let getData = function(callback) {callback(".concat(
  JSON.stringify({
    settings: settings,
    notifications: notifications
  }), ")}"));


  // close notifications when they are clicked on
  (0,external_kolmafia_namespaceObject.writeln)("document.onclick = (e) => {\n    if(e.target.classList.contains('notification')) e.target.remove();\n  }");



  (0,external_kolmafia_namespaceObject.writeln)("</script>");

  // include react scripts
  (0,external_kolmafia_namespaceObject.writeln)('<script src="./greyday/greyday_relay.js"></script>');
}
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;