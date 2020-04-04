// 循环去重

function unique1(arr) {
  var res = [];

  for (var i = 0, arrLen = arr.length; i < arrLen; i++) {
    for (var j = 0, resLen = res.length; j < resLen; j++) {
      if (arr[i] === res[j]) {
        break;
      }
    }
    // 如果array[i]是唯一的，那么执行完循环，j等于resLen
    if (j === resLen) {
      res.push(arr[i]);
    }
  }
  return res;
}

// indexOf
function unique2(arr) {
  var res = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    var current = arr[i];
    if (res.indexOf(current) === -1) {
      res.push(current)
    }
  }
  return res;
}

// sort

function unique3(arr) {
  var res = [];
  var sortArr = arr.concat().sort();
  var seen;
  for (var i = 0, len = sortArr.length; i < len; i++) {
    if (!i || seen !== sortArr[i]) {
      res.push(sortArr[i])
    }
    seen = sortArr[i];
  }
  return res;
}

// api

function unique4(arr, isSorted) {
  var res = [];
  var seen;

  for (var i = 0, len = arr.length; i < len; i++) {
    var value = arr[i];
    if (isSorted) {
      if (!i || seen !== value) {
        res.push(value);
      }
      seen = value;
    } else if (res.indexOf(value) === -1) {
      res.push(value);
    }
  }
  return res;
}

function unique(array, isSorted, iteratee) {
  var res = [];
  var seen = [];

  for (var i = 0, len = array.length; i < len; i++) {
    var value = array[i];
    var computed = iteratee ? iteratee(value, i, array) : value;

    if (isSorted) {
      if (!i || seen !== value) {
        res.push(value);
      }
      seen = value;
    } else if (iteratee) {
      if(seen.indexOf(computed) === -1) {
        seen.push(computed);
        res.push(value);
      }
    } else if (res.indexOf(value) === -1) {
      res.push(value);
    }
  }

  return res;
}

var arr = [1, 1, 2, 90, 1, '1', 'a', 'A'];
// console.log(unique(arr, false, function(item) {
//   return typeof item === 'string' ? item.toLowerCase() : item;
// }))

// filter
function unique5(array) {
  return array.filter(function(value, index, array) {
    return array.indexOf(value) === index;
  });
}

function unique6(array) {
  return array.concat().sort().filter(function(value, index, array) {
    return !index || value !== array[index - 1];
  });
}

// Object 键值对
function unique7(array) {
  var obj = {};
  return array.filter(function(item, index, array) {
    item += typeof item;
    return obj.hasOwnProperty(item) ? false : obj[item] = true;
  });
}

// es6

function unique8(array) {
  return Array.from(new Set(array));
}

function unique9(array) {
  return [...new Set(array)];
}

let unique10 = arr => [...new Set(arr)];

// 数组去重合并
function combine() {
  let arr = [].concat.apply([], arguments)
  return Array.from(new Set(arr));
}

// console.log(combine([1,2,3], [2,3,4,5,6]))

function unique11(arr) {
  let seen = new Map();
  return arr.filter(item => !seen.has(item) && seen.set(item, null));
}

console.log(unique11(arr))