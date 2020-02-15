<template>
  <div>
    <h1>{{ count }}</h1>
    <button @click="increment">Add1</button>
    <button @click="add">Add2</button>
    <p>{{doneTodos}}</p>
  </div>
</template>

<script>
import store from './../store/index'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Counter',
  computed: {
    // count () {
    //   return this.$store.state.count
    // },
    ...mapState({
      count: state => state.count,
    }),
    ...mapGetters([
      'doneTodos'
    ]),
    
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
      store.dispatch('incrementAsnyc')
    },
    ...mapActions({
      add: 'incrementAsnyc'
    })
  },
}
</script>


