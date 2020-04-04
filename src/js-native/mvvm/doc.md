## MVVM

### jQuery 与 vue 的区别

- 数据与视图的分离，解耦（开放封闭设计原则）
- 以数据驱动视图，只关心数据变化，DOM 操作被封装

### 对 MVVM 的理解

- [什么是 MVVM 模式？](https://www.jianshu.com/p/a898ef83f38c)
- [MVC，MVP 和 MVVM 的图示](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)

#### MVC（Model-View-Controller）

MVC 一种将业务逻辑、数据、界面分离的方法组织代码的框架。

Model：模型，逻辑部分，也是表示应用程序的核心，比如数据库的表和记录
View：视图（可以有多个），数据显示，也是表示界面，比如显示数据库的记录
Controller：控制器，用户交互，即处理，如增删改查数据库的记录

MVC 将视图层和业务层分离，很容易改变应用程序的数据层和业务规则，耦合性低且可维护性高。

MVC 中的模型可以被不同的视图使用，重用性高。

#### MVVM（Model-View-ViewModel）

MVVM 由 MVC（后端） 转换而来，ViewModel 是比较创新的

M：模型层
V：视图层
VM：View 与 Model 沟通的桥梁，负责监听 M 或者 V 的修改

MVVM 支持双向绑定，当 M 层数据进行修改时，VM 层会检测到变化，并通知 V 层进行相应的修改；反之，修改 V 层，则会通知 M 层数据进行修改，以此也实现了视图与模型之间的相互解耦。

与 MVC 的区别：MVVM 实现了 View 和 Model 的自动同步，即当 Model 的属性改变时，不用再手动操作 DOM 元素来改变 View 的显示，而是发生变化的属性对应的 View 层显示会自动改变。

![mvvm](https://user-images.githubusercontent.com/19526072/53217819-8707b600-3694-11e9-8c3b-15ef58b3764d.png)

## Vue

三要素：

- 响应式：vue 如何监听到 data 的每个属性变化？
- 模板引擎：vue 的模板如何被解析，指令如何处理？
- 渲染：vue 的模板如何被渲染成 HTML？以及渲染过程

- [关于 Vue 的 MVVM](https://www.jianshu.com/p/ea9d556d6529)

### 什么是响应式

- 主要理解 `Object.defineProperty`

```javascript
var obj = {};
var _name = "zhangsan";

Object.defineProperty(obj, "name", {
  get: function() {
    console.log("get name:");
    return _name;
  },
  set: function(newVal) {
    console.log("set name");
    _name = newVal;
  }
});
```

- 将 data 的属性代理到 vm 上

```javascript
// 模拟
// var vm = new Vue({
//   el: '#app',
//   data: {
//     name: 'ZhangSan',
//     age: 20
//   }
// })

var vm = {};
var data = {
  name: "ZhangSan",
  age: 20
};
var key, value;
for (key in data) {
  (function(key) {
    Object.defineProperty(vm, key, {
      get: function() {
        console.log("get:");
        return data[key];
      },
      set: function(newVal) {
        console.log("set:");
        data[key] = newVal;
      }
    });
  })(key);
}
```

### vue 中如何解析模板

#### 什么是模板

- 本质：字符串
- 有逻辑：如 `v-if v-for` 等
- 与 HTML 格式很像，但是有很大区别，最终还是要转换成 html 来显示
- 模板最终必须转换成 JS 代码，因为:
  - 有逻辑，必须用 JS 才能实现
  - 转化为 html 渲染页面，必须用 JS 才能实现
  - 因此，模板最终转换成一个 JS 函数（如 render 函数）

#### render 函数

- 模板中所有的信息都包含在了 render 函数中
- this 即 VM
- price 即 this.price 即 vm.price，即 data 中的 price
- \_c 即 this.\_c 即 vm.\_c

```javascript
// 以下是手写的 render 函数
function render() {
  with (this) {
    //this 即 vm
    return _c(
      "div",
      {
        attrs: { id: "app" }
      },
      [_c("p", [_v(_s(price))])]
    );
  }
}
//即：
function render1() {
  return vm._c(
    "div",
    {
      attrs: { id: "app" }
    },
    [vm._c("p", [vm._v(vm._s(vm.price))])]
  );
}
```
