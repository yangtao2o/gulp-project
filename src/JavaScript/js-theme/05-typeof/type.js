// plainObject

var class2type = {};
// 相当于 Object.prototype.toString
var toString = class2type.toString;
var hasOwn = class2type.hasOwnProperty;

function isPlaintObject(obj) {
  var proto, Ctor;

  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }

  /**
   * getPrototypeOf es5 方法，获取 obj 的原型
   * 以 new Object 创建的对象为例的话
   * obj.__proto__ === Object.prototype
   */
  proto = Object.getOwnPropertyOf(obj);

  // 没有原型的对象是纯粹的，Object.create(null) 就在这里返回 true
  if (!proto) {
    return true;
  }

  /**
   * 以下判断通过 new Object 方式创建的对象
   * 判断 proto 是否有 constructor 属性，如果有就让 Ctor 的值为 proto.constructor
   * 如果是 Object 函数创建的对象，Ctor 在这里就等于 Object 构造函数
   */

}

function isEmptyObject(obj) {
  var name;
  // 判断是否有属性，for 循环一旦执行，就说明有属性，有属性就会返回 false
  for (name in obj) {
    return false;
  }
  return true;
}

console.log(isEmptyObject({})); // true
console.log(isEmptyObject([])); // true
console.log(isEmptyObject(null)); // true
console.log(isEmptyObject(undefined)); // true
console.log(isEmptyObject(1)); // true
console.log(isEmptyObject('')); // true
console.log(isEmptyObject(true)); // true

function isWindow(obj) {
  return obj !== null && obj === obj.window
}

// console.log(isWindow(window))

// 判断是不是 DOM 元素
function isElement(obj) {
  return !!(obj && obj.nodeType === 1);
}
var div = document.createElement('div');
console.log(isElement(div));  // true
console.log(isElement(''));   // false