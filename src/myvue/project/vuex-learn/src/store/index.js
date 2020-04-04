import Vue from "vue";
import Vuex from "vuex";
import { INCREMENT } from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    todos: [
      { id: 1, text: "11111", done: true },
      { id: 2, text: "2222", done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done);
    }
  },
  mutations: {
    incrementBy(state) {
      state.count++;
    },
    [INCREMENT](state, payload) {
      state.count += payload.amount;
    }
  },
  actions: {
    incrementAsnyc({ commit }) {
      setTimeout(() => {
        commit("incrementBy");
      }, 1000);
    }
  }
});
