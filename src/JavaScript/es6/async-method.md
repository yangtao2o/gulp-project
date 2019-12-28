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

## 一、回调函数

第一版：简单明了

```js
function step() {
  console.log('wait for about 3 seconds...');
  setTimeout(() => {
    red();
    setTimeout(() => {
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
}

function step(cb) {
  light(3000, () => {
    red();
    light(1000, () => {
      green();
      light(2000, () => {
        yellow();
        step();
      })
    })
  });
  typeof cb === 'function' && cb();
}

step(() => console.log('wait for about 3 seconds...'));
```

## Promise

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

## Generator

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

## Async/await

有了 Generator 做铺垫，`async/await` 就更容易理解了：

```js

```


## 学习资料

- [一道关于Promise应用的面试题](https://www.cnblogs.com/dojo-lzz/p/5495671.html)
- [ES6 系列之我们来聊聊 Promise](https://github.com/mqyqingfeng/Blog/issues/98)