/**
 * this 绑定
 * 默认绑定 -> 全局绑定
 * 隐式绑定
 * 显式绑定
 * new 绑定
 */

// 创建一个包裹函数，负责接收参数并返回值
function foo(something) {
  console.log(this.a, something)
  return this.a + something
}

var obj = {
  a: 2
}

var bar = function() {
  return foo.apply(obj, arguments)
}

var b = bar(3)
console.log({b})

function getArticleTags() {
  var parent = document.getElementsByClassName('new-tags')[0];
  var tags = parent.getElementsByTagName('a');
  var contents = [];
  for(var i = 0; i < tags.length; i++) {
    var self = tags[i];
    var txt = tags[i].innerText;
    if(txt) {
      contents.push(txt)
    }
  }
  return contents;
}