import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from './router'

import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

import App from './App.vue'

// config
Vue.config.productionTip = false

// registe
Vue.use(VueRouter)
Vue.use(ViewUI)

new Vue({
  router: new VueRouter({ routes: Router.routes }),
  render: h => h(App)
}).$mount('#app')
