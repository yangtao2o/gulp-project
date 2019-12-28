// Generator

function red() {
  console.log("red");
}
function green() {
  console.log("green");
}
function yellow() {
  console.log("yellow");
}

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
