# Zepto 对象思想与源码分析

> [zepto 对象思想与源码分析](http://www.kancloud.cn/wangfupeng/zepto-design-srouce/173680)

## 原型对象

### `Array.prototype`

**每一个函数，都有一个 prototype 属性**，不管是你自定义的，还是函数内置的。

```javascript
var fn = function() {};
console.log(fn.prototype); // {constructor: ƒ}
console.log(fn.prototype.constructor === fn); // true
```

![image](https://user-images.githubusercontent.com/19526072/53319611-f76d3c00-390d-11e9-8542-313fa56bffab.png)

这里的 `fn.prototype` 打印出一个对象，对象里的 `constructor` 属性又指回了该函数本身 fn。

即**每一个原型对象都有一个 consctructor 属性指向关联的构造函数**，比如：

```javascript
Array.prototype.constructor === Array; //true
```

![image](https://user-images.githubusercontent.com/19526072/53319627-ff2ce080-390d-11e9-8dab-3659d53b1296.png)

我们接着看：

```javascript
console.log(Array.prototype); // [constructor: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ, …]
```

这里，除了 constructor 属性，还有其他内置的属性，即我们经常使用的操作数组的方法。

### `__proto__`(隐式原型)

所有通过函数 `new` （构造函数）出来的实例对象，都有一个 `__proto__`属性，指向该对象的 `prototype`，比如：

```javascript
var arr = new Array();
arr.__proto__ === Array.prototype; // true
```

![image](https://user-images.githubusercontent.com/19526072/53319688-2f747f00-390e-11e9-9555-af336e12b587.png)

原型链：由相互关联的原型(`__proto__`)组成的链状结构就是原型链。

举个关于继承 extends 的例子：

```javascript
function Animal() {
  this.eat = function() {
    console.log("Animal eat");
  };
}
function Dog() {
  this.bark = function() {
    console.log("Dog bark");
  };
}
// 绑定原型，实现继承
Dog.prototype = new Animal();
var dog = new Dog();

dog.eat(); // Animal eat
dog.bark(); // Dog bark
```

上面看明白了，那么 ES6 的继承我们也就可以明白原理了，即 `class Dog extends Animal` 相当于 `Dog.prototype = new Animal()`

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log("Animal eat!" + this.name);
  }
}
class Dog extends Animal {
  constructor(name) {
    super(name);
    this.name = name;
  }
  bark() {
    console.log("Dog bark!" + this.name);
  }
}

const dog = new Dog("哈士奇");
dog.eat();
dog.bark();
```

接下来，我们就清楚为什么能这样：

**当我们要使用一个对象（数组）的某个功能时，如果该对象本身具有这个功能，直接调用，没有的话，那就去自身的`__proto__`属性中去找**

```javascript
var obj = {
  myfn: function() {
    console.log("myfn");
  }
};
obj.myfn(); // 'myfn'
obj.hasOwnProperty("myfn"); //true
obj.toString(); // "[object Object]"
obj.hasOwnProperty("toString"); // false
obj.__proto__.hasOwnProperty("toString"); // true
```

`hasOwnProperty()`就可以得出这个属性是否是属于该对象本身的属性:

- myfn 是我们自定义的，`obj.hasOwnProperty('myfn')`为 true
- toString() 我们不是自定义的，却可以使用，查一下是否属于自定义属性，`obj.hasOwnProperty('toString')`，答案为 false
- 既然不属于自定义属性，那就去自身的`__proto__`去找，然后去原型对象上查一下，`obj.__proto__.hasOwnProperty('toString')`，哦，原来在这儿

在源码中，我们经常看到`Array.prototype.concat`，其实就是我们使用的`[].concat`，`[]`，因为`[].__proto__ === Array.prototype`

### `__proto__`是可修改的

比如，我们新增一个`addClass()`方法：

```javascript
var arr = [1, 2, 3];
arr.__proto__.addClass = function() {
  console.log(123);
};
arr.push(4);
arr.addClass(); // 123
```

![image](https://user-images.githubusercontent.com/19526072/53319708-44e9a900-390e-11e9-9899-6c303f5467aa.png)

但是，这里要注意，如下重写之后，就没有了诸如 push、concat 等方法：

```javascript
arr.__proto__ = {
  addClass: function() {
    console.log(123);
  }
};
arr.push(3); //Uncaught TypeError: arr.push is not a function
```

### `Object.prototype`的原型

万物皆对象，到最后依旧是对象，最后这个东东是个啥，我们来看一下：

```javascript
// 构造函数 Person
function Person() {}

// 实例对象 myfn，它的 隐式原型 指向了其构造函数的 原型对象
var myfn = new Person();
myfn.__proto__ === Person.prototype; //true

// 那构造函数 Person 的 隐式原型又指向了谁呢
Person.prototype.__proto__ === Object.prototype; //true

// Function呐
Function.prototype.__proto__ === Object.prototype; //true

// 这个呢
var fn = function() {};
fn.prototype.__proto__ === Object.prototype; //true
Object.prototype.__proto__ === null; //true
typeof null; //"object"
```

总结：

- 所有的函数都有一个 `prototype`属性，该属性指向了一个对象，该对象就是调用该构造函数而创建出来的实例（如 myfn）的原型（如`myfn.__proto__`）,即：`myfn.__proto__ === Person.prototype`

- 所有的对象（除 null）都具有一个`__proto__`属性，该属性指向该对象的原型，比如：`myfn.__proto__ === Person.prototype`

- 原型也是一个对象，根据上条，那原型的原型，就是`Object.prototype`

- 最后的 null 对象，可以当做是 什么都没有

盗一张图，我们就更加清楚了（蓝色这条表示的是原型链）
![image](https://user-images.githubusercontent.com/19526072/53319411-64340680-390d-11e9-80b9-4b86736291b2.png)

参考资料：

- [js 原型链基础](https://www.kancloud.cn/wangfupeng/zepto-design-srouce/173684)
- [JavaScript 深入之从原型到原型链 ](https://github.com/mqyqingfeng/Blog/issues/2)
- [深入理解 javascript 原型和闭包（3）——prototype 原型](https://www.cnblogs.com/wangfupeng1988/p/3978131.html)

## Zepto 对象设计

```javascript
// v1.0.1
var Zepto = (function() {})();

window.Zepto = Zepto;
"$" in window || (window.$ = Zepto);

(function($) {})(Zepto);

// v1.1.6
var Zepto = (function() {
  var $,
    zepto = {};

  zepto.init = function(selector, context) {
    var dom;
    return zepto.Z(dom, selector);
  };

  $ = function(selector, context) {
    return zepto.init(selector, context);
  };

  return $;
})();

window.Zepto = Zepto;
window.$ = undefined && (window.$ = Zepto);
```

完整初始化：

```js
(function(window) {
  var $,
    zepto = {};

  function Z(dom, selector) {
    var i,
      len = dom.length ? dom.length : 0;
    for (var i = 0; i < dom.length; i++) {
      this[i] = dom[i];
    }
    this.length = len;
    this.selector = selector || "";
  }

  zepto.Z = function(dom, selector) {
    return new Z(dom, selector);
  };

  zepto.init = function(selector) {
    var slice = Array.prototype.slice;
    var dom = slice.call(document.querySelectorAll(selector));

    return zepto.Z(dom, selector);
  };

  $ = function(selector) {
    return zepto.init(selector);
  };

  $.fn = {
    css: function(key, value) {
      console.log("css");
    },
    html: function(value) {
      console.log("html");
    }
  };

  Z.prototype = $.fn;

  window.$ = $;
})(window);
```
