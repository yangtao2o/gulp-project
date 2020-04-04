// Promise
function red() {
  console.log("red");
}
function green() {
  console.log("green");
}
function yellow() {
  console.log("yellow");
}

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
