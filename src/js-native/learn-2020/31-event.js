class EventEmitter {
  constructor() {
    this._events = {};
  }

  on(type, listener) {
    // 同类型事件归纳在一起，触发的时候挨个触发
    let cb = this._events[type] || [];
    cb.push(listener);
    this._events[type] = cb;
    return this;
  }

  off(type, listener) {
    const callbacks = this._events[type];
    // 如果是删除所有事件，一次性删除，否则删除对应事件
    if (!listener) {
      callbacks.length = 0;
    } else {
      this._events[type] = callbacks && callbacks.filter(cb => cb !== listener);
    }
    
    return this;
  }

  once(type, listener) {
    // 绑定一个事件：执行完毕就解除
    const cb = (...args) => {
      listener.call(this, ...args);
      this.off(type, cb);
    }
    this.on(type, cb);
    return this;
  }

  emit(type, ...args) {
    const callbacks = this._events[type];
    if (Array.isArray(callbacks)) {
      callbacks.forEach(cb => cb.call(this, ...args));
    }
  }
}

const emitter = new EventEmitter();
const handle1 = () => console.log("hello");
const handle2 = param => console.log("hi, " + param);
emitter.on("log", handle1);
emitter.once("log", handle2); 
emitter.emit("log", "Event Fire1");  
// hello
// hi, Event Fire1
emitter.emit("log", "Event Fire2");
// hello
emitter.off("log", handle1);
emitter.emit("log", "Event Fire2");

// 观察者模式
class Subject {
  constructor() {
    this.observers = [];
  }

  add(observer) {
    this.observers.push(observer);
  }

  notify(...args) {
    this.observers.forEach(observer => observer.log(...args));
  }
}

class Observer {
  log(...args) {
    console.log(...args);
  }
}

const ob1 = new Observer();
const ob2 = new Observer();
const sub = new Subject();
sub.add(ob1);
sub.add(ob2);
sub.notify('Event Fire');