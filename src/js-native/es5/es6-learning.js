const arr = ['aaa', 'bbb', 'ccc']
const obj = {
  'name': 'yangtao',
  'age': 27
}
// for - in 迭代属性名
// for (const key in obj) {
//   if (obj.hasOwnProperty(key)) {
//     const element = obj[key];
//     console.log(key, element)
//   }
// }

// for - of 迭代属性值
// for (const iterator of arr) {
//   console.log(iterator)
// }

// for (const v of arr) {
//   console.log(v)
// }

// for (const [index, item] of arr.entries()) {
//   console.log(index, item)
// }

// const doSomethingAsync = () => {
//   console.log('async...')
//   return new Promise((resolve) => {
//     console.log('promise...')
//     setTimeout(() => resolve('I did something'), 3000);
//   });
// }
// const doSomething = async () => {
//   console.log('dosomething await...');
//   console.log(await doSomethingAsync())  // 调用代码停止
//   console.log('finised...');
// }
// console.log('Start...');
// doSomething();
// console.log('end...');

// async/await 链式写法
const doAsync = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve('我是头部内容')
    }, 3000);
  })
}
const doAsyncBody = async () => {
  const something = await doAsync()
  return something + '，还有正文，'
}
const doAsyncFooter = async () => {
  const something = await doAsyncBody()
  return something + '最后是尾部内容。'
}
doAsyncFooter().then((res) => {
  console.log(res)
}).catch((err) => {
  console.log(err)
})

const myFn = () => {
  console.log('myfn');
  setTimeout(myFn, 1000);
}
setTimeout(() => {
  console.log('start');
  myFn()
}, 1000);