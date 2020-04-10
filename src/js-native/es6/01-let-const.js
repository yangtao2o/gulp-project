if (false) {
    let value = 1;
}
console.log(value);  // Uncaught ReferenceError: value is not defined

var value = 1;
let value = 2; // Uncaught SyntaxError: Identifier 'value' has already been declared

let value = 1;
console.log(window.value); // undefined

console.log(typeof value); // Uncaught ReferenceError: Cannot access 'value' before initialization
let value = 1;

let arr = [{ value: 1 }, { value: 2 }, { value: 3 }];

let message = `
	<ul>
		${arr
      .map(item => {
        return `
				<li>${item.value}</li>
			`;
      })
      .join("")}
	</ul>
`;
console.log(message);

let x = "Hi",
  y = "Kevin";
var res = messagefn`${x}, I am ${y}`;
console.log(res);

function messagefn(literals, value1, value2) {
  console.log(literals); // [ "", ", I am ", "" ]
  console.log(value1); // Hi
  console.log(value2); // Kevin
}

// 可以通过命名参数或者 rest 参数的形式访问参数:

let nums = (...nums) => nums;
console.log(nums(1, 2, 3)); // [1, 2, 3]

