var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
  container.innerHTML = count++;
};

container.onmousemove = throttle(getUserAction, 1000, {trailing: false});

// 时间戳
// function throttle(func, wait) {
//   var context, args;
//   var previous = 0;
//   return function() {
//     var now = +new Date();
//     context = this;
//     args = arguments;
//     if(now - previous > wait) {
//       func.apply(context, args);
//       previous = now;
//     }
//   }
// }

// 定时器
// function throttle(func, wait) {
//   var context, args, timeout;
//   return function() {
//     context = this;
//     args = arguments;
//     if(!timeout) {
//       timeout = setTimeout(function() {
//         timeout = null;
//         func.apply(context, args);
//       }, wait);
//     }
//   }
// }

// 双剑合璧
// function throttle(func, wait) {
//   var context, args, timeout, result;
//   var previous = 0;

//   var later = function () {
//     previous = +new Date();
//     timeout = null;
//     result = func.apply(context, args);
//   };

//   var throttled = function () {
//     var now = +new Date();
//     var remaining = wait - (now - previous);
//     context = this;
//     args = arguments;

//     if (remaining <= 0 || remaining > wait) {
//       if (timeout) {
//         clearTimeout(timeout);
//         timeout = null;
//       }
//       result = func.apply(context, args);
//       previous = now;
//     } else if (!timeout) {
//       timeout = setTimeout(later, remaining);
//     }
//     return result;
//   };

//   return throttled;
// }

// options: leading, trailing

function throttle(func, wait, options) {
  var context, args, timeout, result;
  var previous = 0;

  if(!options) {
    options = {};
  }

  var later = function () {
    previous = options.leading ? 0 : new Date().getTime();
    timeout = null;
    result = func.apply(context, args);
  };

  var throttled = function () {
    var now = new Date().getTime();
    if(!previous && options.leading === false) {
      previous = now;
    }
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      result = func.apply(context, args);
      previous = now;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  return throttled;
}