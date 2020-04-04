// valueOf() 方法返回指定对象的原始值
var arr = [1, 2, 3, "a"];
console.log(arr.valueOf() === arr); // true

function foo() {}
console.log(foo.valueOf() === foo); // true

var o = { name: "yyy", age: 28 };
console.log(o.valueOf() === o); // true

// toString() 方法返回一个表示该对象的字符串
console.log(o.toString()); // [object Object]
var myToString = Object.prototype.toString;
console.log(myToString.call(new Number(1))); // [object Number]
console.log(myToString.call(new Boolean(1))); // [object Boolean]

function Parent(name, age) {
  this.name = name;
  this.age = age;
}

Parent.prototype.getName = function() {
  return this.name;
};

function Child(name, age) {
  Parent.call(this, name, age);
}

// Child.prototype.__proto__ = Parent.prototype;
// Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

var me = new Child("yangtao", 28);
console.log(me.age);
console.log(me.getName());
console.log(Child.prototype.constructor);

// Object.getPrototypeOf() 方法返回指定对象的原型（内部[[Prototype]]属性的值
console.log(Object.getPrototypeOf(Child.prototype) === Parent.prototype);

// isPrototypeOf() 方法用于测试一个对象是否存在于另一个对象的原型链上
console.log("isPrototype: ", Parent.prototype.isPrototypeOf(Child.prototype));

// instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
console.log("instance: ", me instanceof Child);

// isPrototypeOf() 与 instanceof 运算符区别：
// 在表达式 "object instanceof AFunction"中，
// object 的原型链是针对 AFunction.prototype 进行检查的，而不是针对 AFunction 本身。

// Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

const o1 = { a: 1 };
const o2 = { a: 2, b: 2 };
const o3 = { b: 3, c: 3 };

const myobj2 = Object.assign({}, o1); // 拷贝
console.log(myobj2, o1);

let obj1 = { a: 0, b: { c: 0 } };
let obj2 = Object.assign(obj1);
console.log(obj2); //因为 Object.assign()拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。
let obj3 = JSON.parse(JSON.stringify(obj1));
console.log(obj3);

const myobj = Object.assign(o1, o2, o3);
console.log(myobj); // { a: 2, b: 3, c: 3 }
console.log(o1); // { a: 2, b: 3, c: 3 }, 注意目标对象自身也会改变

function Archiver() {
  var temperature = null;
  var archive = [];

  Object.defineProperty(this, "temperature", {
    get: function() {
      console.log("get!");
      return temperature;
    },
    set: function(value) {
      temperature = value;
      archive.push({ val: temperature });
    }
  });

  this.getArchive = function() {
    return archive;
  };
}

var myArchiver = new Archiver();
myArchiver.temperature;
myArchiver.temperature = "hhahh";
myArchiver.temperature = "hhahh2";
console.log(myArchiver.getArchive());

// Object.getOwnPropertyDescriptor(obj, prop)
// 返回指定对象上一个自有属性对应的属性描述符。
console.log(Object.getOwnPropertyDescriptor(myArchiver, "temperature"));

//{ get: [Function: get],
// set: [Function: set],
// enumerable: false,
// configurable: false }

// Object.getOwnPropertyNames(obj)
// 返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组
console.log(Object.getOwnPropertyNames(myArchiver)); // [ 'temperature', 'getArchive' ]

// Object.seal()方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。
// 当前属性的值只要原来是可写的就可以改变。
// 使用Object.freeze()冻结的对象中的现有属性是不可变的。
// 使用Object.seal()密封的对象可以改变其现有属性。

var o4 = {a: 'hhh', b: 111};
var o5 = Object.seal(o4);
o4.a = 'fff';
console.log(o4, o5)
console.log(Object.isSealed(o4))
console.log(Object.isSealed(o5))
delete o5.a;
console.log(o5)

var o6 = Object.freeze({a: 'hhh', b: 111});
o6.a = 'hjk';
console.log('freeze: ', o6)
console.log(Object.isFrozen(o4))  // false
console.log(Object.isFrozen(o6))  // true
delete o6.a;
console.log(o6)  // { a: 'hhh', b: 111 }
