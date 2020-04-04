(function(window) {
  var jQuery = function(selector) {
    return new jQuery.fn.init(selector)
  }

  jQuery.fn = {
    css: function(name, value) {
      console.log('css')
    },
    html: function(selector) {
      console.log('html')
    }
  }

  var init = jQuery.fn.init = function (selector) {
    var slice = Array.prototype.slice
    var dom = slice.call(document.querySelectorAll(selector))
    var len = dom.length ? dom.length : 0

    for(var i = 0; i < len; i++) {
      this[i] = dom[i]
    }
    this.length = len
    this.selector = selector || ''
  }



  init.prototype = jQuery.fn

  window.$ = window.jQuery = jQuery
})(window)