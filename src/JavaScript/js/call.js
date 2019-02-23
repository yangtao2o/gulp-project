// 使用call方法调用父构造函数
function Parent(name, age) {
  this.name = 'parent';
  this.age = 100;
}
function Child(name, age) {
  Parent.call(this, name, age)
  this.type = 'child'
  console.log('name: %s', name, age);
}
// var child1 = new Child('yangg', '12');

// 使用 call 调用匿名函数
var animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Fail' }
];
for(var i=0, l=animals.length; i<l; i++) {
  (function(i) {
    this.print = function() {
      console.log('#' + i + '-' + this.species + '-' + this.name);
    };
    this.print();
  }).call(animals[i], i);
}

// 使用 call 调用函数并指定上下文的 this
function greet() {
  var reply = [this.animal, 'typically sleep between', this.sleepDuration].join(' ');
  console.log(reply);
}
var obj = {
  anmil: 'cats',
  sleepDuration: '12 and 16 hours'
}
greet.call(obj);

// 使用call方法调用函数并且没有确定第一个参数（argument）
var sData = 'Wisen';
function display() {
  console.log('sData value is %s ', this.sData);
}

display.call();  // sData value is Wisen