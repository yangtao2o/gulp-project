// 发布订阅

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
    console.log(this.lists);
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
