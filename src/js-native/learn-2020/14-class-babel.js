"use strict";

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Parent = (function() {
  function Parent(opt) {
    _classCallCheck(this, Parent);

    this.name = opt.name;
  }

  Parent.prototype.getName = function getName() {
    return this.name;
  };

  return Parent;
})();

var Child = (function(_Parent) {
  _inherits(Child, _Parent);

  function Child(opt) {
    _classCallCheck(this, Child);

    var _this = _possibleConstructorReturn(this, _Parent.call(this, opt));

    _this.age = opt.age;
    return _this;
  }

  Child.prototype.getAge = function getAge() {
    return this.age + " years old.";
  };

  return Child;
})(Parent);

var me = new Child({ name: "Yang", age: 28 });
