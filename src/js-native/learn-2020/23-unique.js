// 去重
function unique1(arr) {
  let result = [];
  for (var i = 0, iLen = arr.length; i < iLen; i++) {
    for (var j = 0, jLen = result.length; j < jLen; j++) {
      if (result[j] === arr[i]) break;
    }
    if (j === jLen) {
      result.push(arr[i]);
    }
  }
  return result;
}

function unique2(arr) {
  let arrary = [].concat(arr); // 避免修改原数组，存个副本
  for (let i = 0, len = arrary.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arrary[i] === arrary[j]) {
        arrary.splice(j, 1); // splice() 修改原数组，所以需要手动修改长度
        len--;
        j--;
      }
    }
  }
  return arrary;
}
function unique3(arr) {
  var result = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i]);
    }
  }
  return result;
}
// filter
function unique4(arr) {
  return arr.filter(function(item, i) {
    return arr.indexOf(item) === i;
  });
}

function unique5(array) {
  return array
    .concat()
    .sort()
    .filter(function(item, index, array) {
      return !index || item !== array[index - 1];
    });
}
// var array = [{ value: 1 }, { value: 1 }, { value: 2 }];

function unique6(array) {
  var obj = {};
  return array.filter(function(item) {
    console.log(typeof item + JSON.stringify(item));
    // object{"value":1}
    return obj.hasOwnProperty(typeof item + JSON.stringify(item))
      ? false
      : (obj[typeof item + JSON.stringify(item)] = true);
  });
}
function unique(arr) {
  return [...new Set(arr)];
}
function unique(arr) {
  const seen = new Map()
  return arr.filter((a) => !seen.has(a) && seen.set(a, 1))
}
var array = [1, 2, '1',4, 2, 3, 4, 1];

var result = unique(array);

console.log(result);
