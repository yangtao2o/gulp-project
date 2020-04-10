function curry1(fn, length) {
  length = length || fn.length;

  var slice = Array.prototype.slice;

  var res = function() {
    var resss;
    if (arguments.length < length) {
      var combined = [fn].concat(slice.call(arguments));
      resss = curry(sub_curry.apply(this, combined), length - arguments.length);
    } else {
      resss = fn.apply(this, arguments);
    }
    return resss;
  };

  return res;
}

function curry(fn, args) {
  // debugger
  var length = fn.length;
  args = args || [];

  var res = function() {
    var _args = args.slice(0),
      arg,
      i;
    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      _args.push(arg);
    }
    if (_args.length < length) {
      return curry(fn, _args);
    } else {
      return fn.apply(this, _args);
    }
  };
  return res;
}

function curry(fn, args) {
  const len = fn.length;
  args = args || [];
  return function() {
    let newArgs = [].slice.call(arguments, 0);
    let _args = args.concat(newArgs);
    if (_args.length < len) {
      return curry(fn, _args);
    } else {
      return fn.apply(this, _args);
    }
  };
}
function sub_curry(fn) {
  var args = [].slice.call(arguments, 1);
  return function() {
    return fn.apply(this, args.concat([].slice.call(arguments)));
  };
}
function curry(fn, length) {
  length = length || fn.length;
  var slice = Array.prototype.slice;
  return function() {
    var argsLen = arguments.length;
    var combined = [fn].concat(slice.call(arguments, 0));
    if (argsLen < length) {
      return curry(sub_curry.apply(this, combined), length - argsLen);
    } else {
      return fn.apply(this, arguments);
    }
  };
}
var curry = fn =>
  (judge = (...args) =>
    args.length === fn.length ? fn(...args) : (...arg) => judge(...args, ...arg));

var fn = curry(function(a, b, c) {
  return [a, b, c];
});

console.log(fn(1, 2, 3));
(function(a, b, c) {
  console.log(1, 2, 3);
})(1, 2, 3);

console.log(fn(1)(2, 3));
(function(a) {
  return function(b, c) {
    console.log(a, b, c);
  };
})(1)(2, 3);

console.log(fn(1)(2)(3));
(function(a) {
  return function(b) {
    return function(c) {
      console.log(a, b, c);
    };
  };
})(1)(2)(3);

console.log(fn(1, 2)(3));
(function(a, b) {
  return function(c) {
    console.log(a, b, c);
  };
})(
  1,
  2
)(3);
