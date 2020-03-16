;(function(window) {
  var $,
      zepto = {}

  function Z(dom, selector) {
    var i, len = dom.length ? dom.length : 0
    for (var i = 0; i < dom.length; i++) {
      this[i] = dom[i]
    }
    this.length = len
    this.selector = selector || ''
  }

  zepto.Z = function(dom, selector) {
    return new Z(dom, selector)
  }

  zepto.init = function(selector) {
    var slice = Array.prototype.slice
    var dom = slice.call(document.querySelectorAll(selector))

    return zepto.Z(dom, selector)
  }

  $ = function(selector) {
    return zepto.init(selector)
  }

  $.fn = {
    css: function(key, value) {
      console.log('css')
    },
    html: function(value) {
      console.log('html')
    }
  }
  
  Z.prototype = $.fn

  window.$ = $
})(window)