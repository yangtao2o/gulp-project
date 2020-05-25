// JavaScript深入之从原型到原型链

// 构造函数创建对象
function Person() {}
var person = new Person();
person.name = "Yangtao";
// prototype ->
// 每一个函数都有一个 prototype 属性，这个属性指向了一个对象
// 这个对象就是调用该构造函数而创建的实例的原型，比如 person1 的原型
Person.prototype.name = "ming";
var person1 = new Person();

// 原型
// 每一个JS对象（除null外），在创建的时候会与之关联另一个对象
// 每一个对象都会从原型‘继承’属性

// __proto__
// 每一个JS对象（除null外）都具有一个属性，叫 __proto__，这个属性会指向该对象的原型
person1.__proto__ === Person.prototype; // true
// ES5 获取对象的原型
Object.getPrototypeOf(person1) === Person.prototype; // true

// constructor
// 每一个原型都有一个 constructor 属性指向关联的构造函数
Person.prototype.constructor === Person; // true
function Foo() {
  getName = function() {
    alert(1);
  };
  return this;
}
Foo.getName = function() {
  alert(2);
};
Foo.prototype.getName = function() {
  alert(3);
};
var getName = function() {
  alert(4);
};
function getName() {
  alert(5);
}

//请写出以下输出结果：
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
