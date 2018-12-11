/* exported features */
var features = {
  // “!!”是逻辑与的取反运算，在判断类型时代码简洁高效
  // 比如：if(a!=null&&typeof(a)!=undefined&&a!=''){...}直接可以用 if(!!a){...}
  bind: !!(function() { }.bind),
  classList: 'classList' in document.documentElement,
  fAF: !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
};
// window.requestAnimationFrame() 方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。
window.requestAnimationFrame = window.requestAnimationFrame || window.webkitCancelAnimationFrame || window.mozRequestAnimationFrame;

/**
 * 动画事件过程中防抖动
 * 要点：将若干个函数调用合成 一次， 并在给定时间过去之后仅被调用一次
 */

function Debouncer (callback) {
  this.callback = callback;
  this.ticking = false;
}

Debouncer.prototype = {
  constructor: Debouncer,

  // dispatches the event to the supplied callback
  update: function() {
    this.callback && this.callback();
    this.ticking = false;
  },

  // 确定 ticking 只绑定了一次
  requestTick: function() {
    if(!this.ticking) {
      requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
      this.ticking = true;
    }
  },

  // Attach this as the event Listeners
  handleEvent: function() {
    this.requestTick();
  }
};

// 检查 obj 是否是 DOM
function isDOMElement(obj) {
  return obj && typeof obj !== 'undefined' && (obj === window || obj.nodeType);
}

// 将一个或多个对象的内容合并到目标对象
function extend(object /*, objectN ... */) {
  if(arguments.length <= 0) {
    throw new Error('Missing arguments in extend function');
  }
  
  var result = object || {},
    key,
    i;

  for(i = 1; i < arguments.length; i++) {
    var replacement = arguments[i] || {};
    // 对象是否是DOM元素，如否，则递归为对象
    for(key in replacement) {
      if(typeof result[key] === 'object' && !isDOMElement(result[key])) {
        console.log('result[key]-1', result[key]);
        result[key] = extend(result[key], replacement[key]);
      } else {
        console.log('result[key]-2', result[key]);
        result[key] = result[key] || replacement[key];
      }
    }
  }
  return result;
}

// Helper function for normalizing tolerance option to object format
function normalizeTolerance (t) {
  return t === Object(t) ? t : { down: t, up: t };
}

/**
 * 
 */
function Headroom(elem, options) {
  options = extend(options, Headroom.options);

  this.lastKnownScrollY = 0;
  this.elem = elem;
  this.tolerance = normalizeTolerance(options.tolerance);
  this.classes = options.classes;
  this.classList = options.classList;
  this.offset = options.offset;
  this.scroller = options.scroller;
  this.initialised = false;
  this.onPin = options.onPin;
  this.onUnpin = options.onUnpin;
  this.onTop = options.onTop;
  this.onNotTop = options.onNotTop;
  this.onBottom = options.onBottom;
  this.onNotBottom = options.onNotBottom;
}
Headroom.prototype = {
  contructor: Headroom,
  init: function() {
    
  }
}