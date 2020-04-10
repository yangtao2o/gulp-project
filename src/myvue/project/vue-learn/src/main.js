import Vue from 'vue'
import VueBus from 'vue-bus';

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueBus);

new Vue({
  render: h => h(App),
}).$mount('#app')
