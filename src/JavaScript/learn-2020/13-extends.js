// class Parent {
//   constructor(opt) {
//     this.name = opt.name;
//   }
// }

// class Child extends Parent {
//   constructor(opt) {
//     super(opt);
//     this.age = opt.age;
//   }
// }

// const me = new Child({ name: "Yang", age: 28 });

// console.log(me.name, me.age);

function _extends(child, parent) {
  const prototype = Object.create(parent.prototype);
  child.prototype = prototype;
  child.prototype.constructor = child;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Parent = (function() {
  function Parent(opt) {
    _classCallCheck(this, Parent);

    this.name = opt.name;
  }

  Parent.prototype.getName = function getName() {
    return this.name;
  };

  return Parent;
})();

var Child = (function(_Parent) {
  _extends(Child, _Parent);

  function Child(opt) {
    _classCallCheck(this, Child);
    // Constrctor => _Parent.call(this, opt)
    var _this = (_Parent != null && _Parent.call(this, opt)) || this;
    _this.age = opt.age;

    return _this;
  }

  Child.prototype.getAge = function getAge() {
    return this.age + " years old.";
  };

  return Child;
})(Parent);

const myself = new Child({ name: "YyY", age: 18 });
console.log(myself.name, myself.age);
// console.log(myself.getName());
console.log(myself.getAge());
