// 判断数据类型
var class2type = {},
  $,
  uniq,
  emptyArray = [],
  filter = emptyArray.filter,
  toString = class2type.toString,
  elementDisplay = {},
  cssNumber = {
    "column-count": 1,
    columns: 1,
    "font-weight": 1,
    "line-height": 1,
    opacity: 1,
    "z-index": 1,
    zoom: 1
  };

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

// $.type = type;
// $.isFunction = isFunction;
// $.isWindow = isWindow;

function likeArray(obj) {
  var length = !!obj && "length" in obj && obj.length;
  var type = $.type(obj);
  
  return (
    "function" !== type && 
    !isWindow(obj) && 
    ("array" === type || length === 0 ||
    (typeof length === "number" && length > 0 && length - 1 in obj))
  );
}

// 使用行内函数来修改匹配到的字符
function styleHyphenFormat(propertyName) {
  //在返回前，替换函数允许匹配片段作为参数，并且将它和连字符进行连接作为新的片段
  function upperToHyphenLower(match) {
    console.log(match)  // 'T'
    return '-' + match.toLowerCase();
  }
  return propertyName.replace(/[A-Z]/g, upperToHyphenLower);
}
styleHyphenFormat('borderTop');  // 'border-top'

function dasherize(str) {
  return str
    .replace(/::/g, "/")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .replace(/([a-z\d])([A-Z])/g, "$1_$2")
    .replace(/_/g, "-")
    .toLowerCase();
}

console.log(dasherize('borderTop'));  // border-top
console.log(dasherize('width: 100px, height: 200px'));  // width: 100px, height: 200px
console.log(dasherize('paddingTop: 10px, backgroundColor: #ccc'));  // padding-top: 10px, background-color: #ccc

function maybeAddPx(name, value) {
  return typeof value == "number" && !cssNumber[dasherize(name)]
    ? value + "px"
    : value;
}
console.log(maybeAddPx('paddingTop', 10))  // '10px'
console.log(maybeAddPx('paddingTop', '10px'))  // '10px'
// 数组去重
uniq = function(array) {
  return filter.call(array, function(item, idx) {
    console.log(item, idx, array.indexOf(item));
    return array.indexOf(item) == idx;
  })
}

console.log(uniq([1,3,2,2]))
console.log(uniq([1,3,222,2, 4, 3]))

function defaultDisplay(nodeName) {
  var element, display;
  if (!elementDisplay[nodeName]) {
    element = document.createElement(nodeName);
    document.body.appendChild(element);
    // Window.getComputedStyle()方法返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有CSS属性的值
    // getPropertyValue()方法可以获取CSS样式申明对象上的属性值（直接属性名称）
    // https://www.zhangxinxu.com/wordpress/2012/05/getcomputedstyle-js-getpropertyvalue-currentstyle/
    display = getComputedStyle(element, "").getPropertyValue("display");  // getComputedStyle(element, "")["display"]
    element.parentNode.removeChild(element);
    display == "none" && (display = "block");
    elementDisplay[nodeName] = display;
  }
  return elementDisplay[nodeName];
}
