"use strict";

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Person = (function() {
  // 类的内部所有定义的方法，都是不可枚举的
  function Person(name) {
    _classCallCheck(this, Person);

    // 实例属性
    this.name = name;
  }

  // 实例方法

  Person.prototype.sayHello = function sayHello() {
    return "hello, I am " + this.name;
  };

  // 静态属性
  // static _name = "ming";

  // 静态方法

  Person._getName = function _getName() {
    return "my name is " + this._name;
  };

  // getter 和 setter

  _createClass(Person, [
    {
      key: "age",
      get: function get() {
        return "20 years old";
      },
      set: function set(newAge) {
        console.log("new age 为：" + newAge);
      }
    }
  ]);

  return Person;
})();

// 静态属性

Person._name = "ming";


var me = new Person("tao");

me.age = 28;
// new age 为：28

console.log(me.age); // 20 years old
console.log(me.name); // tao
console.log(me._name); // undefined
// console.log(me._getName()); // Uncaught TypeError: me.getName is not a function

console.log(Person._name); // ming
console.log(Person._getName()); // my name is ming

Person(); //Uncaught TypeError: Cannot call a class as a function