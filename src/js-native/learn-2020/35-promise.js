// Promise 中为什么要引入微任务？
// Promise 中是如何实现回调函数返回值穿透的？
// Promise 出错后，是怎么通过“冒泡”传递给最后那个捕获异常的函数？

/**
 * @param {callback} executor
 */
function Bromise(executor) {
  debugger
  var onResolve_ = null
  var onReject_ = null
  //模拟实现resolve和then，暂不支持rejcet
  this.then = function (onResolve, onReject) {
    onResolve_ = onResolve
  }
  function resolve(value) {
    // 让 onResolve_ 延时被调用
    // 不过使用定时器的效率并不是太高，所以 Promise 又把这个定时器改造成了微任务了
    // 这样既可以让 onResolve_ 延时被调用，又提升了代码的执行效率
    setTimeout(() => {
      onResolve_(value)
    }, 0)
  }
  executor(resolve, null)
}

function executor(resolve, reject) {
  resolve(100)
}

//将Promise改成我们自己的Bromsie
let demo = new Bromise(executor)

function onResolve(value) {
  console.log(value)
}

demo.then(onResolve)
