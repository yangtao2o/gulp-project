function Car() {}
var mycar = new Car();
var a = mycar instanceof Car; // 返回 true
var b = mycar instanceof Object; // 返回 true
var aa = Car.prototype.isPrototypeOf(mycar); // true
var bb = Object.prototype.isPrototypeOf(mycar); // true

if (!(mycar instanceof Car)) {
  // Do something, like mycar = new Car(mycar)
}
if (!Car.prototype.isPrototypeOf(mycar)) {
  // do something safe
}

function myinstanceof(L, R) {
  const O = R.prototype;
  L = L.__proto__;
  while (true) {
    if (L === null) return false;
    if (O === L) return true;
    L = L.__proto__;
  }
}

var a = myinstanceof(mycar, Car); // 返回 true
var b = myinstanceof(mycar, Object); // 返回 true

console.log(a, b);
