// iterator 迭代器
let arr = [1, 2, 3];
let iterator = arr[Symbol.iterator]();

// ES5 创建一个迭代器
function createIterator(item) {
  var i = 0;
  return {
    next: function() {
      var done = i >= item.length;
      var value = !done ? item[i++] : undefined;
      return {
        done: done,
        value: value
      }
    }
  }
}
var itera = createIterator(arr)
itera.next()
itera.next()
itera.next()

// 对象的结构赋值
let {
  title: titleOne,
  test: [
    {
      title:titleTwo
    }
  ]
} = {
  title: 'abc',
  test: [
    {
      title: 'test'
    }
  ]
};

let {data} = await axios.get('http://localhost:3000');

// 剩余/扩展运算符
// 使用扩展运算符可以快速的将类数组转为一个真正的数组
let arr1 = [1,2,3]
let arr2 = [...arr1, 4,5,6]  // arr1.concat(arr2)
console.log(arr2)

let [first, ...arr3] = [1,2,3,4,5,6]
console.log(first)
console.log(arr3)

// for...of -> 返回 value 值
let arrObj = [{a:1}, {a:2}, {a:3}]
let obj = {}
for({a:obj.a} of arrObj) {
  obj.a
  console.log(obj.a)
}
console.log('obj', obj)

// Promise -> pending\fulfilled\rejected

let promise = new Promise((resolve, reject) => {
  setInterval(() => {
    resolve('I have been resolved')
  }, 2000);
})
promise.then(res => {
  console.log({res})
}).catch(res => {
  console.log(res)
})

// module

// 函数默认值
function func(a=1) {
  return a;
}
func();