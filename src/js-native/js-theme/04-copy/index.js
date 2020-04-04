// 浅拷贝

var arr = ['old', 1, true, null, undefined];

var newArr = arr.concat();
newArr.shift()
console.log(arr, newArr)

var newArr2 = arr.slice();

console.log(arr, newArr2)

var arrObj = [{
    a: 1
  },
  {
    b: 2
  }
];

var newArrObj = arrObj.concat();
newArrObj[0].a = 'aaa';
console.log(newArrObj) // [ { a: 'aaa' }, { b: 2 } ]
console.log(arrObj) // [ { a: 'aaa' }, { b: 2 } ]

// 数组的深拷贝

var arr1 = ['old', 1, true, ['old1', 'old2'], {
  old: 1
}, function () {}];
var newArr1 = JSON.parse(JSON.stringify(arr1));
newArr1.shift();
console.log(arr1) // [ 'old', 1, true, [ 'old1', 'old2' ], { old: 1 }, [Function] ]
console.log(newArr1) // [ 1, true, [ 'old1', 'old2' ], { old: 1 }, null ]

// 实现浅拷贝
var shallowCopy = function (obj) {
  if (typeof obj !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};

  for (var key in obj) {
    console.log(key, obj[key])
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
}

var arr20 = ['old', 1, true, ['old1', 'old2'], {
  old: 1
}, function () {}];
var newArr20 = shallowCopy(arr20);

console.log({
  newArr20
})
// [ 'old', 1, true, [ 'old1', 'old2' ], { old: 1 }, [Function] ]


// 实现深拷贝

var deepCopy = function (obj) {
  if (typeof obj !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] !== 'object' ? obj[key] : deepCopy(obj[key]);
    }
  }

  return newObj;
}

var obj = {
  a: function () {},
  b: {
    name: 'Tony',
    age: 10
  },
  c: [1, 2, 3]
};

var newObj = deepCopy(obj);
console.log(newObj);

// { a: [Function: a],
  // b: { name: 'Tony', age: 10 },
  // c: [ 1, 2, 3 ] }