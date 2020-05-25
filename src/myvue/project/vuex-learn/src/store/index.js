import Vue from "vue";
import Vuex from "vuex";
import { INCREMENT } from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  // 初始 state 对象
  state: {
    count: 0,
    todos: [
      { id: 1, text: "11111", done: true },
      { id: 2, text: "2222", done: false }
    ]
  },
  // Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done);
    }
  },
  // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
  // 当触发一个 mutation 时，需要以相应的 type 调用 store.commit 方法，调用此函数
  // mutation 必须同步执行
  mutations: {
    incrementBy(state) {
      state.count++;
    },
    [INCREMENT](state, payload) {
      state.count += payload.amount;
    }
  },
  // Action 类似于 mutation，不同在于：
  // - Action 提交的是 mutation，而不是直接变更状态
  // - Action 可以包含任意异步操作
  actions: {
    incrementAsnyc({ commit }) {
      setTimeout(() => {
        commit("incrementBy");
      }, 1000);
    }
  }
});
