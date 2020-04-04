function prototype(child, parent) {
  const F  = function() {};
  F.prototype = parent.prototype;
  child.prototype = new F();
  child.prototype.constructor = child;
  child.super = parent.prototype;
}

function myCreate(o) {
  const F = function() {};
  F.prototype = o;
  return new F();
}

function myExtend(child, parent) {
  const prototype = Object.create(parent.prototype);
  child.prototype = prototype;
  child.prototype.constructor = child;
  child.super = parent.prototype;
}

function Parent(name) {
  this.name = name;
}

Parent.prototype.getName = function() {
  return this.name;
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}
myExtend(Child, Parent);

Child.prototype.getMsg = function() {
  return `My name is ${this.name}, ${this.age} years old.`;
};

const me = new Child("Yang", 28);
const name = me.getName();
const msg = me.getMsg();
console.log(name);
console.log(msg)

