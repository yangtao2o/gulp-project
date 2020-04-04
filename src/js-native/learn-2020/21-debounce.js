function debounce(func, wait, immediate) {
  var timer, result;
  var debounced = function() {
    var context = this;
    var args = arguments;
    clearTimeout(timer); // 每次只要你触发 func，我就清除定时器，从新计算
    if (immediate) {
      // 触发 func 从队尾提到队前
      // 初始值是 true, 立即执行；随后 timer 开始执行
      // wait 时间期间，timer 是一个 ID，所以 callNow 为 false
      // wait 时间之后，赋值 null，callNow 为 true，func 开始执行。依次循环。
      var callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);

      if (callNow) {
        result = func.apply(context, args);
      }
    } else {
      // 触发func，定时器wait之后执行
      timer = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
    return result;
  };
  debounced.cancel = function() {
    clearTimeout(func);
    timer = null;
  };
  return debounced;
}

var count = 1;
var container = document.getElementById("container");

function getUserAction(e) {
  console.log(e);
  container.innerHTML = count++;
}

container.onmousemove = debounce(getUserAction, 200, true);
