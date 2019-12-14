import Vue from 'vue'
import Router from './router'

import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

import App from './App.vue'

// config
Vue.config.productionTip = false

// registe
Vue.use(ViewUI)

new Vue({
  router: Router,
  render: h => h(App)
}).$mount('#app')
