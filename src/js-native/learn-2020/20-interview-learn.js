function* foo(x) {
  let y = 2 * (yield x + 1);
  let z = yield y / 3;
  return x + y + z;
}

let it = foo(5);

function setInterval(callback, interval) {
  let timer;
  const now = Date.now;
  let startTime = now();
  let endTime = startTime;
  const loop = () => {
    timer = window.requestAnimationFrame(loop);
    endTime = now();
    if (endTime - startTime >= interval) {
      startTime = endTime = now();
      callback(timer);
    }
  };
  timer = window.requestAnimationFrame(loop);
  return timer;
}

// let a = 0;
// setInterval(timer => {
//   console.log(1);
//   a++;
//   if (a === 3) cancelAnimationFrame(timer);
// }, 1000);

function fibonacciIterative(n) {
  if (n < 1) return 0;
  if (n <= 2) return 1;
  let fibNMinus2 = 0;
  let fibNMinus1 = 1;
  let fibN = n;
  for (let i = 2; i <= n; i++) {
    // n >= 2
    fibN = fibNMinus1 + fibNMinus2; // f(n-1) + f(n-2)
    fibNMinus2 = fibNMinus1;
    fibNMinus1 = fibN;
  }
  return fibN;
}
function fibonacci(n) {
  if (n < 1) return 0;
  if (n <= 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 递归性能优化版本
function fibonacciMemoization() {
  const memo = [0, 1];
  const fibonacci = (n) => {
    if (memo[n] != null) return memo[n];
    return (memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo));
  };
  return fibonacci;
}
const f = fibonacciMemoization();
// var res = f(8) // 21

// 尾递归
function fibonacci(n, sum1 = 1, sum2 = 1) {
  if (n <= 2) return sum2;
  return fibonacci(n - 1, sum2, sum1 + sum2);
}
fibonacci(5);

// 阶乘
function factorialIterative(number) {
  if (number < 0) return undefined;
  let total = 1;
  for (let n = number; n > 1; n--) {
    total = total * n;
  }
  return total;
}
function factorial(n) {
  if (n <= 1) return n;
  return n * factorial(n - 1);
}
function factorial2(n, res = 1) {
  if (n <= 1) return n * res;
  return factorial2(n - 1, n * res);
}
// 求和
function sum(n) {
  if (n <= 1) return n;
  var sum = 0;
  for (var i = n; i > 0; i--) {
    sum += i;
  }
  return sum;
}

function sum(n) {
  if (n <= 1) return n;
  return n + sum(n - 1);
}
function sum(n, res = 0) {
  if (n <= 1) return n + res;
  return sum(n - 1, n + res);
}

sum(5);

function fibonacci(n, sum1 = 1, sum2 = 1) {
  // debugger
  if (n <= 2) return sum2;
  return fibonacci(n - 1, sum2, sum1 + sum2);
}
console.log(fibonacci(5));

//result_callback：下载结果的回调函数
//url：需要获取URL的内容
function GetUrlContent(result_callback, url) {
  let request = new XMLHttpRequest();

  request.open("GET", url);

  request.responseType = "text";

  request.onload = function() {
    result_callback(request.response);
  };

  request.send();
}

function IDCallback(id) {
  console.log(id);

  let new_name_url = name_url + "?id=" + id;

  GetUrlContent(NameCallback, new_name_url);
}

function NameCallback(name) {
  console.log(name);
}

GetUrlContent(IDCallback, id_url);
