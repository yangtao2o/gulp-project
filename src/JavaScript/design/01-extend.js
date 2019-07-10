var book = {
  name: 'javascript 设计模式',
  alike: ['css', 'html', 'javascript']
}

var anotherBook = {
  color: 'blue'
}

var otherBook = {
  year: '2019'
}

// 浅复制
function extend(target, source) {
  for(var property in source) {
    target[property] = source[property];
  }
  return target;
}

// extend(anotherBook, book);

// console.log(anotherBook.name);
// console.log(anotherBook.color);
// anotherBook.alike.push('hahah');
// console.log(anotherBook.alike)
// console.log(book.alike)


Object.prototype.mix = function() {
  var i = 0,
    len = arguments.length,
    arg;
  console.log('start', this)
  for(; i < len; i++) {
    arg = arguments[i];
    for(var property in arg) {
      this[property] = arg[property];
    }
  }
  console.log('end', this)
}

otherBook.mix(book, anotherBook);

console.log(otherBook);
console.log(otherBook.name);