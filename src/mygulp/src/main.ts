class Student {
  fullName: string;
  constructor(public firstName: string, public lastName: string) {
    this.fullName = `${firstName} ${lastName} `;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  console.log(`hello, ${person.firstName} ${person.lastName}`);
}

let user = new Student('Yang', 'Tao');

greeter(user);
console.log(user.fullName)