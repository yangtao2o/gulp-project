function run(gen) {
  return new Promise(function(resolve, reject) {
    if (typeof gen == "function") gen = gen();

    // 如果 gen 不是一个迭代器
    if (!gen || typeof gen.next !== "function") return resolve(gen);

    onFulfilled();

    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    function onRejected(err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    function next(ret) {
      if (ret.done) return resolve(ret.value);
      var value = toPromise(ret.value);
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(
        new TypeError(
          "You may only yield a function, promise " +
            'but the following object was passed: "' +
            String(ret.value) +
            '"'
        )
      );
    }
  });
}

function isPromise(obj) {
  return "function" == typeof obj.then;
}

function toPromise(obj) {
  if (isPromise(obj)) return obj;
  if ("function" == typeof obj) return thunkToPromise(obj);
  return obj;
}

function thunkToPromise(fn) {
  return new Promise(function(resolve, reject) {
    fn(function(err, res) {
      if (err) return reject(err);
      resolve(res);
    });
  });
}

module.exports = run;
