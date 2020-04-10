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

console.log('script start');

async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}

async function async2() {
    console.log('entry async2');
    return Promise.resolve();
}

setTimeout(function () {
    console.log('setTimeout');
}, 0);

async1();

new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
}).then(function () {
    console.log('promise3');
}).then(function () {
    console.log('promise4');
}).then(function () {
    console.log('promise5');
}).then(function () {
    console.log('promise6');
});

console.log('script end');

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