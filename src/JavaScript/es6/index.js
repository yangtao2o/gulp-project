class MathHandle {   // 构造函数
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add() {
    return this.x + this.y
  }
}

const m = new MathHandle(1, 3)
console.log(m.add())

// 对象实例的隐式原型（属性）指向构造函数的原型对象
console.log(m.__proto__ === MathHandle.prototype)

// 构造函数的原型对象的constructor属性指回了构造函数本身
console.log(MathHandle.prototype.constructor === MathHandle)

function MathHandle2(x, y) {
  this.x = x
  this.y = y
}
MathHandle2.prototype.add = function () {
  return this.x + this.y
}

var m2 = new MathHandle2(1,3)
console.log(m2.add())
console.log(m2.__proto__ === MathHandle2.prototype)  //true

// 获取实例对象的原型对象Object.getPrototypeOf()
console.log(Object.getPrototypeOf(m2) === MathHandle2.prototype)  //true
// 判断实例与构造函数的原型对象是否有关系isPrototypeOf()
console.log(MathHandle2.prototype.isPrototypeOf(m2))  //true

// 继承
// function Animal() {
//   this.eat = function() {
//     console.log('Animal eat')
//   }
// }
// function Dog() {
//   this.bark = function() {
//     console.log('Dog bark')
//   }
// }
// // 绑定原型，实现继承
// Dog.prototype = new Animal()
// var hashiqi = new Dog()
// hashiqi.eat()  // Animal eat
// hashiqi.bark()  // Dog bark

class Animal {
  constructor(name) {
    this.name = name
  }
  eat() {
    console.log('Animal eat!' + this.name)
  }
}
class Dog extends Animal {
  constructor(name) {
    super(name)
    this.name = name
  }
  bark() {  
    console.log('Dog bark!' + this.name)
  }
}

const hashiqi = new Dog('哈士奇')
hashiqi.eat()
hashiqi.bark()

// ES6 其他常用功能

let i = 10;
// i = 20;  // Uncaught SyntaxError: Identifier 'i' has already been declared
const j = 100
// j = 20  // Uncaught TypeError: Assignment to constant variable.

const name = 'yangtao', age = 27;
const html = `
  <div>
    <p>${name}</p>
    <p>${age}</p>
  </div>`;

// 结构赋值
const obj = {a: 100, b: 200}
const {a, b} = obj
// ES5
// var obj = {a: 100, b: 200}
// var a = obj.a,
//     b = obj.b;

const arr = ['xxx', 'yyy', 'zzz']
const [x, z] = arr
// ES5
// var arr = ['xxx', 'yyy', 'zzz']
// var x = arr[0],
//     z = arr[1];

function num(a,b=0) {
}

function num2(a) {
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
}

const myObj = {a: 1, b: 2}
for(let item in obj) {
  console.log(item)
}
// console.log(item)

// 箭头函数
const myarr = [1,3,4]
myarr.map(item => item + 1)
myarr.map((item, index) => console.log(item, index))
// 等同于
// var myarr = [1, 3, 4];
// myarr.map(function (item) {
//   return item + 1;
// });
// myarr.map(function (item, index) {
//   return console.log(item, index);
// });

function fn() {
  console.log('real', this)  // real {a: 10}

  var arr = [1,2,3];
  arr.map(item => console.log(this))  // {a: 10}
}
fn.call({a: 10})