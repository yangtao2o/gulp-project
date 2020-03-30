var o;
// 创建原型为 null 的空对象
o = Object.create(null);

o = {};
// 以字面量方式创建的空对象就相当于：
o = Object.create(Object.prototype);

function Constructor() {}
o = new Constructor();
// 上面的一句就相当于:
o = Object.create(Constructor.prototype);
// 所以:
console.log(o.__proto__ === Constructor.prototype); // true

o = Object.create(Object.prototype, {
  // foo会成为所创建对象的数据属性
  foo: {
    writable: true,
    configurable: true,
    value: "hello"
  },
  // bar会成为所创建对象的访问器属性
  bar: {
    configurable: false,
    get: function() {
      return 10;
    },
    set: function(value) {
      console.log("Setting `o.bar` to", value);
    }
  }
});

// Polyfill ---MDN
if (typeof Object.create !== "function") {
  Object.create = function(proto, propertiesObject) {
    if (typeof proto !== "object" && typeof proto !== "function") {
      throw new TypeError("Object prototype may only be an Object: " + proto);
    } else if (proto === null) {
      // 尽管在 ES5 中 Object.create支持设置为[[Prototype]]为null，但因为那些ECMAScript5以前版本限制，此 polyfill 无法支持该特性。
      throw new Error(
        "This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument."
      );
    }
    
    // 这个 polyfill 涵盖了主要的应用场景，它创建一个已经选择了原型的新对象，但没有把第二个参数考虑在内
    if (typeof propertiesObject != "undefined")
      throw new Error(
        "This browser's implementation of Object.create is a shim and doesn't support a second argument."
      );

    function F() {}
    F.prototype = proto;

    return new F();
  };
}

Object.mycreate = function(proto) {
  function FNOP() {}
  FNOP.prototype = proto;
  return new FNOP();
}
