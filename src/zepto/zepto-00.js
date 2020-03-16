(function(global, factory) {
  if(typeof define === "function" && define.amd) {
    define(function() {
      return factory(global);
    });
  } else {
    factory(global)
  }
})(this, function(window) {
  var Zepto = (function() {
    var $;
    var zepto = {};
    function Z(dom, selector) {
      var i,
        len = dom ? dom.length : 0;
      for (i = 0; i < len; i++) this[i] = dom[i];
      this.length = len;
      this.selector = selector || "";
    }
    zepto.Z = function(dom, selector) {
      return new Z(dom, selector);
    };
    zepto.init = function(selector, context) {
      var slice = Array.prototype.slice;
      var dom = slice.call(document.querySelectorAll(selector));

      // create a new Zepto collection from the nodes found
      return zepto.Z(dom, selector);
    };
    $ = function(selector, context) {
      return zepto.init(selector, context);
    };
    $.fn = {
      constructor: zepto.Z,
      length: 0,
      push: "push method",
      css: function() {
        console.log("css");
        return this;
      },
      html: function() {
        console.log("html")
        return this;
      }
    };
    $.fn.on = function(event, data, callback) {
      console.log("on method");
    };
    $.fn.off = function(event, data, callback) {
      console.log("off method");
    };

    $.fn.bind = function(event, data, callback) {
      return this.on(event, data, callback);
    };
    $.fn.unbind = function(event, callback) {
      return this.off(event, callback);
    };

    zepto.Z.prototype = Z.prototype = $.fn;

    $.zepto = zepto;
    return $;
  })();
  window.Zepto = Zepto;
  window.$ === undefined && (window.$ = Zepto);
});
