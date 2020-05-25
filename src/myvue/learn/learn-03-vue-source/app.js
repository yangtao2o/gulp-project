import Vue from "./module/dep.js";

let myvue = new Vue({
  data: {
    test: "I am test data.",
    msg: {
      name: 'tao',
      age: 22
    }
  }
});
myvue._data.test = "TTTest";
myvue._data.msg = "ming";
