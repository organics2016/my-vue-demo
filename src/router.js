import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'

const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(err => err)
}

const routerReplace = Router.prototype.replace
Router.prototype.replace = function replace (location) {
  return routerReplace.call(this, location).catch(err => err)
}

Vue.use(Router)

const routeConfig = {
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import(/* webpackChunkName: "about" */ './views/login/Login.vue')
    }
  ]
}

const router = new Router(routeConfig)

router.afterEach((to, from) => {
  store.commit('session/cacheRouterHistory', to)
})

export default router
