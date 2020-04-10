// main.js
const addModule = require('./add');
console.log(addModule.add(1, 1));

const squareModule = require("./square");
console.log(squareModule.square(3));

// // CMD
// define(function(require, exports, module) {
//   var addModule = require("./add");
//   console.log(addModule.add(1, 1));

//   var squareModule = require("./square");
//   console.log(squareModule.square(3));
// });
