;(function($) {
  var namespace = 'myPlugin';
  var methods = {
    init: function(options) {
      // 可自定义扩展项
      options = $.extend(
        true,
        {}, 
        $.fn.myPlugin.defaults,
        options
      );
      console.log('options', options, this)
  
      return this;
    },
    getName: function() {
      console.log('Name is ', $.fn.myPlugin.defaults.name, '.')
    },
    getAge: function() {
      console.log('Age is ', $.fn.myPlugin.defaults.age, '.')
    },
    show: function(){
      return this.each(function(){
        this.style.display == "none" && (this.style.display = '')
        if (getComputedStyle(this, '').getPropertyValue("display") == "none")
          this.style.display = defaultDisplay(this.nodeName)
      })
    },
    hide: function() {
      return this.css("display", "none")
    }
  };

  // 命名空间最好只有一个
  $.fn.myPlugin = function(method) {

    // 方法调用，可满足三种情况：1. method, 2. init, 3. error
    if(methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));  //将具有length属性的对象转成数组
    } else if(typeof method === 'object' || !method) {
      // 如果没有参数或者参数
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method' + method + 'does not exist on jQuery.myPlugin.');
    }

  }

  $.fn.myPlugin.defaults =  {
    'name': 'zhangsan',
    'age': '20'
  };
})(jQuery)