// call
var foo = {
  value: 1
};
function bar(name, age) {
  console.log(this.value);
  console.log(name);
  console.log(age);
  return {
    name,
    age,
    value: this.value
  };
}
// bar.call(foo);

// 1. call改变了this指向，指向了foo
// 2. bar函数执行了

// 第一步
// var foo = {
//   value: 1,
//   bar: function() {
//     console.log(this.value)
//   }
// }
// foo.bar();
// foo.fn = bar;  // 将函数设为对象的属性
// foo.fn();  // 执行该函数
// delete foo.fn;  // 删除该函数

// 第一版
Function.prototype.myCall1 = function(context) {
  context.fn = this;
  context.fn();
  delete context.fn;
};

// bar.myCall1(foo)

// 第二版：可添加参数
Function.prototype.myCall2 = function() {
  const context = arguments[0];
  const args = [];
  for (let i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]");
  }
  context.fn = this;
  eval("context.fn(" + args + ")"); // context.fn(arguments[1], arguments[2],...)
  delete context.fn;
};
// bar.myCall2(foo, 'yangtao', 28)

// 第三版
Function.prototype.myCall3 = function() {
  const context = arguments[0] || window;
  const args = [];
  context.fn = this;
  for (let i = 1, len = arguments.length; i < len; i++) {
    args.push("arguments[" + i + "]");
  }
  let result = eval("context.fn(" + args + ")");
  // let result = context.fn(...args);
  delete context.fn;
  return result;
};
// console.log(bar.myCall3(foo, 'yangtao', 28))

Function.prototype.myCall = function(context) {
  // 这一步如果不强制是 object 类型，可以省略
  if (typeof context != "object") {
    throw new Error("Arguments error");
  }

  context = context || window;

  var args = [];
  var result;

  if ("fn" in context && context.hasOwnProperty("fn")) {
    var fn = context.fn;
    var fnFlag = true;
  }

  context.fn = this;

  for (var i = 1, l = arguments.length; i < l; i++) {
    args.push("arguments[" + i + "]");
  }

  result = eval("context.fn(" + args + ")");

  if (fnFlag) {
    context.fn = fn;
  } else {
    delete context.fn;
  }

  return result;
};

console.log(bar.myCall(foo, "yangtao", 28));
// 1
// yangtao
// 28
// { name: 'yangtao', age: 28, value: 1 }

// apply
Function.prototype.myapply = function(context, arr) {
  if (typeof context !== "object") {
    throw new Error("Arguments error");
  }
  context = context || window;
  context.fn = this;

  let result;
  if (!arr) {
    result = context.fn();
  } else {
    let args = [];
    for (var i = 0, l = arr.length; i < l; i++) {
      args.push("arr[" + i + "]");
    }
    result = eval("context.fn(" + args + ")");
  }
  delete context.fn;
  return result;
};
