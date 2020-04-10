function partial(fn) {
  debugger;
  var args = [].slice.call(arguments, 1);
  return function() {
    var newArgs = args.concat([].slice.call(arguments));
    return fn.apply(this, newArgs);
  };
}

function add(a, b) {
  return a + b + this.value;
}

// var addOne = add.bind(null, 1);
var addOne = partial(add, 1);

var value = 1;
var obj = {
  value: 2,
  addOne: addOne
};
var res = obj.addOne(2); // ???

// 第二版
var _ = {};

function partial(fn) {
  debugger
  var args = [].slice.call(arguments, 1);
  return function() {
    var position = 0,
      len = args.length;
    for (var i = 0; i < len; i++) {
      args[i] = args[i] === _ ? arguments[position++] : args[i];
    }
    while (position < arguments.length) args.push(arguments[position++]);
    return fn.apply(this, args);
  };
}

var subtract = function(a, b) {
  return b - a;
};
subFrom20 = partial(subtract, _, 20);
var res = subFrom20(5);
console.log(res)  //15
