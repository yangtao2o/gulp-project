// Reducer 函数必须是“纯”的 —— 不能修改它的参数，也不能有副作用
const reducer = function(state = 0, action) {
  // 每一次调用 dispatch 最终都会调用 reducer！

  // State 是只读的，唯一修改它的方式是 actions
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);

const unsubscribe = store.subscribe(() => console.log(store.getState()))

// 更新的唯一方式：dispatch(action) -> reducer -> new state。
store.dispatch({
  type: 'INCREMENT'
})

store.dispatch({
  type: 'INCREMENT'
})

// 停止监听 state 更新
unsubscribe();