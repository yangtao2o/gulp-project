<template>
  <div>
    <h1>{{ count }}</h1>
    <button @click="increment">Add1</button>
    <button @click="add">Add2</button>
    <p>{{ doneTodos }}</p>
  </div>
</template>

<script>
import store from "./../store/index";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Counter",
  computed: {
    // 由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态
    // count () {
    //   return this.$store.state.count
    // },
    ...mapState({
      count: state => state.count
    }),
    // doneTodos() {
    //   return this.$store.getters.doneTodos;
    // }
    ...mapGetters(["doneTodos"])
  },
  methods: {
    increment() {
      // this.$store.commit('increment', {
      //   amount: 5
      // })
      // 对象风格
      // store.commit({
      //   type: 'INCREMENT',
      //   amount: 5
      // })
      // actions
      store.dispatch("incrementAsnyc");
    },
    ...mapActions({
      add: "incrementAsnyc"
    })
  }
};
</script>
