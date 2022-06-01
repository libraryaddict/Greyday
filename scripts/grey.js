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
  "main": () => (/* binding */ GreyYouMain_main)
});

;// CONCATENATED MODULE: external "kolmafia"
const external_kolmafia_namespaceObject = require("kolmafia");
;// CONCATENATED MODULE: external "canadv.ash"
const external_canadv_ash_namespaceObject = require("canadv.ash");
;// CONCATENATED MODULE: ./src/quests/Quests.ts



















var QuestStatus;(function (QuestStatus) {QuestStatus[QuestStatus["READY"] = 0] = "READY";QuestStatus[QuestStatus["FASTER_LATER"] = 1] = "FASTER_LATER";QuestStatus[QuestStatus["NOT_READY"] = 2] = "NOT_READY";QuestStatus[QuestStatus["COMPLETED"] = 3] = "COMPLETED";})(QuestStatus || (QuestStatus = {}));






var DelayType;(function (DelayType) {DelayType[DelayType["TURN_BURNING"] = 0] = "TURN_BURNING";DelayType[DelayType["NONCOMBAT_HITTING"] = 1] = "NONCOMBAT_HITTING";})(DelayType || (DelayType = {}));













var OutfitImportance;(function (OutfitImportance) {OutfitImportance[OutfitImportance["REQUIRED"] = 0] = "REQUIRED";OutfitImportance[OutfitImportance["VERY_HELPFUL"] = 1] = "VERY_HELPFUL";OutfitImportance[OutfitImportance["HELPS"] = 2] = "HELPS";})(OutfitImportance || (OutfitImportance = {}));





function getQuestStatus(property) {
  var status = (0,external_kolmafia_namespaceObject.getProperty)(property);

  if (status == "unstarted") {
    return -1;
  } else if (status == "started") {
    return 0;
  } else if (status == "finished") {
    return 100;
  } else if (status.match(/^step\d+$/)) {
    return (0,external_kolmafia_namespaceObject.toInt)(status.replace("step", ""));
  } else {
    throw (
      "Cannot parse property '" +
      property +
      "' value '" +
      status +
      "' to an int");

  }
}
;// CONCATENATED MODULE: ./src/utils/Banishers.ts
function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function hasBanished(location, banish) {
  var banished = getBanished().filter((b) => b.banisher.type == banish);

  if (banish.length == 0) {
    return false;
  }

  if (location == null) {
    return true;
  }var _iterator = _createForOfIteratorHelper(

  Object.keys((0,external_kolmafia_namespaceObject.getLocationMonsters)(location)).map((m) =>
  external_kolmafia_namespaceObject.Monster.get(m))),_step;try {var _loop = function _loop() {var mob = _step.value;

      if (banished.filter((b) => b.monster == mob).length == 0) {
        return "continue";
      }

      return { v: true };};for (_iterator.s(); !(_step = _iterator.n()).done;) {var _ret = _loop();if (_ret === "continue") continue;if (typeof _ret === "object") return _ret.v;
    }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

  return false;
}

var BanishReason;(function (BanishReason) {BanishReason[BanishReason["QUEST"] = 0] = "QUEST";BanishReason[BanishReason["REASBORB"] = 1] = "REASBORB";BanishReason[BanishReason["UNKNOWN"] = 2] = "UNKNOWN";})(BanishReason || (BanishReason = {}));





var BanishType;(function (BanishType) {BanishType["BALEFUL_HOWL"] = "baleful howl";BanishType["BANISHING_SHOUT"] = "banishing shout";BanishType["BATTER_UP"] = "batter up!";BanishType["BEANCANNON"] = "beancannon";BanishType["BE_A_MIND_MASTER"] = "Be a Mind Master";BanishType["BLART_SPRAY_WIDE"] = "B. L. A. R. T. Spray (wide)";BanishType["BOWL_A_CURVEBALL"] = "Bowl a Curveball";BanishType["BREATHE_OUT"] = "breathe out";BanishType["BUNDLE_OF_FRAGRANT_HERBS"] = "bundle of &quot;fragrant&quot; herbs";BanishType["CHATTERBOXING"] = "chatterboxing";BanishType["CLASSY_MONKEY"] = "classy monkey";BanishType["COCKTAIL_NAPKIN"] = "cocktail napkin";BanishType["CRYSTAL_SKULL"] = "crystal skull";BanishType["CURSE_OF_VACATION"] = "curse of vacation";BanishType["DEATHCHUCKS"] = "deathchucks";BanishType["DIRTY_STINKBOMB"] = "dirty stinkbomb";BanishType["DIVINE_CHAMPAGNE_POPPER"] = "divine champagne popper";BanishType["FEEL_HATRED"] = "Feel Hatred";BanishType["GINGERBREAD_RESTRAINING_ORDER"] = "gingerbread restraining order";BanishType["HAROLDS_BELL"] = "harold's bell";BanishType["HOWL_OF_THE_ALPHA"] = "howl of the alpha";BanishType["HUMAN_MUSK"] = "human musk";BanishType["ICE_HOTEL_BELL"] = "ice hotel bell";BanishType["ICE_HOUSE"] = "ice house";BanishType["KGB_TRANQUILIZER_DART"] = "KGB tranquilizer dart";BanishType["LICORICE_ROPE"] = "licorice rope";BanishType["LOUDER_THAN_BOMB"] = "louder than bomb";BanishType["MAFIA_MIDDLEFINGER_RING"] = "mafia middle finger ring";BanishType["NANORHINO"] = "nanorhino";BanishType["PANTSGIVING"] = "pantsgiving";BanishType["PEEL_OUT"] = "peel out";BanishType["PULLED_INDIGO_TAFFY"] = "pulled indigo taffy";BanishType["REFLEX_HAMMER"] = "Reflex Hammer";BanishType["SABER_FORCE"] = "Saber Force";BanishType["SHOW_YOUR_BORING_FAMILIAR_PICTURES"] = "Show your boring familiar pictures";BanishType["SMOKE_GRENADE"] = "smoke grenade";BanishType["SNOKEBOMB"] = "snokebomb";BanishType["SPOOKY_MUSIC_BOX_MECHANISM"] = "spooky music box mechanism";BanishType["SPRING_LOADED_FRONT_BUMPER"] = "Spring-Loaded Front Bumper";BanishType["STAFF_OF_THE_STANDALONE_CHEESE"] = "staff of the standalone cheese";BanishType["STINKY_CHEESE_EYE"] = "stinky cheese eye";BanishType["SYSTEM_SWEEP"] = "System Sweep";BanishType["TENNIS_BALL"] = "tennis ball";BanishType["THROW_LATTE_ON_OPPONENT"] = "Throw Latte on Opponent";BanishType["THUNDER_CLAP"] = "thunder clap";BanishType["TRYPTOPHAN_DART"] = "tryptophan dart";BanishType["ULTRA_HAMMER"] = "Ultra Hammer";BanishType["V_FOR_VIVALA_MASK"] = "v for vivala mask";BanishType["WALK_AWAY_FROM_EXPLOSION"] = "walk away from explosion";})(BanishType || (BanishType = {}));var



















































Banisher = /*#__PURE__*/_createClass(function Banisher() {_classCallCheck(this, Banisher);_defineProperty(this, "item", void 0);_defineProperty(this, "turnsBanish", void 0);_defineProperty(this, "type", void 0);});





var Banish = /*#__PURE__*/_createClass(function Banish() {_classCallCheck(this, Banish);_defineProperty(this, "monster", void 0);_defineProperty(this, "turnBanished", void 0);_defineProperty(this, "banisher", void 0);_defineProperty(this, "reason", void 0);});












function getBanished() {
  var prop = (0,external_kolmafia_namespaceObject.getProperty)("banishedMonsters").split(":");
  var banishes = [];
  var banishers = getBanishers();var _loop2 = function _loop2(

  i) {
    var monsterName = (0,external_kolmafia_namespaceObject.toMonster)(prop[i]);
    var banisherName = prop[i + 1];
    var turnBanished = (0,external_kolmafia_namespaceObject.toInt)(prop[i + 2]);

    var banisher = new Banish();
    banisher.monster = monsterName;
    var banishType =
    BanishType[getEnumKeyByEnumValue(BanishType, banisherName)];
    banisher.banisher = banishers.find((b) => b.type == banishType);
    banisher.turnBanished = turnBanished;

    if (banisher.banisher == null) {
      banisher.banisher = new Banisher();
      banisher.banisher.type = banishType;
    }

    banishes.push(banisher);};for (var i = 0; i + 2 < prop.length; i += 3) {_loop2(i);
  }

  return banishes;
}

function getEnumKeyByEnumValue(myEnum, enumValue) {
  var keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue);

  return keys.length > 0 ? keys[0] : null;
}

var BanishManager = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {function BanishManager() {_classCallCheck(this, BanishManager);}_createClass(BanishManager, [{ key: "getGoodBanishers", value:
    function getGoodBanishers(
    location)

    {var turnsSpendingInZone = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : myAdventures();
      var banishers = getBanishers().filter(
      (b) => !this.isInUse(b, location));


      if (
      choiceFollowsFight() ||
      currentRound() != 0 ||
      fightFollowsChoice() ||
      handlingChoice() ||
      !canInteract())
      {
        banishers = banishers.filter((b) => availableAmount(b.item) > 0);
      }

      banishers.sort((b1, b2) => {
        return (
          this.getTotalCost(b1, turnsSpendingInZone) -
          this.getTotalCost(b2, turnsSpendingInZone));

      });

      return banishers;
    } }, { key: "getTotalCost", value:

    function getTotalCost(banisher, turnsToSpend) {
      var cost = mallPrice(banisher.item);

      if (banisher.turnsBanish == -1) {
        return cost;
      }

      var itemsToBuy = Math.ceil(turnsToSpend / banisher.turnsBanish);

      return cost * itemsToBuy;
    } }, { key: "getMonsterLocations", value:

    function getMonsterLocations(monster) {
      var locations = [];var _iterator2 = _createForOfIteratorHelper(

      Location.all()),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var location = _step2.value;
          var monsters = this.getMonstersAtLocation(location);

          if (!monsters.includes(monster)) {
            continue;
          }

          locations.push(location);
        }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}

      return locations;
    } }, { key: "getMonstersAtLocation", value:

    function getMonstersAtLocation(location) {
      return Object.keys(getLocationMonsters(location)).map((s) => toMonster(s));
    } }, { key: "isInUse", value:

    function isInUse(banisher, location) {
      return (
        getBanished().find(
        (b) =>
        b.banisher.type == banisher.type &&
        this.getMonsterLocations(b.monster).includes(location)) !=
        null);

    } }]);return BanishManager;}()));


function getBanishers() {
  var banishers = [
  [BanishType.HUMAN_MUSK, "Human Musk", -1],
  [BanishType.BE_A_MIND_MASTER, "Daily Affirmation: Be a Mind Master", 80],
  [BanishType.TENNIS_BALL, "Tennis Ball", 30],
  [BanishType.LOUDER_THAN_BOMB, "Louder Than Bomb", 20],
  [BanishType.CRYSTAL_SKULL, "Crystal Skull", 20],
  [BanishType.DIVINE_CHAMPAGNE_POPPER, "Divine Champagne Popper", 5],
  [BanishType.ICE_HOUSE, "Ice House", -1]];


  return banishers.map((b) => {
    var banish = new Banisher();
    banish.item = (0,external_kolmafia_namespaceObject.toItem)(b[1]);
    banish.turnsBanish = b[2];
    banish.type = b[0];

    return banish;
  });
}
;// CONCATENATED MODULE: ./src/utils/GreySettings.ts
function GreySettings_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function GreySettings_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function GreySettings_createClass(Constructor, protoProps, staticProps) {if (protoProps) GreySettings_defineProperties(Constructor.prototype, protoProps);if (staticProps) GreySettings_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function GreySettings_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var GreySettings = /*#__PURE__*/function () {function GreySettings() {GreySettings_classCallCheck(this, GreySettings);}GreySettings_createClass(GreySettings, null, [{ key: "isHardcoreMode", value:







    function isHardcoreMode() {
      return this.hardcoreMode || (0,external_kolmafia_namespaceObject.inHardcore)();
    }

    /**
     * If we aim to collect a hippy outfit
     */ }, { key: "isHippyMode", value:
    function isHippyMode() {
      return this.isHardcoreMode();
    } }]);return GreySettings;}();GreySettings_defineProperty(GreySettings, "hardcoreMode", false);GreySettings_defineProperty(GreySettings, "speedRunMode", false);GreySettings_defineProperty(GreySettings, "adventuresBeforeAbort", 8);GreySettings_defineProperty(GreySettings, "adventuresGenerateIfPossibleOrAbort", 12);GreySettings_defineProperty(GreySettings, "usefulSkillsWeight", 6);GreySettings_defineProperty(GreySettings, "handySkillsWeight", 0.5);
;// CONCATENATED MODULE: ./src/utils/MacroBuilder.ts
function _get() {if (typeof Reflect !== "undefined" && Reflect.get) {_get = Reflect.get.bind();} else {_get = function _get(target, property, receiver) {var base = _superPropBase(target, property);if (!base) return;var desc = Object.getOwnPropertyDescriptor(base, property);if (desc.get) {return desc.get.call(arguments.length < 3 ? target : receiver);}return desc.value;};}return _get.apply(this, arguments);}function _superPropBase(object, property) {while (!Object.prototype.hasOwnProperty.call(object, property)) {object = _getPrototypeOf(object);if (object === null) break;}return object;}function MacroBuilder_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = MacroBuilder_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || MacroBuilder_unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function MacroBuilder_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return MacroBuilder_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return MacroBuilder_arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return MacroBuilder_arrayLikeToArray(arr);}function MacroBuilder_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function MacroBuilder_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function MacroBuilder_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function MacroBuilder_createClass(Constructor, protoProps, staticProps) {if (protoProps) MacroBuilder_defineProperties(Constructor.prototype, protoProps);if (staticProps) MacroBuilder_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function MacroBuilder_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct.bind();} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}

var MACRO_NAME = "Script Autoattack Macro";
/**
 * Get the KoL native ID of the macro with name name.
 *
 * @category Combat
 * @returns {number} The macro ID.
 */
function getMacroId() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : MACRO_NAME;
  var macroMatches = (0,external_kolmafia_namespaceObject.xpath)(
  (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php"), "//select[@name=\"macroid\"]/option[text()=\"".concat(
  name, "\"]/@value"));

  if (macroMatches.length === 0) {
    (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?action=new");
    var newMacroText = (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?macroid=0&name=".concat(
    name, "&macrotext=abort&action=save"));

    return parseInt(
    (0,external_kolmafia_namespaceObject.xpath)(newMacroText, "//input[@name=macroid]/@value")[0],
    10);

  } else {
    return parseInt(macroMatches[0], 10);
  }
}


function itemOrNameToItem(itemOrName) {
  return typeof itemOrName === "string" ? external_kolmafia_namespaceObject.Item.get(itemOrName) : itemOrName;
}

var substringCombatItems =
"spider web, really sticky spider web, dictionary, NG, Cloaca-Cola, yo-yo, top, ball, kite, yo, red potion, blue potion, adder, red button, pile of sand, mushroom, deluxe mushroom".
split(",").
map((s) => (0,external_kolmafia_namespaceObject.toItem)(s));
var substringCombatSkills =
"Shoot, Thrust-Smack, Headbutt, Toss, Sing, Disarm, LIGHT, BURN, Extract, Meteor Shower, Cleave, Boil, Slice, Rainbow".
split(",").
map((s) => (0,external_kolmafia_namespaceObject.toSkill)(s));

function itemOrItemsBallsMacroName(
itemOrItems)
{
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroName).join(", ");
  } else {
    var item = itemOrNameToItem(itemOrItems);
    return !substringCombatItems.includes(item) ?
    item.name :
    (0,external_kolmafia_namespaceObject.toInt)(item).toString();
  }
}

function itemOrItemsBallsMacroPredicate(
itemOrItems)
{
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroPredicate).join(" && ");
  } else {
    return "hascombatitem ".concat(itemOrItems);
  }
}


function skillOrNameToSkill(skillOrName) {
  if (typeof skillOrName === "string") {
    return external_kolmafia_namespaceObject.Skill.get(skillOrName);
  } else {
    return skillOrName;
  }
}

function skillBallsMacroName(skillOrName) {
  var skill = skillOrNameToSkill(skillOrName);
  return skill.name.match(/^[A-Za-z ]+$/) &&
  !substringCombatSkills.includes(skill) ?
  skill.name :
  (0,external_kolmafia_namespaceObject.toInt)(skill);
}



var InvalidMacroError = /*#__PURE__*/function (_Error) {_inherits(InvalidMacroError, _Error);var _super = _createSuper(InvalidMacroError);function InvalidMacroError() {MacroBuilder_classCallCheck(this, InvalidMacroError);return _super.apply(this, arguments);}return MacroBuilder_createClass(InvalidMacroError);}( /*#__PURE__*/_wrapNativeSuper(Error));

/**
 * BALLS macro builder for direct submission to KoL.
 * Create a new macro with `new Macro()` and add steps using the instance methods.
 * Uses a fluent interface, so each step returns the object for easy chaining of steps.
 * Each method is also defined as a static method that creates a new Macro with only that step.
 * For example, you can do `Macro.skill('Saucestorm').attack()`.
 */
var Macro = /*#__PURE__*/function () {function Macro() {MacroBuilder_classCallCheck(this, Macro);MacroBuilder_defineProperty(this, "components",





    []);MacroBuilder_defineProperty(this, "name",
    MACRO_NAME);}MacroBuilder_createClass(Macro, [{ key: "toString", value:

    /**
     * Convert macro to string.
     */
    function toString() {
      return this.components.join(";");
    }

    /**
     * Gives your macro a new name to be used when saving an autoattack.
     * @param name The name to be used when saving as an autoattack.
     * @returns The previous name assigned to this macro.
     */ }, { key: "rename", value:
    function rename(name) {
      var returnValue = this.name;
      this.name = name;
      return returnValue;
    }

    /**
     * Save a macro to a Mafia property for use in a consult script.
     */ }, { key: "save", value:
    function save() {
      (0,external_kolmafia_namespaceObject.setProperty)(Macro.SAVED_MACRO_PROPERTY, this.toString());
    }

    /**
     * Load a saved macro from the Mafia property.
     */ }, { key: "step", value:













    /**
     * Statefully add one or several steps to a macro.
     * @param nextSteps The steps to add to the macro.
     * @returns {Macro} This object itself.
     */
    function step() {var _ref;for (var _len = arguments.length, nextSteps = new Array(_len), _key = 0; _key < _len; _key++) {nextSteps[_key] = arguments[_key];}
      var nextStepsStrings = (_ref = []).concat.apply(_ref, _toConsumableArray(
      nextSteps.map((x) => x instanceof Macro ? x.components : [x])));

      this.components = [].concat(_toConsumableArray(
      this.components), _toConsumableArray(
      nextStepsStrings.filter((s) => s.length > 0)));

      return this;
    }

    /**
     * Statefully add one or several steps to a macro.
     * @param nextSteps The steps to add to the macro.
     * @returns {Macro} This object itself.
     */ }, { key: "submit", value:







    /**
     * Submit the built macro to KoL. Only works inside combat.
     */
    function submit() {
      var final = this.toString();
      return (0,external_kolmafia_namespaceObject.visitUrl)("fight.php?action=macro&macrotext=".concat(
      (0,external_kolmafia_namespaceObject.urlEncode)(final)),
      true,
      true);

    }

    /**
     * Set this macro as a KoL native autoattack.
     */ }, { key: "setAutoAttack", value:
    function setAutoAttack() {
      var id = Macro.cachedMacroIds.get(this.name);
      if (id === undefined) {
        id = getMacroId(this.name);
        Macro.cachedMacroIds.set(this.name, id);
      }
      if (
      (0,external_kolmafia_namespaceObject.getAutoAttack)() === 99000000 + id &&
      this.toString() === Macro.cachedAutoAttacks.get(this.name))
      {
        // This macro is already set. Don"t make the server request.
        return;
      }

      (0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?macroid=".concat(
      id, "&name=").concat((0,external_kolmafia_namespaceObject.urlEncode)(
      this.name), "&macrotext=").concat(
      (0,external_kolmafia_namespaceObject.urlEncode)(this.toString()), "&action=save"),
      true,
      true);

      (0,external_kolmafia_namespaceObject.visitUrl)("account.php?am=1&action=autoattack&value=".concat(
      99000000 + id, "&ajax=1"));

      Macro.cachedAutoAttacks.set(this.name, this.toString());
    }

    /**
     * Renames the macro, then sets it as an autoattack.
     * @param name The name to save the macro under as an autoattack.
     */ }, { key: "setAutoAttackAs", value:
    function setAutoAttackAs(name) {
      this.name = name;
      this.setAutoAttack();
    }

    /**
     * Clear all cached autoattacks, and delete all stored macros server-side.
     */ }, { key: "abort", value:










    /**
     * Add an "abort" step to this macro.
     * @returns {Macro} This object itself.
     */
    function abort() {
      return this.step("abort");
    }

    /**
     * Create a new macro with an "abort" step.
     * @returns {Macro} This object itself.
     */ }, { key: "runaway", value:




    /**
     * Add a "runaway" step to this macro.
     * @returns {Macro} This object itself.
     */
    function runaway() {
      return this.step("runaway");
    }

    /**
     * Create a new macro with an "runaway" step.
     * @returns {Macro} This object itself.
     */ }, { key: "if_", value:




    /**
     * Add an "if" statement to this macro.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */
    function if_(
    condition,








    ifTrue,
    doFalse)
    {
      var ballsCondition = "";
      if (condition instanceof external_kolmafia_namespaceObject.Monster) {
        ballsCondition = "monsterid ".concat(condition.id);
      } else if (condition instanceof external_kolmafia_namespaceObject.Effect) {
        ballsCondition = "haseffect ".concat((0,external_kolmafia_namespaceObject.toInt)(condition));
      } else if (condition instanceof external_kolmafia_namespaceObject.Skill) {
        ballsCondition = "hasskill ".concat(skillBallsMacroName(condition));
      } else if (condition instanceof external_kolmafia_namespaceObject.Item) {
        if (!condition.combat) {
          throw new InvalidMacroError("Item ".concat(
          condition, " cannot be made a valid BALLS predicate (it is not combat-usable)"));

        }

        ballsCondition = "hascombatitem ".concat(itemOrItemsBallsMacroName(condition));
      } else if (condition instanceof external_kolmafia_namespaceObject.Location) {
        var snarfblat = condition.id;

        if (snarfblat < 1) {
          throw new InvalidMacroError("Location ".concat(
          condition, " cannot be made a valid BALLS predicate (it has no location id)"));

        }

        ballsCondition = "snarfblat ".concat(snarfblat);
      } else if (condition instanceof external_kolmafia_namespaceObject.Class) {
        if ((0,external_kolmafia_namespaceObject.toInt)(condition) > 6) {
          throw new InvalidMacroError("Class ".concat(
          condition, " cannot be made a valid BALLS predicate (it is not a standard class)"));

        }

        ballsCondition = condition.toString().replaceAll(" ", "").toLowerCase();
      } else if (condition instanceof external_kolmafia_namespaceObject.Stat) {
        ballsCondition = "".concat(condition.toString().toLowerCase(), "class");
      } else {
        ballsCondition = condition;
      }

      if (doFalse == true) {
        ballsCondition = "!" + ballsCondition;
      }

      return this.step("if ".concat(ballsCondition)).step(ifTrue).step("endif");
    }

    /**
     * Create a new macro with an "if" statement.
     * @param condition The BALLS condition for the if statement.
     * @param ifTrue Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */ }, { key: "while_", value:









    /**
     * Add a "while" statement to this macro.
     * @param condition The BALLS condition for the if statement.
     * @param contents Loop to repeat while the condition is true.
     * @returns {Macro} This object itself.
     */
    function while_(condition, contents) {
      return this.step("while ".concat(condition)).step(contents).step("endwhile");
    }

    /**
     * Create a new macro with a "while" statement.
     * @param condition The BALLS condition for the if statement.
     * @param contents Loop to repeat while the condition is true.
     * @returns {Macro} This object itself.
     */ }, { key: "externalIf", value:








    /**
     * Conditionally add a step to a macro based on a condition evaluated at the time of building the macro.
     * @param condition The JS condition.
     * @param ifTrue Continuation to add if the condition is true.
     * @param ifFalse Optional input to turn this into an if...else statement.
     * @returns {Macro} This object itself.
     */
    function externalIf(
    condition,
    ifTrue,
    ifFalse)
    {
      if (condition) return this.step(ifTrue);else
      if (ifFalse) return this.step(ifFalse);else
      return this;
    }

    /**
     * Create a new macro with a condition evaluated at the time of building the macro.
     * @param condition The JS condition.
     * @param ifTrue Continuation to add if the condition is true.
     * @param ifFalse Optional input to turn this into an if...else statement.
     * @returns {Macro} This object itself.
     */ }, { key: "repeat", value:









    /**
     * Add a repeat step to the macro.
     * @returns {Macro} This object itself.
     */
    function repeat() {
      return this.step("repeat");
    }

    /**
     * Add one or more skill cast steps to the macro.
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */ }, { key: "skill", value:
    function skill() {for (var _len2 = arguments.length, skills = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {skills[_key2] = arguments[_key2];}
      return this.step.apply(this, _toConsumableArray(
      skills.map((skill) => {
        return "skill ".concat(skillBallsMacroName(skill));
      })));

    }

    /**
     * Create a new macro with one or more skill cast steps.
     * @param skills Skills to cast.
     * @returns {Macro} This object itself.
     */ }, { key: "trySkill", value:







    /**
     * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {Macro} This object itself.
     */
    function trySkill() {for (var _len3 = arguments.length, skills = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {skills[_key3] = arguments[_key3];}
      return this.step.apply(this, _toConsumableArray(
      skills.map((skill) => {
        return Macro.if_("hasskill ".concat(
        skillBallsMacroName(skill)),
        Macro.skill(skill));

      })));

    }

    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {Macro} This object itself.
     */ }, { key: "trySkillRepeat", value:







    /**
     * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {Macro} This object itself.
     */
    function trySkillRepeat() {for (var _len4 = arguments.length, skills = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {skills[_key4] = arguments[_key4];}
      return this.step.apply(this, _toConsumableArray(
      skills.map((skill) => {
        return Macro.if_("hasskill ".concat(
        skillBallsMacroName(skill)),
        Macro.skill(skill).repeat());

      })));

    }

    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {Macro} This object itself.
     */ }, { key: "item", value:







    /**
     * Add one or more item steps to the macro.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
    function item() {for (var _len5 = arguments.length, items = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {items[_key5] = arguments[_key5];}
      return this.step.apply(this, _toConsumableArray(
      items.map((itemOrItems) => {
        return "use ".concat(itemOrItemsBallsMacroName(itemOrItems));
      })));

    }

    /**
     * Create a new macro with one or more item steps.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */ }, { key: "tryItem", value:







    /**
     * Add one or more item steps to the macro, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */
    function tryItem() {for (var _len6 = arguments.length, items = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {items[_key6] = arguments[_key6];}
      return this.step.apply(this, _toConsumableArray(
      items.map((item) => {
        return Macro.if_(
        itemOrItemsBallsMacroPredicate(item), "use ".concat(
        itemOrItemsBallsMacroName(item)));

      })));

    }

    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {Macro} This object itself.
     */ }, { key: "attack", value:







    /**
     * Add an attack step to the macro.
     * @returns {Macro} This object itself.
     */
    function attack() {
      return this.step("attack");
    }

    /**
     * Create a new macro with an attack step.
     * @returns {Macro} This object itself.
     */ }, { key: "ifHolidayWanderer", value:




    /**
     * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, unmutated.
     * @param macro The macro to place in the if_ statement
     */
    function ifHolidayWanderer(macro) {
      // const todaysWanderers = getTodaysHolidayWanderers();
      // if (todaysWanderers.length === 0) return this;
      // return this.if_(
      //   todaysWanderers.map((monster) => `monsterid ${monster.id}`).join(" || "),
      //   macro
      // );
      return this;
    }
    /**
     * Create a new macro starting with an ifHolidayWanderer step.
     * @param macro The macro to place inside the if_ statement
     */ }, { key: "ifNotHolidayWanderer", value:







    /**
     * Create an if_ statement based on what holiday of loathing it currently is. On non-holidays, returns the original macro, with the input macro appended.
     * @param macro The macro to place in the if_ statement.
     */
    function ifNotHolidayWanderer(macro) {
      /*const todaysWanderers = getTodaysHolidayWanderers();
      if (todaysWanderers.length === 0) return this.step(macro);
      return this.if_(
        todaysWanderers.map((monster) => `!monsterid ${monster.id}`).join(" && "),
        macro
      );*/
      return this;
    }
    /**
     * Create a new macro starting with an ifNotHolidayWanderer step.
     * @param macro The macro to place inside the if_ statement
     */ }], [{ key: "load", value: function load() {var _this;return (_this = new this()).step.apply(_this, _toConsumableArray((0,external_kolmafia_namespaceObject.getProperty)(Macro.SAVED_MACRO_PROPERTY).split(";")));} /**
     * Clear the saved macro in the Mafia property.
     */ }, { key: "clearSaved", value: function clearSaved() {(0,external_kolmafia_namespaceObject.removeProperty)(Macro.SAVED_MACRO_PROPERTY);} }, { key: "step", value: function step() {var _this2;return (_this2 = new this()).step.apply(_this2, arguments);} }, { key: "clearAutoAttackMacros", value: function clearAutoAttackMacros() {var _iterator = MacroBuilder_createForOfIteratorHelper(Macro.cachedAutoAttacks.keys()),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _Macro$cachedMacroIds;var name = _step.value;var id = (_Macro$cachedMacroIds = Macro.cachedMacroIds.get(name)) !== null && _Macro$cachedMacroIds !== void 0 ? _Macro$cachedMacroIds : getMacroId(name);(0,external_kolmafia_namespaceObject.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&action=edit&what=Delete&confirm=1"));Macro.cachedAutoAttacks.delete(name);}} catch (err) {_iterator.e(err);} finally {_iterator.f();}} }, { key: "abort", value: function abort() {return new this().abort();} }, { key: "runaway", value: function runaway() {return new this().runaway();} }, { key: "if_", value: function if_(condition, ifTrue, doFalseInstead) {return new this().if_(condition, ifTrue, doFalseInstead);} }, { key: "while_", value: function while_(condition, contents) {return new this().while_(condition, contents);} }, { key: "externalIf", value: function externalIf(condition, ifTrue, ifFalse) {return new this().externalIf(condition, ifTrue, ifFalse);} }, { key: "skill", value: function skill() {var _this3;return (_this3 = new this()).skill.apply(_this3, arguments);} }, { key: "trySkill", value: function trySkill() {var _this4;return (_this4 = new this()).trySkill.apply(_this4, arguments);} }, { key: "trySkillRepeat", value: function trySkillRepeat() {var _this5;return (_this5 = new this()).trySkillRepeat.apply(_this5, arguments);} }, { key: "item", value: function item() {var _this6;return (_this6 = new this()).item.apply(_this6, arguments);} }, { key: "tryItem", value: function tryItem() {var _this7;return (_this7 = new this()).tryItem.apply(_this7, arguments);} }, { key: "attack", value: function attack() {return new this().attack();} }, { key: "ifHolidayWanderer", value: function ifHolidayWanderer(macro) {return new this().ifHolidayWanderer(macro);} }, { key: "ifNotHolidayWanderer", value: function ifNotHolidayWanderer(
    macro)
    {
      return new this().ifNotHolidayWanderer(macro);
    } }]);return Macro;}();


/**
 * Adventure in a location and handle all combats with a given macro.
 * To use this function you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 *
 * @category Combat
 * @param loc Location to adventure in.
 * @param macro Macro to execute.
 */MacroBuilder_defineProperty(Macro, "SAVED_MACRO_PROPERTY", "libram_savedMacro");MacroBuilder_defineProperty(Macro, "cachedMacroIds", new Map());MacroBuilder_defineProperty(Macro, "cachedAutoAttacks", new Map());
function adventureMacro(loc, macro) {
  macro.save();
  setAutoAttack(0);
  try {
    adv1(loc, 0, "");
    while (inMultiFight()) {runCombat();}
    if (choiceFollowsFight()) visitUrl("choice.php");
  } finally {
    Macro.clearSaved();
  }
}

/**
 * Adventure in a location and handle all combats with a given autoattack and manual macro.
 * To use the nextMacro parameter you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 *
 * @category Combat
 * @param loc Location to adventure in.
 * @param autoMacro Macro to execute via KoL autoattack.
 * @param nextMacro Macro to execute manually after autoattack completes.
 */
function adventureMacroAuto(
loc,
autoMacro)

{var _nextMacro;var nextMacro = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  nextMacro = (_nextMacro = nextMacro) !== null && _nextMacro !== void 0 ? _nextMacro : Macro.abort();
  autoMacro.setAutoAttack();
  nextMacro.save();
  try {
    adv1(loc, 0, "");
    while (inMultiFight()) {runCombat();}
    if (choiceFollowsFight()) visitUrl("choice.php");
  } finally {
    Macro.clearSaved();
  }
}

var StrictMacro = /*#__PURE__*/(/* unused pure expression or super */ null && (function (_Macro) {_inherits(StrictMacro, _Macro);var _super2 = _createSuper(StrictMacro);function StrictMacro() {MacroBuilder_classCallCheck(this, StrictMacro);return _super2.apply(this, arguments);}MacroBuilder_createClass(StrictMacro, [{ key: "skill", value:
    /**
     * Add one or more skill cast steps to the macro.
     * @param skills Skills to cast.
     * @returns {StrictMacro} This object itself.
     */
    function skill() {var _get2;for (var _len7 = arguments.length, skills = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {skills[_key7] = arguments[_key7];}
      return (_get2 = _get(_getPrototypeOf(StrictMacro.prototype), "skill", this)).call.apply(_get2, [this].concat(skills));
    }

    /**
     * Create a new macro with one or more skill cast steps.
     * @param skills Skills to cast.
     * @returns {StrictMacro} This object itself.
     */ }, { key: "item", value:







    /**
     * Add one or more item steps to the macro.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
    function item() {var _get3;for (var _len8 = arguments.length, items = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {items[_key8] = arguments[_key8];}
      return (_get3 = _get(_getPrototypeOf(StrictMacro.prototype), "item", this)).call.apply(_get3, [this].concat(items));
    }

    /**
     * Create a new macro with one or more item steps.
     * @param items Items to use. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */ }, { key: "trySkill", value:







    /**
     * Add one or more skill cast steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {StrictMacro} This object itself.
     */
    function trySkill() {var _get4;for (var _len9 = arguments.length, skills = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {skills[_key9] = arguments[_key9];}
      return (_get4 = _get(_getPrototypeOf(StrictMacro.prototype), "trySkill", this)).call.apply(_get4, [this].concat(skills));
    }

    /**
     * Create a new macro with one or more skill cast steps, where each step checks if you have the skill first.
     * @param skills Skills to try casting.
     * @returns {StrictMacro} This object itself.
     */ }, { key: "tryItem", value:







    /**
     * Add one or more item steps to the macro, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */
    function tryItem() {var _get5;for (var _len10 = arguments.length, items = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {items[_key10] = arguments[_key10];}
      return (_get5 = _get(_getPrototypeOf(StrictMacro.prototype), "tryItem", this)).call.apply(_get5, [this].concat(items));
    }

    /**
     * Create a new macro with one or more item steps, where each step checks to see if you have the item first.
     * @param items Items to try using. Pass a tuple [item1, item2] to funksling.
     * @returns {StrictMacro} This object itself.
     */ }, { key: "trySkillRepeat", value:







    /**
     * Add one or more skill-cast-and-repeat steps to the macro, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {StrictMacro} This object itself.
     */
    function trySkillRepeat() {var _get6;for (var _len11 = arguments.length, skills = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {skills[_key11] = arguments[_key11];}
      return (_get6 = _get(_getPrototypeOf(StrictMacro.prototype), "trySkillRepeat", this)).call.apply(_get6, [this].concat(skills));
    }

    /**
     * Create a new macro with one or more skill-cast-and-repeat steps, where each step checks if you have the skill first.
     * @param skills Skills to try repeatedly casting.
     * @returns {StrictMacro} This object itself.
     */ }], [{ key: "skill", value: function skill() {var _this8;return (_this8 = new this()).skill.apply(_this8, arguments);} }, { key: "item", value: function item() {var _this9;return (_this9 = new this()).item.apply(_this9, arguments);} }, { key: "trySkill", value: function trySkill() {var _this10;return (_this10 = new this()).trySkill.apply(_this10, arguments);} }, { key: "tryItem", value: function tryItem() {var _this11;return (_this11 = new this()).tryItem.apply(_this11, arguments);} }, { key: "trySkillRepeat", value:
    function trySkillRepeat()


    {var _this12;
      return (_this12 = new this()).trySkillRepeat.apply(_this12, arguments);
    } }]);return StrictMacro;}(Macro)));
;// CONCATENATED MODULE: ./src/utils/GreyCombat.ts
function GreyCombat_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function GreyCombat_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function GreyCombat_createClass(Constructor, protoProps, staticProps) {if (protoProps) GreyCombat_defineProperties(Constructor.prototype, protoProps);if (staticProps) GreyCombat_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}





var

MacroFiller = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {function MacroFiller() {GreyCombat_classCallCheck(this, MacroFiller);}GreyCombat_createClass(MacroFiller, [{ key: "addBanish", value:
    function addBanish(monster) {} }, { key: "addGenericStuff", value:

    function addGenericStuff() {
      // Sing!
      // Absorb
      // Whatever
    } }, { key: "addMountainMan", value:

    function addMountainMan() {} }, { key: "addGlarkCable", value:

    function addGlarkCable() {} }, { key: "addCigerette", value:

    function addCigerette() {} }, { key: "addKilling", value:

    function addKilling() {
      // Absorb
      // Infinite Loop
      // +Item Drop
      // Banish
    } }, { key: "addYellowRay", value:

    function addYellowRay(monster) {} }, { key: "useBackups", value:

    function useBackups() {} }, { key: "addGremlins", value:

    function addGremlins() {} }]);return MacroFiller;}()));


function greyDuringFightMacro(settings) {
  var macro = new Macro();

  var monster = (0,external_kolmafia_namespaceObject.lastMonster)();
  var absorb = AbsorbsProvider.getAbsorb(monster);
  var hasAbsorbed = AbsorbsProvider.getReabsorbedMonsters().includes(monster);

  if (
  absorb != null && (
  (0,external_kolmafia_namespaceObject.myAdventures)() > 20 && absorb.mp > 0 || absorb.adventures > 0) &&
  !hasAbsorbed)
  {
    if (absorb.adventures > 0) {
      macro = macro.trySkill(external_kolmafia_namespaceObject.Skill.get("Re-Process Matter"));
    }
  } else if (isBanishable(settings, monster)) {
    // If they have no good absorbs, or we've already absorbed them
    if (
    absorb == null ||
    hasAbsorbed != null ||
    absorb.hp == 0 &&
    absorb.mp == 0 && (
    absorb.skill == null || (0,external_kolmafia_namespaceObject.haveSkill)(absorb.skill)))
    {
      // If the script explicitly wanted to banish these and this isn't a non-quest
      if (
      !settings.nonquest && (
      settings.banishThese != null || settings.dontBanishThese != null))
      {
        if (
        !hasBanished((0,external_kolmafia_namespaceObject.myLocation)(), BanishType.SPRING_LOADED_FRONT_BUMPER) &&
        (0,external_kolmafia_namespaceObject.getFuel)() >= 50)
        {
          macro.trySkill("Asdon Martin: Spring-Loaded Front Bumper");
        }

        if (
        !hasBanished((0,external_kolmafia_namespaceObject.myLocation)(), BanishType.BOWL_A_CURVEBALL) &&
        (0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Cosmic bowling ball")) > 0)
        {
          macro.trySkill("Bowl a Curveball");
        }
      }

      if (
      !hasBanished((0,external_kolmafia_namespaceObject.myLocation)(), BanishType.SYSTEM_SWEEP) &&
      (0,external_kolmafia_namespaceObject.haveSkill)(external_kolmafia_namespaceObject.Skill.get("System Sweep")))
      {
        // If we are not using crystal ball and didn't just banish something..
        if (
        (0,external_kolmafia_namespaceObject.getMonsters)((0,external_kolmafia_namespaceObject.myLocation)()).includes(monster) && (
        (0,external_kolmafia_namespaceObject.equippedAmount)(external_kolmafia_namespaceObject.Item.get("miniature crystal ball")) == 0 ||
        getBanished().filter(
        (b) =>
        b.banisher.type == BanishType.SYSTEM_SWEEP &&
        b.turnBanished + 2 >= (0,external_kolmafia_namespaceObject.myTurncount)()).
        length == 0))

          // If we do want to banish something..
          macro.trySkill(external_kolmafia_namespaceObject.Skill.get("System Sweep"));
      }
    }
  }

  if (
  /*toInt(getProperty("flyeredML")) <= 10000 && */monster.baseHp < 300 &&
  (0,external_kolmafia_namespaceObject.myHp)() > 120)
  {
    macro.tryItem(external_kolmafia_namespaceObject.Item.get("rock band flyers"));
  }

  return macro;
}

function isBanishable(
settings,
monster)
{
  if (settings.banishThese == null && settings.dontBanishThese == null) {
    return false;
  }

  if (settings.banishThese != null) {
    return settings.banishThese.includes(monster);
  } else if (!settings.dontBanishThese.includes(monster) && !monster.boss) {
    var loc = (0,external_kolmafia_namespaceObject.myLocation)();
    var rates = (0,external_kolmafia_namespaceObject.appearanceRates)(loc);

    if (rates[monster.name] > 5) {
      return true;
    }
  }

  return false;
}

function greyKillingBlow(outfit) {
  var macro = new Macro();

  if ((0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("Temporary Amnesia")) == 0) {
    if ((0,external_kolmafia_namespaceObject.myLevel)() < 4 && (0,external_kolmafia_namespaceObject.myFamiliar)() == external_kolmafia_namespaceObject.Familiar.get("Grey Goose")) {
      macro = macro.trySkill(" Convert Matter to Pomade");
    }

    if (
    (0,external_kolmafia_namespaceObject.getProperty)("retroCapeSuperhero") == "vampire" &&
    (0,external_kolmafia_namespaceObject.getProperty)("retroCapeWashingInstructions") == "kill")
    {
      macro = macro.trySkill("Slay the dead");
    }

    if ((0,external_kolmafia_namespaceObject.lastMonster)().physicalResistance < 70 && (0,external_kolmafia_namespaceObject.myMp)() >= 20) {
      if (outfit.itemDropWeight >= 2 || (0,external_kolmafia_namespaceObject.myLevel)() > 20) {
        macro = macro.trySkillRepeat(external_kolmafia_namespaceObject.Skill.get("Double Nanovision"));
      }

      // Only infinite loop if we're underleveled or have the outfit
      if (
      !GreySettings.isHippyMode() ||
      (0,external_kolmafia_namespaceObject.myLevel)() <= 10 ||
      (0,external_kolmafia_namespaceObject.haveOutfit)("Filthy Hippy Disguise") ||
      (0,external_kolmafia_namespaceObject.haveOutfit)("Frat Warrior Fatigues"))
      {
        macro = macro.trySkillRepeat(external_kolmafia_namespaceObject.Skill.get("Infinite Loop"));
      }

      macro = macro.trySkillRepeat(external_kolmafia_namespaceObject.Skill.get("Double Nanovision"));
    }
  }

  macro.while_("!pastround 15 && !hppercentbelow 30", Macro.attack());
  macro.abort();

  return macro;
}
;// CONCATENATED MODULE: ./src/utils/GreyUtils.ts
function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || GreyUtils_unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function GreyUtils_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return GreyUtils_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return GreyUtils_arrayLikeToArray(o, minLen);}function GreyUtils_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];if (_i == null) return;var _arr = [];var _n = true;var _d = false;var _s, _e;try {for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}

var UmbrellaState;(function (UmbrellaState) {UmbrellaState["MONSTER_LEVEL"] = "broken";UmbrellaState["DAMAGE_REDUCTION_SHIELD"] = "forward";UmbrellaState["ITEM_DROPS"] = "bucket";UmbrellaState["WEAPON_DAMAGE"] = "pitchfork";UmbrellaState["SPELL_DAMAGE"] = "twirling";UmbrellaState["MINUS_COMBAT"] = "cocoon";})(UmbrellaState || (UmbrellaState = {}));








function setUmbrella(setting) {
  if ((0,external_kolmafia_namespaceObject.getProperty)("umbrellaState").includes(setting)) {
    return;
  }

  (0,external_kolmafia_namespaceObject.cliExecute)("umbrella " + setting);
}

function canCombatLocket(monster) {
  var foughtToday = (0,external_kolmafia_namespaceObject.getProperty)("_locketMonstersFought").
  split(",").
  map((s) => (0,external_kolmafia_namespaceObject.toMonster)((0,external_kolmafia_namespaceObject.toInt)(s)));

  if (foughtToday.length >= 3 || foughtToday.includes(monster)) {
    return false;
  }

  var monsters = Object.keys((0,external_kolmafia_namespaceObject.getLocketMonsters)()).map((s) =>
  (0,external_kolmafia_namespaceObject.toMonster)(s));


  if (!monsters.includes(monster)) {
    return false;
  }

  return true;
}

function getBackupsRemaining() {
  return 11 - (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_backUpUses"));
}

function doColor(text, color) {
  return "<font color='".concat(color, "'>").concat(text, "</font>");
}

var ballProp = () =>
(0,external_kolmafia_namespaceObject.getProperty)("crystalBallPredictions").
split("|").
map((element) => element.split(":")).
map(
(_ref) => {var _ref2 = _slicedToArray(_ref, 3),turncount = _ref2[0],location = _ref2[1],monster = _ref2[2];return (
    [parseInt(turncount), (0,external_kolmafia_namespaceObject.toLocation)(location), (0,external_kolmafia_namespaceObject.toMonster)(monster)]);});






/**
 * Returns a map of locations, and the monsters predicted.
 *
 * The boolean is a "Should we show fights that will still be valid if we waste a turn elsewhere"
 */
function currentPredictions()

{var showPredictionsNotAboutToExpire = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var predictions = ballProp();

  if (predictions.find((_ref3) => {var _ref4 = _slicedToArray(_ref3, 1),turn = _ref4[0];return turn + 2 <= (0,external_kolmafia_namespaceObject.myTurncount)();})) {
    (0,external_kolmafia_namespaceObject.visitUrl)("inventory.php?ponder=1", false);

    predictions = ballProp();
  }

  return new Map(
  predictions.map((_ref5) => {var _ref6 = _slicedToArray(_ref5, 3),location = _ref6[1],monster = _ref6[2];return [location, monster];}));


  /*// If a prediction should've been expired by mafia, ponder because something is wrong.
  if (predictions.find(([turn]) => turn + 2 <= myTurncount())) {
    visitUrl("inventory.php?ponder=1", false);
     predictions = ballProp();
  }
   // The alternative is to make the 'gottenLastTurn' always return true if the predicted turns is smaller than turns
   const gottenLastTurn = (predictedTurns: number, turns: number) =>
    predictedTurns < turns;
  const gottenThisTurn = (predictedTurns: number, turns: number) =>
    predictedTurns === turns;
   return new Map(
    predictions
      .filter(
        ([turncount]) =>
          gottenLastTurn(turncount, myTurncount()) ||
          (showPredictionsNotAboutToExpire &&
            gottenThisTurn(turncount, myTurncount()))
      )
      .map(([, location, monster]) => [location, monster])
  );*/




}
;// CONCATENATED MODULE: ./src/utils/GreyOutfitter.ts
function GreyOutfitter_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = GreyOutfitter_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function GreyOutfitter_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return GreyOutfitter_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return GreyOutfitter_arrayLikeToArray(o, minLen);}function GreyOutfitter_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function GreyOutfitter_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function GreyOutfitter_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function GreyOutfitter_createClass(Constructor, protoProps, staticProps) {if (protoProps) GreyOutfitter_defineProperties(Constructor.prototype, protoProps);if (staticProps) GreyOutfitter_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function GreyOutfitter_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var GreyOutfit = /*#__PURE__*/function () {

















  function GreyOutfit() {var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;GreyOutfitter_classCallCheck(this, GreyOutfit);GreyOutfitter_defineProperty(this, "famExpWeight", 30);GreyOutfitter_defineProperty(this, "itemDropWeight", 0.3);GreyOutfitter_defineProperty(this, "meatDropWeight", 0.1);GreyOutfitter_defineProperty(this, "hpWeight", 0.001);GreyOutfitter_defineProperty(this, "hpRegenWeight", 0.01);GreyOutfitter_defineProperty(this, "mpWeight", 0.001);GreyOutfitter_defineProperty(this, "mpRegenWeight", 0.01);GreyOutfitter_defineProperty(this, "initWeight", 0.05);GreyOutfitter_defineProperty(this, "plusCombatWeight", 0);GreyOutfitter_defineProperty(this, "minusCombatWeight", 0);GreyOutfitter_defineProperty(this, "plusMonsterLevelWeight", 0);GreyOutfitter_defineProperty(this, "minusMonsterLevelWeight", 0);GreyOutfitter_defineProperty(this, "itemsWeight", []);GreyOutfitter_defineProperty(this, "bonusWeights", []);GreyOutfitter_defineProperty(this, "overrideMaximizer", void 0);GreyOutfitter_defineProperty(this, "umbrellaSetting", void 0);
    this.overrideMaximizer = string;

    this.setWeights();
  }GreyOutfitter_createClass(GreyOutfit, [{ key: "getUmbrella", value:

    function getUmbrella() {
      if (this.umbrellaSetting == null) {
        if (this.minusCombatWeight > 0) {
          return UmbrellaState.MINUS_COMBAT;
        } else if (this.plusMonsterLevelWeight > 0) {
          return UmbrellaState.MONSTER_LEVEL;
        } else {
          //if (outfit.itemDropWeight > 2) {
          return UmbrellaState.ITEM_DROPS;
        }
      }

      return this.umbrellaSetting;
    } }, { key: "setWeights", value:

    function setWeights() {
      this.addBonus("+50 bonus mafia thumb ring");

      if (getQuestStatus("questL13Final") <= 5) {
        this.addBonus("+4.5 bonus powerful glove");

        if ((0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("scrapbookCharges")) < 100) {
          this.addBonus("+2 bonus familiar scrapbook");
        }
      }

      this.addBonus("-equip screwing pooch");

      if ((0,external_kolmafia_namespaceObject.myLevel)() > 15) {
        this.initWeight = 0.001;
      }

      if ((0,external_kolmafia_namespaceObject.myMeat)() > 12000) {
        this.meatDropWeight = 0.01;
      }

      if (!(0,external_kolmafia_namespaceObject.haveSkill)(external_kolmafia_namespaceObject.Skill.get("Hivemindedness"))) {
        this.mpRegenWeight += 1;

        /*if (myMp() < 42) {
          this.mpRegenWeight += 2;
        }*/
      }

      if (
      GreySettings.isHardcoreMode() &&
      (0,external_kolmafia_namespaceObject.myAdventures)() < 40 &&
      (0,external_kolmafia_namespaceObject.familiarWeight)(external_kolmafia_namespaceObject.Familiar.get("Grey Goose")) < 6 &&
      (0,external_kolmafia_namespaceObject.haveSkill)(external_kolmafia_namespaceObject.Skill.get("Phase Shift")) &&
      (0,external_kolmafia_namespaceObject.haveSkill)(external_kolmafia_namespaceObject.Skill.get("Photonic Shroud")))
      {
        this.famExpWeight = 100;
      }
      // Setup weights according to w/e passives I have
    } }, { key: "addBonus", value:

    function addBonus(message) {
      this.bonusWeights.push(message);

      return this;
    } }, { key: "addItem", value:

    function addItem(item) {var weight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 999999;
      if (weight < 999999 || (0,external_kolmafia_namespaceObject.availableAmount)(item) == 0) {
        this.itemsWeight.push([item, weight]);
      } else {
        this.addBonus("+equip " + item.name);
      }

      return this;
    } }, { key: "setNoCombat", value:

    function setNoCombat() {
      this.minusCombatWeight = 10;
      return this;
    } }, { key: "setPlusCombat", value:

    function setPlusCombat() {
      this.plusCombatWeight = 10;
      return this;
    } }, { key: "setItemDrops", value:

    function setItemDrops() {
      this.itemDropWeight = 2;

      return this;
    } }, { key: "createString", value:

    function createString() {
      if (this.overrideMaximizer != null) {
        return this.overrideMaximizer;
      }

      var modifiers = [];

      if (this.famExpWeight > 0) {
        modifiers.push("+" + this.famExpWeight + " familiar experience");
      }

      if (this.itemDropWeight > 0) {
        modifiers.push("+" + this.itemDropWeight + " item drop");
      }

      if (this.meatDropWeight > 0) {
        modifiers.push("+" + this.meatDropWeight + " meat drop");
      }

      if (this.hpWeight > 0) {
        modifiers.push("+" + this.hpWeight + " hp");
      }

      if (this.hpRegenWeight > 0) {
        modifiers.push("+" + this.hpRegenWeight + " hp regen");
      }

      if (this.mpWeight > 0) {
        modifiers.push("+" + this.mpWeight + " mp");
      }

      if (this.mpRegenWeight > 0) {
        modifiers.push("+" + this.mpRegenWeight + " mp regen");
      }

      if (this.initWeight > 0) {
        modifiers.push("+" + this.initWeight + " init");
      }

      if (this.plusCombatWeight > 0) {
        modifiers.push("+" + this.plusCombatWeight + " combat 25 MAX");
      }

      if (this.minusCombatWeight > 0) {
        modifiers.push("-" + this.minusCombatWeight + " combat 25 MAX");
      }

      if (this.plusMonsterLevelWeight > 0) {
        modifiers.push("+" + this.plusMonsterLevelWeight + " ml");
      }

      if (this.minusMonsterLevelWeight > 0) {
        modifiers.push("-" + this.minusMonsterLevelWeight + " ml");
      }var _iterator = GreyOutfitter_createForOfIteratorHelper(

      this.itemsWeight),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var pair = _step.value;
          modifiers.push("+" + pair[1] + " bonus " + pair[0]);
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}var _iterator2 = GreyOutfitter_createForOfIteratorHelper(

      this.bonusWeights),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _pair = _step2.value;
          modifiers.push(_pair);
        }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}

      if (
      modifiers.filter((m) => m.includes("broken champagne bottle")).length ==
      0 &&
      this.itemDropWeight < 10)
      {
        modifiers.push("-equip broken champagne bottle");
      }

      return modifiers.join(" ");
    } }]);return GreyOutfit;}();
;// CONCATENATED MODULE: ./src/utils/GreyLocations.ts
function GreyLocations_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = GreyLocations_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function GreyLocations_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return GreyLocations_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return GreyLocations_arrayLikeToArray(o, minLen);}function GreyLocations_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function GreyLocations_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function GreyLocations_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function GreyLocations_createClass(Constructor, protoProps, staticProps) {if (protoProps) GreyLocations_defineProperties(Constructor.prototype, protoProps);if (staticProps) GreyLocations_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function GreyLocations_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var AdventureSettings = /*#__PURE__*/function () {function AdventureSettings() {GreyLocations_classCallCheck(this, AdventureSettings);GreyLocations_defineProperty(this, "startOfFightMacro", void 0);GreyLocations_defineProperty(this, "duringFightMacro", void 0);GreyLocations_defineProperty(this, "finishingBlowMacro", void 0);GreyLocations_defineProperty(this, "choices", void 0);GreyLocations_defineProperty(this, "dontBanishThese", void 0);GreyLocations_defineProperty(this, "banishThese", void 0);GreyLocations_defineProperty(this, "nonquest",






    false);}GreyLocations_createClass(AdventureSettings, [{ key: "addBanish", value:

    function addBanish(monster) {
      if (this.dontBanishThese != null) {
        throw "Already declared banish everything but";
      }

      if (this.banishThese == null) {
        this.banishThese = [];
      }

      this.banishThese.push(monster);

      return this;
    } }, { key: "addNoBanish", value:

    function addNoBanish(monster) {
      if (this.banishThese != null) {
        throw "Already declared banish only X";
      }

      if (this.dontBanishThese == null) {
        this.dontBanishThese = [];
      }

      this.dontBanishThese.push(monster);

      return this;
    } }, { key: "setBanishAnything", value:

    function setBanishAnything() {
      if (this.dontBanishThese != null || this.banishThese != null) {
        throw "Already declared some banishing";
      }

      if (this.dontBanishThese == null) {
        this.dontBanishThese = [];
      }

      return this;
    } }, { key: "setChoices", value:

    function setChoices(choices) {
      this.choices = choices;

      return this;
    } }, { key: "setStartOfFightMacro", value:

    function setStartOfFightMacro(startOfFightMacro) {
      this.startOfFightMacro = startOfFightMacro;

      return this;
    } }, { key: "setDuringFightMacro", value:

    function setDuringFightMacro(duringFightMacro) {
      this.duringFightMacro = duringFightMacro;

      return this;
    } }, { key: "setFinishingBlowMacro", value:

    function setFinishingBlowMacro(finishingBlowMacro) {
      this.finishingBlowMacro = finishingBlowMacro;

      return this;
    } }]);return AdventureSettings;}();


function greyAdv(
location,
outfit,
settings)
{
  if (outfit == null) {
    outfit = new GreyOutfit();
  }

  if (settings == null) {
    settings = new AdventureSettings();
  }

  var macro;

  var createMacro = function createMacro() {
    if (settings.startOfFightMacro == null) {
      macro = new Macro();
    } else {
      macro = settings.startOfFightMacro;
    }

    if (settings.duringFightMacro == null) {
      macro.step(greyDuringFightMacro(settings));
    } else {
      macro.
      step(settings.duringFightMacro).
      step(greyDuringFightMacro(settings));
    }

    if (settings.finishingBlowMacro == null) {
      macro.step(greyKillingBlow(outfit));
    } else {
      macro.step(settings.finishingBlowMacro);
    }
  };

  var runChoice = function runChoice() {
    var choiceToPick;

    if (Object.keys((0,external_kolmafia_namespaceObject.availableChoiceOptions)()).length == 0) {
      (0,external_kolmafia_namespaceObject.visitUrl)("choice.php");
    }

    if ((0,external_kolmafia_namespaceObject.lastChoice)() == 904) {
      (0,external_kolmafia_namespaceObject.cliExecute)("choice-goal");
      return;
    }

    if (settings.choices != null) {
      if (settings.choices.callOutOfScopeChoiceBehavior((0,external_kolmafia_namespaceObject.lastChoice)())) {
        return;
      }

      choiceToPick = settings.choices.handleChoice((0,external_kolmafia_namespaceObject.lastChoice)());
    }

    if (choiceToPick == null) {
      choiceToPick = (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("choiceAdventure" + (0,external_kolmafia_namespaceObject.lastChoice)()));
    }

    if (choiceToPick == 0) {
      (0,external_kolmafia_namespaceObject.print)("Oh god", "red");
      throw "No idea what to do!";
    }

    var url =
    "choice.php?pwd=&whichchoice=" + (0,external_kolmafia_namespaceObject.lastChoice)() + "&option=" + choiceToPick;

    (0,external_kolmafia_namespaceObject.visitUrl)(url);
    (0,external_kolmafia_namespaceObject.print)("Visited " + url);
  };

  var runCombat = function runCombat() {
    if (macro == null) {
      createMacro();
    }

    (0,external_kolmafia_namespaceObject.print)(macro.toString());
    macro.submit();
  };

  if (outfit.plusCombatWeight > 0) {
    castCombatSkill();
  } else if (outfit.minusCombatWeight > 0) {
    castNoCombatSkills();
  }

  if (typeof location == "string") {
    (0,external_kolmafia_namespaceObject.visitUrl)(location);
  } else if (location != null) {
    (0,external_kolmafia_namespaceObject.visitUrl)("adventure.php?snarfblat=" + (0,external_kolmafia_namespaceObject.toInt)(location));
  }

  while ((0,external_kolmafia_namespaceObject.currentRound)() != 0 || (0,external_kolmafia_namespaceObject.choiceFollowsFight)() || (0,external_kolmafia_namespaceObject.handlingChoice)()) {
    if ((0,external_kolmafia_namespaceObject.currentRound)() != 0) {
      runCombat();
    } else {
      runChoice();
    }
  }
}

var cachedLocations = new Map();

function getLocations(monster) {
  if (cachedLocations.has(monster)) {
    return cachedLocations.get(monster);
  }

  var locations = [];var _iterator = GreyLocations_createForOfIteratorHelper(

  external_kolmafia_namespaceObject.Location.all()),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var l = _step.value;
      var monsters = Object.keys((0,external_kolmafia_namespaceObject.getLocationMonsters)(l)).map((k) =>
      external_kolmafia_namespaceObject.Monster.get(k));


      if (!monsters.includes(monster)) {
        continue;
      }

      locations.push(l);
    }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

  cachedLocations.set(monster, locations);

  return locations;
}
;// CONCATENATED MODULE: ./src/utils/GreyAbsorber.ts
function GreyAbsorber_toConsumableArray(arr) {return GreyAbsorber_arrayWithoutHoles(arr) || GreyAbsorber_iterableToArray(arr) || GreyAbsorber_unsupportedIterableToArray(arr) || GreyAbsorber_nonIterableSpread();}function GreyAbsorber_nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function GreyAbsorber_iterableToArray(iter) {if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);}function GreyAbsorber_arrayWithoutHoles(arr) {if (Array.isArray(arr)) return GreyAbsorber_arrayLikeToArray(arr);}function GreyAbsorber_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = GreyAbsorber_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function GreyAbsorber_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return GreyAbsorber_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return GreyAbsorber_arrayLikeToArray(o, minLen);}function GreyAbsorber_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function GreyAbsorber_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function GreyAbsorber_createClass(Constructor, protoProps, staticProps) {if (protoProps) GreyAbsorber_defineProperties(Constructor.prototype, protoProps);if (staticProps) GreyAbsorber_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function GreyAbsorber_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function GreyAbsorber_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}




var Absorb = /*#__PURE__*/GreyAbsorber_createClass(function Absorb() {GreyAbsorber_classCallCheck(this, Absorb);GreyAbsorber_defineProperty(this, "monster", void 0);GreyAbsorber_defineProperty(this, "skill", void 0);GreyAbsorber_defineProperty(this, "adventures",


  0);GreyAbsorber_defineProperty(this, "mus",
  0);GreyAbsorber_defineProperty(this, "mys",
  0);GreyAbsorber_defineProperty(this, "mox",
  0);GreyAbsorber_defineProperty(this, "hp",
  0);GreyAbsorber_defineProperty(this, "mp",
  0);});


var AbsorbsProvider = /*#__PURE__*/function () {function AbsorbsProvider() {GreyAbsorber_classCallCheck(this, AbsorbsProvider);}GreyAbsorber_createClass(AbsorbsProvider, [{ key: "getRolloverAdvs", value:


    function getRolloverAdvs() {
      return new Map(
      [
      ["Subatomic Tango", 15],
      ["Solid Fuel", 10],
      ["Autochrony", 10],
      ["Temporal Hyperextension", 10],
      ["Spooky Veins", 10],
      ["Extra Innings", 5],
      ["Reloading", 5],
      ["Harried", 5],
      ["Temporal Bent", 5],
      ["Provably Efficient", 5],
      ["Basic Improvements", 5],
      ["Shifted About", 5],
      ["Seven Foot Feelings", 5],
      ["Self-Actualized", 5]].
      map((s) => [(0,external_kolmafia_namespaceObject.toSkill)(s[0]), s[1] + " Rollover Adventures"]));

    } }, { key: "getUsefulSkills", value:

    function getUsefulSkills() {
      return new Map(
      [
      ["Advanced Exo-Alloy", "100 DA"],
      ["Conifer Polymers", "3 Stench Resist"],
      //["Clammy Microcilia", "2 Stench Resist"],
      //["Cooling Tubules", "10 Cold Damage"],
      ["Cryocurrency", "5 Cold Damage"],
      // ["Ire Proof", "+3 Hot Resist"],
      // ["Snow-Cooling System", "+15 Cold Dmg"],
      ["Cooling Tubules", "+10 Cold Dmg"],
      //["Financial Spreadsheets", "+40% Meat from Monsters"],
      //["Innuendo Circuitry", "+15 Sleaze Damage"],
      ["Ponzi Apparatus", "Scaling meat%"],
      // ["Procgen Ribaldry", "10 Sleaze Damage"],
      ["Propagation Drive", "20% Item Drops"]].
      map((s) => [(0,external_kolmafia_namespaceObject.toSkill)(s[0]), s[1]]));

    } }, { key: "getMustHaveSkills", value:

    function getMustHaveSkills() {
      return new Map(
      [
      ["Subatomic Hardening", "Scaling DR"],
      ["Fluid Dynamics Simulation", "Scaling HP Regen"],
      ["Infinite Loop", "Fast Leveling"],
      ["Gravitational Compression", "Scaling Item Drop"],
      ["Hivemindedness", "Scaling MP Regen"],
      ["Photonic Shroud", "-10 Combat"],
      ["Piezoelectric Honk", "+10 Combat"],
      ["Phase Shift", "-10 Combat"],
      ["Ponzi Apparatus", "Scaling Meat Drop"]].
      map((s) => [(0,external_kolmafia_namespaceObject.toSkill)(s[0]), s[1]]));

    } }, { key: "getAbsorbsInLocation", value:

    function getAbsorbsInLocation(location) {
      var absorbs = [];

      if (location == null) {
        return absorbs;
      }

      var monsters = (0,external_kolmafia_namespaceObject.getMonsters)(location);var _iterator = GreyAbsorber_createForOfIteratorHelper(

      AbsorbsProvider.allAbsorbs),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var absorb = _step.value;
          if (!monsters.includes(absorb.monster)) {
            continue;
          }

          absorbs.push(absorb);
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

      return absorbs;
    } }, { key: "getMultiplier", value:

    function getMultiplier(monster, defeated) {
      if (
      defeated.has(monster) &&
      defeated.get(monster) === Reabsorbed.REABSORBED)
      {
        return 0;
      }

      var mult = defeated.get(monster) == null ? 1 : 0;

      if ((0,external_kolmafia_namespaceObject.familiarWeight)(external_kolmafia_namespaceObject.Familiar.get("Grey Goose")) >= 6) {
        mult += 1;
      }

      return mult;
    } }, { key: "getAdventuresInLocation", value:

    function getAdventuresInLocation(
    defeated,
    location)

    {var includeSkills = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var skills = this.getMustHaveSkills();

      if (!GreySettings.speedRunMode) {var _iterator2 = GreyAbsorber_createForOfIteratorHelper(
        this.getUsefulSkills()),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var entry = _step2.value;
            skills.set(entry[0], entry[1]);
          }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}
      }

      // for (let entry of this.getRolloverAdvs()) {
      //   skills.set(entry[0], entry[1]);
      // }

      var absorbs = this.getAbsorbsInLocation(location).filter((a) => {
        if (
        a.adventures <= 0 && (
        a.skill == null || !includeSkills || !skills.has(a.skill)))
        {
          return false;
        }

        if (
        a.adventures > 0 &&
        defeated.get(a.monster) == Reabsorbed.REABSORBED)
        {
          return false;
        }

        if (a.skill != null && (0,external_kolmafia_namespaceObject.haveSkill)(a.skill)) {
          return false;
        }

        return true;
      });

      if (absorbs.length == 0) {
        return null;
      }

      var advsSpent = 0;
      var entries = Object.entries((0,external_kolmafia_namespaceObject.appearanceRates)(location));
      var rates = [];

      entries.forEach((v) => {
        var monster = external_kolmafia_namespaceObject.Monster.get(v[0]);
        var rate = v[1];

        if (rate <= 0 || location.combatPercent <= 0) {
          return;
        }

        rates.push([monster, rate * (location.combatPercent / 100)]);
      });

      if (location == external_kolmafia_namespaceObject.Location.get("Oil Peak")) {
        rates.push([external_kolmafia_namespaceObject.Monster.get("Oil Baron"), 100]);
      }

      absorbs = absorbs.filter(
      (a) => rates.find((r) => r[0] == a.monster) != null);


      if (absorbs.length == 0) {
        return null;
      }

      while (
      rates.filter(
      (r) =>
      r[1] * advsSpent < 100 &&
      absorbs.filter((a) => a.monster == r[0]).length > 0).
      length > 0)
      {
        advsSpent++;
      }

      var totalAdvs = absorbs.reduce(
      (p, a) =>
      Math.max(0, a.adventures) * this.getMultiplier(a.monster, defeated) + p,
      0);

      var newSkills = new Map();var _iterator3 = GreyAbsorber_createForOfIteratorHelper(

      absorbs),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var a = _step3.value;
          if (!skills.has(a.skill)) {
            continue;
          }

          newSkills.set(a, skills.get(a.skill));
        }} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}

      return {
        location: location,
        turnsToGain: totalAdvs,
        expectedTurnsProfit:
        totalAdvs - (advsSpent + Math.max(2, Math.ceil(advsSpent * 0.2))),
        monsters: absorbs.map((a) => a.monster),
        skills: newSkills,
        shouldWait:
        absorbs.filter((a) => a.adventures > 0 && !defeated.has(a.monster)).
        length > 0,
        shouldRunOrb: false };

    } }, { key: "getOnlyUsefulAbsorbs", value:

    function getOnlyUsefulAbsorbs(absorbs) {
      var usefulSkills = GreyAbsorber_toConsumableArray(this.getMustHaveSkills().keys());

      if (!GreySettings.speedRunMode) {
        usefulSkills.push.apply(usefulSkills, GreyAbsorber_toConsumableArray(this.getUsefulSkills().keys()));
      }

      return absorbs.filter((a) => {
        return (
          a.adventures > 0 ||
          a.mp > 0 ||
          a.skill != null && usefulSkills.includes(a.skill));

      });
    } }, { key: "getAbsorbedMonstersFromInstance", value:































































    function getAbsorbedMonstersFromInstance() {
      var monsters = new Map();
      var reabsorbed = AbsorbsProvider.getReabsorbedMonsters();
      var absorbedProp = "_monstersFoughtToday";

      if ((0,external_kolmafia_namespaceObject.getProperty)(absorbedProp) == "" || (0,external_kolmafia_namespaceObject.turnsPlayed)() % 50 == 1) {
        this.getAbsorbedMonstersFromUrl().forEach((m) =>
        monsters.set(
        m,
        reabsorbed.includes(m) ?
        Reabsorbed.REABSORBED :
        Reabsorbed.NOT_REABSORBED));


      } else {
        (0,external_kolmafia_namespaceObject.getProperty)(absorbedProp).
        split(",").
        map((m) => (0,external_kolmafia_namespaceObject.toMonster)((0,external_kolmafia_namespaceObject.toInt)(m))).
        forEach((m) => {
          monsters.set(m, Reabsorbed.NOT_REABSORBED);
        });
      }var _iterator4 = GreyAbsorber_createForOfIteratorHelper(

      reabsorbed),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var m = _step4.value;
          monsters.set(m, Reabsorbed.REABSORBED);
        }} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}

      if (
      (0,external_kolmafia_namespaceObject.lastMonster)() != null &&
      !monsters.has((0,external_kolmafia_namespaceObject.lastMonster)()) &&
      AbsorbsProvider.getAbsorb((0,external_kolmafia_namespaceObject.lastMonster)()) != null)
      {
        monsters.set((0,external_kolmafia_namespaceObject.lastMonster)(), Reabsorbed.NOT_REABSORBED);
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)(absorbedProp).split(",").length != monsters.size) {
        var prop = (0,external_kolmafia_namespaceObject.getProperty)("logPreferenceChange");
        (0,external_kolmafia_namespaceObject.setProperty)("logPreferenceChange", "false");
        (0,external_kolmafia_namespaceObject.setProperty)(
        absorbedProp,
        Array.from(monsters.keys()).
        map((m) => m.id).
        join(","));


        (0,external_kolmafia_namespaceObject.setProperty)("logPreferenceChange", prop);
      }

      return monsters;
    } }, { key: "getAbsorbedMonstersFromUrl", value:

    function getAbsorbedMonstersFromUrl() {
      var page = (0,external_kolmafia_namespaceObject.visitUrl)("charsheet.php");
      var regex = /Absorbed [\s\S]+? from [\s\S]+?<!\x2D\x2D (\d+) \x2D\x2D><br \/>/;

      var match;
      var monsters = [];

      while ((match = page.match(regex)) != null) {
        page = page.replace(match[0], "");
        monsters.push((0,external_kolmafia_namespaceObject.toMonster)((0,external_kolmafia_namespaceObject.toInt)(match[1])));
      }

      return monsters;
    } }, { key: "getExtraAdventures", value:








    function getExtraAdventures(
    defeated)

    {var includeSkills = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var map = new Map();var _iterator5 = GreyAbsorber_createForOfIteratorHelper(

      AbsorbsProvider.loadAbsorbs().filter(
      (a) =>
      (includeSkills || a.adventures > 0) &&
      defeated.get(a.monster) != Reabsorbed.REABSORBED)),_step5;try {for (_iterator5.s(); !(_step5 = _iterator5.n()).done;)
        {var absorb = _step5.value;var _iterator6 = GreyAbsorber_createForOfIteratorHelper(
          getLocations(absorb.monster)),_step6;try {for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {var l = _step6.value;
              if (map.has(l)) {
                continue;
              }

              map.set(l, this.getAdventuresInLocation(defeated, l, includeSkills));
            }} catch (err) {_iterator6.e(err);} finally {_iterator6.f();}
        }} catch (err) {_iterator5.e(err);} finally {_iterator5.f();}

      return GreyAbsorber_toConsumableArray(map.values()).filter((a) => a != null);
    } }], [{ key: "getAbsorb", value: function getAbsorb(monster) {var _iterator7 = GreyAbsorber_createForOfIteratorHelper(AbsorbsProvider.loadAbsorbs()),_step7;try {for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {var absorb = _step7.value;if (absorb.monster != monster) {continue;}return absorb;}} catch (err) {_iterator7.e(err);} finally {_iterator7.f();}return null;} }, { key: "loadAbsorbs", value: function loadAbsorbs() {if (AbsorbsProvider.allAbsorbs != null) {return AbsorbsProvider.allAbsorbs;}AbsorbsProvider.allAbsorbs = [];var _iterator8 = GreyAbsorber_createForOfIteratorHelper((0,external_kolmafia_namespaceObject.fileToBuffer)("data/grey_you_data.txt").split("\n")),_step8;try {for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {var line = _step8.value;var spl = line.split("\t");if (spl.length != 2 || spl[1] == null || spl[1].length == 0) {continue;}var mons = (0,external_kolmafia_namespaceObject.toMonster)(spl[0]);if (mons == external_kolmafia_namespaceObject.Monster.get("None")) {(0,external_kolmafia_namespaceObject.print)("Unknown " + spl[0]);continue;}var absorb = new Absorb();absorb.monster = mons;if (spl[1].endsWith("adventures")) {absorb.adventures = (0,external_kolmafia_namespaceObject.toInt)(spl[1].substring(0, spl[1].lastIndexOf(" ")));} else if (spl[1].endsWith("muscle")) {absorb.mus = (0,external_kolmafia_namespaceObject.toInt)(spl[1].substring(0, spl[1].lastIndexOf(" ")));} else if (spl[1].endsWith("mysticality")) {absorb.mys = (0,external_kolmafia_namespaceObject.toInt)(spl[1].substring(0, spl[1].lastIndexOf(" ")));} else if (spl[1].endsWith("moxie")) {absorb.mox = (0,external_kolmafia_namespaceObject.toInt)(spl[1].substring(0, spl[1].lastIndexOf(" ")));} else if (spl[1].endsWith("maximum hp")) {absorb.hp = (0,external_kolmafia_namespaceObject.toInt)(spl[1].substring(0, spl[1].indexOf(" ")));} else if (spl[1].endsWith("maximum mp")) {absorb.mp = (0,external_kolmafia_namespaceObject.toInt)(spl[1].substring(0, spl[1].indexOf(" ")));} else {absorb.skill = (0,external_kolmafia_namespaceObject.toSkill)(spl[1]);if (absorb.skill == external_kolmafia_namespaceObject.Skill.get("None")) {(0,external_kolmafia_namespaceObject.print)("Unknown thingy " + spl[1]);}}AbsorbsProvider.allAbsorbs.push(absorb);}} catch (err) {_iterator8.e(err);} finally {_iterator8.f();}return AbsorbsProvider.allAbsorbs;} }, { key: "getReabsorbedMonsters", value: function getReabsorbedMonsters() {return (0,external_kolmafia_namespaceObject.getProperty)("gooseReprocessed").split(",").filter((s) => s != "").map((m) => (0,external_kolmafia_namespaceObject.toMonster)((0,external_kolmafia_namespaceObject.toInt)(m)));} }]);return AbsorbsProvider;}();GreyAbsorber_defineProperty(AbsorbsProvider, "allAbsorbs", void 0);












var Reabsorbed;(function (Reabsorbed) {Reabsorbed[Reabsorbed["REABSORBED"] = 0] = "REABSORBED";Reabsorbed[Reabsorbed["NOT_REABSORBED"] = 1] = "NOT_REABSORBED";})(Reabsorbed || (Reabsorbed = {}));var




GreyYou = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {function GreyYou() {GreyAbsorber_classCallCheck(this, GreyYou);}GreyAbsorber_createClass(GreyYou, [{ key: "doCommand", value:
    function doCommand(command) {
      // this.getPlacesToAdv();
    }

    /*getPlacesToAdv(includeSkills: boolean = true) {
      let fought = this.utils.getAbsorbedMonsters();
      let map: Map<Location, AdventureLocation> = new Map();
       for (let absorb of this.utils.getOnlyUsefulAbsorbs(
        this.utils.getUnabsorbed()
      )) {
        for (let l of this.getLocations(absorb.monster)) {
          if (map.has(l)) continue;
           map.set(l, this.utils.getExtraAdventures(fought, l, includeSkills));
        }
      }
       let sort: AdventureLocation[] = [];
       for (let entry of map.values()) {
        if (entry == null) {
          continue;
        }
         sort.push(entry);
      }
       sort.sort((v1, v2) => v2.expectedTurnsInZone - v1.expectedTurnsInZone);
      let unnatural = this.getUnnaturalLocations();
      let impossible = this.getImpossibleLocations();
      let intentional = this.getManualUnlocks();
      let color = function (message: string, color: string) {
        return `<font color='${color}'>${message}</font>`;
      };
       let htmls: string[] = [];
       for (let r of sort) {
        // TODO Highlight zones based on if we'll encounter them naturally in our path
         // If we'll encounter this naturally, don't bother displaying yet
        if (
          !impossible.includes(r.location) &&
          !intentional.includes(r.location) &&
          !canAdv(r.location)
        ) {
          continue;
        }
         let html = `Try ${r.location}: ${r.expectedTurnsInZone} (${
          r.turnsToGain
        }) adventures, Monsters: ${color(
          r.monsters.map((m) => m.name).join(", "),
          "gray"
        )}`;
         if (r.skills.size > 0) {
          html += " " + color("Grab while you're here: ", "black");
           for (let absorb of r.skills.keys()) {
            html += absorb.monster.name + " (" + r.skills.get(absorb) + ") ";
          }
        }
         html = color(
          html,
          impossible.includes(r.location)
            ? "purple"
            : !canAdv(r.location)
            ? "red"
            : unnatural.includes(r.location)
            ? "blue"
            : "green"
        );
         htmls.push(html);
      }
       for (let html of htmls) {
        printHtml(html);
      }
    }*/ }]);return GreyYou;}()));

















function main(command) {
  new GreyYou().doCommand(command);
}
;// CONCATENATED MODULE: ./src/utils/Properties.ts
function Properties_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function Properties_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function Properties_createClass(Constructor, protoProps, staticProps) {if (protoProps) Properties_defineProperties(Constructor.prototype, protoProps);if (staticProps) Properties_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function Properties_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var PropertyManager = /*#__PURE__*/function () {function PropertyManager() {Properties_classCallCheck(this, PropertyManager);Properties_defineProperty(this, "properties",
    new Map());}Properties_createClass(PropertyManager, [{ key: "setProperty", value:

    function setProperty(property, value) {var quiet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (!this.properties.has(property)) {
        this.properties.set(property, (0,external_kolmafia_namespaceObject.getProperty)(property));
      }

      (0,external_kolmafia_namespaceObject.setProperty)(property, value);

      if (!quiet) {
        (0,external_kolmafia_namespaceObject.print)("Set property " + property + " to " + value);
      }
    } }, { key: "setChoice", value:

    function setChoice(choice, value) {
      this.setProperty("choiceAdventure" + choice, value.toString());
    } }, { key: "resetChoice", value:

    function resetChoice(choice) {
      this.reset("choiceAdventure" + choice);
    } }, { key: "reset", value:

    function reset(property) {var quiet = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (this.properties.has(property)) return;

      (0,external_kolmafia_namespaceObject.setProperty)(property, this.properties.get(property));

      if (!quiet) {
        (0,external_kolmafia_namespaceObject.print)(
        "Reset property " +
        property +
        " back to " +
        this.properties.get(property));

      }

      this.properties.delete(property);
    } }, { key: "resetAll", value:

    function resetAll() {var quiet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.properties.forEach((value, key) => {
        (0,external_kolmafia_namespaceObject.setProperty)(key, value);

        if (!quiet) {
          (0,external_kolmafia_namespaceObject.print)("Reset property " + key + " back to " + value);
        }
      });

      this.properties.clear();
    } }]);return PropertyManager;}();
;// CONCATENATED MODULE: ./src/quests/council/beanstalk/QuestL10GiantShip.ts
function QuestL10GiantShip_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL10GiantShip_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL10GiantShip_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL10GiantShip_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL10GiantShip_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL10GiantShip_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestL10GiantShip = /*#__PURE__*/function () {function QuestL10GiantShip() {QuestL10GiantShip_classCallCheck(this, QuestL10GiantShip);QuestL10GiantShip_defineProperty(this, "modelShip",
    external_kolmafia_namespaceObject.Item.get("Model airship"));QuestL10GiantShip_defineProperty(this, "amulet",
    external_kolmafia_namespaceObject.Item.get("Amulet of Extreme Plot Significance"));QuestL10GiantShip_defineProperty(this, "umbrella",
    external_kolmafia_namespaceObject.Item.get("Titanium Assault Umbrella"));QuestL10GiantShip_defineProperty(this, "wig",
    external_kolmafia_namespaceObject.Item.get("Mohawk Wig"));QuestL10GiantShip_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get("The Penultimate Fantasy Airship"));}QuestL10GiantShip_createClass(QuestL10GiantShip, [{ key: "run", value:

    // TODO Once we've got the items and absorbs, try replace combats

    function run() {
      var outfit = new GreyOutfit().setNoCombat();
      var wantDrops =
      (0,external_kolmafia_namespaceObject.availableAmount)(this.amulet) == 0 ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.umbrella) == 0 ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.wig) == 0;

      if (wantDrops) {
        outfit.setItemDrops();
      }

      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          var props = new PropertyManager();

          try {
            if ((0,external_kolmafia_namespaceObject.availableAmount)(this.modelShip) == 0) {
              props.setChoice(182, 4);
            } else {
              props.setChoice(182, 1);
            }

            greyAdv(this.loc, outfit);
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Council / Beanstalk / Ship";
    } }, { key: "level", value:

    function level() {
      return 8;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL10Garbage");

      if (status < 1) {
        return QuestStatus.NOT_READY;
      }

      if (status > 6) {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }]);return QuestL10GiantShip;}();
;// CONCATENATED MODULE: ./src/iotms/delayburners/DelayBurningKramco.ts
function DelayBurningKramco_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function DelayBurningKramco_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function DelayBurningKramco_createClass(Constructor, protoProps, staticProps) {if (protoProps) DelayBurningKramco_defineProperties(Constructor.prototype, protoProps);if (staticProps) DelayBurningKramco_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function DelayBurningKramco_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


var DelayBurningKramco = /*#__PURE__*/function () {function DelayBurningKramco() {DelayBurningKramco_classCallCheck(this, DelayBurningKramco);DelayBurningKramco_defineProperty(this, "kramco",
    external_kolmafia_namespaceObject.Item.get("Kramco Sausage-o-Matic"));}DelayBurningKramco_createClass(DelayBurningKramco, [{ key: "doFightSetup", value:

    function doFightSetup() {
      (0,external_kolmafia_namespaceObject.equip)(external_kolmafia_namespaceObject.Slot.get("Off-Hand"), this.kramco);

      return [external_kolmafia_namespaceObject.Slot.get("Off-Hand")];
    } }, { key: "isViableAsCombatReplacer", value:

    function isViableAsCombatReplacer() {
      return this.getChanceOfFight() > 0.1;
    } }, { key: "isViable", value:

    function isViable() {
      return (0,external_kolmafia_namespaceObject.availableAmount)(this.kramco) > 0;
    } }, { key: "isFree", value:

    function isFree() {
      return true;
    } }, { key: "readyIn", value:

    function readyIn() {
      return this.getNextGuaranteedFight();
    } }, { key: "doSetup", value:

    function doSetup() {} }, { key: "getGoblinsFought", value:

    function getGoblinsFought() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_sausageFights"));
    } }, { key: "getLastGoblinTurn", value:

    function getLastGoblinTurn() {
      return (0,external_kolmafia_namespaceObject.totalTurnsPlayed)() - (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_lastSausageMonsterTurn"));
    } }, { key: "getNextGuaranteedGoblin", value:

    function getNextGuaranteedGoblin() {
      var goblinsFought = this.getGoblinsFought();
      return (
        4 +
        goblinsFought * 3 +
        Math.max(0, goblinsFought - 5) *
        Math.max(0, goblinsFought - 5) *
        Math.max(0, goblinsFought - 5));

    } }, { key: "getNextGuaranteedFight", value:

    function getNextGuaranteedFight() {
      if (this.getGoblinsFought() == 0) {
        return 0;
      }

      return Math.max(
      0,
      this.getNextGuaranteedGoblin() - this.getLastGoblinTurn());

    } }, { key: "getGoblinMultiplier", value:

    function getGoblinMultiplier() {
      return Math.max(0, this.getGoblinsFought() - 5);
    } }, { key: "getChanceOfFight", value:

    function getChanceOfFight() {
      var chance =
      (this.getLastGoblinTurn() + 1.0) / (
      (5.0 + this.getGoblinsFought()) * 3.0 +
      this.getGoblinMultiplier() *
      this.getGoblinMultiplier() *
      this.getGoblinMultiplier());

      if (chance > 1) {
        chance = 1;
      }
      if (chance < 0) {
        chance = 0;
      }

      return chance;
    } }]);return DelayBurningKramco;}();
;// CONCATENATED MODULE: ./src/iotms/delayburners/DelayBurningVoter.ts
function DelayBurningVoter_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function DelayBurningVoter_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function DelayBurningVoter_createClass(Constructor, protoProps, staticProps) {if (protoProps) DelayBurningVoter_defineProperties(Constructor.prototype, protoProps);if (staticProps) DelayBurningVoter_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function DelayBurningVoter_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


var DelayBurningVoter = /*#__PURE__*/function () {function DelayBurningVoter() {DelayBurningVoter_classCallCheck(this, DelayBurningVoter);DelayBurningVoter_defineProperty(this, "absentee",
    external_kolmafia_namespaceObject.Item.get("Absentee Voter Ballot"));DelayBurningVoter_defineProperty(this, "sticker",
    external_kolmafia_namespaceObject.Item.get('"I Voted!" sticker'));}DelayBurningVoter_createClass(DelayBurningVoter, [{ key: "doFightSetup", value:

    function doFightSetup() {
      (0,external_kolmafia_namespaceObject.equip)(external_kolmafia_namespaceObject.Slot.get("Acc3"), this.sticker);

      return [external_kolmafia_namespaceObject.Slot.get("Acc3")];
    } }, { key: "isViableAsCombatReplacer", value:

    function isViableAsCombatReplacer() {
      return false;
    } }, { key: "readyIn", value:

    function readyIn() {
      var turnsTillNextFight = ((0,external_kolmafia_namespaceObject.totalTurnsPlayed)() - 1) % 11;

      if (turnsTillNextFight > 0) {
        turnsTillNextFight = 10 - turnsTillNextFight;
      }

      if ((0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastVoteMonsterTurn")) >= (0,external_kolmafia_namespaceObject.totalTurnsPlayed)()) {
        turnsTillNextFight += 10;
      }

      return turnsTillNextFight;
    } }, { key: "doSetup", value:

    function doSetup() {
      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.sticker) > 0) {
        return;
      }
    } }, { key: "isViable", value:

    function isViable() {
      return (
        (0,external_kolmafia_namespaceObject.availableAmount)(this.sticker) > 0 ||
        (0,external_kolmafia_namespaceObject.getProperty)("voteAlways") == "true" ||
        (0,external_kolmafia_namespaceObject.getProperty)("_voteToday") == "true" ||
        (0,external_kolmafia_namespaceObject.availableAmount)(this.absentee) > 0);

    } }, { key: "isFree", value:

    function isFree() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_voteFreeFights")) < 3;
    } }, { key: "voterSetup", value:

    function voterSetup() {
      var voterValueTable = [
      {
        monster: external_kolmafia_namespaceObject.Monster.get("terrible mutant"),
        value: (0,external_kolmafia_namespaceObject.mallPrice)(external_kolmafia_namespaceObject.Item.get("glob of undifferentiated tissue")) + 10 },

      {
        monster: external_kolmafia_namespaceObject.Monster.get("angry ghost"),
        value: (0,external_kolmafia_namespaceObject.mallPrice)(external_kolmafia_namespaceObject.Item.get("ghostly ectoplasm")) * 1.11 },

      {
        monster: external_kolmafia_namespaceObject.Monster.get("government bureaucrat"),
        value:
        (0,external_kolmafia_namespaceObject.mallPrice)(external_kolmafia_namespaceObject.Item.get("absentee voter ballot")) * 0.05 + 75 * 0.25 + 50 },

      {
        monster: external_kolmafia_namespaceObject.Monster.get("annoyed snake"),
        value: 25 * 0.5 + 25 },

      {
        monster: external_kolmafia_namespaceObject.Monster.get("slime blob"),
        value: 20 * 0.4 + 50 * 0.2 + 250 * 0.01 }];



      if (
      (0,external_kolmafia_namespaceObject.availableAmount)(this.absentee) > 0 &&
      (0,external_kolmafia_namespaceObject.getProperty)("_voteToday") == "false" &&
      (0,external_kolmafia_namespaceObject.getProperty)("voteAlways") == "false")
      {
        try {
          (0,external_kolmafia_namespaceObject.visitUrl)("inv_use.php?pwd&which=3&whichitem=9991");
          //use(Item.get("Absentee Voter Ballot"));
        } catch (e) {}
      }

      try {
        (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=town_right&action=townright_vote");
      } catch (e) {}

      var votingMonsterPriority = voterValueTable.
      sort((a, b) => b.value - a.value).
      map((element) => element.monster.name);

      var initPriority = new Map([
      ["Meat Drop: +30", 10],
      ["Familiar Experience: +2", 9],
      ["Item Drop: +15", 8],
      ["Adventures: +1", 7],
      ["Monster Level: +10", 5],
      ["".concat((0,external_kolmafia_namespaceObject.myPrimestat)(), " Percent: +25"), 3],
      ["Experience (".concat((0,external_kolmafia_namespaceObject.myPrimestat)(), "): +4"), 2],
      ["Meat Drop: -30", -2],
      ["Item Drop: -15", -2],
      ["Familiar Experience: -2", -2]]);


      var monsterVote =
      votingMonsterPriority.indexOf((0,external_kolmafia_namespaceObject.getProperty)("_voteMonster1")) <
      votingMonsterPriority.indexOf((0,external_kolmafia_namespaceObject.getProperty)("_voteMonster2")) ?
      1 :
      2;

      var voteLocalPriorityArr = [
      [
      0,
      initPriority.get((0,external_kolmafia_namespaceObject.getProperty)("_voteLocal1")) || (
      (0,external_kolmafia_namespaceObject.getProperty)("_voteLocal1").indexOf("-") === -1 ? 1 : -1)],

      [
      1,
      initPriority.get((0,external_kolmafia_namespaceObject.getProperty)("_voteLocal2")) || (
      (0,external_kolmafia_namespaceObject.getProperty)("_voteLocal2").indexOf("-") === -1 ? 1 : -1)],

      [
      2,
      initPriority.get((0,external_kolmafia_namespaceObject.getProperty)("_voteLocal3")) || (
      (0,external_kolmafia_namespaceObject.getProperty)("_voteLocal3").indexOf("-") === -1 ? 1 : -1)],

      [
      3,
      initPriority.get((0,external_kolmafia_namespaceObject.getProperty)("_voteLocal4")) || (
      (0,external_kolmafia_namespaceObject.getProperty)("_voteLocal4").indexOf("-") === -1 ? 1 : -1)]];



      var bestVotes = voteLocalPriorityArr.sort((a, b) => b[1] - a[1]);
      var firstInit = bestVotes[0][0];
      var secondInit = bestVotes[1][0];

      (0,external_kolmafia_namespaceObject.print)(
      "We're voting for " +
      (0,external_kolmafia_namespaceObject.getProperty)("_voteLocal" + (firstInit + 1)) +
      " (" +
      firstInit +
      ")" +
      " and " +
      (0,external_kolmafia_namespaceObject.getProperty)("_voteLocal" + (secondInit + 1)) +
      " (" +
      secondInit +
      ")",
      "gray");


      (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?option=1&whichchoice=1331&g=".concat(
      monsterVote, "&local[]=").concat(firstInit, "&local[]=").concat(firstInit));

      (0,external_kolmafia_namespaceObject.waitq)(1);
    } }]);return DelayBurningVoter;}();
;// CONCATENATED MODULE: ./src/iotms/delayburners/DelayCursedMagnifyingGlass.ts
function DelayCursedMagnifyingGlass_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function DelayCursedMagnifyingGlass_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function DelayCursedMagnifyingGlass_createClass(Constructor, protoProps, staticProps) {if (protoProps) DelayCursedMagnifyingGlass_defineProperties(Constructor.prototype, protoProps);if (staticProps) DelayCursedMagnifyingGlass_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function DelayCursedMagnifyingGlass_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


var DelayBurningCursedMagnifyingGlass = /*#__PURE__*/function () {function DelayBurningCursedMagnifyingGlass() {DelayCursedMagnifyingGlass_classCallCheck(this, DelayBurningCursedMagnifyingGlass);DelayCursedMagnifyingGlass_defineProperty(this, "item",
    external_kolmafia_namespaceObject.Item.get("Cursed Magnifying Glass"));DelayCursedMagnifyingGlass_defineProperty(this, "lobsterBarrels",
    external_kolmafia_namespaceObject.Item.get("barrel of gunpowder"));DelayCursedMagnifyingGlass_defineProperty(this, "monster",
    external_kolmafia_namespaceObject.Monster.get("Lobsterfrogman"));}DelayCursedMagnifyingGlass_createClass(DelayBurningCursedMagnifyingGlass, [{ key: "isViable", value:

    function isViable() {
      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.item) == 0) {
        return false;
      }

      // Force it to be available for lobster
      if (
      (0,external_kolmafia_namespaceObject.getProperty)("sidequestLighthouseCompleted") == "none" &&
      (0,external_kolmafia_namespaceObject.availableAmount)(this.lobsterBarrels) < 5)
      {
        return false;
      }

      return true;
    } }, { key: "isViableAsCombatReplacer", value:

    function isViableAsCombatReplacer() {
      return false;
    } }, { key: "isFree", value:

    function isFree() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_voidFreeFights")) < 5;
    } }, { key: "readyIn", value:

    function readyIn() {
      return 13 - (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("cursedMagnifyingGlassCount"));
    } }, { key: "doSetup", value:

    function doSetup() {} }, { key: "doFightSetup", value:

    function doFightSetup() {
      (0,external_kolmafia_namespaceObject.equip)(external_kolmafia_namespaceObject.Slot.get("Off-Hand"), this.item);

      return [external_kolmafia_namespaceObject.Slot.get("Off-Hand")];
    } }]);return DelayBurningCursedMagnifyingGlass;}();
;// CONCATENATED MODULE: ./src/iotms/delayburners/DelayBurners.ts
function DelayBurners_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = DelayBurners_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function DelayBurners_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return DelayBurners_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return DelayBurners_arrayLikeToArray(o, minLen);}function DelayBurners_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function DelayBurners_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function DelayBurners_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function DelayBurners_createClass(Constructor, protoProps, staticProps) {if (protoProps) DelayBurners_defineProperties(Constructor.prototype, protoProps);if (staticProps) DelayBurners_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function DelayBurners_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var DelayBurners = /*#__PURE__*/function () {function DelayBurners() {DelayBurners_classCallCheck(this, DelayBurners);}DelayBurners_createClass(DelayBurners, null, [{ key: "getDelays", value:


    function getDelays() {
      if (this.delays != null) {
        return this.delays;
      }

      this.delays = [
      new DelayBurningKramco(),
      new DelayBurningVoter(),
      new DelayBurningCursedMagnifyingGlass()].
      filter((d) => d.isViable());var _iterator = DelayBurners_createForOfIteratorHelper(

      this.delays),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var delay = _step.value;
          delay.doSetup();
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

      return this.delays;
    } }, { key: "getDelayBurners", value:

    function getDelayBurners() {
      return this.getDelays().filter((d) => d.isViable());
    } }, { key: "getReadyDelayBurner", value:

    function getReadyDelayBurner() {var freeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var burner = this.getDelayBurner(freeOnly);

      if (burner == null || burner.readyIn() > 0) {
        return null;
      }

      return burner;
    } }, { key: "isDelayBurnerReady", value:

    function isDelayBurnerReady() {var freeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var burner = this.getDelayBurner(freeOnly);

      return burner != null && burner.readyIn() <= 0;
    } }, { key: "tryReplaceCombats", value:

    function tryReplaceCombats() {
      var delays = this.getDelays().
      filter((d) => d.isViable() && d.isViableAsCombatReplacer()).
      sort((d1, d2) => d1.readyIn() - d2.readyIn());

      var toReturn = delays.find((d) => d.isFree());

      if (toReturn == null) {
        toReturn = delays[0];
      }

      if (toReturn == null) {
        return;
      }

      return toReturn.doFightSetup();
    } }, { key: "isDelayBurnerFeasible", value:

    function isDelayBurnerFeasible() {
      return this.getDelayBurners().find((d) => d.readyIn() < 20) != null;
    } }, { key: "getDelayBurner", value:

    function getDelayBurner() {var freeOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var delays = this.getDelays().
      filter((d) => d.isViable() && (d.isFree() || freeOnly)).
      sort((d1, d2) => d1.readyIn() - d2.readyIn());

      var toReturn = delays.find((d) => d.isFree());

      if (toReturn == null) {
        toReturn = delays[0];
      }

      return toReturn;
    } }]);return DelayBurners;}();DelayBurners_defineProperty(DelayBurners, "delays", void 0);
;// CONCATENATED MODULE: ./src/quests/council/beanstalk/QuestL10GiantGround.ts
function QuestL10GiantGround_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL10GiantGround_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL10GiantGround_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL10GiantGround_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL10GiantGround_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL10GiantGround_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








var QuestL10GiantGround = /*#__PURE__*/function () {function QuestL10GiantGround() {QuestL10GiantGround_classCallCheck(this, QuestL10GiantGround);QuestL10GiantGround_defineProperty(this, "boning",
    external_kolmafia_namespaceObject.Item.get("electric boning knife"));QuestL10GiantGround_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get(
    "The Castle in the Clouds in the Sky (Ground Floor)"));QuestL10GiantGround_defineProperty(this, "toAbsorb", void 0);}QuestL10GiantGround_createClass(QuestL10GiantGround, [{ key: "isDelayBurning", value:



    function isDelayBurning() {
      return (
        (0,external_kolmafia_namespaceObject.availableAmount)(this.boning) > 0 &&
        this.toAbsorb.length == 0 &&
        this.loc.turnsSpent < 11);

    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.boning) == 0) {
        outfit.setNoCombat();
      } else {
        outfit.setPlusCombat();
      }

      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          var props = new PropertyManager();
          var hasBone = (0,external_kolmafia_namespaceObject.availableAmount)(this.boning) > 0;

          if (this.isDelayBurning()) {
            var ready = DelayBurners.getReadyDelayBurner();

            if (ready != null) {
              ready.doFightSetup();
            } else {
              DelayBurners.tryReplaceCombats();
            }
          } else if (this.toAbsorb.length == 0) {
            DelayBurners.tryReplaceCombats();
          }

          try {
            props.setChoice(672, hasBone ? 2 : 1);
            props.setChoice(673, hasBone ? 2 : 1);
            props.setChoice(674, hasBone ? 2 : 1);
            props.setChoice(1026, hasBone ? 3 : 2);

            greyAdv(this.loc, outfit);
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Council / Beanstalk / Ground";
    } }, { key: "level", value:

    function level() {
      return 8;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL10Garbage");

      if (status < 8) {
        return QuestStatus.NOT_READY;
      }

      if (status > 8) {
        return QuestStatus.COMPLETED;
      }

      if (this.isDelayBurning()) {
        if (DelayBurners.isDelayBurnerReady()) {
          return QuestStatus.READY;
        }

        if (DelayBurners.isDelayBurnerFeasible()) {
          return QuestStatus.FASTER_LATER;
        }
      }

      return QuestStatus.READY;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }]);return QuestL10GiantGround;}();
;// CONCATENATED MODULE: ./src/quests/council/beanstalk/QuestL10GiantBasement.ts
function QuestL10GiantBasement_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL10GiantBasement_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL10GiantBasement_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL10GiantBasement_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL10GiantBasement_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL10GiantBasement_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestL10GiantBasement = /*#__PURE__*/function () {






  // TODO Once we've got the absorbs, try replace combats if it doesn't interfere with our slots cos umbrella

  function QuestL10GiantBasement() {QuestL10GiantBasement_classCallCheck(this, QuestL10GiantBasement);QuestL10GiantBasement_defineProperty(this, "amulet", external_kolmafia_namespaceObject.Item.get("Amulet of Extreme Plot Significance"));QuestL10GiantBasement_defineProperty(this, "umbrella", external_kolmafia_namespaceObject.Item.get("Titanium Assault Umbrella"));QuestL10GiantBasement_defineProperty(this, "dumbell", external_kolmafia_namespaceObject.Item.get("Massive Dumbbell"));QuestL10GiantBasement_defineProperty(this, "loc", external_kolmafia_namespaceObject.Location.get("The Castle in the Clouds in the Sky (Basement)"));
    var umbrella = external_kolmafia_namespaceObject.Item.get("Unbreakable Umbrella");

    if ((0,external_kolmafia_namespaceObject.availableAmount)(umbrella) > 0) {
      this.umbrella = umbrella; // They replace!
    }
  }QuestL10GiantBasement_createClass(QuestL10GiantBasement, [{ key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setNoCombat();

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.umbrella) > 0) {
        outfit.addItem(this.umbrella);
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.amulet) > 0) {
        outfit.addBonus("+equip " + this.amulet.name);
        //      outfit.addItem(this.amulet);
      }

      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          var props = new PropertyManager();

          try {
            // Do umbrella
            props.setChoice(669, 1);

            // If have amulet otherwise grab dumbbell (or skips it)
            if ((0,external_kolmafia_namespaceObject.equippedAmount)(this.amulet) > 0) {
              props.setChoice(670, 4);
            } else {
              props.setChoice(670, 1);
            }

            if ((0,external_kolmafia_namespaceObject.availableAmount)(this.dumbell) > 0) {
              props.setChoice(671, 1);
            } else {
              // Go to gym
              props.setChoice(671, 4);
            }

            greyAdv(this.loc, outfit);
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Council / Beanstalk / Basement";
    } }, { key: "level", value:

    function level() {
      return 8;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL10Garbage");

      if (status < 7) {
        return QuestStatus.NOT_READY;
      }

      if (status > 7) {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }]);return QuestL10GiantBasement;}();
;// CONCATENATED MODULE: ./src/quests/council/beanstalk/QuestL10GiantTop.ts
function QuestL10GiantTop_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL10GiantTop_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL10GiantTop_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL10GiantTop_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL10GiantTop_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL10GiantTop_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestL10GiantTop = /*#__PURE__*/function () {function QuestL10GiantTop() {QuestL10GiantTop_classCallCheck(this, QuestL10GiantTop);QuestL10GiantTop_defineProperty(this, "modelAirShip",
    external_kolmafia_namespaceObject.Item.get("Model airship"));QuestL10GiantTop_defineProperty(this, "wig",
    external_kolmafia_namespaceObject.Item.get("Mohawk Wig"));QuestL10GiantTop_defineProperty(this, "record",
    external_kolmafia_namespaceObject.Item.get("drum 'n' bass 'n' drum 'n' bass record"));QuestL10GiantTop_defineProperty(this, "rocketToStars",
    external_kolmafia_namespaceObject.Item.get("steam-powered model rocketship"));QuestL10GiantTop_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get(
    "The Castle in the Clouds in the Sky (Top Floor)"));QuestL10GiantTop_defineProperty(this, "steamNC",

    677);QuestL10GiantTop_defineProperty(this, "raverNC",
    676);QuestL10GiantTop_defineProperty(this, "punkNC",
    678);QuestL10GiantTop_defineProperty(this, "gothNC",
    675);}QuestL10GiantTop_createClass(QuestL10GiantTop, [{ key: "run", value:

    // TODO Once we've got the absorbs, try replace combats

    function run() {
      var outfit = new GreyOutfit().setNoCombat();

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.wig) > 0) {
        outfit.addItem(this.wig);
      }

      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          var props = new PropertyManager();

          try {
            // Goth and steam love each other
            if ((0,external_kolmafia_namespaceObject.availableAmount)(this.modelAirShip) > 0) {
              props.setChoice(this.steamNC, 1); // Use model ship
              props.setChoice(this.gothNC, 4); // Crawl to copper
            } else if ((0,external_kolmafia_namespaceObject.availableAmount)(this.record) > 0) {
              // We have the record, lets end this.
              props.setChoice(this.steamNC, 4); // Crawl to goth
              props.setChoice(this.gothNC, 2); // Grab record
            } else if ((0,external_kolmafia_namespaceObject.availableAmount)(this.rocketToStars) == 0) {
              // We don't have airship or record, to avoid fighting lets just grab the rocket if we can
              props.setChoice(this.steamNC, 2); // Grab rocket
              props.setChoice(this.gothNC, 4); // Crawl to steam
            } else {
              // This adv is a waste, just fight.
              props.setChoice(this.steamNC, 1); // Fight steam
              props.setChoice(this.gothNC, 1); // Fight goth
            }

            // Punk and raver love each other
            if ((0,external_kolmafia_namespaceObject.equippedAmount)(this.wig) > 0) {
              // If we can end this with the wig
              props.setChoice(this.punkNC, 1); // Use wig
              props.setChoice(this.raverNC, 4); // Crawl to punk rock
            } else if ((0,external_kolmafia_namespaceObject.availableAmount)(this.record) == 0) {
              // If we can grab a record
              props.setChoice(this.punkNC, 4); // Crawl to raver
              props.setChoice(this.raverNC, 3); // Grab record
            } else {
              // We're going to waste an adventure
              props.setChoice(this.punkNC, 4); // Crawl to raver
              props.setChoice(this.raverNC, 1); // Fight the raver for their advs
            }

            props.setChoice(679, 1); // Turn dat wheel

            greyAdv(this.loc, outfit);

            if ((0,external_kolmafia_namespaceObject.lastChoice)() == 679) {
              (0,external_kolmafia_namespaceObject.council)();
            }
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Council / Beanstalk / Top";
    } }, { key: "level", value:

    function level() {
      return 10;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL10Garbage");

      if (status < 9) {
        return QuestStatus.NOT_READY;
      }

      if (status > 9) {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }]);return QuestL10GiantTop;}();
;// CONCATENATED MODULE: ./src/quests/council/QuestL10Giants.ts
function QuestL10Giants_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL10Giants_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL10Giants_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL10Giants_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL10Giants_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL10Giants_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var QuestL10Beanstalk = /*#__PURE__*/function () {



  function QuestL10Beanstalk() {QuestL10Giants_classCallCheck(this, QuestL10Beanstalk);QuestL10Giants_defineProperty(this, "bean", external_kolmafia_namespaceObject.Item.get("Enchanted Bean"));QuestL10Giants_defineProperty(this, "children", []);
    this.children.push(new QuestL10GiantShip());
    this.children.push(new QuestL10GiantGround());
    this.children.push(new QuestL10GiantBasement());
    this.children.push(new QuestL10GiantTop());
  }QuestL10Giants_createClass(QuestL10Beanstalk, [{ key: "getChildren", value:

    function getChildren() {
      return this.children;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "level", value:

    function level() {
      return 10;
    } }, { key: "getId", value:

    function getId() {
      return "Council / Beanstalk / EnchantedBean";
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL10Garbage");

      if (status < 0) {
        return QuestStatus.NOT_READY;
      }

      if (status > 0 && status < 10) {
        return QuestStatus.NOT_READY;
      }

      if (status > 10) {
        return QuestStatus.COMPLETED;
      }

      if (status == 0 && (0,external_kolmafia_namespaceObject.availableAmount)(this.bean) == 0) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      // Use bean if we need to
      var status = getQuestStatus("questL10Garbage");

      if (status == 0) {
        return {
          location: null,
          run: () => {
            (0,external_kolmafia_namespaceObject.use)(external_kolmafia_namespaceObject.Item.get("Enchanted Bean"));
          } };

      }

      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.council)();
        } };

    } }]);return QuestL10Beanstalk;}();var


GiantStatus;(function (GiantStatus) {GiantStatus["unstarted"] = "unstarted";GiantStatus["started"] = "started";GiantStatus["step1"] = "PLANTED_BEAN";GiantStatus["step2"] = "LOOKING_SHIP_WADS";GiantStatus["step3"] = "TISSUE_WAD";GiantStatus["step4"] = "TIN_WAD";GiantStatus["step5"] = "GAUZE_WAD";GiantStatus["step6"] = "PLASTIC_WAD";GiantStatus["step7"] = "BASEMENT";GiantStatus["step8"] = "GROUND_FLOOR";GiantStatus["step9"] = "TOP_FLOOR";GiantStatus["step10"] = "TURNED_WHEEL";GiantStatus["finished"] = "finished";})(GiantStatus || (GiantStatus = {}));
;// CONCATENATED MODULE: ./src/utils/LatteUtils.ts
function LatteUtils_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = LatteUtils_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function LatteUtils_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return LatteUtils_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return LatteUtils_arrayLikeToArray(o, minLen);}function LatteUtils_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var LatteFlavor;



















// Map of kol latte names, to mafia latte names
(function (LatteFlavor) {LatteFlavor["FAM_EXP"] = "vitamins";LatteFlavor["ITEM_DROP"] = "carrot";LatteFlavor["COLD_DAMAGE"] = "blue chalks";LatteFlavor["MEAT_DROP"] = "cajun";LatteFlavor["FAM_WEIGHT"] = "rawhide";LatteFlavor["PVP_FIGHTS"] = "hellion";LatteFlavor["PLUS_COMBAT"] = "hot wing";LatteFlavor["MINUS_COMBAT"] = "ink";LatteFlavor["MP_5_REGEN"] = "carrrdamom";LatteFlavor["MP_10_REGEN"] = "lizard milk";LatteFlavor["HOT_RESIST"] = "chili seeds";LatteFlavor["COLD_RESIST"] = "cocoa powder";LatteFlavor["SLEAZE_RESIST"] = "white flour";LatteFlavor["SPOOKY_RESIST"] = "squamous salt";LatteFlavor["STENCH_RESIST"] = "clove";LatteFlavor["FAMILIAR_WEIGHT"] = "rawhide";LatteFlavor["UNKNOWN"] = "";})(LatteFlavor || (LatteFlavor = {}));var latteAliases = new Map([["fortified", "vitamins"]]);

function getFlavors() {
  var page = (0,external_kolmafia_namespaceObject.visitUrl)("main.php?latte=1", false);
  var flavors = [];var _iterator = LatteUtils_createForOfIteratorHelper(

  page.split(
  '<td valign="top" style="border-bottom: 1px solid black"></td>')),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;)
    {var spl = _step.value;
      var match = spl.match(
      /<input  type="radio" name="l([123])" checked value="[a-zA-Z0-9\/+]+">[a-zA-z- ]+<\/td>/);


      if (match == null) {
        continue;
      }

      var level = (0,external_kolmafia_namespaceObject.toInt)(match[1]);
      match = spl.match(
      /<input  type="radio" name="l1" (?:checked)? value="[a-zA-Z0-9\/+]+"> *([a-zA-z- ]+?) *<\/td>/);


      flavors[level - 1] = match[1];
    }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

  return flavors;
}

function getCurrentLatteFlavors() {
  var knownFlavors = (0,external_kolmafia_namespaceObject.getProperty)("_latteFlavors");

  if (knownFlavors.startsWith((0,external_kolmafia_namespaceObject.getProperty)("latteModifier") + "|")) {
    return knownFlavors.
    substring(knownFlavors.lastIndexOf("|") + 1).
    split(",");
  }

  var getEnum = (flavor) => {
    flavor = flavor.toLowerCase();

    if (latteAliases.has(flavor)) {
      flavor = latteAliases.get(flavor);
    }

    for (var _i = 0, _Object$values = Object.values(LatteFlavor); _i < _Object$values.length; _i++) {var v = _Object$values[_i];
      if (flavor != v) {
        continue;
      }

      return v;
    }

    return LatteFlavor.UNKNOWN;
  };

  var flavors = getFlavors();

  for (var i = 0; i < flavors.length; i++) {
    var flav = getEnum(flavors[i]);

    if (flav == LatteFlavor.UNKNOWN) {
      throw "Unknown Latte Flavor " + flavors[i] + "! Please add the alias.";
    }

    flavors[i] = flav;
  }

  (0,external_kolmafia_namespaceObject.setProperty)(
  "_latteFlavors",
  (0,external_kolmafia_namespaceObject.getProperty)("latteModifier") + "|" + flavors.join(","));


  return flavors;
}

function hasUnlockedLatteFlavor(drink) {
  return (0,external_kolmafia_namespaceObject.getProperty)("latteUnlocks").split(",").includes(drink);
}

function setupLatte(
flavor1,
flavor2,
flavor3)
{}
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/QuestL11Black.ts
function QuestL11Black_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestL11Black_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestL11Black_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestL11Black_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestL11Black_arrayLikeToArray(o, minLen);}function QuestL11Black_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestL11Black_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11Black_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11Black_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11Black_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11Black_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11Black_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








var QuestL11Black = /*#__PURE__*/function () {function QuestL11Black() {QuestL11Black_classCallCheck(this, QuestL11Black);QuestL11Black_defineProperty(this, "boots",
    external_kolmafia_namespaceObject.Item.get("Blackberry Galoshes"));QuestL11Black_defineProperty(this, "beehive",
    external_kolmafia_namespaceObject.Item.get("Beehive"));QuestL11Black_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get("The Black Forest"));QuestL11Black_defineProperty(this, "latte",
    external_kolmafia_namespaceObject.Item.get("Latte lovers member's mug"));QuestL11Black_defineProperty(this, "blackbird",
    external_kolmafia_namespaceObject.Item.get("reassembled blackbird"));QuestL11Black_defineProperty(this, "dontBanish",
    ["Black Adder", "Black Panther"].map((s) =>
    external_kolmafia_namespaceObject.Monster.get(s)));QuestL11Black_defineProperty(this, "toAbsorb", void 0);QuestL11Black_defineProperty(this, "blackberry",


    external_kolmafia_namespaceObject.Item.get("Blackberry"));}QuestL11Black_createClass(QuestL11Black, [{ key: "level", value:

    function level() {
      return 11;
    } }, { key: "shouldWearLatte", value:

    function shouldWearLatte() {
      return (
        (0,external_kolmafia_namespaceObject.availableAmount)(this.latte) > 0 &&
        !hasUnlockedLatteFlavor(LatteFlavor.MEAT_DROP));

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }, { key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Black";
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Black");

      if (status < 0) {
        return QuestStatus.NOT_READY;
      }

      if (status > 1) {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setPlusCombat();

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.boots) > 0) {
        outfit.addItem(this.boots);
      }

      if (this.shouldWearLatte()) {
        outfit.addItem(this.latte);
      }

      var fam;

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.blackbird) == 0) {
        fam = external_kolmafia_namespaceObject.Familiar.get("Reassembled Blackbird");
      }

      return {
        location: this.loc,
        outfit: outfit,
        familiar: fam,
        run: () => {
          var props = new PropertyManager();

          try {
            if ((0,external_kolmafia_namespaceObject.availableAmount)(this.beehive) == 0) {
              props.setChoice(924, 3); // Beezzzz
              props.setChoice(1018, 1);
              props.setChoice(1019, 1);
            } else if (
            (0,external_kolmafia_namespaceObject.availableAmount)(this.boots) == 0 &&
            (0,external_kolmafia_namespaceObject.availableAmount)(this.blackberry) >= 3)
            {
              props.setChoice(924, 2); // Cobble
              props.setChoice(928, 4); // Make boots
            } else {
              props.setChoice(924, 1); // Fight bush
            }

            var settings = new AdventureSettings();

            if ((0,external_kolmafia_namespaceObject.availableAmount)(this.blackbird) == 0) {var _iterator = QuestL11Black_createForOfIteratorHelper(
              this.dontBanish),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var mon = _step.value;
                  settings.addNoBanish(mon);
                }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
            }

            greyAdv(this.loc, outfit, settings);
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "needAdventures", value:

    function needAdventures() {
      return 4;
    } }]);return QuestL11Black;}();
;// CONCATENATED MODULE: ./src/utils/GreyResources.ts
function GreyResources_inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) GreyResources_setPrototypeOf(subClass, superClass);}function GreyResources_setPrototypeOf(o, p) {GreyResources_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return GreyResources_setPrototypeOf(o, p);}function GreyResources_createSuper(Derived) {var hasNativeReflectConstruct = GreyResources_isNativeReflectConstruct();return function _createSuperInternal() {var Super = GreyResources_getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = GreyResources_getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return GreyResources_possibleConstructorReturn(this, result);};}function GreyResources_possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return GreyResources_assertThisInitialized(self);}function GreyResources_assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function GreyResources_isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function GreyResources_getPrototypeOf(o) {GreyResources_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return GreyResources_getPrototypeOf(o);}function GreyResources_slicedToArray(arr, i) {return GreyResources_arrayWithHoles(arr) || GreyResources_iterableToArrayLimit(arr, i) || GreyResources_unsupportedIterableToArray(arr, i) || GreyResources_nonIterableRest();}function GreyResources_nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function GreyResources_iterableToArrayLimit(arr, i) {var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];if (_i == null) return;var _arr = [];var _n = true;var _d = false;var _s, _e;try {for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function GreyResources_arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function GreyResources_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function GreyResources_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = GreyResources_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e2) {throw _e2;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e3) {didErr = true;err = _e3;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function GreyResources_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return GreyResources_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return GreyResources_arrayLikeToArray(o, minLen);}function GreyResources_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function GreyResources_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function GreyResources_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function GreyResources_createClass(Constructor, protoProps, staticProps) {if (protoProps) GreyResources_defineProperties(Constructor.prototype, protoProps);if (staticProps) GreyResources_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}


function GreyResources_getBanishers() {
  // Scrapbook
  // Bowl a curveball
  // Middle finger ring
  // Grey You banisher skill
}

function getYellowRays() {
  // Yellow Rocket
  // 9 Volt battery
}

function getSniffers() {
  // Nosy Nose fam
}

function getCopiers() {
  // Backup Camera
  // Cloning Kit
  // Combat Locket
  // 4-D camera
}

var GreyPulls = /*#__PURE__*/function () {function GreyPulls() {GreyResources_classCallCheck(this, GreyPulls);}GreyResources_createClass(GreyPulls, null, [{ key: "pullFratWarOutfit", value:
    function pullFratWarOutfit() {var _iterator = GreyResources_createForOfIteratorHelper(
      (0,external_kolmafia_namespaceObject.outfitPieces)("Frat Warrior Fatigues")),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var i = _step.value;
          if ((0,external_kolmafia_namespaceObject.availableAmount)(i) > 0) {
            continue;
          }

          GreyPulls.tryPull(i);
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
    } }, { key: "pullDeckOfLewdCards", value:

    function pullDeckOfLewdCards() {
      GreyPulls.tryPull(external_kolmafia_namespaceObject.Item.get("deck of lewd playing cards"));
    } }, { key: "pullLynrdProtesters", value:

    function pullLynrdProtesters() {var _iterator2 = GreyResources_createForOfIteratorHelper(
      [
      "lynyrdskin breeches",
      "lynyrdskin cap",
      "lynyrdskin tunic"].
      map((s) => external_kolmafia_namespaceObject.Item.get(s))),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var i = _step2.value;
          GreyPulls.tryPull(i);
        }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}
    } }, { key: "pullBoxOfMatches", value:

    function pullBoxOfMatches() {
      GreyPulls.tryPull(external_kolmafia_namespaceObject.Item.get("book of matches"));
    } }, { key: "pullStartingGear", value:

    function pullStartingGear() {
      GreyPulls.tryPull(external_kolmafia_namespaceObject.Item.get("yule hatchet"));
      GreyPulls.tryPull(external_kolmafia_namespaceObject.Item.get("mafia thumb ring"));

      if ((0,external_kolmafia_namespaceObject.storageAmount)(external_kolmafia_namespaceObject.Item.get("HOA regulation book")) > 0) {
        GreyPulls.tryPull(external_kolmafia_namespaceObject.Item.get("HOA regulation book"));
      } else {
        GreyPulls.tryPull(external_kolmafia_namespaceObject.Item.get("Space Trip safety headphones"));
      }

      GreyPulls.tryPull(external_kolmafia_namespaceObject.Item.get("Hemlock Helm"));
      GreyPulls.tryPull(external_kolmafia_namespaceObject.Item.get('"Remember the Trees" Shirt'));
    } }, { key: "pullNinjaGear", value:

    function pullNinjaGear() {
      GreyPulls.tryPull(external_kolmafia_namespaceObject.Item.get("ninja rope"));
      GreyPulls.tryPull(external_kolmafia_namespaceObject.Item.get("ninja crampons"));
      GreyPulls.tryPull(external_kolmafia_namespaceObject.Item.get("ninja carabiner"));
    } }, { key: "pullScrip", value:

    function pullScrip() {
      GreyPulls.tryPull(external_kolmafia_namespaceObject.Item.get("Shore Inc. Ship Trip Scrip"));
    } }, { key: "pullSmut", value:

    function pullSmut() {
      GreyPulls.tryPull(external_kolmafia_namespaceObject.Item.get("smut orc keepsake box"));
    } }, { key: "pullEnchantedBean", value:

    function pullEnchantedBean() {
      GreyPulls.tryPull(external_kolmafia_namespaceObject.Item.get("enchanted bean"));
    } }, { key: "pullMeatBuffers", value:

    function pullMeatBuffers() {
      GreyPulls.tryPull(external_kolmafia_namespaceObject.Item.get("Mick's IcyVapoHotness Inhaler"));
    } }, { key: "pullOre", value:

    function pullOre() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questL08Trapper") != "step1") {
        return;
      }

      var ore = external_kolmafia_namespaceObject.Item.get((0,external_kolmafia_namespaceObject.getProperty)("trapperOre"));

      if (ore == external_kolmafia_namespaceObject.Item.get("none") || (0,external_kolmafia_namespaceObject.availableAmount)(ore) >= 3) {
        return;
      }

      this.tryPull(ore);
    } }, { key: "pullZappableKey", value:

    function pullZappableKey() {
      var items = getZappables(external_kolmafia_namespaceObject.Item.get("Jarlsberg's key")).filter(
      (i) => !i.quest);var _iterator3 = GreyResources_createForOfIteratorHelper(


      items),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var i = _step3.value;
          if ((0,external_kolmafia_namespaceObject.storageAmount)(i) <= 0) {
            continue;
          }

          this.tryPull(i);
          return;
        }} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}

      items.sort((i1, i2) => (0,external_kolmafia_namespaceObject.mallPrice)(i1) - (0,external_kolmafia_namespaceObject.mallPrice)(i2));

      this.tryPull(items[0]);
    } }, { key: "pullRatTangles", value:

    function pullRatTangles() {
      GreyPulls.tryPull(external_kolmafia_namespaceObject.Item.get("tangle of rats tails"));
    } }, { key: "pullGiantsCastle", value:

    function pullGiantsCastle() {var _iterator4 = GreyResources_createForOfIteratorHelper(
      ["Mohawk Wig", "Amulet of Extreme Plot Significance"].map(
      (s) => external_kolmafia_namespaceObject.Item.get(s))),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;)
        {var s = _step4.value;
          if ((0,external_kolmafia_namespaceObject.availableAmount)(s) > 0) {
            continue;
          }

          GreyPulls.tryPull(s);
        }} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}
    } }, { key: "pullRusty", value:

    function pullRusty() {
      GreyPulls.tryPull(external_kolmafia_namespaceObject.Item.get("rusty hedge trimmers"));
    } }, { key: "pullStarChart", value:

    function pullStarChart() {
      GreyPulls.tryPull(external_kolmafia_namespaceObject.Item.get("Star Chart"));
    } }, { key: "tryPull", value:

    function tryPull(item) {var maxCost = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30000;
      if ((0,external_kolmafia_namespaceObject.storageAmount)(item) == 0) {
        (0,external_kolmafia_namespaceObject.buyUsingStorage)(item, 1, maxCost);
      }

      if ((0,external_kolmafia_namespaceObject.storageAmount)(item) == 0) {
        throw "Unable to pull " + item.name;
      }

      (0,external_kolmafia_namespaceObject.cliExecute)("pull " + item.name);
    } }]);return GreyPulls;}();


var GreyClovers = /*#__PURE__*/function () {function GreyClovers() {GreyResources_classCallCheck(this, GreyClovers);}GreyResources_createClass(GreyClovers, null, [{ key: "doOres", value:


    function doOres() {
      // 2
      (0,external_kolmafia_namespaceObject.use)(this.clover);
    } }, { key: "doWand", value:

    function doWand() {
      // 1
      (0,external_kolmafia_namespaceObject.use)(this.clover);
    } }]);return GreyClovers;}();GreyResources_defineProperty(GreyClovers, "clover", external_kolmafia_namespaceObject.Item.get("11-leaf Clover"));


var GreyVortex = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {function GreyVortex() {GreyResources_classCallCheck(this, GreyVortex);}GreyResources_createClass(GreyVortex, null, [{ key: "doBatCave", value:
    function doBatCave() {
      // 20
    } }, { key: "doHarem", value:

    function doHarem() {
      // 20
    } }, { key: "doHiddenTemple", value:

    function doHiddenTemple() {
      // 20
    } }, { key: "doSmutOrcs", value:

    function doSmutOrcs() {
      // 20
    } }, { key: "doCrypt", value:

    function doCrypt() {
      // 20
    } }]);return GreyVortex;}()));


var GreyCombatLocket = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {function GreyCombatLocket() {GreyResources_classCallCheck(this, GreyCombatLocket);}GreyResources_createClass(GreyCombatLocket, null, [{ key: "doSystemSweep", value:
    function doSystemSweep() {} }, { key: "doInfiniteLoop", value:

    function doInfiniteLoop() {} }, { key: "doFantasyBandit", value:

    function doFantasyBandit() {} }, { key: "doMountainMan", value:

    function doMountainMan() {} }]);return GreyCombatLocket;}()));


function getZappables(item) {
  var items = [];

  Object.keys((0,external_kolmafia_namespaceObject.getRelated)(item, "zap")).forEach((s) => {
    var i = external_kolmafia_namespaceObject.Item.get(s);

    if (items.includes(i)) {
      return;
    }

    items.push(i);
  });

  return items;
}var

Required;(function (Required) {Required["MUST"] = "You must have this";Required["VERY_USEFUL"] = "I'd prefer if you had this";Required["USEFUL"] = "Very useful, but can skip";Required["MINOR"] = "Minor, can skip";Required["NOTE"] = "";})(Required || (Required = {}));







var GreyRequirements = /*#__PURE__*/function () {function GreyRequirements() {GreyResources_classCallCheck(this, GreyRequirements);}GreyResources_createClass(GreyRequirements, [{ key: "hasRequired", value:
    function hasRequired() {
      var dontHave = [];

      if (!(0,external_kolmafia_namespaceObject.haveFamiliar)(external_kolmafia_namespaceObject.Familiar.get("Grey Goose"))) {
        dontHave.push([
        "Grey Goose, why even play this path without it",
        Required.MUST]);

      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Combat Lover's Locket")) == 0) {
        dontHave.push([
        "Combat Lovers Locket, currently hardcoded",
        Required.MUST]);

      } else {
        dontHave.push([
        "Combat Lovers Locket - Make sure you have 'Pygmy witch lawyer' & 'Fantasy Bandit' in it!",
        Required.NOTE]);

      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("industrial fire extinguisher")) == 0) {
        dontHave.push([
        "industrial fire extinguisher, minor, but hardcoded so a must",
        Required.MUST]);

      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("backup camera")) == 0) {
        dontHave.push(["Backup Camera", Required.MUST]);
      }

      if (
      (0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("unwrapped knock-off retro superhero cape")) == 0)
      {
        dontHave.push([
        "unwrapped knock-off retro superhero cape, currently hardcoded",
        Required.MUST]);

      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("maydayContractOwned") == "true") {
        dontHave.push([
        "Can't see if you own the mayday supply, but..",
        Required.USEFUL]);

      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Unbreakable Umbrella")) == 0) {
        dontHave.push([
        "Unbreakable Umbrella - Current hardcoded, so a must",
        Required.MUST]);

      }

      if (
      (0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Cosmic Bowling Ball")) == 0 &&
      (0,external_kolmafia_namespaceObject.getProperty)("cosmicBowlingBallReturnCombats") == "-1")
      {
        dontHave.push(["Cosmic Bowling Ball", Required.VERY_USEFUL]);
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("miniature crystal ball")) == 0) {
        dontHave.push(["miniature crystal ball", Required.MUST]);
      }

      if (!(0,external_kolmafia_namespaceObject.haveFamiliar)(external_kolmafia_namespaceObject.Familiar.get("Short Order Cook"))) {
        dontHave.push([
        "Short Order Cook - Only useful for the first 10 or so turns though",
        Required.USEFUL]);

      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Clan VIP Lounge key")) == 0) {
        dontHave.push(["Clan VIP Invitation", Required.MUST]);
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Familiar Scrapbook")) == 0) {
        dontHave.push(["Familiar Scrapbook", Required.USEFUL]);
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Powerful Glove")) == 0) {
        dontHave.push(["Powerful Glove", Required.VERY_USEFUL]);
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Cursed Magnifying Glass")) == 0) {
        dontHave.push([
        "Cursed Magnifying Glass, only really used for lobsters currently",
        Required.MINOR]);

      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Cargo Cultist Shorts")) == 0) {
        dontHave.push([
        "Cargo Cultist Shorts, does save 5? turns",
        Required.MINOR]);

      }

      if (
      (0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("HOA regulation book")) +
      (0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Space Trip safety headphones")) ==
      0)
      {
        dontHave.push([
        "Need one of: HOA regulation book || Space Trip safety headphones, they save you 10+ turns",
        Required.VERY_USEFUL]);

      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Mafia Thumb Ring")) == 0) {
        dontHave.push(["Mafia Thumb Ring", Required.MUST]);
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Yule Hatchet")) == 0) {
        dontHave.push(["Yule Hatchet (Come on, its cheap)", Required.MUST]);
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Deck of lewd playing cards")) == 0) {
        dontHave.push(["Deck of lewd playing cards", Required.USEFUL]);
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("SongBoom&trade; BoomBox")) == 0) {
        dontHave.push(["SongBoom&trade; BoomBox", Required.MINOR]);
      }

      for (var _i = 0, _dontHave = dontHave; _i < _dontHave.length; _i++) {var _dontHave$_i = GreyResources_slicedToArray(_dontHave[_i], 2),name = _dontHave$_i[0],required = _dontHave$_i[1];
        var color = "green";

        if (required == Required.MUST) {
          color = "red";
        } else if (required == Required.VERY_USEFUL) {
          color = "orange";
        } else if (required == Required.USEFUL) {
          color = "blue";
        } else if (required == Required.MINOR) {
          color = "gray";
        }

        (0,external_kolmafia_namespaceObject.print)(name + (required.length > 0 ? " = " + required : ""), color);
      }

      (0,external_kolmafia_namespaceObject.print)("End Requirements.");
      // TODO Camelcalf?
    } }]);return GreyRequirements;}();


/**
 * Limited usage resources
 */
var ResourceType;(function (ResourceType) {ResourceType[ResourceType["PULL"] = 0] = "PULL";ResourceType[ResourceType["BACKUP_CAMERA"] = 1] = "BACKUP_CAMERA";ResourceType[ResourceType["COMBAT_LOCKET"] = 2] = "COMBAT_LOCKET";ResourceType[ResourceType["CARGO_SHORTS"] = 3] = "CARGO_SHORTS";ResourceType[ResourceType["POWERFUL_GLOVE"] = 4] = "POWERFUL_GLOVE";ResourceType[ResourceType["FIRE_EXTINGUSHER"] = 5] = "FIRE_EXTINGUSHER";})(ResourceType || (ResourceType = {}));








var ResourceClaim = /*#__PURE__*/function () {





  function ResourceClaim(
  resource,
  amount,
  reason,
  turnsSaved)
  {GreyResources_classCallCheck(this, ResourceClaim);GreyResources_defineProperty(this, "amountDesired", void 0);GreyResources_defineProperty(this, "resource", void 0);GreyResources_defineProperty(this, "reason", void 0);GreyResources_defineProperty(this, "turnsSaved", void 0);
    this.amountDesired = amount;
    this.resource = resource;
    this.reason = reason;
    this.turnsSaved = turnsSaved;
  }GreyResources_createClass(ResourceClaim, [{ key: "isRequired", value:

    function isRequired() {
      return this.turnsSaved > 100;
    } }], [{ key: "getResourcesLeft", value:

    function getResourcesLeft(resourceType) {
      switch (resourceType) {
        case ResourceType.PULL:
          return GreySettings.isHardcoreMode() ? 0 : (0,external_kolmafia_namespaceObject.pullsRemaining)();
        case ResourceType.BACKUP_CAMERA:
          return (0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Backup Camera")) > 0 ?
          11 - (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_backUpUses")) :
          0;
        case ResourceType.COMBAT_LOCKET:
          return (0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Combat Lover's Locket")) > 0 ?
          3 -
          (0,external_kolmafia_namespaceObject.getProperty)("_locketMonstersFought").
          split(",").
          filter((s) => s.length > 0).length :
          0;
        case ResourceType.CARGO_SHORTS:
          return (0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Cargo Cultist Shorts")) == 0 ||
          (0,external_kolmafia_namespaceObject.getProperty)("_cargoPocketEmptied") == "true" ?
          0 :
          1;
        case ResourceType.POWERFUL_GLOVE:
          return (0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Powerful Glove")) > 0 ?
          100 - (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_powerfulGloveBatteryPowerUsed")) :
          0;
        case ResourceType.FIRE_EXTINGUSHER:
          return (0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("industrial fire extinguisher")) > 0 ?
          (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_fireExtinguisherCharge")) :
          0;
        default:
          throw (
            "No idea what the resource " + ResourceType[resourceType] + " is.");}


    } }]);return ResourceClaim;}();


var ResourcePullClaim = /*#__PURE__*/(/* unused pure expression or super */ null && (function (_ResourceClaim) {GreyResources_inherits(ResourcePullClaim, _ResourceClaim);var _super = GreyResources_createSuper(ResourcePullClaim);


  function ResourcePullClaim(item, reason, turnsSaved) {var _this;GreyResources_classCallCheck(this, ResourcePullClaim);
    _this = _super.call(this, 1, ResourceType.PULL, reason, turnsSaved);GreyResources_defineProperty(GreyResources_assertThisInitialized(_this), "item", void 0);

    _this.item = item;return _this;
  }return GreyResources_createClass(ResourcePullClaim);}(ResourceClaim)));
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/desert/QuestL11DesertCompass.ts
function QuestL11DesertCompass_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11DesertCompass_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11DesertCompass_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11DesertCompass_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11DesertCompass_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11DesertCompass_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var QuestL11DesertCompass = /*#__PURE__*/function () {function QuestL11DesertCompass() {QuestL11DesertCompass_classCallCheck(this, QuestL11DesertCompass);QuestL11DesertCompass_defineProperty(this, "compass",
    external_kolmafia_namespaceObject.Item.get("UV-resistant compass"));}QuestL11DesertCompass_createClass(QuestL11DesertCompass, [{ key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Desert / Compass";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.myAdventures)() < 40) {
        return QuestStatus.NOT_READY;
      }

      if (
      (0,external_kolmafia_namespaceObject.availableAmount)(this.compass) > 0 ||
      (0,external_kolmafia_namespaceObject.getProperty)("questL11Desert") == "finished")
      {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("questL11Desert") == "unstarted") {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          if (GreySettings.isHardcoreMode()) {
            var props = new PropertyManager();

            try {
              props.setChoice(793, 1);

              greyAdv(external_kolmafia_namespaceObject.Location.get("The Shore, Inc. Travel Agency"));
            } finally {
              props.resetAll();
            }
          } else {
            GreyPulls.pullScrip();
          }

          (0,external_kolmafia_namespaceObject.cliExecute)("make " + this.compass.name);

          if ((0,external_kolmafia_namespaceObject.availableAmount)(this.compass) == 0) {
            throw "Compass should've been available!";
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "needAdventures", value:

    function needAdventures() {
      return 3;
    } }]);return QuestL11DesertCompass;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/desert/QuestL11DesertExplore.ts
function QuestL11DesertExplore_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11DesertExplore_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11DesertExplore_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11DesertExplore_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11DesertExplore_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11DesertExplore_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








var QuestL11DesertExplore = /*#__PURE__*/function () {function QuestL11DesertExplore() {QuestL11DesertExplore_classCallCheck(this, QuestL11DesertExplore);QuestL11DesertExplore_defineProperty(this, "hydrated",
    external_kolmafia_namespaceObject.Effect.get("Ultrahydrated"));QuestL11DesertExplore_defineProperty(this, "oasis",
    external_kolmafia_namespaceObject.Location.get("Oasis"));QuestL11DesertExplore_defineProperty(this, "desert",
    external_kolmafia_namespaceObject.Location.get("The Arid, Extra-Dry Desert"));QuestL11DesertExplore_defineProperty(this, "compass",
    external_kolmafia_namespaceObject.Item.get("UV-resistant compass"));QuestL11DesertExplore_defineProperty(this, "knife",
    external_kolmafia_namespaceObject.Item.get("survival knife"));QuestL11DesertExplore_defineProperty(this, "toAbsorb", void 0);QuestL11DesertExplore_defineProperty(this, "camel",

    external_kolmafia_namespaceObject.Familiar.get("Melodramedary"));}QuestL11DesertExplore_createClass(QuestL11DesertExplore, [{ key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Desert / Explore";
    } }, { key: "level", value:

    function level() {
      return 11;
    }

    /*mustBeDone(): boolean {
      if (haveEffect(this.hydrated) == 0) {
        return false;
      }
       if (this.getExploredRemaining() <= 0) {
        return false;
      }
       return true;
    }*/ }, { key: "status", value:



    function status() {
      var status = getQuestStatus("questL11Desert");

      if (status < 0) {
        return QuestStatus.NOT_READY;
      }

      if (status > 0) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.compass) == 0) {
        return QuestStatus.NOT_READY;
      }

      if (
      getQuestStatus("questM20Necklace") < 4 &&
      this.getExplored() > 40 &&
      (0,external_kolmafia_namespaceObject.haveEffect)(this.hydrated) == 0)
      {
        return QuestStatus.FASTER_LATER;
      }

      if ((0,external_kolmafia_namespaceObject.myAdventures)() < 70) {
        //|| !haveEffect(this.hydrated)) {
        return QuestStatus.FASTER_LATER;
      }

      if (
      (0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("Tenuous Grip on Reality")) ||
      (0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("Barking Dogs")))
      {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      if (
      (0,external_canadv_ash_namespaceObject.canAdv)(this.oasis) &&
      (0,external_kolmafia_namespaceObject.haveEffect)(this.hydrated) == 0 &&
      this.getExploredRemaining() > 3)
      {
        return {
          location: this.desert,
          run: () => {
            greyAdv(this.oasis);
          } };

      }

      var outfit = new GreyOutfit();
      outfit.addItem(external_kolmafia_namespaceObject.Item.get("UV-resistant compass")); // Compass
      outfit.addItem(this.knife);

      return {
        outfit: outfit,
        location: this.desert,
        familiar: (0,external_kolmafia_namespaceObject.haveFamiliar)(this.camel) ? this.camel : null,
        disableFamOverride: this.toAbsorb.length == 0 && (0,external_kolmafia_namespaceObject.haveFamiliar)(this.camel),
        run: () => {
          var killing = Macro.if_(
          external_kolmafia_namespaceObject.Effect.get("Tenuous Grip on Reality"),
          Macro.attack().repeat()).
          step(greyKillingBlow(outfit));

          var explored = this.getExplored();

          greyAdv(
          this.desert,
          outfit,
          new AdventureSettings().setFinishingBlowMacro(killing));


          if (explored == this.getExplored()) {
            (0,external_kolmafia_namespaceObject.print)("Checking explored..", "blue");
            (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=desertbeach", false);
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.desert];
    } }, { key: "getExplored", value:

    function getExplored() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("desertExploration"));
    } }, { key: "getExploredRemaining", value:

    function getExploredRemaining() {
      return 100 - this.getExplored();
    } }]);return QuestL11DesertExplore;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/desert/QuestL11DesertGnome.ts
function QuestL11DesertGnome_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11DesertGnome_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11DesertGnome_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11DesertGnome_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11DesertGnome_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11DesertGnome_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestL11DesertGnome = /*#__PURE__*/function () {function QuestL11DesertGnome() {QuestL11DesertGnome_classCallCheck(this, QuestL11DesertGnome);QuestL11DesertGnome_defineProperty(this, "availableProp",
    "_gnasirAvailable");QuestL11DesertGnome_defineProperty(this, "hooks",
    external_kolmafia_namespaceObject.Item.get("worm-riding hooks"));QuestL11DesertGnome_defineProperty(this, "drum",
    external_kolmafia_namespaceObject.Item.get("Drum Machine"));QuestL11DesertGnome_defineProperty(this, "killingJar",
    external_kolmafia_namespaceObject.Item.get("Killing Jar"));QuestL11DesertGnome_defineProperty(this, "rose",
    external_kolmafia_namespaceObject.Item.get("Stone Rose"));}QuestL11DesertGnome_createClass(QuestL11DesertGnome, [{ key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Desert / Gnome";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Desert");

      if (status < 0) {
        return QuestStatus.NOT_READY;
      }

      if (status > 0) {
        return QuestStatus.COMPLETED;
      }

      // Can gnome be turned in
      if (!this.isAvailable()) {
        return QuestStatus.NOT_READY;
      }

      if (this.wantsGnomeKillingJar() && (0,external_kolmafia_namespaceObject.availableAmount)(this.killingJar) > 0) {
        return QuestStatus.READY;
      }

      if (this.wantsGnomePaint() && (0,external_kolmafia_namespaceObject.myMeat)() > 1000) {
        return QuestStatus.READY;
      }

      if (this.wantsGnomeRose() && (0,external_kolmafia_namespaceObject.availableAmount)(this.rose) > 0) {
        return QuestStatus.READY;
      }

      if (this.wantsWormPages() && !this.needsMorePages()) {
        return QuestStatus.READY;
      }

      if (
      this.wantsWormPages() ||
      this.wantsGnomeRose() ||
      this.wantsGnomePaint())
      {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.COMPLETED;
    } }, { key: "run", value:

    function run() {
      if (this.wantsGnomePaint() && (0,external_kolmafia_namespaceObject.myMeat)() >= 1000) {
        return {
          location: null,
          run: () => {
            if ((0,external_kolmafia_namespaceObject.itemAmount)(external_kolmafia_namespaceObject.Item.get("Can of black paint")) == 0) {
              (0,external_kolmafia_namespaceObject.retrieveItem)(external_kolmafia_namespaceObject.Item.get("Can of black paint"));
            }

            (0,external_kolmafia_namespaceObject.print)("Giving gnome their black paint");
            this.turnInItem();
          } };

      }

      if (this.wantsGnomeKillingJar() && (0,external_kolmafia_namespaceObject.availableAmount)(this.killingJar) > 0) {
        return {
          location: null,
          run: () => {
            (0,external_kolmafia_namespaceObject.print)("Giving gnome their killing jar");

            this.turnInItem();
          } };

      }

      if (this.wantsWormPages() && !this.needsMorePages()) {
        return {
          location: null,
          run: () => {
            (0,external_kolmafia_namespaceObject.print)("Giving gnome their pages");
            this.turnInItem();
          } };

      }

      if (this.wantsGnomeRose() && (0,external_kolmafia_namespaceObject.availableAmount)(this.rose) > 0) {
        return {
          location: null,
          run: () => {
            (0,external_kolmafia_namespaceObject.print)("Giving gnome their rose");
            this.turnInItem();
          } };

      }

      throw "Not sure why we got to this state";
    } }, { key: "turnInItem", value:

    function turnInItem() {
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=desertbeach&action=db_gnasir");
      (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?whichchoice=805&option=1&pwd=");
      (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?whichchoice=805&option=2&pwd=");
      (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?whichchoice=805&option=1&pwd=");

      var item = external_kolmafia_namespaceObject.Item.get("desert sightseeing pamphlet");

      if ((0,external_kolmafia_namespaceObject.availableAmount)(item) <= 0) {
        return;
      }

      (0,external_kolmafia_namespaceObject.use)(item, (0,external_kolmafia_namespaceObject.availableAmount)(item));
    } }, { key: "needsMorePages", value:

    function needsMorePages() {
      return (0,external_kolmafia_namespaceObject.itemAmount)(external_kolmafia_namespaceObject.Item.get("Worm-Riding Manual Page")) < 15;
    } }, { key: "isAvailable", value:

    function isAvailable() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("gnasirProgress") != "0") {
        return true;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("lastEncounter") == "A Sietch in Time") {
        (0,external_kolmafia_namespaceObject.setProperty)(this.availableProp, "true");
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)(this.availableProp) == "true") {
        return true;
      }

      if ((0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("desertExploration")) <= 10) {
        return false;
      }

      var page = (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=desertbeach");

      if (!page.includes("place.php?whichplace=desertbeach&action=db_gnasir")) {
        return false;
      }

      (0,external_kolmafia_namespaceObject.setProperty)(this.availableProp, "true");
      return true;
    } }, { key: "getGnome", value:

    function getGnome() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("gnasirProgress"));
    } }, { key: "wantsGnomeRose", value:

    function wantsGnomeRose() {
      return (this.getGnome() & 1) != 1;
    } }, { key: "wantsGnomePaint", value:

    function wantsGnomePaint() {
      return (this.getGnome() & 2) != 2;
    } }, { key: "wantsGnomeKillingJar", value:

    function wantsGnomeKillingJar() {
      return (this.getGnome() & 4) != 4;
    } }, { key: "wantsWormPages", value:

    function wantsWormPages() {
      return (this.getGnome() & 8) != 8;
    } }, { key: "wantsToWormRide", value:

    function wantsToWormRide() {
      return (this.getGnome() & 16) != 16;
    } }]);return QuestL11DesertGnome;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/desert/QuestL11DesertStoneRose.ts
function QuestL11DesertStoneRose_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11DesertStoneRose_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11DesertStoneRose_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11DesertStoneRose_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11DesertStoneRose_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11DesertStoneRose_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestL11DesertStoneRose = /*#__PURE__*/function () {function QuestL11DesertStoneRose() {QuestL11DesertStoneRose_classCallCheck(this, QuestL11DesertStoneRose);QuestL11DesertStoneRose_defineProperty(this, "hydrated",
    external_kolmafia_namespaceObject.Effect.get("Ultrahydrated"));QuestL11DesertStoneRose_defineProperty(this, "oasis",
    external_kolmafia_namespaceObject.Location.get("Oasis"));QuestL11DesertStoneRose_defineProperty(this, "rose",
    external_kolmafia_namespaceObject.Item.get("Stone Rose"));}QuestL11DesertStoneRose_createClass(QuestL11DesertStoneRose, [{ key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Desert / StoneRose";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Desert");

      if (status < 0 || !(0,external_canadv_ash_namespaceObject.canAdv)(this.oasis)) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("_gnasirAvailable") != "true") {
        return QuestStatus.NOT_READY;
      }

      if (status > 0) {
        return QuestStatus.COMPLETED;
      }

      if (!this.wantsGnomeRose() || (0,external_kolmafia_namespaceObject.availableAmount)(this.rose) > 0) {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: this.oasis,
        run: () => {
          greyAdv(this.oasis);
        } };

    } }, { key: "wantsGnomeRose", value:

    function wantsGnomeRose() {
      return (this.getGnome() & 1) != 1;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.oasis];
    } }, { key: "mustBeDone", value:

    function mustBeDone() {
      return (0,external_kolmafia_namespaceObject.haveEffect)(this.hydrated) > 0;
    } }, { key: "getGnome", value:

    function getGnome() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("gnasirProgress"));
    } }]);return QuestL11DesertStoneRose;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/desert/QuestL11DesertWormRide.ts
function QuestL11DesertWormRide_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11DesertWormRide_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11DesertWormRide_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11DesertWormRide_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11DesertWormRide_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11DesertWormRide_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestL11DesertWormRide = /*#__PURE__*/function () {function QuestL11DesertWormRide() {QuestL11DesertWormRide_classCallCheck(this, QuestL11DesertWormRide);QuestL11DesertWormRide_defineProperty(this, "hooks",
    external_kolmafia_namespaceObject.Item.get("worm-riding hooks"));QuestL11DesertWormRide_defineProperty(this, "drum",
    external_kolmafia_namespaceObject.Item.get("Drum Machine"));QuestL11DesertWormRide_defineProperty(this, "oasis",
    external_kolmafia_namespaceObject.Location.get("Oasis"));}QuestL11DesertWormRide_createClass(QuestL11DesertWormRide, [{ key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Desert / WormRide";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Desert");

      if (status < 0 || !this.wantsToWormRide()) {
        return QuestStatus.NOT_READY;
      }

      if (status > 0) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.hooks) == 0) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.drum) == 0 && this.getExploredRemaining() < 6) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "getGnome", value:

    function getGnome() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("gnasirProgress"));
    } }, { key: "wantsToWormRide", value:

    function wantsToWormRide() {
      return (this.getGnome() & 16) != 16;
    } }, { key: "run", value:

    function run() {
      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.drum) == 0) {
        var outfit = new GreyOutfit();
        outfit.setItemDrops();

        return {
          outfit: outfit,
          location: this.oasis,
          run: () => {
            greyAdv(this.oasis, outfit);
          } };

      }

      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.equip)(this.hooks);
          (0,external_kolmafia_namespaceObject.use)(this.drum);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "getExplored", value:

    function getExplored() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("desertExploration"));
    } }, { key: "getExploredRemaining", value:

    function getExploredRemaining() {
      return 100 - this.getExplored();
    } }]);return QuestL11DesertWormRide;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/QuestL11Desert.ts
function QuestL11Desert_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11Desert_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11Desert_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11Desert_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11Desert_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11Desert_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





























var QuestL11Desert = /*#__PURE__*/function () {


  function QuestL11Desert() {QuestL11Desert_classCallCheck(this, QuestL11Desert);QuestL11Desert_defineProperty(this, "children", []);
    this.children.push(new QuestL11DesertCompass());
    this.children.push(new QuestL11DesertExplore());
    this.children.push(new QuestL11DesertGnome());
    this.children.push(new QuestL11DesertStoneRose());
    this.children.push(new QuestL11DesertWormRide());
  }QuestL11Desert_createClass(QuestL11Desert, [{ key: "getChildren", value:

    function getChildren() {
      return this.children;
    } }, { key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Desert / Parent";
    } }, { key: "level", value:

    function level() {
      return -1;
    } }, { key: "status", value:

    function status() {
      return QuestStatus.COMPLETED;
    } }, { key: "run", value:

    function run() {
      throw new Error("Method not implemented.");
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestL11Desert;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/manor/QuestL11ManorBomb.ts
function QuestL11ManorBomb_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11ManorBomb_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11ManorBomb_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11ManorBomb_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11ManorBomb_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11ManorBomb_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestL11ManorBomb = /*#__PURE__*/function () {function QuestL11ManorBomb() {QuestL11ManorBomb_classCallCheck(this, QuestL11ManorBomb);QuestL11ManorBomb_defineProperty(this, "soda",
    external_kolmafia_namespaceObject.Item.get("blasting soda"));QuestL11ManorBomb_defineProperty(this, "wine",
    external_kolmafia_namespaceObject.Item.get("bottle of Chateau de Vinegar"));QuestL11ManorBomb_defineProperty(this, "unstable",
    external_kolmafia_namespaceObject.Item.get("unstable fulminate"));QuestL11ManorBomb_defineProperty(this, "bomb",
    external_kolmafia_namespaceObject.Item.get("Wine Bomb"));QuestL11ManorBomb_defineProperty(this, "boiler",
    external_kolmafia_namespaceObject.Location.get("The Haunted Boiler Room"));}QuestL11ManorBomb_createClass(QuestL11ManorBomb, [{ key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Manor / Bomb";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Manor");

      if (status < 2) {
        return QuestStatus.NOT_READY;
      }

      if (status > 3) {
        return QuestStatus.COMPLETED;
      }

      if (
      (0,external_kolmafia_namespaceObject.availableAmount)(this.unstable) == 0 && (
      (0,external_kolmafia_namespaceObject.availableAmount)(this.soda) == 0 || (0,external_kolmafia_namespaceObject.availableAmount)(this.wine) == 0))
      {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.unstable) == 0) {
        return {
          location: null,
          run: () => {
            (0,external_kolmafia_namespaceObject.cliExecute)("create Unstable Fulminate");
          } };

      }

      var outfit = new GreyOutfit().addItem(this.unstable);
      outfit.plusMonsterLevelWeight = 5;

      return {
        location: this.boiler,
        outfit: outfit,
        run: () => {
          var settings = new AdventureSettings();
          settings.addNoBanish(external_kolmafia_namespaceObject.Monster.get("monstrous boiler"));

          greyAdv(this.boiler, outfit, settings);

          if ((0,external_kolmafia_namespaceObject.itemAmount)(this.unstable) == 0) {
            (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=manor4&action=manor4_chamberwall");
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.boiler];
    } }]);return QuestL11ManorBomb;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/manor/QuestL11ManorBoss.ts
function QuestL11ManorBoss_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11ManorBoss_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11ManorBoss_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11ManorBoss_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11ManorBoss_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11ManorBoss_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}




var QuestL11ManorBoss = /*#__PURE__*/function () {function QuestL11ManorBoss() {QuestL11ManorBoss_classCallCheck(this, QuestL11ManorBoss);QuestL11ManorBoss_defineProperty(this, "summoning",
    external_kolmafia_namespaceObject.Location.get("Summoning Chamber"));}QuestL11ManorBoss_createClass(QuestL11ManorBoss, [{ key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Manor / Boss";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Manor");

      if (status < 3) {
        return QuestStatus.NOT_READY;
      }

      if (status > 3) {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: this.summoning,
        run: () => {
          greyAdv("place.php?whichplace=manor4&action=manor4_chamberboss");
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestL11ManorBoss;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/manor/QuestL11ManorRecipe.ts
function QuestL11ManorRecipe_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11ManorRecipe_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11ManorRecipe_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11ManorRecipe_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11ManorRecipe_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11ManorRecipe_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



var QuestL11ManorRecipe = /*#__PURE__*/function () {function QuestL11ManorRecipe() {QuestL11ManorRecipe_classCallCheck(this, QuestL11ManorRecipe);QuestL11ManorRecipe_defineProperty(this, "glasses",
    external_kolmafia_namespaceObject.Item.get("Lord Spookyraven's Spectacles"));}QuestL11ManorRecipe_createClass(QuestL11ManorRecipe, [{ key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Manor / Recipe";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Manor");

      if (status < 1) {
        return QuestStatus.NOT_READY;
      }

      if (status > 1) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.glasses) == 0) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.equip)(this.glasses);
          (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=manor4&action=manor4_chamberwall");
          (0,external_kolmafia_namespaceObject.use)(external_kolmafia_namespaceObject.Item.get("recipe: mortar-dissolving solution"));
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestL11ManorRecipe;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/manor/QuestL11ManorSoda.ts
function QuestL11ManorSoda_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11ManorSoda_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11ManorSoda_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11ManorSoda_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11ManorSoda_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11ManorSoda_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestL11ManorSoda = /*#__PURE__*/function () {function QuestL11ManorSoda() {QuestL11ManorSoda_classCallCheck(this, QuestL11ManorSoda);QuestL11ManorSoda_defineProperty(this, "soda",
    external_kolmafia_namespaceObject.Item.get("blasting soda"));QuestL11ManorSoda_defineProperty(this, "laundry",
    external_kolmafia_namespaceObject.Location.get("The Haunted Laundry Room"));QuestL11ManorSoda_defineProperty(this, "unstable",
    external_kolmafia_namespaceObject.Item.get("unstable fulminate"));QuestL11ManorSoda_defineProperty(this, "bomb",
    external_kolmafia_namespaceObject.Item.get("Wine Bomb"));}QuestL11ManorSoda_createClass(QuestL11ManorSoda, [{ key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Manor / Soda";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Manor");

      if (status < 2) {
        return QuestStatus.NOT_READY;
      }

      if (
      status > 2 ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.soda) > 0 ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.unstable) > 0 ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.bomb) > 0)
      {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setItemDrops();

      return {
        location: this.laundry,
        outfit: outfit,
        run: () => {
          var settings = new AdventureSettings();
          settings.addNoBanish(external_kolmafia_namespaceObject.Monster.get("cabinet of Dr. Limpieza"));

          greyAdv(this.laundry, outfit, settings);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.laundry];
    } }]);return QuestL11ManorSoda;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/manor/QuestL11ManorWine.ts
function QuestL11ManorWine_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11ManorWine_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11ManorWine_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11ManorWine_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11ManorWine_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11ManorWine_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestL11ManorWine = /*#__PURE__*/function () {function QuestL11ManorWine() {QuestL11ManorWine_classCallCheck(this, QuestL11ManorWine);QuestL11ManorWine_defineProperty(this, "wine",
    external_kolmafia_namespaceObject.Item.get("bottle of Chateau de Vinegar"));QuestL11ManorWine_defineProperty(this, "celler",
    external_kolmafia_namespaceObject.Location.get("The Haunted Wine Cellar"));QuestL11ManorWine_defineProperty(this, "unstable",
    external_kolmafia_namespaceObject.Item.get("unstable fulminate"));QuestL11ManorWine_defineProperty(this, "bomb",
    external_kolmafia_namespaceObject.Item.get("Wine Bomb"));}QuestL11ManorWine_createClass(QuestL11ManorWine, [{ key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Manor / Wine";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Manor");

      if (status < 2) {
        return QuestStatus.NOT_READY;
      }

      if (
      status > 2 ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.wine) > 0 ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.unstable) > 0 ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.bomb) > 0)
      {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setItemDrops();

      return {
        location: this.celler,
        outfit: outfit,
        run: () => {
          var settings = new AdventureSettings();
          settings.addNoBanish(external_kolmafia_namespaceObject.Monster.get("possessed wine rack"));

          greyAdv(this.celler, outfit, settings);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.celler];
    } }]);return QuestL11ManorWine;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/QuestL11Manor.ts
function QuestL11Manor_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11Manor_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11Manor_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11Manor_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11Manor_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11Manor_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}













var QuestL11Manor = /*#__PURE__*/function () {



  function QuestL11Manor() {QuestL11Manor_classCallCheck(this, QuestL11Manor);QuestL11Manor_defineProperty(this, "ballroom", external_kolmafia_namespaceObject.Location.get("The Haunted Ballroom"));QuestL11Manor_defineProperty(this, "children", []);
    this.children.push(new QuestL11ManorBomb());
    this.children.push(new QuestL11ManorBoss());
    this.children.push(new QuestL11ManorRecipe());
    this.children.push(new QuestL11ManorSoda());
    this.children.push(new QuestL11ManorWine());
  }QuestL11Manor_createClass(QuestL11Manor, [{ key: "getChildren", value:

    function getChildren() {
      return this.children;
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Manor / Ballroom";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.ballroom];
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Manor");

      if (status < 0 || !(0,external_canadv_ash_namespaceObject.canAdv)(this.ballroom)) {
        return QuestStatus.NOT_READY;
      }

      if (status > 0) {
        return QuestStatus.COMPLETED;
      }

      if (!hasNonCombatSkillsReady()) {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setNoCombat();

      return {
        location: this.ballroom,
        outfit: outfit,
        run: () => {
          var props = new PropertyManager();

          try {
            props.setChoice(106, 3);
            props.setChoice(90, 3);
            greyAdv(this.ballroom, outfit);
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "getStatus", value:

    function getStatus() {
      return ManorStatus[(0,external_kolmafia_namespaceObject.getProperty)("questL11Manor")];
    } }]);return QuestL11Manor;}();var


ManorStatus;(function (ManorStatus) {ManorStatus["unstarted"] = "unstarted";ManorStatus["started"] = "started";ManorStatus["step1"] = "CELLER_OPENED";ManorStatus["step2"] = "RECIPE_ACQUIRED";ManorStatus["step3"] = "WALL_BROKEN";ManorStatus["finished"] = "finished";})(ManorStatus || (ManorStatus = {}));
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/palin/QuestL11PalinStew.ts
function QuestL11PalinStew_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11PalinStew_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11PalinStew_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11PalinStew_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11PalinStew_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11PalinStew_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestL11PalinStew = /*#__PURE__*/function () {function QuestL11PalinStew() {QuestL11PalinStew_classCallCheck(this, QuestL11PalinStew);QuestL11PalinStew_defineProperty(this, "wetStew",
    external_kolmafia_namespaceObject.Item.get("Wet Stew"));QuestL11PalinStew_defineProperty(this, "stuntNuts",
    external_kolmafia_namespaceObject.Item.get("Stunt Nuts"));QuestL11PalinStew_defineProperty(this, "talisman",
    external_kolmafia_namespaceObject.Item.get("Talisman o' Namsilat"));QuestL11PalinStew_defineProperty(this, "stuntNutStew",
    external_kolmafia_namespaceObject.Item.get("Wet stunt nut stew"));QuestL11PalinStew_defineProperty(this, "rib",
    external_kolmafia_namespaceObject.Item.get("Bird Rib"));QuestL11PalinStew_defineProperty(this, "lionOil",
    external_kolmafia_namespaceObject.Item.get("lion oil"));QuestL11PalinStew_defineProperty(this, "grove",
    external_kolmafia_namespaceObject.Location.get("Whitey's Grove"));}QuestL11PalinStew_createClass(QuestL11PalinStew, [{ key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Palin / WetStew";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Palindome");

      if (status < 3) {
        return QuestStatus.NOT_READY;
      }

      if (status > 4) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.stuntNuts) == 0) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setItemDrops().setPlusCombat();

      return {
        location: this.grove,
        outfit: outfit,
        run: () => {
          var settings = new AdventureSettings();
          settings.addNoBanish(external_kolmafia_namespaceObject.Monster.get("white lion"));
          settings.addNoBanish(external_kolmafia_namespaceObject.Monster.get("whitesnake"));

          greyAdv(this.grove, outfit, settings);

          if (
          (0,external_kolmafia_namespaceObject.availableAmount)(this.rib) > 0 &&
          (0,external_kolmafia_namespaceObject.availableAmount)(this.lionOil) > 0)
          {
            (0,external_kolmafia_namespaceObject.cliExecute)("create " + this.stuntNutStew.name);
            (0,external_kolmafia_namespaceObject.equip)(this.talisman);

            (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=palindome&action=pal_mrlabel");
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.grove];
    } }]);return QuestL11PalinStew;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/palin/QuestL11PalinBook.ts
function QuestL11PalinBook_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11PalinBook_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11PalinBook_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11PalinBook_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11PalinBook_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11PalinBook_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var QuestL11PalinBook = /*#__PURE__*/function () {function QuestL11PalinBook() {QuestL11PalinBook_classCallCheck(this, QuestL11PalinBook);QuestL11PalinBook_defineProperty(this, "camera",
    external_kolmafia_namespaceObject.Item.get("Disposable Instant Camera"));QuestL11PalinBook_defineProperty(this, "stuntNuts",
    external_kolmafia_namespaceObject.Item.get("Stunt Nuts"));QuestL11PalinBook_defineProperty(this, "talisman",
    external_kolmafia_namespaceObject.Item.get("Talisman o' Namsilat"));QuestL11PalinBook_defineProperty(this, "loveBook1",
    external_kolmafia_namespaceObject.Item.get('"I Love Me, Vol. I"'));QuestL11PalinBook_defineProperty(this, "loveBook2",
    external_kolmafia_namespaceObject.Item.get('"2 Love Me, Vol. 2"'));QuestL11PalinBook_defineProperty(this, "palindome",
    external_kolmafia_namespaceObject.Location.get("Inside the Palindome"));QuestL11PalinBook_defineProperty(this, "ncPhotos",
    [
    "photograph of an ostrich egg",
    "photograph of a red nugget",
    "photograph of God"].
    map((s) => external_kolmafia_namespaceObject.Item.get(s)));QuestL11PalinBook_defineProperty(this, "dogPhoto",
    external_kolmafia_namespaceObject.Item.get("photograph of a dog"));QuestL11PalinBook_defineProperty(this, "bobRace",
    external_kolmafia_namespaceObject.Monster.get("Bob Racecar"));QuestL11PalinBook_defineProperty(this, "raceBob",
    external_kolmafia_namespaceObject.Monster.get("Racecar Bob"));}QuestL11PalinBook_createClass(QuestL11PalinBook, [{ key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Palin / Book";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Palindome");

      if (status == 100 || status > 1) {
        return QuestStatus.COMPLETED;
      }

      if (
      (0,external_kolmafia_namespaceObject.myMeat)() < 1000 ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.talisman) == 0 ||
      status < 0 ||
      this.needDogPhoto() && (0,external_kolmafia_namespaceObject.availableAmount)(this.camera) == 0)
      {
        return QuestStatus.NOT_READY;
      }

      if (!hasNonCombatSkillsReady()) {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "needDogPhoto", value:

    function needDogPhoto() {
      return (0,external_kolmafia_namespaceObject.availableAmount)(this.dogPhoto) == 0;
    } }, { key: "run", value:

    function run() {
      if (
      (0,external_kolmafia_namespaceObject.availableAmount)(this.stuntNuts) == 0 ||
      this.needDogPhoto() ||
      this.ncPhotos.filter((i) => (0,external_kolmafia_namespaceObject.availableAmount)(i) == 0).length > 0 ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.loveBook1) == 0)
      {
        return this.farmDudes();
      }

      return this.turnInStuff();
    } }, { key: "turnInStuff", value:

    function turnInStuff() {
      return {
        location: null,
        outfit: new GreyOutfit().addItem(this.talisman),
        run: () => {
          (0,external_kolmafia_namespaceObject.use)(this.loveBook1);
          (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=palindome&action=pal_drlabel");
          (0,external_kolmafia_namespaceObject.visitUrl)(
          "choice.php?pwd=&whichchoice=872&option=1&photo1=2259&photo2=7264&photo3=7263&photo4=7265");

          (0,external_kolmafia_namespaceObject.cliExecute)("hottub");

          (0,external_kolmafia_namespaceObject.use)(this.loveBook2);
          (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=palindome&action=pal_mroffice");
        } };

    } }, { key: "farmDudes", value:

    function farmDudes() {
      // Potential banisher
      var outfit = new GreyOutfit();

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.stuntNuts) == 0) {
        outfit.setItemDrops();
      }

      if (this.ncPhotos.filter((i) => (0,external_kolmafia_namespaceObject.availableAmount)(i) == 0).length > 0) {
        outfit.setNoCombat();
      }

      // No NCs to be hit other than quest so no need to +combat

      outfit.addItem(this.talisman);

      return {
        outfit: outfit,
        location: this.palindome,
        run: () => {
          var macro = null;

          if (this.needDogPhoto()) {
            macro = new Macro().
            if_(this.bobRace, Macro.tryItem(this.camera)).
            if_(this.raceBob, Macro.tryItem(this.camera));
          }

          var settings = new AdventureSettings().setStartOfFightMacro(macro);
          settings.addBanish(external_kolmafia_namespaceObject.Monster.get("Evil Olive"));
          settings.addBanish(external_kolmafia_namespaceObject.Monster.get("Flock of Stab-bats"));
          settings.addBanish(external_kolmafia_namespaceObject.Monster.get("Taco Cat"));
          settings.addBanish(external_kolmafia_namespaceObject.Monster.get("Tan Gnat"));

          greyAdv(this.palindome, outfit, settings);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.palindome];
    } }]);return QuestL11PalinBook;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/QuestL11Palindome.ts
function QuestL11Palindome_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11Palindome_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11Palindome_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11Palindome_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11Palindome_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11Palindome_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}











var QuestL11Palin = /*#__PURE__*/function () {




  function QuestL11Palin() {QuestL11Palindome_classCallCheck(this, QuestL11Palin);QuestL11Palindome_defineProperty(this, "megagem", external_kolmafia_namespaceObject.Item.get("Mega Gem"));QuestL11Palindome_defineProperty(this, "talisman", external_kolmafia_namespaceObject.Item.get("Talisman o' Namsilat"));QuestL11Palindome_defineProperty(this, "children", []);
    this.children.push(new QuestL11PalinStew());
    this.children.push(new QuestL11PalinBook());
  }QuestL11Palindome_createClass(QuestL11Palin, [{ key: "getChildren", value:

    function getChildren() {
      return this.children;
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Palin / Boss";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Palindome");

      if (status == 100) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.megagem) == 0) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().addItem(this.talisman).addItem(this.megagem);

      return {
        outfit: outfit,
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=palindome&action=pal_drlabel");
          greyAdv("choice.php?pwd=&whichchoice=131&option=1", outfit);
        } };

    } }]);return QuestL11Palin;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/pyramid/QuestL11PyramidControl.ts
function QuestL11PyramidControl_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11PyramidControl_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11PyramidControl_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11PyramidControl_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11PyramidControl_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11PyramidControl_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



var QuestL11PyramidControl = /*#__PURE__*/function () {function QuestL11PyramidControl() {QuestL11PyramidControl_classCallCheck(this, QuestL11PyramidControl);QuestL11PyramidControl_defineProperty(this, "wheel",
    external_kolmafia_namespaceObject.Item.get("Crumbling Wooden Wheel"));QuestL11PyramidControl_defineProperty(this, "ratchet",
    external_kolmafia_namespaceObject.Item.get("Tomb Ratchet"));}QuestL11PyramidControl_createClass(QuestL11PyramidControl, [{ key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Pyramid / Wheel";
    } }, { key: "needAdventures", value:

    function needAdventures() {
      return 3;
    } }, { key: "status", value:

    function status() {
      if (
      (0,external_kolmafia_namespaceObject.getProperty)("lowerChamberUnlock") != "true" ||
      (0,external_kolmafia_namespaceObject.getProperty)("controlRoomUnlock") != "true")
      {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("pyramidBombUsed") == "true") {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.wheel) + (0,external_kolmafia_namespaceObject.availableAmount)(this.ratchet) < 10) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("pyramidPosition") != "1") {
        throw "Shouldn't have used any wheels or ratchets yet!";
      }

      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=pyramid&action=pyramid_control");

          for (var wheel = 1; wheel <= 10; wheel++) {
            if ((0,external_kolmafia_namespaceObject.itemAmount)(this.wheel) > 0) {
              (0,external_kolmafia_namespaceObject.visitUrl)(
              "choice.php?pwd=&whichchoice=929&option=1&choiceform1=Use+a+wheel+on+the+peg&pwd=" +
              (0,external_kolmafia_namespaceObject.myHash)());

            } else {
              (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?whichchoice=929&option=2&pwd");
            }

            if (wheel == 3 || wheel == 7 || wheel == 10) {
              (0,external_kolmafia_namespaceObject.visitUrl)(
              "choice.php?pwd=&whichchoice=929&option=5&choiceform5=Head+down+to+the+Lower+Chambers+%281%29&pwd=" +
              (0,external_kolmafia_namespaceObject.myHash)());

            }

            if (wheel == 3 || wheel == 7) {
              (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=pyramid&action=pyramid_control");
            }
          }

          if ((0,external_kolmafia_namespaceObject.getProperty)("pyramidBombUsed") != "true") {
            throw "Bomb should've been used in the pyramid!";
          }
        } };

    } }]);return QuestL11PyramidControl;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/pyramid/QuestL11PyramidMiddle.ts
function QuestL11PyramidMiddle_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11PyramidMiddle_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11PyramidMiddle_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11PyramidMiddle_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11PyramidMiddle_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11PyramidMiddle_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var QuestL11PyramidMiddle = /*#__PURE__*/function () {function QuestL11PyramidMiddle() {QuestL11PyramidMiddle_classCallCheck(this, QuestL11PyramidMiddle);QuestL11PyramidMiddle_defineProperty(this, "ratTangle",
    external_kolmafia_namespaceObject.Item.get("Tangle of rat tails"));QuestL11PyramidMiddle_defineProperty(this, "tombRat",
    external_kolmafia_namespaceObject.Monster.get("Tomb Rat"));QuestL11PyramidMiddle_defineProperty(this, "middleLoc",
    external_kolmafia_namespaceObject.Location.get("The Middle Chamber"));QuestL11PyramidMiddle_defineProperty(this, "wheel",
    external_kolmafia_namespaceObject.Item.get("Crumbling Wooden Wheel"));QuestL11PyramidMiddle_defineProperty(this, "ratchet",
    external_kolmafia_namespaceObject.Item.get("Tomb Ratchet"));QuestL11PyramidMiddle_defineProperty(this, "book",
    external_kolmafia_namespaceObject.Item.get("Familiar scrapbook"));QuestL11PyramidMiddle_defineProperty(this, "servant",
    external_kolmafia_namespaceObject.Monster.get("Tomb Servant"));}QuestL11PyramidMiddle_createClass(QuestL11PyramidMiddle, [{ key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Pyramid / Middle";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("pyramidBombUsed") == "true") {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("middleChamberUnlock") == "false") {
        return QuestStatus.NOT_READY;
      }

      if (
      (0,external_kolmafia_namespaceObject.getProperty)("lowerChamberUnlock") == "true" &&
      (0,external_kolmafia_namespaceObject.getProperty)("controlRoomUnlock") == "true" &&
      (0,external_kolmafia_namespaceObject.availableAmount)(this.wheel) + (0,external_kolmafia_namespaceObject.availableAmount)(this.ratchet) >= 10)
      {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("questL03Rat") != "finished") {
        return QuestStatus.FASTER_LATER;
      }

      if (
      (0,external_kolmafia_namespaceObject.availableAmount)(this.book) > 0 &&
      !(0,external_kolmafia_namespaceObject.isBanished)(this.servant) &&
      (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("scrapbookCharges")) < 100)
      {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setItemDrops();

      if (
      !(0,external_kolmafia_namespaceObject.isBanished)(this.servant) &&
      (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("scrapbookCharges")) >= 100)
      {
        outfit.addItem(this.book);
      }

      return {
        location: this.middleLoc,
        outfit: outfit,
        run: () => {
          var settings = new AdventureSettings();

          var startMacro = new Macro();

          if ((0,external_kolmafia_namespaceObject.availableAmount)(this.ratTangle) > 0) {
            startMacro.if_(this.tombRat, Macro.item(this.ratTangle));
          }

          settings.addNoBanish(this.tombRat);

          settings.setStartOfFightMacro(startMacro);
          greyAdv(this.middleLoc, outfit, settings);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.middleLoc];
    } }]);return QuestL11PyramidMiddle;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/pyramid/QuestL11PyramidTop.ts
function QuestL11PyramidTop_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11PyramidTop_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11PyramidTop_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11PyramidTop_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11PyramidTop_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11PyramidTop_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestL11PyramidTop = /*#__PURE__*/function () {function QuestL11PyramidTop() {QuestL11PyramidTop_classCallCheck(this, QuestL11PyramidTop);QuestL11PyramidTop_defineProperty(this, "topLoc",
    external_kolmafia_namespaceObject.Location.get("The Upper Chamber"));QuestL11PyramidTop_defineProperty(this, "eye",
    external_kolmafia_namespaceObject.Item.get("Eye of Ed"));QuestL11PyramidTop_defineProperty(this, "amulet",
    external_kolmafia_namespaceObject.Item.get("ancient amulet"));QuestL11PyramidTop_defineProperty(this, "headpiece",
    external_kolmafia_namespaceObject.Item.get("headpiece of the Staff of Ed"));QuestL11PyramidTop_defineProperty(this, "staff",
    external_kolmafia_namespaceObject.Item.get("Staff of Fats"));QuestL11PyramidTop_defineProperty(this, "staff2",
    external_kolmafia_namespaceObject.Item.get("[2325]Staff Of Ed"));}QuestL11PyramidTop_createClass(QuestL11PyramidTop, [{ key: "getId", value:

    // TODO Once we've got the absorbs, try replace combats

    function getId() {
      return "Council / MacGruffin / Pyramid / Top";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Pyramid");

      if (status <= 0 && !this.isUnlockable()) {
        return QuestStatus.NOT_READY;
      }

      if (this.isMiddleUnlocked() || status > 1) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("questL11Desert") != "finished") {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "isMiddleUnlocked", value:

    function isMiddleUnlocked() {
      return (0,external_kolmafia_namespaceObject.getProperty)("middleChamberUnlock") == "true";
    } }, { key: "mustBeDone", value:

    function mustBeDone() {
      return (
        this.isUnlockable() &&
        (0,external_kolmafia_namespaceObject.getProperty)("questL11Desert") == "finished" &&
        (0,external_kolmafia_namespaceObject.getProperty)("questL11Pyramid") == "unstarted");

    } }, { key: "run", value:

    function run() {
      if (this.mustBeDone()) {
        return {
          location: null,
          run: () => {
            // Unlock
            (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=desertbeach&action=db_pyramid1");
          } };

      }

      var outfit = new GreyOutfit().setNoCombat();

      return {
        location: this.topLoc,
        outfit: outfit,
        run: () => {
          greyAdv(this.topLoc, outfit);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.topLoc];
    } }, { key: "isUnlockable", value:

    function isUnlockable() {
      if ((0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("desertExploration")) < 100) {
        return false;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("questL11Palindome") != "finished") {
        return false;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("questL11Manor") != "finished") {
        return false;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("questL11Worship") != "finished") {
        return false;
      }

      return true;
    } }]);return QuestL11PyramidTop;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/QuestL11Pyramid.ts
function QuestL11Pyramid_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11Pyramid_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11Pyramid_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11Pyramid_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11Pyramid_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11Pyramid_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}










var QuestL11Pyramid = /*#__PURE__*/function () {



  function QuestL11Pyramid() {QuestL11Pyramid_classCallCheck(this, QuestL11Pyramid);QuestL11Pyramid_defineProperty(this, "edUndying", external_kolmafia_namespaceObject.Location.get("The Lower Chambers"));QuestL11Pyramid_defineProperty(this, "children", []);
    this.children.push(new QuestL11PyramidControl());
    this.children.push(new QuestL11PyramidTop());
    this.children.push(new QuestL11PyramidMiddle());
  }QuestL11Pyramid_createClass(QuestL11Pyramid, [{ key: "getChildren", value:

    function getChildren() {
      return this.children;
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Pyramid / EdUndying";
    } }, { key: "needAdventures", value:

    function needAdventures() {
      return 9;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Pyramid");

      if (status < 3 || (0,external_kolmafia_namespaceObject.getProperty)("pyramidBombUsed") == "false") {
        return QuestStatus.NOT_READY;
      }

      if (status > 3) {
        return QuestStatus.COMPLETED;
      }

      var fam = external_kolmafia_namespaceObject.Familiar.get("Grey Goose");

      if ((0,external_kolmafia_namespaceObject.familiarWeight)(fam) < 6 && (0,external_kolmafia_namespaceObject.familiarWeight)(fam) >= 3) {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: this.edUndying,
        run: () => {
          for (var i = 0; i < 7; i++) {
            greyAdv("place.php?whichplace=pyramid&action=pyramid_state1a");
          }

          (0,external_kolmafia_namespaceObject.council)();
        } };

    } }]);return QuestL11Pyramid;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/ron/QuestL11RonAirship.ts
function QuestL11RonAirship_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11RonAirship_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11RonAirship_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11RonAirship_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11RonAirship_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11RonAirship_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var QuestL11RonAirship = /*#__PURE__*/function () {function QuestL11RonAirship() {QuestL11RonAirship_classCallCheck(this, QuestL11RonAirship);QuestL11RonAirship_defineProperty(this, "ticket",
    external_kolmafia_namespaceObject.Item.get("Red Zeppelin Ticket"));QuestL11RonAirship_defineProperty(this, "ron",
    external_kolmafia_namespaceObject.Monster.get('Ron "The Weasel" Copperhead'));QuestL11RonAirship_defineProperty(this, "airship",
    external_kolmafia_namespaceObject.Location.get("The Red Zeppelin"));}QuestL11RonAirship_createClass(QuestL11RonAirship, [{ key: "getLocations", value:

    function getLocations() {
      return [this.airship];
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Ron / Zepp";
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Ron");

      if (status < 2) {
        return QuestStatus.NOT_READY;
      }

      if (status > 4) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.ticket) == 0 && (0,external_kolmafia_namespaceObject.myMeat)() <= 5000) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setItemDrops();

      return {
        location: this.airship,
        outfit: outfit,
        run: () => {
          if ((0,external_kolmafia_namespaceObject.availableAmount)(this.ticket) == 0) {
            (0,external_kolmafia_namespaceObject.retrieveItem)(this.ticket);
          }

          var macro = greyKillingBlow(outfit);

          if ((0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Glark Cable")) > 0) {
            macro = Macro.if_(this.ron, macro).
            step(Macro.tryItem(external_kolmafia_namespaceObject.Item.get("Glark Cable"))).
            step(macro);
          }

          var settings = new AdventureSettings();
          settings.setFinishingBlowMacro(macro);
          settings.addNoBanish(external_kolmafia_namespaceObject.Monster.get("Red Skeleton"));
          settings.addNoBanish(external_kolmafia_namespaceObject.Monster.get("Red Butler"));

          greyAdv(this.airship, outfit, settings);
        } };

    } }]);return QuestL11RonAirship;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/ron/QuestL11RonProtesters.ts
function QuestL11RonProtesters_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestL11RonProtesters_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestL11RonProtesters_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestL11RonProtesters_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestL11RonProtesters_arrayLikeToArray(o, minLen);}function QuestL11RonProtesters_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestL11RonProtesters_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11RonProtesters_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11RonProtesters_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11RonProtesters_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11RonProtesters_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11RonProtesters_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}











var QuestL11RonProtesters = /*#__PURE__*/function () {function QuestL11RonProtesters() {QuestL11RonProtesters_classCallCheck(this, QuestL11RonProtesters);QuestL11RonProtesters_defineProperty(this, "proLoc",
    external_kolmafia_namespaceObject.Location.get("A Mob Of Zeppelin Protesters"));QuestL11RonProtesters_defineProperty(this, "deck",
    external_kolmafia_namespaceObject.Item.get("deck of lewd playing cards"));QuestL11RonProtesters_defineProperty(this, "lyrndCostume",
    [
    "lynyrdskin breeches",
    "lynyrdskin cap",
    "lynyrdskin tunic"].
    map((s) => external_kolmafia_namespaceObject.Item.get(s)));QuestL11RonProtesters_defineProperty(this, "musk",
    external_kolmafia_namespaceObject.Item.get("lynyrd musk"));QuestL11RonProtesters_defineProperty(this, "cig",
    external_kolmafia_namespaceObject.Item.get("cigarette lighter"));QuestL11RonProtesters_defineProperty(this, "flaming",
    external_kolmafia_namespaceObject.Item.get("Flamin' Whatshisname"));QuestL11RonProtesters_defineProperty(this, "musky",
    external_kolmafia_namespaceObject.Effect.get("Musky"));QuestL11RonProtesters_defineProperty(this, "toAbsorb", void 0);}QuestL11RonProtesters_createClass(QuestL11RonProtesters, [{ key: "isReady", value:

    // TODO Once we've got the absorbs, try replace combats if it won't hurt our NCs

    function isReady() {
      return (
        (0,external_kolmafia_namespaceObject.getProperty)("questL11Ron") == "started" ||
        (0,external_kolmafia_namespaceObject.getProperty)("questL11Ron") == "step1" ||
        (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("zeppelinProtestors")) <= 80);

    } }, { key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Ron / Crowd";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Ron");

      if (status > 1) {
        return QuestStatus.COMPLETED;
      }

      if (status < 0) {
        return QuestStatus.NOT_READY;
      }

      if (
      getQuestStatus("questL11Shen") <= 6 ||
      getQuestStatus("questL09Topping") < 1)
      {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      if (!GreySettings.isHardcoreMode()) {
        if ((0,external_kolmafia_namespaceObject.availableAmount)(this.deck) == 0 && (0,external_kolmafia_namespaceObject.storageAmount)(this.deck) > 0) {
          GreyPulls.pullDeckOfLewdCards();
        }

        if ((0,external_kolmafia_namespaceObject.availableAmount)(this.lyrndCostume[0]) == 0) {
          GreyPulls.pullLynrdProtesters();
        }
      }

      var outfit = new GreyOutfit().setNoCombat().setItemDrops();
      outfit.addBonus("+sleaze dmg +sleaze spell dmg");var _iterator = QuestL11RonProtesters_createForOfIteratorHelper(

      this.lyrndCostume),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var i = _step.value;
          outfit.addItem(i, 60);
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

      return {
        location: this.proLoc,
        outfit: outfit,
        run: () => {
          var props = new PropertyManager();

          try {
            if ((0,external_kolmafia_namespaceObject.haveEffect)(this.musky) <= 0 && (0,external_kolmafia_namespaceObject.availableAmount)(this.musk) > 0) {
              (0,external_kolmafia_namespaceObject.use)(this.musk);
            }

            props.setChoice(856, 1);
            props.setChoice(857, 1);
            // If we don't have any flaming, just skip cos 3 isn't that fast
            props.setChoice(858, (0,external_kolmafia_namespaceObject.availableAmount)(this.flaming) > 0 ? 1 : 2);

            var settings = new AdventureSettings();
            settings.setFinishingBlowMacro(
            new Macro().tryItem(this.cig).step(greyKillingBlow(outfit)));

            settings.addNoBanish(external_kolmafia_namespaceObject.Monster.get("Blue Oyster Cultist"));
            settings.addNoBanish(external_kolmafia_namespaceObject.Monster.get("Lynyrd Skinner"));

            greyAdv(
            external_kolmafia_namespaceObject.Location.get("A Mob Of Zeppelin Protesters"),
            outfit,
            settings);

          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.proLoc];
    } }]);return QuestL11RonProtesters;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/QuestL11Ron.ts
function QuestL11Ron_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11Ron_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11Ron_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11Ron_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11Ron_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11Ron_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestL11Ron = /*#__PURE__*/function () {


  function QuestL11Ron() {QuestL11Ron_classCallCheck(this, QuestL11Ron);QuestL11Ron_defineProperty(this, "children", []);
    this.children.push(new QuestL11RonProtesters());
    this.children.push(new QuestL11RonAirship());
  }QuestL11Ron_createClass(QuestL11Ron, [{ key: "getChildren", value:

    function getChildren() {
      return this.children;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "level", value:

    function level() {
      return -1;
    } }, { key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Ron / Parent";
    } }, { key: "status", value:

    function status() {
      return QuestStatus.COMPLETED;
    } }, { key: "run", value:

    function run() {
      throw new Error("Method not implemented.");
    } }]);return QuestL11Ron;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/shen/QuestL11ShenBats.ts
function QuestL11ShenBats_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11ShenBats_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11ShenBats_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11ShenBats_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11ShenBats_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11ShenBats_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestL11ShenBats = /*#__PURE__*/function () {function QuestL11ShenBats() {QuestL11ShenBats_classCallCheck(this, QuestL11ShenBats);QuestL11ShenBats_defineProperty(this, "location",
    external_kolmafia_namespaceObject.Location.get("The Batrat and Ratbat Burrow"));}QuestL11ShenBats_createClass(QuestL11ShenBats, [{ key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Shen / Bats";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Shen");

      if (status > 1) {
        return QuestStatus.COMPLETED;
      }

      if (status < 1) {
        return QuestStatus.NOT_READY;
      }

      if (getQuestStatus("questL04Bat") < 1) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();

      if (getQuestStatus("questL04Bat") <= 3) {
        outfit.setItemDrops();
      }

      return {
        location: this.location,
        outfit: outfit,
        run: () => {
          greyAdv(this.location);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.location];
    } }]);return QuestL11ShenBats;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/shen/QuestL11ShenGiants.ts
function QuestL11ShenGiants_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11ShenGiants_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11ShenGiants_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11ShenGiants_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11ShenGiants_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11ShenGiants_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestL11ShenGiants = /*#__PURE__*/function () {function QuestL11ShenGiants() {QuestL11ShenGiants_classCallCheck(this, QuestL11ShenGiants);QuestL11ShenGiants_defineProperty(this, "modelAirShip",
    external_kolmafia_namespaceObject.Item.get("Model airship"));QuestL11ShenGiants_defineProperty(this, "wig",
    external_kolmafia_namespaceObject.Item.get("Mohawk Wig"));QuestL11ShenGiants_defineProperty(this, "record",
    external_kolmafia_namespaceObject.Item.get("drum 'n' bass 'n' drum 'n' bass record"));QuestL11ShenGiants_defineProperty(this, "rocketToStars",
    external_kolmafia_namespaceObject.Item.get("steam-powered model rocketship"));QuestL11ShenGiants_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get(
    "The Castle in the Clouds in the Sky (Top Floor)"));QuestL11ShenGiants_defineProperty(this, "steamNC",

    677);QuestL11ShenGiants_defineProperty(this, "raverNC",
    676);QuestL11ShenGiants_defineProperty(this, "punkNC",
    678);QuestL11ShenGiants_defineProperty(this, "gothNC",
    675);}QuestL11ShenGiants_createClass(QuestL11ShenGiants, [{ key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setNoCombat();

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.wig) > 0) {
        outfit.addItem(this.wig);
      }

      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          var props = new PropertyManager();

          try {
            // Goth and steam love each other
            if ((0,external_kolmafia_namespaceObject.availableAmount)(this.modelAirShip) > 0) {
              props.setChoice(this.steamNC, 1); // Use model ship
              props.setChoice(this.gothNC, 4); // Crawl to copper
            } else if ((0,external_kolmafia_namespaceObject.availableAmount)(this.record) > 0) {
              // We have the record, lets end this.
              props.setChoice(this.steamNC, 4); // Crawl to goth
              props.setChoice(this.gothNC, 2); // Grab record
            } else if ((0,external_kolmafia_namespaceObject.availableAmount)(this.rocketToStars) == 0) {
              // We don't have airship or record, to avoid fighting lets just grab the rocket if we can
              props.setChoice(this.steamNC, 2); // Grab rocket
              props.setChoice(this.gothNC, 4); // Crawl to steam
            } else {
              // This adv is a waste, just fight.
              props.setChoice(this.steamNC, 1); // Fight steam
              props.setChoice(this.gothNC, 1); // Fight goth
            }

            // Punk and raver love each other
            if ((0,external_kolmafia_namespaceObject.equippedAmount)(this.wig) > 0) {
              // If we can end this with the wig
              props.setChoice(this.punkNC, 1); // Use wig
              props.setChoice(this.raverNC, 4); // Crawl to punk rock
            } else if ((0,external_kolmafia_namespaceObject.availableAmount)(this.record) == 0) {
              // If we can grab a record
              props.setChoice(this.punkNC, 4); // Crawl to raver
              props.setChoice(this.raverNC, 3); // Grab record
            } else {
              // We're going to waste an adventure
              props.setChoice(this.punkNC, 4); // Crawl to raver
              props.setChoice(this.raverNC, 1); // Fight the raver for their advs
            }

            props.setChoice(679, 1); // Turn dat wheel

            greyAdv(this.loc, outfit);

            if ((0,external_kolmafia_namespaceObject.lastChoice)() == 679) {
              (0,external_kolmafia_namespaceObject.council)();
            }
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Shen / Giants";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Shen");

      if (status > 5) {
        return QuestStatus.COMPLETED;
      }

      if (status < 5) {
        return QuestStatus.NOT_READY;
      }

      if (getQuestStatus("questL10Garbage") < 9) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }]);return QuestL11ShenGiants;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/shen/QuestL11ShenNinja.ts
function QuestL11ShenNinja_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11ShenNinja_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11ShenNinja_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11ShenNinja_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11ShenNinja_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11ShenNinja_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestL11ShenNinja = /*#__PURE__*/function () {function QuestL11ShenNinja() {QuestL11ShenNinja_classCallCheck(this, QuestL11ShenNinja);QuestL11ShenNinja_defineProperty(this, "location",
    external_kolmafia_namespaceObject.Location.get("Lair of the Ninja Snowmen"));}QuestL11ShenNinja_createClass(QuestL11ShenNinja, [{ key: "getId", value:
    // TODO Once we've got the absorbs, try replace combats if assassins isnt done cos we're really just stacking +combat

    function getId() {
      return "Council / MacGruffin / Shen / Ninjas";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Shen");

      if (status > 3) {
        return QuestStatus.COMPLETED;
      }

      if (status < 3) {
        return QuestStatus.NOT_READY;
      }

      if (getQuestStatus("questL08Trapper") < 2) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();

      if (getQuestStatus("questL08Trapper") <= 2) {
        outfit.setPlusCombat();
      }

      return {
        location: this.location,
        outfit: outfit,
        run: () => {
          greyAdv(this.location, outfit);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.location];
    } }]);return QuestL11ShenNinja;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/shen/QuestL11ShenTurnIn.ts
function QuestL11ShenTurnIn_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestL11ShenTurnIn_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestL11ShenTurnIn_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestL11ShenTurnIn_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestL11ShenTurnIn_arrayLikeToArray(o, minLen);}function QuestL11ShenTurnIn_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestL11ShenTurnIn_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11ShenTurnIn_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11ShenTurnIn_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11ShenTurnIn_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11ShenTurnIn_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11ShenTurnIn_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestL11ShenTurnIn = /*#__PURE__*/function () {function QuestL11ShenTurnIn() {QuestL11ShenTurnIn_classCallCheck(this, QuestL11ShenTurnIn);QuestL11ShenTurnIn_defineProperty(this, "disguise",
    external_kolmafia_namespaceObject.Item.get("Crappy Waiter Disguise"));QuestL11ShenTurnIn_defineProperty(this, "shenClub",
    external_kolmafia_namespaceObject.Location.get("The Copperhead Club"));QuestL11ShenTurnIn_defineProperty(this, "crappy",
    external_kolmafia_namespaceObject.Effect.get("Crappily Disguised as a Waiter"));QuestL11ShenTurnIn_defineProperty(this, "crappyDisguises",
    [
    "Waiter dressed as a ninja",
    "Ninja dressed as a waiter"].
    map((s) => external_kolmafia_namespaceObject.Monster.get(s)));QuestL11ShenTurnIn_defineProperty(this, "toAbsorb", void 0);}QuestL11ShenTurnIn_createClass(QuestL11ShenTurnIn, [{ key: "getId", value:


    function getId() {
      return "Council / MacGruffin / Shen / TurnIn";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Shen");

      if (status < 2) {
        return QuestStatus.NOT_READY;
      }

      if (status > 6) {
        return QuestStatus.COMPLETED;
      }

      if (status % 2 == 1) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "needToDeliver", value:

    function needToDeliver() {
      var prop = (0,external_kolmafia_namespaceObject.getProperty)("questL11Shen");

      return prop == "step2" || prop == "step4" || prop == "step6";
    } }, { key: "run", value:

    function run() {
      return {
        location: this.shenClub,
        run: () => {
          if (!this.hittingNC()) {
            if (!this.haveEffect() && (0,external_kolmafia_namespaceObject.availableAmount)(this.disguise) > 0) {
              (0,external_kolmafia_namespaceObject.use)(this.disguise);
            }
          }

          var props = new PropertyManager();

          try {
            if ((0,external_kolmafia_namespaceObject.getProperty)("copperheadClubHazard") != "lantern") {
              props.setChoice(855, 3); // Light lanterns on fire
            } else {
              props.setChoice(855, 4); // Get unnamed cocktails

              if (this.toAbsorb.length == 0) {
                var ready = DelayBurners.getReadyDelayBurner();

                if (ready != null) {
                  ready.doFightSetup();
                } else {
                  DelayBurners.tryReplaceCombats();
                }
              }
            }

            var settings = new AdventureSettings();var _iterator = QuestL11ShenTurnIn_createForOfIteratorHelper(

            this.crappyDisguises),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var m = _step.value;
                settings.addNoBanish(m);
              }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

            greyAdv(this.shenClub, null, settings);
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "hittingNC", value:

    function hittingNC() {
      var turnsSpent = this.shenClub.turnsSpent;
      var nextMeeting = Math.floor(getQuestStatus("questL11Shen") / 2) * 5;

      return turnsSpent >= nextMeeting - 1;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.shenClub];
    } }, { key: "haveEffect", value:

    function haveEffect() {
      return (0,external_kolmafia_namespaceObject.haveEffect)(this.crappy) > 0;
    } }]);return QuestL11ShenTurnIn;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/QuestL11Shen.ts
function QuestL11Shen_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11Shen_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11Shen_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11Shen_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11Shen_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11Shen_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}










var QuestL11Shen = /*#__PURE__*/function () {








  function QuestL11Shen() {QuestL11Shen_classCallCheck(this, QuestL11Shen);QuestL11Shen_defineProperty(this, "shenClub", external_kolmafia_namespaceObject.Location.get("The Copperhead Club"));QuestL11Shen_defineProperty(this, "shenItems", new Map());QuestL11Shen_defineProperty(this, "children", []);
    this.children.push(new QuestL11ShenTurnIn());
    this.children.push(new QuestL11ShenGiants());
    this.children.push(new QuestL11ShenNinja());
    this.children.push(new QuestL11ShenBats());
  }QuestL11Shen_createClass(QuestL11Shen, [{ key: "getLocations", value: function getLocations() {return [];} }, { key: "getChildren", value:

    function getChildren() {
      return this.children;
    } }, { key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Shen / Meet";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Shen");

      if (status > 0) {
        return QuestStatus.COMPLETED;
      }

      if (status < 0) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          greyAdv(this.shenClub);
        } };

    } }]);return QuestL11Shen;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/hiddencity/shrines/QuestL11TempleBowling.ts
function QuestL11TempleBowling_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11TempleBowling_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11TempleBowling_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11TempleBowling_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11TempleBowling_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11TempleBowling_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








var QuestL11Bowling = /*#__PURE__*/function () {function QuestL11Bowling() {QuestL11TempleBowling_classCallCheck(this, QuestL11Bowling);QuestL11TempleBowling_defineProperty(this, "bowl",
    external_kolmafia_namespaceObject.Item.get("Bowl of Scorpions"));QuestL11TempleBowling_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get("The Hidden Bowling Alley"));QuestL11TempleBowling_defineProperty(this, "ball",
    external_kolmafia_namespaceObject.Item.get("Bowling Ball"));QuestL11TempleBowling_defineProperty(this, "cosmicBall",
    external_kolmafia_namespaceObject.Item.get("Cosmic Bowling Ball"));}QuestL11TempleBowling_createClass(QuestL11Bowling, [{ key: "level", value:

    function level() {
      return 11;
    } }, { key: "ownBall", value:

    function ownBall() {
      return (0,external_kolmafia_namespaceObject.getProperty)("hasCosmicBowlingBall") == "true";
    } }, { key: "getId", value:

    function getId() {
      return "Council / MacGruffin / HiddenCity / Bowling";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }, { key: "getProgress", value:

    function getProgress() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("hiddenBowlingAlleyProgress"));
    } }, { key: "isBowlingBallNextCombat", value:

    function isBowlingBallNextCombat() {
      return (
        (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("cosmicBowlingBallReturnCombats")) <= 0 ||
        (0,external_kolmafia_namespaceObject.availableAmount)(this.cosmicBall) > 0);

    } }, { key: "mustBeDone", value:

    function mustBeDone() {
      if (!this.ownBall()) {
        return false;
      }

      if ((0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("Ultrahydrated"))) {
        return false;
      }

      if (this.status() != QuestStatus.READY) {
        return false;
      }

      if (this.getProgress() != 1 || !this.isBowlingBallNextCombat()) {
        return false;
      }

      return true;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questL11Worship") != "step3") {
        return QuestStatus.NOT_READY;
      }

      var status = (0,external_kolmafia_namespaceObject.getProperty)("questL11Spare");

      if (status == "finished") {
        return QuestStatus.COMPLETED;
      }

      if (status == "unstarted") {
        return QuestStatus.NOT_READY;
      }

      if (!this.barUnlocked()) {
        return QuestStatus.NOT_READY;
      }

      if (
      this.ownBall() &&
      this.getProgress() == 1 &&
      !this.isBowlingBallNextCombat())
      {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.myMeat)() < 1000 && (0,external_kolmafia_namespaceObject.availableAmount)(this.bowl) == 0) {
        return QuestStatus.FASTER_LATER;
      }

      if (this.getProgress() > 6) {
        throw "Shouldn't be at this point";
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setItemDrops();
      // Banishers
      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          (0,external_kolmafia_namespaceObject.retrieveItem)(this.bowl);

          var macro = null;

          if (this.getProgress() <= 1 && this.ownBall()) {
            macro = new Macro().item(this.cosmicBall);

            if ((0,external_kolmafia_namespaceObject.itemAmount)(this.ball) > 0) {
              (0,external_kolmafia_namespaceObject.putCloset)(this.ball, (0,external_kolmafia_namespaceObject.availableAmount)(this.ball));
            }
          } else if ((0,external_kolmafia_namespaceObject.closetAmount)(this.ball) > 0) {
            (0,external_kolmafia_namespaceObject.takeCloset)(this.ball, (0,external_kolmafia_namespaceObject.closetAmount)(this.ball));
          }

          var props = new PropertyManager();
          props.setChoice(788, 1);

          try {
            greyAdv(
            this.loc,
            outfit,
            new AdventureSettings().
            setStartOfFightMacro(macro).
            addNoBanish(external_kolmafia_namespaceObject.Monster.get("pygmy bowler")));

          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "barUnlocked", value:

    function barUnlocked() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("hiddenTavernUnlock")) == (0,external_kolmafia_namespaceObject.myAscensions)();
    } }]);return QuestL11Bowling;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/hiddencity/shrines/QuestL11TempleBusiness.ts
function QuestL11TempleBusiness_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11TempleBusiness_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11TempleBusiness_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11TempleBusiness_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11TempleBusiness_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11TempleBusiness_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestL11Business = /*#__PURE__*/function () {function QuestL11Business() {QuestL11TempleBusiness_classCallCheck(this, QuestL11Business);QuestL11TempleBusiness_defineProperty(this, "files",
    [
    "McClusky file (page 1)",
    "McClusky file (page 2)",
    "McClusky file (page 3)",
    "McClusky file (page 4)",
    "McClusky file (page 5)"].
    map((s) => external_kolmafia_namespaceObject.Item.get(s)));QuestL11TempleBusiness_defineProperty(this, "completeFile",
    external_kolmafia_namespaceObject.Item.get("McClusky file (complete)"));QuestL11TempleBusiness_defineProperty(this, "binderClip",
    external_kolmafia_namespaceObject.Item.get("Boring Binder Clip"));QuestL11TempleBusiness_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get("the hidden office building"));QuestL11TempleBusiness_defineProperty(this, "apartment",
    external_kolmafia_namespaceObject.Location.get("The Hidden Apartment Building"));}QuestL11TempleBusiness_createClass(QuestL11Business, [{ key: "getId", value:

    function getId() {
      return "Council / MacGruffin / HiddenCity / Accountants";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc, this.apartment];
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "delayUntilNextNC", value:

    function delayUntilNextNC() {
      var totalTurns = this.loc.turnsSpent;

      return 4 - (totalTurns - 1) % 5;
    } }, { key: "isDelayBurning", value:

    function isDelayBurning() {
      return (
        this.delayUntilNextNC() > 0 && (
        (0,external_kolmafia_namespaceObject.availableAmount)(this.completeFile) > 0 || this.filesRemaining() == 0));

    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questL11Worship") != "step3") {
        return QuestStatus.NOT_READY;
      }

      var status = (0,external_kolmafia_namespaceObject.getProperty)("questL11Business");

      if (status == "finished") {
        return QuestStatus.COMPLETED;
      }

      if (status == "unstarted") {
        return QuestStatus.NOT_READY;
      }

      if (this.isDelayBurning()) {
        if (DelayBurners.isDelayBurnerReady()) {
          return QuestStatus.READY;
        }

        if (DelayBurners.isDelayBurnerFeasible()) {
          return QuestStatus.FASTER_LATER;
        }
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      // Banish non-accountant?
      if (
      (0,external_kolmafia_namespaceObject.availableAmount)(this.binderClip) > 0 &&
      this.filesRemaining() > 0 &&
      this.delayUntilNextNC() == 0)
      {
        //
        return {
          location: this.apartment,
          run: () => {
            var props = new PropertyManager();

            props.setChoice(780, 4); // Skip
            var settings = new AdventureSettings().addBanish(
            external_kolmafia_namespaceObject.Monster.get("pygmy witch lawyer"));


            try {
              greyAdv(this.apartment, null, settings);

              this.tryCreate();
            } finally {
              props.resetAll();
            }
          } };

      }

      return {
        location: this.loc,
        run: () => {
          var props = new PropertyManager();

          try {
            if ((0,external_kolmafia_namespaceObject.availableAmount)(this.completeFile) > 0) {
              props.setChoice(786, 1); // Have complete file, fight
            } else if ((0,external_kolmafia_namespaceObject.availableAmount)(this.binderClip) == 0) {
              props.setChoice(786, 2); // Get binder clip
            } else {
              props.setChoice(786, 3); // Fight accountant
            }

            if (
            (0,external_kolmafia_namespaceObject.availableAmount)(this.completeFile) > 0 &&
            this.filesRemaining() == 0)
            {
              var ready = DelayBurners.getReadyDelayBurner();

              if (ready != null) {
                ready.doFightSetup();
              } else {
                DelayBurners.tryReplaceCombats();
              }
            }

            var settings = new AdventureSettings().addBanish(
            external_kolmafia_namespaceObject.Monster.get("pygmy headhunter"));


            greyAdv(this.loc, null, settings);

            this.tryCreate();
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "tryCreate", value:

    function tryCreate() {
      if (this.filesRemaining() > 0 || (0,external_kolmafia_namespaceObject.availableAmount)(this.binderClip) == 0) {
        return;
      }

      (0,external_kolmafia_namespaceObject.use)(this.binderClip);
    } }, { key: "filesRemaining", value:

    function filesRemaining() {
      return this.files.reduce((p, v) => ((0,external_kolmafia_namespaceObject.availableAmount)(v) > 0 ? 1 : 0) + p, 0);
    } }, { key: "shouldExploreApartments", value:

    function shouldExploreApartments() {
      return;
    } }]);return QuestL11Business;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/hiddencity/shrines/QuestL11TempleCurses.ts
function QuestL11TempleCurses_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11TempleCurses_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11TempleCurses_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11TempleCurses_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11TempleCurses_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11TempleCurses_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestL11Curses = /*#__PURE__*/function () {function QuestL11Curses() {QuestL11TempleCurses_classCallCheck(this, QuestL11Curses);QuestL11TempleCurses_defineProperty(this, "curse1",
    external_kolmafia_namespaceObject.Effect.get("Once-Cursed"));QuestL11TempleCurses_defineProperty(this, "curse2",
    external_kolmafia_namespaceObject.Effect.get("Twice-Cursed"));QuestL11TempleCurses_defineProperty(this, "curse3",
    external_kolmafia_namespaceObject.Effect.get("Thrice-Cursed"));QuestL11TempleCurses_defineProperty(this, "apartment",
    external_kolmafia_namespaceObject.Location.get("The Hidden Apartment Building"));}QuestL11TempleCurses_createClass(QuestL11Curses, [{ key: "level", value:

    function level() {
      return 11;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.apartment];
    } }, { key: "getId", value:

    function getId() {
      return "Council / MacGruffin / HiddenCity / Curses";
    } }, { key: "mustBeDone", value:

    function mustBeDone() {
      if ((0,external_kolmafia_namespaceObject.haveEffect)(this.curse3) > 10) {
        return false;
      }

      return (
        (0,external_kolmafia_namespaceObject.haveEffect)(this.curse1) +
        (0,external_kolmafia_namespaceObject.haveEffect)(this.curse2) +
        (0,external_kolmafia_namespaceObject.haveEffect)(this.curse3) >
        0);

    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questL11Worship") != "step3") {
        return QuestStatus.NOT_READY;
      }

      var status = (0,external_kolmafia_namespaceObject.getProperty)("questL11Curses");

      if (status == "finished") {
        return QuestStatus.COMPLETED;
      }

      if (status == "unstarted") {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.haveEffect)(this.curse3) && this.delayForNextNC() == 0) {
        return QuestStatus.READY;
      }

      return QuestStatus.READY;
    } }, { key: "delayForNextNC", value:

    function delayForNextNC() {
      var totalTurns = this.apartment.turnsSpent;

      if (totalTurns < 9) {
        return 8 - totalTurns;
      }

      return 7 - (totalTurns - 9) % 8;
    } }, { key: "run", value:

    function run() {
      return {
        location: this.apartment,
        run: () => {
          var props = new PropertyManager();

          if ((0,external_kolmafia_namespaceObject.haveEffect)(this.curse3)) {
            props.setChoice(780, 1);

            if (this.delayForNextNC() > 0) {
              var ready = DelayBurners.getReadyDelayBurner();

              if (ready != null) {
                ready.doFightSetup();
              } else {
                DelayBurners.tryReplaceCombats();
              }
            }
          } else {
            props.setChoice(780, 2);
          }

          var settings = new AdventureSettings().addBanish(
          external_kolmafia_namespaceObject.Monster.get("pygmy witch lawyer"));


          try {
            greyAdv(this.apartment, null, settings);
          } finally {
            props.resetAll();
          }
        } };

    } }]);return QuestL11Curses;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/hiddencity/shrines/QuestL11TempleDoctor.ts
function QuestL11TempleDoctor_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestL11TempleDoctor_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestL11TempleDoctor_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestL11TempleDoctor_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestL11TempleDoctor_arrayLikeToArray(o, minLen);}function QuestL11TempleDoctor_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestL11TempleDoctor_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11TempleDoctor_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11TempleDoctor_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11TempleDoctor_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11TempleDoctor_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11TempleDoctor_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestL11Doctor = /*#__PURE__*/function () {function QuestL11Doctor() {QuestL11TempleDoctor_classCallCheck(this, QuestL11Doctor);QuestL11TempleDoctor_defineProperty(this, "equips",
    [
    "bloodied surgical dungarees",
    "half-size scalpel",
    "surgical apron",
    "head mirror",
    "surgical mask"].
    map((s) => external_kolmafia_namespaceObject.Item.get(s)));QuestL11TempleDoctor_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get("The Hidden Hospital"));}QuestL11TempleDoctor_createClass(QuestL11Doctor, [{ key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }, { key: "getId", value:

    function getId() {
      return "Council / MacGruffin / HiddenCity / Doctor";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questL11Worship") != "step3") {
        return QuestStatus.NOT_READY;
      }

      var status = (0,external_kolmafia_namespaceObject.getProperty)("questL11Doctor");

      if (status == "finished") {
        return QuestStatus.COMPLETED;
      }

      if (status == "unstarted") {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();var _iterator = QuestL11TempleDoctor_createForOfIteratorHelper(

      this.equips),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var i = _step.value;
          if ((0,external_kolmafia_namespaceObject.availableAmount)(i) == 0) {
            continue;
          }

          outfit.addItem(i);
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          var props = new PropertyManager();
          props.setChoice(784, 1);

          try {
            greyAdv(
            this.loc,
            outfit,
            new AdventureSettings().addNoBanish(
            external_kolmafia_namespaceObject.Monster.get("pygmy witch surgeon")));


          } finally {
            props.resetAll();
          }
        } };

    } }]);return QuestL11Doctor;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/hiddencity/QuestL11ShrineVines.ts
function QuestL11ShrineVines_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestL11ShrineVines_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestL11ShrineVines_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestL11ShrineVines_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestL11ShrineVines_arrayLikeToArray(o, minLen);}function QuestL11ShrineVines_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestL11ShrineVines_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11ShrineVines_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11ShrineVines_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11ShrineVines_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11ShrineVines_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11ShrineVines_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestL11ShrineVines = /*#__PURE__*/function () {function QuestL11ShrineVines() {QuestL11ShrineVines_classCallCheck(this, QuestL11ShrineVines);QuestL11ShrineVines_defineProperty(this, "locs",
    [
    [
    "hiddenBowlingAlleyProgress",
    external_kolmafia_namespaceObject.Location.get("An Overgrown Shrine (Southeast)"),
    external_kolmafia_namespaceObject.Item.get("scorched stone sphere"),
    787],

    [
    "hiddenApartmentProgress",
    external_kolmafia_namespaceObject.Location.get("An Overgrown Shrine (Northwest)"),
    external_kolmafia_namespaceObject.Item.get("moss-covered stone sphere"),
    781],

    [
    "hiddenOfficeProgress",
    external_kolmafia_namespaceObject.Location.get("An Overgrown Shrine (Northeast)"),
    external_kolmafia_namespaceObject.Item.get("crackling stone sphere"),
    785],

    [
    "hiddenHospitalProgress",
    external_kolmafia_namespaceObject.Location.get("An Overgrown Shrine (Southwest)"),
    external_kolmafia_namespaceObject.Item.get("dripping stone sphere"),
    783],

    [null, external_kolmafia_namespaceObject.Location.get("A Massive Ziggurat"), null, null]]);QuestL11ShrineVines_defineProperty(this, "machete",

    external_kolmafia_namespaceObject.Item.get("Antique Machete"));}QuestL11ShrineVines_createClass(QuestL11ShrineVines, [{ key: "level", value:

    function level() {
      return 11;
    } }, { key: "getLocations", value:

    function getLocations() {
      return this.locs.map((l) => l[1]);
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Worship");

      if (status > 4) {
        return QuestStatus.COMPLETED;
      }

      if (status < 3) {
        return QuestStatus.NOT_READY;
      }

      if (this.shrineNeedsDoing() == null) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.machete) == 0) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "getId", value:

    function getId() {
      return "Council / MacGruffin / HiddenCity / Vines";
    } }, { key: "lianaCleared", value:

    function lianaCleared(loc) {
      //need to check the combat names due to wanderers
      //we are assuming victory. you could have potentially fought liana without machete and then ran away. but you we are assuming you didn't
      var dense_liana_defeated = 0;
      var area_combats_seen = loc.combatQueue.split("; ");var _iterator = QuestL11ShrineVines_createForOfIteratorHelper(

      area_combats_seen),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var s = _step.value;
          if (s == "dense liana") {
            dense_liana_defeated += 1;
          }
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

      return dense_liana_defeated > 2;
    } }, { key: "run", value:

    function run() {
      var adv = this.shrineNeedsDoing();
      var outfit;

      if (adv[2]) {
        outfit = new GreyOutfit().addItem(this.machete);
      } else {
        outfit = new GreyOutfit("-tie");
      }

      return {
        location: adv[0],
        outfit: outfit,
        run: () => {
          var props = new PropertyManager();

          if (adv[1] != null) {
            props.setChoice(adv[1], adv[2] ? 1 : 2);
          }

          try {
            greyAdv(adv[0], outfit);
          } finally {
            props.resetAll();
          }
        } };

    }

    // Location, choice adv number, needs to clear vines
  }, { key: "shrineNeedsDoing", value: function shrineNeedsDoing() {var _iterator2 = QuestL11ShrineVines_createForOfIteratorHelper(
      this.locs),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var l = _step2.value;
          if (
          l[0] != null ? (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)(l[0])) <= 0 : !this.lianaCleared(l[1]))
          {
            return [l[1], l[3], true];
          }

          if (l[2] != null && (0,external_kolmafia_namespaceObject.availableAmount)(l[2]) > 0) {
            return [l[1], l[3], false];
          }
        }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}

      return null;
    } }]);return QuestL11ShrineVines;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/hiddencity/QuestL11HiddenPark.ts
function QuestL11HiddenPark_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11HiddenPark_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11HiddenPark_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11HiddenPark_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11HiddenPark_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11HiddenPark_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestL11HiddenPark = /*#__PURE__*/function () {function QuestL11HiddenPark() {QuestL11HiddenPark_classCallCheck(this, QuestL11HiddenPark);QuestL11HiddenPark_defineProperty(this, "matches",
    external_kolmafia_namespaceObject.Item.get("Book of Matches"));QuestL11HiddenPark_defineProperty(this, "sword",
    external_kolmafia_namespaceObject.Item.get("Antique Machete"));QuestL11HiddenPark_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get("The Hidden Park"));}QuestL11HiddenPark_createClass(QuestL11HiddenPark, [{ key: "level", value:

    function level() {
      return 11;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questL11Worship") != "step3") {
        return QuestStatus.NOT_READY;
      }

      if (this.needsSword() || !this.hasRelocatedJanitors()) {
        return QuestStatus.READY;
      }

      return QuestStatus.COMPLETED;
    } }, { key: "getId", value:

    function getId() {
      return "Council / MacGruffin / HiddenCity / HiddenPark";
    } }, { key: "hasRelocatedJanitors", value:

    function hasRelocatedJanitors() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("relocatePygmyJanitor")) == (0,external_kolmafia_namespaceObject.myAscensions)();
    } }, { key: "needsSword", value:

    function needsSword() {
      return (0,external_kolmafia_namespaceObject.availableAmount)(this.sword) <= 0;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setNoCombat().setItemDrops();

      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          var props = new PropertyManager();

          if (!this.hasRelocatedJanitors()) {
            props.setChoice(789, 2);
          } else {
            props.setChoice(789, 1);
          }

          var settings = new AdventureSettings();
          settings.addBanish(external_kolmafia_namespaceObject.Monster.get("pygmy blowgunner"));
          settings.addBanish(external_kolmafia_namespaceObject.Monster.get("pygmy assault squad"));
          settings.addBanish(external_kolmafia_namespaceObject.Monster.get("boaraffe"));

          try {
            greyAdv(this.loc, outfit, settings);
          } finally {
            props.resetAll();
          }
        } };

    } }]);return QuestL11HiddenPark;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/hiddencity/QuestL11HiddenBookMatches.ts
function QuestL11HiddenBookMatches_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11HiddenBookMatches_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11HiddenBookMatches_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11HiddenBookMatches_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11HiddenBookMatches_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11HiddenBookMatches_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var QuestL11HiddenBookMatches = /*#__PURE__*/function () {function QuestL11HiddenBookMatches() {QuestL11HiddenBookMatches_classCallCheck(this, QuestL11HiddenBookMatches);QuestL11HiddenBookMatches_defineProperty(this, "book",
    external_kolmafia_namespaceObject.Item.get("Book of matches"));QuestL11HiddenBookMatches_defineProperty(this, "monster",
    external_kolmafia_namespaceObject.Monster.get("pygmy janitor"));QuestL11HiddenBookMatches_defineProperty(this, "location",
    external_kolmafia_namespaceObject.Location.get("The Hidden Park"));QuestL11HiddenBookMatches_defineProperty(this, "toAbsorb", void 0);}QuestL11HiddenBookMatches_createClass(QuestL11HiddenBookMatches, [{ key: "getId", value:


    function getId() {
      return "Council / MacGruffin / HiddenCity / BookOfMatches";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      if (getQuestStatus("questL11Worship") < 3) {
        return QuestStatus.NOT_READY;
      }

      if (this.barUnlocked()) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.book) > 0) {
        return QuestStatus.READY;
      }

      // Might still hit the drop!
      if (
      (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("relocatePygmyJanitor")) < (0,external_kolmafia_namespaceObject.myAscensions)() &&
      //getProperty("questL11Business") != "finished" ||
      // getProperty("questL11Doctor") != "finished" ||
      (0,external_kolmafia_namespaceObject.getProperty)("questL11Curses") != "finished")
      {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "barUnlocked", value:

    function barUnlocked() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("hiddenTavernUnlock")) == (0,external_kolmafia_namespaceObject.myAscensions)();
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();

      if (
      this.toAbsorb.length == 0 &&
      (0,external_kolmafia_namespaceObject.availableAmount)(this.book) == 0 &&
      GreySettings.isHardcoreMode())
      {
        outfit.setItemDrops();
        outfit.setPlusCombat();
      }

      return {
        location: this.location,
        outfit: outfit,
        run: () => {
          if ((0,external_kolmafia_namespaceObject.availableAmount)(this.book) == 0) {
            if (this.toAbsorb.length > 0 || GreySettings.isHardcoreMode()) {
              var settings = new AdventureSettings().addNoBanish(this.monster);

              greyAdv(this.location, outfit, settings);
            } else {
              GreyPulls.pullBoxOfMatches();
            }
          }

          if ((0,external_kolmafia_namespaceObject.availableAmount)(this.book) > 0) {
            (0,external_kolmafia_namespaceObject.use)(this.book);

            if (!this.barUnlocked()) {
              throw "Bar should be unlocked";
            }
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestL11HiddenBookMatches;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/temple/QuestL11TempleGrabWool.ts
function QuestL11TempleGrabWool_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11TempleGrabWool_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11TempleGrabWool_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11TempleGrabWool_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11TempleGrabWool_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11TempleGrabWool_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








var QuestL11TempleGrabWool = /*#__PURE__*/function () {function QuestL11TempleGrabWool() {QuestL11TempleGrabWool_classCallCheck(this, QuestL11TempleGrabWool);QuestL11TempleGrabWool_defineProperty(this, "wool",
    external_kolmafia_namespaceObject.Item.get("Stone Wool"));QuestL11TempleGrabWool_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get("The Hidden Temple"));QuestL11TempleGrabWool_defineProperty(this, "indus",
    external_kolmafia_namespaceObject.Item.get("industrial fire extinguisher"));QuestL11TempleGrabWool_defineProperty(this, "polar",
    external_kolmafia_namespaceObject.Skill.get("Fire Extinguisher: Polar Vortex"));QuestL11TempleGrabWool_defineProperty(this, "woolMonster",
    external_kolmafia_namespaceObject.Monster.get("Baa-relief sheep"));QuestL11TempleGrabWool_defineProperty(this, "resourceClaim",
    new ResourceClaim(
    ResourceType.FIRE_EXTINGUSHER,
    20,
    "Polar Vortex Stone Wool",
    6));}QuestL11TempleGrabWool_createClass(QuestL11TempleGrabWool, [{ key: "getResourceClaims", value:


    function getResourceClaims() {
      return [this.resourceClaim];
    } }, { key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Temple / GrabWool";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Worship");

      if (status > 1 || (0,external_kolmafia_namespaceObject.availableAmount)(this.wool) > 0) {
        return QuestStatus.COMPLETED;
      }

      if (status < 0 || !this.templeFound()) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "templeFound", value:

    function templeFound() {
      return (0,external_kolmafia_namespaceObject.getProperty)("questM16Temple") == "finished";
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setItemDrops().setPlusCombat();
      outfit.addItem(this.indus);

      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          var settings = new AdventureSettings();
          settings.addNoBanish(this.woolMonster);

          settings.setStartOfFightMacro(
          Macro.if_(this.woolMonster, Macro.skill(this.polar).skill(this.polar)));


          var props = new PropertyManager();
          props.setChoice(580, 1); // Hidden heart of temple
          props.setChoice(583, 1); // Such confusing buttons
          props.setChoice(581, 3); // Fight cave bears
          props.setChoice(579, 2); // Such great heights, grab the nostril

          try {
            greyAdv(this.loc, outfit, settings);
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }, { key: "shouldGrabWool", value:

    function shouldGrabWool() {
      return (0,external_kolmafia_namespaceObject.availableAmount)(this.wool) == 0;
    } }]);return QuestL11TempleGrabWool;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/temple/QuestL11TempleNostril.ts
function QuestL11TempleNostril_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11TempleNostril_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11TempleNostril_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11TempleNostril_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11TempleNostril_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11TempleNostril_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestL11TempleNostril = /*#__PURE__*/function () {function QuestL11TempleNostril() {QuestL11TempleNostril_classCallCheck(this, QuestL11TempleNostril);QuestL11TempleNostril_defineProperty(this, "wool",
    external_kolmafia_namespaceObject.Item.get("Stone Wool"));QuestL11TempleNostril_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get("The Hidden Temple"));QuestL11TempleNostril_defineProperty(this, "nostril",
    external_kolmafia_namespaceObject.Item.get("The Nostril of the Serpent"));QuestL11TempleNostril_defineProperty(this, "choices", void 0);}QuestL11TempleNostril_createClass(QuestL11TempleNostril, [{ key: "getId", value:


    function getId() {
      return "Council / MacGruffin / Temple / Nostril";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "templeFound", value:

    function templeFound() {
      return (0,external_kolmafia_namespaceObject.getProperty)("questM16Temple") == "finished";
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Worship");

      if (status > 1) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.nostril) == 1) {
        return QuestStatus.COMPLETED;
      }

      if (status < 0 || !this.templeFound()) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.wool) == 0) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.use)(this.wool);

          this.runTempleChoices();

          greyAdv(
          external_kolmafia_namespaceObject.Location.get("The Hidden Temple"),
          null,
          new AdventureSettings().setChoices(this.choices));

        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "runTempleChoices", value:

    function runTempleChoices() {
      this.choices = new TempleChoices();

      this.choices.runChoice(582, 1); // Grab nostril
      this.choices.runChoice(579, 2); // Grab nostil
    } }, { key: "needAdventures", value:

    function needAdventures() {
      return 4;
    } }]);return QuestL11TempleNostril;}();var


TempleChoices = /*#__PURE__*/function () {function TempleChoices() {QuestL11TempleNostril_classCallCheck(this, TempleChoices);QuestL11TempleNostril_defineProperty(this, "choices",
    []);}QuestL11TempleNostril_createClass(TempleChoices, [{ key: "callOutOfScopeChoiceBehavior", value:

    function callOutOfScopeChoiceBehavior(choiceNo) {
      return false;
    } }, { key: "runChoice", value:

    function runChoice(choiceNo, choicePick) {
      this.choices.push([choiceNo, choicePick]);
    } }, { key: "handleChoice", value:

    function handleChoice(choiceNo) {
      if (this.choices.length == 0) {
        throw "Expected to be handling a choice but uh, wasn't";
      }

      if (this.choices[0][0] != choiceNo) {
        throw (
          "Expected to be in choice " +
          this.choices[0][0] +
          " but instead was in choice " +
          choiceNo);

      }

      var toReturn = this.choices[0][1];
      this.choices.splice(0, 1);

      return toReturn;
    } }]);return TempleChoices;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/temple/QuestL11TempleUnlock.ts
function QuestL11TempleUnlock_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11TempleUnlock_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11TempleUnlock_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11TempleUnlock_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11TempleUnlock_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11TempleUnlock_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}










var QuestL11TempleUnlock = /*#__PURE__*/function () {function QuestL11TempleUnlock() {QuestL11TempleUnlock_classCallCheck(this, QuestL11TempleUnlock);QuestL11TempleUnlock_defineProperty(this, "coin",
    external_kolmafia_namespaceObject.Item.get("Tree-holed coin"));QuestL11TempleUnlock_defineProperty(this, "map",
    external_kolmafia_namespaceObject.Item.get("Spooky Temple Map"));QuestL11TempleUnlock_defineProperty(this, "fertilizer",
    external_kolmafia_namespaceObject.Item.get("Spooky-Gro Fertilizer"));QuestL11TempleUnlock_defineProperty(this, "sapling",
    external_kolmafia_namespaceObject.Item.get("Spooky Sapling"));QuestL11TempleUnlock_defineProperty(this, "spookyLoc",
    external_kolmafia_namespaceObject.Location.get("The Spooky Forest"));QuestL11TempleUnlock_defineProperty(this, "choices", void 0);QuestL11TempleUnlock_defineProperty(this, "latte",

    external_kolmafia_namespaceObject.Item.get("Latte lovers member's mug"));QuestL11TempleUnlock_defineProperty(this, "toAbsorb", void 0);}QuestL11TempleUnlock_createClass(QuestL11TempleUnlock, [{ key: "shouldWearLatte", value:


    function shouldWearLatte() {
      return (
        (0,external_kolmafia_namespaceObject.availableAmount)(this.latte) > 0 &&
        !hasUnlockedLatteFlavor(LatteFlavor.FAMILIAR_WEIGHT));

    } }, { key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Temple / Unlock";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      if (this.templeFound()) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("questM16Temple") == "unstarted") {
        return QuestStatus.NOT_READY;
      }

      if (this.isDelayBurning()) {
        if (DelayBurners.isDelayBurnerReady()) {
          return QuestStatus.READY;
        }

        if (DelayBurners.isDelayBurnerFeasible()) {
          return QuestStatus.FASTER_LATER;
        }
      }

      return QuestStatus.READY;
    } }, { key: "templeFound", value:

    function templeFound() {
      return (0,external_kolmafia_namespaceObject.getProperty)("questM16Temple") == "finished";
    } }, { key: "tryUnlockTemple", value:

    function tryUnlockTemple() {
      if (
      (0,external_kolmafia_namespaceObject.itemAmount)(this.sapling) == 0 ||
      (0,external_kolmafia_namespaceObject.itemAmount)(this.fertilizer) == 0 ||
      (0,external_kolmafia_namespaceObject.itemAmount)(this.map) == 0)
      {
        return;
      }

      (0,external_kolmafia_namespaceObject.use)(this.map);
    } }, { key: "runSpookyChoices", value:

    function runSpookyChoices() {
      this.choices = new QuestL11TempleUnlock_TempleChoices();

      if ((0,external_kolmafia_namespaceObject.itemAmount)(this.coin) == 0 && (0,external_kolmafia_namespaceObject.itemAmount)(this.map) == 0) {
        this.choices.runChoice(502, 2);
        this.choices.runChoice(505, 2);
      } else if ((0,external_kolmafia_namespaceObject.itemAmount)(this.map) == 0) {
        this.choices.runChoice(502, 3);
        this.choices.runChoice(506, 3);
        this.choices.runChoice(507, 1);
      } else if ((0,external_kolmafia_namespaceObject.itemAmount)(this.fertilizer) == 0) {
        this.choices.runChoice(502, 3);
        this.choices.runChoice(506, 3);
        this.choices.runChoice(506, 2);
      } else if ((0,external_kolmafia_namespaceObject.itemAmount)(this.sapling) == 0) {
        this.choices.runChoice(502, 1);
        this.choices.runChoice(503, 3);

        // Sell skins
        if ((0,external_kolmafia_namespaceObject.itemAmount)(external_kolmafia_namespaceObject.Item.get("bar skin")) > 1) {
          this.choices.runChoice(504, 2);
        } else if ((0,external_kolmafia_namespaceObject.itemAmount)(external_kolmafia_namespaceObject.Item.get("bar skin")) > 0) {
          this.choices.runChoice(504, 1);
        }

        this.choices.runChoice(504, 3);
        this.choices.runChoice(504, 4);
      }
    } }, { key: "isDelayBurning", value:

    function isDelayBurning() {
      return this.spookyLoc.turnsSpent < 5 && this.toAbsorb.length == 0;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();

      if (this.spookyLoc.turnsSpent >= 5) {
        outfit.setNoCombat();
      }

      return {
        location: this.spookyLoc,
        outfit: outfit,
        run: () => {
          this.tryUnlockTemple();

          if (this.templeFound()) {
            return;
          }

          if (!this.shouldWearLatte() && this.toAbsorb.length == 0) {
            var delay = DelayBurners.getReadyDelayBurner();

            if (delay != null) {
              delay.doFightSetup();
            } else if (hasNonCombatSkillsReady()) {
              DelayBurners.tryReplaceCombats();
            }
          }

          this.runSpookyChoices();

          var settings = new AdventureSettings().setChoices(this.choices);

          greyAdv(this.spookyLoc, outfit, settings);

          this.tryUnlockTemple();
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.spookyLoc];
    } }]);return QuestL11TempleUnlock;}();var


QuestL11TempleUnlock_TempleChoices = /*#__PURE__*/function () {function TempleChoices() {QuestL11TempleUnlock_classCallCheck(this, TempleChoices);QuestL11TempleUnlock_defineProperty(this, "choices",
    []);}QuestL11TempleUnlock_createClass(TempleChoices, [{ key: "callOutOfScopeChoiceBehavior", value:

    function callOutOfScopeChoiceBehavior(choiceNo) {
      return false;
    } }, { key: "runChoice", value:

    function runChoice(choiceNo, choicePick) {
      this.choices.push([choiceNo, choicePick]);
    } }, { key: "handleChoice", value:

    function handleChoice(choiceNo) {
      if (this.choices.length == 0) {
        throw "Expected to be handling a choice but uh, wasn't";
      }

      if (this.choices[0][0] != choiceNo) {
        throw (
          "Expected to be in choice " +
          this.choices[0][0] +
          " but instead was in choice " +
          choiceNo);

      }

      var toReturn = this.choices[0][1];
      this.choices.splice(0, 1);

      return toReturn;
    } }]);return TempleChoices;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/temple/QuestL11TempleHiddenCity.ts
function QuestL11TempleHiddenCity_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11TempleHiddenCity_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11TempleHiddenCity_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11TempleHiddenCity_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11TempleHiddenCity_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11TempleHiddenCity_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestL11TempleHiddenCity = /*#__PURE__*/function () {function QuestL11TempleHiddenCity() {QuestL11TempleHiddenCity_classCallCheck(this, QuestL11TempleHiddenCity);QuestL11TempleHiddenCity_defineProperty(this, "wool",
    external_kolmafia_namespaceObject.Item.get("Stone Wool"));QuestL11TempleHiddenCity_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get("The Hidden Temple"));QuestL11TempleHiddenCity_defineProperty(this, "nostril",
    external_kolmafia_namespaceObject.Item.get("The Nostril of the Serpent"));QuestL11TempleHiddenCity_defineProperty(this, "choices", void 0);}QuestL11TempleHiddenCity_createClass(QuestL11TempleHiddenCity, [{ key: "getId", value:


    function getId() {
      return "Council / MacGruffin / Temple / HiddenCity";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL11Worship");

      if (status > 1) {
        return QuestStatus.COMPLETED;
      }

      if (status < 0 || !this.templeFound()) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.wool) == 0) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.nostril) == 0) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "templeFound", value:

    function templeFound() {
      return (0,external_kolmafia_namespaceObject.getProperty)("questM16Temple") == "finished";
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.use)(this.wool);

          this.runTempleChoices();

          greyAdv(
          external_kolmafia_namespaceObject.Location.get("The Hidden Temple"),
          null,
          new AdventureSettings().setChoices(this.choices));

        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "runTempleChoices", value:

    function runTempleChoices() {
      this.choices = new QuestL11TempleHiddenCity_TempleChoices();

      this.choices.runChoice(582, 2);
      this.choices.runChoice(580, 2);
      this.choices.runChoice(584, 4);
      this.choices.runChoice(580, 1);
      this.choices.runChoice(123, 2); // Go to puzzle
      // Script should run the banana solver
      this.choices.runChoice(125, 3); // Unlock city
    } }, { key: "needAdventures", value:

    function needAdventures() {
      return 4;
    } }]);return QuestL11TempleHiddenCity;}();var


QuestL11TempleHiddenCity_TempleChoices = /*#__PURE__*/function () {function TempleChoices() {QuestL11TempleHiddenCity_classCallCheck(this, TempleChoices);QuestL11TempleHiddenCity_defineProperty(this, "choices",
    []);}QuestL11TempleHiddenCity_createClass(TempleChoices, [{ key: "callOutOfScopeChoiceBehavior", value:

    function callOutOfScopeChoiceBehavior(choiceNo) {
      (0,external_kolmafia_namespaceObject.print)("Temple now has choice: " + choiceNo);
      if (choiceNo != 0) {
        return false;
      }

      //   let url = "choice.php?pwd=&whichchoice=" + 123 + "&option=" + 2;
      // visitUrl(url);
      (0,external_kolmafia_namespaceObject.cliExecute)("dvorak"); // Solve puzzle
    } }, { key: "runChoice", value:

    function runChoice(choiceNo, choicePick) {
      this.choices.push([choiceNo, choicePick]);
    } }, { key: "handleChoice", value:

    function handleChoice(choiceNo) {
      if (this.choices.length == 0) {
        throw "Expected to be handling a choice but uh, wasn't";
      }

      if (this.choices[0][0] != choiceNo) {
        throw (
          "Expected to be in choice " +
          this.choices[0][0] +
          " but instead was in choice " +
          choiceNo);

      }

      var toReturn = this.choices[0][1];
      this.choices.splice(0, 1);

      return toReturn;
    } }]);return TempleChoices;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/QuestL11Temple.ts
function QuestL11Temple_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11Temple_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11Temple_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11Temple_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11Temple_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11Temple_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


















var QuestL11Temple = /*#__PURE__*/function () {


  function QuestL11Temple() {QuestL11Temple_classCallCheck(this, QuestL11Temple);QuestL11Temple_defineProperty(this, "buildings", []);
    this.buildings.push(new QuestL11Bowling());
    this.buildings.push(new QuestL11Curses());
    this.buildings.push(new QuestL11Business());
    this.buildings.push(new QuestL11Doctor());
    this.buildings.push(new QuestL11HiddenBookMatches());
    this.buildings.push(new QuestL11ShrineVines());
    this.buildings.push(new QuestL11TempleGrabWool());
    this.buildings.push(new QuestL11TempleNostril());
    this.buildings.push(new QuestL11TempleUnlock());
    this.buildings.push(new QuestL11TempleHiddenCity());
    this.buildings.push(new QuestL11HiddenPark());
  }QuestL11Temple_createClass(QuestL11Temple, [{ key: "level", value:

    function level() {
      return 11;
    } }, { key: "getId", value:

    function getId() {
      return "Council / MacGruffin / HiddenCity / Boss";
    } }, { key: "needAdventures", value:

    function needAdventures() {
      return 13;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "getChildren", value:

    function getChildren() {
      return this.buildings;
    } }, { key: "status", value:

    function status() {
      var status = (0,external_kolmafia_namespaceObject.getProperty)("questL11Worship");

      if (status == "finished") {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("questL11MacGuffin") != "step2") {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("questM16Temple") == "unstarted" || this.bossReady()) {
        return QuestStatus.READY;
      }

      return QuestStatus.NOT_READY;
    } }, { key: "run", value:

    function run() {
      if (this.bossReady()) {
        return this.fightBoss();
      }

      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=woods&action=woods_dakota_anim");
        } };

    } }, { key: "bossReady", value:

    function bossReady() {
      return (0,external_kolmafia_namespaceObject.itemAmount)(external_kolmafia_namespaceObject.Item.get("stone triangle")) >= 4;
    } }, { key: "fightBoss", value:

    function fightBoss() {
      return {
        location: external_kolmafia_namespaceObject.Location.get("A Massive Ziggurat"),
        run: () => {
          var props = new PropertyManager();
          props.setChoice(791, 1);

          try {
            greyAdv(external_kolmafia_namespaceObject.Location.get("A Massive Ziggurat"));
          } finally {
            props.resetAll();
          }
        } };

    } }]);return QuestL11Temple;}();
;// CONCATENATED MODULE: ./src/quests/council/macgruffin/QuestL11VacationAccess.ts
function QuestL11VacationAccess_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11VacationAccess_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11VacationAccess_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11VacationAccess_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11VacationAccess_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}



var QuestL11ShoreAccess = /*#__PURE__*/function () {function QuestL11ShoreAccess() {QuestL11VacationAccess_classCallCheck(this, QuestL11ShoreAccess);}QuestL11VacationAccess_createClass(QuestL11ShoreAccess, [{ key: "getId", value:
    function getId() {
      return "Council / MacGruffin / Shore";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastDesertUnlock")) == (0,external_kolmafia_namespaceObject.myAscensions)()) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.myMeat)() < 6000) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.buy)(external_kolmafia_namespaceObject.Item.get("Desert Bus pass"));

          if ((0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastDesertUnlock")) != (0,external_kolmafia_namespaceObject.myAscensions)()) {
            throw "Expected desert access";
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestL11ShoreAccess;}();
;// CONCATENATED MODULE: ./src/quests/council/QuestL11MacGruffin.ts
function QuestL11MacGruffin_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL11MacGruffin_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL11MacGruffin_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL11MacGruffin_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL11MacGruffin_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL11MacGruffin_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}














var QuestL11MacGruffin = /*#__PURE__*/function () {




  function QuestL11MacGruffin() {QuestL11MacGruffin_classCallCheck(this, QuestL11MacGruffin);QuestL11MacGruffin_defineProperty(this, "questInfo", []);QuestL11MacGruffin_defineProperty(this, "forged", external_kolmafia_namespaceObject.Item.get("Forged Identification Documents"));QuestL11MacGruffin_defineProperty(this, "diary", external_kolmafia_namespaceObject.Item.get("Your Father's Macguffin Diary"));
    // Register the subquests
    this.questInfo.push(new QuestL11ShoreAccess());
    this.questInfo.push(new QuestL11Black());
    this.questInfo.push(new QuestL11Palin());
    this.questInfo.push(new QuestL11Shen());
    this.questInfo.push(new QuestL11Desert());
    this.questInfo.push(new QuestL11Manor());
    this.questInfo.push(new QuestL11Pyramid());
    this.questInfo.push(new QuestL11Ron());
    this.questInfo.push(new QuestL11Temple());
  }QuestL11MacGruffin_createClass(QuestL11MacGruffin, [{ key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questL11Black") == "finished") {
        return QuestStatus.COMPLETED;
      }

      if (
      (0,external_kolmafia_namespaceObject.getProperty)("questL11Black") != "step2" ||
      (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastDesertUnlock")) != (0,external_kolmafia_namespaceObject.myAscensions)())
      {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.myMeat)() <= 6000) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "getChildren", value:

    function getChildren() {
      return this.questInfo;
    } }, { key: "getId", value:

    function getId() {
      return "Council / MacGruffin / Vacation";
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          if ((0,external_kolmafia_namespaceObject.availableAmount)(this.diary) == 0) {
            if ((0,external_kolmafia_namespaceObject.availableAmount)(this.forged) == 0) {
              (0,external_kolmafia_namespaceObject.retrieveItem)(this.forged);
            }

            var props = new PropertyManager();

            try {
              props.setChoice(793, 1);

              greyAdv(external_kolmafia_namespaceObject.Location.get("The Shore, Inc. Travel Agency"));
            } finally {
              props.resetAll();
            }
          }

          (0,external_kolmafia_namespaceObject.use)(this.diary);
        } };

    } }, { key: "needAdventures", value:

    function needAdventures() {
      return 3;
    } }]);return QuestL11MacGruffin;}();
;// CONCATENATED MODULE: ./src/quests/council/islandwar/QuestL12Battlefield.ts
function QuestL12Battlefield_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL12Battlefield_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL12Battlefield_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL12Battlefield_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL12Battlefield_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL12Battlefield_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestL12Battlefield = /*#__PURE__*/function () {function QuestL12Battlefield() {QuestL12Battlefield_classCallCheck(this, QuestL12Battlefield);QuestL12Battlefield_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get("The Battlefield (Frat Uniform)"));QuestL12Battlefield_defineProperty(this, "pole",
    external_kolmafia_namespaceObject.Item.get("eleven-foot pole"));QuestL12Battlefield_defineProperty(this, "ring",
    external_kolmafia_namespaceObject.Item.get("ring of Detect Boring Doors"));QuestL12Battlefield_defineProperty(this, "picklocks",
    external_kolmafia_namespaceObject.Item.get("Pick-O-Matic lockpicks"));QuestL12Battlefield_defineProperty(this, "fam",
    external_kolmafia_namespaceObject.Familiar.get("Gelatinous Cubeling"));}QuestL12Battlefield_createClass(QuestL12Battlefield, [{ key: "level", value:

    function level() {
      return 12;
    } }, { key: "status", value:

    function status() {
      if (
      !this.isArenaDone() ||
      !this.isLobsterDone() ||
      !this.isGremlinsDone())
      {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("warProgress") == "finished") {
        return QuestStatus.COMPLETED;
      }

      var defeated = this.getHippiesDefeated();

      if (defeated >= 64 && !this.isFilthyDone()) {
        return QuestStatus.NOT_READY;
      }

      if (defeated >= 192 && !this.isNunsDone()) {
        return QuestStatus.NOT_READY;
      }

      if (defeated >= 1000) {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "getId", value:

    function getId() {
      return "Council / War / Battlefield";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();
      outfit.addItem(external_kolmafia_namespaceObject.Item.get("Beer Helmet"));
      outfit.addItem(external_kolmafia_namespaceObject.Item.get("distressed denim pants"));
      outfit.addItem(external_kolmafia_namespaceObject.Item.get("bejeweled pledge pin"));

      var fam = null;

      if (
      (0,external_kolmafia_namespaceObject.availableAmount)(this.pole) == 0 ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.ring) == 0 ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.picklocks) == 0)
      {
        fam = this.fam;
      }

      return {
        outfit: outfit,
        location: this.loc,
        familiar: fam,
        disableFamOverride: fam != null,
        run: () => {
          greyAdv(this.loc, outfit);
        } };

    } }, { key: "getHippiesDefeated", value:

    function getHippiesDefeated() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("hippiesDefeated"));
    } }, { key: "isGremlinsDone", value:

    function isGremlinsDone() {
      return (0,external_kolmafia_namespaceObject.getProperty)("sidequestJunkyardCompleted") != "none";
    } }, { key: "isArenaDone", value:

    function isArenaDone() {
      return (0,external_kolmafia_namespaceObject.getProperty)("sidequestArenaCompleted") != "none";
    } }, { key: "isLobsterDone", value:

    function isLobsterDone() {
      return (0,external_kolmafia_namespaceObject.getProperty)("sidequestLighthouseCompleted") != "none";
    } }, { key: "isFilthyDone", value:

    function isFilthyDone() {
      return (0,external_kolmafia_namespaceObject.getProperty)("sidequestOrchardCompleted") != "none";
    } }, { key: "isNunsDone", value:

    function isNunsDone() {
      return (0,external_kolmafia_namespaceObject.getProperty)("sidequestNunsCompleted") != "none";
    } }]);return QuestL12Battlefield;}();
;// CONCATENATED MODULE: ./src/quests/council/islandwar/QuestL12WarGremlins.ts
function QuestL12WarGremlins_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL12WarGremlins_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL12WarGremlins_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL12WarGremlins_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL12WarGremlins_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL12WarGremlins_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var WarGremlins = /*#__PURE__*/function () {function WarGremlins() {QuestL12WarGremlins_classCallCheck(this, WarGremlins);QuestL12WarGremlins_defineProperty(this, "magnet",
    external_kolmafia_namespaceObject.Item.get("molybdenum magnet"));QuestL12WarGremlins_defineProperty(this, "flyers",
    external_kolmafia_namespaceObject.Item.get("Rock band flyers"));QuestL12WarGremlins_defineProperty(this, "sealTooth",
    external_kolmafia_namespaceObject.Item.get("Seal Tooth"));QuestL12WarGremlins_defineProperty(this, "locations",
    [
    [
    external_kolmafia_namespaceObject.Location.get("Next to that barrel with something burning in it"),
    external_kolmafia_namespaceObject.Monster.get("batwinged gremlin (tool)"),
    external_kolmafia_namespaceObject.Item.get("molybdenum hammer"),
    "It whips out a hammer"],

    [
    external_kolmafia_namespaceObject.Location.get("Out by that rusted-out car"),
    external_kolmafia_namespaceObject.Monster.get("vegetable gremlin (tool)"),
    external_kolmafia_namespaceObject.Item.get("molybdenum screwdriver"),
    "It whips out a screwdriver"],

    [
    external_kolmafia_namespaceObject.Location.get("over where the old tires are"),
    external_kolmafia_namespaceObject.Monster.get("erudite gremlin (tool)"),
    external_kolmafia_namespaceObject.Item.get("molybdenum crescent wrench"),
    "He whips out a crescent wrench"],

    [
    external_kolmafia_namespaceObject.Location.get("near an abandoned refrigerator"),
    external_kolmafia_namespaceObject.Monster.get("spider gremlin (tool)"),
    external_kolmafia_namespaceObject.Item.get("Molybdenum Pliers"),
    "It whips out a pair of pliers"]]);}QuestL12WarGremlins_createClass(WarGremlins, [{ key: "run", value:



    function run() {
      if ((0,external_kolmafia_namespaceObject.itemAmount)(this.magnet) == 0) {
        return this.visitJunkman();
      }

      var toVisit = this.locations.filter((l) => (0,external_kolmafia_namespaceObject.itemAmount)(l[2]) == 0)[0];

      if (toVisit == null) {
        return this.visitJunkman();
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.sealTooth) == 0) {
        return this.getSealTooth();
      }

      var loc = toVisit[0];
      var monster = toVisit[1];
      var item = toVisit[2];
      var magnetString = toVisit[3];

      var outfit = new GreyOutfit("-ML +DA +DR +familiar experience");
      outfit.hpWeight = 1;
      outfit.umbrellaSetting = UmbrellaState.DAMAGE_REDUCTION_SHIELD;

      var hitWith = this.flyers;

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.flyers) == 0) {
        hitWith = this.sealTooth;
      }

      var macro2 = Macro.if_(
      "match " + magnetString,
      Macro.item(this.magnet).step("abort")).
      item(this.sealTooth);

      var macro = new Macro().if_(
      monster,
      Macro.while_("!pastround 25 && !hpbelow 50", macro2));


      return {
        location: loc,
        outfit: outfit,
        run: () => {
          var settings = new AdventureSettings();
          settings.setDuringFightMacro(macro);

          settings.addBanish(external_kolmafia_namespaceObject.Monster.get("A.M.C Gremlin"));
          // settings.addBanish(Monster.get("vegetable gremlin"));
          // settings.addBanish(Monster.get("batwinged gremlin"));
          // settings.addBanish(Monster.get("spider gremlin"));
          // settings.addBanish(Monster.get("batwinged gremlin"));

          greyAdv(loc, outfit, settings);
        } };

    } }, { key: "getSealTooth", value:

    function getSealTooth() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.retrieveItem)(external_kolmafia_namespaceObject.Item.get("Seal tooth"));
        } };

    } }, { key: "visitJunkman", value:

    function visitJunkman() {
      var outfit = new GreyOutfit();
      outfit.addItem(external_kolmafia_namespaceObject.Item.get("Beer Helmet"));
      outfit.addItem(external_kolmafia_namespaceObject.Item.get("distressed denim pants"));
      outfit.addItem(external_kolmafia_namespaceObject.Item.get("bejeweled pledge pin"));

      return {
        outfit: outfit,
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.visitUrl)("bigisland.php?action=junkman&pwd");
        } };

    } }, { key: "level", value:

    function level() {
      return 12;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("sidequestJunkyardCompleted") != "none") {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("warProgress") != "started") {
        return QuestStatus.NOT_READY;
      }

      if (!(0,external_kolmafia_namespaceObject.haveSkill)(external_kolmafia_namespaceObject.Skill.get("Subatomic Hardening"))) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "getId", value:

    function getId() {
      return "Council / War / Gremlins";
    } }, { key: "getLocations", value:

    function getLocations() {
      return this.locations.
      filter((g) => (0,external_kolmafia_namespaceObject.availableAmount)(g[2]) == 0).
      map((g) => g[0]);
    } }]);return WarGremlins;}();
;// CONCATENATED MODULE: ./src/quests/council/islandwar/QuestL12Nuns.ts
function QuestL12Nuns_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL12Nuns_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL12Nuns_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL12Nuns_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL12Nuns_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL12Nuns_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








var Quest12WarNuns = /*#__PURE__*/function () {function Quest12WarNuns() {QuestL12Nuns_classCallCheck(this, Quest12WarNuns);QuestL12Nuns_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get("The Themthar Hills"));QuestL12Nuns_defineProperty(this, "hobo",
    external_kolmafia_namespaceObject.Familiar.get("Hobo Monkey"));QuestL12Nuns_defineProperty(this, "hotness",
    external_kolmafia_namespaceObject.Item.get("Mick's IcyVapoHotness Inhaler"));QuestL12Nuns_defineProperty(this, "effect",
    (0,external_kolmafia_namespaceObject.effectModifier)(this.hotness, "Effect"));QuestL12Nuns_defineProperty(this, "winkles",
    external_kolmafia_namespaceObject.Effect.get("Winklered"));QuestL12Nuns_defineProperty(this, "bowlStraightUp",
    external_kolmafia_namespaceObject.Effect.get("Cosmic Ball in the Air"));QuestL12Nuns_defineProperty(this, "cosmicBall",
    external_kolmafia_namespaceObject.Item.get("Cosmic Bowling Ball"));QuestL12Nuns_defineProperty(this, "asdonMartin",
    external_kolmafia_namespaceObject.Item.get("Asdon Martin keyfob"));QuestL12Nuns_defineProperty(this, "driving",
    external_kolmafia_namespaceObject.Effect.get("Driving Observantly"));}QuestL12Nuns_createClass(Quest12WarNuns, [{ key: "hasAlreadyPulled", value:

    function hasAlreadyPulled() {
      return (
        GreySettings.isHardcoreMode() ||
        (0,external_kolmafia_namespaceObject.getProperty)("_roninStoragePulls").
        split(",").
        map((s) => (0,external_kolmafia_namespaceObject.toItem)((0,external_kolmafia_namespaceObject.toInt)(s))).
        includes(this.hotness));

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }, { key: "hasFamiliarRecommendation", value:

    function hasFamiliarRecommendation() {
      if ((0,external_kolmafia_namespaceObject.familiarWeight)(this.hobo) < 20) {
        return this.hobo;
      }

      return null;
    } }, { key: "level", value:

    function level() {
      return 12;
    } }, { key: "getId", value:

    function getId() {
      return "Council / War / Nuns";
    } }, { key: "isBowlingBallNextCombat", value:

    function isBowlingBallNextCombat() {
      return (
        (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("cosmicBowlingBallReturnCombats")) <= 0 ||
        (0,external_kolmafia_namespaceObject.availableAmount)(this.cosmicBall) > 0);

    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("sidequestNunsCompleted") != "none") {
        return QuestStatus.COMPLETED;
      }

      if (
      (0,external_kolmafia_namespaceObject.getProperty)("warProgress") != "started" ||
      (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("hippiesDefeated")) < 192)
      {
        return QuestStatus.NOT_READY;
      }

      if (!(0,external_kolmafia_namespaceObject.haveSkill)(external_kolmafia_namespaceObject.Skill.get("Financial Spreadsheets"))) {
        return QuestStatus.FASTER_LATER;
      }

      if (
      !this.mustBeDone() &&
      (0,external_kolmafia_namespaceObject.getProperty)("hasCosmicBowlingBall") == "true" &&
      !(0,external_kolmafia_namespaceObject.haveEffect)(this.bowlStraightUp) &&
      !this.isBowlingBallNextCombat())
      {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.FASTER_LATER;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();
      outfit.addItem(external_kolmafia_namespaceObject.Item.get("Beer Helmet"));
      outfit.addItem(external_kolmafia_namespaceObject.Item.get("distressed denim pants"));
      outfit.addItem(external_kolmafia_namespaceObject.Item.get("bejeweled pledge pin"));
      outfit.meatDropWeight = 10;

      return {
        familiar: this.hobo,
        location: this.loc,
        outfit: outfit,
        disableFamOverride: true,
        run: () => {
          if (this.getMeat() == 0) {
            this.visitNuns();
            (0,external_kolmafia_namespaceObject.cliExecute)("boombox meat");
          }

          this.tryToBuff();

          var meat = this.getMeat();

          greyAdv(
          this.loc,
          outfit,
          new AdventureSettings().setStartOfFightMacro(
          Macro.trySkill("sing along").trySkill(external_kolmafia_namespaceObject.Skill.get("Bowl Straight Up"))));



          if (meat >= this.getMeat() || this.getMeat() >= 100000) {
            this.visitNuns();

            if (this.status() == QuestStatus.COMPLETED) {
              (0,external_kolmafia_namespaceObject.cliExecute)("boombox food");
            }
          }
        } };

    } }, { key: "visitNuns", value:

    function visitNuns() {
      (0,external_kolmafia_namespaceObject.visitUrl)("bigisland.php?place=nunnery");
    } }, { key: "getMeat", value:

    function getMeat() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("currentNunneryMeat"));
    } }, { key: "mustBeDone", value:

    function mustBeDone() {
      return (0,external_kolmafia_namespaceObject.haveEffect)(this.effect) + (0,external_kolmafia_namespaceObject.haveEffect)(this.winkles) > 0;
    } }, { key: "tryToBuff", value:

    function tryToBuff() {
      if (
      (0,external_kolmafia_namespaceObject.getWorkshed)() == this.asdonMartin &&
      (0,external_kolmafia_namespaceObject.getFuel)() > 37 &&
      (0,external_kolmafia_namespaceObject.haveEffect)(this.driving) == 0)
      {
        (0,external_kolmafia_namespaceObject.cliExecute)("asdonmartin drive Observantly");
      }

      if (!this.hasAlreadyPulled()) {
        GreyPulls.pullMeatBuffers();

        (0,external_kolmafia_namespaceObject.use)(this.hotness);
      }

      if (!(0,external_kolmafia_namespaceObject.toBoolean)((0,external_kolmafia_namespaceObject.getProperty)("concertVisited"))) {
        (0,external_kolmafia_namespaceObject.cliExecute)("concert 2"); // Feeling wrinkled
      }
    } }]);return Quest12WarNuns;}();
;// CONCATENATED MODULE: ./src/quests/council/islandwar/QuestL12Worms.ts
function QuestL12Worms_slicedToArray(arr, i) {return QuestL12Worms_arrayWithHoles(arr) || QuestL12Worms_iterableToArrayLimit(arr, i) || QuestL12Worms_unsupportedIterableToArray(arr, i) || QuestL12Worms_nonIterableRest();}function QuestL12Worms_nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function QuestL12Worms_iterableToArrayLimit(arr, i) {var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];if (_i == null) return;var _arr = [];var _n = true;var _d = false;var _s, _e;try {for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function QuestL12Worms_arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function QuestL12Worms_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestL12Worms_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e2) {throw _e2;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e3) {didErr = true;err = _e3;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestL12Worms_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestL12Worms_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestL12Worms_arrayLikeToArray(o, minLen);}function QuestL12Worms_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestL12Worms_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL12Worms_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL12Worms_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL12Worms_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL12Worms_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL12Worms_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestL12Worms = /*#__PURE__*/function () {function QuestL12Worms() {QuestL12Worms_classCallCheck(this, QuestL12Worms);QuestL12Worms_defineProperty(this, "nanovision",
    external_kolmafia_namespaceObject.Skill.get("Double Nanovision"));QuestL12Worms_defineProperty(this, "effects",





    [
    [
    external_kolmafia_namespaceObject.Item.get("filthworm royal guard scent gland"),
    external_kolmafia_namespaceObject.Location.get("The Queen's Chamber")],

    [
    external_kolmafia_namespaceObject.Item.get("filthworm drone scent gland"),
    external_kolmafia_namespaceObject.Location.get("The Royal Guard Chamber")],

    [
    external_kolmafia_namespaceObject.Item.get("Filthworm hatchling scent gland"),
    external_kolmafia_namespaceObject.Location.get("The Feeding Chamber")],

    [null, external_kolmafia_namespaceObject.Location.get("The Hatching Chamber")]]);}QuestL12Worms_createClass(QuestL12Worms, [{ key: "getId", value: function getId() {return "Council / War / Filthworms";} }, { key: "getLocations", value:


    function getLocations() {
      return this.effects.map((e) => e[1]);
    } }, { key: "level", value:

    function level() {
      return 12;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("sidequestOrchardCompleted") != "none") {
        return QuestStatus.COMPLETED;
      }

      if (
      (0,external_kolmafia_namespaceObject.getProperty)("warProgress") != "started" ||
      (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("hippiesDefeated")) < 64)
      {
        return QuestStatus.NOT_READY;
      }

      if (!(0,external_kolmafia_namespaceObject.haveSkill)(this.nanovision)) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "outfitNeeded", value:

    function outfitNeeded() {
      return (0,external_kolmafia_namespaceObject.itemAmount)(external_kolmafia_namespaceObject.Item.get("heart of the filthworm queen")) > 0;
    } }, { key: "run", value:

    function run() {
      if ((0,external_kolmafia_namespaceObject.itemAmount)(external_kolmafia_namespaceObject.Item.get("heart of the filthworm queen")) > 0) {
        var _outfit = new GreyOutfit();
        _outfit.addItem(external_kolmafia_namespaceObject.Item.get("Beer Helmet"));
        _outfit.addItem(external_kolmafia_namespaceObject.Item.get("distressed denim pants"));
        _outfit.addItem(external_kolmafia_namespaceObject.Item.get("bejeweled pledge pin"));

        return {
          outfit: _outfit,
          location: null,
          run: () => {
            (0,external_kolmafia_namespaceObject.visitUrl)("bigisland.php?place=orchard&action=stand&pwd=");
            (0,external_kolmafia_namespaceObject.visitUrl)("bigisland.php?place=orchard&action=stand&pwd=");
            (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=hippy");
          } };

      }

      var outfit = new GreyOutfit();

      if (
      (0,external_kolmafia_namespaceObject.itemAmount)(external_kolmafia_namespaceObject.Item.get("filthworm royal guard scent gland")) > 0 ||
      (0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("Filthworm Guard Stench")) > 0)
      {
        outfit.meatDropWeight = 4;
      } else {
        outfit.setItemDrops();
      }

      var chamber = this.effects.find(
      (e) =>
      e[0] == null ||
      (0,external_kolmafia_namespaceObject.availableAmount)(e[0]) > 0 ||
      (0,external_kolmafia_namespaceObject.haveEffect)((0,external_kolmafia_namespaceObject.effectModifier)(e[0], "Effect")) > 0)[
      1];

      return {
        location: chamber,
        outfit: outfit,
        run: () => {
          this.useGlands();

          greyAdv(
          chamber,
          outfit,
          new AdventureSettings().setFinishingBlowMacro(
          Macro.skill(this.nanovision).repeat()));


        } };

    } }, { key: "useGlands", value:

    function useGlands() {var _iterator = QuestL12Worms_createForOfIteratorHelper(
      this.effects),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var i = _step.value;
          if (i[0] == null) {
            continue;
          }

          var effect = (0,external_kolmafia_namespaceObject.effectModifier)(i[0], "Effect");

          if ((0,external_kolmafia_namespaceObject.haveEffect)(effect) > 0) {
            break;
          }

          var amount = (0,external_kolmafia_namespaceObject.itemAmount)(i[0]);

          if (amount == 0) {
            continue;
          }

          (0,external_kolmafia_namespaceObject.use)(i[0], 1);
          break;
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
    } }, { key: "mustBeDone", value:

    function mustBeDone() {var _iterator2 = QuestL12Worms_createForOfIteratorHelper(
      this.effects),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _step2$value = QuestL12Worms_slicedToArray(_step2.value, 2),glandRequired = _step2$value[0],loc = _step2$value[1];
          if (glandRequired == null) {
            continue;
          }

          var effect = (0,external_kolmafia_namespaceObject.effectModifier)(glandRequired, "Effect");

          // If the gland is in operation
          if ((0,external_kolmafia_namespaceObject.haveEffect)(effect) > 0) {
            return true;
          }

          // If the gland is available
          if ((0,external_kolmafia_namespaceObject.availableAmount)(glandRequired) > 0) {
            return false;
          }
        }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}

      return false;
    } }]);return QuestL12Worms;}();
;// CONCATENATED MODULE: ./src/quests/council/islandwar/QuestL12StartWar.ts
function QuestL12StartWar_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL12StartWar_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL12StartWar_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL12StartWar_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL12StartWar_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL12StartWar_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








var QuestL12StartWar = /*#__PURE__*/function () {function QuestL12StartWar() {QuestL12StartWar_classCallCheck(this, QuestL12StartWar);QuestL12StartWar_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get("Hippy Camp"));}QuestL12StartWar_createClass(QuestL12StartWar, [{ key: "level", value:

    function level() {
      return 12;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("warProgress") != "unstarted") {
        return QuestStatus.COMPLETED;
      }

      if (!this.hasBoat() || !this.hasOutfit()) {
        return QuestStatus.NOT_READY;
      }

      if (external_kolmafia_namespaceObject.Stat.all().find((s) => (0,external_kolmafia_namespaceObject.myBasestat)(s) < 70) != null) {
        return QuestStatus.NOT_READY;
      }

      if (!this.hasOutfit()) {
        if ((0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("Everything Looks Yellow")) > 0) {
          return QuestStatus.NOT_READY;
        }

        return QuestStatus.READY;
      }

      if (!hasNonCombatSkillsReady()) {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "hasBoat", value:

    function hasBoat() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastIslandUnlock")) == (0,external_kolmafia_namespaceObject.myAscensions)();
    } }, { key: "hasOutfit", value:

    function hasOutfit() {
      return (0,external_kolmafia_namespaceObject.haveOutfit)("Frat Warrior Fatigues");
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setNoCombat();
      outfit.addItem(external_kolmafia_namespaceObject.Item.get("Beer Helmet"));
      outfit.addItem(external_kolmafia_namespaceObject.Item.get("distressed denim pants"));
      outfit.addItem(external_kolmafia_namespaceObject.Item.get("bejeweled pledge pin"));

      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          DelayBurners.tryReplaceCombats();

          greyAdv(this.loc, outfit);

          if ((0,external_kolmafia_namespaceObject.getProperty)("warProgress") != "unstarted") {
            this.visitArena();
          }
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Council / War / Start";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }, { key: "visitArena", value:

    function visitArena() {
      (0,external_kolmafia_namespaceObject.outfit)("Frat Warrior Fatigues");
      (0,external_kolmafia_namespaceObject.visitUrl)("bigisland.php?place=concert&pwd");
    } }]);return QuestL12StartWar;}();
;// CONCATENATED MODULE: ./src/quests/council/islandwar/QuestL12WarBoss.ts
function QuestL12WarBoss_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestL12WarBoss_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestL12WarBoss_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestL12WarBoss_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestL12WarBoss_arrayLikeToArray(o, minLen);}function QuestL12WarBoss_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestL12WarBoss_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL12WarBoss_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL12WarBoss_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL12WarBoss_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL12WarBoss_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}






var QuestL12WarBoss = /*#__PURE__*/function () {function QuestL12WarBoss() {QuestL12WarBoss_classCallCheck(this, QuestL12WarBoss);}QuestL12WarBoss_createClass(QuestL12WarBoss, [{ key: "getId", value:
    function getId() {
      return "Council / War / Boss";
    } }, { key: "level", value:

    function level() {
      return 12;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("warProgress") == "finished") {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("hippiesDefeated")) >= 1000) {
        return QuestStatus.READY;
      }

      return QuestStatus.NOT_READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();
      outfit.addItem(external_kolmafia_namespaceObject.Item.get("Beer Helmet"));
      outfit.addItem(external_kolmafia_namespaceObject.Item.get("distressed denim pants"));
      outfit.addItem(external_kolmafia_namespaceObject.Item.get("bejeweled pledge pin"));

      return {
        outfit: outfit,
        location: null,
        run: () => {
          this.sellBuyCrap();

          (0,external_kolmafia_namespaceObject.visitUrl)("bigisland.php?place=camp&whichcamp=1");
          (0,external_kolmafia_namespaceObject.visitUrl)("bigisland.php?place=camp&whichcamp=2");

          greyAdv(
          "bigisland.php?action=bossfight&pwd",
          null,
          new AdventureSettings().setFinishingBlowMacro(Macro.attack().repeat()));


          (0,external_kolmafia_namespaceObject.council)();
        } };

    } }, { key: "sellBuyCrap", value:

    function sellBuyCrap() {
      var crap = [
      "pink clay bead",
      "purple clay bead",
      "green clay bead",
      "communications windchimes",
      "bullet-proof corduroys",
      "round purple sunglasses",
      "reinforced beaded headband"].
      map((s) => external_kolmafia_namespaceObject.Item.get(s));var _iterator = QuestL12WarBoss_createForOfIteratorHelper(

      crap),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var s = _step.value;
          var keep = (0,external_kolmafia_namespaceObject.toSlot)(s) == external_kolmafia_namespaceObject.Slot.get("None") ? 1 : 0;

          if ((0,external_kolmafia_namespaceObject.itemAmount)(s) <= keep) {
            continue;
          }

          (0,external_kolmafia_namespaceObject.sell)(s.buyer, (0,external_kolmafia_namespaceObject.itemAmount)(s) - keep, s);
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

      var master = crap[0].buyer;

      var needHealers = 10 - (0,external_kolmafia_namespaceObject.itemAmount)(external_kolmafia_namespaceObject.Item.get("gauze garter"));
      needHealers = Math.min(needHealers, Math.floor(master.availableTokens / 2));

      if (needHealers > 0) {
        (0,external_kolmafia_namespaceObject.cliExecute)("make " + needHealers + " gauze garter");
      }

      while (master.availableTokens >= 5) {
        (0,external_kolmafia_namespaceObject.cliExecute)(
        "make " +
        Math.floor(master.availableTokens / 5) +
        " commemorative war stein");

      }

      while (master.availableTokens >= 2) {
        (0,external_kolmafia_namespaceObject.cliExecute)(
        "make " + Math.floor(master.availableTokens / 2) + " gauze garter");

      }

      while (master.availableTokens >= 1) {
        (0,external_kolmafia_namespaceObject.cliExecute)("make " + master.availableTokens + " beer bomb");
      }
    } }]);return QuestL12WarBoss;}();
;// CONCATENATED MODULE: ./src/quests/council/islandwar/QuestL12WarLobster.ts
function QuestL12WarLobster_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL12WarLobster_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL12WarLobster_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL12WarLobster_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL12WarLobster_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL12WarLobster_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var QuestL12Lobster = /*#__PURE__*/function () {function QuestL12Lobster() {QuestL12WarLobster_classCallCheck(this, QuestL12Lobster);QuestL12WarLobster_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get("Sonofa Beach"));QuestL12WarLobster_defineProperty(this, "item",
    external_kolmafia_namespaceObject.Item.get("barrel of gunpowder"));QuestL12WarLobster_defineProperty(this, "monster",
    external_kolmafia_namespaceObject.Monster.get("Lobsterfrogman"));QuestL12WarLobster_defineProperty(this, "cursed",
    external_kolmafia_namespaceObject.Item.get("Cursed Magnifying Glass"));QuestL12WarLobster_defineProperty(this, "glove",
    external_kolmafia_namespaceObject.Item.get("Powerful Glove"));}QuestL12WarLobster_createClass(QuestL12Lobster, [{ key: "level", value:

    function level() {
      return 12;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("sidequestLighthouseCompleted") != "none") {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("warProgress") != "started") {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.myAdventures)() < 22) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.item) >= 5) {
        return QuestStatus.READY;
      }

      if (this.isBackupReady()) {
        return QuestStatus.READY;
      }

      if ((0,external_kolmafia_namespaceObject.familiarWeight)(external_kolmafia_namespaceObject.Familiar.get("Grey Goose")) > 3) {
        return QuestStatus.NOT_READY;
      }

      if (this.hasVoidAndGlove()) {
        if (!this.isVoidReady()) {
          return QuestStatus.NOT_READY;
        }
      } else if (!hasCombatSkillReady()) {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "isVoidReady", value:

    function isVoidReady() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("cursedMagnifyingGlassCount")) == 13;
    } }, { key: "getId", value:

    function getId() {
      return "Council / War / Lobsters";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }, { key: "turnInQuest", value:

    function turnInQuest() {
      var outfit = new GreyOutfit();
      outfit.addItem(external_kolmafia_namespaceObject.Item.get("Beer Helmet"));
      outfit.addItem(external_kolmafia_namespaceObject.Item.get("distressed denim pants"));
      outfit.addItem(external_kolmafia_namespaceObject.Item.get("bejeweled pledge pin"));

      return {
        location: null,
        outfit: outfit,
        run: () => {
          (0,external_kolmafia_namespaceObject.visitUrl)("bigisland.php?place=lighthouse&action=pyro&pwd");
          (0,external_kolmafia_namespaceObject.visitUrl)("bigisland.php?place=lighthouse&action=pyro&pwd");
          (0,external_kolmafia_namespaceObject.visitUrl)("bigisland.php?place=lighthouse&action=pyro&pwd");
        } };

    } }, { key: "hasVoidAndGlove", value:

    function hasVoidAndGlove() {
      return (0,external_kolmafia_namespaceObject.availableAmount)(this.cursed) > 0 && (0,external_kolmafia_namespaceObject.availableAmount)(this.glove) > 0;
    } }, { key: "hasBackups", value:

    function hasBackups() {
      return 11 - (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_backUpUses"));
    } }, { key: "lastMonster", value:

    function lastMonster() {
      return (0,external_kolmafia_namespaceObject.toMonster)((0,external_kolmafia_namespaceObject.getProperty)("lastCopyableMonster"));
    } }, { key: "isBackupReady", value:

    function isBackupReady() {
      return this.hasBackups() > 0 && this.lastMonster() == this.monster;
    } }, { key: "run", value:

    function run() {
      // Try to turn in quest
      if ((0,external_kolmafia_namespaceObject.itemAmount)(this.item) >= 5) {
        return this.turnInQuest();
      }

      if (this.isBackupReady()) {
        var _outfit = new GreyOutfit().addItem(external_kolmafia_namespaceObject.Item.get("Backup Camera"));
        var loc = external_kolmafia_namespaceObject.Location.get("The Dire Warren");

        // TODO Backup and ruin other zones delay
        return {
          outfit: _outfit,
          location: loc,
          run: () => {
            greyAdv(
            loc,
            _outfit,
            new AdventureSettings().setStartOfFightMacro(
            new Macro().externalIf(
            external_kolmafia_namespaceObject.Monster.get("Fluffy Bunny"),
            Macro.skill(external_kolmafia_namespaceObject.Skill.get("Back-Up to your Last Enemy")))));



          } };

      }

      var outfit = new GreyOutfit();

      if (this.hasVoidAndGlove() && this.isVoidReady()) {
        outfit.addBonus("+equip cursed magnifying glass");
        outfit.addBonus("+equip Powerful Glove");
      } else {
        outfit.setPlusCombat();
      }

      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          var macro;

          if (this.hasVoidAndGlove() && this.isVoidReady()) {
            macro = Macro.if_(
            this.monster,
            Macro.skill("CHEAT CODE: Replace Enemy"),
            true);

          }

          greyAdv(
          this.loc,
          outfit,
          new AdventureSettings().setStartOfFightMacro(macro));

        } };

    } }, { key: "mustBeDone", value:

    function mustBeDone() {
      if (this.lastMonster() != this.monster) {
        return false;
      }

      if (this.hasBackups() <= 0) {
        return false;
      }

      if ((0,external_kolmafia_namespaceObject.itemAmount)(this.item) >= 5) {
        return false;
      }

      return true;
    } }]);return QuestL12Lobster;}();
;// CONCATENATED MODULE: ./src/quests/council/islandwar/QuestL12GrabWarOutfit.ts
function QuestL12GrabWarOutfit_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestL12GrabWarOutfit_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestL12GrabWarOutfit_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestL12GrabWarOutfit_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestL12GrabWarOutfit_arrayLikeToArray(o, minLen);}function QuestL12GrabWarOutfit_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestL12GrabWarOutfit_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL12GrabWarOutfit_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL12GrabWarOutfit_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL12GrabWarOutfit_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL12GrabWarOutfit_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL12GrabWarOutfit_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}









var QuestL12GrabWarOutfit = /*#__PURE__*/function () {function QuestL12GrabWarOutfit() {QuestL12GrabWarOutfit_classCallCheck(this, QuestL12GrabWarOutfit);QuestL12GrabWarOutfit_defineProperty(this, "location",
    external_kolmafia_namespaceObject.Location.get("Frat House"));QuestL12GrabWarOutfit_defineProperty(this, "rocket",
    external_kolmafia_namespaceObject.Item.get("Yellow Rocket"));QuestL12GrabWarOutfit_defineProperty(this, "effect",
    external_kolmafia_namespaceObject.Effect.get("Everything Looks Yellow"));QuestL12GrabWarOutfit_defineProperty(this, "shorts",
    external_kolmafia_namespaceObject.Item.get("Cargo Cultist Shorts"));}QuestL12GrabWarOutfit_createClass(QuestL12GrabWarOutfit, [{ key: "getId", value:

    function getId() {
      return "Council / War / FratOutfit";
    } }, { key: "hasBoat", value:

    function hasBoat() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastIslandUnlock")) == (0,external_kolmafia_namespaceObject.myAscensions)();
    } }, { key: "level", value:

    function level() {
      return 12;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.haveOutfit)("Frat Warrior Fatigues")) {
        return QuestStatus.COMPLETED;
      }

      if (
      (0,external_kolmafia_namespaceObject.availableAmount)(this.shorts) > 0 &&
      (0,external_kolmafia_namespaceObject.getProperty)("_cargoPocketEmptied") != "true")
      {
        return QuestStatus.NOT_READY;
      }

      if (GreySettings.isHardcoreMode() && !(0,external_kolmafia_namespaceObject.haveOutfit)("Filthy Hippy Disguise")) {
        return QuestStatus.NOT_READY;
      }

      if (!this.hasBoat() || (0,external_kolmafia_namespaceObject.myLevel)() < 12) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.haveEffect)(this.effect) > 0) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.myMeat)() < 350 || (0,external_kolmafia_namespaceObject.myLevel)() < 5) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      if (!GreySettings.isHardcoreMode()) {
        return {
          location: null,
          run: () => {
            GreyPulls.pullFratWarOutfit();
          } };

      }

      var outfit = new GreyOutfit().setPlusCombat();var _iterator = QuestL12GrabWarOutfit_createForOfIteratorHelper(

      (0,external_kolmafia_namespaceObject.outfitPieces)("Filthy Hippy Disguise")),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var item = _step.value;
          outfit.addItem(item);
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

      return {
        location: this.location,
        outfit: outfit,
        run: () => {
          (0,external_kolmafia_namespaceObject.retrieveItem)(this.rocket);

          if ((0,external_kolmafia_namespaceObject.itemAmount)(this.rocket) == 0) {
            throw "Supposed to have a yellow rocket on hand!";
          }

          var props = new PropertyManager();
          props.setChoice(143, 3);
          props.setChoice(144, 3);
          props.setChoice(145, 2);
          props.setChoice(146, 2);

          try {
            greyAdv(
            this.location,
            outfit,
            new AdventureSettings().setStartOfFightMacro(
            Macro.item(this.rocket)));


          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      if (GreySettings.isHardcoreMode()) {
        return [this.location];
      }

      return [];
    } }]);return QuestL12GrabWarOutfit;}();
;// CONCATENATED MODULE: ./src/quests/council/islandwar/QuestL12WarFlyers.ts
function QuestL12WarFlyers_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL12WarFlyers_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL12WarFlyers_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL12WarFlyers_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL12WarFlyers_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL12WarFlyers_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



var QuestL12WarFlyers = /*#__PURE__*/function () {function QuestL12WarFlyers() {QuestL12WarFlyers_classCallCheck(this, QuestL12WarFlyers);QuestL12WarFlyers_defineProperty(this, "flyers",
    external_kolmafia_namespaceObject.Item.get("Rock band flyers"));}QuestL12WarFlyers_createClass(QuestL12WarFlyers, [{ key: "getId", value:

    function getId() {
      return "Council / War / Flyers";
    } }, { key: "level", value:

    function level() {
      return 12;
    } }, { key: "status", value:

    function status() {
      if (this.isArenaDone()) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("questL12War") == "unstarted") {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.flyers) == 0) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("flyeredML")) < 10000) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          this.visitArena();
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "isArenaDone", value:

    function isArenaDone() {
      return (0,external_kolmafia_namespaceObject.getProperty)("sidequestArenaCompleted") != "none";
    } }, { key: "visitArena", value:

    function visitArena() {
      (0,external_kolmafia_namespaceObject.outfit)("Frat Warrior Fatigues");
      (0,external_kolmafia_namespaceObject.visitUrl)("bigisland.php?place=concert&pwd");

      // If something borked, lets just make us flyer another
      if (
      (0,external_kolmafia_namespaceObject.availableAmount)(this.flyers) > 0 &&
      (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("flyeredML")) >= 10000)
      {
        (0,external_kolmafia_namespaceObject.setProperty)("flyeredML", "9999");
      }
    } }]);return QuestL12WarFlyers;}();
;// CONCATENATED MODULE: ./src/quests/council/islandwar/QuestL12FratCargoShorts.ts
function QuestL12FratCargoShorts_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL12FratCargoShorts_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL12FratCargoShorts_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL12FratCargoShorts_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL12FratCargoShorts_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL12FratCargoShorts_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestL12FratCargoShorts = /*#__PURE__*/function () {function QuestL12FratCargoShorts() {QuestL12FratCargoShorts_classCallCheck(this, QuestL12FratCargoShorts);QuestL12FratCargoShorts_defineProperty(this, "shorts",
    external_kolmafia_namespaceObject.Item.get("Cargo Cultist Shorts"));QuestL12FratCargoShorts_defineProperty(this, "rocket",
    external_kolmafia_namespaceObject.Item.get("Yellow Rocket"));QuestL12FratCargoShorts_defineProperty(this, "effect",
    external_kolmafia_namespaceObject.Effect.get("Everything Looks Yellow"));}QuestL12FratCargoShorts_createClass(QuestL12FratCargoShorts, [{ key: "getId", value:

    function getId() {
      return "Council / War / Frat Cargo Shorts";
    } }, { key: "level", value:

    function level() {
      return 12;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.haveOutfit)("Frat Warrior Fatigues")) {
        return QuestStatus.COMPLETED;
      }

      if (
      (0,external_kolmafia_namespaceObject.getProperty)("_cargoPocketEmptied") == "true" ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.shorts) == 0)
      {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.haveEffect)(this.effect) > 0 || (0,external_kolmafia_namespaceObject.myMeat)() < 300) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.cliExecute)("acquire " + this.rocket.name);
          (0,external_kolmafia_namespaceObject.visitUrl)("inventory.php?action=pocket");
          (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?whichchoice=1420&option=1&pocket=568&pwd=");

          Macro.item(this.rocket).submit();
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "getResourceClaims", value:

    function getResourceClaims() {
      return [new ResourceClaim(ResourceType.CARGO_SHORTS, 1, "YR Frat Boy", 16)];
    } }]);return QuestL12FratCargoShorts;}();
;// CONCATENATED MODULE: ./src/quests/council/QuestL12War.ts
function QuestL12War_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL12War_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL12War_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL12War_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL12War_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL12War_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}













var QuestL12War = /*#__PURE__*/function () {function QuestL12War() {QuestL12War_classCallCheck(this, QuestL12War);QuestL12War_defineProperty(this, "children",
    [
    new QuestL12Battlefield(),
    new WarGremlins(),
    new Quest12WarNuns(),
    new QuestL12Worms(),
    new QuestL12StartWar(),
    new QuestL12WarBoss(),
    new QuestL12Lobster(),
    new QuestL12WarFlyers(),
    new QuestL12FratCargoShorts(),
    new QuestL12GrabWarOutfit()]);}QuestL12War_createClass(QuestL12War, [{ key: "getLocations", value:


    function getLocations() {
      return [];
    } }, { key: "getChildren", value:

    function getChildren() {
      return this.children;
    } }, { key: "getId", value:

    function getId() {
      return "Council / War / Parent";
    } }, { key: "level", value:

    function level() {
      return -1;
    } }, { key: "status", value:

    function status() {
      return QuestStatus.COMPLETED;
    } }, { key: "run", value:

    function run() {
      throw new Error("Method not implemented.");
    } }]);return QuestL12War;}();
;// CONCATENATED MODULE: ./src/quests/council/tower/keys/QuestDigitalKey.ts
function QuestDigitalKey_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestDigitalKey_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestDigitalKey_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestDigitalKey_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestDigitalKey_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestDigitalKey_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var QuestDigitalKey = /*#__PURE__*/function () {function QuestDigitalKey() {QuestDigitalKey_classCallCheck(this, QuestDigitalKey);QuestDigitalKey_defineProperty(this, "location",
    external_kolmafia_namespaceObject.Location.get("8-Bit Realm"));QuestDigitalKey_defineProperty(this, "wPixel",
    external_kolmafia_namespaceObject.Item.get("White Pixel"));QuestDigitalKey_defineProperty(this, "rPixel",
    external_kolmafia_namespaceObject.Item.get("Red Pixel"));QuestDigitalKey_defineProperty(this, "gPixel",
    external_kolmafia_namespaceObject.Item.get("Green Pixel"));QuestDigitalKey_defineProperty(this, "bPixel",
    external_kolmafia_namespaceObject.Item.get("Blue Pixel"));QuestDigitalKey_defineProperty(this, "transfomer",
    external_kolmafia_namespaceObject.Item.get("continuum transfunctioner"));QuestDigitalKey_defineProperty(this, "key",
    external_kolmafia_namespaceObject.Item.get("Digital key"));}QuestDigitalKey_createClass(QuestDigitalKey, [{ key: "level", value:

    function level() {
      return 4;
    } }, { key: "atDoor", value:

    function atDoor() {
      return getQuestStatus("questL13Final") == 5;
    } }, { key: "status", value:

    function status() {
      if (
      getQuestStatus("questL13Final") > 5 ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.key) > 0 ||
      (0,external_kolmafia_namespaceObject.getProperty)("nsTowerDoorKeysUsed").includes(this.key.name))
      {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.transfomer) == 0) {
        return QuestStatus.READY;
      }

      // If we can make white pixels, or we have enough pixels
      if (this.needPixels() - this.canMakePixelCount() <= 0) {
        return QuestStatus.READY;
      }

      var status = getQuestStatus("questL13Final");

      // If we're not at the keys, don't farm yet. We can still hit it from powerful glove
      if (status != 5) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "canMakePixels", value:

    function canMakePixels() {
      return this.canMakePixelCount() > 0;
    } }, { key: "canMakePixelCount", value:

    function canMakePixelCount() {
      return Math.min(
      (0,external_kolmafia_namespaceObject.itemAmount)(this.rPixel),
      (0,external_kolmafia_namespaceObject.itemAmount)(this.bPixel),
      (0,external_kolmafia_namespaceObject.itemAmount)(this.gPixel));

    } }, { key: "needPixels", value:

    function needPixels() {
      return Math.max(0, 30 - (0,external_kolmafia_namespaceObject.itemAmount)(this.wPixel));
    } }, { key: "run", value:

    function run() {
      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.transfomer) == 0) {
        return {
          location: null,
          run: () => {
            (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=forestvillage&action=fv_mystic");

            while ((0,external_kolmafia_namespaceObject.handlingChoice)()) {
              (0,external_kolmafia_namespaceObject.runChoice)(1);
            }
          } };

      }

      if (
      this.needPixels() - this.canMakePixelCount() <= 0 &&
      this.needPixels() > 0)
      {
        return {
          location: null,
          run: () => {
            var toMake = Math.min(
            (0,external_kolmafia_namespaceObject.itemAmount)(this.rPixel),
            (0,external_kolmafia_namespaceObject.itemAmount)(this.gPixel),
            (0,external_kolmafia_namespaceObject.itemAmount)(this.bPixel),
            this.needPixels());


            (0,external_kolmafia_namespaceObject.create)(this.wPixel, toMake);
          } };

      }

      if (this.needPixels() <= 0) {
        return {
          location: null,
          run: () => {
            (0,external_kolmafia_namespaceObject.retrieveItem)(this.key);
          } };

      }

      var outfit = new GreyOutfit().setItemDrops();
      outfit.addItem(this.transfomer);
      var settings = new AdventureSettings();
      settings.addNoBanish(external_kolmafia_namespaceObject.Monster.get("Blooper"));
      settings.addNoBanish(external_kolmafia_namespaceObject.Monster.get("Buzzy Beetle"));
      settings.addNoBanish(external_kolmafia_namespaceObject.Monster.get("Goomba"));
      settings.addNoBanish(external_kolmafia_namespaceObject.Monster.get("Koopa Troopa"));
      settings.addNoBanish(external_kolmafia_namespaceObject.Monster.get("Tektite"));

      return {
        location: this.location,
        outfit: outfit,
        run: () => {
          greyAdv(this.location, outfit, settings);
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Council / Tower / Keys / Digital";
    } }, { key: "getLocations", value:

    function getLocations() {
      // Don't hog this location when we're not sure we need to
      if (!this.atDoor()) {
        return [];
      }

      return [this.location];
    } }]);return QuestDigitalKey;}();
;// CONCATENATED MODULE: ./src/quests/council/tower/keys/QuestDailyDungeon.ts
function QuestDailyDungeon_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestDailyDungeon_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestDailyDungeon_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestDailyDungeon_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestDailyDungeon_arrayLikeToArray(o, minLen);}function QuestDailyDungeon_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestDailyDungeon_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestDailyDungeon_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestDailyDungeon_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestDailyDungeon_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestDailyDungeon_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestDailyDungeon_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var QuestDailyDungeon = /*#__PURE__*/function () {















  function QuestDailyDungeon() {QuestDailyDungeon_classCallCheck(this, QuestDailyDungeon);QuestDailyDungeon_defineProperty(this, "pole", external_kolmafia_namespaceObject.Item.get("eleven-foot pole"));QuestDailyDungeon_defineProperty(this, "ring", external_kolmafia_namespaceObject.Item.get("ring of Detect Boring Doors"));QuestDailyDungeon_defineProperty(this, "picklocks", external_kolmafia_namespaceObject.Item.get("Pick-O-Matic lockpicks"));QuestDailyDungeon_defineProperty(this, "keys", ["Boris's key", "Sneaky Pete's key", "Jarlsberg's key"].map((s) => external_kolmafia_namespaceObject.Item.get(s)));QuestDailyDungeon_defineProperty(this, "zappables", []);QuestDailyDungeon_defineProperty(this, "location", external_kolmafia_namespaceObject.Location.get("The Daily Dungeon"));QuestDailyDungeon_defineProperty(this, "fam", external_kolmafia_namespaceObject.Familiar.get("Gelatinous Cubeling"));QuestDailyDungeon_defineProperty(this, "malware", external_kolmafia_namespaceObject.Item.get("Daily dungeon malware"));var _iterator = QuestDailyDungeon_createForOfIteratorHelper(
    this.keys),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var i = _step.value;
        Object.keys((0,external_kolmafia_namespaceObject.getRelated)(i, "zap")).forEach((s) => {
          var i = external_kolmafia_namespaceObject.Item.get(s);

          if (this.zappables.includes(i)) {
            return;
          }

          this.zappables.push(i);
        });
      }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
  }QuestDailyDungeon_createClass(QuestDailyDungeon, [{ key: "getLocations", value: function getLocations() {return [this.location];} }, { key: "isDailyDoneToday", value:

    function isDailyDoneToday() {
      return (0,external_kolmafia_namespaceObject.getProperty)("dailyDungeonDone") == "true";
    } }, { key: "hasFamiliarRecommendation", value:

    function hasFamiliarRecommendation() {
      if (
      (0,external_kolmafia_namespaceObject.availableAmount)(this.pole) > 0 &&
      (0,external_kolmafia_namespaceObject.availableAmount)(this.ring) > 0 &&
      (0,external_kolmafia_namespaceObject.availableAmount)(this.picklocks) > 0)
      {
        return null;
      }

      return this.fam;
    } }, { key: "level", value:

    function level() {
      return 7;
    } }, { key: "status", value:

    function status() {
      if (getQuestStatus("questL13Final") > 5 || this.isDailyDoneToday()) {
        return QuestStatus.COMPLETED;
      }

      if (this.hasFamiliarRecommendation() != null) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();
      outfit.addItem(this.ring);

      return {
        outfit: outfit,
        location: this.location,
        run: () => {
          var props = new PropertyManager();
          props.setChoice(692, 3);
          var settings = new AdventureSettings();

          if (
          (0,external_kolmafia_namespaceObject.itemAmount)(this.malware) > 0 &&
          (0,external_kolmafia_namespaceObject.getProperty)("_dailyDungeonMalwareUsed") != "true")
          {
            settings.setStartOfFightMacro(Macro.item(this.malware));
          }

          try {
            greyAdv(this.location, outfit, settings);
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "needAdventures", value:

    function needAdventures() {
      return 9;
    } }, { key: "getId", value:

    function getId() {
      return "Council / Tower / Keys / DailyDungeon";
    } }]);return QuestDailyDungeon;}();
;// CONCATENATED MODULE: ./src/quests/council/tower/keys/QuestSkeletonKey.ts
function QuestSkeletonKey_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestSkeletonKey_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestSkeletonKey_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestSkeletonKey_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestSkeletonKey_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestSkeletonKey_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestSkeletonKey = /*#__PURE__*/function () {function QuestSkeletonKey() {QuestSkeletonKey_classCallCheck(this, QuestSkeletonKey);QuestSkeletonKey_defineProperty(this, "key",
    external_kolmafia_namespaceObject.Item.get("Skeleton Key"));QuestSkeletonKey_defineProperty(this, "bone",
    external_kolmafia_namespaceObject.Item.get("skeleton bone"));QuestSkeletonKey_defineProperty(this, "teeth",
    external_kolmafia_namespaceObject.Item.get("loose teeth"));QuestSkeletonKey_defineProperty(this, "location",
    external_kolmafia_namespaceObject.Location.get(" The Skeleton Store"));QuestSkeletonKey_defineProperty(this, "priceTag",
    external_kolmafia_namespaceObject.Item.get("bone with a price tag on it"));}QuestSkeletonKey_createClass(QuestSkeletonKey, [{ key: "getId", value:

    function getId() {
      return "Council / Tower / Keys / Skeleton";
    } }, { key: "level", value:

    function level() {
      return 7;
    } }, { key: "status", value:

    function status() {
      if (
      getQuestStatus("questL13Final") > 5 ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.key) > 0 ||
      (0,external_kolmafia_namespaceObject.getProperty)("nsTowerDoorKeysUsed").includes(this.key.name))
      {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.bone) > 0 && (0,external_kolmafia_namespaceObject.availableAmount)(this.teeth) > 0) {
        if ((0,external_kolmafia_namespaceObject.myMeat)() > 100) {
          return QuestStatus.READY;
        } else {
          return QuestStatus.NOT_READY;
        }
      }

      if (!(0,external_canadv_ash_namespaceObject.canAdv)(this.location)) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.FASTER_LATER;
    } }, { key: "run", value:

    function run() {
      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.bone) > 0 && (0,external_kolmafia_namespaceObject.availableAmount)(this.teeth) > 0) {
        return this.craft();
      }

      return this.adventure();
    } }, { key: "craft", value:

    function craft() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.retrieveItem)(this.key);
        } };

    } }, { key: "adventure", value:

    function adventure() {
      var outfit = new GreyOutfit().setItemDrops();

      return {
        location: this.location,
        outfit: outfit,
        run: () => {
          greyAdv(this.location, outfit);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestSkeletonKey;}();
;// CONCATENATED MODULE: ./src/quests/council/tower/keys/QuestStarKey.ts
function QuestStarKey_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestStarKey_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestStarKey_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestStarKey_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestStarKey_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestStarKey_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var QuestStarKey = /*#__PURE__*/function () {function QuestStarKey() {QuestStarKey_classCallCheck(this, QuestStarKey);QuestStarKey_defineProperty(this, "location",
    external_kolmafia_namespaceObject.Location.get("The Hole in the sky"));QuestStarKey_defineProperty(this, "rocket",
    external_kolmafia_namespaceObject.Item.get("steam-powered model rocketship"));QuestStarKey_defineProperty(this, "star",
    external_kolmafia_namespaceObject.Item.get("Star"));QuestStarKey_defineProperty(this, "map",
    external_kolmafia_namespaceObject.Item.get("Star Chart"));QuestStarKey_defineProperty(this, "line",
    external_kolmafia_namespaceObject.Item.get("Line"));QuestStarKey_defineProperty(this, "key",
    external_kolmafia_namespaceObject.Item.get("Richard's star key"));QuestStarKey_defineProperty(this, "holeInSky",
    new QuestTowerHoleInSkyUnlock());}QuestStarKey_createClass(QuestStarKey, [{ key: "getChildren", value:

    function getChildren() {
      return [this.holeInSky];
    } }, { key: "level", value:

    function level() {
      return 8;
    } }, { key: "status", value:

    function status() {
      if (
      getQuestStatus("questL13Final") > 5 ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.key) > 0 ||
      (0,external_kolmafia_namespaceObject.getProperty)("nsTowerDoorKeysUsed").includes(this.key.name))
      {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.rocket) == 0) {
        return QuestStatus.NOT_READY;
      }

      /*if (getQuestStatus("questL13Final") < 5) {
        return QuestStatus.NOT_READY;
      }*/

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      if (
      (0,external_kolmafia_namespaceObject.availableAmount)(this.map) > 0 &&
      (0,external_kolmafia_namespaceObject.availableAmount)(this.line) >= 7 &&
      (0,external_kolmafia_namespaceObject.availableAmount)(this.star) >= 8)
      {
        return {
          location: null,
          run: () => {
            (0,external_kolmafia_namespaceObject.retrieveItem)(this.key);
          } };

      }

      var outfit = new GreyOutfit().setItemDrops();

      return {
        location: this.location,
        outfit: outfit,
        run: () => {
          greyAdv(this.location, outfit);
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Council / Tower / Keys / Star";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.location];
    } }]);return QuestStarKey;}();


var QuestTowerHoleInSkyUnlock = /*#__PURE__*/function () {function QuestTowerHoleInSkyUnlock() {QuestStarKey_classCallCheck(this, QuestTowerHoleInSkyUnlock);QuestStarKey_defineProperty(this, "topFloor",
    external_kolmafia_namespaceObject.Location.get(
    "The Castle in the Clouds in the Sky (Top Floor)"));QuestStarKey_defineProperty(this, "rocket",

    external_kolmafia_namespaceObject.Item.get("steam-powered model rocketship"));QuestStarKey_defineProperty(this, "copperFeel",
    677);QuestStarKey_defineProperty(this, "flavorOfARaver",
    676);QuestStarKey_defineProperty(this, "yeahPunkRock",
    678);QuestStarKey_defineProperty(this, "gothNC",
    675);}QuestStarKey_createClass(QuestTowerHoleInSkyUnlock, [{ key: "getId", value:

    function getId() {
      return "Council / Tower / Keys / HoleInSkyUnlock";
    } }, { key: "level", value:

    function level() {
      return 8;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questL10Garbage") != "finished") {
        return QuestStatus.NOT_READY;
      }

      if (
      getQuestStatus("questL13Final") > 5 ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.rocket) > 0)
      {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setNoCombat();

      return {
        location: this.topFloor,
        outfit: outfit,
        run: () => {
          var props = new PropertyManager();

          props.setChoice(this.copperFeel, 2); // Grab rocket
          props.setChoice(this.gothNC, 4); // Crawl to steam
          props.setChoice(this.yeahPunkRock, 3); // Crawl to steam
          props.setChoice(this.flavorOfARaver, 4); // Crawl to punk

          try {
            greyAdv(this.topFloor, outfit);
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestTowerHoleInSkyUnlock;}();
;// CONCATENATED MODULE: ./src/quests/custom/QuestKeyStuffAbstract.ts
function QuestKeyStuffAbstract_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestKeyStuffAbstract_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestKeyStuffAbstract_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestKeyStuffAbstract_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestKeyStuffAbstract_arrayLikeToArray(o, minLen);}function QuestKeyStuffAbstract_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestKeyStuffAbstract_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestKeyStuffAbstract_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestKeyStuffAbstract_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestKeyStuffAbstract_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestKeyStuffAbstract_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestKeyStuffAbstract_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


var QuestKeyStuffAbstract = /*#__PURE__*/function () {function QuestKeyStuffAbstract() {QuestKeyStuffAbstract_classCallCheck(this, QuestKeyStuffAbstract);QuestKeyStuffAbstract_defineProperty(this, "keys",
    ["Boris's key", "Sneaky Pete's key", "Jarlsberg's key"].map(
    (s) => external_kolmafia_namespaceObject.Item.get(s)));QuestKeyStuffAbstract_defineProperty(this, "zappables",

    []);QuestKeyStuffAbstract_defineProperty(this, "token",
    external_kolmafia_namespaceObject.Item.get("Fat loot token"));QuestKeyStuffAbstract_defineProperty(this, "wand",
    [
    "aluminum wand",
    "ebony wand",
    "hexagonal wand",
    "marble wand",
    "pine wand"].
    map((s) => external_kolmafia_namespaceObject.Item.get(s)));}QuestKeyStuffAbstract_createClass(QuestKeyStuffAbstract, [{ key: "getKeysUsed", value:

    function getKeysUsed() {
      return (0,external_kolmafia_namespaceObject.getProperty)("nsTowerDoorKeysUsed").
      split(",").
      filter((s) => s.length > 0).
      map((s) => external_kolmafia_namespaceObject.Item.get(s)).
      filter((k) => this.keys.includes(k));
    } }, { key: "getUnusedKeys", value:

    function getUnusedKeys() {
      var used = this.getKeysUsed();

      return this.keys.filter((i) => !used.includes(i));
    } }, { key: "getKeysUnavailable", value:

    function getKeysUnavailable() {
      var used = this.getKeysUsed();

      return this.keys.filter(
      (k) => !used.includes(k) && (0,external_kolmafia_namespaceObject.availableAmount)(k) == 0);

    } }, { key: "getOwnedZappables", value:

    function getOwnedZappables() {
      var owned = [];var _iterator = QuestKeyStuffAbstract_createForOfIteratorHelper(

      this.getZappableItems()),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var i = _step.value;
          for (var a = 0; a < (0,external_kolmafia_namespaceObject.availableAmount)(i); a++) {
            owned.push(i);
          }
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

      return owned;
    } }, { key: "getOwnedKeys", value:

    function getOwnedKeys() {
      return this.keys.filter((k) => (0,external_kolmafia_namespaceObject.availableAmount)(k) > 0);
    } }, { key: "getViableKeyCount", value:

    function getViableKeyCount() {
      var keys =
      (0,external_kolmafia_namespaceObject.availableAmount)(this.token) +
      this.getKeysUsed().length +
      this.getOwnedKeys().length;

      if ((0,external_kolmafia_namespaceObject.getProperty)("dailyDungeonDone") == "false") {
        keys += 1;
      }

      if (canCombatLocket(external_kolmafia_namespaceObject.Monster.get("Fantasy Bandit"))) {
        keys += 1;
      }

      return keys;
    } }, { key: "getZappableItems", value:

    function getZappableItems() {
      if (this.zappables.length == 0) {var _iterator2 = QuestKeyStuffAbstract_createForOfIteratorHelper(
        this.keys),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var i = _step2.value;
            Object.keys((0,external_kolmafia_namespaceObject.getRelated)(i, "zap")).forEach((s) => {
              var i = external_kolmafia_namespaceObject.Item.get(s);

              if (this.zappables.includes(i) || this.keys.includes(i)) {
                return;
              }

              this.zappables.push(i);
            });
          }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}
      }

      return this.zappables;
    } }]);return QuestKeyStuffAbstract;}();
;// CONCATENATED MODULE: ./src/quests/council/tower/stages/QuestTowerKeys.ts
function QuestTowerKeys_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestTowerKeys_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestTowerKeys_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestTowerKeys_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestTowerKeys_arrayLikeToArray(o, minLen);}function QuestTowerKeys_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestTowerKeys_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestTowerKeys_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestTowerKeys_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestTowerKeys_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestTowerKeys_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestTowerKeys_inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) QuestTowerKeys_setPrototypeOf(subClass, superClass);}function QuestTowerKeys_setPrototypeOf(o, p) {QuestTowerKeys_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return QuestTowerKeys_setPrototypeOf(o, p);}function QuestTowerKeys_createSuper(Derived) {var hasNativeReflectConstruct = QuestTowerKeys_isNativeReflectConstruct();return function _createSuperInternal() {var Super = QuestTowerKeys_getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = QuestTowerKeys_getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return QuestTowerKeys_possibleConstructorReturn(this, result);};}function QuestTowerKeys_possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return QuestTowerKeys_assertThisInitialized(self);}function QuestTowerKeys_assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function QuestTowerKeys_isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function QuestTowerKeys_getPrototypeOf(o) {QuestTowerKeys_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return QuestTowerKeys_getPrototypeOf(o);}function QuestTowerKeys_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








var QuestTowerKeys = /*#__PURE__*/function (_QuestKeyStuffAbstrac) {QuestTowerKeys_inherits(QuestTowerKeys, _QuestKeyStuffAbstrac);var _super = QuestTowerKeys_createSuper(QuestTowerKeys);function QuestTowerKeys() {var _this;QuestTowerKeys_classCallCheck(this, QuestTowerKeys);for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}_this = _super.call.apply(_super, [this].concat(args));QuestTowerKeys_defineProperty(QuestTowerKeys_assertThisInitialized(_this), "keyItems",
    [
    ["ns_lock1", external_kolmafia_namespaceObject.Item.get("Boris's Key")],
    ["ns_lock2", external_kolmafia_namespaceObject.Item.get("Jarlsberg's Key")],
    ["ns_lock3", external_kolmafia_namespaceObject.Item.get("Sneaky Pete's Key")],
    ["ns_lock4", external_kolmafia_namespaceObject.Item.get("Richard's Star Key")],
    ["ns_lock5", external_kolmafia_namespaceObject.Item.get("Digital Key")],
    ["ns_lock6", external_kolmafia_namespaceObject.Item.get("Skeleton Key")]]);QuestTowerKeys_defineProperty(QuestTowerKeys_assertThisInitialized(_this), "children",

    [
    new QuestSkeletonKey(),
    new QuestStarKey(),
    new QuestDailyDungeon(),
    new QuestDigitalKey()]);return _this;}QuestTowerKeys_createClass(QuestTowerKeys, [{ key: "isReadyToRedeemTokens", value:


    function isReadyToRedeemTokens() {
      var keys = this.keys.filter((k) => (0,external_kolmafia_namespaceObject.availableAmount)(k) > 0);

      if (keys.length >= 3) {
        return false;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.token) + keys.length < 3) {
        return false;
      }

      return true;
    } }, { key: "redeemKeys", value:

    function redeemKeys() {
      var keys = this.keys.filter((k) => (0,external_kolmafia_namespaceObject.availableAmount)(k) == 0);

      return {
        location: null,
        run: () => {var _iterator = QuestTowerKeys_createForOfIteratorHelper(
          keys),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var k = _step.value;
              (0,external_kolmafia_namespaceObject.retrieveItem)(k);
            }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Council / Tower / KeyDoor";
    } }, { key: "getChildren", value:

    function getChildren() {
      return this.children;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "level", value:

    function level() {
      return 13;
    } }, { key: "getNotDone", value:

    function getNotDone() {
      var used = this.getKeysUsed();

      return this.keyItems.filter((k) => !used.includes(k[1]));
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL13Final");

      if (status < 5) {
        return QuestStatus.NOT_READY;
      }

      if (status > 5) {
        return QuestStatus.COMPLETED;
      }

      if (this.isReadyToRedeemTokens()) {
        return QuestStatus.READY;
      }

      var notDone = this.getNotDone();

      if (
      notDone.length == 0 ||
      notDone.filter((s) => (0,external_kolmafia_namespaceObject.availableAmount)(s[1]) > 0).length > 0)
      {
        return QuestStatus.READY;
      }

      return QuestStatus.NOT_READY;
    } }, { key: "run", value:

    function run() {
      if (this.isReadyToRedeemTokens()) {
        return this.redeemKeys();
      }

      return {
        location: null,
        run: () => {
          var notDone = this.getNotDone();var _iterator2 = QuestTowerKeys_createForOfIteratorHelper(

          notDone),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var s = _step2.value;
              if ((0,external_kolmafia_namespaceObject.availableAmount)(s[1]) == 0) {
                continue;
              }

              (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower_door&action=" + s[0]);
            }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}

          (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower_door&action=ns_doorknob");
        } };

    } }]);return QuestTowerKeys;}(QuestKeyStuffAbstract);
;// CONCATENATED MODULE: ./src/quests/council/tower/stages/QuestTowerContestants.ts
function QuestTowerContestants_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestTowerContestants_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestTowerContestants_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestTowerContestants_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestTowerContestants_arrayLikeToArray(o, minLen);}function QuestTowerContestants_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestTowerContestants_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestTowerContestants_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestTowerContestants_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestTowerContestants_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestTowerContestants_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}








var QuestTowerContestants = /*#__PURE__*/function () {function QuestTowerContestants() {QuestTowerContestants_classCallCheck(this, QuestTowerContestants);}QuestTowerContestants_createClass(QuestTowerContestants, [{ key: "getId", value:
    function getId() {
      return "Council / Tower / Contests";
    } }, { key: "level", value:

    function level() {
      return 13;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL13Final");

      if (status < 0) {
        return QuestStatus.NOT_READY;
      }

      if (status > 3) {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var status = getQuestStatus("questL13Final");

      if (status == 0) {
        return this.learnAndSetMyPlace();
      }

      if (status == 1) {
        return this.fightContests();
      }

      return this.claimPrize();
    } }, { key: "claimPrize", value:

    function claimPrize() {
      return {
        location: null,
        run: () => {
          var props = new PropertyManager();

          try {
            props.setChoice(1020, 1);
            props.setChoice(1021, 1);
            props.setChoice(1022, 1);
            props.setChoice(1003, 4);

            (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
            (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?pwd=&whichchoice=1003&option=4", true);
            (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower&action=ns_02_coronation");
            (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?pwd=&whichchoice=1020&option=1", true);
            (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?pwd=&whichchoice=1021&option=1", true);
            (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?pwd=&whichchoice=1022&option=1", true);
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "fightContests", value:

    function fightContests() {
      // place.php?whichplace=nstower&action=ns_01_crowd1
      var match = (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower").match(
      /(place.php\?whichplace=nstower&action=ns_01_crowd\d)/);


      return {
        location: null,
        run: () => {
          greyAdv(match[1]);
        } };

    } }, { key: "learnAndSetMyPlace", value:

    function learnAndSetMyPlace() {
      return {
        location: null,
        run: () => {var _iterator = QuestTowerContestants_createForOfIteratorHelper(
          this.getNeededQuests()),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var quest = _step.value;
              quest.call(this);
            }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

          (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower");
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questL13Final") != "step1") {
        return [];
      }

      var locs = [];

      var page = (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower");

      if (page.includes("ns_01_crowd1")) {
        locs.push(external_kolmafia_namespaceObject.Location.get("Fastest Adventurer Contest"));
      }

      if (page.includes("ns_01_crowd2")) {
        switch ((0,external_kolmafia_namespaceObject.getProperty)("nsChallenge1")) {
          case "Mysticality":
            locs.push(external_kolmafia_namespaceObject.Location.get("Smartest Adventurer Contest"));
            break;
          case "Moxie":
            locs.push(external_kolmafia_namespaceObject.Location.get("Smoothest Adventurer Contest"));
            break;
          case "Muscle":
            locs.push(external_kolmafia_namespaceObject.Location.get("Strongest Adventurer Contest"));
            break;}

      }

      if (page.includes("ns_01_crowd3")) {
        switch ((0,external_kolmafia_namespaceObject.getProperty)("nsChallenge2")) {
          case "cold":
            locs.push(external_kolmafia_namespaceObject.Location.get("Coldest Adventurer Contest"));
            break;
          case "hot":
            locs.push(external_kolmafia_namespaceObject.Location.get("Hottest Adventurer Contest"));
            break;
          case "sleaze":
            locs.push(external_kolmafia_namespaceObject.Location.get("Sleaziest Adventurer Contest"));
            break;
          case "spooky":
            locs.push(external_kolmafia_namespaceObject.Location.get("Spookiest Adventurer Contest"));
            break;
          case "stench":
            locs.push(external_kolmafia_namespaceObject.Location.get("Stinkiest Adventurer Contest"));
            break;}

      }

      return locs;
    } }, { key: "turnInQuest", value:

    function turnInQuest(questNo) {
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
      (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?pwd=&whichchoice=1003&option=" + questNo, true);
      (0,external_kolmafia_namespaceObject.visitUrl)("main.php");
    } }, { key: "getNeededQuests", value:

    function getNeededQuests() {
      if (
      (0,external_kolmafia_namespaceObject.getProperty)("nsChallenge1") == "none" ||
      (0,external_kolmafia_namespaceObject.getProperty)("nsChallenge2") == "none")
      {
        (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower&action=ns_01_contestbooth");
      }

      var quests = [];

      if ((0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("nsContestants1")) == -1) {
        quests.push(this.doQuest1);
      }

      if ((0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("nsContestants2")) == -1) {
        quests.push(this.doQuest2);
      }

      if ((0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("nsContestants3")) == -1) {
        quests.push(this.doQuest3);
      }

      return quests;
    } }, { key: "doQuest1", value:

    function doQuest1() {
      (0,external_kolmafia_namespaceObject.maximize)("init +switch left-hand man", false);
      this.turnInQuest(1);
    } }, { key: "doQuest2", value:

    function doQuest2() {
      (0,external_kolmafia_namespaceObject.maximize)((0,external_kolmafia_namespaceObject.getProperty)("nsChallenge1") + " +switch left-hand man", false);
      this.turnInQuest(2);
    } }, { key: "doQuest3", value:

    function doQuest3() {
      var element = (0,external_kolmafia_namespaceObject.getProperty)("nsChallenge2");

      (0,external_kolmafia_namespaceObject.maximize)(
      element + " dmg +" + element + " spell dmg +switch left-hand man",
      false);

      this.turnInQuest(3);
    } }]);return QuestTowerContestants;}();
;// CONCATENATED MODULE: ./src/quests/council/tower/stages/QuestTowerMaze.ts
function QuestTowerMaze_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestTowerMaze_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestTowerMaze_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestTowerMaze_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestTowerMaze_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}




var QuestTowerMaze = /*#__PURE__*/function () {function QuestTowerMaze() {QuestTowerMaze_classCallCheck(this, QuestTowerMaze);}QuestTowerMaze_createClass(QuestTowerMaze, [{ key: "getId", value:
    function getId() {
      return "Council / Tower / Maze";
    } }, { key: "level", value:

    function level() {
      return 13;
    } }, { key: "status", value:

    function status() {
      if (getQuestStatus("questL13Final") < 4) {
        return QuestStatus.NOT_READY;
      }

      if (getQuestStatus("questL13Final") > 4) {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit("+hot res +spooky res +stench res");

      return {
        location: null,
        outfit: outfit,
        run: () => {
          (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower&action=ns_03_hedgemaze");
          (0,external_kolmafia_namespaceObject.runChoice)(2);
          (0,external_kolmafia_namespaceObject.runChoice)(2);
          (0,external_kolmafia_namespaceObject.runChoice)(2);
          (0,external_kolmafia_namespaceObject.runChoice)(1);
          (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=nstower_door");
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestTowerMaze;}();
;// CONCATENATED MODULE: ./src/quests/council/tower/stages/QuestTowerWallSkin.ts
function QuestTowerWallSkin_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestTowerWallSkin_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestTowerWallSkin_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestTowerWallSkin_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestTowerWallSkin_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestTowerWallSkin_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








var QuestTowerWallSkin = /*#__PURE__*/function () {function QuestTowerWallSkin() {QuestTowerWallSkin_classCallCheck(this, QuestTowerWallSkin);QuestTowerWallSkin_defineProperty(this, "beehive",
    external_kolmafia_namespaceObject.Item.get("Beehive"));QuestTowerWallSkin_defineProperty(this, "forest",
    new QuestTowerBeeHive());}QuestTowerWallSkin_createClass(QuestTowerWallSkin, [{ key: "getChildren", value:

    function getChildren() {
      return [this.forest];
    } }, { key: "getId", value:

    function getId() {
      return "Council / Tower / WallOfSkin";
    } }, { key: "level", value:

    function level() {
      return 13;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL13Final");

      if (status < 6) {
        return QuestStatus.NOT_READY;
      }

      if (status > 6) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.beehive) == 0) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          greyAdv(
          "place.php?whichplace=nstower&action=ns_05_monster1",
          null,
          new AdventureSettings().setStartOfFightMacro(
          Macro.tryItem(this.beehive)));


        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestTowerWallSkin;}();


var QuestTowerBeeHive = /*#__PURE__*/function () {function QuestTowerBeeHive() {QuestTowerWallSkin_classCallCheck(this, QuestTowerBeeHive);QuestTowerWallSkin_defineProperty(this, "beehive",
    external_kolmafia_namespaceObject.Item.get("Beehive"));QuestTowerWallSkin_defineProperty(this, "blackForest",
    external_kolmafia_namespaceObject.Location.get("The Black Forest"));}QuestTowerWallSkin_createClass(QuestTowerBeeHive, [{ key: "getId", value:

    function getId() {
      return "Council / Tower / WallOfSkin / Beehive";
    } }, { key: "level", value:

    function level() {
      return 13;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL13Final");

      if (status < 6) {
        return QuestStatus.NOT_READY;
      }

      if (status > 6 || (0,external_kolmafia_namespaceObject.availableAmount)(this.beehive) > 0) {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setNoCombat();

      return {
        outfit: outfit,
        location: this.blackForest,
        run: () => {
          var props = new PropertyManager();
          DelayBurners.tryReplaceCombats();

          try {
            props.setChoice(924, 3); // Beezzzz
            props.setChoice(1018, 1);
            props.setChoice(1019, 1);

            greyAdv(this.blackForest, outfit);
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "needAdventures", value:

    function needAdventures() {
      return 3;
    } }]);return QuestTowerBeeHive;}();
;// CONCATENATED MODULE: ./src/quests/council/tower/stages/QuestTowerWallMeat.ts
function QuestTowerWallMeat_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestTowerWallMeat_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestTowerWallMeat_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestTowerWallMeat_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestTowerWallMeat_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}





var QuestTowerWallMeat = /*#__PURE__*/function () {function QuestTowerWallMeat() {QuestTowerWallMeat_classCallCheck(this, QuestTowerWallMeat);}QuestTowerWallMeat_createClass(QuestTowerWallMeat, [{ key: "getId", value:
    function getId() {
      return "Council / Tower / WallOfMeat";
    } }, { key: "level", value:

    function level() {
      return 13;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL13Final");

      if (status < 7) {
        return QuestStatus.NOT_READY;
      }

      if (status > 7) {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();
      outfit.meatDropWeight = 5;

      return {
        outfit: outfit,
        familiar: external_kolmafia_namespaceObject.Familiar.get("Hobo Monkey"),
        disableFamOverride: true,
        location: null,
        run: () => {
          greyAdv("place.php?whichplace=nstower&action=ns_06_monster2", outfit);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestTowerWallMeat;}();
;// CONCATENATED MODULE: ./src/quests/council/tower/stages/QuestTowerWallBones.ts
function QuestTowerWallBones_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestTowerWallBones_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestTowerWallBones_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestTowerWallBones_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestTowerWallBones_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestTowerWallBones_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








var QuestTowerWallBones = /*#__PURE__*/function () {function QuestTowerWallBones() {QuestTowerWallBones_classCallCheck(this, QuestTowerWallBones);QuestTowerWallBones_defineProperty(this, "knife",
    external_kolmafia_namespaceObject.Item.get("Electric Boning Knife"));QuestTowerWallBones_defineProperty(this, "boning",
    new QuestTowerBoningKnife());}QuestTowerWallBones_createClass(QuestTowerWallBones, [{ key: "getChildren", value:

    function getChildren() {
      return [this.boning];
    } }, { key: "getId", value:

    function getId() {
      return "Council / Tower / WallOfBones";
    } }, { key: "level", value:

    function level() {
      return 13;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL13Final");

      if (status < 8) {
        return QuestStatus.NOT_READY;
      }

      if (status > 8) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.knife) == 0) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          var macro = new Macro().tryItem(this.knife);

          greyAdv(
          "place.php?whichplace=nstower&action=ns_07_monster3",
          null,
          new AdventureSettings().setStartOfFightMacro(macro));

        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestTowerWallBones;}();


var QuestTowerBoningKnife = /*#__PURE__*/function () {function QuestTowerBoningKnife() {QuestTowerWallBones_classCallCheck(this, QuestTowerBoningKnife);QuestTowerWallBones_defineProperty(this, "knife",
    external_kolmafia_namespaceObject.Item.get("Electric Boning Knife"));QuestTowerWallBones_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get(
    "The Castle in the Clouds in the Sky (Ground Floor)"));}QuestTowerWallBones_createClass(QuestTowerBoningKnife, [{ key: "getId", value:


    function getId() {
      return "Council / Tower / WallOfBones / BoningKnife";
    } }, { key: "level", value:

    function level() {
      return 13;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL13Final");

      if (status < 8) {
        return QuestStatus.NOT_READY;
      }

      if (status > 8) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.knife) > 0) {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setNoCombat();

      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          var props = new PropertyManager();
          DelayBurners.tryReplaceCombats();

          try {
            props.setChoice(672, 1);
            props.setChoice(673, 1);
            props.setChoice(674, 1);
            props.setChoice(1026, 2);

            greyAdv(this.loc, outfit);
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestTowerBoningKnife;}();
;// CONCATENATED MODULE: ./src/quests/council/tower/stages/QuestTowerShadow.ts
function QuestTowerShadow_slicedToArray(arr, i) {return QuestTowerShadow_arrayWithHoles(arr) || QuestTowerShadow_iterableToArrayLimit(arr, i) || QuestTowerShadow_unsupportedIterableToArray(arr, i) || QuestTowerShadow_nonIterableRest();}function QuestTowerShadow_nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function QuestTowerShadow_iterableToArrayLimit(arr, i) {var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];if (_i == null) return;var _arr = [];var _n = true;var _d = false;var _s, _e;try {for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function QuestTowerShadow_arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function QuestTowerShadow_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestTowerShadow_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e2) {throw _e2;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e3) {didErr = true;err = _e3;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestTowerShadow_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestTowerShadow_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestTowerShadow_arrayLikeToArray(o, minLen);}function QuestTowerShadow_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestTowerShadow_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestTowerShadow_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestTowerShadow_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestTowerShadow_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestTowerShadow_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestTowerShadow_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestTowerShadow = /*#__PURE__*/function () {function QuestTowerShadow() {QuestTowerShadow_classCallCheck(this, QuestTowerShadow);QuestTowerShadow_defineProperty(this, "badge",
    external_kolmafia_namespaceObject.Item.get("Attorney's badge"));QuestTowerShadow_defineProperty(this, "potato",
    external_kolmafia_namespaceObject.Familiar.get("Levitating Potato"));QuestTowerShadow_defineProperty(this, "guaze",
    external_kolmafia_namespaceObject.Item.get("Gauze garter"));QuestTowerShadow_defineProperty(this, "cape",
    external_kolmafia_namespaceObject.Item.get("Unwrapped knock-off retro superhero cape"));QuestTowerShadow_defineProperty(this, "overclocking",
    external_kolmafia_namespaceObject.Skill.get("Overclocking"));}QuestTowerShadow_createClass(QuestTowerShadow, [{ key: "getId", value:

    function getId() {
      return "Council / Tower / Shadow";
    } }, { key: "level", value:

    function level() {
      return 13;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL13Final");

      if (status < 10) {
        return QuestStatus.NOT_READY;
      }

      if (status > 10) {
        //  return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "getBestEquips", value:

    function getBestEquips(modifier) {
      var equips = [];
      var none = external_kolmafia_namespaceObject.Slot.get("None");
      var weapon = external_kolmafia_namespaceObject.Slot.get("Weapon");var _iterator = QuestTowerShadow_createForOfIteratorHelper(

      external_kolmafia_namespaceObject.Item.all()),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var i = _step.value;
          if ((0,external_kolmafia_namespaceObject.availableAmount)(i) == 0) {
            continue;
          }

          var slot = (0,external_kolmafia_namespaceObject.toSlot)(i);

          if (slot == none || !(0,external_kolmafia_namespaceObject.canEquip)(i)) {
            continue;
          }

          if (slot == weapon && (0,external_kolmafia_namespaceObject.weaponHands)(i) > 1) {
            continue;
          }

          var mod = (0,external_kolmafia_namespaceObject.numericModifier)(i, modifier);

          if (mod <= 0) {
            continue;
          }

          equips.push([slot, i, mod]);
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

      equips.sort((e1, e2) => e2[2] - e1[2]);
      var items = [];
      var toReturn = [];var _iterator2 = QuestTowerShadow_createForOfIteratorHelper(

      [
      "Hat",
      "Weapon",
      "Offhand",
      "Back",
      "Pants",
      "Acc1",
      "Acc2",
      "Acc3"].
      map((s) => external_kolmafia_namespaceObject.Slot.get(s))),_step2;try {var _loop = function _loop() {var slot = _step2.value;
          var lookFor = slot;

          if (slot == external_kolmafia_namespaceObject.Slot.get("Acc2") || slot == external_kolmafia_namespaceObject.Slot.get("Acc3")) {
            lookFor = external_kolmafia_namespaceObject.Slot.get("Acc1");
          }

          var item = equips.reduce((p, i) => {
            if (i[0] != lookFor || items.includes(i[1])) {
              return p;
            }

            if (p != null && p[2] > i[2]) {
              return p;
            }

            return i;
          }, null);

          if (item != null) {
            items.push(item[1]);
            toReturn.push([slot, item[1]]);
          }};for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {_loop();
        }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}

      return toReturn;
    } }, { key: "run", value:

    function run() {
      var map = new Map();

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.badge) > 0) {
        map.set(external_kolmafia_namespaceObject.Slot.get("Acc3"), this.badge);
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.cape) > 0) {
        map.set(external_kolmafia_namespaceObject.Slot.get("Back"), this.cape);
      }

      if (!(0,external_kolmafia_namespaceObject.haveSkill)(this.overclocking)) {
        var init = this.getBestEquips("Initiative");
        var total = 0;var _iterator3 = QuestTowerShadow_createForOfIteratorHelper(

        init),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _step3$value = QuestTowerShadow_slicedToArray(_step3.value, 2),slot = _step3$value[0],item = _step3$value[1];
            if (map.has(slot)) {
              continue;
            }

            var count = (0,external_kolmafia_namespaceObject.numericModifier)(item, "Initiative");

            total += count;
            map.set(slot, item);

            if (total > 150) {
              break;
            }
          }} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}
      }

      var hp = this.getBestEquips("Maximum HP");var _iterator4 = QuestTowerShadow_createForOfIteratorHelper(

      hp),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _step4$value = QuestTowerShadow_slicedToArray(_step4.value, 2),_slot = _step4$value[0],_item = _step4$value[1];
          if (map.has(_slot)) {
            continue;
          }

          map.set(_slot, _item);
        }} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}

      var maximize = "-tie";var _iterator5 = QuestTowerShadow_createForOfIteratorHelper(

      map.values()),_step5;try {for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {var i = _step5.value;
          maximize += " +equip " + i.name;
        }} catch (err) {_iterator5.e(err);} finally {_iterator5.f();}

      var outfit = new GreyOutfit(maximize);

      return {
        familiar: this.potato,
        outfit: outfit,
        location: null,
        run: () => {
          if ((0,external_kolmafia_namespaceObject.equippedAmount)(this.cape) > 0) {
            (0,external_kolmafia_namespaceObject.cliExecute)("retrocape heck hold"); // Make sure we stun the shadow
          }

          if ((0,external_kolmafia_namespaceObject.myHp)() < (0,external_kolmafia_namespaceObject.myMaxhp)() && (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_hotTubSoaks")) < 5) {
            (0,external_kolmafia_namespaceObject.cliExecute)("hottub");
          }

          var macro = Macro.item(this.guaze).repeat();

          greyAdv(
          "place.php?whichplace=nstower&action=ns_09_monster5",
          outfit,
          new AdventureSettings().setStartOfFightMacro(macro));

        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestTowerShadow;}();
;// CONCATENATED MODULE: ./src/quests/council/tower/stages/QuestTowerMirror.ts
function QuestTowerMirror_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestTowerMirror_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestTowerMirror_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestTowerMirror_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestTowerMirror_arrayLikeToArray(o, minLen);}function QuestTowerMirror_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestTowerMirror_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestTowerMirror_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestTowerMirror_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestTowerMirror_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestTowerMirror_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestTowerMirror_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var QuestTowerMirror = /*#__PURE__*/function () {function QuestTowerMirror() {QuestTowerMirror_classCallCheck(this, QuestTowerMirror);QuestTowerMirror_defineProperty(this, "wand",
    external_kolmafia_namespaceObject.Item.get(" Wand of Nagamar"));QuestTowerMirror_defineProperty(this, "lW",
    external_kolmafia_namespaceObject.Item.get("ruby W"));QuestTowerMirror_defineProperty(this, "lA",
    external_kolmafia_namespaceObject.Item.get("metallic A"));QuestTowerMirror_defineProperty(this, "lN",
    external_kolmafia_namespaceObject.Item.get("lowercase N"));QuestTowerMirror_defineProperty(this, "lD",
    external_kolmafia_namespaceObject.Item.get("heavy D"));QuestTowerMirror_defineProperty(this, "wa",
    external_kolmafia_namespaceObject.Item.get("WA"));QuestTowerMirror_defineProperty(this, "nd",
    external_kolmafia_namespaceObject.Item.get("ND"));QuestTowerMirror_defineProperty(this, "locations",
    [
    ["Ruby W", "W imp", "Pandamonium Slums"],
    ["Metallic A", "MagiMechTech MechaMech", "The Penultimate Fantasy Airship"],
    ["lowercase N", "XXX pr0n", "The Valley of Rof L'm Fao"],
    [
    "heavy D",
    "Alphabet Giant",
    "The Castle in the Clouds in the Sky (Basement)"]].

    map((s) => [external_kolmafia_namespaceObject.Item.get(s[0]), external_kolmafia_namespaceObject.Monster.get(s[1]), external_kolmafia_namespaceObject.Location.get(s[2])]));QuestTowerMirror_defineProperty(this, "clover",
    external_kolmafia_namespaceObject.Item.get("11-leaf Clover"));}QuestTowerMirror_createClass(QuestTowerMirror, [{ key: "getId", value:

    function getId() {
      return "Council / Tower / Mirror";
    } }, { key: "level", value:

    function level() {
      return 13;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL13Final");

      if (status < 9) {
        return QuestStatus.NOT_READY;
      }

      if (status > 9) {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "tryClover", value:

    function tryClover() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.use)(this.clover);
          greyAdv(external_kolmafia_namespaceObject.Location.get("The Castle in the Clouds in the Sky (Basement)"));
        } };

    } }, { key: "run", value:

    function run() {
      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.wand) == 0) {
        return this.createWand();
      }

      // Equip outfit early to try save some hp
      var outfit = new GreyOutfit("hp +init");

      return {
        location: null,
        outfit: outfit,
        run: () => {
          var props = new PropertyManager();
          props.setChoice(1015, 2); // Break mirror

          try {
            greyAdv("place.php?whichplace=nstower&action=ns_08_monster4", outfit);
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "createWand", value:

    function createWand() {var _this = this;var _iterator = QuestTowerMirror_createForOfIteratorHelper(
      this.locations),_step;try {var _loop = function _loop() {var locs = _step.value;
          if ((0,external_kolmafia_namespaceObject.availableAmount)(locs[0]) > 0) {
            return "continue";
          }

          if ((0,external_kolmafia_namespaceObject.availableAmount)(_this.clover) > 0) {
            return { v: _this.tryClover() };
          }

          var outfit = new GreyOutfit().setItemDrops();

          return { v: {
              location: locs[2],
              run: () => {
                var settings = new AdventureSettings();
                settings.addNoBanish(locs[1]);

                greyAdv(locs[2], outfit, settings);
              } } };};for (_iterator.s(); !(_step = _iterator.n()).done;) {var _ret = _loop();if (_ret === "continue") continue;if (typeof _ret === "object") return _ret.v;

        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.retrieveItem)(this.wand);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestTowerMirror;}();
;// CONCATENATED MODULE: ./src/quests/council/tower/stages/QuestTowerKillWitch.ts
function QuestTowerKillWitch_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestTowerKillWitch_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestTowerKillWitch_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestTowerKillWitch_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestTowerKillWitch_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}






var QuestTowerKillWitch = /*#__PURE__*/function () {function QuestTowerKillWitch() {QuestTowerKillWitch_classCallCheck(this, QuestTowerKillWitch);}QuestTowerKillWitch_createClass(QuestTowerKillWitch, [{ key: "getId", value:
    function getId() {
      return "Council / Tower / NaughtyBoss";
    } }, { key: "level", value:

    function level() {
      return 13;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL13Final");

      if (status < 11) {
        return QuestStatus.NOT_READY;
      }

      if (status > 11) {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return this.doBoss();
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "doBoss", value:

    function doBoss() {
      return {
        location: null,
        run: () => {
          for (var i = 0; i < 2; i++) {
            try {
              greyAdv(
              "place.php?whichplace=nstower&action=ns_10_sorcfight",
              null,
              new AdventureSettings().setFinishingBlowMacro(
              Macro.attack().repeat()));


              (0,external_kolmafia_namespaceObject.visitUrl)("choice.php");
            } catch (e) {}
          }

          greyAdv("choice.php"); // Final fight
          (0,external_kolmafia_namespaceObject.print)("Should be all done", "blue");

          if (!GreySettings.isHardcoreMode()) {
            var pulls =
            (0,external_kolmafia_namespaceObject.getProperty)("_roninStoragePulls").split(",").length;

            (0,external_kolmafia_namespaceObject.print)(
            "Used " +
            pulls +
            " / 20 pulls. Could've done another " + (
            20 - pulls) +
            " pulls..",
            "blue");

          }

          (0,external_kolmafia_namespaceObject.print)("Took " + (0,external_kolmafia_namespaceObject.turnsPlayed)() + " turns this run!", "blue");
        } };

    } }]);return QuestTowerKillWitch;}();
;// CONCATENATED MODULE: ./src/quests/council/QuestL13Tower.ts
function QuestL13Tower_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL13Tower_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL13Tower_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL13Tower_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL13Tower_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL13Tower_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





















var QuestL13 = /*#__PURE__*/function () {function QuestL13() {QuestL13Tower_classCallCheck(this, QuestL13);QuestL13Tower_defineProperty(this, "sideQuests",




    [
    new QuestTowerKeys(),
    new QuestTowerContestants(),
    new QuestTowerMaze(),
    new QuestTowerWallSkin(),
    new QuestTowerWallMeat(),
    new QuestTowerWallBones(),
    new QuestTowerMirror(),
    new QuestTowerShadow(),
    new QuestTowerKillWitch()]);}QuestL13Tower_createClass(QuestL13, [{ key: "getLocations", value: function getLocations() {return [];} }, { key: "getChildren", value:


    function getChildren() {
      return this.sideQuests;
    } }, { key: "getId", value:

    function getId() {
      return "Council / Tower / Parent";
    } }, { key: "level", value:

    function level() {
      return -1;
    } }, { key: "status", value:

    function status() {
      return QuestStatus.COMPLETED;

      // Unstarted = Obvious
      // started= We've visited the booth? Not sure whats up there.
      // Step1 = We're fighting the contestants
      // Step2 = We've defeated the contestants
      // Step3 = Just got sash
      // Step4 = We're going into the maze
      // Step4 = We're in the maze
      // Step5 = We left the maze
      // Step6 = We've used all our keys
      // Step7 = Just killed wall of skin
      // Step8 = Just killed wall of meat
      // Step9 = Just killed wall of bones
      // Step10 = Just killed the shadow
      // Step11 = Just shattered the mirror, or didn't
      // Step12 = We've advanced to the 3rd stage of the witch and if you see this, you lost and can now find the wand NC
      // Step13 = Just killed the witch
    } }, { key: "run", value:

    function run() {
      throw "Not supported";
    } }]);return QuestL13;}();
;// CONCATENATED MODULE: ./src/quests/council/QuestL1Toot.ts
function QuestL1Toot_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestL1Toot_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestL1Toot_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestL1Toot_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestL1Toot_arrayLikeToArray(o, minLen);}function QuestL1Toot_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestL1Toot_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL1Toot_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL1Toot_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL1Toot_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL1Toot_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL1Toot_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



var QuestL1Toot = /*#__PURE__*/function () {function QuestL1Toot() {QuestL1Toot_classCallCheck(this, QuestL1Toot);QuestL1Toot_defineProperty(this, "toSell",
    ["hamethyst", "baconstone", "porquoise"].map((s) =>
    external_kolmafia_namespaceObject.Item.get(s)));}QuestL1Toot_createClass(QuestL1Toot, [{ key: "level", value:


    function level() {
      return 0;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questM05Toot") == "finished") {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.council)();
          (0,external_kolmafia_namespaceObject.visitUrl)("tutorial.php?action=toot");
          (0,external_kolmafia_namespaceObject.use)(external_kolmafia_namespaceObject.Item.get("Letter from King Ralph XI"));
          (0,external_kolmafia_namespaceObject.use)(external_kolmafia_namespaceObject.Item.get("pork elf goodies sack"));var _iterator = QuestL1Toot_createForOfIteratorHelper(

          this.toSell),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var i = _step.value;
              if ((0,external_kolmafia_namespaceObject.availableAmount)(i) > 0) {
                (0,external_kolmafia_namespaceObject.autosell)(i, (0,external_kolmafia_namespaceObject.availableAmount)(i));
              }
            }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

          (0,external_kolmafia_namespaceObject.council)();
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Council / Toot";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestL1Toot;}();
;// CONCATENATED MODULE: ./src/quests/council/QuestL2Larva.ts
function QuestL2Larva_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL2Larva_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL2Larva_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL2Larva_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL2Larva_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL2Larva_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}










var QuestL2SpookyLarva = /*#__PURE__*/function () {function QuestL2SpookyLarva() {QuestL2Larva_classCallCheck(this, QuestL2SpookyLarva);QuestL2Larva_defineProperty(this, "location",
    external_kolmafia_namespaceObject.Location.get("The Spooky Forest"));QuestL2Larva_defineProperty(this, "latte",
    external_kolmafia_namespaceObject.Item.get("Latte lovers member's mug"));QuestL2Larva_defineProperty(this, "toAbsorb", void 0);}QuestL2Larva_createClass(QuestL2SpookyLarva, [{ key: "shouldWearLatte", value:


    function shouldWearLatte() {
      return (
        (0,external_kolmafia_namespaceObject.availableAmount)(this.latte) > 0 &&
        !hasUnlockedLatteFlavor(LatteFlavor.FAMILIAR_WEIGHT));

    } }, { key: "level", value:

    function level() {
      return 2;
    } }, { key: "getId", value:

    function getId() {
      return "Council / Larva";
    } }, { key: "status", value:

    function status() {
      var status = (0,external_kolmafia_namespaceObject.getProperty)("questL02Larva");

      if (status == "finished") {
        return QuestStatus.COMPLETED;
      }

      if (this.isDelayBurning()) {
        if (DelayBurners.isDelayBurnerReady()) {
          return QuestStatus.READY;
        }

        if (DelayBurners.isDelayBurnerFeasible()) {
          return QuestStatus.FASTER_LATER;
        }
      }

      if (!hasNonCombatSkillsReady(false)) {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "isDelayBurning", value:

    function isDelayBurning() {
      return this.location.turnsSpent < 5 && this.toAbsorb.length == 0;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();

      if (this.shouldWearLatte()) {
        outfit.addItem(this.latte);
      }

      if (this.location.turnsSpent >= 5) {
        outfit.setNoCombat();
      }

      return {
        location: this.location,
        outfit: outfit,
        run: () => {
          var props = new PropertyManager();

          props.setChoice(502, 2);
          props.setChoice(505, 1);

          if (!this.shouldWearLatte() && this.toAbsorb.length == 0) {
            var delay = DelayBurners.getReadyDelayBurner();

            if (delay != null) {
              delay.doFightSetup();
            } else if (hasNonCombatSkillsReady()) {
              DelayBurners.tryReplaceCombats();
            }
          }

          try {
            greyAdv(this.location);
          } finally {
            props.resetAll();
          }

          if ((0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("mosquito larva")) > 0) {
            (0,external_kolmafia_namespaceObject.council)();
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.location];
    } }]);return QuestL2SpookyLarva;}();
;// CONCATENATED MODULE: ./src/quests/council/QuestL3Tavern.ts
function QuestL3Tavern_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestL3Tavern_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestL3Tavern_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestL3Tavern_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestL3Tavern_arrayLikeToArray(o, minLen);}function QuestL3Tavern_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestL3Tavern_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL3Tavern_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL3Tavern_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL3Tavern_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL3Tavern_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL3Tavern_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var QuestL3Tavern = /*#__PURE__*/function () {function QuestL3Tavern() {QuestL3Tavern_classCallCheck(this, QuestL3Tavern);QuestL3Tavern_defineProperty(this, "layout",
    new TavernLayout());QuestL3Tavern_defineProperty(this, "location",
    external_kolmafia_namespaceObject.Location.get("The Typical Tavern Cellar"));QuestL3Tavern_defineProperty(this, "tangle",
    external_kolmafia_namespaceObject.Item.get("tangle of rat tails"));QuestL3Tavern_defineProperty(this, "teleportis",
    external_kolmafia_namespaceObject.Effect.get("Teleportitis"));}QuestL3Tavern_createClass(QuestL3Tavern, [{ key: "level", value:

    function level() {
      return 3;
    } }, { key: "getId", value:

    function getId() {
      return "Council / Tavern";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.location];
    } }, { key: "status", value:

    function status() {
      var status = (0,external_kolmafia_namespaceObject.getProperty)("questL03Rat");

      if (status == "finished") {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("questL02Larva") != "finished") {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.myLevel)() < 20) {
        return QuestStatus.FASTER_LATER;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("middleChamberUnlock") == "true") {
        return QuestStatus.READY;
      }

      // Always put this off as long as possible, aka until every quest wants to delay
      return QuestStatus.FASTER_LATER;
    } }, { key: "mustBeDone", value:

    function mustBeDone() {
      if (
      (0,external_kolmafia_namespaceObject.haveEffect)(this.teleportis) == 0 ||
      (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastPlusSignUnlock")) != (0,external_kolmafia_namespaceObject.myAscensions)())
      {
        return false;
      }

      return true;
    } }, { key: "run", value:

    function run() {
      var advTime = getQuestStatus("questL03Rat") == 1;

      var outfit;

      if (!advTime) {
        outfit = new GreyOutfit("-tie");
      } else {
        outfit = new GreyOutfit();

        if ((0,external_kolmafia_namespaceObject.getProperty)("pyramidBombUsed") != "true") {
          outfit.setPlusCombat();
          outfit.plusMonsterLevelWeight = 10;
          outfit.addBonus("-offhand");
        } else {
          outfit.setNoCombat();
          outfit.addBonus(
          "+hot dmg +hot spell dmg +cold dmg +cold spell dmg +spooky dmg +spooky spell dmg +stench dmg +stench spell dmg");

        }
      }

      return {
        location: this.location,
        outfit: outfit,
        run: () => {
          if (!advTime) {
            (0,external_kolmafia_namespaceObject.visitUrl)("tavern.php?place=barkeep");
            (0,external_kolmafia_namespaceObject.visitUrl)("cellar.php");
            (0,external_kolmafia_namespaceObject.council)();
            return;
          }

          var props = new PropertyManager();
          var eles = [
          ["Cold", 513],
          ["Hot", 496],
          ["Spooky", 515],
          ["Stench", 514]];


          for (var _i = 0, _eles = eles; _i < _eles.length; _i++) {var e = _eles[_i];
            var choice = (0,external_kolmafia_namespaceObject.numericModifier)(e[0] + " Damage") >= 20 ? 2 : 1;

            props.setChoice(e[1], choice);
          }

          try {
            if (outfit.plusMonsterLevelWeight >= 10) {
              setUmbrella(UmbrellaState.MONSTER_LEVEL);
              (0,external_kolmafia_namespaceObject.equip)(external_kolmafia_namespaceObject.Item.get("Unbreakable Umbrella"));
            }

            (0,external_kolmafia_namespaceObject.changeMcd)(10);
            greyAdv(this.layout.getLocation(), outfit);
            (0,external_kolmafia_namespaceObject.changeMcd)(0);
          } finally {
            props.resetAll();
          }
        } };

    } }]);return QuestL3Tavern;}();var


TavernLayout = /*#__PURE__*/function () {function TavernLayout() {QuestL3Tavern_classCallCheck(this, TavernLayout);QuestL3Tavern_defineProperty(this, "locations",
    [3, 2, 1, 0, 5, 10, 15, 20, 16, 21]);}QuestL3Tavern_createClass(TavernLayout, [{ key: "getLocation", value:

    function getLocation() {
      var prop = (0,external_kolmafia_namespaceObject.getProperty)("tavernLayout");

      if (prop == "0000000000000000000000000") {
        (0,external_kolmafia_namespaceObject.visitUrl)("cellar.php");
      }var _iterator = QuestL3Tavern_createForOfIteratorHelper(

      this.locations),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var i = _step.value;
          if (prop.charAt(i) != "0") {
            continue;
          }

          return "cellar.php?action=explore&whichspot=" + (i + 1);
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
    } }]);return TavernLayout;}();
;// CONCATENATED MODULE: ./src/quests/council/bats/QuestL4BatsBoss.ts
function QuestL4BatsBoss_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL4BatsBoss_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL4BatsBoss_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL4BatsBoss_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL4BatsBoss_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL4BatsBoss_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestL4BatsBoss = /*#__PURE__*/function () {function QuestL4BatsBoss() {QuestL4BatsBoss_classCallCheck(this, QuestL4BatsBoss);QuestL4BatsBoss_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get("The Boss Bat's Lair"));}QuestL4BatsBoss_createClass(QuestL4BatsBoss, [{ key: "getId", value:

    function getId() {
      return "Council / Bats / Boss";
    } }, { key: "level", value:

    function level() {
      return 4;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL04Bat");

      if (status < 3) {
        return QuestStatus.NOT_READY;
      }

      if (status == 100) {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();
      outfit.meatDropWeight = 2;

      return {
        location: this.loc,
        run: () => {
          greyAdv(this.loc);

          if ((0,external_kolmafia_namespaceObject.haveSkill)(external_kolmafia_namespaceObject.Skill.get("Grey Noise"))) {
            (0,external_kolmafia_namespaceObject.council)();
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }]);return QuestL4BatsBoss;}();
;// CONCATENATED MODULE: ./src/quests/council/bats/QuestL4BatsCenter.ts
function QuestL4BatsCenter_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL4BatsCenter_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL4BatsCenter_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL4BatsCenter_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL4BatsCenter_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL4BatsCenter_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








var QuestL4BatsCenter = /*#__PURE__*/function () {function QuestL4BatsCenter() {QuestL4BatsCenter_classCallCheck(this, QuestL4BatsCenter);QuestL4BatsCenter_defineProperty(this, "fire",
    external_kolmafia_namespaceObject.Item.get("industrial fire extinguisher"));QuestL4BatsCenter_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get("Guano Junction"));QuestL4BatsCenter_defineProperty(this, "sonar",
    external_kolmafia_namespaceObject.Item.get("sonar-in-a-biscuit"));QuestL4BatsCenter_defineProperty(this, "resourceClaim",
    new ResourceClaim(
    ResourceType.FIRE_EXTINGUSHER,
    20,
    "Spray down bat cave",
    5));}QuestL4BatsCenter_createClass(QuestL4BatsCenter, [{ key: "getResourceClaims", value:


    function getResourceClaims() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("fireExtinguisherBatHoleUsed") == "true") {
        return [];
      }

      return [this.resourceClaim];
    } }, { key: "getId", value:

    function getId() {
      return "Council / Bats / UnlockLeft";
    } }, { key: "level", value:

    function level() {
      return 4;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL04Bat");

      if (status < 0) {
        return QuestStatus.NOT_READY;
      }

      if (status > 0) {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();

      if (!GreySettings.isHardcoreMode()) {
        outfit.addItem(this.fire);
      }

      return {
        outfit: outfit,
        location: this.loc,
        run: () => {
          greyAdv(
          this.loc,
          outfit,
          new AdventureSettings().setStartOfFightMacro(
          new Macro().trySkill(external_kolmafia_namespaceObject.Skill.get("Fire Extinguisher: Zone Specific"))));


          this.doSonars();
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }, { key: "doSonars", value:

    function doSonars() {
      while (
      (0,external_kolmafia_namespaceObject.availableAmount)(this.sonar) > 0 &&
      getQuestStatus("questL04Bat") < 3)
      {
        (0,external_kolmafia_namespaceObject.use)(this.sonar);
      }
    } }]);return QuestL4BatsCenter;}();
;// CONCATENATED MODULE: ./src/quests/council/bats/QuestL4BatsLeft.ts
function QuestL4BatsLeft_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL4BatsLeft_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL4BatsLeft_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL4BatsLeft_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL4BatsLeft_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL4BatsLeft_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}




var QuestL4BatsLeft = /*#__PURE__*/function () {function QuestL4BatsLeft() {QuestL4BatsLeft_classCallCheck(this, QuestL4BatsLeft);QuestL4BatsLeft_defineProperty(this, "location",
    external_kolmafia_namespaceObject.Location.get("The Batrat and Ratbat Burrow"));}QuestL4BatsLeft_createClass(QuestL4BatsLeft, [{ key: "getId", value:

    function getId() {
      return "Council / Bats / UnlockRight";
    } }, { key: "level", value:

    function level() {
      return 4;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL04Bat");

      // If right has been unlocked
      if (status > 1) {
        return QuestStatus.COMPLETED;
      }

      var statusShen = getQuestStatus("questL11Shen");

      if (statusShen <= 1) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: this.location,
        run: () => {
          greyAdv(this.location);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.location];
    } }]);return QuestL4BatsLeft;}();
;// CONCATENATED MODULE: ./src/quests/council/bats/QuestL4BatsRight.ts
function QuestL4BatsRight_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL4BatsRight_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL4BatsRight_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL4BatsRight_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL4BatsRight_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL4BatsRight_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestL4BatsRight = /*#__PURE__*/function () {function QuestL4BatsRight() {QuestL4BatsRight_classCallCheck(this, QuestL4BatsRight);QuestL4BatsRight_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get("The Beanbat Chamber"));QuestL4BatsRight_defineProperty(this, "bean",
    external_kolmafia_namespaceObject.Item.get("Enchanted Bean"));}QuestL4BatsRight_createClass(QuestL4BatsRight, [{ key: "getId", value:

    function getId() {
      return "Council / Bats / UnlockBoss";
    } }, { key: "level", value:

    function level() {
      return 4;
    } }, { key: "status", value:

    function status() {
      var giantStatus = getQuestStatus("questL10Garbage");

      if (
      getQuestStatus("questL04Bat") > 2 && (
      giantStatus > 0 || (0,external_kolmafia_namespaceObject.availableAmount)(this.bean) > 0))
      {
        return QuestStatus.COMPLETED;
      }

      if (getQuestStatus("questL04Bat") < 2) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setItemDrops();

      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          greyAdv(this.loc, outfit);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }]);return QuestL4BatsRight;}();
;// CONCATENATED MODULE: ./src/quests/council/QuestL4Bats.ts
function QuestL4Bats_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL4Bats_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL4Bats_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL4Bats_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL4Bats_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL4Bats_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}










var QuestL4Bats = /*#__PURE__*/function () {



  function QuestL4Bats() {QuestL4Bats_classCallCheck(this, QuestL4Bats);QuestL4Bats_defineProperty(this, "sonar", external_kolmafia_namespaceObject.Item.get("sonar-in-a-biscuit"));QuestL4Bats_defineProperty(this, "children", []);
    this.children.push(new QuestL4BatsCenter());
    this.children.push(new QuestL4BatsLeft());
    this.children.push(new QuestL4BatsRight());
    this.children.push(new QuestL4BatsBoss());
  }QuestL4Bats_createClass(QuestL4Bats, [{ key: "getChildren", value:

    function getChildren() {
      return this.children;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "level", value:

    function level() {
      return 4;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL04Bat");

      if (status < 0) {
        return QuestStatus.NOT_READY;
      }

      if (status >= 3) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.sonar) == 0) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          while (
          (0,external_kolmafia_namespaceObject.availableAmount)(this.sonar) > 0 &&
          getQuestStatus("questL04Bat") < 3)
          {
            (0,external_kolmafia_namespaceObject.use)(this.sonar);
          }
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Council / Bats / Sonars";
    } }]);return QuestL4Bats;}();var


BatStatus;(function (BatStatus) {BatStatus[BatStatus["unstarted"] = -1] = "unstarted";BatStatus[BatStatus["started"] = 0] = "started";BatStatus[BatStatus["LEFT_SMASHED"] = 1] = "LEFT_SMASHED";BatStatus[BatStatus["RIGHT_SMASHED"] = 2] = "RIGHT_SMASHED";BatStatus[BatStatus["BOTTOM_SMASHED"] = 3] = "BOTTOM_SMASHED";BatStatus[BatStatus["BOSS_MURDERED"] = 4] = "BOSS_MURDERED";BatStatus[BatStatus["finished"] = 100] = "finished";})(BatStatus || (BatStatus = {}));
;// CONCATENATED MODULE: ./src/quests/council/goblins/QuestL5GoblinOutskirts.ts
function QuestL5GoblinOutskirts_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL5GoblinOutskirts_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL5GoblinOutskirts_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL5GoblinOutskirts_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL5GoblinOutskirts_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL5GoblinOutskirts_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestL5GoblinOutskirts = /*#__PURE__*/function () {function QuestL5GoblinOutskirts() {QuestL5GoblinOutskirts_classCallCheck(this, QuestL5GoblinOutskirts);QuestL5GoblinOutskirts_defineProperty(this, "map",
    external_kolmafia_namespaceObject.Item.get("Cobb's Knob map"));QuestL5GoblinOutskirts_defineProperty(this, "key",
    external_kolmafia_namespaceObject.Item.get("knob goblin encryption key"));QuestL5GoblinOutskirts_defineProperty(this, "location",
    external_kolmafia_namespaceObject.Location.get("the outskirts of cobb's knob"));}QuestL5GoblinOutskirts_createClass(QuestL5GoblinOutskirts, [{ key: "getId", value:

    function getId() {
      return "Council / Goblins / Outskirts";
    } }, { key: "level", value:

    function level() {
      return 5;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL05Goblin");

      if (status > 0) {
        return QuestStatus.COMPLETED;
      }

      if (status < 0) {
        return QuestStatus.NOT_READY;
      }

      if (this.location.turnsSpent < 10) {
        if (DelayBurners.isDelayBurnerReady()) {
          return QuestStatus.READY;
        }

        if (DelayBurners.isDelayBurnerFeasible()) {
          return QuestStatus.FASTER_LATER;
        }
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: this.location,
        run: () => {
          if ((0,external_kolmafia_namespaceObject.availableAmount)(this.map) > 0 && (0,external_kolmafia_namespaceObject.availableAmount)(this.key)) {
            (0,external_kolmafia_namespaceObject.use)(this.map);
          } else {
            var ready = DelayBurners.getReadyDelayBurner();

            if (ready != null) {
              ready.doFightSetup();
            } else {
              DelayBurners.tryReplaceCombats();
            }

            greyAdv(this.location);
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.location];
    } }]);return QuestL5GoblinOutskirts;}();
;// CONCATENATED MODULE: ./src/quests/council/goblins/QuestL5GoblinHarem.ts
function QuestL5GoblinHarem_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestL5GoblinHarem_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestL5GoblinHarem_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestL5GoblinHarem_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestL5GoblinHarem_arrayLikeToArray(o, minLen);}function QuestL5GoblinHarem_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestL5GoblinHarem_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL5GoblinHarem_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL5GoblinHarem_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL5GoblinHarem_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL5GoblinHarem_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL5GoblinHarem_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








var QuestL5GoblinHarem = /*#__PURE__*/function () {function QuestL5GoblinHarem() {QuestL5GoblinHarem_classCallCheck(this, QuestL5GoblinHarem);QuestL5GoblinHarem_defineProperty(this, "harem",
    external_kolmafia_namespaceObject.Location.get("Cobb's Knob Harem"));QuestL5GoblinHarem_defineProperty(this, "extingisher",
    external_kolmafia_namespaceObject.Item.get("industrial fire extinguisher"));QuestL5GoblinHarem_defineProperty(this, "toAbsorb", void 0);QuestL5GoblinHarem_defineProperty(this, "resourceClaim",

    new ResourceClaim(
    ResourceType.FIRE_EXTINGUSHER,
    20,
    "Spray down thirsty goblin harem",
    5));}QuestL5GoblinHarem_createClass(QuestL5GoblinHarem, [{ key: "getResourceClaims", value:


    function getResourceClaims() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("fireExtinguisherHaremUsed") == "true") {
        return [];
      }

      return [this.resourceClaim];
    } }, { key: "getId", value:

    function getId() {
      return "Council / Goblins / HaremOutfit";
    } }, { key: "level", value:

    function level() {
      return 5;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL05Goblin");

      if (status < 1) {
        return QuestStatus.NOT_READY;
      }

      if (status > 1) {
        return QuestStatus.COMPLETED;
      }

      if (!(0,external_canadv_ash_namespaceObject.canAdv)(this.harem)) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.haveOutfit)("knob Goblin Harem Girl Disguise")) {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();

      if (
      (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_fireExtinguisherCharge")) >= 20 &&
      (0,external_kolmafia_namespaceObject.getProperty)("fireExtinguisherHaremUsed") != "true")
      {
        outfit.addItem(this.extingisher);
      } else {
        outfit.setItemDrops();
      }

      return {
        location: external_kolmafia_namespaceObject.Location.get("Cobb's Knob Harem"),
        outfit: outfit,
        run: () => {
          // When we have access to the harem, blast it down
          var macro = Macro.trySkill(
          external_kolmafia_namespaceObject.Skill.get("Fire Extinguisher: Zone Specific"));


          // If its a monster we want to absorb, don't blast it down
          var _iterator = QuestL5GoblinHarem_createForOfIteratorHelper(this.toAbsorb),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var absorb = _step.value;
              macro = Macro.if_(absorb, macro, true);
            }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

          greyAdv(
          external_kolmafia_namespaceObject.Location.get("Cobb's Knob Harem"),
          outfit,
          new AdventureSettings().setStartOfFightMacro(macro));

        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.harem];
    } }]);return QuestL5GoblinHarem;}();
;// CONCATENATED MODULE: ./src/quests/council/QuestL5Goblins.ts
function QuestL5Goblins_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL5Goblins_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL5Goblins_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL5Goblins_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL5Goblins_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL5Goblins_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}









var QuestL5Goblin = /*#__PURE__*/function () {function QuestL5Goblin() {QuestL5Goblins_classCallCheck(this, QuestL5Goblin);QuestL5Goblins_defineProperty(this, "perfume",
    external_kolmafia_namespaceObject.Item.get("knob goblin perfume"));QuestL5Goblins_defineProperty(this, "effect",
    external_kolmafia_namespaceObject.Effect.get("knob Goblin Perfume"));QuestL5Goblins_defineProperty(this, "harem",
    external_kolmafia_namespaceObject.Location.get("Cobb's Knob Harem"));QuestL5Goblins_defineProperty(this, "outskirts",
    new QuestL5GoblinOutskirts());QuestL5Goblins_defineProperty(this, "qHarem",
    new QuestL5GoblinHarem());}QuestL5Goblins_createClass(QuestL5Goblin, [{ key: "getId", value:

    function getId() {
      return "Council / Goblins / King";
    } }, { key: "level", value:

    function level() {
      return 5;
    } }, { key: "needAdventures", value:

    function needAdventures() {
      return 2;
    } }, { key: "getChildren", value:

    function getChildren() {
      return [this.outskirts, this.qHarem];
    } }, { key: "getLocations", value:

    function getLocations() {
      return [external_kolmafia_namespaceObject.Location.get("Throne Room")];
    } }, { key: "status", value:

    function status() {
      var status = (0,external_kolmafia_namespaceObject.getProperty)("questL05Goblin");

      if (status == "finished") {
        return QuestStatus.COMPLETED;
      }

      if (status != "step1" || !(0,external_kolmafia_namespaceObject.haveOutfit)("knob Goblin Harem Girl Disguise")) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().
      addItem(external_kolmafia_namespaceObject.Item.get("Knob Goblin harem pants")).
      addItem(external_kolmafia_namespaceObject.Item.get("Knob Goblin harem veil"));

      return {
        location: external_kolmafia_namespaceObject.Location.get("Throne Room"),
        outfit: outfit,
        run: () => {
          if ((0,external_kolmafia_namespaceObject.haveEffect)(this.effect) == 0) {
            if ((0,external_kolmafia_namespaceObject.itemAmount)(this.perfume) > 0) {
              (0,external_kolmafia_namespaceObject.use)(this.perfume);
            } else {
              greyAdv(this.harem, outfit);
            }
          }

          greyAdv("cobbsknob.php?action=throneroom", outfit);
          (0,external_kolmafia_namespaceObject.autosell)(external_kolmafia_namespaceObject.Item.get("Dense Meat Stack"), 2);
          (0,external_kolmafia_namespaceObject.council)();
        } };

    } }]);return QuestL5Goblin;}();
;// CONCATENATED MODULE: ./src/quests/council/friars/QuestL6FriarElbow.ts
function QuestL6FriarElbow_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL6FriarElbow_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL6FriarElbow_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL6FriarElbow_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL6FriarElbow_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL6FriarElbow_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}









var QuestL6FriarElbow = /*#__PURE__*/function () {function QuestL6FriarElbow() {QuestL6FriarElbow_classCallCheck(this, QuestL6FriarElbow);QuestL6FriarElbow_defineProperty(this, "item",
    external_kolmafia_namespaceObject.Item.get("Eldritch butterknife"));QuestL6FriarElbow_defineProperty(this, "location",
    external_kolmafia_namespaceObject.Location.get("Dark Elbow of the Woods"));QuestL6FriarElbow_defineProperty(this, "absorbs",
    [external_kolmafia_namespaceObject.Monster.get("G imp"), external_kolmafia_namespaceObject.Monster.get("L imp")]);QuestL6FriarElbow_defineProperty(this, "latte",
    external_kolmafia_namespaceObject.Item.get("Latte lovers member's mug"));}QuestL6FriarElbow_createClass(QuestL6FriarElbow, [{ key: "level", value:

    function level() {
      return 6;
    } }, { key: "shouldWearLatte", value:

    function shouldWearLatte() {
      return (
        (0,external_kolmafia_namespaceObject.availableAmount)(this.latte) > 0 &&
        !hasUnlockedLatteFlavor(LatteFlavor.FAM_EXP));

    } }, { key: "isAllAbsorbed", value:

    function isAllAbsorbed() {
      var absorbed = AbsorbsProvider.getReabsorbedMonsters();

      return this.absorbs.find((a) => !absorbed.includes(a)) == null;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.location];
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questL06Friar") == "unstarted") {
        return QuestStatus.NOT_READY;
      }

      if (
      (0,external_kolmafia_namespaceObject.getProperty)("questL06Friar") == "finished" ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.item) > 0)
      {
        return QuestStatus.COMPLETED;
      }

      if (!hasNonCombatSkillsReady()) {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setNoCombat();

      if (this.shouldWearLatte()) {
        outfit.addItem(this.latte);
      }

      return {
        location: this.location,
        outfit: outfit,
        run: () => {
          if (this.isAllAbsorbed() && !this.shouldWearLatte()) {
            DelayBurners.tryReplaceCombats();
          }

          greyAdv(this.location, outfit);
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Council / Friars / Elbow";
    } }]);return QuestL6FriarElbow;}();
;// CONCATENATED MODULE: ./src/quests/council/friars/QuestL6FriarExp.ts
function QuestL6FriarExp_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL6FriarExp_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL6FriarExp_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL6FriarExp_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL6FriarExp_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL6FriarExp_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



var QuestL6FriarExp = /*#__PURE__*/function () {function QuestL6FriarExp() {QuestL6FriarExp_classCallCheck(this, QuestL6FriarExp);QuestL6FriarExp_defineProperty(this, "fam",
    external_kolmafia_namespaceObject.Familiar.get("Grey Goose"));}QuestL6FriarExp_createClass(QuestL6FriarExp, [{ key: "getId", value:

    function getId() {
      return "Misc / FriarExp";
    } }, { key: "level", value:

    function level() {
      return 6;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.toBoolean)((0,external_kolmafia_namespaceObject.getProperty)("friarsBlessingReceived"))) {
        return QuestStatus.COMPLETED;
      }

      if (!(0,external_kolmafia_namespaceObject.friarsAvailable)()) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.myFamiliar)() != this.fam) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.familiarWeight)(this.fam) > 2) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.cliExecute)("friars familiar");
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestL6FriarExp;}();
;// CONCATENATED MODULE: ./src/quests/council/friars/QuestL6FriarHeart.ts
function QuestL6FriarHeart_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL6FriarHeart_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL6FriarHeart_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL6FriarHeart_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL6FriarHeart_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL6FriarHeart_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}









var QuestL6FriarHeart = /*#__PURE__*/function () {function QuestL6FriarHeart() {QuestL6FriarHeart_classCallCheck(this, QuestL6FriarHeart);QuestL6FriarHeart_defineProperty(this, "item",
    external_kolmafia_namespaceObject.Item.get("box of birthday candles"));QuestL6FriarHeart_defineProperty(this, "location",
    external_kolmafia_namespaceObject.Location.get("Dark Heart of the Woods"));QuestL6FriarHeart_defineProperty(this, "absorbs",
    [external_kolmafia_namespaceObject.Monster.get("G imp"), external_kolmafia_namespaceObject.Monster.get("P imp")]);QuestL6FriarHeart_defineProperty(this, "latte",
    external_kolmafia_namespaceObject.Item.get("Latte lovers member's mug"));}QuestL6FriarHeart_createClass(QuestL6FriarHeart, [{ key: "level", value:

    function level() {
      return 6;
    } }, { key: "shouldWearLatte", value:

    function shouldWearLatte() {
      return (
        (0,external_kolmafia_namespaceObject.availableAmount)(this.latte) > 0 &&
        !hasUnlockedLatteFlavor(LatteFlavor.PLUS_COMBAT));

    } }, { key: "isAllAbsorbed", value:

    function isAllAbsorbed() {
      var absorbed = AbsorbsProvider.getReabsorbedMonsters();

      return this.absorbs.find((a) => !absorbed.includes(a)) == null;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.location];
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questL06Friar") == "unstarted") {
        return QuestStatus.NOT_READY;
      }

      if (
      (0,external_kolmafia_namespaceObject.getProperty)("questL06Friar") == "finished" ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.item) > 0)
      {
        return QuestStatus.COMPLETED;
      }

      if (!hasNonCombatSkillsReady()) {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setNoCombat();

      if (this.shouldWearLatte()) {
        outfit.addItem(this.latte);
      }

      return {
        location: this.location,
        outfit: outfit,
        run: () => {
          if (this.isAllAbsorbed() && !this.shouldWearLatte()) {
            DelayBurners.tryReplaceCombats();
          }

          greyAdv(this.location, outfit);
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Council / Friars / Heart";
    } }]);return QuestL6FriarHeart;}();
;// CONCATENATED MODULE: ./src/quests/council/friars/QuestL6FriarNeck.ts
function QuestL6FriarNeck_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL6FriarNeck_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL6FriarNeck_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL6FriarNeck_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL6FriarNeck_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL6FriarNeck_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}









var QuestL6FriarNeck = /*#__PURE__*/function () {function QuestL6FriarNeck() {QuestL6FriarNeck_classCallCheck(this, QuestL6FriarNeck);QuestL6FriarNeck_defineProperty(this, "item",
    external_kolmafia_namespaceObject.Item.get("dodecagram"));QuestL6FriarNeck_defineProperty(this, "location",
    external_kolmafia_namespaceObject.Location.get("Dark Neck of the Woods"));QuestL6FriarNeck_defineProperty(this, "absorbs",
    [external_kolmafia_namespaceObject.Monster.get("P imp"), external_kolmafia_namespaceObject.Monster.get("W imp")]);QuestL6FriarNeck_defineProperty(this, "latte",
    external_kolmafia_namespaceObject.Item.get("Latte lovers member's mug"));}QuestL6FriarNeck_createClass(QuestL6FriarNeck, [{ key: "level", value:

    function level() {
      return 6;
    } }, { key: "shouldWearLatte", value:

    function shouldWearLatte() {
      return (
        (0,external_kolmafia_namespaceObject.hippyStoneBroken)() &&
        (0,external_kolmafia_namespaceObject.availableAmount)(this.latte) > 0 &&
        !hasUnlockedLatteFlavor(LatteFlavor.PVP_FIGHTS));

    } }, { key: "isAllAbsorbed", value:

    function isAllAbsorbed() {
      var absorbed = AbsorbsProvider.getReabsorbedMonsters();

      return this.absorbs.find((a) => !absorbed.includes(a)) == null;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.location];
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questL06Friar") == "unstarted") {
        return QuestStatus.NOT_READY;
      }

      if (
      (0,external_kolmafia_namespaceObject.getProperty)("questL06Friar") == "finished" ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.item) > 0)
      {
        return QuestStatus.COMPLETED;
      }

      if (!hasNonCombatSkillsReady()) {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setNoCombat();

      if (this.shouldWearLatte()) {
        outfit.addItem(this.latte);
      }

      return {
        location: this.location,
        outfit: outfit,
        run: () => {
          if (this.isAllAbsorbed() && !this.shouldWearLatte()) {
            DelayBurners.tryReplaceCombats();
          }

          greyAdv(this.location, outfit);
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Council / Friars / Neck";
    } }]);return QuestL6FriarNeck;}();
;// CONCATENATED MODULE: ./src/quests/council/QuestL6Friars.ts
function QuestL6Friars_toConsumableArray(arr) {return QuestL6Friars_arrayWithoutHoles(arr) || QuestL6Friars_iterableToArray(arr) || QuestL6Friars_unsupportedIterableToArray(arr) || QuestL6Friars_nonIterableSpread();}function QuestL6Friars_nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function QuestL6Friars_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestL6Friars_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestL6Friars_arrayLikeToArray(o, minLen);}function QuestL6Friars_iterableToArray(iter) {if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);}function QuestL6Friars_arrayWithoutHoles(arr) {if (Array.isArray(arr)) return QuestL6Friars_arrayLikeToArray(arr);}function QuestL6Friars_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestL6Friars_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL6Friars_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL6Friars_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL6Friars_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL6Friars_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL6Friars_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var QuestL6Friar = /*#__PURE__*/function () {function QuestL6Friar() {QuestL6Friars_classCallCheck(this, QuestL6Friar);QuestL6Friars_defineProperty(this, "woods",
    [
    new QuestL6FriarElbow(),
    new QuestL6FriarHeart(),
    new QuestL6FriarNeck()]);QuestL6Friars_defineProperty(this, "exp",

    new QuestL6FriarExp());}QuestL6Friars_createClass(QuestL6Friar, [{ key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "level", value:

    function level() {
      return 6;
    } }, { key: "getId", value:

    function getId() {
      return "Council / Friars / TurnIn";
    } }, { key: "getChildren", value:

    function getChildren() {
      return [this.exp].concat(QuestL6Friars_toConsumableArray(this.woods));
    } }, { key: "status", value:

    function status() {
      var status = (0,external_kolmafia_namespaceObject.getProperty)("questL06Friar");

      if (status == "finished") {
        return QuestStatus.COMPLETED;
      }

      if (
      this.woods.filter((c) => c.status() != QuestStatus.COMPLETED).length > 0)
      {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.visitUrl)("friars.php?action=ritual&pwd");
          (0,external_kolmafia_namespaceObject.visitUrl)("pandamonium.php");
          (0,external_kolmafia_namespaceObject.council)();
        } };

    } }]);return QuestL6Friar;}();
;// CONCATENATED MODULE: ./src/quests/council/crypts/CryptTemplate.ts
function CryptTemplate_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function CryptTemplate_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function CryptTemplate_createClass(Constructor, protoProps, staticProps) {if (protoProps) CryptTemplate_defineProperties(Constructor.prototype, protoProps);if (staticProps) CryptTemplate_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function CryptTemplate_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var CryptL7Template = /*#__PURE__*/function () {function CryptL7Template() {CryptTemplate_classCallCheck(this, CryptL7Template);CryptTemplate_defineProperty(this, "swords",
    [
    "ebony epee",
    "antique machete",
    "black sword",
    "broken sword",
    "cardboard katana",
    "cardboard wakizashi",
    "knob goblin deluxe scimitar",
    "knob goblin scimitar",
    "lupine sword",
    "muculent machete",
    "serpentine sword",
    "vorpal blade",
    "white sword",
    "sweet ninja sword"].
    map((s) => external_kolmafia_namespaceObject.Item.get(s)));CryptTemplate_defineProperty(this, "cape",
    external_kolmafia_namespaceObject.Item.get("Unwrapped knock-off retro superhero cape"));}CryptTemplate_createClass(CryptL7Template, [{ key: "getSword", value:

    function getSword() {
      var items = this.swords.filter((i) => (0,external_kolmafia_namespaceObject.availableAmount)(i) > 0);

      if (items.length == 0) {
        (0,external_kolmafia_namespaceObject.retrieveItem)(external_kolmafia_namespaceObject.Item.get("sweet ninja sword"));

        return this.getSword();
      }

      return items[0];
    } }, { key: "level", value:

    function level() {
      return 7;
    } }, { key: "addRetroSword", value:



    function addRetroSword() {var outfit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new GreyOutfit();
      outfit.addItem(this.getSword(), 99999);
      outfit.addBonus("-back");

      return outfit;
    } }, { key: "adjustRetroCape", value:

    function adjustRetroCape() {
      (0,external_kolmafia_namespaceObject.equip)(this.cape);

      if (
      (0,external_kolmafia_namespaceObject.getProperty)("retroCapeSuperhero") == "vampire" &&
      (0,external_kolmafia_namespaceObject.getProperty)("retroCapeWashingInstructions") == "kill")
      {
        return;
      }

      (0,external_kolmafia_namespaceObject.cliExecute)("retrocape vampire kill");
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questL07Cyrptic") == "unstarted") {
        return QuestStatus.NOT_READY;
      }

      if (this.getStatus() == CryptStatus.FINISHED) {
        return QuestStatus.COMPLETED;
      }

      if (this.getSword() == null && (0,external_kolmafia_namespaceObject.myMeat)() < 300) {
        return QuestStatus.NOT_READY;
      }

      return this.cryptStatus();
    } }, { key: "getStatus", value:









    function getStatus() {
      var num = (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)(this.getProperty()));

      if (num > 25) {
        return CryptStatus.FIGHT;
      }

      if (num <= 0) {
        return CryptStatus.FINISHED;
      }

      return CryptStatus.BOSS;
    } }]);return CryptL7Template;}();
;// CONCATENATED MODULE: ./src/quests/council/crypts/QuestL7CryptDirtyMan.ts
function QuestL7CryptDirtyMan_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL7CryptDirtyMan_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL7CryptDirtyMan_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL7CryptDirtyMan_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL7CryptDirtyMan_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL7CryptDirtyMan_inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) QuestL7CryptDirtyMan_setPrototypeOf(subClass, superClass);}function QuestL7CryptDirtyMan_setPrototypeOf(o, p) {QuestL7CryptDirtyMan_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return QuestL7CryptDirtyMan_setPrototypeOf(o, p);}function QuestL7CryptDirtyMan_createSuper(Derived) {var hasNativeReflectConstruct = QuestL7CryptDirtyMan_isNativeReflectConstruct();return function _createSuperInternal() {var Super = QuestL7CryptDirtyMan_getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = QuestL7CryptDirtyMan_getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return QuestL7CryptDirtyMan_possibleConstructorReturn(this, result);};}function QuestL7CryptDirtyMan_possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return QuestL7CryptDirtyMan_assertThisInitialized(self);}function QuestL7CryptDirtyMan_assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function QuestL7CryptDirtyMan_isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function QuestL7CryptDirtyMan_getPrototypeOf(o) {QuestL7CryptDirtyMan_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return QuestL7CryptDirtyMan_getPrototypeOf(o);}function QuestL7CryptDirtyMan_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}










var CryptL7DirtyMan = /*#__PURE__*/function (_CryptL7Template) {QuestL7CryptDirtyMan_inherits(CryptL7DirtyMan, _CryptL7Template);var _super = QuestL7CryptDirtyMan_createSuper(CryptL7DirtyMan);function CryptL7DirtyMan() {var _this;QuestL7CryptDirtyMan_classCallCheck(this, CryptL7DirtyMan);for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}_this = _super.call.apply(_super, [this].concat(args));QuestL7CryptDirtyMan_defineProperty(QuestL7CryptDirtyMan_assertThisInitialized(_this), "loc",
    external_kolmafia_namespaceObject.Location.get("The Defiled Niche"));QuestL7CryptDirtyMan_defineProperty(QuestL7CryptDirtyMan_assertThisInitialized(_this), "sniffer",
    external_kolmafia_namespaceObject.Familiar.get("Nosy Nose"));QuestL7CryptDirtyMan_defineProperty(QuestL7CryptDirtyMan_assertThisInitialized(_this), "dirty",
    external_kolmafia_namespaceObject.Monster.get("dirty old lihc"));QuestL7CryptDirtyMan_defineProperty(QuestL7CryptDirtyMan_assertThisInitialized(_this), "sniff",
    external_kolmafia_namespaceObject.Skill.get("Get a Good Whiff of This Guy"));QuestL7CryptDirtyMan_defineProperty(QuestL7CryptDirtyMan_assertThisInitialized(_this), "banisher",
    external_kolmafia_namespaceObject.Skill.get("System Sweep"));QuestL7CryptDirtyMan_defineProperty(QuestL7CryptDirtyMan_assertThisInitialized(_this), "fire",
    external_kolmafia_namespaceObject.Item.get("industrial fire extinguisher"));QuestL7CryptDirtyMan_defineProperty(QuestL7CryptDirtyMan_assertThisInitialized(_this), "resourceClaim",
    new ResourceClaim(
    ResourceType.FIRE_EXTINGUSHER,
    20,
    "Spray down Dirty Old Man",
    (0,external_kolmafia_namespaceObject.availableAmount)(_this.cape) > 0 ? 4 : 9));return _this;}QuestL7CryptDirtyMan_createClass(CryptL7DirtyMan, [{ key: "getResourceClaims", value:


    function getResourceClaims() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("fireExtinguisherCyrptUsed") == "true") {
        return [];
      }

      return [this.resourceClaim];
    } }, { key: "run", value:

    function run() {
      var outfit = this.addRetroSword();

      if (this.canSprayDown()) {
        outfit.addItem(this.fire);
      }

      var fam = null;
      /*  toInt(getProperty(this.getProperty())) >
        (getProperty("nosyNoseMonster") != "dirty old lihc" ? 31 : 27)
          ? this.sniffer
          : null;*/

      return {
        familiar: fam,
        location: this.loc,
        outfit: outfit,
        run: () => {
          this.adjustRetroCape();

          var killing = greyKillingBlow(outfit);

          if (this.canSprayDown()) {
            // If its a dirty lich, don't spray down
            killing = Macro.if_(
            this.dirty,
            Macro.trySkill(external_kolmafia_namespaceObject.Skill.get("Fire Extinguisher: Zone Specific")),
            true).
            step(killing);
          }

          var start = null;

          if (
          (0,external_kolmafia_namespaceObject.myFamiliar)() == fam &&
          (0,external_kolmafia_namespaceObject.getProperty)("nosyNoseMonster") != "dirty old lihc")
          {
            start = Macro.step("if monsterid 1071;skill 7166;endif");
          }

          greyAdv(
          this.loc,
          outfit,
          new AdventureSettings().
          addNoBanish(this.dirty).
          setStartOfFightMacro(start).
          setFinishingBlowMacro(killing));

        } };

    } }, { key: "canSprayDown", value:

    function canSprayDown() {
      return (
        (0,external_kolmafia_namespaceObject.availableAmount)(this.fire) > 0 &&
        (0,external_kolmafia_namespaceObject.getProperty)("fireExtinguisherCyrptUsed") != "true" &&
        (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_fireExtinguisherCharge")) >= 20);

    } }, { key: "getProperty", value:

    function getProperty() {
      return "cyrptNicheEvilness";
    } }, { key: "cryptStatus", value:

    function cryptStatus() {
      if (!(0,external_kolmafia_namespaceObject.haveSkill)(this.banisher)) {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "getId", value:

    function getId() {
      return "Council / Crypt / DirtyMan";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }]);return CryptL7DirtyMan;}(CryptL7Template);
;// CONCATENATED MODULE: ./src/quests/council/crypts/QuestL7CryptEyes.ts
function QuestL7CryptEyes_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL7CryptEyes_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL7CryptEyes_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL7CryptEyes_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL7CryptEyes_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL7CryptEyes_inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) QuestL7CryptEyes_setPrototypeOf(subClass, superClass);}function QuestL7CryptEyes_setPrototypeOf(o, p) {QuestL7CryptEyes_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return QuestL7CryptEyes_setPrototypeOf(o, p);}function QuestL7CryptEyes_createSuper(Derived) {var hasNativeReflectConstruct = QuestL7CryptEyes_isNativeReflectConstruct();return function _createSuperInternal() {var Super = QuestL7CryptEyes_getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = QuestL7CryptEyes_getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return QuestL7CryptEyes_possibleConstructorReturn(this, result);};}function QuestL7CryptEyes_possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return QuestL7CryptEyes_assertThisInitialized(self);}function QuestL7CryptEyes_assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function QuestL7CryptEyes_isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function QuestL7CryptEyes_getPrototypeOf(o) {QuestL7CryptEyes_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return QuestL7CryptEyes_getPrototypeOf(o);}function QuestL7CryptEyes_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var CryptL7Eyes = /*#__PURE__*/function (_CryptL7Template) {QuestL7CryptEyes_inherits(CryptL7Eyes, _CryptL7Template);var _super = QuestL7CryptEyes_createSuper(CryptL7Eyes);function CryptL7Eyes() {var _this;QuestL7CryptEyes_classCallCheck(this, CryptL7Eyes);for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}_this = _super.call.apply(_super, [this].concat(args));QuestL7CryptEyes_defineProperty(QuestL7CryptEyes_assertThisInitialized(_this), "loc",
    external_kolmafia_namespaceObject.Location.get("The Defiled Nook"));return _this;}QuestL7CryptEyes_createClass(CryptL7Eyes, [{ key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setItemDrops();
      this.addRetroSword(outfit);

      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          this.adjustRetroCape();
          greyAdv(
          this.loc,
          outfit,
          new AdventureSettings().addBanish(external_kolmafia_namespaceObject.Monster.get("party skelteon")));


          (0,external_kolmafia_namespaceObject.cliExecute)("refresh inventory");

          var item = external_kolmafia_namespaceObject.Item.get("Evil Eye");

          if ((0,external_kolmafia_namespaceObject.availableAmount)(item) > 0) {
            (0,external_kolmafia_namespaceObject.use)(item, (0,external_kolmafia_namespaceObject.availableAmount)(item));
          }
        } };

    } }, { key: "getProperty", value:

    function getProperty() {
      return "cyrptNookEvilness";
    } }, { key: "cryptStatus", value:

    function cryptStatus() {
      return QuestStatus.READY;
    } }, { key: "getId", value:

    function getId() {
      return "Council / Crypt / Eyes";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }]);return CryptL7Eyes;}(CryptL7Template);
;// CONCATENATED MODULE: ./src/quests/council/crypts/QuestL7CryptRattling.ts
function QuestL7CryptRattling_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL7CryptRattling_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL7CryptRattling_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL7CryptRattling_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL7CryptRattling_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL7CryptRattling_inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) QuestL7CryptRattling_setPrototypeOf(subClass, superClass);}function QuestL7CryptRattling_setPrototypeOf(o, p) {QuestL7CryptRattling_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return QuestL7CryptRattling_setPrototypeOf(o, p);}function QuestL7CryptRattling_createSuper(Derived) {var hasNativeReflectConstruct = QuestL7CryptRattling_isNativeReflectConstruct();return function _createSuperInternal() {var Super = QuestL7CryptRattling_getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = QuestL7CryptRattling_getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return QuestL7CryptRattling_possibleConstructorReturn(this, result);};}function QuestL7CryptRattling_possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return QuestL7CryptRattling_assertThisInitialized(self);}function QuestL7CryptRattling_assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function QuestL7CryptRattling_isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function QuestL7CryptRattling_getPrototypeOf(o) {QuestL7CryptRattling_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return QuestL7CryptRattling_getPrototypeOf(o);}function QuestL7CryptRattling_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var CryptL7Rattling = /*#__PURE__*/function (_CryptL7Template) {QuestL7CryptRattling_inherits(CryptL7Rattling, _CryptL7Template);var _super = QuestL7CryptRattling_createSuper(CryptL7Rattling);function CryptL7Rattling() {var _this;QuestL7CryptRattling_classCallCheck(this, CryptL7Rattling);for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}_this = _super.call.apply(_super, [this].concat(args));QuestL7CryptRattling_defineProperty(QuestL7CryptRattling_assertThisInitialized(_this), "loc",
    external_kolmafia_namespaceObject.Location.get("The Defiled Cranny"));return _this;}QuestL7CryptRattling_createClass(CryptL7Rattling, [{ key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setNoCombat();

      outfit.plusMonsterLevelWeight = 4;
      this.addRetroSword(outfit);

      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          this.adjustRetroCape();
          (0,external_kolmafia_namespaceObject.changeMcd)(10);
          greyAdv(this.loc, outfit);
          (0,external_kolmafia_namespaceObject.changeMcd)(0);
        } };

    } }, { key: "getProperty", value:

    function getProperty() {
      return "cyrptCrannyEvilness";
    } }, { key: "cryptStatus", value:

    function cryptStatus() {
      if (!hasNonCombatSkillsReady()) {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "getId", value:

    function getId() {
      return "Council / Crypt / Rattling";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }]);return CryptL7Rattling;}(CryptL7Template);
;// CONCATENATED MODULE: ./src/quests/council/crypts/QuestL7CryptSprinters.ts
function QuestL7CryptSprinters_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL7CryptSprinters_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL7CryptSprinters_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL7CryptSprinters_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL7CryptSprinters_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL7CryptSprinters_inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) QuestL7CryptSprinters_setPrototypeOf(subClass, superClass);}function QuestL7CryptSprinters_setPrototypeOf(o, p) {QuestL7CryptSprinters_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return QuestL7CryptSprinters_setPrototypeOf(o, p);}function QuestL7CryptSprinters_createSuper(Derived) {var hasNativeReflectConstruct = QuestL7CryptSprinters_isNativeReflectConstruct();return function _createSuperInternal() {var Super = QuestL7CryptSprinters_getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = QuestL7CryptSprinters_getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return QuestL7CryptSprinters_possibleConstructorReturn(this, result);};}function QuestL7CryptSprinters_possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return QuestL7CryptSprinters_assertThisInitialized(self);}function QuestL7CryptSprinters_assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function QuestL7CryptSprinters_isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function QuestL7CryptSprinters_getPrototypeOf(o) {QuestL7CryptSprinters_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return QuestL7CryptSprinters_getPrototypeOf(o);}function QuestL7CryptSprinters_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var CryptL7Sprinters = /*#__PURE__*/function (_CryptL7Template) {QuestL7CryptSprinters_inherits(CryptL7Sprinters, _CryptL7Template);var _super = QuestL7CryptSprinters_createSuper(CryptL7Sprinters);function CryptL7Sprinters() {var _this;QuestL7CryptSprinters_classCallCheck(this, CryptL7Sprinters);for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}_this = _super.call.apply(_super, [this].concat(args));QuestL7CryptSprinters_defineProperty(QuestL7CryptSprinters_assertThisInitialized(_this), "loc",
    external_kolmafia_namespaceObject.Location.get("The Defiled Alcove"));return _this;}QuestL7CryptSprinters_createClass(CryptL7Sprinters, [{ key: "run", value:

    function run() {
      var outfit = new GreyOutfit();
      outfit.initWeight = 2;
      this.addRetroSword(outfit);

      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          this.adjustRetroCape();
          greyAdv(this.loc, outfit);
        } };

    } }, { key: "getProperty", value:

    function getProperty() {
      return "cyrptAlcoveEvilness";
    } }, { key: "cryptStatus", value:

    function cryptStatus() {
      return QuestStatus.READY;
    } }, { key: "getId", value:

    function getId() {
      return "Council / Crypt / Sprinters";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }]);return CryptL7Sprinters;}(CryptL7Template);
;// CONCATENATED MODULE: ./src/quests/council/QuestL7Crypt.ts
function QuestL7Crypt_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL7Crypt_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL7Crypt_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL7Crypt_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL7Crypt_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL7Crypt_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








var QuestL7Crypt = /*#__PURE__*/function () {function QuestL7Crypt() {QuestL7Crypt_classCallCheck(this, QuestL7Crypt);QuestL7Crypt_defineProperty(this, "children",
    [
    new CryptL7DirtyMan(),
    new CryptL7Eyes(),
    new CryptL7Rattling(),
    new CryptL7Sprinters()]);QuestL7Crypt_defineProperty(this, "chest",

    external_kolmafia_namespaceObject.Item.get("Chest of the Bonerdagon"));}QuestL7Crypt_createClass(QuestL7Crypt, [{ key: "getLocations", value:

    function getLocations() {
      return [external_kolmafia_namespaceObject.Location.get("Haert of the Cyrpt")];
    } }, { key: "getChildren", value:

    function getChildren() {
      return this.children;
    } }, { key: "level", value:

    function level() {
      return 7;
    } }, { key: "status", value:

    function status() {
      var status = (0,external_kolmafia_namespaceObject.getProperty)("questL07Cyrptic");

      if (status == "finished") {
        return QuestStatus.COMPLETED;
      }

      // If we're too poor to buy a sword, too lazy to do more checks
      if ((0,external_kolmafia_namespaceObject.myMeat)() < 300) {
        return QuestStatus.NOT_READY;
      }

      // If we're ready for boss
      if (
      this.children.filter((c) => c.status() != QuestStatus.COMPLETED).length ==
      0)
      {
        return QuestStatus.READY;
      }
      // Equip sword and retrocape
      // Then we gotta handle each zone specially. Item drop, ML, init and eh

      return QuestStatus.NOT_READY;
    } }, { key: "getId", value:

    function getId() {
      return "Council / Crypt / Boss";
    } }, { key: "run", value:

    function run() {
      return {
        location: external_kolmafia_namespaceObject.Location.get("Haert of the Cyrpt"),
        run: () => {
          greyAdv("crypt.php?action=heart");
          (0,external_kolmafia_namespaceObject.council)();

          if ((0,external_kolmafia_namespaceObject.availableAmount)(this.chest) > 0) {
            (0,external_kolmafia_namespaceObject.use)(this.chest);
          }
        } };

    } }]);return QuestL7Crypt;}();


var CryptStatus;(function (CryptStatus) {CryptStatus[CryptStatus["FIGHT"] = 0] = "FIGHT";CryptStatus[CryptStatus["BOSS"] = 1] = "BOSS";CryptStatus[CryptStatus["FINISHED"] = 2] = "FINISHED";})(CryptStatus || (CryptStatus = {}));
;// CONCATENATED MODULE: ./src/quests/council/icepeak/QuestL8MountainBoss.ts
function QuestL8MountainBoss_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL8MountainBoss_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL8MountainBoss_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL8MountainBoss_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL8MountainBoss_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL8MountainBoss_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestL8MountainBoss = /*#__PURE__*/function () {function QuestL8MountainBoss() {QuestL8MountainBoss_classCallCheck(this, QuestL8MountainBoss);QuestL8MountainBoss_defineProperty(this, "peak",
    external_kolmafia_namespaceObject.Location.get("Mist-shrouded Peak"));}QuestL8MountainBoss_createClass(QuestL8MountainBoss, [{ key: "getId", value:

    function getId() {
      return "Council / Ice / Boss";
    } }, { key: "level", value:

    function level() {
      return 8;
    } }, { key: "status", value:

    function status() {
      var status = this.getStatus();

      if (status == MountainStatus.finished) {
        return QuestStatus.COMPLETED;
      }

      if (status < MountainStatus.UNLOCKED_PEAK) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().addBonus("+2 cold res");

      return {
        location: this.peak,
        outfit: outfit,
        run: () => {
          greyAdv("place.php?whichplace=mclargehuge&action=cloudypeak2", outfit);

          if (this.getStatus() == MountainStatus.DEFEATED_BOAR) {
            this.talkTrapper();
            (0,external_kolmafia_namespaceObject.council)();
          }
        } };

    } }, { key: "talkTrapper", value:

    function talkTrapper() {
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=mclargehuge&action=trappercabin");
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.peak];
    } }, { key: "getStatus", value:

    function getStatus() {
      return getQuestStatus("questL08Trapper");
    } }]);return QuestL8MountainBoss;}();
;// CONCATENATED MODULE: ./src/quests/council/icepeak/QuestL8MountainGoats.ts
function QuestL8MountainGoats_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL8MountainGoats_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL8MountainGoats_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL8MountainGoats_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL8MountainGoats_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL8MountainGoats_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestL8MountainGoats = /*#__PURE__*/function () {function QuestL8MountainGoats() {QuestL8MountainGoats_classCallCheck(this, QuestL8MountainGoats);QuestL8MountainGoats_defineProperty(this, "goats",
    external_kolmafia_namespaceObject.Location.get("The Goatlet"));QuestL8MountainGoats_defineProperty(this, "cheese",
    external_kolmafia_namespaceObject.Item.get("Goat Cheese"));QuestL8MountainGoats_defineProperty(this, "dairy",
    external_kolmafia_namespaceObject.Monster.get("Dairy Goat"));}QuestL8MountainGoats_createClass(QuestL8MountainGoats, [{ key: "getId", value:

    function getId() {
      return "Council / Ice / Goats";
    } }, { key: "level", value:

    function level() {
      return 8;
    } }, { key: "status", value:

    function status() {
      var status = this.getStatus();

      if (status < MountainStatus.TRAPPER_DEMANDS) {
        return QuestStatus.NOT_READY;
      }

      if (status > MountainStatus.TRAPPER_DEMANDS) {
        return QuestStatus.COMPLETED;
      }

      // If we have our cheese but not the ores
      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.cheese) >= 3 && this.getOreRemaining() > 0) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "getOreRemaining", value:

    function getOreRemaining() {
      return 3 - (0,external_kolmafia_namespaceObject.availableAmount)(this.neededOre());
    } }, { key: "neededOre", value:

    function neededOre() {
      return external_kolmafia_namespaceObject.Item.get((0,external_kolmafia_namespaceObject.getProperty)("trapperOre"));
    } }, { key: "talkTrapper", value:

    function talkTrapper() {
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=mclargehuge&action=trappercabin");
    } }, { key: "run", value:

    function run() {
      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.cheese) >= 3) {
        return {
          location: null,
          run: () => {
            this.talkTrapper();
          } };

      }

      var outfit = new GreyOutfit().setItemDrops();

      return {
        location: this.goats,
        outfit: outfit,
        run: () => {
          greyAdv(
          this.goats,
          outfit,
          new AdventureSettings().addNoBanish(this.dairy));


          if ((0,external_kolmafia_namespaceObject.availableAmount)(this.cheese) >= 3 && this.getOreRemaining() <= 0) {
            this.talkTrapper();
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.goats];
    } }, { key: "getStatus", value:

    function getStatus() {
      return getQuestStatus("questL08Trapper");
    } }]);return QuestL8MountainGoats;}();
;// CONCATENATED MODULE: ./src/quests/council/icepeak/QuestL8MountainNinja.ts
function QuestL8MountainNinja_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL8MountainNinja_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL8MountainNinja_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL8MountainNinja_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL8MountainNinja_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL8MountainNinja_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var QuestL8MountainNinja = /*#__PURE__*/function () {function QuestL8MountainNinja() {QuestL8MountainNinja_classCallCheck(this, QuestL8MountainNinja);QuestL8MountainNinja_defineProperty(this, "ninja",
    external_kolmafia_namespaceObject.Location.get("Lair of the Ninja Snowmen"));}QuestL8MountainNinja_createClass(QuestL8MountainNinja, [{ key: "getId", value:
    // TODO Once we've got the absorbs, try replace combats if assassins isnt done cos we're really just stacking +combat

    function getId() {
      return "Council / Ice / Ninjas";
    } }, { key: "level", value:

    function level() {
      return 8;
    } }, { key: "status", value:

    function status() {
      var status = this.getStatus();

      if (status > MountainStatus.GET_OUTFIT) {
        return QuestStatus.COMPLETED;
      }

      if (status < MountainStatus.GET_OUTFIT) {
        return QuestStatus.NOT_READY;
      }

      // If we've reached snowman time but don't have the skill
      if (!hasCombatSkillReady()) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "getStatus", value:

    function getStatus() {
      return getQuestStatus("questL08Trapper");
    } }, { key: "run", value:

    function run() {
      // See if we can unlock peak yet
      if (this.getOutfit().find((i) => (0,external_kolmafia_namespaceObject.availableAmount)(i) == 0) == null) {
        return {
          location: null,
          run: () => {
            if ((0,external_kolmafia_namespaceObject.numericModifier)("Cold Resistance") < 5) {
              (0,external_kolmafia_namespaceObject.maximize)("cold res", false);
            }

            (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=mclargehuge&action=cloudypeak");
          } };

      }

      var outfit = new GreyOutfit().setPlusCombat();

      return {
        location: this.ninja,
        outfit: outfit,
        run: () => {
          greyAdv(this.ninja, outfit);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.ninja];
    } }, { key: "getOutfit", value:

    function getOutfit() {
      return ["Ninja rope", "Ninja Crampons", "Ninja Carabiner"].map((i) =>
      external_kolmafia_namespaceObject.Item.get(i));

    } }]);return QuestL8MountainNinja;}();
;// CONCATENATED MODULE: ./src/quests/council/icepeak/QuestL8MountainOre.ts
function QuestL8MountainOre_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL8MountainOre_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL8MountainOre_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL8MountainOre_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL8MountainOre_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL8MountainOre_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}




var QuestL8MountainOre = /*#__PURE__*/function () {function QuestL8MountainOre() {QuestL8MountainOre_classCallCheck(this, QuestL8MountainOre);QuestL8MountainOre_defineProperty(this, "mines",
    external_kolmafia_namespaceObject.Location.get("Itznotyerzitz Mine"));}QuestL8MountainOre_createClass(QuestL8MountainOre, [{ key: "level", value:



    function level() {
      return 8;
    } }, { key: "getOreRemaining", value:







    function getOreRemaining() {
      return 3 - (0,external_kolmafia_namespaceObject.availableAmount)(this.neededOre());
    } }, { key: "neededOre", value:

    function neededOre() {
      return external_kolmafia_namespaceObject.Item.get((0,external_kolmafia_namespaceObject.getProperty)("trapperOre"));
    } }, { key: "talkTrapper", value:

    function talkTrapper() {
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=mclargehuge&action=trappercabin");
    } }, { key: "getStatus", value:

    function getStatus() {
      return getQuestStatus("questL08Trapper");
    } }]);return QuestL8MountainOre;}();
;// CONCATENATED MODULE: ./src/quests/council/icepeak/QuestL8MountainOreClover.ts
function QuestL8MountainOreClover_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL8MountainOreClover_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL8MountainOreClover_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL8MountainOreClover_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL8MountainOreClover_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL8MountainOreClover_inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) QuestL8MountainOreClover_setPrototypeOf(subClass, superClass);}function QuestL8MountainOreClover_setPrototypeOf(o, p) {QuestL8MountainOreClover_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return QuestL8MountainOreClover_setPrototypeOf(o, p);}function QuestL8MountainOreClover_createSuper(Derived) {var hasNativeReflectConstruct = QuestL8MountainOreClover_isNativeReflectConstruct();return function _createSuperInternal() {var Super = QuestL8MountainOreClover_getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = QuestL8MountainOreClover_getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return QuestL8MountainOreClover_possibleConstructorReturn(this, result);};}function QuestL8MountainOreClover_possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return QuestL8MountainOreClover_assertThisInitialized(self);}function QuestL8MountainOreClover_assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function QuestL8MountainOreClover_isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function QuestL8MountainOreClover_getPrototypeOf(o) {QuestL8MountainOreClover_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return QuestL8MountainOreClover_getPrototypeOf(o);}function QuestL8MountainOreClover_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








var QuestL8MountainOreClover = /*#__PURE__*/function (_QuestL8MountainOre) {QuestL8MountainOreClover_inherits(QuestL8MountainOreClover, _QuestL8MountainOre);var _super = QuestL8MountainOreClover_createSuper(QuestL8MountainOreClover);function QuestL8MountainOreClover() {var _this;QuestL8MountainOreClover_classCallCheck(this, QuestL8MountainOreClover);for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}_this = _super.call.apply(_super, [this].concat(args));QuestL8MountainOreClover_defineProperty(QuestL8MountainOreClover_assertThisInitialized(_this), "clover",
    external_kolmafia_namespaceObject.Item.get("11-leaf Clover"));return _this;}QuestL8MountainOreClover_createClass(QuestL8MountainOreClover, [{ key: "getId", value:

    function getId() {
      return "Council / Ice / OreClover";
    } }, { key: "status", value:

    function status() {
      if (GreySettings.isHardcoreMode()) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.clover) < 2) {
        return QuestStatus.COMPLETED;
      }

      if (this.getStatus() < MountainStatus.TRAPPER_DEMANDS) {
        return QuestStatus.NOT_READY;
      }

      if (
      this.getOreRemaining() <= 0 ||
      this.getStatus() > MountainStatus.TRAPPER_DEMANDS)
      {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          for (var i = 0; i < 2; i++) {
            GreyClovers.doOres();
            greyAdv(this.mines);
          }

          GreyPulls.pullOre();
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestL8MountainOreClover;}(QuestL8MountainOre);
;// CONCATENATED MODULE: ./src/quests/locket/QuestL8MountainOreMan.ts
function QuestL8MountainOreMan_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL8MountainOreMan_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL8MountainOreMan_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL8MountainOreMan_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL8MountainOreMan_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL8MountainOreMan_inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) QuestL8MountainOreMan_setPrototypeOf(subClass, superClass);}function QuestL8MountainOreMan_setPrototypeOf(o, p) {QuestL8MountainOreMan_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return QuestL8MountainOreMan_setPrototypeOf(o, p);}function QuestL8MountainOreMan_createSuper(Derived) {var hasNativeReflectConstruct = QuestL8MountainOreMan_isNativeReflectConstruct();return function _createSuperInternal() {var Super = QuestL8MountainOreMan_getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = QuestL8MountainOreMan_getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return QuestL8MountainOreMan_possibleConstructorReturn(this, result);};}function QuestL8MountainOreMan_possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return QuestL8MountainOreMan_assertThisInitialized(self);}function QuestL8MountainOreMan_assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function QuestL8MountainOreMan_isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function QuestL8MountainOreMan_getPrototypeOf(o) {QuestL8MountainOreMan_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return QuestL8MountainOreMan_getPrototypeOf(o);}function QuestL8MountainOreMan_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}










var QuestL8MountainOreMan = /*#__PURE__*/function (_QuestL8MountainOre) {QuestL8MountainOreMan_inherits(QuestL8MountainOreMan, _QuestL8MountainOre);var _super = QuestL8MountainOreMan_createSuper(QuestL8MountainOreMan);function QuestL8MountainOreMan() {var _this;QuestL8MountainOreMan_classCallCheck(this, QuestL8MountainOreMan);for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}_this = _super.call.apply(_super, [this].concat(args));QuestL8MountainOreMan_defineProperty(QuestL8MountainOreMan_assertThisInitialized(_this), "mountainMan",
    external_kolmafia_namespaceObject.Monster.get("Mountain Man"));QuestL8MountainOreMan_defineProperty(QuestL8MountainOreMan_assertThisInitialized(_this), "goose",
    external_kolmafia_namespaceObject.Familiar.get("Grey Goose"));QuestL8MountainOreMan_defineProperty(QuestL8MountainOreMan_assertThisInitialized(_this), "indus",
    external_kolmafia_namespaceObject.Item.get("industrial fire extinguisher"));QuestL8MountainOreMan_defineProperty(QuestL8MountainOreMan_assertThisInitialized(_this), "polar",
    external_kolmafia_namespaceObject.Skill.get("Fire Extinguisher: Polar Vortex"));QuestL8MountainOreMan_defineProperty(QuestL8MountainOreMan_assertThisInitialized(_this), "rocket",
    external_kolmafia_namespaceObject.Item.get("Yellow Rocket"));QuestL8MountainOreMan_defineProperty(QuestL8MountainOreMan_assertThisInitialized(_this), "effect",
    external_kolmafia_namespaceObject.Effect.get("Everything Looks Yellow"));QuestL8MountainOreMan_defineProperty(QuestL8MountainOreMan_assertThisInitialized(_this), "resourceClaim",
    new ResourceClaim(
    ResourceType.FIRE_EXTINGUSHER,
    40,
    "Polar Vortex Ores",
    6));return _this;}QuestL8MountainOreMan_createClass(QuestL8MountainOreMan, [{ key: "getResourceClaims", value:


    function getResourceClaims() {
      return [this.resourceClaim];
    } }, { key: "getId", value:

    function getId() {
      return "Council / Ice / MountainMan";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "getStatus", value:

    function getStatus() {
      return getQuestStatus("questL08Trapper");
    } }, { key: "status", value:

    function status() {
      var status = this.getStatus();

      if (status > MountainStatus.TRAPPER_DEMANDS) {
        return QuestStatus.COMPLETED;
      }

      if (status < MountainStatus.TRAPPER_DEMANDS) {
        return QuestStatus.NOT_READY;
      }

      if (this.getOreRemaining() <= 0) {
        return QuestStatus.COMPLETED;
      }

      if (!this.canBackup() && (0,external_kolmafia_namespaceObject.haveEffect)(this.effect) > 0) {
        return QuestStatus.NOT_READY;
      }

      if (this.getOreRemaining() == 3 && this.doDuping()) {
        if ((0,external_kolmafia_namespaceObject.familiarWeight)(this.goose) < 6) {
          return QuestStatus.NOT_READY;
        }
      }

      return QuestStatus.READY;
    } }, { key: "mustBeDone", value:

    function mustBeDone() {
      if ((0,external_kolmafia_namespaceObject.myLevel)() < 12) {
        return false;
      }

      if ((0,external_kolmafia_namespaceObject.myAdventures)() < 40) {
        return false;
      }

      if ((0,external_kolmafia_namespaceObject.familiarWeight)(this.goose) >= 6) {
        return true;
      }

      return false;
    } }, { key: "lastBackup", value:

    function lastBackup() {
      return external_kolmafia_namespaceObject.Monster.get((0,external_kolmafia_namespaceObject.getProperty)("lastCopyableMonster"));
    } }, { key: "canBackup", value:

    function canBackup() {
      return this.hasBackups() && this.lastBackup() == this.mountainMan;
    } }, { key: "hasBackups", value:

    function hasBackups() {
      return getBackupsRemaining() > 0;
    } }, { key: "doBackups", value:

    function doBackups() {
      var outfit = new GreyOutfit().setItemDrops();
      var loc = external_kolmafia_namespaceObject.Location.get("The Dire Warren");

      outfit.addItem(external_kolmafia_namespaceObject.Item.get("Backup Camera"));

      return {
        location: loc,
        outfit: outfit,
        run: () => {
          greyAdv(
          loc,
          outfit,
          new AdventureSettings().setStartOfFightMacro(
          new Macro().externalIf(
          external_kolmafia_namespaceObject.Monster.get("Fluffy Bunny"),
          Macro.skill(external_kolmafia_namespaceObject.Skill.get("Back-Up to your Last Enemy")))));



        } };

    } }, { key: "run", value:

    function run() {
      if (this.canBackup()) {
        return this.doBackups();
      }

      return this.doLocket();
    } }, { key: "doLocket", value:

    function doLocket() {
      var outfit = new GreyOutfit();
      outfit.addBonus("+DA +DR -ML");

      if (!this.doDuping()) {
        outfit.addItem(this.indus);
      }

      return {
        location: null,
        outfit: outfit,
        familiar: this.goose,
        run: () => {
          (0,external_kolmafia_namespaceObject.retrieveItem)(this.rocket);

          if ((0,external_kolmafia_namespaceObject.itemAmount)(this.rocket) == 0) {
            throw "Supposed to have a yellow rocket on hand!";
          }

          (0,external_kolmafia_namespaceObject.useFamiliar)(this.goose);

          var page1 = (0,external_kolmafia_namespaceObject.visitUrl)("inventory.php?reminisce=1", false);
          var url =
          "choice.php?pwd=&whichchoice=1463&option=1&mid=" +
          (0,external_kolmafia_namespaceObject.toInt)(this.mountainMan);

          (0,external_kolmafia_namespaceObject.visitUrl)(url);

          var macro = new Macro();

          if (this.doDuping()) {
            macro = macro.skill(external_kolmafia_namespaceObject.Skill.get("Emit Matter Duplicating Drones"));
          } else {
            var tries = 2;

            while (tries > 0 && this.getOreRemaining() > 2) {
              tries--;
              (0,external_kolmafia_namespaceObject.print)("Drop my ore dammit!", "red");
              Macro.skill(this.polar).submit();
            }
          }

          macro.item(this.rocket);
          macro.submit();
        } };

    } }, { key: "doDuping", value:

    function doDuping() {
      return this.neededOre() == external_kolmafia_namespaceObject.Item.get("asbestos ore");
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "needAdventures", value:

    function needAdventures() {
      return 3;
    } }]);return QuestL8MountainOreMan;}(QuestL8MountainOre);
;// CONCATENATED MODULE: ./src/quests/council/icepeak/QuestL8MountainOreMiningOutfit.ts
function QuestL8MountainOreMiningOutfit_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL8MountainOreMiningOutfit_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL8MountainOreMiningOutfit_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL8MountainOreMiningOutfit_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL8MountainOreMiningOutfit_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL8MountainOreMiningOutfit_inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) QuestL8MountainOreMiningOutfit_setPrototypeOf(subClass, superClass);}function QuestL8MountainOreMiningOutfit_setPrototypeOf(o, p) {QuestL8MountainOreMiningOutfit_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return QuestL8MountainOreMiningOutfit_setPrototypeOf(o, p);}function QuestL8MountainOreMiningOutfit_createSuper(Derived) {var hasNativeReflectConstruct = QuestL8MountainOreMiningOutfit_isNativeReflectConstruct();return function _createSuperInternal() {var Super = QuestL8MountainOreMiningOutfit_getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = QuestL8MountainOreMiningOutfit_getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return QuestL8MountainOreMiningOutfit_possibleConstructorReturn(this, result);};}function QuestL8MountainOreMiningOutfit_possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return QuestL8MountainOreMiningOutfit_assertThisInitialized(self);}function QuestL8MountainOreMiningOutfit_assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function QuestL8MountainOreMiningOutfit_isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function QuestL8MountainOreMiningOutfit_getPrototypeOf(o) {QuestL8MountainOreMiningOutfit_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return QuestL8MountainOreMiningOutfit_getPrototypeOf(o);}function QuestL8MountainOreMiningOutfit_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestL8MountainOreMiningOutfit = /*#__PURE__*/function (_QuestL8MountainOre) {QuestL8MountainOreMiningOutfit_inherits(QuestL8MountainOreMiningOutfit, _QuestL8MountainOre);var _super = QuestL8MountainOreMiningOutfit_createSuper(QuestL8MountainOreMiningOutfit);function QuestL8MountainOreMiningOutfit() {var _this;QuestL8MountainOreMiningOutfit_classCallCheck(this, QuestL8MountainOreMiningOutfit);for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}_this = _super.call.apply(_super, [this].concat(args));QuestL8MountainOreMiningOutfit_defineProperty(QuestL8MountainOreMiningOutfit_assertThisInitialized(_this), "mines",
    external_kolmafia_namespaceObject.Location.get("Itznotyerzitz Mine"));return _this;}QuestL8MountainOreMiningOutfit_createClass(QuestL8MountainOreMiningOutfit, [{ key: "getId", value:

    function getId() {
      return "Council / Ice / OreOutfit";
    } }, { key: "status", value:

    function status() {
      var status = this.getStatus();

      if (status < MountainStatus.TRAPPER_DEMANDS) {
        return QuestStatus.NOT_READY;
      }

      if (status > MountainStatus.TRAPPER_DEMANDS) {
        return QuestStatus.COMPLETED;
      }

      if (this.getOreRemaining() <= 0) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.haveOutfit)("Mining Gear")) {
        return QuestStatus.COMPLETED;
      }

      // TODO
      return QuestStatus.COMPLETED;
    } }, { key: "run", value:

    function run() {
      // TODO
      throw new Error("Method not implemented.");
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.mines];
    } }]);return QuestL8MountainOreMiningOutfit;}(QuestL8MountainOre);
;// CONCATENATED MODULE: ./src/quests/council/icepeak/QuestL8MountainOreMining.ts
function QuestL8MountainOreMining_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL8MountainOreMining_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL8MountainOreMining_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL8MountainOreMining_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL8MountainOreMining_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL8MountainOreMining_inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) QuestL8MountainOreMining_setPrototypeOf(subClass, superClass);}function QuestL8MountainOreMining_setPrototypeOf(o, p) {QuestL8MountainOreMining_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return QuestL8MountainOreMining_setPrototypeOf(o, p);}function QuestL8MountainOreMining_createSuper(Derived) {var hasNativeReflectConstruct = QuestL8MountainOreMining_isNativeReflectConstruct();return function _createSuperInternal() {var Super = QuestL8MountainOreMining_getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = QuestL8MountainOreMining_getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return QuestL8MountainOreMining_possibleConstructorReturn(this, result);};}function QuestL8MountainOreMining_possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return QuestL8MountainOreMining_assertThisInitialized(self);}function QuestL8MountainOreMining_assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function QuestL8MountainOreMining_isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function QuestL8MountainOreMining_getPrototypeOf(o) {QuestL8MountainOreMining_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return QuestL8MountainOreMining_getPrototypeOf(o);}function QuestL8MountainOreMining_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestL8MountainOreMining = /*#__PURE__*/function (_QuestL8MountainOre) {QuestL8MountainOreMining_inherits(QuestL8MountainOreMining, _QuestL8MountainOre);var _super = QuestL8MountainOreMining_createSuper(QuestL8MountainOreMining);function QuestL8MountainOreMining() {var _this;QuestL8MountainOreMining_classCallCheck(this, QuestL8MountainOreMining);for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}_this = _super.call.apply(_super, [this].concat(args));QuestL8MountainOreMining_defineProperty(QuestL8MountainOreMining_assertThisInitialized(_this), "mines", void 0);return _this;}QuestL8MountainOreMining_createClass(QuestL8MountainOreMining, [{ key: "getId", value:


    function getId() {
      return "Council / Ice / OreMining";
    } }, { key: "status", value:

    function status() {
      var status = this.getStatus();

      if (status < MountainStatus.TRAPPER_DEMANDS) {
        return QuestStatus.NOT_READY;
      }

      if (status > MountainStatus.TRAPPER_DEMANDS) {
        return QuestStatus.COMPLETED;
      }

      if (this.getOreRemaining() <= 0) {
        return QuestStatus.COMPLETED;
      }

      if (!(0,external_kolmafia_namespaceObject.haveOutfit)("Mining Gear")) {
        return QuestStatus.NOT_READY;
      }

      //TODO
      return QuestStatus.COMPLETED;
    } }, { key: "run", value:

    function run() {
      //TODO
      throw new Error("Method not implemented.");
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestL8MountainOreMining;}(QuestL8MountainOre);
;// CONCATENATED MODULE: ./src/quests/council/QuestL8IcePeak.ts
function QuestL8IcePeak_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL8IcePeak_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL8IcePeak_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL8IcePeak_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL8IcePeak_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL8IcePeak_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
















var QuestL8IcePeak = /*#__PURE__*/function () {


  function QuestL8IcePeak() {QuestL8IcePeak_classCallCheck(this, QuestL8IcePeak);QuestL8IcePeak_defineProperty(this, "children", []);
    this.children.push(new QuestL8MountainGoats());
    this.children.push(new QuestL8MountainOreClover());
    this.children.push(new QuestL8MountainOreMan());
    this.children.push(new QuestL8MountainOreMiningOutfit());
    this.children.push(new QuestL8MountainOreMining());
    this.children.push(new QuestL8MountainNinja());
    this.children.push(new QuestL8MountainBoss());
  }QuestL8IcePeak_createClass(QuestL8IcePeak, [{ key: "getChildren", value:

    function getChildren() {
      return this.children;
    } }, { key: "level", value:

    function level() {
      return 8;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL08Trapper");

      if (status > 0) {
        return QuestStatus.COMPLETED;
      }

      if (status < 0) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "getId", value:

    function getId() {
      return "Council / Ice / Trapper";
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          this.talkTrapper();
        } };

    } }, { key: "getStatus", value:

    function getStatus() {
      return getQuestStatus("questL08Trapper");
    } }, { key: "talkTrapper", value:

    function talkTrapper() {
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=mclargehuge&action=trappercabin");
    } }]);return QuestL8IcePeak;}();


var MountainStatus;(function (MountainStatus) {MountainStatus[MountainStatus["started"] = 0] = "started";MountainStatus[MountainStatus["TRAPPER_DEMANDS"] = 1] = "TRAPPER_DEMANDS";MountainStatus[MountainStatus["GET_OUTFIT"] = 2] = "GET_OUTFIT";MountainStatus[MountainStatus["UNLOCKED_PEAK"] = 3] = "UNLOCKED_PEAK";MountainStatus[MountainStatus["FIGHTING_YETI"] = 4] = "FIGHTING_YETI";MountainStatus[MountainStatus["DEFEATED_BOAR"] = 5] = "DEFEATED_BOAR";MountainStatus[MountainStatus["finished"] = 100] = "finished";})(MountainStatus || (MountainStatus = {}));
;// CONCATENATED MODULE: ./src/quests/council/peaks/QuestL9MurderPeak.ts
function QuestL9MurderPeak_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL9MurderPeak_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL9MurderPeak_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL9MurderPeak_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL9MurderPeak_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL9MurderPeak_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var MurderHandler = /*#__PURE__*/function () {function MurderHandler() {QuestL9MurderPeak_classCallCheck(this, MurderHandler);QuestL9MurderPeak_defineProperty(this, "crude",
    external_kolmafia_namespaceObject.Item.get("Bubblin' Crude"));QuestL9MurderPeak_defineProperty(this, "jar",
    external_kolmafia_namespaceObject.Item.get("Jar of Oil"));QuestL9MurderPeak_defineProperty(this, "rusty",
    external_kolmafia_namespaceObject.Item.get("Rusty Hedge Trimmers"));QuestL9MurderPeak_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get("Twin Peak"));}QuestL9MurderPeak_createClass(MurderHandler, [{ key: "getId", value:

    function getId() {
      return "Council / Peaks / TwinPeak";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }, { key: "level", value:

    function level() {
      return 7;
    } }, { key: "status", value:

    function status() {
      if (getQuestStatus("questL09Topping") < 1) {
        return QuestStatus.NOT_READY;
      }

      if (this.isComplete()) {
        return QuestStatus.COMPLETED;
      }

      if (!hasNonCombatSkillsReady()) {
        return QuestStatus.FASTER_LATER;
      }

      if (this.needsStench() && (0,external_kolmafia_namespaceObject.elementalResistance)(external_kolmafia_namespaceObject.Element.get("Stench")) >= 4) {
        return QuestStatus.READY;
      }

      if (this.needsFood() && (0,external_kolmafia_namespaceObject.haveSkill)(external_kolmafia_namespaceObject.Skill.get("Gravitational Compression"))) {
        return QuestStatus.READY;
      }

      if (this.needsJar()) {
        this.createJar();

        if (this.hasJar()) {
          return QuestStatus.READY;
        }
      }

      if (this.needsInit()) {
        return QuestStatus.READY;
      }

      return QuestStatus.NOT_READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.rusty) == 0) {
        outfit.setNoCombat();
        outfit.setItemDrops();
      }

      if (this.needsInit() && !(0,external_kolmafia_namespaceObject.haveSkill)(external_kolmafia_namespaceObject.Skill.get("Overclocking"))) {
        outfit.addItem(external_kolmafia_namespaceObject.Item.get("Backup Camera")).addBonus("+init");
      }

      if (this.needsFood()) {
        outfit.itemDropWeight = 4;
      }

      this.createJar();

      if (this.needsStench()) {
        outfit.addItem(external_kolmafia_namespaceObject.Item.get("Unwrapped knock-off retro superhero cape"));
        outfit.addBonus("+2 stench res");
      }

      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          var props = new PropertyManager();
          //cliExecute("retrocape vampire hold");
          (0,external_kolmafia_namespaceObject.cliExecute)("backupcamera init");

          try {
            if (this.needsInit() && (0,external_kolmafia_namespaceObject.numericModifier)("initiative") >= 40) {
              props.setChoice(606, 4);
            } else if (this.needsFood() && (0,external_kolmafia_namespaceObject.itemDropModifier)() >= 50) {
              props.setChoice(606, 2);
            } else if (
            this.needsStench() &&
            (0,external_kolmafia_namespaceObject.elementalResistance)(external_kolmafia_namespaceObject.Element.get("Stench")) >= 4)
            {
              props.setChoice(606, 1);
            } else if (this.needsJar() && this.hasJar()) {
              props.setChoice(606, 3);
            } else {
              throw "Eh??";
            }

            if ((0,external_kolmafia_namespaceObject.availableAmount)(this.rusty) > 0) {
              (0,external_kolmafia_namespaceObject.use)(this.rusty);
            } else {
              var settings = new AdventureSettings();

              settings.addNoBanish(external_kolmafia_namespaceObject.Monster.get("bearpig topiary animal"));
              settings.addNoBanish(
              external_kolmafia_namespaceObject.Monster.get("elephant (meatcar?) topiary animal"));

              settings.addNoBanish(external_kolmafia_namespaceObject.Monster.get("spider (duck?) topiary animal"));

              greyAdv(this.loc, outfit);
            }
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "isComplete", value:

    function isComplete() {
      return this.getMurderStatus() >= 15;
    } }, { key: "hasJar", value:

    function hasJar() {
      return (0,external_kolmafia_namespaceObject.availableAmount)(this.jar) > 0;
    } }, { key: "createJar", value:

    function createJar() {
      if (this.hasJar() || !this.needsJar() || (0,external_kolmafia_namespaceObject.availableAmount)(this.crude) < 12) {
        return;
      }

      (0,external_kolmafia_namespaceObject.create)(this.jar);
    } }, { key: "getMurderStatus", value:

    function getMurderStatus() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("twinPeakProgress"));
    } }, { key: "needsStench", value:

    function needsStench() {
      return (this.getMurderStatus() & 1) == 0;
    } }, { key: "needsFood", value:

    function needsFood() {
      return (this.getMurderStatus() & 2) == 0;
    } }, { key: "needsJar", value:

    function needsJar() {
      return (this.getMurderStatus() & 4) == 0;
    } }, { key: "needsInit", value:

    function needsInit() {
      return this.getMurderStatus() == 7;
    } }]);return MurderHandler;}();
;// CONCATENATED MODULE: ./src/quests/council/peaks/QuestSmutOrcsCargoShorts.ts
function QuestSmutOrcsCargoShorts_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestSmutOrcsCargoShorts_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestSmutOrcsCargoShorts_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestSmutOrcsCargoShorts_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestSmutOrcsCargoShorts_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestSmutOrcsCargoShorts_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var QuestCargoShorts = /*#__PURE__*/function () {function QuestCargoShorts() {QuestSmutOrcsCargoShorts_classCallCheck(this, QuestCargoShorts);QuestSmutOrcsCargoShorts_defineProperty(this, "shorts",
    external_kolmafia_namespaceObject.Item.get("Cargo Cultist Shorts"));}QuestSmutOrcsCargoShorts_createClass(QuestCargoShorts, [{ key: "getId", value:

    function getId() {
      return "Council / Peaks / CargoShortsSmut";
    } }, { key: "level", value:

    function level() {
      return 8;
    } }, { key: "status", value:

    function status() {
      if (
      (0,external_kolmafia_namespaceObject.getProperty)("_cargoPocketEmptied") == "true" ||
      (0,external_kolmafia_namespaceObject.availableAmount)(this.shorts) == 0)
      {
        return QuestStatus.COMPLETED;
      }

      var status = getQuestStatus("questL09Topping");

      if (status > 0) {
        return QuestStatus.COMPLETED;
      }

      if (status < 0 || (0,external_kolmafia_namespaceObject.myAdventures)() < 40) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.familiarWeight)(external_kolmafia_namespaceObject.Familiar.get("Grey Goose")) < 6) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        familiar: external_kolmafia_namespaceObject.Familiar.get("Grey Goose"),
        disableFamOverride: true,
        run: () => {
          (0,external_kolmafia_namespaceObject.visitUrl)("inventory.php?action=pocket");
          (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?whichchoice=1420&option=1&pocket=666&pwd=");

          var macro = Macro.skill(
          external_kolmafia_namespaceObject.Skill.get("Emit Matter Duplicating Drones")).
          step(greyKillingBlow(new GreyOutfit()));
          (0,external_kolmafia_namespaceObject.print)("Macro: " + macro.toString());
          macro.submit();
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "mustBeDone", value:

    function mustBeDone() {
      if ((0,external_kolmafia_namespaceObject.familiarWeight)(external_kolmafia_namespaceObject.Familiar.get("Grey Goose")) >= 6) {
        return true;
      }

      return false;
    } }, { key: "getResourceClaims", value:

    function getResourceClaims() {
      return [
      new ResourceClaim(ResourceType.CARGO_SHORTS, 1, "Smut Orc Pervert", 4)];

    } }]);return QuestCargoShorts;}();
;// CONCATENATED MODULE: ./src/quests/council/peaks/QuestL9SmutOrcs.ts
function QuestL9SmutOrcs_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestL9SmutOrcs_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestL9SmutOrcs_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestL9SmutOrcs_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestL9SmutOrcs_arrayLikeToArray(o, minLen);}function QuestL9SmutOrcs_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestL9SmutOrcs_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL9SmutOrcs_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL9SmutOrcs_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL9SmutOrcs_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL9SmutOrcs_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL9SmutOrcs_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








var SmutOrcs = /*#__PURE__*/function () {function SmutOrcs() {QuestL9SmutOrcs_classCallCheck(this, SmutOrcs);QuestL9SmutOrcs_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get("The Smut Orc Logging Camp"));QuestL9SmutOrcs_defineProperty(this, "shorts",
    new QuestCargoShorts());}QuestL9SmutOrcs_createClass(SmutOrcs, [{ key: "level", value:

    function level() {
      return 7;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL09Topping");

      if (status < 0 || !(0,external_kolmafia_namespaceObject.haveSkill)(external_kolmafia_namespaceObject.Skill.get("Grey Noise")) || (0,external_kolmafia_namespaceObject.myMp)() < 15) {
        return QuestStatus.NOT_READY;
      }

      if (status > 0) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("questL11Shen") != "finished") {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "getId", value:

    function getId() {
      return "Council / Peaks / Orcs";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }, { key: "getFastenersHave", value:

    function getFastenersHave() {
      return ["Thick Caulk", "Long Hard Screw", "Messy Butt Joint"].reduce(
      (s, v) => s + (0,external_kolmafia_namespaceObject.itemAmount)(external_kolmafia_namespaceObject.Item.get(v)),
      0);

    } }, { key: "getLumberHave", value:

    function getLumberHave() {
      return [
      "Morningwood Plank",
      "Raging Hardwood Plank",
      "Weirdwood Plank"].
      reduce((s, v) => s + (0,external_kolmafia_namespaceObject.itemAmount)(external_kolmafia_namespaceObject.Item.get(v)), 0);
    } }, { key: "getChasmBuilt", value:

    function getChasmBuilt() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("chasmBridgeProgress"));
    } }, { key: "getChasmRemaining", value:

    function getChasmRemaining() {
      var remaining = 30 - this.getChasmBuilt();

      return remaining - Math.min(this.getFastenersHave(), this.getLumberHave());
    } }, { key: "run", value:

    function run() {
      if (this.isNCTime()) {
        return this.tryNC();
      }

      return this.tryCombat();
    } }, { key: "tryCombat", value:

    function tryCombat() {
      // max -ml, max cold dmg, raise item drop finally
      var outfit = new GreyOutfit();
      outfit.minusMonsterLevelWeight = 3;
      outfit.setItemDrops();
      outfit.addBonus("+5 cold dmg");

      if (
      this.getLumberHave() <= this.getFastenersHave() &&
      this.getChasmRemaining() > this.getLumberHave())
      {
        var quest = this.tryHatchet();

        if (quest != null) {
          return quest;
        }

        if ((0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Logging Hatchet")) > 0) {
          outfit.addItem(external_kolmafia_namespaceObject.Item.get("Logging Hatchet"));
        }
      }

      if (
      this.getLumberHave() >= this.getFastenersHave() &&
      this.getChasmRemaining() > this.getFastenersHave())
      {
        if ((0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Loadstone")) > 0) {
          outfit.addItem(external_kolmafia_namespaceObject.Item.get("Loadstone"));
        }
      }

      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          var attack;

          if (
          (0,external_kolmafia_namespaceObject.numericModifier)("Cold Damage") > (0,external_kolmafia_namespaceObject.numericModifier)("Cold Spell Damage"))
          {
            attack = Macro.attack();
          } else {
            attack = Macro.skill("Grey Noise");
          }

          greyAdv(
          this.loc,
          outfit,
          new AdventureSettings().setFinishingBlowMacro(attack.repeat()));

          this.tryBuild();
        } };

    } }, { key: "tryNC", value:

    function tryNC() {
      return {
        location: null,
        run: () => {
          var props = new PropertyManager();
          var best = this.doBestBlechOutfit();
          (0,external_kolmafia_namespaceObject.maximize)(best[1], false);

          try {
            props.setChoice(1345, best[0]);
            greyAdv(this.loc);
            this.tryBuild();
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "isNCTime", value:

    function isNCTime() {
      var progress = (0,external_kolmafia_namespaceObject.getProperty)("smutOrcNoncombatProgress");

      if (progress == "") {
        return false;
      }

      return (0,external_kolmafia_namespaceObject.toInt)(progress) >= 15;
    } }, { key: "tryBuild", value:

    function tryBuild() {
      var box = external_kolmafia_namespaceObject.Item.get("Smut Orc Keepsake Box");

      if ((0,external_kolmafia_namespaceObject.itemAmount)(box) > 0) {
        (0,external_kolmafia_namespaceObject.use)(box, (0,external_kolmafia_namespaceObject.itemAmount)(box));
      }

      (0,external_kolmafia_namespaceObject.visitUrl)(
      "place.php?whichplace=orc_chasm&action=bridge" +
      (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("chasmBridgeProgress")));

    } }, { key: "tryHatchet", value:

    function tryHatchet() {
      if (!(0,external_kolmafia_namespaceObject.canadiaAvailable)()) {
        return;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Logging Hatchet")) > 0) {
        return;
      }

      var loc = external_kolmafia_namespaceObject.Location.get("Camp Logging Camp");

      if (
      loc.turnsSpent > 0 ||
      loc.combatQueue != "" ||
      loc.noncombatQueue != "")
      {
        return;
      }

      return {
        location: null,
        run: () => {
          greyAdv(loc);
        } };

    }

    // getChildren(): QuestInfo[] {
    //   return [this.shorts];
    // }
  }, { key: "simMax", value:
    function simMax(ma) {
      var sim = (0,external_kolmafia_namespaceObject.maximize)(ma, 0, 0, true, true);
      var score = 0;var _iterator = QuestL9SmutOrcs_createForOfIteratorHelper(

      sim),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var e = _step.value;
          score += e.score;
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

      return score;
    } }, { key: "doBestBlechOutfit", value:

    function doBestBlechOutfit() {
      // Stolen from autoscend
      // floor(sqrt((mus+flat_weapon_damage)/15*(1+percent_weapon_damage/100)))
      var mustry = "100muscle,100weapon damage,1000weapon damage percent";
      var mystry = "100mysticality,100spell damage,1000 spell damage percent";
      var moxtry = "100moxie,1000sleaze resistance";

      this.simMax(mustry);
      var musmus = (0,external_kolmafia_namespaceObject.numericModifier)("Generated:_spec", "Buffed Muscle");
      var musflat = (0,external_kolmafia_namespaceObject.numericModifier)("Generated:_spec", "Weapon Damage");
      var musperc = (0,external_kolmafia_namespaceObject.numericModifier)("Generated:_spec", "Weapon Damage Percent");
      var muscleScore = Math.floor(
      Math.sqrt((musmus + musflat) / 15 * (1 + musperc / 100)));


      this.simMax(mystry);
      var mysmys = (0,external_kolmafia_namespaceObject.numericModifier)("Generated:_spec", "Buffed Mysticality");
      var mysflat = (0,external_kolmafia_namespaceObject.numericModifier)("Generated:_spec", "Spell Damage");
      var mysperc = (0,external_kolmafia_namespaceObject.numericModifier)("Generated:_spec", "Spell Damage Percent");
      var mystScore = Math.floor(
      Math.sqrt((mysmys + mysflat) / 15 * (1 + mysperc / 100)));


      this.simMax(moxtry);
      var moxmox = (0,external_kolmafia_namespaceObject.numericModifier)("Generated:_spec", "Buffed Moxie");
      var moxres = (0,external_kolmafia_namespaceObject.numericModifier)("Generated:_spec", "Sleaze Resistance");
      var moxScore = Math.floor(Math.sqrt(moxmox / 30 * (1 + moxres * 0.69)));

      (0,external_kolmafia_namespaceObject.print)("Mus Score: " + muscleScore, "blue");
      (0,external_kolmafia_namespaceObject.print)("Myst Score: " + mystScore, "blue");
      (0,external_kolmafia_namespaceObject.print)("Moxie Score: " + moxScore, "blue");

      if (muscleScore >= moxScore && muscleScore >= mystScore) {
        return [1, mustry];
      }

      if (mystScore >= muscleScore && mystScore >= moxScore) {
        return [2, mystry];
      }

      return [3, moxtry];
    } }]);return SmutOrcs;}();
;// CONCATENATED MODULE: ./src/quests/council/peaks/QuestL9AbooPeak.ts
function QuestL9AbooPeak_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL9AbooPeak_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL9AbooPeak_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL9AbooPeak_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL9AbooPeak_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL9AbooPeak_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








var ABooHandler = /*#__PURE__*/function () {function ABooHandler() {QuestL9AbooPeak_classCallCheck(this, ABooHandler);QuestL9AbooPeak_defineProperty(this, "clue",
    external_kolmafia_namespaceObject.Item.get("A-Boo Clue"));QuestL9AbooPeak_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get("A-Boo Peak"));QuestL9AbooPeak_defineProperty(this, "damageLevels",
    [13, 25, 50, 125, 250]);QuestL9AbooPeak_defineProperty(this, "canOfPaint",
    external_kolmafia_namespaceObject.Item.get("Can of black paint"));}QuestL9AbooPeak_createClass(ABooHandler, [{ key: "level", value:

    function level() {
      return 9;
    } }, { key: "getId", value:

    function getId() {
      return "Council / Peaks / AbooPeak";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }, { key: "run", value:

    function run() {
      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.clue) > 0) {
        return this.runClue();
      }

      return this.runCombat();
    } }, { key: "runClue", value:

    function runClue() {
      var outfit = this.createOutfit();

      return {
        location: null,
        outfit: outfit,
        run: () => {
          var props = new PropertyManager();

          if ((0,external_kolmafia_namespaceObject.haveEffect)((0,external_kolmafia_namespaceObject.effectModifier)(this.canOfPaint, "Effect")) == 0) {
            (0,external_kolmafia_namespaceObject.cliExecute)("acquire 1 " + this.canOfPaint.name);
            (0,external_kolmafia_namespaceObject.use)(this.canOfPaint);
          }

          try {
            props.setChoice(611, 1);
            (0,external_kolmafia_namespaceObject.use)(this.clue);

            var settings = new AdventureSettings();
            var turn = 0;

            settings.setChoices({
              callOutOfScopeChoiceBehavior: (choice) => {
                return false;
              },

              handleChoice: (choice) => {
                var dmgTaken = this.damageTaken(turn++);

                if (dmgTaken >= (0,external_kolmafia_namespaceObject.myHp)() || this.getProgress() <= 0) {
                  return 2;
                }

                (0,external_kolmafia_namespaceObject.print)("Prediction a-boo damage of " + dmgTaken);

                return 1;
              } });


            greyAdv(this.loc, null, settings);
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "damageTaken", value:

    function damageTaken(turn) {
      var dmg = this.damageLevels[turn];

      var sDmg = this.damageTakenByElement(dmg, external_kolmafia_namespaceObject.Element.get("Spooky"));
      var cDmg = this.damageTakenByElement(dmg, external_kolmafia_namespaceObject.Element.get("Cold"));

      return sDmg + cDmg;
    } }, { key: "turnsSurvived", value:

    function turnsSurvived() {
      var totalDamage = 2;
      var reducedBy = 0;

      for (var i = 0; i < this.damageLevels.length; i++) {
        if (this.getProgress() <= reducedBy) {
          return i;
        }

        totalDamage += this.damageTaken(i);

        if (totalDamage >= (0,external_kolmafia_namespaceObject.myHp)()) {
          return i;
        }

        reducedBy += (i + 1) * 2;
      }

      return 5;
    } }, { key: "wouldSurviveClue", value:

    function wouldSurviveClue() {
      var damageLevels = [13, 25, 50, 125, 250];
      var totalDamage = 2;
      var reducedBy = 0;

      for (var i = 0; i < damageLevels.length; i++) {
        if (this.getProgress() <= reducedBy) {
          return true;
        }

        var dmg = damageLevels[i];

        var sDmg = this.damageTakenByElement(dmg, external_kolmafia_namespaceObject.Element.get("Spooky"));
        var cDmg = this.damageTakenByElement(dmg, external_kolmafia_namespaceObject.Element.get("Cold"));

        totalDamage += cDmg + sDmg;

        if (totalDamage >= (0,external_kolmafia_namespaceObject.myHp)()) {
          return false;
        }

        reducedBy += (i + 1) * 2;
      }

      return true;
    } }, { key: "damageTakenByElement", value:

    function damageTakenByElement(base_damage, element) {
      if (base_damage < 0) {
        return 1;
      }

      var resist = (0,external_kolmafia_namespaceObject.elementalResistance)(element) / 100.0;

      var effective_base_damage = Math.max(30, base_damage);

      var damage = Math.max(
      1,
      Math.ceil(base_damage - effective_base_damage * resist));


      return damage;
    } }, { key: "createOutfit", value:

    function createOutfit() {
      var outfit = new GreyOutfit().addBonus("+40 cold res +40 spooky res");
      outfit.hpWeight = 2;

      return outfit;
    } }, { key: "runCombat", value:

    function runCombat() {
      var outfit = this.createOutfit();

      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          greyAdv(this.loc, outfit);
        } };

    } }, { key: "mustBeDone", value:

    function mustBeDone() {
      return this.canUseClue();
    } }, { key: "status", value:

    function status() {
      if (getQuestStatus("questL09Topping") < 1) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("booPeakLit") == "true") {
        return QuestStatus.COMPLETED;
      }

      if (this.getProgress() <= 0) {
        return QuestStatus.READY;
      }

      if (this.canUseClue()) {
        return QuestStatus.READY;
      }

      if ((0,external_kolmafia_namespaceObject.myLevel)() >= 20) {
        return QuestStatus.READY;
      }

      // We always want to do this as late as we can
      return QuestStatus.FASTER_LATER;
    } }, { key: "canUseClue", value:

    function canUseClue() {
      return this.getProgress() > 0 && (0,external_kolmafia_namespaceObject.availableAmount)(this.clue) > 0;
    } }, { key: "getProgress", value:

    function getProgress() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("booPeakProgress"));
    } }]);return ABooHandler;}();
;// CONCATENATED MODULE: ./src/quests/council/peaks/QuestL9OilPeak.ts
function QuestL9OilPeak_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL9OilPeak_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL9OilPeak_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL9OilPeak_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL9OilPeak_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL9OilPeak_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var OilHandler = /*#__PURE__*/function () {function OilHandler() {QuestL9OilPeak_classCallCheck(this, OilHandler);QuestL9OilPeak_defineProperty(this, "loc",
    external_kolmafia_namespaceObject.Location.get("Oil Peak"));QuestL9OilPeak_defineProperty(this, "crude",
    external_kolmafia_namespaceObject.Item.get("Bubblin' Crude"));}QuestL9OilPeak_createClass(OilHandler, [{ key: "getId", value:

    function getId() {
      return "Council / Peaks / OilPeak";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.loc];
    } }, { key: "needsJar", value:

    function needsJar() {
      return (
        ((0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("twinPeakProgress")) & 4) == 0 &&
        (0,external_kolmafia_namespaceObject.availableAmount)(this.crude) < 12 &&
        (0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Jar of Oil")) == 0);

    } }, { key: "level", value:

    function level() {
      return 9;
    } }, { key: "status", value:

    function status() {
      if (
      !this.needsJar() &&
      this.getStatus() <= 0 &&
      (0,external_kolmafia_namespaceObject.getProperty)("oilPeakLit") == "true")
      {
        return QuestStatus.COMPLETED;
      }

      if (getQuestStatus("questL09Topping") < 1) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.myHp)() < 140) {
        return QuestStatus.NOT_READY;
      }

      if (this.needsAbsorb()) {
        if ((0,external_kolmafia_namespaceObject.familiarWeight)(external_kolmafia_namespaceObject.Familiar.get("Grey Goose")) < 6) {
          var effects = Object.keys((0,external_kolmafia_namespaceObject.myEffects)()).
          map((e) => external_kolmafia_namespaceObject.Effect.get(e)).
          reduce((p, e) => (0,external_kolmafia_namespaceObject.numericModifier)(e, "Monster Level") + p, 0);

          if (effects != 0) {
            return QuestStatus.NOT_READY;
          }
        }
      }

      return QuestStatus.READY;
    } }, { key: "needsAbsorb", value:

    function needsAbsorb() {
      return !AbsorbsProvider.getReabsorbedMonsters().includes(
      external_kolmafia_namespaceObject.Monster.get("Oil Baron"));

    } }, { key: "isReady", value:

    function isReady() {
      return this.needsJar() || this.getStatus() > 0;
    } }, { key: "getStatus", value:

    function getStatus() {
      return (0,external_kolmafia_namespaceObject.toFloat)((0,external_kolmafia_namespaceObject.getProperty)("oilPeakProgress"));
    } }, { key: "doAbsorb", value:

    function doAbsorb() {
      return {
        location: this.loc,
        run: () => {
          this.doMonsterLevel();
          greyAdv(this.loc);
        } };

    } }, { key: "doMonsterLevel", value:

    function doMonsterLevel() {
      var level = (0,external_kolmafia_namespaceObject.numericModifier)("Monster Level");

      if (level >= 100) {
        throw "Need to lower your monster level, TODO!";
      }

      if (level <= 50) {
        (0,external_kolmafia_namespaceObject.cliExecute)("backupcamera ml");

        var item = external_kolmafia_namespaceObject.Item.get("Backup Camera");

        if ((0,external_kolmafia_namespaceObject.equippedAmount)(item) == 0) {
          (0,external_kolmafia_namespaceObject.equip)(external_kolmafia_namespaceObject.Slot.get("Acc3"), item);
        }

        if ((0,external_kolmafia_namespaceObject.numericModifier)("Monster Level") <= 50) {
          throw "Need to raise your monster level, TODO!";
        }
      }
    } }, { key: "run", value:

    function run() {
      if (this.needsAbsorb()) {
        return this.doAbsorb();
      }

      var outfit = new GreyOutfit().setItemDrops();
      outfit.plusMonsterLevelWeight = 2;
      //    outfit.addItem(Item.get("Unbreakable Umbrella"));
      outfit.addBonus("-offhand");

      return {
        location: this.loc,
        outfit: outfit,
        run: () => {
          (0,external_kolmafia_namespaceObject.changeMcd)(10);
          setUmbrella(UmbrellaState.MONSTER_LEVEL);
          (0,external_kolmafia_namespaceObject.equip)(external_kolmafia_namespaceObject.Item.get("Unbreakable Umbrella"));
          greyAdv(this.loc, outfit);
          (0,external_kolmafia_namespaceObject.changeMcd)(0);
        } };

    } }]);return OilHandler;}();
;// CONCATENATED MODULE: ./src/quests/council/QuestL9OrcsAndPeaks.ts
function QuestL9OrcsAndPeaks_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestL9OrcsAndPeaks_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestL9OrcsAndPeaks_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestL9OrcsAndPeaks_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestL9OrcsAndPeaks_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestL9OrcsAndPeaks_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}









var QuestL9Smut = /*#__PURE__*/function () {function QuestL9Smut() {QuestL9OrcsAndPeaks_classCallCheck(this, QuestL9Smut);QuestL9OrcsAndPeaks_defineProperty(this, "peaks",
    [
    new SmutOrcs(),
    new ABooHandler(),
    new MurderHandler(),
    new OilHandler()]);}QuestL9OrcsAndPeaks_createClass(QuestL9Smut, [{ key: "level", value:


    function level() {
      return 9;
    } }, { key: "getChildren", value:

    function getChildren() {
      return this.peaks;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "status", value:

    function status() {
      var status = this.getStatus();

      if (status == PeakStatus.finished) {
        return QuestStatus.COMPLETED;
      }

      if (
      status == PeakStatus.step1 ||
      status == PeakStatus.step3 ||
      (0,external_kolmafia_namespaceObject.getProperty)("booPeakLit") == "true" &&
      (0,external_kolmafia_namespaceObject.getProperty)("oilPeakLit") == "true" &&
      (0,external_kolmafia_namespaceObject.getProperty)("twinPeakProgress") == "15")
      {
        return QuestStatus.READY;
      }

      return QuestStatus.NOT_READY;
    } }, { key: "mustBeDone", value:

    function mustBeDone() {
      return true;
    } }, { key: "getStatus", value:

    function getStatus() {
      return PeakStatus[(0,external_kolmafia_namespaceObject.getProperty)("questL09Topping")];
    } }, { key: "getId", value:

    function getId() {
      return "Council / Peaks / Lord";
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        outfit: new GreyOutfit("-tie"),
        run: () => {
          this.visitMiLord();
          (0,external_kolmafia_namespaceObject.council)();
        } };

    } }, { key: "visitMiLord", value:

    function visitMiLord() {
      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=highlands&action=highlands_dude");
    } }]);return QuestL9Smut;}();var


PeakStatus;(function (PeakStatus) {PeakStatus["unstarted"] = "unstarted";PeakStatus["started"] = "CHASM";PeakStatus["step1"] = "INTRODUCE_PEAKS";PeakStatus["step2"] = "BURN_MY_PEAKS";PeakStatus["step3"] = "BURNED_PEAKS_DOWN";PeakStatus["finished"] = "finished";})(PeakStatus || (PeakStatus = {}));
;// CONCATENATED MODULE: ./src/quests/council/QuestCouncil.ts
function QuestCouncil_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestCouncil_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestCouncil_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestCouncil_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestCouncil_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestCouncil_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






























var QuestCouncil = /*#__PURE__*/function () {


  function QuestCouncil() {QuestCouncil_classCallCheck(this, QuestCouncil);QuestCouncil_defineProperty(this, "quests", []);
    this.quests.push(new QuestL1Toot());
    this.quests.push(new QuestL2SpookyLarva());
    this.quests.push(new QuestL3Tavern());
    this.quests.push(new QuestL4Bats());
    this.quests.push(new QuestL5Goblin());
    this.quests.push(new QuestL6Friar());
    this.quests.push(new QuestL7Crypt());
    this.quests.push(new QuestL8IcePeak());
    this.quests.push(new QuestL9Smut());
    this.quests.push(new QuestL10Beanstalk());
    this.quests.push(new QuestL11MacGruffin());
    this.quests.push(new QuestL12War());
    this.quests.push(new QuestL13());
  }QuestCouncil_createClass(QuestCouncil, [{ key: "getId", value:

    function getId() {
      return "Quests / Council";
    } }, { key: "level", value:

    function level() {
      return -1;
    } }, { key: "status", value:

    function status() {
      return QuestStatus.COMPLETED;
    } }, { key: "run", value:

    function run() {
      throw "Not implemented";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "getChildren", value:

    function getChildren() {
      return this.quests;
    } }]);return QuestCouncil;}();
;// CONCATENATED MODULE: ./src/quests/council/manor/QuestManorBathroom.ts
function QuestManorBathroom_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestManorBathroom_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestManorBathroom_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestManorBathroom_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestManorBathroom_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestManorBathroom_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}









var ManorBathroom = /*#__PURE__*/function () {function ManorBathroom() {QuestManorBathroom_classCallCheck(this, ManorBathroom);QuestManorBathroom_defineProperty(this, "location",
    external_kolmafia_namespaceObject.Location.get("The Haunted Bathroom"));QuestManorBathroom_defineProperty(this, "item",
    external_kolmafia_namespaceObject.Item.get("Lady Spookyraven's powder puff"));QuestManorBathroom_defineProperty(this, "toAbsorb", void 0);}QuestManorBathroom_createClass(ManorBathroom, [{ key: "level", value:


    function level() {
      return 5;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questM21Dance");

      if (status < 1) {
        return QuestStatus.NOT_READY;
      }

      if (status > 1 || (0,external_kolmafia_namespaceObject.availableAmount)(this.item) > 0) {
        return QuestStatus.COMPLETED;
      }

      if (!hasNonCombatSkillsReady()) {
        return QuestStatus.FASTER_LATER;
      }

      if (this.hasDelay()) {
        if (DelayBurners.isDelayBurnerReady()) {
          return QuestStatus.READY;
        }

        if (DelayBurners.isDelayBurnerFeasible()) {
          return QuestStatus.FASTER_LATER;
        }
      }

      return QuestStatus.READY;
    } }, { key: "hasDelay", value:

    function hasDelay() {
      return this.location.turnsSpent < 5 && this.toAbsorb.length == 0;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();

      if (!this.hasDelay()) {
        outfit.setNoCombat();
      }

      return {
        location: this.location,
        outfit: outfit,
        run: () => {
          var props = new PropertyManager();
          props.setChoice(882, 1);

          if (this.hasDelay()) {
            var delay = DelayBurners.getReadyDelayBurner();

            if (delay != null) {
              delay.doFightSetup();
            }
          } else if (this.toAbsorb.length == 0) {
            DelayBurners.tryReplaceCombats();
          }

          try {
            greyAdv(this.location, outfit);
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Manor / Bathroom";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.location];
    } }]);return ManorBathroom;}();
;// CONCATENATED MODULE: ./src/quests/council/manor/QuestManorBedroom.ts
function QuestManorBedroom_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestManorBedroom_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestManorBedroom_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestManorBedroom_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestManorBedroom_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestManorBedroom_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}












var ManorBedroom = /*#__PURE__*/function () {function ManorBedroom() {QuestManorBedroom_classCallCheck(this, ManorBedroom);QuestManorBedroom_defineProperty(this, "location",
    external_kolmafia_namespaceObject.Location.get("The Haunted Bedroom"));QuestManorBedroom_defineProperty(this, "item",
    external_kolmafia_namespaceObject.Item.get("Lady Spookyraven's finest gown"));QuestManorBedroom_defineProperty(this, "spectacles",
    external_kolmafia_namespaceObject.Item.get("Lord Spookyraven's spectacles"));QuestManorBedroom_defineProperty(this, "disposableCamera",
    external_kolmafia_namespaceObject.Item.get("disposable instant camera"));QuestManorBedroom_defineProperty(this, "dontLike",
    [
    "Animated Mahogany Nightstand",
    "Animated Rustic Nightstand",
    "Wardrob nightstand"].
    map((m) => external_kolmafia_namespaceObject.Monster.get(m)));QuestManorBedroom_defineProperty(this, "toAbsorb", void 0);}QuestManorBedroom_createClass(ManorBedroom, [{ key: "needCamera", value:


    function needCamera() {
      return (
        (0,external_kolmafia_namespaceObject.availableAmount)(this.disposableCamera) == 0 &&
        (0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("photograph of a dog")) == 0 &&
        getQuestStatus("questL11Palindome") <= 1);

    } }, { key: "needGlasses", value:

    function needGlasses() {
      return (0,external_kolmafia_namespaceObject.availableAmount)(this.spectacles) == 0;
    } }, { key: "level", value:

    function level() {
      return 5;
    } }, { key: "needDress", value:

    function needDress() {
      return (
        getQuestStatus("questM21Dance") <= 2 && (0,external_kolmafia_namespaceObject.availableAmount)(this.item) == 0);

    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questM21Dance");

      if (status < 1) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.spectacles) > 0 && !this.needCamera()) {
        if (status > 1 || (0,external_kolmafia_namespaceObject.availableAmount)(this.item) > 0) {
          return QuestStatus.COMPLETED;
        }
      }

      if (this.hasDelay()) {
        if (DelayBurners.isDelayBurnerReady()) {
          return QuestStatus.READY;
        }

        if (DelayBurners.isDelayBurnerFeasible()) {
          return QuestStatus.FASTER_LATER;
        }
      }

      return QuestStatus.READY;
    } }, { key: "hasDelay", value:

    function hasDelay() {
      return (
        this.toAbsorb.length == 0 &&
        this.location.turnsSpent < 5 &&
        !this.needCamera() &&
        !this.needGlasses() &&
        this.needDress());

    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();

      return {
        location: this.location,
        outfit: outfit,
        run: () => {
          var props = new PropertyManager();

          try {
            props.setChoice(876, 1);
            props.setChoice(877, 1);
            props.setChoice(879, 5);
            props.setChoice(876, 1);
            props.setChoice(879, 2);

            if (this.needDress()) {
              props.setChoice(880, 1);
            } else {
              props.setChoice(880, 2);
            }

            if ((0,external_kolmafia_namespaceObject.availableAmount)(this.spectacles) == 0) {
              props.setChoice(878, 3);
            } else if (this.needCamera()) {
              props.setChoice(878, 4);
            } else {
              props.setChoice(878, 1);
            }

            var settings = new AdventureSettings();

            this.dontLike.forEach((m) => settings.addBanish(m));

            if (this.hasDelay()) {
              var delay = DelayBurners.getReadyDelayBurner();

              if (delay != null) {
                delay.doFightSetup();
              }
            }

            try {
              greyAdv(this.location, outfit, settings);
            } catch (_unused) {}

            (0,external_kolmafia_namespaceObject.visitUrl)("choice.php");

            if ((0,external_kolmafia_namespaceObject.handlingChoice)()) {
              greyAdv(this.location, outfit, settings);
            }
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Manor / Bedroom";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.location];
    } }]);return ManorBedroom;}();
;// CONCATENATED MODULE: ./src/quests/council/manor/QuestManorBillards.ts
function QuestManorBillards_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestManorBillards_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestManorBillards_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestManorBillards_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestManorBillards_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestManorBillards_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var QuestManorBillards = /*#__PURE__*/function () {function QuestManorBillards() {QuestManorBillards_classCallCheck(this, QuestManorBillards);QuestManorBillards_defineProperty(this, "billards",
    external_kolmafia_namespaceObject.Location.get("The Haunted Billiards Room"));QuestManorBillards_defineProperty(this, "chalk",
    external_kolmafia_namespaceObject.Item.get("Handful of hand chalk"));QuestManorBillards_defineProperty(this, "chalkEffect",
    external_kolmafia_namespaceObject.Effect.get("Chalky Hand"));QuestManorBillards_defineProperty(this, "invis",
    external_kolmafia_namespaceObject.Effect.get("Invisible Avatar"));QuestManorBillards_defineProperty(this, "invisSkill",
    external_kolmafia_namespaceObject.Skill.get("CHEAT CODE: Invisible Avatar"));QuestManorBillards_defineProperty(this, "key",
    external_kolmafia_namespaceObject.Item.get("[7302]Spookyraven library key"));QuestManorBillards_defineProperty(this, "cue",
    external_kolmafia_namespaceObject.Item.get("pool cue"));}QuestManorBillards_createClass(QuestManorBillards, [{ key: "getId", value:

    function getId() {
      return "Manor / Billards";
    } }, { key: "level", value:

    function level() {
      return 8;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questM20Necklace");

      if (status < 1) {
        return QuestStatus.NOT_READY;
      }

      if (status > 2 || (0,external_kolmafia_namespaceObject.availableAmount)(this.key) > 0) {
        return QuestStatus.COMPLETED;
      }

      if (!hasNonCombatSkillsReady()) {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();

      if (
      (0,external_kolmafia_namespaceObject.availableAmount)(this.cue) > 0 && (
      (0,external_kolmafia_namespaceObject.haveEffect)(this.chalkEffect) > 0 || (0,external_kolmafia_namespaceObject.availableAmount)(this.chalk) > 0))
      {
        outfit.setNoCombat();
      }

      outfit.addItem(external_kolmafia_namespaceObject.Item.get("Staff of Fats"));
      outfit.addItem(this.cue);

      return {
        outfit: outfit,
        location: this.billards,
        run: () => {
          if (
          (0,external_kolmafia_namespaceObject.availableAmount)(this.cue) > 0 &&
          (0,external_kolmafia_namespaceObject.haveEffect)(this.chalkEffect) == 0 &&
          (0,external_kolmafia_namespaceObject.availableAmount)(this.chalk) > 0)
          {
            (0,external_kolmafia_namespaceObject.use)(this.chalk);
          }

          if ((0,external_kolmafia_namespaceObject.haveEffect)(this.invis) == 0) {
            //  useSkill(this.invisSkill);
          }

          var props = new PropertyManager();
          var poolSkill =
          (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("poolSkill")) + (0,external_kolmafia_namespaceObject.numericModifier)("pool skill") + 10;

          try {
            props.setChoice(875, poolSkill >= 14 ? 1 : 2); //Fight or train
            greyAdv(this.billards, outfit);
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.billards];
    } }]);return QuestManorBillards;}();
;// CONCATENATED MODULE: ./src/quests/council/manor/QuestManorGallery.ts
function QuestManorGallery_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestManorGallery_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestManorGallery_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestManorGallery_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestManorGallery_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestManorGallery_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}









var ManorGallery = /*#__PURE__*/function () {function ManorGallery() {QuestManorGallery_classCallCheck(this, ManorGallery);QuestManorGallery_defineProperty(this, "location",
    external_kolmafia_namespaceObject.Location.get("The Haunted Gallery"));QuestManorGallery_defineProperty(this, "item",
    external_kolmafia_namespaceObject.Item.get("Lady Spookyraven's dancing shoes"));QuestManorGallery_defineProperty(this, "sword",
    external_kolmafia_namespaceObject.Item.get("serpentine sword"));QuestManorGallery_defineProperty(this, "toAbsorb", void 0);}QuestManorGallery_createClass(ManorGallery, [{ key: "level", value:


    function level() {
      return 5;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questM21Dance");

      if (status < 1) {
        return QuestStatus.NOT_READY;
      }

      if (status > 1 || (0,external_kolmafia_namespaceObject.availableAmount)(this.item) > 0) {
        return QuestStatus.COMPLETED;
      }

      if (!hasNonCombatSkillsReady()) {
        return QuestStatus.FASTER_LATER;
      }

      if (this.hasDelay()) {
        if (DelayBurners.isDelayBurnerReady()) {
          return QuestStatus.READY;
        }

        if (DelayBurners.isDelayBurnerFeasible()) {
          return QuestStatus.FASTER_LATER;
        }
      }

      return QuestStatus.READY;
    } }, { key: "hasDelay", value:

    function hasDelay() {
      return this.location.turnsSpent < 5 && this.toAbsorb.length == 0;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setNoCombat();

      return {
        location: this.location,
        outfit: outfit,
        run: () => {
          // TODO Handle NCs
          var props = new PropertyManager();

          if (this.hasDelay()) {
            var delay = DelayBurners.getReadyDelayBurner();

            if (delay != null) {
              delay.doFightSetup();
            }
          } else if (this.toAbsorb.length == 0) {
            DelayBurners.tryReplaceCombats();
          }

          /* if (availableAmount(this.sword) == 0) {
            props.setChoice(89, 2);
          } else*/{
            props.setChoice(89, 4);
          }

          props.setChoice(914, 1);

          try {
            greyAdv(this.location, outfit);
          } finally {
            props.resetAll();
          }
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Manor / Gallery";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.location];
    } }]);return ManorGallery;}();
;// CONCATENATED MODULE: ./src/quests/council/manor/QuestManorKitchen.ts
function QuestManorKitchen_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestManorKitchen_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestManorKitchen_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestManorKitchen_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestManorKitchen_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestManorKitchen_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestManorKitchen = /*#__PURE__*/function () {function QuestManorKitchen() {QuestManorKitchen_classCallCheck(this, QuestManorKitchen);QuestManorKitchen_defineProperty(this, "kitchen",
    external_kolmafia_namespaceObject.Location.get("The Haunted Kitchen"));QuestManorKitchen_defineProperty(this, "stenchResist",
    external_kolmafia_namespaceObject.Skill.get("Conifer Polymers"));QuestManorKitchen_defineProperty(this, "albinoBat",
    external_kolmafia_namespaceObject.Monster.get("Albino Bat"));QuestManorKitchen_defineProperty(this, "lastResist",
    0);QuestManorKitchen_defineProperty(this, "lastResistTurnCheck",
    0);}QuestManorKitchen_createClass(QuestManorKitchen, [{ key: "getId", value:

    function getId() {
      return "Manor / Kitchen";
    } }, { key: "level", value:

    function level() {
      return 8;
    } }, { key: "status", value:

    function status() {
      // Each 3 resist in each element is another drawer searched.
      // 21 drawers searched.
      // Max of 9 total res
      var status = getQuestStatus("questM20Necklace");

      if (status < 0) {
        return QuestStatus.NOT_READY;
      }

      if (status > 0) {
        return QuestStatus.COMPLETED;
      }

      if (
      !(0,external_kolmafia_namespaceObject.haveSkill)(this.stenchResist) &&
      !AbsorbsProvider.getReabsorbedMonsters().includes(this.albinoBat))
      {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();

      if ((0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("manorDrawerCount")) < 20) {
        outfit.addBonus("+10 hot res").addBonus("+10 stench res");
      }

      return {
        outfit: outfit,
        location: this.kitchen,
        run: () => {
          greyAdv(this.kitchen, outfit);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.kitchen];
    } }]);return QuestManorKitchen;}();
;// CONCATENATED MODULE: ./src/quests/council/manor/QuestManorLibrary.ts
function QuestManorLibrary_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestManorLibrary_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestManorLibrary_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestManorLibrary_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestManorLibrary_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestManorLibrary_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestManorLibrary = /*#__PURE__*/function () {function QuestManorLibrary() {QuestManorLibrary_classCallCheck(this, QuestManorLibrary);QuestManorLibrary_defineProperty(this, "library",
    external_kolmafia_namespaceObject.Location.get("The Haunted Library"));QuestManorLibrary_defineProperty(this, "killingJar",
    external_kolmafia_namespaceObject.Item.get("Killing Jar"));QuestManorLibrary_defineProperty(this, "key",
    external_kolmafia_namespaceObject.Item.get("[7302]Spookyraven library key"));QuestManorLibrary_defineProperty(this, "librarian",
    external_kolmafia_namespaceObject.Monster.get("Banshee Librarian"));QuestManorLibrary_defineProperty(this, "sweep",
    external_kolmafia_namespaceObject.Skill.get("System Sweep"));}QuestManorLibrary_createClass(QuestManorLibrary, [{ key: "getId", value:

    function getId() {
      return "Manor / Library";
    } }, { key: "level", value:

    function level() {
      return 8;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questM20Necklace");

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.key) == 0) {
        return QuestStatus.NOT_READY;
      }

      if (status > 3) {
        return QuestStatus.COMPLETED;
      }

      if (getQuestStatus("questM21Dance") >= 0) {
        return QuestStatus.COMPLETED;
      }

      if (!(0,external_kolmafia_namespaceObject.haveSkill)(this.sweep)) {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();
      var banishLibrarian =
      (0,external_kolmafia_namespaceObject.availableAmount)(this.killingJar) > 0 && !(0,external_kolmafia_namespaceObject.isBanished)(this.librarian);

      return {
        location: this.library,
        run: () => {
          var settings = new AdventureSettings();

          settings.addBanish(external_kolmafia_namespaceObject.Monster.get("bookbat"));

          if (banishLibrarian) {
            settings.addBanish(this.librarian);
          }

          greyAdv(this.library, null, settings);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.library];
    } }]);return QuestManorLibrary;}();
;// CONCATENATED MODULE: ./src/quests/council/QuestManor.ts
function QuestManor_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestManor_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestManor_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestManor_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestManor_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestManor_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}













var QuestManor = /*#__PURE__*/function () {function QuestManor() {QuestManor_classCallCheck(this, QuestManor);QuestManor_defineProperty(this, "quests",
    [
    new ManorBathroom(),
    new ManorBedroom(),
    new ManorGallery(),
    new QuestManorLibrary(),
    new QuestManorKitchen(),
    new QuestManorBillards()]);QuestManor_defineProperty(this, "puff",


    external_kolmafia_namespaceObject.Item.get("Lady Spookyraven's powder puff"));QuestManor_defineProperty(this, "gown",
    external_kolmafia_namespaceObject.Item.get("Lady Spookyraven's finest gown"));QuestManor_defineProperty(this, "shoes",
    external_kolmafia_namespaceObject.Item.get("Lady Spookyraven's dancing shoes"));QuestManor_defineProperty(this, "ballroom",
    external_kolmafia_namespaceObject.Location.get("The Haunted Ballroom"));}QuestManor_createClass(QuestManor, [{ key: "level", value:

    function level() {
      return 8;
    } }, { key: "getId", value:

    function getId() {
      return "Manor / Chat";
    } }, { key: "getManorStatus", value:

    function getManorStatus() {
      return getQuestStatus("questM20Necklace");
    } }, { key: "getDanceStatus", value:

    function getDanceStatus() {
      return getQuestStatus("questM21Dance");
    } }, { key: "status", value:

    function status() {
      if (getQuestStatus("questM20Necklace") < 4) {
        return QuestStatus.NOT_READY;
      }

      if (getQuestStatus("questM20Necklace") != 100) {
        return QuestStatus.READY;
      }

      var danceStatus = this.getDanceStatus();

      if (danceStatus == DanceStatus.finished) {
        return QuestStatus.COMPLETED;
      }

      if (danceStatus == DanceStatus.readyToDance) {
        return QuestStatus.READY;
      }

      if (
      (0,external_kolmafia_namespaceObject.availableAmount)(this.puff) +
      (0,external_kolmafia_namespaceObject.availableAmount)(this.gown) +
      (0,external_kolmafia_namespaceObject.availableAmount)(this.shoes) !=
      3)
      {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      if (getQuestStatus("questM20Necklace") < 100) {
        return this.doUpstairs();
      }

      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=manor2&action=manor2_ladys");
          greyAdv(this.ballroom);
          (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=manor3&action=manor3_ladys");
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "getChildren", value:

    function getChildren() {
      return this.quests;
    } }, { key: "doUpstairs", value:

    function doUpstairs() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.print)("Lets chat up the old lady");
          (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=manor1&action=manor1_ladys");
          (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=manor2&action=manor2_ladys");
        } };

    } }]);return QuestManor;}();var


QuestManor_ManorStatus;(function (ManorStatus) {ManorStatus[ManorStatus["unstarted"] = -1] = "unstarted";ManorStatus[ManorStatus["DOING_KITCHEN"] = 0] = "DOING_KITCHEN";ManorStatus[ManorStatus["HAVE_POOL_KEY"] = 1] = "HAVE_POOL_KEY";ManorStatus[ManorStatus["HAVE_POOL_CUE"] = 2] = "HAVE_POOL_CUE";ManorStatus[ManorStatus["HAVE_LIBRARY_KEY"] = 3] = "HAVE_LIBRARY_KEY";ManorStatus[ManorStatus["HAVE_UPSTAIRS_KEY"] = 4] = "HAVE_UPSTAIRS_KEY";ManorStatus[ManorStatus["GOING_UPSTAIRS"] = 5] = "GOING_UPSTAIRS";ManorStatus[ManorStatus["finished"] = 100] = "finished";})(QuestManor_ManorStatus || (QuestManor_ManorStatus = {}));var










DanceStatus;(function (DanceStatus) {DanceStatus[DanceStatus["unstarted"] = -1] = "unstarted";DanceStatus[DanceStatus["started"] = 0] = "started";DanceStatus[DanceStatus["wantsToDance"] = 1] = "wantsToDance";DanceStatus[DanceStatus["hasAllThreeItems"] = 2] = "hasAllThreeItems";DanceStatus[DanceStatus["readyToDance"] = 3] = "readyToDance";DanceStatus[DanceStatus["finished"] = 100] = "finished";})(DanceStatus || (DanceStatus = {}));
;// CONCATENATED MODULE: ./src/quests/misc/QuestCar.ts
function QuestCar_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestCar_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestCar_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestCar_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestCar_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestCar_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestCar = /*#__PURE__*/function () {function QuestCar() {QuestCar_classCallCheck(this, QuestCar);QuestCar_defineProperty(this, "tinkersThingy",
    external_kolmafia_namespaceObject.Location.get("The Degrassi Knoll Garage"));QuestCar_defineProperty(this, "bitchCar",
    external_kolmafia_namespaceObject.Item.get("Bitchin' meatcar"));QuestCar_defineProperty(this, "toolbox",
    external_kolmafia_namespaceObject.Item.get("Gnollish toolbox"));QuestCar_defineProperty(this, "sweetRims",
    external_kolmafia_namespaceObject.Item.get("Sweet Rims"));QuestCar_defineProperty(this, "dopeWheels",
    external_kolmafia_namespaceObject.Item.get("Dope Wheels"));QuestCar_defineProperty(this, "bugbear",
    external_kolmafia_namespaceObject.Monster.get("Guard Bugbear"));}QuestCar_createClass(QuestCar, [{ key: "level", value:

    function level() {
      return 11;
    } }, { key: "tryMakeBitchCar", value:

    function tryMakeBitchCar() {
      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.toolbox) > 0) {
        (0,external_kolmafia_namespaceObject.use)(this.toolbox, (0,external_kolmafia_namespaceObject.availableAmount)(this.toolbox));
      }

      if (
      (0,external_kolmafia_namespaceObject.availableAmount)(this.dopeWheels) + (0,external_kolmafia_namespaceObject.availableAmount)(this.sweetRims) ==
      0)
      {
        (0,external_kolmafia_namespaceObject.retrieveItem)(this.sweetRims);
      }

      (0,external_kolmafia_namespaceObject.create)(this.bitchCar);
    } }, { key: "hasBoat", value:

    function hasBoat() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastIslandUnlock")) == (0,external_kolmafia_namespaceObject.myAscensions)();
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastDesertUnlock")) == (0,external_kolmafia_namespaceObject.myAscensions)()) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.myMeat)() < 700) {
        return QuestStatus.NOT_READY;
      }

      if (
      (0,external_kolmafia_namespaceObject.myLevel)() < 11 ||
      !GreySettings.isHippyMode() ||
      this.hasBoat() && getQuestStatus("questL11Black") <= 1)
      {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setItemDrops();

      return {
        outfit: outfit,
        location: this.tinkersThingy,
        run: () => {
          greyAdv(
          this.tinkersThingy,
          outfit,
          new AdventureSettings().addBanish(this.bugbear));


          this.tryMakeBitchCar();
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Misc / MeatCar";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.tinkersThingy];
    } }]);return QuestCar;}();
;// CONCATENATED MODULE: ./src/quests/misc/QuestManorLights.ts
function QuestManorLights_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestManorLights_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestManorLights_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestManorLights_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestManorLights_arrayLikeToArray(o, minLen);}function QuestManorLights_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestManorLights_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestManorLights_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestManorLights_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestManorLights_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestManorLights_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestManorLights_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var QuestManorLights = /*#__PURE__*/function () {
































  function QuestManorLights() {QuestManorLights_classCallCheck(this, QuestManorLights);QuestManorLights_defineProperty(this, "choices", [890, 891, 892, 893, 894, 895, 896, 897, 898, 899, 900, 901, 902, 903]);QuestManorLights_defineProperty(this, "elizibeth", [[external_kolmafia_namespaceObject.Location.get("The Haunted Storage Room"), 3], [external_kolmafia_namespaceObject.Location.get("The Haunted Laundry Room"), 3], [external_kolmafia_namespaceObject.Location.get("The Haunted Bathroom"), 3], [external_kolmafia_namespaceObject.Location.get("The Haunted Kitchen"), 4], [external_kolmafia_namespaceObject.Location.get("The Haunted Library"), 2], [external_kolmafia_namespaceObject.Location.get("The Haunted Ballroom"), 2], [external_kolmafia_namespaceObject.Location.get("The Haunted Gallery"), 4]]);QuestManorLights_defineProperty(this, "stephen", [[external_kolmafia_namespaceObject.Location.get("The Haunted Bedroom"), [1, 3, 1]], [external_kolmafia_namespaceObject.Location.get("The Haunted Nursery"), [1, 2, 2, 1, 1]], [external_kolmafia_namespaceObject.Location.get("The Haunted Conservatory"), [1, 2, 2]], [external_kolmafia_namespaceObject.Location.get("The Haunted Billiards"), [1, 2, 2]], [external_kolmafia_namespaceObject.Location.get("The Haunted Wine Cellar"), [1, 2, 2, 3]], [external_kolmafia_namespaceObject.Location.get("The Haunted Boiler Room"), [1, 2, 2]], [external_kolmafia_namespaceObject.Location.get("The Haunted Laboratory"), [1, 1, 3, 1, 1]]]);QuestManorLights_defineProperty(this, "elizabethRewards", [external_kolmafia_namespaceObject.Item.get("Elizabeth's Dollie"), external_kolmafia_namespaceObject.Item.get("Elizabeth's paintbrush")]);QuestManorLights_defineProperty(this, "stephsRewards", [external_kolmafia_namespaceObject.Item.get("Stephen's lab coat"), external_kolmafia_namespaceObject.Item.get("Stephen's secret formula")]);QuestManorLights_defineProperty(this, "goose", external_kolmafia_namespaceObject.Familiar.get("Grey Goose"));var _iterator = QuestManorLights_createForOfIteratorHelper(
    this.choices),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var choice = _step.value;
        var prop = "choiceAdventure" + choice;

        if ((0,external_kolmafia_namespaceObject.getProperty)(prop) != "") {
          continue;
        }

        // Make sure we don't halt on any of the NC
        (0,external_kolmafia_namespaceObject.setProperty)(prop, "1");
      }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
  }QuestManorLights_createClass(QuestManorLights, [{ key: "level", value:

    function level() {
      return 5;
    } }, { key: "isElizaReady", value:

    function isElizaReady() {
      return (0,external_kolmafia_namespaceObject.getProperty)("nextSpookyravenElizabethRoom") != "none";
    } }, { key: "isSteveReady", value:

    function isSteveReady() {
      return (0,external_kolmafia_namespaceObject.getProperty)("nextSpookyravenStephenRoom") != "none";
    } }, { key: "isElizaFight", value:

    function isElizaFight() {
      return (0,external_kolmafia_namespaceObject.getProperty)("nextSpookyravenElizabethRoom") == "The Haunted Gallery";
    } }, { key: "isSteveFight", value:

    function isSteveFight() {
      return (
        (0,external_kolmafia_namespaceObject.getProperty)("nextSpookyravenStephenRoom") == "The Haunted Laboratory");

    } }, { key: "hasFamiliarRecommendation", value:

    function hasFamiliarRecommendation() {
      if (!this.isSteveFight() || (0,external_kolmafia_namespaceObject.familiarWeight)(this.goose) >= 7) {
        return null;
      }

      return this.goose;
    } }, { key: "shouldDoSteve", value:

    function shouldDoSteve() {
      return (
        this.isSteveReady() && (
        !this.isSteveFight() ||
        (0,external_kolmafia_namespaceObject.familiarWeight)(this.goose) >= (
        (0,external_kolmafia_namespaceObject.getProperty)("questL13Final") == "unstarted" ? 7 : 6)));

    } }, { key: "getSteve", value:

    function getSteve() {
      var loc = external_kolmafia_namespaceObject.Location.get((0,external_kolmafia_namespaceObject.getProperty)("nextSpookyravenStephenRoom"));

      return this.stephen.find((s) => s[0] == loc);
    } }, { key: "getEliza", value:

    function getEliza() {
      var loc = external_kolmafia_namespaceObject.Location.get((0,external_kolmafia_namespaceObject.getProperty)("nextSpookyravenElizabethRoom"));

      return this.elizibeth.find((s) => s[0] == loc);
    } }, { key: "isTime", value:

    function isTime() {
      var last = this.getLastLightsOut();

      if (last >= (0,external_kolmafia_namespaceObject.totalTurnsPlayed)()) {
        return false;
      }

      return (0,external_kolmafia_namespaceObject.totalTurnsPlayed)() % 37 == 0;
    } }, { key: "getLastLightsOut", value:

    function getLastLightsOut() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastLightsOutTurn"));
    } }, { key: "status", value:

    function status() {
      if (!this.isElizaReady() && !this.shouldDoSteve()) {
        return QuestStatus.COMPLETED;
      }

      if (!this.isTime()) {
        return QuestStatus.NOT_READY;
      }

      if (!this.mustBeDone()) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "getBoth", value:

    function getBoth() {
      return (
        (0,external_kolmafia_namespaceObject.getProperty)("nextSpookyravenStephenRoom") +
        (0,external_kolmafia_namespaceObject.getProperty)("nextSpookyravenElizabethRoom"));

    } }, { key: "doSteve", value:

    function doSteve() {
      var steve = this.getSteve();
      var fight = this.isSteveFight();

      return {
        location: null,
        familiar: fight ? this.goose : null,
        outfit: !fight ? new GreyOutfit("-tie") : null,
        run: () => {
          if (false) {}

          var both = this.getBoth();

          (0,external_kolmafia_namespaceObject.visitUrl)("adventure.php?snarfblat=" + (0,external_kolmafia_namespaceObject.toInt)(steve[0]));var _iterator2 = QuestManorLights_createForOfIteratorHelper(

          steve[1]),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var i = _step2.value;
              var url =
              "choice.php?pwd=&whichchoice=" + (0,external_kolmafia_namespaceObject.lastChoice)() + "&option=" + i;

              (0,external_kolmafia_namespaceObject.visitUrl)(url);
            }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}

          if ((0,external_kolmafia_namespaceObject.currentRound)() != 0) {
            greyAdv(
            null,
            null,
            new AdventureSettings().setStartOfFightMacro(
            Macro.skill(external_kolmafia_namespaceObject.Skill.get("Emit Matter Duplicating Drones"))));


          }

          var both2 = this.getBoth();

          if (both == both2) {
            throw "No progress was made in steve..";
          }
        } };

    } }, { key: "run", value:

    function run() {
      if (this.shouldDoSteve()) {
        var steve = this.getSteve();

        if ((0,external_canadv_ash_namespaceObject.canAdv)(steve[0])) {
          return this.doSteve();
        }
      }

      if (this.isElizaReady()) {
        var eliza = this.getEliza();

        if ((0,external_canadv_ash_namespaceObject.canAdv)(eliza[0])) {
          return this.doEliza();
        }
      }

      throw "Neither steve or eliza were ready!";
    } }, { key: "doEliza", value:

    function doEliza() {
      var eliza = this.getEliza();
      var fight = this.isElizaFight();

      return {
        location: null,
        outfit: !fight ? new GreyOutfit("-tie") : null,
        run: () => {
          var both = this.getBoth();
          (0,external_kolmafia_namespaceObject.visitUrl)("adventure.php?snarfblat=" + (0,external_kolmafia_namespaceObject.toInt)(eliza[0]));

          var url =
          "choice.php?pwd=&whichchoice=" + (0,external_kolmafia_namespaceObject.lastChoice)() + "&option=" + eliza[1];

          (0,external_kolmafia_namespaceObject.visitUrl)(url);

          if ((0,external_kolmafia_namespaceObject.currentRound)() != 0) {
            greyAdv(null);
          }

          var both2 = this.getBoth();

          if (both == both2) {
            throw "No progress was made in eliza..";
          }
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Misc / ManorLights";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "mustBeDone", value:

    function mustBeDone() {
      if (!this.isTime()) {
        return false;
      }

      if (this.isElizaReady()) {
        var eliza = this.getEliza();

        if ((0,external_canadv_ash_namespaceObject.canAdv)(eliza[0])) {
          return true;
        }
      }

      if (this.shouldDoSteve()) {
        var steve = this.getSteve();

        if ((0,external_canadv_ash_namespaceObject.canAdv)(steve[0])) {
          return true;
        }
      }

      return false;
    } }, { key: "needAdventures", value:

    function needAdventures() {
      return 0;
    } }]);return QuestManorLights;}();
;// CONCATENATED MODULE: ./src/quests/custom/QuestInitialStart.ts
function QuestInitialStart_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestInitialStart_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestInitialStart_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestInitialStart_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestInitialStart_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestInitialStart_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestInitialStart = /*#__PURE__*/function () {function QuestInitialStart() {QuestInitialStart_classCallCheck(this, QuestInitialStart);QuestInitialStart_defineProperty(this, "familiar",
    external_kolmafia_namespaceObject.Familiar.get("Grey Goose"));QuestInitialStart_defineProperty(this, "equip",
    external_kolmafia_namespaceObject.Item.get("Grey Down Vest"));QuestInitialStart_defineProperty(this, "desiredLevel", void 0);QuestInitialStart_defineProperty(this, "weightRequired", void 0);QuestInitialStart_defineProperty(this, "spaceBlanket",


    external_kolmafia_namespaceObject.Item.get("Space Blanket"));QuestInitialStart_defineProperty(this, "mayday",
    external_kolmafia_namespaceObject.Item.get("MayDay supply package"));QuestInitialStart_defineProperty(this, "saber",
    external_kolmafia_namespaceObject.Item.get("Fourth of May Cosplay Saber"));}QuestInitialStart_createClass(QuestInitialStart, [{ key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "level", value:

    function level() {
      return 0;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.mayday) > 0) {
        return QuestStatus.READY;
      }

      if (
      (0,external_kolmafia_namespaceObject.getProperty)("hasMaydayContract") == "true" &&
      (0,external_kolmafia_namespaceObject.getProperty)("_maydayDropped") == "false")
      {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("breakfastCompleted") == "false") {
        return QuestStatus.READY;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.saber) > 0 && (0,external_kolmafia_namespaceObject.getProperty)("_saberMod") == "0") {
        return QuestStatus.READY;
      }

      return QuestStatus.COMPLETED;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          if (!(0,external_kolmafia_namespaceObject.hippyStoneBroken)() && (0,external_kolmafia_namespaceObject.toBoolean)((0,external_kolmafia_namespaceObject.getProperty)("auto_pvpEnable"))) {
            (0,external_kolmafia_namespaceObject.print)("Enabling pvp as it was set to true in autoscend", "blue");
            (0,external_kolmafia_namespaceObject.visitUrl)("peevpee.php?action=smashstone&pwd&confirm=on", true);
            (0,external_kolmafia_namespaceObject.visitUrl)("peevpee.php?place=fight");
          }

          if (
          (0,external_kolmafia_namespaceObject.availableAmount)(this.saber) > 0 &&
          (0,external_kolmafia_namespaceObject.getProperty)("_saberMod") == "0")
          {
            (0,external_kolmafia_namespaceObject.cliExecute)("saber resistance");
          }

          if (
          (0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("SongBoom&trade; BoomBox")) > 0 &&
          (0,external_kolmafia_namespaceObject.getProperty)("_boomBoxSongsLeft") == "11")
          {
            (0,external_kolmafia_namespaceObject.cliExecute)("boombox food");
          }

          if (
          !GreySettings.isHardcoreMode() &&
          (0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Mafia Thumb Ring")) == 0)
          {
            GreyPulls.pullStartingGear();
          }

          if ((0,external_kolmafia_namespaceObject.availableAmount)(this.mayday) > 0) {
            (0,external_kolmafia_namespaceObject.use)(this.mayday);

            if ((0,external_kolmafia_namespaceObject.availableAmount)(this.spaceBlanket) > 0) {
              (0,external_kolmafia_namespaceObject.autosell)(this.spaceBlanket, 1);
            }
          }

          if ((0,external_kolmafia_namespaceObject.getProperty)("breakfastCompleted") == "false") {
            var breakfastScript = (0,external_kolmafia_namespaceObject.getProperty)("breakfastScript");

            if (breakfastScript == "") {
              breakfastScript = "breakfast";
            }

            (0,external_kolmafia_namespaceObject.cliExecute)(breakfastScript);
          }
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Misc / InitialStart";
    } }]);return QuestInitialStart;}();
;// CONCATENATED MODULE: ./src/quests/custom/QuestDungeonsOfDoom.ts
function QuestDungeonsOfDoom_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestDungeonsOfDoom_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestDungeonsOfDoom_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestDungeonsOfDoom_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestDungeonsOfDoom_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestDungeonsOfDoom_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








var QuestDungeonsOfDoom = /*#__PURE__*/function () {function QuestDungeonsOfDoom() {QuestDungeonsOfDoom_classCallCheck(this, QuestDungeonsOfDoom);QuestDungeonsOfDoom_defineProperty(this, "bend",
    external_kolmafia_namespaceObject.Location.get("The Enormous Greater-Than Sign"));QuestDungeonsOfDoom_defineProperty(this, "plusSign",
    external_kolmafia_namespaceObject.Item.get("plus sign"));QuestDungeonsOfDoom_defineProperty(this, "teleportis",
    external_kolmafia_namespaceObject.Effect.get("Teleportitis"));}QuestDungeonsOfDoom_createClass(QuestDungeonsOfDoom, [{ key: "getId", value:

    // TODO Once we have the absorb, do replace combats

    function getId() {
      return "Misc / UnlockDungeonsOfDoom";
    } }, { key: "level", value:

    function level() {
      return 8;
    } }, { key: "isDoomUnlocked", value:

    function isDoomUnlocked() {
      return (
        (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastPlusSignUnlock")) == (0,external_kolmafia_namespaceObject.myAscensions)() &&
        (0,external_kolmafia_namespaceObject.availableAmount)(this.plusSign) == 0);

    } }, { key: "status", value:

    function status() {
      if (this.isDoomUnlocked()) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.myMeat)() < 1300) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("questL02Larva") != "finished") {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.myLevel)() < 16) {
        return QuestStatus.FASTER_LATER;
      }

      if (!hasNonCombatSkillsReady()) {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setNoCombat();

      return {
        outfit: outfit,
        location: this.bend,
        run: () => {
          var props = new PropertyManager();

          if ((0,external_kolmafia_namespaceObject.availableAmount)(this.plusSign) > 0) {
            props.setChoice(451, 5);
            props.setChoice(3, 3);
          } else {
            props.setChoice(451, 3);
          }

          try {
            greyAdv(this.bend, outfit);
          } finally {
            props.resetAll();
          }

          if ((0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastPlusSignUnlock")) == (0,external_kolmafia_namespaceObject.myAscensions)()) {
            (0,external_kolmafia_namespaceObject.use)(this.plusSign);
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.bend];
    } }, { key: "needAdventures", value:

    function needAdventures() {
      return 5;
    } }, { key: "mustBeDone", value:

    function mustBeDone() {
      return (
        (0,external_kolmafia_namespaceObject.haveEffect)(this.teleportis) > 0 && (0,external_kolmafia_namespaceObject.availableAmount)(this.plusSign) > 0);

    } }]);return QuestDungeonsOfDoom;}();
;// CONCATENATED MODULE: ./src/quests/custom/QuestGetZapWand.ts
function QuestGetZapWand_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestGetZapWand_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestGetZapWand_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestGetZapWand_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestGetZapWand_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestGetZapWand_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}









var QuestGetZapWand = /*#__PURE__*/function () {function QuestGetZapWand() {QuestGetZapWand_classCallCheck(this, QuestGetZapWand);QuestGetZapWand_defineProperty(this, "realDung",
    external_kolmafia_namespaceObject.Location.get("The Dungeons of Doom"));QuestGetZapWand_defineProperty(this, "wand",
    [
    "aluminum wand",
    "ebony wand",
    "hexagonal wand",
    "marble wand",
    "pine wand"].
    map((s) => external_kolmafia_namespaceObject.Item.get(s)));QuestGetZapWand_defineProperty(this, "deadMimic",
    external_kolmafia_namespaceObject.Item.get("dead mimic"));}QuestGetZapWand_createClass(QuestGetZapWand, [{ key: "getId", value:

    function getId() {
      return "Misc / GrabZapWand";
    } }, { key: "level", value:

    function level() {
      return 8;
    } }, { key: "shouldHaveWand", value:

    function shouldHaveWand() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastZapperWand")) == (0,external_kolmafia_namespaceObject.myAscensions)();
    } }, { key: "getTimesZapped", value:

    function getTimesZapped() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_zapCount"));
    } }, { key: "status", value:

    function status() {
      if (this.shouldHaveWand() || this.getWand() != null) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.myMeat)() < 5000 || getQuestStatus("questL11Black") < 3) {
        return QuestStatus.NOT_READY;
      }

      if (!hasNonCombatSkillsReady()) {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "getWand", value:

    function getWand() {
      return this.wand.find((w) => (0,external_kolmafia_namespaceObject.availableAmount)(w) > 0);
    } }, { key: "hasWandExploded", value:

    function hasWandExploded() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastZapperWandExplosionDay")) == (0,external_kolmafia_namespaceObject.myDaycount)();
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setNoCombat();

      return {
        outfit: outfit,
        location: this.realDung,
        run: () => {
          var props = new PropertyManager();

          props.setChoice(25, 2);

          try {
            greyAdv(this.realDung, outfit);
          } finally {
            props.resetAll();
          }

          if ((0,external_kolmafia_namespaceObject.availableAmount)(this.deadMimic) > 0) {
            (0,external_kolmafia_namespaceObject.use)(this.deadMimic);

            if (this.getWand() == null) {
              (0,external_kolmafia_namespaceObject.print)(
              "Something has gone wrong. We used a dead mimic but didn't get a wand.");

            }
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.realDung];
    } }]);return QuestGetZapWand;}();
;// CONCATENATED MODULE: ./src/quests/locket/QuestFantasyRealm.ts
function QuestFantasyRealm_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestFantasyRealm_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestFantasyRealm_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestFantasyRealm_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestFantasyRealm_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestFantasyRealm_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var QuestLocketFantasyRealm = /*#__PURE__*/function () {function QuestLocketFantasyRealm() {QuestFantasyRealm_classCallCheck(this, QuestLocketFantasyRealm);QuestFantasyRealm_defineProperty(this, "fought",
    "_foughtFantasyRealm");QuestFantasyRealm_defineProperty(this, "monster",
    external_kolmafia_namespaceObject.Monster.get("Fantasy Bandit"));QuestFantasyRealm_defineProperty(this, "camera",
    external_kolmafia_namespaceObject.Item.get("Backup Camera"));}QuestFantasyRealm_createClass(QuestLocketFantasyRealm, [{ key: "getFoughtToday", value:

    function getFoughtToday() {
      var setting = (0,external_kolmafia_namespaceObject.getProperty)(this.fought);

      if (setting == "") {
        return 0;
      }

      return (0,external_kolmafia_namespaceObject.toInt)(setting);
    } }, { key: "addFought", value:

    function addFought() {
      (0,external_kolmafia_namespaceObject.setProperty)(this.fought, (this.getFoughtToday() + 1).toString());
    } }, { key: "getId", value:

    function getId() {
      return "Council / Tower / Keys / FantasyBandit";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "hasFoughtEnough", value:

    function hasFoughtEnough() {
      return this.getFoughtToday() >= 5;
    } }, { key: "getBackupUsesRemaining", value:

    function getBackupUsesRemaining() {
      return 11 - (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_backUpUses"));
    } }, { key: "status", value:

    function status() {
      if (this.hasFoughtEnough()) {
        return QuestStatus.COMPLETED;
      }

      if (getQuestStatus("questL08Trapper") <= 1) {
        return QuestStatus.NOT_READY;
      }

      if (this.getBackupUsesRemaining() < 4) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.myAdventures)() < 30) {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      if (canCombatLocket(this.monster)) {
        return {
          location: null,
          run: () => {
            var page1 = (0,external_kolmafia_namespaceObject.visitUrl)("inventory.php?reminisce=1", false);
            var url =
            "choice.php?pwd=&whichchoice=1463&option=1&mid=" +
            (0,external_kolmafia_namespaceObject.toInt)(this.monster);

            var page2 = (0,external_kolmafia_namespaceObject.visitUrl)(url);

            greyAdv(url);

            this.addFought();
          } };

      }

      var outfit = new GreyOutfit().addItem(external_kolmafia_namespaceObject.Item.get("Backup Camera"));
      var loc = external_kolmafia_namespaceObject.Location.get("The Dire Warren");

      // TODO Backup and ruin other zones delay
      return {
        outfit: outfit,
        location: null,
        run: () => {
          greyAdv(
          loc,
          outfit,
          new AdventureSettings().setStartOfFightMacro(
          new Macro().if_(
          external_kolmafia_namespaceObject.Monster.get("Fluffy Bunny"),
          Macro.skill(external_kolmafia_namespaceObject.Skill.get("Back-Up to your Last Enemy")))));



          this.addFought();
        } };

    } }, { key: "lastMonster", value:
    function lastMonster() {
      return (0,external_kolmafia_namespaceObject.toMonster)((0,external_kolmafia_namespaceObject.getProperty)("lastCopyableMonster"));
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "needAdventures", value:

    function needAdventures() {
      return 5;
    } }, { key: "mustBeDone", value:

    function mustBeDone() {
      // TODO Throw error if more than one quest reports this
      return this.getFoughtToday() > 0 && !this.hasFoughtEnough();
    } }]);return QuestLocketFantasyRealm;}();
;// CONCATENATED MODULE: ./src/quests/custom/QuestNpcStuff.ts
function QuestNpcStuff_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestNpcStuff_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestNpcStuff_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestNpcStuff_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestNpcStuff_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestNpcStuff_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



var QuestNPCStuff = /*#__PURE__*/function () {function QuestNPCStuff() {QuestNpcStuff_classCallCheck(this, QuestNPCStuff);QuestNpcStuff_defineProperty(this, "children",
    [
    new QuestMeatSmith(),
    new QuestArtist(),
    new QuestGnomeTrainer(),
    new QuestMadBaker(),
    new QuestUntinker(),
    new QuestDruggie()]);}QuestNpcStuff_createClass(QuestNPCStuff, [{ key: "getId", value:


    function getId() {
      return "NPC / Parent";
    } }, { key: "level", value:

    function level() {
      return -1;
    } }, { key: "status", value:

    function status() {
      return QuestStatus.COMPLETED;
    } }, { key: "run", value:

    function run() {
      throw new Error("Method not implemented.");
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "getChildren", value:

    function getChildren() {
      return this.children;
    } }]);return QuestNPCStuff;}();var


QuestDruggie = /*#__PURE__*/function () {function QuestDruggie() {QuestNpcStuff_classCallCheck(this, QuestDruggie);}QuestNpcStuff_createClass(QuestDruggie, [{ key: "getId", value:
    function getId() {
      return "NPC / Druggie";
    } }, { key: "level", value:

    function level() {
      return 5;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastGoofballBuy")) == (0,external_kolmafia_namespaceObject.myAscensions)()) {
        return QuestStatus.COMPLETED;
      }

      if (getQuestStatus("questL03Rat") < 0) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=woods");
          (0,external_kolmafia_namespaceObject.visitUrl)("tavern.php?place=susguy&action=buygoofballs", true);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestDruggie;}();var


QuestGnomeTrainer = /*#__PURE__*/function () {function QuestGnomeTrainer() {QuestNpcStuff_classCallCheck(this, QuestGnomeTrainer);QuestNpcStuff_defineProperty(this, "skills",
    [
    "Torso Awareness",
    //"Cosmic Ugnderstanding",
    "Powers of Observatiogn",
    "Gnefarious Pickpocketing",
    "Gnomish Hardigness"].
    map((s) => external_kolmafia_namespaceObject.Skill.get(s)));QuestNpcStuff_defineProperty(this, "letter",
    external_kolmafia_namespaceObject.Item.get("Letter for Melvign the Gnome"));}QuestNpcStuff_createClass(QuestGnomeTrainer, [{ key: "getId", value:

    function getId() {
      return "NPC / GnomeSkills";
    } }, { key: "level", value:

    function level() {
      return 0;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.letter) > 0) {
        return QuestStatus.READY;
      }

      if (this.getSkillLacking() == null || !(0,external_kolmafia_namespaceObject.gnomadsAvailable)()) {
        return QuestStatus.COMPLETED;
      }

      var meat = 10000;

      if ((0,external_kolmafia_namespaceObject.myMeat)() < meat) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "getSkillLacking", value:

    function getSkillLacking() {
      return this.skills.find((s) => !(0,external_kolmafia_namespaceObject.haveSkill)(s));
    } }, { key: "run", value:

    function run() {
      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.letter) > 0) {
        return {
          location: null,
          run: () => {
            (0,external_kolmafia_namespaceObject.use)(this.letter);
          } };

      }

      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.visitUrl)(
          "gnomes.php?action=trainskill&whichskill=" +
          (0,external_kolmafia_namespaceObject.toInt)(this.getSkillLacking()));

        } };

    } }]);return QuestGnomeTrainer;}();var


QuestArtist = /*#__PURE__*/function () {function QuestArtist() {QuestNpcStuff_classCallCheck(this, QuestArtist);QuestNpcStuff_defineProperty(this, "paintbrush",
    external_kolmafia_namespaceObject.Item.get("Pretentious Paintbrush"));QuestNpcStuff_defineProperty(this, "palette",
    external_kolmafia_namespaceObject.Item.get("Pretentious Palette"));QuestNpcStuff_defineProperty(this, "pail",
    external_kolmafia_namespaceObject.Item.get("Pail of Pretentious Paint"));}QuestNpcStuff_createClass(QuestArtist, [{ key: "level", value:

    function level() {
      return 0;
    } }, { key: "getId", value:

    function getId() {
      return "NPC / Painter";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questM02Artist") == "finished") {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("questM02Artist") == "unstarted") {
        return QuestStatus.READY;
      }

      if (this.hasAllItems()) {
        return QuestStatus.READY;
      }

      return QuestStatus.NOT_READY;
    } }, { key: "startQuest", value:

    function startQuest() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.visitUrl)(
          "place.php?whichplace=town_wrong&action=townwrong_artist_noquest");

          (0,external_kolmafia_namespaceObject.visitUrl)(
          "place.php?whichplace=town_wrong&action=townwrong_artist_noquest&getquest=1");

          (0,external_kolmafia_namespaceObject.visitUrl)(
          "place.php?whichplace=town_wrong&action=townwrong_artist_quest");

        } };

    } }, { key: "turnInQuest", value:

    function turnInQuest() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.visitUrl)(
          "place.php?whichplace=town_wrong&action=townwrong_artist_quest");

        } };

    } }, { key: "run", value:

    function run() {
      if (this.hasAllItems()) {
        return this.turnInQuest();
      }

      return this.startQuest();
    } }, { key: "hasAllItems", value:

    function hasAllItems() {
      return (
        (0,external_kolmafia_namespaceObject.availableAmount)(this.paintbrush) > 0 &&
        (0,external_kolmafia_namespaceObject.availableAmount)(this.pail) > 0 &&
        (0,external_kolmafia_namespaceObject.availableAmount)(this.palette) > 0);

    } }]);return QuestArtist;}();var


QuestMadBaker = /*#__PURE__*/function () {function QuestMadBaker() {QuestNpcStuff_classCallCheck(this, QuestMadBaker);}QuestNpcStuff_createClass(QuestMadBaker, [{ key: "level", value:
    function level() {
      return 0;
    } }, { key: "getId", value:

    function getId() {
      return "NPC / Baker";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questM25Armorer") == "finished") {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("questM25Armorer") == "step4") {
        return QuestStatus.READY;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("questM25Armorer") != "unstarted") {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "turnInPie", value:

    function turnInPie() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=armory");
          (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?whichchoice=" + (0,external_kolmafia_namespaceObject.lastChoice)() + "&option=2&pwd=");
        } };

    } }, { key: "startQuest", value:

    function startQuest() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=armory");
          (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=armory&action=talk");
          (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?pwd=&whichchoice=1065&option=1");
        } };

    } }, { key: "run", value:

    function run() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questM25Armorer") == "unstarted") {
        return this.startQuest();
      }

      return this.turnInPie();
    } }]);return QuestMadBaker;}();var


QuestUntinker = /*#__PURE__*/function () {function QuestUntinker() {QuestNpcStuff_classCallCheck(this, QuestUntinker);QuestNpcStuff_defineProperty(this, "item",
    external_kolmafia_namespaceObject.Item.get("Rusty screwdriver"));}QuestNpcStuff_createClass(QuestUntinker, [{ key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "getId", value:

    function getId() {
      return "NPC / Untinkerer";
    } }, { key: "level", value:

    function level() {
      return 1;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questM01Untinker") == "finished") {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("questM01Untinker") == "unstarted") {
        return QuestStatus.READY;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.item) == 0) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questM01Untinker") == "unstarted") {
        return {
          location: null,
          run: () => {
            (0,external_kolmafia_namespaceObject.visitUrl)(
            "place.php?whichplace=forestvillage&preaction=screwquest&action=fv_untinker_quest");

            (0,external_kolmafia_namespaceObject.setProperty)("questM01Untinker", "started");
          } };

      }

      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=forestvillage&action=fv_untinker");
        } };

    } }]);return QuestUntinker;}();var


QuestMeatSmith = /*#__PURE__*/function () {function QuestMeatSmith() {QuestNpcStuff_classCallCheck(this, QuestMeatSmith);}QuestNpcStuff_createClass(QuestMeatSmith, [{ key: "getId", value:
    function getId() {
      return "NPC / Meatsmith";
    } }, { key: "level", value:

    function level() {
      return 0;
    } }, { key: "run", value:

    function run() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questM23Meatsmith") == "unstarted") {
        return {
          location: null,
          run: () => {
            (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=meatsmith");
            (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=meatsmith&action=talk");
            (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?whichchoice=1059&option=1&pwd=");
          } };

      }

      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.visitUrl)("shop.php?whichshop=meatsmith");
          (0,external_kolmafia_namespaceObject.visitUrl)("choice.php?whichchoice=" + (0,external_kolmafia_namespaceObject.lastChoice)() + "&option=2&pwd=");
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questM23Meatsmith") == "finished") {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("questM23Meatsmith") == "started") {
        return QuestStatus.NOT_READY; // Manual complete or not at all
      }

      return QuestStatus.READY;
    } }]);return QuestMeatSmith;}();
;// CONCATENATED MODULE: ./src/quests/custom/QuestCustomPurchases.ts
function QuestCustomPurchases_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestCustomPurchases_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestCustomPurchases_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestCustomPurchases_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestCustomPurchases_arrayLikeToArray(o, minLen);}function QuestCustomPurchases_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestCustomPurchases_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestCustomPurchases_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestCustomPurchases_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestCustomPurchases_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestCustomPurchases_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestCustomPurchases_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



var QuestCustomPurchases = /*#__PURE__*/function () {function QuestCustomPurchases() {QuestCustomPurchases_classCallCheck(this, QuestCustomPurchases);QuestCustomPurchases_defineProperty(this, "toPurchase",
    ["Porkpie-mounted popper"].map((s) => external_kolmafia_namespaceObject.Item.get(s)));}QuestCustomPurchases_createClass(QuestCustomPurchases, [{ key: "getId", value:

    function getId() {
      return "Misc / Purchases";
    } }, { key: "level", value:

    function level() {
      return 8;
    } }, { key: "getMissing", value:

    function getMissing() {
      return this.toPurchase.filter((i) => (0,external_kolmafia_namespaceObject.availableAmount)(i) == 0);
    } }, { key: "status", value:

    function status() {
      var missing = this.getMissing();

      if (missing.length == 0) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("_fireworksShopHatBought") == "true") {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.myMeat)() <= missing.length * 3000) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {var _iterator = QuestCustomPurchases_createForOfIteratorHelper(
          this.getMissing()),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var item = _step.value;
              (0,external_kolmafia_namespaceObject.print)("Now trying to buy " + item);
              (0,external_kolmafia_namespaceObject.retrieveItem)(item);
              //          buy(item);
            }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestCustomPurchases;}();
;// CONCATENATED MODULE: ./src/quests/custom/goblin/QuestGoblinTortureHarem.ts
function QuestGoblinTortureHarem_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestGoblinTortureHarem_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestGoblinTortureHarem_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestGoblinTortureHarem_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestGoblinTortureHarem_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestGoblinTortureHarem_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestGoblinTortureHarem = /*#__PURE__*/function () {function QuestGoblinTortureHarem() {QuestGoblinTortureHarem_classCallCheck(this, QuestGoblinTortureHarem);QuestGoblinTortureHarem_defineProperty(this, "harem",
    external_kolmafia_namespaceObject.Location.get("Cobb's Knob Harem"));QuestGoblinTortureHarem_defineProperty(this, "lab",
    external_kolmafia_namespaceObject.Location.get("Cobb's Knob Laboratory"));}QuestGoblinTortureHarem_createClass(QuestGoblinTortureHarem, [{ key: "getId", value:

    function getId() {
      return "GoblinLabs / LabUnlock";
    } }, { key: "level", value:

    function level() {
      return 5;
    } }, { key: "status", value:

    function status() {
      if ((0,external_canadv_ash_namespaceObject.canAdv)(this.lab)) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.getProperty)("questL05Goblin") != "finished") {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setNoCombat();

      return {
        outfit: outfit,
        location: this.harem,
        run: () => {
          greyAdv(this.harem, outfit);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.harem];
    } }]);return QuestGoblinTortureHarem;}();
;// CONCATENATED MODULE: ./src/quests/custom/goblin/QuestGoblinTortureLab.ts
function QuestGoblinTortureLab_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestGoblinTortureLab_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestGoblinTortureLab_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestGoblinTortureLab_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestGoblinTortureLab_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestGoblinTortureLab_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestGoblinTortureLab = /*#__PURE__*/function () {function QuestGoblinTortureLab() {QuestGoblinTortureLab_classCallCheck(this, QuestGoblinTortureLab);QuestGoblinTortureLab_defineProperty(this, "lab",
    external_kolmafia_namespaceObject.Location.get("Cobb's Knob Laboratory"));QuestGoblinTortureLab_defineProperty(this, "megL3",
    external_kolmafia_namespaceObject.Location.get("Menagerie Level 3"));}QuestGoblinTortureLab_createClass(QuestGoblinTortureLab, [{ key: "getLocations", value:

    function getLocations() {
      return [this.lab];
    } }, { key: "getId", value:

    function getId() {
      return "GoblinLabs / MegUnlock";
    } }, { key: "status", value:

    function status() {
      if ((0,external_canadv_ash_namespaceObject.canAdv)(this.megL3)) {
        return QuestStatus.COMPLETED;
      }

      if (!(0,external_canadv_ash_namespaceObject.canAdv)(this.lab) || (0,external_kolmafia_namespaceObject.getProperty)("questL05Goblin") != "finished") {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit().setItemDrops();

      return {
        outfit: outfit,
        location: this.lab,
        run: () => {
          greyAdv(this.lab, outfit);
        } };

    } }, { key: "level", value:

    function level() {
      return 5;
    } }]);return QuestGoblinTortureLab;}();
;// CONCATENATED MODULE: ./src/quests/locket/QuestLocketInfiniteLoop.ts
function QuestLocketInfiniteLoop_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestLocketInfiniteLoop_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestLocketInfiniteLoop_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestLocketInfiniteLoop_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestLocketInfiniteLoop_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestLocketInfiniteLoop_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestLocketInfiniteLoop = /*#__PURE__*/function () {function QuestLocketInfiniteLoop() {QuestLocketInfiniteLoop_classCallCheck(this, QuestLocketInfiniteLoop);QuestLocketInfiniteLoop_defineProperty(this, "monster",
    external_kolmafia_namespaceObject.Monster.get("Pygmy witch lawyer"));QuestLocketInfiniteLoop_defineProperty(this, "skill",
    external_kolmafia_namespaceObject.Skill.get("Infinite Loop"));QuestLocketInfiniteLoop_defineProperty(this, "rocket",
    external_kolmafia_namespaceObject.Item.get("Yellow Rocket"));QuestLocketInfiniteLoop_defineProperty(this, "effect",
    external_kolmafia_namespaceObject.Effect.get("Everything Looks Yellow"));}QuestLocketInfiniteLoop_createClass(QuestLocketInfiniteLoop, [{ key: "level", value:

    function level() {
      return 0;
    } }, { key: "status", value:

    function status() {
      if (!canCombatLocket(this.monster) || (0,external_kolmafia_namespaceObject.haveSkill)(this.skill)) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.haveEffect)(this.effect) > 0) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.myMeat)() < 350 || (0,external_kolmafia_namespaceObject.myLevel)() < 4) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();
      outfit.addBonus("+init");
      outfit.addBonus("-ml");

      return {
        location: null,
        outfit: outfit,
        run: () => {
          (0,external_kolmafia_namespaceObject.retrieveItem)(this.rocket);

          if ((0,external_kolmafia_namespaceObject.itemAmount)(this.rocket) == 0) {
            throw "Supposed to have a yellow rocket on hand!";
          }

          var page1 = (0,external_kolmafia_namespaceObject.visitUrl)("inventory.php?reminisce=1", false);
          var url =
          "choice.php?pwd=&whichchoice=1463&option=1&mid=" +
          (0,external_kolmafia_namespaceObject.toInt)(this.monster);

          (0,external_kolmafia_namespaceObject.visitUrl)(url);
          Macro.item(this.rocket).submit();

          if ((0,external_kolmafia_namespaceObject.handlingChoice)() || (0,external_kolmafia_namespaceObject.currentRound)() != 0) {
            throw "We're supposed to be done with this locket fight!";
          }
        } };

    } }, { key: "getId", value:

    function getId() {
      return "CombatLocket / InfiniteLoop";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestLocketInfiniteLoop;}();
;// CONCATENATED MODULE: ./src/quests/locket/QuestLocketSystemSweep.ts
function QuestLocketSystemSweep_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestLocketSystemSweep_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestLocketSystemSweep_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestLocketSystemSweep_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestLocketSystemSweep_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestLocketSystemSweep_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var QuestLocketSystemSweep = /*#__PURE__*/function () {function QuestLocketSystemSweep() {QuestLocketSystemSweep_classCallCheck(this, QuestLocketSystemSweep);QuestLocketSystemSweep_defineProperty(this, "monster",
    external_kolmafia_namespaceObject.Monster.get("pygmy janitor"));QuestLocketSystemSweep_defineProperty(this, "skill",
    external_kolmafia_namespaceObject.Skill.get("System Sweep"));QuestLocketSystemSweep_defineProperty(this, "rocket",
    external_kolmafia_namespaceObject.Item.get("Yellow Rocket"));QuestLocketSystemSweep_defineProperty(this, "effect",
    external_kolmafia_namespaceObject.Effect.get("Everything Looks Yellow"));}QuestLocketSystemSweep_createClass(QuestLocketSystemSweep, [{ key: "level", value:

    function level() {
      return 0;
    } }, { key: "status", value:

    function status() {
      if (
      GreySettings.isHardcoreMode() ||
      !canCombatLocket(this.monster) ||
      (0,external_kolmafia_namespaceObject.haveSkill)(this.skill))
      {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.haveEffect)(this.effect) > 0) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.myMeat)() < 350 || (0,external_kolmafia_namespaceObject.myLevel)() < 5) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.COMPLETED;

      // return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();
      outfit.addBonus("+init");
      outfit.addBonus("-ml");

      return {
        location: null,
        outfit: outfit,
        run: () => {
          (0,external_kolmafia_namespaceObject.retrieveItem)(this.rocket);

          if ((0,external_kolmafia_namespaceObject.itemAmount)(this.rocket) == 0) {
            throw "Supposed to have a yellow rocket on hand!";
          }

          var page1 = (0,external_kolmafia_namespaceObject.visitUrl)("inventory.php?reminisce=1", false);
          var url =
          "choice.php?pwd=&whichchoice=1463&option=1&mid=" +
          (0,external_kolmafia_namespaceObject.toInt)(this.monster);
          (0,external_kolmafia_namespaceObject.visitUrl)(url);

          Macro.item(this.rocket).submit();

          if ((0,external_kolmafia_namespaceObject.handlingChoice)() || (0,external_kolmafia_namespaceObject.currentRound)() != 0) {
            throw "We're supposed to be done with this locket fight!";
          }
        } };

    } }, { key: "getId", value:

    function getId() {
      return "CombatLocket / SystemSweep";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestLocketSystemSweep;}();
;// CONCATENATED MODULE: ./src/quests/skills/QuestMPRegen.ts
function QuestMPRegen_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestMPRegen_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestMPRegen_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestMPRegen_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestMPRegen_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestMPRegen_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}









var QuestMPRegen = /*#__PURE__*/function () {function QuestMPRegen() {QuestMPRegen_classCallCheck(this, QuestMPRegen);QuestMPRegen_defineProperty(this, "realDung",
    external_kolmafia_namespaceObject.Location.get("The Dungeons of Doom"));QuestMPRegen_defineProperty(this, "wand",
    [
    "aluminum wand",
    "ebony wand",
    "hexagonal wand",
    "marble wand",
    "pine wand"].
    map((s) => external_kolmafia_namespaceObject.Item.get(s)));QuestMPRegen_defineProperty(this, "deadMimic",
    external_kolmafia_namespaceObject.Item.get("dead mimic"));QuestMPRegen_defineProperty(this, "skill",
    external_kolmafia_namespaceObject.Skill.get("Hivemindedness"));}QuestMPRegen_createClass(QuestMPRegen, [{ key: "getId", value:

    function getId() {
      return "Skills / MPRegen";
    } }, { key: "level", value:

    function level() {
      return 8;
    } }, { key: "shouldHaveWand", value:

    function shouldHaveWand() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastZapperWand")) == (0,external_kolmafia_namespaceObject.myAscensions)();
    } }, { key: "getTimesZapped", value:

    function getTimesZapped() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_zapCount"));
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.haveSkill)(this.skill)) {
        return QuestStatus.COMPLETED;
      }

      if (this.getWand() == null) {
        if ((0,external_kolmafia_namespaceObject.myMeat)() < 5000 || getQuestStatus("questL11Black") < 3) {
          return QuestStatus.NOT_READY;
        }

        if (!hasNonCombatSkillsReady()) {
          return QuestStatus.FASTER_LATER;
        }
      }

      return QuestStatus.READY;
    } }, { key: "getWand", value:

    function getWand() {
      return this.wand.find((w) => (0,external_kolmafia_namespaceObject.availableAmount)(w) > 0);
    } }, { key: "hasWandExploded", value:

    function hasWandExploded() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastZapperWandExplosionDay")) == (0,external_kolmafia_namespaceObject.myDaycount)();
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();
      var seekingWand = this.getWand() == null && (0,external_kolmafia_namespaceObject.myMeat)() >= 5000;

      if (this.getWand() == null) {
        outfit.setNoCombat();
      } else {
        outfit.plusCombatWeight = 1;
      }

      return {
        outfit: outfit,
        location: this.realDung,
        run: () => {
          var props = new PropertyManager();

          props.setChoice(25, seekingWand ? 2 : 4);

          try {
            greyAdv(this.realDung, outfit);
          } finally {
            props.resetAll();
          }

          if ((0,external_kolmafia_namespaceObject.availableAmount)(this.deadMimic) > 0) {
            (0,external_kolmafia_namespaceObject.use)(this.deadMimic);

            if (this.getWand() == null) {
              (0,external_kolmafia_namespaceObject.print)(
              "Something has gone wrong. We used a dead mimic but didn't get a wand.");

            }
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.realDung];
    } }]);return QuestMPRegen;}();
;// CONCATENATED MODULE: ./src/quests/skills/QuestSkillAbstract.ts
function QuestSkillAbstract_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestSkillAbstract_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestSkillAbstract_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestSkillAbstract_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestSkillAbstract_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestSkillAbstract_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestSkillAbstract = /*#__PURE__*/function () {






  function QuestSkillAbstract(
  level,
  location,
  monster,
  skill,
  questName)
  {QuestSkillAbstract_classCallCheck(this, QuestSkillAbstract);QuestSkillAbstract_defineProperty(this, "requiredLevel", void 0);QuestSkillAbstract_defineProperty(this, "location", void 0);QuestSkillAbstract_defineProperty(this, "monster", void 0);QuestSkillAbstract_defineProperty(this, "skill", void 0);QuestSkillAbstract_defineProperty(this, "questName", void 0);
    this.requiredLevel = level;
    this.location = location;
    this.monster = monster;
    this.skill = skill;
    this.questName = questName;
  }QuestSkillAbstract_createClass(QuestSkillAbstract, [{ key: "getId", value:

    function getId() {
      return this.questName;
    } }, { key: "level", value:

    function level() {
      return this.requiredLevel;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.haveSkill)(this.skill)) {
        return QuestStatus.COMPLETED;
      }

      if (!(0,external_canadv_ash_namespaceObject.canAdv)(this.location)) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();

      if (this.location.combatPercent < 100) {
        outfit.setPlusCombat();
      }

      return {
        location: this.location,
        outfit: outfit,
        run: () => {
          var settings = new AdventureSettings();
          settings.addNoBanish(this.monster);

          greyAdv(this.location, outfit, settings);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.location];
    } }]);return QuestSkillAbstract;}();
;// CONCATENATED MODULE: ./src/quests/skills/QuestSkillColdDamage.ts
function QuestSkillColdDamage_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestSkillColdDamage_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestSkillColdDamage_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestSkillColdDamage_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestSkillColdDamage_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestSkillColdDamage_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






var QuestSkillColdDamage15 = /*#__PURE__*/function () {function QuestSkillColdDamage15() {QuestSkillColdDamage_classCallCheck(this, QuestSkillColdDamage15);QuestSkillColdDamage_defineProperty(this, "skill",
    external_kolmafia_namespaceObject.Skill.get("Snow-Cooling System"));QuestSkillColdDamage_defineProperty(this, "monster",
    external_kolmafia_namespaceObject.Monster.get("Snow Queen"));QuestSkillColdDamage_defineProperty(this, "location",
    external_kolmafia_namespaceObject.Location.get("The Icy Peak"));}QuestSkillColdDamage_createClass(QuestSkillColdDamage15, [{ key: "getId", value:

    function getId() {
      return "Skills / ColdDamage15";
    } }, { key: "level", value:

    function level() {
      return 10;
    } }, { key: "status", value:

    function status() {
      if (
      (0,external_kolmafia_namespaceObject.haveSkill)(this.skill) ||
      getQuestStatus("questL09Topping") > 0 ||
      !GreySettings.isHardcoreMode())
      {
        return QuestStatus.COMPLETED;
      }

      if (
      (0,external_kolmafia_namespaceObject.getProperty)("questL08Trapper") != "finished" ||
      !(0,external_canadv_ash_namespaceObject.canAdv)(this.location))
      {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: this.location,
        run: () => {
          var settings = new AdventureSettings().addNoBanish(this.monster);

          greyAdv(this.location, null, settings);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.location];
    } }]);return QuestSkillColdDamage15;}();


var QuestSkillColdDamage10 = /*#__PURE__*/function () {function QuestSkillColdDamage10() {QuestSkillColdDamage_classCallCheck(this, QuestSkillColdDamage10);QuestSkillColdDamage_defineProperty(this, "skill",
    external_kolmafia_namespaceObject.Skill.get("Cooling Tubules"));QuestSkillColdDamage_defineProperty(this, "monster",
    external_kolmafia_namespaceObject.Monster.get("Ninja Snowman Weaponmaster"));QuestSkillColdDamage_defineProperty(this, "location",
    external_kolmafia_namespaceObject.Location.get("Lair of the Ninja Snowmen"));}QuestSkillColdDamage_createClass(QuestSkillColdDamage10, [{ key: "getId", value:

    function getId() {
      return "Skills / ColdDamage10";
    } }, { key: "level", value:

    function level() {
      return 10;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.haveSkill)(this.skill) || getQuestStatus("questL09Topping") > 0) {
        return QuestStatus.COMPLETED;
      }

      if (
      getQuestStatus("questL08Trapper") < 3 ||
      !(0,external_canadv_ash_namespaceObject.canAdv)(this.location) ||
      !GreySettings.isHardcoreMode())
      {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: this.location,
        run: () => {
          var settings = new AdventureSettings().addNoBanish(this.monster);

          greyAdv(this.location, null, settings);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.location];
    } }]);return QuestSkillColdDamage10;}();
;// CONCATENATED MODULE: ./src/quests/skills/QuestSkillSystemSweep.ts
function QuestSkillSystemSweep_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestSkillSystemSweep_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestSkillSystemSweep_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestSkillSystemSweep_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestSkillSystemSweep_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestSkillSystemSweep_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestSkillSystemSweep = /*#__PURE__*/function () {function QuestSkillSystemSweep() {QuestSkillSystemSweep_classCallCheck(this, QuestSkillSystemSweep);QuestSkillSystemSweep_defineProperty(this, "park",
    external_kolmafia_namespaceObject.Location.get("The Hidden Park"));QuestSkillSystemSweep_defineProperty(this, "skill",
    external_kolmafia_namespaceObject.Skill.get("System Sweep"));QuestSkillSystemSweep_defineProperty(this, "sword",
    external_kolmafia_namespaceObject.Item.get("Antique Machete"));}QuestSkillSystemSweep_createClass(QuestSkillSystemSweep, [{ key: "getId", value:

    function getId() {
      return "Skills / System Sweep";
    } }, { key: "level", value:

    function level() {
      return 11;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.haveSkill)(this.skill)) {
        return QuestStatus.COMPLETED;
      }

      if (!this.hasRelocated() || (0,external_kolmafia_namespaceObject.availableAmount)(this.sword) == 0) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();
      outfit.setPlusCombat();

      return {
        location: this.park,
        outfit: outfit,
        run: () => {
          greyAdv(this.park, outfit);
        } };

    } }, { key: "hasRelocated", value:

    function hasRelocated() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("relocatePygmyJanitor")) == (0,external_kolmafia_namespaceObject.myAscensions)();
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestSkillSystemSweep;}();
;// CONCATENATED MODULE: ./src/quests/skills/QuestSkillRegistry.ts
function QuestSkillRegistry_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestSkillRegistry_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestSkillRegistry_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestSkillRegistry_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestSkillRegistry_arrayLikeToArray(o, minLen);}function QuestSkillRegistry_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestSkillRegistry_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestSkillRegistry_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestSkillRegistry_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestSkillRegistry_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestSkillRegistry_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestSkillRegistry_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}









var QuestSkillRegistry = /*#__PURE__*/function () {


  function QuestSkillRegistry() {QuestSkillRegistry_classCallCheck(this, QuestSkillRegistry);QuestSkillRegistry_defineProperty(this, "children", []);
    /*
    | "Skills / MPRegen"
    | "Skills / HPRegen"
    | "Skills / ScalingItem"
    | "Skills / ScalingDR"
    | "Skills / InfiniteLoop"
    | "Skills / Shroud"
    | "Skills / Hoonk"
    | "Skills / PhaseShift"
    | "Skills / ConiferPolymers";
    */

    this.addSkill("Skills / Phase Shift");
    this.addSkill("Skills / Conifer Polymers");
    this.addSkill("Skills / Photonic Shroud");
    this.addSkill("Skills / Piezoelectric Honk");
    this.addSkill(
    "Skills / ScalingItem",
    external_kolmafia_namespaceObject.Skill.get("Gravitational Compression"));

    this.addSkill("Skills / HPRegen", external_kolmafia_namespaceObject.Skill.get("Fluid Dynamics Simulation"));
    this.addSkill("Skills / ScalingDR", external_kolmafia_namespaceObject.Skill.get("Subatomic Hardening"));
    this.addSkill("Skills / ScalingMeat", external_kolmafia_namespaceObject.Skill.get("Ponzi Apparatus"));

    this.children.push(new QuestMPRegen());
    this.children.push(new QuestSkillSystemSweep());
    this.children.push(
    new QuestSkillAbstract(
    11,
    external_kolmafia_namespaceObject.Location.get("The Hidden Park"),
    external_kolmafia_namespaceObject.Monster.get("pygmy witch lawyer"),
    external_kolmafia_namespaceObject.Skill.get("Infinite Loop"),
    "Skills / Infinite Loop"));


    this.children.push(new QuestSkillColdDamage15());
    this.children.push(new QuestSkillColdDamage10());
  }QuestSkillRegistry_createClass(QuestSkillRegistry, [{ key: "addSkill", value:

    function addSkill(questType, skill) {
      if (skill == null) {
        skill = external_kolmafia_namespaceObject.Skill.get(
        questType.substring(questType.lastIndexOf("/") + 1).trim());

      }

      if (skill == external_kolmafia_namespaceObject.Skill.get("None")) {
        throw "There's no skill found for " + questType;
      }

      var location;
      var monster;var _iterator = QuestSkillRegistry_createForOfIteratorHelper(

      AbsorbsProvider.loadAbsorbs()),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var absorb = _step.value;
          if (absorb.skill != skill) {
            continue;
          }

          var locs = getLocations(absorb.monster);

          if (locs.length != 1) {
            throw (
              "Expected to find only one location, instead received multiple when trying to handle " +
              questType);

          }

          location = locs[0];
          monster = absorb.monster;
          break;
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

      if (location == null) {
        throw (
          "No location / monster found for the skill " +
          skill.name +
          " and type " +
          questType);

      }

      var level = Math.max(5, Math.sqrt(location.recommendedStat) * 1.5);

      this.children.push(
      new QuestSkillAbstract(level, location, monster, skill, questType));

    } }, { key: "getId", value:

    function getId() {
      return "Skills / Parent";
    } }, { key: "level", value:

    function level() {
      return -1;
    } }, { key: "status", value:

    function status() {
      return QuestStatus.COMPLETED;
    } }, { key: "run", value:

    function run() {
      throw new Error("Method not implemented.");
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "getChildren", value:

    function getChildren() {
      return this.children;
    } }]);return QuestSkillRegistry;}();
;// CONCATENATED MODULE: ./src/quests/custom/QuestGrabNormalHippyOutfit.ts
function QuestGrabNormalHippyOutfit_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestGrabNormalHippyOutfit_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestGrabNormalHippyOutfit_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestGrabNormalHippyOutfit_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestGrabNormalHippyOutfit_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestGrabNormalHippyOutfit_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







var QuestGrabHippyOutfit = /*#__PURE__*/function () {function QuestGrabHippyOutfit() {QuestGrabNormalHippyOutfit_classCallCheck(this, QuestGrabHippyOutfit);QuestGrabNormalHippyOutfit_defineProperty(this, "hippyCamp",
    external_kolmafia_namespaceObject.Location.get("Hippy Camp"));QuestGrabNormalHippyOutfit_defineProperty(this, "rocket",
    external_kolmafia_namespaceObject.Item.get("Yellow Rocket"));QuestGrabNormalHippyOutfit_defineProperty(this, "effect",
    external_kolmafia_namespaceObject.Effect.get("Everything Looks Yellow"));QuestGrabNormalHippyOutfit_defineProperty(this, "battery",
    external_kolmafia_namespaceObject.Item.get("Battery (9-Volt)"));QuestGrabNormalHippyOutfit_defineProperty(this, "shorts",
    external_kolmafia_namespaceObject.Item.get("Cargo Cultist Shorts"));}QuestGrabNormalHippyOutfit_createClass(QuestGrabHippyOutfit, [{ key: "hasShockingLick", value:

    function hasShockingLick() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("shockingLickCharges")) > 0;
    } }, { key: "getId", value:

    function getId() {
      return "Council / War / HippyOutfit";
    } }, { key: "level", value:

    function level() {
      return 5;
    } }, { key: "hasBoat", value:

    function hasBoat() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastIslandUnlock")) == (0,external_kolmafia_namespaceObject.myAscensions)();
    } }, { key: "status", value:

    function status() {
      if (
      !GreySettings.isHardcoreMode() ||
      (0,external_kolmafia_namespaceObject.haveOutfit)("Filthy Hippy Disguise") ||
      (0,external_kolmafia_namespaceObject.haveOutfit)("Frat Warrior Fatigues"))
      {
        return QuestStatus.COMPLETED;
      }

      if (
      (0,external_kolmafia_namespaceObject.availableAmount)(this.shorts) > 0 &&
      (0,external_kolmafia_namespaceObject.getProperty)("_cargoPocketEmptied") != "true")
      {
        return QuestStatus.NOT_READY;
      }

      if (!this.hasBoat() || (0,external_kolmafia_namespaceObject.myLevel)() >= 12) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.haveEffect)(this.effect) > 0 && !this.hasShockingLick()) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.myMeat)() < 350 || (0,external_kolmafia_namespaceObject.myLevel)() < 5) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      var outfit = new GreyOutfit();

      return {
        location: this.hippyCamp,
        outfit: outfit,
        run: () => {
          var macro;

          if (this.hasShockingLick()) {
            macro = Macro.skill(external_kolmafia_namespaceObject.Skill.get("Shocking Lick"));
          } else {
            (0,external_kolmafia_namespaceObject.retrieveItem)(this.rocket);

            if ((0,external_kolmafia_namespaceObject.itemAmount)(this.rocket) == 0) {
              throw "Supposed to have a yellow rocket on hand!";
            }

            macro = Macro.item(this.rocket);
          }

          greyAdv(
          this.hippyCamp,
          outfit,
          new AdventureSettings().setStartOfFightMacro(macro));

        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.hippyCamp];
    } }, { key: "mustBeDone", value:

    function mustBeDone() {
      if (!GreySettings.isHippyMode()) {
        return false;
      }

      if ((0,external_kolmafia_namespaceObject.myLevel)() == 11) {
        return true;
      }

      return false;
    } }]);return QuestGrabHippyOutfit;}();
;// CONCATENATED MODULE: ./src/quests/custom/QuestGrabBoatJunkyard.ts
function QuestGrabBoatJunkyard_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestGrabBoatJunkyard_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestGrabBoatJunkyard_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestGrabBoatJunkyard_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestGrabBoatJunkyard_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestGrabBoatJunkyard_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}









var QuestGrabBoatJunkyard = /*#__PURE__*/function () {function QuestGrabBoatJunkyard() {QuestGrabBoatJunkyard_classCallCheck(this, QuestGrabBoatJunkyard);QuestGrabBoatJunkyard_defineProperty(this, "location",
    external_kolmafia_namespaceObject.Location.get("The Old Landfill"));QuestGrabBoatJunkyard_defineProperty(this, "junkKey",
    external_kolmafia_namespaceObject.Item.get("funky junk key"));QuestGrabBoatJunkyard_defineProperty(this, "boatParts",
    [
    "old claw-foot bathtub",
    "old clothesline pole",
    "antique cigar sign"].
    map((s) => external_kolmafia_namespaceObject.Item.get(s)));QuestGrabBoatJunkyard_defineProperty(this, "magazine",
    external_kolmafia_namespaceObject.Item.get("Worse Homes and Gardens"));}QuestGrabBoatJunkyard_createClass(QuestGrabBoatJunkyard, [{ key: "getId", value:

    function getId() {
      return "Boat / Junkyard";
    } }, { key: "level", value:

    function level() {
      return 6;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questM19Hippy") == "unstarted") {
        return QuestStatus.READY;
      }

      if (this.hasBoat()) {
        return QuestStatus.COMPLETED;
      }

      if (!isJunkYardBoatApproach()) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "doHippyJunk", value:

    function doHippyJunk() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=woods&action=woods_smokesignals");
          (0,external_kolmafia_namespaceObject.runChoice)(1);
          (0,external_kolmafia_namespaceObject.runChoice)(2);
        } };

    } }, { key: "run", value:

    function run() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questM19Hippy") == "unstarted") {
        return this.doHippyJunk();
      }

      var outfit = new GreyOutfit();
      outfit.setItemDrops();

      return {
        location: this.location,
        outfit: outfit,
        run: () => {
          var props = new PropertyManager();

          if (this.needParts()) {
            if ((0,external_kolmafia_namespaceObject.closetAmount)(this.junkKey) > 0) {
              (0,external_kolmafia_namespaceObject.takeCloset)(this.junkKey);
            } else {
              // We immediately try to replace combats because the key drops the longer we spend
              DelayBurners.tryReplaceCombats();
            }

            props.setChoice(795, 1);
            props.setChoice(796, 2);
            props.setChoice(797, 3);

            for (var i = 0; i < 3; i++) {
              if ((0,external_kolmafia_namespaceObject.availableAmount)(this.boatParts[i]) > 0) {
                continue;
              }

              props.setChoice(794, i + 1);
              break;
            }
          }

          try {
            greyAdv(this.location, outfit);
          } finally {
            props.resetAll();
          }

          this.createBoat();
        } };

    } }, { key: "mustBeDone", value:

    function mustBeDone() {
      if (!GreySettings.isHippyMode()) {
        return false;
      }

      if ((0,external_kolmafia_namespaceObject.myLevel)() == 11 && isJunkYardBoatApproach()) {
        return true;
      }

      return false;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.location];
    } }, { key: "hasBoat", value:

    function hasBoat() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastIslandUnlock")) == (0,external_kolmafia_namespaceObject.myAscensions)();
    } }, { key: "needParts", value:

    function needParts() {
      return this.boatParts.filter((s) => (0,external_kolmafia_namespaceObject.availableAmount)(s)).length < 3;
    } }, { key: "createBoat", value:

    function createBoat() {
      if (this.needParts()) {
        return;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.magazine) == 0) {
        return;
      }

      (0,external_kolmafia_namespaceObject.cliExecute)("acquire junk junk");

      if ((0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Junk Junk")) == 0) {
        throw "Expected boat, didn't have boat!";
      }

      (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=woods&action=woods_hippy");

      if (!this.hasBoat()) {
        throw "We should've had a boat!";
      }
    } }]);return QuestGrabBoatJunkyard;}();


function isJunkYardBoatApproach() {
  var junkKey = external_kolmafia_namespaceObject.Item.get("funky junk key");
  var boatParts = [
  "old claw-foot bathtub",
  "old clothesline pole",
  "antique cigar sign"].
  map((s) => external_kolmafia_namespaceObject.Item.get(s));

  // If we haven't absorbed sharpener yet
  if (
  !AbsorbsProvider.getReabsorbedMonsters().includes(
  external_kolmafia_namespaceObject.Monster.get("junksprite sharpener")))

  {
    return true;
  }

  // Else if we have made some decentish progress
  return (
    (0,external_kolmafia_namespaceObject.itemAmount)(junkKey) +
    (0,external_kolmafia_namespaceObject.closetAmount)(junkKey) +
    boatParts.reduce((i, p) => (0,external_kolmafia_namespaceObject.availableAmount)(p) + i, 0) >
    1);

}
;// CONCATENATED MODULE: ./src/quests/custom/QuestGrabBoatVacation.ts
function QuestGrabBoatVacation_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestGrabBoatVacation_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestGrabBoatVacation_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestGrabBoatVacation_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestGrabBoatVacation_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestGrabBoatVacation_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}









var QuestGrabBoatVacation = /*#__PURE__*/function () {function QuestGrabBoatVacation() {QuestGrabBoatVacation_classCallCheck(this, QuestGrabBoatVacation);QuestGrabBoatVacation_defineProperty(this, "junkKey",
    external_kolmafia_namespaceObject.Item.get("funky junk key"));QuestGrabBoatVacation_defineProperty(this, "boatParts",
    [
    "old claw-foot bathtub",
    "old clothesline pole",
    "antique cigar sign"].
    map((s) => external_kolmafia_namespaceObject.Item.get(s)));}QuestGrabBoatVacation_createClass(QuestGrabBoatVacation, [{ key: "getId", value:

    function getId() {
      return "Boat / Vacation";
    } }, { key: "level", value:

    function level() {
      return 6;
    } }, { key: "hasDesertAccess", value:

    function hasDesertAccess() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastDesertUnlock")) == (0,external_kolmafia_namespaceObject.myAscensions)();
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questM19Hippy") == "unstarted") {
        return QuestStatus.READY;
      }

      if (this.hasBoat()) {
        return QuestStatus.COMPLETED;
      }

      if (isJunkYardBoatApproach()) {
        return QuestStatus.NOT_READY;
      }

      if (!this.hasDesertAccess()) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.myMeat)() < 2000) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.myAdventures)() < 20 || (0,external_kolmafia_namespaceObject.myLevel)() < 11) {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "doHippyJunk", value:

    function doHippyJunk() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.visitUrl)("place.php?whichplace=woods&action=woods_smokesignals");
          (0,external_kolmafia_namespaceObject.runChoice)(1);
          (0,external_kolmafia_namespaceObject.runChoice)(2);
        } };

    } }, { key: "run", value:

    function run() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("questM19Hippy") == "unstarted") {
        return this.doHippyJunk();
      }

      return {
        location: null,
        run: () => {
          var scriptAvailable = (0,external_kolmafia_namespaceObject.availableAmount)(
          external_kolmafia_namespaceObject.Item.get("Shore Inc. Ship Trip Scrip"));


          var props = new PropertyManager();
          props.setChoice(793, 1);

          try {
            for (var i = 0; i < 3 - scriptAvailable; i++) {
              greyAdv(external_kolmafia_namespaceObject.Location.get("The Shore, Inc. Travel Agency"));
            }
          } finally {
            props.resetAll();
          }

          var planks = external_kolmafia_namespaceObject.Item.get("Dingy Planks");

          if ((0,external_kolmafia_namespaceObject.availableAmount)(planks) == 0) {
            (0,external_kolmafia_namespaceObject.retrieveItem)(planks);
          }

          (0,external_kolmafia_namespaceObject.cliExecute)("make dinghy plans");
          (0,external_kolmafia_namespaceObject.use)(external_kolmafia_namespaceObject.Item.get("Dinghy plans"));

          if (!this.hasBoat()) {
            throw "We should've had a boat!";
          }
        } };

    } }, { key: "mustBeDone", value:

    function mustBeDone() {
      if (!GreySettings.isHippyMode()) {
        return false;
      }

      if ((0,external_kolmafia_namespaceObject.myLevel)() == 11 && !isJunkYardBoatApproach()) {
        return true;
      }

      return false;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "needAdventures", value:

    function needAdventures() {
      return 9;
    } }, { key: "hasBoat", value:

    function hasBoat() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastIslandUnlock")) == (0,external_kolmafia_namespaceObject.myAscensions)();
    } }]);return QuestGrabBoatVacation;}();
;// CONCATENATED MODULE: ./src/quests/custom/QuestMirrorDupe.ts
function QuestMirrorDupe_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestMirrorDupe_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestMirrorDupe_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestMirrorDupe_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestMirrorDupe_arrayLikeToArray(o, minLen);}function QuestMirrorDupe_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestMirrorDupe_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestMirrorDupe_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestMirrorDupe_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestMirrorDupe_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestMirrorDupe_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestMirrorDupe_inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) QuestMirrorDupe_setPrototypeOf(subClass, superClass);}function QuestMirrorDupe_setPrototypeOf(o, p) {QuestMirrorDupe_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return QuestMirrorDupe_setPrototypeOf(o, p);}function QuestMirrorDupe_createSuper(Derived) {var hasNativeReflectConstruct = QuestMirrorDupe_isNativeReflectConstruct();return function _createSuperInternal() {var Super = QuestMirrorDupe_getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = QuestMirrorDupe_getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return QuestMirrorDupe_possibleConstructorReturn(this, result);};}function QuestMirrorDupe_possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return QuestMirrorDupe_assertThisInitialized(self);}function QuestMirrorDupe_assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function QuestMirrorDupe_isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function QuestMirrorDupe_getPrototypeOf(o) {QuestMirrorDupe_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return QuestMirrorDupe_getPrototypeOf(o);}function QuestMirrorDupe_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}









var QuestMirrorDupe = /*#__PURE__*/function (_QuestKeyStuffAbstrac) {QuestMirrorDupe_inherits(QuestMirrorDupe, _QuestKeyStuffAbstrac);var _super = QuestMirrorDupe_createSuper(QuestMirrorDupe);function QuestMirrorDupe() {var _this;QuestMirrorDupe_classCallCheck(this, QuestMirrorDupe);for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}_this = _super.call.apply(_super, [this].concat(args));QuestMirrorDupe_defineProperty(QuestMirrorDupe_assertThisInitialized(_this), "clover",



    external_kolmafia_namespaceObject.Item.get("11-leaf Clover"));QuestMirrorDupe_defineProperty(QuestMirrorDupe_assertThisInitialized(_this), "location",
    external_kolmafia_namespaceObject.Location.get("The Haunted Storage Room"));return _this;}QuestMirrorDupe_createClass(QuestMirrorDupe, [{ key: "getId", value:

    function getId() {
      return "Council / Tower / Keys / DupeMirror";
    } }, { key: "level", value:

    function level() {
      return 7;
    } }, { key: "status", value:

    function status() {
      if (!GreySettings.isHardcoreMode()) {
        return QuestStatus.COMPLETED;
      }

      if (!(0,external_canadv_ash_namespaceObject.canAdv)(this.location)) {
        return QuestStatus.NOT_READY;
      }

      var status = getQuestStatus("questL13Final");

      if (status > 5) {
        return QuestStatus.COMPLETED;
      }

      // If we have enough key stuff to make it!
      if (this.getViableKeyCount() + this.getOwnedZappables().length >= 3) {
        return QuestStatus.COMPLETED;
      }

      // If it wants to drop
      if (this.shouldDrop()) {
        return QuestStatus.READY;
      }

      // If we don't have enough tokens, or zappables to do this
      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.token) + this.getOwnedZappables().length < 1) {
        return QuestStatus.NOT_READY;
      }

      // If we don't have enough clovers
      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.clover) == 0) {
        return QuestStatus.NOT_READY;
      }

      // If we can't create a viable outfit
      if (this.createOutfit() == null) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "dropHardcore", value:

    function dropHardcore() {
      return {
        location: null,
        run: () => {
          //  throw "It looks like the script wants you to drop hardcore!"; // TODO

          (0,external_kolmafia_namespaceObject.visitUrl)(
          "account.php?tab=account&unhardcoreconfirm=1&pwd=&action=Drop Hardcore");


          (0,external_kolmafia_namespaceObject.cliExecute)("refresh all");

          GreyPulls.pullStartingGear();
        } };

    } }, { key: "shouldDrop", value:

    function shouldDrop() {
      return (0,external_kolmafia_namespaceObject.availableAmount)(this.clover) == 0 && this.getViableKeyCount() < 3;
    } }, { key: "getPvPables", value:

    function getPvPables() {
      var items = [];var _iterator = QuestMirrorDupe_createForOfIteratorHelper(

      Object.keys((0,external_kolmafia_namespaceObject.getInventory)()).map((s) => external_kolmafia_namespaceObject.Item.get(s))),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var i = _step.value;
          if (!this.isPvPable(i) || !this.isWearable(i)) {
            continue;
          }

          items.push(i);
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

      return items;
    } }, { key: "createOutfit", value:

    function createOutfit() {
      var slots = [];var _iterator2 = QuestMirrorDupe_createForOfIteratorHelper(

      this.getPvPables()),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _i2 = _step2.value;
          var _slot = (0,external_kolmafia_namespaceObject.toSlot)(_i2);

          slots.push([_slot, _i2]);
        }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}

      slots.sort((i1, i2) => {
        return (0,external_kolmafia_namespaceObject.getPower)(i2[1]) - (0,external_kolmafia_namespaceObject.getPower)(i1[1]);
      });var _iterator3 = QuestMirrorDupe_createForOfIteratorHelper(

      this.getOwnedZappables()),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _i3 = _step3.value;
          slots.unshift([external_kolmafia_namespaceObject.Slot.get("Acc1"), _i3]);
        }} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}

      slots.unshift([external_kolmafia_namespaceObject.Slot.get("Familiar"), external_kolmafia_namespaceObject.Item.get("Grey Down Vest")]);

      var slotsTaken = [];
      var toWear = [];

      for (var _i = 0, _slots = slots; _i < _slots.length; _i++) {var i = _slots[_i];
        var slot = i[0];

        if (slot == external_kolmafia_namespaceObject.Slot.get("Acc1")) {
          if (slotsTaken.includes(external_kolmafia_namespaceObject.Slot.get("Acc2"))) {
            slot = external_kolmafia_namespaceObject.Slot.get("Acc3");
          } else if (slotsTaken.includes(slot)) {
            slot = external_kolmafia_namespaceObject.Slot.get("Acc2");
          }
        }

        if (slotsTaken.includes(slot)) {
          continue;
        }

        slotsTaken.push(slot);
        toWear.push([slot, i[1]]);

        if (toWear.length < 6) {
          continue;
        }

        break;
      }

      if (toWear.length < 6) {
        return null;
      }var _iterator4 = QuestMirrorDupe_createForOfIteratorHelper(

      external_kolmafia_namespaceObject.Slot.all()),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var s = _step4.value;
          if (slotsTaken.includes(s)) {
            continue;
          }

          toWear.push([s, external_kolmafia_namespaceObject.Item.get("None")]);
        }} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}

      return toWear;
    } }, { key: "isWearable", value:

    function isWearable(i) {
      return (0,external_kolmafia_namespaceObject.toSlot)(i) != external_kolmafia_namespaceObject.Slot.get("None") && (0,external_kolmafia_namespaceObject.canEquip)(i);
    } }, { key: "isPvPable", value:

    function isPvPable(i) {
      return (0,external_kolmafia_namespaceObject.isTradeable)(i) && (0,external_kolmafia_namespaceObject.isDiscardable)(i);
    } }, { key: "run", value:

    function run() {
      if (this.shouldDrop()) {
        return this.dropHardcore();
      }

      return this.doMirror();
    } }, { key: "createZappableIfNeeded", value:

    function createZappableIfNeeded() {
      if (this.getOwnedZappables().length > 0) {
        return;
      }

      (0,external_kolmafia_namespaceObject.retrieveItem)(this.getZappableItems()[0]);
    } }, { key: "doMirror", value:

    function doMirror() {var _this2 = this;
      return {
        location: null,
        run: () => {
          //throw "This is where we'd do the mirror!";
          this.createZappableIfNeeded();

          var outfit = this.createOutfit();

          var equips = outfit.
          filter((s) => s[1] != external_kolmafia_namespaceObject.Item.get("None")).
          map((s) => "+equip " + s[1].name);

          (0,external_kolmafia_namespaceObject.maximize)("familiar experience " + equips.join(" "), false);var _iterator5 = QuestMirrorDupe_createForOfIteratorHelper(

          external_kolmafia_namespaceObject.Slot.all()),_step5;try {var _loop = function _loop() {var slot = _step5.value;
              var item = (0,external_kolmafia_namespaceObject.equippedItem)(slot);

              if (item == external_kolmafia_namespaceObject.Item.get("None") || !_this2.isPvPable(item)) {
                return "continue";
              }

              if (outfit.find((o) => o[1] == item) != null) {
                return "continue";
              }

              (0,external_kolmafia_namespaceObject.equip)(slot, external_kolmafia_namespaceObject.Item.get("None"));};for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {var _ret = _loop();if (_ret === "continue") continue;
            }

            /* for (let i of outfit) {
              if (i[1] != Item.get("None")) {
                continue;
              }
              equip(i[0], i[1]);
            }*/} catch (err) {_iterator5.e(err);} finally {_iterator5.f();}

          (0,external_kolmafia_namespaceObject.use)(this.clover);
          greyAdv(this.location);
          (0,external_kolmafia_namespaceObject.cliExecute)("refresh inventory");
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestMirrorDupe;}(QuestKeyStuffAbstract);
;// CONCATENATED MODULE: ./src/quests/custom/QuestPullZappableKey.ts
function QuestPullZappableKey_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestPullZappableKey_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestPullZappableKey_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestPullZappableKey_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestPullZappableKey_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestPullZappableKey_inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) QuestPullZappableKey_setPrototypeOf(subClass, superClass);}function QuestPullZappableKey_setPrototypeOf(o, p) {QuestPullZappableKey_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return QuestPullZappableKey_setPrototypeOf(o, p);}function QuestPullZappableKey_createSuper(Derived) {var hasNativeReflectConstruct = QuestPullZappableKey_isNativeReflectConstruct();return function _createSuperInternal() {var Super = QuestPullZappableKey_getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = QuestPullZappableKey_getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return QuestPullZappableKey_possibleConstructorReturn(this, result);};}function QuestPullZappableKey_possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return QuestPullZappableKey_assertThisInitialized(self);}function QuestPullZappableKey_assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function QuestPullZappableKey_isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function QuestPullZappableKey_getPrototypeOf(o) {QuestPullZappableKey_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return QuestPullZappableKey_getPrototypeOf(o);}













var QuestPullZappableKey = /*#__PURE__*/function (_QuestKeyStuffAbstrac) {QuestPullZappableKey_inherits(QuestPullZappableKey, _QuestKeyStuffAbstrac);var _super = QuestPullZappableKey_createSuper(QuestPullZappableKey);function QuestPullZappableKey() {QuestPullZappableKey_classCallCheck(this, QuestPullZappableKey);return _super.apply(this, arguments);}QuestPullZappableKey_createClass(QuestPullZappableKey, [{ key: "getId", value:



    function getId() {
      return "Council / Tower / Keys / PullZappableKey";
    } }, { key: "level", value:

    function level() {
      return 8;
    } }, { key: "status", value:

    function status() {
      if (GreySettings.isHardcoreMode()) {
        return QuestStatus.COMPLETED;
      }

      var status = getQuestStatus("questL13Final");

      if (status < 5) {
        return QuestStatus.NOT_READY;
      }

      if (status > 5) {
        return QuestStatus.COMPLETED;
      }

      if (this.getViableKeyCount() >= 3) {
        return QuestStatus.COMPLETED;
      }

      if (this.getOwnedZappables().length > 0) {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          GreyPulls.pullZappableKey();
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestPullZappableKey;}(QuestKeyStuffAbstract);
;// CONCATENATED MODULE: ./src/quests/custom/QuestZapKeys.ts
function QuestZapKeys_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestZapKeys_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestZapKeys_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestZapKeys_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestZapKeys_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestZapKeys_inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) QuestZapKeys_setPrototypeOf(subClass, superClass);}function QuestZapKeys_setPrototypeOf(o, p) {QuestZapKeys_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return QuestZapKeys_setPrototypeOf(o, p);}function QuestZapKeys_createSuper(Derived) {var hasNativeReflectConstruct = QuestZapKeys_isNativeReflectConstruct();return function _createSuperInternal() {var Super = QuestZapKeys_getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = QuestZapKeys_getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return QuestZapKeys_possibleConstructorReturn(this, result);};}function QuestZapKeys_possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return QuestZapKeys_assertThisInitialized(self);}function QuestZapKeys_assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function QuestZapKeys_isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function QuestZapKeys_getPrototypeOf(o) {QuestZapKeys_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return QuestZapKeys_getPrototypeOf(o);}




var QuestZapKeys = /*#__PURE__*/function (_QuestKeyStuffAbstrac) {QuestZapKeys_inherits(QuestZapKeys, _QuestKeyStuffAbstrac);var _super = QuestZapKeys_createSuper(QuestZapKeys);function QuestZapKeys() {QuestZapKeys_classCallCheck(this, QuestZapKeys);return _super.apply(this, arguments);}QuestZapKeys_createClass(QuestZapKeys, [{ key: "tryZap", value:
    function tryZap(wand, target) {
      var original = this.keys.map((z) => [
      z,
      (0,external_kolmafia_namespaceObject.availableAmount)(z)]);


      (0,external_kolmafia_namespaceObject.visitUrl)(
      "wand.php?action=zap&whichwand=" +
      (0,external_kolmafia_namespaceObject.toInt)(wand) +
      "&whichitem=" +
      (0,external_kolmafia_namespaceObject.toInt)(target),
      true);


      var acquired = original.find((z) => (0,external_kolmafia_namespaceObject.availableAmount)(z[0]) > z[1])[0];

      return acquired;
    } }, { key: "getTimesZapped", value:

    function getTimesZapped() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_zapCount"));
    } }, { key: "getWand", value:

    function getWand() {
      return this.wand.find((w) => (0,external_kolmafia_namespaceObject.availableAmount)(w) > 0);
    } }, { key: "getId", value:

    function getId() {
      return "Council / Tower / Keys / ZapKeys";
    } }, { key: "level", value:

    function level() {
      return 5;
    } }, { key: "status", value:

    function status() {
      var status = getQuestStatus("questL13Final");

      if (status < 5) {
        return QuestStatus.NOT_READY;
      }

      if (status > 5) {
        return QuestStatus.COMPLETED;
      }

      if (this.getKeysUnavailable().length == 0) {
        return QuestStatus.COMPLETED;
      }

      var zappables = this.getOwnedZappables();

      if (zappables.length == 0) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          var wand = this.getWand();

          if (wand == null) {
            throw "Expected a wand! What happened!";
          }

          var toZap = this.getOwnedZappables();

          if (toZap.length == 0) {
            throw "Expected something to zap! What happened!";
          }

          var zapped = this.tryZap(wand, toZap[0]);

          if (!this.keys.includes(zapped)) {
            throw (
              "Ugh, we failed to zap it properly. We zapped " +
              toZap[0].name +
              " and got " +
              zapped.name);

          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestZapKeys;}(QuestKeyStuffAbstract);
;// CONCATENATED MODULE: ./src/quests/custom/QuestMonsterBait.ts
function QuestMonsterBait_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestMonsterBait_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestMonsterBait_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestMonsterBait_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestMonsterBait_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestMonsterBait_inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) QuestMonsterBait_setPrototypeOf(subClass, superClass);}function QuestMonsterBait_setPrototypeOf(o, p) {QuestMonsterBait_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return QuestMonsterBait_setPrototypeOf(o, p);}function QuestMonsterBait_createSuper(Derived) {var hasNativeReflectConstruct = QuestMonsterBait_isNativeReflectConstruct();return function _createSuperInternal() {var Super = QuestMonsterBait_getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = QuestMonsterBait_getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return QuestMonsterBait_possibleConstructorReturn(this, result);};}function QuestMonsterBait_possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return QuestMonsterBait_assertThisInitialized(self);}function QuestMonsterBait_assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function QuestMonsterBait_isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function QuestMonsterBait_getPrototypeOf(o) {QuestMonsterBait_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return QuestMonsterBait_getPrototypeOf(o);}function QuestMonsterBait_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}




var QuestMonsterBait = /*#__PURE__*/function (_QuestKeyStuffAbstrac) {QuestMonsterBait_inherits(QuestMonsterBait, _QuestKeyStuffAbstrac);var _super = QuestMonsterBait_createSuper(QuestMonsterBait);function QuestMonsterBait() {var _this;QuestMonsterBait_classCallCheck(this, QuestMonsterBait);for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}_this = _super.call.apply(_super, [this].concat(args));QuestMonsterBait_defineProperty(QuestMonsterBait_assertThisInitialized(_this), "wPixel",



    external_kolmafia_namespaceObject.Item.get("White Pixel"));QuestMonsterBait_defineProperty(QuestMonsterBait_assertThisInitialized(_this), "rPixel",
    external_kolmafia_namespaceObject.Item.get("Red Pixel"));QuestMonsterBait_defineProperty(QuestMonsterBait_assertThisInitialized(_this), "gPixel",
    external_kolmafia_namespaceObject.Item.get("Green Pixel"));QuestMonsterBait_defineProperty(QuestMonsterBait_assertThisInitialized(_this), "bPixel",
    external_kolmafia_namespaceObject.Item.get("Blue Pixel"));QuestMonsterBait_defineProperty(QuestMonsterBait_assertThisInitialized(_this), "key",
    external_kolmafia_namespaceObject.Item.get("Digital key"));QuestMonsterBait_defineProperty(QuestMonsterBait_assertThisInitialized(_this), "monsterBait",
    external_kolmafia_namespaceObject.Item.get("Monster Bait"));return _this;}QuestMonsterBait_createClass(QuestMonsterBait, [{ key: "getId", value:

    function getId() {
      return "Misc / MonsterBait";
    } }, { key: "level", value:

    function level() {
      return 12;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.monsterBait) > -40) {
        return QuestStatus.COMPLETED;
      }

      if (
      (0,external_kolmafia_namespaceObject.availableAmount)(this.key) == 0 &&
      !this.getKeysUsed().includes(this.key))
      {
        return QuestStatus.NOT_READY;
      }

      var wPix = (0,external_kolmafia_namespaceObject.itemAmount)(this.wPixel) + this.canMakePixelCount();

      if (wPix < 15) {
        return QuestStatus.NOT_READY;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.rPixel) < 20) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.retrieveItem)(this.monsterBait);
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "canMakePixelCount", value:

    function canMakePixelCount() {
      return Math.min(
      Math.max(0, (0,external_kolmafia_namespaceObject.itemAmount)(this.rPixel) - 20),
      (0,external_kolmafia_namespaceObject.itemAmount)(this.bPixel),
      (0,external_kolmafia_namespaceObject.itemAmount)(this.gPixel));

    } }]);return QuestMonsterBait;}(QuestKeyStuffAbstract);
;// CONCATENATED MODULE: ./src/quests/custom/QuestFamiliarEquip.ts
function QuestFamiliarEquip_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestFamiliarEquip_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestFamiliarEquip_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestFamiliarEquip_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestFamiliarEquip_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestFamiliarEquip_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



var QuestFamiliarEquip = /*#__PURE__*/function () {function QuestFamiliarEquip() {QuestFamiliarEquip_classCallCheck(this, QuestFamiliarEquip);QuestFamiliarEquip_defineProperty(this, "familiar",
    external_kolmafia_namespaceObject.Familiar.get("Grey Goose"));QuestFamiliarEquip_defineProperty(this, "equip",
    external_kolmafia_namespaceObject.Item.get("Grey Down Vest"));}QuestFamiliarEquip_createClass(QuestFamiliarEquip, [{ key: "getId", value:

    function getId() {
      return "Misc / FamEquip";
    } }, { key: "level", value:

    function level() {
      return 1;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.equip) > 0) {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.familiarWeight)(this.familiar) >= 6 || (0,external_kolmafia_namespaceObject.myMeat)() < 100) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.useFamiliar)(this.familiar);
          (0,external_kolmafia_namespaceObject.maximize)("familiar experience +familiar weight -tie", false);

          while (
          (0,external_kolmafia_namespaceObject.availableAmount)(this.equip) == 0 &&
          (0,external_kolmafia_namespaceObject.familiarWeight)(this.familiar) < 6 &&
          (0,external_kolmafia_namespaceObject.myMeat)() >= 100)
          {
            (0,external_kolmafia_namespaceObject.cliExecute)("train turns 1");
          }
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }]);return QuestFamiliarEquip;}();
;// CONCATENATED MODULE: ./src/quests/custom/QuestFortuneExp.ts
function QuestFortuneExp_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestFortuneExp_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestFortuneExp_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestFortuneExp_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestFortuneExp_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestFortuneExp_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}




var QuestFortuneExp = /*#__PURE__*/function () {function QuestFortuneExp() {QuestFortuneExp_classCallCheck(this, QuestFortuneExp);QuestFortuneExp_defineProperty(this, "fam",
    external_kolmafia_namespaceObject.Familiar.get("Grey Goose"));QuestFortuneExp_defineProperty(this, "equip",
    (0,external_kolmafia_namespaceObject.familiarEquipment)(this.fam));}QuestFortuneExp_createClass(QuestFortuneExp, [{ key: "getId", value:

    function getId() {
      return "Misc / FortuneExp";
    } }, { key: "level", value:

    function level() {
      return 5;
    } }, { key: "status", value:

    function status() {
      if ((0,external_kolmafia_namespaceObject.getProperty)("_clanFortuneBuffUsed") == "true") {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.familiarWeight)(this.fam) > 2 || (0,external_kolmafia_namespaceObject.availableAmount)(this.equip) == 0) {
        return QuestStatus.NOT_READY;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        location: null,
        outfit: new GreyOutfit("-tie"),
        run: () => {
          (0,external_kolmafia_namespaceObject.cliExecute)("fortune buff familiar");
        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "needAdventures", value:

    function needAdventures() {
      return 0;
    } }]);return QuestFortuneExp;}();
;// CONCATENATED MODULE: ./src/quests/custom/QuestPowerLeveling.ts
function QuestPowerLeveling_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestPowerLeveling_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestPowerLeveling_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestPowerLeveling_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestPowerLeveling_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestPowerLeveling_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}









var QuestPowerLeveling = /*#__PURE__*/function () {






  function QuestPowerLeveling(desiredLevel) {QuestPowerLeveling_classCallCheck(this, QuestPowerLeveling);QuestPowerLeveling_defineProperty(this, "property", "greyYouLastPowerLeveled");QuestPowerLeveling_defineProperty(this, "familiar", external_kolmafia_namespaceObject.Familiar.get("Grey Goose"));QuestPowerLeveling_defineProperty(this, "equip", external_kolmafia_namespaceObject.Item.get("Grey Down Vest"));QuestPowerLeveling_defineProperty(this, "desiredLevel", void 0);QuestPowerLeveling_defineProperty(this, "weightRequired", void 0);
    desiredLevel = 1;

    this.desiredLevel = desiredLevel;

    this.weightRequired = this.getWeightNeededToReachLevel(desiredLevel);

    if (this.weightRequired > 20) {
      throw (
        "You want to reach level " +
        desiredLevel +
        " but to do that, the goose would have to weigh " +
        this.weightRequired +
        "...");

    }

    var expNeeded = this.weightRequired ^ 2;

    if ((0,external_kolmafia_namespaceObject.familiarWeight)(this.familiar) <= 1) {
      expNeeded -= 81; // Short order cook
    } else {
      expNeeded -= this.familiar.experience;
    }

    var turns = expNeeded / 5; // Expect to gain 5 exp per arena fight

    if (turns > 20) {
      throw (
        "Sorry, I can't let you do this. That'd burn more than 20 turns to a total of est " +
        turns);

    }
  }QuestPowerLeveling_createClass(QuestPowerLeveling, [{ key: "mustBeDone", value:

    function mustBeDone() {
      return (0,external_kolmafia_namespaceObject.myLevel)() < 5 && (0,external_kolmafia_namespaceObject.myMeat)() >= 100;
    } }, { key: "getWeightNeededToReachLevel", value:

    function getWeightNeededToReachLevel(level) {
      var statsNeeded = this.getStatsRequired(level);

      return 5 + Math.ceil((0,external_kolmafia_namespaceObject.squareRoot)(statsNeeded));
    } }, { key: "getStatsRequired", value:

    function getStatsRequired(level) {
      return (level - 1 ^ 2) + 4 ^ 2;
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "level", value:

    function level() {
      return 0;
    } }, { key: "status", value:

    function status() {
      if (
      (0,external_kolmafia_namespaceObject.myLevel)() >= this.desiredLevel ||
      (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)(this.property)) == (0,external_kolmafia_namespaceObject.myAscensions)())
      {
        return QuestStatus.COMPLETED;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      return {
        outfit: new GreyOutfit("familiar experience -tie"),
        location: null,
        run: () => {
          (0,external_kolmafia_namespaceObject.useFamiliar)(this.familiar);
          (0,external_kolmafia_namespaceObject.maximize)("familiar experience", false);

          var weightNeeded = this.getWeightNeededToReachLevel(this.desiredLevel);

          while (
          (0,external_kolmafia_namespaceObject.familiarWeight)(this.familiar) < weightNeeded &&
          (0,external_kolmafia_namespaceObject.myAdventures)() > 20 &&
          (0,external_kolmafia_namespaceObject.myMeat)() >= 100)
          {
            if (
            (0,external_kolmafia_namespaceObject.equippedAmount)(this.equip) == 0 &&
            (0,external_kolmafia_namespaceObject.availableAmount)(this.equip) > 0)
            {
              (0,external_kolmafia_namespaceObject.equip)(this.equip);
            }

            (0,external_kolmafia_namespaceObject.cliExecute)("train turns 1");
          }

          (0,external_kolmafia_namespaceObject.setProperty)(this.property, (0,external_kolmafia_namespaceObject.myAscensions)() + "");

          if ((0,external_kolmafia_namespaceObject.familiarWeight)(this.familiar) < weightNeeded) {
            throw (
              "Oh god! You are a disappointment Mr Goose! You only weigh " +
              (0,external_kolmafia_namespaceObject.familiarWeight)(this.familiar) +
              " of the " +
              weightNeeded +
              " we wanted!");

            return;
          }

          if ((0,external_kolmafia_namespaceObject.myLevel)() < 4) {
            (0,external_kolmafia_namespaceObject.print)("Now we just need to travel somewhere to burn this exp");

            (0,external_kolmafia_namespaceObject.maximize)(new GreyOutfit().createString(), false);
            greyAdv(
            external_kolmafia_namespaceObject.Location.get("The Dire Warren"),
            null,
            new AdventureSettings().setFinishingBlowMacro(
            Macro.trySkill(external_kolmafia_namespaceObject.Skill.get("Convert Matter to Pomade")).step(
            greyKillingBlow(new GreyOutfit()))));



          }
          // Eh, just burn it in knob as delay.
          // TODO
        } };

    } }, { key: "getId", value:

    function getId() {
      return "Misc / PowerLeveling";
    } }]);return QuestPowerLeveling;}();
;// CONCATENATED MODULE: ./src/quests/custom/QuestBugbearBakery.ts
function QuestBugbearBakery_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestBugbearBakery_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestBugbearBakery_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestBugbearBakery_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestBugbearBakery_arrayLikeToArray(o, minLen);}function QuestBugbearBakery_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestBugbearBakery_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestBugbearBakery_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestBugbearBakery_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestBugbearBakery_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestBugbearBakery_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestBugbearBakery_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





var QuestBugbearBakery = /*#__PURE__*/function () {function QuestBugbearBakery() {QuestBugbearBakery_classCallCheck(this, QuestBugbearBakery);QuestBugbearBakery_defineProperty(this, "asdon",
    external_kolmafia_namespaceObject.Item.get("Asdon Martin keyfob"));QuestBugbearBakery_defineProperty(this, "garage",
    external_kolmafia_namespaceObject.Location.get("The Degrassi Knoll Garage"));QuestBugbearBakery_defineProperty(this, "guard",
    external_kolmafia_namespaceObject.Monster.get("Guard Bugbear"));QuestBugbearBakery_defineProperty(this, "effect",
    external_kolmafia_namespaceObject.Effect.get("Everything Looks Yellow"));QuestBugbearBakery_defineProperty(this, "nanovision",
    external_kolmafia_namespaceObject.Skill.get("Double Nanovision"));}QuestBugbearBakery_createClass(QuestBugbearBakery, [{ key: "getId", value:

    function getId() {
      return "Misc / BugbearBakery";
    } }, { key: "level", value:

    function level() {
      return 6;
    } }, { key: "status", value:

    function status() {
      if (
      (0,external_kolmafia_namespaceObject.haveOutfit)("Bugbear Costume") ||
      !(0,external_kolmafia_namespaceObject.knollAvailable)() && (0,external_kolmafia_namespaceObject.getWorkshed)() != this.asdon)
      {
        return QuestStatus.COMPLETED;
      }

      if ((0,external_kolmafia_namespaceObject.myMeat)() < 200 || (0,external_kolmafia_namespaceObject.isBanished)(this.guard)) {
        return QuestStatus.NOT_READY;
      }

      if (!(0,external_kolmafia_namespaceObject.haveSkill)(this.nanovision)) {
        return QuestStatus.FASTER_LATER;
      }

      return QuestStatus.READY;
    } }, { key: "run", value:

    function run() {
      if ((0,external_kolmafia_namespaceObject.knollAvailable)()) {
        return {
          location: null,
          outfit: new GreyOutfit("-tie"),
          run: () => {var _iterator = QuestBugbearBakery_createForOfIteratorHelper(
            (0,external_kolmafia_namespaceObject.outfitPieces)("Bugbear Costume")),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var item = _step.value;
                (0,external_kolmafia_namespaceObject.cliExecute)("acquire " + item.name);
              }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
          } };

      }

      var outfit = new GreyOutfit().setItemDrops();

      return {
        location: this.garage,
        outfit: outfit,
        run: () => {
          greyAdv(
          this.garage,
          outfit,
          new AdventureSettings().addNoBanish(this.guard));

        } };

    } }, { key: "getLocations", value:

    function getLocations() {
      return [this.garage];
    } }]);return QuestBugbearBakery;}();
;// CONCATENATED MODULE: ./src/quests/QuestsCustom.ts
function QuestsCustom_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestsCustom_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestsCustom_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestsCustom_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestsCustom_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestsCustom_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

























var QuestsCustom = /*#__PURE__*/function () {
  // This is a wrapper class around some of our custom routing goals. Like combat locket or so.



  function QuestsCustom() {QuestsCustom_classCallCheck(this, QuestsCustom);QuestsCustom_defineProperty(this, "quests", []);
    this.quests.push(new QuestInitialStart());
    this.quests.push(new QuestLocketInfiniteLoop());
    this.quests.push(new QuestLocketFantasyRealm());
    this.quests.push(new QuestLocketSystemSweep());
    this.quests.push(new QuestGoblinTortureHarem());
    this.quests.push(new QuestGoblinTortureLab());
    this.quests.push(new QuestDungeonsOfDoom());
    this.quests.push(new QuestGetZapWand());
    this.quests.push(new QuestNPCStuff());
    this.quests.push(new QuestCustomPurchases());
    this.quests.push(new QuestGrabHippyOutfit());
    this.quests.push(new QuestGrabBoatVacation());
    this.quests.push(new QuestGrabBoatJunkyard());
    this.quests.push(new QuestMirrorDupe());
    this.quests.push(new QuestPullZappableKey());
    this.quests.push(new QuestZapKeys());
    this.quests.push(new QuestSkillRegistry());
    this.quests.push(new QuestMonsterBait());
    this.quests.push(new QuestFamiliarEquip());
    this.quests.push(new QuestFortuneExp());
    this.quests.push(new QuestPowerLeveling(4));
    this.quests.push(new QuestBugbearBakery());
  }QuestsCustom_createClass(QuestsCustom, [{ key: "level", value:

    function level() {
      return -1;
    } }, { key: "status", value:

    function status() {
      return QuestStatus.COMPLETED;
    } }, { key: "run", value:

    function run() {
      throw new Error("Method not implemented.");
    } }, { key: "getId", value:

    function getId() {
      return "Misc / Custom";
    } }, { key: "getLocations", value:

    function getLocations() {
      return [];
    } }, { key: "getChildren", value:

    function getChildren() {
      return this.quests;
    } }]);return QuestsCustom;}();
;// CONCATENATED MODULE: ./src/quests/QuestRegistry.ts
function QuestRegistry_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = QuestRegistry_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function QuestRegistry_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return QuestRegistry_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return QuestRegistry_arrayLikeToArray(o, minLen);}function QuestRegistry_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function QuestRegistry_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function QuestRegistry_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function QuestRegistry_createClass(Constructor, protoProps, staticProps) {if (protoProps) QuestRegistry_defineProperties(Constructor.prototype, protoProps);if (staticProps) QuestRegistry_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function QuestRegistry_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



















var QuestRegistry = /*#__PURE__*/function () {


  function QuestRegistry() {QuestRegistry_classCallCheck(this, QuestRegistry);QuestRegistry_defineProperty(this, "map", new Map());
    this.addInfo(new QuestCouncil());
    this.addInfo(new QuestCar());
    this.addInfo(new QuestManorLights());
    this.addInfo(new QuestsCustom());
    this.addInfo(new QuestManor());

    var ordered = this.getQuestOrder();var _iterator = QuestRegistry_createForOfIteratorHelper(

    this.map.keys()),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var type = _step.value;
        if (ordered.includes(type)) {
          continue;
        }

        if (this.map.get(type).level() == -1) {
          continue;
        }

        (0,external_kolmafia_namespaceObject.print)("DEBUG: Quests Ordered does not contain: " + type, "gray");
      }} catch (err) {_iterator.e(err);} finally {_iterator.f();}var _iterator2 = QuestRegistry_createForOfIteratorHelper(

    ordered),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _type = _step2.value;
        if (this.map.has(_type)) {
          continue;
        }

        (0,external_kolmafia_namespaceObject.print)("ERROR! No quest registered for the type '" + _type + "'", "red");
      }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}
  }QuestRegistry_createClass(QuestRegistry, [{ key: "addInfo", value:

    function addInfo(questInfo) {
      var id = questInfo.getId();

      if (id == null) {
        throw "Null quest id found!";
      }

      if (this.map.has(id)) {
        throw "Map already contains the quest '" + id + "'";
      }

      this.map.set(id, questInfo);
      // TODO Add to map

      if (questInfo.getChildren != null) {var _iterator3 = QuestRegistry_createForOfIteratorHelper(
        questInfo.getChildren()),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var child = _step3.value;
            this.addInfo(child);
          }} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}
      }
    } }, { key: "getQuestOrder", value:

    function getQuestOrder() {
      // We get one non-combat at goblin basement from jellyfish
      // Another non-combat at Black panther
      // Goblin only has one -combat to speak of, and its not really worth much?
      // Black is Car > Desert > Forest
      var order = [
      { id: "Quests / Council" },

      { id: "Council / Toot" },
      { id: "Misc / InitialStart" },
      { id: "Misc / PowerLeveling" },
      { id: "Misc / FortuneExp" },

      { id: "CombatLocket / SystemSweep" },
      { id: "CombatLocket / InfiniteLoop" },
      { id: "Misc / FamEquip" },

      { id: "NPC / Meatsmith" },
      { id: "NPC / GnomeSkills" },
      { id: "NPC / Painter", testValid: () => false }, // Takes up to 3 advs so meh, not quest relevant either
      { id: "NPC / Untinkerer" },
      { id: "NPC / Baker" },
      { id: "NPC / Druggie" },
      { id: "Misc / Purchases" },
      { id: "Misc / FriarExp" },
      { id: "Misc / MonsterBait" },

      // We might want system sweep after all! This needs to be cleaned
      { id: "Council / MacGruffin / HiddenCity / HiddenPark" },

      { id: "Skills / Infinite Loop" },
      { id: "Skills / System Sweep" },
      { id: "Skills / HPRegen" },
      { id: "Skills / ScalingItem" },
      { id: "Skills / ScalingMeat" },
      {
        id: "Skills / ScalingDR",
        testValid: () => getQuestStatus("questM20Necklace") > 2 },

      { id: "Skills / Phase Shift" },
      { id: "Skills / Conifer Polymers" },

      // Vines are free kills, why not prioritize them to unlock zones
      { id: "Council / MacGruffin / HiddenCity / Vines" },

      { id: "Misc / ManorLights" },
      { id: "Misc / UnlockDungeonsOfDoom" },
      { id: "Misc / GrabZapWand" },
      {
        id: "Skills / MPRegen",
        testValid: () =>
        (0,external_kolmafia_namespaceObject.myMeat)() >= 5000 ||
        [
        "aluminum wand",
        "ebony wand",
        "hexagonal wand",
        "marble wand",
        "pine wand"].
        find((s) => (0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get(s)) > 0) != null },


      // We do this early so we can grab our hippy outfit asap
      { id: "Boat / Junkyard" },
      { id: "Boat / Vacation" },
      { id: "Council / War / Frat Cargo Shorts" },
      { id: "Council / War / HippyOutfit" },

      // Always try to buy access to the shore, 8-9 adventures spent trying to farm stuff up?
      { id: "Council / MacGruffin / Shore" },
      { id: "Misc / MeatCar", testValid: () => false },
      { id: "Misc / BugbearBakery" },

      // Get goblin done early so we can grab our first -combat skill
      { id: "Council / Goblins / Outskirts" },
      { id: "Council / Goblins / HaremOutfit" },

      { id: "GoblinLabs / LabUnlock" },
      { id: "GoblinLabs / MegUnlock" },

      { id: "Council / MacGruffin / Vacation" },

      // If we don't have the -combat skill, then prioritize the black forest
      {
        id: "Council / MacGruffin / Black",
        testValid: () => !(0,external_kolmafia_namespaceObject.haveSkill)(external_kolmafia_namespaceObject.Skill.get("Photonic Shroud")) },


      { id: "Council / Larva" },

      // We get +3 hot resist from raging bull
      // +3 stench resist from pine bat
      // And the other two skills are manor located
      { id: "Manor / Chat" },
      { id: "Manor / Kitchen" },
      { id: "Manor / Billards" },
      { id: "Manor / Bathroom" },
      { id: "Manor / Gallery" },
      { id: "Manor / Bedroom" },

      { id: "Council / Tower / Keys / DupeMirror" },

      // Do the king cos he's lonely, also has 2k meat
      { id: "Council / Goblins / King" },
      {
        id: "Council / MacGruffin / Desert / StoneRose",
        testValid: () => (0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("Ultrahydrated")) > 0 },

      {
        id: "Council / MacGruffin / Desert / Explore",
        testValid: () => (0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("Ultrahydrated")) > 0 },


      // Register these here, because we want to burn their backups in delay zones
      { id: "Council / Tower / Keys / FantasyBandit" },
      { id: "Council / War / Lobsters" },

      // Get friars done early so we can grab stuff from hell
      { id: "Council / Friars / Heart" },
      { id: "Council / Friars / Elbow" },
      { id: "Council / Friars / Neck" },
      { id: "Council / Friars / TurnIn" },

      // Get this done early so we can start flyering
      { id: "Council / War / FratOutfit" },
      { id: "Council / War / Start" },
      { id: "Council / War / Flyers" },

      // If we have the skill, then this doesn't need prioritizing as such
      {
        id: "Council / MacGruffin / Black",
        testValid: () => (0,external_kolmafia_namespaceObject.haveSkill)(external_kolmafia_namespaceObject.Skill.get("Photonic Shroud")) },

      { id: "Skills / Photonic Shroud" },

      { id: "Council / MacGruffin / Temple / Unlock" },
      { id: "Council / MacGruffin / Temple / GrabWool" },
      { id: "Council / MacGruffin / Temple / Nostril" },
      { id: "Council / MacGruffin / Temple / HiddenCity" },

      // Now we do our bowling, we prioritize this because of special code that has the bowling ball with combat turns = 0
      // We also prioritize it for double nanovision
      { id: "Council / MacGruffin / HiddenCity / BookOfMatches" },
      { id: "Council / MacGruffin / HiddenCity / Bowling" },

      // Do library after we should have system sweep stuff
      { id: "Manor / Library" },

      // Crypt does give us meat hmm
      { id: "Council / Crypt / Sprinters" },
      { id: "Council / Crypt / Eyes" },

      { id: "Council / Bats / Sonars" },
      { id: "Council / Bats / UnlockLeft" },

      // We've unlocked the left way, just do shen and hopefully we unlock right without actually burning extra turns
      { id: "Council / MacGruffin / Shen / Meet" },
      { id: "Council / MacGruffin / Shen / Bats" },
      { id: "Council / MacGruffin / Shen / TurnIn" },

      // Unlock ninja tower
      { id: "Council / Ice / Trapper" },
      { id: "Council / Ice / Goats" },
      { id: "Council / Ice / OreOutfit" },
      { id: "Council / Ice / OreMining" },
      { id: "Council / Ice / OreClover" },
      { id: "Council / Ice / MountainMan" },

      // Ninja power!
      { id: "Council / MacGruffin / Shen / Ninjas" },

      // Try unlock right bats if not unlocked
      { id: "Council / Bats / UnlockRight" },

      // Hunt for enchanted beans
      { id: "Council / Beanstalk / EnchantedBean" },
      { id: "Council / Beanstalk / Ship" },
      { id: "Council / Beanstalk / Basement" },
      { id: "Council / Beanstalk / Ground" },
      // We're now trying to do the top stuff yay
      { id: "Council / Beanstalk / Top" },

      // If we still haven't unlocked from doing our top castle, lets try unlock our hole in sky
      { id: "Council / Tower / Keys / HoleInSkyUnlock" },
      // Oh wow, hole in sky unlocked but still no boss. Lets just do it manually.
      { id: "Council / MacGruffin / Shen / Giants" },

      { id: "Council / MacGruffin / Ron / Crowd" },
      { id: "Council / MacGruffin / Ron / Zepp" },

      // Palin needs Ron and Shen done
      { id: "Council / MacGruffin / Palin / Book" },
      { id: "Council / MacGruffin / Palin / WetStew" },
      { id: "Council / MacGruffin / Palin / Boss" },
      { id: "Skills / Piezoelectric Honk" },

      // Ninja needs +combat, so delay it until we've finished Shen and grabbed our +combat skill from Palin
      { id: "Council / Ice / Ninjas" },
      // We earn a cold damage skill, so may as well. We also get meats
      { id: "Council / Ice / Boss" },

      // Given we earn nothing but meat, delays for days
      { id: "Council / Bats / UnlockBoss" },
      { id: "Council / Bats / Boss" },

      // We do shaman first to potentially grab extra accountant stuff
      { id: "Council / MacGruffin / HiddenCity / Curses" },

      { id: "Council / MacGruffin / HiddenCity / Accountants" },

      // Meh
      { id: "Council / MacGruffin / HiddenCity / Doctor" },

      // Meh
      { id: "Council / MacGruffin / HiddenCity / Boss" },

      // Nothing interesting from desert and pyramid yawn
      { id: "Council / MacGruffin / Desert / Compass" },

      { id: "Council / MacGruffin / Desert / WormRide" },
      { id: "Council / MacGruffin / Desert / Gnome" },
      {
        id: "Council / MacGruffin / Desert / StoneRose",
        testValid: () => (0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("Ultrahydrated")) == 0 },

      {
        id: "Council / MacGruffin / Desert / Explore",
        testValid: () => (0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("Ultrahydrated")) == 0 },


      // Unlock cellar
      { id: "Council / MacGruffin / Manor / Ballroom" },
      { id: "Council / MacGruffin / Manor / Recipe" },
      { id: "Council / MacGruffin / Manor / Soda" },
      { id: "Council / MacGruffin / Manor / Wine" },
      { id: "Council / MacGruffin / Manor / Bomb" },
      { id: "Council / MacGruffin / Manor / Boss" },

      // Nothing special from the top of the pyramid, but burn some turns here anyways
      { id: "Council / MacGruffin / Pyramid / Top" },

      // Tavern needs Larva done
      { id: "Council / Tavern" },

      // Alright, unlock the control room and the undying man. And keep going until you have enough rats
      { id: "Council / MacGruffin / Pyramid / Middle" },
      { id: "Council / MacGruffin / Pyramid / Wheel" },
      { id: "Council / MacGruffin / Pyramid / EdUndying" },

      // Given we earn nothing from crypt..
      { id: "Council / Crypt / Rattling" },
      { id: "Council / Crypt / DirtyMan" },
      { id: "Council / Crypt / Boss" },

      { id: "Skills / ColdDamage15" },
      { id: "Skills / ColdDamage10" },

      // Given that we earn nothing from peaks, just delay it until we should've hit our max +cold damage
      // { id: "Council / Peaks / CargoShortsSmut" },
      { id: "Council / Peaks / Orcs" },
      { id: "Council / Peaks / AbooPeak" },
      { id: "Council / Peaks / TwinPeak" },
      { id: "Council / Peaks / OilPeak" },
      { id: "Council / Peaks / Lord" },

      // OMG who cares about your stupid war
      { id: "Council / War / Gremlins" },
      { id: "Council / War / Battlefield" },
      { id: "Council / War / Filthworms" },
      { id: "Council / War / Boss" },

      // Alright, this run is just about over kids. Lets finish it.
      { id: "Council / Tower / Contests" },
      { id: "Council / Tower / Maze" },

      { id: "Council / Tower / Keys / PullZappableKey" },
      { id: "Council / Tower / Keys / ZapKeys" },
      { id: "Council / Tower / Keys / DailyDungeon" },
      { id: "Council / Tower / Keys / Digital" },
      { id: "Council / Tower / Keys / Star" },
      { id: "Council / Tower / Keys / Skeleton" },

      { id: "Council / War / Nuns" },

      // By the time we hit this, we should 100% have our keys
      { id: "Council / Tower / KeyDoor" },

      { id: "Council / Tower / WallOfSkin / Beehive" },
      { id: "Council / Tower / WallOfSkin" },

      { id: "Council / Tower / WallOfMeat" },

      { id: "Council / Tower / WallOfBones / BoningKnife" },
      { id: "Council / Tower / WallOfBones" },

      { id: "Council / Tower / Shadow" },
      { id: "Council / Tower / Mirror" },
      { id: "Council / Tower / NaughtyBoss" }];


      return order.
      filter((order) => order.testValid == null || order.testValid()).
      map((order) => order.id);
    } }, { key: "getQuestsInOrder", value:

    function getQuestsInOrder() {
      var quests = [];var _iterator4 = QuestRegistry_createForOfIteratorHelper(

      this.getQuestOrder()),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var questType = _step4.value;
          var info = this.map.get(questType);

          if (info == null) {
            continue;
          }

          quests.push(info);
        }} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}

      return quests;
    } }]);return QuestRegistry;}();
;// CONCATENATED MODULE: ./src/GreyChooser.ts
function GreyChooser_toConsumableArray(arr) {return GreyChooser_arrayWithoutHoles(arr) || GreyChooser_iterableToArray(arr) || GreyChooser_unsupportedIterableToArray(arr) || GreyChooser_nonIterableSpread();}function GreyChooser_nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function GreyChooser_iterableToArray(iter) {if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);}function GreyChooser_arrayWithoutHoles(arr) {if (Array.isArray(arr)) return GreyChooser_arrayLikeToArray(arr);}function GreyChooser_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = GreyChooser_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function GreyChooser_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return GreyChooser_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return GreyChooser_arrayLikeToArray(o, minLen);}function GreyChooser_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function GreyChooser_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function GreyChooser_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function GreyChooser_createClass(Constructor, protoProps, staticProps) {if (protoProps) GreyChooser_defineProperties(Constructor.prototype, protoProps);if (staticProps) GreyChooser_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function GreyChooser_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}















var AdventureFinder = /*#__PURE__*/function () {function AdventureFinder() {GreyChooser_classCallCheck(this, AdventureFinder);GreyChooser_defineProperty(this, "defeated", void 0);GreyChooser_defineProperty(this, "viableQuests", void 0);GreyChooser_defineProperty(this, "quester",


    new GreyQuester());GreyChooser_defineProperty(this, "absorbs",
    new AbsorbsProvider());GreyChooser_defineProperty(this, "goose",
    external_kolmafia_namespaceObject.Familiar.get("Grey Goose"));GreyChooser_defineProperty(this, "goodAbsorbs", void 0);GreyChooser_defineProperty(this, "questLocations", void 0);GreyChooser_defineProperty(this, "resources", void 0);}GreyChooser_createClass(AdventureFinder, [{ key: "start", value:




    function start() {
      this.setPreAbsorbs();
      this.doResourceClaims();
      this.viableQuests = this.quester.getDoableQuests();
      this.setAbsorbs();
      this.defeated = this.absorbs.getAbsorbedMonstersFromInstance();
      this.goodAbsorbs = this.absorbs.getExtraAdventures(this.defeated, true);
      this.setQuestLocations();
    } }, { key: "noteResourceClaims", value:

    function noteResourceClaims() {
      for (var _i = 0, _Object$keys = Object.keys(ResourceType); _i < _Object$keys.length; _i++) {var resourceType = _Object$keys[_i];
        var id = ResourceType[resourceType];

        (0,external_kolmafia_namespaceObject.print)(resourceType);
        var totalDesired = 0;var _iterator = GreyChooser_createForOfIteratorHelper(

        this.resources),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var claim = _step.value;
            if (claim.resource != id) {
              continue;
            }

            (0,external_kolmafia_namespaceObject.print)(
            claim.reason +
            " - Wants " +
            claim.amountDesired +
            " - saves " +
            claim.turnsSaved);


            totalDesired += claim.amountDesired;
          }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

        if (totalDesired > ResourceClaim.getResourcesLeft(id)) {
          (0,external_kolmafia_namespaceObject.print)(
          "We want to use " +
          totalDesired +
          " but we only have " +
          ResourceClaim.getResourcesLeft(id) +
          " left on " +
          resourceType,
          "red");

        }
      }
    } }, { key: "doResourceClaims", value:

    function doResourceClaims() {
      this.resources = [];var _iterator2 = GreyChooser_createForOfIteratorHelper(

      this.quester.getAllQuests()),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _this$resources;var quest = _step2.value;
          if (quest.level() < 1 || quest.getResourceClaims == null) {
            continue;
          }

          if (quest.status() == QuestStatus.COMPLETED) {
            continue;
          }

          (_this$resources = this.resources).push.apply(_this$resources, GreyChooser_toConsumableArray(quest.getResourceClaims()));
        }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}
    } }, { key: "setPreAbsorbs", value:

    function setPreAbsorbs() {
      var defeated = this.absorbs.getAbsorbedMonstersFromInstance();var _iterator3 = GreyChooser_createForOfIteratorHelper(

      this.quester.getAllQuests()),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var quest = _step3.value;
          quest.toAbsorb = [];var _iterator4 = GreyChooser_createForOfIteratorHelper(

          quest.getLocations()),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _quest$toAbsorb;var loc = _step4.value;
              var result = this.absorbs.getAdventuresInLocation(defeated, loc);

              if (result == null) {
                continue;
              }

              (_quest$toAbsorb = quest.toAbsorb).push.apply(_quest$toAbsorb, GreyChooser_toConsumableArray(result.monsters));
            }} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}
        }} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}
    } }, { key: "setAbsorbs", value:

    function setAbsorbs() {
      var defeated = this.absorbs.getAbsorbedMonstersFromInstance();var _iterator5 = GreyChooser_createForOfIteratorHelper(

      this.quester.getAllQuests()),_step5;try {for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {var quest = _step5.value;
          if (
          quest.status() == QuestStatus.NOT_READY ||
          quest.status() == QuestStatus.COMPLETED)
          {
            continue;
          }

          var run = quest.run();

          if (run.location == null) {
            continue;
          }

          var result = this.absorbs.getAdventuresInLocation(defeated, run.location);

          quest.toAbsorb = result == null ? [] : result.monsters;
        }} catch (err) {_iterator5.e(err);} finally {_iterator5.f();}
    } }, { key: "setQuestLocations", value:

    function setQuestLocations() {
      this.questLocations = [];var _iterator6 = GreyChooser_createForOfIteratorHelper(

      this.quester.getAllQuests()),_step6;try {for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {var _this$questLocations;var quest = _step6.value;
          if (quest.status() == QuestStatus.COMPLETED) {
            continue;
          }

          (_this$questLocations = this.questLocations).push.apply(_this$questLocations, GreyChooser_toConsumableArray(quest.getLocations()));
        }} catch (err) {_iterator6.e(err);} finally {_iterator6.f();}
    } }, { key: "hasEnoughGooseWeight", value:

    function hasEnoughGooseWeight() {
      return (0,external_kolmafia_namespaceObject.familiarWeight)(this.goose) >= 6;
    } }, { key: "getQuestsWithAdventures", value:

    function getQuestsWithAdventures() {
      // We want to generate our adventues

      var toReturn = [];

      this.viableQuests.forEach((q) => {
        var run = q.run();

        if (run.location == null) {
          return;
        }

        var outfit = run.outfit;

        if (
        outfit != null && (
        outfit.minusCombatWeight > 0 && hasCombatSkillActive() ||
        outfit.plusCombatWeight > 0 && hasNonCombatSkillActive()))
        {
          return;
        }

        var advs = this.absorbs.getAdventuresInLocation(
        this.defeated,
        run.location);


        if (advs == null || advs.turnsToGain == 0) {
          return;
        }

        toReturn.push([q, advs]);
      });

      toReturn.sort((q1, q2) => {
        if (q1[0].status() != q2[0].status()) {
          return 0;
        }

        return q1[1].turnsToGain - q2[1].turnsToGain;
      });

      return toReturn;
    } }, { key: "getQuestsWithoutAdventures", value:

    function getQuestsWithoutAdventures() {
      // We want to level up our goose here

      var toReturn = [];

      this.viableQuests.forEach((q) => {
        var run = q.run();

        var outfit = run.outfit;

        if (
        outfit != null && (
        outfit.minusCombatWeight > 0 && hasCombatSkillActive() ||
        outfit.plusCombatWeight > 0 && hasNonCombatSkillActive()))
        {
          return;
        }

        if (run.location == null) {
          toReturn.push([q, null]);
          return;
        }

        var advs = this.absorbs.getAdventuresInLocation(
        this.defeated,
        run.location,
        true);


        if (advs != null && advs.turnsToGain > 0) {
          return;
        }

        toReturn.push([q, advs]);
      });

      return toReturn;
    } }, { key: "getNonQuestsWithSkills", value:

    function getNonQuestsWithSkills() {
      var toReturn = this.goodAbsorbs.
      filter(
      (a) =>
      a.skills.size > 0 &&
      (0,external_canadv_ash_namespaceObject.canAdv)(a.location) &&
      !this.questLocations.includes(a.location)).

      map((a) => {
        return [a, a.expectedTurnsProfit + this.generateWeights(a.skills) / 10];
      });

      return toReturn.filter((a) => a[1] > 0);
    } }, { key: "getNonQuestsWithAdventures", value:

    function getNonQuestsWithAdventures() {
      // We want to generate our adventues
      // Returns a location and the adventures generated, with helpful skills given a weight / 10

      var toReturn = this.goodAbsorbs.
      filter(
      (a) =>
      a.expectedTurnsProfit >= 0 &&
      (0,external_canadv_ash_namespaceObject.canAdv)(a.location) &&
      !this.questLocations.includes(a.location)).

      map((a) => {
        return [a, a.expectedTurnsProfit + this.generateWeights(a.skills) / 10];
      });

      return toReturn.filter((a) => a[1] > 0);
    } }, { key: "getNonQuestsWithoutAdventures", value:

    function getNonQuestsWithoutAdventures() {
      // We want to level up our goose here, and grab w/e required skills
      // Returns locations and the weight, where helpful skills are weight of 1, required are weight of 2

      var toReturn = this.goodAbsorbs.
      filter(
      (a) =>
      a.turnsToGain == 0 &&
      (0,external_canadv_ash_namespaceObject.canAdv)(a.location) &&
      !this.questLocations.includes(a.location)).

      map((a) => {
        return [a, this.generateWeights(a.skills)];
      });

      return toReturn.filter((a) => a[1] > 0);
    } }, { key: "generateWeights", value:

    function generateWeights(skills) {
      var weight = 0;
      var handy = this.absorbs.getUsefulSkills();
      var mustHave = this.absorbs.getMustHaveSkills();var _iterator7 = GreyChooser_createForOfIteratorHelper(

      skills.keys()),_step7;try {for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {var k = _step7.value;
          var w = 0;

          if (!GreySettings.speedRunMode && handy.has(k.skill)) {
            //   w = GreySettings.handySkillsWeight;
          } else if (mustHave.has(k.skill)) {
            w = GreySettings.usefulSkillsWeight;
          } else {
            continue;
          }

          weight += w;
        }} catch (err) {_iterator7.e(err);} finally {_iterator7.f();}

      return weight;
    } }, { key: "getRecommendedFamiliars", value:

    function getRecommendedFamiliars() {
      return this.quester.
      getAllQuests().
      map((q) => {
        if (q.hasFamiliarRecommendation == null) {
          return null;
        }

        var fam = q.hasFamiliarRecommendation();

        if (fam == null) {
          return null;
        }

        var status = q.status();

        if (status == QuestStatus.COMPLETED) {
          return null;
        }

        return fam;
      }).
      filter((f) => f != null);
    } }, { key: "getQuestColor", value:

    function getQuestColor(status) {
      switch (status) {
        case QuestStatus.COMPLETED:
          return "green";
        case QuestStatus.FASTER_LATER:
          return "gray";
        case QuestStatus.NOT_READY:
          return "red";
        case QuestStatus.READY:
          return "green";}

    } }, { key: "printStatus", value:

    function printStatus() {var _iterator8 = GreyChooser_createForOfIteratorHelper(
      this.viableQuests),_step8;try {for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {var quest = _step8.value;
          var status = quest.status();

          var line =
          "<u>" +
          quest.getId() +
          "</u>: " +
          doColor(QuestStatus[status], this.getQuestColor(status));

          (0,external_kolmafia_namespaceObject.printHtml)(line);
        }} catch (err) {_iterator8.e(err);} finally {_iterator8.f();}
    } }, { key: "findGoodVisit", value:

    function findGoodVisit() {
      var abortNotEnoughAdventures =
      (0,external_kolmafia_namespaceObject.myAdventures)() <= GreySettings.adventuresBeforeAbort;
      var generateAdventuresOrAbort =
      (0,external_kolmafia_namespaceObject.myAdventures)() <= GreySettings.adventuresGenerateIfPossibleOrAbort;

      if (abortNotEnoughAdventures) {
        (0,external_kolmafia_namespaceObject.print)(
        "We don't have enough adventures to feel comfortable, aborting..",
        "red");

        return;
      }

      var mustBeDone = this.viableQuests.filter(
      (q) => q.mustBeDone != null && q.mustBeDone());


      if (
      mustBeDone.length > 1 &&
      mustBeDone.filter(
      (m) => m.needAdventures == null || m.needAdventures() > 0).
      length <= 1)
      {
        mustBeDone = mustBeDone.filter(
        (m) => m.needAdventures != null && m.needAdventures() <= 0);


        if (mustBeDone.length > 1) {
          mustBeDone = mustBeDone.splice(1);
        }
      }

      if (mustBeDone.length > 1) {
        throw (
          "Multiple quests demand to be done! " +
          mustBeDone.map((q) => q.getId()).join(", "));

      }

      if (mustBeDone.length == 1) {
        return {
          quest: mustBeDone[0],
          locationInfo: this.absorbs.getAdventuresInLocation(
          this.defeated,
          mustBeDone[0].run().location,
          true) };


      }

      if (generateAdventuresOrAbort && !this.hasEnoughGooseWeight()) {
        (0,external_kolmafia_namespaceObject.print)(
        "We need more adventures but we're not ready for a reabsorb..",
        "red");

        return;
      }

      var hasBlessing =
      (0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("Brother Corsican's Blessing")) +
      (0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("A Girl Named Sue")) >
      0;

      var quests = [];
      var nonQuests = [];

      if (this.hasEnoughGooseWeight() && (0,external_kolmafia_namespaceObject.myLevel)() >= 5) {
        quests = this.getQuestsWithAdventures();
        nonQuests = this.getNonQuestsWithAdventures();
      } else {
        // It doesn't have enough goose weight to absorb adventures, so lets try do non-quests without adventures
        // This is mostly skills
        nonQuests = this.getNonQuestsWithoutAdventures();
      }

      if (quests.length + nonQuests.length == 0) {
        quests = this.getQuestsWithoutAdventures();

        if (quests.length == 0 && nonQuests.length == 0) {
          quests = this.getQuestsWithAdventures();
        }
      }

      // Now we see if we can find quests that are ready to run.
      // If we can't, then we see if we can find non-quests that are ready to run
      // If we can't, then we see if we can find quests that don't want to run
      // If we can't, then we abort.

      var bestQuest;
      var bestStatus;
      var bestWantsResetOrb;
      var predicts;

      var getPredicts = () => {
        if (predicts == null) {
          predicts = currentPredictions();
        }

        return predicts;
      };var _iterator9 = GreyChooser_createForOfIteratorHelper(

      quests),_step9;try {for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {var quest = _step9.value;
          var status = quest[0].status();
          var runned = void 0;
          var wantToResetOrb = false;

          if (
          this.hasEnoughGooseWeight() &&
          quest[1] != null &&
          quest[1].monsters.length > 0)
          {
            var a = quest[1];
            runned = quest[0].run();

            var current = getPredicts().get(a.location);

            if (current == null || a.monsters.includes(current)) {
              a.shouldRunOrb = true;

              if (
              current != null &&
              this.hasEnoughGooseWeight() &&
              a.turnsToGain > 0)
              {
                a.expectedTurnsProfit = a.turnsToGain - 1;
              }
            } else {
              wantToResetOrb = true;
            }
          }

          if (status == QuestStatus.READY) {
            if (runned == null) {
              runned = quest[0].run();
            }

            var outfit = runned.outfit;

            if (outfit != null) {
              if (outfit.minusCombatWeight > 0 && hasBlessing) {
                status = QuestStatus.FASTER_LATER;
              } else if ((0,external_kolmafia_namespaceObject.myMp)() < 50) {
                if (outfit.minusCombatWeight > 0 && !hasNonCombatSkillActive()) {
                  status = QuestStatus.FASTER_LATER;
                } else if (!hasCombatSkillActive() && outfit.plusCombatWeight > 0) {
                  status = QuestStatus.FASTER_LATER;
                }
              }
            }
          }

          if (
          bestQuest != null && bestWantsResetOrb && !wantToResetOrb ?
          status > bestStatus :
          status >= bestStatus)
          {
            continue;
          }

          bestQuest = quest;
          bestStatus = quest[0].status();
          bestWantsResetOrb = wantToResetOrb;
        }} catch (err) {_iterator9.e(err);} finally {_iterator9.f();}

      if (bestQuest != null && bestQuest[0].status() == QuestStatus.READY) {
        return {
          quest: bestQuest[0],
          locationInfo: bestQuest[1] };

      }

      nonQuests.sort((v1, v2) => v2[1] - v1[1]);

      if (nonQuests.length > 0) {
        var best;var _iterator10 = GreyChooser_createForOfIteratorHelper(

        nonQuests),_step10;try {for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {var non = _step10.value;
            var mon = getPredicts().get(non[0].location);

            non[0].shouldRunOrb =
            this.hasEnoughGooseWeight() && (
            mon == null || non[0].monsters.includes(mon));

            // If we already have a best, and the would-be doesn't want to run orb
            if (best != null && !non[0].shouldRunOrb) {
              continue;
            }

            best = non[0];

            if (best.shouldRunOrb) {
              break;
            }
          }} catch (err) {_iterator10.e(err);} finally {_iterator10.f();}

        return {
          quest: null,
          locationInfo: best };

      }

      if (bestQuest != null) {
        return {
          quest: bestQuest[0],
          locationInfo: bestQuest[1] };

      }

      (0,external_kolmafia_namespaceObject.print)(
      "Failed to find any quests that are willing to run, and failed to find any non-quest locations willing to run.",
      "red");

      return null;
    } }]);return AdventureFinder;}();var


GreyQuester = /*#__PURE__*/function () {function GreyQuester() {GreyChooser_classCallCheck(this, GreyQuester);GreyChooser_defineProperty(this, "registry",
    new QuestRegistry());}GreyChooser_createClass(GreyQuester, [{ key: "getAllQuests", value:

    function getAllQuests() {
      return this.registry.getQuestsInOrder();
    } }, { key: "getDoableQuests", value:

    function getDoableQuests() {
      var quests = [];

      var tryAdd = (q) => {
        if (q.level() > (0,external_kolmafia_namespaceObject.myLevel)()) {
          return;
        }

        if (
        q.level() * ((0,external_kolmafia_namespaceObject.haveSkill)(external_kolmafia_namespaceObject.Skill.get("Infinite Loop")) ? 1 : 6) >
        (0,external_kolmafia_namespaceObject.myBasestat)(external_kolmafia_namespaceObject.Stat.get("Muscle")))
        {
          return;
        }

        var status = q.status();

        if (status == QuestStatus.NOT_READY || status == QuestStatus.COMPLETED) {
          return;
        }

        quests.push(q);
      };

      this.getAllQuests().forEach((q) => {
        tryAdd(q);
      });

      return quests;
    } }]);return GreyQuester;}();
;// CONCATENATED MODULE: ./src/tasks/TaskCouncil.ts
function TaskCouncil_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function TaskCouncil_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function TaskCouncil_createClass(Constructor, protoProps, staticProps) {if (protoProps) TaskCouncil_defineProperties(Constructor.prototype, protoProps);if (staticProps) TaskCouncil_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function TaskCouncil_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


var TaskCouncil = /*#__PURE__*/function () {function TaskCouncil() {TaskCouncil_classCallCheck(this, TaskCouncil);TaskCouncil_defineProperty(this, "lastLevelVisited",
    (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastCouncilVisit")));}TaskCouncil_createClass(TaskCouncil, [{ key: "run", value:

    function run() {
      this.lastLevelVisited = Math.min(
      (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("lastCouncilVisit")),
      this.lastLevelVisited);


      if (this.lastLevelVisited >= (0,external_kolmafia_namespaceObject.myLevel)()) {
        return;
      }

      (0,external_kolmafia_namespaceObject.council)();
      this.lastLevelVisited = (0,external_kolmafia_namespaceObject.myLevel)();
      (0,external_kolmafia_namespaceObject.cliExecute)("refresh inventory");
    } }]);return TaskCouncil;}();
;// CONCATENATED MODULE: ./src/tasks/TaskEater.ts
function TaskEater_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = TaskEater_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function TaskEater_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return TaskEater_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return TaskEater_arrayLikeToArray(o, minLen);}function TaskEater_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function TaskEater_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function TaskEater_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function TaskEater_createClass(Constructor, protoProps, staticProps) {if (protoProps) TaskEater_defineProperties(Constructor.prototype, protoProps);if (staticProps) TaskEater_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function TaskEater_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



var TaskEater = /*#__PURE__*/function () {











  function TaskEater() {TaskEater_classCallCheck(this, TaskEater);TaskEater_defineProperty(this, "prop", "_greyEatenToday");TaskEater_defineProperty(this, "npcFoods", ["Hot buttered roll", "Ketchup", "Catsup", "cup of lukewarm tea", "Fortune Cookie", "Pickled Egg"].map((s) => external_kolmafia_namespaceObject.Item.get(s)));TaskEater_defineProperty(this, "blackberry", external_kolmafia_namespaceObject.Item.get("Blackberry"));
    if ((0,external_kolmafia_namespaceObject.getProperty)(this.prop) == "") {
      var dontEat = [];
      // Goat cheese quest
      dontEat.push(external_kolmafia_namespaceObject.Item.get("Goat Cheese"));

      // Are you sure you want to eat this bla bla
      // Suppress that annoying "pvp stone no brokey??"
      dontEat.push(external_kolmafia_namespaceObject.Item.get("Can of Red Minotaur"));

      // Palin quest items
      dontEat.push(external_kolmafia_namespaceObject.Item.get("Stunt Nuts"));
      dontEat.push(external_kolmafia_namespaceObject.Item.get("Wet Stew"));

      // Azeal booze quest items
      dontEat.push(external_kolmafia_namespaceObject.Item.get("Giant marshmallow"));
      dontEat.push(external_kolmafia_namespaceObject.Item.get("Booze-soaked cherry"));
      dontEat.push(external_kolmafia_namespaceObject.Item.get("Sponge cake"));
      dontEat.push(external_kolmafia_namespaceObject.Item.get("Gin-soaked blotter paper"));

      (0,external_kolmafia_namespaceObject.setProperty)(this.prop, dontEat.map((s) => (0,external_kolmafia_namespaceObject.toInt)(s)).join(","));
    }
  }TaskEater_createClass(TaskEater, [{ key: "doAlwaysAvailable", value:

    function doAlwaysAvailable(eaten) {
      if ((0,external_kolmafia_namespaceObject.myMeat)() < 2000) {
        return;
      }var _iterator = TaskEater_createForOfIteratorHelper(

      this.npcFoods),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var item = _step.value;
          var id = (0,external_kolmafia_namespaceObject.toInt)(item).toString();

          if (eaten.includes(id)) {
            continue;
          }

          (0,external_kolmafia_namespaceObject.cliExecute)("acquire 1 " + item.name);
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
    } }, { key: "doChez", value:

    function doChez(eaten) {
      if (!(0,external_kolmafia_namespaceObject.canadiaAvailable)() || (0,external_kolmafia_namespaceObject.myMeat)() < 2000) {
        return;
      }

      var daily = (0,external_kolmafia_namespaceObject.toInt)(external_kolmafia_namespaceObject.Item.get((0,external_kolmafia_namespaceObject.getProperty)("_dailySpecial"))).toString();

      if (eaten.includes(daily)) {
        return;
      }

      eaten.push(daily);

      for (var _i = 0, _arr = ["-1", "-2", "-3", daily]; _i < _arr.length; _i++) {var itemId = _arr[_i];
        (0,external_kolmafia_namespaceObject.visitUrl)("cafe.php?cafeid=1&pwd=&action=CONSUME!&whichitem=" + itemId);
      }
    } }, { key: "doGnomes", value:

    function doGnomes(eaten) {
      if (!(0,external_kolmafia_namespaceObject.gnomadsAvailable)() || (0,external_kolmafia_namespaceObject.myMeat)() < 2000) {
        return;
      }

      var daily = (0,external_kolmafia_namespaceObject.toInt)(external_kolmafia_namespaceObject.Item.get((0,external_kolmafia_namespaceObject.getProperty)("_dailySpecial"))).toString();

      if (eaten.includes(daily)) {
        return;
      }

      eaten.push(daily);

      for (var _i2 = 0, _arr2 = ["-1", "-2", "-3", daily]; _i2 < _arr2.length; _i2++) {var itemId = _arr2[_i2];
        (0,external_kolmafia_namespaceObject.visitUrl)("cafe.php?cafeid=2&pwd=&action=CONSUME!&whichitem=" + itemId);
      }
    } }, { key: "run", value:

    function run() {
      if ((0,external_kolmafia_namespaceObject.pullsRemaining)() == -1) {
        return;
      }

      var eaten = (0,external_kolmafia_namespaceObject.getProperty)(this.prop).split(",");

      this.doAlwaysAvailable(eaten);
      this.doChez(eaten);
      this.doGnomes(eaten);

      for (var _i3 = 0, _Object$keys = Object.keys((0,external_kolmafia_namespaceObject.getInventory)()); _i3 < _Object$keys.length; _i3++) {var i = _Object$keys[_i3];
        var item = external_kolmafia_namespaceObject.Item.get(i);

        if (item.fullness == 0 && item.inebriety == 0 && item.spleen == 0) {
          continue;
        }

        if (item.levelreq > (0,external_kolmafia_namespaceObject.myLevel)() || !item.tradeable || item.quest) {
          continue;
        }

        if (eaten.includes((0,external_kolmafia_namespaceObject.toInt)(item) + "") || (0,external_kolmafia_namespaceObject.historicalPrice)(item) > 4000) {
          continue;
        }

        if (item == this.blackberry && getQuestStatus("questL11Black") <= 1) {
          continue;
        }

        if (item.fullness > 0) {
          (0,external_kolmafia_namespaceObject.eatsilent)(item);
        } else if (item.inebriety > 0) {
          (0,external_kolmafia_namespaceObject.drinksilent)(item);
        } else if (item.spleen > 0) {
          (0,external_kolmafia_namespaceObject.chew)(item);
        }

        eaten.push((0,external_kolmafia_namespaceObject.toInt)(item).toString());
      }

      (0,external_kolmafia_namespaceObject.setProperty)(this.prop, eaten.join(","));
    } }, { key: "tryMakeCraftables", value:

    function tryMakeCraftables() {} }]);return TaskEater;}();
;// CONCATENATED MODULE: ./src/tasks/TaskFuelAsdon.ts
function TaskFuelAsdon_slicedToArray(arr, i) {return TaskFuelAsdon_arrayWithHoles(arr) || TaskFuelAsdon_iterableToArrayLimit(arr, i) || TaskFuelAsdon_unsupportedIterableToArray(arr, i) || TaskFuelAsdon_nonIterableRest();}function TaskFuelAsdon_nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function TaskFuelAsdon_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return TaskFuelAsdon_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return TaskFuelAsdon_arrayLikeToArray(o, minLen);}function TaskFuelAsdon_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function TaskFuelAsdon_iterableToArrayLimit(arr, i) {var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];if (_i == null) return;var _arr = [];var _n = true;var _d = false;var _s, _e;try {for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function TaskFuelAsdon_arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function TaskFuelAsdon_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function TaskFuelAsdon_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function TaskFuelAsdon_createClass(Constructor, protoProps, staticProps) {if (protoProps) TaskFuelAsdon_defineProperties(Constructor.prototype, protoProps);if (staticProps) TaskFuelAsdon_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function TaskFuelAsdon_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


var TaskFuelAsdon = /*#__PURE__*/function () {function TaskFuelAsdon() {TaskFuelAsdon_classCallCheck(this, TaskFuelAsdon);TaskFuelAsdon_defineProperty(this, "sodaBread",
    external_kolmafia_namespaceObject.Item.get("Loaf of Soda Bread"));TaskFuelAsdon_defineProperty(this, "eachFuelWorth",
    24);TaskFuelAsdon_defineProperty(this, "invalidFuels",
    []);TaskFuelAsdon_defineProperty(this, "asdonMartin",
    external_kolmafia_namespaceObject.Item.get("Asdon Martin keyfob"));}TaskFuelAsdon_createClass(TaskFuelAsdon, [{ key: "run", value:

    function run() {
      if ((0,external_kolmafia_namespaceObject.myMeat)() < 1500 || (0,external_kolmafia_namespaceObject.getWorkshed)() != this.asdonMartin) {
        return;
      }

      if ((0,external_kolmafia_namespaceObject.getFuel)() >= 150 || !(0,external_kolmafia_namespaceObject.haveOutfit)("Bugbear Costume")) {
        return;
      }

      while ((0,external_kolmafia_namespaceObject.myMeat)() > 1500 && (0,external_kolmafia_namespaceObject.getFuel)() < 50) {
        // Each soda bread is worth 5-7 so lets always keep 50 / 6 = 9ish on hand
        var toUse = Math.ceil((50 - (0,external_kolmafia_namespaceObject.getFuel)()) / 6);

        (0,external_kolmafia_namespaceObject.cliExecute)("asdonmartin fuel " + toUse + " " + this.sodaBread);
      }
    } }, { key: "getAvailableItems", value:

    function getAvailableItems() {
      // Returns <Item, Amount, Each Fuel Worth in Mall>
      var items = [];

      for (var _i = 0, _Object$entries = Object.entries((0,external_kolmafia_namespaceObject.getInventory)()); _i < _Object$entries.length; _i++) {var _Object$entries$_i = TaskFuelAsdon_slicedToArray(_Object$entries[_i], 2),itemName = _Object$entries$_i[0],amount = _Object$entries$_i[1];
        var item = external_kolmafia_namespaceObject.Item.get(itemName);

        if (this.invalidFuels.includes(item)) {
          continue;
        }

        if (item.fullness == 0 && item.inebriety == 0) {
          this.invalidFuels.push(item);
          continue;
        }

        if (item.quest || !item.tradeable || item.gift) {
          this.invalidFuels.push(item);
          continue;
        }

        var histPrice = (0,external_kolmafia_namespaceObject.historicalPrice)(item);

        if (histPrice <= 10) {
          continue;
        }

        if (!item.adventures.match(/^[0-9]+(-[0-9]+)?$/)) {
          this.invalidFuels.push(item);
          continue;
        }

        // Make sure we don't consume something great
        if (
        item.quality != "crappy" &&
        item.quality != "decent" &&
        item.quality != "good")
        {
          histPrice = Math.max(histPrice, (0,external_kolmafia_namespaceObject.mallPrice)(item));
        }

        var advs = (0,external_kolmafia_namespaceObject.toInt)(item.adventures.split("-")[0]);
        var costPerFuel = histPrice / advs;

        // If the fuel would cost more than soda bread..
        if (costPerFuel > this.eachFuelWorth) {
          this.invalidFuels.push(item);
          continue;
        }

        items.push([item, amount, costPerFuel]);
      }

      return items;
    } }]);return TaskFuelAsdon;}();
;// CONCATENATED MODULE: ./src/tasks/TaskLatteFiller.ts
function TaskLatteFiller_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function TaskLatteFiller_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function TaskLatteFiller_createClass(Constructor, protoProps, staticProps) {if (protoProps) TaskLatteFiller_defineProperties(Constructor.prototype, protoProps);if (staticProps) TaskLatteFiller_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function TaskLatteFiller_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



var TaskLatteFiller = /*#__PURE__*/function () {function TaskLatteFiller() {TaskLatteFiller_classCallCheck(this, TaskLatteFiller);TaskLatteFiller_defineProperty(this, "skipLatte",
    (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_latteRefillsUsed")) > 0);TaskLatteFiller_defineProperty(this, "latte",
    external_kolmafia_namespaceObject.Item.get("Latte lovers member's mug"));}TaskLatteFiller_createClass(TaskLatteFiller, [{ key: "run", value:

    function run() {
      if (this.skipLatte) {
        return;
      }

      if ((0,external_kolmafia_namespaceObject.availableAmount)(this.latte) == 0) {
        this.skipLatte = true;
        return;
      }

      var flavors = [
      LatteFlavor.FAMILIAR_WEIGHT,
      LatteFlavor.MEAT_DROP,
      LatteFlavor.FAM_EXP];


      var currentFlavors = getCurrentLatteFlavors();

      if (flavors.filter((f) => !currentFlavors.includes(f)).length == 0) {
        this.skipLatte = true;
        return;
      }

      var notUnlocked = flavors.filter((f) => !hasUnlockedLatteFlavor(f));

      if (notUnlocked.length > 0) {
        return;
      }

      if ((0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_latteRefillsUsed")) > 0) {
        throw "latte was refilled but we don't remember that!";
      }

      (0,external_kolmafia_namespaceObject.cliExecute)("latte refill " + flavors.join(" "));
    } }]);return TaskLatteFiller;}();
;// CONCATENATED MODULE: ./src/tasks/TaskMaintainStatus.ts
function TaskMaintainStatus_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function TaskMaintainStatus_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function TaskMaintainStatus_createClass(Constructor, protoProps, staticProps) {if (protoProps) TaskMaintainStatus_defineProperties(Constructor.prototype, protoProps);if (staticProps) TaskMaintainStatus_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function TaskMaintainStatus_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}









var TaskMaintainStatus = /*#__PURE__*/function () {function TaskMaintainStatus() {TaskMaintainStatus_classCallCheck(this, TaskMaintainStatus);TaskMaintainStatus_defineProperty(this, "restorers",
    []);}TaskMaintainStatus_createClass(TaskMaintainStatus, [{ key: "fillRestorers", value:

    function fillRestorers() {
      this.restorers.push({
        item: external_kolmafia_namespaceObject.Item.get("Knob Goblin seltzer"),
        mpRestored: 11,
        available: () =>
        (0,external_kolmafia_namespaceObject.dispensaryAvailable)() ||
        (0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Knob Goblin seltzer")) > 0,
        price: 80 });

      this.restorers.push({
        item: external_kolmafia_namespaceObject.Item.get("Black cherry soda"),
        mpRestored: 11,
        available: () =>
        (0,external_kolmafia_namespaceObject.blackMarketAvailable)() ||
        (0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("Black cherry soda")) > 0,
        price: 80 });

      this.restorers.push({
        item: external_kolmafia_namespaceObject.Item.get("Doc Galaktik's Invigorating Tonic"),
        mpRestored: 11,
        available: () => true,
        price: 90 });

    } }, { key: "restoreMPTo", value:

    function restoreMPTo(mp) {
      var desiredMp = Math.min(mp, (0,external_kolmafia_namespaceObject.myMaxmp)());

      while ((0,external_kolmafia_namespaceObject.myMeat)() > 100 && (0,external_kolmafia_namespaceObject.myMp)() < desiredMp) {
        var restorer = this.restorers.find((r) => (0,external_kolmafia_namespaceObject.availableAmount)(r.item) > 0);

        if (restorer == null) {
          restorer = this.restorers.find((r) => r.available());
        }

        if (restorer == null) {
          return false;
        }

        var toUse = Math.ceil(desiredMp / restorer.mpRestored);

        if ((0,external_kolmafia_namespaceObject.availableAmount)(restorer.item) > 0) {
          toUse = Math.min(toUse, (0,external_kolmafia_namespaceObject.availableAmount)(restorer.item));
        } else {
          toUse = Math.min(Math.floor((0,external_kolmafia_namespaceObject.myMeat)() / restorer.price), toUse);

          (0,external_kolmafia_namespaceObject.cliExecute)("acquire " + toUse + " " + restorer.item);
        }

        (0,external_kolmafia_namespaceObject.cliExecute)("use " + toUse + " " + restorer.item);
      }

      return (0,external_kolmafia_namespaceObject.myMp)() >= mp;
    } }, { key: "run", value:

    function run() {
      var desiredMp = (0,external_kolmafia_namespaceObject.myMaxmp)() < 40 ? 20 : 40;

      this.restoreMPTo(desiredMp);
    } }]);return TaskMaintainStatus;}();


var maintainStatus = new TaskMaintainStatus();

function restoreMPTo(mp) {
  // If we can't hit that MP
  if (mp > (0,external_kolmafia_namespaceObject.myMaxmp)()) {
    return false;
  }

  // If we already have that amount
  if (mp >= (0,external_kolmafia_namespaceObject.myMp)()) {
    return true;
  }

  // If we don't have 100 meat per 10 mp
  if (Math.ceil(((0,external_kolmafia_namespaceObject.myMp)() - mp) / 10) * 100 > (0,external_kolmafia_namespaceObject.myMeat)()) {
    return false;
  }

  return maintainStatus.restoreMPTo(mp);
}
;// CONCATENATED MODULE: ./src/tasks/TaskSellCrap.ts
function TaskSellCrap_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = TaskSellCrap_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function TaskSellCrap_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return TaskSellCrap_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return TaskSellCrap_arrayLikeToArray(o, minLen);}function TaskSellCrap_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function TaskSellCrap_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function TaskSellCrap_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function TaskSellCrap_createClass(Constructor, protoProps, staticProps) {if (protoProps) TaskSellCrap_defineProperties(Constructor.prototype, protoProps);if (staticProps) TaskSellCrap_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function TaskSellCrap_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


var TaskSellCrap = /*#__PURE__*/function () {function TaskSellCrap() {TaskSellCrap_classCallCheck(this, TaskSellCrap);TaskSellCrap_defineProperty(this, "autosells",
    ["dense meat stack", "meat stack"].map((s) =>
    external_kolmafia_namespaceObject.Item.get(s)));TaskSellCrap_defineProperty(this, "autouse",

    [
    "Ancient Vinyl Coin Purse",
    "Black Pension Check",
    "CSA Discount Card",
    "Fat Wallet",
    "Gathered Meat-Clip",
    "Old Leather Wallet",
    "Penultimate Fantasy Chest",
    "Pixellated Moneybag",
    "Old Coin Purse",
    "Shiny Stones"].
    map((s) => external_kolmafia_namespaceObject.Item.get(s)));}TaskSellCrap_createClass(TaskSellCrap, [{ key: "run", value:

    function run() {
      if ((0,external_kolmafia_namespaceObject.myMeat)() > 15000) {
        return;
      }var _iterator = TaskSellCrap_createForOfIteratorHelper(

      this.autosells),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var i = _step.value;
          if ((0,external_kolmafia_namespaceObject.itemAmount)(i) == 0) {
            continue;
          }

          (0,external_kolmafia_namespaceObject.autosell)((0,external_kolmafia_namespaceObject.itemAmount)(i), i);
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}var _iterator2 = TaskSellCrap_createForOfIteratorHelper(

      this.autouse),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _i = _step2.value;
          if ((0,external_kolmafia_namespaceObject.itemAmount)(_i) == 0) {
            continue;
          }

          (0,external_kolmafia_namespaceObject.use)((0,external_kolmafia_namespaceObject.itemAmount)(_i), _i);
        }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}
    } }]);return TaskSellCrap;}();
;// CONCATENATED MODULE: ./src/tasks/TaskWorkshed.ts
function TaskWorkshed_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function TaskWorkshed_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function TaskWorkshed_createClass(Constructor, protoProps, staticProps) {if (protoProps) TaskWorkshed_defineProperties(Constructor.prototype, protoProps);if (staticProps) TaskWorkshed_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function TaskWorkshed_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



var TaskWorkshed = /*#__PURE__*/function () {function TaskWorkshed() {TaskWorkshed_classCallCheck(this, TaskWorkshed);TaskWorkshed_defineProperty(this, "lastChecked",
    "_lastCheckedCabinet");TaskWorkshed_defineProperty(this, "hat",
    external_kolmafia_namespaceObject.Item.get("Ice Crown"));TaskWorkshed_defineProperty(this, "pants",
    external_kolmafia_namespaceObject.Item.get("frozen jeans"));TaskWorkshed_defineProperty(this, "cabinet",
    external_kolmafia_namespaceObject.Item.get("Cold medicine cabinet"));}TaskWorkshed_createClass(TaskWorkshed, [{ key: "hasConsults", value:

    function hasConsults() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_coldMedicineConsults")) < 5;
    } }, { key: "getNextConsult", value:

    function getNextConsult() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("_nextColdMedicineConsult")) - (0,external_kolmafia_namespaceObject.totalTurnsPlayed)();
    } }, { key: "isConsultReady", value:

    function isConsultReady() {
      return this.hasConsults() && this.getNextConsult() <= 0;
    } }, { key: "getLastChecked", value:

    function getLastChecked() {
      return (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)(this.lastChecked));
    } }, { key: "shouldCheck", value:

    function shouldCheck() {
      return this.getLastChecked() + 10 <= (0,external_kolmafia_namespaceObject.totalTurnsPlayed)();
    } }, { key: "check", value:

    function check() {
      var page = (0,external_kolmafia_namespaceObject.visitUrl)("campground.php?action=workshed");

      (0,external_kolmafia_namespaceObject.setProperty)(this.lastChecked, (0,external_kolmafia_namespaceObject.totalTurnsPlayed)().toString());

      if (!(0,external_kolmafia_namespaceObject.handlingChoice)()) {
        return;
      }

      if ((0,external_kolmafia_namespaceObject.lastChoice)() != 1455) {
        throw "Unexpected situation";
      }

      if (GreySettings.isHardcoreMode() && (0,external_kolmafia_namespaceObject.availableAmount)(this.pants) == 0) {
        (0,external_kolmafia_namespaceObject.runChoice)(1);
      } else if (page.includes("Extrovermectin&trade;")) {
        (0,external_kolmafia_namespaceObject.runChoice)(5);
      } else {
        (0,external_kolmafia_namespaceObject.visitUrl)("main.php");
      }
    } }, { key: "run", value:

    function run() {
      if ((0,external_kolmafia_namespaceObject.getWorkshed)() != this.cabinet) {
        return;
      }

      if (!this.hasConsults() || !this.isConsultReady() || !this.shouldCheck()) {
        return;
      }

      this.check();
    } }]);return TaskWorkshed;}();
;// CONCATENATED MODULE: ./src/GreyAdventurer.ts
function GreyAdventurer_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = GreyAdventurer_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function GreyAdventurer_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return GreyAdventurer_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return GreyAdventurer_arrayLikeToArray(o, minLen);}function GreyAdventurer_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function GreyAdventurer_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function GreyAdventurer_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function GreyAdventurer_createClass(Constructor, protoProps, staticProps) {if (protoProps) GreyAdventurer_defineProperties(Constructor.prototype, protoProps);if (staticProps) GreyAdventurer_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function GreyAdventurer_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}















var GreyAdventurer = /*#__PURE__*/function () {function GreyAdventurer() {GreyAdventurer_classCallCheck(this, GreyAdventurer);GreyAdventurer_defineProperty(this, "goose",
    external_kolmafia_namespaceObject.Familiar.get("Grey Goose"));GreyAdventurer_defineProperty(this, "adventureFinder",
    new AdventureFinder());GreyAdventurer_defineProperty(this, "goTime", void 0);GreyAdventurer_defineProperty(this, "tasks",

    [
    new TaskEater(),
    new TaskSellCrap(),
    new TaskWorkshed(),
    new TaskCouncil(),
    new TaskLatteFiller(),
    new TaskMaintainStatus(),
    new TaskFuelAsdon()]);}GreyAdventurer_createClass(GreyAdventurer, [{ key: "runTurn", value:


    function runTurn(goTime) {
      this.goTime = goTime;

      if (goTime) {var _iterator = GreyAdventurer_createForOfIteratorHelper(
        this.tasks),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var task = _step.value;
            task.run();
          }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
      }

      this.adventureFinder.start();
      var goodAdventure = this.adventureFinder.findGoodVisit();

      this.adventureFinder.printStatus();

      if (goodAdventure == null) {
        (0,external_kolmafia_namespaceObject.print)("Failed, should have printed an error..", "gray");
        return false;
      }

      var adv;
      var plan = [];

      if (goodAdventure.quest != null) {
        plan.push("Quest");
      }

      if (goodAdventure.locationInfo != null) {
        if (goodAdventure.locationInfo.turnsToGain > 0) {
          plan.push(
          "Absorb Adventures (Expect " +
          goodAdventure.locationInfo.expectedTurnsProfit +
          " profit of total " +
          goodAdventure.locationInfo.turnsToGain +
          " possible)");

        }

        if (goodAdventure.locationInfo.skills.size > 0) {
          var skills = [];

          goodAdventure.locationInfo.skills.forEach((v, k) => {
            skills.push(k.skill.name + " (" + v + ")");
          });

          plan.push("Grab Skills: " + skills.join(", "));
        }

        if (goodAdventure.locationInfo.monsters != null) {
          var monsters = [];

          var absorbed = this.adventureFinder.defeated;

          goodAdventure.locationInfo.monsters.
          map((m) => {
            var absorb = AbsorbsProvider.getAbsorb(m);

            if (absorb == null) {
              return m.name;
            }

            if (absorb.skill != null) {
              return m.name + " (Skill)";
            }

            if ((absorb.adventures || 0) <= 0) {
              return m.name;
            }

            if (absorbed.get(m) == Reabsorbed.REABSORBED) {
              return m.name;
            }

            return m.name + " (Advs x " + (!absorbed.has(m) ? "2" : "1") + ")";
          }).
          forEach((m) => monsters.push(m));

          plan.push("Fight: " + monsters.join(", "));
        }
      }

      adv = goodAdventure;
      var prefix;

      if (goodAdventure.quest != null) {
        adv.adventure = adv.quest.run();

        prefix = goodAdventure.quest.getId() + " @ " + adv.adventure.location;
      } else {
        adv.adventure = this.getNonQuest(goodAdventure.locationInfo);

        prefix = "Non-Quest @ " + adv.adventure.location;
      }

      (0,external_kolmafia_namespaceObject.printHtml)(
      "<u>" +
      doColor(prefix, "blue") +
      ", Goals:</u> " +
      doColor(plan.map((s) => "<u>" + s + "</u>").join(", "), "gray"));


      this.runAdventure(adv);
      return true;
    } }, { key: "getNonQuest", value:

    function getNonQuest(adv) {
      var outfit = new GreyOutfit();

      if (adv.location.combatPercent < 100) {
        outfit.setPlusCombat();
      }

      var settings = new AdventureSettings();
      settings.nonquest = true;
      adv.monsters.forEach((m) => settings.addNoBanish(m));

      return {
        outfit: outfit,
        location: adv.location,
        run: () => {
          // We don't want it casting +combat skills
          greyAdv(adv.location, null, settings);
        } };

    } }, { key: "doPrep", value:

    function doPrep(adventure) {
      var toRun = adventure.adventure;
      var outfit = toRun.outfit;

      if (toRun.location == external_kolmafia_namespaceObject.Location.get("Inside the Palindome")) {
        outfit.addItem(external_kolmafia_namespaceObject.Item.get("Talisman o' Namsilat"));
      }

      var familiar = this.goose;
      var wantToAbsorb =
      adventure.locationInfo != null && adventure.locationInfo.turnsToGain > 0;
      var gooseReplaceable =
      !wantToAbsorb && this.adventureFinder.hasEnoughGooseWeight();
      var canDoMagGlass =
      this.adventureFinder.hasEnoughGooseWeight() &&
      outfit.minusCombatWeight == 0 &&
      outfit.itemDropWeight < 1 &&
      (0,external_kolmafia_namespaceObject.toInt)((0,external_kolmafia_namespaceObject.getProperty)("cursedMagnifyingGlassCount")) < 13 &&
      (0,external_kolmafia_namespaceObject.getProperty)("sidequestLighthouseCompleted") == "none" &&
      (0,external_kolmafia_namespaceObject.availableAmount)(external_kolmafia_namespaceObject.Item.get("barrel of gunpowder")) == 0;

      if (canDoMagGlass) {
        outfit.addBonus("+100 bonus cursed magnifying glass");
      }

      if (
      toRun.familiar != null && (
      toRun.disableFamOverride == true || gooseReplaceable))
      {
        familiar = toRun.familiar;
      } else if (gooseReplaceable) {
        var replaceWith = this.adventureFinder.getRecommendedFamiliars();
        replaceWith.push(external_kolmafia_namespaceObject.Familiar.get("Jumpsuited Hound Dog"));

        familiar = replaceWith[0];
      }

      var doOrb = false;

      if (adventure.locationInfo != null && adventure.locationInfo.shouldRunOrb) {
        doOrb = true;
      }

      var locationToSet = toRun.location;

      if (locationToSet == null) {
        locationToSet = external_kolmafia_namespaceObject.Location.get("Noob Cave");
      }

      (0,external_kolmafia_namespaceObject.setLocation)(locationToSet);

      setUmbrella(outfit.getUmbrella());

      (0,external_kolmafia_namespaceObject.useFamiliar)(familiar);

      if ((0,external_kolmafia_namespaceObject.familiarWeight)(this.goose) >= 6) {
        outfit.famExpWeight = 1;
      }

      (0,external_kolmafia_namespaceObject.maximize)(
      outfit.createString() +
      " " + (
      doOrb ? "+" : "-") +
      "equip miniature crystal ball",
      false);


      var closet = external_kolmafia_namespaceObject.Item.get("Funky junk key");

      if ((0,external_kolmafia_namespaceObject.itemAmount)(closet) > 0) {
        (0,external_kolmafia_namespaceObject.putCloset)(closet, (0,external_kolmafia_namespaceObject.itemAmount)(closet));
      }

      /* if (
        adventure.locationInfo != null &&
        adventure.locationInfo.monsters.includes(Monster.get("Oil Baron"))
      ) {
        // Dumb code to try force an oil baron
        maximize(
          new GreyOutfit().addItem(Item.get("Backup Camera")).createString(),
          false
        );
        cliExecute("backupcamera ml");
      }*/
    } }, { key: "runAdventure", value:

    function runAdventure(adventure) {
      var toRun = adventure.adventure;
      var outfit = toRun.outfit;

      if (outfit == null) {
        toRun.outfit = outfit = new GreyOutfit();
      }

      this.doPrep(adventure);

      if (this.goTime) {
        toRun.run();
      } else {
        (0,external_kolmafia_namespaceObject.print)("Sim run()!");
      }
    } }]);return GreyAdventurer;}();


function castNoCombatSkills() {
  if (
  (0,external_kolmafia_namespaceObject.haveSkill)(external_kolmafia_namespaceObject.Skill.get("Phase Shift")) &&
  (0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("Shifted Phase")) == 0 &&
  restoreMPTo(50))
  {
    (0,external_kolmafia_namespaceObject.useSkill)(external_kolmafia_namespaceObject.Skill.get("Phase Shift"));
  }

  if (
  (0,external_kolmafia_namespaceObject.haveSkill)(external_kolmafia_namespaceObject.Skill.get("Photonic Shroud")) &&
  (0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("Darkened Photons")) == 0 &&
  restoreMPTo(50))
  {
    (0,external_kolmafia_namespaceObject.useSkill)(external_kolmafia_namespaceObject.Skill.get("Photonic Shroud"));
  }
}

function castCombatSkill() {
  if (
  (0,external_kolmafia_namespaceObject.haveSkill)(external_kolmafia_namespaceObject.Skill.get("Piezoelectric Honk")) &&
  (0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("Hooooooooonk!")) == 0 &&
  restoreMPTo(50))
  {
    (0,external_kolmafia_namespaceObject.useSkill)(external_kolmafia_namespaceObject.Skill.get("Piezoelectric Honk"));
  }
}

function hasNonCombatSkillsReady() {var wantBoth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var s1 = (0,external_kolmafia_namespaceObject.haveSkill)(external_kolmafia_namespaceObject.Skill.get("Phase Shift"));
  var s2 = (0,external_kolmafia_namespaceObject.haveSkill)(external_kolmafia_namespaceObject.Skill.get("Photonic Shroud"));

  var s1e = (0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("Shifted Phase")) > 0;
  var s2e = (0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("Darkened Photons")) > 0;

  if (wantBoth) {
    return s1 && s2 && (s1e ? 0 : 50) + (s2e ? 0 : 50) + 20 <= (0,external_kolmafia_namespaceObject.myMp)();
  }

  return s1e || s2e || (s1 || s2) && (0,external_kolmafia_namespaceObject.myMp)() >= 70;
}

function hasCombatSkillReady() {
  return (
    hasCombatSkillActive() ||
    (0,external_kolmafia_namespaceObject.haveSkill)(external_kolmafia_namespaceObject.Skill.get("Piezoelectric Honk")) && (0,external_kolmafia_namespaceObject.myMp)() >= 70);

}

function hasBanisherSkill() {
  return haveSkill(Skill.get("System Sweep"));
}

function hasCombatSkillActive() {
  return (0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("Hooooooooonk!")) > 0;
}

function hasNonCombatSkillActive() {
  return (
    (0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("Shifted Phase")) > 0 ||
    (0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("Darkened Photons")) > 0);

}
;// CONCATENATED MODULE: ./src/GreyYouMain.ts
function GreyYouMain_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function GreyYouMain_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function GreyYouMain_createClass(Constructor, protoProps, staticProps) {if (protoProps) GreyYouMain_defineProperties(Constructor.prototype, protoProps);if (staticProps) GreyYouMain_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function GreyYouMain_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



var

GreyYouMain = /*#__PURE__*/function () {function GreyYouMain() {GreyYouMain_classCallCheck(this, GreyYouMain);GreyYouMain_defineProperty(this, "adventures", void 0);}GreyYouMain_createClass(GreyYouMain, [{ key: "handleCommand", value:


    function handleCommand(command) {
      if ((0,external_kolmafia_namespaceObject.getRevision)() < 26419) {
        (0,external_kolmafia_namespaceObject.print)("Please update your mafia. You are using ".concat(
        (0,external_kolmafia_namespaceObject.getRevision)(), " but we need at least r26419"),
        "red");

        return;
      }

      if (command == "required") {
        new GreyRequirements().hasRequired();
        return;
      }

      if ((0,external_kolmafia_namespaceObject.myPath)() != "Grey You") {
        (0,external_kolmafia_namespaceObject.print)(
        "You're not in grey you. Use 'required' to get requirements.",
        "red");

        return;
      }

      this.adventures = new GreyAdventurer();

      if (command == "sim") {
        this.adventures.runTurn(false);
      } else if (command != null) {
        var s = command.split(" ");

        if (s[0] == "go" || s[0] == "run") {
          var turns = 1;

          if (s[1] != null) {
            turns = (0,external_kolmafia_namespaceObject.toInt)(s[1]);
          }

          for (
          var i = 0;
          i < turns && (0,external_kolmafia_namespaceObject.haveEffect)(external_kolmafia_namespaceObject.Effect.get("Beaten Up")) == 0;
          i++)
          {
            var run = this.adventures.runTurn(true);

            if (!run) {
              break;
            }
          }

          (0,external_kolmafia_namespaceObject.print)("Done running", "blue");
          return;
        }
      }

      (0,external_kolmafia_namespaceObject.print)("Provide go or sim");
    } }]);return GreyYouMain;}();


function GreyYouMain_main(parameter) {
  new GreyYouMain().handleCommand(parameter);
}
var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;