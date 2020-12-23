// console.log("main");
// setTimeout(function() {
//   console.log("execute in first timeout");
//   Promise.resolve(3).then(res => {
//     console.log("execute in third promise");
//   });
// }, 0);
// setTimeout(function() {
//   console.log("execute in second timeout");
//   Promise.resolve(4).then(res => {
//     console.log("execute in fourth promise");
//   });
// }, 0);
// Promise.resolve(1).then(res => {
//   console.log("execute in first promise");
// });
// Promise.resolve(2).then(res => {
//   console.log("execute in second promise");
// });

// 浏览器端
// main debugger eval
// execute in first promise
// execute in second promise
// execute in first timeout
// execute in third promise
// execute in second timeout
// execute in fourth promise

// node 端执行
// main
// execute in first promise
// execute in second promise
// execute in first timeout
// execute in second timeout
// execute in third promise
// execute in fourth promise

// console.log('script start');

// setTimeout(function () {
//     console.log('setTimeout');
// }, 0);

// new Promise(function (resolve) {
//     console.log('promise1.1');
//     resolve();
// }).then(function () {
//     console.log('promise1.2');
// }).then(function () {
//     console.log('promise1.3');
// }).then(function () {
//     console.log('promise1.4');
// });

// new Promise(function (resolve) {
//     console.log('promise2.1');
//     resolve();
// }).then(function () {
//     console.log('promise2.2');
// }).then(function () {
//     console.log('promise2.3');
// }).then(function () {
//     console.log('promise2.4');
// });

// console.log('script end');

// 浏览器和 Node 一致
// script start
// promise1.1
// promise2.1
// script end
// promise1.2
// promise2.2
// promise1.3
// promise2.3
// promise1.4
// promise2.4
// setTimeout

console.log('script start')

async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('entry async2')
  return Promise.resolve()
}

setTimeout(function () {
  console.log('setTimeout')
}, 0)

async1()

new Promise(function (resolve) {
  console.log('promise1')
  resolve()
})
  .then(function () {
    console.log('promise2')
  })
  .then(function () {
    console.log('promise3')
  })
  .then(function () {
    console.log('promise4')
  })
  .then(function () {
    console.log('promise5')
  })
  .then(function () {
    console.log('promise6')
  })

console.log('script end')

// Node
// script start
// async1 start
// entry async2
// promise1
// script end
// promise2
// promise3
// promise4
// async1 end
// promise5
// promise6
// setTimeout

// 浏览器
// script start
// async1 start
// entry async2
// promise1
// script end
// promise2
// promise3
// async1 end
// promise4
// promise5
// promise6
// setTimeout

// 20201223 极客时间
function executor(resolve, reject) {
  let rand = Math.random()
  console.log(1)
  console.log(rand)
  if (rand > 0.5) resolve()
  else reject()
}
var p0 = new Promise(executor)

var p1 = p0.then(value => {
  console.log('succeed-1')
  return new Promise(executor)
})

var p3 = p1.then(value => {
  console.log('succeed-2')
  return new Promise(executor)
})

var p4 = p3.then(value => {
  console.log('succeed-3')
  return new Promise(executor)
})

p4.catch(error => {
  console.log('error')
})
console.log(2)

// MutationObserver - 利用微任务来权衡性能和效率

async function foo() {
  console.log('foo')
}
async function bar() {
  console.log('bar start')
  await foo()
  console.log('bar end')
}
console.log('script start')
setTimeout(function () {
  console.log('setTimeout')
}, 0)
bar()
new Promise(function (resolve) {
  console.log('promise executor')
  resolve()
}).then(function () {
  console.log('promise then')
})
console.log('script end')

// script start
// bar start
// foo
// promise executor
// script end
// bar end
// promise then
// setTimeout

// 1. 首先在主协程中初始化异步函数foo和bar，碰到console.log打印script start；
// 2. 解析到setTimeout，初始化一个Timer，创建一个新的task
// 3. 执行bar函数，将控制权交给协程，输出bar start，碰到await，执行foo，输出foo，创建一个 Promise返回给主协程
// 4. 将返回的promise添加到微任务队列，向下执行 new Promise，输出 promise executor，返回resolve 添加到微任务队列
// 5. 输出script end
// 6. 当前task结束之前检查微任务队列，执行第一个微任务，将控制器交给协程输出bar end
// 7. 执行第二个微任务 输出 promise then
// 8. 当前任务执行完毕进入下一个任务，输出setTimeout
