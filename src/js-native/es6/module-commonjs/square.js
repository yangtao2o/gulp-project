console.log("加载了 square 模块");
const multiplyModule = require("./multiply");
module.exports.square = num => multiplyModule.multiply(num, num);

// // CMD
// define(function(require, exports, module) {
//   console.log("加载了 square 模块");
//   var multiplyModule = require("../module-cmd/multiply");
//   module.exports = {
//     square: function(num) {
//       return multiplyModule.multiply(num, num);
//     }
//   };
// });
