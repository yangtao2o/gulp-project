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