let isDone: boolean = false;
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;

let age: number = 30;
let myName: string = 'bob';
let sentence: string = `Hello, my name is ${myName},
I'll be ${age + 1} years old next month.`;

let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

let x: [string, number];
x = ['hello', 10];
// x = [10, 10];  // error
// x[3] = 'world';
// x[6] = true;

enum Color {Red, Green, Blue}

let c: Color = Color.Green;
let c2: string = Color[1];

let list3: any = [1, '1', true]

let unusable: void = undefined;
let u: undefined = undefined;
let n: null = null;

function warnUser(): void {
  console.log('This is my warning message.');
}

function error(message: string): never {
  throw new Error(message);
}

// 类型断言
let someValue: any = 'This is a string.';
let strlength: number = (<string>someValue).length;
