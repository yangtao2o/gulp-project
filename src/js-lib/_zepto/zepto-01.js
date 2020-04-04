var Zepto = (function() {
  var $,
    emptyArray = [],
    zepto = {},
    filter = emptyArray.filter,
    readyRE = /complete|loaded|interactive/,
    isArray = Array.isArray || function(object) {
      return object instanceof Array
    }

  /**
   * type 判断
   * Object.prototype.toString.call([]) 返回的是 '[Object Array]',那么即可根据这个获取 [] 的类型是 'array'
   */
  var class2type = {};
  var toString = class2type.toString;
  function type(obj) {
    return obj == null ?
          String(obj) :
          class2type[toString.call(obj)] || 'object'

  }
  // $.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), function(i, name) {
  //   class2type['[object ' + name + ']'] = name.toLowerCase();
  // })

  function isFunction(value) {
    return type(value) === 'function';
  }
  function isWindow(obj) {
    return obj != null && obj == obj.window
  }
  function isDocument(obj) {
    return obj != null && obj.nodeType == obj.DOCUMENT_NODE
  }
  function isObject(obj) {
    return type(obj) == 'object'
  }
  // 判断是否是最基本的object：Object.getPrototypeOf(obj) == Object.prototype
  function isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype
  }
  // 判断是否是数组或者对象数组
  function likeArray(obj) {
    return typeof obj.length == 'number'
  }
  function compact(array) {
    return filter.call(array, function(item) {
      return item != null
    })
  }
  // 无论array是否为数组，都将正确返回一个数组
  function flatten(array) {
    return array.length > 0 ? $.fn.concat.apply(array) : array
  }
  zepto.matches = function(context, selector) {
    if(!selector || !element || element.nodeType !== 1) return false
    var matchesSelector = element.webkitMatchesSelector || 
                          element.mozMatchesSelector ||
                          element.oMatchesSelector || 
                          element.matchesSelector

    if (matchesSelector) {
      return matchesSelector.call(element, selector)
    }

  }
  // 将 dom 隐式原型强制改为 $.fn
  zepto.Z = function(dom, selector) {
    dom = dom || []
    dom.__proto__ = $.fn
    dom.selector = selector || ''
    return dom
  }
  // 判断object是否为zepto.Z的实例或继承关系
  zepto.isZ = function(object) {
    return object instanceof zepto.Z
  }

  zepto.init = function(selector, context) {
    var dom

    return zepto.Z(dom, selector)
  }

  $ = function(selector, context) {
    return zepto.init(selector, context)
  }
  // 将上文定义的函数，暴露给 $ 对象
  $.type = type
  $.isFunction = isFunction
  $.isWindow = isWindow
  $.isArray = isArray
  $.isPlainObject = isPlainObject


  // 感觉这样设计是比较好，很好的将业务和底层进行了分离（虽然比较简单）：
  // 核心方法再 function extend(...){...} 中定义，
  // 而 $.extend 方法中做一些外围的判断和处理，最终调用 extend 函数去执行
  var key
  function extend(target, source, deep) {
    for(key in source) { }
  }
  $.extend = function(target) {

  }

  /*
    @element: 容器
    @selector: 选择器
  */
  zepto.qsa = function(element, selector) {
    // 以下代码的基本思路是：
    // 1. 优先通过 ID 获取元素；
    // 2. 然后试图通过 className 和 tagName 获取元素
    // 3. 最后通过 querySelectorAll 来获取
  }

  $.contains = document.documentElement.contains ? 
    function(parent, node) {
      return parent !== node && parent.contains(node)
    } :
    function(parent, node) {
      while(node && (node = node.parentNode)) {
        if(node === parent) return true
      }
      return false
    }

  $.isEmptyObject = function(obj) {
    var name
    for(name in obj) return false
    return true
  }
  /**
   * $.inArray(element, array, [fromIndex])   ⇒ number
   * 返回数组中指定元素的索引值（注：以0为基数），如果没有找到该元素则返回-1。
   */ 

  $.inArray = function(ele, array, i) {
    return emptyArray.indexOf.call(array, elem, i)
  }
  $.trim = function(str) {
    return str == null ? '' : String.prototype.trim.call(str)
  }
  /**
   * $.map(collection, function(item, index){ ... })   ⇒ collection
   * 通过遍历集合中的元素，返回通过迭代函数的全部结果，（注：一个新数组）null 和 undefined 将被过滤掉。
   * 重新组织 elements 对象，针对每一个元素都用 callback 进行检验
   * 检验通过后，将元素 push 进新的数组，并以数组的形式返回
   */

  $.map = function(elements, callback) {
    var value, values = [], i, key
    // 数组 或者类数组
    if(isArray(element)) {
      for (var i = 0; i < elements.length; i++) {
        value = callback(elements[i], i)
        if(value != null) values.push(value)
      }
    } else { //对象
      for (key in elements) {
        value = callback(elements[key], key)
        if(value != null) values.push(value)
      }
    }
    // 返回正确的数组
    return flatten(values)
  }

  /**
   * $.each(collection, function(index, item){ ... })   ⇒ collection
   * 遍历数组元素或以key-value值对方式遍历对象。回调函数返回 false 时停止遍历。
   */
  $.each = function(elements, callback) {
    var i, key
    if(likeArray(elements)) {
      for (var i = 0; i < elements.length; i++) {
        if(callback.call(elements[i], i, elements[i]) === false) {
          return elements
        }
      }
    } else {
      for (key in elements) {
        console.log(callback.call(elements[key], key, elements[key]))
        if(callback.call(elements[key], key, elements[key]) === false) {
          return elements;
        }
      }
    }
  }
  // 获取一个新数组，新数组只包含回调函数中返回 ture 的数组项。
  $.grep = function(elements, callback) {
    return filter.call(elements, callback)
  }

  if(window.JSON) {
    $.parseJSON = JSON.parse
  }

  $.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), function(i, name) {
    class2type['[object ' + name + ']'] = name.toLowerCase();
  })

  $.fn = {
    // 为何要这么多数组的方法？
    // 因为一个 zepto 对象，本身就是一个数组
    forEach: emptyArray.forEach,
    push: emptyArray.push,
    sort: emptyArray.sort,
    indexOf: emptyArray.indexOf,
    concat: emptyArray.concat,
    map: function(fn) {
      // $.map 返回的是一个数组
      return $($.map(this, function(el, i) {
        return fn.call(el, i, el)
      }))
    },
    /*
      $('div').map(function(key, value){
        return value.id;
        // 或者 return this.id;
      })
      这个结果就是 $(['div1', 'div2' ...])
    */

    each: function(callback) {
      emptyArray.every.call(this, function(el, idx) {
        return callback.call(el, idx, el) !== false
      })
      return this
    },
    slice: function() {
      return $(slice.apply(this, arguments))
    },
    ready: function(callback) {
      if(readyRE.test(document.readyState) && document.body) {
        callback($)
      } else {
        document.addEventListener('DOMContentLoaded', function() {
          callback($)
        }, false)
      }
      return this
    },
    get: function(idx) {
      return idx === undefined ? 
        slice.call(this) : // 直接返回一整个数组
        this[
          idx >= 0 ? 
          idx : 
          idx + this.length
      ]
    },
    eq: function(idx) {
      return idx === -1 ? this.slice(idx) : this.slice(idx, + idx + 1)
    },
    closest: function(selector, context) {
      var node = this[0], collection = false
      if(typeof selector == 'object') {
        collection = $(selector)
      }
      while(node &&
        !(
          collection ? collection.indexOf(node) >= 0 : zepto.matches(node, selector)
        )) {
        node = node !== context && !isDocument(node) && node.parentNode  
      }
      return $(node)
    },
    css: function() {
      console.log('css')
    },
    html: function() {
      console.log('html')
    }
  }

  zepto.Z.prototype = $.fn
  $.zepto = zepto
  return $;
})();

window.Zepto = Zepto;
window.$ === undefined && (window.$ = Zepto);