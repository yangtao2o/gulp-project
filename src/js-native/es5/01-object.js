// 排序
const arr = [0, 1, 5, 10, 15];

console.log(arr.sort());

function compare(v1, v2) {
  if(v1 < v2) {
    return -1;
  } else if(v1 > v2) {
    return 1;
  } else {
    return 0;
  }
}
function compare2(v1, v2) {
  return v1 - v2;
}
console.log(arr.sort(compare))
console.log(arr.sort(compare2))

// concat slice splice
let strings = ['a', 'b', 'c'];
const s2 = strings.concat(['aaa'])
const s3 = strings.slice(1, 2);

console.log(s2)  // [ 'a', 'b', 'c', 'aaa' ]
console.log(s3)  // [ 'b' ]
console.log(strings)  // [ 'a', 'b', 'c' ]

let s4 = strings.splice(1, 0, 'bbb');
console.log(s4)  // [] - splice返回被删除的项
console.log(strings)   // [ 'a', 'bbb', 'b', 'c' ]

// indexOf lastIndexOf
console.log(strings.indexOf('bbb'))  // 1
console.log(strings.indexOf('ccc'))  // -1

// 迭代方法

// every()
// some()
// filter()
// map()
// forEach()

// 归并方法
// reduce() reduceRight()
const nums = [1, 2, 3, 4, 5];
const sum = nums.reduce(function(prev, cur, index, array) {
  return prev + cur;
});
console.log(sum);  // 15

const date = {
  data: new Date(),
  data2: new Date('10/11/2019'),
  parse: new Date(Date.parse('10/11/2019')),
  now: Date.now(),
  newDate: +new Date(),
}
console.log(date)
