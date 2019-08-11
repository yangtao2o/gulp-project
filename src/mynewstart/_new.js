/**
 * new 的实现原理：
 * 1. 创建一个新对象，并将构造函数的 this 指向该对象
 * 2. 绑定 [[prototype]]
 * 3. 执行构造函数方法，将属性和方法添加到 this 引用的对象中
 * 4. 返回：如果构造函数中没有返回其他对象，返回 this；否则，返回构造函数中返回的对象
 */
function _new() {
  let target = {}
  let [constructor, ...args] = [...arguments]

  target.__proto__ = constructor.prototype

  let result = constructor.apply(target, args)
  if(result && (typeof result == 'object' || typeof result == 'function')) {
    return result
  }
  return target
}

