import Vue from 'vue'
import Router from './router/index'
import Store from './store/index'
import './viewui/index'

import App from './App.vue'

// config
Vue.config.productionTip = false

new Vue({
  router: Router,
  store: Store,
  render: h => h(App)
}).$mount('#app')
