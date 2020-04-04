// 作用域
// - 程序源代码中定义变量的区域
// - 规定了如何查找变量，也就是确定当前执行代码的访问权限

// JS 采用的是词法作用域，也就是静态作用域
// 比如函数的作用域在函数定义的时候就决定了

var scope = "global scope";
function checkscope(){
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f();
}
console.log(checkscope());  // local scope

function checkscope2(){
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f;
}
console.log(checkscope2()())  // local scope