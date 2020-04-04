if (typeof Object.getOwnPropertyNames !== "function") {
  Object.getOwnPropertyNames = function(o) {
    if (o !== Object(o)) {
      throw TypeError("Object.getOwnPropertyNames called on non-object");
    }
    var props = [],
      p;
    for (p in o) {
      if (Object.prototype.hasOwnProperty.call(o, p)) {
        props.push(p);
      }
    }
    return props;
  };
}

function myGetOwnPropertyNames(obj) {
  if (typeof obj !== "object") {
    throw TypeError(obj + "is not an object");
  }
  const props = [];
  for (let p in obj) {  // 只能获取可枚举属性
    // 过滤掉原型链上的属性，只取本身属性
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      props.push(p);
    }
  }
  return props;
}

const obj = { 0: "a", 1: "b", 2: "c" };
const arr = [12, 3, 44, "aaa"];
var myobj = Object.create({}, {
  getFoo: {
    value: function() { return this.foo; },
    enumerable: false
  }
});
myobj.foo = 1;
var result1 = myGetOwnPropertyNames(obj);  // ["0", "1", "2"]
var result2 = myGetOwnPropertyNames(arr);  // ["0", "1", "2", "3"]
var result3 = myGetOwnPropertyNames(myobj);  // ["foo"]
console.log(result1,result2,result3)

