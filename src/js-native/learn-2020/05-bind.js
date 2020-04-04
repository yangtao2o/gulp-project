var foo = {
  value: 1
};
function bar(name, age) {
  console.log(this.value);
  console.log(name);
  console.log(age);
  return {
    name,
    age,
    value: this.value
  };
}

// 1
Function.prototype.mybind1 = function(context) {
  const self = this;
  return function() {
    return self.apply(context);
  };
};
// 2
Function.prototype.mybind2 = function(context) {
  const self = this;
  const args = Array.prototype.slice.call(arguments, 1);
  return function() {
    const bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(context, args.concat(bindArgs));
  };
};
// 3
Function.prototype.mybind3 = function(context) {
  const self = this;
  const args = Array.prototype.slice.call(arguments, 1);
  // 通过一个空函数来进行中转
  const fNOP = function() {};
  const fBound = function() {
    const bindArgs = Array.prototype.slice.call(arguments);
    // this 指向 实例，说明是构造函数，需要将绑定函数的 this 指向该实例，
    // 可以让实例获得来自绑定函数的值
    // this 指向 window，说明使普通函数调用，将绑定函数的 this 指向 context
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };
  fNOP.prototype = this.prototype;
  // 让实例继承绑定函数的原型(this.prototype)中的值
  fBound.prototype = new fNOP();
  return fBound;
};

Function.prototype.mybind = function(context) {
  debugger;
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }
  const self = this;
  const args = Array.prototype.slice.call(arguments, 1);
  const fNOP = function() {};

  const fBound = function() {
    const bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};
