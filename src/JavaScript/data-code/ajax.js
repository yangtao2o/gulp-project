const MYTHOD = "get";
const URL = "https://api.github.com/search/repositories";

let ajax = ({ method = "GET", path, body, headers }) => {
  //进行Promise封装
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();

    request.open(method, path, true); //配置

    if (method == "GET") {
      request.send(null);
    } else {
      for (const key in headers) {
        //遍历header,设置响应头
        let value = headers[key];
        request.setRequestHeader(key, value);
      }
      request.send(body);
    }

    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status >= 200 && request.status < 400) {
          resolve.call(undefined, request.responseText);
        } else if (request.status >= 400) {
          reject.call(undefined, request);
        }
      }
    };
  });
};

//使用ajax
ajax({
  method: "get",
  path: "https://api.github.com/search/repositories?q=javascript&sort=stars",
  headers: {
    "content-type": "application/json"
  }
}).then(
  responseText => {
    console.log(responseText);
  },
  request => {
    console.log(request);
  }
);
