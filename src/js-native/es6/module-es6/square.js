console.log("加载了 square 模块");

import { multiply } from "./multiply.js";

var square = function(num) {
  return multiply(num, num);
};

export { square };

// // commonjs
// const multiplyModule = require("./multiply");
// module.exports.square = num => multiplyModule.multiply(num, num);

