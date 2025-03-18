"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectScriptTag = exports.getScripts = exports.INJECTED_SCRIPT = exports.EXTERNAL_SCRIPT = exports.ANY_SCRIPT = void 0;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const ANY_SCRIPT = exports.ANY_SCRIPT = /<script[\s\S]*?>[\s\S]*?<\/script>/gi;
const EXTERNAL_SCRIPT = exports.EXTERNAL_SCRIPT = /<script[^>]+src=(['"])(.*?)\1/i;
const INJECTED_SCRIPT = exports.INJECTED_SCRIPT = /<script[\s\S]*?>[\s\S]*?createElement[\s\S]*?src\s?=\s?(['"])(.*?)\1/i;

/**
 * Find the URI for the external file loaded from a script tag.
 *
 * @param {String} script The string HTML of a <script> tag.
 * @returns {String|null} The URI of the requested external script, otherwise null.
 */
const extractExternalScriptURL = script => {
  const match = script.match(EXTERNAL_SCRIPT);
  // Return null if no match, otherwise return the second capture group.
  return match && match[2];
};

/**
 * Find the URI for a script being injected from inline JS.
 *
 * @param {String} script The string HTML of a <script> tag.
 * @returns {String|null} The URI of a script being injected from inline JS, otherwise null.
 */
const extractInjectedScriptURL = script => {
  const match = script.match(INJECTED_SCRIPT);
  // Return null if no match, otherwise return the second capture group.
  return match && match[2];
};

/**
 * Match either external or inline-script-injected script tag source URIs.
 *
 * @param {String} script The string HTML of a <script> tag
 * @returns {String|null} The URI of the script file this script tag loads, or null.
 */
const extractScriptURL = script => extractExternalScriptURL(script) || extractInjectedScriptURL(script);

/**
 * Remove duplicate or undefined values from an array of strings.
 *
 * @param {String[]} Array script file URIs.
 */
const uniqueURIs = scripts => Object.keys(scripts.reduce((keys, script) => script ? _objectSpread(_objectSpread({}, keys), {}, {
  [script]: true
}) : keys, {}));

/**
 * Parse a string of HTML and identify the JS files loaded by any contained script tags.
 *
 * @param {String} string String containing HTML markup which may include script tags.
 * @returns {String[]} Array of any script URIs we believe to be loaded in this HTML.
 */
const getScripts = string => {
  const scripts = string.match(/<script[\s\S]*?<\/script>/gi);
  return scripts ? uniqueURIs(scripts.map(extractScriptURL)) : [];
};

/**
 * Create & inject a new <script> tag into the page.
 *
 * @param {String} src A script URL.
 * @returns {HTMLElement} The injected script tag.
 */
exports.getScripts = getScripts;
const injectScriptTag = src => {
  const scriptTag = document.createElement('script');
  // Workaround for HTML-encoded entities in URI (relevant to Facebook)
  scriptTag.src = src.replace('&amp;', '&');
  document.head.appendChild(scriptTag);
  return scriptTag;
};
exports.injectScriptTag = injectScriptTag;