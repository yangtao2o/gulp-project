// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {
  Array.prototype.map = function(callback /*, thisArg*/) {
    var T, A, k;

    if (this == null) {
      throw new TypeError("this is null or not defined");
    }

    var O = Object(this);
    var len = O.length >>> 0;

    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    if (arguments.length > 1) {
      T = arguments[1];
    }

    A = new Array(len);
    k = 0;

    while (k < len) {
      var kValue, mappedValue;
      if (k in O) {
        kValue = O[k];
        mappedValue = callback.call(T, kValue, k, O);
        A[k] = mappedValue;
      }
      k++;
    }
    return A;
  };
}

if (!Array.prototype.myfilter) {
  Array.prototype.myfilter = function(func /*, thisArg*/) {
    "use strict";
    if (!((typeof func === "Function" || typeof func === "function") && this))
      throw new TypeError();

    var len = this.length >>> 0,
      res = new Array(len), // preallocate array
      t = this,
      c = 0,
      i = -1,
      T;

    if (arguments.length > 1) {
      T = arguments[1];
    }

    while (++i !== len) {
      if (i in this) {
        if (func.call(T, t[i], i, t)) {
          res[c++] = t[i];
        }
      }
    }

    res.length = c; // shrink down array to proper size
    return res;
  };
}
const fruits = ["apple", "banana", "grapes", "mango", "orange"];
const filterItems = (query) => {
  return fruits.myfilter((el) =>
    el.toLowerCase().indexOf(query.toLowerCase()) > -1
  );
}

console.log(filterItems('ap')); // ['apple', 'grapes']
console.log(filterItems('an')); // ['banana', 'mango', 'orange']