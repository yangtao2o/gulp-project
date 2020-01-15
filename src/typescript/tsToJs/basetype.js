"use strict";
var isDone = false;
var decLiteral = 6;
var hexLiteral = 0xf00d;
var age = 30;
var myName = 'bob';
var sentence = "Hello, my name is " + myName + ",\nI'll be " + (age + 1) + " years old next month.";
var list = [1, 2, 3];
var list2 = [1, 2, 3];
var x;
x = ['hello', 10];
// x = [10, 10];  // error
// x[3] = 'world';
// x[6] = true;
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
var c2 = Color[1];
var list3 = [1, '1', true];
var unusable = undefined;
var u = undefined;
var n = null;
function warnUser() {
    console.log('This is my warning message.');
}
function error(message) {
    throw new Error(message);
}
// 类型断言
var someValue = 'This is a string.';
var strlength = someValue.length;
