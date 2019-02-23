## Vitual Dom
### 什么是 vdom
* virtual dom，虚拟 DOM
* 用 js 模拟 DOM 结构
* DOM 变化的对比， 放在 JS 层来做（图灵完备语言）
* 提高重绘性能
### 为什么要用 vdom
* DOM 操作是“昂贵”的，js 运行效率高；
* 尽量减少 DOM 操作；
* 项目越复杂，影响就越严重

### vdom 的如何应用
使用 snabbdom 的用法举例

### snabbdom核心 API
* h('<div>', {...属性值...}, [...子元素...])
* h('<div>', {}, '...')
* patch(container, vnode)
* patch(vnode, newVnode)
HTML
```html
<h2>Snabbdom Demo</h2>
<div id="container"></div>
<button id="btn-change">change</button>
```
引入
```html
<script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom.js"></script>
<script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-class.js"></script>
<script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-props.js"></script>
<script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-style.js"></script>
<script src="https://cdn.bootcss.com/snabbdom/0.7.3/snabbdom-eventlisteners.js"></script>
<script src="https://cdn.bootcss.com/snabbdom/0.7.3/h.js"></script>
```
Javascript
```javascript
var snabbdom = window.snabbdom

var patch = snabbdom.init({
  snabbdom_class,
  snabbdom_props,
  snabbdom_style,
  snabbdom_eventlisteners
})

var h = snabbdom.h

var data = [
  {
    name: '张三',
    age: 22,
    address: '兰州'
  },
  {
    name: '李四',
    age: 28,
    address: '宁夏'
  },
  {
    name: '王五',
    age: 20,
    address: '郑州'
  },
]

data.unshift({
  name: '姓名',
  age: '年龄',
  address: '地址'
})

var container = document.getElementById('container')

var vnode
function render(data) {
  var newVnode = h('table', {}, data.map(function(item) {
    var tds = []
    var key
    for(key in item) {
      if(item.hasOwnProperty(key)) {
        tds.push(h('td', {}, item[key] + ''))
      }
    }
    return h('tr', {}, tds)
  }))
  // 更新
  if(vnode) {
    patch(vnode, newVnode)
  } else {
    // 初次渲染
    patch(container, newVnode)
  }
  // 存储当前的值
  vnode = newVnode
}

render(data)

var btnChange = document.getElementById('btn-change').addEventListener('click', function(e) {
  data[1].name = 'yangtao'
  data[2].age = 27

  render(data)
})
```

## 介绍 diff 算法
### 什么是 diff 算法
* diff 算法，是linux的基础命令
* vdom 中应用 diff 算法是为了找出需要更新的节点
### 去繁就简
* diff 算法非常复杂，实现难度很大，源码量很大
* 去繁就简，讲明白核心流程，不关心细节
* 面试官关心流程

### vdom 为何用 diff 算法
* DOM 操作是“昂贵”的，因此尽量减少 DOM 操作
* 找出本次 DOM 必须更新的节点来更新，其他的不更新
* 这个“找出”的过程，就需要 diff 算法

```javascript
// createElement
function  createElement(vnode) {
  var tag = vnode.tag
  var attrs = vnode.attrs || {}
  var children = vnode.children || []

  if(tag == null) { // 这里有可能是null 或者 undefined
    return null
  }

  // 创建真实的 DOM 元素
  var elem = document.createElement(tag)
  var attrName
  for(attrName in attrs) {
    if(attrs.hasOwnProperty(attrName)) {
      // 给 elem 添加属性
      elem.setAttribute(attrName, attrs[attrName])
    }
  }

  // 子元素
  children.forEach(function(childVnode) {
    elem.appendChild(createElement(childVnode))  // 递归
  })

  // 返回真实的 DOM 元素
  return dom
}

// updateElement - patch(vnode, newVnode)
function updateElement(vnode, newVnode) {
  var children = vnode.children || []
  var newChildren = newVnode || []

  children.forEach(function(childVnode, index) {
    var newChildVnode = newChildren[index]
    if(childVnode.tag === newChildVnode.tag) {
      updateElement(childVnode, newChildVnode)
    } else {
      replaceNode(childVnode, newChildVnode)
    }
  })
}

function replaceElement(vnode, newVnode) {
  var elem = vnode.elem
  var newElem = newVnode.elem

  // 替换 dom 操作
}
```
