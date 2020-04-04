/**
 * Object.create()
 */
var foo = {
  something: function() {
    console.log('Tell me something good...')
  }
}

var bar = Object.create(foo);
console.log(foo.__proto__===Object.prototype);  // true
// foo是否出现在bar的[[prototype]]链中
console.log(bar.__proto__ === foo)  // true
console.log(foo.isPrototypeOf(bar));  // true
bar.something();

// ployfill
if(!Object.create) {
  Object.create = function(o) {
    function F() { }
    F.prototype = o;
    return new F();
  };
}

// 模拟
function myCreate(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

var baz = {
  something: function() {
    console.log('Tell me something good...')
  }
};
var baa = myCreate(baz);
baa.something();

