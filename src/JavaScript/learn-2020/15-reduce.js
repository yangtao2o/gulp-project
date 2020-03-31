const array1 = [1, 2, 3, 4];
let result = array1.reduce((prev, curr) => prev + curr);
var flattened = [
  [0, 1],
  [2, 3],
  [4, 5]
].reduce((acc, cur) => acc.concat(cur), []);

var names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];

var countedNames = names.reduce(function(allNames, name) {
  if (name in allNames) {
    allNames[name]++;
  } else {
    allNames[name] = 1;
  }
  return allNames;
}, {});

var people = [
  { name: "Alice", age: 21 },
  { name: "Max", age: 20 },
  { name: "Jane", age: 20 }
];

function groupBy(objectArray, property) {
  return objectArray.reduce(function(acc, obj) {
    var key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

var groupedPeople = groupBy(people, "age");

let arr = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
let resultArr = arr.sort().reduce((init, current) => {
  if (init.length === 0 || init[init.length - 1] !== current) {
    init.push(current);
  }
  return init;
}, []);
console.log(resultArr); //[1,2,3,4,5]

/**
 * Runs promises from array of functions that can return promises
 * in chained manner
 * 按顺序运行Promise
 *
 * @param {array} arr - promise arr
 * @return {Object} promise object
 */
function runPromiseInSequence(arr, input) {
  return arr.reduce(
    (promiseChain, currentFunction) => promiseChain.then(currentFunction),
    Promise.resolve(input)
  );
}

// promise function 1
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5);
  });
}

// promise function 2
function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2);
  });
}

// function 3  - will be wrapped in a resolved promise by .then()
function f3(a) {
  return a * 3;
}

// promise function 4
function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4);
  });
}

const promiseArr = [p1, p2, f3, p4];
runPromiseInSequence(promiseArr, 10).then(console.log); // 1200

// Building-blocks to use for composition
const double = x => x + x;
const triple = x => 3 * x;
const quadruple = x => 4 * x;

// Function composition enabling pipe functionality
// const pipe = (...functions) => input => functions.reduce(
//     (acc, fn) => fn(acc),
//     input
// );
const pipe = function(...functions) {
  return function(input) {
    return functions.reduce(function(acc, fn) {
      return fn(acc);
    }, input);
  };
};

// Composed functions for multiplication of specific values
const multiply6 = pipe(double, triple);
const multiply9 = pipe(triple, triple);
const multiply16 = pipe(quadruple, quadruple);
const multiply24 = pipe(double, triple, quadruple);

// Usage
multiply6(6); // 36
multiply9(9); // 81
multiply16(16); // 256
multiply24(10); // 240

// 模拟
Array.prototype.myreduce = function(callback, initialValue) {
  // 判断第一次调用 callback 函数时的第一个参数的值。
  // 如果没有提供初始值，则将使用数组中的第一个元素。
  const _this = this;
  let accumulator = initialValue ? initialValue : this[0];

  for (let i = initialValue ? 0 : 1; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, _this);
  }
  return accumulator;
};

Array.prototype.myreduce2 = function reduce(callbackfn) {
  const O = this; // 保存原数组
  const len = O.length >>> 0;  // typeof ('1' >>> 0) -> number
  let k = 0, // 下标值初始化
    accumulator = undefined, // 累加器初始化
    kPresent = false, // k下标对应的值是否存在
    initialValue = arguments.length > 1 ? arguments[1] : undefined; // 初始值

  if (typeof callbackfn !== "function") {
    thrownewTypeError(callbackfn + " is not a function");
  }

  // 数组为空，并且有初始值，报错
  if (len === 0 && arguments.length < 2) {
    thrownewTypeError("Reduce of empty array with no initial value");
  }

  // 如果初始值存在，累加器为初始值，否则使用数组中的第一个元素
  if (arguments.length > 1) {
    accumulator = initialValue;
  } else {
    accumulator = O[k++];
  }

  while (k < len) {
    // 判断是否为 empty [,,,]
    kPresent = O.hasOwnProperty(k);

    if (kPresent) {
      const kValue = O[k];  // 当前值
      // 调用 callbackfn
      accumulator = callbackfn(accumulator, kValue, k, O);
    }
    k++;
  }

  return accumulator;
};

// 使用
let arrs = [1, 2, 3, 4];
let sum = arrs.myreduce2((acc, val) => {
  acc += val;
  return acc;
}, 5);

console.log(sum); // 15
