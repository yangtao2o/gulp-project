// 回调函数

function red() {
  console.log("red");
}
function green() {
  console.log("green");
}
function yellow() {
  console.log("yellow");
}

var light = function(timmer, cb) {
  setTimeout(() => {
    cb();
  }, timmer);
}

function step1() {
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
