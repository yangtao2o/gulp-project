var count = 1;
var container = document.getElementById('container');
var button = document.getElementById('button');

function getUserAction(e) {
  container.innerHTML = count++;
};


// 1
// function debounce(func, wait) {
//   var timer;
//   return function() {
//     clearTimeout(timer);
//     timer = setTimeout(func, wait);
//   }
// }

// 2 - this, args, 返回值
// function debounce(func, wait) {
//   var timer;
//   return function() {
//     var _this = this;
//     var args = arguments;

//     clearTimeout(timer);
//     timer = setTimeout(function() {
//       var result = func.apply(_this, args);
//     }, wait);

//     return result;
//   };
// }

// 3 - 立即执行
// function debounce(func, wait, immediate) {
//   var timer, result;
//   return function () {
//     var _this = this;
//     var args = arguments;

//     if (timer) clearTimeout(timer);
//     if (immediate) {
//       console.log('0', timer)
//       var callNow = !timer;
//       console.log('1', callNow)
//       timer = setTimeout(function () {
//         console.log('4', timer)
//         timer = null;
//         console.log('5')
//       }, wait);
//       console.log('2', timer)
//       if (callNow) {
//         console.log('3')
//         result = func.apply(_this, args);
//       }
//     } else {
//       timer = setTimeout(function () {
//         result = func.apply(_this, args);
//       }, wait);
//     }

//     return result;
//   };
// }

// function debounce(func, wait, immediate) {
//   var timerId, result;

//   return function() {
//     var _this = this;
//     var _args = arguments;
//     if (timerId) clearTimeout(timerId);
//     if (immediate) {
//       var callNow = !timerId;
//       timerId = setTimeout(function() {
//         timerId = null;
//       }, wait);
//       if (callNow) {
//         result = func.apply(_this, _args);
//       }
//     } else {
//       timerId = setTimeout(function() {
//         result = func.apply(_this, _args);
//       }, wait);
//     }
//     return result;
//   };
// }

// 4 - 取消
function debounce(func, wait, immediate) {
  var timerId, result;

  var debounced = function() {
    var _this = this;
    var _args = arguments;
    if (timerId) clearTimeout(timerId);
    if (immediate) {
      var callNow = !timerId;
      timerId = setTimeout(function() {
        timerId = null;
      }, wait);
      if (callNow) {
        result = func.apply(_this, _args);
      }
    } else {
      timerId = setTimeout(function() {
        result = func.apply(_this, _args);
      }, wait);
    }
    return result;
  };

  debounced.cancel = function() {
    clearTimeout(timerId);
    timerId = null;
  };

  return debounced;
}
var setUseAction = debounce(getUserAction, 1000, true);
container.onmousemove = setUseAction;
button.addEventListener('click', function() {
  setUseAction.cancel();
});
