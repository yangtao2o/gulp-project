;(function(undefined) {
  // fix for IOS 3.2
  if(String.prototype.trim === undefined) {
    String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g, '')
    }
  }
  // For iOS 3.x
  // 累加器 reduce()
  if(Array.prototype.reduce === undefined) {
    Array.prototype.reduce = function(fun) {
      if(this === void 0 || this === null) { // void是一个函数，永远返回 undefined
        throw new TypeError()
      }
      var t = Object(this),
        // x >>> 0本质上就是保证x有意义（为数字类型），且为正整数，在有效的数组范围内（0 ～ 0xFFFFFFFF），且在无意义的情况下缺省值为0。
        // from https://segmentfault.com/a/1190000014613703
        len = t.length >>> 0,
        k = 0,
        accumulator;

      if(typeof fun !== 'function') throw new TypeError();
      if(len == 0 && arguments.length == 1) throw new TypeError();

      if(arguments.length > 2) {
        accumulator = arguments[1];  // 如果参数大于两个，将第二个参数作为初始值
      } else {
        do {
          if(k in t) {
            accumulator = t[k++]; // 否则将数组的第一条数据作为初始值
            break;
          }
          if(++k >= len) throw new TypeError();
        } while (true) {
          while (k < len) {
            if(k in t) {
              //call() 方法调用一个函数, 其具有一个指定的this值和分别地提供的参数
              // 如果是null undefined，则 this 指向 window
              accumulator = fun.call(undefined, accumulator, t[k], k, t);
              k++;
            }
          }
        }
        return accumulator;
      }
    }
  }
})()

var Zepto = (function() {
  var $,
    zepto = {};

  zepto.init = function(selector, context) {
    var dom;
    return zepto.Z(dom, selector);
  }

  $ = function(selector, context) {
    return zepto.init(selector, context);
  }

  return $;
})();

window.Zepto = Zepto;
window.$ = undefined && (window.$ = Zepto);


