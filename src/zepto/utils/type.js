// 判断数据类型
var class2type = {},
  toString = class2type.toString;

"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach((value, index) => {
  class2type["[object " + value + "]"] = value.toLowerCase();
});

function type(obj) {
  return obj == null 
  ? String(obj) 
  : class2type[toString.call(obj)] || "object";
}

function isFunction(value) {
  return type(value) === "function";
}

function isWindow(obj) {
  return obj != null && obj == obj.window;
}

function isDocument(obj) {
  return obj != null && obj.nodeType == obj.DOCUMENT_NODE;
}

function isObject(obj) {
  return type(obj) === "object";
}

// 判断是否是由字面量形式 {} 或者是构造函数 new Object 创建的对象 
function isPlainObject(obj) {
  return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

console.log(isPlainObject({}))  // true
console.log(isPlainObject(new Object))  // true
console.log(isPlainObject(window.toString))  // false


