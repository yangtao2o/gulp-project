### JavaScript深入之从原型到原型链
> 每一个函数都有一个`prototype`属性，该属性指向了一个对象，此对象为调用该函数而创建的实例的原型

![构造函数和实例原型的关系图](https://github.com/mqyqingfeng/Blog/raw/master/Images/prototype1.png)

> 每一个对象（除null）都具有一个属性：`__proto__`，这个属性指向该对象的原型

![实例与实例原型的关系图](https://github.com/mqyqingfeng/Blog/raw/master/Images/prototype2.png)

> 每个原型都有一个constructor属性指向关联的构造函数

![](https://raw.githubusercontent.com/mqyqingfeng/Blog/master/Images/prototype3.png)

> 原型对象是通过 `Object` 构造函数生成的，最后`Object.prototype.__proto__ = null`

![原型链示意图](https://github.com/mqyqingfeng/Blog/raw/master/Images/prototype5.png)