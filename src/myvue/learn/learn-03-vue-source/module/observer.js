function cb(val) {
  console.log("视图更新啦～", val);
}

function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get() {
      return val;
    },
    set(newValue) {
      if (newValue === val) return;
      cb(newValue);
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
  /* Vue构造类 */
  constructor(options) {
    this._data = options.data;
    observer(this._data);
  }
}

let myvue = new Vue({
  data: {
    test: "I am test data."
  }
});

myvue._data.test = "hhhh";
