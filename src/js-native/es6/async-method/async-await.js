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
  await light(3000, red);
  await light(1000, green);
  await light(3000, yellow);
  step();
}

step();
