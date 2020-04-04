function Otaku (name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}
function objectFactory() {
  // 1. 新建一个对象 obj
  const obj = new Object();

  // 2. 取出第一个参数，就是我们要传入的构造函数 Constructor。
  // 此外因为 shift 会修改原数组，所以 arguments 会被去除第一个参数
  const Constructor = [].shift.call(arguments);

  // 3. 将 obj 的原型指向构造函数，这样 obj 就可以访问到构造函数原型中的属性
  obj.__proto__ = Constructor.prototype;

  // 4. 使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
  // 如果构造函数返回值是对象则返回这个对象，如果不是对象则返回新的实例对象
  const ret = Constructor.apply(obj, arguments);

  // 5. 返回 obj
  return typeof ret === 'object' ? ret : obj;
}

function createNew(Con, ...args) {
  this.obj = {};

  this.obj = Object.create(Con.prototype);
  // Object.setPrototypeOf(this.obj, Con.prototype);

  const ret = Con.apply(this.obj, args);
  return ret instanceof Object ? ret : this.obj;
}

const person = createNew(Otaku, 'YYY', '28');
console.log(person.name) // YYY
console.log(person.habit) // Games
console.log(person.strength) // 60

person.sayYourName(); // I am YYY

