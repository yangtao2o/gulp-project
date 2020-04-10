// 我们现在需要写一个 foo 函数，这个函数返回首次调用时的 Date 对象，注意是首次。

// 1
var t;
// function foo() {
//   if (t) return t;
//   t = new Date();
//   return t;
// }

// 问题有两个，一是污染了全局变量，二是每次调用 foo 的时候都需要进行一次判断。

// 2
// 闭包解决全局变量，然而还是没有解决调用时都必须进行一次判断的问题。
var foo2 = (function() {
  var t;
  return function() {
    if (t) return t;
    t = new Date();
    return t;
  };
})();
// console.log(foo2())

// 3
// 没有解决调用时都必须进行一次判断的问题。
// function foo() {
//   if(foo.t)  return foo.t;
//   foo.t = new Date();
//   return foo.t;
// }
// console.log(foo())
// console.log(foo.t)

// 4
// 惰性函数就是解决每次都要进行判断的这个问题，解决原理很简单，重写函数。

var foo = function() {
  var t = new Date();
  foo = function() {
    return t;
  };
  return foo();
};
console.log('初始化：', foo);
console.log('调用：', foo());
console.log('之后：', foo);


// function addEvent(type, el, fn) {
//   if (window.addEventListener) {
//     el.addEventListener(type, fn, false);
//   } else if (window.attachEvent) {
//     el.attachEvent("on" + type, fn);
//   }
// }

// function addEvent(type, el, fn) {
//   if (window.addEventListener) {
//     el.addEventListener(type, fn, false);
//     addEvent = function(type, el, fn) {
//       el.addEventListener(type, fn, false);
//     }
//   } else if (window.attachEvent) {
//     el.attachEvent("on" + type, fn);
//     addEvent = function(type, el ,fn) {
//       el.attachEvent("on" + type, fn);
//     }
//   }
// }



var addEvent = (function(type, el, fn) {
  if (window.addEventListener) {
    return function(type, el, fn) {
      el.addEventListener(type, fn, false);
    }
  } else if (window.attachEvent) {
    return function(type, el ,fn) {
      el.attachEvent("on" + type, fn);
    }
  }
})();

var container = document.getElementById("container");

console.log('初始化：', addEvent);

var handle = function() {
  console.log("被触发了");
  console.log('之后：', addEvent)
};

addEvent("click", container, handle);





