Vue.component('pane', {
  name: 'pane',
  template: '\
    <div class="pane"> \
      <slot></slot> \
    </div>',
  props: {
    name: {
      type: String
    },
    label: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      show: true
    }
  },
  methods: {
    updateNav() {
      this.$parent.updateNav();
    }
  },
  watch: {
    label() {
      this.updateNav();
    }
  },
  mounted() {
    this.uodateNav();
  },
})