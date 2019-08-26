Function.prototype.myCall = function (context = window, ...args) {
  if (this === Function.prototype) {
    return undefined; // 用于防止 Function.prototype.myCall() 直接调用
  }
  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
}