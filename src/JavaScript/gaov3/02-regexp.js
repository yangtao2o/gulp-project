// var expression = / pattern / flags;
const text = 'mom and dad and bady';
const pattern = /mom( and dad( and bady)?)?/gi;

const matches = pattern.exec(text);
console.log(matches)
// [ 'mom and dad and bady',
//   ' and dad and bady',
//   ' and bady',
//   index: 0,
//   input: 'mom and dad and bady',
//   groups: undefined ]

const text2 = '000-00-0000';
const pattern2 = /\d{3}-\d{2}-\d{4}/;

console.log(pattern2.test(text2))  // true
console.log(RegExp.left_content)