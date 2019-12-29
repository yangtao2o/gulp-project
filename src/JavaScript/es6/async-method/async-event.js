// 事件监听

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
