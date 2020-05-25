// 首先在 observer 的过程中会注册 get 方法，该方法用来进行「依赖收集」。
// 在它的闭包中会有一个 Dep 对象，这个对象用来存放 Watcher 对象的实例。
// 其实「依赖收集」的过程就是把 Watcher 实例存放到对应的 Dep 对象中去。
// get 方法可以让当前的 Watcher 对象（Dep.target）存放到它的 subs 中（addSub）方法，
// 在数据变化时，set 会调用 Dep 对象的 notify 方法通知它内部所有的 Watcher 对象进行视图更新。
class Dep {
  constructor() {
    /* 用来存放Watcher对象的数组 */
    this.subs = [];
  }

  /* 在subs中添加一个Watcher对象 */
  addSub(sub) {
    this.subs.push(sub);
  }

  /* 通知所有Watcher对象更新视图 */
  notify(val) {
    this.subs.forEach(sub => {
      sub.update(val);
    });
  }
}

class Watcher {
  constructor() {
    /* 在new一个Watcher对象时将该对象赋值给Dep.target，在get中会用到 */
    Dep.target = this;
  }

  /* 更新视图的方法 */
  update(val) {
    console.log("视图更新啦～", val);
  }
}

Dep.target = null;

function defineReactive(obj, key, val) {
  /* 一个Dep类对象 */
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      /* 将Dep.target（即当前的Watcher对象存入dep的subs中） */
      dep.addSub(Dep.target);
      return val;
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return;
      /* 在set的时候触发dep的notify来通知所有的Watcher对象更新视图 */
      dep.notify(newVal);
    }
  });
}

// 实现 observer（可观察的）
function observer(value) {
  if (!value || typeof value !== "object") {
    return;
  }
  Object.keys(value).forEach(key => {
    defineReactive(value, key, value[key]);
  });
}

class Vue {
  constructor(options) {
    this._data = options.data;

    observer(this._data);

    /* 新建一个Watcher观察者对象，这时候Dep.target会指向这个Watcher对象 */
    new Watcher();

    /* 在这里模拟render的过程，为了触发test属性的get函数 */
    console.log("render~", this._data.test, this._data.msg);
  }
}

export default Vue;
