console.log("加载了 multiply 模块");
const multiply = (x, y) => x * y;

module.exports.multiply = multiply;

// CMD
// define(function(require, exports, module) {
//   console.log("加载了 multiply 模块");
//   var multiply = function(x, y) {
//     return x * y;
//   };
//   module.exports = {
//     multiply: multiply
//   };
// });
