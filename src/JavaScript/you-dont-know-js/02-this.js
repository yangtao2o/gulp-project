/**
 * this 绑定
 * 默认绑定 -> 全局绑定
 * 隐式绑定
 * 显式绑定
 * new 绑定
 */


function foo(something) {
  console.log(this.a, something)
  return this.a + something
}

var obj = {
  a: 2
}
// 重复使用得包裹函数
function bind(fn, obj) {
  return function() {
    return fn.apply(obj, arguments)
  }
}
var bar = bind(foo, obj)

var b = bar(3)
console.log({b})