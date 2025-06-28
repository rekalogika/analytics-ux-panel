function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == typeof e || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
import { Controller } from '@hotwired/stimulus';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
var _default = /*#__PURE__*/function (_Controller) {
  function _default() {
    return _callSuper(this, _default, arguments);
  }
  _inheritsLoose(_default, _Controller);
  var _proto = _default.prototype;
  _proto.connect = function connect() {
    var _this = this;
    this.element.data = this.getData();
    this.lang = this.element.dataset.lang;

    // ensure lang only contains alphanumeric or underscore
    this.lang = this.lang.toLowerCase().replace(/-/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
    if (this.lang) {
      import("flatpickr/dist/l10n/" + this.lang + ".js")["catch"](function (error) {
        _this.initialize(null);
      }).then(function (module) {
        var lang = module["default"]["default"][_this.lang];
        _this.initialize(lang);
      });
    } else {
      this.initialize(null);
    }
  };
  _proto.initialize = function initialize(lang) {
    var _this2 = this;
    var options = {
      mode: 'range',
      allowInput: true
    };
    if (lang) {
      options.locale = lang;
    }
    var start = this.element.dataset.start;
    var end = this.element.dataset.end;
    if (start && end) {
      options.defaultDate = [start, end];
      this.element.value = start + ' - ' + end;
    }
    this.flatpickr = flatpickr(this.element, options);
    this.element.addEventListener('change', function () {
      _this2.element.data = _this2.getData();
      _this2.dispatch('change', {});
    });
  };
  _proto.getData = function getData() {
    var value = this.element.value;

    // get start by using regex to remove first space to the end of string
    var start = value.replace(/ .*$/, '');

    // get end by removing start to the last space
    var end = value.replace(/^.* /, '');
    return {
      dimension: this.element.dataset.dimension,
      start: start,
      end: end
    };
  };
  _proto.disconnect = function disconnect() {
    this.flatpickr.destroy();
  };
  return _default;
}(Controller);
export { _default as default };