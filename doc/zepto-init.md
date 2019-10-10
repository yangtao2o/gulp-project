# Zepto init

### typeof 运算符

ES6 中的基本数据类型是：
Number、String、Null、Undefined、Symbol、Boolean

```javascript
typeof Symbol(); //"symbol"
typeof Number(); //"number"
typeof String(); //"string"
typeof Function(); //"function"
typeof Object(); //"object"
typeof Boolean(); //"boolean"
typeof undefined; //"undefined"
typeof null; //"object"
```

### 创建对象的过程

```javascript
function create() {
  let result,
    obj = new Object(),
    Con = [].shift.call(arguments);
  obj.__proto__ = Con.prototype;
  result = Con.apply(obj, arguments);
  return result === "object" ? result : obj;
}
```

### 原型链继承：圣杯模式

```javascript
var inherit = (function(child, parent) {
  var F = function() {};
  return function(child, parent) {
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.uber = parent.prototype;
    child.prototype.constructor = child;
  };
})();
```

### 防抖和节流

#### 防抖

如输入框时，只在最后提交的时候校验，即：将多次高频率操作优化为只在最后一次执行

思路：每次触发事件时，清除之前的定时器方法

```javascript
function debounce(fn, wait, immediate) {
  let timer = null;
  console.log("in");
  return function() {
    let context = this;
    let args = arguments;

    if (immediate && !timer) {
      fn.apply(context, args);
    }

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      console.log("timer");
      fn.apply(context, args);
    }, wait);
  };
}
function test() {
  console.log("被触发了");
}
document.getElementById("btn").onfocus = debounce(test, 1000);
```

#### 节流

降低频率，每隔一段时间后执行一次，将高频率操作优化为低频率操作，如滚动条事件，resize 事件

思路：每次触发事件时都判断当前是否有等待执行的延时函数

```javascript
function throtte(fn, wait, immediate) {
  let timer = null;
  let callNow = immediate;
  return function() {
    let args = arguments;
    let context = this;

    if (callNow) {
      fn.apply(context, args);
      callNow = false;
    }
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args);
        timer = null;
      }, wait);
    }
  };
}

window.addEventListener("resize", throtte(test, 1000));
```

### Zepto

- [文档](http://www.kancloud.cn/wangfupeng/zepto-design-srouce/173680)

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

- [关于 JavaScript 的浅拷贝和深拷贝](https://www.cnblogs.com/Chen-XiaoJun/p/6217373.html)

- [JavaScript instanceof 运算符深入剖析](https://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/index.html)
- [为什么用 Object.prototype.toString.call(obj)检测对象类型?](https://www.cnblogs.com/youhong/p/6209054.html)
- [apply()与 call()的区别](https://www.cnblogs.com/lengyuehuahun/p/5643625.html)
- [Debounce 和 Throttle 的原理及实现](https://www.tuicool.com/articles/YvyQRrv)
- [JavaScript 深入浅出](https://www.imooc.com/learn/277)---该课由浅入深的介绍 JavaScript 的语言特性，结合实际例子解析常见误区
- [JavaScript 深入之从原型到原型链](https://github.com/mqyqingfeng/Blog/issues/2)
- [深入理解 javascript 原型和闭包（3）——prototype 原型](https://www.cnblogs.com/wangfupeng1988/p/3978131.html)
