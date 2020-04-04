/**
 * 被忽略的 this
 * 1.把数组展开成参数
 * 2.使用bind进行柯里化
 */

function foo(a, b) {
  console.log(`a: ${a}, b: ${b}`)
}

// DMZ空对象
var ø = Object.create(null);

// 把数组展开成参数
foo.apply(ø, [1, 2]);  // a: 1, b: 2

// 使用bind进行柯里化
foo.bind(ø, 4)(3);  // a: 4, b: 3




