// 生成器就是协程的一种实现方式
// async/await 技术背后的秘密就是 Promise 和生成器应用，往低层说就是微任务和协程应用

function* genDemo() {
  console.log('开始执行第一段')
  yield 'generator 2'

  console.log('开始执行第二段')
  yield 'generator 2'

  console.log('开始执行第三段')
  yield 'generator 2'

  console.log('执行结束')
  return 'generator 2'
}

console.log('main 0')
let gen = genDemo()
console.log(gen.next().value)
console.log('main 1')
console.log(gen.next().value)
console.log('main 2')
console.log(gen.next().value)
console.log('main 3')
console.log(gen.next().value)
console.log('main 4')

//foo函数
function* foo() {
  let response1 = yield fetch('https://time.geekbang.org')
  console.log('response1')
  console.log(response1)
  let response2 = yield fetch('https://time.geekbang.org/test')
  console.log('response2')
  console.log(response2)
}

//执行foo函数的代码
let gen = foo()
function getGenPromise(gen) {
  return gen.next().value
}
getGenPromise(gen)
  .then(response => {
    console.log('response1')
    console.log(response)
    return getGenPromise(gen)
  })
  .then(response => {
    console.log('response2')
    console.log(response)
  })

// 调用 async 声明的 foo 函数返回了一个 Promise 对象
async function foo() {
  return 2
}
console.log(foo()) // Promise {<resolved>: 2}

async function foo() {
  console.log(1)
  let a = await 100
  console.log(a)
  console.log(2)
}
console.log(0)
foo()
console.log(3)

// 当执行到await 100时，会默认创建一个 Promise 对象
let promise_ = new Promise((resolve, reject) => {
  resolve(100)
})
