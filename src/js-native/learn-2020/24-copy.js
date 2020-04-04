// 浅拷贝
function copy(arr) {
  return [].concat(arr);
}
// 深拷贝
function copy(arr) {
  var res = JSON.parse(JSON.stringify(arr));
  return res;
}

// 实现一个浅拷贝
function shallowCopy(obj) {
  if (typeof obj !== "object") return;
  var newObj = Array.isArray(obj) ? [] : {};

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
function deepCopy(obj) {
  if (typeof obj !== "object") return;
  const newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    const current = obj[key];
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof current === "object" ? deepCopy(current) : current;
    }
  }
  return newObj;
}
var arr = [
  1,
  2,
  3,
  4,
  { a: 1 },
  function() {
    alert(1);
  }
];
var res = deepCopy(arr);
res[4]["a"] = 2;
// console.log(res, arr);

// / isPlainObject 函数来自于  [JavaScript专题之类型判断(下) ](https://github.com/mqyqingfeng/Blog/issues/30)
var class2type = {};
var toString = class2type.toString;
var hasOwn = class2type.hasOwnProperty;

function isPlainObject(obj) {
  var proto, Ctor;
  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }
  proto = Object.getPrototypeOf(obj);
  if (!proto) {
    return true;
  }
  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  return (
    typeof Ctor === "function" &&
    hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object)
  );
}

function extend() {
  // 默认不进行深拷贝
  var deep = false;
  var name, options, src, copy, clone, copyIsArray;
  var length = arguments.length;
  // 记录要复制的对象的下标
  var i = 1;
  // 第一个参数不传布尔值的情况下，target 默认是第一个参数
  var target = arguments[0] || {};
  // 如果第一个参数是布尔值，第二个参数是 target
  if (typeof target == "boolean") {
    deep = target;
    target = arguments[i] || {};
    i++;
  }
  // 如果target不是对象，我们是无法进行复制的，所以设为 {}
  if (typeof target !== "object" && !isFunction(target)) {
    target = {};
  }

  // 循环遍历要复制的对象们
  for (; i < length; i++) {
    // 获取当前对象
    options = arguments[i];
    // 要求不能为空 避免 extend(a,,b) 这种情况
    if (options != null) {
      for (name in options) {
        // 目标属性值
        src = target[name];
        // 要复制的对象的属性值
        copy = options[name];

        // 解决循环引用
        if (target === copy) {
          continue;
        }

        // 要递归的对象必须是 plainObject 或者数组
        if (
          deep &&
          copy &&
          (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))
        ) {
          // 要复制的对象属性值类型需要与目标属性值相同
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && isPlainObject(src) ? src : {};
          }

          target[name] = extend(deep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  return target;
}

var a = extend(true, [4, 5, 6, 7, 8, 9], [1, 2, 3]);
console.log(a); // ???

var obj1 = {
  value: {
    3: 1
  }
};

var obj2 = {
  value: [5, 6, 7]
};

// var b = extend(true, obj1, obj2); // 
var c = extend(true, obj2, obj1); // 
// console.log(b)
console.log(c)