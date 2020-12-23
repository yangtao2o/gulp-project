// 20201223 - 极客时间 - 19 | Promise：使用Promise，告别回调函数

// XMLHttpRequest

//执行状态
function onResolve(response) {
  console.log(response)
}
function onReject(error) {
  console.log(error)
}

let xhr = new XMLHttpRequest()
xhr.ontimeout = function (e) {
  onReject(e)
}
xhr.onerror = function (e) {
  onReject(e)
}
xhr.onreadystatechange = function () {
  onResolve(xhr.response)
}

//设置请求类型，请求URL，是否同步信息
let URL = 'https://time.geekbang.com'
xhr.open('Get', URL, true)

//设置参数
xhr.timeout = 3000 //设置xhr请求的超时时间
xhr.responseType = 'text' //设置响应返回的数据格式
xhr.setRequestHeader('X_TEST', 'time.geekbang')

//发出请求
// xhr.send();

/**
 * makeRequest用来构造request对象
 * @param {string} request_url
 * @returns {object} return request
 */

function makeRequest(request_url) {
  const request = {
    method: 'Get',
    url: request_url,
    headers: '',
    body: '',
    credentials: false,
    sync: true,
    responseType: 'text',
    referrer: '',
  }
  return request
}

/**
 * @param {object} request - 请求信息，请求头，延时值，返回类型等
 * @param {myCallback} resolve  - 执行成功，回调该函数
 * @param {myCallback} reject - 执行失败，回调该函数
 */

function XFetch(request, resolve, reject) {
  let xhr = new XMLHttpRequest()
  xhr.ontimeout = function (e) {
    reject(e)
  }
  xhr.onerror = function (e) {
    reject(e)
  }
  xhr.onreadystatechange = function () {
    if ((xhr.status = 200)) resolve(xhr.response)
  }
  xhr.open(request.method, URL, request.sync)
  xhr.timeout = request.timeout
  xhr.responseType = request.responseType
  //补充其他请求信息
  //...
  xhr.send()
}

XFetch(
  makeRequest('https://time.geekbang.org'),
  function resolve(data) {
    console.log(data)
  },
  function reject(e) {
    console.log(e)
  }
)

// 问题：很容易造成回调地狱
// 第一是嵌套调用
// 第二是任务的不确定性
XFetch(
  makeRequest('https://time.geekbang.org/?category'),
  function resolve(response) {
    console.log(response)
    XFetch(
      makeRequest('https://time.geekbang.org/column'),
      function resolve(response) {
        console.log(response)
        XFetch(
          makeRequest('https://time.geekbang.org'),
          function resolve(response) {
            console.log(response)
          },
          function reject(e) {
            console.log(e)
          }
        )
      },
      function reject(e) {
        console.log(e)
      }
    )
  },
  function reject(e) {
    console.log(e)
  }
)
