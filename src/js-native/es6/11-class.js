class Person {
  // 类的内部所有定义的方法，都是不可枚举的
  constructor(name) {
    // 实例属性
    this.name = name;
    this.age = 10;
    this.newAge = 0;
  }

  // 实例方法
  sayHello() {
    return "hello, I am " + this.name;
  }

  // 静态属性
  static _name = "ming";

  // 静态方法
  static _getName() {
    return 'my name is ' + this._name;
  }

  // getter 和 setter
  get age() {
    return this.newAge
    // return '20 years old';
  }
  set age(newAge) {
    this.newAge = newAge;
    console.log('new age 为：' + newAge)
  }
}

// 静态属性
// Person._name = 'ming';

var me = new Person("tao");

me.age = 28;
// new age 为：28

console.log(me.age);  // 20 years old
console.log(me.name); // tao
console.log(me._name);  // undefined
// console.log(me._getName()); // Uncaught TypeError: me.getName is not a function

console.log(Person._name);  // ming
console.log(Person._getName());  // my name is ming

Person(); // Uncaught TypeError: Class constructor Person cannot be invoked without 'new'

