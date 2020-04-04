"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = (_temp2 = _class = function (_BaseComponent) {
  _inherits(Index, _BaseComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "$compid__79", "$compid__80", "$compid__81", "$compid__82"], _this.config = {
      navigationBarTitleText: "首页"
    }, _this.customComponents = ["AtNavBar", "AtAvatar", "GridLayout", "AtButton", "AtTabBar"], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "_constructor",
    value: function _constructor(props) {
      _get(Index.prototype.__proto__ || Object.getPrototypeOf(Index.prototype), "_constructor", this).call(this, props);
      this.status = {};
      this.$$refs = [];
    }
  }, {
    key: "handleClick",
    value: function handleClick() {}
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "componentDidShow",
    value: function componentDidShow() {}
  }, {
    key: "componentDidHide",
    value: function componentDidHide() {}
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;
      var $compid__79 = (0, _index.genCompid)(__prefix + "$compid__79");
      var $compid__80 = (0, _index.genCompid)(__prefix + "$compid__80");
      var $compid__81 = (0, _index.genCompid)(__prefix + "$compid__81");
      var $compid__82 = (0, _index.genCompid)(__prefix + "$compid__82");
      var anonymousState__temp = [{ title: "待办事项", iconType: "bullet-list", text: "new" }, { title: "拍照", iconType: "camera" }, { title: "文件夹", iconType: "folder", text: "100", max: "99" }];
      _index.propsManager.set({
        "onClickRgIconSt": this.handleClick,
        "onClickRgIconNd": this.handleClick,
        "onClickLeftIcon": this.handleClick,
        "color": "#000",
        "leftText": "\u8FD4\u56DE",
        "rightFirstIconType": "bullet-list",
        "rightSecondIconType": "user"
      }, $compid__79);
      _index.propsManager.set({
        "circle": true,
        "text": "Tao",
        "image": "https://jdc.jd.com/img/200",
        "size": "large"
      }, $compid__80);
      _index.propsManager.set({
        "type": "primary"
      }, $compid__81);
      _index.propsManager.set({
        "backgroundColor": "#ececec",
        "color": "#ea6bb8",
        "tabList": anonymousState__temp
      }, $compid__82);
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        $compid__79: $compid__79,
        $compid__80: $compid__80,
        $compid__81: $compid__81,
        $compid__82: $compid__82
      });
      return this.__state;
    }
  }]);

  return Index;
}(_index.Component), _class.$$events = [], _class.$$componentPath = "pages/index/index", _temp2);
exports.default = Index;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(Index, true));