console.log(
  "typeof Number is: ",
  typeof 123,
  "\n",
  "typeof String is: ",
  typeof "abc",
  "\n",
  "typeof Boolean is: ",
  typeof true,
  "\n",
  "typeof Undefined is: ",
  typeof undefined,
  "\n",
  "typeof Null is: ",
  typeof null,
  "\n",
  "typeof Symbol is: ",
  typeof Symbol(),
  "\n",
  "typeof BigInt is: ",
  typeof BigInt(10),
  "\n",
  "typeof Object is: ",
  typeof {}
);

// 以下是15种：
var number = 1; // [object Number]
var string = "123"; // [object String]
var boolean = true; // [object Boolean]
var und = undefined; // [object Undefined]
var nul = null; // [object Null]
var obj = {
  a: 1
}; // [object Object]
var array = [1, 2, 3]; // [object Array]
var date = new Date(); // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g; // [object RegExp]
var func = function a() {}; // [object Function]
var symb = Symbol('test'); // [object Symbol]
var set = new Set(); // [object Set]
var map = new Map(); // [object Map]
var bigI = BigInt(1);  // [object BigInt]

function checkType() {
  for (var i = 0, l = arguments.length; i < l; i++) {
    console.log(Object.prototype.toString.call(arguments[i]));
  }
}

checkType(
  number,
  string,
  boolean,
  und,
  nul,
  obj,
  array,
  date,
  error,
  reg,
  func,
  symb,
  set,
  map,
  bigI
);


console.log(Object.prototype.toString.call(Math)); // [object Math]
console.log(Object.prototype.toString.call(JSON)); // [object JSON]

var fn = function () {
  console.log(Object.prototype.toString.call(arguments)); // [object Arguments]
};

fn();

var class2type = {};

"Boolean Number String Function Array Date RegExp Object Error Null Undefined Symbol Set Map"
.split(" ")
  .map(function (item) {
    class2type["[object " + item + "]"] = item.toLowerCase(); // e.g. '[object Boolean]': 'boolean'
  });

function type(obj) {
  if (obj == null) {
    return obj + ""; // IE6
  }
  return typeof obj === "object" || typeof obj === "function" ?
    class2type[Object.prototype.toString.call(obj)] || "object" :
    typeof obj;
}

function isFunction(obj) {
  return type(obj) === "function";
}

var isArray = Array.isArray || function (obj) {
  return type(obj) === 'array';
}

console.log(type(BigInt(1)));

