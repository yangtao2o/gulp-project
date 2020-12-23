// 20201223 - 极客时间 - 19 | Promise：使用Promise，告别回调函数

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
 * @param {object} request
 * @returns Promise Object
 */
function XFetch(request) {
  function executor(resolve, reject) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', request.url, true)
    xhr.ontimeout = function (e) {
      reject(e)
    }
    xhr.onerror = function (e) {
      reject(e)
    }
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(this.responseText, this)
        } else {
          let error = {
            code: this.status,
            response: this.response,
          }
          reject(error, this)
        }
      }
    }
    xhr.send()
  }
  return new Promise(executor)
}

var x1 = XFetch(makeRequest('https://time.geekbang.org/?category'))
var x2 = x1.then(value => {
  console.log(value)
  return XFetch(makeRequest('https://www.geekbang.org/column'))
})
var x3 = x2.then(value => {
  console.log(value)
  return XFetch(makeRequest('https://time.geekbang.org'))
})
x3.catch(error => {
  console.log(error)
})
