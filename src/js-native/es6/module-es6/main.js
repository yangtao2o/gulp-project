// main.js
import { add } from "./add.js";
console.log(add(1, 1));

import { square } from "./square.js";
console.log(square(3));

// AMD
// require(["./add", "./square"], function(addModule, squareModule) {
//   console.log(addModule.add(1, 1));
//   console.log(squareModule.square(3));
// });
