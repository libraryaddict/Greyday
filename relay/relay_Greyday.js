/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 212:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "eF": () => (/* binding */ getResourceSettings)
});

// UNUSED EXPORTS: PillkeeperPill, ResourceCategory, ResourceIds, getResourceValues, getResources, getResourcesLeft, isTurnCounter

// EXTERNAL MODULE: external "kolmafia"
var external_kolmafia_ = __webpack_require__(530);
// EXTERNAL MODULE: ./src/utils/GreyClan.ts
var GreyClan = __webpack_require__(782);
// EXTERNAL MODULE: ./src/utils/GreySettings.ts
var utils_GreySettings = __webpack_require__(772);
;// CONCATENATED MODULE: ./src/utils/MacroBuilder.ts
function _typeof(obj) {"@babel/helpers - typeof";return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {return typeof obj;} : function (obj) {return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}, _typeof(obj);}function _get() {if (typeof Reflect !== "undefined" && Reflect.get) {_get = Reflect.get.bind();} else {_get = function _get(target, property, receiver) {var base = _superPropBase(target, property);if (!base) return;var desc = Object.getOwnPropertyDescriptor(base, property);if (desc.get) {return desc.get.call(arguments.length < 3 ? target : receiver);}return desc.value;};}return _get.apply(this, arguments);}function _superPropBase(object, property) {while (!Object.prototype.hasOwnProperty.call(object, property)) {object = _getPrototypeOf(object);if (object === null) break;}return object;}function _createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it["return"] != null) it["return"]();} finally {if (didErr) throw err;}} };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (_typeof(call) === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct.bind();} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}

var MACRO_NAME = "Script Autoattack Macro";
/**
 * Get the KoL native ID of the macro with name name.
 *
 * @category Combat
 * @returns {number} The macro ID.
 */
function getMacroId() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : MACRO_NAME;
  var macroMatches = (0,external_kolmafia_.xpath)(
  (0,external_kolmafia_.visitUrl)("account_combatmacros.php"), "//select[@name=\"macroid\"]/option[text()=\"".concat(
  name, "\"]/@value"));

  if (macroMatches.length === 0) {
    (0,external_kolmafia_.visitUrl)("account_combatmacros.php?action=new");
    var newMacroText = (0,external_kolmafia_.visitUrl)("account_combatmacros.php?macroid=0&name=".concat(
    name, "&macrotext=abort&action=save"));

    return parseInt(
    (0,external_kolmafia_.xpath)(newMacroText, "//input[@name=macroid]/@value")[0],
    10);

  } else {
    return parseInt(macroMatches[0], 10);
  }
}


function itemOrNameToItem(itemOrName) {
  return typeof itemOrName === "string" ? external_kolmafia_.Item.get(itemOrName) : itemOrName;
}

var substringCombatItems =
"spider web, really sticky spider web, dictionary, NG, Cloaca-Cola, yo-yo, top, ball, kite, yo, red potion, blue potion, adder, red button, pile of sand, mushroom, deluxe mushroom".
split(",").
map(function (s) {return (0,external_kolmafia_.toItem)(s);});
var substringCombatSkills =
"Shoot, Thrust-Smack, Headbutt, Toss, Sing, Disarm, LIGHT, BURN, Extract, Meteor Shower, Cleave, Boil, Slice, Rainbow".
split(",").
map(function (s) {return (0,external_kolmafia_.toSkill)(s);});

function itemOrItemsBallsMacroName(
itemOrItems)
{
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(itemOrItemsBallsMacroName).join(", ");
  } else {
    var item = itemOrNameToItem(itemOrItems);
    return !substringCombatItems.includes(item) ?
    item.name :
    (0,external_kolmafia_.toInt)(item).toString();
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
    return external_kolmafia_.Skill.get(skillOrName);
  } else {
    return skillOrName;
  }
}

function skillBallsMacroName(skillOrName) {
  var skill = skillOrNameToSkill(skillOrName);
  return skill.name.match(/^[A-Za-z ]+$/) &&
  !substringCombatSkills.includes(skill) ?
  skill.name :
  (0,external_kolmafia_.toInt)(skill);
}



var InvalidMacroError = /*#__PURE__*/function (_Error) {_inherits(InvalidMacroError, _Error);var _super = _createSuper(InvalidMacroError);function InvalidMacroError() {_classCallCheck(this, InvalidMacroError);return _super.apply(this, arguments);}return _createClass(InvalidMacroError);}( /*#__PURE__*/_wrapNativeSuper(Error));

/**
 * BALLS macro builder for direct submission to KoL.
 * Create a new macro with `new Macro()` and add steps using the instance methods.
 * Uses a fluent interface, so each step returns the object for easy chaining of steps.
 * Each method is also defined as a static method that creates a new Macro with only that step.
 * For example, you can do `Macro.skill('Saucestorm').attack()`.
 */
var Macro = /*#__PURE__*/function () {function Macro() {_classCallCheck(this, Macro);_defineProperty(this, "components",





    []);_defineProperty(this, "name",
    MACRO_NAME);}_createClass(Macro, [{ key: "toString", value:

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
      (0,external_kolmafia_.setProperty)(Macro.SAVED_MACRO_PROPERTY, this.toString());
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
      nextSteps.map(function (x) {return x instanceof Macro ? x.components : [x];})));

      this.components = [].concat(_toConsumableArray(
      this.components), _toConsumableArray(
      nextStepsStrings.filter(function (s) {return s.length > 0;})));

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
      var _final = this.toString();
      return (0,external_kolmafia_.visitUrl)("fight.php?action=macro&macrotext=".concat(
      (0,external_kolmafia_.urlEncode)(_final)),
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
      (0,external_kolmafia_.getAutoAttack)() === 99000000 + id &&
      this.toString() === Macro.cachedAutoAttacks.get(this.name))
      {
        // This macro is already set. Don"t make the server request.
        return;
      }

      (0,external_kolmafia_.visitUrl)("account_combatmacros.php?macroid=".concat(
      id, "&name=").concat((0,external_kolmafia_.urlEncode)(
      this.name), "&macrotext=").concat(
      (0,external_kolmafia_.urlEncode)(this.toString()), "&action=save"),
      true,
      true);

      (0,external_kolmafia_.visitUrl)("account.php?am=1&action=autoattack&value=".concat(
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








    ifTrue)
    {
      return this.step("if ".concat(this.createBalls(condition))).
      step(ifTrue).
      step("endif");
    }
    /**
     * Add an "if not" statement to this macro.
     * @param condition The BALLS condition for the if statement.
     * @param ifFalse Continuation if the condition is true.
     * @returns {Macro} This object itself.
     */ }, { key: "ifNot_", value:
    function ifNot_(
    condition,








    ifFalse)
    {
      return this.step("if !".concat(this.createBalls(condition))).
      step(ifFalse).
      step("endif");
    } }, { key: "createBalls", value:

    function createBalls(
    condition)








    {
      var ballsCondition = "";
      if (condition instanceof external_kolmafia_.Monster) {
        ballsCondition = "monsterid ".concat(condition.id);
      } else if (condition instanceof external_kolmafia_.Effect) {
        ballsCondition = "haseffect ".concat((0,external_kolmafia_.toInt)(condition));
      } else if (condition instanceof external_kolmafia_.Skill) {
        ballsCondition = "hasskill ".concat(skillBallsMacroName(condition));
      } else if (condition instanceof external_kolmafia_.Item) {
        if (!condition.combat) {
          throw new InvalidMacroError("Item ".concat(
          condition, " cannot be made a valid BALLS predicate (it is not combat-usable)"));

        }

        ballsCondition = "hascombatitem ".concat(itemOrItemsBallsMacroName(condition));
      } else if (condition instanceof external_kolmafia_.Location) {
        var snarfblat = condition.id;

        if (snarfblat < 1) {
          throw new InvalidMacroError("Location ".concat(
          condition, " cannot be made a valid BALLS predicate (it has no location id)"));

        }

        ballsCondition = "snarfblat ".concat(snarfblat);
      } else if (condition instanceof external_kolmafia_.Class) {
        if ((0,external_kolmafia_.toInt)(condition) > 6) {
          throw new InvalidMacroError("Class ".concat(
          condition, " cannot be made a valid BALLS predicate (it is not a standard class)"));

        }

        ballsCondition = condition.toString().replaceAll(" ", "").toLowerCase();
      } else if (condition instanceof external_kolmafia_.Stat) {
        ballsCondition = "".concat(condition.toString().toLowerCase(), "class");
      } else {
        ballsCondition = condition;
      }

      return ballsCondition;
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
      if (condition) {return this.step(ifTrue);} else
      if (ifFalse) {return this.step(ifFalse);} else
      {return this;}
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
      skills.map(function (skill) {
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
      skills.map(function (skill) {
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
      skills.map(function (skill) {
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
      items.map(function (itemOrItems) {
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
      items.map(function (item) {
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
     */ }], [{ key: "load", value: function load() {var _this;return (_this = new this()).step.apply(_this, _toConsumableArray((0,external_kolmafia_.getProperty)(Macro.SAVED_MACRO_PROPERTY).split(";")));} /**
    * Clear the saved macro in the Mafia property.
    */ }, { key: "clearSaved", value: function clearSaved() {(0,external_kolmafia_.removeProperty)(Macro.SAVED_MACRO_PROPERTY);} }, { key: "step", value: function step() {var _this2;return (_this2 = new this()).step.apply(_this2, arguments);} }, { key: "clearAutoAttackMacros", value: function clearAutoAttackMacros() {var _iterator = _createForOfIteratorHelper(Macro.cachedAutoAttacks.keys()),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _Macro$cachedMacroIds;var name = _step.value;var id = (_Macro$cachedMacroIds = Macro.cachedMacroIds.get(name)) !== null && _Macro$cachedMacroIds !== void 0 ? _Macro$cachedMacroIds : getMacroId(name);(0,external_kolmafia_.visitUrl)("account_combatmacros.php?macroid=".concat(id, "&action=edit&what=Delete&confirm=1"));Macro.cachedAutoAttacks["delete"](name);}} catch (err) {_iterator.e(err);} finally {_iterator.f();}} }, { key: "abort", value: function abort() {return new this().abort();} }, { key: "runaway", value: function runaway() {return new this().runaway();} }, { key: "if_", value: function if_(condition, ifTrue) {return new this().if_(condition, ifTrue);} /**
    * Create a new macro with an "if" statement.
    * @param condition The BALLS condition for the if statement.
    * @param ifTrue Continuation if the condition is true.
    * @returns {Macro} This object itself.
    */ }, { key: "ifNot_", value: function ifNot_(condition, ifTrue) {return new this().ifNot_(condition, ifTrue);} }, { key: "while_", value: function while_(condition, contents) {return new this().while_(condition, contents);} }, { key: "externalIf", value: function externalIf(condition, ifTrue, ifFalse) {return new this().externalIf(condition, ifTrue, ifFalse);} }, { key: "skill", value: function skill() {var _this3;return (_this3 = new this()).skill.apply(_this3, arguments);} }, { key: "trySkill", value: function trySkill() {var _this4;return (_this4 = new this()).trySkill.apply(_this4, arguments);} }, { key: "trySkillRepeat", value: function trySkillRepeat() {var _this5;return (_this5 = new this()).trySkillRepeat.apply(_this5, arguments);} }, { key: "item", value: function item() {var _this6;return (_this6 = new this()).item.apply(_this6, arguments);} }, { key: "tryItem", value: function tryItem() {var _this7;return (_this7 = new this()).tryItem.apply(_this7, arguments);} }, { key: "attack", value: function attack() {return new this().attack();} }, { key: "ifHolidayWanderer", value: function ifHolidayWanderer(macro) {return new this().ifHolidayWanderer(macro);} }, { key: "ifNotHolidayWanderer", value: function ifNotHolidayWanderer(macro) {return new this().ifNotHolidayWanderer(macro);} }]);return Macro;}();

/**
 * Adventure in a location and handle all combats with a given macro.
 * To use this function you will need to create a consult script that runs Macro.load().submit() and a CCS that calls that consult script.
 * See examples/consult.ts for an example.
 *
 * @category Combat
 * @param loc Location to adventure in.
 * @param macro Macro to execute.
 */_defineProperty(Macro, "SAVED_MACRO_PROPERTY", "libram_savedMacro");_defineProperty(Macro, "cachedMacroIds", new Map());_defineProperty(Macro, "cachedAutoAttacks", new Map());
function adventureMacro(loc, macro) {
  macro.save();
  setAutoAttack(0);
  try {
    adv1(loc, 0, "");
    while (inMultiFight()) {runCombat();}
    if (choiceFollowsFight()) {visitUrl("choice.php");}
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
    if (choiceFollowsFight()) {visitUrl("choice.php");}
  } finally {
    Macro.clearSaved();
  }
}

var StrictMacro = /*#__PURE__*/(/* unused pure expression or super */ null && (function (_Macro) {_inherits(StrictMacro, _Macro);var _super2 = _createSuper(StrictMacro);function StrictMacro() {_classCallCheck(this, StrictMacro);return _super2.apply(this, arguments);}_createClass(StrictMacro, [{ key: "skill", value:
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
;// CONCATENATED MODULE: ./src/typings/ResourceTypes.ts
function ResourceTypes_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function ResourceTypes_createClass(Constructor, protoProps, staticProps) {if (protoProps) ResourceTypes_defineProperties(Constructor.prototype, protoProps);if (staticProps) ResourceTypes_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function ResourceTypes_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function ResourceTypes_defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






// We should use the category only to determine if a quest is asking for a resource type, but doesn't tell us if it supports a certain resource or not. Aka not implemented.
var ResourceCategory;(function (ResourceCategory) {ResourceCategory[ResourceCategory["COPIER"] = 0] = "COPIER";ResourceCategory[ResourceCategory["OLFACT_COPIER"] = 1] = "OLFACT_COPIER";ResourceCategory[ResourceCategory["FAXER"] = 2] = "FAXER";ResourceCategory[ResourceCategory["CARGO_SHORTS"] = 3] = "CARGO_SHORTS";ResourceCategory[ResourceCategory["BANISHER"] = 4] = "BANISHER";ResourceCategory[ResourceCategory["YELLOW_RAY"] = 5] = "YELLOW_RAY";ResourceCategory[ResourceCategory["PULL"] = 6] = "PULL";ResourceCategory[ResourceCategory["ZAP"] = 7] = "ZAP";ResourceCategory[ResourceCategory["CLOVER"] = 8] = "CLOVER";ResourceCategory[ResourceCategory["POLAR_VORTEX"] = 9] = "POLAR_VORTEX";ResourceCategory[ResourceCategory["HUGS_AND_KISSES"] = 10] = "HUGS_AND_KISSES";ResourceCategory[ResourceCategory["FIRE_EXTINGUSHER_ZONE"] = 11] = "FIRE_EXTINGUSHER_ZONE";ResourceCategory[ResourceCategory["GLOVE_REPLACE"] = 12] = "GLOVE_REPLACE";ResourceCategory[ResourceCategory["DECK_OF_EVERY_CARD"] = 13] = "DECK_OF_EVERY_CARD";ResourceCategory[ResourceCategory["DECK_OF_EVERY_CARD_CHEAT"] = 14] = "DECK_OF_EVERY_CARD_CHEAT";ResourceCategory[ResourceCategory["CAT_HEIST"] = 15] = "CAT_HEIST";ResourceCategory[ResourceCategory["HOT_TUB"] = 16] = "HOT_TUB";ResourceCategory[ResourceCategory["FORCE_NC"] = 17] = "FORCE_NC";ResourceCategory[ResourceCategory["FORCE_FIGHT"] = 18] = "FORCE_FIGHT";ResourceCategory[ResourceCategory["PILL_KEEPER"] = 19] = "PILL_KEEPER";ResourceCategory[ResourceCategory["WANDERERS"] = 20] = "WANDERERS";})(ResourceCategory || (ResourceCategory = {}));























var ResourceIds = (/* unused pure expression or super */ null && ([
"Backup Camera",
"Cosplay Saber",
"Bowling Ball",
"Asdon",
"Combat Locket",
"Fax Machine",
"Wish",
"Cargo Shorts",
"Powerful Glove",
"Fire Extingusher",
"Yellow Ray",
"Pull",
"Clover",
"Deck of Every Card",
"Zap Wand",
"Cat Burglar Heist",
"Hot Tub",
"Chateau Painting",
"Parka: Force NC",
"Pillkeeper",
"Portscan",
"Hugs and Kisses",
"Autumn-aton",
"Digitize",
"Romantic Arrow"]));


var PillkeeperPill;(function (PillkeeperPill) {PillkeeperPill["YELLOW_RAY"] = "explode";PillkeeperPill["DOUBLE_POTION"] = "extend";PillkeeperPill["FORCE_NC"] = "noncombat";PillkeeperPill["ALL_RES"] = "element";PillkeeperPill["DOUBLE_STATS"] = "stat";PillkeeperPill["FAM_WEIGHT"] = "familiar";PillkeeperPill["LUCKY"] = "lucky";PillkeeperPill["RANDOM_ADVENTURE"] = "random";})(PillkeeperPill || (PillkeeperPill = {}));








































function getResourceSettings() {
  return getResourceValues().map(function (res) {
    var setting = {
      setting: "values",
      name: "greyValue_" + res.valueName,
      description: res.description,
      valid: function valid(s) {return /\d+/.test(s);},
      "default": ResourceValues[res.valueName + "Value"]
    };

    return setting;
  });
}

function getResourceValues() {
  var embezzler = {
    valueName: "Embezzler",
    description: "How much meat this resource would give from embezzlers"
  };

  var cloverValue = {
    valueName: "Clover",
    description: "How much meat you could sell an 11-leaf clover for"
  };

  var forcedNC = {
    valueName: "ForcedNC",
    description: "How much meat each forced non-combat (Parka) is worth"
  };

  var forcedDrop = {
    valueName: "ForcedDrop",
    description: "How much meat you could earn from each forced drop"
  };

  var pillkeeper = {
    valueName: "Pillkeeper",
    description: "How much meat you'd earn from the free pillkeeper use"
  };

  var pull = {
    valueName: "Pull",
    description: "How much each pull is worth to the player in meat"
  };

  var cosplay = {
    valueName: "CosplaySaber",
    description:
    "How much meat each cosplay saber use is worth, normally calculated by pills remaining",
    dynamic: true
  };

  var shorts = {
    valueName: "CargoShorts",
    description: "How much meat an item from Cargo Shorts is worth"
  };

  var deckOfCards = {
    valueName: "DeckOfCards",
    description:
    "With 15 uses, a cheat using 5, how much each use is worth in meat"
  };

  var zap = {
    valueName: "ZapWand",
    description: "How much each zap is worth in meat"
  };

  var burglar = {
    valueName: "CatBurglarHeist",
    description: "How much a cat burglar heist is worth in meat"
  };

  var chateauPainting = {
    valueName: "ChateauPainting",
    description:
    "How much Chateau Painting is worth in meat, not sure why this is an option given it'll only consider the painting if it's a fax it wants"
  };

  var hotTub = {
    valueName: "HotTub",
    description: "How much each hot tub usage is worth to you"
  };

  return [
  embezzler,
  cloverValue,
  forcedNC,
  pillkeeper,
  forcedDrop,
  pull,
  cosplay,
  shorts,
  deckOfCards,
  zap,
  burglar,
  chateauPainting,
  hotTub];

}var

ResourceValues = /*#__PURE__*/ResourceTypes_createClass(function ResourceValues() {ResourceTypes_classCallCheck(this, ResourceValues);});ResourceTypes_defineProperty(ResourceValues, "EmbezzlerValue",
19000);ResourceTypes_defineProperty(ResourceValues, "CloverValue",
22000);ResourceTypes_defineProperty(ResourceValues, "ForcedDropValue",
4000);ResourceTypes_defineProperty(ResourceValues, "PillkeeperValue",
70000);ResourceTypes_defineProperty(ResourceValues, "ForcedNCValue",
(0,external_kolmafia_.toInt)((0,external_kolmafia_.getProperty)("greyValueOfNonCombat") || "0"));ResourceTypes_defineProperty(ResourceValues, "PullValue",
(0,external_kolmafia_.toInt)((0,external_kolmafia_.getProperty)("greyValueOfPull") || "0"));ResourceTypes_defineProperty(ResourceValues, "CosplaySaberValue",



(0,external_kolmafia_.storageAmount)(external_kolmafia_.Item.get("distention pill")) > 60 ?
-100 :
(0,external_kolmafia_.modifierEval)("G") >= 4 ?
3000 :
0);ResourceTypes_defineProperty(ResourceValues, "CargoShortsValue",
30000);ResourceTypes_defineProperty(ResourceValues, "DeckOfCardsValue",
2000);ResourceTypes_defineProperty(ResourceValues, "ZapWandValue",
15000);ResourceTypes_defineProperty(ResourceValues, "CatBurglarHeistValue",
-500);ResourceTypes_defineProperty(ResourceValues, "ChateauPaintingValue",
5000);ResourceTypes_defineProperty(ResourceValues, "HotTubValue",
0);


var glove = external_kolmafia_.Item.get("Powerful Glove");

var gloveReplace = {
  type: ResourceCategory.GLOVE_REPLACE,
  resource: "Powerful Glove",
  name: "Powerful Glove: Replace",
  worthInAftercore: ResourceValues.EmbezzlerValue,
  resourcesUsed: 10,
  prepare: function prepare(outfit) {return (
      outfit != null ? outfit.addWeight(glove) : null);},
  macro: function macro() {return Macro.skill(external_kolmafia_.Skill.get("CHEAT CODE: Replace Enemy"));}
};

var clover = {
  type: ResourceCategory.CLOVER,
  resource: "Clover",
  worthInAftercore: ResourceValues.CloverValue, // How much we could sell a clover for
  prepare: function prepare() {}
};

var xoFam = external_kolmafia_.Familiar.get("XO Skeleton");

var hugsAndKisses = {
  type: ResourceCategory.HUGS_AND_KISSES,
  resource: "Hugs and Kisses",
  worthInAftercore: ResourceValues.ForcedDropValue,
  familiar: xoFam,
  prepare: function prepare() {return null;},
  macro: function macro() {
    var skill = external_kolmafia_.Skill.get("Hugs and Kisses!");
    return Macro.while_("!pastround 15 && hasskill ".concat(
    (0,external_kolmafia_.toInt)(
    skill), " && !match While your foe shudders from having a bunch of their life drained away"),

    Macro.skill(skill));

  }
};

var extingusher = external_kolmafia_.Item.get("industrial fire extinguisher");

var extingusherPolar = {
  type: ResourceCategory.POLAR_VORTEX,
  resource: "Fire Extingusher",
  name: "Fire Extingusher: Polar Vortex",
  resourcesUsed: 10,
  worthInAftercore: ResourceValues.ForcedDropValue, // Tattered paper cost and assume free run
  prepare: function prepare(outfit) {return (
      outfit != null ? outfit.addWeight(extingusher) : null);},
  macro: function macro() {return Macro.skill(external_kolmafia_.Skill.get("Fire Extinguisher: Polar Vortex"));}
};

var extingusherZoneSpecific = {
  type: ResourceCategory.FIRE_EXTINGUSHER_ZONE,
  resource: "Fire Extingusher",
  name: "Fire Extingusher: Spray Down Zone",
  resourcesUsed: 20,
  worthInAftercore: ResourceValues.ForcedDropValue * 2, // Tattered paper cost x 2
  prepare: function prepare(outfit) {return (
      outfit != null ?
      outfit.addWeight(extingusher).addExtra("-equip smoke ball") :
      null);},
  macro: function macro() {return Macro.skill(external_kolmafia_.Skill.get("Fire Extinguisher: Zone Specific"));}
};

var pull = {
  type: ResourceCategory.PULL,
  resource: "Pull",
  worthInAftercore: ResourceValues.PullValue, // This doesn't cost us anything to use
  prepare: function prepare() {}
};

var pillkeeper = external_kolmafia_.Item.get("Eight Days a Week Pill Keeper");

var pillkeeperNC = {
  type: ResourceCategory.FORCE_NC,
  resource: "Pillkeeper",
  worthInAftercore: ResourceValues.PillkeeperValue, // Lets just value it at a frost flower?
  prepare: function prepare(outfit, props) {
    if (props != null) {
      (0,external_kolmafia_.cliExecute)("pillkeeper " + PillkeeperPill.FORCE_NC);
    }
  },
  ready: function ready() {return true;}
};

var sourceTerminal = (0,external_kolmafia_.getCampground)()["Source terminal"] > 0;
var portscanProp = "_portscanPrimed";

var portscan = {
  type: ResourceCategory.FORCE_FIGHT,
  resource: "Portscan",
  worthInAftercore: 0,
  prepare: function prepare(outfit) {
    if (
    outfit != null ||
    (
    (0,external_kolmafia_.getProperty)("sourceTerminalEducate1") +
    (0,external_kolmafia_.getProperty)("sourceTerminalEducate2")).
    includes("portscan.edu"))
    {
      return;
    }

    (0,external_kolmafia_.cliExecute)("terminal educate portscan.edu");
    (0,external_kolmafia_.visitUrl)("main.php");
  },
  primed: function primed() {return (0,external_kolmafia_.toBoolean)((0,external_kolmafia_.getProperty)(portscanProp) || "false");},
  unprime: function unprime() {return (0,external_kolmafia_.setProperty)(portscanProp, "false");},
  attemptPrime: function attemptPrime() {
    if ((0,external_kolmafia_.currentRound)() == 0) {
      return false;
    }

    var skill = external_kolmafia_.Skill.get("Portscan");

    if (!(0,external_kolmafia_.haveSkill)(skill) || (0,external_kolmafia_.myMp)() < (0,external_kolmafia_.mpCost)(skill)) {
      return false;
    }

    var prop = "_sourceTerminalPortscanUses";
    var scans = (0,external_kolmafia_.toInt)((0,external_kolmafia_.getProperty)(prop));

    Macro.skill(skill).submit();

    if (scans != (0,external_kolmafia_.toInt)((0,external_kolmafia_.getProperty)(prop))) {
      (0,external_kolmafia_.setProperty)(portscanProp, "true");
      return true;
    }

    (0,external_kolmafia_.print)("Failed to portscan for some reason..");
    return false;
  }
};

var parka = external_kolmafia_.Item.get("Jurassic Parka");
var torso = external_kolmafia_.Skill.get("Torso Awareness");
var parkaProp = "_parkaPrimed";

var ncParka = {
  type: ResourceCategory.FORCE_NC,
  resource: "Parka: Force NC",
  worthInAftercore: ResourceValues.ForcedNCValue,
  //available: () => haveSkill(torso) && availableAmount(parka) > 0,
  prepare: function prepare(outfit) {
    if (outfit != null) {
      outfit.addWeight(parka);
    } else {
      (0,external_kolmafia_.cliExecute)("parka spikolodon");
    }
  },
  primed: function primed() {return (0,external_kolmafia_.toBoolean)((0,external_kolmafia_.getProperty)(parkaProp) || "false");},
  unprime: function unprime() {return (0,external_kolmafia_.setProperty)(parkaProp, "false");},
  attemptPrime: function attemptPrime() {
    if ((0,external_kolmafia_.currentRound)() == 0) {
      return false;
    }

    var skill = external_kolmafia_.Skill.get("Launch spikolodon spikes");

    if (!(0,external_kolmafia_.haveSkill)(skill) || (0,external_kolmafia_.myMp)() < (0,external_kolmafia_.mpCost)(skill)) {
      return false;
    }

    var prop = "_spikolodonSpikeUses";
    var spikes = (0,external_kolmafia_.toInt)((0,external_kolmafia_.getProperty)(prop));

    Macro.skill(skill).submit();

    if (spikes != (0,external_kolmafia_.toInt)((0,external_kolmafia_.getProperty)(prop))) {
      (0,external_kolmafia_.setProperty)(parkaProp, "true");
      return true;
    }

    (0,external_kolmafia_.print)("Failed to launch spikolodon spikes for some reason..", "red");
    return false;
  }
};

var digitizer = {
  type: ResourceCategory.WANDERERS,
  resource: "Digitize",
  name: "Source Terminal: Digitize",
  worthInAftercore: ResourceValues.EmbezzlerValue * 3,
  prepare: function prepare(outfit) {
    if (outfit == null) {
      return;
    }

    if (
    (
    (0,external_kolmafia_.getProperty)("sourceTerminalEducate1") +
    (0,external_kolmafia_.getProperty)("sourceTerminalEducate2")).
    includes("digitize.edu"))
    {
      return;
    }

    (0,external_kolmafia_.cliExecute)("terminal educate digitize.edu");
    (0,external_kolmafia_.visitUrl)("main.php");
  },
  macro: function macro() {return Macro.skill("Digitize");}
};

var renimatedReanimator = external_kolmafia_.Familiar.get("Reanimated Reanimator");
var obtuseAngel = external_kolmafia_.Familiar.get("Obtuse Angel");

var reanimatedWanderer = {
  type: ResourceCategory.WANDERERS,
  resource: "Romantic Arrow",
  name: "Reanimated Reanimator: Wanderer Copier",
  worthInAftercore: ResourceValues.EmbezzlerValue * 3,
  familiar: renimatedReanimator,
  prepare: function prepare() {return null;},
  macro: function macro() {return Macro.skill(external_kolmafia_.Skill.get("Wink At"));},
  available: function available() {return (0,external_kolmafia_.haveFamiliar)(renimatedReanimator);}
};

var obtuseAngelWanderer = {
  type: ResourceCategory.WANDERERS,
  resource: "Romantic Arrow",
  name: "Obtuse Angel: Wanderer Copier",
  worthInAftercore: ResourceValues.EmbezzlerValue * 3,
  familiar: obtuseAngel,
  prepare: function prepare() {return null;},
  macro: function macro() {return Macro.skill(external_kolmafia_.Skill.get("Fire a badly romantic arrow"));},
  available: function available() {return (
      !(0,external_kolmafia_.haveFamiliar)(renimatedReanimator) && (0,external_kolmafia_.haveFamiliar)(obtuseAngel));}
};

var yellowParka = {
  type: ResourceCategory.YELLOW_RAY,
  resource: "Yellow Ray",
  name: "Parka: Yellow Ray",
  available: function available() {return (0,external_kolmafia_.availableAmount)(parka) > 0 && (0,external_kolmafia_.haveSkill)(torso);},
  freeTurn: true,
  resourcesUsed: 100,
  worthInAftercore: 0,
  prepare: function prepare(outfit, props) {
    if (outfit != null) {
      outfit.addWeight(parka);
    }

    if (props != null) {
      (0,external_kolmafia_.cliExecute)("parka dilophosaur");
    }
  },
  macro: function macro() {
    return Macro.skill(external_kolmafia_.Skill.get("Spit jurassic acid"));
  },
  ready: function ready() {return (0,external_kolmafia_.haveEffect)(external_kolmafia_.Effect.get("Everything Looks Yellow")) == 0;}
};

var rocket = external_kolmafia_.Item.get("Yellow Rocket");

var yellowRocket = {
  type: ResourceCategory.YELLOW_RAY,
  resource: "Yellow Ray",
  name: "Yellow Rocket",
  worthInAftercore: 250, // Cost of a yellow rocket
  resourcesUsed: 75,
  available: function available() {return (0,GreyClan/* canUseFireworks */.LA)();},
  prepare: function prepare() {
    if ((0,external_kolmafia_.itemAmount)(rocket) == 0) {
      (0,external_kolmafia_.cliExecute)("acquire yellow rocket");
    }

    if ((0,external_kolmafia_.itemAmount)(rocket) == 0) {
      throw "Unable to acquire a yellow rocket";
    }
  },
  macro: function macro() {return Macro.item(external_kolmafia_.Item.get("Yellow Rocket"));},
  ready: function ready() {return (
      (0,external_kolmafia_.myMeat)() > 300 && (0,external_kolmafia_.haveEffect)(external_kolmafia_.Effect.get("Everything Looks Yellow")) == 0);}
};

var retrocape = external_kolmafia_.Item.get("unwrapped knock-off retro superhero cape");

var retroRay = {
  type: ResourceCategory.YELLOW_RAY,
  resource: "Yellow Ray",
  name: "Retrocape: Yellow Ray",
  worthInAftercore: 0,
  available: function available() {return (0,external_kolmafia_.availableAmount)(retrocape) > 0;},
  resourcesUsed: 100,
  prepare: function prepare(outfit, props) {
    if (outfit != null) {
      outfit.addWeight(retrocape);
    }

    if (props != null) {
      (0,external_kolmafia_.cliExecute)("retrocape heck kiss");
    }
  },
  macro: function macro() {return Macro.skill(external_kolmafia_.Skill.get("Unleash the Devil's Kiss"));},
  ready: function ready() {return (0,external_kolmafia_.haveEffect)(external_kolmafia_.Effect.get("Everything Looks Yellow")) == 0;}
};

var cosplaySaber = external_kolmafia_.Item.get("Fourth of May Cosplay Saber");

var cosplayYellowRay = {
  type: ResourceCategory.YELLOW_RAY,
  resource: "Cosplay Saber",
  name: "Cosplay Saber: YR",
  freeTurn: true,
  worthInAftercore: ResourceValues.CosplaySaberValue,
  prepare: function prepare(outfit, props) {
    if (outfit != null) {
      outfit.addWeight(cosplaySaber);
    }
    if (props != null) {
      props.setChoiceProperty(1387, 3);
    }
  },
  macro: function macro() {return Macro.skill(external_kolmafia_.Skill.get("Use The Force"));},
  ready: function ready() {return true;}
};

var backupCamera = external_kolmafia_.Item.get("Backup Camera");

var backupCopier = {
  type: ResourceCategory.COPIER,
  resource: "Backup Camera",
  worthInAftercore: ResourceValues.EmbezzlerValue, // Embezzler
  prepare: function prepare(outfit) {return (
      outfit != null ? outfit.addWeight(backupCamera) : null);},
  macro: function macro() {return Macro.skill(external_kolmafia_.Skill.get("Back-Up to your Last Enemy"));}
};

var cosplayCopier = {
  type: ResourceCategory.OLFACT_COPIER,
  resource: "Cosplay Saber",
  name: "Cosplay Saber: Friends",
  worthInAftercore: ResourceValues.CosplaySaberValue,
  prepare: function prepare(outfit, props) {
    if (outfit != null) {
      outfit.addWeight(cosplaySaber);
    }
    if (props != null) {
      props.setChoiceProperty(1387, 2);
    }
  },
  macro: function macro() {return Macro.skill(external_kolmafia_.Skill.get("Use The Force"));}
};

var cargoShorts = {
  type: ResourceCategory.CARGO_SHORTS,
  resource: "Cargo Shorts",
  freeTurn: true,
  worthInAftercore: ResourceValues.CargoShortsValue, // Some sellable item
  prepare: function prepare() {},
  pocket: function (_pocket) {function pocket(_x) {return _pocket.apply(this, arguments);}pocket.toString = function () {return _pocket.toString();};return pocket;}(function (pocket) {
    (0,external_kolmafia_.visitUrl)("inventory.php?action=pocket");
    (0,external_kolmafia_.visitUrl)("choice.php?whichchoice=1420&option=1&pocket=" + pocket + "&pwd=");
  })
};

var faxMachine = {
  type: ResourceCategory.FAXER,
  resource: "Fax Machine",
  worthInAftercore: ResourceValues.EmbezzlerValue, // Embezzler
  prepare: function prepare() {},
  available: function available() {return (0,GreyClan/* canUseFaxMachine */.ZP)();},
  fax: function fax(monster) {
    if ((0,external_kolmafia_.getProperty)("_photocopyUsed") != "false") {
      throw "The fax was already used!";
    }

    (0,GreyClan/* getFax */.hw)(monster);

    (0,external_kolmafia_.visitUrl)("inv_use.php?which=3&whichitem=4873&pwd");
  }
};

var combatLocket = {
  type: ResourceCategory.FAXER,
  resource: "Combat Locket",
  worthInAftercore: ResourceValues.EmbezzlerValue, // Embezzler
  prepare: function prepare() {},
  fax: function fax(monster) {
    (0,external_kolmafia_.visitUrl)("inventory.php?reminisce=1", false);
    (0,external_kolmafia_.visitUrl)("choice.php?pwd=&whichchoice=1463&option=1&mid=" + (0,external_kolmafia_.toInt)(monster));
  }
};

var wish = external_kolmafia_.Item.get("Pocket Wish");
var genieBottle = external_kolmafia_.Item.get("Genie Bottle");

var wishFaxer = {
  type: ResourceCategory.FAXER,
  resource: "Wish",
  worthInAftercore: 50000, // Sell
  prepare: function prepare() {},
  fax: function fax(monster) {
    if (
    (0,external_kolmafia_.availableAmount)(genieBottle) > 0 &&
    (0,external_kolmafia_.toInt)((0,external_kolmafia_.getProperty)("_genieWishesUsed")) < 3)
    {
      (0,external_kolmafia_.visitUrl)("inv_use.php?pwd=&which=99&whichitem=9529");
    } else if ((0,external_kolmafia_.availableAmount)(wish) == 0) {
      throw "Not enough pocket wishes!";
    } else {
      (0,external_kolmafia_.visitUrl)("inv_use.php?pwd=&which=99&whichitem=9537");
    }

    (0,external_kolmafia_.visitUrl)("choice.php?forceoption=0");

    try {
      (0,external_kolmafia_.visitUrl)(
      "choice.php?pwd=&option=1&whichchoice=1267&wish=" +
      (0,external_kolmafia_.urlEncode)("to fight " + monster.name),
      true,
      true);

    } catch (e) {
      (0,external_kolmafia_.print)(e);
    }

    (0,external_kolmafia_.visitUrl)("choice.php");

    if ((0,external_kolmafia_.currentRound)() == 0) {
      throw "Failed to wish in a monster";
    }
  }
};

var cosplayBanisher = {
  type: ResourceCategory.BANISHER,
  resource: "Cosplay Saber",
  name: "Cosplay Saber: Banish",
  worthInAftercore: ResourceValues.CosplaySaberValue, // Garbo has some use of it, but if you have an oflaction like its basically worth grimace pill/2 free fights
  prepare: function prepare(outfit, props) {
    if (outfit != null) {
      outfit.addWeight(cosplaySaber);
    }
    if (outfit != null) {
      props.setChoiceProperty(1387, 1);
    }
  },
  macro: function macro() {return Macro.skill(external_kolmafia_.Skill.get("Use The Force"));}
};

var bowlingBall = {
  type: ResourceCategory.BANISHER,
  resource: "Bowling Ball",
  worthInAftercore: 0, // This doesn't cost us anything to use
  prepare: function prepare() {},
  macro: function macro() {return Macro.skill(external_kolmafia_.Skill.get("Bowl a Curveball"));}
};

var asdon = {
  type: ResourceCategory.BANISHER,
  resource: "Asdon",
  worthInAftercore: 900, // The rough price to fuel up the asdon
  prepare: function prepare() {}
};

var deckOfEveryCard = {
  type: ResourceCategory.DECK_OF_EVERY_CARD,
  resource: "Deck of Every Card",
  worthInAftercore: ResourceValues.DeckOfCardsValue,
  prepare: function prepare() {},
  pickCard: function pickCard(card) {
    if (card != null) {
      throw "You're not running a Pack of Cards Cheat, why provide a card name?";
    }

    (0,external_kolmafia_.cliExecute)("play random");
  }
};

var deckOfEveryCardCheat = {
  type: ResourceCategory.DECK_OF_EVERY_CARD_CHEAT,
  resource: "Deck of Every Card",
  name: "Deck of Every Card: Cheat",
  worthInAftercore: ResourceValues.DeckOfCardsValue * 10, // Worth 20k, 20k and 10k (Blue mana x2, then misc)
  resourcesUsed: 5,
  prepare: function prepare() {},
  pickCard: function pickCard(card) {return (0,external_kolmafia_.cliExecute)("cheat ".concat(card));}
};

var zappable = {
  type: ResourceCategory.ZAP,
  resource: "Zap Wand",
  worthInAftercore: ResourceValues.ZapWandValue,
  prepare: function prepare() {}
};

var catHeist = {
  type: ResourceCategory.CAT_HEIST,
  resource: "Cat Burglar Heist",
  worthInAftercore: ResourceValues.CatBurglarHeistValue,
  prepare: function prepare() {},
  doHeist: function doHeist(item) {
    if (
    (0,external_kolmafia_.toInt)((0,external_kolmafia_.getProperty)("catBurglarBankHeists")) == 0 &&
    (0,external_kolmafia_.toInt)((0,external_kolmafia_.getProperty)("_catBurglarCharge")) <
    10 * ((0,external_kolmafia_.toInt)((0,external_kolmafia_.getProperty)("_catBurglarHeistsComplete")) + 1))
    {
      throw "Unable to heist, no heists available!";
    }

    var heistResult = (0,external_kolmafia_.heist)(item);

    if (!heistResult) {
      throw "Failed to perform a cat burglar heist";
    }
  }
};

var chateauPainting = {
  type: ResourceCategory.FAXER,
  resource: "Chateau Painting",
  worthInAftercore: ResourceValues.ChateauPaintingValue,
  prepare: function prepare() {},
  fax: function fax(monster) {
    if ((0,external_kolmafia_.toMonster)((0,external_kolmafia_.getProperty)("chateauMonster")) != monster) {
      throw "Unexpected monster attempted to fax!";
    }
  }
};

var hottub = {
  type: ResourceCategory.HOT_TUB,
  resource: "Hot Tub",
  worthInAftercore: ResourceValues.HotTubValue,
  prepare: function prepare() {}
};

var allResources = [
gloveReplace,
clover,
extingusherPolar,
extingusherZoneSpecific,
pull,
yellowRocket,
yellowParka,
portscan,
ncParka,
cosplayYellowRay,
// pillkeeperNC,
backupCopier,
cosplayCopier,
cargoShorts,
faxMachine,
combatLocket,
wishFaxer,
cosplayBanisher,
bowlingBall,
asdon,
deckOfEveryCard,
deckOfEveryCardCheat,
zappable,
catHeist,
hottub,
retroRay,
chateauPainting,
hugsAndKisses,
digitizer,
reanimatedWanderer,
obtuseAngelWanderer].

map(function (r) {var _r$name;
  r.name = (_r$name = r.name) !== null && _r$name !== void 0 ? _r$name : r.resource;

  return r;
}).
sort(function (r1, r2) {return r1.worthInAftercore - r2.worthInAftercore;});

function getResources()

{var includingUnavailable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (includingUnavailable) {
    return allResources;
  }

  return allResources.filter(function (r) {return r.available == null || r.available();});
}

/**
 * If this resource is something that changes with turns used
 */
function isTurnCounter(resource) {
  return (
    resource == "Bowling Ball" ||
    resource == "Yellow Ray" ||
    resource == "Autumn-aton");

}

function getResourcesLeft(
resourceType)

{var assumeUnused = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  switch (resourceType) {
    case "Asdon":
      return 0;
    case "Hugs and Kisses":
      if (!haveFamiliar(xoFam)) {
        return 0;
      }

      return 11 - (assumeUnused ? 0 : toInt(getProperty("_xoHugsUsed")));
    case "Yellow Ray":
      var played =
      turnsPlayed() + haveEffect(Effect.get("Everything Looks Yellow"));

      return 650 - (assumeUnused ? 0 : played);
    case "Pull":
      if (GreySettings.isHardcoreMode()) {
        return 0;
      }

      if (!assumeUnused && pullsRemaining() == -1) {
        return 1000;
      }

      // Clamp
      var pullsSetting = Math.max(0, Math.min(GreySettings.greyPullsLimit, 20));

      if (assumeUnused) {
        return pullsSetting;
      }

      var pullsUsed = getProperty("_greyPulls").
      split(",").
      filter(function (s) {return s.length > 0;}).length;

      pullsSetting -= pullsUsed;

      return Math.max(0, Math.min(pullsSetting, pullsRemaining()));
    case "Backup Camera":
      return availableAmount(backupCamera) > 0 ?
      11 - (assumeUnused ? 0 : toInt(getProperty("_backUpUses"))) :
      0;
    case "Combat Locket":
      return availableAmount(Item.get("Combat Lover's Locket")) > 0 ?
      3 - (
      assumeUnused ?
      0 :
      getProperty("_locketMonstersFought").
      split(",").
      filter(function (s) {return s.length > 0;}).length) :
      0;
    case "Cargo Shorts":
      if (availableAmount(Item.get("Cargo Cultist Shorts")) == 0) {
        return 0;
      }

      if (!assumeUnused && toBoolean(getProperty("_cargoPocketEmptied"))) {
        return 0;
      }

      return 1;
    case "Powerful Glove":
      return availableAmount(glove) > 0 ?
      100 - (
      assumeUnused ?
      0 :
      toInt(getProperty("_powerfulGloveBatteryPowerUsed"))) :
      0;
    case "Fire Extingusher":
      return availableAmount(extingusher) > 0 ?
      assumeUnused ?
      100 :
      toInt(getProperty("_fireExtinguisherCharge")) :
      0;
    case "Clover":
      return assumeUnused || !toBoolean(getProperty("breakfastCompleted")) ?
      3 :
      itemAmount(Item.get("11-leaf clover"));
    case "Deck of Every Card":
      return availableAmount(Item.get("Deck of Every Card")) > 0 ?
      15 - (assumeUnused ? 0 : toInt(getProperty("_deckCardsDrawn"))) :
      0;
    case "Zap Wand":
      if (!GreySettings.greyGrabZapWand) {
        return 0;
      }

      var zaps = toInt(getProperty("_zapCount"));

      // Blew up
      if (!assumeUnused && zaps < 0) {
        return 0;
      }

      return Math.max(0, 2 - (assumeUnused ? 0 : zaps));
    case "Cosplay Saber":
      return availableAmount(cosplaySaber) > 0 ?
      5 - (assumeUnused ? 0 : toInt(getProperty("_saberForceUses"))) :
      0;
    case "Bowling Ball":
      return 0;
    case "Wish":
      var haveBottle = availableAmount(Item.get("Genie Bottle")) > 0;

      if (!haveBottle) {
        return 0;
      }

      if (assumeUnused) {
        return 3;
      }

      var fightsRemaining = 3 - toInt(getProperty("_genieFightsUsed"));
      var wishesAvailable = Math.max(
      itemAmount(wish),
      3 - toInt(getProperty("_genieWishesUsed")));


      return Math.min(fightsRemaining, wishesAvailable);
    case "Fax Machine":
      if (!canUseFaxMachine()) {
        return 0;
      }

      return assumeUnused || getProperty("_photocopyUsed") == "false" ? 1 : 0;
    case "Cat Burglar Heist":
      return haveFamiliar(Familiar.get("Cat Burglar")) ?
      assumeUnused ?
      1 :
      1 - toInt(getProperty("_catBurglarHeistsComplete")) :
      0;
    case "Hot Tub":
      if (isVIPDisabled()) {
        return 0;
      }

      return 5 - (assumeUnused ? 0 : toInt(getProperty("_hotTubSoaks")));
    case "Chateau Painting":
      if (!toBoolean(getProperty("chateauAvailable"))) {
        return 0;
      }

      return assumeUnused || !toBoolean(getProperty("_chateauMonsterFought")) ?
      1 :
      0;
    case "Parka: Force NC":
      if (!haveSkill(torso) || availableAmount(parka) == 0) {
        return 0;
      }

      if (assumeUnused) {
        return 5;
      }

      var spikesRemaining = 5 - toInt(getProperty("_spikolodonSpikeUses"));

      // Don't count a primed resource as used yet!
      if (toBoolean(getProperty(parkaProp))) {
        spikesRemaining++;
      }

      return spikesRemaining;
    case "Pillkeeper":
      if (availableAmount(pillkeeper) == 0) {
        return 0;
      }

      return assumeUnused || !toBoolean(getProperty("_freePillKeeperUsed")) ?
      1 :
      0;
    case "Portscan":
      if (
      !sourceTerminal ||
      !getProperty("sourceTerminalEducateKnown").includes("portscan.edu"))
      {
        return 0;
      }

      if (assumeUnused) {
        return 3;
      }

      var scansRemaining =
      3 - toInt(getProperty("_sourceTerminalPortscanUses"));

      // If resource is primed, don't count this resource as done yet!
      if (toBoolean(getProperty(portscanProp))) {
        scansRemaining++;
      }

      return scansRemaining;
    case "Autumn-aton":
      return 0;
    case "Digitize":
      if (
      !sourceTerminal ||
      !getProperty("sourceTerminalEducateKnown").includes("digitize.edu"))
      {
        return 0;
      }

      if (assumeUnused) {
        return 3;
      }

      return 3 - toInt(getProperty("_sourceTerminalDigitizeMonsterCount"));
    case "Romantic Arrow":
      if (!haveFamiliar(renimatedReanimator) || !haveFamiliar(obtuseAngel)) {
        return 0;
      }

      if (assumeUnused) {
        return 1;
      }

      return toInt(getProperty("_badlyRomanticArrows"));
    default:
      throw "No idea what the resource " + resourceType + " is.";}

}

/***/ }),

/***/ 782:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LA": () => (/* binding */ canUseFireworks),
/* harmony export */   "Q5": () => (/* binding */ getAvailableClans),
/* harmony export */   "ZP": () => (/* binding */ canUseFaxMachine),
/* harmony export */   "hw": () => (/* binding */ getFax)
/* harmony export */ });
/* unused harmony exports runFireworks, doFortuneTeller, hasVIPInvitation, hasWhitelistToCurrentClan, canUseFortuneBuff, useFortuneBuff, isVIPDisabled */
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GreySettings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(772);
function _createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e2) {throw _e2;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e3) {didErr = true;err = _e3;}, f: function f() {try {if (!normalCompletion && it["return"] != null) it["return"]();} finally {if (didErr) throw err;}} };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];if (_i == null) return;var _arr = [];var _n = true;var _d = false;var _s, _e;try {for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


var vipInvitation = kolmafia__WEBPACK_IMPORTED_MODULE_0__.Item.get("Clan VIP Lounge key");
var fireworks = kolmafia__WEBPACK_IMPORTED_MODULE_0__.Item.get("Clan Underground fireworks shop");
var fortune = kolmafia__WEBPACK_IMPORTED_MODULE_0__.Item.get("Clan Carnival Game");
var faxMachine = kolmafia__WEBPACK_IMPORTED_MODULE_0__.Item.get("deluxe fax machine");
var faxOnline = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.isOnline)("CheeseFax");
var fortuneTellers = new Map([
[82072, "AverageChat"],
[90485, "CheeseFax"]]);


var availableClans;var

ClanSwitcher = /*#__PURE__*/function () {function ClanSwitcher() {_classCallCheck(this, ClanSwitcher);_defineProperty(this, "origClan",
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanId)());}_createClass(ClanSwitcher, [{ key: "joinClan", value:

    function joinClan(id) {
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanId)() == id) {
        return true;
      }

      var page = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)(
      "showclan.php?recruiter=1&whichclan=" +
      id +
      "&pwd&whichclan=" +
      id +
      "&action=joinclan&apply=Apply+to+this+Clan&confirm=on");


      var success = page.includes("clanhalltop.gif");

      if (success) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Switched to clan " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)(), "gray");
      } else {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Failed to switch clans! Unable to switch to clan ID " + id, "red");
      }

      return success;
    } }, { key: "restoreClan", value:

    function restoreClan() {
      if (this.origClan == (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanId)()) {
        return;
      }

      this.joinClan(this.origClan);
    } }]);return ClanSwitcher;}();


function getDefaultClan() {
  if (_GreySettings__WEBPACK_IMPORTED_MODULE_1__/* .GreySettings.greyVIPClan.trim */ .G6.greyVIPClan.trim().length == 0) {
    return null;
  }

  if (_GreySettings__WEBPACK_IMPORTED_MODULE_1__/* .GreySettings.greyVIPClan.trim */ .G6.greyVIPClan.trim().toLowerCase() == (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)()) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanId)();
  }

  var clanInfo = _toConsumableArray(getAvailableClans()).find(
  function (_ref) {var _ref2 = _slicedToArray(_ref, 2),v = _ref2[1];return v.toLowerCase() == _GreySettings__WEBPACK_IMPORTED_MODULE_1__/* .GreySettings.greyVIPClan.toLowerCase */ .G6.greyVIPClan.toLowerCase();});


  if (clanInfo == null) {
    return null;
  }

  return clanInfo[0];
}

function runInClan(clanId, func) {
  if (!hasWhitelistToCurrentClan() && (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanId)() != clanId) {
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

function loadWhitelists() {
  var prop = "_clansWhitelisted";

  availableClans = new Map();

  if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.propertyExists)(prop)) {
    // Wait until we can fetch the page without errors
    while (
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.currentRound)() != 0 ||
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.handlingChoice)() ||
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.choiceFollowsFight)() ||
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.fightFollowsChoice)())
    {}

    var page = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.visitUrl)("clan_signup.php?place=managewhitelists");

    var match;

    while (
    (match = page.match(
    /option +value=(\d+)>([^<>]*)<\/option>(?!.*name=whichclan>)/)) !=
    null)
    {
      page = page.replace(match[0], "");

      availableClans.set((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(match[1]), match[2]);
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)(
    prop,
    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toJson)(_toConsumableArray(availableClans).map(function (_ref3) {var _ref4 = _slicedToArray(_ref3, 2),k = _ref4[0],v = _ref4[1];return [k.toString(), v];})));

  } else {
    var data = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)(prop);

    availableClans = new Map(
    JSON.parse(data).map(function (_ref5) {var _ref6 = _slicedToArray(_ref5, 2),k = _ref6[0],v = _ref6[1];return [(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(k), v];}));

  }

  return availableClans;
}

function getAvailableClans() {
  if (availableClans != null) {
    return availableClans;
  }

  return loadWhitelists();
}

function getFax(monster) {
  if (isVIPDisabled()) {
    throw "VIP was disabled, but function fax was still called";
  }

  var faxbot = "CheeseFax";

  if (!canAccessClan(getDefaultClan()) || !(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.isOnline)(faxbot)) {
    throw "Cannot access fax machine, clan accessible? ".concat(canAccessClan(
    getDefaultClan()), ". ").concat(
    faxbot, " online? ").concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.isOnline)(faxbot));
  }

  runInClan(getDefaultClan(), function () {
    if (!canUseFaxMachine()) {
      throw "Expected to be find fax machine in the clan " + (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)();
    }

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.print)("Now trying to fax " + monster.name, "blue");

    var hasReceivedFax = function hasReceivedFax() {
      if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Item.get("photocopied monster")) == 0) {
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("fax receive");
      }

      if (
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)("photocopyMonster").toLowerCase() ==
      monster.name.toLowerCase())
      {
        return true;
      }

      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.cliExecute)("fax send");
      return false;
    };

    if (!hasReceivedFax()) {
      for (var i = 0; i <= 6; i++) {
        // We might have missed it or overrode it
        if (i % 3 == 0) {
          (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.chatPrivate)(faxbot, monster.name);
        }

        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.wait)(10 + i);

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

  var bot = null;
  var fortuneClan = null;

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
      "red");

      return;
    }var _iterator = _createForOfIteratorHelper(

      fortuneTellers),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _step$value = _slicedToArray(_step.value, 2),clanId = _step$value[0],botName = _step$value[1];
        if (!canAccessClan(clanId) || !isOnline(bot)) {
          continue;
        }

        bot = botName;
        fortuneClan = clanId;
        break;
      }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
  }

  if (bot == null) {
    print(
    "Unfortunately we do not have access to any Fortune Telling as the bots are either offline or you do not have a whitelist to the clans",
    "red");

    return;
  }

  print("Now performing hocus pocus with the Fortune Teller", "blue");

  runInClan(fortuneClan, function () {
    if (getClanLounge()[fortune.name] == null) {
      throw "Expected to be find fortune teller in the clan " + getClanName();
    }

    var failed = 0;

    while (consultsUsed() < 3) {
      // We want the first result to be compatible
      // The second result is incompatible, as its worth more
      // The last result is compatible, as it has nicer equips

      var consultString =
      consultsUsed() == 1 ? "a b c" : "pizza batman thick";

      var consults = consultsUsed();
      cliExecute("fortune " + bot + " " + consultString);

      if (consults == consultsUsed() && failed++ > 3) {
        print(
        "Going to ask " +
        bot +
        " for a fax so they join " +
        getClanName() +
        "...",
        "gray");


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

function hasVIPInvitation() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(vipInvitation) > 0;
}

function canAccessClan(clanId) {
  if (clanId == null) {
    return false;
  }

  return (
    clanId == (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanId)() ||
    hasWhitelistToCurrentClan() && getAvailableClans().has(clanId));

}

function hasWhitelistToCurrentClan() {
  return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanId)() < 0 || getAvailableClans().has((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanId)());
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
  if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanLounge)()[vipItem.name] != null) {
    return (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanId)();
  }

  if (canAccessClan(getDefaultClan()) && getDefaultClan() != (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanId)()) {
    return getDefaultClan();
  }

  return null;
}

function isVIPDisabled() {
  return !hasVIPInvitation() || _GreySettings__WEBPACK_IMPORTED_MODULE_1__/* .GreySettings.greyVIPClan.length */ .G6.greyVIPClan.length == 0;
}

/***/ }),

/***/ 772:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "G6": () => (/* binding */ GreySettings),
/* harmony export */   "p_": () => (/* binding */ getGreySettings)
/* harmony export */ });
/* unused harmony exports moonSigns, getMoonZone */
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _GreyClan__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(782);
function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _typeof(obj) {"@babel/helpers - typeof";return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {return typeof obj;} : function (obj) {return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}, _typeof(obj);}function _createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it["return"] != null) it["return"]();} finally {if (didErr) throw err;}} };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}
















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
    ["Don't Tune", ""]].concat(_toConsumableArray(
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
    if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.propertyExists)(str)) {
      continue;
    }

    var val = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)(str);

    if (triBoolean.includes(val)) {
      continue;
    }

    if (val == "true") {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)(str, "Always");
    } else if (val == "false") {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)(str, "Never");
    } else {
      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)(str, "Best Judgement");
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
    viable: (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(kolmafia__WEBPACK_IMPORTED_MODULE_0__.Item.get("mumming trunk")) > 0
  };

  var defaultAdvValue =
  Math.round((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)("valueOfAdventure")) * 0.7 / 100) * 100;

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
      return value == "" || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toItem)(value).usable;
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
    valid: function valid(value) {var _iterator = _createForOfIteratorHelper(
        value.split(",").map(function (s) {return s.trim();})),_step;try {var _loop = function _loop() {var s = _step.value;
          if (s.length == 0) {
            return "continue";
          }

          var fam = kolmafia__WEBPACK_IMPORTED_MODULE_0__.Familiar.all().find(
          function (f) {return f.toString().toLowerCase() == s.toLowerCase();});


          if (fam != null) {
            return "continue";
          }

          return { v: false };};for (_iterator.s(); !(_step = _iterator.n()).done;) {var _ret = _loop();if (_ret === "continue") continue;if (_typeof(_ret) === "object") return _ret.v;
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

      return true;
    },
    "default": "Grey Goose"
  };

  var viableClans = [
  ["Don't use VIP Invitation", ""]].concat(_toConsumableArray(
  _toConsumableArray((0,_GreyClan__WEBPACK_IMPORTED_MODULE_1__/* .getAvailableClans */ .Q5)().values()).map(function (s) {return [s, s];})));


  var greyVIPClan = {
    name: "greyVIPClan",
    description:
    "The name of the clan we will use to execute Fax Requests, and switch to for other VIP functions if they are not available in our current clan. Set to empty (Or in relay, 'Don't use VIP Invitation') to disable all VIP usage, even the yellow rockets.. Best support for 'Bonus Adventures From Hell' and 'The Average Clan'",
    valid: function valid(value) {return (
        value.length == 0 ||
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getClanName)().toLowerCase() == value.toLowerCase() ||
        _toConsumableArray((0,_GreyClan__WEBPACK_IMPORTED_MODULE_1__/* .getAvailableClans */ .Q5)().values()).find(
        function (s) {return s.toLowerCase() == value.toLowerCase();}) !=
        null);},
    "default": "Bonus Adventures From Hell",
    viableSettings: viableClans
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

  var greyCookbat = {
    name: "greyCookbatRecipe",
    description:
    "Should the script try to use the cookbat to drop a recipe when no familiar is needed? This detects a recipe in inventory to know if one dropped, removing it will make it think none dropped",
    valid: isBoolean,
    "default": true
  };

  var prioritizeLocket = {
    name: "greyLocketWeight",
    description:
    "Set this to a value higher than 0 to add weight to maximizer if you want Greyday to wear the locket more often, this is only useful if you're trying to locket everything",
    valid: function valid(s) {return /$\d+^/.test(s);},
    "default": 0
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
  greyCookbat,
  greyVIPClan,
  moonTune,
  dailyMalware,
  greySavePulls,
  grayAdventureValue,
  greyValueOfNC,
  greyPullValue,
  greySwitchWorkshed,
  greyClipArt,
  prioritizeLocket].
  map(function (s) {
    s.setting = "main";

    return s;
  });
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















function getMoonZone() {var sign = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mySign)();
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

var spoon = kolmafia__WEBPACK_IMPORTED_MODULE_0__.Item.get("hewn moon-rune spoon");

var GreySettings = /*#__PURE__*/function () {function GreySettings() {_classCallCheck(this, GreySettings);}_createClass(GreySettings, null, [{ key: "isHardcoreMode", value:
































    function isHardcoreMode() {
      return this.hardcoreMode || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.inHardcore)();
    } }, { key: "willBeAccessible", value:

    function willBeAccessible(
    moonzone)

    {var assumeUnstarted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return (
        (assumeUnstarted || (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)("moonTuned") != "true") &&
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(spoon) > 0 &&
        this.greyTuneMoonSpoon != null &&
        getMoonZone(this.greyTuneMoonSpoon) == moonzone);

    } }, { key: "canMoonSpoon", value:

    function canMoonSpoon() {
      return (
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)("moonTuned") == "false" &&
        (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.availableAmount)(spoon) > 0 &&
        this.greyTuneMoonSpoon != null &&
        this.greyTuneMoonSpoon.toLowerCase() != (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.mySign)().toLowerCase());

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

    function loadSettings() {var _iterator2 = _createForOfIteratorHelper(
        getGreySettings()),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var setting = _step2.value;
          var prop = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)(setting.name);

          if (prop == "") {
            prop = setting["default"];
          } else if (typeof setting["default"] == "boolean") {
            prop = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toBoolean)(prop);
          } else if (typeof setting["default"] == "number") {
            prop = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toInt)(prop);
          }

          GreySettings[setting.name] = prop;
        }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}
    } }]);return GreySettings;}();_defineProperty(GreySettings, "hardcoreMode", false);_defineProperty(GreySettings, "speedRunMode", false);_defineProperty(GreySettings, "adventuresBeforeAbort", 8);_defineProperty(GreySettings, "adventuresGenerateIfPossibleOrAbort", 12);_defineProperty(GreySettings, "usefulSkillsWeight", 6);_defineProperty(GreySettings, "handySkillsWeight", 0.5);_defineProperty(GreySettings, "greyBreakAtTower", void 0);_defineProperty(GreySettings, "greyReachedTower", (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toBoolean)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)("_greyReachedTower")));_defineProperty(GreySettings, "greyDailyDungeon", void 0);_defineProperty(GreySettings, "greyDailyMalware", void 0);_defineProperty(GreySettings, "greyPrepareLevelingResources", void 0);_defineProperty(GreySettings, "greyFantasyBandits", void 0);_defineProperty(GreySettings, "greyTuneMoonSpoon", void 0);_defineProperty(GreySettings, "greyDebug", (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.toBoolean)((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)("greyDebug") || "false"));_defineProperty(GreySettings, "greySkipPalindome", void 0);_defineProperty(GreySettings, "greyPullsLimit", 20);_defineProperty(GreySettings, "greyValueOfAdventure", void 0);_defineProperty(GreySettings, "greyUseMummery", void 0);_defineProperty(GreySettings, "greyVotingBooth", void 0);_defineProperty(GreySettings, "greyBountyHunting", void 0);_defineProperty(GreySettings, "greySwitchWorkshed", void 0);_defineProperty(GreySettings, "greyClipArt", void 0);_defineProperty(GreySettings, "greyVIPClan", void 0);_defineProperty(GreySettings, "greyFortuneTeller", void 0);_defineProperty(GreySettings, "greyDeleteKmails", void 0);_defineProperty(GreySettings, "greyHippyMode", false);_defineProperty(GreySettings, "greyGrabZapWand", void 0);_defineProperty(GreySettings, "greyCookbatRecipe", void 0);_defineProperty(GreySettings, "greyLocketWeight", void 0);

/***/ }),

/***/ 530:
/***/ ((module) => {

module.exports = require("kolmafia");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "main": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(530);
/* harmony import */ var kolmafia__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(kolmafia__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _typings_ResourceTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(212);
/* harmony import */ var _utils_GreySettings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(772);
function _typeof(obj) {"@babel/helpers - typeof";return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {return typeof obj;} : function (obj) {return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}, _typeof(obj);}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}















function main() {
  var notifications = [];
  // handle updating values
  var fields = (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.formFields)();

  if (fields["api"] != null) {
    var returns = eval(fields["api"]) || "";

    (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.write)(returns + (returns ? "" : " "));
    return;
  }

  Object.keys(fields).forEach(function (field) {
    if (field === "relay") {
      return;
    }

    if (field === "notifications") {
      notifications.push.apply(notifications, _toConsumableArray(JSON.parse(fields[field])));
      return;
    }

    if ((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)(field).toString() !== fields[field]) {
      notifications.push("".concat(
      field, " changed from ").concat((0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)(field), " to ").concat(fields[field]));


      (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.setProperty)(field, fields[field]);
    }
  });

  var settings = [];

  // load user perferences into json object to pass to react
  for (var _i = 0, _arr = [].concat(_toConsumableArray((0,_typings_ResourceTypes__WEBPACK_IMPORTED_MODULE_1__/* .getResourceSettings */ .eF)()), _toConsumableArray((0,_utils_GreySettings__WEBPACK_IMPORTED_MODULE_2__/* .getGreySettings */ .p_)())); _i < _arr.length; _i++) {var setting = _arr[_i];
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
      setting: setting.setting,
      name: setting.name,
      description: setting.description,
      "default": setting["default"] == null ? "" : setting["default"].toString(),
      value: (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)(setting.name),
      savedValue: (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.getProperty)(setting.name),
      dropdown: dropdowns,
      viable: setting.viable != false,
      type: _typeof(setting["default"])
    };

    if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.propertyExists)(prop.name) || !setting.valid(prop.value)) {
      prop.value = setting["default"] + "";

      if (!(0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.propertyExists)(prop.name)) {
        prop.savedValue = prop.value;
      }
    }

    settings.push(prop);
  }

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.writeln)('<head><link rel="stylesheet" href="/greyday/main.css"></head>');
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.writeln)('<div id="root"></div>');

  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.writeln)("<script>");

  // add script that react calls when loaded to get kol data
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.writeln)("let getData = function(callback) {callback(".concat(
  JSON.stringify({
    settings: settings,
    notifications: notifications
  }), ")}"));


  // close notifications when they are clicked on
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.writeln)("document.onclick = (e) => {\n    if(e.target.classList.contains('notification')) e.target.remove();\n  }");



  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.writeln)("</script>");

  // include react scripts
  (0,kolmafia__WEBPACK_IMPORTED_MODULE_0__.writeln)('<script src="./greyday/greyday_relay.js"></script>');
}
})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;