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

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

Child.prototype.getMsg = function() {
  return `My name is ${this.name}, ${this.age} years old.`;
};

const me = new Child("Yang", 28);
const name = me.getName();
const msg = me.getMsg();
// console.log(name, msg);  // Yang My name is Yang, 28 years old.

