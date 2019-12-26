import Vue from 'vue'
import Router from 'vue-router'

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
  base: '/app/',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "about" */ './views/login/Login.vue')
    },
    {
      path: '/home',
      component: () => import(/* webpackChunkName: "about" */ './views/home/Home.vue')
    }
    // {
    //   path: '/error/:errorCode',
    //   component: () => import(/* webpackChunkName: "about" */ './views/error/Error.vue')
    // },
    // {
    //   path: '*',
    //   redirect: '/error/404'
    // }
  ]
}

export default new Router(routeConfig)
