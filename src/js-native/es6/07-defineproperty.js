var obj = {};
var value = null;
Object.defineProperty(obj, "num", {
  // 当程序查询存取器属性的值时，JavaScript 调用 getter方法。
  // 这个方法的返回值就是属性存取表达式的值。
  get: function() {
    console.log("getter");
    return value;
  },

  // 当程序设置一个存取器属性的值时，JavaScript 调用 setter 方法，
  // 将赋值表达式右侧的值当做参数传入 setter。
  // 从某种意义上讲，这个方法负责“设置”属性值。可以忽略 setter 方法的返回值。
  set: function(newValue) {
    console.log("setter");
    value = "Hi, " + newValue;
    return value;
  },
  configurable: true,
  enumerable: true
});
obj.num = 1;
obj.num;
console.log(value);
var getDescriptor = Object.getOwnPropertyDescriptor(obj, "num");
var getDescriptors = Object.getOwnPropertyDescriptors(obj);
console.log(getDescriptor);
for (let key in obj) {
  console.log({ key });
}

// 储存 obj.value 的值
// var value = 1;

// Object.defineProperty(obj, "value", {
//   get: function() {
//     return value;
//   },
//   set: function(newValue) {
//     value = newValue;
//     document.getElementById("container").innerHTML = newValue;
//   }
// });

// document.getElementById("button").addEventListener("click", function() {
//   obj.value += 1;
// });

(function() {
  var root = this;
  function watch(obj, name, fn) {
    var value = obj[name];
    Object.defineProperty(obj, name, {
      get: function() {
        return value;
      },
      set: function(newValue) {
        value = newValue;
        fn(value);
      }
    });
    if (value) obj[name] = value;
  }
  this.watch = watch;
})();

obj.value = 1;
watch(obj, "value", function(newvalue) {
  document.getElementById("container").innerHTML = newvalue;
});

// document.getElementById("button").addEventListener("click", function() {
//   obj.value += 1;
// });

// proxy
var proxy = new Proxy(
  {},
  {
    get: function(obj, prop) {
      console.log("设置 get 操作");
      return obj[prop];
    },
    set: function(obj, prop, value) {
      console.log("设置 set 操作");
      obj[prop] = value;
    }
  }
);

console.log(proxy);
proxy.time = 20;
console.log(proxy.time);

(function() {
  var root = this;
  function watch(target, fn) {
    return new Proxy(target, {
      get(target, prop) {
        return target[prop];
      },
      set(target, prop, value) {
        target[prop] = value;
        fn(prop, value);
      }
    });
  }
  this.watchProxy = watch;
})();

var obj = {
  value: 1
};

var newObj = watchProxy(obj, function(key, newvalue) {
  if (key === 'value') {
    document.getElementById("container").innerHTML = newvalue;
  }
});

document.getElementById("button").addEventListener("click", function() {
  newObj.value += 1;
});
