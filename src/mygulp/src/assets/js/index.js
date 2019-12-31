class App {
  constructor() {
    this.msg = 'Hello world.'
  }
  getMsg(msg)  {
    console.log(msg || this.msg)
  } 
}

class Hello extends App {
  constructor(msg) {
    super(msg);
  }
}
const hi = new Hello();

hi.getMsg();