/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 604:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
function _typeof(obj) {"@babel/helpers - typeof";return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {return typeof obj;} : function (obj) {return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}, _typeof(obj);}var aa = __webpack_require__(966),ca = __webpack_require__(731);function p(a) {for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) {b += "&args[]=" + encodeURIComponent(arguments[c]);}return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";}var da = new Set(),ea = {};function fa(a, b) {ha(a, b);ha(a + "Capture", b);}
function ha(a, b) {ea[a] = b;for (a = 0; a < b.length; a++) {da.add(b[a]);}}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement),ja = Object.prototype.hasOwnProperty,ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,la =
  {},ma = {};function oa(a) {if (ja.call(ma, a)) return !0;if (ja.call(la, a)) return !1;if (ka.test(a)) return ma[a] = !0;la[a] = !0;return !1;}function pa(a, b, c, d) {if (null !== c && 0 === c.type) return !1;switch (_typeof(b)) {case "function":case "symbol":return !0;case "boolean":if (d) return !1;if (null !== c) return !c.acceptsBooleans;a = a.toLowerCase().slice(0, 5);return "data-" !== a && "aria-" !== a;default:return !1;}}
function qa(a, b, c, d) {if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return !0;if (d) return !1;if (null !== c) switch (c.type) {case 3:return !b;case 4:return !1 === b;case 5:return isNaN(b);case 6:return isNaN(b) || 1 > b;}return !1;}function v(a, b, c, d, e, f, g) {this.acceptsBooleans = 2 === b || 3 === b || 4 === b;this.attributeName = d;this.attributeNamespace = e;this.mustUseProperty = c;this.propertyName = a;this.type = b;this.sanitizeURL = f;this.removeEmptyString = g;}var z = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (a) {z[a] = new v(a, 0, !1, a, null, !1, !1);});[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function (a) {var b = a[0];z[b] = new v(b, 1, !1, a[1], null, !1, !1);});["contentEditable", "draggable", "spellCheck", "value"].forEach(function (a) {z[a] = new v(a, 2, !1, a.toLowerCase(), null, !1, !1);});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (a) {z[a] = new v(a, 2, !1, a, null, !1, !1);});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function (a) {z[a] = new v(a, 3, !1, a.toLowerCase(), null, !1, !1);});
["checked", "multiple", "muted", "selected"].forEach(function (a) {z[a] = new v(a, 3, !0, a, null, !1, !1);});["capture", "download"].forEach(function (a) {z[a] = new v(a, 4, !1, a, null, !1, !1);});["cols", "rows", "size", "span"].forEach(function (a) {z[a] = new v(a, 6, !1, a, null, !1, !1);});["rowSpan", "start"].forEach(function (a) {z[a] = new v(a, 5, !1, a.toLowerCase(), null, !1, !1);});var ra = /[\-:]([a-z])/g;function sa(a) {return a[1].toUpperCase();}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function (a) {var b = a.replace(ra,
  sa);z[b] = new v(b, 1, !1, a, null, !1, !1);});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (a) {var b = a.replace(ra, sa);z[b] = new v(b, 1, !1, a, "http://www.w3.org/1999/xlink", !1, !1);});["xml:base", "xml:lang", "xml:space"].forEach(function (a) {var b = a.replace(ra, sa);z[b] = new v(b, 1, !1, a, "http://www.w3.org/XML/1998/namespace", !1, !1);});["tabIndex", "crossOrigin"].forEach(function (a) {z[a] = new v(a, 1, !1, a.toLowerCase(), null, !1, !1);});
z.xlinkHref = new v("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);["src", "href", "action", "formAction"].forEach(function (a) {z[a] = new v(a, 1, !1, a.toLowerCase(), null, !0, !0);});
function ta(a, b, c, d) {var e = z.hasOwnProperty(b) ? z[b] : null;if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? !1 : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && !0 === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,va = Symbol["for"]("react.element"),wa = Symbol["for"]("react.portal"),ya = Symbol["for"]("react.fragment"),za = Symbol["for"]("react.strict_mode"),Aa = Symbol["for"]("react.profiler"),Ba = Symbol["for"]("react.provider"),Ca = Symbol["for"]("react.context"),Da = Symbol["for"]("react.forward_ref"),Ea = Symbol["for"]("react.suspense"),Fa = Symbol["for"]("react.suspense_list"),Ga = Symbol["for"]("react.memo"),Ha = Symbol["for"]("react.lazy");Symbol["for"]("react.scope");Symbol["for"]("react.debug_trace_mode");
var Ia = Symbol["for"]("react.offscreen");Symbol["for"]("react.legacy_hidden");Symbol["for"]("react.cache");Symbol["for"]("react.tracing_marker");var Ja = Symbol.iterator;function Ka(a) {if (null === a || "object" !== _typeof(a)) return null;a = Ja && a[Ja] || a["@@iterator"];return "function" === typeof a ? a : null;}var A = Object.assign,La;function Ma(a) {if (void 0 === La) try {throw Error();} catch (c) {var b = c.stack.trim().match(/\n( *(at )?)/);La = b && b[1] || "";}return "\n" + La + a;}var Na = !1;
function Oa(a, b) {if (!a || Na) return "";Na = !0;var c = Error.prepareStackTrace;Error.prepareStackTrace = void 0;try {if (b) {if (b = function b() {throw Error();}, Object.defineProperty(b.prototype, "props", { set: function set() {throw Error();} }), "object" === (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && Reflect.construct) {try {Reflect.construct(b, []);} catch (l) {var d = l;}Reflect.construct(a, [], b);} else {try {b.call();} catch (l) {d = l;}a.call(b.prototype);}} else {try {throw Error();} catch (l) {d = l;}a();}} catch (l) {if (l && d && "string" === typeof l.stack) {for (var e = l.stack.split("\n"),
        f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h];) {h--;}for (; 1 <= g && 0 <= h; g--, h--) {if (e[g] !== f[h]) {if (1 !== g || 1 !== h) {do {if (g--, h--, 0 > h || e[g] !== f[h]) {var k = "\n" + e[g].replace(" at new ", " at ");a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));return k;}} while (1 <= g && 0 <= h);}break;}}}} finally {Na = !1, Error.prepareStackTrace = c;}return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";}
function Pa(a) {switch (a.tag) {case 5:return Ma(a.type);case 16:return Ma("Lazy");case 13:return Ma("Suspense");case 19:return Ma("SuspenseList");case 0:case 2:case 15:return a = Oa(a.type, !1), a;case 11:return a = Oa(a.type.render, !1), a;case 1:return a = Oa(a.type, !0), a;default:return "";}}
function Qa(a) {if (null == a) return null;if ("function" === typeof a) return a.displayName || a.name || null;if ("string" === typeof a) return a;switch (a) {case ya:return "Fragment";case wa:return "Portal";case Aa:return "Profiler";case za:return "StrictMode";case Ea:return "Suspense";case Fa:return "SuspenseList";}if ("object" === _typeof(a)) switch (a.$$typeof) {case Ca:return (a.displayName || "Context") + ".Consumer";case Ba:return (a._context.displayName || "Context") + ".Provider";case Da:var b = a.render;a = a.displayName;a || (a = b.displayName ||
      b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");return a;case Ga:return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";case Ha:b = a._payload;a = a._init;try {return Qa(a(b));} catch (c) {}}return null;}
function Ra(a) {var b = a.type;switch (a.tag) {case 24:return "Cache";case 9:return (b.displayName || "Context") + ".Consumer";case 10:return (b._context.displayName || "Context") + ".Provider";case 18:return "DehydratedFragment";case 11:return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");case 7:return "Fragment";case 5:return b;case 4:return "Portal";case 3:return "Root";case 6:return "Text";case 16:return Qa(b);case 8:return b === za ? "StrictMode" : "Mode";case 22:return "Offscreen";
    case 12:return "Profiler";case 21:return "Scope";case 13:return "Suspense";case 19:return "SuspenseList";case 25:return "TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if ("function" === typeof b) return b.displayName || b.name || null;if ("string" === typeof b) return b;}return null;}function Sa(a) {switch (_typeof(a)) {case "boolean":case "number":case "string":case "undefined":return a;case "object":return a;default:return "";}}
function Ta(a) {var b = a.type;return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);}
function Ua(a) {var b = Ta(a) ? "checked" : "value",c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b),d = "" + a[b];if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {var e = c.get,f = c.set;Object.defineProperty(a, b, { configurable: !0, get: function get() {return e.call(this);}, set: function set(a) {d = "" + a;f.call(this, a);} });Object.defineProperty(a, b, { enumerable: c.enumerable });return { getValue: function getValue() {return d;}, setValue: function setValue(a) {d = "" + a;}, stopTracking: function stopTracking() {a._valueTracker =
        null;delete a[b];} };}}function Va(a) {a._valueTracker || (a._valueTracker = Ua(a));}function Wa(a) {if (!a) return !1;var b = a._valueTracker;if (!b) return !0;var c = b.getValue();var d = "";a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);a = d;return a !== c ? (b.setValue(a), !0) : !1;}function Xa(a) {a = a || ("undefined" !== typeof document ? document : void 0);if ("undefined" === typeof a) return null;try {return a.activeElement || a.body;} catch (b) {return a.body;}}
function Ya(a, b) {var c = b.checked;return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });}function Za(a, b) {var c = null == b.defaultValue ? "" : b.defaultValue,d = null != b.checked ? b.checked : b.defaultChecked;c = Sa(null != b.value ? b.value : c);a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };}function ab(a, b) {b = b.checked;null != b && ta(a, "checked", b, !1);}
function bb(a, b) {ab(a, b);var c = Sa(b.value),d = b.type;if (null != c) {if ("number" === d) {if (0 === c && "" === a.value || a.value != c) a.value = "" + c;} else a.value !== "" + c && (a.value = "" + c);} else if ("submit" === d || "reset" === d) {a.removeAttribute("value");return;}b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);}
function db(a, b, c) {if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {var d = b.type;if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;b = "" + a._wrapperState.initialValue;c || b === a.value || (a.value = b);a.defaultValue = b;}c = a.name;"" !== c && (a.name = "");a.defaultChecked = !!a._wrapperState.initialChecked;"" !== c && (a.name = c);}
function cb(a, b, c) {if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);}var eb = Array.isArray;
function fb(a, b, c, d) {a = a.options;if (b) {b = {};for (var e = 0; e < c.length; e++) {b["$" + c[e]] = !0;}for (c = 0; c < a.length; c++) {e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = !0);}} else {c = "" + Sa(c);b = null;for (e = 0; e < a.length; e++) {if (a[e].value === c) {a[e].selected = !0;d && (a[e].defaultSelected = !0);return;}null !== b || a[e].disabled || (b = a[e]);}null !== b && (b.selected = !0);}}
function gb(a, b) {if (null != b.dangerouslySetInnerHTML) throw Error(p(91));return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });}function hb(a, b) {var c = b.value;if (null == c) {c = b.children;b = b.defaultValue;if (null != c) {if (null != b) throw Error(p(92));if (eb(c)) {if (1 < c.length) throw Error(p(93));c = c[0];}b = c;}null == b && (b = "");c = b;}a._wrapperState = { initialValue: Sa(c) };}
function ib(a, b) {var c = Sa(b.value),d = Sa(b.defaultValue);null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));null != d && (a.defaultValue = "" + d);}function jb(a) {var b = a.textContent;b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);}function kb(a) {switch (a) {case "svg":return "http://www.w3.org/2000/svg";case "math":return "http://www.w3.org/1998/Math/MathML";default:return "http://www.w3.org/1999/xhtml";}}
function lb(a, b) {return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;}
var mb,nb = function (a) {return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function (b, c, d, e) {MSApp.execUnsafeLocalFunction(function () {return a(b, c, d, e);});} : a;}(function (a, b) {if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;else {mb = mb || document.createElement("div");mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";for (b = mb.firstChild; a.firstChild;) {a.removeChild(a.firstChild);}for (; b.firstChild;) {a.appendChild(b.firstChild);}}});
function ob(a, b) {if (b) {var c = a.firstChild;if (c && c === a.lastChild && 3 === c.nodeType) {c.nodeValue = b;return;}}a.textContent = b;}
var pb = { animationIterationCount: !0, aspectRatio: !0, borderImageOutset: !0, borderImageSlice: !0, borderImageWidth: !0, boxFlex: !0, boxFlexGroup: !0, boxOrdinalGroup: !0, columnCount: !0, columns: !0, flex: !0, flexGrow: !0, flexPositive: !0, flexShrink: !0, flexNegative: !0, flexOrder: !0, gridArea: !0, gridRow: !0, gridRowEnd: !0, gridRowSpan: !0, gridRowStart: !0, gridColumn: !0, gridColumnEnd: !0, gridColumnSpan: !0, gridColumnStart: !0, fontWeight: !0, lineClamp: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, tabSize: !0, widows: !0, zIndex: !0,
    zoom: !0, fillOpacity: !0, floodOpacity: !0, stopOpacity: !0, strokeDasharray: !0, strokeDashoffset: !0, strokeMiterlimit: !0, strokeOpacity: !0, strokeWidth: !0 },qb = ["Webkit", "ms", "Moz", "O"];Object.keys(pb).forEach(function (a) {qb.forEach(function (b) {b = b + a.charAt(0).toUpperCase() + a.substring(1);pb[b] = pb[a];});});function rb(a, b, c) {return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";}
function sb(a, b) {a = a.style;for (var c in b) {if (b.hasOwnProperty(c)) {var d = 0 === c.indexOf("--"),e = rb(c, b[c], d);"float" === c && (c = "cssFloat");d ? a.setProperty(c, e) : a[c] = e;}}}var tb = A({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function ub(a, b) {if (b) {if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));if (null != b.dangerouslySetInnerHTML) {if (null != b.children) throw Error(p(60));if ("object" !== _typeof(b.dangerouslySetInnerHTML) || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));}if (null != b.style && "object" !== _typeof(b.style)) throw Error(p(62));}}
function vb(a, b) {if (-1 === a.indexOf("-")) return "string" === typeof b.is;switch (a) {case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return !1;default:return !0;}}var wb = null;function xb(a) {a = a.target || a.srcElement || window;a.correspondingUseElement && (a = a.correspondingUseElement);return 3 === a.nodeType ? a.parentNode : a;}var yb = null,zb = null,Ab = null;
function Bb(a) {if (a = Cb(a)) {if ("function" !== typeof yb) throw Error(p(280));var b = a.stateNode;b && (b = Db(b), yb(a.stateNode, a.type, b));}}function Eb(a) {zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;}function Fb() {if (zb) {var a = zb,b = Ab;Ab = zb = null;Bb(a);if (b) for (a = 0; a < b.length; a++) {Bb(b[a]);}}}function Gb(a, b) {return a(b);}function Hb() {}var Ib = !1;function Jb(a, b, c) {if (Ib) return a(b, c);Ib = !0;try {return Gb(a, b, c);} finally {if (Ib = !1, null !== zb || null !== Ab) Hb(), Fb();}}
function Kb(a, b) {var c = a.stateNode;if (null === c) return null;var d = Db(c);if (null === d) return null;c = d[b];a: switch (b) {case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));a = !d;break a;default:a = !1;}if (a) return null;if (c && "function" !==
  typeof c) throw Error(p(231, b, _typeof(c)));return c;}var Lb = !1;if (ia) try {var Mb = {};Object.defineProperty(Mb, "passive", { get: function get() {Lb = !0;} });window.addEventListener("test", Mb, Mb);window.removeEventListener("test", Mb, Mb);} catch (a) {Lb = !1;}function Nb(a, b, c, d, e, f, g, h, k) {var l = Array.prototype.slice.call(arguments, 3);try {b.apply(c, l);} catch (m) {this.onError(m);}}var Ob = !1,Pb = null,Qb = !1,Rb = null,Sb = { onError: function onError(a) {Ob = !0;Pb = a;} };function Tb(a, b, c, d, e, f, g, h, k) {Ob = !1;Pb = null;Nb.apply(Sb, arguments);}
function Ub(a, b, c, d, e, f, g, h, k) {Tb.apply(this, arguments);if (Ob) {if (Ob) {var l = Pb;Ob = !1;Pb = null;} else throw Error(p(198));Qb || (Qb = !0, Rb = l);}}function Vb(a) {var b = a,c = a;if (a.alternate) for (; b["return"];) {b = b["return"];} else {a = b;do {b = a, 0 !== (b.flags & 4098) && (c = b["return"]), a = b["return"];} while (a);}return 3 === b.tag ? c : null;}function Wb(a) {if (13 === a.tag) {var b = a.memoizedState;null === b && (a = a.alternate, null !== a && (b = a.memoizedState));if (null !== b) return b.dehydrated;}return null;}function Xb(a) {if (Vb(a) !== a) throw Error(p(188));}
function Yb(a) {var b = a.alternate;if (!b) {b = Vb(a);if (null === b) throw Error(p(188));return b !== a ? null : a;}for (var c = a, d = b;;) {var e = c["return"];if (null === e) break;var f = e.alternate;if (null === f) {d = e["return"];if (null !== d) {c = d;continue;}break;}if (e.child === f.child) {for (f = e.child; f;) {if (f === c) return Xb(e), a;if (f === d) return Xb(e), b;f = f.sibling;}throw Error(p(188));}if (c["return"] !== d["return"]) c = e, d = f;else {for (var g = !1, h = e.child; h;) {if (h === c) {g = !0;c = e;d = f;break;}if (h === d) {g = !0;d = e;c = f;break;}h = h.sibling;}if (!g) {for (h = f.child; h;) {if (h ===
          c) {g = !0;c = f;d = e;break;}if (h === d) {g = !0;d = f;c = e;break;}h = h.sibling;}if (!g) throw Error(p(189));}}if (c.alternate !== d) throw Error(p(190));}if (3 !== c.tag) throw Error(p(188));return c.stateNode.current === c ? a : b;}function Zb(a) {a = Yb(a);return null !== a ? $b(a) : null;}function $b(a) {if (5 === a.tag || 6 === a.tag) return a;for (a = a.child; null !== a;) {var b = $b(a);if (null !== b) return b;a = a.sibling;}return null;}
var ac = ca.unstable_scheduleCallback,bc = ca.unstable_cancelCallback,cc = ca.unstable_shouldYield,dc = ca.unstable_requestPaint,B = ca.unstable_now,ec = ca.unstable_getCurrentPriorityLevel,fc = ca.unstable_ImmediatePriority,gc = ca.unstable_UserBlockingPriority,hc = ca.unstable_NormalPriority,ic = ca.unstable_LowPriority,jc = ca.unstable_IdlePriority,kc = null,lc = null;function mc(a) {if (lc && "function" === typeof lc.onCommitFiberRoot) try {lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));} catch (b) {}}
var oc = Math.clz32 ? Math.clz32 : nc,pc = Math.log,qc = Math.LN2;function nc(a) {a >>>= 0;return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;}var rc = 64,sc = 4194304;
function tc(a) {switch (a & -a) {case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a & 4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a & 130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;
    default:return a;}}function uc(a, b) {var c = a.pendingLanes;if (0 === c) return 0;var d = 0,e = a.suspendedLanes,f = a.pingedLanes,g = c & 268435455;if (0 !== g) {var h = g & ~e;0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));} else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));if (0 === d) return 0;if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;0 !== (d & 4) && (d |= c & 16);b = a.entangledLanes;if (0 !== b) for (a = a.entanglements, b &= d; 0 < b;) {c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;}return d;}
function vc(a, b) {switch (a) {case 1:case 2:case 4:return b + 250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return b + 5E3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return -1;case 134217728:case 268435456:case 536870912:case 1073741824:return -1;default:return -1;}}
function wc(a, b) {for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f;) {var g = 31 - oc(f),h = 1 << g,k = e[g];if (-1 === k) {if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);} else k <= b && (a.expiredLanes |= h);f &= ~h;}}function xc(a) {a = a.pendingLanes & -1073741825;return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;}function yc() {var a = rc;rc <<= 1;0 === (rc & 4194240) && (rc = 64);return a;}function zc(a) {for (var b = [], c = 0; 31 > c; c++) {b.push(a);}return b;}
function Ac(a, b, c) {a.pendingLanes |= b;536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);a = a.eventTimes;b = 31 - oc(b);a[b] = c;}function Bc(a, b) {var c = a.pendingLanes & ~b;a.pendingLanes = b;a.suspendedLanes = 0;a.pingedLanes = 0;a.expiredLanes &= b;a.mutableReadLanes &= b;a.entangledLanes &= b;b = a.entanglements;var d = a.eventTimes;for (a = a.expirationTimes; 0 < c;) {var e = 31 - oc(c),f = 1 << e;b[e] = 0;d[e] = -1;a[e] = -1;c &= ~f;}}
function Cc(a, b) {var c = a.entangledLanes |= b;for (a = a.entanglements; c;) {var d = 31 - oc(c),e = 1 << d;e & b | a[d] & b && (a[d] |= b);c &= ~e;}}var C = 0;function Dc(a) {a &= -a;return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;}var Ec,Fc,Gc,Hc,Ic,Jc = !1,Kc = [],Lc = null,Mc = null,Nc = null,Oc = new Map(),Pc = new Map(),Qc = [],Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a, b) {switch (a) {case "focusin":case "focusout":Lc = null;break;case "dragenter":case "dragleave":Mc = null;break;case "mouseover":case "mouseout":Nc = null;break;case "pointerover":case "pointerout":Oc["delete"](b.pointerId);break;case "gotpointercapture":case "lostpointercapture":Pc["delete"](b.pointerId);}}
function Tc(a, b, c, d, e, f) {if (null === a || a.nativeEvent !== f) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;a.eventSystemFlags |= d;b = a.targetContainers;null !== e && -1 === b.indexOf(e) && b.push(e);return a;}
function Uc(a, b, c, d, e) {switch (b) {case "focusin":return Lc = Tc(Lc, a, b, c, d, e), !0;case "dragenter":return Mc = Tc(Mc, a, b, c, d, e), !0;case "mouseover":return Nc = Tc(Nc, a, b, c, d, e), !0;case "pointerover":var f = e.pointerId;Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));return !0;case "gotpointercapture":return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), !0;}return !1;}
function Vc(a) {var b = Wc(a.target);if (null !== b) {var c = Vb(b);if (null !== c) if (b = c.tag, 13 === b) {if (b = Wb(c), null !== b) {a.blockedOn = b;Ic(a.priority, function () {Gc(c);});return;}} else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;return;}}a.blockedOn = null;}
function Xc(a) {if (null !== a.blockedOn) return !1;for (var b = a.targetContainers; 0 < b.length;) {var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);if (null === c) {c = a.nativeEvent;var d = new c.constructor(c.type, c);wb = d;c.target.dispatchEvent(d);wb = null;} else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, !1;b.shift();}return !0;}function Zc(a, b, c) {Xc(a) && c["delete"](b);}function $c() {Jc = !1;null !== Lc && Xc(Lc) && (Lc = null);null !== Mc && Xc(Mc) && (Mc = null);null !== Nc && Xc(Nc) && (Nc = null);Oc.forEach(Zc);Pc.forEach(Zc);}
function ad(a, b) {a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = !0, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));}
function bd(a) {function b(b) {return ad(b, a);}if (0 < Kc.length) {ad(Kc[0], a);for (var c = 1; c < Kc.length; c++) {var d = Kc[c];d.blockedOn === a && (d.blockedOn = null);}}null !== Lc && ad(Lc, a);null !== Mc && ad(Mc, a);null !== Nc && ad(Nc, a);Oc.forEach(b);Pc.forEach(b);for (c = 0; c < Qc.length; c++) {d = Qc[c], d.blockedOn === a && (d.blockedOn = null);}for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn);) {Vc(c), null === c.blockedOn && Qc.shift();}}var cd = ua.ReactCurrentBatchConfig,dd = !0;
function ed(a, b, c, d) {var e = C,f = cd.transition;cd.transition = null;try {C = 1, fd(a, b, c, d);} finally {C = e, cd.transition = f;}}function gd(a, b, c, d) {var e = C,f = cd.transition;cd.transition = null;try {C = 4, fd(a, b, c, d);} finally {C = e, cd.transition = f;}}
function fd(a, b, c, d) {if (dd) {var e = Yc(a, b, c, d);if (null === e) hd(a, b, d, id, c), Sc(a, d);else if (Uc(e, a, b, c, d)) d.stopPropagation();else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {for (; null !== e;) {var f = Cb(e);null !== f && Ec(f);f = Yc(a, b, c, d);null === f && hd(a, b, d, id, c);if (f === e) break;e = f;}null !== e && d.stopPropagation();} else hd(a, b, d, null, c);}}var id = null;
function Yc(a, b, c, d) {id = null;a = xb(d);a = Wc(a);if (null !== a) if (b = Vb(a), null === b) a = null;else if (c = b.tag, 13 === c) {a = Wb(b);if (null !== a) return a;a = null;} else if (3 === c) {if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;a = null;} else b !== a && (a = null);id = a;return null;}
function jd(a) {switch (a) {case "cancel":case "click":case "close":case "contextmenu":case "copy":case "cut":case "auxclick":case "dblclick":case "dragend":case "dragstart":case "drop":case "focusin":case "focusout":case "input":case "invalid":case "keydown":case "keypress":case "keyup":case "mousedown":case "mouseup":case "paste":case "pause":case "play":case "pointercancel":case "pointerdown":case "pointerup":case "ratechange":case "reset":case "resize":case "seeked":case "submit":case "touchcancel":case "touchend":case "touchstart":case "volumechange":case "change":case "selectionchange":case "textInput":case "compositionstart":case "compositionend":case "compositionupdate":case "beforeblur":case "afterblur":case "beforeinput":case "blur":case "fullscreenchange":case "focus":case "hashchange":case "popstate":case "select":case "selectstart":return 1;case "drag":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "mousemove":case "mouseout":case "mouseover":case "pointermove":case "pointerout":case "pointerover":case "scroll":case "toggle":case "touchmove":case "wheel":case "mouseenter":case "mouseleave":case "pointerenter":case "pointerleave":return 4;
    case "message":switch (ec()) {case fc:return 1;case gc:return 4;case hc:case ic:return 16;case jc:return 536870912;default:return 16;}default:return 16;}}var kd = null,ld = null,md = null;function nd() {if (md) return md;var a,b = ld,c = b.length,d,e = "value" in kd ? kd.value : kd.textContent,f = e.length;for (a = 0; a < c && b[a] === e[a]; a++) {;}var g = c - a;for (d = 1; d <= g && b[c - d] === e[f - d]; d++) {;}return md = e.slice(a, 1 < d ? 1 - d : void 0);}
function od(a) {var b = a.keyCode;"charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;10 === a && (a = 13);return 32 <= a || 13 === a ? a : 0;}function pd() {return !0;}function qd() {return !1;}
function rd(a) {function b(b, d, e, f, g) {this._reactName = b;this._targetInst = e;this.type = d;this.nativeEvent = f;this.target = g;this.currentTarget = null;for (var c in a) {a.hasOwnProperty(c) && (b = a[c], this[c] = b ? b(f) : f[c]);}this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : !1 === f.returnValue) ? pd : qd;this.isPropagationStopped = qd;return this;}A(b.prototype, { preventDefault: function preventDefault() {this.defaultPrevented = !0;var a = this.nativeEvent;a && (a.preventDefault ? a.preventDefault() : "unknown" !== typeof a.returnValue && (
      a.returnValue = !1), this.isDefaultPrevented = pd);}, stopPropagation: function stopPropagation() {var a = this.nativeEvent;a && (a.stopPropagation ? a.stopPropagation() : "unknown" !== typeof a.cancelBubble && (a.cancelBubble = !0), this.isPropagationStopped = pd);}, persist: function persist() {}, isPersistent: pd });return b;}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function timeStamp(a) {return a.timeStamp || Date.now();}, defaultPrevented: 0, isTrusted: 0 },td = rd(sd),ud = A({}, sd, { view: 0, detail: 0 }),vd = rd(ud),wd,xd,yd,Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function relatedTarget(a) {return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;}, movementX: function movementX(a) {if ("movementX" in
      a) return a.movementX;a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);return wd;}, movementY: function movementY(a) {return "movementY" in a ? a.movementY : xd;} }),Bd = rd(Ad),Cd = A({}, Ad, { dataTransfer: 0 }),Dd = rd(Cd),Ed = A({}, ud, { relatedTarget: 0 }),Fd = rd(Ed),Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),Hd = rd(Gd),Id = A({}, sd, { clipboardData: function clipboardData(a) {return "clipboardData" in a ? a.clipboardData : window.clipboardData;} }),Jd = rd(Id),Kd = A({}, sd, { data: 0 }),Ld = rd(Kd),Md = { Esc: "Escape",
    Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" },Nd = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7",
    119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" },Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };function Pd(a) {var b = this.nativeEvent;return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : !1;}function zd() {return Pd;}
var Qd = A({}, ud, { key: function key(a) {if (a.key) {var b = Md[a.key] || a.key;if ("Unidentified" !== b) return b;}return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function charCode(a) {return "keypress" === a.type ? od(a) : 0;}, keyCode: function keyCode(a) {return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;}, which: function which(a) {return "keypress" ===
      a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;} }),Rd = rd(Qd),Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }),Td = rd(Sd),Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }),Vd = rd(Ud),Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),Xd = rd(Wd),Yd = A({}, Ad, { deltaX: function deltaX(a) {return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;},
    deltaY: function deltaY(a) {return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;}, deltaZ: 0, deltaMode: 0 }),Zd = rd(Yd),$d = [9, 13, 27, 32],ae = ia && "CompositionEvent" in window,be = null;ia && "documentMode" in document && (be = document.documentMode);var ce = ia && "TextEvent" in window && !be,de = ia && (!ae || be && 8 < be && 11 >= be),ee = String.fromCharCode(32),fe = !1;
function ge(a, b) {switch (a) {case "keyup":return -1 !== $d.indexOf(b.keyCode);case "keydown":return 229 !== b.keyCode;case "keypress":case "mousedown":case "focusout":return !0;default:return !1;}}function he(a) {a = a.detail;return "object" === _typeof(a) && "data" in a ? a.data : null;}var ie = !1;function je(a, b) {switch (a) {case "compositionend":return he(b);case "keypress":if (32 !== b.which) return null;fe = !0;return ee;case "textInput":return a = b.data, a === ee && fe ? null : a;default:return null;}}
function ke(a, b) {if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = !1, a) : null;switch (a) {case "paste":return null;case "keypress":if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {if (b["char"] && 1 < b["char"].length) return b["char"];if (b.which) return String.fromCharCode(b.which);}return null;case "compositionend":return de && "ko" !== b.locale ? null : b.data;default:return null;}}
var le = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };function me(a) {var b = a && a.nodeName && a.nodeName.toLowerCase();return "input" === b ? !!le[a.type] : "textarea" === b ? !0 : !1;}function ne(a, b, c, d) {Eb(d);b = oe(b, "onChange");0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));}var pe = null,qe = null;function re(a) {se(a, 0);}function te(a) {var b = ue(a);if (Wa(b)) return a;}
function ve(a, b) {if ("change" === a) return b;}var we = !1;if (ia) {var xe;if (ia) {var ye = ("oninput" in document);if (!ye) {var ze = document.createElement("div");ze.setAttribute("oninput", "return;");ye = "function" === typeof ze.oninput;}xe = ye;} else xe = !1;we = xe && (!document.documentMode || 9 < document.documentMode);}function Ae() {pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);}function Be(a) {if ("value" === a.propertyName && te(qe)) {var b = [];ne(b, qe, a, xb(a));Jb(re, b);}}
function Ce(a, b, c) {"focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();}function De(a) {if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);}function Ee(a, b) {if ("click" === a) return te(b);}function Fe(a, b) {if ("input" === a || "change" === a) return te(b);}function Ge(a, b) {return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;}var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a, b) {if (He(a, b)) return !0;if ("object" !== _typeof(a) || null === a || "object" !== _typeof(b) || null === b) return !1;var c = Object.keys(a),d = Object.keys(b);if (c.length !== d.length) return !1;for (d = 0; d < c.length; d++) {var e = c[d];if (!ja.call(b, e) || !He(a[e], b[e])) return !1;}return !0;}function Je(a) {for (; a && a.firstChild;) {a = a.firstChild;}return a;}
function Ke(a, b) {var c = Je(a);a = 0;for (var d; c;) {if (3 === c.nodeType) {d = a + c.textContent.length;if (a <= b && d >= b) return { node: c, offset: b - a };a = d;}a: {for (; c;) {if (c.nextSibling) {c = c.nextSibling;break a;}c = c.parentNode;}c = void 0;}c = Je(c);}}function Le(a, b) {return a && b ? a === b ? !0 : a && 3 === a.nodeType ? !1 : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : !1 : !1;}
function Me() {for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement;) {try {var c = "string" === typeof b.contentWindow.location.href;} catch (d) {c = !1;}if (c) a = b.contentWindow;else break;b = Xa(a.document);}return b;}function Ne(a) {var b = a && a.nodeName && a.nodeName.toLowerCase();return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);}
function Oe(a) {var b = Me(),c = a.focusedElem,d = a.selectionRange;if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {if (null !== d && Ne(c)) if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {a = a.getSelection();var e = c.textContent.length,f = Math.min(d.start, e);d = void 0 === d.end ? f : Math.min(d.end, e);!a.extend && f > d && (e = d, d = f, f = e);e = Ke(c, f);var g = Ke(c,
      d);e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));}b = [];for (a = c; a = a.parentNode;) {1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });}"function" === typeof c.focus && c.focus();for (c = 0; c < b.length; c++) {a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;}}}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode,Qe = null,Re = null,Se = null,Te = !1;
function Ue(a, b, c) {var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));}
function Ve(a, b) {var c = {};c[a.toLowerCase()] = b.toLowerCase();c["Webkit" + a] = "webkit" + b;c["Moz" + a] = "moz" + b;return c;}var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") },Xe = {},Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);function Ze(a) {if (Xe[a]) return Xe[a];if (!We[a]) return a;var b = We[a],c;for (c in b) {if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];}return a;}var $e = Ze("animationend"),af = Ze("animationiteration"),bf = Ze("animationstart"),cf = Ze("transitionend"),df = new Map(),ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b) {df.set(a, b);fa(b, [a]);}for (var gf = 0; gf < ef.length; gf++) {var hf = ef[gf],jf = hf.toLowerCase(),kf = hf[0].toUpperCase() + hf.slice(1);ff(jf, "on" + kf);}ff($e, "onAnimationEnd");ff(af, "onAnimationIteration");ff(bf, "onAnimationStart");ff("dblclick", "onDoubleClick");ff("focusin", "onFocus");ff("focusout", "onBlur");ff(cf, "onTransitionEnd");ha("onMouseEnter", ["mouseout", "mouseover"]);ha("onMouseLeave", ["mouseout", "mouseover"]);ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b, c) {var d = a.type || "unknown-event";a.currentTarget = c;Ub(d, b, void 0, a);a.currentTarget = null;}
function se(a, b) {b = 0 !== (b & 4);for (var c = 0; c < a.length; c++) {var d = a[c],e = d.event;d = d.listeners;a: {var f = void 0;if (b) for (var g = d.length - 1; 0 <= g; g--) {var h = d[g],k = h.instance,l = h.currentTarget;h = h.listener;if (k !== f && e.isPropagationStopped()) break a;nf(e, h, l);f = k;} else for (g = 0; g < d.length; g++) {h = d[g];k = h.instance;l = h.currentTarget;h = h.listener;if (k !== f && e.isPropagationStopped()) break a;nf(e, h, l);f = k;}}}if (Qb) throw a = Rb, Qb = !1, Rb = null, a;}
function D(a, b) {var c = b[of];void 0 === c && (c = b[of] = new Set());var d = a + "__bubble";c.has(d) || (pf(b, a, 2, !1), c.add(d));}function qf(a, b, c) {var d = 0;b && (d |= 4);pf(c, a, d, b);}var rf = "_reactListening" + Math.random().toString(36).slice(2);function sf(a) {if (!a[rf]) {a[rf] = !0;da.forEach(function (b) {"selectionchange" !== b && (mf.has(b) || qf(b, !1, a), qf(b, !0, a));});var b = 9 === a.nodeType ? a : a.ownerDocument;null === b || b[rf] || (b[rf] = !0, qf("selectionchange", !1, b));}}
function pf(a, b, c, d) {switch (jd(b)) {case 1:var e = ed;break;case 4:e = gd;break;default:e = fd;}c = e.bind(null, b, c, a);e = void 0;!Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = !0);d ? void 0 !== e ? a.addEventListener(b, c, { capture: !0, passive: e }) : a.addEventListener(b, c, !0) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, !1);}
function hd(a, b, c, d, e) {var f = d;if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (;;) {if (null === d) return;var g = d.tag;if (3 === g || 4 === g) {var h = d.stateNode.containerInfo;if (h === e || 8 === h.nodeType && h.parentNode === e) break;if (4 === g) for (g = d["return"]; null !== g;) {var k = g.tag;if (3 === k || 4 === k) if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;g = g["return"];}for (; null !== h;) {g = Wc(h);if (null === g) return;k = g.tag;if (5 === k || 6 === k) {d = f = g;continue a;}h = h.parentNode;}}d = d["return"];}Jb(function () {var d = f,e = xb(c),g = [];
    a: {var h = df.get(a);if (void 0 !== h) {var k = td,n = a;switch (a) {case "keypress":if (0 === od(c)) break a;case "keydown":case "keyup":k = Rd;break;case "focusin":n = "focus";k = Fd;break;case "focusout":n = "blur";k = Fd;break;case "beforeblur":case "afterblur":k = Fd;break;case "click":if (2 === c.button) break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k = Bd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k =
            Dd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k = Vd;break;case $e:case af:case bf:k = Hd;break;case cf:k = Xd;break;case "scroll":k = vd;break;case "wheel":k = Zd;break;case "copy":case "cut":case "paste":k = Jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k = Td;}var t = 0 !== (b & 4),J = !t && "scroll" === a,x = t ? null !== h ? h + "Capture" : null : h;t = [];for (var w = d, u; null !==
        w;) {u = w;var F = u.stateNode;5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));if (J) break;w = w["return"];}0 < t.length && (h = new k(h, n, null, c, e), g.push({ event: h, listeners: t }));}}if (0 === (b & 7)) {a: {h = "mouseover" === a || "pointerover" === a;k = "mouseout" === a || "pointerout" === a;if (h && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf])) break a;if (k || h) {h = e.window === e ? e : (h = e.ownerDocument) ? h.defaultView || h.parentWindow : window;if (k) {if (n = c.relatedTarget || c.toElement, k = d, n = n ? Wc(n) : null, null !==
            n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag)) n = null;} else k = null, n = d;if (k !== n) {t = Bd;F = "onMouseLeave";x = "onMouseEnter";w = "mouse";if ("pointerout" === a || "pointerover" === a) t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";J = null == k ? h : ue(k);u = null == n ? h : ue(n);h = new t(F, w + "leave", k, c, e);h.target = J;h.relatedTarget = u;F = null;Wc(e) === d && (t = new t(x, w + "enter", n, c, e), t.target = u, t.relatedTarget = J, F = t);J = F;if (k && n) b: {t = k;x = n;w = 0;for (u = t; u; u = vf(u)) {w++;}u = 0;for (F = x; F; F = vf(F)) {u++;}for (; 0 < w - u;) {t = vf(t), w--;}for (; 0 < u - w;) {x =
                vf(x), u--;}for (; w--;) {if (t === x || null !== x && t === x.alternate) break b;t = vf(t);x = vf(x);}t = null;} else t = null;null !== k && wf(g, h, k, t, !1);null !== n && null !== J && wf(g, J, n, t, !0);}}}a: {h = d ? ue(d) : window;k = h.nodeName && h.nodeName.toLowerCase();if ("select" === k || "input" === k && "file" === h.type) var na = ve;else if (me(h)) {if (we) na = Fe;else {na = De;var xa = Ce;}} else (k = h.nodeName) && "input" === k.toLowerCase() && ("checkbox" === h.type || "radio" === h.type) && (na = Ee);if (na && (na = na(a, d))) {ne(g, na, c, e);break a;}xa && xa(a, h, d);"focusout" === a && (xa = h._wrapperState) &&
        xa.controlled && "number" === h.type && cb(h, "number", h.value);}xa = d ? ue(d) : window;switch (a) {case "focusin":if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d, Se = null;break;case "focusout":Se = Re = Qe = null;break;case "mousedown":Te = !0;break;case "contextmenu":case "mouseup":case "dragend":Te = !1;Ue(g, c, e);break;case "selectionchange":if (Pe) break;case "keydown":case "keyup":Ue(g, c, e);}var $a;if (ae) b: {switch (a) {case "compositionstart":var ba = "onCompositionStart";break b;case "compositionend":ba = "onCompositionEnd";
            break b;case "compositionupdate":ba = "onCompositionUpdate";break b;}ba = void 0;} else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e, ld = "value" in kd ? kd.value : kd.textContent, ie = !0)), xa = oe(d, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e), g.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));if ($a = ce ? je(a, c) : ke(a, c)) d = oe(d, "onBeforeInput"),
      0 < d.length && (e = new Ld("onBeforeInput", "beforeinput", null, c, e), g.push({ event: e, listeners: d }), e.data = $a);}se(g, b);});}function tf(a, b, c) {return { instance: a, listener: b, currentTarget: c };}function oe(a, b) {for (var c = b + "Capture", d = []; null !== a;) {var e = a,f = e.stateNode;5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));a = a["return"];}return d;}function vf(a) {if (null === a) return null;do {a = a["return"];} while (a && 5 !== a.tag);return a ? a : null;}
function wf(a, b, c, d, e) {for (var f = b._reactName, g = []; null !== c && c !== d;) {var h = c,k = h.alternate,l = h.stateNode;if (null !== k && k === d) break;5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));c = c["return"];}0 !== g.length && a.push({ event: b, listeners: g });}var xf = /\r\n?/g,yf = /\u0000|\uFFFD/g;function zf(a) {return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");}function Af(a, b, c) {b = zf(b);if (zf(a) !== b && c) throw Error(p(425));}function Bf() {}
var Cf = null,Df = null;function Ef(a, b) {return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === _typeof(b.dangerouslySetInnerHTML) && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0,Gf = "function" === typeof clearTimeout ? clearTimeout : void 0,Hf = "function" === typeof Promise ? Promise : void 0,Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function (a) {return Hf.resolve(null).then(a)["catch"](If);} : Ff;function If(a) {setTimeout(function () {throw a;});}
function Kf(a, b) {var c = b,d = 0;do {var e = c.nextSibling;a.removeChild(c);if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {if (0 === d) {a.removeChild(e);bd(b);return;}d--;} else "$" !== c && "$?" !== c && "$!" !== c || d++;c = e;} while (c);bd(b);}function Lf(a) {for (; null != a; a = a.nextSibling) {var b = a.nodeType;if (1 === b || 3 === b) break;if (8 === b) {b = a.data;if ("$" === b || "$!" === b || "$?" === b) break;if ("/$" === b) return null;}}return a;}
function Mf(a) {a = a.previousSibling;for (var b = 0; a;) {if (8 === a.nodeType) {var c = a.data;if ("$" === c || "$!" === c || "$?" === c) {if (0 === b) return a;b--;} else "/$" === c && b++;}a = a.previousSibling;}return null;}var Nf = Math.random().toString(36).slice(2),Of = "__reactFiber$" + Nf,Pf = "__reactProps$" + Nf,uf = "__reactContainer$" + Nf,of = "__reactEvents$" + Nf,Qf = "__reactListeners$" + Nf,Rf = "__reactHandles$" + Nf;
function Wc(a) {var b = a[Of];if (b) return b;for (var c = a.parentNode; c;) {if (b = c[uf] || c[Of]) {c = b.alternate;if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a;) {if (c = a[Of]) return c;a = Mf(a);}return b;}a = c;c = a.parentNode;}return null;}function Cb(a) {a = a[Of] || a[uf];return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;}function ue(a) {if (5 === a.tag || 6 === a.tag) return a.stateNode;throw Error(p(33));}function Db(a) {return a[Pf] || null;}var Sf = [],Tf = -1;function Uf(a) {return { current: a };}
function E(a) {0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);}function G(a, b) {Tf++;Sf[Tf] = a.current;a.current = b;}var Vf = {},H = Uf(Vf),Wf = Uf(!1),Xf = Vf;function Yf(a, b) {var c = a.type.contextTypes;if (!c) return Vf;var d = a.stateNode;if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;var e = {},f;for (f in c) {e[f] = b[f];}d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);return e;}
function Zf(a) {a = a.childContextTypes;return null !== a && void 0 !== a;}function $f() {E(Wf);E(H);}function ag(a, b, c) {if (H.current !== Vf) throw Error(p(168));G(H, b);G(Wf, c);}function bg(a, b, c) {var d = a.stateNode;b = b.childContextTypes;if ("function" !== typeof d.getChildContext) return c;d = d.getChildContext();for (var e in d) {if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));}return A({}, c, d);}
function cg(a) {a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;Xf = H.current;G(H, a);G(Wf, Wf.current);return !0;}function dg(a, b, c) {var d = a.stateNode;if (!d) throw Error(p(169));c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);G(Wf, c);}var eg = null,fg = !1,gg = !1;function hg(a) {null === eg ? eg = [a] : eg.push(a);}function ig(a) {fg = !0;hg(a);}
function jg() {if (!gg && null !== eg) {gg = !0;var a = 0,b = C;try {var c = eg;for (C = 1; a < c.length; a++) {var d = c[a];do {d = d(!0);} while (null !== d);}eg = null;fg = !1;} catch (e) {throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;} finally {C = b, gg = !1;}}return null;}var kg = [],lg = 0,mg = null,ng = 0,og = [],pg = 0,qg = null,rg = 1,sg = "";function tg(a, b) {kg[lg++] = ng;kg[lg++] = mg;mg = a;ng = b;}
function ug(a, b, c) {og[pg++] = rg;og[pg++] = sg;og[pg++] = qg;qg = a;var d = rg;a = sg;var e = 32 - oc(d) - 1;d &= ~(1 << e);c += 1;var f = 32 - oc(b) + e;if (30 < f) {var g = e - e % 5;f = (d & (1 << g) - 1).toString(32);d >>= g;e -= g;rg = 1 << 32 - oc(b) + e | c << e | d;sg = f + a;} else rg = 1 << f | c << e | d, sg = a;}function vg(a) {null !== a["return"] && (tg(a, 1), ug(a, 1, 0));}function wg(a) {for (; a === mg;) {mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;}for (; a === qg;) {qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;}}var xg = null,yg = null,I = !1,zg = null;
function Ag(a, b) {var c = Bg(5, null, null, 0);c.elementType = "DELETED";c.stateNode = b;c["return"] = a;b = a.deletions;null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);}
function Cg(a, b) {switch (a.tag) {case 5:var c = a.type;b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), !0) : !1;case 6:return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, !0) : !1;case 13:return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c["return"] = a, a.child = c, xg = a, yg =
      null, !0) : !1;default:return !1;}}function Dg(a) {return 0 !== (a.mode & 1) && 0 === (a.flags & 128);}function Eg(a) {if (I) {var b = yg;if (b) {var c = b;if (!Cg(a, b)) {if (Dg(a)) throw Error(p(418));b = Lf(c.nextSibling);var d = xg;b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = !1, xg = a);}} else {if (Dg(a)) throw Error(p(418));a.flags = a.flags & -4097 | 2;I = !1;xg = a;}}}function Fg(a) {for (a = a["return"]; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag;) {a = a["return"];}xg = a;}
function Gg(a) {if (a !== xg) return !1;if (!I) return Fg(a), I = !0, !1;var b;(b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));if (b && (b = yg)) {if (Dg(a)) throw Hg(), Error(p(418));for (; b;) {Ag(a, b), b = Lf(b.nextSibling);}}Fg(a);if (13 === a.tag) {a = a.memoizedState;a = null !== a ? a.dehydrated : null;if (!a) throw Error(p(317));a: {a = a.nextSibling;for (b = 0; a;) {if (8 === a.nodeType) {var c = a.data;if ("/$" === c) {if (0 === b) {yg = Lf(a.nextSibling);break a;}b--;} else "$" !== c && "$!" !== c && "$?" !== c || b++;}a = a.nextSibling;}yg =
      null;}} else yg = xg ? Lf(a.stateNode.nextSibling) : null;return !0;}function Hg() {for (var a = yg; a;) {a = Lf(a.nextSibling);}}function Ig() {yg = xg = null;I = !1;}function Jg(a) {null === zg ? zg = [a] : zg.push(a);}var Kg = ua.ReactCurrentBatchConfig;function Lg(a, b) {if (a && a.defaultProps) {b = A({}, b);a = a.defaultProps;for (var c in a) {void 0 === b[c] && (b[c] = a[c]);}return b;}return b;}var Mg = Uf(null),Ng = null,Og = null,Pg = null;function Qg() {Pg = Og = Ng = null;}function Rg(a) {var b = Mg.current;E(Mg);a._currentValue = b;}
function Sg(a, b, c) {for (; null !== a;) {var d = a.alternate;(a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);if (a === c) break;a = a["return"];}}function Tg(a, b) {Ng = a;Pg = Og = null;a = a.dependencies;null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (Ug = !0), a.firstContext = null);}
function Vg(a) {var b = a._currentValue;if (Pg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Og) {if (null === Ng) throw Error(p(308));Og = a;Ng.dependencies = { lanes: 0, firstContext: a };} else Og = Og.next = a;return b;}var Wg = null;function Xg(a) {null === Wg ? Wg = [a] : Wg.push(a);}function Yg(a, b, c, d) {var e = b.interleaved;null === e ? (c.next = c, Xg(b)) : (c.next = e.next, e.next = c);b.interleaved = c;return Zg(a, d);}
function Zg(a, b) {a.lanes |= b;var c = a.alternate;null !== c && (c.lanes |= b);c = a;for (a = a["return"]; null !== a;) {a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a["return"];}return 3 === c.tag ? c.stateNode : null;}var $g = !1;function ah(a) {a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };}
function bh(a, b) {a = a.updateQueue;b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });}function ch(a, b) {return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };}
function dh(a, b, c) {var d = a.updateQueue;if (null === d) return null;d = d.shared;if (0 !== (K & 2)) {var e = d.pending;null === e ? b.next = b : (b.next = e.next, e.next = b);d.pending = b;return Zg(a, c);}e = d.interleaved;null === e ? (b.next = b, Xg(d)) : (b.next = e.next, e.next = b);d.interleaved = b;return Zg(a, c);}function eh(a, b, c) {b = b.updateQueue;if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {var d = b.lanes;d &= a.pendingLanes;c |= d;b.lanes = c;Cc(a, c);}}
function fh(a, b) {var c = a.updateQueue,d = a.alternate;if (null !== d && (d = d.updateQueue, c === d)) {var e = null,f = null;c = c.firstBaseUpdate;if (null !== c) {do {var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };null === f ? e = f = g : f = f.next = g;c = c.next;} while (null !== c);null === f ? e = f = b : f = f.next = b;} else e = f = b;c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };a.updateQueue = c;return;}a = c.lastBaseUpdate;null === a ? c.firstBaseUpdate = b : a.next =
  b;c.lastBaseUpdate = b;}
function gh(a, b, c, d) {var e = a.updateQueue;$g = !1;var f = e.firstBaseUpdate,g = e.lastBaseUpdate,h = e.shared.pending;if (null !== h) {e.shared.pending = null;var k = h,l = k.next;k.next = null;null === g ? f = l : g.next = l;g = k;var m = a.alternate;null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));}if (null !== f) {var q = e.baseState;g = 0;m = l = k = null;h = f;do {var r = h.lane,y = h.eventTime;if ((d & r) === r) {null !== m && (m = m.next = { eventTime: y, lane: 0, tag: h.tag, payload: h.payload, callback: h.callback,
          next: null });a: {var n = a,t = h;r = b;y = c;switch (t.tag) {case 1:n = t.payload;if ("function" === typeof n) {q = n.call(y, q, r);break a;}q = n;break a;case 3:n.flags = n.flags & -65537 | 128;case 0:n = t.payload;r = "function" === typeof n ? n.call(y, q, r) : n;if (null === r || void 0 === r) break a;q = A({}, q, r);break a;case 2:$g = !0;}}null !== h.callback && 0 !== h.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [h] : r.push(h));} else y = { eventTime: y, lane: r, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
      h = h.next;if (null === h) if (h = e.shared.pending, null === h) break;else r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;} while (1);null === m && (k = q);e.baseState = k;e.firstBaseUpdate = l;e.lastBaseUpdate = m;b = e.shared.interleaved;if (null !== b) {e = b;do {g |= e.lane, e = e.next;} while (e !== b);} else null === f && (e.shared.lanes = 0);hh |= g;a.lanes = g;a.memoizedState = q;}}
function ih(a, b, c) {a = b.effects;b.effects = null;if (null !== a) for (b = 0; b < a.length; b++) {var d = a[b],e = d.callback;if (null !== e) {d.callback = null;d = c;if ("function" !== typeof e) throw Error(p(191, e));e.call(d);}}}var jh = new aa.Component().refs;function kh(a, b, c, d) {b = a.memoizedState;c = c(d, b);c = null === c || void 0 === c ? b : A({}, b, c);a.memoizedState = c;0 === a.lanes && (a.updateQueue.baseState = c);}
var nh = { isMounted: function isMounted(a) {return (a = a._reactInternals) ? Vb(a) === a : !1;}, enqueueSetState: function enqueueSetState(a, b, c) {a = a._reactInternals;var d = L(),e = lh(a),f = ch(d, e);f.payload = b;void 0 !== c && null !== c && (f.callback = c);b = dh(a, f, e);null !== b && (mh(b, a, e, d), eh(b, a, e));}, enqueueReplaceState: function enqueueReplaceState(a, b, c) {a = a._reactInternals;var d = L(),e = lh(a),f = ch(d, e);f.tag = 1;f.payload = b;void 0 !== c && null !== c && (f.callback = c);b = dh(a, f, e);null !== b && (mh(b, a, e, d), eh(b, a, e));}, enqueueForceUpdate: function enqueueForceUpdate(a, b) {a = a._reactInternals;var c = L(),d =
      lh(a),e = ch(c, d);e.tag = 2;void 0 !== b && null !== b && (e.callback = b);b = dh(a, e, d);null !== b && (mh(b, a, d, c), eh(b, a, d));} };function oh(a, b, c, d, e, f, g) {a = a.stateNode;return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : !0;}
function ph(a, b, c) {var d = !1,e = Vf;var f = b.contextType;"object" === _typeof(f) && null !== f ? f = Vg(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);b = new b(c, f);a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;b.updater = nh;a.stateNode = b;b._reactInternals = a;d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);return b;}
function qh(a, b, c, d) {a = b.state;"function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);"function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);b.state !== a && nh.enqueueReplaceState(b, b.state, null);}
function rh(a, b, c, d) {var e = a.stateNode;e.props = c;e.state = a.memoizedState;e.refs = jh;ah(a);var f = b.contextType;"object" === _typeof(f) && null !== f ? e.context = Vg(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));e.state = a.memoizedState;f = b.getDerivedStateFromProps;"function" === typeof f && (kh(a, b, f, c), e.state = a.memoizedState);"function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state,
  "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && nh.enqueueReplaceState(e, e.state, null), gh(a, c, e, d), e.state = a.memoizedState);"function" === typeof e.componentDidMount && (a.flags |= 4194308);}
function sh(a, b, c) {a = c.ref;if (null !== a && "function" !== typeof a && "object" !== _typeof(a)) {if (c._owner) {c = c._owner;if (c) {if (1 !== c.tag) throw Error(p(309));var d = c.stateNode;}if (!d) throw Error(p(147, a));var e = d,f = "" + a;if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;b = function b(a) {var b = e.refs;b === jh && (b = e.refs = {});null === a ? delete b[f] : b[f] = a;};b._stringRef = f;return b;}if ("string" !== typeof a) throw Error(p(284));if (!c._owner) throw Error(p(290, a));}return a;}
function th(a, b) {a = Object.prototype.toString.call(b);throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));}function uh(a) {var b = a._init;return b(a._payload);}
function vh(a) {function b(b, c) {if (a) {var d = b.deletions;null === d ? (b.deletions = [c], b.flags |= 16) : d.push(c);}}function c(c, d) {if (!a) return null;for (; null !== d;) {b(c, d), d = d.sibling;}return null;}function d(a, b) {for (a = new Map(); null !== b;) {null !== b.key ? a.set(b.key, b) : a.set(b.index, b), b = b.sibling;}return a;}function e(a, b) {a = wh(a, b);a.index = 0;a.sibling = null;return a;}function f(b, c, d) {b.index = d;if (!a) return b.flags |= 1048576, c;d = b.alternate;if (null !== d) return d = d.index, d < c ? (b.flags |= 2, c) : d;b.flags |= 2;return c;}function g(b) {a &&
    null === b.alternate && (b.flags |= 2);return b;}function h(a, b, c, d) {if (null === b || 6 !== b.tag) return b = xh(c, a.mode, d), b["return"] = a, b;b = e(b, c);b["return"] = a;return b;}function k(a, b, c, d) {var f = c.type;if (f === ya) return m(a, b, c.props.children, d, c.key);if (null !== b && (b.elementType === f || "object" === _typeof(f) && null !== f && f.$$typeof === Ha && uh(f) === b.type)) return d = e(b, c.props), d.ref = sh(a, b, c), d["return"] = a, d;d = yh(c.type, c.key, c.props, null, a.mode, d);d.ref = sh(a, b, c);d["return"] = a;return d;}function l(a, b, c, d) {if (null === b || 4 !== b.tag ||
    b.stateNode.containerInfo !== c.containerInfo || b.stateNode.implementation !== c.implementation) return b = zh(c, a.mode, d), b["return"] = a, b;b = e(b, c.children || []);b["return"] = a;return b;}function m(a, b, c, d, f) {if (null === b || 7 !== b.tag) return b = Ah(c, a.mode, d, f), b["return"] = a, b;b = e(b, c);b["return"] = a;return b;}function q(a, b, c) {if ("string" === typeof b && "" !== b || "number" === typeof b) return b = xh("" + b, a.mode, c), b["return"] = a, b;if ("object" === _typeof(b) && null !== b) {switch (b.$$typeof) {case va:return c = yh(b.type, b.key, b.props, null, a.mode, c),
          c.ref = sh(a, null, b), c["return"] = a, c;case wa:return b = zh(b, a.mode, c), b["return"] = a, b;case Ha:var d = b._init;return q(a, d(b._payload), c);}if (eb(b) || Ka(b)) return b = Ah(b, a.mode, c, null), b["return"] = a, b;th(a, b);}return null;}function r(a, b, c, d) {var e = null !== b ? b.key : null;if ("string" === typeof c && "" !== c || "number" === typeof c) return null !== e ? null : h(a, b, "" + c, d);if ("object" === _typeof(c) && null !== c) {switch (c.$$typeof) {case va:return c.key === e ? k(a, b, c, d) : null;case wa:return c.key === e ? l(a, b, c, d) : null;case Ha:return e = c._init, r(a,
          b, e(c._payload), d);}if (eb(c) || Ka(c)) return null !== e ? null : m(a, b, c, d, null);th(a, c);}return null;}function y(a, b, c, d, e) {if ("string" === typeof d && "" !== d || "number" === typeof d) return a = a.get(c) || null, h(b, a, "" + d, e);if ("object" === _typeof(d) && null !== d) {switch (d.$$typeof) {case va:return a = a.get(null === d.key ? c : d.key) || null, k(b, a, d, e);case wa:return a = a.get(null === d.key ? c : d.key) || null, l(b, a, d, e);case Ha:var f = d._init;return y(a, b, c, f(d._payload), e);}if (eb(d) || Ka(d)) return a = a.get(c) || null, m(b, a, d, e, null);th(b, d);}return null;}
  function n(e, g, h, k) {for (var l = null, m = null, u = g, w = g = 0, x = null; null !== u && w < h.length; w++) {u.index > w ? (x = u, u = null) : x = u.sibling;var n = r(e, u, h[w], k);if (null === n) {null === u && (u = x);break;}a && u && null === n.alternate && b(e, u);g = f(n, g, w);null === m ? l = n : m.sibling = n;m = n;u = x;}if (w === h.length) return c(e, u), I && tg(e, w), l;if (null === u) {for (; w < h.length; w++) {u = q(e, h[w], k), null !== u && (g = f(u, g, w), null === m ? l = u : m.sibling = u, m = u);}I && tg(e, w);return l;}for (u = d(e, u); w < h.length; w++) {x = y(u, e, w, h[w], k), null !== x && (a && null !== x.alternate && u["delete"](null ===
      x.key ? w : x.key), g = f(x, g, w), null === m ? l = x : m.sibling = x, m = x);}a && u.forEach(function (a) {return b(e, a);});I && tg(e, w);return l;}function t(e, g, h, k) {var l = Ka(h);if ("function" !== typeof l) throw Error(p(150));h = l.call(h);if (null == h) throw Error(p(151));for (var u = l = null, m = g, w = g = 0, x = null, n = h.next(); null !== m && !n.done; w++, n = h.next()) {m.index > w ? (x = m, m = null) : x = m.sibling;var t = r(e, m, n.value, k);if (null === t) {null === m && (m = x);break;}a && m && null === t.alternate && b(e, m);g = f(t, g, w);null === u ? l = t : u.sibling = t;u = t;m = x;}if (n.done) return c(e,
    m), I && tg(e, w), l;if (null === m) {for (; !n.done; w++, n = h.next()) {n = q(e, n.value, k), null !== n && (g = f(n, g, w), null === u ? l = n : u.sibling = n, u = n);}I && tg(e, w);return l;}for (m = d(e, m); !n.done; w++, n = h.next()) {n = y(m, e, w, n.value, k), null !== n && (a && null !== n.alternate && m["delete"](null === n.key ? w : n.key), g = f(n, g, w), null === u ? l = n : u.sibling = n, u = n);}a && m.forEach(function (a) {return b(e, a);});I && tg(e, w);return l;}function J(a, d, f, h) {"object" === _typeof(f) && null !== f && f.type === ya && null === f.key && (f = f.props.children);if ("object" === _typeof(f) && null !== f) {switch (f.$$typeof) {case va:a: {for (var k =
              f.key, l = d; null !== l;) {if (l.key === k) {k = f.type;if (k === ya) {if (7 === l.tag) {c(a, l.sibling);d = e(l, f.props.children);d["return"] = a;a = d;break a;}} else if (l.elementType === k || "object" === _typeof(k) && null !== k && k.$$typeof === Ha && uh(k) === l.type) {c(a, l.sibling);d = e(l, f.props);d.ref = sh(a, l, f);d["return"] = a;a = d;break a;}c(a, l);break;} else b(a, l);l = l.sibling;}f.type === ya ? (d = Ah(f.props.children, a.mode, h, f.key), d["return"] = a, a = d) : (h = yh(f.type, f.key, f.props, null, a.mode, h), h.ref = sh(a, d, f), h["return"] = a, a = h);}return g(a);case wa:a: {for (l = f.key; null !==
            d;) {if (d.key === l) {if (4 === d.tag && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {c(a, d.sibling);d = e(d, f.children || []);d["return"] = a;a = d;break a;} else {c(a, d);break;}} else b(a, d);d = d.sibling;}d = zh(f, a.mode, h);d["return"] = a;a = d;}return g(a);case Ha:return l = f._init, J(a, d, l(f._payload), h);}if (eb(f)) return n(a, d, f, h);if (Ka(f)) return t(a, d, f, h);th(a, f);}return "string" === typeof f && "" !== f || "number" === typeof f ? (f = "" + f, null !== d && 6 === d.tag ? (c(a, d.sibling), d = e(d, f), d["return"] = a, a = d) : (
    c(a, d), d = xh(f, a.mode, h), d["return"] = a, a = d), g(a)) : c(a, d);}return J;}var Bh = vh(!0),Ch = vh(!1),Dh = {},Eh = Uf(Dh),Fh = Uf(Dh),Gh = Uf(Dh);function Hh(a) {if (a === Dh) throw Error(p(174));return a;}function Ih(a, b) {G(Gh, b);G(Fh, a);G(Eh, Dh);a = b.nodeType;switch (a) {case 9:case 11:b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");break;default:a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);}E(Eh);G(Eh, b);}function Jh() {E(Eh);E(Fh);E(Gh);}
function Kh(a) {Hh(Gh.current);var b = Hh(Eh.current);var c = lb(b, a.type);b !== c && (G(Fh, a), G(Eh, c));}function Lh(a) {Fh.current === a && (E(Eh), E(Fh));}var M = Uf(0);
function Mh(a) {for (var b = a; null !== b;) {if (13 === b.tag) {var c = b.memoizedState;if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;} else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {if (0 !== (b.flags & 128)) return b;} else if (null !== b.child) {b.child["return"] = b;b = b.child;continue;}if (b === a) break;for (; null === b.sibling;) {if (null === b["return"] || b["return"] === a) return null;b = b["return"];}b.sibling["return"] = b["return"];b = b.sibling;}return null;}var Nh = [];
function Oh() {for (var a = 0; a < Nh.length; a++) {Nh[a]._workInProgressVersionPrimary = null;}Nh.length = 0;}var Ph = ua.ReactCurrentDispatcher,Qh = ua.ReactCurrentBatchConfig,Rh = 0,N = null,O = null,P = null,Sh = !1,Th = !1,Uh = 0,Vh = 0;function Q() {throw Error(p(321));}function Wh(a, b) {if (null === b) return !1;for (var c = 0; c < b.length && c < a.length; c++) {if (!He(a[c], b[c])) return !1;}return !0;}
function Xh(a, b, c, d, e, f) {Rh = f;N = b;b.memoizedState = null;b.updateQueue = null;b.lanes = 0;Ph.current = null === a || null === a.memoizedState ? Yh : Zh;a = c(d, e);if (Th) {f = 0;do {Th = !1;Uh = 0;if (25 <= f) throw Error(p(301));f += 1;P = O = null;b.updateQueue = null;Ph.current = $h;a = c(d, e);} while (Th);}Ph.current = ai;b = null !== O && null !== O.next;Rh = 0;P = O = N = null;Sh = !1;if (b) throw Error(p(300));return a;}function bi() {var a = 0 !== Uh;Uh = 0;return a;}
function ci() {var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };null === P ? N.memoizedState = P = a : P = P.next = a;return P;}function di() {if (null === O) {var a = N.alternate;a = null !== a ? a.memoizedState : null;} else a = O.next;var b = null === P ? N.memoizedState : P.next;if (null !== b) P = b, O = a;else {if (null === a) throw Error(p(310));O = a;a = { memoizedState: O.memoizedState, baseState: O.baseState, baseQueue: O.baseQueue, queue: O.queue, next: null };null === P ? N.memoizedState = P = a : P = P.next = a;}return P;}
function ei(a, b) {return "function" === typeof b ? b(a) : b;}
function fi(a) {var b = di(),c = b.queue;if (null === c) throw Error(p(311));c.lastRenderedReducer = a;var d = O,e = d.baseQueue,f = c.pending;if (null !== f) {if (null !== e) {var g = e.next;e.next = f.next;f.next = g;}d.baseQueue = e = f;c.pending = null;}if (null !== e) {f = e.next;d = d.baseState;var h = g = null,k = null,l = f;do {var m = l.lane;if ((Rh & m) === m) null !== k && (k = k.next = { lane: 0, action: l.action, hasEagerState: l.hasEagerState, eagerState: l.eagerState, next: null }), d = l.hasEagerState ? l.eagerState : a(d, l.action);else {var q = { lane: m, action: l.action, hasEagerState: l.hasEagerState,
          eagerState: l.eagerState, next: null };null === k ? (h = k = q, g = d) : k = k.next = q;N.lanes |= m;hh |= m;}l = l.next;} while (null !== l && l !== f);null === k ? g = d : k.next = h;He(d, b.memoizedState) || (Ug = !0);b.memoizedState = d;b.baseState = g;b.baseQueue = k;c.lastRenderedState = d;}a = c.interleaved;if (null !== a) {e = a;do {f = e.lane, N.lanes |= f, hh |= f, e = e.next;} while (e !== a);} else null === e && (c.lanes = 0);return [b.memoizedState, c.dispatch];}
function gi(a) {var b = di(),c = b.queue;if (null === c) throw Error(p(311));c.lastRenderedReducer = a;var d = c.dispatch,e = c.pending,f = b.memoizedState;if (null !== e) {c.pending = null;var g = e = e.next;do {f = a(f, g.action), g = g.next;} while (g !== e);He(f, b.memoizedState) || (Ug = !0);b.memoizedState = f;null === b.baseQueue && (b.baseState = f);c.lastRenderedState = f;}return [f, d];}function hi() {}
function ii(a, b) {var c = N,d = di(),e = b(),f = !He(d.memoizedState, e);f && (d.memoizedState = e, Ug = !0);d = d.queue;ji(ki.bind(null, c, d, a), [a]);if (d.getSnapshot !== b || f || null !== P && P.memoizedState.tag & 1) {c.flags |= 2048;li(9, mi.bind(null, c, d, e, b), void 0, null);if (null === R) throw Error(p(349));0 !== (Rh & 30) || ni(c, b, e);}return e;}function ni(a, b, c) {a.flags |= 16384;a = { getSnapshot: b, value: c };b = N.updateQueue;null === b ? (b = { lastEffect: null, stores: null }, N.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));}
function mi(a, b, c, d) {b.value = c;b.getSnapshot = d;oi(b) && pi(a);}function ki(a, b, c) {return c(function () {oi(b) && pi(a);});}function oi(a) {var b = a.getSnapshot;a = a.value;try {var c = b();return !He(a, c);} catch (d) {return !0;}}function pi(a) {var b = Zg(a, 1);null !== b && mh(b, a, 1, -1);}
function qi(a) {var b = ci();"function" === typeof a && (a = a());b.memoizedState = b.baseState = a;a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ei, lastRenderedState: a };b.queue = a;a = a.dispatch = ri.bind(null, N, a);return [b.memoizedState, a];}
function li(a, b, c, d) {a = { tag: a, create: b, destroy: c, deps: d, next: null };b = N.updateQueue;null === b ? (b = { lastEffect: null, stores: null }, N.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));return a;}function si() {return di().memoizedState;}function ti(a, b, c, d) {var e = ci();N.flags |= a;e.memoizedState = li(1 | b, c, void 0, void 0 === d ? null : d);}
function ui(a, b, c, d) {var e = di();d = void 0 === d ? null : d;var f = void 0;if (null !== O) {var g = O.memoizedState;f = g.destroy;if (null !== d && Wh(d, g.deps)) {e.memoizedState = li(b, c, f, d);return;}}N.flags |= a;e.memoizedState = li(1 | b, c, f, d);}function vi(a, b) {return ti(8390656, 8, a, b);}function ji(a, b) {return ui(2048, 8, a, b);}function wi(a, b) {return ui(4, 2, a, b);}function xi(a, b) {return ui(4, 4, a, b);}
function yi(a, b) {if ("function" === typeof b) return a = a(), b(a), function () {b(null);};if (null !== b && void 0 !== b) return a = a(), b.current = a, function () {b.current = null;};}function zi(a, b, c) {c = null !== c && void 0 !== c ? c.concat([a]) : null;return ui(4, 4, yi.bind(null, b, a), c);}function Ai() {}function Bi(a, b) {var c = di();b = void 0 === b ? null : b;var d = c.memoizedState;if (null !== d && null !== b && Wh(b, d[1])) return d[0];c.memoizedState = [a, b];return a;}
function Ci(a, b) {var c = di();b = void 0 === b ? null : b;var d = c.memoizedState;if (null !== d && null !== b && Wh(b, d[1])) return d[0];a = a();c.memoizedState = [a, b];return a;}function Di(a, b, c) {if (0 === (Rh & 21)) return a.baseState && (a.baseState = !1, Ug = !0), a.memoizedState = c;He(c, b) || (c = yc(), N.lanes |= c, hh |= c, a.baseState = !0);return b;}function Ei(a, b) {var c = C;C = 0 !== c && 4 > c ? c : 4;a(!0);var d = Qh.transition;Qh.transition = {};try {a(!1), b();} finally {C = c, Qh.transition = d;}}function Fi() {return di().memoizedState;}
function Gi(a, b, c) {var d = lh(a);c = { lane: d, action: c, hasEagerState: !1, eagerState: null, next: null };if (Hi(a)) Ii(b, c);else if (c = Yg(a, b, c, d), null !== c) {var e = L();mh(c, a, d, e);Ji(c, b, d);}}
function ri(a, b, c) {var d = lh(a),e = { lane: d, action: c, hasEagerState: !1, eagerState: null, next: null };if (Hi(a)) Ii(b, e);else {var f = a.alternate;if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {var g = b.lastRenderedState,h = f(g, c);e.hasEagerState = !0;e.eagerState = h;if (He(h, g)) {var k = b.interleaved;null === k ? (e.next = e, Xg(b)) : (e.next = k.next, k.next = e);b.interleaved = e;return;}} catch (l) {} finally {}c = Yg(a, b, e, d);null !== c && (e = L(), mh(c, a, d, e), Ji(c, b, d));}}
function Hi(a) {var b = a.alternate;return a === N || null !== b && b === N;}function Ii(a, b) {Th = Sh = !0;var c = a.pending;null === c ? b.next = b : (b.next = c.next, c.next = b);a.pending = b;}function Ji(a, b, c) {if (0 !== (c & 4194240)) {var d = b.lanes;d &= a.pendingLanes;c |= d;b.lanes = c;Cc(a, c);}}
var ai = { readContext: Vg, useCallback: Q, useContext: Q, useEffect: Q, useImperativeHandle: Q, useInsertionEffect: Q, useLayoutEffect: Q, useMemo: Q, useReducer: Q, useRef: Q, useState: Q, useDebugValue: Q, useDeferredValue: Q, useTransition: Q, useMutableSource: Q, useSyncExternalStore: Q, useId: Q, unstable_isNewReconciler: !1 },Yh = { readContext: Vg, useCallback: function useCallback(a, b) {ci().memoizedState = [a, void 0 === b ? null : b];return a;}, useContext: Vg, useEffect: vi, useImperativeHandle: function useImperativeHandle(a, b, c) {c = null !== c && void 0 !== c ? c.concat([a]) : null;return ti(4194308,
      4, yi.bind(null, b, a), c);}, useLayoutEffect: function useLayoutEffect(a, b) {return ti(4194308, 4, a, b);}, useInsertionEffect: function useInsertionEffect(a, b) {return ti(4, 2, a, b);}, useMemo: function useMemo(a, b) {var c = ci();b = void 0 === b ? null : b;a = a();c.memoizedState = [a, b];return a;}, useReducer: function useReducer(a, b, c) {var d = ci();b = void 0 !== c ? c(b) : b;d.memoizedState = d.baseState = b;a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };d.queue = a;a = a.dispatch = Gi.bind(null, N, a);return [d.memoizedState, a];}, useRef: function useRef(a) {var b =
      ci();a = { current: a };return b.memoizedState = a;}, useState: qi, useDebugValue: Ai, useDeferredValue: function useDeferredValue(a) {return ci().memoizedState = a;}, useTransition: function useTransition() {var a = qi(!1),b = a[0];a = Ei.bind(null, a[1]);ci().memoizedState = a;return [b, a];}, useMutableSource: function useMutableSource() {}, useSyncExternalStore: function useSyncExternalStore(a, b, c) {var d = N,e = ci();if (I) {if (void 0 === c) throw Error(p(407));c = c();} else {c = b();if (null === R) throw Error(p(349));0 !== (Rh & 30) || ni(d, b, c);}e.memoizedState = c;var f = { value: c, getSnapshot: b };e.queue = f;vi(ki.bind(null, d,
      f, a), [a]);d.flags |= 2048;li(9, mi.bind(null, d, f, c, b), void 0, null);return c;}, useId: function useId() {var a = ci(),b = R.identifierPrefix;if (I) {var c = sg;var d = rg;c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;b = ":" + b + "R" + c;c = Uh++;0 < c && (b += "H" + c.toString(32));b += ":";} else c = Vh++, b = ":" + b + "r" + c.toString(32) + ":";return a.memoizedState = b;}, unstable_isNewReconciler: !1 },Zh = { readContext: Vg, useCallback: Bi, useContext: Vg, useEffect: ji, useImperativeHandle: zi, useInsertionEffect: wi, useLayoutEffect: xi, useMemo: Ci, useReducer: fi, useRef: si, useState: function useState() {return fi(ei);},
    useDebugValue: Ai, useDeferredValue: function useDeferredValue(a) {var b = di();return Di(b, O.memoizedState, a);}, useTransition: function useTransition() {var a = fi(ei)[0],b = di().memoizedState;return [a, b];}, useMutableSource: hi, useSyncExternalStore: ii, useId: Fi, unstable_isNewReconciler: !1 },$h = { readContext: Vg, useCallback: Bi, useContext: Vg, useEffect: ji, useImperativeHandle: zi, useInsertionEffect: wi, useLayoutEffect: xi, useMemo: Ci, useReducer: gi, useRef: si, useState: function useState() {return gi(ei);}, useDebugValue: Ai, useDeferredValue: function useDeferredValue(a) {var b = di();return null ===
      O ? b.memoizedState = a : Di(b, O.memoizedState, a);}, useTransition: function useTransition() {var a = gi(ei)[0],b = di().memoizedState;return [a, b];}, useMutableSource: hi, useSyncExternalStore: ii, useId: Fi, unstable_isNewReconciler: !1 };function Ki(a, b) {try {var c = "",d = b;do {c += Pa(d), d = d["return"];} while (d);var e = c;} catch (f) {e = "\nError generating stack: " + f.message + "\n" + f.stack;}return { value: a, source: b, stack: e, digest: null };}function Li(a, b, c) {return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };}
function Mi(a, b) {try {console.error(b.value);} catch (c) {setTimeout(function () {throw c;});}}var Ni = "function" === typeof WeakMap ? WeakMap : Map;function Oi(a, b, c) {c = ch(-1, c);c.tag = 3;c.payload = { element: null };var d = b.value;c.callback = function () {Pi || (Pi = !0, Qi = d);Mi(a, b);};return c;}
function Ri(a, b, c) {c = ch(-1, c);c.tag = 3;var d = a.type.getDerivedStateFromError;if ("function" === typeof d) {var e = b.value;c.payload = function () {return d(e);};c.callback = function () {Mi(a, b);};}var f = a.stateNode;null !== f && "function" === typeof f.componentDidCatch && (c.callback = function () {Mi(a, b);"function" !== typeof d && (null === Si ? Si = new Set([this]) : Si.add(this));var c = b.stack;this.componentDidCatch(b.value, { componentStack: null !== c ? c : "" });});return c;}
function Ti(a, b, c) {var d = a.pingCache;if (null === d) {d = a.pingCache = new Ni();var e = new Set();d.set(b, e);} else e = d.get(b), void 0 === e && (e = new Set(), d.set(b, e));e.has(c) || (e.add(c), a = Ui.bind(null, a, b, c), b.then(a, a));}function Vi(a) {do {var b;if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? !0 : !1 : !0;if (b) return a;a = a["return"];} while (null !== a);return null;}
function Wi(a, b, c, d, e) {if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = ch(-1, 1), b.tag = 2, dh(c, b, 1))), c.lanes |= 1), a;a.flags |= 65536;a.lanes = e;return a;}var Xi = ua.ReactCurrentOwner,Ug = !1;function Yi(a, b, c, d) {b.child = null === a ? Ch(b, null, c, d) : Bh(b, a.child, c, d);}
function Zi(a, b, c, d, e) {c = c.render;var f = b.ref;Tg(b, e);d = Xh(a, b, c, d, f, e);c = bi();if (null !== a && !Ug) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, $i(a, b, e);I && c && vg(b);b.flags |= 1;Yi(a, b, d, e);return b.child;}
function aj(a, b, c, d, e) {if (null === a) {var f = c.type;if ("function" === typeof f && !bj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, cj(a, b, f, d, e);a = yh(c.type, null, d, b, b.mode, e);a.ref = b.ref;a["return"] = b;return b.child = a;}f = a.child;if (0 === (a.lanes & e)) {var g = f.memoizedProps;c = c.compare;c = null !== c ? c : Ie;if (c(g, d) && a.ref === b.ref) return $i(a, b, e);}b.flags |= 1;a = wh(f, d);a.ref = b.ref;a["return"] = b;return b.child = a;}
function cj(a, b, c, d, e) {if (null !== a) {var f = a.memoizedProps;if (Ie(f, d) && a.ref === b.ref) if (Ug = !1, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (Ug = !0);else return b.lanes = a.lanes, $i(a, b, e);}return dj(a, b, c, d, e);}
function ej(a, b, c) {var d = b.pendingProps,e = d.children,f = null !== a ? a.memoizedState : null;if ("hidden" === d.mode) {if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(fj, gj), gj |= c;else {if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(fj, gj), gj |= a, null;b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };d = null !== f ? f.baseLanes : c;G(fj, gj);gj |= d;}} else null !==
  f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(fj, gj), gj |= d;Yi(a, b, e, c);return b.child;}function hj(a, b) {var c = b.ref;if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;}function dj(a, b, c, d, e) {var f = Zf(c) ? Xf : H.current;f = Yf(b, f);Tg(b, e);c = Xh(a, b, c, d, f, e);d = bi();if (null !== a && !Ug) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, $i(a, b, e);I && d && vg(b);b.flags |= 1;Yi(a, b, c, e);return b.child;}
function ij(a, b, c, d, e) {if (Zf(c)) {var f = !0;cg(b);} else f = !1;Tg(b, e);if (null === b.stateNode) jj(a, b), ph(b, c, d), rh(b, c, d, e), d = !0;else if (null === a) {var g = b.stateNode,h = b.memoizedProps;g.props = h;var k = g.context,l = c.contextType;"object" === _typeof(l) && null !== l ? l = Vg(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));var m = c.getDerivedStateFromProps,q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps ||
    (h !== d || k !== l) && qh(b, g, d, l);$g = !1;var r = b.memoizedState;g.state = r;gh(b, d, g, e);k = b.memoizedState;h !== d || r !== k || Wf.current || $g ? ("function" === typeof m && (kh(b, c, m, d), k = b.memoizedState), (h = $g || oh(b, c, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : (
    "function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = !1);} else {g = b.stateNode;bh(a, b);h = b.memoizedProps;l = b.type === b.elementType ? h : Lg(b.type, h);g.props = l;q = b.pendingProps;r = g.context;k = c.contextType;"object" === _typeof(k) && null !== k ? k = Vg(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));var y = c.getDerivedStateFromProps;(m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) ||
    "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && qh(b, g, d, k);$g = !1;r = b.memoizedState;g.state = r;gh(b, d, g, e);var n = b.memoizedState;h !== q || r !== n || Wf.current || $g ? ("function" === typeof y && (kh(b, c, y, d), n = b.memoizedState), (l = $g || oh(b, c, l, d, r, n, k) || !1) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate &&
    g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r ===
    a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), d = !1);}return kj(a, b, c, d, f, e);}
function kj(a, b, c, d, e, f) {hj(a, b);var g = 0 !== (b.flags & 128);if (!d && !g) return e && dg(b, c, !1), $i(a, b, f);d = b.stateNode;Xi.current = b;var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();b.flags |= 1;null !== a && g ? (b.child = Bh(b, a.child, null, f), b.child = Bh(b, null, h, f)) : Yi(a, b, h, f);b.memoizedState = d.state;e && dg(b, c, !0);return b.child;}function lj(a) {var b = a.stateNode;b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, !1);Ih(a, b.containerInfo);}
function mj(a, b, c, d, e) {Ig();Jg(e);b.flags |= 256;Yi(a, b, c, d);return b.child;}var nj = { dehydrated: null, treeContext: null, retryLane: 0 };function oj(a) {return { baseLanes: a, cachePool: null, transitions: null };}
function pj(a, b, c) {var d = b.pendingProps,e = M.current,f = !1,g = 0 !== (b.flags & 128),h;(h = g) || (h = null !== a && null === a.memoizedState ? !1 : 0 !== (e & 2));if (h) f = !0, b.flags &= -129;else if (null === a || null !== a.memoizedState) e |= 1;G(M, e & 1);if (null === a) {Eg(b);a = b.memoizedState;if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;g = d.children;a = d.fallback;return f ? (d = b.mode, f = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps =
    g) : f = qj(g, d, 0, null), a = Ah(a, d, c, null), f["return"] = b, a["return"] = b, f.sibling = a, b.child = f, b.child.memoizedState = oj(c), b.memoizedState = nj, a) : rj(b, g);}e = a.memoizedState;if (null !== e && (h = e.dehydrated, null !== h)) return sj(a, b, g, d, h, e, c);if (f) {f = d.fallback;g = b.mode;e = a.child;h = e.sibling;var k = { mode: "hidden", children: d.children };0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = wh(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);null !== h ? f = wh(h, f) : (f = Ah(f, g, c, null), f.flags |= 2);f["return"] =
    b;d["return"] = b;d.sibling = f;b.child = d;d = f;f = b.child;g = a.child.memoizedState;g = null === g ? oj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };f.memoizedState = g;f.childLanes = a.childLanes & ~c;b.memoizedState = nj;return d;}f = a.child;a = f.sibling;d = wh(f, { mode: "visible", children: d.children });0 === (b.mode & 1) && (d.lanes = c);d["return"] = b;d.sibling = null;null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));b.child = d;b.memoizedState = null;return d;}
function rj(a, b) {b = qj({ mode: "visible", children: b }, a.mode, 0, null);b["return"] = a;return a.child = b;}function tj(a, b, c, d) {null !== d && Jg(d);Bh(b, a.child, null, c);a = rj(b, b.pendingProps.children);a.flags |= 2;b.memoizedState = null;return a;}
function sj(a, b, c, d, e, f, g) {if (c) {if (b.flags & 256) return b.flags &= -257, d = Li(Error(p(422))), tj(a, b, g, d);if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;f = d.fallback;e = b.mode;d = qj({ mode: "visible", children: d.children }, e, 0, null);f = Ah(f, e, g, null);f.flags |= 2;d["return"] = b;f["return"] = b;d.sibling = f;b.child = d;0 !== (b.mode & 1) && Bh(b, a.child, null, g);b.child.memoizedState = oj(g);b.memoizedState = nj;return f;}if (0 === (b.mode & 1)) return tj(a, b, g, null);if ("$!" === e.data) {d = e.nextSibling && e.nextSibling.dataset;
    if (d) var h = d.dgst;d = h;f = Error(p(419));d = Li(f, d, void 0);return tj(a, b, g, d);}h = 0 !== (g & a.childLanes);if (Ug || h) {d = R;if (null !== d) {switch (g & -g) {case 4:e = 2;break;case 16:e = 8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:e = 32;break;case 536870912:e = 268435456;break;default:e = 0;}e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
      0 !== e && e !== f.retryLane && (f.retryLane = e, Zg(a, e), mh(d, a, e, -1));}uj();d = Li(Error(p(421)));return tj(a, b, g, d);}if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = vj.bind(null, a), e._reactRetry = b, null;a = f.treeContext;yg = Lf(e.nextSibling);xg = b;I = !0;zg = null;null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);b = rj(b, d.children);b.flags |= 4096;return b;}function wj(a, b, c) {a.lanes |= b;var d = a.alternate;null !== d && (d.lanes |= b);Sg(a["return"], b, c);}
function xj(a, b, c, d, e) {var f = a.memoizedState;null === f ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);}
function yj(a, b, c) {var d = b.pendingProps,e = d.revealOrder,f = d.tail;Yi(a, b, d.children, c);d = M.current;if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;else {if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a;) {if (13 === a.tag) null !== a.memoizedState && wj(a, c, b);else if (19 === a.tag) wj(a, c, b);else if (null !== a.child) {a.child["return"] = a;a = a.child;continue;}if (a === b) break a;for (; null === a.sibling;) {if (null === a["return"] || a["return"] === b) break a;a = a["return"];}a.sibling["return"] = a["return"];a = a.sibling;}d &= 1;}G(M, d);if (0 === (b.mode & 1)) b.memoizedState =
  null;else switch (e) {case "forwards":c = b.child;for (e = null; null !== c;) {a = c.alternate, null !== a && null === Mh(a) && (e = c), c = c.sibling;}c = e;null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);xj(b, !1, e, c, f);break;case "backwards":c = null;e = b.child;for (b.child = null; null !== e;) {a = e.alternate;if (null !== a && null === Mh(a)) {b.child = e;break;}a = e.sibling;e.sibling = c;c = e;e = a;}xj(b, !0, c, null, f);break;case "together":xj(b, !1, null, null, void 0);break;default:b.memoizedState = null;}return b.child;}
function jj(a, b) {0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);}function $i(a, b, c) {null !== a && (b.dependencies = a.dependencies);hh |= b.lanes;if (0 === (c & b.childLanes)) return null;if (null !== a && b.child !== a.child) throw Error(p(153));if (null !== b.child) {a = b.child;c = wh(a, a.pendingProps);b.child = c;for (c["return"] = b; null !== a.sibling;) {a = a.sibling, c = c.sibling = wh(a, a.pendingProps), c["return"] = b;}c.sibling = null;}return b.child;}
function zj(a, b, c) {switch (b.tag) {case 3:lj(b);Ig();break;case 5:Kh(b);break;case 1:Zf(b.type) && cg(b);break;case 4:Ih(b, b.stateNode.containerInfo);break;case 10:var d = b.type._context,e = b.memoizedProps.value;G(Mg, d._currentValue);d._currentValue = e;break;case 13:d = b.memoizedState;if (null !== d) {if (null !== d.dehydrated) return G(M, M.current & 1), b.flags |= 128, null;if (0 !== (c & b.child.childLanes)) return pj(a, b, c);G(M, M.current & 1);a = $i(a, b, c);return null !== a ? a.sibling : null;}G(M, M.current & 1);break;case 19:d = 0 !== (c &
      b.childLanes);if (0 !== (a.flags & 128)) {if (d) return yj(a, b, c);b.flags |= 128;}e = b.memoizedState;null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);G(M, M.current);if (d) break;else return null;case 22:case 23:return b.lanes = 0, ej(a, b, c);}return $i(a, b, c);}var Aj, Bj, Cj, Dj;
Aj = function Aj(a, b) {for (var c = b.child; null !== c;) {if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);else if (4 !== c.tag && null !== c.child) {c.child["return"] = c;c = c.child;continue;}if (c === b) break;for (; null === c.sibling;) {if (null === c["return"] || c["return"] === b) return;c = c["return"];}c.sibling["return"] = c["return"];c = c.sibling;}};Bj = function Bj() {};
Cj = function Cj(a, b, c, d) {var e = a.memoizedProps;if (e !== d) {a = b.stateNode;Hh(Eh.current);var f = null;switch (c) {case "input":e = Ya(a, e);d = Ya(a, d);f = [];break;case "select":e = A({}, e, { value: void 0 });d = A({}, d, { value: void 0 });f = [];break;case "textarea":e = gb(a, e);d = gb(a, d);f = [];break;default:"function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);}ub(c, d);var g;c = null;for (l in e) {if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {var h = e[l];for (g in h) {h.hasOwnProperty(g) && (
          c || (c = {}), c[g] = "");}} else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));}for (l in d) {var k = d[l];h = null != e ? e[l] : void 0;if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) {if (h) {for (g in h) {!h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");}for (g in k) {k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);}} else c || (f || (f = []), f.push(l,
        c)), c = k;} else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));}c && (f = f || []).push("style", c);var l = f;if (b.updateQueue = l) b.flags |= 4;}};Dj = function Dj(a, b, c, d) {c !== d && (b.flags |= 4);};
function Ej(a, b) {if (!I) switch (a.tailMode) {case "hidden":b = a.tail;for (var c = null; null !== b;) {null !== b.alternate && (c = b), b = b.sibling;}null === c ? a.tail = null : c.sibling = null;break;case "collapsed":c = a.tail;for (var d = null; null !== c;) {null !== c.alternate && (d = c), c = c.sibling;}null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;}}
function S(a) {var b = null !== a.alternate && a.alternate.child === a.child,c = 0,d = 0;if (b) for (var e = a.child; null !== e;) {c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e["return"] = a, e = e.sibling;} else for (e = a.child; null !== e;) {c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e["return"] = a, e = e.sibling;}a.subtreeFlags |= d;a.childLanes = c;return b;}
function Fj(a, b, c) {var d = b.pendingProps;wg(b);switch (b.tag) {case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return S(b), null;case 1:return Zf(b.type) && $f(), S(b), null;case 3:d = b.stateNode;Jh();E(Wf);E(H);Oh();d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Gj(zg), zg = null));Bj(a, b);S(b);return null;case 5:Lh(b);var e = Hh(Gh.current);
      c = b.type;if (null !== a && null != b.stateNode) Cj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);else {if (!d) {if (null === b.stateNode) throw Error(p(166));S(b);return null;}a = Hh(Eh.current);if (Gg(b)) {d = b.stateNode;c = b.type;var f = b.memoizedProps;d[Of] = b;d[Pf] = f;a = 0 !== (b.mode & 1);switch (c) {case "dialog":D("cancel", d);D("close", d);break;case "iframe":case "object":case "embed":D("load", d);break;case "video":case "audio":for (e = 0; e < lf.length; e++) {D(lf[e], d);}break;case "source":D("error", d);break;case "img":case "image":case "link":D("error",
              d);D("load", d);break;case "details":D("toggle", d);break;case "input":Za(d, f);D("invalid", d);break;case "select":d._wrapperState = { wasMultiple: !!f.multiple };D("invalid", d);break;case "textarea":hb(d, f), D("invalid", d);}ub(c, f);e = null;for (var g in f) {if (f.hasOwnProperty(g)) {var h = f[g];"children" === g ? "string" === typeof h ? d.textContent !== h && (!0 !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (!0 !== f.suppressHydrationWarning && Af(d.textContent,
              h, a), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);}}switch (c) {case "input":Va(d);db(d, f, !0);break;case "textarea":Va(d);jb(d);break;case "select":case "option":break;default:"function" === typeof f.onClick && (d.onclick = Bf);}d = e;b.updateQueue = d;null !== d && (b.flags |= 4);} else {g = 9 === e.nodeType ? e : e.ownerDocument;"http://www.w3.org/1999/xhtml" === a && (a = kb(c));"http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script>\x3c/script>", a = a.removeChild(a.firstChild)) :
          "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = !0 : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);a[Of] = b;a[Pf] = d;Aj(a, b, !1, !1);b.stateNode = a;a: {g = vb(c, d);switch (c) {case "dialog":D("cancel", a);D("close", a);e = d;break;case "iframe":case "object":case "embed":D("load", a);e = d;break;case "video":case "audio":for (e = 0; e < lf.length; e++) {D(lf[e], a);}e = d;break;case "source":D("error", a);e = d;break;case "img":case "image":case "link":D("error",
                a);D("load", a);e = d;break;case "details":D("toggle", a);e = d;break;case "input":Za(a, d);e = Ya(a, d);D("invalid", a);break;case "option":e = d;break;case "select":a._wrapperState = { wasMultiple: !!d.multiple };e = A({}, d, { value: void 0 });D("invalid", a);break;case "textarea":hb(a, d);e = gb(a, d);D("invalid", a);break;default:e = d;}ub(c, e);h = e;for (f in h) {if (h.hasOwnProperty(f)) {var k = h[f];"style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !==
                c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));}}switch (c) {case "input":Va(a);db(a, d, !1);break;case "textarea":Va(a);jb(a);break;case "option":null != d.value && a.setAttribute("value", "" + Sa(d.value));break;case "select":a.multiple = !!d.multiple;f = d.value;null != f ? fb(a, !!d.multiple, f, !1) : null != d.defaultValue && fb(a, !!d.multiple, d.defaultValue,
                !0);break;default:"function" === typeof e.onClick && (a.onclick = Bf);}switch (c) {case "button":case "input":case "select":case "textarea":d = !!d.autoFocus;break a;case "img":d = !0;break a;default:d = !1;}}d && (b.flags |= 4);}null !== b.ref && (b.flags |= 512, b.flags |= 2097152);}S(b);return null;case 6:if (a && null != b.stateNode) Dj(a, b, a.memoizedProps, d);else {if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));c = Hh(Gh.current);Hh(Eh.current);if (Gg(b)) {d = b.stateNode;c = b.memoizedProps;d[Of] = b;if (f = d.nodeValue !== c) if (a =
          xg, null !== a) switch (a.tag) {case 3:Af(d.nodeValue, c, 0 !== (a.mode & 1));break;case 5:!0 !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));}f && (b.flags |= 4);} else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;}S(b);return null;case 13:E(M);d = b.memoizedState;if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f = !1;else if (f = Gg(b), null !== d && null !== d.dehydrated) {if (null ===
          a) {if (!f) throw Error(p(318));f = b.memoizedState;f = null !== f ? f.dehydrated : null;if (!f) throw Error(p(317));f[Of] = b;} else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;S(b);f = !1;} else null !== zg && (Gj(zg), zg = null), f = !0;if (!f) return b.flags & 65536 ? b : null;}if (0 !== (b.flags & 128)) return b.lanes = c, b;d = null !== d;d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (M.current & 1) ? 0 === T && (T = 3) : uj()));null !== b.updateQueue && (b.flags |= 4);S(b);return null;case 4:return Jh(),
      Bj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;case 10:return Rg(b.type._context), S(b), null;case 17:return Zf(b.type) && $f(), S(b), null;case 19:E(M);f = b.memoizedState;if (null === f) return S(b), null;d = 0 !== (b.flags & 128);g = f.rendering;if (null === g) {if (d) Ej(f, !1);else {if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a;) {g = Mh(a);if (null !== g) {b.flags |= 128;Ej(f, !1);d = g.updateQueue;null !== d && (b.updateQueue = d, b.flags |= 4);b.subtreeFlags = 0;d = c;for (c = b.child; null !== c;) {f = c, a = d, f.flags &= 14680066,
                g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;}G(M, M.current & 1 | 2);return b.child;}a =
            a.sibling;}null !== f.tail && B() > Hj && (b.flags |= 128, d = !0, Ej(f, !1), b.lanes = 4194304);}} else {if (!d) if (a = Mh(g), null !== a) {if (b.flags |= 128, d = !0, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Ej(f, !0), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I) return S(b), null;} else 2 * B() - f.renderingStartTime > Hj && 1073741824 !== c && (b.flags |= 128, d = !0, Ej(f, !1), b.lanes = 4194304);f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);}if (null !== f.tail) return b = f.tail, f.rendering =
      b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = M.current, G(M, d ? c & 1 | 2 : c & 1), b;S(b);return null;case 22:case 23:return Ij(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (gj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;case 24:return null;case 25:return null;}throw Error(p(156, b.tag));}
function Jj(a, b) {wg(b);switch (b.tag) {case 1:return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;case 3:return Jh(), E(Wf), E(H), Oh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;case 5:return Lh(b), null;case 13:E(M);a = b.memoizedState;if (null !== a && null !== a.dehydrated) {if (null === b.alternate) throw Error(p(340));Ig();}a = b.flags;return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;case 19:return E(M), null;case 4:return Jh(), null;case 10:return Rg(b.type._context), null;case 22:case 23:return Ij(),
      null;case 24:return null;default:return null;}}var Kj = !1,U = !1,Lj = "function" === typeof WeakSet ? WeakSet : Set,V = null;function Mj(a, b) {var c = a.ref;if (null !== c) if ("function" === typeof c) try {c(null);} catch (d) {W(a, b, d);} else c.current = null;}function Nj(a, b, c) {try {c();} catch (d) {W(a, b, d);}}var Oj = !1;
function Pj(a, b) {Cf = dd;a = Me();if (Ne(a)) {if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };else a: {c = (c = a.ownerDocument) && c.defaultView || window;var d = c.getSelection && c.getSelection();if (d && 0 !== d.rangeCount) {c = d.anchorNode;var e = d.anchorOffset,f = d.focusNode;d = d.focusOffset;try {c.nodeType, f.nodeType;} catch (F) {c = null;break a;}var g = 0,h = -1,k = -1,l = 0,m = 0,q = a,r = null;b: for (;;) {for (var y;;) {q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);3 === q.nodeType && (g +=
            q.nodeValue.length);if (null === (y = q.firstChild)) break;r = q;q = y;}for (;;) {if (q === a) break b;r === c && ++l === e && (h = g);r === f && ++m === d && (k = g);if (null !== (y = q.nextSibling)) break;q = r;r = q.parentNode;}q = y;}c = -1 === h || -1 === k ? null : { start: h, end: k };} else c = null;}c = c || { start: 0, end: 0 };} else c = null;Df = { focusedElem: a, selectionRange: c };dd = !1;for (V = b; null !== V;) {if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a["return"] = b, V = a;else for (; null !== V;) {b = V;try {var n = b.alternate;if (0 !== (b.flags & 1024)) switch (b.tag) {case 0:case 11:case 15:break;
          case 1:if (null !== n) {var t = n.memoizedProps,J = n.memoizedState,x = b.stateNode,w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Lg(b.type, t), J);x.__reactInternalSnapshotBeforeUpdate = w;}break;case 3:var u = b.stateNode.containerInfo;1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(p(163));}} catch (F) {W(b, b["return"], F);}a = b.sibling;if (null !== a) {a["return"] = b["return"];V = a;break;}V = b["return"];}}n = Oj;Oj = !1;return n;}
function Qj(a, b, c) {var d = b.updateQueue;d = null !== d ? d.lastEffect : null;if (null !== d) {var e = d = d.next;do {if ((e.tag & a) === a) {var f = e.destroy;e.destroy = void 0;void 0 !== f && Nj(b, c, f);}e = e.next;} while (e !== d);}}function Rj(a, b) {b = b.updateQueue;b = null !== b ? b.lastEffect : null;if (null !== b) {var c = b = b.next;do {if ((c.tag & a) === a) {var d = c.create;c.destroy = d();}c = c.next;} while (c !== b);}}function Sj(a) {var b = a.ref;if (null !== b) {var c = a.stateNode;switch (a.tag) {case 5:a = c;break;default:a = c;}"function" === typeof b ? b(a) : b.current = a;}}
function Tj(a) {var b = a.alternate;null !== b && (a.alternate = null, Tj(b));a.child = null;a.deletions = null;a.sibling = null;5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));a.stateNode = null;a["return"] = null;a.dependencies = null;a.memoizedProps = null;a.memoizedState = null;a.pendingProps = null;a.stateNode = null;a.updateQueue = null;}function Uj(a) {return 5 === a.tag || 3 === a.tag || 4 === a.tag;}
function Vj(a) {a: for (;;) {for (; null === a.sibling;) {if (null === a["return"] || Uj(a["return"])) return null;a = a["return"];}a.sibling["return"] = a["return"];for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag;) {if (a.flags & 2) continue a;if (null === a.child || 4 === a.tag) continue a;else a.child["return"] = a, a = a.child;}if (!(a.flags & 2)) return a.stateNode;}}
function Wj(a, b, c) {var d = a.tag;if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a;) {Wj(a, b, c), a = a.sibling;}}
function Xj(a, b, c) {var d = a.tag;if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);else if (4 !== d && (a = a.child, null !== a)) for (Xj(a, b, c), a = a.sibling; null !== a;) {Xj(a, b, c), a = a.sibling;}}var X = null,Yj = !1;function Zj(a, b, c) {for (c = c.child; null !== c;) {ak(a, b, c), c = c.sibling;}}
function ak(a, b, c) {if (lc && "function" === typeof lc.onCommitFiberUnmount) try {lc.onCommitFiberUnmount(kc, c);} catch (h) {}switch (c.tag) {case 5:U || Mj(c, b);case 6:var d = X,e = Yj;X = null;Zj(a, b, c);X = d;Yj = e;null !== X && (Yj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));break;case 18:null !== X && (Yj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));break;case 4:d = X;e = Yj;X = c.stateNode.containerInfo;Yj = !0;
      Zj(a, b, c);X = d;Yj = e;break;case 0:case 11:case 14:case 15:if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {e = d = d.next;do {var f = e,g = f.destroy;f = f.tag;void 0 !== g && (0 !== (f & 2) ? Nj(c, b, g) : 0 !== (f & 4) && Nj(c, b, g));e = e.next;} while (e !== d);}Zj(a, b, c);break;case 1:if (!U && (Mj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();} catch (h) {W(c, b, h);}Zj(a, b, c);break;case 21:Zj(a, b, c);break;case 22:c.mode & 1 ? (U = (d = U) || null !==
      c.memoizedState, Zj(a, b, c), U = d) : Zj(a, b, c);break;default:Zj(a, b, c);}}function bk(a) {var b = a.updateQueue;if (null !== b) {a.updateQueue = null;var c = a.stateNode;null === c && (c = a.stateNode = new Lj());b.forEach(function (b) {var d = ck.bind(null, a, b);c.has(b) || (c.add(b), b.then(d, d));});}}
function dk(a, b) {var c = b.deletions;if (null !== c) for (var d = 0; d < c.length; d++) {var e = c[d];try {var f = a,g = b,h = g;a: for (; null !== h;) {switch (h.tag) {case 5:X = h.stateNode;Yj = !1;break a;case 3:X = h.stateNode.containerInfo;Yj = !0;break a;case 4:X = h.stateNode.containerInfo;Yj = !0;break a;}h = h["return"];}if (null === X) throw Error(p(160));ak(f, g, e);X = null;Yj = !1;var k = e.alternate;null !== k && (k["return"] = null);e["return"] = null;} catch (l) {W(e, b, l);}}if (b.subtreeFlags & 12854) for (b = b.child; null !== b;) {ek(b, a), b = b.sibling;}}
function ek(a, b) {var c = a.alternate,d = a.flags;switch (a.tag) {case 0:case 11:case 14:case 15:dk(b, a);fk(a);if (d & 4) {try {Qj(3, a, a["return"]), Rj(3, a);} catch (t) {W(a, a["return"], t);}try {Qj(5, a, a["return"]);} catch (t) {W(a, a["return"], t);}}break;case 1:dk(b, a);fk(a);d & 512 && null !== c && Mj(c, c["return"]);break;case 5:dk(b, a);fk(a);d & 512 && null !== c && Mj(c, c["return"]);if (a.flags & 32) {var e = a.stateNode;try {ob(e, "");} catch (t) {W(a, a["return"], t);}}if (d & 4 && (e = a.stateNode, null != e)) {var f = a.memoizedProps,g = null !== c ? c.memoizedProps : f,h = a.type,k = a.updateQueue;
        a.updateQueue = null;if (null !== k) try {"input" === h && "radio" === f.type && null != f.name && ab(e, f);vb(h, g);var l = vb(h, f);for (g = 0; g < k.length; g += 2) {var m = k[g],q = k[g + 1];"style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);}switch (h) {case "input":bb(e, f);break;case "textarea":ib(e, f);break;case "select":var r = e._wrapperState.wasMultiple;e._wrapperState.wasMultiple = !!f.multiple;var y = f.value;null != y ? fb(e, !!f.multiple, y, !1) : r !== !!f.multiple && (null != f.defaultValue ? fb(e, !!f.multiple,
              f.defaultValue, !0) : fb(e, !!f.multiple, f.multiple ? [] : "", !1));}e[Pf] = f;} catch (t) {W(a, a["return"], t);}}break;case 6:dk(b, a);fk(a);if (d & 4) {if (null === a.stateNode) throw Error(p(162));e = a.stateNode;f = a.memoizedProps;try {e.nodeValue = f;} catch (t) {W(a, a["return"], t);}}break;case 3:dk(b, a);fk(a);if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {bd(b.containerInfo);} catch (t) {W(a, a["return"], t);}break;case 4:dk(b, a);fk(a);break;case 13:dk(b, a);fk(a);e = a.child;e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f ||
      null !== e.alternate && null !== e.alternate.memoizedState || (gk = B()));d & 4 && bk(a);break;case 22:m = null !== c && null !== c.memoizedState;a.mode & 1 ? (U = (l = U) || m, dk(b, a), U = l) : dk(b, a);fk(a);if (d & 8192) {l = null !== a.memoizedState;if ((a.stateNode.isHidden = l) && !m && 0 !== (a.mode & 1)) for (V = a, m = a.child; null !== m;) {for (q = V = m; null !== V;) {r = V;y = r.child;switch (r.tag) {case 0:case 11:case 14:case 15:Qj(4, r, r["return"]);break;case 1:Mj(r, r["return"]);var n = r.stateNode;if ("function" === typeof n.componentWillUnmount) {d = r;c = r["return"];try {b = d, n.props =
                    b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();} catch (t) {W(d, c, t);}}break;case 5:Mj(r, r["return"]);break;case 22:if (null !== r.memoizedState) {hk(q);continue;}}null !== y ? (y["return"] = r, V = y) : hk(q);}m = m.sibling;}a: for (m = null, q = a;;) {if (5 === q.tag) {if (null === m) {m = q;try {e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display =
                rb("display", g));} catch (t) {W(a, a["return"], t);}}} else if (6 === q.tag) {if (null === m) try {q.stateNode.nodeValue = l ? "" : q.memoizedProps;} catch (t) {W(a, a["return"], t);}} else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {q.child["return"] = q;q = q.child;continue;}if (q === a) break a;for (; null === q.sibling;) {if (null === q["return"] || q["return"] === a) break a;m === q && (m = null);q = q["return"];}m === q && (m = null);q.sibling["return"] = q["return"];q = q.sibling;}}break;case 19:dk(b, a);fk(a);d & 4 && bk(a);break;case 21:break;default:dk(b,
      a), fk(a);}}function fk(a) {var b = a.flags;if (b & 2) {try {a: {for (var c = a["return"]; null !== c;) {if (Uj(c)) {var d = c;break a;}c = c["return"];}throw Error(p(160));}switch (d.tag) {case 5:var e = d.stateNode;d.flags & 32 && (ob(e, ""), d.flags &= -33);var f = Vj(a);Xj(a, f, e);break;case 3:case 4:var g = d.stateNode.containerInfo,h = Vj(a);Wj(a, h, g);break;default:throw Error(p(161));}} catch (k) {W(a, a["return"], k);}a.flags &= -3;}b & 4096 && (a.flags &= -4097);}function ik(a, b, c) {V = a;jk(a, b, c);}
function jk(a, b, c) {for (var d = 0 !== (a.mode & 1); null !== V;) {var e = V,f = e.child;if (22 === e.tag && d) {var g = null !== e.memoizedState || Kj;if (!g) {var h = e.alternate,k = null !== h && null !== h.memoizedState || U;h = Kj;var l = U;Kj = g;if ((U = k) && !l) for (V = e; null !== V;) {g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? kk(e) : null !== k ? (k["return"] = g, V = k) : kk(e);}for (; null !== f;) {V = f, jk(f, b, c), f = f.sibling;}V = e;Kj = h;U = l;}lk(a, b, c);} else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f["return"] = e, V = f) : lk(a, b, c);}}
function lk(a) {for (; null !== V;) {var b = V;if (0 !== (b.flags & 8772)) {var c = b.alternate;try {if (0 !== (b.flags & 8772)) switch (b.tag) {case 0:case 11:case 15:U || Rj(5, b);break;case 1:var d = b.stateNode;if (b.flags & 4 && !U) if (null === c) d.componentDidMount();else {var e = b.elementType === b.type ? c.memoizedProps : Lg(b.type, c.memoizedProps);d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);}var f = b.updateQueue;null !== f && ih(b, f, d);break;case 3:var g = b.updateQueue;if (null !== g) {c = null;if (null !== b.child) switch (b.child.tag) {case 5:c =
                  b.child.stateNode;break;case 1:c = b.child.stateNode;}ih(b, g, c);}break;case 5:var h = b.stateNode;if (null === c && b.flags & 4) {c = h;var k = b.memoizedProps;switch (b.type) {case "button":case "input":case "select":case "textarea":k.autoFocus && c.focus();break;case "img":k.src && (c.src = k.src);}}break;case 6:break;case 4:break;case 12:break;case 13:if (null === b.memoizedState) {var l = b.alternate;if (null !== l) {var m = l.memoizedState;if (null !== m) {var q = m.dehydrated;null !== q && bd(q);}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;
          default:throw Error(p(163));}U || b.flags & 512 && Sj(b);} catch (r) {W(b, b["return"], r);}}if (b === a) {V = null;break;}c = b.sibling;if (null !== c) {c["return"] = b["return"];V = c;break;}V = b["return"];}}function hk(a) {for (; null !== V;) {var b = V;if (b === a) {V = null;break;}var c = b.sibling;if (null !== c) {c["return"] = b["return"];V = c;break;}V = b["return"];}}
function kk(a) {for (; null !== V;) {var b = V;try {switch (b.tag) {case 0:case 11:case 15:var c = b["return"];try {Rj(4, b);} catch (k) {W(b, c, k);}break;case 1:var d = b.stateNode;if ("function" === typeof d.componentDidMount) {var e = b["return"];try {d.componentDidMount();} catch (k) {W(b, e, k);}}var f = b["return"];try {Sj(b);} catch (k) {W(b, f, k);}break;case 5:var g = b["return"];try {Sj(b);} catch (k) {W(b, g, k);}}} catch (k) {W(b, b["return"], k);}if (b === a) {V = null;break;}var h = b.sibling;if (null !== h) {h["return"] = b["return"];V = h;break;}V = b["return"];}}
var mk = Math.ceil,nk = ua.ReactCurrentDispatcher,ok = ua.ReactCurrentOwner,pk = ua.ReactCurrentBatchConfig,K = 0,R = null,Y = null,Z = 0,gj = 0,fj = Uf(0),T = 0,qk = null,hh = 0,rk = 0,sk = 0,tk = null,uk = null,gk = 0,Hj = Infinity,vk = null,Pi = !1,Qi = null,Si = null,wk = !1,xk = null,yk = 0,zk = 0,Ak = null,Bk = -1,Ck = 0;function L() {return 0 !== (K & 6) ? B() : -1 !== Bk ? Bk : Bk = B();}
function lh(a) {if (0 === (a.mode & 1)) return 1;if (0 !== (K & 2) && 0 !== Z) return Z & -Z;if (null !== Kg.transition) return 0 === Ck && (Ck = yc()), Ck;a = C;if (0 !== a) return a;a = window.event;a = void 0 === a ? 16 : jd(a.type);return a;}function mh(a, b, c, d) {if (50 < zk) throw zk = 0, Ak = null, Error(p(185));Ac(a, c, d);if (0 === (K & 2) || a !== R) a === R && (0 === (K & 2) && (rk |= c), 4 === T && Dk(a, Z)), Ek(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Hj = B() + 500, fg && jg());}
function Ek(a, b) {var c = a.callbackNode;wc(a, b);var d = uc(a, a === R ? Z : 0);if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;else if (b = d & -d, a.callbackPriority !== b) {null != c && bc(c);if (1 === b) 0 === a.tag ? ig(Fk.bind(null, a)) : hg(Fk.bind(null, a)), Jf(function () {0 === (K & 6) && jg();}), c = null;else {switch (Dc(d)) {case 1:c = fc;break;case 4:c = gc;break;case 16:c = hc;break;case 536870912:c = jc;break;default:c = hc;}c = Gk(c, Hk.bind(null, a));}a.callbackPriority = b;a.callbackNode = c;}}
function Hk(a, b) {Bk = -1;Ck = 0;if (0 !== (K & 6)) throw Error(p(327));var c = a.callbackNode;if (Ik() && a.callbackNode !== c) return null;var d = uc(a, a === R ? Z : 0);if (0 === d) return null;if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Jk(a, d);else {b = d;var e = K;K |= 2;var f = Kk();if (R !== a || Z !== b) vk = null, Hj = B() + 500, Lk(a, b);do {try {Mk();break;} catch (h) {Nk(a, h);}} while (1);Qg();nk.current = f;K = e;null !== Y ? b = 0 : (R = null, Z = 0, b = T);}if (0 !== b) {2 === b && (e = xc(a), 0 !== e && (d = e, b = Ok(a, e)));if (1 === b) throw c = qk, Lk(a, 0), Dk(a, d), Ek(a, B()), c;if (6 === b) Dk(a, d);else
    {e = a.current.alternate;if (0 === (d & 30) && !Pk(e) && (b = Jk(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Ok(a, f))), 1 === b)) throw c = qk, Lk(a, 0), Dk(a, d), Ek(a, B()), c;a.finishedWork = e;a.finishedLanes = d;switch (b) {case 0:case 1:throw Error(p(345));case 2:Qk(a, uk, vk);break;case 3:Dk(a, d);if ((d & 130023424) === d && (b = gk + 500 - B(), 10 < b)) {if (0 !== uc(a, 0)) break;e = a.suspendedLanes;if ((e & d) !== d) {L();a.pingedLanes |= a.suspendedLanes & e;break;}a.timeoutHandle = Ff(Qk.bind(null, a, uk, vk), b);break;}Qk(a, uk, vk);break;case 4:Dk(a, d);if ((d & 4194240) ===
          d) break;b = a.eventTimes;for (e = -1; 0 < d;) {var g = 31 - oc(d);f = 1 << g;g = b[g];g > e && (e = g);d &= ~f;}d = e;d = B() - d;d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3E3 > d ? 3E3 : 4320 > d ? 4320 : 1960 * mk(d / 1960)) - d;if (10 < d) {a.timeoutHandle = Ff(Qk.bind(null, a, uk, vk), d);break;}Qk(a, uk, vk);break;case 5:Qk(a, uk, vk);break;default:throw Error(p(329));}}}Ek(a, B());return a.callbackNode === c ? Hk.bind(null, a) : null;}
function Ok(a, b) {var c = tk;a.current.memoizedState.isDehydrated && (Lk(a, b).flags |= 256);a = Jk(a, b);2 !== a && (b = uk, uk = c, null !== b && Gj(b));return a;}function Gj(a) {null === uk ? uk = a : uk.push.apply(uk, a);}
function Pk(a) {for (var b = a;;) {if (b.flags & 16384) {var c = b.updateQueue;if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {var e = c[d],f = e.getSnapshot;e = e.value;try {if (!He(f(), e)) return !1;} catch (g) {return !1;}}}c = b.child;if (b.subtreeFlags & 16384 && null !== c) c["return"] = b, b = c;else {if (b === a) break;for (; null === b.sibling;) {if (null === b["return"] || b["return"] === a) return !0;b = b["return"];}b.sibling["return"] = b["return"];b = b.sibling;}}return !0;}
function Dk(a, b) {b &= ~sk;b &= ~rk;a.suspendedLanes |= b;a.pingedLanes &= ~b;for (a = a.expirationTimes; 0 < b;) {var c = 31 - oc(b),d = 1 << c;a[c] = -1;b &= ~d;}}function Fk(a) {if (0 !== (K & 6)) throw Error(p(327));Ik();var b = uc(a, 0);if (0 === (b & 1)) return Ek(a, B()), null;var c = Jk(a, b);if (0 !== a.tag && 2 === c) {var d = xc(a);0 !== d && (b = d, c = Ok(a, d));}if (1 === c) throw c = qk, Lk(a, 0), Dk(a, b), Ek(a, B()), c;if (6 === c) throw Error(p(345));a.finishedWork = a.current.alternate;a.finishedLanes = b;Qk(a, uk, vk);Ek(a, B());return null;}
function Rk(a, b) {var c = K;K |= 1;try {return a(b);} finally {K = c, 0 === K && (Hj = B() + 500, fg && jg());}}function Sk(a) {null !== xk && 0 === xk.tag && 0 === (K & 6) && Ik();var b = K;K |= 1;var c = pk.transition,d = C;try {if (pk.transition = null, C = 1, a) return a();} finally {C = d, pk.transition = c, K = b, 0 === (K & 6) && jg();}}function Ij() {gj = fj.current;E(fj);}
function Lk(a, b) {a.finishedWork = null;a.finishedLanes = 0;var c = a.timeoutHandle;-1 !== c && (a.timeoutHandle = -1, Gf(c));if (null !== Y) for (c = Y["return"]; null !== c;) {var d = c;wg(d);switch (d.tag) {case 1:d = d.type.childContextTypes;null !== d && void 0 !== d && $f();break;case 3:Jh();E(Wf);E(H);Oh();break;case 5:Lh(d);break;case 4:Jh();break;case 13:E(M);break;case 19:E(M);break;case 10:Rg(d.type._context);break;case 22:case 23:Ij();}c = c["return"];}R = a;Y = a = wh(a.current, null);Z = gj = b;T = 0;qk = null;sk = rk = hh = 0;uk = tk = null;if (null !== Wg) {for (b =
    0; b < Wg.length; b++) {if (c = Wg[b], d = c.interleaved, null !== d) {c.interleaved = null;var e = d.next,f = c.pending;if (null !== f) {var g = f.next;f.next = e;d.next = g;}c.pending = d;}}Wg = null;}return a;}
function Nk(a, b) {do {var c = Y;try {Qg();Ph.current = ai;if (Sh) {for (var d = N.memoizedState; null !== d;) {var e = d.queue;null !== e && (e.pending = null);d = d.next;}Sh = !1;}Rh = 0;P = O = N = null;Th = !1;Uh = 0;ok.current = null;if (null === c || null === c["return"]) {T = 1;qk = b;Y = null;break;}a: {var f = a,g = c["return"],h = c,k = b;b = Z;h.flags |= 32768;if (null !== k && "object" === _typeof(k) && "function" === typeof k.then) {var l = k,m = h,q = m.tag;if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {var r = m.alternate;r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState,
            m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);}var y = Vi(g);if (null !== y) {y.flags &= -257;Wi(y, g, h, f, b);y.mode & 1 && Ti(f, l, b);b = y;k = l;var n = b.updateQueue;if (null === n) {var t = new Set();t.add(k);b.updateQueue = t;} else n.add(k);break a;} else {if (0 === (b & 1)) {Ti(f, l, b);uj();break a;}k = Error(p(426));}} else if (I && h.mode & 1) {var J = Vi(g);if (null !== J) {0 === (J.flags & 65536) && (J.flags |= 256);Wi(J, g, h, f, b);Jg(Ki(k, h));break a;}}f = k = Ki(k, h);4 !== T && (T = 2);null === tk ? tk = [f] : tk.push(f);f = g;do {switch (f.tag) {case 3:f.flags |= 65536;
              b &= -b;f.lanes |= b;var x = Oi(f, k, b);fh(f, x);break a;case 1:h = k;var w = f.type,u = f.stateNode;if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Si || !Si.has(u)))) {f.flags |= 65536;b &= -b;f.lanes |= b;var F = Ri(f, h, b);fh(f, F);break a;}}f = f["return"];} while (null !== f);}Tk(c);} catch (na) {b = na;Y === c && null !== c && (Y = c = c["return"]);continue;}break;} while (1);}function Kk() {var a = nk.current;nk.current = ai;return null === a ? ai : a;}
function uj() {if (0 === T || 3 === T || 2 === T) T = 4;null === R || 0 === (hh & 268435455) && 0 === (rk & 268435455) || Dk(R, Z);}function Jk(a, b) {var c = K;K |= 2;var d = Kk();if (R !== a || Z !== b) vk = null, Lk(a, b);do {try {Uk();break;} catch (e) {Nk(a, e);}} while (1);Qg();K = c;nk.current = d;if (null !== Y) throw Error(p(261));R = null;Z = 0;return T;}function Uk() {for (; null !== Y;) {Vk(Y);}}function Mk() {for (; null !== Y && !cc();) {Vk(Y);}}function Vk(a) {var b = Wk(a.alternate, a, gj);a.memoizedProps = a.pendingProps;null === b ? Tk(a) : Y = b;ok.current = null;}
function Tk(a) {var b = a;do {var c = b.alternate;a = b["return"];if (0 === (b.flags & 32768)) {if (c = Fj(c, b, gj), null !== c) {Y = c;return;}} else {c = Jj(c, b);if (null !== c) {c.flags &= 32767;Y = c;return;}if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;else {T = 6;Y = null;return;}}b = b.sibling;if (null !== b) {Y = b;return;}Y = b = a;} while (null !== b);0 === T && (T = 5);}function Qk(a, b, c) {var d = C,e = pk.transition;try {pk.transition = null, C = 1, Xk(a, b, c, d);} finally {pk.transition = e, C = d;}return null;}
function Xk(a, b, c, d) {do {Ik();} while (null !== xk);if (0 !== (K & 6)) throw Error(p(327));c = a.finishedWork;var e = a.finishedLanes;if (null === c) return null;a.finishedWork = null;a.finishedLanes = 0;if (c === a.current) throw Error(p(177));a.callbackNode = null;a.callbackPriority = 0;var f = c.lanes | c.childLanes;Bc(a, f);a === R && (Y = R = null, Z = 0);0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || wk || (wk = !0, Gk(hc, function () {Ik();return null;}));f = 0 !== (c.flags & 15990);if (0 !== (c.subtreeFlags & 15990) || f) {f = pk.transition;pk.transition = null;
    var g = C;C = 1;var h = K;K |= 4;ok.current = null;Pj(a, c);ek(c, a);Oe(Df);dd = !!Cf;Df = Cf = null;a.current = c;ik(c, a, e);dc();K = h;C = g;pk.transition = f;} else a.current = c;wk && (wk = !1, xk = a, yk = e);f = a.pendingLanes;0 === f && (Si = null);mc(c.stateNode, d);Ek(a, B());if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) {e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });}if (Pi) throw Pi = !1, a = Qi, Qi = null, a;0 !== (yk & 1) && 0 !== a.tag && Ik();f = a.pendingLanes;0 !== (f & 1) ? a === Ak ? zk++ : (zk = 0, Ak = a) : zk = 0;jg();return null;}
function Ik() {if (null !== xk) {var a = Dc(yk),b = pk.transition,c = C;try {pk.transition = null;C = 16 > a ? 16 : a;if (null === xk) var d = !1;else {a = xk;xk = null;yk = 0;if (0 !== (K & 6)) throw Error(p(331));var e = K;K |= 4;for (V = a.current; null !== V;) {var f = V,g = f.child;if (0 !== (V.flags & 16)) {var h = f.deletions;if (null !== h) {for (var k = 0; k < h.length; k++) {var l = h[k];for (V = l; null !== V;) {var m = V;switch (m.tag) {case 0:case 11:case 15:Qj(8, m, f);}var q = m.child;if (null !== q) q["return"] = m, V = q;else for (; null !== V;) {m = V;var r = m.sibling,y = m["return"];Tj(m);if (m ===
                    l) {V = null;break;}if (null !== r) {r["return"] = y;V = r;break;}V = y;}}}var n = f.alternate;if (null !== n) {var t = n.child;if (null !== t) {n.child = null;do {var J = t.sibling;t.sibling = null;t = J;} while (null !== t);}}V = f;}}if (0 !== (f.subtreeFlags & 2064) && null !== g) g["return"] = f, V = g;else b: for (; null !== V;) {f = V;if (0 !== (f.flags & 2048)) switch (f.tag) {case 0:case 11:case 15:Qj(9, f, f["return"]);}var x = f.sibling;if (null !== x) {x["return"] = f["return"];V = x;break b;}V = f["return"];}}var w = a.current;for (V = w; null !== V;) {g = V;var u = g.child;if (0 !== (g.subtreeFlags & 2064) && null !==
          u) u["return"] = g, V = u;else b: for (g = w; null !== V;) {h = V;if (0 !== (h.flags & 2048)) try {switch (h.tag) {case 0:case 11:case 15:Rj(9, h);}} catch (na) {W(h, h["return"], na);}if (h === g) {V = null;break b;}var F = h.sibling;if (null !== F) {F["return"] = h["return"];V = F;break b;}V = h["return"];}}K = e;jg();if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {lc.onPostCommitFiberRoot(kc, a);} catch (na) {}d = !0;}return d;} finally {C = c, pk.transition = b;}}return !1;}function Yk(a, b, c) {b = Ki(c, b);b = Oi(a, b, 1);a = dh(a, b, 1);b = L();null !== a && (Ac(a, 1, b), Ek(a, b));}
function W(a, b, c) {if (3 === a.tag) Yk(a, a, c);else for (; null !== b;) {if (3 === b.tag) {Yk(b, a, c);break;} else if (1 === b.tag) {var d = b.stateNode;if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Si || !Si.has(d))) {a = Ki(c, a);a = Ri(b, a, 1);b = dh(b, a, 1);a = L();null !== b && (Ac(b, 1, a), Ek(b, a));break;}}b = b["return"];}}
function Ui(a, b, c) {var d = a.pingCache;null !== d && d["delete"](b);b = L();a.pingedLanes |= a.suspendedLanes & c;R === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - gk ? Lk(a, 0) : sk |= c);Ek(a, b);}function Zk(a, b) {0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));var c = L();a = Zg(a, b);null !== a && (Ac(a, b, c), Ek(a, c));}function vj(a) {var b = a.memoizedState,c = 0;null !== b && (c = b.retryLane);Zk(a, c);}
function ck(a, b) {var c = 0;switch (a.tag) {case 13:var d = a.stateNode;var e = a.memoizedState;null !== e && (c = e.retryLane);break;case 19:d = a.stateNode;break;default:throw Error(p(314));}null !== d && d["delete"](b);Zk(a, c);}var Wk;
Wk = function Wk(a, b, c) {if (null !== a) {if (a.memoizedProps !== b.pendingProps || Wf.current) Ug = !0;else {if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return Ug = !1, zj(a, b, c);Ug = 0 !== (a.flags & 131072) ? !0 : !1;}} else Ug = !1, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);b.lanes = 0;switch (b.tag) {case 2:var d = b.type;jj(a, b);a = b.pendingProps;var e = Yf(b, H.current);Tg(b, c);e = Xh(null, b, d, a, e, c);var f = bi();b.flags |= 1;"object" === _typeof(e) && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue =
      null, Zf(d) ? (f = !0, cg(b)) : f = !1, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, ah(b), e.updater = nh, b.stateNode = e, e._reactInternals = b, rh(b, d, a, c), b = kj(null, b, d, !0, f, c)) : (b.tag = 0, I && f && vg(b), Yi(null, b, e, c), b = b.child);return b;case 16:d = b.elementType;a: {jj(a, b);a = b.pendingProps;e = d._init;d = e(d._payload);b.type = d;e = b.tag = $k(d);a = Lg(d, a);switch (e) {case 0:b = dj(null, b, d, a, c);break a;case 1:b = ij(null, b, d, a, c);break a;case 11:b = Zi(null, b, d, a, c);break a;case 14:b = aj(null, b, d, Lg(d.type, a), c);break a;}throw Error(p(306,
        d, ""));}return b;case 0:return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), dj(a, b, d, e, c);case 1:return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), ij(a, b, d, e, c);case 3:a: {lj(b);if (null === a) throw Error(p(387));d = b.pendingProps;f = b.memoizedState;e = f.element;bh(a, b);gh(b, d, null, c);var g = b.memoizedState;d = g.element;if (f.isDehydrated) {if (f = { element: d, isDehydrated: !1, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState =
          f, b.memoizedState = f, b.flags & 256) {e = Ki(Error(p(423)), b);b = mj(a, b, d, c, e);break a;} else if (d !== e) {e = Ki(Error(p(424)), b);b = mj(a, b, d, c, e);break a;} else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = !0, zg = null, c = Ch(b, null, d, c), b.child = c; c;) {c.flags = c.flags & -3 | 4096, c = c.sibling;}} else {Ig();if (d === e) {b = $i(a, b, c);break a;}Yi(a, b, d, c);}b = b.child;}return b;case 5:return Kh(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32),
      hj(a, b), Yi(a, b, g, c), b.child;case 6:return null === a && Eg(b), null;case 13:return pj(a, b, c);case 4:return Ih(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Bh(b, null, d, c) : Yi(a, b, d, c), b.child;case 11:return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), Zi(a, b, d, e, c);case 7:return Yi(a, b, b.pendingProps, c), b.child;case 8:return Yi(a, b, b.pendingProps.children, c), b.child;case 12:return Yi(a, b, b.pendingProps.children, c), b.child;case 10:a: {d = b.type._context;e = b.pendingProps;f = b.memoizedProps;
        g = e.value;G(Mg, d._currentValue);d._currentValue = g;if (null !== f) if (He(f.value, g)) {if (f.children === e.children && !Wf.current) {b = $i(a, b, c);break a;}} else for (f = b.child, null !== f && (f["return"] = b); null !== f;) {var h = f.dependencies;if (null !== h) {g = f.child;for (var k = h.firstContext; null !== k;) {if (k.context === d) {if (1 === f.tag) {k = ch(-1, c & -c);k.tag = 2;var l = f.updateQueue;if (null !== l) {l = l.shared;var m = l.pending;null === m ? k.next = k : (k.next = m.next, m.next = k);l.pending = k;}}f.lanes |= c;k = f.alternate;null !== k && (k.lanes |= c);Sg(f["return"],
                c, b);h.lanes |= c;break;}k = k.next;}} else if (10 === f.tag) g = f.type === b.type ? null : f.child;else if (18 === f.tag) {g = f["return"];if (null === g) throw Error(p(341));g.lanes |= c;h = g.alternate;null !== h && (h.lanes |= c);Sg(g, c, b);g = f.sibling;} else g = f.child;if (null !== g) g["return"] = f;else for (g = f; null !== g;) {if (g === b) {g = null;break;}f = g.sibling;if (null !== f) {f["return"] = g["return"];g = f;break;}g = g["return"];}f = g;}Yi(a, b, e.children, c);b = b.child;}return b;case 9:return e = b.type, d = b.pendingProps.children, Tg(b, c), e = Vg(e), d = d(e), b.flags |= 1, Yi(a, b, d, c),
      b.child;case 14:return d = b.type, e = Lg(d, b.pendingProps), e = Lg(d.type, e), aj(a, b, d, e, c);case 15:return cj(a, b, b.type, b.pendingProps, c);case 17:return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), jj(a, b), b.tag = 1, Zf(d) ? (a = !0, cg(b)) : a = !1, Tg(b, c), ph(b, d, e), rh(b, d, e, c), kj(null, b, d, !0, a, c);case 19:return yj(a, b, c);case 22:return ej(a, b, c);}throw Error(p(156, b.tag));};function Gk(a, b) {return ac(a, b);}
function al(a, b, c, d) {this.tag = a;this.key = c;this.sibling = this.child = this["return"] = this.stateNode = this.type = this.elementType = null;this.index = 0;this.ref = null;this.pendingProps = b;this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;this.mode = d;this.subtreeFlags = this.flags = 0;this.deletions = null;this.childLanes = this.lanes = 0;this.alternate = null;}function Bg(a, b, c, d) {return new al(a, b, c, d);}function bj(a) {a = a.prototype;return !(!a || !a.isReactComponent);}
function $k(a) {if ("function" === typeof a) return bj(a) ? 1 : 0;if (void 0 !== a && null !== a) {a = a.$$typeof;if (a === Da) return 11;if (a === Ga) return 14;}return 2;}
function wh(a, b) {var c = a.alternate;null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);c.flags = a.flags & 14680064;c.childLanes = a.childLanes;c.lanes = a.lanes;c.child = a.child;c.memoizedProps = a.memoizedProps;c.memoizedState = a.memoizedState;c.updateQueue = a.updateQueue;b = a.dependencies;c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c.sibling = a.sibling;c.index = a.index;c.ref = a.ref;return c;}
function yh(a, b, c, d, e, f) {var g = 2;d = a;if ("function" === typeof a) bj(a) && (g = 1);else if ("string" === typeof a) g = 5;else a: switch (a) {case ya:return Ah(c.children, e, f, b);case za:g = 8;e |= 8;break;case Aa:return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;case Ea:return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;case Fa:return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;case Ia:return qj(c, e, f, b);default:if ("object" === _typeof(a) && null !== a) switch (a.$$typeof) {case Ba:g = 10;break a;case Ca:g = 9;break a;case Da:g = 11;
          break a;case Ga:g = 14;break a;case Ha:g = 16;d = null;break a;}throw Error(p(130, null == a ? a : _typeof(a), ""));}b = Bg(g, c, b, e);b.elementType = a;b.type = d;b.lanes = f;return b;}function Ah(a, b, c, d) {a = Bg(7, a, d, b);a.lanes = c;return a;}function qj(a, b, c, d) {a = Bg(22, a, d, b);a.elementType = Ia;a.lanes = c;a.stateNode = { isHidden: !1 };return a;}function xh(a, b, c) {a = Bg(6, a, null, b);a.lanes = c;return a;}
function zh(a, b, c) {b = Bg(4, null !== a.children ? a.children : [], a.key, b);b.lanes = c;b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };return b;}
function bl(a, b, c, d, e) {this.tag = b;this.containerInfo = a;this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;this.timeoutHandle = -1;this.callbackNode = this.pendingContext = this.context = null;this.callbackPriority = 0;this.eventTimes = zc(0);this.expirationTimes = zc(-1);this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;this.entanglements = zc(0);this.identifierPrefix = d;this.onRecoverableError = e;this.mutableSourceEagerHydrationData =
  null;}function cl(a, b, c, d, e, f, g, h, k) {a = new bl(a, b, c, h, k);1 === b ? (b = 1, !0 === f && (b |= 8)) : b = 0;f = Bg(3, null, null, b);a.current = f;f.stateNode = a;f.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };ah(f);return a;}function dl(a, b, c) {var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };}
function el(a) {if (!a) return Vf;a = a._reactInternals;a: {if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));var b = a;do {switch (b.tag) {case 3:b = b.stateNode.context;break a;case 1:if (Zf(b.type)) {b = b.stateNode.__reactInternalMemoizedMergedChildContext;break a;}}b = b["return"];} while (null !== b);throw Error(p(171));}if (1 === a.tag) {var c = a.type;if (Zf(c)) return bg(a, c, b);}return b;}
function fl(a, b, c, d, e, f, g, h, k) {a = cl(c, d, !0, a, e, f, g, h, k);a.context = el(null);c = a.current;d = L();e = lh(c);f = ch(d, e);f.callback = void 0 !== b && null !== b ? b : null;dh(c, f, e);a.current.lanes = e;Ac(a, e, d);Ek(a, d);return a;}function gl(a, b, c, d) {var e = b.current,f = L(),g = lh(e);c = el(c);null === b.context ? b.context = c : b.pendingContext = c;b = ch(f, g);b.payload = { element: a };d = void 0 === d ? null : d;null !== d && (b.callback = d);a = dh(e, b, g);null !== a && (mh(a, e, g, f), eh(a, e, g));return g;}
function hl(a) {a = a.current;if (!a.child) return null;switch (a.child.tag) {case 5:return a.child.stateNode;default:return a.child.stateNode;}}function il(a, b) {a = a.memoizedState;if (null !== a && null !== a.dehydrated) {var c = a.retryLane;a.retryLane = 0 !== c && c < b ? c : b;}}function jl(a, b) {il(a, b);(a = a.alternate) && il(a, b);}function kl() {return null;}var ll = "function" === typeof reportError ? reportError : function (a) {console.error(a);};function ml(a) {this._internalRoot = a;}
nl.prototype.render = ml.prototype.render = function (a) {var b = this._internalRoot;if (null === b) throw Error(p(409));gl(a, b, null, null);};nl.prototype.unmount = ml.prototype.unmount = function () {var a = this._internalRoot;if (null !== a) {this._internalRoot = null;var b = a.containerInfo;Sk(function () {gl(null, a, null, null);});b[uf] = null;}};function nl(a) {this._internalRoot = a;}
nl.prototype.unstable_scheduleHydration = function (a) {if (a) {var b = Hc();a = { blockedOn: null, target: a, priority: b };for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) {;}Qc.splice(c, 0, a);0 === c && Vc(a);}};function ol(a) {return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);}function pl(a) {return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));}function ql() {}
function rl(a, b, c, d, e) {if (e) {if ("function" === typeof d) {var f = d;d = function d() {var a = hl(g);f.call(a);};}var g = fl(b, d, a, 0, null, !1, !1, "", ql);a._reactRootContainer = g;a[uf] = g.current;sf(8 === a.nodeType ? a.parentNode : a);Sk();return g;}for (; e = a.lastChild;) {a.removeChild(e);}if ("function" === typeof d) {var h = d;d = function d() {var a = hl(k);h.call(a);};}var k = cl(a, 0, !1, null, null, !1, !1, "", ql);a._reactRootContainer = k;a[uf] = k.current;sf(8 === a.nodeType ? a.parentNode : a);Sk(function () {gl(b, k, c, d);});return k;}
function sl(a, b, c, d, e) {var f = c._reactRootContainer;if (f) {var g = f;if ("function" === typeof e) {var h = e;e = function e() {var a = hl(g);h.call(a);};}gl(b, g, a, e);} else g = rl(c, b, a, e, d);return hl(g);}Ec = function Ec(a) {switch (a.tag) {case 3:var b = a.stateNode;if (b.current.memoizedState.isDehydrated) {var c = tc(b.pendingLanes);0 !== c && (Cc(b, c | 1), Ek(b, B()), 0 === (K & 6) && (Hj = B() + 500, jg()));}break;case 13:Sk(function () {var b = Zg(a, 1);if (null !== b) {var c = L();mh(b, a, 1, c);}}), jl(a, 1);}};
Fc = function Fc(a) {if (13 === a.tag) {var b = Zg(a, 134217728);if (null !== b) {var c = L();mh(b, a, 134217728, c);}jl(a, 134217728);}};Gc = function Gc(a) {if (13 === a.tag) {var b = lh(a),c = Zg(a, b);if (null !== c) {var d = L();mh(c, a, b, d);}jl(a, b);}};Hc = function Hc() {return C;};Ic = function Ic(a, b) {var c = C;try {return C = a, b();} finally {C = c;}};
yb = function yb(a, b, c) {switch (b) {case "input":bb(a, c);b = c.name;if ("radio" === c.type && null != b) {for (c = a; c.parentNode;) {c = c.parentNode;}c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');for (b = 0; b < c.length; b++) {var d = c[b];if (d !== a && d.form === a.form) {var e = Db(d);if (!e) throw Error(p(90));Wa(d);bb(d, e);}}}break;case "textarea":ib(a, c);break;case "select":b = c.value, null != b && fb(a, !!c.multiple, b, !1);}};Gb = Rk;Hb = Sk;
var tl = { usingClientEntryPoint: !1, Events: [Cb, ue, Db, Eb, Fb, Rk] },ul = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" };
var vl = { bundleType: ul.bundleType, version: ul.version, rendererPackageName: ul.rendererPackageName, rendererConfig: ul.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function findHostInstanceByFiber(a) {a = Zb(a);return null === a ? null : a.stateNode;}, findFiberByHostInstance: ul.findFiberByHostInstance ||
  kl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {var wl = __REACT_DEVTOOLS_GLOBAL_HOOK__;if (!wl.isDisabled && wl.supportsFiber) try {kc = wl.inject(vl), lc = wl;} catch (a) {}}__webpack_unused_export__ = tl;
__webpack_unused_export__ = function (a, b) {var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;if (!ol(b)) throw Error(p(200));return dl(a, b, null, c);};__webpack_unused_export__ = function (a, b) {if (!ol(a)) throw Error(p(299));var c = !1,d = "",e = ll;null !== b && void 0 !== b && (!0 === b.unstable_strictMode && (c = !0), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));b = cl(a, 1, !1, null, null, c, !1, d, e);a[uf] = b.current;sf(8 === a.nodeType ? a.parentNode : a);return new ml(b);};
__webpack_unused_export__ = function (a) {if (null == a) return null;if (1 === a.nodeType) return a;var b = a._reactInternals;if (void 0 === b) {if ("function" === typeof a.render) throw Error(p(188));a = Object.keys(a).join(",");throw Error(p(268, a));}a = Zb(b);a = null === a ? null : a.stateNode;return a;};__webpack_unused_export__ = function (a) {return Sk(a);};__webpack_unused_export__ = function (a, b, c) {if (!pl(b)) throw Error(p(200));return sl(null, a, b, !0, c);};
__webpack_unused_export__ = function (a, b, c) {if (!ol(a)) throw Error(p(405));var d = null != c && c.hydratedSources || null,e = !1,f = "",g = ll;null !== c && void 0 !== c && (!0 === c.unstable_strictMode && (e = !0), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));b = fl(b, null, a, 1, null != c ? c : null, e, !1, f, g);a[uf] = b.current;sf(a);if (d) for (a = 0; a < d.length; a++) {c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(c,
    e);}return new nl(b);};exports.render = function (a, b, c) {if (!pl(b)) throw Error(p(200));return sl(null, a, b, !1, c);};__webpack_unused_export__ = function (a) {if (!pl(a)) throw Error(p(40));return a._reactRootContainer ? (Sk(function () {sl(null, null, a, !1, function () {a._reactRootContainer = null;a[uf] = null;});}), !0) : !1;};__webpack_unused_export__ = Rk;
__webpack_unused_export__ = function (a, b, c, d) {if (!pl(c)) throw Error(p(200));if (null == a || void 0 === a._reactInternals) throw Error(p(38));return sl(a, b, c, !1, d);};__webpack_unused_export__ = "18.2.0-next-9e3b772b8-20220608";

/***/ }),

/***/ 770:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function')
  {
    return;
  }
  if (false) {}
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(604);
} else {}

/***/ }),

/***/ 592:
/***/ ((__unused_webpack_module, exports) => {

/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function _typeof(obj) {"@babel/helpers - typeof";return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {return typeof obj;} : function (obj) {return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}, _typeof(obj);}var l = Symbol["for"]("react.element"),n = Symbol["for"]("react.portal"),p = Symbol["for"]("react.fragment"),q = Symbol["for"]("react.strict_mode"),r = Symbol["for"]("react.profiler"),t = Symbol["for"]("react.provider"),u = Symbol["for"]("react.context"),v = Symbol["for"]("react.forward_ref"),w = Symbol["for"]("react.suspense"),x = Symbol["for"]("react.memo"),y = Symbol["for"]("react.lazy"),z = Symbol.iterator;function A(a) {if (null === a || "object" !== _typeof(a)) return null;a = z && a[z] || a["@@iterator"];return "function" === typeof a ? a : null;}
var B = { isMounted: function isMounted() {return !1;}, enqueueForceUpdate: function enqueueForceUpdate() {}, enqueueReplaceState: function enqueueReplaceState() {}, enqueueSetState: function enqueueSetState() {} },C = Object.assign,D = {};function E(a, b, e) {this.props = a;this.context = b;this.refs = D;this.updater = e || B;}E.prototype.isReactComponent = {};
E.prototype.setState = function (a, b) {if ("object" !== _typeof(a) && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this, a, b, "setState");};E.prototype.forceUpdate = function (a) {this.updater.enqueueForceUpdate(this, a, "forceUpdate");};function F() {}F.prototype = E.prototype;function G(a, b, e) {this.props = a;this.context = b;this.refs = D;this.updater = e || B;}var H = G.prototype = new F();
H.constructor = G;C(H, E.prototype);H.isPureReactComponent = !0;var I = Array.isArray,J = Object.prototype.hasOwnProperty,K = { current: null },L = { key: !0, ref: !0, __self: !0, __source: !0 };
function M(a, b, e) {var d,c = {},k = null,h = null;if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) {J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);}var g = arguments.length - 2;if (1 === g) c.children = e;else if (1 < g) {for (var f = Array(g), m = 0; m < g; m++) {f[m] = arguments[m + 2];}c.children = f;}if (a && a.defaultProps) for (d in g = a.defaultProps, g) {void 0 === c[d] && (c[d] = g[d]);}return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };}
function N(a, b) {return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };}function O(a) {return "object" === _typeof(a) && null !== a && a.$$typeof === l;}function escape(a) {var b = { "=": "=0", ":": "=2" };return "$" + a.replace(/[=:]/g, function (a) {return b[a];});}var P = /\/+/g;function Q(a, b) {return "object" === _typeof(a) && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);}
function R(a, b, e, d, c) {var k = _typeof(a);if ("undefined" === k || "boolean" === k) a = null;var h = !1;if (null === a) h = !0;else switch (k) {case "string":case "number":h = !0;break;case "object":switch (a.$$typeof) {case l:case n:h = !0;}}if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function (a) {return a;})) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;h = 0;d = "" === d ? "." : d + ":";if (I(a)) for (var g = 0; g < a.length; g++) {k =
    a[g];var f = d + Q(k, g);h += R(k, b, e, f, c);} else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done;) {k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);} else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");return h;}
function S(a, b, e) {if (null == a) return a;var d = [],c = 0;R(a, d, "", "", function (a) {return b.call(e, a, c++);});return d;}function T(a) {if (-1 === a._status) {var b = a._result;b = b();b.then(function (b) {if (0 === a._status || -1 === a._status) a._status = 1, a._result = b;}, function (b) {if (0 === a._status || -1 === a._status) a._status = 2, a._result = b;});-1 === a._status && (a._status = 0, a._result = b);}if (1 === a._status) return a._result["default"];throw a._result;}
var U = { current: null },V = { transition: null },W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };exports.Children = { map: S, forEach: function forEach(a, b, e) {S(a, function () {b.apply(this, arguments);}, e);}, count: function count(a) {var b = 0;S(a, function () {b++;});return b;}, toArray: function toArray(a) {return S(a, function (a) {return a;}) || [];}, only: function only(a) {if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");return a;} };exports.Component = E;exports.Fragment = p;
exports.Profiler = r;exports.PureComponent = G;exports.StrictMode = q;exports.Suspense = w;exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
exports.cloneElement = function (a, b, e) {if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");var d = C({}, a.props),c = a.key,k = a.ref,h = a._owner;if (null != b) {void 0 !== b.ref && (k = b.ref, h = K.current);void 0 !== b.key && (c = "" + b.key);if (a.type && a.type.defaultProps) var g = a.type.defaultProps;for (f in b) {J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);}}var f = arguments.length - 2;if (1 === f) d.children = e;else if (1 < f) {g = Array(f);
    for (var m = 0; m < f; m++) {g[m] = arguments[m + 2];}d.children = g;}return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };};exports.createContext = function (a) {a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };a.Provider = { $$typeof: t, _context: a };return a.Consumer = a;};exports.createElement = M;exports.createFactory = function (a) {var b = M.bind(null, a);b.type = a;return b;};exports.createRef = function () {return { current: null };};
exports.forwardRef = function (a) {return { $$typeof: v, render: a };};exports.isValidElement = O;exports.lazy = function (a) {return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };};exports.memo = function (a, b) {return { $$typeof: x, type: a, compare: void 0 === b ? null : b };};exports.startTransition = function (a) {var b = V.transition;V.transition = {};try {a();} finally {V.transition = b;}};exports.unstable_act = function () {throw Error("act(...) is not supported in production builds of React.");};
exports.useCallback = function (a, b) {return U.current.useCallback(a, b);};exports.useContext = function (a) {return U.current.useContext(a);};exports.useDebugValue = function () {};exports.useDeferredValue = function (a) {return U.current.useDeferredValue(a);};exports.useEffect = function (a, b) {return U.current.useEffect(a, b);};exports.useId = function () {return U.current.useId();};exports.useImperativeHandle = function (a, b, e) {return U.current.useImperativeHandle(a, b, e);};
exports.useInsertionEffect = function (a, b) {return U.current.useInsertionEffect(a, b);};exports.useLayoutEffect = function (a, b) {return U.current.useLayoutEffect(a, b);};exports.useMemo = function (a, b) {return U.current.useMemo(a, b);};exports.useReducer = function (a, b, e) {return U.current.useReducer(a, b, e);};exports.useRef = function (a) {return U.current.useRef(a);};exports.useState = function (a) {return U.current.useState(a);};exports.useSyncExternalStore = function (a, b, e) {return U.current.useSyncExternalStore(a, b, e);};
exports.useTransition = function () {return U.current.useTransition();};exports.version = "18.2.0";

/***/ }),

/***/ 966:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (true) {
  module.exports = __webpack_require__(592);
} else {}

/***/ }),

/***/ 118:
/***/ ((__unused_webpack_module, exports) => {

/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function _typeof(obj) {"@babel/helpers - typeof";return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {return typeof obj;} : function (obj) {return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}, _typeof(obj);}function f(a, b) {var c = a.length;a.push(b);a: for (; 0 < c;) {var d = c - 1 >>> 1,e = a[d];if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;else break a;}}function h(a) {return 0 === a.length ? null : a[0];}function k(a) {if (0 === a.length) return null;var b = a[0],c = a.pop();if (c !== b) {a[0] = c;a: for (var d = 0, e = a.length, w = e >>> 1; d < w;) {var m = 2 * (d + 1) - 1,C = a[m],n = m + 1,x = a[n];if (0 > g(C, c)) n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);else if (n < e && 0 > g(x, c)) a[d] = x, a[n] = c, d = n;else break a;}}return b;}
function g(a, b) {var c = a.sortIndex - b.sortIndex;return 0 !== c ? c : a.id - b.id;}if ("object" === (typeof performance === "undefined" ? "undefined" : _typeof(performance)) && "function" === typeof performance.now) {var l = performance;exports.unstable_now = function () {return l.now();};} else {var p = Date,q = p.now();exports.unstable_now = function () {return p.now() - q;};}var r = [],t = [],u = 1,v = null,y = 3,z = !1,A = !1,B = !1,D = "function" === typeof setTimeout ? setTimeout : null,E = "function" === typeof clearTimeout ? clearTimeout : null,F = "undefined" !== typeof setImmediate ? setImmediate : null;
"undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);function G(a) {for (var b = h(t); null !== b;) {if (null === b.callback) k(t);else if (b.startTime <= a) k(t), b.sortIndex = b.expirationTime, f(r, b);else break;b = h(t);}}function H(a) {B = !1;G(a);if (!A) if (null !== h(r)) A = !0, I(J);else {var b = h(t);null !== b && K(H, b.startTime - a);}}
function J(a, b) {A = !1;B && (B = !1, E(L), L = -1);z = !0;var c = y;try {G(b);for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M());) {var d = v.callback;if ("function" === typeof d) {v.callback = null;y = v.priorityLevel;var e = d(v.expirationTime <= b);b = exports.unstable_now();"function" === typeof e ? v.callback = e : v === h(r) && k(r);G(b);} else k(r);v = h(r);}if (null !== v) var w = !0;else {var m = h(t);null !== m && K(H, m.startTime - b);w = !1;}return w;} finally {v = null, y = c, z = !1;}}var N = !1,O = null,L = -1,P = 5,Q = -1;
function M() {return exports.unstable_now() - Q < P ? !1 : !0;}function R() {if (null !== O) {var a = exports.unstable_now();Q = a;var b = !0;try {b = O(!0, a);} finally {b ? S() : (N = !1, O = null);}} else N = !1;}var S;if ("function" === typeof F) S = function S() {F(R);};else if ("undefined" !== typeof MessageChannel) {var T = new MessageChannel(),U = T.port2;T.port1.onmessage = R;S = function S() {U.postMessage(null);};} else S = function S() {D(R, 0);};function I(a) {O = a;N || (N = !0, S());}function K(a, b) {L = D(function () {a(exports.unstable_now());}, b);}
exports.unstable_IdlePriority = 5;exports.unstable_ImmediatePriority = 1;exports.unstable_LowPriority = 4;exports.unstable_NormalPriority = 3;exports.unstable_Profiling = null;exports.unstable_UserBlockingPriority = 2;exports.unstable_cancelCallback = function (a) {a.callback = null;};exports.unstable_continueExecution = function () {A || z || (A = !0, I(J));};
exports.unstable_forceFrameRate = function (a) {0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1E3 / a) : 5;};exports.unstable_getCurrentPriorityLevel = function () {return y;};exports.unstable_getFirstCallbackNode = function () {return h(r);};exports.unstable_next = function (a) {switch (y) {case 1:case 2:case 3:var b = 3;break;default:b = y;}var c = y;y = b;try {return a();} finally {y = c;}};exports.unstable_pauseExecution = function () {};
exports.unstable_requestPaint = function () {};exports.unstable_runWithPriority = function (a, b) {switch (a) {case 1:case 2:case 3:case 4:case 5:break;default:a = 3;}var c = y;y = a;try {return b();} finally {y = c;}};
exports.unstable_scheduleCallback = function (a, b, c) {var d = exports.unstable_now();"object" === _typeof(c) && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;switch (a) {case 1:var e = -1;break;case 2:e = 250;break;case 5:e = 1073741823;break;case 4:e = 1E4;break;default:e = 5E3;}e = c + e;a = { id: u++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };c > d ? (a.sortIndex = c, f(t, a), null === h(r) && a === h(t) && (B ? (E(L), L = -1) : B = !0, K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z || (A = !0, I(J)));return a;};
exports.unstable_shouldYield = M;exports.unstable_wrapCallback = function (a) {var b = y;return function () {var c = y;y = b;try {return a.apply(this, arguments);} finally {y = c;}};};

/***/ }),

/***/ 731:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



if (true) {
  module.exports = __webpack_require__(118);
} else {}

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
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
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
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(770);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(966);
var react_namespaceObject = /*#__PURE__*/__webpack_require__.t(react, 2);
;// CONCATENATED MODULE: ./node_modules/@remix-run/router/dist/router.js
function _createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e2) {throw _e2;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e3) {didErr = true;err = _e3;}, f: function f() {try {if (!normalCompletion && it["return"] != null) it["return"]();} finally {if (didErr) throw err;}} };}function _regeneratorRuntime() {"use strict";
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */_regeneratorRuntime = function _regeneratorRuntime() {return exports;};var exports = {},Op = Object.prototype,hasOwn = Op.hasOwnProperty,defineProperty = Object.defineProperty || function (obj, key, desc) {obj[key] = desc.value;},$Symbol = "function" == typeof Symbol ? Symbol : {},iteratorSymbol = $Symbol.iterator || "@@iterator",asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";function define(obj, key, value) {return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key];}try {define({}, "");} catch (err) {define = function define(obj, key, value) {return obj[key] = value;};}function wrap(innerFn, outerFn, self, tryLocsList) {var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,generator = Object.create(protoGenerator.prototype),context = new Context(tryLocsList || []);return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator;}function tryCatch(fn, obj, arg) {try {return { type: "normal", arg: fn.call(obj, arg) };} catch (err) {return { type: "throw", arg: err };}}exports.wrap = wrap;var ContinueSentinel = {};function Generator() {}function GeneratorFunction() {}function GeneratorFunctionPrototype() {}var IteratorPrototype = {};define(IteratorPrototype, iteratorSymbol, function () {return this;});var getProto = Object.getPrototypeOf,NativeIteratorPrototype = getProto && getProto(getProto(values([])));NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);function defineIteratorMethods(prototype) {["next", "throw", "return"].forEach(function (method) {define(prototype, method, function (arg) {return this._invoke(method, arg);});});}function AsyncIterator(generator, PromiseImpl) {function invoke(method, arg, resolve, reject) {var record = tryCatch(generator[method], generator, arg);if ("throw" !== record.type) {var result = record.arg,value = result.value;return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {invoke("next", value, resolve, reject);}, function (err) {invoke("throw", err, resolve, reject);}) : PromiseImpl.resolve(value).then(function (unwrapped) {result.value = unwrapped, resolve(result);}, function (error) {return invoke("throw", error, resolve, reject);});}reject(record.arg);}var previousPromise;defineProperty(this, "_invoke", { value: function value(method, arg) {function callInvokeWithMethodAndArg() {return new PromiseImpl(function (resolve, reject) {invoke(method, arg, resolve, reject);});}return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();} });}function makeInvokeMethod(innerFn, self, context) {var state = "suspendedStart";return function (method, arg) {if ("executing" === state) throw new Error("Generator is already running");if ("completed" === state) {if ("throw" === method) throw arg;return doneResult();}for (context.method = method, context.arg = arg;;) {var delegate = context.delegate;if (delegate) {var delegateResult = maybeInvokeDelegate(delegate, context);if (delegateResult) {if (delegateResult === ContinueSentinel) continue;return delegateResult;}}if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {if ("suspendedStart" === state) throw state = "completed", context.arg;context.dispatchException(context.arg);} else "return" === context.method && context.abrupt("return", context.arg);state = "executing";var record = tryCatch(innerFn, self, context);if ("normal" === record.type) {if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;return { value: record.arg, done: context.done };}"throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);}};}function maybeInvokeDelegate(delegate, context) {var method = delegate.iterator[context.method];if (undefined === method) {if (context.delegate = null, "throw" === context.method) {if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");}return ContinueSentinel;}var record = tryCatch(method, delegate.iterator, context.arg);if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;var info = record.arg;return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);}function pushTryEntry(locs) {var entry = { tryLoc: locs[0] };1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);}function resetTryEntry(entry) {var record = entry.completion || {};record.type = "normal", delete record.arg, entry.completion = record;}function Context(tryLocsList) {this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);}function values(iterable) {if (iterable) {var iteratorMethod = iterable[iteratorSymbol];if (iteratorMethod) return iteratorMethod.call(iterable);if ("function" == typeof iterable.next) return iterable;if (!isNaN(iterable.length)) {var i = -1,next = function next() {for (; ++i < iterable.length;) {if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;}return next.value = undefined, next.done = !0, next;};return next.next = next;}}return { next: doneResult };}function doneResult() {return { value: undefined, done: !0 };}return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {var ctor = "function" == typeof genFun && genFun.constructor;return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));}, exports.mark = function (genFun) {return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;}, exports.awrap = function (arg) {return { __await: arg };}, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {return this;}), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {void 0 === PromiseImpl && (PromiseImpl = Promise);var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {return result.done ? result.value : iter.next();});}, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {return this;}), define(Gp, "toString", function () {return "[object Generator]";}), exports.keys = function (val) {var object = Object(val),keys = [];for (var key in object) {keys.push(key);}return keys.reverse(), function next() {for (; keys.length;) {var key = keys.pop();if (key in object) return next.value = key, next.done = !1, next;}return next.done = !0, next;};}, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) {if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {"t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);}}, stop: function stop() {this.done = !0;var rootRecord = this.tryEntries[0].completion;if ("throw" === rootRecord.type) throw rootRecord.arg;return this.rval;}, dispatchException: function dispatchException(exception) {if (this.done) throw exception;var context = this;function handle(loc, caught) {return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;}for (var i = this.tryEntries.length - 1; i >= 0; --i) {var entry = this.tryEntries[i],record = entry.completion;if ("root" === entry.tryLoc) return handle("end");if (entry.tryLoc <= this.prev) {var hasCatch = hasOwn.call(entry, "catchLoc"),hasFinally = hasOwn.call(entry, "finallyLoc");if (hasCatch && hasFinally) {if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);} else if (hasCatch) {if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);} else {if (!hasFinally) throw new Error("try statement without catch or finally");if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);}}}}, abrupt: function abrupt(type, arg) {for (var i = this.tryEntries.length - 1; i >= 0; --i) {var entry = this.tryEntries[i];if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {var finallyEntry = entry;break;}}finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);var record = finallyEntry ? finallyEntry.completion : {};return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);}, complete: function complete(record, afterLoc) {if ("throw" === record.type) throw record.arg;return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;}, finish: function finish(finallyLoc) {for (var i = this.tryEntries.length - 1; i >= 0; --i) {var entry = this.tryEntries[i];if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;}}, "catch": function _catch(tryLoc) {for (var i = this.tryEntries.length - 1; i >= 0; --i) {var entry = this.tryEntries[i];if (entry.tryLoc === tryLoc) {var record = entry.completion;if ("throw" === record.type) {var thrown = record.arg;resetTryEntry(entry);}return thrown;}}throw new Error("illegal catch attempt");}, delegateYield: function delegateYield(iterable, resultName, nextLoc) {return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel;} }, exports;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _typeof(obj) {"@babel/helpers - typeof";return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {return typeof obj;} : function (obj) {return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}, _typeof(obj);}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (_typeof(call) === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct.bind();} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];if (_i == null) return;var _arr = [];var _n = true;var _d = false;var _s, _e;try {for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;} /**
* @remix-run/router v1.0.3
*
* Copyright (c) Remix Software Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE.md file in the root directory of this source tree.
*
* @license MIT
*/function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

////////////////////////////////////////////////////////////////////////////////
//#region Types and Constants
////////////////////////////////////////////////////////////////////////////////

/**
 * Actions represent the type of change to a location value.
 */
var Action;

(function (Action) {
  /**
   * A POP indicates a change to an arbitrary index in the history stack, such
   * as a back or forward navigation. It does not describe the direction of the
   * navigation, only that the current index changed.
   *
   * Note: This is the default action for newly created history objects.
   */
  Action["Pop"] = "POP";
  /**
   * A PUSH indicates a new entry being added to the history stack, such as when
   * a link is clicked and a new page loads. When this happens, all subsequent
   * entries in the stack are lost.
   */

  Action["Push"] = "PUSH";
  /**
   * A REPLACE indicates the entry at the current index in the history stack
   * being replaced by a new one.
   */

  Action["Replace"] = "REPLACE";
})(Action || (Action = {}));

var PopStateEventType = "popstate";
/**
 * Memory history stores the current location in memory. It is designed for use
 * in stateful non-browser environments like tests and React Native.
 */

function router_createMemoryHistory(options) {
  if (options === void 0) {
    options = {};
  }

  var _options =



    options,_options$initialEntri = _options.initialEntries,initialEntries = _options$initialEntri === void 0 ? ["/"] : _options$initialEntri,initialIndex = _options.initialIndex,_options$v5Compat = _options.v5Compat,v5Compat = _options$v5Compat === void 0 ? false : _options$v5Compat;
  var entries; // Declare so we can access from createMemoryLocation

  entries = initialEntries.map(function (entry, index) {return createMemoryLocation(entry, typeof entry === "string" ? null : entry.state, index === 0 ? "default" : undefined);});
  var index = clampIndex(initialIndex == null ? entries.length - 1 : initialIndex);
  var action = Action.Pop;
  var listener = null;

  function clampIndex(n) {
    return Math.min(Math.max(n, 0), entries.length - 1);
  }

  function getCurrentLocation() {
    return entries[index];
  }

  function createMemoryLocation(to, state, key) {
    if (state === void 0) {
      state = null;
    }

    var location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
    warning$1(location.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(to));
    return location;
  }

  var history = {
    get index() {
      return index;
    },

    get action() {
      return action;
    },

    get location() {
      return getCurrentLocation();
    },

    createHref: function createHref(to) {
      return typeof to === "string" ? to : router_createPath(to);
    },

    encodeLocation: function encodeLocation(location) {
      return location;
    },

    push: function push(to, state) {
      action = Action.Push;
      var nextLocation = createMemoryLocation(to, state);
      index += 1;
      entries.splice(index, entries.length, nextLocation);

      if (v5Compat && listener) {
        listener({
          action: action,
          location: nextLocation
        });
      }
    },

    replace: function replace(to, state) {
      action = Action.Replace;
      var nextLocation = createMemoryLocation(to, state);
      entries[index] = nextLocation;

      if (v5Compat && listener) {
        listener({
          action: action,
          location: nextLocation
        });
      }
    },

    go: function go(delta) {
      action = Action.Pop;
      index = clampIndex(index + delta);

      if (listener) {
        listener({
          action: action,
          location: getCurrentLocation()
        });
      }
    },

    listen: function listen(fn) {
      listener = fn;
      return function () {
        listener = null;
      };
    }

  };
  return history;
}
/**
 * Browser history stores the location in regular URLs. This is the standard for
 * most web apps, but it requires some configuration on the server to ensure you
 * serve the same app at multiple URLs.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createbrowserhistory
 */

function router_createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }

  function createBrowserLocation(window, globalHistory) {
    var _window$location =



      window.location,pathname = _window$location.pathname,search = _window$location.search,hash = _window$location.hash;
    return createLocation("", {
      pathname: pathname,
      search: search,
      hash: hash
    }, // state defaults to `null` because `window.history.state` does
    globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
  }

  function createBrowserHref(window, to) {
    return typeof to === "string" ? to : router_createPath(to);
  }

  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
/**
 * Hash history stores the location in window.location.hash. This makes it ideal
 * for situations where you don't want to send the location to the server for
 * some reason, either because you do cannot configure it or the URL space is
 * reserved for something else.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createhashhistory
 */

function router_createHashHistory(options) {
  if (options === void 0) {
    options = {};
  }

  function createHashLocation(window, globalHistory) {
    var _parsePath =



      parsePath(window.location.hash.substr(1)),_parsePath$pathname = _parsePath.pathname,pathname = _parsePath$pathname === void 0 ? "/" : _parsePath$pathname,_parsePath$search = _parsePath.search,search = _parsePath$search === void 0 ? "" : _parsePath$search,_parsePath$hash = _parsePath.hash,hash = _parsePath$hash === void 0 ? "" : _parsePath$hash;
    return createLocation("", {
      pathname: pathname,
      search: search,
      hash: hash
    }, // state defaults to `null` because `window.history.state` does
    globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
  }

  function createHashHref(window, to) {
    var base = window.document.querySelector("base");
    var href = "";

    if (base && base.getAttribute("href")) {
      var url = window.location.href;
      var hashIndex = url.indexOf("#");
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }

    return href + "#" + (typeof to === "string" ? to : router_createPath(to));
  }

  function validateHashLocation(location, to) {
    warning$1(location.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
  }

  return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
} //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region UTILS
////////////////////////////////////////////////////////////////////////////////

function warning$1(cond, message) {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== "undefined") console.warn(message);

    try {
      // Welcome to debugging history!
      //
      // This error is thrown as a convenience so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message); // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
/**
 * For browser-based histories, we combine the state and key into an object
 */


function getHistoryState(location) {
  return {
    usr: location.state,
    key: location.key
  };
}
/**
 * Creates a Location object with a unique key from the given Path
 */


function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null;
  }

  var location = _extends({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state: state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  });

  return location;
}
/**
 * Creates a string URL path from the given pathname, search, and hash components.
 */

function router_createPath(_ref) {
  var _ref$pathname =



    _ref.pathname,pathname = _ref$pathname === void 0 ? "/" : _ref$pathname,_ref$search = _ref.search,search = _ref$search === void 0 ? "" : _ref$search,_ref$hash = _ref.hash,hash = _ref$hash === void 0 ? "" : _ref$hash;
  if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
/**
 * Parses a string URL path into its separate pathname, search, and hash components.
 */

function parsePath(path) {
  var parsedPath = {};

  if (path) {
    var hashIndex = path.indexOf("#");

    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }

    var searchIndex = path.indexOf("?");

    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }

    if (path) {
      parsedPath.pathname = path;
    }
  }

  return parsedPath;
}
function createURL(location) {
  // window.location.origin is "null" (the literal string value) in Firefox
  // under certain conditions, notably when serving from a local HTML file
  // See https://bugzilla.mozilla.org/show_bug.cgi?id=878297
  var base = typeof window !== "undefined" && typeof window.location !== "undefined" && window.location.origin !== "null" ? window.location.origin : "unknown://unknown";
  var href = typeof location === "string" ? location : router_createPath(location);
  return new URL(href, base);
}

function getUrlBasedHistory(getLocation, _createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }

  var _options2 =


    options,_options2$window = _options2.window,window = _options2$window === void 0 ? document.defaultView : _options2$window,_options2$v5Compat = _options2.v5Compat,v5Compat = _options2$v5Compat === void 0 ? false : _options2$v5Compat;
  var globalHistory = window.history;
  var action = Action.Pop;
  var listener = null;

  function handlePop() {
    action = Action.Pop;

    if (listener) {
      listener({
        action: action,
        location: history.location
      });
    }
  }

  function push(to, state) {
    action = Action.Push;
    var location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    var historyState = getHistoryState(location);
    var url = history.createHref(location); // try...catch because iOS limits us to 100 pushState calls :/

    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      // They are going to lose state here, but there is no real
      // way to warn them about it since the page will refresh...
      window.location.assign(url);
    }

    if (v5Compat && listener) {
      listener({
        action: action,
        location: history.location
      });
    }
  }

  function replace(to, state) {
    action = Action.Replace;
    var location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    var historyState = getHistoryState(location);
    var url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);

    if (v5Compat && listener) {
      listener({
        action: action,
        location: history.location
      });
    }
  }

  var history = {
    get action() {
      return action;
    },

    get location() {
      return getLocation(window, globalHistory);
    },

    listen: function listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }

      window.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return function () {
        window.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },

    createHref: function createHref(to) {
      return _createHref(window, to);
    },

    encodeLocation: function encodeLocation(location) {
      // Encode a Location the same way window.location would
      var url = createURL(router_createPath(location));
      return _extends({}, location, {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      });
    },

    push: push,
    replace: replace,

    go: function go(n) {
      return globalHistory.go(n);
    }

  };
  return history;
} //#endregion

var ResultType;

(function (ResultType) {
  ResultType["data"] = "data";
  ResultType["deferred"] = "deferred";
  ResultType["redirect"] = "redirect";
  ResultType["error"] = "error";
})(ResultType || (ResultType = {}));

function isIndexRoute(route) {
  return route.index === true;
} // Walk the route tree generating unique IDs where necessary so we are working
// solely with AgnosticDataRouteObject's within the Router


function convertRoutesToDataRoutes(routes, parentPath, allIds) {
  if (parentPath === void 0) {
    parentPath = [];
  }

  if (allIds === void 0) {
    allIds = new Set();
  }

  return routes.map(function (route, index) {
    var treePath = [].concat(_toConsumableArray(parentPath), [index]);
    var id = typeof route.id === "string" ? route.id : treePath.join("-");
    router_invariant(route.index !== true || !route.children, "Cannot specify children on an index route");
    router_invariant(!allIds.has(id), "Found a route id collision on id \"" + id + "\".  Route " + "id's must be globally unique within Data Router usages");
    allIds.add(id);

    if (isIndexRoute(route)) {
      var indexRoute = _extends({}, route, {
        id: id
      });

      return indexRoute;
    } else {
      var pathOrLayoutRoute = _extends({}, route, {
        id: id,
        children: route.children ? convertRoutesToDataRoutes(route.children, treePath, allIds) : undefined
      });

      return pathOrLayoutRoute;
    }
  });
}
/**
 * Matches the given routes to a location and returns the match data.
 *
 * @see https://reactrouter.com/docs/en/v6/utils/match-routes
 */

function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }

  var location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  var pathname = stripBasename(location.pathname || "/", basename);

  if (pathname == null) {
    return null;
  }

  var branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  var matches = null;

  for (var i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(branches[i], // Incoming pathnames are generally encoded from either window.location
    // or from router.navigate, but we want to match against the unencoded
    // paths in the route definitions.  Memory router locations won't be
    // encoded here but there also shouldn't be anything to decode so this
    // should be a safe operation.  This avoids needing matchRoutes to be
    // history-aware.
    safelyDecodeURI(pathname));
  }

  return matches;
}

function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }

  if (parentsMeta === void 0) {
    parentsMeta = [];
  }

  if (parentPath === void 0) {
    parentPath = "";
  }

  routes.forEach(function (route, index) {
    var meta = {
      relativePath: route.path || "",
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route: route
    };

    if (meta.relativePath.startsWith("/")) {
      router_invariant(meta.relativePath.startsWith(parentPath), "Absolute route path \"" + meta.relativePath + "\" nested under path " + ("\"" + parentPath + "\" is not valid. An absolute child route path ") + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }

    var path = router_joinPaths([parentPath, meta.relativePath]);
    var routesMeta = parentsMeta.concat(meta); // Add the children before adding this route to the array so we traverse the
    // route tree depth-first and child routes appear before their parents in
    // the "flattened" version.

    if (route.children && route.children.length > 0) {
      router_invariant( // Our types know better, but runtime JS may not!
      // @ts-expect-error
      route.index !== true, "Index routes must not have child routes. Please remove " + ("all child routes from route path \"" + path + "\"."));
      flattenRoutes(route.children, branches, routesMeta, path);
    } // Routes without a path shouldn't ever match by themselves unless they are
    // index routes, so don't add them to the list of possible branches.


    if (route.path == null && !route.index) {
      return;
    }

    branches.push({
      path: path,
      score: computeScore(path, route.index),
      routesMeta: routesMeta
    });
  });
  return branches;
}

function rankRouteBranches(branches) {
  branches.sort(function (a, b) {return a.score !== b.score ? b.score - a.score // Higher score first
    : compareIndexes(a.routesMeta.map(function (meta) {return meta.childrenIndex;}), b.routesMeta.map(function (meta) {return meta.childrenIndex;}));});
}

var paramRe = /^:\w+$/;
var dynamicSegmentValue = 3;
var indexRouteValue = 2;
var emptySegmentValue = 1;
var staticSegmentValue = 10;
var splatPenalty = -2;

var isSplat = function isSplat(s) {return s === "*";};

function computeScore(path, index) {
  var segments = path.split("/");
  var initialScore = segments.length;

  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }

  if (index) {
    initialScore += indexRouteValue;
  }

  return segments.filter(function (s) {return !isSplat(s);}).reduce(function (score, segment) {return score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue);}, initialScore);
}

function compareIndexes(a, b) {
  var siblings = a.length === b.length && a.slice(0, -1).every(function (n, i) {return n === b[i];});
  return siblings ? // If two routes are siblings, we should try to match the earlier sibling
  // first. This allows people to have fine-grained control over the matching
  // behavior by simply putting routes with identical paths in the order they
  // want them tried.
  a[a.length - 1] - b[b.length - 1] : // Otherwise, it doesn't really make sense to rank non-siblings by index,
  // so they sort equally.
  0;
}

function matchRouteBranch(branch, pathname) {
  var
  routesMeta =
  branch.routesMeta;
  var matchedParams = {};
  var matchedPathname = "/";
  var matches = [];

  for (var i = 0; i < routesMeta.length; ++i) {
    var meta = routesMeta[i];
    var end = i === routesMeta.length - 1;
    var remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    var match = router_matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end: end
    }, remainingPathname);
    if (!match) return null;
    Object.assign(matchedParams, match.params);
    var route = meta.route;
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: router_joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(router_joinPaths([matchedPathname, match.pathnameBase])),
      route: route
    });

    if (match.pathnameBase !== "/") {
      matchedPathname = router_joinPaths([matchedPathname, match.pathnameBase]);
    }
  }

  return matches;
}
/**
 * Returns a path with params interpolated.
 *
 * @see https://reactrouter.com/docs/en/v6/utils/generate-path
 */


function generatePath(path, params) {
  if (params === void 0) {
    params = {};
  }

  return path.replace(/:(\w+)/g, function (_, key) {
    router_invariant(params[key] != null, "Missing \":" + key + "\" param");
    return params[key];
  }).replace(/(\/?)\*/, function (_, prefix, __, str) {
    var star = "*";

    if (params[star] == null) {
      // If no splat was provided, trim the trailing slash _unless_ it's
      // the entire path
      return str === "/*" ? "/" : "";
    } // Apply the splat


    return "" + prefix + params[star];
  });
}
/**
 * Performs pattern matching on a URL pathname and returns information about
 * the match.
 *
 * @see https://reactrouter.com/docs/en/v6/utils/match-path
 */

function router_matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }

  var _compilePath = compilePath(pattern.path, pattern.caseSensitive, pattern.end),_compilePath2 = _slicedToArray(_compilePath, 2),matcher = _compilePath2[0],paramNames = _compilePath2[1];
  var match = pathname.match(matcher);
  if (!match) return null;
  var matchedPathname = match[0];
  var pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  var captureGroups = match.slice(1);
  var params = paramNames.reduce(function (memo, paramName, index) {
    // We need to compute the pathnameBase here using the raw splat value
    // instead of using params["*"] later because it will be decoded then
    if (paramName === "*") {
      var splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }

    memo[paramName] = safelyDecodeURIComponent(captureGroups[index] || "", paramName);
    return memo;
  }, {});
  return {
    params: params,
    pathname: matchedPathname,
    pathnameBase: pathnameBase,
    pattern: pattern
  };
}

function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }

  if (end === void 0) {
    end = true;
  }

  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), "Route path \"" + path + "\" will be treated as if it were " + ("\"" + path.replace(/\*$/, "/*") + "\" because the `*` character must ") + "always follow a `/` in the pattern. To get rid of this warning, " + ("please change the route path to \"" + path.replace(/\*$/, "/*") + "\"."));
  var paramNames = [];
  var regexpSource = "^" + path.replace(/\/*\*?$/, "") // Ignore trailing / and /*, we'll handle it below
  .replace(/^\/*/, "/") // Make sure it has a leading /
  .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&") // Escape special regex chars
  .replace(/:(\w+)/g, function (_, paramName) {
    paramNames.push(paramName);
    return "([^\\/]+)";
  });

  if (path.endsWith("*")) {
    paramNames.push("*");
    regexpSource += path === "*" || path === "/*" ? "(.*)$" // Already matched the initial /, just match the rest
    : "(?:\\/(.+)|\\/*)$"; // Don't include the / in params["*"]
  } else if (end) {
    // When matching to the end, ignore trailing slashes
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    // If our path is non-empty and contains anything beyond an initial slash,
    // then we have _some_ form of path in our regex so we should expect to
    // match only if we find the end of this path segment.  Look for an optional
    // non-captured trailing slash (to match a portion of the URL) or the end
    // of the path (if we've matched to the end).  We used to do this with a
    // word boundary but that gives false positives on routes like
    // /user-preferences since `-` counts as a word boundary.
    regexpSource += "(?:(?=\\/|$))";
  } else ;

  var matcher = new RegExp(regexpSource, caseSensitive ? undefined : "i");
  return [matcher, paramNames];
}

function safelyDecodeURI(value) {
  try {
    return decodeURI(value);
  } catch (error) {
    warning(false, "The URL path \"" + value + "\" could not be decoded because it is is a " + "malformed URL segment. This is probably due to a bad percent " + ("encoding (" + error + ")."));
    return value;
  }
}

function safelyDecodeURIComponent(value, paramName) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    warning(false, "The value for the URL param \"" + paramName + "\" will not be decoded because" + (" the string \"" + value + "\" is a malformed URL segment. This is probably") + (" due to a bad percent encoding (" + error + ")."));
    return value;
  }
}
/**
 * @private
 */


function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;

  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  } // We want to leave trailing slash behavior in the user's control, so if they
  // specify a basename with a trailing slash, we should support it


  var startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  var nextChar = pathname.charAt(startIndex);

  if (nextChar && nextChar !== "/") {
    // pathname does not start with basename/
    return null;
  }

  return pathname.slice(startIndex) || "/";
}
function router_invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
/**
 * @private
 */

function warning(cond, message) {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== "undefined") console.warn(message);

    try {
      // Welcome to debugging React Router!
      //
      // This error is thrown as a convenience so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message); // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}
/**
 * Returns a resolved path object relative to the given pathname.
 *
 * @see https://reactrouter.com/docs/en/v6/utils/resolve-path
 */

function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }

  var _ref11 =



    typeof to === "string" ? parsePath(to) : to,toPathname = _ref11.pathname,_ref11$search = _ref11.search,search = _ref11$search === void 0 ? "" : _ref11$search,_ref11$hash = _ref11.hash,hash = _ref11$hash === void 0 ? "" : _ref11$hash;
  var pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname: pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}

function resolvePathname(relativePath, fromPathname) {
  var segments = fromPathname.replace(/\/+$/, "").split("/");
  var relativeSegments = relativePath.split("/");
  relativeSegments.forEach(function (segment) {
    if (segment === "..") {
      // Keep the root "" segment so the pathname starts at /
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}

function getInvalidPathError(_char, field, dest, path) {
  return "Cannot include a '" + _char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + "a string in <Link to=\"...\"> and the router will parse it for you.";
}
/**
 * @private
 *
 * When processing relative navigation we want to ignore ancestor routes that
 * do not contribute to the path, such that index/pathless layout routes don't
 * interfere.
 *
 * For example, when moving a route element into an index route and/or a
 * pathless layout route, relative link behavior contained within should stay
 * the same.  Both of the following examples should link back to the root:
 *
 *   <Route path="/">
 *     <Route path="accounts" element={<Link to=".."}>
 *   </Route>
 *
 *   <Route path="/">
 *     <Route path="accounts">
 *       <Route element={<AccountsLayout />}>       // <-- Does not contribute
 *         <Route index element={<Link to=".."} />  // <-- Does not contribute
 *       </Route
 *     </Route>
 *   </Route>
 */


function getPathContributingMatches(matches) {
  return matches.filter(function (match, index) {return index === 0 || match.route.path && match.route.path.length > 0;});
}
/**
 * @private
 */

function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }

  var to;

  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends({}, toArg);
    router_invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    router_invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    router_invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }

  var isEmptyPath = toArg === "" || to.pathname === "";
  var toPathname = isEmptyPath ? "/" : to.pathname;
  var from; // Routing is relative to the current pathname if explicitly requested.
  //
  // If a pathname is explicitly provided in `to`, it should be relative to the
  // route context. This is explained in `Note on `<Link to>` values` in our
  // migration guide from v5 as a means of disambiguation between `to` values
  // that begin with `/` and those that do not. However, this is problematic for
  // `to` values that do not provide a pathname. `to` can simply be a search or
  // hash string, in which case we should assume that the navigation is relative
  // to the current location's pathname and *not* the route pathname.

  if (isPathRelative || toPathname == null) {
    from = locationPathname;
  } else {
    var routePathnameIndex = routePathnames.length - 1;

    if (toPathname.startsWith("..")) {
      var toSegments = toPathname.split("/"); // Each leading .. segment means "go up one route" instead of "go up one
      // URL segment".  This is a key difference from how <a href> works and a
      // major reason we call this a "to" value instead of a "href".

      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }

      to.pathname = toSegments.join("/");
    } // If there are more ".." segments than parent routes, resolve relative to
    // the root / URL.


    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }

  var path = resolvePath(to, from); // Ensure the pathname has a trailing slash if the original "to" had one

  var hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/"); // Or if this was a link to the current path which has a trailing slash

  var hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");

  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }

  return path;
}
/**
 * @private
 */

function getToPathname(to) {
  // Empty strings should be treated the same as / paths
  return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? parsePath(to).pathname : to.pathname;
}
/**
 * @private
 */

var router_joinPaths = function joinPaths(paths) {return paths.join("/").replace(/\/\/+/g, "/");};
/**
 * @private
 */

var normalizePathname = function normalizePathname(pathname) {return pathname.replace(/\/+$/, "").replace(/^\/*/, "/");};
/**
 * @private
 */

var normalizeSearch = function normalizeSearch(search) {return !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;};
/**
 * @private
 */

var normalizeHash = function normalizeHash(hash) {return !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;};
/**
 * This is a shortcut for creating `application/json` responses. Converts `data`
 * to JSON and sets the `Content-Type` header.
 */

var json = function json(data, init) {
  if (init === void 0) {
    init = {};
  }

  var responseInit = typeof init === "number" ? {
    status: init
  } : init;
  var headers = new Headers(responseInit.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }

  return new Response(JSON.stringify(data), _extends({}, responseInit, {
    headers: headers
  }));
};var
AbortedDeferredError = /*#__PURE__*/function (_Error) {_inherits(AbortedDeferredError, _Error);var _super = _createSuper(AbortedDeferredError);function AbortedDeferredError() {_classCallCheck(this, AbortedDeferredError);return _super.apply(this, arguments);}return _createClass(AbortedDeferredError);}( /*#__PURE__*/_wrapNativeSuper(Error));var
DeferredData = /*#__PURE__*/(/* unused pure expression or super */ null && (function () {
  function DeferredData(data) {var _this = this;_classCallCheck(this, DeferredData);
    this.pendingKeys = new Set();
    this.subscriber = undefined;
    router_invariant(data && _typeof(data) === "object" && !Array.isArray(data), "defer() only accepts plain objects"); // Set up an AbortController + Promise we can race against to exit early
    // cancellation

    var reject;
    this.abortPromise = new Promise(function (_, r) {return reject = r;});
    this.controller = new AbortController();

    var onAbort = function onAbort() {return reject(new AbortedDeferredError("Deferred data aborted"));};

    this.unlistenAbortSignal = function () {return _this.controller.signal.removeEventListener("abort", onAbort);};

    this.controller.signal.addEventListener("abort", onAbort);
    this.data = Object.entries(data).reduce(function (acc, _ref) {
      var _ref12 = _slicedToArray(_ref, 2),key = _ref12[0],value = _ref12[1];
      return Object.assign(acc, _defineProperty({},
      key, _this.trackPromise(key, value)));

    }, {});
  }_createClass(DeferredData, [{ key: "trackPromise", value:

    function trackPromise(key, value) {var _this2 = this;
      if (!(value instanceof Promise)) {
        return value;
      }

      this.pendingKeys.add(key); // We store a little wrapper promise that will be extended with
      // _data/_error props upon resolve/reject

      var promise = Promise.race([value, this.abortPromise]).then(function (data) {return _this2.onSettle(promise, key, null, data);}, function (error) {return _this2.onSettle(promise, key, error);}); // Register rejection listeners to avoid uncaught promise rejections on
      // errors or aborted deferred values

      promise["catch"](function () {});
      Object.defineProperty(promise, "_tracked", {
        get: function get() {return true;}
      });
      return promise;
    } }, { key: "onSettle", value:

    function onSettle(promise, key, error, data) {
      if (this.controller.signal.aborted && error instanceof AbortedDeferredError) {
        this.unlistenAbortSignal();
        Object.defineProperty(promise, "_error", {
          get: function get() {return error;}
        });
        return Promise.reject(error);
      }

      this.pendingKeys["delete"](key);

      if (this.done) {
        // Nothing left to abort!
        this.unlistenAbortSignal();
      }

      var subscriber = this.subscriber;

      if (error) {
        Object.defineProperty(promise, "_error", {
          get: function get() {return error;}
        });
        subscriber && subscriber(false);
        return Promise.reject(error);
      }

      Object.defineProperty(promise, "_data", {
        get: function get() {return data;}
      });
      subscriber && subscriber(false);
      return data;
    } }, { key: "subscribe", value:

    function subscribe(fn) {
      this.subscriber = fn;
    } }, { key: "cancel", value:

    function cancel() {var _this3 = this;
      this.controller.abort();
      this.pendingKeys.forEach(function (v, k) {return _this3.pendingKeys["delete"](k);});
      var subscriber = this.subscriber;
      subscriber && subscriber(true);
    } }, { key: "resolveData", value: function () {var _resolveData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(

      function _callee(signal) {var _this4 = this;var aborted, onAbort;return _regeneratorRuntime().wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                aborted = false;if (

                this.done) {_context.next = 7;break;}
                onAbort = function onAbort() {return _this4.cancel();};

                signal.addEventListener("abort", onAbort);_context.next = 6;return (
                  new Promise(function (resolve) {
                    _this4.subscribe(function (aborted) {
                      signal.removeEventListener("abort", onAbort);

                      if (aborted || _this4.done) {
                        resolve(aborted);
                      }
                    });
                  }));case 6:aborted = _context.sent;case 7:return _context.abrupt("return",


                aborted);case 8:case "end":return _context.stop();}}}, _callee, this);}));function resolveData(_x) {return _resolveData.apply(this, arguments);}return resolveData;}() }, { key: "done", get:


    function get() {
      return this.pendingKeys.size === 0;
    } }, { key: "unwrappedData", get:

    function get() {
      router_invariant(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds");
      return Object.entries(this.data).reduce(function (acc, _ref2) {
        var _ref13 = _slicedToArray(_ref2, 2),key = _ref13[0],value = _ref13[1];
        return Object.assign(acc, _defineProperty({},
        key, unwrapTrackedPromise(value)));

      }, {});
    } }]);return DeferredData;}()));



function isTrackedPromise(value) {
  return value instanceof Promise && value._tracked === true;
}

function unwrapTrackedPromise(value) {
  if (!isTrackedPromise(value)) {
    return value;
  }

  if (value._error) {
    throw value._error;
  }

  return value._data;
}

function defer(data) {
  return new DeferredData(data);
}
/**
 * A redirect response. Sets the status code and the `Location` header.
 * Defaults to "302 Found".
 */

var redirect = function redirect(url, init) {
  if (init === void 0) {
    init = 302;
  }

  var responseInit = init;

  if (typeof responseInit === "number") {
    responseInit = {
      status: responseInit
    };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }

  var headers = new Headers(responseInit.headers);
  headers.set("Location", url);
  return new Response(null, _extends({}, responseInit, {
    headers: headers
  }));
};
/**
 * @private
 * Utility class we use to hold auto-unwrapped 4xx/5xx Response bodies
 */var

ErrorResponse = /*#__PURE__*/_createClass(
function ErrorResponse(status, statusText, data) {_classCallCheck(this, ErrorResponse);
  this.status = status;
  this.statusText = statusText || "";
  this.data = data;
});


/**
 * Check if the given error is an ErrorResponse generated from a 4xx/5xx
 * Response throw from an action/loader
 */

function isRouteErrorResponse(e) {
  return e instanceof ErrorResponse;
}

var IDLE_NAVIGATION = {
  state: "idle",
  location: undefined,
  formMethod: undefined,
  formAction: undefined,
  formEncType: undefined,
  formData: undefined
};
var IDLE_FETCHER = {
  state: "idle",
  data: undefined,
  formMethod: undefined,
  formAction: undefined,
  formEncType: undefined,
  formData: undefined
};
var isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
var isServer = !isBrowser; //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region createRouter
////////////////////////////////////////////////////////////////////////////////

/**
 * Create a router and listen to history POP navigations
 */

function router_createRouter(init) {
  router_invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  var dataRoutes = convertRoutesToDataRoutes(init.routes); // Cleanup function for history

  var unlistenHistory = null; // Externally-provided functions to call on all state changes

  var subscribers = new Set(); // Externally-provided object to hold scroll restoration locations during routing

  var savedScrollPositions = null; // Externally-provided function to get scroll restoration keys

  var getScrollRestorationKey = null; // Externally-provided function to get current scroll position

  var getScrollPosition = null; // One-time flag to control the initial hydration scroll restoration.  Because
  // we don't get the saved positions from <ScrollRestoration /> until _after_
  // the initial render, we need to manually trigger a separate updateState to
  // send along the restoreScrollPosition

  var initialScrollRestored = false;
  var initialMatches = matchRoutes(dataRoutes, init.history.location, init.basename);
  var initialErrors = null;

  if (initialMatches == null) {
    // If we do not match a user-provided-route, fall back to the root
    // to allow the error boundary to take over
    var _getNotFoundMatches =



      getNotFoundMatches(dataRoutes),matches = _getNotFoundMatches.matches,route = _getNotFoundMatches.route,error = _getNotFoundMatches.error;
    initialMatches = matches;
    initialErrors = _defineProperty({},
    route.id, error);

  }

  var initialized = !initialMatches.some(function (m) {return m.route.loader;}) || init.hydrationData != null;
  var router;
  var state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized: initialized,
    navigation: IDLE_NAVIGATION,
    restoreScrollPosition: null,
    preventScrollReset: false,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: new Map()
  }; // -- Stateful internal variables to manage navigations --
  // Current navigation in progress (to be committed in completeNavigation)

  var pendingAction = Action.Pop; // Should the current navigation prevent the scroll reset if scroll cannot
  // be restored?

  var pendingPreventScrollReset = false; // AbortController for the active navigation

  var pendingNavigationController; // We use this to avoid touching history in completeNavigation if a
  // revalidation is entirely uninterrupted

  var isUninterruptedRevalidation = false; // Use this internal flag to force revalidation of all loaders:
  //  - submissions (completed or interrupted)
  //  - useRevalidate()
  //  - X-Remix-Revalidate (from redirect)

  var isRevalidationRequired = false; // Use this internal array to capture routes that require revalidation due
  // to a cancelled deferred on action submission

  var cancelledDeferredRoutes = []; // Use this internal array to capture fetcher loads that were cancelled by an
  // action navigation and require revalidation

  var cancelledFetcherLoads = []; // AbortControllers for any in-flight fetchers

  var fetchControllers = new Map(); // Track loads based on the order in which they started

  var incrementingLoadId = 0; // Track the outstanding pending navigation data load to be compared against
  // the globally incrementing load when a fetcher load lands after a completed
  // navigation

  var pendingNavigationLoadId = -1; // Fetchers that triggered data reloads as a result of their actions

  var fetchReloadIds = new Map(); // Fetchers that triggered redirect navigations from their actions

  var fetchRedirectIds = new Set(); // Most recent href/match for fetcher.load calls for fetchers

  var fetchLoadMatches = new Map(); // Store DeferredData instances for active route matches.  When a
  // route loader returns defer() we stick one in here.  Then, when a nested
  // promise resolves we update loaderData.  If a new navigation starts we
  // cancel active deferreds for eliminated routes.

  var activeDeferreds = new Map(); // Initialize the router, all side effects should be kicked off from here.
  // Implemented as a Fluent API for ease of:
  //   let router = createRouter(init).initialize();

  function initialize() {
    // If history informs us of a POP navigation, start the navigation but do not update
    // state.  We'll update our own state once the navigation completes
    unlistenHistory = init.history.listen(function (_ref) {
      var
        historyAction =

        _ref.action,location = _ref.location;
      return startNavigation(historyAction, location);
    }); // Kick off initial data load if needed.  Use Pop to avoid modifying history

    if (!state.initialized) {
      startNavigation(Action.Pop, state.location);
    }

    return router;
  } // Clean up a router and it's side effects


  function dispose() {
    if (unlistenHistory) {
      unlistenHistory();
    }

    subscribers.clear();
    pendingNavigationController && pendingNavigationController.abort();
    state.fetchers.forEach(function (_, key) {return deleteFetcher(key);});
  } // Subscribe to state updates for the router


  function subscribe(fn) {
    subscribers.add(fn);
    return function () {return subscribers["delete"](fn);};
  } // Update our state and notify the calling context of the change


  function updateState(newState) {
    state = _extends({}, state, newState);
    subscribers.forEach(function (subscriber) {return subscriber(state);});
  } // Complete a navigation returning the state.navigation back to the IDLE_NAVIGATION
  // and setting state.[historyAction/location/matches] to the new route.
  // - Location is a required param
  // - Navigation will always be set to IDLE_NAVIGATION
  // - Can pass any other state in newState


  function completeNavigation(location, newState) {
    var _state$navigation$for;

    // Deduce if we're in a loading/actionReload state:
    // - We have committed actionData in the store
    // - The current navigation was a submission
    // - We're past the submitting state and into the loading state
    // - The location we've finished loading is different from the submission
    //   location, indicating we redirected from the action (avoids false
    //   positives for loading/submissionRedirect when actionData returned
    //   on a prior submission)
    var isActionReload = state.actionData != null && state.navigation.formMethod != null && state.navigation.state === "loading" && ((_state$navigation$for = state.navigation.formAction) == null ? void 0 : _state$navigation$for.split("?")[0]) === location.pathname; // Always preserve any existing loaderData from re-used routes

    var newLoaderData = newState.loaderData ? {
      loaderData: mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [])
    } : {};
    updateState(_extends({}, isActionReload ? {} : {
      actionData: null
    }, newState, newLoaderData, {
      historyAction: pendingAction,
      location: location,
      initialized: true,
      navigation: IDLE_NAVIGATION,
      revalidation: "idle",
      // Don't restore on submission navigations
      restoreScrollPosition: state.navigation.formData ? false : getSavedScrollPosition(location, newState.matches || state.matches),
      preventScrollReset: pendingPreventScrollReset
    }));

    if (isUninterruptedRevalidation) ;else if (pendingAction === Action.Pop) ;else if (pendingAction === Action.Push) {
      init.history.push(location, location.state);
    } else if (pendingAction === Action.Replace) {
      init.history.replace(location, location.state);
    } // Reset stateful navigation vars


    pendingAction = Action.Pop;
    pendingPreventScrollReset = false;
    isUninterruptedRevalidation = false;
    isRevalidationRequired = false;
    cancelledDeferredRoutes = [];
    cancelledFetcherLoads = [];
  } // Trigger a navigation event, which can either be a numerical POP or a PUSH
  // replace with an optional submission
  function

  navigate(_x2, _x3) {return _navigate.apply(this, arguments);}



























  // Revalidate all current loaders.  If a navigation is in progress or if this
  // is interrupted by a navigation, allow this to "succeed" by calling all
  // loaders during the next loader round
  function _navigate() {_navigate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(to, opts) {var _normalizeNavigateOpt2, path, submission, error, location, historyAction, preventScrollReset;return _regeneratorRuntime().wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:if (!(typeof to === "number")) {_context2.next = 3;break;}init.history.go(to);return _context2.abrupt("return");case 3:_normalizeNavigateOpt2 = normalizeNavigateOptions(to, opts), path = _normalizeNavigateOpt2.path, submission = _normalizeNavigateOpt2.submission, error = _normalizeNavigateOpt2.error;location = createLocation(state.location, path, opts && opts.state); // When using navigate as a PUSH/REPLACE we aren't reading an already-encoded
              // URL from window.location, so we need to encode it here so the behavior
              // remains the same as POP and non-data-router usages.  new URL() does all
              // the same encoding we'd get from a history.pushState/window.location read
              // without having to touch history
              location = init.history.encodeLocation(location);historyAction = (opts && opts.replace) === true || submission != null ? Action.Replace : Action.Push;preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : undefined;_context2.next = 10;return startNavigation(historyAction, location, { submission: submission, // Send through the formData serialization error if we have one so we can
                // render at the right error boundary after we match routes
                pendingError: error, preventScrollReset: preventScrollReset, replace: opts && opts.replace });case 10:return _context2.abrupt("return", _context2.sent);case 11:case "end":return _context2.stop();}}}, _callee2);}));return _navigate.apply(this, arguments);}function revalidate() {interruptActiveLoads();updateState({ revalidation: "loading" }); // If we're currently submitting an action, we don't need to start a new
    // navigation, we'll just let the follow up loader execution call all loaders
    if (state.navigation.state === "submitting") {
      return;
    } // If we're currently in an idle state, start a new navigation for the current
    // action/location and mark it as uninterrupted, which will skip the history
    // update in completeNavigation


    if (state.navigation.state === "idle") {
      startNavigation(state.historyAction, state.location, {
        startUninterruptedRevalidation: true
      });
      return;
    } // Otherwise, if we're currently in a loading state, just start a new
    // navigation to the navigation.location but do not trigger an uninterrupted
    // revalidation so that history correctly updates once the navigation completes


    startNavigation(pendingAction || state.historyAction, state.navigation.location, {
      overrideNavigation: state.navigation
    });
  } // Start a navigation to the given action/location.  Can optionally provide a
  // overrideNavigation which will override the normalLoad in the case of a redirect
  // navigation
  function

  startNavigation(_x4, _x5, _x6) {return _startNavigation.apply(this, arguments);}































































































  // Call the action matched by the leaf route for this navigation and handle
  // redirects/errors
  function _startNavigation() {_startNavigation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(historyAction, location, opts) {var loadingNavigation, matches, _getNotFoundMatches2, notFoundMatches, _route, _error, request, pendingActionData, pendingError, actionOutput, navigation, _yield$handleLoaders, shortCircuited, loaderData, errors;return _regeneratorRuntime().wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0: // Abort any in-progress navigations and start a new one. Unset any ongoing
              // uninterrupted revalidations unless told otherwise, since we want this
              // new navigation to update history normally
              pendingNavigationController && pendingNavigationController.abort();pendingNavigationController = null;pendingAction = historyAction;isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true; // Save the current scroll position every time we start a new navigation,
              // and track whether we should reset scroll on completion
              saveScrollPosition(state.location, state.matches);pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;loadingNavigation = opts && opts.overrideNavigation;matches = matchRoutes(dataRoutes, location, init.basename); // Short circuit with a 404 on the root error boundary if we match nothing
              if (matches) {_context3.next = 13;break;}_getNotFoundMatches2 = getNotFoundMatches(dataRoutes), notFoundMatches = _getNotFoundMatches2.matches, _route = _getNotFoundMatches2.route, _error = _getNotFoundMatches2.error; // Cancel all pending deferred on 404s since we don't keep any routes
              cancelActiveDeferreds();completeNavigation(location, { matches: notFoundMatches, loaderData: {}, errors: _defineProperty({}, _route.id, _error) });return _context3.abrupt("return");case 13:if (!isHashChangeOnly(state.location, location)) {_context3.next = 16;break;}completeNavigation(location, { matches: matches });return _context3.abrupt("return");case 16: // Create a controller/Request for this navigation
              pendingNavigationController = new AbortController();request = createRequest(location, pendingNavigationController.signal, opts && opts.submission);if (!(opts && opts.pendingError)) {_context3.next = 22;break;} // If we have a pendingError, it means the user attempted a GET submission
              // with binary FormData so assign here and skip to handleLoaders.  That
              // way we handle calling loaders above the boundary etc.  It's not really
              // different from an actionError in that sense.
              pendingError = _defineProperty({}, findNearestBoundary(matches).route.id, opts.pendingError);_context3.next = 32;break;case 22:if (!(opts && opts.submission)) {_context3.next = 32;break;}_context3.next = 25;return handleAction(request, location, opts.submission, matches, { replace: opts.replace });case 25:actionOutput = _context3.sent;if (!actionOutput.shortCircuited) {_context3.next = 28;break;}return _context3.abrupt("return");case 28:pendingActionData = actionOutput.pendingActionData;pendingError = actionOutput.pendingActionError;navigation = _extends({ state: "loading", location: location }, opts.submission);loadingNavigation = navigation;case 32:_context3.next = 34;return handleLoaders(request, location, matches, loadingNavigation, opts && opts.submission, opts && opts.replace, pendingActionData, pendingError);case 34:_yield$handleLoaders = _context3.sent;shortCircuited = _yield$handleLoaders.shortCircuited;loaderData = _yield$handleLoaders.loaderData;errors = _yield$handleLoaders.errors;if (!shortCircuited) {_context3.next = 40;break;}return _context3.abrupt("return");case 40: // Clean up now that the action/loaders have completed.  Don't clean up if
              // we short circuited because pendingNavigationController will have already
              // been assigned to a new controller for the next navigation
              pendingNavigationController = null;completeNavigation(location, { matches: matches, loaderData: loaderData, errors: errors });case 42:case "end":return _context3.stop();}}}, _callee3);}));return _startNavigation.apply(this, arguments);}function handleAction(_x7, _x8, _x9, _x10, _x11) {return _handleAction.apply(this, arguments);}





















































  // Call all applicable loaders for the given matches, handling redirects,
  // errors, etc.
  function _handleAction() {_handleAction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(request, location, submission, matches, opts) {var navigation, result, actionMatch, redirectNavigation, boundaryMatch;return _regeneratorRuntime().wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:interruptActiveLoads(); // Put us in a submitting state
              navigation = _extends({ state: "submitting", location: location }, submission);updateState({ navigation: navigation }); // Call our action and get the result
              actionMatch = getTargetMatch(matches, location);if (actionMatch.route.action) {_context4.next = 8;break;}result = getMethodNotAllowedResult(location);_context4.next = 13;break;case 8:_context4.next = 10;return callLoaderOrAction("action", request, actionMatch, matches, router.basename);case 10:result = _context4.sent;if (!request.signal.aborted) {_context4.next = 13;break;}return _context4.abrupt("return", { shortCircuited: true });case 13:if (!isRedirectResult(result)) {_context4.next = 18;break;}redirectNavigation = _extends({ state: "loading", location: createLocation(state.location, result.location) }, submission);_context4.next = 17;return startRedirectNavigation(result, redirectNavigation, opts && opts.replace);case 17:return _context4.abrupt("return", { shortCircuited: true });case 18:if (!isErrorResult(result)) {_context4.next = 22;break;} // Store off the pending error - we use it to determine which loaders
              // to call and will commit it when we complete the navigation
              boundaryMatch = findNearestBoundary(matches, actionMatch.route.id); // By default, all submissions are REPLACE navigations, but if the
              // action threw an error that'll be rendered in an errorElement, we fall
              // back to PUSH so that the user can use the back button to get back to
              // the pre-submission form location to try again
              if ((opts && opts.replace) !== true) {pendingAction = Action.Push;}return _context4.abrupt("return", { pendingActionError: _defineProperty({}, boundaryMatch.route.id, result.error) });case 22:if (!isDeferredResult(result)) {_context4.next = 24;break;}throw new Error("defer() is not supported in actions");case 24:return _context4.abrupt("return", { pendingActionData: _defineProperty({}, actionMatch.route.id, result.data) });case 25:case "end":return _context4.stop();}}}, _callee4);}));return _handleAction.apply(this, arguments);}function handleLoaders(_x12, _x13, _x14, _x15, _x16, _x17, _x18, _x19) {return _handleLoaders.apply(this, arguments);}function _handleLoaders() {_handleLoaders = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(request, location, matches, overrideNavigation, submission, replace, pendingActionData, pendingError) {var loadingNavigation, navigation, _getMatchesToLoad, _getMatchesToLoad2, matchesToLoad, revalidatingFetchers, _yield$callLoadersAnd, results, loaderResults, fetcherResults, redirect, redirectNavigation, _processLoaderData, loaderData, errors, didAbortFetchLoads;return _regeneratorRuntime().wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0: // Figure out the right navigation we want to use for data loading
              loadingNavigation = overrideNavigation;if (!loadingNavigation) {navigation = { state: "loading", location: location,
                  formMethod: undefined,
                  formAction: undefined,
                  formEncType: undefined,
                  formData: undefined
                };
                loadingNavigation = navigation;
              }_getMatchesToLoad =

              getMatchesToLoad(state, matches, submission, location, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, pendingActionData, pendingError, fetchLoadMatches), _getMatchesToLoad2 = _slicedToArray(_getMatchesToLoad, 2), matchesToLoad = _getMatchesToLoad2[0], revalidatingFetchers = _getMatchesToLoad2[1]; // Cancel pending deferreds for no-longer-matched routes or routes we're
              // about to reload.  Note that if this is an action reload we would have
              // already cancelled all pending deferreds so this would be a no-op

              cancelActiveDeferreds(function (routeId) {return !(matches && matches.some(function (m) {return m.route.id === routeId;})) || matchesToLoad && matchesToLoad.some(function (m) {return m.route.id === routeId;});}); // Short circuit if we have no loaders to run
              if (!(
              matchesToLoad.length === 0 && revalidatingFetchers.length === 0)) {_context5.next = 7;break;}
              completeNavigation(location, {
                matches: matches,
                loaderData: mergeLoaderData(state.loaderData, {}, matches),
                // Commit pending error if we're short circuiting
                errors: pendingError || null,
                actionData: pendingActionData || null
              });return _context5.abrupt("return",
              {
                shortCircuited: true
              });case 7:
              // If this is an uninterrupted revalidation, we remain in our current idle
              // state.  If not, we need to switch to our loading state and load data,
              // preserving any new action data or existing action data (in the case of
              // a revalidation interrupting an actionReload)


              if (!isUninterruptedRevalidation) {
                revalidatingFetchers.forEach(function (_ref2) {
                  var _ref14 = _slicedToArray(_ref2, 1),key = _ref14[0];
                  var fetcher = state.fetchers.get(key);
                  var revalidatingFetcher = {
                    state: "loading",
                    data: fetcher && fetcher.data,
                    formMethod: undefined,
                    formAction: undefined,
                    formEncType: undefined,
                    formData: undefined
                  };
                  state.fetchers.set(key, revalidatingFetcher);
                });
                updateState(_extends({
                  navigation: loadingNavigation,
                  actionData: pendingActionData || state.actionData || null
                }, revalidatingFetchers.length > 0 ? {
                  fetchers: new Map(state.fetchers)
                } : {}));
              }

              pendingNavigationLoadId = ++incrementingLoadId;
              revalidatingFetchers.forEach(function (_ref3) {
                var _ref15 = _slicedToArray(_ref3, 1),key = _ref15[0];
                return fetchControllers.set(key, pendingNavigationController);
              });_context5.next = 12;return (




                callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, request));case 12:_yield$callLoadersAnd = _context5.sent;results = _yield$callLoadersAnd.results;loaderResults = _yield$callLoadersAnd.loaderResults;fetcherResults = _yield$callLoadersAnd.fetcherResults;if (!

              request.signal.aborted) {_context5.next = 18;break;}return _context5.abrupt("return",
              {
                shortCircuited: true
              });case 18:
              // Clean up _after_ loaders have completed.  Don't clean up if we short
              // circuited because fetchControllers would have been aborted and
              // reassigned to new controllers for the next navigation


              revalidatingFetchers.forEach(function (_ref4) {
                var _ref16 = _slicedToArray(_ref4, 1),key = _ref16[0];
                return fetchControllers["delete"](key);
              }); // If any loaders returned a redirect Response, start a new REPLACE navigation

              redirect = findRedirect(results);if (!

              redirect) {_context5.next = 25;break;}
              redirectNavigation = getLoaderRedirect(state, redirect);_context5.next = 24;return (
                startRedirectNavigation(redirect, redirectNavigation, replace));case 24:return _context5.abrupt("return",
              {
                shortCircuited: true
              });case 25:
              // Process and commit output from loaders
              _processLoaderData =




              processLoaderData(state, matches, matchesToLoad, loaderResults, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds), loaderData = _processLoaderData.loaderData, errors = _processLoaderData.errors; // Wire up subscribers to update loaderData as promises settle

              activeDeferreds.forEach(function (deferredData, routeId) {
                deferredData.subscribe(function (aborted) {
                  // Note: No need to updateState here since the TrackedPromise on
                  // loaderData is stable across resolve/reject
                  // Remove this instance if we were aborted or if promises have settled
                  if (aborted || deferredData.done) {
                    activeDeferreds["delete"](routeId);
                  }
                });
              });
              markFetchRedirectsDone();
              didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);return _context5.abrupt("return",
              _extends({
                loaderData: loaderData,
                errors: errors
              }, didAbortFetchLoads || revalidatingFetchers.length > 0 ? {
                fetchers: new Map(state.fetchers)
              } : {}));case 30:case "end":return _context5.stop();}}}, _callee5);}));return _handleLoaders.apply(this, arguments);}


  function getFetcher(key) {
    return state.fetchers.get(key) || IDLE_FETCHER;
  } // Trigger a fetcher load/submit for the given fetcher key


  function fetch(key, routeId, href, opts) {
    if (isServer) {
      throw new Error("router.fetch() was called during the server render, but it shouldn't be. " + "You are likely calling a useFetcher() method in the body of your component. " + "Try moving it to a useEffect or a callback.");
    }

    if (fetchControllers.has(key)) abortFetcher(key);
    var matches = matchRoutes(dataRoutes, href, init.basename);

    if (!matches) {
      setFetcherError(key, routeId, new ErrorResponse(404, "Not Found", null));
      return;
    }

    var _normalizeNavigateOpt =


      normalizeNavigateOptions(href, opts, true),path = _normalizeNavigateOpt.path,submission = _normalizeNavigateOpt.submission;
    var match = getTargetMatch(matches, path);

    if (submission) {
      handleFetcherAction(key, routeId, path, match, matches, submission);
      return;
    } // Store off the match so we can call it's shouldRevalidate on subsequent
    // revalidations


    fetchLoadMatches.set(key, [path, match, matches]);
    handleFetcherLoader(key, routeId, path, match, matches);
  } // Call the action for the matched fetcher.submit(), and then handle redirects,
  // errors, and revalidation
  function

  handleFetcherAction(_x20, _x21, _x22, _x23, _x24, _x25) {return _handleFetcherAction.apply(this, arguments);}



















































































































































































  // Call the matched loader for fetcher.load(), handling redirects, errors, etc.
  function _handleFetcherAction() {_handleFetcherAction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(key, routeId, path, match, requestMatches, submission) {var _getMethodNotAllowedR, _error2, existingFetcher, fetcher, abortController, fetchRequest, actionResult, loadingFetcher, redirectNavigation, nextLocation, revalidationRequest, matches, loadId, loadFetcher, _getMatchesToLoad3, _getMatchesToLoad4, matchesToLoad, revalidatingFetchers, _yield$callLoadersAnd2, results, loaderResults, fetcherResults, redirect, _processLoaderData2, loaderData, errors, doneFetcher, didAbortFetchLoads;return _regeneratorRuntime().wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:interruptActiveLoads();fetchLoadMatches["delete"](key);if (match.route.action) {_context6.next = 6;break;}_getMethodNotAllowedR = getMethodNotAllowedResult(path), _error2 = _getMethodNotAllowedR.error;setFetcherError(key, routeId, _error2);return _context6.abrupt("return");case 6: // Put this fetcher into it's submitting state
              existingFetcher = state.fetchers.get(key);fetcher = _extends({ state: "submitting" }, submission, { data: existingFetcher && existingFetcher.data });state.fetchers.set(key, fetcher);updateState({ fetchers: new Map(state.fetchers) }); // Call the action for the fetcher
              abortController = new AbortController();fetchRequest = createRequest(path, abortController.signal, submission);fetchControllers.set(key, abortController);_context6.next = 15;return callLoaderOrAction("action", fetchRequest, match, requestMatches, router.basename);case 15:actionResult = _context6.sent;if (!fetchRequest.signal.aborted) {_context6.next = 19;break;} // We can delete this so long as we weren't aborted by ou our own fetcher
              // re-submit which would have put _new_ controller is in fetchControllers
              if (fetchControllers.get(key) === abortController) {fetchControllers["delete"](key);}return _context6.abrupt("return");case 19:if (!isRedirectResult(actionResult)) {_context6.next = 29;break;}fetchControllers["delete"](key);fetchRedirectIds.add(key);loadingFetcher = _extends({ state: "loading" }, submission, { data: undefined });state.fetchers.set(key, loadingFetcher);updateState({ fetchers: new Map(state.fetchers) });redirectNavigation = _extends({ state: "loading", location: createLocation(state.location, actionResult.location) }, submission);_context6.next = 28;return startRedirectNavigation(actionResult, redirectNavigation);case 28:return _context6.abrupt("return");case 29:if (!isErrorResult(actionResult)) {_context6.next = 32;break;}setFetcherError(key, routeId, actionResult.error);return _context6.abrupt("return");case 32:if (isDeferredResult(actionResult)) {router_invariant(false, "defer() is not supported in actions");} // Start the data load for current matches, or the next location if we're
              // in the middle of a navigation
              nextLocation = state.navigation.location || state.location;revalidationRequest = createRequest(nextLocation, abortController.signal);matches = state.navigation.state !== "idle" ? matchRoutes(dataRoutes, state.navigation.location, init.basename) : state.matches;router_invariant(matches, "Didn't find any matches after fetcher action");loadId = ++incrementingLoadId;fetchReloadIds.set(key, loadId);loadFetcher = _extends({ state: "loading", data: actionResult.data }, submission);state.fetchers.set(key, loadFetcher);_getMatchesToLoad3 = getMatchesToLoad(state, matches, submission, nextLocation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, _defineProperty({}, match.route.id, actionResult.data), undefined, // No need to send through errors since we short circuit above
              fetchLoadMatches), _getMatchesToLoad4 = _slicedToArray(_getMatchesToLoad3, 2), matchesToLoad = _getMatchesToLoad4[0], revalidatingFetchers = _getMatchesToLoad4[1]; // Put all revalidating fetchers into the loading state, except for the
              // current fetcher which we want to keep in it's current loading state which
              // contains it's action submission info + action data
              revalidatingFetchers.filter(function (_ref5) {var _ref17 = _slicedToArray(_ref5, 1),staleKey = _ref17[0];return staleKey !== key;}).forEach(function (_ref6) {var _ref18 = _slicedToArray(_ref6, 1),staleKey = _ref18[0];var existingFetcher = state.fetchers.get(staleKey);var revalidatingFetcher = { state: "loading", data: existingFetcher && existingFetcher.data, formMethod: undefined, formAction: undefined, formEncType: undefined, formData: undefined };state.fetchers.set(staleKey, revalidatingFetcher);fetchControllers.set(staleKey, abortController);});updateState({ fetchers: new Map(state.fetchers) });_context6.next = 46;return callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);case 46:_yield$callLoadersAnd2 = _context6.sent;results = _yield$callLoadersAnd2.results;loaderResults = _yield$callLoadersAnd2.loaderResults;fetcherResults = _yield$callLoadersAnd2.fetcherResults;if (!abortController.signal.aborted) {_context6.next = 52;break;}return _context6.abrupt("return");case 52:fetchReloadIds["delete"](key);fetchControllers["delete"](key);revalidatingFetchers.forEach(function (_ref7) {var _ref19 = _slicedToArray(_ref7, 1),staleKey = _ref19[0];return fetchControllers["delete"](staleKey);});redirect = findRedirect(results);if (!redirect) {_context6.next = 61;break;}redirectNavigation = getLoaderRedirect(state, redirect);_context6.next = 60;return startRedirectNavigation(redirect, redirectNavigation);case 60:return _context6.abrupt("return");case 61: // Process and commit output from loaders
              _processLoaderData2 = processLoaderData(state, state.matches, matchesToLoad, loaderResults, undefined, revalidatingFetchers, fetcherResults, activeDeferreds), loaderData = _processLoaderData2.loaderData, errors = _processLoaderData2.errors;doneFetcher = { state: "idle", data: actionResult.data, formMethod: undefined, formAction: undefined, formEncType: undefined, formData: undefined };state.fetchers.set(key, doneFetcher);didAbortFetchLoads = abortStaleFetchLoads(loadId); // If we are currently in a navigation loading state and this fetcher is
              // more recent than the navigation, we want the newer data so abort the
              // navigation and complete it with the fetcher data
              if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {router_invariant(pendingAction, "Expected pending action");pendingNavigationController && pendingNavigationController.abort();completeNavigation(state.navigation.location, { matches: matches, loaderData: loaderData, errors: errors, fetchers: new Map(state.fetchers) });} else {// otherwise just update with the fetcher data, preserving any existing
                // loaderData for loaders that did not need to reload.  We have to
                // manually merge here since we aren't going through completeNavigation
                updateState(_extends({ errors: errors, loaderData: mergeLoaderData(state.loaderData, loaderData, matches) }, didAbortFetchLoads ? { fetchers: new Map(state.fetchers) } : {}));isRevalidationRequired = false;}case 66:case "end":return _context6.stop();}}}, _callee6);}));return _handleFetcherAction.apply(this, arguments);}function handleFetcherLoader(_x26, _x27, _x28, _x29, _x30) {return _handleFetcherLoader.apply(this, arguments);}




























































  /**
   * Utility function to handle redirects returned from an action or loader.
   * Normally, a redirect "replaces" the navigation that triggered it.  So, for
   * example:
   *
   *  - user is on /a
   *  - user clicks a link to /b
   *  - loader for /b redirects to /c
   *
   * In a non-JS app the browser would track the in-flight navigation to /b and
   * then replace it with /c when it encountered the redirect response.  In
   * the end it would only ever update the URL bar with /c.
   *
   * In client-side routing using pushState/replaceState, we aim to emulate
   * this behavior and we also do not update history until the end of the
   * navigation (including processed redirects).  This means that we never
   * actually touch history until we've processed redirects, so we just use
   * the history action from the original navigation (PUSH or REPLACE).
   */function _handleFetcherLoader() {_handleFetcherLoader = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(key, routeId, path, match, matches) {var existingFetcher, loadingFetcher, abortController, fetchRequest, result, redirectNavigation, boundaryMatch, doneFetcher;return _regeneratorRuntime().wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:existingFetcher = state.fetchers.get(key); // Put this fetcher into it's loading state
              loadingFetcher = { state: "loading", formMethod: undefined, formAction: undefined, formEncType: undefined, formData: undefined, data: existingFetcher && existingFetcher.data };state.fetchers.set(key, loadingFetcher);updateState({ fetchers: new Map(state.fetchers) }); // Call the loader for this fetcher route match
              abortController = new AbortController();fetchRequest = createRequest(path, abortController.signal);fetchControllers.set(key, abortController);_context7.next = 9;return callLoaderOrAction("loader", fetchRequest, match, matches, router.basename);case 9:result = _context7.sent;if (!isDeferredResult(result)) {_context7.next = 17;break;}_context7.next = 13;return resolveDeferredData(result, fetchRequest.signal, true);case 13:_context7.t0 = _context7.sent;if (_context7.t0) {_context7.next = 16;break;}_context7.t0 = result;case 16:result = _context7.t0;case 17: // We can delete this so long as we weren't aborted by ou our own fetcher
              // re-load which would have put _new_ controller is in fetchControllers
              if (fetchControllers.get(key) === abortController) {fetchControllers["delete"](key);}if (!fetchRequest.signal.aborted) {_context7.next = 20;break;}return _context7.abrupt("return");case 20:if (!isRedirectResult(result)) {_context7.next = 25;break;}redirectNavigation = getLoaderRedirect(state, result);_context7.next = 24;return startRedirectNavigation(result, redirectNavigation);case 24:return _context7.abrupt("return");case 25:if (!isErrorResult(result)) {_context7.next = 30;break;}boundaryMatch = findNearestBoundary(state.matches, routeId);state.fetchers["delete"](key); // TODO: In remix, this would reset to IDLE_NAVIGATION if it was a catch -
              // do we need to behave any differently with our non-redirect errors?
              // What if it was a non-redirect Response?
              updateState({ fetchers: new Map(state.fetchers), errors: _defineProperty({}, boundaryMatch.route.id, result.error) });return _context7.abrupt("return");case 30:router_invariant(!isDeferredResult(result), "Unhandled fetcher deferred data"); // Put the fetcher back into an idle state
              doneFetcher = { state: "idle", data: result.data, formMethod: undefined, formAction: undefined, formEncType: undefined, formData: undefined };state.fetchers.set(key, doneFetcher);updateState({ fetchers: new Map(state.fetchers) });case 34:case "end":return _context7.stop();}}}, _callee7);}));return _handleFetcherLoader.apply(this, arguments);}function startRedirectNavigation(_x31, _x32, _x33) {return _startRedirectNavigation.apply(this, arguments);}function _startRedirectNavigation() {_startRedirectNavigation = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(redirect, navigation, replace) {var redirectHistoryAction;return _regeneratorRuntime().wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:if (redirect.revalidate) {isRevalidationRequired = true;}router_invariant(navigation.location, "Expected a location on the redirect navigation"); // There's no need to abort on redirects, since we don't detect the
              // redirect until the action/loaders have settled

              pendingNavigationController = null;
              redirectHistoryAction = replace === true ? Action.Replace : Action.Push;_context8.next = 6;return (
                startNavigation(redirectHistoryAction, navigation.location, {
                  overrideNavigation: navigation
                }));case 6:case "end":return _context8.stop();}}}, _callee8);}));return _startRedirectNavigation.apply(this, arguments);}function


  callLoadersAndMaybeResolveData(_x34, _x35, _x36, _x37, _x38) {return _callLoadersAndMaybeResolveData.apply(this, arguments);}function _callLoadersAndMaybeResolveData() {_callLoadersAndMaybeResolveData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(currentMatches, matches, matchesToLoad, fetchersToLoad, request) {var results, loaderResults, fetcherResults;return _regeneratorRuntime().wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return (



                Promise.all([].concat(_toConsumableArray(matchesToLoad.map(function (match) {return callLoaderOrAction("loader", request, match, matches, router.basename);})), _toConsumableArray(fetchersToLoad.map(function (_ref8) {
                  var _ref20 = _slicedToArray(_ref8, 4),href = _ref20[1],match = _ref20[2],fetchMatches = _ref20[3];
                  return callLoaderOrAction("loader", createRequest(href, request.signal), match, fetchMatches, router.basename);
                })))));case 2:results = _context9.sent;
              loaderResults = results.slice(0, matchesToLoad.length);
              fetcherResults = results.slice(matchesToLoad.length);_context9.next = 7;return (
                Promise.all([resolveDeferredResults(currentMatches, matchesToLoad, loaderResults, request.signal, false, state.loaderData), resolveDeferredResults(currentMatches, fetchersToLoad.map(function (_ref9) {
                  var _ref21 = _slicedToArray(_ref9, 3),match = _ref21[2];
                  return match;
                }), fetcherResults, request.signal, true)]));case 7:return _context9.abrupt("return",
              {
                results: results,
                loaderResults: loaderResults,
                fetcherResults: fetcherResults
              });case 8:case "end":return _context9.stop();}}}, _callee9);}));return _callLoadersAndMaybeResolveData.apply(this, arguments);}


  function interruptActiveLoads() {var _cancelledDeferredRou;
    // Every interruption triggers a revalidation
    isRevalidationRequired = true; // Cancel pending route-level deferreds and mark cancelled routes for
    // revalidation

    (_cancelledDeferredRou = cancelledDeferredRoutes).push.apply(_cancelledDeferredRou, _toConsumableArray(cancelActiveDeferreds())); // Abort in-flight fetcher loads

    fetchLoadMatches.forEach(function (_, key) {
      if (fetchControllers.has(key)) {
        cancelledFetcherLoads.push(key);
        abortFetcher(key);
      }
    });
  }

  function setFetcherError(key, routeId, error) {
    var boundaryMatch = findNearestBoundary(state.matches, routeId);
    deleteFetcher(key);
    updateState({
      errors: _defineProperty({},
      boundaryMatch.route.id, error),

      fetchers: new Map(state.fetchers)
    });
  }

  function deleteFetcher(key) {
    if (fetchControllers.has(key)) abortFetcher(key);
    fetchLoadMatches["delete"](key);
    fetchReloadIds["delete"](key);
    fetchRedirectIds["delete"](key);
    state.fetchers["delete"](key);
  }

  function abortFetcher(key) {
    var controller = fetchControllers.get(key);
    router_invariant(controller, "Expected fetch controller: " + key);
    controller.abort();
    fetchControllers["delete"](key);
  }

  function markFetchersDone(keys) {var _iterator = _createForOfIteratorHelper(
      keys),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var key = _step.value;
        var fetcher = getFetcher(key);
        var doneFetcher = {
          state: "idle",
          data: fetcher.data,
          formMethod: undefined,
          formAction: undefined,
          formEncType: undefined,
          formData: undefined
        };
        state.fetchers.set(key, doneFetcher);
      }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
  }

  function markFetchRedirectsDone() {
    var doneKeys = [];var _iterator2 = _createForOfIteratorHelper(

      fetchRedirectIds),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var key = _step2.value;
        var fetcher = state.fetchers.get(key);
        router_invariant(fetcher, "Expected fetcher: " + key);

        if (fetcher.state === "loading") {
          fetchRedirectIds["delete"](key);
          doneKeys.push(key);
        }
      }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}

    markFetchersDone(doneKeys);
  }

  function abortStaleFetchLoads(landedId) {
    var yeetedKeys = [];var _iterator3 = _createForOfIteratorHelper(

      fetchReloadIds),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var _step3$value = _slicedToArray(_step3.value, 2),key = _step3$value[0],id = _step3$value[1];
        if (id < landedId) {
          var fetcher = state.fetchers.get(key);
          router_invariant(fetcher, "Expected fetcher: " + key);

          if (fetcher.state === "loading") {
            abortFetcher(key);
            fetchReloadIds["delete"](key);
            yeetedKeys.push(key);
          }
        }
      }} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}

    markFetchersDone(yeetedKeys);
    return yeetedKeys.length > 0;
  }

  function cancelActiveDeferreds(predicate) {
    var cancelledRouteIds = [];
    activeDeferreds.forEach(function (dfd, routeId) {
      if (!predicate || predicate(routeId)) {
        // Cancel the deferred - but do not remove from activeDeferreds here -
        // we rely on the subscribers to do that so our tests can assert proper
        // cleanup via _internalActiveDeferreds
        dfd.cancel();
        cancelledRouteIds.push(routeId);
        activeDeferreds["delete"](routeId);
      }
    });
    return cancelledRouteIds;
  } // Opt in to capturing and reporting scroll positions during navigations,
  // used by the <ScrollRestoration> component


  function enableScrollRestoration(positions, getPosition, getKey) {
    savedScrollPositions = positions;
    getScrollPosition = getPosition;

    getScrollRestorationKey = getKey || function (location) {return location.key;}; // Perform initial hydration scroll restoration, since we miss the boat on
    // the initial updateState() because we've not yet rendered <ScrollRestoration/>
    // and therefore have no savedScrollPositions available


    if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = true;
      var y = getSavedScrollPosition(state.location, state.matches);

      if (y != null) {
        updateState({
          restoreScrollPosition: y
        });
      }
    }

    return function () {
      savedScrollPositions = null;
      getScrollPosition = null;
      getScrollRestorationKey = null;
    };
  }

  function saveScrollPosition(location, matches) {
    if (savedScrollPositions && getScrollRestorationKey && getScrollPosition) {
      var userMatches = matches.map(function (m) {return createUseMatchesMatch(m, state.loaderData);});
      var key = getScrollRestorationKey(location, userMatches) || location.key;
      savedScrollPositions[key] = getScrollPosition();
    }
  }

  function getSavedScrollPosition(location, matches) {
    if (savedScrollPositions && getScrollRestorationKey && getScrollPosition) {
      var userMatches = matches.map(function (m) {return createUseMatchesMatch(m, state.loaderData);});
      var key = getScrollRestorationKey(location, userMatches) || location.key;
      var y = savedScrollPositions[key];

      if (typeof y === "number") {
        return y;
      }
    }

    return null;
  }

  router = {
    get basename() {
      return init.basename;
    },

    get state() {
      return state;
    },

    get routes() {
      return dataRoutes;
    },

    initialize: initialize,
    subscribe: subscribe,
    enableScrollRestoration: enableScrollRestoration,
    navigate: navigate,
    fetch: fetch,
    revalidate: revalidate,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: function createHref(to) {return init.history.createHref(to);},
    getFetcher: getFetcher,
    deleteFetcher: deleteFetcher,
    dispose: dispose,
    _internalFetchControllers: fetchControllers,
    _internalActiveDeferreds: activeDeferreds
  };
  return router;
} //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region createStaticHandler
////////////////////////////////////////////////////////////////////////////////

var validActionMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);
var validRequestMethods = new Set(["GET", "HEAD"].concat(_toConsumableArray(validActionMethods)));
function unstable_createStaticHandler(routes) {
  router_invariant(routes.length > 0, "You must provide a non-empty routes array to unstable_createStaticHandler");
  var dataRoutes = convertRoutesToDataRoutes(routes);
  /**
   * The query() method is intended for document requests, in which we want to
   * call an optional action and potentially multiple loaders for all nested
   * routes.  It returns a StaticHandlerContext object, which is very similar
   * to the router state (location, loaderData, actionData, errors, etc.) and
   * also adds SSR-specific information such as the statusCode and headers
   * from action/loaders Responses.
   *
   * It _should_ never throw and should report all errors through the
   * returned context.errors object, properly associating errors to their error
   * boundary.  Additionally, it tracks _deepestRenderedBoundaryId which can be
   * used to emulate React error boundaries during SSr by performing a second
   * pass only down to the boundaryId.
   *
   * The one exception where we do not return a StaticHandlerContext is when a
   * redirect response is returned or thrown from any action/loader.  We
   * propagate that out and return the raw Response so the HTTP server can
   * return it directly.
   */function

  query(_x39) {return _query.apply(this, arguments);}























































  /**
   * The queryRoute() method is intended for targeted route requests, either
   * for fetch ?_data requests or resource route requests.  In this case, we
   * are only ever calling a single action or loader, and we are returning the
   * returned value directly.  In most cases, this will be a Response returned
   * from the action/loader, but it may be a primitive or other value as well -
   * and in such cases the calling context should handle that accordingly.
   *
   * We do respect the throw/return differentiation, so if an action/loader
   * throws, then this method will throw the value.  This is important so we
   * can do proper boundary identification in Remix where a thrown Response
   * must go to the Catch Boundary but a returned Response is happy-path.
   *
   * One thing to note is that any Router-initiated thrown Response (such as a
   * 404 or 405) will have a custom X-Remix-Router-Error: "yes" header on it
   * in order to differentiate from responses thrown from user actions/loaders.
   */function _query() {_query = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(request) {var url, location, matches, _getMethodNotAllowedM, methodNotAllowedMatches, route, error, _getNotFoundMatches3, notFoundMatches, _route2, _error3, result;return _regeneratorRuntime().wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:url = new URL(request.url);location = createLocation("", router_createPath(url), null, "default");matches = matchRoutes(dataRoutes, location);if (validRequestMethods.has(request.method)) {_context10.next = 8;break;}_getMethodNotAllowedM = getMethodNotAllowedMatches(dataRoutes), methodNotAllowedMatches = _getMethodNotAllowedM.matches, route = _getMethodNotAllowedM.route, error = _getMethodNotAllowedM.error;return _context10.abrupt("return", { location: location, matches: methodNotAllowedMatches, loaderData: {}, actionData: null, errors: _defineProperty({}, route.id, error), statusCode: error.status, loaderHeaders: {}, actionHeaders: {} });case 8:if (matches) {_context10.next = 11;break;}_getNotFoundMatches3 = getNotFoundMatches(dataRoutes), notFoundMatches = _getNotFoundMatches3.matches, _route2 = _getNotFoundMatches3.route, _error3 = _getNotFoundMatches3.error;return _context10.abrupt("return", { location: location, matches: notFoundMatches, loaderData: {}, actionData: null, errors: _defineProperty({}, _route2.id, _error3), statusCode: _error3.status, loaderHeaders: {}, actionHeaders: {} });case 11:_context10.next = 13;return queryImpl(request, location, matches);case 13:result = _context10.sent;if (!(result instanceof Response)) {_context10.next = 16;break;}return _context10.abrupt("return", result);case 16:return _context10.abrupt("return", _extends({ location: location }, result));case 17:case "end":return _context10.stop();}}}, _callee10);}));return _query.apply(this, arguments);}function


  queryRoute(_x40, _x41) {return _queryRoute.apply(this, arguments);}function _queryRoute() {_queryRoute = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(request, routeId) {var url, location, matches, match, result, error, routeData;return _regeneratorRuntime().wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:
              url = new URL(request.url);
              location = createLocation("", router_createPath(url), null, "default");
              matches = matchRoutes(dataRoutes, location);if (

              validRequestMethods.has(request.method)) {_context11.next = 7;break;}throw (
                createRouterErrorResponse(null, {
                  status: 405,
                  statusText: "Method Not Allowed"
                }));case 7:if (
              matches) {_context11.next = 9;break;}throw (
                createRouterErrorResponse(null, {
                  status: 404,
                  statusText: "Not Found"
                }));case 9:


              match = routeId ? matches.find(function (m) {return m.route.id === routeId;}) : getTargetMatch(matches, location);if (

              match) {_context11.next = 12;break;}throw (
                createRouterErrorResponse(null, {
                  status: 404,
                  statusText: "Not Found"
                }));case 12:_context11.next = 14;return (


                queryImpl(request, location, matches, match));case 14:result = _context11.sent;if (!(

              result instanceof Response)) {_context11.next = 17;break;}return _context11.abrupt("return",
              result);case 17:


              error = result.errors ? Object.values(result.errors)[0] : undefined;if (!(

              error !== undefined)) {_context11.next = 20;break;}throw (




                error);case 20:
              // Pick off the right state value to return


              routeData = [result.actionData, result.loaderData].find(function (v) {return v;});return _context11.abrupt("return",
              Object.values(routeData || {})[0]);case 22:case "end":return _context11.stop();}}}, _callee11);}));return _queryRoute.apply(this, arguments);}function


  queryImpl(_x42, _x43, _x44, _x45) {return _queryImpl.apply(this, arguments);}function _queryImpl() {_queryImpl = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(request, location, matches, routeMatch) {var _result, result;return _regeneratorRuntime().wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:
              router_invariant(request.signal, "query()/queryRoute() requests must contain an AbortController signal");_context12.prev = 1;if (!


              validActionMethods.has(request.method)) {_context12.next = 7;break;}_context12.next = 5;return (
                submit(request, matches, routeMatch || getTargetMatch(matches, location), routeMatch != null));case 5:_result = _context12.sent;return _context12.abrupt("return",
              _result);case 7:_context12.next = 9;return (


                loadRouteData(request, matches, routeMatch));case 9:result = _context12.sent;return _context12.abrupt("return",
              result instanceof Response ? result : _extends({}, result, {
                actionData: null,
                actionHeaders: {}
              }));case 13:_context12.prev = 13;_context12.t0 = _context12["catch"](1);if (!




              isQueryRouteResponse(_context12.t0)) {_context12.next = 19;break;}if (!(
              _context12.t0.type === ResultType.error && !isRedirectResponse(_context12.t0.response))) {_context12.next = 18;break;}throw (
                _context12.t0.response);case 18:return _context12.abrupt("return",


              _context12.t0.response);case 19:if (!




              isRedirectResponse(_context12.t0)) {_context12.next = 21;break;}return _context12.abrupt("return", _context12.t0);case 21:throw _context12.t0;case 22:case "end":return _context12.stop();}}}, _callee12, null, [[1, 13]]);}));return _queryImpl.apply(this, arguments);}function







  submit(_x46, _x47, _x48, _x49) {return _submit.apply(this, arguments);}function _submit() {_submit = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(request, matches, actionMatch, isRouteRequest) {var result, method, boundaryMatch, _boundaryMatch, _context13, context;return _regeneratorRuntime().wrap(function _callee13$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:if (


              actionMatch.route.action) {_context14.next = 6;break;}if (!
              isRouteRequest) {_context14.next = 3;break;}throw (
                createRouterErrorResponse(null, {
                  status: 405,
                  statusText: "Method Not Allowed"
                }));case 3:


              result = getMethodNotAllowedResult(request.url);_context14.next = 12;break;case 6:_context14.next = 8;return (

                callLoaderOrAction("action", request, actionMatch, matches, undefined, // Basename not currently supported in static handlers
                true, isRouteRequest));case 8:result = _context14.sent;if (!

              request.signal.aborted) {_context14.next = 12;break;}
              method = isRouteRequest ? "queryRoute" : "query";throw (
                new Error(method + "() call aborted"));case 12:if (!



              isRedirectResult(result)) {_context14.next = 14;break;}throw (




                new Response(null, {
                  status: result.status,
                  headers: {
                    Location: result.location
                  }
                }));case 14:if (!


              isDeferredResult(result)) {_context14.next = 16;break;}throw (
                new Error("defer() is not supported in actions"));case 16:if (!


              isRouteRequest) {_context14.next = 21;break;}if (!


              isErrorResult(result)) {_context14.next = 20;break;}
              boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);return _context14.abrupt("return",
              {
                matches: [actionMatch],
                loaderData: {},
                actionData: null,
                errors: _defineProperty({},
                boundaryMatch.route.id, result.error),

                // Note: statusCode + headers are unused here since queryRoute will
                // return the raw Response or value
                statusCode: 500,
                loaderHeaders: {},
                actionHeaders: {}
              });case 20:return _context14.abrupt("return",


              {
                matches: [actionMatch],
                loaderData: {},
                actionData: _defineProperty({},
                actionMatch.route.id, result.data),

                errors: null,
                // Note: statusCode + headers are unused here since queryRoute will
                // return the raw Response or value
                statusCode: 200,
                loaderHeaders: {},
                actionHeaders: {}
              });case 21:if (!


              isErrorResult(result)) {_context14.next = 27;break;}
              // Store off the pending error - we use it to determine which loaders
              // to call and will commit it when we complete the navigation
              _boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);_context14.next = 25;return (
                loadRouteData(request, matches, undefined, _defineProperty({},
                _boundaryMatch.route.id, result.error)));case 25:_context13 = _context14.sent;return _context14.abrupt("return",


              _extends({}, _context13, {
                statusCode: isRouteErrorResponse(result.error) ? result.error.status : 500,
                actionData: null,
                actionHeaders: _extends({}, result.headers ? _defineProperty({},
                actionMatch.route.id, result.headers) :
                {})
              }));case 27:_context14.next = 29;return (


                loadRouteData(request, matches));case 29:context = _context14.sent;return _context14.abrupt("return",
              _extends({}, context, result.statusCode ? {
                statusCode: result.statusCode
              } : {}, {
                actionData: _defineProperty({},
                actionMatch.route.id, result.data),

                actionHeaders: _extends({}, result.headers ? _defineProperty({},
                actionMatch.route.id, result.headers) :
                {})
              }));case 31:case "end":return _context14.stop();}}}, _callee13);}));return _submit.apply(this, arguments);}function


  loadRouteData(_x50, _x51, _x52, _x53) {return _loadRouteData.apply(this, arguments);}function _loadRouteData() {_loadRouteData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(request, matches, routeMatch, pendingActionError) {var isRouteRequest, requestMatches, matchesToLoad, results, method, context;return _regeneratorRuntime().wrap(function _callee14$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:
              isRouteRequest = routeMatch != null;
              requestMatches = routeMatch ? [routeMatch] : getLoaderMatchesUntilBoundary(matches, Object.keys(pendingActionError || {})[0]);
              matchesToLoad = requestMatches.filter(function (m) {return m.route.loader;}); // Short circuit if we have no loaders to run
              if (!(
              matchesToLoad.length === 0)) {_context15.next = 5;break;}return _context15.abrupt("return",
              {
                matches: matches,
                loaderData: {},
                errors: pendingActionError || null,
                statusCode: 200,
                loaderHeaders: {}
              });case 5:_context15.next = 7;return (


                Promise.all(_toConsumableArray(matchesToLoad.map(function (match) {return callLoaderOrAction("loader", request, match, matches, undefined, // Basename not currently supported in static handlers
                  true, isRouteRequest);}))));case 7:results = _context15.sent;if (!

              request.signal.aborted) {_context15.next = 11;break;}
              method = isRouteRequest ? "queryRoute" : "query";throw (
                new Error(method + "() call aborted"));case 11:
              // Can't do anything with these without the Remix side of things, so just
              // cancel them for now


              results.forEach(function (result) {
                if (isDeferredResult(result)) {
                  result.deferredData.cancel();
                }
              }); // Process and commit output from loaders

              context = processRouteLoaderData(matches, matchesToLoad, results, pendingActionError);return _context15.abrupt("return",
              _extends({}, context, {
                matches: matches
              }));case 14:case "end":return _context15.stop();}}}, _callee14);}));return _loadRouteData.apply(this, arguments);}


  function createRouterErrorResponse(body, init) {
    return new Response(body, _extends({}, init, {
      headers: _extends({}, init.headers, {
        "X-Remix-Router-Error": "yes"
      })
    }));
  }

  return {
    dataRoutes: dataRoutes,
    query: query,
    queryRoute: queryRoute
  };
} //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region Helpers
////////////////////////////////////////////////////////////////////////////////

/**
 * Given an existing StaticHandlerContext and an error thrown at render time,
 * provide an updated StaticHandlerContext suitable for a second SSR render
 */

function getStaticContextFromError(routes, context, error) {
  var newContext = _extends({}, context, {
    statusCode: 500,
    errors: _defineProperty({},
    context._deepestRenderedBoundaryId || routes[0].id, error)

  });

  return newContext;
} // Normalize navigation options by converting formMethod=GET formData objects to
// URLSearchParams so they behave identically to links with query params

function normalizeNavigateOptions(to, opts, isFetcher) {
  if (isFetcher === void 0) {
    isFetcher = false;
  }

  var path = typeof to === "string" ? to : router_createPath(to); // Return location verbatim on non-submission navigations

  if (!opts || !("formMethod" in opts) && !("formData" in opts)) {
    return {
      path: path
    };
  } // Create a Submission on non-GET navigations


  if (opts.formMethod != null && opts.formMethod !== "get") {
    return {
      path: path,
      submission: {
        formMethod: opts.formMethod,
        formAction: stripHashFromPath(path),
        formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
        formData: opts.formData
      }
    };
  } // No formData to flatten for GET submission


  if (!opts.formData) {
    return {
      path: path
    };
  } // Flatten submission onto URLSearchParams for GET submissions


  var parsedPath = parsePath(path);

  try {
    var searchParams = convertFormDataToSearchParams(opts.formData); // Since fetcher GET submissions only run a single loader (as opposed to
    // navigation GET submissions which run all loaders), we need to preserve
    // any incoming ?index params

    if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
      searchParams.append("index", "");
    }

    parsedPath.search = "?" + searchParams;
  } catch (e) {
    return {
      path: path,
      error: new ErrorResponse(400, "Bad Request", "Cannot submit binary form data using GET")
    };
  }

  return {
    path: router_createPath(parsedPath)
  };
}

function getLoaderRedirect(state, redirect) {
  var _state$navigation =




    state.navigation,formMethod = _state$navigation.formMethod,formAction = _state$navigation.formAction,formEncType = _state$navigation.formEncType,formData = _state$navigation.formData;
  var navigation = {
    state: "loading",
    location: createLocation(state.location, redirect.location),
    formMethod: formMethod || undefined,
    formAction: formAction || undefined,
    formEncType: formEncType || undefined,
    formData: formData || undefined
  };
  return navigation;
} // Filter out all routes below any caught error as they aren't going to
// render so we don't need to load them


function getLoaderMatchesUntilBoundary(matches, boundaryId) {
  var boundaryMatches = matches;

  if (boundaryId) {
    var index = matches.findIndex(function (m) {return m.route.id === boundaryId;});

    if (index >= 0) {
      boundaryMatches = matches.slice(0, index);
    }
  }

  return boundaryMatches;
}

function getMatchesToLoad(state, matches, submission, location, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, pendingActionData, pendingError, fetchLoadMatches) {
  var actionResult = pendingError ? Object.values(pendingError)[0] : pendingActionData ? Object.values(pendingActionData)[0] : null; // Pick navigation matches that are net-new or qualify for revalidation

  var boundaryId = pendingError ? Object.keys(pendingError)[0] : undefined;
  var boundaryMatches = getLoaderMatchesUntilBoundary(matches, boundaryId);
  var navigationMatches = boundaryMatches.filter(function (match, index) {return match.route.loader != null && (isNewLoader(state.loaderData, state.matches[index], match) || // If this route had a pending deferred cancelled it must be revalidated
    cancelledDeferredRoutes.some(function (id) {return id === match.route.id;}) || shouldRevalidateLoader(state.location, state.matches[index], submission, location, match, isRevalidationRequired, actionResult));}); // Pick fetcher.loads that need to be revalidated

  var revalidatingFetchers = [];
  fetchLoadMatches && fetchLoadMatches.forEach(function (_ref10, key) {
    var _ref24 = _slicedToArray(_ref10, 3),href = _ref24[0],match = _ref24[1],fetchMatches = _ref24[2];

    // This fetcher was cancelled from a prior action submission - force reload
    if (cancelledFetcherLoads.includes(key)) {
      revalidatingFetchers.push([key, href, match, fetchMatches]);
    } else if (isRevalidationRequired) {
      var shouldRevalidate = shouldRevalidateLoader(href, match, submission, href, match, isRevalidationRequired, actionResult);

      if (shouldRevalidate) {
        revalidatingFetchers.push([key, href, match, fetchMatches]);
      }
    }
  });
  return [navigationMatches, revalidatingFetchers];
}

function isNewLoader(currentLoaderData, currentMatch, match) {
  var isNew = // [a] -> [a, b]
  !currentMatch || // [a, b] -> [a, c]
  match.route.id !== currentMatch.route.id; // Handle the case that we don't have data for a re-used route, potentially
  // from a prior error or from a cancelled pending deferred

  var isMissingData = currentLoaderData[match.route.id] === undefined; // Always load if this is a net-new route or we don't yet have data

  return isNew || isMissingData;
}

function isNewRouteInstance(currentMatch, match) {
  var currentPath = currentMatch.route.path;
  return (// param change for this match, /users/123 -> /users/456
    currentMatch.pathname !== match.pathname || // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    currentPath && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]);

}

function shouldRevalidateLoader(currentLocation, currentMatch, submission, location, match, isRevalidationRequired, actionResult) {
  var currentUrl = createURL(currentLocation);
  var currentParams = currentMatch.params;
  var nextUrl = createURL(location);
  var nextParams = match.params; // This is the default implementation as to when we revalidate.  If the route
  // provides it's own implementation, then we give them full control but
  // provide this value so they can leverage it if needed after they check
  // their own specific use cases
  // Note that fetchers always provide the same current/next locations so the
  // URL-based checks here don't apply to fetcher shouldRevalidate calls

  var defaultShouldRevalidate = isNewRouteInstance(currentMatch, match) || // Clicked the same link, resubmitted a GET form
  currentUrl.toString() === nextUrl.toString() || // Search params affect all loaders
  currentUrl.search !== nextUrl.search || // Forced revalidation due to submission, useRevalidate, or X-Remix-Revalidate
  isRevalidationRequired;

  if (match.route.shouldRevalidate) {
    var routeChoice = match.route.shouldRevalidate(_extends({
      currentUrl: currentUrl,
      currentParams: currentParams,
      nextUrl: nextUrl,
      nextParams: nextParams
    }, submission, {
      actionResult: actionResult,
      defaultShouldRevalidate: defaultShouldRevalidate
    }));

    if (typeof routeChoice === "boolean") {
      return routeChoice;
    }
  }

  return defaultShouldRevalidate;
}function

callLoaderOrAction(_x54, _x55, _x56, _x57, _x58, _x59, _x60) {return _callLoaderOrAction.apply(this, arguments);}function _callLoaderOrAction() {_callLoaderOrAction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(type, request, match, matches, basename, isStaticRequest, isRouteRequest) {var resultType, result, reject, abortPromise, onReject, handler, status, location, activeMatches, routePathnames, requestPath, resolvedLocation, path, data, contentType;return _regeneratorRuntime().wrap(function _callee15$(_context16) {while (1) {switch (_context16.prev = _context16.next) {case 0:
            if (isStaticRequest === void 0) {
              isStaticRequest = false;
            }

            if (isRouteRequest === void 0) {
              isRouteRequest = false;
            }





            abortPromise = new Promise(function (_, r) {return reject = r;});

            onReject = function onReject() {return reject();};

            request.signal.addEventListener("abort", onReject);_context16.prev = 5;


            handler = match.route[type];
            router_invariant(handler, "Could not find the " + type + " to run on the \"" + match.route.id + "\" route");_context16.next = 10;return (
              Promise.race([handler({
                request: request,
                params: match.params
              }), abortPromise]));case 10:result = _context16.sent;_context16.next = 17;break;case 13:_context16.prev = 13;_context16.t0 = _context16["catch"](5);

            resultType = ResultType.error;
            result = _context16.t0;case 17:_context16.prev = 17;

            request.signal.removeEventListener("abort", onReject);return _context16.finish(17);case 20:if (!(


            result instanceof Response)) {_context16.next = 51;break;}
            status = result.status; // Process redirects
            if (!(
            status >= 300 && status <= 399)) {_context16.next = 36;break;}
            location = result.headers.get("Location");
            router_invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header"); // Support relative routing in redirects

            activeMatches = matches.slice(0, matches.indexOf(match) + 1);
            routePathnames = getPathContributingMatches(activeMatches).map(function (match) {return match.pathnameBase;});
            requestPath = createURL(request.url).pathname;
            resolvedLocation = resolveTo(location, routePathnames, requestPath);
            router_invariant(router_createPath(resolvedLocation), "Unable to resolve redirect location: " + result.headers.get("Location")); // Prepend the basename to the redirect location if we have one

            if (basename) {
              path = resolvedLocation.pathname;
              resolvedLocation.pathname = path === "/" ? basename : router_joinPaths([basename, path]);
            }

            location = router_createPath(resolvedLocation); // Don't process redirects in the router during static requests requests.
            // Instead, throw the Response and let the server handle it with an HTTP
            // redirect.  We also update the Location header in place in this flow so
            // basename and relative routing is taken into account
            if (!
            isStaticRequest) {_context16.next = 35;break;}
            result.headers.set("Location", location);throw (
              result);case 35:return _context16.abrupt("return",


            {
              type: ResultType.redirect,
              status: status,
              location: location,
              revalidate: result.headers.get("X-Remix-Revalidate") !== null
            });case 36:if (!





            isRouteRequest) {_context16.next = 38;break;}throw (

              {
                type: resultType || ResultType.data,
                response: result
              });case 38:



            contentType = result.headers.get("Content-Type");if (!(

            contentType && contentType.startsWith("application/json"))) {_context16.next = 45;break;}_context16.next = 42;return (
              result.json());case 42:data = _context16.sent;_context16.next = 48;break;case 45:_context16.next = 47;return (

              result.text());case 47:data = _context16.sent;case 48:if (!(


            resultType === ResultType.error)) {_context16.next = 50;break;}return _context16.abrupt("return",
            {
              type: resultType,
              error: new ErrorResponse(status, result.statusText, data),
              headers: result.headers
            });case 50:return _context16.abrupt("return",


            {
              type: ResultType.data,
              data: data,
              statusCode: result.status,
              headers: result.headers
            });case 51:if (!(


            resultType === ResultType.error)) {_context16.next = 53;break;}return _context16.abrupt("return",
            {
              type: resultType,
              error: result
            });case 53:if (!(


            result instanceof DeferredData)) {_context16.next = 55;break;}return _context16.abrupt("return",
            {
              type: ResultType.deferred,
              deferredData: result
            });case 55:return _context16.abrupt("return",


            {
              type: ResultType.data,
              data: result
            });case 56:case "end":return _context16.stop();}}}, _callee15, null, [[5, 13, 17, 20]]);}));return _callLoaderOrAction.apply(this, arguments);}


function createRequest(location, signal, submission) {
  var url = createURL(stripHashFromPath(location)).toString();
  var init = {
    signal: signal
  };

  if (submission) {
    var
      formMethod =


      submission.formMethod,formEncType = submission.formEncType,formData = submission.formData;
    init.method = formMethod.toUpperCase();
    init.body = formEncType === "application/x-www-form-urlencoded" ? convertFormDataToSearchParams(formData) : formData;
  } // Content-Type is inferred (https://fetch.spec.whatwg.org/#dom-request)


  return new Request(url, init);
}

function convertFormDataToSearchParams(formData) {
  var searchParams = new URLSearchParams();var _iterator4 = _createForOfIteratorHelper(

    formData.entries()),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _step4$value = _slicedToArray(_step4.value, 2),key = _step4$value[0],value = _step4$value[1];
      router_invariant(typeof value === "string", 'File inputs are not supported with encType "application/x-www-form-urlencoded", ' + 'please use "multipart/form-data" instead.');
      searchParams.append(key, value);
    }} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}

  return searchParams;
}

function processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds) {
  // Fill in loaderData/errors from our loaders
  var loaderData = {};
  var errors = null;
  var statusCode;
  var foundError = false;
  var loaderHeaders = {}; // Process loader results into state.loaderData/state.errors

  results.forEach(function (result, index) {
    var id = matchesToLoad[index].route.id;
    router_invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData");

    if (isErrorResult(result)) {
      // Look upwards from the matched route for the closest ancestor
      // error boundary, defaulting to the root match
      var boundaryMatch = findNearestBoundary(matches, id);
      var error = result.error; // If we have a pending action error, we report it at the highest-route
      // that throws a loader error, and then clear it out to indicate that
      // it was consumed

      if (pendingError) {
        error = Object.values(pendingError)[0];
        pendingError = undefined;
      }

      errors = Object.assign(errors || {}, _defineProperty({},
      boundaryMatch.route.id, error));
      // Once we find our first (highest) error, we set the status code and
      // prevent deeper status codes from overriding

      if (!foundError) {
        foundError = true;
        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
      }

      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    } else if (isDeferredResult(result)) {
      activeDeferreds && activeDeferreds.set(id, result.deferredData);
      loaderData[id] = result.deferredData.data; // TODO: Add statusCode/headers once we wire up streaming in Remix
    } else {
      loaderData[id] = result.data; // Error status codes always override success status codes, but if all
      // loaders are successful we take the deepest status code.

      if (result.statusCode != null && result.statusCode !== 200 && !foundError) {
        statusCode = result.statusCode;
      }

      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    }
  }); // If we didn't consume the pending action error (i.e., all loaders
  // resolved), then consume it here

  if (pendingError) {
    errors = pendingError;
  }

  return {
    loaderData: loaderData,
    errors: errors,
    statusCode: statusCode || 200,
    loaderHeaders: loaderHeaders
  };
}

function processLoaderData(state, matches, matchesToLoad, results, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds) {
  var _processRouteLoaderDa =


    processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds),loaderData = _processRouteLoaderDa.loaderData,errors = _processRouteLoaderDa.errors; // Process results from our revalidating fetchers

  for (var index = 0; index < revalidatingFetchers.length; index++) {
    var _revalidatingFetchers = _slicedToArray(revalidatingFetchers[index], 3),key = _revalidatingFetchers[0],match = _revalidatingFetchers[2];
    router_invariant(fetcherResults !== undefined && fetcherResults[index] !== undefined, "Did not find corresponding fetcher result");
    var result = fetcherResults[index]; // Process fetcher non-redirect errors

    if (isErrorResult(result)) {
      var boundaryMatch = findNearestBoundary(state.matches, match.route.id);

      if (!(errors && errors[boundaryMatch.route.id])) {
        errors = _extends({}, errors, _defineProperty({},
        boundaryMatch.route.id, result.error));

      }

      state.fetchers["delete"](key);
    } else if (isRedirectResult(result)) {
      // Should never get here, redirects should get processed above, but we
      // keep this to type narrow to a success result in the else
      throw new Error("Unhandled fetcher revalidation redirect");
    } else if (isDeferredResult(result)) {
      // Should never get here, deferred data should be awaited for fetchers
      // in resolveDeferredResults
      throw new Error("Unhandled fetcher deferred data");
    } else {
      var doneFetcher = {
        state: "idle",
        data: result.data,
        formMethod: undefined,
        formAction: undefined,
        formEncType: undefined,
        formData: undefined
      };
      state.fetchers.set(key, doneFetcher);
    }
  }

  return {
    loaderData: loaderData,
    errors: errors
  };
}

function mergeLoaderData(loaderData, newLoaderData, matches) {
  var mergedLoaderData = _extends({}, newLoaderData);

  matches.forEach(function (match) {
    var id = match.route.id;

    if (newLoaderData[id] === undefined && loaderData[id] !== undefined) {
      mergedLoaderData[id] = loaderData[id];
    }
  });
  return mergedLoaderData;
} // Find the nearest error boundary, looking upwards from the leaf route (or the
// route specified by routeId) for the closest ancestor error boundary,
// defaulting to the root match


function findNearestBoundary(matches, routeId) {
  var eligibleMatches = routeId ? matches.slice(0, matches.findIndex(function (m) {return m.route.id === routeId;}) + 1) : _toConsumableArray(matches);
  return eligibleMatches.reverse().find(function (m) {return m.route.hasErrorBoundary === true;}) || matches[0];
}

function getShortCircuitMatches(routes, status, statusText) {
  // Prefer a root layout route if present, otherwise shim in a route object
  var route = routes.find(function (r) {return r.index || !r.path || r.path === "/";}) || {
    id: "__shim-" + status + "-route__"
  };
  return {
    matches: [{
      params: {},
      pathname: "",
      pathnameBase: "",
      route: route
    }],
    route: route,
    error: new ErrorResponse(status, statusText, null)
  };
}

function getNotFoundMatches(routes) {
  return getShortCircuitMatches(routes, 404, "Not Found");
}

function getMethodNotAllowedMatches(routes) {
  return getShortCircuitMatches(routes, 405, "Method Not Allowed");
}

function getMethodNotAllowedResult(path) {
  var href = typeof path === "string" ? path : router_createPath(path);
  console.warn("You're trying to submit to a route that does not have an action.  To " + "fix this, please add an `action` function to the route for " + ("[" + href + "]"));
  return {
    type: ResultType.error,
    error: new ErrorResponse(405, "Method Not Allowed", "")
  };
} // Find any returned redirect errors, starting from the lowest match


function findRedirect(results) {
  for (var i = results.length - 1; i >= 0; i--) {
    var result = results[i];

    if (isRedirectResult(result)) {
      return result;
    }
  }
}

function stripHashFromPath(path) {
  var parsedPath = typeof path === "string" ? parsePath(path) : path;
  return router_createPath(_extends({}, parsedPath, {
    hash: ""
  }));
}

function isHashChangeOnly(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash !== b.hash;
}

function isDeferredResult(result) {
  return result.type === ResultType.deferred;
}

function isErrorResult(result) {
  return result.type === ResultType.error;
}

function isRedirectResult(result) {
  return (result && result.type) === ResultType.redirect;
}

function isRedirectResponse(result) {
  if (!(result instanceof Response)) {
    return false;
  }

  var status = result.status;
  var location = result.headers.get("Location");
  return status >= 300 && status <= 399 && location != null;
}

function isQueryRouteResponse(obj) {
  return obj && obj.response instanceof Response && (obj.type === ResultType.data || ResultType.error);
}function

resolveDeferredResults(_x61, _x62, _x63, _x64, _x65, _x66) {return _resolveDeferredResults.apply(this, arguments);}function _resolveDeferredResults() {_resolveDeferredResults = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(currentMatches, matchesToLoad, results, signal, isFetcher, currentLoaderData) {var _loop, index;return _regeneratorRuntime().wrap(function _callee16$(_context18) {while (1) {switch (_context18.prev = _context18.next) {case 0:_loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop(
            index) {var result, match, currentMatch, isRevalidatingLoader;return _regeneratorRuntime().wrap(function _loop$(_context17) {while (1) {switch (_context17.prev = _context17.next) {case 0:
                      result = results[index];
                      match = matchesToLoad[index];
                      currentMatch = currentMatches.find(function (m) {return m.route.id === match.route.id;});
                      isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match) && (currentLoaderData && currentLoaderData[match.route.id]) !== undefined;if (!(

                      isDeferredResult(result) && (isFetcher || isRevalidatingLoader))) {_context17.next = 7;break;}_context17.next = 7;return (



                        resolveDeferredData(result, signal, isFetcher).then(function (result) {
                          if (result) {
                            results[index] = result || results[index];
                          }
                        }));case 7:case "end":return _context17.stop();}}}, _loop);});index = 0;case 2:if (!(index < results.length)) {_context18.next = 7;break;}return _context18.delegateYield(_loop(index), "t0", 4);case 4:index++;_context18.next = 2;break;case 7:case "end":return _context18.stop();}}}, _callee16);}));return _resolveDeferredResults.apply(this, arguments);}function




resolveDeferredData(_x67, _x68, _x69) {return _resolveDeferredData.apply(this, arguments);}function _resolveDeferredData() {_resolveDeferredData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(result, signal, unwrap) {var aborted;return _regeneratorRuntime().wrap(function _callee17$(_context19) {while (1) {switch (_context19.prev = _context19.next) {case 0:
            if (unwrap === void 0) {
              unwrap = false;
            }_context19.next = 3;return (

              result.deferredData.resolveData(signal));case 3:aborted = _context19.sent;if (!

            aborted) {_context19.next = 6;break;}return _context19.abrupt("return");case 6:if (!



            unwrap) {_context19.next = 14;break;}_context19.prev = 7;return _context19.abrupt("return",

            {
              type: ResultType.data,
              data: result.deferredData.unwrappedData
            });case 11:_context19.prev = 11;_context19.t0 = _context19["catch"](7);return _context19.abrupt("return",


            {
              type: ResultType.error,
              error: _context19.t0
            });case 14:return _context19.abrupt("return",



            {
              type: ResultType.data,
              data: result.deferredData.data
            });case 15:case "end":return _context19.stop();}}}, _callee17, null, [[7, 11]]);}));return _resolveDeferredData.apply(this, arguments);}


function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some(function (v) {return v === "";});
} // Note: This should match the format exported by useMatches, so if you change
// this please also change that :)  Eventually we'll DRY this up


function createUseMatchesMatch(match, loaderData) {
  var
    route =


    match.route,pathname = match.pathname,params = match.params;
  return {
    id: route.id,
    pathname: pathname,
    params: params,
    data: loaderData[route.id],
    handle: route.handle
  };
}

function getTargetMatch(matches, location) {
  var search = typeof location === "string" ? parsePath(location).search : location.search;

  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
    // Return the leaf index route when index is present
    return matches[matches.length - 1];
  } // Otherwise grab the deepest "path contributing" match (ignoring index and
  // pathless layout routes)


  var pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
} //#endregion


;// CONCATENATED MODULE: ./node_modules/react-router/dist/index.js
function dist_typeof(obj) {"@babel/helpers - typeof";return dist_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {return typeof obj;} : function (obj) {return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}, dist_typeof(obj);}function dist_toConsumableArray(arr) {return dist_arrayWithoutHoles(arr) || dist_iterableToArray(arr) || dist_unsupportedIterableToArray(arr) || dist_nonIterableSpread();}function dist_nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function dist_iterableToArray(iter) {if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);}function dist_arrayWithoutHoles(arr) {if (Array.isArray(arr)) return dist_arrayLikeToArray(arr);}function dist_classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function dist_defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function dist_createClass(Constructor, protoProps, staticProps) {if (protoProps) dist_defineProperties(Constructor.prototype, protoProps);if (staticProps) dist_defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function dist_inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) dist_setPrototypeOf(subClass, superClass);}function dist_setPrototypeOf(o, p) {dist_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return dist_setPrototypeOf(o, p);}function dist_createSuper(Derived) {var hasNativeReflectConstruct = dist_isNativeReflectConstruct();return function _createSuperInternal() {var Super = dist_getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = dist_getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return dist_possibleConstructorReturn(this, result);};}function dist_possibleConstructorReturn(self, call) {if (call && (dist_typeof(call) === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return dist_assertThisInitialized(self);}function dist_assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function dist_isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function dist_getPrototypeOf(o) {dist_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return dist_getPrototypeOf(o);}function dist_slicedToArray(arr, i) {return dist_arrayWithHoles(arr) || dist_iterableToArrayLimit(arr, i) || dist_unsupportedIterableToArray(arr, i) || dist_nonIterableRest();}function dist_nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function dist_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return dist_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return dist_arrayLikeToArray(o, minLen);}function dist_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function dist_iterableToArrayLimit(arr, i) {var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];if (_i == null) return;var _arr = [];var _n = true;var _d = false;var _s, _e;try {for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function dist_arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;} /**
* React Router v6.4.3
*
* Copyright (c) Remix Software Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE.md file in the root directory of this source tree.
*
* @license MIT
*/




function dist_extends() {
  dist_extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return dist_extends.apply(this, arguments);
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */

function isPolyfill(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

var is = typeof Object.is === "function" ? Object.is : isPolyfill; // Intentionally not using named imports because Rollup uses dynamic
// dispatch for CommonJS interop named imports.

var
  useState =



  react.useState,useEffect = react.useEffect,useLayoutEffect = react.useLayoutEffect,useDebugValue = react.useDebugValue;
var didWarnOld18Alpha = false;
var didWarnUncachedGetSnapshot = false; // Disclaimer: This shim breaks many of the rules of React, and only works
// because of a very particular set of implementation details and assumptions
// -- change any one of them and it will break. The most important assumption
// is that updates are always synchronous, because concurrent rendering is
// only available in versions of React that also have a built-in
// useSyncExternalStore API. And we only use this shim when the built-in API
// does not exist.
//
// Do not assume that the clever hacks used by this hook also work in general.
// The point of this shim is to replace the need for hacks by other libraries.

function useSyncExternalStore$2(subscribe, getSnapshot, // Note: The shim does not use getServerSnapshot, because pre-18 versions of
// React do not expose a way to check if we're hydrating. So users of the shim
// will need to track that themselves and return the correct value
// from `getSnapshot`.
getServerSnapshot) {
  if (false) {} // Read the current snapshot from the store on every render. Again, this
  // breaks the rules of React, and only works here because of specific
  // implementation details, most importantly that updates are
  // always synchronous.


  var value = getSnapshot();

  if (false) { var cachedValue; } // Because updates are synchronous, we don't queue them. Instead we force a
  // re-render whenever the subscribed state changes by updating an some
  // arbitrary useState hook. Then, during render, we call getSnapshot to read
  // the current value.
  //
  // Because we don't actually use the state returned by the useState hook, we
  // can save a bit of memory by storing other stuff in that slot.
  //
  // To implement the early bailout, we need to track some things on a mutable
  // object. Usually, we would put that in a useRef hook, but we can stash it in
  // our useState hook instead.
  //
  // To force a re-render, we call forceUpdate({inst}). That works because the
  // new object always fails an equality check.


  var _useState =

    useState({
      inst: {
        value: value,
        getSnapshot: getSnapshot
      }
    }),_useState2 = dist_slicedToArray(_useState, 2),inst = _useState2[0].inst,forceUpdate = _useState2[1]; // Track the latest getSnapshot function with a ref. This needs to be updated
  // in the layout phase so we can access it during the tearing check that
  // happens on subscribe.

  useLayoutEffect(function () {
    inst.value = value;
    inst.getSnapshot = getSnapshot; // Whenever getSnapshot or subscribe changes, we need to check in the
    // commit phase if there was an interleaved mutation. In concurrent mode
    // this can happen all the time, but even in synchronous mode, an earlier
    // effect may have mutated the store.

    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst: inst
      });
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [subscribe, value, getSnapshot]);
  useEffect(function () {
    // Check for changes right before subscribing. Subsequent changes will be
    // detected in the subscription handler.
    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst: inst
      });
    }

    var handleStoreChange = function handleStoreChange() {
      // TODO: Because there is no cross-renderer API for batching updates, it's
      // up to the consumer of this library to wrap their subscription event
      // with unstable_batchedUpdates. Should we try to detect when this isn't
      // the case and print a warning in development?
      // The store changed. Check if the snapshot changed since the last time we
      // read from the store.
      if (checkIfSnapshotChanged(inst)) {
        // Force a re-render.
        forceUpdate({
          inst: inst
        });
      }
    }; // Subscribe to the store and return a clean-up function.


    return subscribe(handleStoreChange); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribe]);
  useDebugValue(value);
  return value;
}

function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  var prevValue = inst.value;

  try {
    var nextValue = latestGetSnapshot();
    return !is(prevValue, nextValue);
  } catch (error) {
    return true;
  }
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */
function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
  // Note: The shim does not use getServerSnapshot, because pre-18 versions of
  // React do not expose a way to check if we're hydrating. So users of the shim
  // will need to track that themselves and return the correct value
  // from `getSnapshot`.
  return getSnapshot();
}

/**
 * Inlined into the react-router repo since use-sync-external-store does not
 * provide a UMD-compatible package, so we need this to be able to distribute
 * UMD react-router bundles
 */
var canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
var isServerEnvironment = !canUseDOM;
var shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore$2;
var useSyncExternalStore =  true ? function (module) {return module.useSyncExternalStore;}(react_namespaceObject) : shim;

// Contexts for data routers
var DataStaticRouterContext = /*#__PURE__*/react.createContext(null);

if (false) {}

var DataRouterContext = /*#__PURE__*/react.createContext(null);

if (false) {}

var DataRouterStateContext = /*#__PURE__*/react.createContext(null);

if (false) {}

var AwaitContext = /*#__PURE__*/react.createContext(null);

if (false) {}

var NavigationContext = /*#__PURE__*/react.createContext(null);

if (false) {}

var LocationContext = /*#__PURE__*/react.createContext(null);

if (false) {}

var RouteContext = /*#__PURE__*/react.createContext({
  outlet: null,
  matches: []
});

if (false) {}

var RouteErrorContext = /*#__PURE__*/react.createContext(null);

if (false) {}

/**
 * Returns the full href for the given "to" value. This is useful for building
 * custom links that are also accessible and preserve right-click behavior.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-href
 */

function useHref(to, _temp) {
  var _ref8 =

    _temp === void 0 ? {} : _temp,relative = _ref8.relative;
  !useInRouterContext() ?  false ? 0 : router_invariant(false) : void 0;
  var _React$useContext =


    react.useContext(NavigationContext),basename = _React$useContext.basename,navigator = _React$useContext.navigator;
  var _useResolvedPath =



    dist_useResolvedPath(to, {
      relative: relative
    }),hash = _useResolvedPath.hash,pathname = _useResolvedPath.pathname,search = _useResolvedPath.search;
  var joinedPathname = pathname; // If we're operating within a basename, prepend it to the pathname prior
  // to creating the href.  If this is a root navigation, then just use the raw
  // basename which allows the basename to have full control over the presence
  // of a trailing slash on root links

  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : router_joinPaths([basename, pathname]);
  }

  return navigator.createHref({
    pathname: joinedPathname,
    search: search,
    hash: hash
  });
}
/**
 * Returns true if this component is a descendant of a <Router>.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-in-router-context
 */

function useInRouterContext() {
  return react.useContext(LocationContext) != null;
}
/**
 * Returns the current location object, which represents the current URL in web
 * browsers.
 *
 * Note: If you're using this it may mean you're doing some of your own
 * "routing" in your app, and we'd like to know what your use case is. We may
 * be able to provide something higher-level to better suit your needs.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-location
 */

function dist_useLocation() {
  !useInRouterContext() ?  false ? 0 : router_invariant(false) : void 0;
  return react.useContext(LocationContext).location;
}
/**
 * Returns the current navigation action which describes how the router came to
 * the current location, either by a pop, push, or replace on the history stack.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-navigation-type
 */

function useNavigationType() {
  return React.useContext(LocationContext).navigationType;
}
/**
 * Returns true if the URL for the given "to" value matches the current URL.
 * This is useful for components that need to know "active" state, e.g.
 * <NavLink>.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-match
 */

function useMatch(pattern) {
  !useInRouterContext() ?  false ? 0 : invariant(false) : void 0;
  var _useLocation =

    dist_useLocation(),pathname = _useLocation.pathname;
  return React.useMemo(function () {return matchPath(pattern, pathname);}, [pathname, pattern]);
}
/**
 * The interface for the navigate() function returned from useNavigate().
 */

/**
 * Returns an imperative method for changing the location. Used by <Link>s, but
 * may also be used by other elements to change the location.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-navigate
 */
function dist_useNavigate() {
  !useInRouterContext() ?  false ? 0 : router_invariant(false) : void 0;
  var _React$useContext2 =


    react.useContext(NavigationContext),basename = _React$useContext2.basename,navigator = _React$useContext2.navigator;
  var _React$useContext3 =

    react.useContext(RouteContext),matches = _React$useContext3.matches;
  var _useLocation2 =

    dist_useLocation(),locationPathname = _useLocation2.pathname;
  var routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map(function (match) {return match.pathnameBase;}));
  var activeRef = react.useRef(false);
  react.useEffect(function () {
    activeRef.current = true;
  });
  var navigate = react.useCallback(function (to, options) {
    if (options === void 0) {
      options = {};
    }

     false ? 0 : void 0;
    if (!activeRef.current) return;

    if (typeof to === "number") {
      navigator.go(to);
      return;
    }

    var path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path"); // If we're operating within a basename, prepend it to the pathname prior
    // to handing off to history.  If this is a root navigation, then we
    // navigate to the raw basename which allows the basename to have full
    // control over the presence of a trailing slash on root links

    if (basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : router_joinPaths([basename, path.pathname]);
    }

    (!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
  }, [basename, navigator, routePathnamesJson, locationPathname]);
  return navigate;
}
var OutletContext = /*#__PURE__*/react.createContext(null);
/**
 * Returns the context (if provided) for the child route at this level of the route
 * hierarchy.
 * @see https://reactrouter.com/docs/en/v6/hooks/use-outlet-context
 */

function useOutletContext() {
  return React.useContext(OutletContext);
}
/**
 * Returns the element for the child route at this level of the route
 * hierarchy. Used internally by <Outlet> to render child routes.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-outlet
 */

function useOutlet(context) {
  var outlet = react.useContext(RouteContext).outlet;

  if (outlet) {
    return /*#__PURE__*/react.createElement(OutletContext.Provider, {
      value: context
    }, outlet);
  }

  return outlet;
}
/**
 * Returns an object of key/value pairs of the dynamic params from the current
 * URL that were matched by the route path.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-params
 */

function useParams() {
  var _React$useContext4 =

    React.useContext(RouteContext),matches = _React$useContext4.matches;
  var routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
/**
 * Resolves the pathname of the given `to` value against the current location.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-resolved-path
 */

function dist_useResolvedPath(to, _temp2) {
  var _ref9 =

    _temp2 === void 0 ? {} : _temp2,relative = _ref9.relative;
  var _React$useContext5 =

    react.useContext(RouteContext),matches = _React$useContext5.matches;
  var _useLocation3 =

    dist_useLocation(),locationPathname = _useLocation3.pathname;
  var routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map(function (match) {return match.pathnameBase;}));
  return react.useMemo(function () {return resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path");}, [to, routePathnamesJson, locationPathname, relative]);
}
/**
 * Returns the element of the route that matched the current location, prepared
 * with the correct context to render the remainder of the route tree. Route
 * elements in the tree must render an <Outlet> to render their child route's
 * element.
 *
 * @see https://reactrouter.com/docs/en/v6/hooks/use-routes
 */

function useRoutes(routes, locationArg) {
  !useInRouterContext() ?  false ? 0 : router_invariant(false) : void 0;
  var dataRouterStateContext = react.useContext(DataRouterStateContext);
  var _React$useContext6 =

    react.useContext(RouteContext),parentMatches = _React$useContext6.matches;
  var routeMatch = parentMatches[parentMatches.length - 1];
  var parentParams = routeMatch ? routeMatch.params : {};
  var parentPathname = routeMatch ? routeMatch.pathname : "/";
  var parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  var parentRoute = routeMatch && routeMatch.route;

  if (false) { var parentPath; }

  var locationFromContext = dist_useLocation();
  var location;

  if (locationArg) {
    var _parsedLocationArg$pa;

    var parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ?  false ? 0 : router_invariant(false) : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }

  var pathname = location.pathname || "/";
  var remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/";
  var matches = matchRoutes(routes, {
    pathname: remainingPathname
  });

  if (false) {}

  var renderedMatches = _renderMatches(matches && matches.map(function (match) {return Object.assign({}, match, {
      params: Object.assign({}, parentParams, match.params),
      pathname: router_joinPaths([parentPathnameBase, match.pathname]),
      pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : router_joinPaths([parentPathnameBase, match.pathnameBase])
    });}), parentMatches, dataRouterStateContext || undefined); // When a user passes in a `locationArg`, the associated routes need to
  // be wrapped in a new `LocationContext.Provider` in order for `useLocation`
  // to use the scoped location instead of the global location.


  if (locationArg && renderedMatches) {
    return /*#__PURE__*/react.createElement(LocationContext.Provider, {
      value: {
        location: dist_extends({
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default"
        }, location),
        navigationType: Action.Pop
      }
    }, renderedMatches);
  }

  return renderedMatches;
}

function DefaultErrorElement() {
  var error = useRouteError();
  var message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  var stack = error instanceof Error ? error.stack : null;
  var lightgrey = "rgba(200,200,200, 0.5)";
  var preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  var codeStyles = {
    padding: "2px 4px",
    backgroundColor: lightgrey
  };
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("h2", null, "Unhandled Thrown Error!"), /*#__PURE__*/react.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /*#__PURE__*/react.createElement("pre", {
    style: preStyles
  }, stack) : null, /*#__PURE__*/react.createElement("p", null, "\uD83D\uDCBF Hey developer \uD83D\uDC4B"), /*#__PURE__*/react.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own\xA0", /*#__PURE__*/react.createElement("code", {
    style: codeStyles
  }, "errorElement"), " props on\xA0", /*#__PURE__*/react.createElement("code", {
    style: codeStyles
  }, "<Route>")));
}var

RenderErrorBoundary = /*#__PURE__*/function (_React$Component) {dist_inherits(RenderErrorBoundary, _React$Component);var _super = dist_createSuper(RenderErrorBoundary);
  function RenderErrorBoundary(props) {var _this;dist_classCallCheck(this, RenderErrorBoundary);
    _this = _super.call(this, props);
    _this.state = {
      location: props.location,
      error: props.error
    };return _this;
  }dist_createClass(RenderErrorBoundary, [{ key: "componentDidCatch", value:

































    function componentDidCatch(error, errorInfo) {
      console.error("React Router caught the following error during render", error, errorInfo);
    } }, { key: "render", value:

    function render() {
      return this.state.error ? /*#__PURE__*/react.createElement(RouteErrorContext.Provider, {
        value: this.state.error,
        children: this.props.component
      }) : this.props.children;
    } }], [{ key: "getDerivedStateFromError", value: function getDerivedStateFromError(error) {return { error: error };} }, { key: "getDerivedStateFromProps", value: function getDerivedStateFromProps(props, state) {// When we get into an error state, the user will likely click "back" to the
      // previous page that didn't have an error. Because this wraps the entire
      // application, that will have no effect--the error page continues to display.
      // This gives us a mechanism to recover from the error when the location changes.
      //
      // Whether we're in an error state or not, we update the location in state
      // so that when we are in an error state, it gets reset when a new location
      // comes in and the user recovers from the error.
      if (state.location !== props.location) {return { error: props.error, location: props.location };} // If we're not changing locations, preserve the location but still surface
      // any new errors that may come through. We retain the existing error, we do
      // this because the error provided from the app state may be cleared without
      // the location changing.
      return { error: props.error || state.error, location: state.location };} }]);return RenderErrorBoundary;}(react.Component);function RenderedRoute(_ref) {var routeContext = _ref.routeContext,match = _ref.match,children = _ref.children;var dataStaticRouterContext = react.useContext(DataStaticRouterContext); // Track how deep we got in our render pass to emulate SSR componentDidCatch
  // in a DataStaticRouter
  if (dataStaticRouterContext && match.route.errorElement) {dataStaticRouterContext._deepestRenderedBoundaryId = match.route.id;
  }

  return /*#__PURE__*/react.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}

function _renderMatches(matches, parentMatches, dataRouterState) {
  if (parentMatches === void 0) {
    parentMatches = [];
  }

  if (matches == null) {
    if (dataRouterState != null && dataRouterState.errors) {
      // Don't bail if we have data router errors so we can render them in the
      // boundary.  Use the pre-matched (or shimmed) matches
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }

  var renderedMatches = matches; // If we have data errors, trim matches to the highest error boundary

  var errors = dataRouterState == null ? void 0 : dataRouterState.errors;

  if (errors != null) {
    var errorIndex = renderedMatches.findIndex(function (m) {return m.route.id && (errors == null ? void 0 : errors[m.route.id]);});
    !(errorIndex >= 0) ?  false ? 0 : router_invariant(false) : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }

  return renderedMatches.reduceRight(function (outlet, match, index) {
    var error = match.route.id ? errors == null ? void 0 : errors[match.route.id] : null; // Only data routers handle errors

    var errorElement = dataRouterState ? match.route.errorElement || /*#__PURE__*/react.createElement(DefaultErrorElement, null) : null;

    var getChildren = function getChildren() {return /*#__PURE__*/react.createElement(RenderedRoute, {
        match: match,
        routeContext: {
          outlet: outlet,
          matches: parentMatches.concat(renderedMatches.slice(0, index + 1))
        }
      }, error ? errorElement : match.route.element !== undefined ? match.route.element : outlet);}; // Only wrap in an error boundary within data router usages when we have an
    // errorElement on this route.  Otherwise let it bubble up to an ancestor
    // errorElement


    return dataRouterState && (match.route.errorElement || index === 0) ? /*#__PURE__*/react.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      component: errorElement,
      error: error,
      children: getChildren()
    }) : getChildren();
  }, null);
}
var DataRouterHook;

(function (DataRouterHook) {
  DataRouterHook["UseRevalidator"] = "useRevalidator";
})(DataRouterHook || (DataRouterHook = {}));

var DataRouterStateHook;

(function (DataRouterStateHook) {
  DataRouterStateHook["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook["UseActionData"] = "useActionData";
  DataRouterStateHook["UseRouteError"] = "useRouteError";
  DataRouterStateHook["UseNavigation"] = "useNavigation";
  DataRouterStateHook["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook["UseMatches"] = "useMatches";
  DataRouterStateHook["UseRevalidator"] = "useRevalidator";
})(DataRouterStateHook || (DataRouterStateHook = {}));

function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.";
}

function useDataRouterContext(hookName) {
  var ctx = React.useContext(DataRouterContext);
  !ctx ?  false ? 0 : invariant(false) : void 0;
  return ctx;
}

function useDataRouterState(hookName) {
  var state = react.useContext(DataRouterStateContext);
  !state ?  false ? 0 : router_invariant(false) : void 0;
  return state;
}
/**
 * Returns the current navigation, defaulting to an "idle" navigation when
 * no navigation is in progress
 */


function dist_useNavigation() {
  var state = useDataRouterState(DataRouterStateHook.UseNavigation);
  return state.navigation;
}
/**
 * Returns a revalidate function for manually triggering revalidation, as well
 * as the current state of any manual revalidations
 */

function useRevalidator() {
  var dataRouterContext = useDataRouterContext(DataRouterHook.UseRevalidator);
  var state = useDataRouterState(DataRouterStateHook.UseRevalidator);
  return {
    revalidate: dataRouterContext.router.revalidate,
    state: state.revalidation
  };
}
/**
 * Returns the active route matches, useful for accessing loaderData for
 * parent/child routes or the route "handle" property
 */

function dist_useMatches() {
  var _useDataRouterState =


    useDataRouterState(DataRouterStateHook.UseMatches),matches = _useDataRouterState.matches,loaderData = _useDataRouterState.loaderData;
  return React.useMemo(function () {return matches.map(function (match) {
      var
        pathname =

        match.pathname,params = match.params; // Note: This structure matches that created by createUseMatchesMatch
      // in the @remix-run/router , so if you change this please also change
      // that :)  Eventually we'll DRY this up

      return {
        id: match.route.id,
        pathname: pathname,
        params: params,
        data: loaderData[match.route.id],
        handle: match.route.handle
      };
    });}, [matches, loaderData]);
}
/**
 * Returns the loader data for the nearest ancestor Route loader
 */

function useLoaderData() {
  var state = useDataRouterState(DataRouterStateHook.UseLoaderData);
  var route = React.useContext(RouteContext);
  !route ?  false ? 0 : invariant(false) : void 0;
  var thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ?  false ? 0 : invariant(false) : void 0;
  return state.loaderData[thisRoute.route.id];
}
/**
 * Returns the loaderData for the given routeId
 */

function useRouteLoaderData(routeId) {
  var state = useDataRouterState(DataRouterStateHook.UseRouteLoaderData);
  return state.loaderData[routeId];
}
/**
 * Returns the action data for the nearest ancestor Route action
 */

function useActionData() {
  var state = useDataRouterState(DataRouterStateHook.UseActionData);
  var route = React.useContext(RouteContext);
  !route ?  false ? 0 : invariant(false) : void 0;
  return Object.values((state == null ? void 0 : state.actionData) || {})[0];
}
/**
 * Returns the nearest ancestor Route error, which could be a loader/action
 * error or a render error.  This is intended to be called from your
 * errorElement to display a proper error message.
 */

function useRouteError() {
  var _state$errors;

  var error = react.useContext(RouteErrorContext);
  var state = useDataRouterState(DataRouterStateHook.UseRouteError);
  var route = react.useContext(RouteContext);
  var thisRoute = route.matches[route.matches.length - 1]; // If this was a render error, we put it in a RouteError context inside
  // of RenderErrorBoundary

  if (error) {
    return error;
  }

  !route ?  false ? 0 : router_invariant(false) : void 0;
  !thisRoute.route.id ?  false ? 0 : router_invariant(false) : void 0; // Otherwise look for errors from our data router state

  return (_state$errors = state.errors) == null ? void 0 : _state$errors[thisRoute.route.id];
}
/**
 * Returns the happy-path data from the nearest ancestor <Await /> value
 */

function useAsyncValue() {
  var value = React.useContext(AwaitContext);
  return value == null ? void 0 : value._data;
}
/**
 * Returns the error from the nearest ancestor <Await /> value
 */

function useAsyncError() {
  var value = React.useContext(AwaitContext);
  return value == null ? void 0 : value._error;
}
var alreadyWarned = {};

function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
     false ? 0 : void 0;
  }
}

/**
 * Given a Remix Router instance, render the appropriate UI
 */
function RouterProvider(_ref) {
  var
    fallbackElement =

    _ref.fallbackElement,router = _ref.router;
  // Sync router state to our component state to force re-renders
  var state = useSyncExternalStore(router.subscribe, function () {return router.state;}, // We have to provide this so React@18 doesn't complain during hydration,
  // but we pass our serialized hydration data into the router so state here
  // is already synced with what the server saw
  function () {return router.state;});
  var navigator = React.useMemo(function () {
    return {
      createHref: router.createHref,
      go: function go(n) {return router.navigate(n);},
      push: function push(to, state, opts) {return router.navigate(to, {
          state: state,
          preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
        });},
      replace: function replace(to, state, opts) {return router.navigate(to, {
          replace: true,
          state: state,
          preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
        });}
    };
  }, [router]);
  var basename = router.basename || "/";
  return /*#__PURE__*/React.createElement(DataRouterContext.Provider, {
    value: {
      router: router,
      navigator: navigator,
      "static": false,
      // Do we need this?
      basename: basename
    }
  }, /*#__PURE__*/React.createElement(DataRouterStateContext.Provider, {
    value: state
  }, /*#__PURE__*/React.createElement(dist_Router, {
    basename: router.basename,
    location: router.state.location,
    navigationType: router.state.historyAction,
    navigator: navigator
  }, router.state.initialized ? /*#__PURE__*/React.createElement(Routes, null) : fallbackElement)));
}

/**
 * A <Router> that stores all entries in memory.
 *
 * @see https://reactrouter.com/docs/en/v6/routers/memory-router
 */
function MemoryRouter(_ref2) {
  var
    basename =



    _ref2.basename,children = _ref2.children,initialEntries = _ref2.initialEntries,initialIndex = _ref2.initialIndex;
  var historyRef = react.useRef();

  if (historyRef.current == null) {
    historyRef.current = router_createMemoryHistory({
      initialEntries: initialEntries,
      initialIndex: initialIndex,
      v5Compat: true
    });
  }

  var history = historyRef.current;
  var _React$useState = react.useState({
      action: history.action,
      location: history.location
    }),_React$useState2 = dist_slicedToArray(_React$useState, 2),state = _React$useState2[0],setState = _React$useState2[1];
  react.useLayoutEffect(function () {return history.listen(setState);}, [history]);
  return /*#__PURE__*/react.createElement(dist_Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}

/**
 * Changes the current location.
 *
 * Note: This API is mostly useful in React.Component subclasses that are not
 * able to use hooks. In functional components, we recommend you use the
 * `useNavigate` hook instead.
 *
 * @see https://reactrouter.com/docs/en/v6/components/navigate
 */
function Navigate(_ref3) {
  var
    to =



    _ref3.to,replace = _ref3.replace,state = _ref3.state,relative = _ref3.relative;
  !useInRouterContext() ?  false ? 0 : invariant(false) : void 0;
   false ? 0 : void 0;
  var dataRouterState = React.useContext(DataRouterStateContext);
  var navigate = dist_useNavigate();
  React.useEffect(function () {
    // Avoid kicking off multiple navigations if we're in the middle of a
    // data-router navigation, since components get re-rendered when we enter
    // a submitting/loading state
    if (dataRouterState && dataRouterState.navigation.state !== "idle") {
      return;
    }

    navigate(to, {
      replace: replace,
      state: state,
      relative: relative
    });
  });
  return null;
}

/**
 * Renders the child route's element, if there is one.
 *
 * @see https://reactrouter.com/docs/en/v6/components/outlet
 */
function Outlet(props) {
  return useOutlet(props.context);
}

/**
 * Declares an element that should be rendered at a certain URL path.
 *
 * @see https://reactrouter.com/docs/en/v6/components/route
 */
function Route(_props) {
   false ? 0 : router_invariant(false);
}

/**
 * Provides location context for the rest of the app.
 *
 * Note: You usually won't render a <Router> directly. Instead, you'll render a
 * router that is more specific to your environment such as a <BrowserRouter>
 * in web browsers or a <StaticRouter> for server rendering.
 *
 * @see https://reactrouter.com/docs/en/v6/routers/router
 */
function dist_Router(_ref4) {
  var _ref4$basename =






    _ref4.basename,basenameProp = _ref4$basename === void 0 ? "/" : _ref4$basename,_ref4$children = _ref4.children,children = _ref4$children === void 0 ? null : _ref4$children,locationProp = _ref4.location,_ref4$navigationType = _ref4.navigationType,navigationType = _ref4$navigationType === void 0 ? Action.Pop : _ref4$navigationType,navigator = _ref4.navigator,_ref4$static = _ref4["static"],staticProp = _ref4$static === void 0 ? false : _ref4$static;
  !!useInRouterContext() ?  false ? 0 : router_invariant(false) : void 0; // Preserve trailing slashes on basename, so we can let the user control
  // the enforcement of trailing slashes throughout the app

  var basename = basenameProp.replace(/^\/*/, "/");
  var navigationContext = react.useMemo(function () {return {
      basename: basename,
      navigator: navigator,
      "static": staticProp
    };}, [basename, navigator, staticProp]);

  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }

  var _locationProp =





    locationProp,_locationProp$pathnam = _locationProp.pathname,pathname = _locationProp$pathnam === void 0 ? "/" : _locationProp$pathnam,_locationProp$search = _locationProp.search,search = _locationProp$search === void 0 ? "" : _locationProp$search,_locationProp$hash = _locationProp.hash,hash = _locationProp$hash === void 0 ? "" : _locationProp$hash,_locationProp$state = _locationProp.state,state = _locationProp$state === void 0 ? null : _locationProp$state,_locationProp$key = _locationProp.key,key = _locationProp$key === void 0 ? "default" : _locationProp$key;
  var location = react.useMemo(function () {
    var trailingPathname = stripBasename(pathname, basename);

    if (trailingPathname == null) {
      return null;
    }

    return {
      pathname: trailingPathname,
      search: search,
      hash: hash,
      state: state,
      key: key
    };
  }, [basename, pathname, search, hash, state, key]);
   false ? 0 : void 0;

  if (location == null) {
    return null;
  }

  return /*#__PURE__*/react.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /*#__PURE__*/react.createElement(LocationContext.Provider, {
    children: children,
    value: {
      location: location,
      navigationType: navigationType
    }
  }));
}

/**
 * A container for a nested tree of <Route> elements that renders the branch
 * that best matches the current location.
 *
 * @see https://reactrouter.com/docs/en/v6/components/routes
 */
function Routes(_ref5) {
  var
    children =

    _ref5.children,location = _ref5.location;
  var dataRouterContext = react.useContext(DataRouterContext); // When in a DataRouterContext _without_ children, we use the router routes
  // directly.  If we have children, then we're in a descendant tree and we
  // need to use child routes.

  var routes = dataRouterContext && !children ? dataRouterContext.router.routes : createRoutesFromChildren(children);
  return useRoutes(routes, location);
}

/**
 * Component to use for rendering lazily loaded data from returning defer()
 * in a loader function
 */
function Await(_ref6) {
  var
    children =


    _ref6.children,errorElement = _ref6.errorElement,resolve = _ref6.resolve;
  return /*#__PURE__*/React.createElement(AwaitErrorBoundary, {
    resolve: resolve,
    errorElement: errorElement
  }, /*#__PURE__*/React.createElement(ResolveAwait, null, children));
}
var AwaitRenderStatus;

(function (AwaitRenderStatus) {
  AwaitRenderStatus[AwaitRenderStatus["pending"] = 0] = "pending";
  AwaitRenderStatus[AwaitRenderStatus["success"] = 1] = "success";
  AwaitRenderStatus[AwaitRenderStatus["error"] = 2] = "error";
})(AwaitRenderStatus || (AwaitRenderStatus = {}));

var neverSettledPromise = new Promise(function () {});var

AwaitErrorBoundary = /*#__PURE__*/function (_React$Component2) {dist_inherits(AwaitErrorBoundary, _React$Component2);var _super2 = dist_createSuper(AwaitErrorBoundary);
  function AwaitErrorBoundary(props) {var _this2;dist_classCallCheck(this, AwaitErrorBoundary);
    _this2 = _super2.call(this, props);
    _this2.state = {
      error: null
    };return _this2;
  }dist_createClass(AwaitErrorBoundary, [{ key: "componentDidCatch", value:







    function componentDidCatch(error, errorInfo) {
      console.error("<Await> caught the following error during render", error, errorInfo);
    } }, { key: "render", value:

    function render() {
      var _this$props =



        this.props,children = _this$props.children,errorElement = _this$props.errorElement,resolve = _this$props.resolve;
      var promise = null;
      var status = AwaitRenderStatus.pending;

      if (!(resolve instanceof Promise)) {
        // Didn't get a promise - provide as a resolved promise
        status = AwaitRenderStatus.success;
        promise = Promise.resolve();
        Object.defineProperty(promise, "_tracked", {
          get: function get() {return true;}
        });
        Object.defineProperty(promise, "_data", {
          get: function get() {return resolve;}
        });
      } else if (this.state.error) {
        // Caught a render error, provide it as a rejected promise
        status = AwaitRenderStatus.error;
        var renderError = this.state.error;
        promise = Promise.reject()["catch"](function () {}); // Avoid unhandled rejection warnings

        Object.defineProperty(promise, "_tracked", {
          get: function get() {return true;}
        });
        Object.defineProperty(promise, "_error", {
          get: function get() {return renderError;}
        });
      } else if (resolve._tracked) {
        // Already tracked promise - check contents
        promise = resolve;
        status = promise._error !== undefined ? AwaitRenderStatus.error : promise._data !== undefined ? AwaitRenderStatus.success : AwaitRenderStatus.pending;
      } else {
        // Raw (untracked) promise - track it
        status = AwaitRenderStatus.pending;
        Object.defineProperty(resolve, "_tracked", {
          get: function get() {return true;}
        });
        promise = resolve.then(function (data) {return Object.defineProperty(resolve, "_data", {
            get: function get() {return data;}
          });}, function (error) {return Object.defineProperty(resolve, "_error", {
            get: function get() {return error;}
          });});
      }

      if (status === AwaitRenderStatus.error && promise._error instanceof AbortedDeferredError) {
        // Freeze the UI by throwing a never resolved promise
        throw neverSettledPromise;
      }

      if (status === AwaitRenderStatus.error && !errorElement) {
        // No errorElement, throw to the nearest route-level error boundary
        throw promise._error;
      }

      if (status === AwaitRenderStatus.error) {
        // Render via our errorElement
        return /*#__PURE__*/react.createElement(AwaitContext.Provider, {
          value: promise,
          children: errorElement
        });
      }

      if (status === AwaitRenderStatus.success) {
        // Render children with resolved value
        return /*#__PURE__*/react.createElement(AwaitContext.Provider, {
          value: promise,
          children: children
        });
      } // Throw to the suspense boundary


      throw promise;
    } }], [{ key: "getDerivedStateFromError", value: function getDerivedStateFromError(error) {return { error: error };} }]);return AwaitErrorBoundary;}(react.Component);


/**
 * @private
 * Indirection to leverage useAsyncValue for a render-prop API on <Await>
 */


function ResolveAwait(_ref7) {
  var
  children =
  _ref7.children;
  var data = useAsyncValue();

  if (typeof children === "function") {
    return children(data);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, children);
} ///////////////////////////////////////////////////////////////////////////////
// UTILS
///////////////////////////////////////////////////////////////////////////////

/**
 * Creates a route config from a React "children" object, which is usually
 * either a `<Route>` element or an array of them. Used internally by
 * `<Routes>` to create a route config from its children.
 *
 * @see https://reactrouter.com/docs/en/v6/utils/create-routes-from-children
 */


function createRoutesFromChildren(children, parentPath) {
  if (parentPath === void 0) {
    parentPath = [];
  }

  var routes = [];
  react.Children.forEach(children, function (element, index) {
    if (! /*#__PURE__*/react.isValidElement(element)) {
      // Ignore non-elements. This allows people to more easily inline
      // conditionals in their route config.
      return;
    }

    if (element.type === react.Fragment) {
      // Transparently support React.Fragment and its children.
      routes.push.apply(routes, createRoutesFromChildren(element.props.children, parentPath));
      return;
    }

    !(element.type === Route) ?  false ? 0 : router_invariant(false) : void 0;
    !(!element.props.index || !element.props.children) ?  false ? 0 : router_invariant(false) : void 0;
    var treePath = [].concat(dist_toConsumableArray(parentPath), [index]);
    var route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      hasErrorBoundary: element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle
    };

    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children, treePath);
    }

    routes.push(route);
  });
  return routes;
}
/**
 * Renders the result of `matchRoutes()` into a React element.
 */

function renderMatches(matches) {
  return _renderMatches(matches);
}
/**
 * @private
 * Walk the route tree and add hasErrorBoundary if it's not provided, so that
 * users providing manual route arrays can just specify errorElement
 */

function enhanceManualRouteObjects(routes) {
  return routes.map(function (route) {
    var routeClone = dist_extends({}, route);

    if (routeClone.hasErrorBoundary == null) {
      routeClone.hasErrorBoundary = routeClone.errorElement != null;
    }

    if (routeClone.children) {
      routeClone.children = enhanceManualRouteObjects(routeClone.children);
    }

    return routeClone;
  });
}

function createMemoryRouter(routes, opts) {
  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    history: createMemoryHistory({
      initialEntries: opts == null ? void 0 : opts.initialEntries,
      initialIndex: opts == null ? void 0 : opts.initialIndex
    }),
    hydrationData: opts == null ? void 0 : opts.hydrationData,
    routes: enhanceManualRouteObjects(routes)
  }).initialize();
} ///////////////////////////////////////////////////////////////////////////////


;// CONCATENATED MODULE: ./src/relay/relay/components/BooleanInput.tsx
function BooleanInput_slicedToArray(arr, i) {return BooleanInput_arrayWithHoles(arr) || BooleanInput_iterableToArrayLimit(arr, i) || BooleanInput_unsupportedIterableToArray(arr, i) || BooleanInput_nonIterableRest();}function BooleanInput_nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function BooleanInput_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return BooleanInput_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return BooleanInput_arrayLikeToArray(o, minLen);}function BooleanInput_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function BooleanInput_iterableToArrayLimit(arr, i) {var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];if (_i == null) return;var _arr = [];var _n = true;var _d = false;var _s, _e;try {for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function BooleanInput_arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}



function BooleanInput(_ref) {var setting = _ref.setting;
  var _useState = (0,react.useState)(
    (setting.value == "" ? setting["default"] : setting.value) === "true"),_useState2 = BooleanInput_slicedToArray(_useState, 2),value = _useState2[0],setValue = _useState2[1];


  return /*#__PURE__*/(
    react.createElement("label", { className: "checkcontainer" }, /*#__PURE__*/
    react.createElement("input", {
      type: "hidden",
      name: setting.name,
      value: value.toString(),
      "data-default": setting["default"] }), /*#__PURE__*/

    react.createElement("div", {
      className: "toggle-track",
      onClick: function onClick() {
        setValue(!value);
        setting.value = (!value).toString();
      } }, /*#__PURE__*/

    react.createElement("span", { className: "toggle-indicator" }, /*#__PURE__*/
    react.createElement("span", { className: "checkMark" }, /*#__PURE__*/
    react.createElement("svg", {
      viewBox: "0 0 24 24",
      id: "ghq-svg-check",
      role: "presentation",
      "aria-hidden": "true" }, /*#__PURE__*/

    react.createElement("path", { d: "M9.86 18a1 1 0 01-.73-.32l-4.86-5.17a1.001 1.001 0 011.46-1.37l4.12 4.39 8.41-9.2a1 1 0 111.48 1.34l-9.14 10a1 1 0 01-.73.33h-.01z" })))))));






}

/*
<div
  class="checkmark"
  onClick={() => {
    setValue(!value);
  }}
/>
 */
/* harmony default export */ const components_BooleanInput = (BooleanInput);
;// CONCATENATED MODULE: ./src/relay/relay/components/DropdownInput.tsx
function DropdownInput_slicedToArray(arr, i) {return DropdownInput_arrayWithHoles(arr) || DropdownInput_iterableToArrayLimit(arr, i) || DropdownInput_unsupportedIterableToArray(arr, i) || DropdownInput_nonIterableRest();}function DropdownInput_nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function DropdownInput_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return DropdownInput_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return DropdownInput_arrayLikeToArray(o, minLen);}function DropdownInput_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function DropdownInput_iterableToArrayLimit(arr, i) {var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];if (_i == null) return;var _arr = [];var _n = true;var _d = false;var _s, _e;try {for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function DropdownInput_arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}


function DropdownInput(_ref) {var setting = _ref.setting;
  return /*#__PURE__*/(
    react.createElement("select", {
      className: "dropdowncontainer",
      name: setting.name,
      defaultValue: setting.value,
      onChange: function onChange(e) {return setting.value = e.target.value;} },

    setting.dropdown.map(function (_ref2) {var _ref3 = DropdownInput_slicedToArray(_ref2, 2),display = _ref3[0],value = _ref3[1];
      return /*#__PURE__*/(
        react.createElement("option", { key: value, value: value },
        display));


    })));


}

/* harmony default export */ const components_DropdownInput = (DropdownInput);
;// CONCATENATED MODULE: ./src/relay/relay/components/Setting.tsx





function Setting(_ref) {var setting = _ref.setting;
  return /*#__PURE__*/(
    react.createElement("tr", { id: "userPreference" }, /*#__PURE__*/
    react.createElement("td", null, setting.name), /*#__PURE__*/
    react.createElement("td", null,
    setting.type === "boolean" ? /*#__PURE__*/
    react.createElement(components_BooleanInput, { setting: setting }) :
    setting.dropdown != null ? /*#__PURE__*/
    react.createElement(components_DropdownInput, { setting: setting }) : /*#__PURE__*/

    react.createElement("input", {
      className: "stringcontainer",
      name: setting.name,
      defaultValue: setting.value,
      onChange: function onChange(e) {return setting.value = e.target.value;} })), /*#__PURE__*/



    react.createElement("td", null, setting.description)));


}

/* harmony default export */ const components_Setting = (Setting);
;// CONCATENATED MODULE: ./src/relay/relay/routes/Main.tsx





function Main(_ref) {var settings = _ref.settings;
  var preferences = settings.
  filter(function (s) {return s.setting != "values";}).
  map(function (setting) {return /*#__PURE__*/react.createElement(components_Setting, { setting: setting });});

  return /*#__PURE__*/(
    react.createElement("table", null, /*#__PURE__*/
    react.createElement("tbody", null, preferences)));


}

/* harmony default export */ const routes_Main = (Main);
;// CONCATENATED MODULE: ./src/relay/relay/routes/Values.tsx




function Values(_ref) {var settings = _ref.settings;
  var preferences = settings.
  filter(function (s) {return s.setting == "values";}).
  map(function (setting) {return /*#__PURE__*/react.createElement(components_Setting, { setting: setting });});

  return /*#__PURE__*/(
    react.createElement("table", null, /*#__PURE__*/
    react.createElement("tbody", null, preferences)));


}

/* harmony default export */ const routes_Values = (Values);
;// CONCATENATED MODULE: ./node_modules/react-router-dom/dist/index.js
function react_router_dom_dist_toConsumableArray(arr) {return react_router_dom_dist_arrayWithoutHoles(arr) || react_router_dom_dist_iterableToArray(arr) || react_router_dom_dist_unsupportedIterableToArray(arr) || react_router_dom_dist_nonIterableSpread();}function react_router_dom_dist_nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function react_router_dom_dist_iterableToArray(iter) {if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);}function react_router_dom_dist_arrayWithoutHoles(arr) {if (Array.isArray(arr)) return react_router_dom_dist_arrayLikeToArray(arr);}function react_router_dom_dist_slicedToArray(arr, i) {return react_router_dom_dist_arrayWithHoles(arr) || react_router_dom_dist_iterableToArrayLimit(arr, i) || react_router_dom_dist_unsupportedIterableToArray(arr, i) || react_router_dom_dist_nonIterableRest();}function react_router_dom_dist_nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function react_router_dom_dist_iterableToArrayLimit(arr, i) {var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];if (_i == null) return;var _arr = [];var _n = true;var _d = false;var _s, _e;try {for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function react_router_dom_dist_arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function dist_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = react_router_dom_dist_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e2) {throw _e2;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e3) {didErr = true;err = _e3;}, f: function f() {try {if (!normalCompletion && it["return"] != null) it["return"]();} finally {if (didErr) throw err;}} };}function react_router_dom_dist_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return react_router_dom_dist_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return react_router_dom_dist_arrayLikeToArray(o, minLen);}function react_router_dom_dist_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;} /**
* React Router DOM v6.4.3
*
* Copyright (c) Remix Software Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE.md file in the root directory of this source tree.
*
* @license MIT
*/





function react_router_dom_dist_extends() {
  react_router_dom_dist_extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return react_router_dom_dist_extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var defaultMethod = "get";
var defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function shouldProcessLinkClick(event, target) {
  return event.button === 0 && ( // Ignore everything but left clicks
  !target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event) // Ignore clicks with modifier keys
  ;
}
/**
 * Creates a URLSearchParams object using the given initializer.
 *
 * This is identical to `new URLSearchParams(init)` except it also
 * supports arrays as values in the object form of the initializer
 * instead of just strings. This is convenient when you need multiple
 * values for a given key, but don't want to use an array initializer.
 *
 * For example, instead of:
 *
 *   let searchParams = new URLSearchParams([
 *     ['sort', 'name'],
 *     ['sort', 'price']
 *   ]);
 *
 * you can do:
 *
 *   let searchParams = createSearchParams({
 *     sort: ['name', 'price']
 *   });
 */

function createSearchParams(init) {
  if (init === void 0) {
    init = "";
  }

  return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce(function (memo, key) {
    var value = init[key];
    return memo.concat(Array.isArray(value) ? value.map(function (v) {return [key, v];}) : [[key, value]]);
  }, []));
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
  var searchParams = createSearchParams(locationSearch);var _iterator = dist_createForOfIteratorHelper(

    defaultSearchParams.keys()),_step;try {var _loop = function _loop() {var key = _step.value;
      if (!searchParams.has(key)) {
        defaultSearchParams.getAll(key).forEach(function (value) {
          searchParams.append(key, value);
        });
      }};for (_iterator.s(); !(_step = _iterator.n()).done;) {_loop();
    }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

  return searchParams;
}
function getFormSubmissionInfo(target, defaultAction, options) {
  var method;
  var action;
  var encType;
  var formData;

  if (isFormElement(target)) {
    var submissionTrigger = options.submissionTrigger;
    method = options.method || target.getAttribute("method") || defaultMethod;
    action = options.action || target.getAttribute("action") || defaultAction;
    encType = options.encType || target.getAttribute("enctype") || defaultEncType;
    formData = new FormData(target);

    if (submissionTrigger && submissionTrigger.name) {
      formData.append(submissionTrigger.name, submissionTrigger.value);
    }
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    var form = target.form;

    if (form == null) {
      throw new Error("Cannot submit a <button> or <input type=\"submit\"> without a <form>");
    } // <button>/<input type="submit"> may override attributes of <form>


    method = options.method || target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    action = options.action || target.getAttribute("formaction") || form.getAttribute("action") || defaultAction;
    encType = options.encType || target.getAttribute("formenctype") || form.getAttribute("enctype") || defaultEncType;
    formData = new FormData(form); // Include name + value from a <button>, appending in case the button name
    // matches an existing input name

    if (target.name) {
      formData.append(target.name, target.value);
    }
  } else if (isHtmlElement(target)) {
    throw new Error("Cannot submit element that is not <form>, <button>, or " + "<input type=\"submit|image\">");
  } else {
    method = options.method || defaultMethod;
    action = options.action || defaultAction;
    encType = options.encType || defaultEncType;

    if (target instanceof FormData) {
      formData = target;
    } else {
      formData = new FormData();

      if (target instanceof URLSearchParams) {var _iterator2 = dist_createForOfIteratorHelper(
          target),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _step2$value = react_router_dom_dist_slicedToArray(_step2.value, 2),name = _step2$value[0],value = _step2$value[1];
            formData.append(name, value);
          }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}
      } else if (target != null) {
        for (var _i2 = 0, _Object$keys = Object.keys(target); _i2 < _Object$keys.length; _i2++) {var _name = _Object$keys[_i2];
          formData.append(_name, target[_name]);
        }
      }
    }
  }

  var _window$location =


    window.location,protocol = _window$location.protocol,host = _window$location.host;
  var url = new URL(action, protocol + "//" + host);
  return {
    url: url,
    method: method,
    encType: encType,
    formData: formData
  };
}

var _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"],
  _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"],
  _excluded3 = (/* unused pure expression or super */ null && (["reloadDocument", "replace", "method", "action", "onSubmit", "fetcherKey", "routeId", "relative"]));
//#region Routers
////////////////////////////////////////////////////////////////////////////////

function createBrowserRouter(routes, opts) {
  var _window;

  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    history: createBrowserHistory({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || ((_window = window) == null ? void 0 : _window.__staticRouterHydrationData),
    routes: UNSAFE_enhanceManualRouteObjects(routes)
  }).initialize();
}
function createHashRouter(routes, opts) {
  var _window2;

  return createRouter({
    basename: opts == null ? void 0 : opts.basename,
    history: createHashHistory({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || ((_window2 = window) == null ? void 0 : _window2.__staticRouterHydrationData),
    routes: UNSAFE_enhanceManualRouteObjects(routes)
  }).initialize();
}
/**
 * A `<Router>` for use in web browsers. Provides the cleanest URLs.
 */

function BrowserRouter(_ref) {
  var
    basename =


    _ref.basename,children = _ref.children,window = _ref.window;
  var historyRef = React.useRef();

  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({
      window: window,
      v5Compat: true
    });
  }

  var history = historyRef.current;
  var _React$useState = React.useState({
      action: history.action,
      location: history.location
    }),_React$useState2 = react_router_dom_dist_slicedToArray(_React$useState, 2),state = _React$useState2[0],setState = _React$useState2[1];
  React.useLayoutEffect(function () {return history.listen(setState);}, [history]);
  return /*#__PURE__*/React.createElement(Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
/**
 * A `<Router>` for use in web browsers. Stores the location in the hash
 * portion of the URL so it is not sent to the server.
 */

function HashRouter(_ref2) {
  var
    basename =


    _ref2.basename,children = _ref2.children,window = _ref2.window;
  var historyRef = React.useRef();

  if (historyRef.current == null) {
    historyRef.current = createHashHistory({
      window: window,
      v5Compat: true
    });
  }

  var history = historyRef.current;
  var _React$useState3 = React.useState({
      action: history.action,
      location: history.location
    }),_React$useState4 = react_router_dom_dist_slicedToArray(_React$useState3, 2),state = _React$useState4[0],setState = _React$useState4[1];
  React.useLayoutEffect(function () {return history.listen(setState);}, [history]);
  return /*#__PURE__*/React.createElement(Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
/**
 * A `<Router>` that accepts a pre-instantiated history object. It's important
 * to note that using your own history object is highly discouraged and may add
 * two versions of the history library to your bundles unless you use the same
 * version of the history library that React Router uses internally.
 */

function HistoryRouter(_ref3) {
  var
    basename =


    _ref3.basename,children = _ref3.children,history = _ref3.history;
  var _React$useState5 = React.useState({
      action: history.action,
      location: history.location
    }),_React$useState6 = react_router_dom_dist_slicedToArray(_React$useState5, 2),state = _React$useState6[0],setState = _React$useState6[1];
  React.useLayoutEffect(function () {return history.listen(setState);}, [history]);
  return /*#__PURE__*/React.createElement(Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}

if (false) {}
/**
 * The public API for rendering a history-aware <a>.
 */

var Link = /*#__PURE__*/react.forwardRef(function LinkWithRef(_ref4, ref) {
  var
    onClick =







    _ref4.onClick,relative = _ref4.relative,reloadDocument = _ref4.reloadDocument,replace = _ref4.replace,state = _ref4.state,target = _ref4.target,to = _ref4.to,preventScrollReset = _ref4.preventScrollReset,
    rest = _objectWithoutPropertiesLoose(_ref4, _excluded);

  var href = useHref(to, {
    relative: relative
  });
  var internalOnClick = useLinkClickHandler(to, {
    replace: replace,
    state: state,
    target: target,
    preventScrollReset: preventScrollReset,
    relative: relative
  });

  function handleClick(event) {
    if (onClick) onClick(event);

    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }

  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    react.createElement("a", react_router_dom_dist_extends({}, rest, {
      href: href,
      onClick: reloadDocument ? onClick : handleClick,
      ref: ref,
      target: target
    })));

});

if (false) {}
/**
 * A <Link> wrapper that knows if it's "active" or not.
 */


var NavLink = /*#__PURE__*/react.forwardRef(function NavLinkWithRef(_ref5, ref) {
  var _ref5$ariaCurrent =







    _ref5["aria-current"],ariaCurrentProp = _ref5$ariaCurrent === void 0 ? "page" : _ref5$ariaCurrent,_ref5$caseSensitive = _ref5.caseSensitive,caseSensitive = _ref5$caseSensitive === void 0 ? false : _ref5$caseSensitive,_ref5$className = _ref5.className,classNameProp = _ref5$className === void 0 ? "" : _ref5$className,_ref5$end = _ref5.end,end = _ref5$end === void 0 ? false : _ref5$end,styleProp = _ref5.style,to = _ref5.to,children = _ref5.children,
    rest = _objectWithoutPropertiesLoose(_ref5, _excluded2);

  var path = dist_useResolvedPath(to, {
    relative: rest.relative
  });
  var location = dist_useLocation();
  var routerState = react.useContext(DataRouterStateContext);
  var toPathname = path.pathname;
  var locationPathname = location.pathname;
  var nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;

  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
    toPathname = toPathname.toLowerCase();
  }

  var isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/";
  var isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
  var ariaCurrent = isActive ? ariaCurrentProp : undefined;
  var className;

  if (typeof classNameProp === "function") {
    className = classNameProp({
      isActive: isActive,
      isPending: isPending
    });
  } else {
    // If the className prop is not a function, we use a default `active`
    // class for <NavLink />s that are active. In v5 `active` was the default
    // value for `activeClassName`, but we are removing that API and can still
    // use the old default behavior for a cleaner upgrade path and keep the
    // simple styling rules working as they currently do.
    className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null].filter(Boolean).join(" ");
  }

  var style = typeof styleProp === "function" ? styleProp({
    isActive: isActive,
    isPending: isPending
  }) : styleProp;
  return /*#__PURE__*/react.createElement(Link, react_router_dom_dist_extends({}, rest, {
    "aria-current": ariaCurrent,
    className: className,
    ref: ref,
    style: style,
    to: to
  }), typeof children === "function" ? children({
    isActive: isActive,
    isPending: isPending
  }) : children);
});

if (false) {}
/**
 * A `@remix-run/router`-aware `<form>`. It behaves like a normal form except
 * that the interaction with the server is with `fetch` instead of new document
 * requests, allowing components to add nicer UX to the page as the form is
 * submitted and returns with data.
 */


var Form = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(FormImpl, react_router_dom_dist_extends({}, props, {
    ref: ref
  }));
})));

if (false) {}

var FormImpl = /*#__PURE__*/(/* unused pure expression or super */ null && (React.forwardRef(function (_ref6, forwardedRef) {
  var
    reloadDocument =







    _ref6.reloadDocument,replace = _ref6.replace,_ref6$method = _ref6.method,method = _ref6$method === void 0 ? defaultMethod : _ref6$method,action = _ref6.action,onSubmit = _ref6.onSubmit,fetcherKey = _ref6.fetcherKey,routeId = _ref6.routeId,relative = _ref6.relative,
    props = _objectWithoutPropertiesLoose(_ref6, _excluded3);

  var submit = useSubmitImpl(fetcherKey, routeId);
  var formMethod = method.toLowerCase() === "get" ? "get" : "post";
  var formAction = useFormAction(action, {
    relative: relative
  });

  var submitHandler = function submitHandler(event) {
    onSubmit && onSubmit(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    var submitter = event.nativeEvent.submitter;
    submit(submitter || event.currentTarget, {
      method: method,
      replace: replace,
      relative: relative
    });
  };

  return /*#__PURE__*/React.createElement("form", react_router_dom_dist_extends({
    ref: forwardedRef,
    method: formMethod,
    action: formAction,
    onSubmit: reloadDocument ? onSubmit : submitHandler
  }, props));
})));

if (false) {}
/**
 * This component will emulate the browser's scroll restoration on location
 * changes.
 */


function ScrollRestoration(_ref7) {
  var
    getKey =

    _ref7.getKey,storageKey = _ref7.storageKey;
  useScrollRestoration({
    getKey: getKey,
    storageKey: storageKey
  });
  return null;
}

if (false) {} //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region Hooks
////////////////////////////////////////////////////////////////////////////////


var dist_DataRouterHook;

(function (DataRouterHook) {
  DataRouterHook["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook["UseSubmitImpl"] = "useSubmitImpl";
  DataRouterHook["UseFetcher"] = "useFetcher";
})(dist_DataRouterHook || (dist_DataRouterHook = {}));

var dist_DataRouterStateHook;

(function (DataRouterStateHook) {
  DataRouterStateHook["UseFetchers"] = "useFetchers";
  DataRouterStateHook["UseScrollRestoration"] = "useScrollRestoration";
})(dist_DataRouterStateHook || (dist_DataRouterStateHook = {}));

function dist_getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.";
}

function dist_useDataRouterContext(hookName) {
  var ctx = React.useContext(UNSAFE_DataRouterContext);
  !ctx ?  false ? 0 : invariant(false) : void 0;
  return ctx;
}

function dist_useDataRouterState(hookName) {
  var state = React.useContext(UNSAFE_DataRouterStateContext);
  !state ?  false ? 0 : invariant(false) : void 0;
  return state;
}
/**
 * Handles the click behavior for router `<Link>` components. This is useful if
 * you need to create custom `<Link>` components with the same click behavior we
 * use in our exported `<Link>`.
 */


function useLinkClickHandler(to, _temp) {
  var _ref8 =





    _temp === void 0 ? {} : _temp,target = _ref8.target,replaceProp = _ref8.replace,state = _ref8.state,preventScrollReset = _ref8.preventScrollReset,relative = _ref8.relative;
  var navigate = dist_useNavigate();
  var location = dist_useLocation();
  var path = dist_useResolvedPath(to, {
    relative: relative
  });
  return react.useCallback(function (event) {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault(); // If the URL hasn't changed, a regular <a> will do a replace instead of
      // a push, so do the same here unless the replace prop is explicitly set

      var replace = replaceProp !== undefined ? replaceProp : router_createPath(location) === router_createPath(path);
      navigate(to, {
        replace: replace,
        state: state,
        preventScrollReset: preventScrollReset,
        relative: relative
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative]);
}
/**
 * A convenient wrapper for reading and writing search parameters via the
 * URLSearchParams interface.
 */

function useSearchParams(defaultInit) {
   false ? 0 : void 0;
  var defaultSearchParamsRef = React.useRef(createSearchParams(defaultInit));
  var location = useLocation();
  var searchParams = React.useMemo(function () {return getSearchParamsForLocation(location.search, defaultSearchParamsRef.current);}, [location.search]);
  var navigate = useNavigate();
  var setSearchParams = React.useCallback(function (nextInit, navigateOptions) {
    var newSearchParams = createSearchParams(typeof nextInit === "function" ? nextInit(searchParams) : nextInit);
    navigate("?" + newSearchParams, navigateOptions);
  }, [navigate, searchParams]);
  return [searchParams, setSearchParams];
}
/**
 * Returns a function that may be used to programmatically submit a form (or
 * some arbitrary data) to the server.
 */

function useSubmit() {
  return useSubmitImpl();
}

function useSubmitImpl(fetcherKey, routeId) {
  var _useDataRouterContext =

    dist_useDataRouterContext(dist_DataRouterHook.UseSubmitImpl),router = _useDataRouterContext.router;
  var defaultAction = useFormAction();
  return React.useCallback(function (target, options) {
    if (options === void 0) {
      options = {};
    }

    if (typeof document === "undefined") {
      throw new Error("You are calling submit during the server render. " + "Try calling submit within a `useEffect` or callback instead.");
    }

    var _getFormSubmissionInf =




      getFormSubmissionInfo(target, defaultAction, options),method = _getFormSubmissionInf.method,encType = _getFormSubmissionInf.encType,formData = _getFormSubmissionInf.formData,url = _getFormSubmissionInf.url;
    var href = url.pathname + url.search;
    var opts = {
      replace: options.replace,
      formData: formData,
      formMethod: method,
      formEncType: encType
    };

    if (fetcherKey) {
      !(routeId != null) ?  false ? 0 : invariant(false) : void 0;
      router.fetch(fetcherKey, routeId, href, opts);
    } else {
      router.navigate(href, opts);
    }
  }, [defaultAction, router, fetcherKey, routeId]);
}

function useFormAction(action, _temp2) {
  var _ref9 =

    _temp2 === void 0 ? {} : _temp2,relative = _ref9.relative;
  var _React$useContext =

    React.useContext(UNSAFE_NavigationContext),basename = _React$useContext.basename;
  var routeContext = React.useContext(UNSAFE_RouteContext);
  !routeContext ?  false ? 0 : invariant(false) : void 0;
  var _routeContext$matches = routeContext.matches.slice(-1),_routeContext$matches2 = react_router_dom_dist_slicedToArray(_routeContext$matches, 1),match = _routeContext$matches2[0];
  var resolvedAction = action != null ? action : "."; // Shallow clone path so we can modify it below, otherwise we modify the
  // object referenced by useMemo inside useResolvedPath

  var path = react_router_dom_dist_extends({}, useResolvedPath(resolvedAction, {
    relative: relative
  })); // Previously we set the default action to ".". The problem with this is that
  // `useResolvedPath(".")` excludes search params and the hash of the resolved
  // URL. This is the intended behavior of when "." is specifically provided as
  // the form action, but inconsistent w/ browsers when the action is omitted.
  // https://github.com/remix-run/remix/issues/927


  var location = useLocation();

  if (action == null) {
    // Safe to write to these directly here since if action was undefined, we
    // would have called useResolvedPath(".") which will never include a search
    // or hash
    path.search = location.search;
    path.hash = location.hash; // When grabbing search params from the URL, remove the automatically
    // inserted ?index param so we match the useResolvedPath search behavior
    // which would not include ?index

    if (match.route.index) {
      var params = new URLSearchParams(path.search);
      params["delete"]("index");
      path.search = params.toString() ? "?" + params.toString() : "";
    }
  }

  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  } // If we're operating within a basename, prepend it to the pathname prior
  // to creating the form action.  If this is a root navigation, then just use
  // the raw basename which allows the basename to have full control over the
  // presence of a trailing slash on root actions


  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }

  return createPath(path);
}

function createFetcherForm(fetcherKey, routeId) {
  var FetcherForm = /*#__PURE__*/React.forwardRef(function (props, ref) {
    return /*#__PURE__*/React.createElement(FormImpl, react_router_dom_dist_extends({}, props, {
      ref: ref,
      fetcherKey: fetcherKey,
      routeId: routeId
    }));
  });

  if (false) {}

  return FetcherForm;
}

var fetcherId = 0;
/**
 * Interacts with route loaders and actions without causing a navigation. Great
 * for any interaction that stays on the same page.
 */

function useFetcher() {
  var _route$matches;

  var _useDataRouterContext2 =

    dist_useDataRouterContext(dist_DataRouterHook.UseFetcher),router = _useDataRouterContext2.router;
  var route = React.useContext(UNSAFE_RouteContext);
  !route ?  false ? 0 : invariant(false) : void 0;
  var routeId = (_route$matches = route.matches[route.matches.length - 1]) == null ? void 0 : _route$matches.route.id;
  !(routeId != null) ?  false ? 0 : invariant(false) : void 0;
  var _React$useState7 = React.useState(function () {return String(++fetcherId);}),_React$useState8 = react_router_dom_dist_slicedToArray(_React$useState7, 1),fetcherKey = _React$useState8[0];
  var _React$useState9 = React.useState(function () {
      !routeId ?  false ? 0 : invariant(false) : void 0;
      return createFetcherForm(fetcherKey, routeId);
    }),_React$useState10 = react_router_dom_dist_slicedToArray(_React$useState9, 1),Form = _React$useState10[0];
  var _React$useState11 = React.useState(function () {return function (href) {
        !router ?  false ? 0 : invariant(false) : void 0;
        !routeId ?  false ? 0 : invariant(false) : void 0;
        router.fetch(fetcherKey, routeId, href);
      };}),_React$useState12 = react_router_dom_dist_slicedToArray(_React$useState11, 1),load = _React$useState12[0];
  var submit = useSubmitImpl(fetcherKey, routeId);
  var fetcher = router.getFetcher(fetcherKey);
  var fetcherWithComponents = React.useMemo(function () {return react_router_dom_dist_extends({
      Form: Form,
      submit: submit,
      load: load
    }, fetcher);}, [fetcher, Form, submit, load]);
  React.useEffect(function () {
    // Is this busted when the React team gets real weird and calls effects
    // twice on mount?  We really just need to garbage collect here when this
    // fetcher is no longer around.
    return function () {
      if (!router) {
        console.warn("No fetcher available to clean up from useFetcher()");
        return;
      }

      router.deleteFetcher(fetcherKey);
    };
  }, [router, fetcherKey]);
  return fetcherWithComponents;
}
/**
 * Provides all fetchers currently on the page. Useful for layouts and parent
 * routes that need to provide pending/optimistic UI regarding the fetch.
 */

function useFetchers() {
  var state = dist_useDataRouterState(dist_DataRouterStateHook.UseFetchers);
  return react_router_dom_dist_toConsumableArray(state.fetchers.values());
}
var SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
var savedScrollPositions = {};
/**
 * When rendered inside a RouterProvider, will restore scroll positions on navigations
 */

function useScrollRestoration(_temp3) {
  var _ref10 =


    _temp3 === void 0 ? {} : _temp3,getKey = _ref10.getKey,storageKey = _ref10.storageKey;
  var _useDataRouterContext3 =

    dist_useDataRouterContext(dist_DataRouterHook.UseScrollRestoration),router = _useDataRouterContext3.router;
  var _useDataRouterState =


    dist_useDataRouterState(dist_DataRouterStateHook.UseScrollRestoration),restoreScrollPosition = _useDataRouterState.restoreScrollPosition,preventScrollReset = _useDataRouterState.preventScrollReset;
  var location = useLocation();
  var matches = useMatches();
  var navigation = useNavigation(); // Trigger manual scroll restoration while we're active

  React.useEffect(function () {
    window.history.scrollRestoration = "manual";
    return function () {
      window.history.scrollRestoration = "auto";
    };
  }, []); // Save positions on unload

  useBeforeUnload(React.useCallback(function () {
    if (navigation.state === "idle") {
      var key = (getKey ? getKey(location, matches) : null) || location.key;
      savedScrollPositions[key] = window.scrollY;
    }

    sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(savedScrollPositions));
    window.history.scrollRestoration = "auto";
  }, [storageKey, getKey, navigation.state, location, matches])); // Read in any saved scroll locations

  React.useLayoutEffect(function () {
    try {
      var sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);

      if (sessionPositions) {
        savedScrollPositions = JSON.parse(sessionPositions);
      }
    } catch (e) {

      // no-op, use default empty object
    }}, [storageKey]); // Enable scroll restoration in the router
  React.useLayoutEffect(function () {
    var disableScrollRestoration = router == null ? void 0 : router.enableScrollRestoration(savedScrollPositions, function () {return window.scrollY;}, getKey);
    return function () {return disableScrollRestoration && disableScrollRestoration();};
  }, [router, getKey]); // Restore scrolling when state.restoreScrollPosition changes

  React.useLayoutEffect(function () {
    // Explicit false means don't do anything (used for submissions)
    if (restoreScrollPosition === false) {
      return;
    } // been here before, scroll to it


    if (typeof restoreScrollPosition === "number") {
      window.scrollTo(0, restoreScrollPosition);
      return;
    } // try to scroll to the hash


    if (location.hash) {
      var el = document.getElementById(location.hash.slice(1));

      if (el) {
        el.scrollIntoView();
        return;
      }
    } // Opt out of scroll reset if this link requested it


    if (preventScrollReset === true) {
      return;
    } // otherwise go to the top on new locations


    window.scrollTo(0, 0);
  }, [location, restoreScrollPosition, preventScrollReset]);
}

function useBeforeUnload(callback) {
  React.useEffect(function () {
    window.addEventListener("beforeunload", callback);
    return function () {
      window.removeEventListener("beforeunload", callback);
    };
  }, [callback]);
} //#endregion
////////////////////////////////////////////////////////////////////////////////
//#region Utils
////////////////////////////////////////////////////////////////////////////////


function dist_warning(cond, message) {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== "undefined") console.warn(message);

    try {
      // Welcome to debugging React Router!
      //
      // This error is thrown as a convenience so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message); // eslint-disable-next-line no-empty
    } catch (e) {}
  }
} //#endregion


;// CONCATENATED MODULE: ./src/relay/relay/api/ApiRequest.tsx
function ApiRequest_typeof(obj) {"@babel/helpers - typeof";return ApiRequest_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {return typeof obj;} : function (obj) {return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}, ApiRequest_typeof(obj);}function ApiRequest_regeneratorRuntime() {"use strict";
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ApiRequest_regeneratorRuntime = function _regeneratorRuntime() {return exports;};var exports = {},Op = Object.prototype,hasOwn = Op.hasOwnProperty,defineProperty = Object.defineProperty || function (obj, key, desc) {obj[key] = desc.value;},$Symbol = "function" == typeof Symbol ? Symbol : {},iteratorSymbol = $Symbol.iterator || "@@iterator",asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";function define(obj, key, value) {return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key];}try {define({}, "");} catch (err) {define = function define(obj, key, value) {return obj[key] = value;};}function wrap(innerFn, outerFn, self, tryLocsList) {var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,generator = Object.create(protoGenerator.prototype),context = new Context(tryLocsList || []);return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator;}function tryCatch(fn, obj, arg) {try {return { type: "normal", arg: fn.call(obj, arg) };} catch (err) {return { type: "throw", arg: err };}}exports.wrap = wrap;var ContinueSentinel = {};function Generator() {}function GeneratorFunction() {}function GeneratorFunctionPrototype() {}var IteratorPrototype = {};define(IteratorPrototype, iteratorSymbol, function () {return this;});var getProto = Object.getPrototypeOf,NativeIteratorPrototype = getProto && getProto(getProto(values([])));NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);function defineIteratorMethods(prototype) {["next", "throw", "return"].forEach(function (method) {define(prototype, method, function (arg) {return this._invoke(method, arg);});});}function AsyncIterator(generator, PromiseImpl) {function invoke(method, arg, resolve, reject) {var record = tryCatch(generator[method], generator, arg);if ("throw" !== record.type) {var result = record.arg,value = result.value;return value && "object" == ApiRequest_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {invoke("next", value, resolve, reject);}, function (err) {invoke("throw", err, resolve, reject);}) : PromiseImpl.resolve(value).then(function (unwrapped) {result.value = unwrapped, resolve(result);}, function (error) {return invoke("throw", error, resolve, reject);});}reject(record.arg);}var previousPromise;defineProperty(this, "_invoke", { value: function value(method, arg) {function callInvokeWithMethodAndArg() {return new PromiseImpl(function (resolve, reject) {invoke(method, arg, resolve, reject);});}return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();} });}function makeInvokeMethod(innerFn, self, context) {var state = "suspendedStart";return function (method, arg) {if ("executing" === state) throw new Error("Generator is already running");if ("completed" === state) {if ("throw" === method) throw arg;return doneResult();}for (context.method = method, context.arg = arg;;) {var delegate = context.delegate;if (delegate) {var delegateResult = maybeInvokeDelegate(delegate, context);if (delegateResult) {if (delegateResult === ContinueSentinel) continue;return delegateResult;}}if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {if ("suspendedStart" === state) throw state = "completed", context.arg;context.dispatchException(context.arg);} else "return" === context.method && context.abrupt("return", context.arg);state = "executing";var record = tryCatch(innerFn, self, context);if ("normal" === record.type) {if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;return { value: record.arg, done: context.done };}"throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);}};}function maybeInvokeDelegate(delegate, context) {var method = delegate.iterator[context.method];if (undefined === method) {if (context.delegate = null, "throw" === context.method) {if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");}return ContinueSentinel;}var record = tryCatch(method, delegate.iterator, context.arg);if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;var info = record.arg;return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);}function pushTryEntry(locs) {var entry = { tryLoc: locs[0] };1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);}function resetTryEntry(entry) {var record = entry.completion || {};record.type = "normal", delete record.arg, entry.completion = record;}function Context(tryLocsList) {this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);}function values(iterable) {if (iterable) {var iteratorMethod = iterable[iteratorSymbol];if (iteratorMethod) return iteratorMethod.call(iterable);if ("function" == typeof iterable.next) return iterable;if (!isNaN(iterable.length)) {var i = -1,next = function next() {for (; ++i < iterable.length;) {if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;}return next.value = undefined, next.done = !0, next;};return next.next = next;}}return { next: doneResult };}function doneResult() {return { value: undefined, done: !0 };}return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {var ctor = "function" == typeof genFun && genFun.constructor;return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));}, exports.mark = function (genFun) {return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;}, exports.awrap = function (arg) {return { __await: arg };}, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {return this;}), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {void 0 === PromiseImpl && (PromiseImpl = Promise);var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {return result.done ? result.value : iter.next();});}, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {return this;}), define(Gp, "toString", function () {return "[object Generator]";}), exports.keys = function (val) {var object = Object(val),keys = [];for (var key in object) {keys.push(key);}return keys.reverse(), function next() {for (; keys.length;) {var key = keys.pop();if (key in object) return next.value = key, next.done = !1, next;}return next.done = !0, next;};}, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) {if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {"t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);}}, stop: function stop() {this.done = !0;var rootRecord = this.tryEntries[0].completion;if ("throw" === rootRecord.type) throw rootRecord.arg;return this.rval;}, dispatchException: function dispatchException(exception) {if (this.done) throw exception;var context = this;function handle(loc, caught) {return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;}for (var i = this.tryEntries.length - 1; i >= 0; --i) {var entry = this.tryEntries[i],record = entry.completion;if ("root" === entry.tryLoc) return handle("end");if (entry.tryLoc <= this.prev) {var hasCatch = hasOwn.call(entry, "catchLoc"),hasFinally = hasOwn.call(entry, "finallyLoc");if (hasCatch && hasFinally) {if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);} else if (hasCatch) {if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);} else {if (!hasFinally) throw new Error("try statement without catch or finally");if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);}}}}, abrupt: function abrupt(type, arg) {for (var i = this.tryEntries.length - 1; i >= 0; --i) {var entry = this.tryEntries[i];if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {var finallyEntry = entry;break;}}finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);var record = finallyEntry ? finallyEntry.completion : {};return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);}, complete: function complete(record, afterLoc) {if ("throw" === record.type) throw record.arg;return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;}, finish: function finish(finallyLoc) {for (var i = this.tryEntries.length - 1; i >= 0; --i) {var entry = this.tryEntries[i];if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;}}, "catch": function _catch(tryLoc) {for (var i = this.tryEntries.length - 1; i >= 0; --i) {var entry = this.tryEntries[i];if (entry.tryLoc === tryLoc) {var record = entry.completion;if ("throw" === record.type) {var thrown = record.arg;resetTryEntry(entry);}return thrown;}}throw new Error("illegal catch attempt");}, delegateYield: function delegateYield(iterable, resultName, nextLoc) {return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel;} }, exports;}function ApiRequest_slicedToArray(arr, i) {return ApiRequest_arrayWithHoles(arr) || ApiRequest_iterableToArrayLimit(arr, i) || ApiRequest_unsupportedIterableToArray(arr, i) || ApiRequest_nonIterableRest();}function ApiRequest_nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function ApiRequest_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return ApiRequest_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return ApiRequest_arrayLikeToArray(o, minLen);}function ApiRequest_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function ApiRequest_iterableToArrayLimit(arr, i) {var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];if (_i == null) return;var _arr = [];var _n = true;var _d = false;var _s, _e;try {for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function ApiRequest_arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function ApiRequest_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function ApiRequest_asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {ApiRequest_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {ApiRequest_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function
getProperty(_x) {return _getProperty.apply(this, arguments);}function _getProperty() {_getProperty = ApiRequest_asyncToGenerator( /*#__PURE__*/ApiRequest_regeneratorRuntime().mark(function _callee(property) {return ApiRequest_regeneratorRuntime().wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:return _context.abrupt("return",
            runJavascript("require(`kolmafia`).getProperty(`".concat(property, "`);")));case 1:case "end":return _context.stop();}}}, _callee);}));return _getProperty.apply(this, arguments);}


function addNotification(notification) {
  var ele = document.createElement("div");
  ele.className = "notification";
  ele.addEventListener("animationend", function () {return ele.remove();});
  ele.innerText = notification;

  var container = document.getElementById("notificationsContainer");

  if (!container) {
    return;
  }

  container.appendChild(ele);
}

function setProperty(_x2, _x3) {return _setProperty.apply(this, arguments);}function _setProperty() {_setProperty = ApiRequest_asyncToGenerator( /*#__PURE__*/ApiRequest_regeneratorRuntime().mark(function _callee2(
  property,
  value) {return ApiRequest_regeneratorRuntime().wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (

              runJavascript("require(\"kolmafia\").setProperty(`".concat(
              property, "`, `").concat(value, "`);")));case 2:case "end":return _context2.stop();}}}, _callee2);}));return _setProperty.apply(this, arguments);}



function saveSettings(properties) {
  return setProperties(
  properties.
  filter(function (p) {
    if (p.savedValue === p.value) {
      return false;
    }

    p.savedValue = p.value;
    return true;
  }).
  map(function (prop) {return [prop.name, prop.value.trim()];}));

}

function setProperties(properties) {
  var js =
  'const changed = []; const change = (key, value) => { let prev = require("kolmafia").getProperty(key); if (prev === value)return; changed.push([key, prev, value]); require("kolmafia").setProperty(key, value);};';

  js += properties.
  map(function (_ref) {var _ref2 = ApiRequest_slicedToArray(_ref, 2),k = _ref2[0],v = _ref2[1];
    return "change(`".concat(k, "`, `").concat(v, "`);");
  }).
  join("\n");

  js += "JSON.stringify(changed);";

  return runJavascript(js);
}function

runJavascript(_x4) {return _runJavascript.apply(this, arguments);}function _runJavascript() {_runJavascript = ApiRequest_asyncToGenerator( /*#__PURE__*/ApiRequest_regeneratorRuntime().mark(function _callee3(javascript) {return ApiRequest_regeneratorRuntime().wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:return _context3.abrupt("return",
            new Promise(function (resolve) {
              var xhr = new XMLHttpRequest();
              xhr.responseType = "text";
              xhr.open("POST", window.location.href, true);
              xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
              xhr.send("api=" + encodeURIComponent(javascript));
              xhr.onreadystatechange = function () {
                if (xhr.readyState != 4 || xhr.status != 200) {
                  return;
                }

                resolve(xhr.responseText);
              };
            }));case 1:case "end":return _context3.stop();}}}, _callee3);}));return _runJavascript.apply(this, arguments);}
;// CONCATENATED MODULE: ./src/relay/relay/components/Layout.tsx
function Layout_slicedToArray(arr, i) {return Layout_arrayWithHoles(arr) || Layout_iterableToArrayLimit(arr, i) || Layout_unsupportedIterableToArray(arr, i) || Layout_nonIterableRest();}function Layout_nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function Layout_iterableToArrayLimit(arr, i) {var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];if (_i == null) return;var _arr = [];var _n = true;var _d = false;var _s, _e;try {for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function Layout_arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function Layout_createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = Layout_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e2) {throw _e2;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e3) {didErr = true;err = _e3;}, f: function f() {try {if (!normalCompletion && it["return"] != null) it["return"]();} finally {if (didErr) throw err;}} };}function Layout_unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return Layout_arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Layout_arrayLikeToArray(o, minLen);}function Layout_arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}





var Layout = function Layout(_ref) {var settings = _ref.settings;
  return /*#__PURE__*/(
    react.createElement(react.Fragment, null,
    " ", /*#__PURE__*/
    react.createElement("nav", null, /*#__PURE__*/
    react.createElement("div", { className: "topBar" },
    " ", /*#__PURE__*/
    react.createElement("div", { className: "tabEntry" }, /*#__PURE__*/
    react.createElement(NavLink, { to: "/" }, "Main Settings"), " "), /*#__PURE__*/

    react.createElement("div", { className: "tabEntry" }, /*#__PURE__*/
    react.createElement(NavLink, { to: "/values" }, "Resource Values"), " "), /*#__PURE__*/

    react.createElement("input", {
      className: "interrupt",
      type: "submit",
      value: "Interrupt Greyday",
      onClick: function onClick() {return (
          setProperty("greyday_interrupt", "true").then(function () {return (
              addNotification("Greyday has been asked to stop."));}));} }))),




    " ", /*#__PURE__*/
    react.createElement("div", { id: "notificationsContainer" }), /*#__PURE__*/
    react.createElement("div", { id: "greydayContainer" }, /*#__PURE__*/
    react.createElement(Outlet, null)),
    " ", /*#__PURE__*/
    react.createElement("input", {
      className: "save",
      onClick: function onClick() {return (
          saveSettings(settings).then(function (e) {
            var changed = JSON.parse(e);var _iterator = Layout_createForOfIteratorHelper(

              changed),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var _step$value = Layout_slicedToArray(_step.value, 3),prop = _step$value[0],prev = _step$value[1],now = _step$value[2];
                addNotification("".concat(prop, " changed from `").concat(prev, "` to `").concat(now, "`"));
              }} catch (err) {_iterator.e(err);} finally {_iterator.f();}

            if (changed.length == 0) {
              addNotification("No settings were modified.");
            }
          }));},

      type: "submit",
      value: "Save Changes" })));



};

/* harmony default export */ const components_Layout = (Layout);
;// CONCATENATED MODULE: ./src/relay/relay/App.tsx







function App(_ref) {var settings = _ref.settings;
  return /*#__PURE__*/(
    react.createElement(MemoryRouter, null,
    " ", /*#__PURE__*/
    react.createElement(Routes, null,
    " ", /*#__PURE__*/
    react.createElement(Route, { element: /*#__PURE__*/react.createElement(components_Layout, { settings: settings }) },
    " ", /*#__PURE__*/
    react.createElement(Route, { index: true, element: /*#__PURE__*/react.createElement(routes_Main, { settings: settings }) }), " ", /*#__PURE__*/
    react.createElement(Route, { path: "/:values", element: /*#__PURE__*/react.createElement(routes_Values, { settings: settings }) }), " "),
    " "),
    " "));


}

/* harmony default export */ const relay_App = (App);
;// CONCATENATED MODULE: ./src/relay/relay/index.tsx






getData(function (data) {
  react_dom.render( /*#__PURE__*/
  react.createElement(react.Fragment, null, /*#__PURE__*/
  react.createElement(relay_App, { notifications: data.notifications, settings: data.settings })),

  document.getElementById("root"));

});
})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;