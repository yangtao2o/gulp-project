# 异步处理方式

> 题目：红灯三秒亮一次，绿灯一秒亮一次，黄灯两秒亮一次，不断交替循环

先定义下红绿灯：

```js
function red() {
  console.log("red");
}
function green() {
  console.log("green");
}
function yellow() {
  console.log("yellow");
}
```

异步编程的语法目标，就是怎样让它更像同步编程,有以下几种：

- 回调函数实现
- 事件监听 event
- 发布订阅 Publish/Subscribe
- Promise 和 Generator
- Async/await

## 一、回调函数

这是最常见的一种方式，把函数作为参数送入，然后回调。

第一版：简单明了

```js
function step() {
  console.log("wait for about 3 seconds...");
  setTimeout(() => {
    red();
    setTimeout(() => {
      green();
      setTimeout(() => {
        yellow();
        step();
      }, 2000);
    }, 1000);
  }, 3000);
}

step();
```

第二版：封装定时器

```js
var light = (timmer, cb) => {
  setTimeout(() => {
    cb();
  }, timmer);
};

function step(cb) {
  light(3000, () => {
    red();
    light(1000, () => {
      green();
      light(2000, () => {
        yellow();
        step();
      });
    });
  });
  typeof cb === "function" && cb();
}

step(() => console.log("wait for about 3 seconds..."));
```

## 二、事件监听

采用事件驱动模式。任务的执行不取决于代码的顺序，而取决于某个事件是否发生。

第一版：监听一个事件，然后触发这个事件，并且执行事件里的回调函数

```js
// 引入 Node events 模块
const events = require("events");
const emitter = new events.EventEmitter();

// 监听
emitter.on("lightEvent", str => console.log(str));

// 触发
emitter.emit("lightEvent", "red");
emitter.emit("lightEvent", "green");
emitter.emit("lightEvent", "yellow");

// 输出
// red
// green
// yellow
```

第二版：加个顺序执行

```js
// 引入 Node events 模块
const events = require("events");
const emitter = new events.EventEmitter();

const lightHandler = (timmer, cb) => {
  setTimeout(() => {
    cb();
  }, timmer);
};

// 监听
emitter.on("lightEvent", str => console.log(str));

// 触发
function step() {
  lightHandler(3000, () => {
    emitter.emit("lightEvent", "red");
    lightHandler(1000, () => {
      emitter.emit("lightEvent", "green");
      lightHandler(2000, () => {
        emitter.emit("lightEvent", "yellow");
        step();
      });
    });
  });
}

step();
```

依旧是回调执行，我们继续远征吧。

## 三、发布/订阅

> "事件"，完全可以理解成"信号"。
>
> 我们假定，存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"（publish）一个信号，其他任务可以向信号中心"订阅"（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做"发布/订阅模式"（publish-subscribe pattern），又称"观察者模式"（observer pattern）。 - 阮一峰

订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Event Channel），当发布者（Publisher）发布该事件（Publish Event）到调度中心，也就是该事件触发时，由调度中心统一调度（Fire Event）订阅者注册到调度中心的处理代码。

第一版：

```js
const publisher = {
  // 缓存列表
  lists: {},
  // 订阅
  subscribe: function(event, handler) {
    (this.lists[event] || (this.lists[event] = [])).push(handler);
  },
  // 发布
  publish: function() {
    const event = [].shift.call(arguments);
    const events = this.lists[event];

    if (!events || events.length === 0) {
      return false;
    }

    events.forEach(item => {
      item.apply(this, arguments);
    });
  }
};

// 订阅
publisher.subscribe("lightEvent", red);
publisher.subscribe("lightEvent", green);
publisher.subscribe("lightEvent", yellow);

// 发布
publisher.publish("lightEvent");
```

第二版：

```js
const publisher = {
  // 缓存列表
  lists: {},
  // 订阅
  subscribe: function(event, handler) {
    (this.lists[event] || (this.lists[event] = [])).push(handler);
  },
  // 取消订阅
  unsubscribe: function(event, handler) {
    const events = this.lists[event];
    if (!events) {
      return false;
    }
    if (!handler) {
      events && (events.length = 0);
    } else {
      events.forEach((item, i) => {
        if (item === handler) {
          events.splice(i, 1);
        }
      });
    }
  },
  // 发布
  publish: function() {
    const event = [].shift.call(arguments);
    const events = this.lists[event];

    if (!events || events.length === 0) {
      return false;
    }

    events.forEach(item => {
      item.apply(this, arguments);
    });
  }
};

const lightHandler = (timmer, cb) => {
  setTimeout(() => {
    cb();
  }, timmer);
};

const colorHandler = color => console.log(color);

// 订阅
publisher.subscribe("redEvent", colorHandler);
publisher.subscribe("greenEvent", colorHandler);
publisher.subscribe("yellowEvent", colorHandler);

function step() {
  lightHandler(3000, () => {
    publisher.publish("redEvent", "red");
    lightHandler(1000, () => {
      publisher.publish("greenEvent", "green");
      lightHandler(2000, () => {
        publisher.publish("yellowEvent", "yellow");
        step();
      });
    });
  });
}

step();
```

## 三、Promise

直接上代码：

```js
var light = (timmer, cb) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cb();
      resolve();
    }, timmer);
  });
};

var step = () => {
  Promise.resolve()
    .then(() => {
      return light(3000, red);
    })
    .then(() => {
      return light(1000, green);
    })
    .then(() => {
      return light(2000, yellow);
    })
    .then(() => {
      step();
    })
    .catch(err => console.log(err));
};

step();
```

## 四、Generator

Promise 的写法减少了好多回调，但是仍有回调的存在，这次尝试使用 Generator，看是否能够避免回调。

```js
const light = (timmer, cb) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cb();
      resolve();
    }, timmer);
  });
};

function* gen() {
  yield light(3000, red);
  yield light(1000, green);
  yield light(3000, yellow);
}

const iterator = gen();

const step = (gen, iterator) => {
  const s = iterator.next();
  // 返回 { value: Promise { <pending> }, done: false }
  if (s.done) {
    step(gen, gen());
  } else {
    // value 返回 Promise 对象
    s.value.then(() => {
      step(gen, iterator);
    });
  }
};

step(gen, iterator);
```

## 五、Async/await

有了 Generator 做铺垫，`async/await` 就比较容易理解了：

```js
const light = (timmer, cb) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cb();
      resolve();
    }, timmer);
  });
};

async function step() {
  await light(3000, red);
  await light(1000, green);
  await light(2000, yellow);
  step();
}

step();
```

同步写法，容易理解，和我们的线性思考方式一致，`async/await`是 `ES2017` 的方案。

## 学习资料

- [一道关于 Promise 应用的面试题](https://www.cnblogs.com/dojo-lzz/p/5495671.html)
- [ES6 系列之我们来聊聊 Promise](https://github.com/mqyqingfeng/Blog/issues/98)
- [Javascript 异步编程的 4 种方法](http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html)
- [JavaScript | 异步处理](https://juejin.im/post/5cd97d75e51d453a69177ecc)
- [nodejs 事件的监听与事件的触发](https://www.cnblogs.com/pingfan1990/p/4661841.html)
- [JavaScript 发布-订阅模式](https://www.codercto.com/a/81223.html)
- [JavaScript 实现与使用发布/订阅模式详解](https://www.jb51.net/article/154921.htm)
