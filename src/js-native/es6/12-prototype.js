function Person(name) {
  // 实例属性
  this.name = name;
}

// 静态属性、方法
Person._name = "ming";
Person._getName = function() {
  return "my name " + this._name;
};

Person.prototype = {
  constructor: Person,
  // getter 和 setter
  get age() {
    return "20 years old";
  },
  set age(newAge) {
    console.log("new age 为：" + newAge);
  },
  // 实例方法
  sayHello() {
    return "hello, I am " + this.name;
  }
};

var me = new Person("tao");

me.age = 28;
// new age 为：28

console.log(me.age); // 20 years old
console.log(me.name); // tao
console.log(me._name); // undefined
// console.log(me._getName()); // Uncaught TypeError: me.getName is not a function

console.log(Person._name); // ming
console.log(Person._getName()); // my name is ming

Person(); // 无报错
