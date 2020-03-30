var class2type = {};  // 如：[object Array]: "array"

"Boolean Number String Function Array Date RegExp Object Error Null Undefined Symbol Set Map BigInt"
  .split(" ")
  .map(function(item) {
    class2type["[object " + item + "]"] = item.toLowerCase();
  });

function type(obj) {
  if (obj == null) {
    return obj + ""; // IE6
  }
  return typeof obj === "object" || typeof obj === "function"
    ? class2type[Object.prototype.toString.call(obj)]
    : typeof obj;
}

function isFunction(obj) {
  return type(obj) === "function";
}

var isArray =
  Array.isArray ||
  function(obj) {
    return type(obj) === "array";
  };

console.log(isArray([]));

Array.myIsArray = function(o) {
  return Object.prototype.toString.call(o) === "[object Array]";
};
console.log(Array.myIsArray([])); // true
