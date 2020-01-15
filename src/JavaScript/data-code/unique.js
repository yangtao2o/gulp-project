/* Unique */
const arr = [3, 1, 2, "1", 1, { value: 1 }, { value: 1 }];

// function unique(arr) {
//   var result = [];
//   for (var i = 0, arrLen = arr.length; i < arrLen; i++) {
//     for (var j = 0, resLen = result.length; j < resLen; j++) {
//       console.log('b--', i, j)
//       if (arr[i] === result[j]) {
//         break;
//       }
//     }
//     if (j === result.length) {
//       result.push(arr[i]);
//     }
//   }
//   return result;
// }

// function unique(arr) {
//   let arrary = [].concat(arr);
//   for (let i = 0, len = arrary.length; i < len; i++) {
//     for (let j = i + 1;j < len; j++) {
//       if (arrary[i] === arrary[j]) {
//         arrary.splice(j, 1);
//         len--;
//         j--;
//       }
//     }
//   }
//   return arrary;
// }

// function unique(arr) {
//   const result = [];
//   for (let i = 0, len = arr.length; i < len; i++) {
//     const current = arr[i];
//     if (result.indexOf(current) === -1) {
//       result.push(current);
//     }
//   }
//   return result;
// }

// function unique(arr) {
//   let result = arr.filter(function(item, index, arr) {
//     return arr.indexOf(item) === index;
//   });
//   return result;
// }

// let unique = arr =>
//   arr.filter((item, index, arr) => arr.indexOf(item) === index);

// let unique = arr =>
//   arr
//     .concat()
//     .sort()
//     .filter((item, index, arr) => !index || item !== arr[index - 1]);

// let unique = arr => {
//   const obj = {};
//   return arr.filter((item, index, arr) =>
//     obj.hasOwnProperty(typeof item + JSON.stringify(item))
//       ? false
//       : (obj[typeof item + JSON.stringify(item)] = true)
//   );
// };

// let unique = arr => arr.map(item => typeof item + JSON.stringify(item));

// let unique = arr => [...new Set(arr)]
// let unique = arr => Array.from(new Set(arr))

let unique = arr => {
  const seen = new Map();
  return arr.filter(item => !seen.has(item) && seen.set(item, true));
};

console.log(unique(arr));
console.log("arr", arr);
