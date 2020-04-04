var arr = [6, 4, 1, 8, 2, 11, 23];

function max(arr) {
  var res = arr[0];
  for (var i = 1, len = arr.length; i < len; i++) {
    res = Math.max(res, arr[i]);
  }
  return res;
}

function max(arr) {
  return arr.reduce((prev, next) => Math.max(prev, next));
}

var getMax = arr => arr.reduce((prev, next) => Math.max(prev, next));
var getMax = arr => arr.sort((a, b) => a - b)[arr.length - 1];
// var max = eval("Math.max(" + arr + ")");
var getMax = arr => Math.max.apply(null, arr);
var getMax = arr => Math.max(...arr)
console.log("Math.max(" + arr + ")")  // Math.max(6,4,1,8,2,11,23)
var max = getMax(arr);
console.log(max);
