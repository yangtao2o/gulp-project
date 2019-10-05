## Object

```js
/**
 * 字符串字面量可以访问属性或方法，是因为引擎自动把字面量转换为String对象
 */
var strPrimitive = 'I am a string';
console.log(typeof strPrimitive);  // string

console.log(strPrimitive instanceof String);  // false

var strObject = new String('I am a string');
console.log(typeof strObject);  // object
console.log(strObject instanceof String);  // true

/**
 * 浅拷贝
 * Object.assign(..)
 */
function fn () {}
var myObject = {
  name: 'yt',
  age: 27,
  fn: fn
};
var newObj = Object.assign({}, myObject);
console.log(newObj.name)  // yt
console.log(newObj.fn === fn)  // true

/**
 * 对象常量
 */
var myObj = {};
Object.defineProperty(myObj, 'FAVORITE_NUMBER', {
  value: 27,
  writable: false,
  configurable: false,
})

console.log(myObj.FAVORITE_NUMBER)  // 27

myObj.FAVORITE_NUMBER = 72

console.log(myObj.FAVORITE_NUMBER)  // 72

/**
 * 禁止扩展
 */
var myObject2 = {
  a: 28
};
Object.preventExtensions(myObject2);
myObject2.b = 30;
console.log(myObject2.b)  // undefined

/**
 * getter
 */
var testObj = {
  // 给 a 定义一个 getter 
  get a() {
    return 2;
  }
};
Object.defineProperty(testObj, 'b', {
  get: function() {
    return this.a * 2;
  },
  enumerable: true
});
console.log(testObj.a);  // 2
console.log(testObj.b);  // 4

testObj.a = 3  // 只定义了 getter，set操作会忽略赋值操作
console.log(testObj.a)  // 2

/**
 * setter getter 一般一起出现
 */
var testObj2 = {
  // 给 a 设置一个 getter
  get a() {
    return this._a_;
  },
  // 给 a 设置一个 setter
  set a(val) {
    this._a_ = val * 2;
  }
}
testObj2.a = 2;
console.log(testObj2.a)  // 4
testObj2.a = 3;
console.log(testObj2.a)  // 6

/**
 * 存在性
 */
var testObj3 = {
  a: 2
};
console.log('a' in testObj3)  // true
console.log('b' in testObj3)  // false
console.log(testObj3.hasOwnProperty('a'))  // true
console.log(testObj3.hasOwnProperty('b'))  // false

/**
 * 枚举
 */
var testObj4 = { };
Object.defineProperty(testObj4, 'a', {
  enumerable: true,
  value: 2
});
Object.defineProperty(testObj4, 'b', {
  enumerable: false,  // 不可枚举
  value: 3
});

console.log(testObj4.b)  // 3
console.log(testObj4.hasOwnProperty('b'))  // true

for (var k in testObj4) {
  console.log(k, testObj4[k])
}
// 'a' 2

// 检查给定得属性名是否直接存在于该对象中
console.log(testObj4.propertyIsEnumerable('a'))  // true
console.log(testObj4.propertyIsEnumerable('b'))  // false

// Object.keys() 返回一个数组，包含所有可枚举属性
console.log(Object.keys(testObj4))  // [ 'a' ]
// Object.getOwnPropertyNames() 返回一个数组，包含所有属性，不管是否可枚举
console.log(Object.getOwnPropertyNames(testObj4))  // [ 'a', 'b' ]

/**
 * 遍历
 */

var myArray = [1, 2, 3];
for(var i = 0; i < myArray.length; i++) {
  console.log(myArray[i]);
}
// 1 2 3

/**
 * arr.forEach(callback(currentValue[, index[, arrary]])[, thisArg]);
 */
function logArrayElements(element, index, array) {
  console.log('a[' + index + '] = ' + element);
}

// 注意索引 2 被跳过了，因为在数组的这个位置没有项
[2, 5, , 9].forEach(logArrayElements);
// a[0] = 2
// a[1] = 5
// a[3] = 9

// 对象复制函数
function copy(obj) {
  // Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
  // Object.getPrototypeOf(object)方法返回指定对象的原型（内部[[Prototype]]属性的值
  var copy = Object.create(Object.getPrototypeOf(obj));
  // Object.getOwnPropertyNames(obj)方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组
  var propNames = Object.getOwnPropertyNames(obj);

  propNames.forEach(function(name) {
    // Object.getOwnPropertyDescriptor(obj, prop)方法返回指定对象上一个自有属性对应的属性描述符。
    // （自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
    var desc = Object.getOwnPropertyDescriptor(obj, name);
    // Object.defineProperty(obj, prop, descriptor)方法会直接在一个对象上定义一个新属性，
    // 或者修改一个对象的现有属性， 并返回这个对象
    Object.defineProperty(copy, name, desc);
  });

  return copy;
}

var copyObj1 = {
  a: 1,
  b: 2
};
var copyObj2 = copy(copyObj1);
console.log(copyObj2)  // { a: 1, b: 2 }
console.log(copyObj2 === copyObj1)  // false

/**
 * arr.some(callback(element[, index[, array]])[, thisArg])
 * 方法测试数组中是不是有元素通过了被提供的函数测试
 * 它返回一个布尔值
 */
var event1 = function(item, index) {
  return item === index
};
var event2 = function(item) {
  return item % 2 === 0
};
var arrTest = [1, 2, 3, 4];

console.log(arrTest.some(event1))  // false
console.log(arrTest.some(event2))  // true

/**
 * arr.every(callback(element[, index[, array]])[, thisArg])
 * 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试
 * 它返回一个布尔值
 */
var testEveryArr1 = [1, 2, 3];
var testEveryArr2 = [10, 20, 30];
console.log(testEveryArr1.every(item => item >= 10))  // false
console.log(testEveryArr2.every(item => item >= 10))  // true

/**
 * for...of
 * 在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环
 * 调用自定义迭代钩子，并为每个不同属性的值执行语句
 * 
 * for (variable of iterable) {
 *   statements
 * }
 * variable - 在每次迭代中，将不同属性的值分配给变量
 * iterable - 被迭代枚举其属性的对象
 * 
 * for...in 语句以任意顺序迭代对象的可枚举属性
 * for...of 语句遍历可迭代对象定义要迭代的数据
 */

var testForOfArr = [10, 20, 30];
for(var v of testForOfArr) {
  console.log(v) 
}
// 10 20 30

for(var key in testForOfArr) {
  console.log(key)
}
// 0 1 2

/**
 * 数组内置的 '@@iterator'
 * Symbol.iterator获取对象的 '@@iterator' 内部属性
 */
var it = testForOfArr[Symbol.iterator]();
console.log(it)  // Object [Array Iterator] {}
console.log(it.next())  // { value: 10, done: false }
console.log(it.next())  // { value: 20, done: false }
console.log(it.next())  // { value: 30, done: false }
console.log(it.next())  // { value: undefined, done: true }

/**
 * 自定义对象的 '@@iterator'
 * 普通对象没有内置的 '@@iterator'，所以无法自动完成 for...of 遍历
 */
var testIteratorObj = {
  a: 2,
  b: 3
};
Object.defineProperty(testIteratorObj, Symbol.iterator, {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function() {
    var o = this;
    var idx = 0;
    var ks = Object.keys(o);
    return {
      next: function() {
        return {
          value: o[ks[idx++]],  // ks = ['a'], idx = 0; ks[0] = 'a'; o[ks[0]] = o.a = 2;
          done: idx > ks.length
        }
      }
    }
  }
});

for(var value of testIteratorObj) {
  console.log({value})
}
// { value: 2 }
// { value: 3 }

var itObj = testIteratorObj[Symbol.iterator]();
console.log(itObj.next())  // { value: 2, done: false }
console.log(itObj.next())  // { value: 3, done: false }
console.log(itObj.next())  // { value: undefined, done: true }

/**
 * 迭代其他可迭代对象
 */
var randomObj = {
  [Symbol.iterator]() {
    return {
      next: function() {
        return {
          value: Math.random()
        };
      }
    };
  }
};

var randomsPool = [];
for(var n of randomObj) {
  randomsPool.push(n);
  if(randomsPool.length === 100) break;
}

/**
 * 用 Object.create实现类式继承
 * Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
 */

// Shape - 父类(superclass)
function Shape() {
  this.x = 0;
  this.y = 0;
}

// 父类的方法
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
}

// Rectangle - 子类(subclass)
function Rectangle() {
  Shape.call(this)
}
function OtherClass() {}
OtherClass.prototype.otherMethod = function() {
  console.log('OtherClass.')
}


// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype);

// 混合其他
Object.assign(Rectangle.prototype, OtherClass.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();
console.log('Is rect an instance of Rectangle?', rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape?', rect instanceof Shape); // true

rect.move(1, 1);  // Shape moved.
rect.otherMethod();  // OtherClass.

/**
 * 使用 Object.create 的 propertyObject 参数
 */

var o;
o = Object.create(null);  // 创建一个原型为null的空对象

o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);

o = Object.create(Object.prototype, {
  // foo会成为所创建对象的数据属性
  foo: {
    writable: true,
    configurable: true,
    value: 'hello'
  }, 
  // bar会成为所创建对象的访问器属性
  bar: {
    configurable: false,
    get: function() {
      return 10
    },
    set: function(value) {
      console.log("Setting `o.bar` to", value);
    }
  }
});

console.log(o.foo)  // hello
console.log(o.bar)  // 10
o.bar = 1;
console.log(o.bar)  // 10

function Constructor() { }
var o2 = new Constructor();
console.log({o2})  // { o2: Constructor {} }
// 相当于：
var o3 = Object.create(Constructor.prototype)
console.log({o3})  // { o3: Constructor {} }

// 创建一个以另一个空对象为原型,且拥有一个属性p的对象
var o4 = Object.create({}, {
  p: {
    value: 12
  }
});
console.log({o4})  // { o4: {} }
console.log(o4.p)  // 12
// 省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的:
o4.p = 21;
console.log(o4.p)  // 12

o4.q = 12
for (var prop in o4) {
   console.log(prop)
}
//"q"

delete o4.p
console.log(o4.p)  // 12

// 创建一个可写 可枚举 可配置的属性 p
var o5 = Object.create({}, {
  p: {
    value: 15,
    writable: true,
    enumerable: true,
    configurable: true
  }
});
o5.p = 51;
console.log(o5.p)  // 51

o5.q = 12
for (var prop in o5) {
   console.log({prop})
}
// { prop: 'p' }
// { prop: 'q' }

delete o5.p
console.log(o5.p)  // undefined


/**
 * Object.getPrototypeOf(object)
 * 返回指定对象的原型
 */
var prototype1 = {};
var o6 = Object.create(prototype1);
console.log(Object.getPrototypeOf(o6) === prototype1)  // true

Object.getPrototypeOf( {} ) === Object.prototype;  // true

/**
 * Object.getOwnPropertyNames(obj)
 * 返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组
 */
var arr7 = ['a', 'b', 'c'];
var o7 = {
  0: 'a',
  1: 'b',
  2: 'c'
}
console.log(Object.getOwnPropertyNames(arr7))  // [ '0', '1', '2', 'length' ]
console.log(Object.getOwnPropertyNames(o7))  // [ '0', '1', '2' ]

/**
 * Object.getOwnPropertyDescriptor(obj, prop)
 * 返回指定对象上一个自有属性对应的属性描述符。
 * 自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性
 */

var o8 = {
  bar: 2,
  get foo() { return 17; },
  baz: 10
};
console.log(Object.getOwnPropertyDescriptor(o8, 'bar'));
// { value: 2, writable: true, enumerable: true, configurable: true }

console.log(Object.getOwnPropertyDescriptor(o8, 'foo'));
// { get: [Function: get foo],
//   set: undefined,
//   enumerable: true,
//   configurable: true }

/**
 * Object.defineProperty(obj, prop, descriptor)
 * 会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象
 */
Object.defineProperty(o8, 'baz', {
  value: 8675309,
  writable: false,
  enumerable: false
});
console.log(Object.getOwnPropertyDescriptor(o8, 'baz'));
// { value: 8675309,
//   writable: false,
//   enumerable: false,
//   configurable: true }


/**
 * Object.keys(obj)
 * 会返回一个由一个给定对象的自身可枚举属性组成的数组
 * 数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致
 * 如果对象的键-值都不可枚举，那么将返回由键组成的数组
 */
var arr8 = ['a', 'b', 'c'];
console.log(Object.keys(arr8));  // [ '0', '1', '2' ]

var anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.keys(anObj));  // ['2', '7', '100']
```

## 资料
* [Array.prototype.forEach() 是如何使用 ECMAScript 5 Object.* 元属性（meta property ）函数工作](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#%E5%AF%B9%E8%B1%A1%E5%A4%8D%E5%88%B6%E5%87%BD%E6%95%B0)
* [for...of
](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)
* [Array.prototype.some()
](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
* [Array.prototype.every()
](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
* [Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
* [Object.keys()
](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
* [Object.defineProperty()
](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
* [Object.getOwnPropertyDescriptor()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)
* [Object.getOwnPropertyNames()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)
* [Object.getPrototypeOf()
](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf)