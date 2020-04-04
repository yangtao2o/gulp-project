"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../../../../@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("../../../../../prop-types/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = require("../../../../../classnames/index.js");

var _index6 = _interopRequireDefault(_index5);

var _component = require("../../common/component.js");

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AtTabBar = (_temp2 = _class = function (_AtComponent) {
  _inherits(AtTabBar, _AtComponent);

  function AtTabBar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AtTabBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AtTabBar.__proto__ || Object.getPrototypeOf(AtTabBar)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "loopArray1", "tabList", "customStyle", "className", "fixed", "backgroundColor", "current", "color", "iconSize", "fontSize", "selectedColor"], _this.customComponents = ["AtBadge"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AtTabBar, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(AtTabBar.prototype.__proto__ || Object.getPrototypeOf(AtTabBar.prototype), "_constructor", this).call(this, props);

      this.$$refs = [];
    }

    // constructor () {
    //   super(...arguments)
    //   this.state = {
    //     isIPhoneX: false
    //   }
    // }

    // componentDidMount () {
    //   const curEnv = Taro.getEnv()

    //   if (
    //     curEnv === Taro.ENV_TYPE.WEAPP &&
    //     Taro.getSystemInfoSync().model.indexOf('iPhone X') >= 0
    //   ) {
    //     this.setState({ isIPhoneX: true })
    //   }
    // }

  }, {
    key: "handleClick",
    value: function handleClick() {
      var _props;

      (_props = this.props).onClick.apply(_props, arguments);
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _props2 = this.__props,
          customStyle = _props2.customStyle,
          className = _props2.className,
          fixed = _props2.fixed,
          backgroundColor = _props2.backgroundColor,
          tabList = _props2.tabList,
          current = _props2.current,
          color = _props2.color,
          iconSize = _props2.iconSize,
          fontSize = _props2.fontSize,
          selectedColor = _props2.selectedColor;
      // const { isIPhoneX } = this.state

      var defaultStyle = {
        color: color || ''
      };
      var selectedStyle = {
        color: selectedColor || ''
      };
      var titleStyle = {
        fontSize: fontSize ? fontSize + "px" : ''
      };
      var rootStyle = {
        backgroundColor: backgroundColor || ''
      };
      var imgStyle = {
        width: iconSize + "px",
        height: iconSize + "px"
      };

      var anonymousState__temp = (0, _index6.default)({
        'at-tab-bar': true,
        'at-tab-bar--fixed': fixed
        // 'at-tab-bar--ipx': isIPhoneX
      }, className);
      var anonymousState__temp2 = (0, _index.internal_inline_style)(this.mergeStyle(rootStyle, customStyle));
      var loopArray1 = tabList.map(function (item, i) {
        var _classNames;

        item = {
          $original: (0, _index.internal_get_original)(item)
        };
        var $loopState__temp4 = (0, _index6.default)('at-tab-bar__item', { 'at-tab-bar__item--active': current === i });
        var $loopState__temp6 = (0, _index.internal_inline_style)(current === i ? selectedStyle : defaultStyle);
        var $loopState__temp8 = item.$original.iconType ? !!item.$original.dot : null;
        var $loopState__temp10 = item.$original.iconType ? (0, _index6.default)("" + (item.$original.iconPrefixClass || 'at-icon'), (_classNames = {}, _defineProperty(_classNames, (item.$original.iconPrefixClass || 'at-icon') + "-" + item.$original.selectedIconType, current === i && item.$original.selectedIconType), _defineProperty(_classNames, (item.$original.iconPrefixClass || 'at-icon') + "-" + item.$original.iconType, !(current === i && item.$original.selectedIconType)), _classNames)) : null;
        var $loopState__temp12 = item.$original.iconType ? (0, _index.internal_inline_style)({
          color: current === i ? selectedColor : color,
          fontSize: iconSize ? iconSize + "px" : ''
        }) : null;
        var $loopState__temp14 = item.$original.image ? !!item.$original.dot : null;
        var $loopState__temp16 = item.$original.image ? (0, _index6.default)('at-tab-bar__inner-img', {
          'at-tab-bar__inner-img--inactive': current !== i
        }) : null;
        var $loopState__temp18 = item.$original.image ? (0, _index.internal_inline_style)(imgStyle) : null;
        var $loopState__temp20 = item.$original.image ? (0, _index6.default)('at-tab-bar__inner-img', {
          'at-tab-bar__inner-img--inactive': current === i
        }) : null;
        var $loopState__temp22 = item.$original.image ? (0, _index.internal_inline_style)(imgStyle) : null;
        var $loopState__temp24 = (0, _index.internal_inline_style)(titleStyle);
        var $compid__36 = (0, _index.genCompid)(__prefix + "GgLKDtjhkc" + i);
        item.$original.iconType && _index.propsManager.set({
          "dot": $loopState__temp8,
          "value": item.$original.text,
          "maxValue": item.$original.max
        }, $compid__36);
        var $compid__37 = (0, _index.genCompid)(__prefix + "HkrvKCInhb" + i);
        item.$original.image && _index.propsManager.set({
          "dot": $loopState__temp14,
          "value": item.$original.text,
          "maxValue": item.$original.max
        }, $compid__37);
        var $compid__38 = (0, _index.genCompid)(__prefix + "CnyrYNSGbJ" + i);
        _index.propsManager.set({
          "dot": item.$original.iconType || item.$original.image ? false : !!item.$original.dot,
          "value": item.$original.iconType || item.$original.image ? '' : item.$original.text,
          "maxValue": item.$original.iconType || item.$original.image ? '' : item.$original.max
        }, $compid__38);
        return {
          $loopState__temp4: $loopState__temp4,
          $loopState__temp6: $loopState__temp6,
          $loopState__temp8: $loopState__temp8,
          $loopState__temp10: $loopState__temp10,
          $loopState__temp12: $loopState__temp12,
          $loopState__temp14: $loopState__temp14,
          $loopState__temp16: $loopState__temp16,
          $loopState__temp18: $loopState__temp18,
          $loopState__temp20: $loopState__temp20,
          $loopState__temp22: $loopState__temp22,
          $loopState__temp24: $loopState__temp24,
          $compid__36: $compid__36,
          $compid__37: $compid__37,
          $compid__38: $compid__38,
          $original: item.$original
        };
      });
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        loopArray1: loopArray1,
        tabList: tabList
      });
      return this.__state;
    }
  }]);

  return AtTabBar;
}(_component2.default), _class.$$events = ["handleClick"], _class.$$componentPath = "Users/yangtao/Documents/GitHub/gulp-project/project/wxcode/myApp/node_modules/taro-ui/dist/weapp/components/tab-bar/index", _temp2);


AtTabBar.defaultProps = {
  customStyle: '',
  className: '',
  fixed: false,
  current: 0,
  scroll: false,
  tabList: [],
  onClick: function onClick() {}
};

AtTabBar.propTypes = {
  customStyle: _index4.default.oneOfType([_index4.default.object, _index4.default.string]),
  className: _index4.default.oneOfType([_index4.default.array, _index4.default.string]),
  fixed: _index4.default.bool,
  backgroundColor: _index4.default.string,
  current: _index4.default.number,
  iconSize: _index4.default.oneOfType([_index4.default.number, _index4.default.string]),
  fontSize: _index4.default.oneOfType([_index4.default.number, _index4.default.string]),
  color: _index4.default.string,
  selectedColor: _index4.default.string,
  scroll: _index4.default.bool,
  tabList: _index4.default.array,
  onClick: _index4.default.func
};
exports.default = AtTabBar;

Component(require('../../../../../@tarojs/taro-weapp/index.js').default.createComponent(AtTabBar));