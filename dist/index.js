"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _helpers = require("./helpers");
var _embeds = require("./embeds");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class EmbedContainer extends _react.Component {
  componentDidMount() {
    const {
      markup
    } = this.props;
    this.scripts = (0, _helpers.getScripts)(markup).map(src => this.injectScript(src)).filter(Boolean);
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.markup !== this.props.markup;
  }

  /**
    * Load a script URI and store references to the script tag nodes.
    *
    * @param {String} src The URI of the script to be loaded.
    * @param {HTMLElement} The injected script tag.
    */
  injectScript(src) {
    const {
      container
    } = this;
    const embed = (0, _embeds.getEmbedConfiguration)(src);
    if (embed && embed.isLoaded()) {
      embed.reload(container);
    } else {
      return (0, _helpers.injectScriptTag)(src);
    }
    return null;
  }
  render() {
    const {
      children,
      className
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: className,
      ref: node => {
        this.container = node;
      }
    }, children);
  }
}
EmbedContainer.defaultProps = {
  className: null
};
EmbedContainer.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.arrayOf(_propTypes.default.node)]).isRequired,
  className: _propTypes.default.string,
  markup: _propTypes.default.string.isRequired
};
var _default = exports.default = EmbedContainer;