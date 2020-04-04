class Parent {
  constructor(name) {
    this.name = name
  }
  getName() {
    return this.name;
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
  getMsg() {
    return `My name is ${this.name}, ${this.age} years old.`;
  }
}

const me = new Child('Yang', 28);
const name = me.getName();
const msg = me.getMsg();
console.log(name, msg);  // Yang My name is Yang, 28 years old.
