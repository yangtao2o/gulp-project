"use strict";
var Student = /** @class */ (function () {
    function Student(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + " " + lastName + " ";
    }
    return Student;
}());
function greeter(person) {
    console.log("hello, " + person.firstName + " " + person.lastName);
}
var user = new Student('Yang', 'Tao');
greeter(user);
console.log(user.fullName);
