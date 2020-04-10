// add.js
console.log("加载了 add 模块");
var add = (x, y) => x + y;

module.exports.add = add;

// // CMD
// define(function(require, exports, module) {
//   console.log("加载了 add 模块");
//   var add = function(x, y) {
//     return x + y;
//   };
//   module.exports = {
//     add: add
//   };
// });
