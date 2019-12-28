// async await

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

async function step() {
  const red = light(3000, red);
  const green = light(1000, green);
  const yellow = light(3000, yellow);
}



